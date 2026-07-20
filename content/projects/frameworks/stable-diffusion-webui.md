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
org_or_maintainer: AUTOMATIC1111
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 54
trending_score: 34
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: stable-diffusion-webui
name: Stable Diffusion WebUI
artifact_type: platform
category: multimodal
subcategory: platforms
description: AUTOMATIC1111's browser-based application for local Stable Diffusion image generation with an extensive extension ecosystem for control, upscaling
github_url: https://github.com/AUTOMATIC1111/stable-diffusion-webui
license: AGPL-3.0
primary_language: Python
tags:
  - multimodal
  - self-hosted
  - inference
maturity: production
cost_model: open-source
github_stars: 164251
last_commit: '2026-03-02'
docs_url: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki
phase: framework
domain:
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - community-driven
ecosystem_role:
  - A local web application that turns diffusion models into an interactive image-generation studio with a large extension ecosystem.
best_for:
  - You want a full local GUI for Stable Diffusion with txt2img, img2img, inpainting, upscaling, and ControlNet via extensions
  - You are an artist or hobbyist who wants point-and-click control without writing code
avoid_if:
  - You need a programmatic library to embed generation in an app, where Diffusers is the better fit
  - AGPL-3.0 licensing is incompatible with how you intend to distribute or host derivatives
enrichment_notes: Repository, AGPL-3.0 license, and 2026-03-02 activity verified via the GitHub API on 2026-07-12. One of the most-starred AI repos; community-maintained.
---

## Overview

Stable Diffusion WebUI (AUTOMATIC1111) is a browser-based application for running Stable Diffusion image generation locally. It wraps diffusion models in a rich Gradio interface with txt2img, img2img, inpainting, outpainting, upscaling, and a vast extension ecosystem (ControlNet, LoRA management, schedulers), and it became the default entry point for hobbyist and prosumer image generation.

## Why it's in the Arsenal

As one of the most-starred AI projects ever, it defined how most people actually use open image models day to day. Its extension ecosystem and workflow features make it a canonical application-layer entry for the multimodal category.

## Architecture

The WebUI is a Python application built on Gradio that loads diffusion model checkpoints and exposes their sampling loop through a UI: it manages models, VAEs, samplers, and prompt parsing, and its extension API lets third-party plugins add features like ControlNet conditioning or upscalers. It can run on consumer GPUs with memory-optimization flags and also exposes an HTTP API for automation.

## Ecosystem Position

The WebUI sits at the application layer above libraries like Diffusers and model repos like Stability's generative-models: it consumes the same weights but adds an interactive studio and plugin ecosystem. Compared with a code-first library it favors point-and-click experimentation, and compared with newer node-based UIs like ComfyUI it trades graph flexibility for a more approachable form-based interface.

## Getting Started

Clone the repository, run the launch script (which sets up a Python venv and downloads dependencies), place model checkpoints in the models folder, and open the local URL; extensions install from the UI or by cloning into the extensions directory.

## Key Use Cases

Local interactive image generation and editing; ControlNet-guided and inpainting workflows; LoRA and model experimentation; batch generation via the built-in API.

## Strengths

Approachable full-featured GUI, enormous extension ecosystem, runs on consumer GPUs, an HTTP API for automation, and a massive community with tutorials and plugins.

## Limitations

The AGPL-3.0 license constrains commercial redistribution, it is an application rather than an embeddable library, the plugin ecosystem can be fragile across updates, and it targets image diffusion specifically rather than general generation.

## Relation to the Arsenal

It is the application layer over the Diffusers library and Stability model entries in the multimodal category.

## Resources

- [GitHub repository](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- [Feature wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)
