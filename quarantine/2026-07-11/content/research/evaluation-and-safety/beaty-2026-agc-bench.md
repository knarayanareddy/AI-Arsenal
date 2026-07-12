---
id: beaty-2026-agc-bench
title: "AGC-Bench: Measuring Artificial General Creativity"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Roger Beaty
  - Vijeta Deshpande
  - Clin K.Y. Lai
  - Anna Attuch
  - Namrata Shivagunde
  - Swastik Roy
  - Rajkumar Pujari
  - Paul V. DiStefano
  - Sherin Muckatira
  - Claire E. Stevenson
  - Mikhail Gronas
  - Anna Rumshisky
arxiv_id: '2607.01152'
arxiv_url: https://arxiv.org/abs/2607.01152
pdf_url: https://arxiv.org/pdf/2607.01152
code_url: null
venue_url: https://arxiv.org/abs/2607.01152
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Builds a broad creativity benchmark and judge-calibration pipeline for comparing language-model creativity across domains."
key_contribution: "Releases 78 creativity datasets with an agentic harness and applies Judge Response Theory to calibrate evaluator severity before producing an open AGC-Judge model."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - evaluation
  - benchmark
  - llm
  - research
  - agents
  - alignment
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

AGC-Bench: Measuring Artificial General Creativity is a recent 2026 preprint about releases 78 creativity datasets with an agentic harness and applies Judge Response Theory to calibrate evaluator severity before producing an open AGC-Judge model.

## Why it's in the Arsenal

The work addresses a concrete engineering question around agent memory, retrieval, evaluation, or reliability. It is included as a paper-reported result, not as an independently verified production recommendation.

## Core Contribution

Releases 78 creativity datasets with an agentic harness and applies Judge Response Theory to calibrate evaluator severity before producing an open AGC-Judge model.

## Key Results

The 2026 paper reports a single creativity factor explaining 81.5% of variance across 83 LLMs, stronger benefit from “be creative” prompting than reasoning prompts, and a human lead on a matched subset.

## Methodology

The authors review 3,101 papers and 497 benchmarks, standardize tasks, calibrate judge responses, fine-tune a judge, and analyze model and human results.

## Practical Applicability

Use it as a reminder to define creativity dimensions, calibrate judges, and preserve human reference sets rather than relying on one scalar score.

## Limitations & Critiques

Creativity tasks and judge calibration embed cultural and domain assumptions; the factor structure and leaderboard may change with dataset and model selection. Independent reproduction is pending.

## Reproductions & Follow-up Work

Re-run with held-out tasks, human adjudication, judge prompt audits, and domain-specific reliability estimates before using scores for model selection.

## Relation to the Arsenal

This paper complements the Arsenal's research, agent, retrieval, evaluation, and observability entries. Use its claims to form hypotheses and test plans rather than to replace workload-specific measurements.

## Resources

- [Primary source](https://arxiv.org/abs/2607.01152)
- [PDF](https://arxiv.org/pdf/2607.01152)
