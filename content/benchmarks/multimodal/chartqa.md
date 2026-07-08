---
id: chartqa
title: "ChartQA"
entry_type: benchmark
category: multimodal
modality: [vision, text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Whether a vision-language model can answer questions about charts (bar, line, pie) — including questions that require reading values off the plot and doing arithmetic/logical reasoning over them, not just describing the image."
metrics:
  - name: "relaxed accuracy"
    direction: higher
    notes: "Answer correct within a small numerical tolerance (typically 5%) for numeric answers; exact match for categorical answers. Reported over human-written and machine-generated question splits."
protocol:
  dataset: "ChartQA (~9.6k human + ~23.1k machine-generated QA pairs over ~20k real charts)"
  dataset_url: "https://github.com/vis-nlp/ChartQA"
  evaluation_setup: "Given a chart image and a question, produce an answer; scored with relaxed accuracy (numeric tolerance) over the human and augmented (machine) test splits, usually reported as the average."
  version: "2022 release"
known_issues:
  - "The averaged score hides that the human split is much harder than the machine-generated split — report both"
  - "Relaxed-accuracy tolerance rewards near-misses on numbers and can mask systematic reading errors"
  - "Chart rendering resolution affects whether small labels/values are legible to the model"
  - "Widely used and public, so contamination is likely in recent models"
leaderboards:
  - name: "ChartQA (Papers with Code)"
    url: "https://paperswithcode.com/sota/chart-question-answering-on-chartqa"
    last_checked: "2026-07-08"
recommended_usage:
  - "Report human-split and machine-split accuracy separately — the human split is the meaningful difficulty"
  - "Use it to gauge document/chart-reading ability for RAG-over-documents and analytics assistants"
  - "Feed charts at high resolution; degraded input disproportionately hurts value-reading questions"
  - "Pair with a broader multimodal benchmark to avoid over-indexing on chart-specific skill"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmmu", "mathvista", "mmbench"]
enrichment_status: draft
enrichment_notes: "Authored from the ChartQA paper (arXiv:2203.10244) and vis-nlp/ChartQA repo; URLs verified 2026-07-08."
tags: [evaluation, multimodal, benchmark]
---

## Overview

ChartQA (Masry et al., 2022) evaluates chart understanding: given a bar/line/pie chart image and a question, the model must answer — often by reading specific values and then reasoning (comparisons, sums, trends) over them. It combines ~9.6k human-authored questions (which emphasize visual and logical reasoning) with ~23k machine-generated questions over ~20k real charts. It has become the standard probe for the "read a chart and compute" skill that document-analysis and analytics assistants depend on.

## What it Measures (and what it doesn’t)

Measures visual value extraction plus arithmetic/logical reasoning over chart data — a combined perception-and-reasoning task.

Does not measure: general document layout understanding, table reasoning at scale, chart *generation*, or reasoning over charts the model must first retrieve. It is scoped to answering questions about a single provided chart.

## Dataset & Protocol

- **Dataset:** ~9.6k human + ~23.1k machine-generated QA pairs over ~20k real charts
- **Dataset URL:** https://github.com/vis-nlp/ChartQA
- **Evaluation setup:** relaxed accuracy (numeric tolerance, typically 5%) over human and machine test splits, commonly averaged
- **Version:** 2022 release

## Metrics

- **relaxed accuracy** — higher is better — numeric answers within tolerance, categorical answers exact; report human and machine splits

## How to Run

```bash
git clone https://github.com/vis-nlp/ChartQA
# for each (chart image, question): generate an answer
# score with relaxed accuracy on the human and augmented test splits
```

## Known Issues, Leakage & Gaming Risks

- Averaging human and machine splits hides the real (human-split) difficulty
- Relaxed-accuracy tolerance can mask systematic value-reading errors
- Input resolution materially affects legibility of small labels
- Public and widely trained on; contamination is likely

## How to Interpret Scores

- Split the score: as of **2026-07-08**, strong VLMs score high on the machine-generated split while the human split — requiring genuine visual reasoning — remains the discriminating measure.
- Large human-vs-machine gaps indicate the model reads templated questions well but struggles with real reasoning.
- Because tolerance is relaxed, treat near-ceiling numbers cautiously for high-stakes numeric extraction.

## Recommended Usage

- Always report human and machine splits separately
- Use it to assess chart/document-reading for analytics and document-RAG assistants
- Provide high-resolution chart inputs
- Combine with general multimodal benchmarks for balance

## Related Benchmarks

- [MMMU](./mmmu.md) — broad expert-level multimodal reasoning
- [MathVista](./mathvista.md) — visual mathematical reasoning, including charts/plots
- [MMBench](./mmbench.md) — general multimodal capability probing

## Relation to the Arsenal

Chart/document-understanding benchmark in the multimodal category; relevant to model selection for document-RAG and multimodal analytics tools and projects in the Arsenal.

## Resources

- [ChartQA (Papers with Code)](https://paperswithcode.com/sota/chart-question-answering-on-chartqa)
- [vis-nlp/ChartQA repo](https://github.com/vis-nlp/ChartQA)
- [ChartQA paper — Masry et al., 2022](https://arxiv.org/abs/2203.10244)
