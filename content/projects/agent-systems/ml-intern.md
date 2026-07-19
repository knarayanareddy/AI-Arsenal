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
org_or_maintainer: "huggingface"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: ml-intern
name: "ml-intern"
artifact_type: tool
category: agents
subcategory: autonomous
description: "Hugging Face's autonomous ML engineer agent that reads papers and docs, trains models, and ships them through Inference Providers and the Hub"
github_url: https://github.com/huggingface/ml-intern
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "agents"
  - "training"
  - "tool-use"
  - "research"
  - "huggingface"
maturity: alpha
cost_model: usage-based
github_stars: 10661
last_commit: "2026-06-18"
docs_url: https://smolagents-ml-intern.hf.space/
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Provides a focused building block for downstream AI workflows"
best_for:
  - "Automating reproducible ML experiment loops"
  - "Learning how agents connect papers, training, and model publishing"
avoid_if:
  - "You need a fully autonomous production training pipeline"
  - "Your data, credentials, or compute cannot be exposed to agent tools"
enrichment_notes: "The agent uses hosted Inference Providers by default and can use local OpenAI-compatible servers; compute billing and sandbox controls are operator concerns. Draft pending review."
---

## Overview

ml-intern is an agentic ML workflow rather than a single training script: it can read papers and documentation, formulate an experiment, run training, and publish a resulting model. Built on smolagents, it gives the catalog a concrete example of an agent spanning research and delivery.

## Why it's in the Arsenal

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. ml-intern is especially useful because agent-driven ml experiment prototypes.

## Architecture

The CLI uses tool calls and provider routing to coordinate reading, coding, training, evaluation, and Hub operations. Hosted calls go through Hugging Face Inference Providers, while local models are selected through LiteLLM-compatible OpenAI endpoints such as vLLM or Ollama; optional Space sandbox tools constrain execution.

## Ecosystem Position

ml-intern complements experiment trackers, training frameworks, and model registries while competing with general-purpose coding agents configured for ML. Its Hugging Face-native path is convenient, but it remains an agent layer rather than a replacement for reliable dataset lineage, cluster scheduling, or human experiment review.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For ml-intern, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Agent-driven ML experiment prototypes; Paper-to-checkpoint workflows in a sandbox. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

Connects research reading, training actions, inference providers, local endpoints, and Hub publishing in one inspectable smolagents workflow.

## Limitations

Autonomous training can consume substantial GPU time, publish flawed checkpoints, or mishandle credentials and data. Hosted inference is usage-billed, local support requires a separate server, and the project is research-oriented; sandboxing and approval gates are necessary before allowing write access to a Hub organization.

## Relation to the Arsenal

ml-intern sits at a distinct boundary in the catalog: provides a focused building block for downstream ai workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/huggingface/ml-intern)
- [Live Space](https://smolagents-ml-intern.hf.space/)
