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
org_or_maintainer: InternLM
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
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: xtuner
name: XTuner
artifact_type: framework
category: llms
subcategory: fine-tuning
description: Training engine and toolkit for efficient fine-tuning and large-scale MoE model training
github_url: https://github.com/InternLM/xtuner
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - fine-tuning
  - training
  - efficiency
  - pytorch
  - multimodal
maturity: beta
cost_model: open-source
github_stars: 5200
last_commit: '2026-07-09'
docs_url: https://github.com/InternLM/xtuner
phase: training-and-alignment
domain:
  - language
  - multimodal
  - reasoning
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - research-origin
ecosystem_role:
  - A configuration-driven training layer for adapting language and multimodal checkpoints, including large MoE workloads.
best_for:
  - You need repeatable fine-tuning or large-model training configurations and can provision the required accelerators.
  - You want to compare parameter-efficient and distributed training strategies against pinned data and checkpoints.
avoid_if:
  - You need a managed training service or a turnkey workflow that hides distributed-systems choices.
  - You cannot audit checkpoint provenance, data licenses, optimizer state, and failure recovery.
enrichment_notes: Official repository, Apache-2.0 license, Python stack, and 2026-07-09 activity were checked on 2026-07-11. Hardware support and reproducibility remain workload-specific.
---

## Overview

XTuner is a Python training engine for fine-tuning language and multimodal models. Its current direction also targets very large mixture-of-experts workloads, so it spans two different operating regimes: configuration-driven adaptation of an existing checkpoint and distributed training where parallelism and memory placement dominate the engineering work.

## Why it's in the Arsenal

The useful decision is not simply “which fine-tuning library has the most features?” It is whether the selected XTuner configuration gives a reproducible path from a known checkpoint and dataset to an evaluated artifact on the available hardware. The project is a strong candidate when that control is valuable and a poor shortcut when the team lacks distributed-training experience.

## Architecture

XTuner uses Python configuration composition to describe model, tokenizer, dataset, optimizer, scheduler, and runtime choices. The repository contains model and dataset adapters, training loops, distributed execution paths, evaluation/judging helpers, and model-specific configurations. For MoE and long-context workloads, expert parallelism, sequence parallelism, memory optimization, and checkpoint layout become coupled variables; a configuration that fits one cluster can fail or change throughput on another.

## Ecosystem Position

XTuner sits between pretrained checkpoints and deployment or evaluation. It complements PyTorch and model-hub tooling, but the output is not portable by default: the base-model license, dataset terms, tokenizer, adapter format, and inference runtime all affect whether a trained artifact can be shipped.

## Getting Started

Choose an official configuration for one supported model, pin XTuner, PyTorch, CUDA, data, and checkpoint revisions, and run a short smoke test. Record effective batch size, sequence length, precision, parallelism, random seeds, checkpoint retention, and evaluation splits before scaling to a full run.

## Key Use Cases

- LoRA, instruction tuning, or full fine-tuning experiments on supported language and multimodal checkpoints.
- Distributed training studies where MoE parallelism or long-context memory behavior is itself part of the problem.

## Strengths

- Configuration surface makes model, data, optimizer, and distributed choices inspectable rather than hidden in a service.
- Active org-backed development and Apache-2.0 licensing provide a useful open implementation to study and adapt.

## Limitations

- The supported model and hardware matrix is large enough that successful installation is not evidence of reproducible training.
- Fine-tuning can improve a benchmark while damaging calibration, refusal behavior, or general capabilities; an evaluation and rollback plan is required.

## Relation to the Arsenal

XTuner is a training-and-alignment framework, not an inference server. Use it with dataset governance, experiment tracking, capability/safety regression tests, and a deployment runtime that can load the resulting artifact.

## Resources

- [Official source](https://github.com/InternLM/xtuner)
- [Official license](https://github.com/InternLM/xtuner/blob/main/LICENSE)
