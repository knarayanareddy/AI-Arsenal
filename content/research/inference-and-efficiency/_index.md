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

_No entries yet._

### Most Popular

_No star-tracked entries yet._

### Browse All

_No entries yet._
