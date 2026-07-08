---
id: dosovitskiy-2020-vit
title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale"
phase: foundational
venue: iclr
year: 2020
authors:
  - "Dosovitskiy, A."
  - "Beyer, L."
  - "Kolesnikov, A."
  - "Weissenborn, D."
  - "Houlsby, N."
arxiv_id: "2010.11929"
arxiv_url: "https://arxiv.org/abs/2010.11929"
pdf_url: "https://arxiv.org/pdf/2010.11929"
code_url: "https://github.com/google-research/vision_transformer"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 0

tldr: "Splits an image into fixed patches, embeds them like tokens, and feeds them to a plain Transformer encoder -- shows that with enough pretraining data a convolution-free model matches or beats CNNs on image classification"
key_contribution: "Demonstrated that a standard Transformer applied directly to sequences of image patches (the Vision Transformer, ViT), with minimal image-specific inductive bias, matches or exceeds state-of-the-art CNNs when pretrained on large datasets, establishing the Transformer as a general architecture across modalities"

builds_on: []
implemented_in: []

tags:
  - vision
  - multimodal
  - transformers
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

The Vision Transformer (ViT) showed that the Transformer architecture, dominant in NLP, transfers to computer vision with almost no changes. An image is cut into fixed-size patches (e.g. 16x16), each patch is linearly embedded into a token, position embeddings are added, and the sequence is processed by a standard Transformer encoder — no convolutions. With large-scale pretraining, ViT matches or beats the best CNNs.

## Why it's in the Arsenal

- It is the foundational bridge that made "Transformers everywhere" real: modern multimodal models (CLIP, LLaVA, the vision towers in VLMs this catalog documents) rely on ViT-style patch encoders. Understanding ViT explains how images enter today's LLM stacks.
- `practical_applicability: high` because ViT backbones are the default vision encoder in current multimodal pipelines, not just a historical result.

## Core Contribution

CNNs bake in strong image priors (locality, translation equivariance) that were assumed necessary for vision. ViT's contribution is showing those priors are *replaceable by data*: a near-pure Transformer with only patch-embedding structure underperforms CNNs on mid-sized datasets but overtakes them once pretrained on very large corpora (JFT-300M scale). The mechanism is that self-attention over patches learns global relationships directly, and scale supplies the priors that architecture no longer encodes.

## Key Results

- ViT pretrained on large data matched or exceeded contemporary CNN state of the art on ImageNet and transfer benchmarks at lower pretraining compute (specific numbers should be read from the paper directly)
- Made explicit the data-scale threshold: below it CNNs win (their inductive bias helps); above it ViT wins (attention + data generalizes better)

## Methodology

Patchify the image, flatten and linearly project each patch to a token, prepend a learnable [class] token, add position embeddings, run a standard Transformer encoder, and classify from the [class] token representation. Pretrain supervised on a large image dataset, then fine-tune at higher resolution on downstream tasks.

## Practical Applicability

If you build multimodal systems, the applicable takeaway is architectural: image inputs are tokenized into patch embeddings and fused with text through attention — this is why VLMs pair a ViT encoder with an LLM via a projector. The failure mode to remember is data hunger: ViT-from-scratch on small datasets underperforms a CNN, so you use pretrained ViT backbones rather than training your own.

## Limitations & Critiques

Plain ViT is data- and compute-hungry to train from scratch and lacks CNN locality priors, which later work (DeiT's distillation, Swin's hierarchical windows, hybrid conv-ViT models) addressed for smaller-data regimes. Quadratic attention cost also limits native high-resolution inputs. ViT is foundational, not the final word — treat it as the base pattern that many variants refine.

## Reproductions & Follow-up Work

Official code and weights are released (google-research/vision_transformer) and ViT has been reproduced and re-implemented across every major framework, making it one of the most independently validated vision results. Direct descendants include DeiT, Swin Transformer, BEiT/MAE (self-supervised ViT), and the vision encoders inside CLIP and modern VLMs.

## Relation to the Arsenal

Foundational context for this catalog's multimodal models — `radford-2021-clip`, `liu-2023-llava`, and the VLM `minicpm-v` project all build on ViT-style patch encoding. Read alongside `vaswani-2017-attention` (the Transformer this adapts) to see the architecture generalize from text to vision.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2010.11929)
- [arXiv](https://arxiv.org/abs/2010.11929)
- [Official Code](https://github.com/google-research/vision_transformer)
