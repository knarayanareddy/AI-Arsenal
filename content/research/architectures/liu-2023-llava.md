---
id: liu-2023-llava
title: "Visual Instruction Tuning (LLaVA)"
phase: architectures
venue: neurips
year: 2023
authors:
  - "Liu, H."
  - "Li, C."
  - "Wu, Q."
  - "Lee, Y. J."
arxiv_id: "2304.08485"
arxiv_url: "https://arxiv.org/abs/2304.08485"
pdf_url: "https://arxiv.org/pdf/2304.08485"
code_url: "https://github.com/haotian-liu/LLaVA"
venue_url: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/6dcf277ea32ce3288914faf369fe6de0-Abstract-Conference.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 7000

tldr: "Connected a frozen CLIP vision encoder to a LLaMA-family LLM with just a linear projection, trained on GPT-4-generated visual instruction data — establishing the minimal recipe (encoder + projector + LLM) behind most open vision-language models"
key_contribution: "Two firsts that became defaults: machine-generating multimodal instruction-following data by prompting text-only GPT-4 with image captions/boxes, and showing a trivially simple projector suffices to graft vision onto a pretrained LLM — GPT-4V-style assistant behavior from academic-scale compute"

builds_on:
  - "radford-2021-clip"
  - "touvron-2023-llama"
  - "wei-2021-flan"

tags:
  - "multimodal"
  - "llm"
  - "fine-tuning"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Instruction tuning had transformed text LLMs into assistants, but no visual instruction data existed. LLaVA's move: prompt *text-only* GPT-4 with image captions and bounding-box coordinates to generate 158K multimodal conversations, then train the cheapest possible bridge — a single linear layer projecting CLIP image features into LLaMA's embedding space. The resulting model exhibited GPT-4V-like conversational vision ability months before GPT-4V shipped publicly, and its three-part template (frozen-ish encoder, small projector, instruction-tuned LLM) became the standard open VLM architecture.

## Why it's in the Arsenal

- Most open vision-language models practitioners deploy (LLaVA line, Qwen-VL-style designs, InternVL and descendants) are elaborations of this encoder→projector→LLM template; this paper is where the template and its training curriculum were set
- Its data move — using a stronger text model to synthesize training data for a capability it doesn't itself demonstrate — is one of the most-reused patterns in applied model development, worth studying in its original form

## Core Contribution

(1) The visual instruction data pipeline: captions + boxes rendered as text let GPT-4 author conversations, detailed descriptions, and complex-reasoning QA about images it never saw — 158K samples; (2) the architecture: CLIP ViT-L/14 features, linear projection, Vicuna LLM; (3) the two-stage curriculum — projector-only alignment pretraining on image-caption pairs, then end-to-end instruction tuning — that nearly every subsequent VLM adopted.

## Key Results

- 85.1% relative to GPT-4 on the paper's GPT-4-judged multimodal conversation benchmark; SOTA 92.53% on ScienceQA when ensembled with GPT-4 (2023)
- Ablations: instruction diversity matters — training on all three data types beats any subset; the complex-reasoning data drives the largest gains (2023)
- LLaVA-1.5 follow-up reached top marks across 11 benchmarks with only an MLP projector upgrade and better data — evidence the recipe, not scale, was the contribution (2023)

## Methodology

Two-stage training: stage 1 aligns the projector on ~595K filtered CC3M caption pairs (vision encoder and LLM frozen); stage 2 fine-tunes projector + LLM on the 158K generated instructions. Evaluation via GPT-4-as-judge on conversation/description/reasoning splits plus ScienceQA, with data-ablation studies.

## Practical Applicability

Directly relevant to anyone selecting or adapting an open VLM: the LLaVA lineage and its descendants are the models actually available for self-hosted multimodal work, and the two-stage recipe is what you'd run to add vision to a domain-specific LLM (the projector-alignment stage is cheap enough for modest budgets). The synthetic-data pattern generalizes: when a capability lacks training data, render the grounding into text and let a strong model author the supervision — with the caveat that the student inherits the teacher's biases and hallucinations.

## Limitations & Critiques

GPT-4-judged evaluation of GPT-4-taught models risks style-matching inflation — later benchmark suites (MMBench, MMMU) gave more rigorous pictures; single low-resolution image input (336px), no fine-grained OCR/document ability in v1; CLIP-feature bottleneck limits spatial precision; and synthetic conversations about unseen images bake in confident hallucination, a persistent LLaVA-family failure mode documented by follow-up hallucination benchmarks (POPE).

## Reproductions & Follow-up Work

Fully open (code, data, weights) and reproduced extensively; the direct line runs LLaVA-1.5 → LLaVA-NeXT → LLaVA-OneVision, with the architecture template adopted by most open VLM efforts and the data pipeline reused across modalities (video, audio instruction tuning). Remains the standard baseline cited by new open VLM releases.

## Relation to the Arsenal

Builds on `radford-2021-clip` (architectures/) for its vision tower and `touvron-2023-llama`-lineage LLMs for its language side; anchors the multimodal entries in projects/multimodal/ and the VLM-selection guidance implicit in tools/model-layer/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2304.08485)
- [arXiv](https://arxiv.org/abs/2304.08485)
- [Code & models](https://github.com/haotian-liu/LLaVA)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
