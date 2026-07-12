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
org_or_maintainer: "kedro-org"
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
id: kedro
name: "Kedro"
artifact_type: framework
category: data-pipelines
subcategory: frameworks
description: "A Python framework that applies software-engineering best practices to data science, structuring reproducible, maintainable"
github_url: https://github.com/kedro-org/kedro
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "self-hosted"
maturity: production
cost_model: open-source
github_stars: 10911
last_commit: "2026-07-09"
docs_url: https://docs.kedro.org/
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
  - "A framework that imposes software-engineering structure (nodes, pipelines, data catalog) on data-science projects."
best_for:
  - "You want to turn ad-hoc notebooks into modular, testable, reproducible data-science pipelines"
  - "You need a data catalog and config abstraction that decouples code from storage locations"
avoid_if:
  - "You need a runtime scheduler/executor, since Kedro structures code but relies on runners to deploy"
  - "Your project is a throwaway script that does not benefit from project structure"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-09 activity verified via the GitHub API on 2026-07-12. Structures pipelines; production scheduling uses plugins/runners."
---

## Overview

Kedro is an open-source Python framework that brings software-engineering best practices, modularity, reproducibility, testability, and separation of concerns, to data-science and data-engineering code. It structures a project into pure functions called nodes wired into pipelines, and a Data Catalog that abstracts where and how datasets are stored, so notebook-style analysis becomes maintainable, versionable code.

## Why it's in the Arsenal

Data-science code is notoriously hard to maintain, and Kedro provides an opinionated structure that makes ML/data pipelines modular and reproducible, which is a valuable engineering-discipline entry complementing the runtime orchestrators.

## Architecture

A Kedro project defines nodes (pure Python functions with named inputs/outputs) composed into pipelines, while the Data Catalog maps dataset names to concrete storage (files, databases, cloud) via YAML configuration, decoupling code from I/O. Configuration, parameters, and credentials are layered by environment, a session/runner executes pipelines, and plugins (kedro-viz, deployment integrations) add visualization and paths to schedulers like Airflow or Kubeflow.

## Ecosystem Position

Kedro complements orchestrators like Airflow, Flyte, and Metaflow rather than replacing them: it structures and standardizes the Python code, then deploys onto a runner or scheduler. Compared with a bare scripting approach it enforces modularity and a data catalog, and compared with full orchestration platforms it focuses on project structure and reproducibility rather than execution infrastructure.

## Getting Started

Install with `pip install kedro`, scaffold a project with `kedro new`, define nodes and pipelines and register datasets in the Data Catalog YAML, run with `kedro run`, and visualize with `kedro viz`; deployment plugins export to schedulers.

## Key Use Cases

Turning notebooks into maintainable pipelines; standardizing data-science project structure; reproducible, testable ML preprocessing; decoupling code from storage via the Data Catalog.

## Strengths

Enforced modularity and reproducibility, a storage-abstracting Data Catalog, layered configuration, pipeline visualization, deployment plugins, production maturity, and an Apache-2.0 license.

## Limitations

It structures code but is not itself a scheduler/executor, relying on runners for production; it adds project conventions to learn; and throwaway scripts gain little from its structure.

## Relation to the Arsenal

It provides engineering structure that pairs with the orchestration and training entries in the catalog.

## Resources

- [GitHub repository](https://github.com/kedro-org/kedro)
- [Documentation](https://docs.kedro.org/)
