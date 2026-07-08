---
id: ruler
title: "RULER"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Effective (not claimed) context length – synthetic retrieval, multi-hop tracing, aggregation, and QA tasks generated at configurable lengths to find where a model's long-context ability actually collapses."
metrics:
  - name: "accuracy per length bucket"
    direction: higher
    notes: "Scored at each tested context length (e.g. 4k-128k+); the 'effective length' is the longest bucket above threshold"
protocol:
  dataset: "RULER (synthetic, generated per run)"
  dataset_url: "https://github.com/NVIDIA/RULER"
  evaluation_setup: "13 tasks across 4 categories (needle retrieval variants, multi-hop variable tracing, aggregation, QA) generated at chosen sequence lengths; accuracy vs. length curve; 85% threshold defines effective context length."
  version: "2024 release"
leaderboards:
  - name: "RULER results table (repo)"
    url: "https://github.com/NVIDIA/RULER"
    last_checked: "2026-07-08"
known_issues:
  - "Synthetic tasks – passing RULER at 128k does not guarantee real-document reasoning at 128k"
  - "Task weighting is uniform; real workloads are not – aggregate scores can hide category-specific collapse"
  - "Generated data avoids contamination, but templates are public and can be trained against"
  - "Threshold choice (85%) is a convention; effective-length claims are sensitive to it"
recommended_usage:
  - "Test at the context lengths you actually deploy at, not just the model's advertised maximum"
  - "Read the per-category breakdown – aggregation typically collapses before needle retrieval"
  - "Use effective length (last bucket ≥85%) rather than the marketing context window in RAG capacity planning"
  - "Pair with a real-document long-context eval before finalizing chunking/window decisions"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["beir", "hotpotqa"]
enrichment_status: draft
enrichment_notes: "Authored from the RULER paper (arXiv:2404.06654) and NVIDIA/RULER repo; URLs verified 2026-07-08."
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

RULER (NVIDIA, 2024) answers the question every long-context release begs: what's the model's *real* context length? It generates synthetic tasks – needle-in-a-haystack variants, multi-hop variable tracing, aggregation, and QA – at any target length, then reports the accuracy-vs-length curve. Its headline finding: most models claiming 32k-200k windows degrade far below the claim, often at half the advertised length.

## What it Measures (and what it doesn’t)

Measures degradation of retrieval, tracing, and aggregation abilities as context grows – the effective context length under a defined threshold.

Does not measure: real-document understanding, retrieval-pipeline quality (it bypasses retrievers entirely), or reasoning depth. It's a capacity probe for the model itself, not a RAG-system benchmark.

## Dataset & Protocol

- **Dataset:** synthetic, generated per run from public templates
- **Dataset URL:** https://github.com/NVIDIA/RULER
- **Evaluation setup:** 13 tasks / 4 categories at configurable lengths; accuracy per length bucket; 85% threshold defines effective length
- **Version:** 2024 release

## Metrics

- **accuracy per length bucket** — higher is better — read as a curve, not a scalar

## How to Run

```bash
git clone https://github.com/NVIDIA/RULER
# Configure model endpoint + sequence lengths in scripts/config
# bash run.sh <model_name> synthetic
```

## Known Issues, Leakage & Gaming Risks

- Public templates allow targeted training ("RULER-maxxing") that inflates scores without real long-context gains
- Synthetic-real gap: strong RULER results do not transfer 1:1 to messy documents
- Uniform task weighting hides category-specific collapse
- Effective-length claims shift with the chosen threshold – always state it

## How to Interpret Scores

- The deliverable is the curve: where each task category drops below threshold. As of **2026-07-08**, published results in the repo show most open models' effective length well below their advertised windows.
- Aggregation-task collapse at moderate lengths predicts trouble with summarize-many-chunks RAG patterns.
- Two models with equal 128k claims can differ by 4x in effective length – this is the comparison RULER exists for.

## Recommended Usage

- Gate model selection for long-context RAG on effective length at your deployment window
- Re-test after quantization – long-context ability degrades disproportionately
- Use category breakdowns to match model to workload (needle vs aggregation heavy)
- Combine with real-corpus evals before committing to a context-window architecture

## Related Benchmarks

- [BEIR](./beir.md) – retrieval-system quality across domains
- [HotpotQA](./hotpotqa.md) – multi-hop QA over documents

## Relation to the Arsenal

Long-context capacity benchmark in the retrieval-rag category; directly informs chunking and context-window decisions in `content/architectures/` and RAG stacks in `content/projects/data-and-retrieval/`.

## Resources

- [NVIDIA/RULER repo](https://github.com/NVIDIA/RULER)
- [RULER paper – Hsieh et al., 2024](https://arxiv.org/abs/2404.06654)
