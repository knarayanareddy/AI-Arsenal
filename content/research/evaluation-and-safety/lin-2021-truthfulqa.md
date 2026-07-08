---
id: lin-2021-truthfulqa
title: "TruthfulQA: Measuring How Models Mimic Human Falsehoods"
phase: evaluation-and-safety
venue: acl
year: 2021
authors:
  - "Lin, S."
  - "Hilton, J."
  - "Evans, O."
arxiv_id: "2109.07958"
arxiv_url: "https://arxiv.org/abs/2109.07958"
pdf_url: "https://arxiv.org/pdf/2109.07958"
code_url: "https://github.com/sylinrl/TruthfulQA"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 0

tldr: "A benchmark of questions engineered to trigger common human misconceptions, revealing that larger models can be *less* truthful because they better imitate popular false beliefs in their training data -- truthfulness is not a free byproduct of scale"
key_contribution: "A 817-question adversarial benchmark spanning many categories designed so that imitating training-text patterns yields false answers, empirically demonstrating inverse scaling on truthfulness and providing an evaluation (with automated 'GPT-judge' scoring) for the imitative-falsehood failure mode"

builds_on: []
implemented_in: []

tags:
  - evaluation
  - llm
  - research
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

TruthfulQA is a benchmark that measures whether a model gives *truthful* answers to questions crafted to elicit common human misconceptions (about health, law, finance, myths, and more). The questions are adversarially designed so that a model which faithfully imitates its training text will reproduce popular falsehoods.

## Why it's in the Arsenal

- It isolated and named a counterintuitive, safety-relevant failure: truthfulness does not automatically improve with scale and can get worse, because bigger models imitate human falsehoods more fluently. That reframed "capability" vs "truthfulness" as distinct axes.
- `practical_applicability: high`: TruthfulQA is a standard component of LLM evaluation suites, so any team benchmarking models will encounter and should understand it.

## Core Contribution

Most QA benchmarks reward matching common text patterns. TruthfulQA's contribution is deliberately weaponizing that: questions are selected where the statistically likely (imitative) answer is *false*. This exposed inverse scaling on truthfulness — larger models scored worse on some categories — and supplied both a human-evaluation protocol and an automated "GPT-judge" classifier to score truthful and informative answers at scale.

## Key Results

- Demonstrated that the largest models tested were often *less* truthful than smaller ones on these adversarial questions, decoupling truthfulness from raw capability (see the paper for per-model numbers)
- Provided an automated judge that correlates with human truthfulness labels, enabling reproducible scoring

## Methodology

Curate 817 questions across ~38 categories where common misconceptions exist, with reference true/false answer sets. Evaluate model outputs for truthfulness and informativeness via human raters and a fine-tuned automated judge. Report truthful-and-informative rates per model.

## Practical Applicability

Use TruthfulQA when you need to probe a model's tendency to confidently repeat popular falsehoods — a real risk for consumer-facing assistants. The practical caveats: it targets imitative falsehoods specifically (not all hallucination), and because it is a well-known public benchmark, high scores on it can reflect training-set contamination rather than genuine truthfulness, so pair it with private evaluations.

## Limitations & Critiques

TruthfulQA measures a specific failure mode (imitative falsehoods on curated topics), not general factuality or hallucination, and the automated judge is imperfect. As a popular public set it is prone to contamination and optimization pressure, and RLHF-tuned models have since improved on it — so a high score today is weaker evidence of truthfulness than it once was. Treat it as one lens, not a truthfulness certificate.

## Reproductions & Follow-up Work

Official data and code are public (sylinrl/TruthfulQA) and it is integrated into major eval harnesses (e.g. lm-evaluation-harness, HELM), making it thoroughly reproduced. It complements hallucination and factuality research and is routinely reported in model release cards.

## Relation to the Arsenal

Read with `huang-2023-hallucination-survey` (broader hallucination context) and `hendrycks-2020-mmlu` / `chiang-2024-chatbot-arena` (this folder) as part of the evaluation toolkit. Relevant to guardrail and evaluation tools in the projects/observability catalogs that test factuality.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2109.07958)
- [arXiv](https://arxiv.org/abs/2109.07958)
- [Official Code](https://github.com/sylinrl/TruthfulQA)
