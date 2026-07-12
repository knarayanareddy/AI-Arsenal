---
id: attarde-2026-k9-bench
title: "K9-Bench: Evaluating Multimodal LLMs on Canine-Centric Videos"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Khush Attarde
  - Yusuf Ali
  - Megha Thukral
  - Divye Bhutani
  - Thomas Ploetz
  - Zsolt Kira
arxiv_id: '2607.02680'
arxiv_url: https://arxiv.org/abs/2607.02680
pdf_url: https://arxiv.org/pdf/2607.02680
code_url: null
venue_url: https://arxiv.org/abs/2607.02680
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Benchmarks long-horizon multimodal reasoning over domestic dog videos and exposes limits in subtle temporal and compositional understanding."
key_contribution: "Provides approximately 5,000 question-answer pairs over 907 videos across five task categories, with a VLM/LLM-assisted data-construction pipeline and bias-mitigation steps."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - multimodal
  - vision
  - evaluation
  - benchmark
  - research
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

K9-Bench: Evaluating Multimodal LLMs on Canine-Centric Videos is a recent 2026 preprint about a concrete AI engineering evaluation problem.

## Why it's in the Arsenal

The work is useful because it exposes a measurement or reliability failure that can be hidden by aggregate benchmark scores. It is cataloged as a paper-reported result, not as an independently verified production guarantee.

## Core Contribution

Provides approximately 5,000 question-answer pairs over 907 videos across five task categories, with a VLM/LLM-assisted data-construction pipeline and bias-mitigation steps.

## Key Results

The 2026 paper reports that frontier multimodal models outperform open models but still struggle with subtle, long-horizon posture and interaction cues; generic chain-of-thought gives only modest gains.

## Methodology

The authors mine and curate canine videos, generate and filter QA pairs, mitigate model-assisted curation bias, and evaluate multimodal models across task categories.

## Practical Applicability

Use it as a template for low-data multimodal evaluation: test temporal compositionality and curation bias, not only caption quality.

## Limitations & Critiques

The domain is intentionally narrow, video licensing and curation choices matter, and model rankings may not transfer to other low-data domains. Independent reproduction is not established.

## Reproductions & Follow-up Work

Audit source rights and annotation quality, reproduce with held-out videos, and adapt the construction pipeline to the target domain before using the benchmark operationally.

## Relation to the Arsenal

This entry complements the Arsenal's research, evaluation, multimodal, code-generation, and retrieval content. Use it to design a controlled test and record the assumptions that matter for your workload.

## Resources

- [Primary source](https://arxiv.org/abs/2607.02680)
- [PDF](https://arxiv.org/pdf/2607.02680)
- [Project website](https://ogmenrobotics.github.io/K9Bench)
