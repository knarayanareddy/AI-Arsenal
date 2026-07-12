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
org_or_maintainer: "Netflix"
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
id: metaflow
name: "Metaflow"
artifact_type: framework
category: data-pipelines
subcategory: frameworks
description: "Netflix's human-centric framework for building and managing real-life ML/AI systems, structuring workflows as DAGs with versioning, scaling to cloud"
github_url: https://github.com/Netflix/metaflow
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "self-hosted"
  - "fine-tuning"
maturity: production
cost_model: open-source
github_stars: 10165
last_commit: "2026-06-29"
docs_url: https://docs.metaflow.org/
phase: framework
domain:
  - "general-purpose"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "An ML workflow framework that takes data-science code from laptop prototyping to scaled, scheduled production."
best_for:
  - "You want to write ML pipelines as Python DAGs and scale the same code from laptop to cloud"
  - "You need built-in versioning, artifact tracking, and production scheduling for ML workflows"
avoid_if:
  - "You need a general-purpose data-engineering orchestrator beyond ML, where broader schedulers fit"
  - "Your workflow is a single script that gains nothing from DAG structure and infrastructure"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-06-29 activity verified via the GitHub API on 2026-07-12. Cloud scaling relies on configured backends (AWS and others)."
---

## Overview

Metaflow is a human-centric framework, originally from Netflix, for building and managing real-life ML and AI systems. It lets data scientists write workflows as Python step DAGs and then handles the infrastructure concerns, versioning, artifact storage, scaling steps to the cloud, dependency management, and production scheduling, so the same code runs from a laptop to a production deployment.

## Why it's in the Arsenal

Getting ML from notebook to production reliably is a persistent pain point, and Metaflow is a mature, opinionated framework that addresses exactly that lifecycle, making it a valuable frameworks/orchestration entry.

## Architecture

In Metaflow a `FlowSpec` class defines steps connected as a DAG via `self.next()`; each step's inputs and outputs are versioned artifacts persisted automatically to a datastore. A decorator model attaches resource, retry, and environment requirements per step, and step execution can be dispatched to cloud compute (for example AWS Batch or Kubernetes) while a scheduler integration runs flows in production, with a client API and UI to inspect past runs and artifacts.

## Ecosystem Position

Metaflow competes with ML workflow tools like Kubeflow, Flyte, and Prefect, differentiating on developer ergonomics and seamless laptop-to-cloud scaling with automatic artifact versioning. Compared with general-purpose orchestrators it is ML-first and code-centric, and compared with heavier platforms it favors a gentle path from prototype to production, so it complements experiment trackers and serving tools.

## Getting Started

Install with `pip install metaflow`, write a `FlowSpec` with `@step` methods connected by `self.next()`, run locally with `python flow.py run`, then add `@resources`/`@batch` decorators and a scheduler to scale and productionize the same flow.

## Key Use Cases

Structuring ML training pipelines as DAGs; scaling steps to cloud compute; versioning experiments and artifacts; scheduling production ML workflows.

## Strengths

Ergonomic Python DAG API, automatic artifact versioning, laptop-to-cloud scaling, per-step resources and retries, production scheduling, Netflix provenance, and an Apache-2.0 license.

## Limitations

Cloud scaling depends on configured backends, it is ML-focused rather than a general data-engineering orchestrator, and simple single-script tasks gain little from its structure and infrastructure.

## Relation to the Arsenal

It represents ML workflow orchestration alongside the training and data-pipeline entries in the catalog.

## Resources

- [GitHub repository](https://github.com/Netflix/metaflow)
- [Documentation](https://docs.metaflow.org/)
