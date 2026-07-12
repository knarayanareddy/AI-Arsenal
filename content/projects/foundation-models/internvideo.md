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
org_or_maintainer: "OpenGVLab"
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
id: internvideo
name: "InternVideo"
artifact_type: model
category: computer-vision
subcategory: open-source-models
description: "Open-source family of video foundation models and datasets from OpenGVLab for video understanding, retrieval, and multimodal tasks"
github_url: https://github.com/OpenGVLab/InternVideo
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "vision"
  - "multimodal"
  - "transformers"
  - "research"
  - "foundational"
  - "embeddings"
maturity: production
cost_model: open-source
github_stars: 2329
last_commit: "2026-07-02"
docs_url: https://github.com/OpenGVLab/InternVideo
phase: foundation-model
domain:
  - "vision"
  - "multimodal"
relation_to_stack:
  - "study-and-reference"
  - "fork-and-adapt"
health_signals:
  - "research-origin"
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "A video foundation-model family combining masked and contrastive pretraining to produce transferable video representations for understanding and retrieval."
best_for:
  - "You need pretrained video encoders or video-language models for tasks like action recognition, video retrieval, or video QA."
  - "You are researching video foundation models and want published checkpoints, datasets, and training recipes to build on."
avoid_if:
  - "You only need image or text understanding, where lighter single-modality models are more efficient."
  - "You require a turnkey hosted video API rather than research checkpoints you must serve yourself."
enrichment_notes: "Official OpenGVLab repository (ECCV 2024 lineage), Apache-2.0 license, and 2026-07-02 activity were reviewed on 2026-07-12. Benchmark results are paper-reported."
---

## Overview

InternVideo is a family of video foundation models and accompanying data from OpenGVLab. It learns transferable video representations by combining masked video modeling with video-language contrastive learning, yielding encoders and video-language models that transfer to recognition, retrieval, and question-answering tasks.

## Why it's in the Arsenal

Video understanding lags text and image tooling, and InternVideo is one of the most cited open efforts to close that gap. It is worth cataloguing as a reference for the pretraining objectives, checkpoints, and datasets that a video pipeline can build on, rather than starting from scratch.

## Architecture

The approach pairs a masked-autoencoder objective on video with contrastive video-text alignment, using vision-transformer backbones over spatio-temporal patches. Later versions scale data and model size and add instruction tuning for video dialogue. The repository ships pretrained checkpoints, training code, and curated video datasets for reproduction and transfer.

## Ecosystem Position

InternVideo competes with other video foundation models (VideoMAE, VideoCLIP-style approaches) and complements image/text models rather than replacing them; it slots below task-specific heads and above raw frames. Compared to using an image model frame-by-frame, it captures temporal structure directly. Weigh its capability against the compute needed to fine-tune and serve video models.

## Getting Started

Clone the repository, select a checkpoint matching your task, and set up the model and data dependencies (GPU recommended). Run the provided inference or retrieval example on a short clip, verify embeddings or predictions, then fine-tune on your dataset following the training recipes.

## Key Use Cases

- Action recognition and temporal localization.
- Video-text retrieval and zero-shot classification.
- A pretrained backbone for downstream video-language tasks.

## Strengths

- Strong, well-cited open video representations with released checkpoints and data.
- Combines masked and contrastive objectives for transferable features.
- Org-backed by OpenGVLab with ongoing iterations.

## Limitations

- Video training and inference are compute- and storage-intensive.
- Reported results are benchmark-specific; transfer to your domain must be validated.
- Serving video models in production requires substantial engineering beyond the research code.

## Relation to the Arsenal

InternVideo extends the catalog's multimodal and vision coverage into the temporal domain. Pair it with the Arsenal's evaluation guidance when adapting benchmark checkpoints to production video workloads.

## Resources

- [Official source](https://github.com/OpenGVLab/InternVideo)
