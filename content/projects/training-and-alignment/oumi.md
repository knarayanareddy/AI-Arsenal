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
org_or_maintainer: oumi-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 21
trending_score: 32
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: oumi
name: Oumi
artifact_type: framework
category: llms
subcategory: fine-tuning
description: An end-to-end open platform to fine-tune, evaluate, and deploy foundation LLMs and VLMs, spanning data prep, training, evaluation
github_url: https://github.com/oumi-ai/oumi
license: Apache-2.0
primary_language: Python
tags:
  - fine-tuning
  - evaluation
  - llm
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 9363
last_commit: '2026-07-20'
docs_url: https://oumi.ai/docs
phase: training-and-alignment
domain:
  - language
  - multimodal
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - An end-to-end LLM/VLM lifecycle platform unifying data, training, evaluation, and deployment in one config-driven system.
best_for:
  - You want one framework covering fine-tuning, evaluation, and deployment of open LLMs and VLMs
  - You need to move the same config from a laptop to a multi-GPU cluster reproducibly
avoid_if:
  - You only need a single narrow step (e.g. just eval), where a focused tool is lighter
  - You want a no-code GUI rather than a config-and-code platform
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-11 activity verified via the GitHub API on 2026-07-12. Young but active; breadth means depth varies by step.
---

## Overview

Oumi is an end-to-end open platform for working with foundation models, letting teams fine-tune, evaluate, and deploy open LLMs and vision-language models through one consistent interface. It covers data preparation, training (full and parameter-efficient), evaluation on standard benchmarks, and inference/serving, and it is designed to run the same configuration from a laptop up to a multi-GPU cluster.

## Why it's in the Arsenal

Most teams stitch together separate tools for data, training, evaluation, and serving; Oumi unifies that lifecycle in one reproducible framework, which is a distinct and valuable contribution to the training-and-alignment area.

## Architecture

Oumi is config-driven: a declarative config specifies the model, dataset, training recipe (including LoRA/QLoRA and full fine-tuning), and evaluation, and the framework dispatches to appropriate backends, scaling from single-GPU to distributed training via standard launchers. It integrates evaluation harnesses for benchmark scoring and provides inference/serving paths, so the same artifact flows through training, evaluation, and deployment without reformatting.

## Ecosystem Position

Oumi competes with fine-tuning stacks like Axolotl and LLaMA-Factory and with evaluation harnesses, differentiating by spanning the whole model lifecycle rather than one stage. Compared with single-purpose tools it offers integration and reproducibility across steps, and compared with no-code GUIs it stays config-and-code, so it suits engineers who want an end-to-end but scriptable platform.

## Getting Started

Install with `pip install oumi`, pick or write a config for a base model and dataset, run `oumi train -c config.yaml`, then `oumi evaluate` and `oumi infer`/serving with the resulting checkpoint; the same config scales to distributed runs.

## Key Use Cases

End-to-end LLM/VLM fine-tuning and deployment; reproducible training that scales from laptop to cluster; integrated benchmark evaluation; standardizing an organization's model lifecycle.

## Strengths

Full lifecycle coverage, config-driven reproducibility, laptop-to-cluster scaling, LLM and VLM support, active organizational backing, and an Apache-2.0 license.

## Limitations

As a young project its per-stage depth may trail specialized single-purpose tools, the breadth adds configuration surface area to learn, distributed runs still require real GPU infrastructure, and the newest techniques may land in focused libraries before they reach the unified platform.

## Relation to the Arsenal

It anchors the end-to-end training lifecycle alongside the focused fine-tuning and evaluation entries.

## Resources

- [GitHub repository](https://github.com/oumi-ai/oumi)
- [Documentation](https://oumi.ai/docs)
