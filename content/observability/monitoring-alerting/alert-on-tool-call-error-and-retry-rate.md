---
id: "alert-on-tool-call-error-and-retry-rate"
title: "Alert on Tool-Call Error and Retry Rate Per Tool, Because an Agent That Retries Around a Broken Tool Looks Healthy While Cost and Latency Climb"
entry_type: observability
category: monitoring-alerting
scope: production
signal_types:
  - reliability
  - latency
  - cost
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-08"

instrumentation_contract:
  sampling: "100% of tool invocations for outcome fields (tool_name, outcome, attempt_number, latency_ms) -- tool errors and retries are exactly the low-frequency, high-cost events that sampling would hide, and the per-tool denominator must be exact to compute a meaningful error rate"
  retention: "30 days of per-invocation tool outcomes for debugging retry storms and cascading failures; 13 months of daily per-tool error-rate, retry-rate, and p95-latency rollups for reliability trending and capacity planning"
  correlation:
    - request_id
    - trace_id
    - agent_run_id
    - tool_name
  redaction: "Tool arguments and results are the sensitive part (they may carry credentials passed as parameters, PII in search queries, or private data in results) and are NOT stored on this outcome event; only the tool name, outcome enum, attempt number, and timing are recorded here -- full argument/result capture lives on the redacted span defined by the tracing entry, not on this metric event"
  events:
    - name: "tool_invocation_outcome"
      when_emitted: "After every tool/function call attempt an agent makes, including each individual retry attempt as its own event, recording success, error class, or timeout"
      required_fields:
        - request_id
        - agent_run_id
        - tool_name
        - outcome
        - attempt_number
        - latency_ms
      optional_fields:
        - trace_id
        - error_class
        - error_code
        - was_final_attempt
        - fell_back_to
      pii_risk: internal
related_tools:
  - langsmith
related_projects:
  - langfuse
related_tips:
  - cap-agent-tool-retries
  - define-fallbacks-for-tool-failures
  - detect-repeated-tool-calls
related_build_examples: []
dashboards:
  - "Per-tool error rate and retry rate over time, so a single degrading dependency (a flaky search API, a rate-limited provider) is isolated rather than hidden in an overall agent success number"
  - "Retry-amplification factor per tool (total attempts / distinct logical calls), which reveals when the agent is spending 3-5 physical calls per intended action and quietly multiplying cost and latency"
alert_rules:
  - "Alert if any tool's error rate exceeds a per-tool threshold (e.g. 5% over a rolling 15 minutes) while overall agent success stays flat, since retries can mask a broken tool in the top-line success metric while cost and latency silently climb"
  - "Alert if retry-amplification factor for any tool exceeds ~2.0 over a rolling hour, indicating the agent is looping on a failing tool rather than failing fast or falling back"
  - "Alert if timeout rate for any tool spikes, since timeouts consume the full timeout budget of latency before failing and are the most expensive failure mode per attempt"
common_failure_modes:
  - "Measuring only end-to-end agent success and never per-tool outcomes, so a broken tool that the agent retries around is invisible until users notice slowness or the cost dashboard spikes -- the agent 'succeeded', just expensively and slowly"
  - "Counting a logical tool call as one event regardless of retries, which hides retry amplification entirely; each physical attempt must be its own event with an attempt_number"
  - "Alerting on absolute error counts instead of per-tool rates, so a high-traffic tool's normal error volume drowns out a low-traffic tool that has started failing 100% of the time"
  - "Not recording fallbacks (fell_back_to), so when a primary tool fails and a degraded fallback silently takes over, the quality impact is untraceable"
added_date: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

Agentic systems are unusually good at hiding broken dependencies. When a tool call fails, a well-built agent retries, tries a fallback, or reasons its way to a different path — so the top-line "did the agent complete the task" metric stays green while, underneath, the agent is making three to five physical calls per intended action, burning latency budget and tokens on every retry. The failure surfaces weeks later as "the agent got slow and expensive," with no obvious cause. This entry defines per-tool outcome instrumentation and the alerts that catch a degrading tool while it is still one tool, not a system-wide latency and cost regression.

## What to Capture

- `tool_name` and `outcome` (`success` / `error` / `timeout`) on every invocation — the per-tool denominator is what makes an error *rate* computable instead of a meaningless absolute count
- `attempt_number` with **each physical retry emitted as its own event** — collapsing retries into one logical event is exactly what hides retry amplification
- `latency_ms` per attempt, since timeouts (the most expensive failure mode) consume the entire latency budget before failing
- `error_class` / `error_code` where available, to distinguish transient (rate-limit, 503) from permanent (bad-request, auth) failures — they demand different responses
- `was_final_attempt` and `fell_back_to`, so a silent switch to a degraded fallback path is traceable to a quality impact later
- `agent_run_id` correlation, so a retry storm can be tied to the specific agent run that caused it

## Instrumentation Contract

Example `tool_invocation_outcome` events for a call that failed once then succeeded:

```json
{
  "event_name": "tool_invocation_outcome",
  "timestamp": "2026-07-08T16:03:10.000Z",
  "request_id": "req_c19a",
  "agent_run_id": "run_77f2",
  "tool_name": "web_search",
  "outcome": "timeout",
  "attempt_number": 1,
  "latency_ms": 10000,
  "error_class": "transient",
  "was_final_attempt": false
}
```
```json
{
  "event_name": "tool_invocation_outcome",
  "tool_name": "web_search",
  "outcome": "success",
  "attempt_number": 2,
  "latency_ms": 820,
  "was_final_attempt": true
}
```

Rate and amplification math:

```text
error_rate(tool)            = (errors + timeouts) / total_attempts(tool)
retry_amplification(tool)   = total_attempts(tool) / distinct_logical_calls(tool)
# healthy: amplification ~1.0; a broken-but-retried tool pushes it toward 2-5
```

## Implementation

```python
from dataclasses import dataclass


@dataclass
class ToolOutcome:
    request_id: str
    agent_run_id: str
    tool_name: str
    outcome: str        # "success" | "error" | "timeout"
    attempt_number: int
    latency_ms: float
    error_class: str | None = None
    was_final_attempt: bool = False
    fell_back_to: str | None = None


def invoke_tool_with_observability(tool, args, max_attempts=3):
    for attempt in range(1, max_attempts + 1):
        start = now_ms()
        try:
            result = tool.call(args, timeout_s=10)
            emit(ToolOutcome(request_id_var.get(), run_id_var.get(), tool.name,
                             "success", attempt, now_ms() - start,
                             was_final_attempt=True))
            return result
        except TimeoutError:
            emit(ToolOutcome(request_id_var.get(), run_id_var.get(), tool.name,
                             "timeout", attempt, now_ms() - start,
                             error_class="transient",
                             was_final_attempt=(attempt == max_attempts)))
        except Exception as e:
            emit(ToolOutcome(request_id_var.get(), run_id_var.get(), tool.name,
                             "error", attempt, now_ms() - start,
                             error_class=classify(e),
                             was_final_attempt=(attempt == max_attempts)))
    raise ToolExhaustedError(tool.name)
```

## Dashboards & Alerts

- Dashboard: per-tool error rate and retry rate over time, isolating a single degrading dependency
- Dashboard: retry-amplification factor per tool (total attempts / distinct logical calls)
- Dashboard: per-tool p95 latency, with timeout rate overlaid
- Alert rule: any tool's error rate exceeds ~5% over a rolling 15 minutes while overall agent success stays flat
- Alert rule: retry-amplification for any tool exceeds ~2.0 over a rolling hour
- Alert rule: timeout rate for any tool spikes above its baseline

## Common Failure Modes

- **Measuring only end-to-end agent success.** A tool the agent retries around is invisible until users notice slowness or cost spikes — the agent "succeeded," just expensively.
- **Collapsing retries into one event.** Retry amplification disappears; each physical attempt must carry its own `attempt_number`.
- **Alerting on absolute counts, not per-tool rates.** A high-traffic tool's normal errors drown out a low-traffic tool failing 100% of the time.
- **Not recording fallbacks.** A silent switch to a degraded fallback path leaves the quality impact untraceable.

## Privacy & Governance

This outcome event deliberately carries **no** tool arguments or results — only `tool_name`, the outcome enum, `attempt_number`, and timing — because arguments and results are the sensitive part (credentials passed as parameters, PII in search queries, private data in results). Full, redacted argument/result capture belongs on the span defined by [Trace Every Retrieval, Tool Call, and Agent Transition](../tracing/trace-every-agent-and-rag-step.md), governed by [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md). Keeping the metric event content-free lets it be retained and queried broadly (30 days per-invocation, 13 months of rollups) without inheriting the sensitivity of the trace payload.

## Validation Checklist

- [ ] Every tool attempt emits an outcome event, including each retry as a separate event with an incrementing `attempt_number`
- [ ] Error rate is computed per tool (rate, not absolute count), with an exact per-tool denominator
- [ ] Timeouts are a distinct outcome from errors, since their latency cost differs
- [ ] `fell_back_to` is populated whenever a fallback path is taken
- [ ] The outcome event contains no tool arguments or results (verified by inspecting stored events for content leakage)
- [ ] The per-tool error-rate alert fires in a fault-injection test where one tool is forced to fail, even while overall agent success stays green
- [ ] The retry-amplification alert has been dry-run and does not fire on normal single-attempt traffic

## Relation to the Arsenal

Consumes the tool-span structure produced by [Trace Every Retrieval, Tool Call, and Agent Transition](../tracing/trace-every-agent-and-rag-step.md) and turns it into alertable per-tool reliability metrics, complementing the quality/cost focus of [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md). A firing tool-error alert is a primary entry point into the [Runbook for Agent and RAG Incidents](../incident-response/runbook-for-agent-and-rag-incidents.md). Operationalizes the tips [Cap Agent Tool Retries](../../tips-and-tricks/agent-engineering/cap-agent-tool-retries.md), [Define Fallbacks for Tool Failures](../../tips-and-tricks/agent-engineering/define-fallbacks-for-tool-failures.md), and [Detect Repeated Tool Calls](../../tips-and-tricks/agent-engineering/detect-repeated-tool-calls.md).

## Resources

Evidence for `verification_status: production-verified`: per-tool error and retry monitoring, retry-amplification tracking, and rate-based (not count-based) alerting are standard reliability practices for agentic systems, directly observable via the tool-span data captured by the platforms referenced below.

- [LangSmith](../../tools/evaluation-and-observability/langsmith.md)
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
