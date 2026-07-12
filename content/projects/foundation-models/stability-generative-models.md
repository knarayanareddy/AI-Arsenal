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
org_or_maintainer: "Stability-AI"
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
id: stability-generative-models
name: "Stability AI Generative Models"
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "Stability AI's official repository for its generative image models including SDXL and Stable Diffusion 3, with training, sampling, and model definitions"
github_url: https://github.com/Stability-AI/generative-models
license: "MIT"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
  - "fine-tuning"
maturity: beta
cost_model: open-source
github_stars: 27215
last_commit: "2025-12-16"
docs_url: https://github.com/Stability-AI/generative-models
phase: foundation-model
domain:
  - "vision"
relation_to_stack:
  - "study-and-reference"
  - "build-on-top"
health_signals:
  - "research-origin"
  - "org-backed"
  - "community-driven"
ecosystem_role:
  - "The upstream reference implementation and model definitions for Stability's SDXL and SD3 image generators."
best_for:
  - "You want the authoritative model definitions and sampling code for SDXL/SD3 rather than a third-party wrapper"
  - "You are studying or extending Stability's diffusion architectures and training recipes"
avoid_if:
  - "You want the easiest inference path, where the Diffusers library wraps these models more conveniently"
  - "Your use is commercial and you have not reviewed the separate model-weight licenses"
enrichment_notes: "Repository, MIT code license, and 2025-12-16 activity verified via the GitHub API on 2026-07-12. Model weights (SDXL/SD3) carry their own licenses distinct from the MIT code."
---

## Overview

Stability AI's generative-models repository is the official home for the company's image-generation models, including SDXL and the Stable Diffusion 3 family. It contains the authoritative model definitions, sampling code, and configuration for these models, serving as the upstream source that downstream libraries and UIs wrap.

## Why it's in the Arsenal

It is the canonical reference for some of the most influential open image models, and having the original definitions and sampling code (rather than a reimplementation) matters for accurate study, extension, and reproduction.

## Architecture

The repository implements latent diffusion: a VAE compresses images into a latent space where a UNet or, in SD3, a multimodal diffusion transformer (MMDiT) denoises latents conditioned on text embeddings from multiple text encoders, and a sampler integrates the reverse diffusion process. It provides the config-driven model specs, training/sampling scripts, and the exact conditioning pipelines Stability used.

## Ecosystem Position

This repo is upstream of the broader ecosystem: the Diffusers library re-packages these models for easy use, and GUIs like the Stable Diffusion WebUI build on the same weights. Compared with those, it is lower-level and authoritative rather than convenient, so teams use it to study architecture and reproduce results while most inference happens through the wrappers.

## Getting Started

Clone the repository, install dependencies, download the model weights from Hugging Face (accepting their licenses), and run the provided sampling scripts or the Streamlit demo; configs select the specific model and sampler.

## Key Use Cases

Authoritative SDXL/SD3 inference and study; reproducing Stability results; extending or fine-tuning the reference architectures; understanding MMDiT and latent-diffusion internals.

## Strengths

Authoritative model definitions, MIT-licensed code, official sampling recipes, and backing by the models' creators, making it the ground truth for these architectures.

## Limitations

It is lower-level and less convenient than the Diffusers wrapper, model weights have their own licenses that restrict some commercial use, upstream cadence is release-driven, and setup is heavier than a packaged library.

## Relation to the Arsenal

It is the upstream counterpart to the Diffusers library and the diffusion UIs in the multimodal category.

## Resources

- [GitHub repository](https://github.com/Stability-AI/generative-models)
