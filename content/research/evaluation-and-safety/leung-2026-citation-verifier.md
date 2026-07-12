---
id: leung-2026-citation-verifier
title: Do You Need a Frontier Model as a Citation Verifier? Benchmarking Rubric LLMs for Deep-Research Source Attribution
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Ethan Leung
  - Elias Lumer
  - Corey Feld
  - Austin Huber
  - Vamse Kumar Subbiah
  - Kevin Paul
arxiv_id: '2607.08700'
arxiv_url: https://arxiv.org/abs/2607.08700
pdf_url: https://arxiv.org/pdf/2607.08700
code_url: null
venue_url: https://arxiv.org/abs/2607.08700
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Compares eight LLM judges on deep-research citation attribution and shows why aggregate F1 is insufficient for controlling verifier bias."
key_contribution: "Separates source relevance from factual support across 1,248 rubric decisions and exposes judge-specific false-positive and false-negative tendencies that can distort a reward or acceptance loop."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - evaluation
  - research
  - llm
  - structured-output
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

This preprint evaluates whether a smaller or cheaper language model can verify citations in deep-research answers as reliably as a frontier judge. It treats citation quality as more than URL presence: a citation must be relevant to the claim and provide factual support. That decomposition makes the paper relevant to systems that use an LLM judge for answer acceptance, ranking, or reinforcement signals.

## Why it's in the Arsenal

Citation verification is a control point in retrieval-heavy applications. A judge that rewards plausible but weak sources can make a research agent look better while amplifying unsupported claims. The paper is useful because it focuses on directional error and pass-rate drift rather than presenting one agreement number as the entire evaluation.

## Core Contribution

The authors compare eight judges over 1,248 rubric decisions and separate relevance from support. The important engineering result is the evaluation frame: two judges can have similar aggregate F1 while one systematically accepts unsupported citations and another rejects valid but indirect evidence. Those asymmetries matter when the score is used as a gate or reward.

## Key Results

- The paper reports that cheaper judges can be competitive with frontier judges on parts of the citation rubric (2026).
- It identifies directional bias and pass-rate drift that scalar F1 can hide (2026).
- The reported comparisons are judge- and rubric-specific; they are not evidence that one model is a universal citation verifier (2026).

## Methodology

The study defines a citation rubric, collects human-reviewed decisions, and compares judge outputs against those decisions. Relevance and factual support are analyzed separately, then error direction is considered alongside aggregate metrics. The protocol is closer to calibrating an evaluator than to testing a retrieval model.

## Practical Applicability

Use the rubric decomposition when building a deep-research acceptance gate. Track false accepts and false rejects separately, stratify by claim type and source distance, and calibrate the judge on fresh human labels. If the score drives model training or routing, monitor drift after every judge or prompt change.

## Limitations & Critiques

The preprint does not establish independent reproduction, and judge behavior depends on rubric wording, source types, claim difficulty, and model versions. Human labels can also encode disagreement about what counts as sufficient support. A calibrated judge is still not a substitute for source provenance or a reviewer in high-consequence domains.

## Reproductions & Follow-up Work

Re-run the protocol with the application’s own source mix and claims, publish the confusion matrix by rubric dimension, and test temporal drift. Compare the same judges with blinded source order and adversarially selected citations before using scores as rewards.

## Relation to the Arsenal

This paper connects citation-grounded RAG, deep-research agents, LLM-as-judge calibration, and observability. It should be read as an evaluator-design reference rather than a recommendation to replace human source review with a cheaper model.

## Resources

- [Primary source](https://arxiv.org/abs/2607.08700)
- [HTML paper](https://arxiv.org/html/2607.08700v1)
