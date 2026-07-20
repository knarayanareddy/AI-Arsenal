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
org_or_maintainer: Marker-Inc-Korea
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 4
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: autorag
name: AutoRAG
artifact_type: framework
category: rag
subcategory: advanced-rag
description: AutoML-style framework for evaluating and optimizing retrieval-augmented-generation pipelines
github_url: https://github.com/Marker-Inc-Korea/AutoRAG
license: Apache-2.0
primary_language: Python
tags:
  - rag
  - retrieval
  - evaluation
  - benchmark
  - research
maturity: beta
cost_model: open-source
github_stars: 4932
last_commit: '2026-07-20'
docs_url: https://marker-inc-korea.github.io/AutoRAG/
phase: data-and-retrieval
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - community-driven
  - research-origin
ecosystem_role:
  - RAG pipeline optimizer that complements retrieval libraries and competes with manual benchmark-and-tune workflows
best_for:
  - Comparing retrievers, rerankers, prompts, and generators on a fixed corpus
  - Automating RAG configuration search before production pipeline selection
avoid_if:
  - You need current connector synchronization or a production serving API
  - Your benchmark corpus and evaluator are not stable enough for automated comparisons
enrichment_notes: Default-branch last commit is 2026-04-03; do not mark actively-maintained. AutoML results depend on benchmark data and model/provider costs. Draft pending review.
---

## Overview

AutoRAG applies an AutoML-style workflow to RAG pipeline design: define a corpus and evaluation task, enumerate retrievers, rerankers, prompts, and generators, then measure combinations to identify a stronger configuration. It includes data creation and pipeline modules rather than stopping at a leaderboard script.

## Why it's in the Arsenal

It earns a slot because RAG teams often tune components manually without knowing whether a change improved retrieval, generation, or evaluator artifacts. AutoRAG makes the search space and score-driven selection explicit, giving researchers a repeatable way to compare pipeline variants under one framework.

## Architecture

The framework separates corpus/question preparation, retrieval, reranking, generation, evaluation, and optimization stages. YAML or Python configuration selects modules and model providers; experiment outputs record scores and selected settings, while optional GPU dependencies support local models.

## Ecosystem Position

AutoRAG complements FlashRAG and RAGLite and competes with hand-built RAG evaluation notebooks and commercial optimization platforms. It is an experiment-and-selection layer, not a connector service or a low-latency serving runtime.

## Getting Started

Install `AutoRAG` with `pip install AutoRAG`, or add the documented `AutoRAG[gpu]` and parsing extras for local models and document processing. Prepare the required corpus and QA data, run the quick-start pipeline, then compare one controlled baseline before enabling broader optimization.

## Key Use Cases

Use it to select retrieval and reranking combinations, benchmark RAG changes against a fixed dataset, and generate evaluation data for domain-specific questions. It is particularly useful before freezing a production pipeline configuration.

## Strengths

The modular pipeline, automated search, data-creation utilities, and Apache-2.0 license provide a practical bridge between RAG research and engineering evaluation. The project exposes intermediate results rather than only a final answer score.

## Limitations

The default-branch last commit is 2026-04-03, so maintenance should be treated as community/research-origin rather than active. Search results depend on corpus quality, evaluator choice, provider cost, and random seeds; optimization can overfit the benchmark.

## Relation to the Arsenal

It sits alongside the Arsenal's RAG toolkits and evaluation entries, complementing production retrieval platforms while competing with manual tuning notebooks. Its output is a chosen pipeline configuration, not an agent or hosted index.

## Resources

- [GitHub](https://github.com/Marker-Inc-Korea/AutoRAG)
- [Documentation](https://marker-inc-korea.github.io/AutoRAG/)
