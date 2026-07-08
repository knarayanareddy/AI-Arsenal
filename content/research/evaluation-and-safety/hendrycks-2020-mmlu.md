---
id: hendrycks-2020-mmlu
title: "Measuring Massive Multitask Language Understanding"
phase: evaluation-and-safety
venue: iclr
year: 2020
authors:
  - "Hendrycks, D."
  - "Burns, C."
  - "Basart, S."
  - "Zou, A."
  - "Mazeika, M."
  - "Song, D."
  - "Steinhardt, J."
arxiv_id: "2009.03300"
arxiv_url: "https://arxiv.org/abs/2009.03300"
pdf_url: "https://arxiv.org/pdf/2009.03300"
code_url: "https://github.com/hendrycks/test"
venue_url: "https://openreview.net/forum?id=d7KBjmI3GmQ"

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 6000

tldr: "Introduced MMLU: 57-subject multiple-choice knowledge exam that became the field's default capability number for half a decade — now saturated and largely superseded (MMLU-Pro, GPQA), but still the single most-cited benchmark score in model cards"
key_contribution: "Built a 15,908-question, 57-subject benchmark spanning STEM, humanities, law, and medicine to measure pretraining-acquired knowledge in zero/few-shot settings — establishing both the benchmark that anchored model comparison through the GPT-4 era and the now-standard practice of reporting broad multitask accuracy"

builds_on:
  - "brown-2020-gpt3"

tags:
  - "evaluation"
  - "llm"
  - "research"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

MMLU aggregates 15,908 four-option multiple-choice questions across 57 subjects — from elementary math through professional law and medicine — collected from real exams and study materials, evaluated zero- or few-shot without task-specific training. At publication GPT-3 scored 43.9% against a 25% random baseline while experts approach ~90%; within four years frontier models exceeded 88%, making MMLU simultaneously the most influential and the most saturated capability benchmark of the LLM era.

## Why it's in the Arsenal

- MMLU is the most-reported number in every model card in this catalog's foundation-model entries — knowing what it actually measures (memorized breadth via multiple choice), its error rate, and its saturation is required literacy for reading any capability claim
- Its life cycle (novel → standard → gamed → saturated → superseded) is the canonical case study in benchmark decay, the dynamic that governs every evaluation decision this vertical documents

## Core Contribution

Methodologically, MMLU moved evaluation from fine-tuned task suites (GLUE-era) to few-shot measurement of knowledge acquired purely in pretraining, at a breadth (57 domains) that resisted narrow optimization — the template every subsequent broad benchmark follows. Its influence exceeded its design: a single aggregate accuracy became the field's de facto capability index, shaping model development priorities and marketing for years, for better and worse.

## Key Results

- GPT-3 (175B) achieved 43.9% few-shot versus 25% random chance, with smaller models near chance — demonstrating scale-emergent breadth of knowledge (paper Table 1, 2020)
- Performance was lopsided: models did worst on calculation-heavy STEM and on socially important domains like law and morality — an early, explicit capability-gap map (2020)
- Models were poorly calibrated — confidence did not track accuracy — flagged by the authors as a core deficiency (2020); by 2024, frontier models exceeded 88%, effectively saturating the benchmark (post-publication)

## Methodology

Questions were manually collected by graduate/undergraduate students from freely available practice exams and study resources, split into a few-shot dev set (5 per subject), validation, and a 14,079-question test set; evaluation is standard 4-way multiple choice, reporting per-subject and aggregate accuracy in zero-shot and 5-shot regimes, with calibration analysis. No training set is provided by design — the benchmark measures what pretraining already instilled.

## Practical Applicability

Read MMLU scores with three corrections: (1) contamination and prompt-format sensitivity inflate/perturb scores by several points, and roughly 1-2% of its questions have errors (MMLU-Redux documents 6.5%+ in audited subsets), so single-point differences are noise; (2) above ~85% the benchmark discriminates poorly — compare frontier models on MMLU-Pro, GPQA, or task-specific evals instead; (3) multiple-choice knowledge recall correlates only loosely with the agentic/generation capabilities most production use cases need. For internal evaluation work, its subject-stratified design remains a good template.

## Limitations & Critiques

Fully saturated at the frontier and known to contain mislabeled or ambiguous questions at a rate material to headline comparisons; multiple-choice format rewards elimination strategies and memorization over reasoning or generation; training-data contamination is pervasive and unquantifiable per-model; and the aggregate score hides that different models reach the same number via different subject profiles. The authors' own successor (MMLU-Pro adds harder, 10-option reasoning-heavy questions) plus GPQA and HLE now serve the discriminative role MMLU no longer can.

## Reproductions & Follow-up Work

Reproduced universally — MMLU appears in effectively every model release since 2021 and every evaluation harness (lm-evaluation-harness, HELM). Successors and audits: MMLU-Pro (2024, harder/10-option), MMLU-Redux (error audit), GPQA (graduate-level, contamination-resistant), and multilingual variants (MMMLU, Global-MMLU). Its saturation is itself a documented research finding driving the current generation of frontier benchmarks.

## Relation to the Arsenal

The capability yardstick referenced across this catalog's foundation-model entries (projects/foundation-models/) and the benchmark-decay case study behind the eval-methodology guidance in content/skills/ and the benchmark entries in projects/benchmarks-and-evals/ (e.g. `mteb` for embeddings is MMLU's counterpart pattern for another modality).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2009.03300)
- [arXiv](https://arxiv.org/abs/2009.03300)
- [Code](https://github.com/hendrycks/test)
- [Venue](https://openreview.net/forum?id=d7KBjmI3GmQ)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
