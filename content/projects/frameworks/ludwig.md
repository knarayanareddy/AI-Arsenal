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
org_or_maintainer: "ludwig-ai"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: ludwig
name: "Ludwig"
artifact_type: framework
category: tooling
subcategory: frameworks
description: "A declarative, low-code framework for building custom models and fine-tuning LLMs from a YAML config, without writing training code"
github_url: https://github.com/ludwig-ai/ludwig
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "fine-tuning"
  - "llm"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 11736
last_commit: "2026-07-04"
docs_url: https://ludwig.ai/
phase: framework
domain:
  - "general-purpose"
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A declarative training framework that turns a YAML spec into a full model or LLM fine-tuning pipeline."
best_for:
  - "You want to fine-tune an LLM or train a tabular/multimodal model from a config without writing training loops"
  - "You need reproducible, declarative experiments that data scientists can run without deep PyTorch code"
avoid_if:
  - "You need full low-level control over a custom training loop or novel architecture"
  - "You want the newest LLM training features immediately, which specialized libraries ship first"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-04 activity verified via the GitHub API on 2026-07-12. Declarative approach trades flexibility for simplicity."
---

## Overview

Ludwig is a declarative, low-code framework for building custom AI models and fine-tuning LLMs. Instead of writing training code, users specify inputs, outputs, and configuration in a YAML file, and Ludwig assembles the preprocessing, model, training loop, and evaluation, supporting tabular, text, image, and multimodal data as well as LLM fine-tuning.

## Why it's in the Arsenal

Its declarative approach makes model training and LLM fine-tuning accessible without deep framework code, and its reproducible config-driven experiments are a distinct, useful pattern for teams that want structure over boilerplate.

## Architecture

Ludwig maps a YAML config to a typed pipeline: each input/output feature has an encoder/decoder, a combiner fuses feature representations, and the framework generates preprocessing, a PyTorch model, the training loop, checkpoints, and metrics automatically. For LLMs it supports parameter-efficient fine-tuning (LoRA/QLoRA), prompt templates, and quantization, all declared in configuration rather than code, with hyperparameter search and serving utilities included.

## Ecosystem Position

Ludwig competes with low-code training tools and with hand-written PyTorch/Transformers scripts, differentiating on its declarative config paradigm. Compared with writing training code directly it trades some flexibility for reproducibility and speed, and compared with pure LLM fine-tuning libraries it is broader (tabular/multimodal too) but may lag them on the very newest LLM-specific features.

## Getting Started

Install with `pip install ludwig`, write a `config.yaml` describing input/output features and (for LLMs) a base model plus LoRA settings, then run `ludwig train --config config.yaml --dataset data.csv`; `ludwig predict` and serving utilities handle inference.

## Key Use Cases

Config-driven LLM fine-tuning; training tabular and multimodal models without code; reproducible experiment pipelines; enabling data scientists to train models without deep PyTorch expertise.

## Strengths

Declarative YAML workflow, broad data-type support, built-in LoRA/QLoRA and quantization for LLMs, reproducibility, hyperparameter search, and an Apache-2.0 license.

## Limitations

The declarative model constrains fully custom architectures and training loops, the newest LLM-specific techniques may arrive later than in specialized libraries, and complex needs can outgrow the config abstraction.

## Relation to the Arsenal

It sits among the fine-tuning and framework entries as the declarative, low-code training option.

## Resources

- [GitHub repository](https://github.com/ludwig-ai/ludwig)
- [Documentation](https://ludwig.ai/)
