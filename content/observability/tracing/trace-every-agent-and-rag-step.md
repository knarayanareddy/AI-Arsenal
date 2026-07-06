---
id: "trace-every-agent-and-rag-step"
title: "Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer"
entry_type: observability
category: tracing
scope: production
signal_types:
  - latency
  - quality
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
  - pii
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of spans for structural/timing fields (span name, duration, status); 100% of errors for full span attribute capture; 5-10% of successful traces for full attribute capture including retrieved-chunk content and tool arguments"
  retention: "30 days for full trace trees; 90 days for trace-level summary rollups (total duration, step count, final status) with content fields stripped"
  correlation:
    - trace_id
    - request_id
    - parent_span_id
    - session_id
  redaction: "Retrieved document content and tool call arguments/results are redacted for known secret patterns before being attached as span attributes; tool arguments that plausibly contain credentials (API keys passed as tool parameters) are the highest-risk case and must never appear unredacted in a span"
  events:
    - name: "invoke_agent"
      when_emitted: "At the start of an agent's top-level execution (one per user-facing agent invocation, becoming the root or a near-root span for everything the agent does)"
      required_fields:
        - trace_id
        - gen_ai.agent.name
        - start_timestamp
        - status
      optional_fields:
        - max_steps_budget
        - steps_used
      pii_risk: internal
    - name: "execute_tool"
      when_emitted: "Every time the agent invokes a tool, before and after execution"
      required_fields:
        - trace_id
        - parent_span_id
        - tool_name
        - duration_ms
        - status
      optional_fields:
        - tool_arguments (redacted)
        - tool_result_summary
      pii_risk: internal
    - name: "retrieve"
      when_emitted: "Every retrieval call against a vector store or search index"
      required_fields:
        - trace_id
        - parent_span_id
        - query_text_hash
        - retrieved_count
        - duration_ms
      optional_fields:
        - retrieved_chunk_ids
        - similarity_scores
        - filters_applied
      pii_risk: internal

related_tools:
  - openlit
related_projects:
  - phoenix
  - opik
related_build_examples:
  - advanced-multi-agent-research
  - advanced-self-correcting-rag
  - intermediate-multi-tool-agent
related_tips:
  - trace-tool-inputs-and-outputs
  - log-retrieved-context
  - replay-the-same-trace-with-one-variable-changed
dashboards: []
alert_rules:
  - "Alert if any single trace's total span count exceeds 3x the 7-day rolling median for its agent type, indicating a possible infinite or near-infinite tool-calling loop"
common_failure_modes:
  - "Tracing only the top-level agent invocation and the final answer, with no child spans for individual retrieval or tool calls -- this makes it impossible to tell whether a bad answer came from bad retrieval, a failed tool call, or the model itself misusing correct inputs"
  - "Using one span for the entire multi-step agent run instead of one span per step, collapsing the timing breakdown that would otherwise show exactly which step consumed the latency or produced the failure"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: reviewed
---

## Overview

AI failures are frequently distributed across retrieval, tool calls, and model reasoning, and the fastest way to isolate which layer actually failed is a trace that shows every step as its own span, not a single opaque "agent ran, here's the answer" record. This entry defines how to structure that trace for agent and RAG systems specifically, building on [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md)'s per-call event as one of several child spans.

## What to Capture

- One `invoke_agent` span per top-level agent execution, as the root of everything that agent does for a single user request
- One `execute_tool` span per tool call, with clear start/end timestamps and a status distinguishing success/failure/timeout
- One `retrieve` span per retrieval call, capturing retrieved-item count and (optionally, behind the same content-capture gating as prompts) the retrieved content itself
- Every span's `trace_id` and `parent_span_id`, so the full call tree can be reconstructed and rendered as a waterfall, not just a flat list of unconnected events
- The step budget and steps actually used, so a run that terminated due to hitting its step limit is distinguishable from one that terminated normally

## Instrumentation Contract

Each event type above (`invoke_agent`, `execute_tool`, `retrieve`) is a span in the OpenTelemetry sense, related to its parent via `parent_span_id` under a shared `trace_id`. Example trace fragment for a single user request that triggers one retrieval and one tool call before answering:

```json
{
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spans": [
    {
      "span_id": "a1",
      "parent_span_id": null,
      "event_name": "invoke_agent",
      "gen_ai.agent.name": "support-triage-agent",
      "start_timestamp": "2026-07-06T14:32:00.100Z",
      "status": "success",
      "max_steps_budget": 8,
      "steps_used": 3
    },
    {
      "span_id": "a2",
      "parent_span_id": "a1",
      "event_name": "retrieve",
      "query_text_hash": "sha256:9f2a...",
      "retrieved_count": 4,
      "duration_ms": 142
    },
    {
      "span_id": "a3",
      "parent_span_id": "a1",
      "event_name": "execute_tool",
      "tool_name": "lookup_order_status",
      "duration_ms": 88,
      "status": "success"
    },
    {
      "span_id": "a4",
      "parent_span_id": "a1",
      "event_name": "gen_ai.client.inference.operation.details",
      "gen_ai.request.model": "gpt-4o-mini",
      "latency_ms": 1284,
      "status": "success"
    }
  ]
}
```

## Implementation

```python
from opentelemetry import trace

tracer = trace.get_tracer("agent-service", "1.0.0")


def run_agent(user_request: str, agent_name: str, max_steps: int = 8):
    with tracer.start_as_current_span("invoke_agent") as agent_span:
        agent_span.set_attribute("gen_ai.agent.name", agent_name)
        agent_span.set_attribute("max_steps_budget", max_steps)

        steps_used = 0
        # ... agent loop ...
        for step in agent_loop(user_request, max_steps):
            steps_used += 1
            if step.kind == "retrieve":
                with tracer.start_as_current_span("retrieve") as span:
                    span.set_attribute("query_text_hash", hash_query(step.query))
                    span.set_attribute("retrieved_count", len(step.results))
                    span.set_attribute("duration_ms", step.duration_ms)
            elif step.kind == "tool_call":
                with tracer.start_as_current_span("execute_tool") as span:
                    span.set_attribute("tool_name", step.tool_name)
                    span.set_attribute("duration_ms", step.duration_ms)
                    span.set_attribute("status", step.status)

        agent_span.set_attribute("steps_used", steps_used)
        agent_span.set_attribute("status", "success")
```

## Dashboards & Alerts

- Dashboard: trace waterfall view for any single request, showing the full `invoke_agent` → `retrieve`/`execute_tool` → `gen_ai.client.inference.operation.details` tree with per-span duration
- Dashboard: step-count distribution per agent type, to establish a normal baseline before setting anomaly thresholds
- Alert rule: any single trace's total span count exceeds 3x the 7-day rolling median for its agent type — a strong signal of a near-infinite or runaway tool-calling loop, per [Add a Max Step Budget to Every Agent](../../tips-and-tricks/agents-and-orchestration/add-a-max-step-budget-to-every-agent.md)
- Alert rule: `retrieve` span `retrieved_count` is 0 for more than 10% of traces over a 1-hour window, indicating a possible retrieval-pipeline regression

## Common Failure Modes

- **Tracing only the top-level agent invocation and the final answer, with no child spans.** This makes it impossible to tell whether a bad answer came from bad retrieval, a failed tool call, or the model misusing correct inputs — exactly the debugging speed problem this vertical exists to solve.
- **Using one span for an entire multi-step run instead of one span per step.** This collapses the timing breakdown that would otherwise show which specific step consumed the latency or produced the failure.

## Privacy & Governance

Retrieved document content and tool call arguments/results are `pii`-risk data by default (documents may contain user data; tool arguments may contain account identifiers or, in the worst case, credentials passed as parameters) and are redacted for known secret patterns before being attached as span attributes, per [Redact Secrets and Sensitive Data Before Writing to Traces](../../tips-and-tricks/debugging-and-observability/redact-secrets-before-tracing.md). Full trace trees with content are retained for 30 days; after that, traces are rolled up to summary form (duration, step count, status) with content fields stripped, retained for 90 days. Access to full, content-carrying trace trees is restricted to engineers actively debugging a specific incident or conducting a scheduled eval-dataset review, via the trace store's project-level access controls — not open by default to the whole engineering organization.

## Validation Checklist

- [ ] Every retrieval call produces its own `retrieve` span, not just a mention in the final `invoke_agent` span's attributes
- [ ] Every tool call produces its own `execute_tool` span with accurate start/end timestamps
- [ ] All spans within one user request share the same `trace_id` and correctly nest via `parent_span_id`
- [ ] A trace where the agent hits its step budget is distinguishable in the data from one that terminated normally
- [ ] Retrieved content and tool arguments are redacted before being attached as span attributes
- [ ] The trace waterfall view actually renders a readable call tree from this data, not a flat unordered list
- [ ] Span-count anomaly alerting is tuned against real baseline data, not an arbitrary guessed threshold
- [ ] Full-content trace retention actually expires at 30 days (verified against store contents, not just the stated policy)

## Relation to the Arsenal

Builds directly on [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md), treating that event as one of several child span types within a larger trace tree. [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md) consumes this trace data to build its regression monitors. Demonstrated concretely in [Multi-Agent Research System](../../build-examples/agent-systems/advanced-multi-agent-research.md) and [Self-Correcting RAG](../../build-examples/rag-systems/advanced-self-correcting-rag.md), both of which have multi-step control flow that this tracing pattern is designed to make debuggable. Complementary tips: [Trace Tool Call Arguments and Return Values](../../tips-and-tricks/debugging-and-observability/trace-tool-inputs-and-outputs.md) and [Log Retrieved Context Beside Every Answer](../../tips-and-tricks/debugging-and-observability/log-retrieved-context.md).

## Resources

Evidence for `verification_status: production-verified`: per-step span tracing (one span per retrieval call, one per tool call) is a standard, widely documented production observability pattern for agent and RAG systems, corroborated by the OpenTelemetry GenAI Semantic Conventions SIG's own `invoke_agent`/`execute_tool` span definitions (in active use by frameworks including LangChain, CrewAI, AutoGen, and AG2 as of early 2026) and by multiple named observability platforms in this catalog (Phoenix, Opik, OpenLIT) that render exactly this span-tree shape as their core trace-waterfall UI.

- [OpenTelemetry for AI Agents (2026)](https://zylos.ai/research/2026-02-28-opentelemetry-ai-agent-observability) — describes `invoke_agent`/`execute_tool` span conventions this entry follows
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md)
- [Opik](../../projects/benchmarks-and-evals/opik.md)
- [OpenLIT](../../projects/benchmarks-and-evals/openlit.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
