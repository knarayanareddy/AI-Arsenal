---
id: "capture-the-llm-call-event"
title: "Capture a Structured Event for Every LLM Call, Not Just an Access Log Line"
entry_type: observability
category: instrumentation
scope: production
signal_types:
  - latency
  - cost
  - quality
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
  - pii
  - secrets
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of calls for metadata-only fields (model, tokens, latency, status); 100% of errors for full content capture; 5-10% of successful calls for full prompt/completion content capture (opt-in, gated behind an explicit env var, per OpenTelemetry GenAI semantic conventions' capture-is-off-by-default default)"
  retention: "90 days for metadata-only fields; 14 days for any event carrying full prompt/completion content, then either deleted or reduced to metadata-only on rollup"
  correlation:
    - request_id
    - trace_id
    - session_id
    - user_id (only when the deployment has a hard requirement to correlate across a user's sessions; omit otherwise to minimize data_sensitivity surface)
  redaction: "Prompt and completion content fields are never written to any store without first passing through a redaction pass for known secret patterns (API keys, tokens) and, where PII is a realistic risk (see Privacy & Governance), a PII detector; metadata-only fields (model, token counts, latency, status) carry no sensitive content and require no redaction"
  events:
    - name: "gen_ai.client.inference.operation.details"
      when_emitted: "On every model invocation, at the point the response (or an error) is received"
      required_fields:
        - request_id
        - gen_ai.request.model
        - gen_ai.provider.name
        - gen_ai.usage.input_tokens
        - gen_ai.usage.output_tokens
        - latency_ms
        - status
      optional_fields:
        - gen_ai.request.temperature
        - gen_ai.response.finish_reasons
        - cache_hit
        - prompt_version
        - gen_ai.input.messages (only when content capture is explicitly enabled)
        - gen_ai.output.messages (only when content capture is explicitly enabled)
      pii_risk: internal

related_tools:
  - langfuse
  - openllmetry
related_projects:
  - phoenix
related_build_examples:
  - intermediate-production-rag-api
related_tips:
  - store-prompt-version-in-every-trace
  - redact-secrets-before-tracing
dashboards: []
alert_rules:
  - "Alert if p95 latency_ms for any (model, provider) pair exceeds its 7-day rolling p95 by more than 50% for 3 consecutive 5-minute windows"
common_failure_modes:
  - "Emitting the event only on success, so failed calls (timeouts, rate limits, malformed responses) are invisible in the trace store and cannot be counted toward an error-rate SLO"
  - "Recording token counts from the request payload instead of the provider's actual usage response, silently drifting from real billing figures whenever the provider's tokenizer differs from an assumed estimate"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: reviewed
---

## Overview

Every downstream observability category in this catalog — tracing, evaluation, monitoring, cost, privacy, incident response — depends on one foundational fact: a structured event was actually captured for every model call, with the same field names every time. An access log line ("called OpenAI, 200 OK") tells you the call happened; it does not tell you what it cost, how long the provider actually took to generate versus how long your own retry logic waited, or which prompt version produced the result. This entry defines that foundational event.

## What to Capture

- The model and provider identity (`gen_ai.request.model`, `gen_ai.provider.name`) — not a hardcoded assumption, since routing logic can swap providers per request
- Actual token usage from the provider's response (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`), never an estimate computed from your own tokenizer against the request payload
- Wall-clock latency from request start to response received (`latency_ms`), measured at the call boundary, not inferred from surrounding application logic
- A `status` field distinguishing success, provider error, timeout, and rate-limit — each needs a different response from monitoring and incident response
- A `prompt_version` identifier when prompts are versioned, so a quality regression can be attributed to a specific prompt change
- Full prompt/completion content, but only behind an explicit opt-in flag, and only after a redaction pass — never by default

## Instrumentation Contract

This event follows the OpenTelemetry GenAI semantic conventions' `gen_ai.client.inference.operation.details` shape (stable naming as of the 2026 GenAI SIG conventions, still under active development at the time of writing — see When This Guidance Might Be Outdated), which stores metadata as span attributes and full content as an opt-in event payload rather than always-on span attributes, specifically because span attributes are always indexed and have no size limit, making them a poor fit for arbitrarily large, potentially sensitive prompt text.

Example event payload with content capture disabled (the default, production-safe mode):

```json
{
  "event_name": "gen_ai.client.inference.operation.details",
  "timestamp": "2026-07-06T14:32:01.203Z",
  "request_id": "req_8f3a1c2b",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "attributes": {
    "gen_ai.request.model": "gpt-4o-mini",
    "gen_ai.provider.name": "openai",
    "gen_ai.usage.input_tokens": 842,
    "gen_ai.usage.output_tokens": 156,
    "latency_ms": 1284,
    "status": "success",
    "gen_ai.response.finish_reasons": ["stop"],
    "cache_hit": false,
    "prompt_version": "support-triage-v3"
  }
}
```

Example with content capture explicitly enabled (opt-in only, and only where `data_sensitivity` for that deployment has been reviewed):

```json
{
  "event_name": "gen_ai.client.inference.operation.details",
  "timestamp": "2026-07-06T14:32:01.203Z",
  "request_id": "req_8f3a1c2b",
  "attributes": {
    "gen_ai.request.model": "gpt-4o-mini",
    "gen_ai.provider.name": "openai",
    "gen_ai.usage.input_tokens": 842,
    "gen_ai.usage.output_tokens": 156,
    "latency_ms": 1284,
    "status": "success",
    "gen_ai.input.messages": [
      { "role": "user", "parts": [{ "type": "text", "content": "[REDACTED: contains customer email]" }] }
    ],
    "gen_ai.output.messages": [
      { "role": "assistant", "parts": [{ "type": "text", "content": "Your order shipped this morning." }] }
    ]
  }
}
```

## Implementation

```python
import time
import os
from opentelemetry import trace

tracer = trace.get_tracer("llm-service", "1.0.0")

CAPTURE_CONTENT = os.environ.get("OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT", "false").lower() == "true"


def call_model(messages: list, model: str, prompt_version: str | None = None) -> dict:
    start = time.monotonic()
    with tracer.start_as_current_span(f"chat {model}") as span:
        span.set_attribute("gen_ai.request.model", model)
        span.set_attribute("gen_ai.provider.name", "openai")
        if prompt_version:
            span.set_attribute("prompt_version", prompt_version)

        try:
            response = call_provider_api(messages, model)
            status = "success"
        except TimeoutError:
            span.set_attribute("status", "timeout")
            raise
        except Exception as e:
            span.record_exception(e)
            span.set_attribute("status", "provider_error")
            raise

        latency_ms = (time.monotonic() - start) * 1000
        span.set_attribute("gen_ai.usage.input_tokens", response.usage.prompt_tokens)
        span.set_attribute("gen_ai.usage.output_tokens", response.usage.completion_tokens)
        span.set_attribute("latency_ms", latency_ms)
        span.set_attribute("status", status)

        if CAPTURE_CONTENT:
            # Redact before emitting -- never write raw content unredacted.
            span.add_event("gen_ai.client.inference.operation.details", attributes={
                "gen_ai.input.messages": redact(messages),
                "gen_ai.output.messages": redact(response.choices[0].message.content),
            })

        return response
```

## Dashboards & Alerts

- Dashboard: per-(model, provider) request volume, p50/p95/p99 latency, and error rate over a rolling 24-hour window
- Dashboard: token usage (input vs output, separately) per model, to distinguish prompt-growth cost drivers from completion-length cost drivers
- Alert rule: p95 `latency_ms` for any (model, provider) pair exceeds its own 7-day rolling p95 by more than 50% for 3 consecutive 5-minute windows — a relative, self-baselining threshold rather than a fixed number, since acceptable latency varies by model
- Alert rule: `status != "success"` rate exceeds 5% of calls for any (model, provider) pair over a 10-minute window

## Common Failure Modes

- **Emitting the event only on success.** Failed calls (timeouts, rate limits, malformed responses) become invisible in the trace store, making it impossible to compute an accurate error-rate SLO — the `try`/`except` branches in the Implementation snippet above exist specifically to prevent this.
- **Recording token counts computed from your own tokenizer against the request payload, instead of the provider's actual usage response.** This silently drifts from real billing figures whenever your tokenizer estimate doesn't match the provider's, which happens more often than expected across model families.

## Privacy & Governance

Prompt and completion content (`gen_ai.input.messages`/`gen_ai.output.messages`) is `pii`-risk and is captured only when `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` is explicitly set — the default is off, matching the OpenTelemetry GenAI semantic conventions' own default posture. When enabled, content passes through redaction (secret-pattern stripping plus a PII detector where relevant) before being written to any store, per [Redact Secrets and Sensitive Data Before Writing to Traces](../../tips-and-tricks/debugging-and-observability/redact-secrets-before-tracing.md). Metadata-only fields (model, token counts, latency, status) carry no sensitive content and are retained for 90 days; any event carrying content is retained for only 14 days before deletion or reduction to metadata-only, per [Set an Explicit Data Retention Policy for Stored Prompts Before Launch](../../tips-and-tricks/debugging-and-observability/review-data-retention-for-prompts.md). Access to raw, content-carrying trace data is restricted to engineers actively debugging a specific incident, via the trace store's own access-control layer (e.g. Langfuse project-level roles) — not open to the full engineering org by default.

## Validation Checklist

- [ ] Every model call path (including retries and fallback routing) emits this event, not just the "happy path"
- [ ] Failed calls (timeout, rate limit, provider error) emit the event with an accurate `status`, not a silently dropped call
- [ ] Token counts are read from the provider's response object, not computed independently
- [ ] `latency_ms` is measured at the call boundary, not inferred from surrounding code
- [ ] Content capture defaults to off and requires an explicit environment variable to enable
- [ ] When content capture is enabled, a redaction pass runs before the event is written to any persistent store
- [ ] `prompt_version` is populated whenever the calling code uses a versioned prompt
- [ ] The event's `request_id`/`trace_id` correlate correctly with the surrounding request's other spans (retrieval, tool calls)
- [ ] Retention automation actually deletes or rolls up content-carrying events after 14 days (verified by checking store contents, not just reading the policy document)

## Relation to the Arsenal

This is the foundational event every other observability category assumes exists. [Trace Every Agent and RAG Step](../tracing/trace-every-agent-and-rag-step.md) assembles this event alongside retrieval and tool-call events into a full trace. [Instrument Cost Per Feature](../cost-usage/instrument-cost-per-feature.md) aggregates this event's token fields into cost attribution. [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md) covers the redaction/retention mechanics referenced above in more depth. Complementary single-intervention tips: [Store Prompt Version in Every Trace](../../tips-and-tricks/debugging-and-observability/store-prompt-version-in-every-trace.md) and [Redact Secrets and Sensitive Data Before Writing to Traces](../../tips-and-tricks/debugging-and-observability/redact-secrets-before-tracing.md).

## Resources

- [OpenTelemetry GenAI Semantic Conventions blog post (2026)](https://opentelemetry.io/blog/2026/genai-observability/) — describes the `gen_ai.client.inference.operation.details` event shape and the content-capture-off-by-default posture this entry follows
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)
- [OpenLLMetry](../../projects/benchmarks-and-evals/openllmetry.md)
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
