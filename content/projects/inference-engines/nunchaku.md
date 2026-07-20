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
org_or_maintainer: nunchaku-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 7
trending_score: 31
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: nunchaku
name: Nunchaku (SVDQuant)
artifact_type: library
category: multimodal
subcategory: inference-engines
description: An inference engine implementing SVDQuant 4-bit quantization for diffusion transformers, absorbing outliers via low-rank components to run big image models on
github_url: https://github.com/nunchaku-ai/nunchaku
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - inference
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 3912
last_commit: '2026-03-07'
docs_url: https://nunchaku.tech/docs/nunchaku/
phase: inference-engine
domain:
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - research-origin
ecosystem_role:
  - A 4-bit inference engine for diffusion transformers that cuts VRAM and speeds up image generation with minimal quality loss.
best_for:
  - You want to run large diffusion transformers like FLUX at 4-bit on consumer GPUs with limited VRAM
  - You need faster image generation and are willing to use a specialized quantized runtime
avoid_if:
  - You need broad model coverage rather than diffusion-transformer-specific kernels
  - You require lossless full-precision fidelity, since 4-bit quantization introduces small quality trade-offs
enrichment_notes: Repository, Apache-2.0 license, and 2026-03-07 activity verified via the GitHub API on 2026-07-12. ICLR 2025 Spotlight (SVDQuant). Quality/speed depend on model and hardware.
---

## Overview

Nunchaku is an inference engine that implements SVDQuant, a 4-bit post-training quantization method for diffusion transformers. Its key idea is absorbing activation and weight outliers, the main obstacle to low-bit quantization, into a low-rank branch so the bulk of the model can run in 4-bit, enabling large image models like FLUX to generate on consumer GPUs with much less VRAM and higher speed.

## Why it's in the Arsenal

Efficient low-bit inference is what makes frontier image models usable on affordable hardware, and Nunchaku packages an award-winning quantization technique into a working engine, making it a distinct and practical multimodal-inference entry.

## Architecture

SVDQuant decomposes each weight/activation into a low-rank component that captures the outliers and a residual that quantizes cleanly to 4-bit; Nunchaku provides fused CUDA kernels that execute the 4-bit matmuls plus the small low-rank correction together, avoiding the memory-bandwidth penalty of a naive two-path approach. It targets diffusion-transformer architectures and integrates with common diffusion pipelines and LoRA adapter weights, running the quantized model on a single GPU.

## Ecosystem Position

Nunchaku is a specialized quantized runtime that complements the Diffusers library and diffusion model releases rather than competing with them: it accelerates their inference. Compared with general LLM quantization stacks it focuses on diffusion transformers and image generation, and compared with full-precision inference it trades a small amount of fidelity for large VRAM and latency gains.

## Getting Started

Install the package following the docs, download a Nunchaku-quantized model (for example a 4-bit FLUX variant), and run it through the provided diffusion pipeline integration; LoRA adapters can be attached, and consumer GPUs become viable targets.

## Key Use Cases

Running large image models on limited-VRAM GPUs; speeding up diffusion inference; deploying FLUX-class generation affordably; research on low-bit diffusion quantization.

## Strengths

4-bit diffusion inference with minimal quality loss, large VRAM and speed gains, fused CUDA kernels, LoRA compatibility, an Apache-2.0 license, and a peer-reviewed method.

## Limitations

It is specialized to diffusion transformers rather than a general engine, requires compatible quantized weights, 4-bit introduces small quality trade-offs, and it depends on specific GPU kernels and CUDA support.

## Relation to the Arsenal

It is the efficient-inference companion to the diffusion model and library entries in the multimodal category.

## Resources

- [GitHub repository](https://github.com/nunchaku-ai/nunchaku)
- [SVDQuant paper](https://arxiv.org/abs/2411.05007)
