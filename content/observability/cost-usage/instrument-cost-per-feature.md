---
id: "instrument-cost-per-feature"
title: "Attribute Every LLM Call's Cost to a Feature, User, and Prompt Version, Not Just a Monthly Invoice Total"
entry_type: observability
category: cost-usage
scope: production
signal_types:
  - cost
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of calls -- cost attribution requires every call, not a sample, since aggregates computed from a sample can hide small-but-frequent regressions"
  retention: "13 months of per-feature/per-model daily cost rollups (for trend and budget planning); 90 days of per-request cost line items for detailed attribution debugging"
  correlation:
    - request_id
    - feature_name
    - user_id
    - tenant_id
    - prompt_version
  redaction: "Cost line items carry no prompt/response content, only model identity, token counts, and computed cost -- no redaction needed for the cost data itself; user_id/tenant_id correlation fields follow the same access-control boundary as other internal-sensitivity identifiers"
  events:
    - name: "cost_line_item"
      when_emitted: "Immediately after every LLM call completes, computed from the same token-usage data captured in the underlying gen_ai.client.inference.operation.details event"
      required_fields:
        - request_id
        - feature_name
        - model
        - input_tokens
        - output_tokens
        - cost_usd
      optional_fields:
        - user_id
        - tenant_id
        - prompt_version
        - cache_hit
        - was_successful_outcome
      pii_risk: internal

related_tools:
  - helicone
related_projects:
  - braintrust
related_build_examples:
  - intermediate-production-rag-api
related_tips:
  - track-cost-per-feature
  - track-cost-per-successful-outcome
  - use-semantic-cache-for-repeated-questions
dashboards: []
alert_rules:
  - "Alert if cost-per-successful-outcome for any feature increases more than 25% week-over-week, since this is the metric that actually reflects unit-economics health, not raw spend, which can rise legitimately with growth"
  - "Alert if any single user or tenant's daily cost exceeds a configurable hard cap, blocking further requests at the proxy/middleware layer rather than at the LLM call itself, since blocking after tokens are already billed is too late"
common_failure_modes:
  - "Tracking total monthly spend without per-feature or per-user attribution, so a cost regression is visible only as 'the bill went up' with no way to identify which feature, prompt change, or user behavior caused it"
  - "Alerting on raw cost instead of cost-per-successful-outcome, which makes legitimate usage growth indistinguishable from a genuine unit-economics regression (e.g. a retry loop or context-bloat bug that increases cost per request without increasing successful outcomes)"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: reviewed
---

## Overview

AI unit economics can break silently: a prompt change that grows context length, a retrieval step that adds too much retrieved text, or an agent that retries more often than expected can each multiply cost before anyone notices a quality change, because the symptom shows up on an invoice weeks later, not as an obvious functional regression. This entry defines the instrumentation that catches this immediately instead of a month later.

## What to Capture

- `feature_name`, `model`, and `prompt_version` on every cost line item — without these, a monthly total tells you spend changed but not why
- `input_tokens` and `output_tokens` separately, never a single combined token count, since input and output pricing differ substantially and hide different cost drivers (prompt bloat vs. verbose completions)
- `user_id`/`tenant_id` when per-user cost caps or fair-use enforcement matters, correlated so a single account driving disproportionate spend is identifiable
- `was_successful_outcome` — a boolean or categorical field capturing whether the request actually achieved its purpose, which is what makes cost-per-successful-outcome computable instead of just cost-per-request
- `cache_hit` — whether this request was served from a semantic or exact cache, since cache hit rate is one of the highest-leverage cost levers and needs its own visibility

## Instrumentation Contract

Example `cost_line_item` event, computed immediately after the underlying LLM call event:

```json
{
  "event_name": "cost_line_item",
  "timestamp": "2026-07-06T16:45:00.000Z",
  "request_id": "req_8f3a1c2b",
  "feature_name": "support-triage",
  "model": "gpt-4o-mini",
  "input_tokens": 842,
  "output_tokens": 156,
  "cost_usd": 0.000221,
  "user_id": "user_9931",
  "tenant_id": "tenant_042",
  "prompt_version": "support-triage-v3",
  "cache_hit": false,
  "was_successful_outcome": true
}
```

Token cost math this event's `cost_usd` field is computed from:

```text
request_cost = (input_tokens / 1_000_000 * input_price_per_1m)
             + (output_tokens / 1_000_000 * output_price_per_1m)

feature_cost = sum(request_cost for all calls in a workflow)
cost_per_successful_outcome = total_feature_cost / count(was_successful_outcome == true)
```

## Implementation

```python
from dataclasses import dataclass

PRICING = {
    "gpt-4o-mini": {"input_per_1m": 0.15, "output_per_1m": 0.60},
    # ... other models
}


@dataclass
class CostLineItem:
    request_id: str
    feature_name: str
    model: str
    input_tokens: int
    output_tokens: int
    cost_usd: float
    user_id: str | None = None
    tenant_id: str | None = None
    prompt_version: str | None = None
    cache_hit: bool = False
    was_successful_outcome: bool | None = None


def compute_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    pricing = PRICING[model]
    return (input_tokens / 1_000_000 * pricing["input_per_1m"]) + \
           (output_tokens / 1_000_000 * pricing["output_per_1m"])


def emit_cost_line_item(request_id: str, feature_name: str, model: str,
                         usage, prompt_version: str | None = None,
                         user_id: str | None = None, cache_hit: bool = False) -> CostLineItem:
    cost = 0.0 if cache_hit else compute_cost(model, usage.prompt_tokens, usage.completion_tokens)
    item = CostLineItem(
        request_id=request_id,
        feature_name=feature_name,
        model=model,
        input_tokens=usage.prompt_tokens,
        output_tokens=usage.completion_tokens,
        cost_usd=cost,
        user_id=user_id,
        prompt_version=prompt_version,
        cache_hit=cache_hit,
    )
    write_cost_event(item)  # persist to your cost-tracking store
    return item
```

## Dashboards & Alerts

- Dashboard: cost per feature over time, with cache hit rate overlaid to show how much of any change is attributable to caching behavior versus genuine usage/prompt changes
- Dashboard: cost-per-successful-outcome trend per feature — the unit-economics health metric, distinct from raw spend
- Alert rule: cost-per-successful-outcome for any feature increases more than 25% week-over-week
- Alert rule: any single user/tenant's daily cost exceeds a configurable hard cap — enforced at the proxy/middleware layer, before tokens are billed, not after

## Common Failure Modes

- **Tracking only total monthly spend with no per-feature/per-user attribution.** A cost regression shows up only as "the bill went up," with no way to identify the cause — this is the single biggest reason cost regressions are caught late.
- **Alerting on raw cost instead of cost-per-successful-outcome.** This makes legitimate growth (more users, more usage) indistinguishable from a genuine regression (a retry loop, context bloat) that increases cost without increasing value delivered.

## Privacy & Governance

Cost line items carry no prompt or response content — only model identity, token counts, and computed cost — so no content redaction is needed for this data specifically. `user_id`/`tenant_id` correlation fields are `internal`-sensitivity identifiers, not raw PII, but access to per-user cost breakdowns should still be limited to engineers and finance/ops roles with a legitimate need, not broadly available, since per-user usage patterns can reveal behavioral information even without raw content. Per-request cost line items are retained for 90 days for attribution debugging; daily rollups (feature/model level, no user-level granularity) are retained for 13 months to support trend analysis and budget planning without indefinitely retaining user-level usage detail.

## Validation Checklist

- [ ] Every LLM call emits a cost line item with `feature_name` and `model` populated, not left null
- [ ] Input and output tokens are tracked as separate fields, not combined into one number
- [ ] Cost-per-successful-outcome is computable, meaning `was_successful_outcome` is populated on a meaningful fraction of requests
- [ ] Per-user/per-tenant daily cost caps are enforced at the proxy/middleware layer, verified by testing that a request is actually blocked once the cap is hit
- [ ] Cache hits are recorded with `cache_hit: true` and correctly show `cost_usd: 0` (or the reduced cache-serving cost, if non-zero)
- [ ] A dashboard exists showing cost trend per feature, not just a single aggregate number
- [ ] The week-over-week cost-per-successful-outcome alert has been dry-run against historical data and does not fire on normal growth patterns

## Relation to the Arsenal

Consumes token-usage data from the same underlying call event defined in [Capture a Structured Event for Every LLM Call](../instrumentation/capture-the-llm-call-event.md), computing cost as a derived field rather than a separately captured one. Its cost signal feeds directly into [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md)'s cost-per-feature alert rule. Demonstrated in a production-shaped context by [Production RAG API](../../build-examples/rag-systems/intermediate-production-rag-api.md). Complementary tips: [Track Cost Per Feature](../../tips-and-tricks/cost-and-performance/track-cost-per-feature.md), [Track Cost Per Successful Outcome](../../tips-and-tricks/cost-and-performance/track-cost-per-successful-outcome.md), and [Use a Semantic Cache for Repeated Questions](../../tips-and-tricks/cost-and-performance/use-semantic-cache-for-repeated-questions.md).

## Resources

Evidence for `verification_status: production-verified`: per-feature and per-user cost attribution, plus cost-per-successful-outcome as the unit-economics health metric (rather than raw spend), are standard, widely documented practices in production LLM engineering, implemented directly by cost-tracking features in tools including Helicone and Braintrust referenced below.

- [Helicone](../../projects/benchmarks-and-evals/helicone.md)
- [Braintrust](../../projects/benchmarks-and-evals/braintrust.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
