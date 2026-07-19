---
id: next-gpt
title: 'NExT-GPT: Any-to-Any Multimodal LLM'
phase: architectures
venue: icml
year: 2024
authors:
- Siyuan Wu
- Hao Fei
- Xiaoyu Fu
- et al.
arxiv_id: '2309.05519'
arxiv_url: https://arxiv.org/abs/2309.05519
pdf_url: https://arxiv.org/pdf/2309.05519
code_url: https://github.com/NExT-GPT/NExT-GPT
venue_url: null
practical_applicability: medium
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0
tldr: NExT-GPT combines a language model with modality encoders and diffusion decoders
  so one instruction-tuned system can perceive and generate text, images, video, and
  audio in arbitrary combinations.
key_contribution: The paper presented an any-to-any multimodal architecture and a
  two-stage alignment and instruction-tuning recipe that connects a frozen multimodal
  LLM to modality-specific encoders and generation decoders through projection layers.
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
- multimodal
- vision
- voice
- llm
- research
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
enrichment_status: draft
---

## Overview

NExT-GPT is an ICML 2024 multimodal system designed to accept and produce combinations of text, image, video, and audio. Instead of asking one monolithic decoder to generate every modality, it uses a language model as the semantic coordinator and connects modality encoders and diffusion-based decoders around it.

## Why it's in the Arsenal

The paper is worth cataloging because it made the any-to-any design space concrete: perception and generation can be composed around a language-centered controller rather than treated as one-way image or video captioning. That architecture remains a useful reference for engineers deciding whether their multimodal product needs synchronized modality routing or only a single input/output pair.

## Core Contribution

NExT-GPT combines a pretrained multimodal large language model with modality-specific encoders for understanding and diffusion decoders for generation. A projection and alignment stage maps visual, video, and audio representations into the LLM's interface, while instruction tuning teaches the model when to invoke each output modality and how to condition the corresponding decoder.

## Key Results

The authors compare NExT-GPT with modality-specific and earlier multimodal baselines on perception and generation tasks, reporting competitive understanding quality and improved ability to produce mixed-modality responses under one instruction interface. The paper's qualitative examples and human evaluations are particularly important for the any-to-any claim: it demonstrates combinations such as text-to-video, image-to-audio, and video-to-text rather than only a single benchmark direction.

## Methodology

The training recipe has two main stages. First, modality projection layers are aligned so the frozen or largely pretrained language-centered system can consume representations from the selected encoders and issue signals to generation decoders. Second, the system receives multimodal instruction data covering input/output combinations. Baselines include established multimodal LLMs and task-specific generation systems, allowing the authors to separate understanding quality from the breadth of supported generation routes.

## Practical Applicability

The architecture is useful when a product must route an instruction among several modality generators while preserving one conversational state. Reuse the design as a systems blueprint: keep encoders and decoders replaceable, evaluate every input/output pair separately, and measure synchronization, latency, and content safety rather than assuming a strong text backbone makes every modality path reliable.

## Limitations & Critiques

Any-to-any capability multiplies data, compute, and evaluation requirements: a system can look impressive on a few cross-modal demos while failing on a particular modality pair or long output. The public repository's last default-branch commit is 2025-05-13, and its older checkpoints and dependencies may require repair. Diffusion decoders also add substantial latency and hardware requirements compared with text-only response generation.

## Reproductions & Follow-up Work

The repository includes code, data, and model-weight instructions, but a full reproduction requires multiple encoders, diffusion models, GPU memory, and modality-specific preprocessing. A useful follow-up should benchmark each route under matched compute, test long-form audio/video quality, and measure whether replacing one encoder or decoder preserves the instruction-tuned controller's behavior.

## Relation to the Arsenal

NExT-GPT connects the Arsenal's multimodal foundation models to audio/video generation pipelines and agent interfaces. It complements current open multimodal model entries by documenting a compositional architecture, but it is not a drop-in inference server or a guarantee that every modality combination is production-ready.

## Resources

- [Paper](https://arxiv.org/abs/2309.05519)
- [PDF](https://arxiv.org/pdf/2309.05519)
- [Code and models](https://github.com/NExT-GPT/NExT-GPT)
- [Project site](https://next-gpt.github.io/)
