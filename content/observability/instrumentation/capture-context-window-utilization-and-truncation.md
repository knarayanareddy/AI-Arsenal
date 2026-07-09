---
id: "capture-context-window-utilization-and-truncation"
title: "Capture Context-Window Utilization and Truncation on Every Call, So Silent Prompt Clipping Is Visible Before It Degrades Output"
entry_type: observability
category: instrumentation
scope: production
signal_types:
  - quality
  - cost
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-08"

instrumentation_contract:
  sampling: "100% of calls for the numeric utilization fields (prompt_tokens, context_window, utilization_ratio, was_truncated) -- these are cheap integers and truncation is exactly the rare, high-impact event a sample would miss; 5-10% of calls for capturing the full component breakdown (per-section token counts) which is more verbose"
  retention: "30 days of per-call utilization line items; 13 months of daily utilization percentiles (p50/p95/p99) and truncation-rate rollups for capacity and prompt-budget planning"
  correlation:
    - request_id
    - feature_name
    - prompt_version
    - model
  redaction: "Utilization line items carry only token counts and boolean/enum flags, never prompt or response content, so no content redaction is required; the optional per-component breakdown names sections (system_prompt, retrieved_context, history, tools) by label only, not by content"
  events:
    - name: "context_utilization"
      when_emitted: "Immediately before dispatching each LLM call, computed from the assembled prompt and the model's known context window, and updated with was_truncated after the client library reports any server-side truncation"
      required_fields:
        - request_id
        - model
        - prompt_tokens
        - context_window
        - utilization_ratio
        - was_truncated
      optional_fields:
        - feature_name
        - prompt_version
        - max_output_tokens_reserved
        - component_breakdown
        - truncation_strategy
      pii_risk: internal
related_tools:
  - langsmith
related_projects:
  - langfuse
  - helicone
related_tips:
  - budget-context-before-adding-tools
  - compress-retrieved-context-before-generation
  - cap-max-output-tokens-per-request
related_build_examples: []
dashboards:
  - "Context-window utilization percentiles (p50/p95/p99) per feature and prompt_version over time, with the model's context limit drawn as a reference line so creeping utilization is visible before it hits the ceiling"
  - "Truncation rate per feature -- the fraction of calls where was_truncated is true -- which should normally be zero or near-zero in a well-budgeted feature"
alert_rules:
  - "Alert if truncation rate for any feature exceeds 1% of calls over a rolling hour, since truncation silently discards prompt content (often the oldest history or the tail of retrieved context) and degrades output without raising an error"
  - "Alert if p95 context utilization for any feature crosses 85% of the model's window, giving headroom to react (trim context, raise the budget, or switch to a larger-window model) before truncation starts occurring"
common_failure_modes:
  - "Only capturing total prompt_tokens without the context_window denominator, so you can see tokens rising but cannot tell how close to the limit you are or when truncation becomes imminent -- utilization_ratio is the field that makes the signal actionable"
  - "Relying on the provider to error on overflow, when most APIs and client libraries silently truncate (drop tokens from one end) instead of failing, so the regression manifests only as quietly worse answers with no error to alert on"
  - "Measuring utilization only in aggregate rather than per prompt_version, which hides that a specific prompt change (a longer system prompt, more few-shot examples, or a larger retrieval top-k) pushed one feature over the edge"
added_date: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

Context windows fail silently. When an assembled prompt exceeds the model's window, most provider APIs and client libraries do not error — they truncate, dropping tokens from one end (often the oldest conversation history or the tail of retrieved context) and returning a normal-looking response built on incomplete input. The symptom is subtly worse answers, missing information the user knows they provided, or an agent that "forgets" earlier steps — none of which raises an exception. This entry defines the instrumentation that turns that invisible failure into a first-class, alertable signal, and gives early warning as utilization creeps toward the ceiling.

## What to Capture

- `prompt_tokens` and `context_window` as separate fields — the raw token count is meaningless without the model-specific limit it is measured against
- `utilization_ratio` (`prompt_tokens / context_window`) — the derived field that makes the signal comparable across models and directly alertable
- `was_truncated` — a boolean set true whenever the assembled prompt was clipped to fit, either by your own pre-call budgeting or by the provider server-side; this is the rare, high-impact event that must never be sampled away
- `max_output_tokens_reserved` — how much of the window you held back for the completion, since input plus reserved output is what actually competes for the window, not input alone
- `component_breakdown` (optional) — per-section token counts labelled `system_prompt`, `retrieved_context`, `history`, `tools`, so when utilization is high you can immediately see which component is the driver rather than guessing
- `prompt_version` — because a single prompt change (longer system prompt, higher retrieval top-k, more few-shot examples) is the usual cause of a utilization regression

## Instrumentation Contract

Example `context_utilization` event, computed immediately before dispatching the call:

```json
{
  "event_name": "context_utilization",
  "timestamp": "2026-07-08T14:02:11.000Z",
  "request_id": "req_5c2a9f10",
  "feature_name": "support-triage",
  "prompt_version": "support-triage-v4",
  "model": "gpt-4o-mini",
  "prompt_tokens": 118940,
  "context_window": 128000,
  "utilization_ratio": 0.929,
  "max_output_tokens_reserved": 4096,
  "was_truncated": false,
  "truncation_strategy": "drop-oldest-history",
  "component_breakdown": {
    "system_prompt": 1840,
    "retrieved_context": 96500,
    "history": 18200,
    "tools": 2400
  }
}
```

Utilization and headroom math:

```text
utilization_ratio = prompt_tokens / context_window
effective_headroom = context_window - prompt_tokens - max_output_tokens_reserved
# truncation becomes necessary when effective_headroom < 0
```

## Implementation

```python
from dataclasses import dataclass, field

CONTEXT_WINDOWS = {
    "gpt-4o-mini": 128_000,
    # ... other models
}


@dataclass
class ContextUtilization:
    request_id: str
    model: str
    prompt_tokens: int
    context_window: int
    utilization_ratio: float
    was_truncated: bool
    max_output_tokens_reserved: int = 0
    feature_name: str | None = None
    prompt_version: str | None = None
    component_breakdown: dict[str, int] = field(default_factory=dict)


def emit_context_utilization(request_id: str, model: str, prompt_tokens: int,
                             reserved_output: int, components: dict[str, int],
                             feature_name: str | None = None,
                             prompt_version: str | None = None) -> ContextUtilization:
    window = CONTEXT_WINDOWS[model]
    headroom = window - prompt_tokens - reserved_output
    item = ContextUtilization(
        request_id=request_id,
        model=model,
        prompt_tokens=prompt_tokens,
        context_window=window,
        utilization_ratio=round(prompt_tokens / window, 4),
        was_truncated=headroom < 0,
        max_output_tokens_reserved=reserved_output,
        feature_name=feature_name,
        prompt_version=prompt_version,
        component_breakdown=components,
    )
    write_observability_event(item)  # persist to your telemetry store
    return item
```

## Dashboards & Alerts

- Dashboard: utilization percentiles (p50/p95/p99) per feature and `prompt_version`, with the context limit drawn as a reference line, so creeping utilization is visible well before it hits the ceiling
- Dashboard: truncation rate per feature (fraction of calls with `was_truncated: true`), which should be zero or near-zero in a well-budgeted feature
- Dashboard: stacked `component_breakdown` so a spike is immediately attributable to retrieval, history, tools, or the system prompt
- Alert rule: truncation rate for any feature exceeds 1% of calls over a rolling hour
- Alert rule: p95 utilization crosses 85% of the window, giving time to react before truncation starts

## Common Failure Modes

- **Capturing `prompt_tokens` without `context_window`.** You can see tokens rising but not how close to the limit you are; `utilization_ratio` is the field that makes the signal actionable and cross-model comparable.
- **Trusting the provider to error on overflow.** Most APIs and client libraries silently truncate rather than fail, so the regression shows up only as quietly worse output with no exception to catch.
- **Aggregate-only measurement.** Without per-`prompt_version` breakdown, you cannot tell that a specific prompt or retrieval-top-k change pushed a feature over the edge.

## Privacy & Governance

Utilization line items contain only token counts and boolean/enum flags — no prompt or response content — so no content redaction is required. The optional `component_breakdown` labels sections by fixed name (`system_prompt`, `retrieved_context`, `history`, `tools`) with integer counts only, never their text. Per-call line items are retained for 30 days for debugging; daily utilization percentiles and truncation-rate rollups (no per-call content) are retained for 13 months to support prompt-budget and capacity planning. Correlation identifiers follow the same internal-sensitivity access boundary as other instrumentation fields.

## Validation Checklist

- [ ] Every LLM call emits a utilization event with both `prompt_tokens` and `context_window` populated
- [ ] `utilization_ratio` is computed as a derived field, not left for dashboards to recompute inconsistently
- [ ] `was_truncated` is set true both when your own budgeting clips the prompt and when the provider truncates server-side (verified by forcing an overflow in a test)
- [ ] `max_output_tokens_reserved` is included so effective headroom (input + reserved output vs window) is computable
- [ ] `prompt_version` is populated so a utilization regression can be tied to a specific prompt change
- [ ] The truncation-rate alert has been dry-run and does not fire on normal traffic, and the p95-utilization alert fires before truncation in a load test
- [ ] A dashboard shows per-component token breakdown, not just a single total

## Relation to the Arsenal

Extends the per-call record defined in [Capture a Structured Event for Every LLM Call](./capture-the-llm-call-event.md) with window-relative fields that the base call event does not compute. Its cost dimension complements [Attribute Every LLM Call's Cost to a Feature](../cost-usage/instrument-cost-per-feature.md), since context bloat is a leading cost driver. Directly supports the tips [Budget Context Before Adding Tools](../../tips-and-tricks/agent-engineering/budget-context-before-adding-tools.md), [Compress Retrieved Context Before Generation](../../tips-and-tricks/cost-and-performance/compress-retrieved-context-before-generation.md), and [Cap Max Output Tokens Per Request](../../tips-and-tricks/cost-and-performance/cap-max-output-tokens-per-request.md).

## Resources

Evidence for `verification_status: production-verified`: token-usage and context-window telemetry are standard fields in production LLM observability platforms, and silent server-side truncation on context overflow is documented behavior of major provider client libraries. The tools and platforms referenced below expose prompt-token and context metrics directly.

- [LangSmith](../../tools/evaluation-and-observability/langsmith.md)
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)
- [Helicone](../../projects/benchmarks-and-evals/helicone.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
