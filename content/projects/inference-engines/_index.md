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

- [9router](./9router.md)
- [airllm](./airllm.md)
- [tvm](./apache-tvm.md)
- [Handy](./cjpais-handy.md)
- [flash-attention](./dao-ailab-flash-attention.md)
- [flashinfer](./flashinfer-ai-flashinfer.md)
- [ggml](./ggml-org-ggml.md)
- [gLLM](./gllm.md)
- [mediapipe](./google-ai-edge-mediapipe.md)
- [alphafold3](./google-deepmind-alphafold3.md)

### Most Popular

- [Ollama](./ollama.md) — ⭐ 174059
- [llama.cpp](./llama-cpp.md) — ⭐ 116399
- [vLLM](./vllm.md) — ⭐ 82772
- [whisper.cpp](./whisper-cpp.md) — ⭐ 51732
- [textgen](./oobabooga-textgen.md) — ⭐ 47720
- [text-generation-webui (oobabooga)](./text-generation-webui.md) — ⭐ 47433
- [LocalAI](./localai.md) — ⭐ 47415
- [exo (exo-explore)](./exo.md) — ⭐ 46087
- [FastChat](./lm-sys-fastchat.md) — ⭐ 39550
- [mediapipe](./google-ai-edge-mediapipe.md) — ⭐ 37105

### Browse All

- [9router](./9router.md) — Local OpenAI-compatible proxy that tiers provider calls and rewrites tool_result payloads before forwarding them upstream
- [AIBrix](./aibrix.md) — Composable open-source infrastructure for self-hosted and cloud-scale generative AI inference
- [airllm](./airllm.md) — Runs 70B-plus checkpoints by streaming transformer layers from host RAM into a few GB of VRAM instead of quantizing weights
- [tvm](./apache-tvm.md) — Compiler stack that lowers deep-learning graphs through tensor IR to code for CPUs, GPUs, and accelerators
- [Candle](./candle.md) — Hugging Face's minimalist Rust ML framework — PyTorch-like tensor API compiling to small, Python-free binaries for serverless and embedded inference
- [candle-vllm](./candle-vllm.md) — Rust-native local LLM inference and serving platform built on Hugging Face Candle with an OpenAI-compatible API
- [Handy](./cjpais-handy.md) — MIT-licensed Rust desktop app for fully offline Whisper-family speech-to-text, built as a Tauri v2 native client
- [flash-attention](./dao-ailab-flash-attention.md) — BSD-3-Clause exact-attention kernels that avoid materializing the attention matrix, cutting memory and speeding up sequence length
- [NVIDIA Dynamo](./dynamo.md) — Datacenter-scale distributed inference serving framework for large language and multimodal models
- [ExLlamaV2](./exllamav2.md) — Consumer-GPU-focused inference library with the EXL2 variable-bitrate quantization format for running large models on limited VRAM
- [exo (exo-explore)](./exo.md) — Clusters your everyday devices — phones, laptops, desktops — into one inference pool, sharding a model too big for any single machine
- [faster-whisper](./faster-whisper.md) — Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
- [FastVideo](./fastvideo.md) — A unified inference and post-training framework for accelerating video-generation models via techniques like sliding-tile attention and distillation
- [flashinfer](./flashinfer-ai-flashinfer.md) — JIT-compiled CUDA kernels for attention, sampling, and quantization, dispatched to by high-throughput LLM serving engines
- [ggml](./ggml-org-ggml.md) — C tensor library with a build-graph execution model, providing quantized matmul kernels for local inference
- [gLLM](./gllm.md) — Research-grade serving engine combining paged attention, chunked prefill and composable tensor, expert and pipeline parallelism
- [mediapipe](./google-ai-edge-mediapipe.md) — Apache-2.0 cross-platform pipeline for live media shipping ready-made face, hand, pose, and segmentation graphs that run on-device
- [alphafold3](./google-deepmind-alphafold3.md) — AlphaFold 3 inference pipeline for biomolecular complex structure and interaction prediction
- [GPTCache](./gptcache.md) — A semantic cache for LLM applications that stores past query embeddings and responses to serve similar future queries from cache, cutting API cost and latency
- [Hugging Face Optimum](./hf-optimum.md) — Hugging Face's extension of Transformers that accelerates training and inference on specialized hardware via ONNX Runtime, TensorRT, OpenVINO
- [transformers.js](./huggingface-transformers-js.md) — Runs Transformer models in browsers and Node with ONNX Runtime Web, WebGPU, and WASM backends
- [KTransformers](./ktransformers.md) — CPU/GPU heterogeneous inference for giant MoE models — experts on CPU with AMX kernels, attention on GPU, running DeepSeek-class models on desktops
- [LightLLM](./lightllm.md) — A lightweight, pure-Python LLM inference and serving framework emphasizing scalability and high throughput via token-level scheduling and efficient attention
- [LitServe](./litserve.md) — Lightning-built serving engine for AI models on top of FastAPI, adding batching, streaming, GPU autoscaling, and multi-model workers with minimal code
- [llama.cpp](./llama-cpp.md) — C and C++ inference engine for running GGUF-quantized LLMs locally and on edge devices
- [Llamafile](./llamafile.md) — Mozilla project for distributing and running LLMs as a single executable file
- [llm-d](./llm-d.md) — Kubernetes-native distributed LLM inference framework with routing, disaggregation, and batch-serving components
- [FastChat](./lm-sys-fastchat.md) — Apache-2.0 research platform from LMSYS covering model training, multi-backend serving, and the Chatbot Arena evaluation harness
- [LMDeploy](./lmdeploy.md) — Toolkit for compressing, deploying, and serving LLMs with TurboMind and PyTorch backends
- [LocalAI](./localai.md) — Self-hosted drop-in OpenAI API replacement serving text, embeddings, images, and audio from one binary — multiple backends, consumer hardware, no GPU required
- [doctr](./mindee-doctr.md) — OCR library for documents that pairs a text-detection backend with a recognizer and reconstructs word-level geometry for downstream extraction
- [mistral.rs](./mistral-rs.md) — Pure-Rust cross-modality LLM inference server — text, vision, image generation, and speech behind OpenAI-compatible APIs with ISQ in-place quantization
- [MLC LLM](./mlc-llm.md) — Machine-learning-compilation stack that runs LLMs natively on iOS, Android, WebGPU, Metal, Vulkan and CUDA from one codebase
- [mllm](./mllm.md) — C++ multimodal LLM runtime for mobile and edge devices with vision and inference benchmarks
- [Nunchaku (SVDQuant)](./nunchaku.md) — An inference engine implementing SVDQuant 4-bit quantization for diffusion transformers, absorbing outliers via low-rank components to run big image models on
- [DALI](./nvidia-dali.md) — GPU-accelerated data loading and augmentation library whose operator graph and execution engine keep accelerators busy during training and inference
- [TensorRT](./nvidia-tensorrt.md) — NVIDIA inference SDK that fuses and specialises a framework graph into an optimised engine plan for one GPU
- [TransformerEngine](./nvidia-transformerengine.md) — NVIDIA library of fused transformer primitives with FP8 and FP4 GEMM paths, low-precision attention, and framework plugin integration
- [Ollama](./ollama.md) — Local runtime for downloading, running, and serving open-weight models on developer machines
- [onnx](./onnx-onnx.md) — Versioned serialization format and operator schema for ML graphs, plus checker and shape-inference tooling
- [ONNX Runtime](./onnxruntime.md) — Microsoft's cross-platform inference runtime for the ONNX graph format — one exported model runs on CPU, GPU, mobile, and browser via execution providers
- [textgen](./oobabooga-textgen.md) — AGPL-3.0 desktop and local-server front end for self-hosted LLMs with vision, tool calling, and OpenAI-compatible APIs
- [OpenVINO](./openvino.md) — Intel's open toolkit for optimizing and deploying AI inference across CPUs, integrated GPUs, and NPUs, with model conversion, quantization
- [Piper](./piper-tts.md) — A fast, local neural text-to-speech system optimized for the Raspberry Pi and low-power devices, using VITS-based voices exported to onnxruntime
- [llama_deploy](./run-llama-llama-deploy.md) — Deployment layer that turns a LlamaIndex agentic workflow into running services with API and control-plane surfaces
- [Semantic Router (vLLM)](./semantic-router.md) — An intelligent mixture-of-models router that classifies each request semantically and routes it to the most suitable model for efficient heterogeneous LLM
- [SGLang](./sglang.md) — High-performance serving framework for large language and multimodal models
- [sherpa-onnx](./sherpa-onnx.md) — An offline, on-device speech toolkit (STT, TTS, diarization, VAD, enhancement) built on next-gen Kaldi and onnxruntime with bindings for a dozen languages and
- [Shimmy](./shimmy.md) — A pure-Rust, OpenAI-API-compatible local inference server that is GGUF-native, supports WebGPU, and avoids Python or llama.cpp dependencies
- [Superlinked Inference Engine](./sie.md) — Superlinked open-source inference server and production cluster for serving the model mix used by agent applications
- [silero-vad](./snakers4-silero-vad.md) — Small CPU-fast voice-activity detector that gates streaming ASR and realtime voice interfaces
- [vLLM Speculators](./speculators.md) — Unified library for building, evaluating, and storing speculative-decoding algorithms for LLM inference
- [SpeechRecognition (Python)](./speechrecognition.md) — A long-standing Python library offering one simple API over many speech-to-text engines and APIs, both offline and online, including Whisper, Vosk
- [TensorRT-LLM](./tensorrt-llm.md) — NVIDIA's open-source LLM inference library with hand-tuned kernels, in-flight batching and FP8/FP4 quantization for peak GPU throughput
- [Text Generation Inference](./text-generation-inference.md) — Hugging Face inference server for serving large text-generation models in production
- [text-generation-webui (oobabooga)](./text-generation-webui.md) — The Gradio-based local LLM workbench — multiple loader backends, deep sampling control, character/instruct modes, extensions, and an OpenAI-compatible API
- [vLLM](./vllm.md) — High-throughput inference and serving engine for LLMs with batching and OpenAI-compatible APIs
- [vLLM-MLX](./vllm-mlx.md) — MLX-backed OpenAI- and Anthropic-compatible local inference server for Apple Silicon with batching, vision, and MCP tool calling
- [vLLM-Omni](./vllm-omni.md) — Framework for efficient inference with omni-modality models across text, vision, audio, and generation pipelines
- [Vosk](./vosk-api.md) — An offline speech-recognition API with small, portable Kaldi-based models and bindings for Python, Java, C#, Node, and mobile, supporting 20+ languages
- [whisper.cpp](./whisper-cpp.md) — A dependency-free C/C++ port of OpenAI's Whisper that runs speech-to-text on CPU and consumer hardware via the ggml/GGUF tensor library
- [WhisperX](./whisperx.md) — Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput
