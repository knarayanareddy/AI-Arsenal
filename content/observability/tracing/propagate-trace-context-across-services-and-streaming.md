---
id: "propagate-trace-context-across-services-and-streaming"
title: "Propagate a Single Trace Context Across Service Hops and Streaming Responses, So One User Request Is One Trace"
entry_type: observability
category: tracing
scope: production
signal_types:
  - latency
  - reliability
  - quality
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-08"

instrumentation_contract:
  sampling: "Trace-context propagation headers are attached to 100% of inter-service calls (propagation is metadata, not payload, and must be unconditional or traces fracture); the sampling decision itself is made once at the entry point and encoded in the propagated context so every downstream hop honors the same head-based decision rather than each service sampling independently"
  retention: "30 days for full cross-service trace trees; 90 days for trace-level summary rollups (end-to-end duration, hop count, terminal status) with span attributes stripped"
  correlation:
    - trace_id
    - parent_span_id
    - request_id
    - session_id
  redaction: "Propagation headers (traceparent/tracestate) carry only trace and span identifiers plus sampling flags -- no business data -- so they require no redaction; span attributes added at each hop follow the same redaction rules as any other span (secret-pattern scrubbing on tool arguments and retrieved content)"
  events:
    - name: "inject_trace_context"
      when_emitted: "Immediately before any outbound call that crosses a process or service boundary (HTTP request, queue publish, RPC), injecting the current span's context into carrier headers/metadata"
      required_fields:
        - trace_id
        - parent_span_id
        - sampling_decision
      optional_fields:
        - tracestate
        - baggage
      pii_risk: internal
    - name: "extract_trace_context"
      when_emitted: "Immediately on receiving an inbound cross-boundary message, extracting the carrier context and starting the local span as a child of the propagated parent rather than as a new root"
      required_fields:
        - trace_id
        - parent_span_id
        - sampling_decision
      optional_fields:
        - tracestate
        - baggage
      pii_risk: internal
    - name: "stream_span_finalize"
      when_emitted: "When a streaming response completes (final chunk received or stream closed/aborted), setting the span's true end time, token counts, and terminal status rather than closing the span at first byte"
      required_fields:
        - trace_id
        - parent_span_id
        - status
        - time_to_first_token_ms
        - total_stream_duration_ms
      optional_fields:
        - output_tokens
        - was_client_disconnect
      pii_risk: internal
related_tools:
  - langsmith
related_projects:
  - langfuse
  - openllmetry
  - phoenix
related_tips:
  - measure-first-token-latency
  - log-latency-by-pipeline-stage
related_build_examples: []
dashboards:
  - "Trace completeness: fraction of traces whose span count matches the expected number of hops for that route, surfacing where propagation is dropped (a hop that starts a new root instead of continuing the trace)"
  - "End-to-end latency waterfall per route, with each service hop and the streaming generation span shown as a distinct child span so the slow hop is immediately visible"
alert_rules:
  - "Alert if the rate of orphan spans (spans arriving with no resolvable parent, indicating a broken propagation boundary) exceeds 1% of spans over a rolling hour, since orphans mean traces are silently fracturing into unlinkable fragments"
  - "Alert if streaming spans are being closed at first-token time (total_stream_duration_ms approximately equal to time_to_first_token_ms across many spans), which indicates the span is finalized on first byte and the true generation duration is being lost"
common_failure_modes:
  - "Each service starting a new root trace instead of extracting the propagated parent, so a single user request appears as several disconnected traces and no one can see the end-to-end path or attribute latency to the right hop"
  - "Closing the LLM span at first token instead of at stream completion, which records time-to-first-token as the full duration and hides the actual generation time, output token count, and any mid-stream error or client disconnect"
  - "Letting each service make its own independent sampling decision, so a trace is sampled-in at the edge but sampled-out downstream, producing trees with missing branches -- the head sampling decision must be propagated and honored end to end"
  - "Propagating context on HTTP calls but not across async boundaries (message queues, background jobs, task runners), so the trace ends at the enqueue and the work done by the consumer is invisible"
added_date: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

A production LLM request rarely lives in one process: an API gateway calls an orchestration service, which calls a retrieval service, a model provider, and maybe several tools — and the model response usually streams back token by token. If each hop starts its own trace and the streaming span is closed at first byte, you end up with a pile of disconnected fragments that cannot answer the one question tracing exists to answer: *where did this user's request actually spend its time, and where did it fail?* This entry defines the propagation contract that keeps one user request as exactly one connected trace, including correct handling of the streaming generation span.

## What to Capture

- A single `trace_id` established at the entry point and carried, unchanged, through every downstream hop — the invariant that makes one request one trace
- `parent_span_id` on every span, set from the *propagated* parent on inbound boundaries, so spans nest correctly instead of becoming roots
- `sampling_decision` made once at the edge and encoded in the propagated context, so every hop honors the same head-based decision rather than sampling independently
- For streaming responses: `time_to_first_token_ms` and `total_stream_duration_ms` as distinct fields, plus `was_client_disconnect`, captured when the stream *completes*, not at first byte
- Propagation across *all* boundaries, including async ones (queues, background jobs) — not just synchronous HTTP calls
- Standard carriers (W3C `traceparent`/`tracestate`) rather than a bespoke header scheme, so third-party and OpenTelemetry-instrumented components interoperate

## Instrumentation Contract

Example inbound `extract_trace_context` followed by a finalized streaming span:

```json
{
  "event_name": "extract_trace_context",
  "timestamp": "2026-07-08T14:10:03.000Z",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "parent_span_id": "00f067aa0ba902b7",
  "sampling_decision": "sampled",
  "tracestate": "vendor1=abc,vendor2=def"
}
```

```json
{
  "event_name": "stream_span_finalize",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "parent_span_id": "00f067aa0ba902b7",
  "status": "ok",
  "time_to_first_token_ms": 412,
  "total_stream_duration_ms": 3870,
  "output_tokens": 512,
  "was_client_disconnect": false
}
```

W3C `traceparent` header layout that carries the context across a hop:

```text
traceparent: 00-<trace_id:32hex>-<parent_span_id:16hex>-<flags:2hex>
#            version  trace-id         parent-span-id      sampled bit
```

## Implementation

```python
from opentelemetry import trace
from opentelemetry.propagate import inject, extract

tracer = trace.get_tracer("llm-gateway")


def call_downstream(url: str, payload: dict) -> dict:
    # Inject the current context into outbound headers so the next
    # service continues THIS trace instead of starting a new one.
    headers: dict[str, str] = {}
    inject(headers)
    return http_post(url, json=payload, headers=headers)


def handle_inbound(request) -> None:
    # Extract the propagated parent; start the local span as its child.
    ctx = extract(request.headers)
    with tracer.start_as_current_span("orchestrate", context=ctx):
        stream_llm_and_finalize_span()


def stream_llm_and_finalize_span():
    span = trace.get_current_span()
    first_token_at = None
    start = now_ms()
    for i, chunk in enumerate(llm_stream()):
        if i == 0:
            first_token_at = now_ms()
            span.set_attribute("time_to_first_token_ms", first_token_at - start)
        yield chunk
    # Finalize at stream completion, NOT at first token.
    span.set_attribute("total_stream_duration_ms", now_ms() - start)
    span.set_status(trace.StatusCode.OK)
```

## Dashboards & Alerts

- Dashboard: trace completeness — fraction of traces whose span count matches the expected hop count for the route, surfacing where propagation drops
- Dashboard: end-to-end latency waterfall per route, each hop and the streaming span as distinct children so the slow hop is obvious
- Alert rule: orphan-span rate (spans with no resolvable parent) exceeds 1% over a rolling hour
- Alert rule: streaming spans whose `total_stream_duration_ms ≈ time_to_first_token_ms` across many spans, indicating spans finalized at first byte

## Common Failure Modes

- **Each service starting a new root trace.** One request becomes several disconnected traces; end-to-end latency attribution is impossible.
- **Closing the LLM span at first token.** Records TTFT as the full duration and loses actual generation time, output token count, and mid-stream errors or client disconnects.
- **Independent per-hop sampling.** A trace sampled-in at the edge but sampled-out downstream yields trees with missing branches; the head decision must propagate.
- **Propagating on HTTP but not across async boundaries.** The trace ends at the enqueue; the consumer's work is invisible.

## Privacy & Governance

Propagation carriers (`traceparent`/`tracestate`, and optional `baggage`) carry only trace/span identifiers and sampling flags — no business data — so they need no redaction; teams should nonetheless avoid putting sensitive values in `baggage`, which is why it is optional and discouraged for anything beyond low-cardinality routing hints. Span attributes added at each hop follow the same secret-pattern scrubbing as any other span (see [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md)). Full cross-service trees are retained 30 days; trace-level summaries (duration, hop count, status, no attributes) for 90 days.

## Validation Checklist

- [ ] A trace established at the edge keeps the same `trace_id` through every downstream hop (verified by inspecting a real multi-service trace end to end)
- [ ] Inbound boundaries extract the propagated parent and start child spans, never new roots
- [ ] The sampling decision is made once at the entry point and honored by all hops
- [ ] Streaming spans are finalized at stream completion with distinct `time_to_first_token_ms` and `total_stream_duration_ms`
- [ ] Client disconnects mid-stream are recorded (`was_client_disconnect: true`) rather than logged as success
- [ ] Context is propagated across async boundaries (queue publish/consume, background jobs), not only synchronous HTTP
- [ ] The orphan-span alert has been dry-run and does not fire on normal traffic

## Relation to the Arsenal

Provides the cross-boundary and streaming discipline that [Trace Every Retrieval, Tool Call, and Agent Transition](./trace-every-agent-and-rag-step.md) depends on to actually form a single tree in a multi-service deployment. Its streaming latency fields feed [Alert on Streaming Latency SLOs](../monitoring-alerting/alert-on-streaming-latency-slos.md). Redaction of span attributes is governed by [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md). Supports the tips [Measure First-Token Latency](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md) and [Log Latency by Pipeline Stage](../../tips-and-tricks/observability/log-latency-by-pipeline-stage.md).

## Resources

Evidence for `verification_status: production-verified`: cross-service context propagation via the W3C Trace Context standard and head-based sampling are core, widely documented OpenTelemetry practices, and streaming-span finalization at completion (with separate TTFT) is standard in LLM observability platforms. The referenced tools implement OTel-compatible propagation.

- [LangSmith](../../tools/evaluation-and-observability/langsmith.md)
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)
- [OpenLLMetry](../../projects/benchmarks-and-evals/openllmetry.md)
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
