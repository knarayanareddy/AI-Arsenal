---
id: mmstar
title: "MMStar"
entry_type: benchmark
category: multimodal
modality: [vision, text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Genuine vision-dependent multimodal reasoning: 1,500 human-curated samples deliberately filtered so that questions cannot be answered without looking at the image and are unlikely to be memorized from training text — correcting two systemic flaws in earlier multimodal benchmarks."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Multiple-choice accuracy over 1,500 curated samples across 6 core capabilities; the paper also reports a multimodal-gain and data-leakage diagnostic"
protocol:
  dataset: "MMStar (1,500 vision-indispensable samples, 6 capability dimensions)"
  dataset_url: "https://github.com/MMStar-Benchmark/MMStar"
  evaluation_setup: "Answer multiple-choice questions curated so the image is required and the text alone is insufficient; report accuracy overall and per capability. Two auxiliary metrics estimate multimodal gain and training-data leakage."
  version: "2024 release"
known_issues:
  - "Small (1,500 items) by design, so per-capability slices have limited support"
  - "Curation reduces but cannot fully eliminate contamination for models trained after its release"
  - "Multiple-choice format still permits some elimination strategies"
  - "Capability taxonomy is the authors' choice and may not map to your use case"
leaderboards:
  - name: "MMStar (Papers with Code)"
    url: "https://paperswithcode.com/dataset/mmstar"
    last_checked: "2026-07-08"
recommended_usage:
  - "Prefer it over older multimodal MCQ benchmarks when you specifically want to test vision-dependence, not text priors"
  - "Read the multimodal-gain metric — it quantifies how much the image actually helped versus a text-only baseline"
  - "Use the per-capability breakdown to target weaknesses (e.g. fine-grained perception vs. logical reasoning)"
  - "Combine with a larger benchmark (MMMU/MMBench) for coverage, using MMStar as the vision-honesty check"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmmu", "mmbench", "seed-bench"]
enrichment_status: draft
enrichment_notes: "Authored from the MMStar paper (arXiv:2403.20330) and MMStar-Benchmark/MMStar repo; URLs verified 2026-07-08."
tags: [evaluation, multimodal, benchmark]
---

## Overview

MMStar (Chen et al., 2024) was built after its authors showed that many popular multimodal benchmarks were flawed in two ways: some questions were answerable from text alone (the image was unnecessary), and some answers had leaked into LLM training data. MMStar responds with 1,500 human-curated samples selected to be genuinely vision-indispensable and to minimize leakage, spanning six capability dimensions. It also introduces diagnostics that estimate how much the image actually contributed (multimodal gain) and how much performance may stem from data leakage.

## What it Measures (and what it doesn’t)

Measures true vision-dependent multimodal reasoning — cases where the model must use the image, not exploit language priors — across perception and reasoning capabilities.

Does not measure: large-scale coverage (it is deliberately small), open-ended generation, video/temporal reasoning, or domains outside its six capability dimensions.

## Dataset & Protocol

- **Dataset:** 1,500 vision-indispensable samples across 6 capability dimensions
- **Dataset URL:** https://github.com/MMStar-Benchmark/MMStar
- **Evaluation setup:** multiple-choice accuracy overall and per capability, plus multimodal-gain and data-leakage diagnostics
- **Version:** 2024 release

## Metrics

- **accuracy** — higher is better — MCQ correctness over curated vision-dependent items, with auxiliary gain/leakage diagnostics

## How to Run

```bash
git clone https://github.com/MMStar-Benchmark/MMStar
# evaluate a VLM on the 1,500 samples (compatible with common VLM eval kits)
# report overall + per-capability accuracy and the multimodal-gain / leakage metrics
```

## Known Issues, Leakage & Gaming Risks

- Small size limits per-capability statistical power
- Curation mitigates but cannot fully prevent post-release contamination
- MCQ format allows some elimination strategies
- The capability taxonomy is author-defined and may not fit every use case

## How to Interpret Scores

- Read accuracy together with the multimodal-gain metric: a high accuracy but low gain means the model is leaning on text priors, not vision.
- As of **2026-07-08**, MMStar is a standard "vision-honesty" check precisely because it exposes models that score well on other benchmarks via language shortcuts.
- Use the per-capability breakdown rather than the single number to locate concrete perception vs. reasoning gaps.

## Recommended Usage

- Use as the vision-dependence sanity check alongside larger multimodal benchmarks
- Always inspect the multimodal-gain diagnostic, not just accuracy
- Target weaknesses via the per-capability slices
- Pair with MMMU/MMBench for breadth

## Related Benchmarks

- [MMMU](./mmmu.md) — expert-level multimodal reasoning (broad coverage)
- [MMBench](./mmbench.md) — general multimodal capability probing
- [SEED-Bench](./seed-bench.md) — generative multimodal comprehension

## Relation to the Arsenal

Vision-dependence-focused multimodal benchmark in the multimodal category; a rigor check when profiling multimodal models for the Arsenal's multimodal projects and model-selection guidance.

## Resources

- [MMStar (Papers with Code)](https://paperswithcode.com/dataset/mmstar)
- [MMStar-Benchmark/MMStar repo](https://github.com/MMStar-Benchmark/MMStar)
- [MMStar paper — Chen et al., 2024](https://arxiv.org/abs/2403.20330)
