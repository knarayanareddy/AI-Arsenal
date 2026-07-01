---
id: dettmers-2023-qlora
title: "QLoRA: Efficient Finetuning of Quantized LLMs"
phase: training-and-alignment
venue: neurips
year: 2023
authors:
  - "Dettmers, T."
  - "Pagnoni, A."
  - "Holtzman, A."
  - "Zettlemoyer, L."
arxiv_id: "2305.14314"
arxiv_url: "https://arxiv.org/abs/2305.14314"
pdf_url: "https://arxiv.org/pdf/2305.14314"
code_url: "https://github.com/artidoro/qlora"
venue_url: "https://papers.nips.cc/paper_files/paper/2023/hash/1feb87871436031bdc0f2beaa62a049b-Abstract-Conference.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 4000

tldr: "Showed you can fine-tune a 4-bit-quantized frozen base model with LoRA adapters trained in full precision, meaning you should use QLoRA when you need to fine-tune a large model on a single consumer GPU that couldn't otherwise fit it"
key_contribution: "Combined 4-bit NormalFloat quantization of frozen base-model weights with LoRA adapters kept in higher precision, plus paged optimizers to avoid memory spikes, cutting fine-tuning memory requirements enough to fine-tune a 65B model on a single 48GB GPU"

builds_on:
  - hu-2021-lora
implemented_in:
  - peft
  - axolotl
  - unsloth
  - llamafactory

tags:
  - fine-tuning
  - quantization
  - efficiency
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that a large pretrained model can be quantized to 4 bits, frozen, and fine-tuned by training LoRA adapters (see `hu-2021-lora`) that remain in higher precision — combined with several memory-management innovations, this made it possible to fine-tune a 65B-parameter model on a single 48GB GPU, a scale that previously required a multi-GPU setup. This is still current, default practice for memory-constrained fine-tuning: QLoRA is implemented directly in every major fine-tuning tool in this catalog (`peft`, `axolotl`, `unsloth`, `llamafactory`), and no successor technique has displaced it as the default answer to "how do I fine-tune a large model on limited hardware."

## Why it's in the Arsenal

- QLoRA is the direct answer to a question every engineer with limited GPU budget eventually asks: how do I fine-tune a model bigger than my hardware seems to allow? Understanding this paper's specific memory-saving techniques (4-bit NormalFloat quantization, double quantization, paged optimizers) is what separates "I ran out of memory" from a working fine-tuning job on consumer or single-GPU hardware.
- `practical_applicability: high` reflects that this is not a theoretical efficiency curiosity — it's the default configuration most practitioners reach for first when fine-tuning anything larger than a few billion parameters on non-datacenter hardware, directly implemented as a checkbox or config flag in every fine-tuning tool in this catalog.

## Core Contribution

Prior 8-bit and lower-precision quantization approaches for fine-tuning either degraded model quality unacceptably at 4-bit precision or didn't address the memory spikes caused by gradient checkpointing during training. This paper's contribution is a combination of three specific techniques that together make 4-bit fine-tuning viable without quality loss: (1) 4-bit NormalFloat (NF4), an information-theoretically optimal quantization data type for normally-distributed weights (which pretrained neural network weights approximately are); (2) double quantization, quantizing the quantization constants themselves to save additional memory; and (3) paged optimizers, using NVIDIA unified memory to avoid out-of-memory crashes during gradient-checkpointing memory spikes. In engineering terms: the base model's weights are quantized to 4 bits and frozen, while LoRA's small adapter matrices (see `hu-2021-lora`) are trained in 16-bit precision on top — so you get the memory savings of 4-bit weights for the (large) frozen base model, while the (tiny) trainable parameters retain enough precision to fine-tune effectively.

## Key Results

- Enabled fine-tuning a 65B-parameter model on a single 48GB GPU while preserving full 16-bit fine-tuning task performance, based on the paper's own benchmark comparisons (2023) — the paper's headline memory/quality tradeoff claim
- The resulting fine-tuned model family, Guanaco, reportedly reached 99.3% of ChatGPT's performance on the Vicuna benchmark using only 24 hours of fine-tuning on a single GPU (2023) — this specific benchmark and comparison point is now dated (both the Vicuna benchmark and 2023-era ChatGPT are no longer current references), but the underlying memory-efficiency claim about the *fine-tuning method itself* remains valid and independently verified through years of subsequent adoption
- 4-bit NF4 quantization matched full 16-bit fine-tuning performance across the paper's evaluated tasks with no observed degradation (2023) — this specific finding is the reason 4-bit has become a common default rather than a lossy compromise

## Methodology

QLoRA freezes the pretrained base model's weights after quantizing them to 4-bit NormalFloat precision (a quantization scheme designed around the empirical observation that pretrained weights are approximately normally distributed, making it more accurate than uniform 4-bit quantization for this specific case), then trains LoRA adapter matrices (see `hu-2021-lora`'s `A` and `B` decomposition) in 16-bit precision on top, back-propagating gradients through the frozen 4-bit weights into the higher-precision adapters (paper Section 3). Double quantization additionally quantizes the per-block quantization constants used by NF4 itself, saving further memory with a reported average savings of about 0.37 bits per parameter across the model. Paged optimizers use NVIDIA's unified memory feature to automatically page optimizer states between GPU and CPU memory when GPU memory would otherwise be exceeded during the memory spikes caused by gradient checkpointing, preventing out-of-memory failures without requiring the user to manually tune batch size to avoid them.

## Practical Applicability

If you are trying to fine-tune a model whose full-precision or even 8-bit-quantized size doesn't fit your available GPU memory, this paper's specific combination of techniques (4-bit NF4 quantization, double quantization, paged optimizers) is why QLoRA — not full fine-tuning, and not 8-bit quantization alone — is the standard first thing to try, and it is available as a direct configuration option in every fine-tuning tool in this catalog's `content/tools/model-layer/`. If your hardware can comfortably fit full 16-bit fine-tuning already, the memory savings QLoRA provides may not be worth the (small but nonzero) additional implementation complexity and the very rare edge-case quality tradeoffs some practitioners report with aggressive quantization — see Limitations.

## Limitations & Critiques

The paper's own evaluation focuses on the specific tasks and model families available at publication (2023); some later practitioner reports have noted that 4-bit quantization can introduce small but measurable quality degradation on tasks requiring precise numerical or highly technical outputs, a nuance the original paper's headline "no degradation" framing does not fully anticipate — this is a known, if modest, caveat rather than a full challenge to the paper's core claims. QLoRA's training speed is typically slower than full-precision or 8-bit fine-tuning on hardware with ample memory, since dequantizing 4-bit weights on the fly during the forward/backward pass adds computational overhead — meaning QLoRA is a memory-for-time tradeoff, not a strict improvement in every dimension, a nuance worth stating explicitly since the paper's framing emphasizes memory savings without equally emphasizing the throughput cost. No known failed-replication challenges to the paper's core method have been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

QLoRA has been reproduced and integrated directly into the `bitsandbytes` library (the same team's underlying quantization library) and Hugging Face's `peft`, and is a standard, well-validated feature in `axolotl`, `unsloth`, and `llamafactory` — this breadth of independent production integration constitutes an extensive real-world validation beyond the original paper's own benchmarks. No significant challenge or failed replication of the core method has been identified; subsequent work has largely extended rather than contradicted it (e.g. further quantization-aware fine-tuning research building on the NF4 data type).

## Relation to the Arsenal

This paper builds directly on `hu-2021-lora` (this phase folder), extending its low-rank adapter technique with quantization of the frozen base weights — read `hu-2021-lora` first if you have not already, since QLoRA's contribution is specifically the memory-efficiency layer added on top of that base technique. It is implemented in the same four tool entries as LoRA itself: `peft`, `axolotl`, `unsloth`, and `llamafactory` (all in `content/tools/model-layer/`), each of which supports QLoRA as a direct configuration option, typically via the shared `bitsandbytes` quantization backend.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2305.14314)
- [arXiv](https://arxiv.org/abs/2305.14314)
- [Official Code](https://github.com/artidoro/qlora)
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2023/hash/1feb87871436031bdc0f2beaa62a049b-Abstract-Conference.html)
- [Papers With Code](https://paperswithcode.com/paper/qlora-efficient-finetuning-of-quantized-llms)
- [Key Reproduction / Analysis](https://github.com/bitsandbytes-foundation/bitsandbytes) — the bitsandbytes library, maintained by the same research group, is the production-grade reference implementation of QLoRA's quantization techniques used across the fine-tuning ecosystem
