---
id: msmarco
title: "MS MARCO"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Machine reading comprehension and passage ranking on 1M+ real Bing queries, with human-written answers over ~8.8M passages."
metrics:
  - name: "MRR@10"
    direction: higher
    notes: "Primary V1 passage-ranking metric"
  - name: "nDCG@10"
    direction: higher
    notes: "V2.1 re-ranking metric"
protocol:
  dataset: "MS MARCO (Microsoft, 2016)"
  dataset_url: "https://github.com/microsoft/msmarco"
  evaluation_setup: "Passage/document ranking on real Bing queries. Default protocol is MRR@10 over the ~8.8M-passage V1 corpus; V2.1 adds a 1M-passage re-ranking set scored with nDCG@10. The public leaderboard is closed — results are submitted to the organizers."
  version: null
leaderboards:
  - name: "MS MARCO Passage Ranking Leaderboard (archived)"
    url: "https://microsoft.github.io/MSMARCO-Passage-Ranking-Submissions/leaderboard/"
    last_checked: "2026-07-06"
  - name: "Papers With Code — MS MARCO"
    url: "https://paperswithcode.com/dataset/ms-marco"
    last_checked: "2026-07-06"
known_issues:
  - "Public leaderboard has been closed since 2021 — there is no live ranking; any quoted 'SOTA' is a historical snapshot that may be years out of date"
  - "Train/dev queries and passages are widely present in pretraining and fine-tuning corpora; contamination risk is high and unquantified"
  - "Human-written answers are derived from Bing result snippets, biasing toward web-surface phrasing and rewarding extractive/near-copying answers"
  - "V1 (8.8M passages, MRR@10) and V2.1 (1M re-ranking passage, nDCG@10) are different protocols — scores are not comparable across versions"
  - "English-only and built on 2016-2018 web data — does not test multilingual or recency/2018+ retrieval"
recommended_usage:
  - "Use for historical passage-ranking baselines; do not treat it as a live SOTA source — the leaderboard is closed"
  - "Always state the MS MARCO version (V1 vs V2.1) and metric (MRR@10 vs nDCG@10) when reporting a number"
  - "Pair with BEIR or a fresh in-domain eval — MS MARCO training data is heavily reused across the field"
  - "Prefer an open, recency-controlled retrieval set for production RAG decisions"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [beir]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official Microsoft/GitHub dataset repo and the archived MS MARCO leaderboard. Contamination, protocol-version, and closed-leaderboard notes emphasized per expansion-PR policy."
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

MS MARCO (Microsoft MAchine Reading COmprehension) is a large-scale passage-ranking and reading-comprehension dataset built from real, anonymized Bing queries with human-written answers. It defined the modern passage-retrieval leaderboard and remains a common fine-tuning corpus for re-rankers and dense retrievers.

## What it Measures (and what it doesn’t)

Measures: passage/document ranking quality (MRR@10, nDCG@10) and, in its generation variants, answer extraction quality over retrieved context.

Does not measure: multilingual retrieval, recency/2021+ retrieval, end-to-end RAG answer faithfulness, or latency/cost tradeoffs.

## Dataset & Protocol

- **Dataset:** MS MARCO — ~1,010,916 queries, ~8,841,823 passages (V1)
- **Dataset URL:** https://github.com/microsoft/msmarco
- **Evaluation setup:** MRR@10 over the V1 passage corpus (default); V2.1 adds a 1M-passage re-ranking set scored with nDCG@10. Leaderboard is closed.
- **Version:** – (V1 / V2 / V2.1)

## Metrics

- **MRR@10** — higher is better — primary V1 passage-ranking metric
- **nDCG@10** — higher is better — V2.1 re-ranking metric

## How to Run

```bash
# Official evaluation / submission toolkit
git clone https://github.com/microsoft/msmarco
# See https://github.com/microsoft/MSMARCO-Passage-Ranking for the
# canonical evaluation and submission scripts (MRR@10, nDCG@10).
```

## Known Issues, Leakage & Gaming Risks

- Leaderboard closed since 2021 — no live ranking; quoted scores are stale snapshots
- Train/dev queries and passages are heavily reused across the field — contamination risk
- Answers derived from Bing snippets bias toward extractive, web-style phrasing
- V1 (MRR@10) and V2.1 (nDCG@10) are not comparable across versions
- English-only, 2016-2018 web data — no multilingual or recency testing

## How to Interpret Scores

- The closed leaderboard's top archived entry is monoELECTRA at 0.404 MRR@10 (eval set), last updated 2021-10-21 — treat any higher claim as unverified
- Always label the version (V1 vs V2.1) and metric (MRR@10 vs nDCG@10)
- A 0.01 MRR@10 gap is within the leaderboard's own bootstrap noise — do not over-interpret
- Good MS MARCO ranking ≠ good production RAG — run an in-domain eval

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **MS MARCO Passage Ranking** leaderboard for **MS MARCO** (protocol: **V1 passage ranking, MRR@10**) has been **closed since 2021** — the top archived entry is **monoELECTRA at 0.404 MRR@10 (eval)**, last updated 2021-10-21. Treat any quoted score as a **historical snapshot**, not a live ranking.

## Recommended Usage

- Historical passage-ranking baselines; not a live SOTA source (leaderboard closed)
- State the MS MARCO version and metric with any number
- Pair with BEIR / a fresh in-domain eval
- Prefer an open, recency-controlled retrieval set for production RAG

## Related Benchmarks

- [BEIR](./beir.md) — zero-shot retrieval generalization across 18 datasets

## Relation to the Arsenal

Retrieval / RAG evaluation benchmark. Complements RAG projects in `content/projects/data-and-retrieval/`, RAG tips in `content/tips-and-tricks/rag-and-retrieval/`, and vector-search tooling.

## Resources

- [Dataset – GitHub (microsoft/msmarco)](https://github.com/microsoft/msmarco)
- [MS MARCO Passage Ranking Leaderboard (archived)](https://microsoft.github.io/MSMARCO-Passage-Ranking-Submissions/leaderboard/)
- [Papers With Code – MS MARCO](https://paperswithcode.com/dataset/ms-marco)
- Paper: Nguyen et al., "MS MARCO: A Human Generated MAchine Reading COmprehension Dataset", NeurIPS 2016 Workshop

---

*Last reviewed: 2026-07-06 by @maintainer*
