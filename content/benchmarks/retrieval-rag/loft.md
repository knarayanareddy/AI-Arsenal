---
id: loft
title: "LOFT (Long-Context Frontiers)"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Whether a long-context LLM can replace a retrieval pipeline: it stuffs entire corpora (up to millions of tokens) into context and tests retrieval, multi-hop RAG, SQL-style reasoning, and many-shot in-context learning — directly comparing 'long-context prompting' against dedicated retrievers/RAG."
metrics:
  - name: "task accuracy"
    direction: higher
    notes: "Per-task correctness (e.g. retrieval recall-style match, RAG answer accuracy) reported at multiple context lengths up to 1M+ tokens"
protocol:
  dataset: "LOFT (6 task areas: retrieval, RAG, SQL, many-shot ICL, and more, at 32k / 128k / 1M token scales)"
  dataset_url: "https://github.com/google-deepmind/loft"
  evaluation_setup: "Place the full corpus in the model's context and answer tasks without an external retriever; scores reported per task and per context length, and compared against specialized retrieval/RAG baselines."
  version: "2024 release"
leaderboards:
  - name: "LOFT repo (results & harness)"
    url: "https://github.com/google-deepmind/loft"
    last_checked: "2026-07-08"
known_issues:
  - "Feeding million-token contexts is expensive and slow; a strong LOFT score may be economically impractical to serve"
  - "Corpora placed in context can overlap with pretraining data, aiding models unfairly on some tasks"
  - "Results are highly sensitive to prompt/format and to how the corpus is laid out in context"
  - "Comparisons to RAG depend on the strength of the retrieval baseline chosen"
recommended_usage:
  - "Use it to decide whether long-context prompting can replace or must complement a retriever at your corpus size"
  - "Always weigh the score against the token cost and latency of the required context length"
  - "Read per-length curves — most models degrade sharply past their comfortable context window"
  - "Pair with RULER (capacity) and a real RAG eval before dropping a retrieval pipeline"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["ruler", "beir"]
enrichment_status: draft
enrichment_notes: "Authored from the LOFT paper (arXiv:2406.13121) and google-deepmind/loft repo; URLs verified 2026-07-08."
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

LOFT (Google DeepMind, 2024) asks a question long-context models make urgent: can you just put the whole corpus in the prompt and skip retrieval? It evaluates context-in retrieval, multi-hop RAG, SQL-style reasoning over structured data, and many-shot in-context learning at scales up to a million-plus tokens, and it explicitly compares this "long-context prompting" approach against specialized retrievers and RAG pipelines. The result is a grounded look at where long context genuinely substitutes for retrieval and where it does not.

## What it Measures (and what it doesn’t)

Measures a long-context model's ability to perform retrieval- and RAG-style tasks directly from an in-context corpus, across several task types and context lengths, versus dedicated pipelines.

Does not measure: serving cost/latency (which it deliberately ignores in scoring), retriever quality in isolation, or streaming/updateable corpora — the corpus is fixed in the prompt.

## Dataset & Protocol

- **Dataset:** 6 task areas (retrieval, RAG, SQL, many-shot ICL, and more) at 32k / 128k / 1M token scales
- **Dataset URL:** https://github.com/google-deepmind/loft
- **Evaluation setup:** corpus placed fully in context, no external retriever; accuracy per task and per context length, compared to retrieval/RAG baselines
- **Version:** 2024 release

## Metrics

- **task accuracy** — higher is better — per-task correctness reported across context lengths

## How to Run

```bash
git clone https://github.com/google-deepmind/loft
# follow the repo to assemble corpora at the target context length
# run tasks with the corpus in-context; score per task and length, compare to a RAG baseline
```

## Known Issues, Leakage & Gaming Risks

- Million-token contexts are costly/slow — scores can be impractical to deploy
- In-context corpora may overlap pretraining data, aiding some tasks unfairly
- Highly prompt/layout sensitive
- RAG comparisons hinge on the chosen retrieval baseline's strength

## How to Interpret Scores

- Always read scores against the context length and its token cost: as of **2026-07-08**, long-context prompting is competitive with RAG on some tasks at moderate lengths but degrades and becomes expensive at the largest scales.
- Per-length curves reveal where each model's effective long-context ability collapses — often well before its advertised window.
- A LOFT win over a weak RAG baseline is not a win over a well-tuned retriever; check the baseline.

## Recommended Usage

- Use it to decide long-context-prompting vs. retrieval at your corpus scale
- Factor token cost/latency into any "replace RAG" decision
- Inspect per-length degradation curves
- Combine with RULER and an in-domain RAG eval before removing a retriever

## Related Benchmarks

- [RULER](./ruler.md) — effective context-length capacity probe
- [BEIR](./beir.md) — retrieval-system quality across domains (the RAG side of the comparison)

## Relation to the Arsenal

Long-context-vs-retrieval benchmark in the retrieval-rag category; directly informs the retrieval-vs-long-context tradeoff in `content/architectures/` and RAG stack choices in the Arsenal's projects.

## Resources

- [google-deepmind/loft repo](https://github.com/google-deepmind/loft)
- [LOFT paper — Lee et al., 2024](https://arxiv.org/abs/2406.13121)
