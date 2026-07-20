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
org_or_maintainer: EvolvingLMMs-Lab
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with:
  - pytorch
  - huggingface
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 20
trending_score: 32
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: lmms-eval
name: lmms-eval
artifact_type: framework
category: evaluation
subcategory: evaluation
description: Multimodal evaluation toolkit spanning text, image, video, and audio tasks and model adapters
github_url: https://github.com/EvolvingLMMs-Lab/lmms-eval
license: MIT
primary_language: Python
tags:
  - evaluation
  - benchmark
  - multimodal
  - vision
  - research
  - llm
maturity: beta
cost_model: open-source
github_stars: 4320
last_commit: '2026-07-15'
docs_url: https://github.com/EvolvingLMMs-Lab/lmms-eval
phase: benchmark-and-eval
domain:
  - multimodal
  - vision
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - actively-maintained
  - research-origin
  - community-driven
ecosystem_role:
  - A multimodal task registry and execution harness for comparing model adapters across text, image, video, and audio evaluations.
best_for:
  - You need repeatable multimodal model comparisons and can pin task data, prompts, adapters, and evaluator versions.
  - You want one harness that exposes preprocessing and model-interface differences instead of hiding them in a leaderboard.
avoid_if:
  - You need a single production-quality signal that is independent of prompt, task, contamination, and metric choices.
  - You cannot reproduce model weights, dataset access, preprocessing, or evaluator configuration.
enrichment_notes: Official repository, MIT license, Python implementation, and 2026-07-06 activity were checked on 2026-07-11. Benchmark comparability remains sensitive to task and adapter configuration.
---

## Overview

lmms-eval is a Python evaluation harness for large multimodal models. It collects task definitions, dataset adapters, model interfaces, metrics, logging, and execution backends in one repository. Its value is not that it produces a universal “multimodal intelligence” number; it gives an operator a repeatable place to inspect how a task was loaded, prompted, batched, and scored.

## Why it's in the Arsenal

Multimodal leaderboard numbers are unusually easy to misread. Image resizing, video sampling, audio preprocessing, chat templates, batch padding, and judge prompts can each change the result. lmms-eval is included because those choices are represented as code and task configuration that can be pinned and audited.

## Architecture

The task layer defines dataset loading, modality conversion, prompt construction, and metric logic. Model adapters translate a common evaluation request into the interfaces expected by local checkpoints or inference services. Execution and logging layers add batching, distributed runs, and result records. This separation is useful for comparison, but it also means an adapter can silently change the effective experiment; the task revision, model revision, processor, prompt, and raw output must travel with every score.

## Ecosystem Position

lmms-eval sits between multimodal model implementations and engineering evaluation. It overlaps with general language-model harnesses but is designed for image, video, audio, and multimodal task details. It complements inference engines and model registries; it does not solve dataset licensing, contamination, judge calibration, or application-level acceptance testing.

## Getting Started

Select one task and one model adapter, pin the repository and dataset revisions, and run the smallest official example. Save the resolved configuration, processor version, prompt, raw responses, metric outputs, and hardware details. Add a local regression task when public benchmarks do not represent the product’s image, video, or audio distribution.

## Key Use Cases

- Comparing multimodal checkpoints across standardized image, video, audio, and text tasks.
- Building a regression harness for changes to a processor, model adapter, prompt, or inference backend.

## Strengths

- Broad modality coverage with an inspectable task/adapter boundary.
- Active research-community development and MIT licensing make it practical to extend for internal evaluation.

## Limitations

- A common harness does not make datasets, prompts, or metrics comparable by itself.
- Large checkpoints, video tasks, and distributed runs can make local reproduction expensive; public scores should not be treated as product SLOs.

## Relation to the Arsenal

Use lmms-eval as the benchmark-and-eval layer around models and inference systems. Pair it with contamination checks, human or domain-specific review, and a small private regression set.

## Resources

- [Official source](https://github.com/EvolvingLMMs-Lab/lmms-eval)
- [Official license](https://github.com/EvolvingLMMs-Lab/lmms-eval/blob/main/LICENSE)
