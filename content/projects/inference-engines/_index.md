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

- [Candle](./candle.md)
- [ExLlamaV2](./exllamav2.md)
- [faster-whisper](./faster-whisper.md)
- [KTransformers](./ktransformers.md)
- [LocalAI](./localai.md)
- [mistral.rs](./mistral-rs.md)
- [MLC LLM](./mlc-llm.md)
- [ONNX Runtime](./onnxruntime.md)
- [TensorRT-LLM](./tensorrt-llm.md)
- [text-generation-webui (oobabooga)](./text-generation-webui.md)

### Most Popular

- [Ollama](./ollama.md) — ⭐ 174059
- [llama.cpp](./llama-cpp.md) — ⭐ 116399
- [vLLM](./vllm.md) — ⭐ 82772
- [text-generation-webui (oobabooga)](./text-generation-webui.md) — ⭐ 47433
- [LocalAI](./localai.md) — ⭐ 47415
- [SGLang](./sglang.md) — ⭐ 28967
- [Llamafile](./llamafile.md) — ⭐ 24936
- [faster-whisper](./faster-whisper.md) — ⭐ 24114
- [WhisperX](./whisperx.md) — ⭐ 22968
- [MLC LLM](./mlc-llm.md) — ⭐ 22917

### Browse All

- [Candle](./candle.md) — Hugging Face's minimalist Rust ML framework — PyTorch-like tensor API compiling to small, Python-free binaries for serverless and embedded inference
- [ExLlamaV2](./exllamav2.md) — Consumer-GPU-focused inference library with the EXL2 variable-bitrate quantization format for running large models on limited VRAM
- [faster-whisper](./faster-whisper.md) — Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
- [KTransformers](./ktransformers.md) — CPU/GPU heterogeneous inference for giant MoE models — experts on CPU with AMX kernels, attention on GPU, running DeepSeek-class models on desktops
- [llama.cpp](./llama-cpp.md) — C and C++ inference engine for running GGUF-quantized LLMs locally and on edge devices
- [Llamafile](./llamafile.md) — Mozilla project for distributing and running LLMs as a single executable file
- [LMDeploy](./lmdeploy.md) — Toolkit for compressing, deploying, and serving LLMs with TurboMind and PyTorch backends
- [LocalAI](./localai.md) — Self-hosted drop-in OpenAI API replacement serving text, embeddings, images, and audio from one binary — multiple backends, consumer hardware, no GPU required
- [mistral.rs](./mistral-rs.md) — Pure-Rust cross-modality LLM inference server — text, vision, image generation, and speech behind OpenAI-compatible APIs with ISQ in-place quantization
- [MLC LLM](./mlc-llm.md) — Machine-learning-compilation stack that runs LLMs natively on iOS, Android, WebGPU, Metal, Vulkan and CUDA from one codebase
- [Ollama](./ollama.md) — Local runtime for downloading, running, and serving open-weight models on developer machines
- [ONNX Runtime](./onnxruntime.md) — Microsoft's cross-platform inference runtime for the ONNX graph format — one exported model runs on CPU, GPU, mobile, and browser via execution providers
- [SGLang](./sglang.md) — High-performance serving framework for large language and multimodal models
- [TensorRT-LLM](./tensorrt-llm.md) — NVIDIA's open-source LLM inference library with hand-tuned kernels, in-flight batching and FP8/FP4 quantization for peak GPU throughput
- [Text Generation Inference](./text-generation-inference.md) — Hugging Face inference server for serving large text-generation models in production
- [text-generation-webui (oobabooga)](./text-generation-webui.md) — The Gradio-based local LLM workbench — multiple loader backends, deep sampling control, character/instruct modes, extensions, and an OpenAI-compatible API
- [vLLM](./vllm.md) — High-throughput inference and serving engine for LLMs with batching and OpenAI-compatible APIs
- [WhisperX](./whisperx.md) — Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput
