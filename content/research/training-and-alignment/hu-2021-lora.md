---
id: hu-2021-lora
title: "LoRA: Low-Rank Adaptation of Large Language Models"
phase: training-and-alignment
venue: iclr
year: 2021
authors:
  - "Hu, E."
  - "Shen, Y."
  - "Wallis, P."
  - "Allen-Zhu, Z."
  - "et al."
arxiv_id: "2106.09685"
arxiv_url: "https://arxiv.org/abs/2106.09685"
pdf_url: "https://arxiv.org/pdf/2106.09685"
code_url: "https://github.com/microsoft/LoRA"
venue_url: "https://openreview.net/forum?id=nZeVKeeFYf9"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 14000

tldr: "Showed you can fine-tune a large model by training only small low-rank update matrices injected into attention weights, meaning you should use LoRA (not full fine-tuning) whenever GPU memory or storage for many fine-tuned variants is a constraint"
key_contribution: "Demonstrated that the weight update needed to adapt a pretrained model to a new task has a low intrinsic rank, so training two small low-rank matrices per layer (instead of the full weight matrix) achieves comparable task performance at a fraction of the trainable-parameter count"

builds_on:
  - vaswani-2017-attention
implemented_in:
  - peft
  - axolotl
  - unsloth
  - llamafactory

tags:
  - fine-tuning
  - training
  - efficiency
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that the weight update required to adapt a pretrained large model to a new task has low intrinsic rank, so instead of fine-tuning every parameter, you can freeze the original weights and train only a pair of small low-rank matrices injected alongside them — dramatically reducing trainable parameters, GPU memory, and checkpoint storage size with little to no task-performance loss. This remains current practice: LoRA is the default parameter-efficient fine-tuning technique used across every major fine-tuning tool in this catalog's `content/tools/model-layer/` (Axolotl, Unsloth, LlamaFactory, PEFT), and nothing has displaced it as the default choice, though QLoRA (in this same phase folder) extends it for even tighter memory budgets.

## Why it's in the Arsenal

- LoRA is the technique underlying nearly every practical fine-tuning workflow documented elsewhere in this catalog — understanding it is a prerequisite for using any of the fine-tuning tools in `content/tools/model-layer/`, all four of which implement it directly (`peft`, `axolotl`, `unsloth`, `llamafactory`).
- `practical_applicability: high` is a straightforward, non-inflated classification here: this is a technique nearly every engineer doing custom model adaptation reaches for today, not a theoretical curiosity — full fine-tuning of a large model is now the exception, justified only when LoRA's approximation genuinely underperforms for a specific task.

## Core Contribution

Prior efficient-fine-tuning approaches either added new layers to the network (increasing inference latency) or fine-tuned only a subset of existing parameters (often underperforming full fine-tuning). This paper's core empirical insight is that the *update* to a pretrained weight matrix during fine-tuning — not the weight matrix itself — has low intrinsic rank, meaning it can be well-approximated as the product of two much smaller matrices. Concretely: for a pretrained weight matrix `W`, instead of updating `W` directly, LoRA learns a low-rank decomposition `BA` (where `B` and `A` are much smaller than `W`) and computes the adapted weight as `W + BA`, training only `A` and `B` while `W` stays frozen. In engineering terms, this means fine-tuning a 7B-parameter model can require training only a few million parameters instead of billions, and because `BA` can be merged back into `W` after training, there is zero added inference latency compared to a fully fine-tuned model.

## Key Results

- Reduced trainable parameters by up to 10,000x and GPU memory requirement by up to 3x compared to full fine-tuning of GPT-3 175B, while matching or exceeding full fine-tuning quality on several benchmarks (2021) — the paper's headline efficiency claim
- Matched or outperformed several existing parameter-efficient fine-tuning baselines (prefix-tuning, adapter layers) on GLUE benchmark tasks using RoBERTa and DeBERTa as base models (2021) — GLUE-specific numbers here are dated (GLUE is now considered saturated for current-generation models) but the relative comparison against other PEFT methods remains a valid reference point
- No added inference latency versus a fully fine-tuned model, since the low-rank update can be merged into the original weight matrix after training (2021) — this specific architectural property (not a benchmark score) is the result most directly responsible for LoRA's continued dominance, since it means there is no efficiency-vs-latency tradeoff to weigh against fine-tuning-time savings

## Methodology

For each weight matrix targeted for adaptation (typically the attention projection matrices — see `vaswani-2017-attention` — though LoRA can target any linear layer), the pretrained weight `W` (of dimension `d x k`) is frozen, and a low-rank update is introduced as `W + BA`, where `B` is `d x r` and `A` is `r x k`, with rank `r` typically set far smaller than `d` or `k` (often 4–64 in practice). Only `A` and `B` receive gradient updates during fine-tuning (paper Section 4). `B` is initialized to zero so training starts from the exact pretrained behavior. Because the update is additive and linear, `BA` can be computed once after training and added directly into `W`, producing a single merged weight matrix with the same shape and inference cost as the original model — this merge step is why LoRA introduces no runtime overhead once training is complete, unlike adapter-layer approaches that add persistent extra computation at inference time.

## Practical Applicability

If you are fine-tuning any model larger than a few hundred million parameters and are constrained by GPU memory, training time, or the need to maintain multiple fine-tuned variants of the same base model (since each LoRA adapter is tiny and can be swapped independently), this paper's technique is the reason you should default to LoRA rather than full fine-tuning — this is not a niche optimization, it's the standard approach implemented across every fine-tuning tool in this catalog. If you need even tighter memory budgets (fine-tuning a large model on a single consumer GPU), see `dettmers-2023-qlora` in this same phase folder, which extends this exact technique with quantization.

## Limitations & Critiques

The paper's own results are strongest on adaptation tasks similar to what the base model was already good at; LoRA's low-rank approximation can underperform full fine-tuning specifically when the target task requires substantially different capabilities than the pretraining distribution provided, though this gap has narrowed as practitioners have learned to target more layers and tune rank more carefully than the paper's original recommendations. Choosing the rank `r` and which weight matrices to target remains an empirical, task-specific decision the paper does not fully resolve — subsequent practitioner experience (reflected in the default configurations shipped by `peft`, `axolotl`, and similar tools) has converged on rough heuristics, but no closed-form answer exists. No known failed-replication challenges to the paper's core claims have been identified as of `last_reviewed: 2026-07-01`; the technique has instead been extended (QLoRA) and adopted as a nearly universal default rather than challenged.

## Reproductions & Follow-up Work

LoRA has been reproduced and validated so extensively that it is now a built-in feature of essentially every fine-tuning library, not a technique requiring separate reproduction studies: Hugging Face's `peft` library, `axolotl`, `unsloth`, and `llamafactory` (all in this catalog's `content/tools/model-layer/`) each ship production implementations. `dettmers-2023-qlora` (this phase folder) is the most significant direct follow-up, extending LoRA with 4-bit quantization of the frozen base weights to reduce memory requirements further.

## Relation to the Arsenal

This paper builds on `vaswani-2017-attention` (foundational/) by targeting the attention projection matrices that architecture defines. It is directly implemented in four tool entries in this catalog's `content/tools/model-layer/`: `peft` (Hugging Face's dedicated parameter-efficient fine-tuning library), `axolotl`, `unsloth`, and `llamafactory` (all fine-tuning frameworks that support LoRA as a first-class training mode) — reflected in `implemented_in` above. `dettmers-2023-qlora`, also in this phase folder, extends this technique directly and should be read immediately after this entry.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2106.09685)
- [arXiv](https://arxiv.org/abs/2106.09685)
- [Official Code](https://github.com/microsoft/LoRA)
- [Venue Proceedings](https://openreview.net/forum?id=nZeVKeeFYf9)
- [Papers With Code](https://paperswithcode.com/paper/lora-low-rank-adaptation-of-large-language)
- [Key Reproduction / Analysis](https://huggingface.co/docs/peft/en/package_reference/lora) — Hugging Face's PEFT library documentation, itself a production-grade reproduction and the most widely used implementation of the technique
