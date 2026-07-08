---
title: "Inference Engines"
section: "projects/inference-engines"
auto_generated: false
---

# Inference Engines

## What belongs here

Runtimes purpose-built for serving model weights efficiently — llama.cpp, vLLM, SGLang, TGI, Ollama, LMDeploy, llamafile.

## What does NOT belong here

The model weights themselves belong in [Foundation Models](../foundation-models/_index.md); agent/RAG frameworks you build applications with belong in [Frameworks](../frameworks/_index.md).

## Relation to the Tools vertical

Inference-engine entries here document the engine's architecture and production-readiness signals (e.g. TGI's maintenance-mode status). For deployment/hosting decision guidance, see `content/tools/serving-and-deployment/` and `content/tools/model-layer/`.

## Decision guidance

Before selecting an inference engine:
- Key question to ask: is my workload prefix-cache-heavy (favor SGLang), general-purpose high-throughput (favor vLLM), or local/single-machine (favor Ollama or llama.cpp directly)?
- If you need usage guidance rather than architectural depth: see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md)
- See [Choose an LLM](../../architectures/decision-trees/choose-llm.md) and [Choose a Deployment Target](../../architectures/decision-trees/choose-deployment-target.md) for cross-cutting guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Inference Engines in This Phase

### Recently Added

- [faster-whisper](./faster-whisper.md)
- [WhisperX](./whisperx.md)
- [llama.cpp](./llama-cpp.md)
- [Llamafile](./llamafile.md)
- [LMDeploy](./lmdeploy.md)
- [Ollama](./ollama.md)
- [SGLang](./sglang.md)
- [Text Generation Inference](./text-generation-inference.md)
- [vLLM](./vllm.md)

### Most Popular

- [Ollama](./ollama.md) — ⭐ 174059
- [llama.cpp](./llama-cpp.md) — ⭐ 116399
- [vLLM](./vllm.md) — ⭐ 82772
- [SGLang](./sglang.md) — ⭐ 28967
- [Llamafile](./llamafile.md) — ⭐ 24936
- [faster-whisper](./faster-whisper.md) — ⭐ 24114
- [WhisperX](./whisperx.md) — ⭐ 22968
- [Text Generation Inference](./text-generation-inference.md) — ⭐ 10863
- [LMDeploy](./lmdeploy.md) — ⭐ 7895

### Browse All

- [faster-whisper](./faster-whisper.md) — Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
- [llama.cpp](./llama-cpp.md) — C and C++ inference engine for running GGUF-quantized LLMs locally and on edge devices
- [Llamafile](./llamafile.md) — Mozilla project for distributing and running LLMs as a single executable file
- [LMDeploy](./lmdeploy.md) — Toolkit for compressing, deploying, and serving LLMs with TurboMind and PyTorch backends
- [Ollama](./ollama.md) — Local runtime for downloading, running, and serving open-weight models on developer machines
- [SGLang](./sglang.md) — High-performance serving framework for large language and multimodal models
- [Text Generation Inference](./text-generation-inference.md) — Hugging Face inference server for serving large text-generation models in production
- [vLLM](./vllm.md) — High-throughput inference and serving engine for LLMs with batching and OpenAI-compatible APIs
- [WhisperX](./whisperx.md) — Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput
