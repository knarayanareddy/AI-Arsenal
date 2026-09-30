---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "microsoft"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: microsoft-nni
name: "NNI (Neural Network Intelligence)"
artifact_type: framework
category: tooling
subcategory: frameworks
description: "Microsoft's AutoML toolkit automating hyperparameter tuning, neural architecture search, and model compression across training frameworks and compute"
github_url: https://github.com/microsoft/nni
license: "MIT"
primary_language: "Python"
tags:
  - "fine-tuning"
  - "evaluation"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 14357
last_commit: "2024-07-03"
docs_url: https://nni.readthedocs.io/
phase: framework
domain:
  - "general-purpose"
relation_to_stack:
  - "build-on-top"
  - "study-and-reference"
health_signals:
  - "research-origin"
  - "org-backed"
ecosystem_role:
  - "An AutoML framework that orchestrates hyperparameter search, NAS, and compression across trials and environments."
best_for:
  - "You need systematic hyperparameter tuning or neural architecture search across many trials"
  - "You want framework-agnostic model compression (pruning/quantization) with an experiment manager"
avoid_if:
  - "You need an actively evolving project, since upstream cadence largely stopped after 2024"
  - "You want a fully managed cloud AutoML service rather than a self-hosted toolkit"
enrichment_notes: "Repository, MIT license, and 2024-07-03 activity verified via the GitHub API on 2026-07-12. Upstream cadence slowed; treat as a stable-but-quiet toolkit."
---

## Overview

NNI (Neural Network Intelligence) is Microsoft's open-source AutoML toolkit that automates parts of the machine-learning lifecycle: hyperparameter tuning, neural architecture search (NAS), model compression (pruning and quantization), and feature engineering. It manages experiments as collections of trials and can dispatch them across local machines, remote servers, or clusters, independent of the underlying training framework.

## Why it's in the Arsenal

AutoML and NAS remain important for squeezing performance from models and hardware budgets, and NNI is one of the most complete open toolkits for it, making it a useful, framework-agnostic tooling reference.

## Architecture

NNI separates the experiment manager from trial execution: a tuner (Bayesian, evolutionary, or other search algorithms) proposes hyperparameter or architecture configurations, a training-service abstraction runs the resulting trials on the chosen compute environment, and results feed back to guide the search. Separate modules implement NAS and compression (pruning/quantization) over PyTorch and TensorFlow models, and a web dashboard visualizes trial progress and metrics.

## Ecosystem Position

NNI competes with hyperparameter-optimization libraries like Optuna and Ray Tune and with NAS-specific tools, differentiating by combining hyperparameter tuning, NAS, and model compression in one framework-agnostic toolkit with an experiment dashboard. Compared with a single-purpose HPO library it is broader, and compared with managed cloud AutoML it is self-hosted, though its slowed upstream cadence is a consideration.

## Getting Started

Install with `pip install nni`, annotate your training script's search space, write an experiment config specifying the tuner and training service, and run `nnictl create` to launch trials and open the web dashboard to monitor them.

## Key Use Cases

1. **Where it fits**: "You need systematic hyperparameter tuning or neural architecture search across many trials
2. **Adoption checkpoint**: before building on NNI (Neural Network Intelligence), reproduce the specific claim you are relying on — install it, run it against a representative slice of your data, and record the number that would make you abandon the choice. A project entry can tell you what is claimed; only your own run tells you what is true.

## Strengths

- Beyond the headline description, NNI (Neural Network Intelligence)'s architecture section is the honest source: nNI separates the experiment manager from trial execution: a tuner (Bayesian, evolutionary, or other search algorithms) proposes hyperparameter or architecture configurations, a training-service abstraction runs the resulting trials on the chosen compute environment, and results feed back to guide the search. Separate modules implement NAS and compression (pruning/quantization) over PyTorch and TensorFlow models, and a web dashboard visualizes trial progress and metrics.
- Sits in the framework phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Recorded as beta, so the capability is real while the interface is still moving; pin the version you depend on rather than tracking head.

## Limitations

- The cost this entry cannot quantify for you is operational: the NNI (Neural Network Intelligence) footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- NNI (Neural Network Intelligence) is beta, so the interface and even the scope can change between minor versions; any code written against it should be isolated behind your own boundary rather than imported directly across your codebase.

## Relation to the Arsenal

It represents AutoML, NAS, and model-compression tooling alongside the training and evaluation entries in the catalog.

## Resources

- [GitHub repository](https://github.com/microsoft/nni)
- [Documentation](https://nni.readthedocs.io/)
