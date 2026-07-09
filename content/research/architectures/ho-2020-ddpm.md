---
id: ho-2020-ddpm
title: "Denoising Diffusion Probabilistic Models"
phase: architectures
venue: neurips
year: 2020
authors:
  - "Ho, J."
  - "Jain, A."
  - "Abbeel, P."
arxiv_id: "2006.11239"
arxiv_url: "https://arxiv.org/abs/2006.11239"
pdf_url: "https://arxiv.org/pdf/2006.11239"
code_url: "https://github.com/hojonathanho/diffusion"
venue_url: "https://papers.nips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html"

practical_applicability: medium
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 20000

tldr: "Made diffusion models practical for high-quality image generation by training a network to reverse a gradual noising process, establishing the denoising-diffusion recipe behind modern image and video generators"
key_contribution: "Connected diffusion probabilistic models to denoising score matching and showed a simple reweighted training objective (predict the added noise) produces high-fidelity samples, turning diffusion into a competitive generative paradigm"

builds_on: []
implemented_in: []

tags:
  - multimodal
  - efficiency
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

DDPM is the paper that made diffusion models work well enough to matter. It defines a generative process as the reverse of a fixed forward process that gradually adds Gaussian noise to data over many steps; a neural network is trained to undo one step of that noising, and repeatedly applying it turns pure noise into a sample. The key practical result was a simplified training objective — predict the noise that was added — that is stable to train and produces high-quality images. This recipe underlies the image and video generators cataloged elsewhere in the Arsenal, most directly [Latent Diffusion / Stable Diffusion](./rombach-2022-ldm.md).

## Why it's in the Arsenal

- Every diffusion-based image/video model in the catalog descends from this training recipe. Understanding the forward/reverse process, the noise-prediction objective, and the many-step sampling loop is the vocabulary for reasoning about generation speed, quality, and guidance.
- It explains a core tradeoff you will hit in practice: diffusion sampling is iterative (many denoising steps), which is why inference is comparatively slow and why later work (faster samplers, latent-space diffusion, distillation) exists to accelerate it.
- `practical_applicability: medium` — you rarely re-implement DDPM, but if you fine-tune or deploy diffusion models the mechanism directly informs sampler choice, step count, and quality/latency tuning.

## Core Contribution

The paper's contribution is both conceptual and practical. Conceptually, it showed that diffusion probabilistic models are equivalent (up to reweighting) to denoising score matching combined with Langevin-style sampling, unifying two lines of generative modeling. Practically, it derived a training objective that is far simpler than the full variational bound: rather than predicting the mean of the reverse transition directly, the network `ε_θ(x_t, t)` predicts the noise `ε` that was added at step `t`, trained with a plain mean-squared error. This "predict the noise" parameterization, combined with a specific variance schedule, is what made training stable and samples high-fidelity. Generation runs the learned denoiser backward from Gaussian noise through the full chain of timesteps.

## Key Results

- Achieved an Inception score of 9.46 and a state-of-the-art FID of 3.17 on unconditional CIFAR-10 image generation (2020)
- Produced high-quality 256×256 samples on LSUN datasets, demonstrating the approach scales beyond small images
- Established diffusion as competitive with GANs on sample quality while avoiding GAN training instabilities like mode collapse
- These are 2020 image-generation benchmark numbers on academic datasets; they are historical context. The lasting contribution is the denoising-diffusion training recipe (see Core Contribution), which has been carried forward and vastly scaled since.

## Methodology

A fixed forward Markov chain adds Gaussian noise to a data sample over `T` timesteps according to a variance schedule until it is approximately pure noise. A time-conditioned U-Net is trained to predict the noise added at a randomly sampled timestep, minimizing MSE between predicted and true noise. Sampling starts from Gaussian noise and iteratively applies the learned reverse step for all `T` timesteps. Experiments on CIFAR-10 and LSUN compared FID/Inception scores against contemporaneous GAN and likelihood-based baselines, isolating the effect of the simplified objective and variance schedule.

## Practical Applicability

If you work with image/video generation you will encounter this mechanism constantly, even through higher-level libraries (diffusers). Practical levers that come straight from DDPM: the number of denoising steps (quality vs latency), the sampler/scheduler (DDPM vs faster deterministic samplers), and the noise schedule. When you fine-tune a diffusion model or debug slow or low-quality generation, you are reasoning about this forward/reverse process. For pure text-LLM work its applicability is lower, but diffusion is increasingly relevant to multimodal stacks.

## Limitations & Critiques

- Sampling is slow: high-quality generation requires many sequential denoising steps, a limitation later addressed by faster samplers, latent diffusion, and distillation.
- The original formulation operates in pixel space, which is memory- and compute-heavy at high resolution — the motivation for latent-space diffusion.
- It is unconditional/class-conditional; text-to-image control (classifier-free guidance, cross-attention conditioning) came from follow-up work.

## Reproductions & Follow-up Work

DDPM has been reproduced and extended extensively. Directly relevant follow-ups include improved DDPM training/schedules, DDIM (deterministic, fewer-step sampling), classifier-free guidance for conditioning, and — most important for the catalog — [Latent Diffusion Models / Stable Diffusion](./rombach-2022-ldm.md), which moved diffusion into a compressed latent space to make high-resolution text-to-image generation efficient.

## Relation to the Arsenal

- Foundational to the catalog's multimodal/image-generation entries; the mechanism behind diffusion-based generators.
- Pairs directly with [Latent Diffusion / Stable Diffusion](./rombach-2022-ldm.md), which is the efficient, text-conditioned realization of this recipe used in practice.

## Resources

- [arXiv abstract](https://arxiv.org/abs/2006.11239)
- [PDF](https://arxiv.org/pdf/2006.11239)
- [Reference implementation (hojonathanho/diffusion)](https://github.com/hojonathanho/diffusion)
- [NeurIPS 2020 paper page](https://papers.nips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html)
