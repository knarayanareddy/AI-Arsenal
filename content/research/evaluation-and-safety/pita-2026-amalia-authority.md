---
id: pita-2026-amalia-authority
title: 'Validity of LLMs as Data Annotators: AMALIA on Authority'
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Manuel Pita
arxiv_id: '2607.08731'
arxiv_url: https://arxiv.org/abs/2607.08731
pdf_url: https://arxiv.org/pdf/2607.08731
code_url: null
venue_url: https://arxiv.org/abs/2607.08731
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
citation_count_approx: 0
has_code: false
tldr: "Tests whether agreement between the Portuguese AMALIA model and human authority annotations reflects valid construct reasoning or surface-correlated shortcuts."
key_contribution: "Introduces a recovery-gap diagnostic that decomposes a holistic annotation prompt into theory-grounded clauses and checks whether the same construct survives recombination."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - evaluation
  - research
  - llm
  - reasoning
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

This paper asks whether an LLM that agrees with trained human annotators is measuring the intended construct or merely exploiting correlated surface cues. The case study uses AMALIA, a publicly funded 9B-parameter European Portuguese model, and the moral-foundation construct of authority.

## Why it's in the Arsenal

Agreement is often used as the acceptance criterion for an LLM annotator. The paper is a useful warning that reliability and validity are different: an evaluator can reproduce labels while reaching them through a shortcut that fails when the prompt is decomposed or the language changes.

## Core Contribution

The recovery-gap diagnostic starts with a holistic annotation prompt, decomposes it into the atomic clauses of the construct’s codebook, and recombines those clauses using the theory’s explicit rule. If calibration closes the gap between holistic and decomposed performance, the instrument has stronger evidence of construct validity. If performance collapses, agreement may be relying on surface correlations.

## Key Results

- On the studied Portuguese corpus, decomposition recovers only about half of AMALIA’s holistic performance (2026).
- Error analysis points to surface correlates, including moral outrage near authority figures, rather than reliable theory-grounded inference (2026).
- An open multilingual model closes the recovery gap on the same corpus under the same instructions, suggesting the corpus alone does not explain the failure (2026).
- The paper frames AMALIA as useful for screening and pre-coding, but not yet as a stand-alone measure of the construct (2026).

## Methodology

The study compares holistic and theory-decomposed annotation prompts on one construct and one corpus, then examines errors and transfer between an English-calibrated instrument, AMALIA-9B, and European Portuguese. The recovery gap is the primary diagnostic: it tests the route to agreement rather than only the final agreement score.

## Practical Applicability

Use the diagnostic when evaluating LLM annotators for latent or theory-laden labels. Pair agreement metrics with prompt decomposition, counterfactual cases, cross-language transfer, and human review of shortcut errors. A model that matches labels only in the holistic prompt should remain a pre-coder with sampling and adjudication, not a silent replacement for trained annotators.

## Limitations & Critiques

This is one model, one construct, one language setting, and one corpus. A recovery gap may reflect prompt difficulty or an incomplete decomposition as well as model invalidity. The paper is a single counterexample, not evidence that national models or LLM annotation generally fail.

## Reproductions & Follow-up Work

Apply the recovery-gap protocol to multiple constructs, languages, model sizes, and codebooks. Publish the atomic clauses, human disagreement, calibration procedure, and error categories so another team can distinguish a model shortcut from a flawed construct decomposition.

## Relation to the Arsenal

AMALIA on Authority complements evaluator calibration, benchmark design, and structured-output research. It makes construct validity a first-class concern for any catalog entry that recommends an LLM judge or annotator.

## Resources

- [Primary source](https://arxiv.org/abs/2607.08731)
- [HTML paper](https://arxiv.org/html/2607.08731v1)
