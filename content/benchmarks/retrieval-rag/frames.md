---
id: frames
title: "FRAMES (Factuality, Retrieval, And reasoning MEasurement Set)"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "End-to-end RAG quality on questions that require retrieving and synthesizing information from multiple documents (multi-hop), so it tests factuality and multi-document reasoning together rather than single-passage lookup."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact/judged correctness of the final answer; reported both in a single-step (all gold docs provided) and multi-step retrieval setting"
protocol:
  dataset: "FRAMES (824 multi-hop questions, each needing 2-15 Wikipedia articles)"
  dataset_url: "https://huggingface.co/datasets/google/frames-benchmark"
  evaluation_setup: "Answer 824 questions that require reasoning across multiple retrieved Wikipedia articles; evaluated with gold documents provided (reasoning-only) and with a live retriever (full RAG), scoring final-answer accuracy."
  version: "2024 release"
leaderboards:
  - name: "FRAMES dataset card (Hugging Face)"
    url: "https://huggingface.co/datasets/google/frames-benchmark"
    last_checked: "2026-07-08"
known_issues:
  - "Wikipedia-grounded, so models with strong parametric Wikipedia knowledge can shortcut retrieval on some items"
  - "Single answer per question with judged correctness — ambiguous or time-sensitive facts can be scored unfairly"
  - "824 questions is modest; per-category slices (numerical, tabular, multi-constraint) have small support"
  - "Retriever quality confounds the score in the full-RAG setting; a low score may reflect retrieval, not reasoning"
recommended_usage:
  - "Run both settings — gold-docs (isolates reasoning) and live-retrieval (measures your pipeline) — and compare the gap"
  - "Use the multi-hop, multi-constraint slices to stress a RAG system beyond single-passage QA"
  - "Diagnose whether failures come from retrieval or synthesis by holding one side fixed"
  - "Pair with a single-hop set (e.g. Natural Questions) to separate easy lookups from genuine multi-hop reasoning"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["natural-questions", "beir"]
enrichment_status: draft
enrichment_notes: "Authored from the FRAMES paper (arXiv:2409.12941) and the google/frames-benchmark dataset card; URLs verified 2026-07-08."
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

FRAMES (Google, 2024) is a RAG benchmark built specifically to test the hard part of retrieval-augmented generation: reasoning across multiple retrieved documents, not just finding one relevant passage. Its 824 questions each require synthesizing 2-15 Wikipedia articles and often combine numerical, tabular, temporal, or multi-constraint reasoning. Crucially it can be run in two modes — with gold documents supplied (isolating reasoning) and with a live retriever (measuring the whole pipeline) — which makes it a diagnostic, not just a scoreboard.

## What it Measures (and what it doesn’t)

Measures whether a system can retrieve the right multiple documents and correctly reason over them to produce a factual answer — the multi-hop, multi-document competence that real RAG applications need.

Does not measure: single-passage lookup (too easy for the target), non-Wikipedia domains, long-document reasoning, or generation style/faithfulness beyond final-answer correctness.

## Dataset & Protocol

- **Dataset:** 824 multi-hop questions, each requiring 2-15 Wikipedia articles
- **Dataset URL:** https://huggingface.co/datasets/google/frames-benchmark
- **Evaluation setup:** final-answer accuracy, scored in a gold-document (reasoning-only) setting and a live-retrieval (full-RAG) setting
- **Version:** 2024 release

## Metrics

- **accuracy** — higher is better — final-answer correctness; report both retrieval settings

## How to Run

```bash
pip install datasets
# python
# from datasets import load_dataset
# ds = load_dataset("google/frames-benchmark")
# for each question: provide gold docs OR run your retriever, then answer and judge accuracy
```

## Known Issues, Leakage & Gaming Risks

- Parametric-knowledge shortcut: strong models may answer some items from memorized Wikipedia without real retrieval
- Small size (824 items) makes per-slice numbers noisy
- Full-RAG scores conflate retrieval and reasoning quality — always run the gold-docs control
- Judged single answers can penalize defensible alternative phrasings or updated facts

## How to Interpret Scores

- Compare the two settings: a big gap between gold-docs and live-retrieval accuracy means your retriever is the bottleneck, not the model's reasoning.
- As of **2026-07-08**, multi-hop accuracy in the full-retrieval setting remains well below the gold-docs ceiling for most systems — multi-document synthesis is the persistent failure mode.
- Low scores on the numerical/tabular/temporal slices flag specific reasoning gaps that a better retriever won't fix.

## Recommended Usage

- Use it as a RAG regression test that stresses multi-hop, not single lookups
- Always run gold-docs vs live-retrieval to attribute failures to retrieval vs synthesis
- Slice by reasoning type to target improvements
- Combine with a single-hop QA set to bracket difficulty

## Related Benchmarks

- [Natural Questions](./natural-questions.md) — largely single-hop open-domain QA, a useful easier baseline
- [BEIR](./beir.md) — measures the retrieval component in isolation

## Relation to the Arsenal

Multi-hop RAG evaluation in the retrieval-rag category; complements chunking/retrieval decisions in `content/architectures/` and the RAG stacks in `content/projects/`.

## Resources

- [FRAMES dataset (Hugging Face)](https://huggingface.co/datasets/google/frames-benchmark)
- [FRAMES paper — Krishna et al., 2024](https://arxiv.org/abs/2409.12941)
