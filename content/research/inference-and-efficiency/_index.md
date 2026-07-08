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

- [Fast Transformer Decoding: One Write-Head is All You Need (Multi-Query Attention)](./shazeer-2019-mqa.md)
- [Efficient Streaming Language Models with Attention Sinks](./xiao-2023-streamingllm.md)
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./frantar-2022-gptq.md)
- [Fast Inference from Transformers via Speculative Decoding](./leviathan-2022-speculative-decoding.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](./frantar-2022-gptq.md) — Showed one-shot post-training quantization to 3-4 bits is feasible for 100B+ param models in hours with minimal accuracy loss -- reach for GPTQ (or AWQ) as a default quantization option before more disruptive approaches
- [Fast Inference from Transformers via Speculative Decoding](./leviathan-2022-speculative-decoding.md) — Showed a small draft model's guesses can be verified in parallel by the full model with zero change to the output distribution, meaning production inference engines should implement speculative decoding to cut generation latency without sacrificing exactness
- [Fast Transformer Decoding: One Write-Head is All You Need (Multi-Query Attention)](./shazeer-2019-mqa.md) — Multi-query attention: share one key/value head across all query heads, shrinking the KV cache by the head count and making incremental decoding memory-bandwidth-cheap — the idea GQA later refined and every modern serving stack depends on
- [Efficient Streaming Language Models with Attention Sinks](./xiao-2023-streamingllm.md) — Discovered 'attention sinks': models dump attention mass on the first few tokens regardless of content, so evicting them collapses windowed attention — keeping just 4 initial tokens plus a sliding window enables stable million-token streaming with no retraining
