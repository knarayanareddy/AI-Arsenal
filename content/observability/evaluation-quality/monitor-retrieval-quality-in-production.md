---
id: "monitor-retrieval-quality-in-production"
title: "Monitor Retrieval Quality Continuously with Reference-Free Signals, Not Just Offline Benchmarks"
entry_type: observability
category: evaluation-quality
scope: production
signal_types:
  - quality
  - reliability
verification_status: production-verified
data_sensitivity:
  - internal
  - pii
last_reviewed: "2026-07-07"

instrumentation_contract:
  sampling: "100% of retrieval calls for structural fields (retrieved_count, top/mean similarity scores, latency); 5-10% of traces sampled for LLM-judged context-relevance and groundedness scoring, with 100% scoring for traces flagged by user feedback or errors"
  retention: "90 days for per-query retrieval-quality metrics (scores, counts, judged relevance); raw retrieved-chunk content follows the trace store's content retention (30 days), since metrics outlive content"
  correlation:
    - trace_id
    - request_id
    - retrieval_span_id
    - index_version
  redaction: "Query text is stored hashed by default (query_text_hash); sampled queries retained verbatim for relevance judging are scrubbed for known PII patterns before storage, and retrieved-chunk content inherits the redaction rules of the underlying trace pipeline"
  events:
    - name: "retrieval_quality_scored"
      when_emitted: "After each sampled retrieval call is scored (heuristic scores synchronously; LLM-judged scores asynchronously from the sampling queue)"
      required_fields:
        - trace_id
        - retrieval_span_id
        - retrieved_count
        - top_similarity
        - mean_similarity
        - index_version
      optional_fields:
        - judged_context_relevance
        - judged_groundedness
        - judge_model_id
        - query_text_hash
      pii_risk: internal

related_projects:
  - phoenix
  - langfuse
  - deepeval
related_tips:
  - measure-retrieval-recall-before-answer-quality
  - log-retrieved-context
dashboards: []
alert_rules:
  - "Alert if the fraction of retrieval calls with retrieved_count = 0 exceeds 5% over a 1-hour window, or if mean top_similarity drops more than 2 standard deviations below its 7-day baseline for the same index_version"
  - "Alert if sampled judged_context_relevance falls below its 7-day baseline by a configured margin for two consecutive evaluation windows, gated per index_version so index rollouts are compared against their own baseline"
common_failure_modes:
  - "Judging retrieval health by offline benchmark recall alone -- production query distribution drifts away from the benchmark within weeks, and the index silently degrades (stale documents, embedding-version mismatches) while the offline number stays green"
  - "Averaging similarity scores across different embedding models or index versions -- scores are not comparable across versions, so a re-embedding rollout looks like a quality cliff or masks a real one unless every metric is segmented by index_version"
added_date: "2026-07-07"
added_by: "maintainer"
status: "active"
enrichment_status: draft
---

## Overview

Offline retrieval benchmarks answer "did this work when we built it"; production retrieval quality is a different, time-varying quantity — query distributions drift, documents go stale, and re-embedding rollouts silently change score semantics. This entry defines the reference-free signals that make retrieval degradation visible from live traffic, building on the per-call `retrieve` span from [Trace Every Retrieval, Tool Call, and Agent Transition](../tracing/trace-every-agent-and-rag-step.md) and complementing offline recall measurement per [Measure Retrieval Recall Before Answer Quality](../../tips-and-tricks/rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md).

## What to Capture

- Per retrieval call: `retrieved_count`, `top_similarity`, `mean_similarity`, and retrieval latency — cheap structural fields captured on 100% of calls
- The `index_version` (embedding model + chunker + index build identifier) on every retrieval event, so all quality metrics can be segmented by version
- On a sampled fraction of traces: LLM-judged `judged_context_relevance` (were retrieved chunks relevant to the query?) and `judged_groundedness` (was the answer supported by the retrieved chunks?), with the `judge_model_id` recorded so judge upgrades are distinguishable from quality shifts
- `query_text_hash` on all events, with verbatim query text retained only for the sampled/judged subset after PII scrubbing
- User-feedback linkage: any explicit feedback event on the final answer joined to the retrieval span via `trace_id`, so feedback can be attributed to retrieval versus generation

## Instrumentation Contract

Each sampled retrieval produces one `retrieval_quality_scored` event; heuristic fields are synchronous, judged fields arrive asynchronously and update the same event:

```json
{
  "event_name": "retrieval_quality_scored",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "retrieval_span_id": "a2",
  "index_version": "bge-m3__chunker-v4__2026-07-01",
  "retrieved_count": 4,
  "top_similarity": 0.83,
  "mean_similarity": 0.71,
  "query_text_hash": "sha256:9f2a...",
  "judged_context_relevance": 0.75,
  "judged_groundedness": 1.0,
  "judge_model_id": "gpt-4o-mini-2026-05"
}
```

## Implementation

```python
import hashlib, random

SAMPLE_RATE = 0.05

def score_retrieval(trace_id, span_id, query, results, index_version, emit, judge_queue):
    scores = [r.similarity for r in results]
    event = {
        "event_name": "retrieval_quality_scored",
        "trace_id": trace_id,
        "retrieval_span_id": span_id,
        "index_version": index_version,
        "retrieved_count": len(results),
        "top_similarity": max(scores, default=None),
        "mean_similarity": sum(scores) / len(scores) if scores else None,
        "query_text_hash": "sha256:" + hashlib.sha256(query.encode()).hexdigest()[:12],
    }
    emit(event)
    if random.random() < SAMPLE_RATE:
        # async LLM-as-judge scoring; judge prompt scores context relevance
        # and groundedness on the scrubbed query + retrieved chunks
        judge_queue.enqueue(trace_id=trace_id, span_id=span_id,
                            query=scrub_pii(query),
                            chunks=[scrub_pii(r.text) for r in results])
```

The async judge worker writes `judged_context_relevance`, `judged_groundedness`, and `judge_model_id` back onto the event. Phoenix, Langfuse, and DeepEval all ship managed versions of this sampled-judging loop if you'd rather not run the queue yourself.

## Dashboards & Alerts

- Dashboard: `retrieved_count = 0` rate, top/mean similarity distributions, and judged relevance/groundedness over time — every panel segmented by `index_version`
- Dashboard: judged-groundedness versus user-feedback rate on the same time axis, to see whether retrieval degradation predicts user-visible quality drops
- Alert rule: zero-result rate above 5% over 1 hour (frontmatter rule 1) — the cheapest, highest-signal detector of index or filter regressions
- Alert rule: judged context relevance below its per-index-version 7-day baseline for two consecutive windows (frontmatter rule 2)

## Common Failure Modes

- **Trusting offline benchmarks as production monitoring.** The benchmark distribution freezes at eval-set creation time; production queries drift within weeks, and stale-document or embedding-mismatch degradation never appears in the offline number.
- **Comparing similarity scores across index versions.** Scores are only meaningful within one embedding model and index build; unsegmented metrics turn every re-embedding rollout into a phantom quality cliff — or hide a real one.

## Privacy & Governance

Query text is `pii`-risk by default (users paste account details and personal context into search boxes) and is therefore stored hashed on the 100% path; only the sampled judging path retains verbatim text, scrubbed for known PII patterns before storage and subject to the trace store's 30-day content retention. Judged scores and structural metrics contain no content and are retained 90 days. LLM-as-judge calls send scrubbed query and chunk text to the judge model — if the judge is a third-party API, that egress must be reviewed under the same data-processing rules as the primary model traffic, not treated as invisible internal plumbing. Access to raw judged samples (verbatim queries and chunks) is restricted to the on-call engineering team operating the RAG system; aggregate scores and dashboards are readable org-wide.

## Validation Checklist

- [ ] Every retrieval event carries `index_version`, and dashboards refuse to aggregate across versions by default
- [ ] Zero-result-rate alert fires in a staging test when a bad metadata filter is deployed deliberately
- [ ] Judged scores are reproducible: re-judging a fixed trace sample with the pinned `judge_model_id` yields scores within tolerance
- [ ] Verbatim query retention is confirmed to occur only on the sampled path, and PII scrubbing runs before storage (verified against stored samples, not just the code path)
- [ ] A deliberate stale-index test (serving last month's index in staging) is visible in judged relevance within one evaluation window
- [ ] Feedback events join to retrieval spans via `trace_id` in the analytics store, enabling retrieval-vs-generation attribution

## Relation to the Arsenal

Consumes the `retrieve` spans defined in [Trace Every Retrieval, Tool Call, and Agent Transition](../tracing/trace-every-agent-and-rag-step.md) and feeds the regression gates in [Gate Releases on Eval Regression](./gate-releases-on-eval-regression.md) — sampled production traces judged here are the natural source of fresh eval-dataset examples. The offline counterpart is [Measure Retrieval Recall Before Answer Quality](../../tips-and-tricks/rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md); the index-versioning discipline this entry depends on is [Store Parser Version With Every Chunk](../../tips-and-tricks/rag-and-retrieval/store-parser-version-with-every-chunk.md). Implemented as managed features in [Phoenix](../../projects/benchmarks-and-evals/phoenix.md), [Langfuse](../../projects/benchmarks-and-evals/langfuse.md), and [DeepEval](../../projects/benchmarks-and-evals/deepeval.md).

## Resources

Evidence for `verification_status: production-verified`: sampled reference-free RAG evaluation on live traffic (context relevance + groundedness, the RAG-triad pattern) is the core production workflow of multiple named systems in this catalog — Phoenix's online evals, Langfuse's model-based evaluations on sampled traces, and DeepEval's RAG metrics — all of which document exactly this sampled-judging deployment shape for production monitoring.

- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md) — online LLM-judged evals over sampled production traces
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md) — model-based evaluation pipelines on trace samples
- [DeepEval](../../projects/benchmarks-and-evals/deepeval.md) — contextual relevance / faithfulness metrics usable in the judge worker

---
*Last reviewed: 2026-07-07 by @maintainer*
