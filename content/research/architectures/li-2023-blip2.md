---
id: li-2023-blip2
title: "BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models"
phase: architectures
venue: icml
year: 2023
authors:
  - "Li, J."
  - "Li, D."
  - "Savarese, S."
  - "Hoi, S."
arxiv_id: "2301.12597"
arxiv_url: "https://arxiv.org/abs/2301.12597"
pdf_url: "https://arxiv.org/pdf/2301.12597"
code_url: "https://github.com/salesforce/LAVIS"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 6000

tldr: "Connected a frozen image encoder to a frozen LLM with a small trainable Querying Transformer (Q-Former), two-stage trained — reaching strong VQA/captioning with a tiny fraction of trainable parameters, the efficient bridge pattern behind many open VLMs."
key_contribution: "Introduced the Q-Former: a lightweight transformer with learned query tokens that extracts a fixed set of language-aligned visual features from a frozen image encoder and feeds them to a frozen LLM, trained in two stages (representation learning then generative), achieving VLM capability while training only ~1% of the parameters."

builds_on:
  - "alayrac-2022-flamingo"
  - "radford-2021-clip"
implemented_in: []

tags:
  - "multimodal"
  - "research"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

BLIP-2 builds a vision-language model by bridging an off-the-shelf frozen image encoder and a frozen LLM with a small trainable module, the Querying Transformer (Q-Former). A set of learned query tokens attends to the frozen image features and distills them into a compact, language-aligned representation that the LLM consumes as soft prompts. Trained in two stages, BLIP-2 reaches competitive captioning and visual question answering while training only a tiny fraction of parameters.

## Why it's in the Arsenal

- BLIP-2 is the efficiency counterpoint to Flamingo: it showed you can get strong VLM behavior by training a ~100M-parameter connector instead of heavy interleaved cross-attention, making multimodal adaptation cheap
- The Q-Former pattern (learned queries pulling a fixed visual token budget from a frozen encoder) recurs across open VLMs and is a practical template for bolting perception onto any LLM you already run

## Core Contribution

The Q-Former and its two-stage training. Stage 1 (vision-language representation learning) trains the Q-Former against the frozen image encoder with contrastive, matching, and captioning objectives so its query outputs are language-informative. Stage 2 (vision-to-language generative learning) connects those query tokens to a frozen LLM, teaching the LLM to generate from them. Freezing both large models isolates all learning in the small bridge.

## Key Results

- Outperformed Flamingo-80B on zero-shot VQAv2 while using far fewer trainable parameters (paper, 2023)
- Achieved state-of-the-art zero-shot image-to-text results at the time with roughly 1-2% of the trainable parameters of comparable end-to-end models (2023)

## Methodology

A frozen ViT/CLIP-style image encoder provides features; the Q-Former's learned queries cross-attend to them and are trained with image-text contrastive, image-text matching, and image-grounded captioning losses (stage 1). The query outputs are then linearly projected into a frozen LLM's embedding space and trained with a language-modeling loss (stage 2). Only the Q-Former and projection are updated throughout.

## Practical Applicability

BLIP-2 is directly usable: the LAVIS library ships pretrained checkpoints you can run for captioning and VQA out of the box, and the Q-Former recipe is a low-cost way to give an existing frozen LLM vision without touching its weights. When budget matters, this "small trainable connector" approach is often the right first choice over full multimodal fine-tuning. It also cleanly separates the vision encoder, so you can swap encoders as better ones appear.

## Limitations & Critiques

- The two-stage training and Q-Former add architectural complexity; the later LLaVA line showed a simple linear/MLP projector plus instruction tuning can rival or beat it with less machinery
- Fixed query-token budget can bottleneck fine-grained visual detail (OCR, dense scenes), a known weakness addressed by higher-resolution and tiling successors
- Frozen backbones cap the ceiling: BLIP-2 inherits the frozen LLM's language limits and the frozen encoder's visual blind spots

## Reproductions & Follow-up Work

Reproduced and distributed via Salesforce's LAVIS library. Directly followed by InstructBLIP (instruction-tuned Q-Former) and paralleled by the `liu-2023-llava` projector-based approach; the Q-Former idea influenced numerous open VLMs and multimodal foundation models such as `qwen3-vl`.

## Relation to the Arsenal

Architectures paper; sits between `alayrac-2022-flamingo` and `liu-2023-llava` in the VLM lineage and is upstream of multimodal foundation-model projects like `qwen3-vl`.

## Resources

- [BLIP-2 paper](https://arxiv.org/abs/2301.12597)
- [Salesforce LAVIS (code + checkpoints)](https://github.com/salesforce/LAVIS)
