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
org_or_maintainer: "facebookresearch"
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
id: facebook-mmf
name: "MMF"
artifact_type: framework
category: multimodal
subcategory: frameworks
description: "Facebook AI Research's modular PyTorch framework for vision-and-language multimodal research, with datasets, pretrained models, and reproducible task pipelines"
github_url: https://github.com/facebookresearch/mmf
license: "NOASSERTION"
primary_language: "Python"
tags:
  - "multimodal"
  - "fine-tuning"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 5636
last_commit: "2026-07-07"
docs_url: https://mmf.sh/
phase: framework
domain:
  - "multimodal"
  - "vision"
  - "language"
relation_to_stack:
  - "study-and-reference"
  - "build-on-top"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "A modular research framework for vision-and-language tasks with standardized datasets and model zoo."
best_for:
  - "You are doing vision-and-language research and want standardized datasets, tasks, and baselines like VisualBERT/MMBT"
  - "You want a modular framework to prototype new multimodal models against established benchmarks"
avoid_if:
  - "You need modern large VLM inference/serving, where current multimodal models and libraries fit better"
  - "You want a production system rather than a research framework"
enrichment_notes: "Repository and 2026-07-07 activity verified via the GitHub API on 2026-07-12; license metadata is NOASSERTION. Research-focused; predates the current large-VLM era."
---

## Overview

MMF (formerly Pythia) is Facebook AI Research's modular PyTorch framework for vision-and-language multimodal research. It provides standardized datasets, task definitions, pretrained baselines (such as VisualBERT and MMBT), and a config-driven training system, aiming to make multimodal experiments reproducible and comparable.

## Why it's in the Arsenal

MMF is a foundational multimodal-research framework that shaped how vision-and-language tasks were benchmarked, and it remains a useful reference and prototyping base for that class of models.

## Architecture

MMF structures experiments around interchangeable components, datasets, processors, models, and losses, declared in YAML configs and assembled by a trainer. It ships dataset loaders for VQA, captioning, and hateful-memes-style tasks, fusion and transformer multimodal models, and a model zoo, so researchers can swap a component and rerun a standardized pipeline to compare against published baselines.

## Ecosystem Position

MMF competes with general multimodal codebases and complements detection/vision frameworks, differentiating on its focus on vision-and-language tasks and reproducible benchmarks. Compared with today's large vision-language models and serving libraries it represents an earlier generation of multimodal research infrastructure, so it is more a study-and-baseline framework than a route to state-of-the-art VLM inference.

## Getting Started

Install with `pip install mmf` or from source, choose a task/model config, and run `mmf_run` with dataset and model arguments; the model zoo provides pretrained checkpoints for evaluation and fine-tuning.

## Key Use Cases

Vision-and-language research (VQA, captioning, classification); reproducing multimodal baselines; prototyping new fusion or transformer multimodal models; teaching multimodal ML.

## Strengths

Modular config-driven design, standardized datasets and tasks, pretrained baselines, reproducibility focus, and FAIR provenance.

## Limitations

It reflects a pre-large-VLM generation of models, the license metadata is non-standard and should be verified, documentation is dated in places, and it is research infrastructure rather than a production or state-of-the-art inference stack.

## Relation to the Arsenal

It provides historical and benchmarking grounding for multimodal work alongside the current VLM entries.

## Resources

- [GitHub repository](https://github.com/facebookresearch/mmf)
- [Documentation](https://mmf.sh/)
