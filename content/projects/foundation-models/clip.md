---
id: clip
name: CLIP (OpenAI)
version_tracked: null
artifact_type: model
category: multimodal
subcategory: open-source-models
description: OpenAI's contrastive image-text model — the shared embedding space that underlies zero-shot classification, image search, and the vision encoders of most VLMs
github_url: https://github.com/openai/CLIP
license: MIT
primary_language: Python
org_or_maintainer: openai
tags:
  - embeddings
  - multimodal
  - llm
maturity: production
cost_model: open-source
github_stars: 34036
github_stars_last_30d: 100
trending_score: 48
last_commit: '2026-03-25'
docs_url: https://github.com/openai/CLIP
demo_url: null
paper_url: https://arxiv.org/abs/2103.00020
paper_id: null
phase: foundation-model
domain:
  - vision
  - multimodal
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - production-proven
  - research-origin
ecosystem_role:
  - 'The foundational primitive of open multimodality: contrastive pretraining on 400M image-text pairs produced a shared embedding space that made zero-shot vision classification real — and CLIP-family encoders became the standard vision front-end inside LLaVA-class VLMs and the text conditioning inside Stable Diffusion'
best_for:
  - 'Image-text retrieval and zero-shot classification: embed images and label prompts in one space and compare by cosine similarity — no task-specific training'
  - 'Building multimodal systems: CLIP-family encoders (via open_clip''s reproductions) remain the default choice for vision features feeding an LLM or a diffusion model'
avoid_if:
  - You need dense per-pixel understanding (segmentation, OCR, counting) — CLIP embeds whole images; its known failure modes include fine-grained spatial reasoning
  - You want SOTA retrieval today — SigLIP-class successors and modern multimodal embedders outperform original CLIP checkpoints; use this repo as reference, open_clip for practice
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (33.9k), MIT, last push 2026-03-25 verified via the GitHub API on 2026-07-08. The repo is a stable reference release (2021 weights); currency lives in successors, which the entry states plainly. Paper is Radford et al. 2021.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/openai/CLIP
    date: '2026-07-08'
    description: 33.9k stars; canonical repo of the 2021 model that started open multimodality
featured: false
status: active
---

## Overview

CLIP (Contrastive Language-Image Pre-training) trains an image encoder and a text encoder jointly so matching pairs land close in a shared embedding space, using 400M web image-text pairs. The released models classify images zero-shot by embedding candidate label prompts ("a photo of a dog") and picking the nearest — competitive with supervised baselines of its era without seeing a single training label.

## Why it's in the Arsenal

Few models are load-bearing for an entire ecosystem: CLIP's embedding space is the mechanism behind zero-shot vision, image search, and semantic deduplication; its encoders are the vision front-end of the LLaVA lineage and the text conditioning of Stable Diffusion. Anyone building multimodal systems ends up reasoning about CLIP-space properties, making the canonical repo and paper reference material regardless of which successor checkpoint they deploy.

## Architecture

Dual encoders — a ViT (or ResNet) for images and a Transformer for text — projected into one space and trained with a symmetric contrastive (InfoNCE) loss over in-batch pairs. Zero-shot classification reduces to nearest-prompt retrieval; no classification head exists. This design is why it generalizes (open vocabulary) and why it fails at spatial/fine-grained tasks (global-embedding bottleneck).

## Ecosystem Position

Downstream: LLaVA-class VLMs (vision encoder), Stable Diffusion (text encoder), open_clip (community reproductions at scale, the practical checkpoints), FAISS/vector-DB image search stacks. Successors: SigLIP/SigLIP2 (better loss), EVA-CLIP, and multimodal embedders. The repo itself is a frozen reference; the ideas are anything but.

## Getting Started

```bash
pip install git+https://github.com/openai/CLIP.git
```

```python
import clip, torch
model, preprocess = clip.load("ViT-B/32")
image_features = model.encode_image(preprocess(img).unsqueeze(0))
text_features = model.encode_text(clip.tokenize(["a dog", "a cat"]))
```

## Key Use Cases

1. **Scenario**: semantic image search or dataset deduplication — embed once, query in CLIP space via a vector DB
2. **Scenario**: zero-shot filtering/tagging pipelines where training a classifier per label set is impractical

## Strengths

- The open-vocabulary mechanism itself: any concept expressible in text becomes a classifier for free
- Unmatched ecosystem leverage — understanding CLIP space transfers to VLMs, diffusion, and retrieval alike

## Limitations

- Global-embedding failure modes are well documented: counting, spatial relations, fine-grained text-in-image
- Original 2021 checkpoints trail modern successors; treat this repo as the reference implementation, not the deployment choice

## Relation to the Arsenal

The vision-side foundation under `sam2` (segmentation), the LLaVA-lineage VLMs, and image-generation entries; conceptually paired with the embedding-model guidance in [architectures/data-strategy](../../architectures/data-strategy/_index.md).

## Resources

- [GitHub](https://github.com/openai/CLIP)
- [Paper (Radford et al., 2021)](https://arxiv.org/abs/2103.00020)
