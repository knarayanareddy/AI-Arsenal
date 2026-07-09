---
id: "use-qlora-to-fit-larger-models-on-one-gpu"
title: "Use QLoRA to Fit Larger Models on a Single GPU"
category: "cost-reduction"
tags:
  - fine-tuning
  - efficiency
  - local
difficulty: "intermediate"
impact: "high"
time_to_implement: "an hour of setup"
phase: fine-tuning
effort: hours
estimated_time: "~1 hour setup"
reversible: true
verification_status: community-reported
verified_by: "community reports (QLoRA paper and PEFT adoption)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "4-bit base weights add quantization/dequantization overhead per step, so QLoRA trains slower per step than fp16 LoRA even though it fits where fp16 can't"
  - "The saved adapter is trained against the quantized base -- for best fidelity, serve it on the same quantized base rather than merging into full-precision weights and assuming identical behavior"
metrics: []
related_tips:
  - start-with-lora-before-full-fine-tuning
  - version-datasets-and-adapters-together
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

QLoRA loads the base model in 4-bit and trains LoRA adapters on top, so the frozen weights occupy roughly a quarter of their fp16 memory while the trainable adapters stay in higher precision. The practical effect is a step change in what fits: a model that would OOM as an fp16 LoRA on a 24GB card often trains comfortably as QLoRA on the same card. When your bottleneck is "the model won't fit," QLoRA is usually the difference between training on the hardware you have and renting a bigger machine.

## Before / After

**Before:** Fine-tuning a larger model requires multi-GPU or a rented high-VRAM instance because fp16 base weights alone exhaust the card.

**After:** The 4-bit base leaves enough headroom for adapters, optimizer state, and activations to train the same model on one consumer/prosumer GPU.

## Implementation

Load the base with 4-bit quantization (bitsandbytes NF4 is the common default) and attach LoRA adapters via a PEFT-supporting trainer — libraries like Unsloth wire this up in a few lines. Keep the adapter rank modest to start, use gradient checkpointing, and measure VRAM headroom before scaling context length or batch size, since the KV/activation memory grows with both.

## Gotchas

- QLoRA trades speed for memory: expect slower per-step throughput than fp16 LoRA because of on-the-fly dequantization
- Merging a QLoRA adapter into full-precision weights can shift behavior slightly versus serving on the quantized base it was trained against — validate after merging

## When NOT to Apply

- If the model already fits comfortably in fp16 LoRA, skip QLoRA and take the faster fp16 steps
- For very small models where full or fp16 LoRA fine-tuning is already cheap, the quantization overhead isn't worth it

## Verification

Community-reported: QLoRA's memory reduction and near-parity quality on many tasks are documented in the QLoRA paper and widely reproduced across PEFT tooling. Per-task quality and the fp16-vs-4-bit speed tradeoff vary with hardware and are not independently benchmarked here.
