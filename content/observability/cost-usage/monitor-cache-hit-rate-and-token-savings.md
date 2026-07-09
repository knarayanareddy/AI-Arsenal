---
id: "monitor-cache-hit-rate-and-token-savings"
title: "Monitor Cache Hit Rate and Realized Token Savings Per Cache Layer, So a Silently Ineffective Cache Stops Costing You Money It Was Supposed to Save"
entry_type: observability
category: cost-usage
scope: production
signal_types:
  - cost
  - latency
  - quality
verification_status: production-verified
data_sensitivity:
  - internal
last_reviewed: "2026-07-08"

instrumentation_contract:
  sampling: "100% of cache lookups for the outcome fields (cache_layer, result, tokens_saved, latency_saved_ms) -- hit rate is only meaningful with an exact denominator of total lookups, and a sampled hit rate can drift far from the true value; the optional similarity_score on semantic-cache hits is captured on 100% of hits since it is the field that reveals a mis-tuned threshold"
  retention: "30 days of per-lookup cache outcomes for debugging hit-rate regressions; 13 months of daily hit-rate, token-savings, and stale-served rollups per cache layer for ROI trending"
  correlation:
    - request_id
    - feature_name
    - cache_layer
    - prompt_version
  redaction: "Cache-outcome events record the cache layer, result enum, similarity score, and saved-token/latency counts -- not the cached content itself; the cache key (typically a content hash) is stored, but the underlying prompt/response content is governed by the same redaction rules as any other captured content and is not duplicated onto this event"
  events:
    - name: "cache_lookup_outcome"
      when_emitted: "On every cache lookup across every cache layer (exact-match, semantic, and prefix/prompt cache), recording whether it hit, missed, or was intentionally bypassed"
      required_fields:
        - request_id
        - cache_layer
        - result
        - tokens_saved
      optional_fields:
        - feature_name
        - prompt_version
        - similarity_score
        - similarity_threshold
        - latency_saved_ms
        - was_stale
      pii_risk: internal
related_tools: []
related_projects:
  - helicone
related_tips:
  - use-semantic-cache-for-repeated-questions
  - cache-stable-system-prompts
  - cache-embeddings-by-content-hash
related_build_examples: []
dashboards:
  - "Hit rate per cache layer over time (exact, semantic, prefix/prompt cache tracked separately), since a healthy aggregate can hide one layer that has silently stopped hitting after a key-format or prompt change"
  - "Realized token and dollar savings per cache layer, so the cache's actual ROI is visible rather than assumed -- a cache with a 60% hit rate on cheap-to-recompute calls may save far less than its hit rate suggests"
alert_rules:
  - "Alert if any cache layer's hit rate drops more than 20 percentage points week-over-week, since the most common cache regression is a silent key-invalidation (a prompt or key-format change that makes every lookup miss) that shows up only as rising cost, not as an error"
  - "Alert if semantic-cache stale-served rate (hits whose similarity_score is below a quality threshold but above the serving threshold) rises, indicating the similarity threshold is too loose and the cache is returning subtly wrong answers to save money"
common_failure_modes:
  - "Tracking a single aggregate hit rate across all cache layers, so a prefix cache that stopped hitting after a system-prompt edit is masked by a healthy exact-match layer, and the cost regression is invisible"
  - "Assuming hit rate equals savings, when a high hit rate on cheap short calls saves little while a low hit rate on expensive long-context calls saves a lot -- realized token savings, not hit rate, is the metric that maps to the bill"
  - "Setting a semantic-cache similarity threshold once and never monitoring the score distribution, so threshold drift silently trades answer correctness for cache savings without anyone noticing until quality complaints arrive"
added_date: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

Caching is one of the highest-leverage cost levers in an LLM system — and one of the easiest to silently break. A prompt edit changes the cache key so every lookup misses; a semantic-cache similarity threshold set too loose starts serving subtly wrong answers to save money; a prefix cache stops matching after a system-prompt tweak. None of these raise an error. The only symptom is that the bill quietly goes back up (or answer quality quietly goes down) while every dashboard shows the feature "working." This entry defines per-layer cache instrumentation so a cache's realized savings — not just its assumed presence — is a measured, alertable signal.

## What to Capture

- `cache_layer` (`exact` / `semantic` / `prefix`) and `result` (`hit` / `miss` / `bypass`) on **every lookup** — an exact denominator of total lookups is what makes hit rate meaningful, and each layer must be counted separately
- `tokens_saved` — the actual input (and output, for full-response caches) tokens a hit avoided recomputing, because *realized savings*, not hit rate, is what maps to the bill
- `latency_saved_ms` — the wall-clock a hit avoided, since caching is a latency lever as much as a cost one
- `similarity_score` and `similarity_threshold` on semantic-cache hits — the fields that reveal a mis-tuned threshold before it becomes a quality complaint
- `was_stale` — whether a hit served content past a freshness bound, so stale-serving is traceable
- `prompt_version` — because a prompt change is the single most common cause of a sudden hit-rate collapse

## Instrumentation Contract

Example `cache_lookup_outcome` event for a semantic-cache hit:

```json
{
  "event_name": "cache_lookup_outcome",
  "timestamp": "2026-07-08T16:40:22.000Z",
  "request_id": "req_d40b",
  "feature_name": "faq-answers",
  "cache_layer": "semantic",
  "result": "hit",
  "tokens_saved": 3820,
  "latency_saved_ms": 910,
  "similarity_score": 0.94,
  "similarity_threshold": 0.90,
  "was_stale": false,
  "prompt_version": "faq-v2"
}
```

Hit-rate and savings math:

```text
hit_rate(layer)        = hits(layer) / lookups(layer)
realized_savings_usd   = sum(tokens_saved * token_price) over hits
stale_served_rate      = hits where (score < quality_bar and score >= serving_threshold) / hits
# a high hit_rate with low realized_savings_usd means you're caching cheap calls
```

## Implementation

```python
from dataclasses import dataclass


@dataclass
class CacheLookupOutcome:
    request_id: str
    cache_layer: str      # "exact" | "semantic" | "prefix"
    result: str           # "hit" | "miss" | "bypass"
    tokens_saved: int
    latency_saved_ms: float = 0.0
    similarity_score: float | None = None
    similarity_threshold: float | None = None
    was_stale: bool = False
    feature_name: str | None = None


def semantic_cache_lookup(query_embedding, threshold, would_cost_tokens) -> CacheLookupOutcome:
    match = vector_store.nearest(query_embedding)
    if match and match.score >= threshold:
        outcome = CacheLookupOutcome(
            request_id=request_id_var.get(), cache_layer="semantic", result="hit",
            tokens_saved=would_cost_tokens, latency_saved_ms=estimate_saved_latency(),
            similarity_score=match.score, similarity_threshold=threshold)
    else:
        outcome = CacheLookupOutcome(
            request_id=request_id_var.get(), cache_layer="semantic", result="miss",
            tokens_saved=0, similarity_score=(match.score if match else None),
            similarity_threshold=threshold)
    emit(outcome)
    return outcome
```

## Dashboards & Alerts

- Dashboard: hit rate per cache layer over time (exact / semantic / prefix tracked separately)
- Dashboard: realized token and dollar savings per layer — the true ROI, not the assumed one
- Dashboard: semantic-cache similarity-score distribution vs the serving threshold
- Alert rule: any layer's hit rate drops more than ~20 percentage points week-over-week (silent key-invalidation)
- Alert rule: semantic-cache stale-served rate rises (threshold too loose, trading correctness for savings)

## Common Failure Modes

- **Single aggregate hit rate across all layers.** A prefix cache that stopped hitting after a system-prompt edit is masked by a healthy exact-match layer.
- **Assuming hit rate equals savings.** A high hit rate on cheap short calls saves little; realized `tokens_saved` is the metric that maps to the bill.
- **Set-and-forget semantic threshold.** Without monitoring the score distribution, threshold drift silently trades correctness for savings until quality complaints arrive.

## Privacy & Governance

Cache-outcome events record the layer, result enum, similarity score, saved-token/latency counts, and the cache key (typically a content hash) — not the cached prompt or response content itself, which is governed by the same redaction rules as any other captured content and is not duplicated onto this event. Because these events are content-free, they can be retained and queried broadly: 30 days per-lookup for regression debugging, 13 months of daily hit-rate and savings rollups for ROI trending. Correlation identifiers follow the standard internal-sensitivity access boundary.

## Validation Checklist

- [ ] Every cache lookup emits an outcome event with `cache_layer` and `result`, giving hit rate an exact denominator
- [ ] Hit rate is tracked per layer, never as a single aggregate
- [ ] `tokens_saved` is recorded so realized savings (not just hit rate) is computable
- [ ] Semantic-cache hits record `similarity_score` and `similarity_threshold`
- [ ] `was_stale` is set when a hit serves content past its freshness bound
- [ ] The hit-rate-drop alert fires in a test where the cache key format is deliberately changed
- [ ] The cache-outcome event stores no cached content, only the key/hash and metrics (verified by inspection)

## Relation to the Arsenal

Feeds realized-savings data into [Attribute Every LLM Call's Cost to a Feature](./instrument-cost-per-feature.md), whose `cache_hit` field this entry explains how to measure rigorously across layers. Its latency-saved signal complements [Alert on Streaming Latency SLOs](../monitoring-alerting/alert-on-streaming-latency-slos.md). Operationalizes the tips [Use a Semantic Cache for Repeated Questions](../../tips-and-tricks/cost-and-performance/use-semantic-cache-for-repeated-questions.md), [Cache Stable System Prompts](../../tips-and-tricks/cost-and-performance/cache-stable-system-prompts.md), and [Cache Embeddings by Content Hash](../../tips-and-tricks/cost-and-performance/cache-embeddings-by-content-hash.md).

## Resources

Evidence for `verification_status: production-verified`: per-layer cache hit-rate and realized-savings monitoring, and semantic-cache similarity-threshold observability, are established cost-engineering practices, and provider prefix/prompt caching exposes hit metrics directly. The referenced platform tracks cache effectiveness as a first-class cost dimension.

- [Helicone](../../projects/benchmarks-and-evals/helicone.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
