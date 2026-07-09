---
id: rombach-2022-ldm
title: "High-Resolution Image Synthesis with Latent Diffusion Models"
phase: architectures
venue: other
year: 2022
authors:
  - "Rombach, R."
  - "Blattmann, A."
  - "Lorenz, D."
  - "Esser, P."
  - "Ommer, B."
arxiv_id: "2112.10752"
arxiv_url: "https://arxiv.org/abs/2112.10752"
pdf_url: "https://arxiv.org/pdf/2112.10752"
code_url: "https://github.com/CompVis/latent-diffusion"
venue_url: "https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html"

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 20000

tldr: "Ran diffusion in a compressed latent space rather than pixel space, cutting compute enough to make high-resolution, text-conditioned image generation practical — the architecture behind Stable Diffusion"
key_contribution: "Introduced a two-stage design: an autoencoder compresses images to a perceptually-equivalent latent space, and a diffusion model operates there with cross-attention conditioning, drastically reducing cost while preserving quality"

builds_on: []
implemented_in: []

tags:
  - multimodal
  - self-hosted
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Latent Diffusion Models (LDM) made high-resolution, text-to-image diffusion practical, and the released weights became Stable Diffusion. The key move: instead of running the expensive diffusion process directly on pixels ([DDPM](./ho-2020-ddpm.md)-style), first compress images into a much smaller latent space with a trained autoencoder, then run diffusion there, and decode back to pixels at the end. Because most pixel-level detail is perceptually redundant, diffusion in latent space keeps quality while cutting compute by roughly an order of magnitude — which is what put open, high-quality image generation into everyone's hands.

## Why it's in the Arsenal

- Stable Diffusion (this architecture) is the most widely deployed open image generator; understanding the latent-space + cross-attention conditioning design is essential for anyone building on or fine-tuning it.
- It is the canonical example of a recurring efficiency pattern — move an expensive generative process into a learned compressed space — that generalizes beyond images.
- `practical_applicability: high` — unlike the more theoretical foundational papers, this architecture is something you directly use, fine-tune (LoRA/DreamBooth), and deploy in production multimodal stacks.

## Core Contribution

The paper's contribution is an architecture that decouples perceptual compression from generative modeling. Stage one trains an autoencoder (with a KL or VQ regularizer) that maps an image into a lower-dimensional latent and reconstructs it with high perceptual fidelity, removing high-frequency redundancy. Stage two trains a diffusion model in that latent space, so the costly iterative denoising operates on far fewer dimensions. Conditioning (text, layout, class) is injected via cross-attention layers in the denoising U-Net, providing a general mechanism to steer generation from arbitrary modalities. The combination is what makes text-to-image generation both high-quality and computationally affordable, including on consumer GPUs.

## Key Results

- Achieved competitive or state-of-the-art FID on several image-generation benchmarks (2022) while using substantially less compute than pixel-space diffusion
- Enabled high-resolution synthesis (e.g. 512×512 and beyond) and flexible conditioning (text-to-image, inpainting, super-resolution, layout) in one framework
- The released model (Stable Diffusion) demonstrated the practical payoff: high-quality open text-to-image generation runnable on a single consumer GPU
- Benchmark FIDs are 2022 academic-dataset numbers; the durable significance is the latent-diffusion architecture and its role in democratizing image generation, not a specific leaderboard position.

## Methodology

The autoencoder is trained first with a perceptual + patch-adversarial objective and a latent regularizer, then frozen. A time-conditioned U-Net diffusion model is trained in the latent space using the standard denoising objective, with cross-attention layers consuming conditioning embeddings (e.g. from a text encoder). Evaluation spanned unconditional generation, class-conditional generation, text-to-image, inpainting, and super-resolution across datasets like ImageNet and LAION-derived data, comparing FID and compute against pixel-space diffusion and GAN baselines.

## Practical Applicability

This is a build-on-it architecture. In practice you use Stable Diffusion through libraries (diffusers), fine-tune it cheaply with LoRA or DreamBooth, control it with ControlNet-style conditioning, and deploy it behind an inference service. Levers that come from the paper: the latent downsampling factor (quality vs speed), the sampler and step count (from DDPM/DDIM lineage), and the cross-attention conditioning that text prompts flow through. If you are building any image-generation feature, this architecture and its ecosystem are the default starting point.

## Limitations & Critiques

- Quality is bounded by the autoencoder: information lost in latent compression cannot be recovered by the diffusion model, which can cause fine-detail artifacts.
- Like all diffusion, sampling is multi-step and slower than single-pass generators, though faster samplers and distillation mitigate this.
- Trained on large web-scraped datasets (LAION), it inherits their biases and raises well-documented licensing/consent concerns around training data and generated content.

## Reproductions & Follow-up Work

The architecture is extensively reproduced; Stable Diffusion and its many community fine-tunes are direct instantiations. Follow-ups include SDXL and later latent-diffusion variants, ControlNet (added spatial conditioning), and distillation methods (e.g. latent consistency models) that reduce step count. It builds directly on [DDPM](./ho-2020-ddpm.md) and shares conditioning ideas with cross-attention as introduced in the Transformer ([Attention Is All You Need](../foundational/vaswani-2017-attention.md)).

## Relation to the Arsenal

- The architecture behind the catalog's image-generation projects and multimodal tooling; the default open text-to-image stack.
- Pairs with [DDPM](./ho-2020-ddpm.md) (the diffusion recipe it accelerates) and with vision-language work like [CLIP](../foundational/radford-2021-clip.md), whose text encoders commonly supply the conditioning embeddings.

## Resources

- [arXiv abstract](https://arxiv.org/abs/2112.10752)
- [PDF](https://arxiv.org/pdf/2112.10752)
- [Reference implementation (CompVis/latent-diffusion)](https://github.com/CompVis/latent-diffusion)
- [CVPR 2022 paper page](https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html)
