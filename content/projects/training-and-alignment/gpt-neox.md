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
org_or_maintainer: EleutherAI
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
id: gpt-neox
name: GPT-NeoX
artifact_type: library
category: llms
subcategory: frameworks
description: EleutherAI's library for large-scale model-parallel autoregressive transformer training on GPUs, built on Megatron and DeepSpeed
github_url: https://github.com/EleutherAI/gpt-neox
license: Apache-2.0
primary_language: Python
tags:
  - fine-tuning
  - llm
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 7444
last_commit: '2026-06-11'
docs_url: https://github.com/EleutherAI/gpt-neox
phase: training-and-alignment
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - actively-maintained
  - research-origin
ecosystem_role:
  - A battle-tested framework for pretraining large autoregressive transformers across many GPUs.
best_for:
  - You are pretraining or continued-pretraining large LLMs from scratch across multi-node GPU clusters
  - You want a proven Megatron/DeepSpeed-based codebase that trained models like GPT-NeoX-20B and Pythia
avoid_if:
  - You only need to fine-tune an existing model, where lighter fine-tuning libraries are simpler
  - You lack multi-GPU/multi-node infrastructure, since the framework targets large-scale training
enrichment_notes: Repository, Apache-2.0 license, and 2026-06-11 activity verified via the GitHub API on 2026-07-12. Aimed at large-scale pretraining, not casual use.
---

## Overview

GPT-NeoX is EleutherAI's library for training large-scale autoregressive transformer language models on GPUs. Built on NVIDIA's Megatron and Microsoft's DeepSpeed, it provides the model-parallel machinery needed to pretrain multi-billion-parameter models across many GPUs and nodes, and it is the codebase behind well-known open models such as GPT-NeoX-20B and the Pythia suite.

## Why it's in the Arsenal

Large-model pretraining is a specialized discipline, and GPT-NeoX is one of the most battle-tested open frameworks for it, making it an authoritative reference and tool for teams doing serious training rather than fine-tuning.

## Architecture

GPT-NeoX combines tensor, pipeline, and data parallelism from Megatron with DeepSpeed's ZeRO optimizer sharding, mixed precision, and activation checkpointing to fit and train large transformers efficiently across a cluster. It is configured through YAML files specifying model size, parallelism degrees, dataset, and optimizer, and it handles tokenized data pipelines, checkpointing, and logging for long multi-node runs.

## Ecosystem Position

GPT-NeoX competes with Megatron-LM, NVIDIA NeMo's LLM path, and Hugging Face's large-scale training tooling, differentiating on being an open, community-proven pretraining stack. Compared with fine-tuning libraries it operates at the pretraining scale on GPU clusters rather than adapting an existing checkpoint, so it complements, rather than replaces, the lighter fine-tuning tools in the catalog.

## Getting Started

Clone the repository, set up the environment with the required CUDA/DeepSpeed dependencies, prepare a tokenized dataset, edit a model/parallelism YAML config, and launch distributed training with the provided scripts on a multi-GPU cluster.

## Key Use Cases

Pretraining large LLMs from scratch; continued pretraining on domain corpora; reproducing open models like Pythia; research on large-scale training dynamics.

## Strengths

Proven at multi-billion-parameter scale, robust Megatron/DeepSpeed parallelism, config-driven runs, strong research provenance, and an Apache-2.0 license.

## Limitations

It targets large-scale pretraining and needs substantial multi-GPU/multi-node infrastructure, the setup is complex, and for simple fine-tuning it is far heavier than dedicated fine-tuning libraries.

## Relation to the Arsenal

It represents large-scale pretraining in the training-and-alignment area alongside the fine-tuning-focused entries.

## Resources

- [GitHub repository](https://github.com/EleutherAI/gpt-neox)
