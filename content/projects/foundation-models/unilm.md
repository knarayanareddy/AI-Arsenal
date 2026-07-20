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
org_or_maintainer: microsoft
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 9
trending_score: 31
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: unilm
name: UniLM
artifact_type: library
category: multimodal
subcategory: models
description: Microsoft's large research repository of self-supervised pretrained models across languages, tasks, and modalities, including BEiT, LayoutLM, WavLM, and TrOCR
github_url: https://github.com/microsoft/unilm
license: MIT
primary_language: Python
tags:
  - multimodal
  - fine-tuning
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 22166
last_commit: '2026-01-23'
docs_url: https://github.com/microsoft/unilm
phase: foundation-model
domain:
  - multimodal
  - language
  - vision
relation_to_stack:
  - study-and-reference
  - fork-and-adapt
health_signals:
  - research-origin
  - org-backed
ecosystem_role:
  - A collection of influential Microsoft foundation-model families spanning text, document, vision, and speech pretraining.
best_for:
  - You need a canonical model family like LayoutLM (documents), BEiT (vision), or WavLM (speech) to fine-tune
  - You are studying self-supervised pretraining methods across modalities from an authoritative source
avoid_if:
  - You want a single packaged product, since this is a research monorepo of many separate models
  - You need long-term maintenance guarantees for a specific sub-project
enrichment_notes: Repository, MIT license, and 2026-01-23 activity verified via the GitHub API on 2026-07-12. A monorepo; individual sub-projects vary in maintenance.
---

## Overview

UniLM is Microsoft Research's large repository collecting self-supervised, pretrained foundation models across tasks, languages, and modalities. Rather than one model, it houses influential families, LayoutLM/LayoutLMv3 for document understanding, BEiT for vision, WavLM for speech, TrOCR for text recognition, MiniLM for distillation, and more, each with code and pretrained checkpoints.

## Why it's in the Arsenal

Several of its sub-projects are canonical, widely fine-tuned models in their domains, and having the authoritative implementations and checkpoints in one place makes it an important study-and-reference entry spanning language, vision, and speech.

## Architecture

The repository is organized as a monorepo of independent sub-projects, each implementing a specific self-supervised pretraining recipe: masked-image modeling for BEiT, masked speech modeling for WavLM, layout-and-text-and-image pretraining for LayoutLMv3, and encoder-decoder OCR for TrOCR. They share the theme of large-scale self-supervision producing transferable representations, and each provides fine-tuning scripts and Hugging Face-compatible weights.

## Ecosystem Position

UniLM's sub-projects compete with domain-specific models (for example LayoutLM versus other document models, WavLM versus other speech encoders) and complement toolkits like the OpenMMLab frameworks by providing the underlying pretrained backbones. Compared with a single packaged library it is a research monorepo, so users typically adopt one family and fine-tune it rather than using the whole repo.

## Getting Started

Navigate to the sub-project of interest (for example `layoutlmv3` or `wavlm`), follow its README to install dependencies, and load the pretrained checkpoint, often available through Hugging Face, then fine-tune with the provided scripts on your task data.

## Key Use Cases

Document understanding with LayoutLM; vision pretraining with BEiT; speech representation with WavLM; OCR with TrOCR; studying cross-modal self-supervised pretraining.

## Strengths

Multiple canonical, influential model families, authoritative Microsoft implementations, MIT license, Hugging Face compatibility, and broad modality coverage.

## Limitations

It is a research monorepo rather than a unified product, sub-projects vary in maintenance and documentation quality, and users must navigate to and adopt individual families rather than a single API.

## Relation to the Arsenal

It supplies foundational backbones referenced by the document, vision, and speech entries in the catalog.

## Resources

- [GitHub repository](https://github.com/microsoft/unilm)
