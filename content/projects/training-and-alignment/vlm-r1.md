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
org_or_maintainer: om-ai-lab
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
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: vlm-r1
name: VLM-R1
artifact_type: framework
category: multimodal
subcategory: fine-tuning
description: Open framework for training vision-language models with reinforcement learning (GRPO/R1-style) to improve visual reasoning and grounded understanding
github_url: https://github.com/om-ai-lab/VLM-R1
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - vision
  - rlhf
  - reasoning
  - fine-tuning
  - training
maturity: beta
cost_model: open-source
github_stars: 6009
last_commit: '2026-07-07'
docs_url: https://github.com/om-ai-lab/VLM-R1
phase: training-and-alignment
domain:
  - vision
  - multimodal
  - reinforcement-learning
relation_to_stack:
  - study-and-reference
  - fork-and-adapt
health_signals:
  - research-origin
  - actively-maintained
  - community-driven
ecosystem_role:
  - A training framework applying R1-style reinforcement learning with verifiable rewards (GRPO) to vision-language models for visual reasoning and grounding.
best_for:
  - You want to apply RL with verifiable rewards to a VLM (for example Qwen-VL) to improve grounded visual reasoning.
  - You are researching how DeepSeek-R1-style reward optimization transfers from text to multimodal models.
avoid_if:
  - You only need supervised fine-tuning or inference; RL training adds significant complexity and compute.
  - You lack the reward-verification setup and GPU budget that RL fine-tuning requires.
enrichment_notes: Official repository, Apache-2.0 license, and 2026-07-07 activity were reviewed on 2026-07-12. Results are research-reported and workload-dependent.
---

## Overview

VLM-R1 is a framework for post-training vision-language models with reinforcement learning. It adapts R1-style optimization—group-relative policy optimization (GRPO) with verifiable, rule-based rewards—to multimodal tasks such as referring expression grounding and visual reasoning, on top of open VLM backbones.

## Why it's in the Arsenal

The R1 recipe of RL with verifiable rewards reshaped text reasoning; VLM-R1 is a leading open attempt to carry it into vision-language models. It is worth cataloguing as a reference for the reward design, training loop, and stability considerations of multimodal RL, an area with few production-grade guides.

## Architecture

The framework wraps a base VLM (such as Qwen2.5-VL) in a GRPO training loop: for each prompt-image input it samples a group of responses, scores them with task-specific verifiable rewards (for example IoU for grounding or exact-match for structured answers), and updates the policy from group-relative advantages. It integrates with standard VLM inference and distributed training tooling.

## Ecosystem Position

VLM-R1 sits alongside text RL frameworks (TRL, OpenRLHF) but specializes in multimodal rewards, and complements supervised fine-tuning rather than replacing it. Compared to SFT-only pipelines it targets reasoning and grounding gains that imitation alone rarely produces. Weigh those gains against the added reward-engineering and compute versus a comparison with plain SFT.

## Getting Started

Clone the repository, prepare a base VLM and a task with a verifiable reward (grounding is a good first target), and configure the GRPO trainer on a multi-GPU node. Run a short training job, monitor reward and format-adherence curves, and evaluate on a held-out set before scaling steps.

## Key Use Cases

- RL fine-tuning of VLMs for referring-expression grounding and detection-style tasks.
- Research on verifiable-reward RL transfer from text to multimodal models.
- Improving structured visual reasoning beyond supervised baselines.

## Strengths

- Concrete, open implementation of GRPO for vision-language models.
- Verifiable rewards avoid training a separate reward model for suitable tasks.
- Active development with support for popular open VLM backbones.

## Limitations

- RL training is compute-heavy and sensitive to reward design and hyperparameters.
- Gains are task-dependent; verifiable rewards only exist for some objectives.
- Reproducing reported results requires careful environment and data setup.

## Relation to the Arsenal

VLM-R1 extends the catalog's fine-tuning coverage into multimodal RL. Combine it with the Arsenal's evaluation tips to confirm that reward optimization improves real task metrics rather than reward-hacking artifacts.

## Resources

- [Official source](https://github.com/om-ai-lab/VLM-R1)
