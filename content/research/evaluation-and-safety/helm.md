---
id: helm
title: Holistic Evaluation of Language Models
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2022
authors:
- Percy Liang
- Rishi Bommasani
- Tony Lee
- et al.
arxiv_id: '2211.09110'
arxiv_url: https://arxiv.org/abs/2211.09110
pdf_url: https://arxiv.org/pdf/2211.09110
code_url: https://github.com/stanford-crfm/helm
venue_url: null
practical_applicability: high
reproduction_status: code-available
result_status: foundational
has_code: true
citation_count_approx: 0
tldr: HELM established a reproducible evaluation framework that compares language
  models across scenarios and multiple quality, robustness, fairness, and efficiency
  metrics rather than relying on one accuracy leaderboard.
key_contribution: The paper introduced a scenario-and-metric evaluation matrix with
  standardized model adapters, shared prompts, and transparent reports so model comparisons
  include calibration, robustness, fairness, bias, toxicity, and efficiency alongside
  accuracy.
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
- evaluation
- benchmark
- llm
- research
- foundational
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
enrichment_status: draft
---

## Overview

Holistic Evaluation of Language Models (HELM) proposed evaluating foundation models across a shared set of scenarios and metrics instead of treating one benchmark score as a complete model description. The associated Stanford framework made the paper operational by standardizing model interfaces, prompts, metrics, and public result tables.

## Why it's in the Arsenal

HELM is a foundational reference for anyone designing a model evaluation program: it made the tradeoff between capability, calibration, robustness, fairness, bias, toxicity, and efficiency explicit. The paper remains useful even though the current framework is in maintenance mode, because its scenario-and-metric decomposition is a durable design pattern rather than a claim that its original model rankings remain current.

## Core Contribution

The central contribution is a holistic evaluation matrix. A scenario defines the task, data, and model interaction; standardized adapters run multiple models through comparable prompts; and metric modules score more than task accuracy. The original release covered dozens of scenarios and models and reported the results through reproducible tables and a public leaderboard, exposing where a model's strengths and weaknesses changed with the evaluation dimension.

## Key Results

The paper's evaluation showed that no model dominated across all scenarios and metrics: rankings changed when moving from accuracy to calibration, robustness, fairness, toxicity, or efficiency. It also documented uneven reporting practices and cases where a model that looked strong on a capability task carried meaningful tradeoffs elsewhere. Those conclusions, rather than any single 2022 leaderboard position, are the result most worth carrying into a current evaluation stack.

## Methodology

HELM defines scenario-specific prompts and datasets, routes each model through a common interface, and computes a portfolio of metrics over the resulting outputs. The framework records raw responses and metadata so researchers can inspect metric disagreements and rerun a scenario when a model, prompt, or implementation changes. Baselines are the participating language models evaluated under the same scenario matrix, not a single privileged reference system.

## Practical Applicability

Use HELM's structure when creating an internal model scorecard: select representative scenarios, define quality and risk metrics before testing, preserve prompts and model versions, and publish disaggregated results instead of one weighted number. Its framework is more useful as a blueprint for transparent evaluation than as a turnkey answer for a domain whose data, policies, or providers were not in the original suite.

## Limitations & Critiques

Scenario coverage and metric choice determine what 'holistic' means; a broad matrix can still omit the failure modes that matter to a particular product. Provider access, prompt formatting, model updates, contamination, and changing safety policies also limit comparability across years. The repository's maintenance-mode notice means current users should verify which scenarios and adapters still run, rather than assuming the original leaderboard is an up-to-date ranking.

## Reproductions & Follow-up Work

The open framework and standardized scenario definitions make partial reproduction feasible, but full reproduction depends on provider access, exact model versions, and expensive inference. A modern follow-up should add agent trajectories, tool-use authorization, retrieval grounding, multimodal interaction, and domain-specific human review while preserving HELM's insistence on raw artifacts and disaggregated metrics.

## Relation to the Arsenal

HELM is the conceptual predecessor to the Arsenal's evaluation tools: EvalScope and OpenJudge provide more current execution paths, while observability tools can supply production traces for the scenario matrix. It belongs in research because its primary contribution is an evaluation methodology and evidence standard, not a serving runtime.

## Resources

- [Paper](https://arxiv.org/abs/2211.09110)
- [PDF](https://arxiv.org/pdf/2211.09110)
- [HELM framework](https://github.com/stanford-crfm/helm)
- [Documentation](https://crfm-helm.readthedocs.io/en/latest/)
