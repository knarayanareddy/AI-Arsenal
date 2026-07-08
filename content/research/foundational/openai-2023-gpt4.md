---
id: openai-2023-gpt4
title: "GPT-4 Technical Report"
phase: foundational
venue: technical-report
year: 2023
authors:
  - "OpenAI"
  - "Achiam, J."
  - "Adler, S."
  - "et al."
arxiv_id: "2303.08774"
arxiv_url: "https://arxiv.org/abs/2303.08774"
pdf_url: "https://arxiv.org/pdf/2303.08774"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: not-reproduced
result_status: foundational
has_code: false
citation_count_approx: 15000

tldr: "The GPT-4 report: human-professional-level results on real exams (top-10% bar exam), multimodal input, and loss predicted in advance from 1000x-smaller runs — while disclosing no architecture, size, or data details, setting the closed-frontier-report template"
key_contribution: "Demonstrated a capability jump to human-professional exam performance and validated predictable scaling in production (final loss forecast from much smaller runs), while establishing — for better and worse — the modern frontier-model report format: benchmarks and safety analysis without technical disclosure"

builds_on:
  - "brown-2020-gpt3"
  - "ouyang-2022-instructgpt"

tags:
  - "llm"
  - "foundational"
  - "multimodal"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

GPT-4's report matters for two opposite reasons. As a capability document, it marked the jump from "impressive text generator" to "passes professional exams": top-decile bar exam performance, strong results across academic benchmarks, and image-plus-text input. As a publication, it disclosed essentially nothing — no parameter count, architecture, or training data — citing competition and safety, and thereby defined the closed-report genre every frontier lab has followed since.

## Why it's in the Arsenal

- GPT-4 was the capability watershed that made most of the current application stack viable — agents, complex tool use, and reliable structured output all became practical at this capability tier, and "GPT-4-class" remains the informal unit in which model quality is discussed
- The report's predictable-scaling result (final loss forecast from 1,000x-less-compute runs) is the strongest public evidence that scaling-law planning works at frontier scale

## Core Contribution

Three load-bearing results: (1) human-professional exam performance across law, medicine, and academic tests, establishing a new capability tier; (2) infrastructure for predictable scaling — OpenAI reports accurately forecasting GPT-4's final loss and even some downstream capabilities from runs with 1/1,000th the compute; (3) the safety-mitigation pipeline (adversarial red-teaming, RLHF refinements, system-card methodology) that became standard frontier practice.

## Key Results

- Simulated bar exam: ~90th percentile, versus ~10th percentile for GPT-3.5 — the report's headline capability delta (2023)
- MMLU 86.4% (5-shot), then far ahead of all public models, including strong performance across 26 languages (2023)
- Final training loss predicted in advance from smaller runs fitted to a scaling law — predictable scaling validated in production (2023)

## Methodology

Undisclosed by design — the report describes evaluation and safety methodology, not training. Evaluations used held-out human exams (with contamination checks reported per-exam) and standard academic benchmarks; safety assessment combined expert red-teaming across risk domains with quantified refusal/compliance improvements from RLHF. The methodological contribution readers can actually reuse is the system-card format and exam-based evaluation with contamination analysis.

## Practical Applicability

Directly high: GPT-4-class capability defined what production LLM systems could attempt, and the report's exam-based evaluation style shaped how practitioners communicate model quality to non-researchers. Its scaling-prediction result underwrites the industry's budget-planning practice. Read it today as the reference point for the capability tier and as the template — including its omissions — for interpreting every subsequent frontier report.

## Limitations & Critiques

The obvious one: it is unverifiable. No architecture, size, data, or compute details means no external reproduction or scrutiny of the training claims; contamination analyses are self-reported. Critics noted benchmark-based exam claims can overstate real professional competence, and the closed format it normalized measurably reduced what the field learns from frontier runs. Capability-wise, the reported model has long since been superseded, including by open-weight models.

## Reproductions & Follow-up Work

Not reproduced and not reproducible from the report. Its influence flowed through emulation instead: every subsequent frontier release (Gemini, Claude, Llama, DeepSeek reports) adopted variations of its evaluation-and-system-card format, with open labs (Llama 3, DeepSeek-V3) partially reversing the disclosure norm. GPT-4 itself became the de-facto judge model that powered the LLM-as-a-judge evaluation era.

## Relation to the Arsenal

Successor to `brown-2020-gpt3` and `ouyang-2022-instructgpt` (the base-plus-RLHF recipe at frontier scale). Its role as universal judge model connects to `zheng-2023-llm-as-a-judge` (evaluation-and-safety/); open-weight counterpoints with full disclosure are `dubey-2024-llama3` (foundational/) and `deepseek-ai-2025-r1` (training-and-alignment/).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2303.08774)
- [arXiv](https://arxiv.org/abs/2303.08774)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
