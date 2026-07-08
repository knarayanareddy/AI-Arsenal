---
id: alayrac-2022-flamingo
title: "Flamingo: a Visual Language Model for Few-Shot Learning"
phase: architectures
venue: neurips
year: 2022
authors:
  - "Alayrac, J.-B."
  - "Donahue, J."
  - "Luc, P."
  - "Miech, A."
  - "Barr, I."
  - "Hasson, Y."
  - "Simonyan, K."
arxiv_id: "2204.14198"
arxiv_url: "https://arxiv.org/abs/2204.14198"
pdf_url: "https://arxiv.org/pdf/2204.14198"
code_url: "https://github.com/mlfoundations/open_flamingo"
venue_url: null

practical_applicability: medium
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 4000

tldr: "Bridged a frozen vision encoder and a frozen LLM with trainable cross-attention (Perceiver Resampler + gated cross-attention), enabling few-shot vision-language tasks from interleaved image-text prompts — the template most modern VLMs follow."
key_contribution: "Showed how to graft visual perception onto a pretrained LLM without retraining either: a Perceiver Resampler compresses variable image features into a fixed set of tokens, and gated cross-attention layers inserted into the frozen LLM let it attend to images, giving strong few-shot multimodal learning from interleaved prompts."

builds_on:
  - "vaswani-2017-attention"
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

Flamingo is a visual language model that connects a frozen pretrained vision encoder to a frozen pretrained language model through newly-trained bridging components. A Perceiver Resampler turns a variable number of visual features into a fixed number of tokens, and gated cross-attention layers interleaved into the LLM let text tokens attend to those visual tokens. Trained on large-scale interleaved image-text web data, Flamingo handles arbitrarily interleaved image/text prompts and learns new tasks few-shot.

## Why it's in the Arsenal

- Flamingo defined the dominant architectural pattern for vision-language models — freeze strong unimodal backbones, train a lightweight cross-modal bridge — that BLIP-2, LLaVA, and most open VLMs still follow
- Its "interleaved image-text, few-shot from prompt" framing is why modern multimodal chat models can reason over multiple images in one conversation

## Core Contribution

Two reusable components: (1) the Perceiver Resampler, which decouples the LLM's input length from image resolution/frame count by resampling features into a fixed token budget; and (2) gated cross-attention-dense layers, inserted between frozen LLM blocks and initialized to a no-op via a tanh gate so training starts from the intact language model and adds vision gradually. This keeps the expensive backbones frozen while learning only the bridge.

## Key Results

- Set a new few-shot state of the art on multiple vision-language benchmarks, surpassing prior fine-tuned models on 6 of 16 tasks using only few-shot prompting (paper, 2022)
- The 80B-parameter Flamingo outperformed models fine-tuned on thousands of task-specific examples in the few-shot regime (2022)

## Methodology

Frozen NFNet-style vision encoder and frozen Chinchilla LLM; only the Perceiver Resampler and gated cross-attention layers are trained, on a mixture of interleaved web image-text, image-text pairs, and video-text data. Evaluation is primarily few-shot in-context across captioning, VQA, and classification, with images and text arbitrarily interleaved in the prompt.

## Practical Applicability

For practitioners, Flamingo is the conceptual blueprint you inherit whenever you use or fine-tune an open VLM: the "freeze backbones, train a connector" recipe means you can adapt strong LLMs to vision cheaply, and the Perceiver-style resampling is why you can feed multiple or high-resolution images without blowing the context budget. The open-source OpenFlamingo reproduction lets teams train Flamingo-style models on their own data.

## Limitations & Critiques

- The original Flamingo weights were never publicly released by DeepMind; practical use relies on the OpenFlamingo reproduction, which trails the reported numbers
- Few-shot multimodal performance is sensitive to prompt construction and example selection, limiting robustness
- Later single-stage instruction-tuned VLMs (LLaVA line) achieved strong results with simpler linear projectors, questioning whether Flamingo's heavier cross-attention bridge is always necessary

## Reproductions & Follow-up Work

Reproduced openly as OpenFlamingo (mlfoundations/open_flamingo). Directly influenced `li-2023-blip2` (Q-Former as an alternative bridge) and the `liu-2023-llava` line (lightweight projector + instruction tuning), which now dominate open multimodal work.

## Relation to the Arsenal

Architectures paper; the ancestor of the multimodal VLM entries including `li-2023-blip2` and `liu-2023-llava`, and conceptually upstream of multimodal foundation-model projects like `qwen3-vl`.

## Resources

- [Flamingo paper](https://arxiv.org/abs/2204.14198)
- [OpenFlamingo reproduction](https://github.com/mlfoundations/open_flamingo)
