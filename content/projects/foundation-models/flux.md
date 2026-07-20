---
id: flux
name: FLUX (Black Forest Labs)
version_tracked: null
artifact_type: model
category: multimodal
subcategory: open-source-models
description: Black Forest Labs' rectified-flow image generation family — FLUX.1 [dev]/[schnell] set the open-weights quality bar after Stable Diffusion's momentum stalled
github_url: https://github.com/black-forest-labs/flux
license: Apache-2.0 (code); weights vary by variant
primary_language: Python
org_or_maintainer: black-forest-labs
tags:
  - multimodal
  - inference
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 25745
github_stars_last_30d: 45
trending_score: 44
last_commit: '2025-07-31'
docs_url: https://github.com/black-forest-labs/flux
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain:
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - production-proven
ecosystem_role:
  - 'The successor to Stable Diffusion''s open-weights crown: built by the original SD authors after leaving Stability, FLUX''s 12B rectified-flow transformers raised open image-generation quality (prompt adherence, text rendering, anatomy) to near-closed-model level — and its [dev]/[schnell] license split defines how the ecosystem now ships ''open'' image models'
best_for:
  - 'Self-hosted high-quality image generation: [schnell] (Apache-2.0, few-step) for permissive commercial use, [dev] for maximum open quality where the non-commercial license fits'
  - Building on an active tooling ecosystem — ComfyUI workflows, LoRA fine-tuning, and ControlNet-style tools ported to FLUX quickly, inheriting SD's community energy
avoid_if:
  - You need permissive weights at maximum quality — [dev]'s non-commercial license is the catch; commercial [dev]-quality access is API-only, so read the license before building a product on it
  - You're VRAM-constrained — 12B-parameter generation models want 24GB-class GPUs; quantized variants trade quality for fit
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (25.7k), Apache-2.0 code license, last push 2025-07-31 verified via the GitHub API on 2026-07-08 — release-hub cadence; family activity continues via weight releases (Kontext etc.) on the Hub. Weight-license split documented from official model cards.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/black-forest-labs/flux
    date: '2026-07-08'
    description: 25.7k stars; the open image-generation reference since 2024
featured: false
status: active
---

## Overview

FLUX is Black Forest Labs' text-to-image family: 12B-parameter rectified-flow transformers released as FLUX.1 [pro] (API-only), [dev] (open weights, non-commercial), and [schnell] (Apache-2.0, timestep-distilled for 1-4-step generation), later extended with editing/in-context models (Kontext) and tooling variants (fill, canny, depth, redux). The repo provides reference inference code; the ecosystem runs it through ComfyUI and diffusers.

## Why it's in the Arsenal

When the original Stable Diffusion team shipped FLUX, the open image-generation center of gravity moved with them: it's the model the local-generation ecosystem (ComfyUI workflows, LoRA culture, control tools) now organizes around, and its three-tier license structure is the template open image models follow. Any stack decision about self-hosted image generation starts here.

## Architecture

A rectified-flow (flow-matching) transformer rather than classic DDPM U-Net: a multimodal DiT-style backbone with parallel attention over image latents and text conditioning from dual encoders (CLIP + T5-XXL), trained to straighten probability-flow trajectories — the property that makes [schnell]'s few-step distillation work. Generation runs in a VAE latent space.

## Ecosystem Position

Predecessor lineage: Stable Diffusion (same core authors; SD3 shares the rectified-flow direction). Competing: SDXL/SD3.5 (Stability), open challengers (HiDream, Qwen-Image-class), and closed APIs (Midjourney, DALL·E, Imagen). Complementary: ComfyUI (the de facto runtime), diffusers integration, LoRA fine-tuning stacks.

## Getting Started

```bash
pip install -U diffusers transformers
```

```python
from diffusers import FluxPipeline
pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype="auto").to("cuda")
image = pipe("a photo of a corgi reading a newspaper", num_inference_steps=4).images[0]
```

## Key Use Cases

1. **Scenario**: self-hosted product imagery/creative generation on [schnell] where Apache-2.0 licensing and few-step latency both matter
2. **Scenario**: local creative workflows in ComfyUI with [dev] + community LoRAs for maximum open-weights quality (non-commercial contexts)

## Strengths

- Raised the open quality bar by mechanism (rectified-flow DiT at 12B, T5-conditioned prompts) — visibly better text rendering and prompt adherence than the SD generation it superseded
- Inherited the strongest tooling community in image generation, so control/fine-tuning capabilities arrived fast

## Limitations

- The license split is the sharp edge: the weights most people benchmark ([dev]) are non-commercial; product builders must use [schnell] or the paid API
- 12B inference is heavy for hobby GPUs; and the reference repo itself moves at release cadence, with day-to-day development in ecosystem tools

## Relation to the Arsenal

The image-generation pole among foundation models — complements `clip` (whose text-encoder lineage conditions it) and the vision entries; runs locally through ComfyUI-class tooling covered on the tools side.

## Resources

- [GitHub](https://github.com/black-forest-labs/flux)
- [Model weights](https://huggingface.co/black-forest-labs)
