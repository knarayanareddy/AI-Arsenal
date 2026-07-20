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
org_or_maintainer: ruc-datalab
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 1
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: deepanalyze
name: DeepAnalyze
artifact_type: model
category: agents
subcategory: autonomous
description: RUC DataLab's DeepAnalyze-8B agentic LLM and framework for autonomous data preparation, analysis, modeling, visualization, and report generation
github_url: https://github.com/ruc-datalab/DeepAnalyze
license: MIT
primary_language: Python
tags:
  - agents
  - reasoning
  - data
  - tool-use
  - research
maturity: alpha
cost_model: open-source
github_stars: 4379
last_commit: '2026-07-01'
docs_url: https://ruc-deepanalyze.github.io
phase: agent-system
domain:
  - language
  - reasoning
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - research-origin
  - community-driven
ecosystem_role:
  - Open 8B autonomous data-science agent with model, code, data, and UI
  - Execution-grounded analyst workflow for mixed structured and unstructured files
best_for:
  - Open-ended analysis over mixed business data
  - Research on execution-grounded data-science agents
avoid_if:
  - You need certified financial or scientific analysis without review
  - Your environment cannot sandbox generated Python and file access
enrichment_notes: DeepAnalyze is an academic/research release with a Docker sandbox option, open model, code, and training data; its reports require independent validation. Draft pending review.
---

## Overview

DeepAnalyze-8B is aimed at the full data-science arc: discovering relevant files, preparing data, writing executable analysis, making visualizations, and producing a report. It accepts structured, semi-structured, and unstructured sources, making it a useful reference for agents that must do more than answer a pre-shaped table query.

## Why it's in the Arsenal

DeepAnalyze belongs in the Arsenal because it attempts the entire data-science loop: discovering files, preparing data, writing analysis code, producing visualizations, and generating a report. The release includes the DeepAnalyze-8B model, code, training data, a web UI, and Docker execution support, making the agent loop unusually inspectable.

## Architecture

The demo deploys the model with vLLM and wraps it in a web UI/API that can execute generated code in a Docker-based sandbox. Agent reasoning alternates data inspection and tool execution, with the resulting artifacts feeding report synthesis; deployment can also expose OpenAI-style endpoints and Jupyter integrations.

## Ecosystem Position

DeepAnalyze complements notebook copilots, RAG systems, and data-agent frameworks while competing with hosted autonomous analyst products. Its open model and DataScience-Instruct-500K training data make the pipeline inspectable, but the system sits below governance layers that enforce data access, deterministic math, provenance, and analyst sign-off.

## Getting Started

Download DeepAnalyze-8B, serve it with `vllm serve DeepAnalyze-8B`, install the demo frontend dependencies, and launch the supplied backend and UI scripts. Prefer the WebUI v2 Docker sandbox for untrusted generated code, and test with a small CSV or JSON corpus before connecting databases or sensitive files.

## Key Use Cases

Use it for exploratory analysis across CSV, Excel, JSON, Markdown, and database-like sources, or for research into execution-grounded data-science agents. It can generate analyst-style reports and visualizations, but numerical conclusions should be checked with deterministic code and a human analyst.

## Strengths

The open release covers model, repository, DataScience-Instruct-500K training data, demo, API, Jupyter integration, and Docker-based code execution. vLLM support and an OpenAI-style endpoint make the 8B model accessible to existing serving and UI patterns.

## Limitations

Generated code can leak data, silently choose poor transformations, or produce persuasive but wrong reports. Docker isolation reduces risk but is not a complete policy boundary; the 8B model and vLLM deployment need GPU resources, and research benchmarks do not establish correctness on regulated or proprietary datasets.

## Relation to the Arsenal

DeepAnalyze complements data pipelines, notebook tools, RAG, and sandbox runtimes such as OpenShell, while competing with hosted autonomous analyst products. It occupies the data-agent layer; governance, provenance, deterministic calculations, and approval workflows belong to neighboring Arsenal components.

## Resources

- [GitHub](https://github.com/ruc-datalab/DeepAnalyze)
- [Project site](https://ruc-deepanalyze.github.io)
