---
id: minicpm-v
name: MiniCPM-V
version_tracked: null
artifact_type: model
category: multimodal
subcategory: models
description: Efficient open vision-language model series from OpenBMB that runs strong image/video/OCR understanding on-device, including phones
github_url: https://github.com/OpenBMB/MiniCPM-V
license: Apache-2.0
primary_language: Python
org_or_maintainer: OpenBMB
tags:
  - multimodal
  - vision
  - inference
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 25944
github_stars_last_30d: 143
trending_score: 51
last_commit: '2026-06-25'
docs_url: https://github.com/OpenBMB/MiniCPM-V
demo_url: null
paper_url: https://arxiv.org/abs/2408.01800
paper_id: null
hf_url: https://huggingface.co/openbmb
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats:
  - gguf
api_compatible: null
phase: foundation-model
domain:
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - research-origin
  - actively-maintained
ecosystem_role:
  - Efficiency-focused open VLM series; the reference option when you need capable image/video/OCR understanding at a small parameter count that can run on edge devices, versus large VLMs that require server GPUs
best_for:
  - You need strong vision-language understanding (image, multi-image, video, OCR) at a small enough size to run on-device or on modest GPUs, where large VLMs are impractical
  - You want open weights with quantized/GGUF builds so you can deploy through llama.cpp/Ollama-style runtimes on constrained hardware
avoid_if:
  - You need the absolute frontier of multimodal reasoning and have server-class GPUs — a larger VLM (or a frontier hosted model) will outperform a compact model
  - Your task is pure text with no visual input — a text-only LLM is a better fit than paying for unused vision capacity
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (25,801), Apache-2.0 license, and last commit (2026-06-25) verified via the GitHub API on 2026-07-08. Capability claims from the paper/README; not hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/OpenBMB/MiniCPM-V
    date: '2026-07-08'
    description: 25,801 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

MiniCPM-V is an open vision-language model series from OpenBMB focused on efficiency: it delivers strong single-image, multi-image, video, and OCR understanding at small parameter counts, with builds designed to run on-device — including phones — via quantization and GGUF.

## Why it's in the Arsenal

It anchors the "capable VLM on constrained hardware" niche: teams that can't run frontier server-class multimodal models can still get solid vision understanding on edge devices or modest GPUs. It is a comparison point in the multimodal foundation-model space, not an unconditional recommendation over larger VLMs.

## Architecture

Like most modern VLMs, it pairs a vision encoder with an LLM via a projector, but the series emphasizes efficient encoding of high-resolution/multi-image/video inputs and compact backbones. Quantized and GGUF releases let it run through lightweight runtimes (llama.cpp / Ollama-style), trading some accuracy for on-device feasibility.

## Ecosystem Position

It competes with other open VLMs (Qwen-VL, InternVL, Llama-based VLMs) and, at the small end, with edge-oriented models. Its distinguishing axis is strong quality-per-parameter and genuine on-device deployment.

## Getting Started

```bash
# pull weights from Hugging Face (openbmb); run via transformers,
# or use a GGUF build through llama.cpp / Ollama for on-device inference
```

## Key Use Cases

1. **Scenario**: on-device image/OCR understanding in a mobile or embedded app
2. **Scenario**: cost-efficient VLM inference on modest GPUs for document/image pipelines
3. **Scenario where this is NOT the right fit**: frontier multimodal reasoning with ample server GPUs — a larger model wins

## Strengths

- Strong quality-per-parameter across image/video/OCR
- On-device capable (quantization + GGUF)
- Open weights, org-backed, actively maintained

## Limitations

- Compact size caps peak reasoning vs large VLMs
- On-device quantization costs some accuracy
- Multimodal serving still heavier than text-only

## Relation to the Arsenal

- Compare against other open VLMs and frontier hosted models before adopting.
- Reference this project by its canonical ID `minicpm-v`.
- Benchmark on your own images/documents; VLM quality is task-specific.

## Resources

- [GitHub Repository](https://github.com/OpenBMB/MiniCPM-V)
- [Paper (arXiv)](https://arxiv.org/abs/2408.01800)
