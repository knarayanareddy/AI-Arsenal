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
org_or_maintainer: deepseek-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 6
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: deepspec
name: DeepSpec
artifact_type: library
category: llms
subcategory: libraries
description: DeepSeek's full-stack codebase for preparing data, training draft models, and evaluating speculative-decoding acceptance rates
github_url: https://github.com/deepseek-ai/deepspec
license: MIT
primary_language: Python
tags:
  - efficiency
  - inference
  - training
  - benchmark
  - llm
maturity: alpha
cost_model: open-source
github_stars: 6702
last_commit: '2026-07-09'
docs_url: https://github.com/deepseek-ai/deepspec
phase: training-and-alignment
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - research-origin
ecosystem_role:
  - Full-stack speculative-decoding draft-model training and evaluation codebase
  - Upstream checkpoint source for faster LLM inference engines
best_for:
  - Training draft models for faster LLM decoding
  - Reproducing speculative-decoding algorithm comparisons
avoid_if:
  - You lack an 8-GPU node or a compatible target model
  - Your latency bottleneck is retrieval or networking rather than decode
enrichment_notes: Default scripts assume a single node with eight GPUs and benchmark results depend on target/draft pairing; third-party notices must be reviewed. Draft pending review.
---

## Overview

DeepSpec focuses on the less visible model-training side of speculative decoding: creating a draft model that can propose tokens cheaply enough for a larger target model to accept many of them. The repository is useful because it includes data preparation, training, released checkpoints, and evaluation rather than only an algorithm sketch.

## Why it's in the Arsenal

DeepSpec earns a slot because it covers the full experimental path for speculative decoding: data preparation, draft-model training, released checkpoints, and acceptance evaluation. Supporting DSpark, DFlash, and Eagle3-style approaches makes it a useful bridge between research papers and inference-engine integration.

## Architecture

The workflow serves a target model to regenerate answers, caches training data, trains DSpark, DFlash, or Eagle3-style drafts, and measures acceptance on tasks such as GSM8K, HumanEval, and LiveCodeBench. Config-driven Python scripts spawn one worker per visible GPU and write step checkpoints for later evaluation.

## Ecosystem Position

DeepSpec complements inference engines that implement speculative decoding and competes with other draft-model training stacks. It is upstream of serving: a good checkpoint can lower decode latency and tokens per accepted output, but the library does not itself provide the production gateway, scheduler, or target-model runtime.

## Getting Started

Install the requirements with `python -m pip install -r requirements.txt`, prepare target outputs using an inference engine, and select a configuration under `config/`. Run `train.sh` with the visible GPUs available, then use `eval.sh` with the target model and draft checkpoint on the listed benchmark datasets.

## Key Use Cases

Use DeepSpec to reproduce speculative-decoding comparisons, train a draft model for a specific Qwen or Gemma target, or measure acceptance on coding and math workloads before deploying a faster serving path. Re-train when target reasoning mode or domain prompts differ from the released setup.

## Strengths

The repository includes data scripts, configurable multi-GPU training, DSpark/DFlash/Eagle3 draft implementations, checkpoint output conventions, and evaluation over GSM8K, HumanEval, MBPP, LiveCodeBench, and other tasks. That coverage exposes the acceptance-rate trade-off rather than only reporting a decoding idea.

## Limitations

The default setup assumes eight GPUs and a carefully matched target/draft pair; acceptance gains can disappear when prompts, thinking mode, hardware, or target model changes. Benchmark datasets and adapted third-party code have separate terms, and training/evaluation consumes substantial compute.

## Relation to the Arsenal

DeepSpec complements vLLM, SGLang, and other inference engines that consume draft checkpoints, while competing with SpecForge-style training stacks. It belongs upstream of serving in training and alignment; target-model scheduling, batching, and API operation remain inference concerns.

## Resources

- [GitHub](https://github.com/deepseek-ai/deepspec)
- [Paper](https://arxiv.org/abs/2607.05147)
