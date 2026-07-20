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
org_or_maintainer: tensorzero
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 2
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: archived
id: tensorzero
name: TensorZero
artifact_type: platform
category: observability
subcategory: platforms
description: An open-source LLMOps platform in Rust unifying an LLM gateway, observability, evaluation, and data-driven optimization into a feedback loop for improving LLM
github_url: https://github.com/tensorzero/tensorzero
license: Apache-2.0
primary_language: Rust
tags:
  - observability
  - llm
  - evaluation
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 11692
last_commit: '2026-06-11'
docs_url: https://www.tensorzero.com/docs
phase: agent-system
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - An LLMOps platform that turns gateway traffic and feedback into evaluation and optimization of prompts and models.
best_for:
  - You want a high-performance gateway that also captures inferences and feedback to drive evaluation and optimization
  - You need a closed feedback loop (log, evaluate, optimize) over your LLM calls rather than separate tools
avoid_if:
  - You only need a simple provider proxy without the observability and optimization machinery
  - You are not ready to instrument feedback signals that the optimization features depend on
enrichment_notes: Repository, Apache-2.0 license, and 2026-06-11 activity verified via the GitHub API on 2026-07-12. Optimization value depends on collecting quality feedback signals.
---

## Overview

TensorZero is an open-source LLMOps platform, written in Rust for performance, that unifies four things usually handled by separate tools: an LLM gateway, observability, evaluation, and optimization. The premise is a feedback loop, route inference through the gateway, log inputs/outputs and feedback, evaluate quality, then use that data to optimize prompts and model choices over time.

## Why it's in the Arsenal

It is a distinctive attempt to close the loop between serving and improvement, treating production LLM traffic and feedback as the training signal for optimization, which is a forward-looking pattern for the observability and LLMOps area.

## Architecture

A fast Rust gateway fronts many LLM providers behind one API and records structured inferences and associated feedback (metrics, comparisons, human labels) to a data store. On top of that dataset it provides observability dashboards, evaluation runs, and optimization recipes (for example prompt selection or fine-tuning data curation), so the same traffic that serves users also feeds systematic improvement.

## Ecosystem Position

TensorZero overlaps with gateways like LiteLLM and Portkey and with observability tools like Langfuse and Phoenix, but differentiates by combining gateway, observability, evaluation, and optimization into one feedback loop rather than a single slice. Compared with a pure proxy it captures the data needed to improve applications, and compared with standalone tracing it adds the optimization step that consumes that data.

## Getting Started

Run the gateway (Docker) configured with your provider keys, point your application's LLM calls at it, define metrics/feedback to collect, then use the observability and evaluation UIs and optimization recipes as data accumulates.

## Key Use Cases

Unified LLM gateway with built-in logging; systematic evaluation of production traffic; data-driven prompt and model optimization; consolidating LLMOps tooling into one platform.

## Strengths

High-performance Rust gateway, integrated observability and evaluation, a concrete optimization loop, provider-agnostic routing, self-hostable, and an Apache-2.0 license.

## Limitations

The optimization value depends on collecting meaningful feedback signals, the integrated approach is heavier than a simple proxy, and adopting it means instrumenting feedback and running additional infrastructure.

## Relation to the Arsenal

It connects the gateway, observability, and evaluation themes into one platform alongside the standalone tools in those areas.

## Resources

- [GitHub repository](https://github.com/tensorzero/tensorzero)
- [Documentation](https://www.tensorzero.com/docs)
