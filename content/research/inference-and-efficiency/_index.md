---
title: "Inference and Efficiency Research"
section: "research/inference-and-efficiency"
auto_generated: false
---

# Inference and Efficiency Research

## What belongs here

Quantization, distillation, pruning, speculative decoding, batching strategies, KV-cache optimization, and other techniques whose primary contribution is making inference (not training) faster or cheaper without materially changing what the model computes.

## What does NOT belong here

A technique for making *training* more efficient (e.g. a parameter-efficient fine-tuning method like LoRA) belongs in `training-and-alignment/` instead, even though "efficiency" is in both folders' scope — the distinguishing question is training-time vs. inference-time. A change to the model architecture itself (a new attention mechanism designed for efficiency, like a linear-attention variant) belongs in `architectures/` if its primary framing is architectural, and here only if its primary framing is a serving/runtime optimization applied to an existing architecture.

## Engineering frame

When I am trying to reduce inference cost or latency for a model I'm already running, which technique should I reach for, and is it still the current best option or has something newer superseded it?

## Reading order guidance

- Start with [GPTQ](./frantar-2022-gptq.md) for post-training quantization — still one of the default options alongside AWQ and GGUF-style quantization.
- Read [Fast Inference from Transformers via Speculative Decoding](./leviathan-2022-speculative-decoding.md) next — implemented directly in vLLM, SGLang, TGI, and llama.cpp, making it one of the most production-validated techniques in this entire vertical.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Inference And Efficiency in This Phase

### Recently Added

- [FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](./dao-2022-flashattention.md)
- [Efficient Memory Management for Large Language Model Serving with PagedAttention](./kwon-2023-pagedattention.md)
- [AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration](./lin-2023-awq.md)
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./frantar-2022-gptq.md)
- [Fast Inference from Transformers via Speculative Decoding](./leviathan-2022-speculative-decoding.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](./dao-2022-flashattention.md) — Reframed attention as an IO problem: tiling and online softmax keep the computation in GPU SRAM, avoiding materializing the N×N matrix — exact attention, 2-4x faster and linear memory, now compiled into effectively all training and serving stacks
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./frantar-2022-gptq.md) — Showed one-shot post-training quantization to 3-4 bits is feasible for 100B+ param models in hours with minimal accuracy loss -- reach for GPTQ (or AWQ) as a default quantization option before more disruptive approaches
- [Efficient Memory Management for Large Language Model Serving with PagedAttention](./kwon-2023-pagedattention.md) — Applied OS virtual-memory paging to the KV cache: non-contiguous fixed-size blocks eliminate the 60-80% memory waste of contiguous allocation, enabling 2-4x serving throughput — this is the vLLM paper, and paged KV caches are now universal
- [Fast Inference from Transformers via Speculative Decoding](./leviathan-2022-speculative-decoding.md) — Showed a small draft model's guesses can be verified in parallel by the full model with zero change to the output distribution, meaning production inference engines should implement speculative decoding to cut generation latency without sacrificing exactness
- [AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration](./lin-2023-awq.md) — Showed ~1% of weight channels are 'salient' — identified by activation magnitudes, not weight values — and protecting them via per-channel scaling enables accurate 4-bit weight quantization without backpropagation; AWQ is now a standard deployment format
