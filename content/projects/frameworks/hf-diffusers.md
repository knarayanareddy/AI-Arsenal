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
org_or_maintainer: huggingface
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 71
trending_score: 36
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: hf-diffusers
name: Hugging Face Diffusers
artifact_type: library
category: multimodal
subcategory: frameworks
description: The de facto Python library for diffusion models, providing pipelines, schedulers, and model components for image, video, and audio generation in PyTorch
github_url: https://github.com/huggingface/diffusers
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - fine-tuning
  - self-hosted
  - inference
maturity: production
cost_model: open-source
github_stars: 34117
last_commit: '2026-07-20'
docs_url: https://huggingface.co/docs/diffusers
phase: framework
domain:
  - vision
  - audio
  - multimodal
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - The standard library that packages diffusion models as composable pipelines, schedulers, and modular components.
best_for:
  - You want to run or fine-tune modern diffusion models (Stable Diffusion, Flux, video) with a consistent Python API
  - You need swappable schedulers and modular components to build custom generation pipelines
avoid_if:
  - You want a full GUI application rather than a library, where a web UI is more appropriate
  - You need the absolute lowest-latency serving, which may require specialized inference stacks
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. The standard diffusion library; individual model weights carry their own licenses.
---

## Overview

Diffusers is Hugging Face's library for diffusion models and the de facto standard for running and training them. It packages state-of-the-art image, video, and audio generators as high-level `Pipeline` objects while exposing the underlying components, UNet/transformer denoisers, VAEs, text encoders, and interchangeable schedulers, so users can go from one-line inference to fully custom pipelines.

## Why it's in the Arsenal

Almost all open diffusion work flows through Diffusers, and its consistent API over a fast-moving model landscape makes it a foundational multimodal-generation entry that other tools and tutorials assume.

## Architecture

Diffusers separates the sampling loop into modular parts: a scheduler defines the noise schedule and update rule (DDPM, DDIM, Euler, DPM-Solver), a denoising model predicts noise or velocity, and a VAE maps between pixel and latent space, with text encoders providing conditioning. Pipelines compose these for a task (text-to-image, image-to-image, inpainting, video), and the library integrates LoRA/adapters, quantization, and accelerated attention backends.

## Ecosystem Position

Diffusers is the library layer beneath web UIs like the Stable Diffusion WebUI and complements model releases such as Stability's generative-models and video models, which it wraps into pipelines. Compared with a bespoke research repo per model, Diffusers offers a unified, maintained API; compared with a GUI it is code-first and composable rather than point-and-click.

## Getting Started

Install with `pip install diffusers transformers accelerate`, then load a pipeline such as `DiffusionPipeline.from_pretrained('...')` and call it with a prompt; schedulers and LoRA weights can be swapped in, and training scripts under `examples/` cover fine-tuning and DreamBooth.

## Key Use Cases

Text-to-image and image-to-image generation; video and audio diffusion; fine-tuning and LoRA training; building custom generation pipelines and serving backends.

## Strengths

Broad, up-to-date model coverage, modular and swappable components, strong docs and training examples, active org-backed maintenance, and an Apache-2.0 library license.

## Limitations

It is a library, not an application, so it lacks a GUI; individual model weights have their own (sometimes restrictive) licenses; peak serving latency may need specialized runtimes; and the rapid model cadence means occasional API churn.

## Relation to the Arsenal

It underpins the image/video generation entries and links to fine-tuning tips and serving patterns.

## Resources

- [GitHub repository](https://github.com/huggingface/diffusers)
- [Documentation](https://huggingface.co/docs/diffusers)
