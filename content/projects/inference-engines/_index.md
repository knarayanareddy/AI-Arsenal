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

- [AIBrix](./aibrix.md)
- [NVIDIA Dynamo](./dynamo.md)
- [llm-d](./llm-d.md)
- [mllm](./mllm.md)
- [vLLM Speculators](./speculators.md)
- [vLLM-Omni](./vllm-omni.md)
- [Candle](./candle.md)
- [ExLlamaV2](./exllamav2.md)
- [exo (exo-explore)](./exo.md)
- [faster-whisper](./faster-whisper.md)

### Most Popular

- [Ollama](./ollama.md) — ⭐ 174059
- [llama.cpp](./llama-cpp.md) — ⭐ 116399
- [vLLM](./vllm.md) — ⭐ 82772
- [text-generation-webui (oobabooga)](./text-generation-webui.md) — ⭐ 47433
- [LocalAI](./localai.md) — ⭐ 47415
- [exo (exo-explore)](./exo.md) — ⭐ 46087
- [SGLang](./sglang.md) — ⭐ 28967
- [Llamafile](./llamafile.md) — ⭐ 24936
- [faster-whisper](./faster-whisper.md) — ⭐ 24114
- [WhisperX](./whisperx.md) — ⭐ 22968

### Browse All

- [AIBrix](./aibrix.md) — Composable open-source infrastructure for self-hosted and cloud-scale generative AI inference
- [Candle](./candle.md) — Hugging Face's minimalist Rust ML framework — PyTorch-like tensor API compiling to small, Python-free binaries for serverless and embedded inference
- [NVIDIA Dynamo](./dynamo.md) — Datacenter-scale distributed inference serving framework for large language and multimodal models
- [ExLlamaV2](./exllamav2.md) — Consumer-GPU-focused inference library with the EXL2 variable-bitrate quantization format for running large models on limited VRAM
- [exo (exo-explore)](./exo.md) — Clusters your everyday devices — phones, laptops, desktops — into one inference pool, sharding a model too big for any single machine
- [faster-whisper](./faster-whisper.md) — Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
- [KTransformers](./ktransformers.md) — CPU/GPU heterogeneous inference for giant MoE models — experts on CPU with AMX kernels, attention on GPU, running DeepSeek-class models on desktops
- [LitServe](./litserve.md) — Lightning-built serving engine for AI models on top of FastAPI, adding batching, streaming, GPU autoscaling, and multi-model workers with minimal code
- [llama.cpp](./llama-cpp.md) — C and C++ inference engine for running GGUF-quantized LLMs locally and on edge devices
- [Llamafile](./llamafile.md) — Mozilla project for distributing and running LLMs as a single executable file
- [llm-d](./llm-d.md) — Kubernetes-native distributed LLM inference framework with routing, disaggregation, and batch-serving components
- [LMDeploy](./lmdeploy.md) — Toolkit for compressing, deploying, and serving LLMs with TurboMind and PyTorch backends
- [LocalAI](./localai.md) — Self-hosted drop-in OpenAI API replacement serving text, embeddings, images, and audio from one binary — multiple backends, consumer hardware, no GPU required
- [mistral.rs](./mistral-rs.md) — Pure-Rust cross-modality LLM inference server — text, vision, image generation, and speech behind OpenAI-compatible APIs with ISQ in-place quantization
- [MLC LLM](./mlc-llm.md) — Machine-learning-compilation stack that runs LLMs natively on iOS, Android, WebGPU, Metal, Vulkan and CUDA from one codebase
- [mllm](./mllm.md) — C++ multimodal LLM runtime for mobile and edge devices with vision and inference benchmarks
- [Ollama](./ollama.md) — Local runtime for downloading, running, and serving open-weight models on developer machines
- [ONNX Runtime](./onnxruntime.md) — Microsoft's cross-platform inference runtime for the ONNX graph format — one exported model runs on CPU, GPU, mobile, and browser via execution providers
- [SGLang](./sglang.md) — High-performance serving framework for large language and multimodal models
- [vLLM Speculators](./speculators.md) — Unified library for building, evaluating, and storing speculative-decoding algorithms for LLM inference
- [TensorRT-LLM](./tensorrt-llm.md) — NVIDIA's open-source LLM inference library with hand-tuned kernels, in-flight batching and FP8/FP4 quantization for peak GPU throughput
- [Text Generation Inference](./text-generation-inference.md) — Hugging Face inference server for serving large text-generation models in production
- [text-generation-webui (oobabooga)](./text-generation-webui.md) — The Gradio-based local LLM workbench — multiple loader backends, deep sampling control, character/instruct modes, extensions, and an OpenAI-compatible API
- [vLLM](./vllm.md) — High-throughput inference and serving engine for LLMs with batching and OpenAI-compatible APIs
- [vLLM-Omni](./vllm-omni.md) — Framework for efficient inference with omni-modality models across text, vision, audio, and generation pipelines
- [WhisperX](./whisperx.md) — Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput
