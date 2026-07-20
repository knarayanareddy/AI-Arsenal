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
org_or_maintainer: cloneofsimo
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
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: lora-diffusion
name: LoRA for Diffusion (cloneofsimo)
artifact_type: library
category: multimodal
subcategory: fine-tuning
description: An early, influential implementation of Low-Rank Adaptation for quickly fine-tuning Stable Diffusion, popularizing lightweight, composable diffusion adapters
github_url: https://github.com/cloneofsimo/lora
license: Apache-2.0
primary_language: Python
tags:
  - fine-tuning
  - multimodal
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 7547
last_commit: '2024-03-22'
docs_url: https://arxiv.org/abs/2106.09685
phase: training-and-alignment
domain:
  - vision
relation_to_stack:
  - study-and-reference
  - fork-and-adapt
health_signals:
  - research-origin
  - community-driven
ecosystem_role:
  - A reference implementation that brought LoRA fine-tuning to diffusion models, seeding the modern adapter ecosystem.
best_for:
  - You want to understand how LoRA adapters are applied to diffusion UNets and text encoders from a canonical implementation
  - You are studying lightweight, composable fine-tuning that trains a small fraction of parameters
avoid_if:
  - You want a maintained production training pipeline, where Diffusers' built-in LoRA support is current
  - You need general-purpose LLM LoRA tooling rather than diffusion-focused code
enrichment_notes: Repository, Apache-2.0 license, and 2024-03-22 activity verified via the GitHub API on 2026-07-12. Historically pivotal; superseded by integrated LoRA in mainstream libraries.
---

## Overview

This repository is an early and influential implementation of Low-Rank Adaptation (LoRA) for Stable Diffusion. It showed that diffusion models could be fine-tuned by training small low-rank adapter matrices instead of full weights, producing tiny, shareable, composable adapter files and helping launch the enormous ecosystem of downloadable diffusion LoRAs.

## Why it's in the Arsenal

It is a pivotal reference for how LoRA is applied to generative vision models, and understanding this canonical implementation clarifies a technique now built into most training stacks, making it a valuable study entry in the fine-tuning area.

## Architecture

LoRA freezes the pretrained weights and injects trainable low-rank matrices (A and B, with rank r) into linear and attention projection layers, so the update is the product BA added to the frozen weight; only these small matrices are optimized. This repository applies that to the diffusion UNet and text encoder, yielding an adapter file of a few megabytes that can be merged or stacked at inference, and it includes training scripts and inference merging utilities.

## Ecosystem Position

It predates and inspired the LoRA support now native to the Diffusers library and to WebUI/ComfyUI adapter ecosystems, so today it is a study-and-reference base rather than the primary tool. Compared with general LLM parameter-efficient-fine-tuning libraries like PEFT, it is diffusion-specific, and compared with full fine-tuning it trades a little capacity for enormous savings in compute and storage.

## Getting Started

Clone the repository, install dependencies, prepare a small image dataset, and run the training script to produce a LoRA file; the inference utilities show how to load and merge the adapter into a base Stable Diffusion model.

## Key Use Cases

Studying diffusion LoRA internals; training lightweight style or subject adapters; understanding adapter merging and composition; teaching parameter-efficient fine-tuning.

## Strengths

Canonical, readable LoRA-for-diffusion implementation, tiny composable adapters, Apache-2.0 license, and lasting historical influence on the adapter ecosystem.

## Limitations

Upstream activity stopped in 2024 and mainstream libraries now provide integrated, better-maintained LoRA support; it is diffusion-specific; and it is best treated as a reference rather than a production training pipeline.

## Relation to the Arsenal

It grounds the LoRA fine-tuning technique that many diffusion and LLM entries rely on.

## Resources

- [GitHub repository](https://github.com/cloneofsimo/lora)
- [LoRA paper](https://arxiv.org/abs/2106.09685)
