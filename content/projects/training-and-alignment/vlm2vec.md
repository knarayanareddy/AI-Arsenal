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
org_or_maintainer: TIGER-AI-Lab
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 2
trending_score: 29
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: vlm2vec
name: VLM2Vec
artifact_type: framework
category: multimodal
subcategory: fine-tuning
description: Multimodal embedding and training framework covering VLM2Vec, MMEB, and later multimodal embedding benchmarks
github_url: https://github.com/TIGER-AI-Lab/VLM2Vec
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - embeddings
  - fine-tuning
  - evaluation
  - vision
  - training
maturity: beta
cost_model: open-source
github_stars: 667
last_commit: '2026-06-24'
docs_url: https://github.com/TIGER-AI-Lab/VLM2Vec
phase: training-and-alignment
domain:
  - vision
  - multimodal
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - research-origin
  - actively-maintained
  - community-driven
ecosystem_role:
  - A multimodal embedding/training and evaluation stack for aligning vision-language representations with retrieval and benchmark tasks.
best_for:
  - You need to train or evaluate multimodal embeddings for image/text/video retrieval or cross-modal search.
  - You can reproduce the model/data/checkpoint configuration and account for modality-specific preprocessing.
avoid_if:
  - You need a general-purpose multimodal chat model or a turnkey embedding API.
  - You cannot provision GPU training/evaluation environments or audit benchmark and checkpoint terms.
enrichment_notes: Official repository, Apache-2.0 license, ICLR/TMLR/COLM lineage, and 2026-06-24 reproduction work were reviewed on 2026-07-12. Model and benchmark transfer remain draft.
---

## Overview

VLM2Vec is a research and training stack for turning vision-language models into multimodal embedding systems. The repository includes VLM2Vec/MMEB generations, training and evaluation code, model checkpoints, and later multimodal embedding benchmark/reproduction work.

## Why it's in the Arsenal

Multimodal retrieval needs a representation that preserves the relationship between text and visual content; a chat model’s generation quality is not the same as embedding quality. VLM2Vec is included as a reference for training and measuring that representation, with a clear warning that benchmark performance depends heavily on data mixture, preprocessing, and evaluation protocol.

## Architecture

The stack combines Python/PyTorch training and evaluation scripts, vision-language backbones, projection/embedding heads, multimodal data recipes, and benchmark runners. An input image/video/text sequence is encoded into a shared embedding space for similarity or retrieval tasks. The pipeline is sensitive to image/video sampling, resolution, pooling, negative construction, checkpoint conversion, and GPU attention kernels; recent reproduction work documents fixes for long/high-resolution vision sequences and audio/GUI evaluation.

## Ecosystem Position

VLM2Vec sits between multimodal foundation models and vector/search applications. It overlaps with contrastive vision-language encoders and multimodal embedding models, while its MMEB benchmark lineage and training recipes are the useful reference. Compare it on cross-modal retrieval, domain transfer, index cost, preprocessing, and checkpoint/license compatibility—not on generative chat scores.

## Getting Started

Use the repository’s reproduction instructions and one released checkpoint first. Pin PyTorch, transformers, CUDA, model weights, dataset revisions, and modality preprocessing; run a small retrieval benchmark and inspect failures by modality. Only then attempt training or evaluate the checkpoint in a production vector-search path.

## Key Use Cases

- Training and benchmarking multimodal embeddings for retrieval.
- Studying data and loss choices for image/text/video representation alignment.
- Reproducing published MMEB/VLM2Vec results and measuring model/checkpoint changes.

## Strengths

- Connects model training, embedding evaluation, and reproduction artifacts in one research repository.
- Apache-2.0 source with multiple research generations and recent reproduction fixes.

## Limitations

- GPU, model, dataset, and preprocessing requirements make faithful reproduction expensive.
- Retrieval benchmark gains may not transfer to a domain with different images, captions, languages, or video distributions.
- Downstream deployment still needs vector-index, privacy, and model/checkpoint governance.

## Relation to the Arsenal

VLM2Vec belongs in training-and-alignment as a multimodal embedding framework. Pair it with a vector-search engine, multimodal evaluation, and a separate generative-model assessment when building a retrieval product.

## Resources

- [Official source](https://github.com/TIGER-AI-Lab/VLM2Vec)
