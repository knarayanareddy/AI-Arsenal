---
title: "Model Layer Tools"
section: "tools/model-layer"
auto_generated: false
---

# Model Layer Tools

## What belongs here

LLM and image-model providers, local model runners, fine-tuning frameworks, model hubs/registries, and structured-generation libraries.

## What does NOT belong here

Hosting/serving infrastructure for those models belongs in Serving & Deployment; agent logic built on top of models belongs in Orchestration.

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: Is this tool primarily about producing, training, or hosting model weights/outputs, not the pipeline around it?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Model Layer in This Phase

### Recently Added

- [FastEmbed](./fastembed.md)
- [Hugging Face Accelerate](./accelerate.md)
- [Cerebras Inference](./cerebras-inference.md)
- [ClearML](./clearml.md)
- [Cohere](./cohere.md)
- [DeepSpeed](./deepspeed.md)
- [Groq](./groq.md)
- [Liger Kernel](./liger-kernel.md)
- [LM Format Enforcer](./lm-format-enforcer.md)
- [Megatron-LM](./megatron-lm.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Hugging Face Accelerate](./accelerate.md) — Device-agnostic PyTorch training launcher — the same script runs on CPU, one GPU, multi-GPU, TPU, DeepSpeed, or FSDP via config, not code changes
- [Axolotl](./axolotl.md) — Configuration-driven fine-tuning framework for many open-weight LLM families
- [Cerebras Inference](./cerebras-inference.md) — Wafer-scale-engine inference API claiming the fastest open-model token rates available
- [ClearML](./clearml.md) — Open-source, self-hostable MLOps suite covering experiment tracking, data versioning, pipelines, and orchestration
- [Cohere](./cohere.md) — Enterprise AI platform: Command models plus best-in-class Embed and Rerank APIs for search and RAG
- [DeepSpeed](./deepspeed.md) — Microsoft's distributed-training library: ZeRO sharding, offloading, and pipeline parallelism for training beyond single-GPU memory
- [DVC](./dvc.md) — Open-source data and model versioning tool for ML projects and pipelines
- [FastEmbed](./fastembed.md) — A lightweight ONNX Runtime library for embedding and reranking without PyTorch
- [Groq](./groq.md) — Ultra-low-latency inference on custom LPU hardware, serving open models at hundreds of tokens per second
- [Guidance](./guidance.md) — Microsoft guidance library for controlling and constraining language model generation
- [Hugging Face Hub](./hugging-face-hub.md) — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- [Ideogram](./ideogram.md) — AI image generation with reliable text rendering in outputs
- [Ideogram AI](./ideogram-ai.md) — AI image generation platform with reliable text rendering and broad style coverage
- [Kimi K2.5](./kimi-k2-5.md) — AI assistant with deep understanding, analysis, and reasoning capabilities
- [Liger Kernel](./liger-kernel.md) — Fused Triton kernels for LLM training (RMSNorm, RoPE, SwiGLU, fused cross-entropy) that cut memory and raise throughput as near drop-in layer replacements
- [LLaMA-Factory](./llamafactory.md) — Unified fine-tuning framework and UI for many LLMs and training methods
- [LM Format Enforcer](./lm-format-enforcer.md) — Token-filtering library that guarantees LLM output conforms to JSON Schema or regex, integrated into vLLM
- [Megatron-LM](./megatron-lm.md) — NVIDIA's reference framework for training transformer models at scale with tensor, pipeline, and sequence parallelism
- [MLflow](./mlflow.md) — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- [MLX-LM](./mlx-lm.md) — Apple MLX library for running and fine-tuning LLMs on Apple Silicon
- [OpenPipe ART](./openpipe-art.md) — Open-source Agent Reinforcement Trainer that fine-tunes multi-step LLM agents with RL (GRPO) using an LLM-judge reward instead of labeled steps
- [OpenRouter](./openrouter.md) — Unified API over 400+ models from all major providers with automatic fallbacks and pass-through pricing
- [Outlines](./outlines.md) — A library for constrained generation and structured outputs with LLMs
- [PEFT](./peft.md) — Hugging Face library for parameter-efficient fine-tuning methods
- [PyTorch Lightning](./pytorch-lightning.md) — The organize-don't-abstract PyTorch training framework — LightningModule structures your code while the Trainer owns distribution and checkpointing
- [Qwen 3](./qwen-3.md) — Alibaba open-weight model family with multimodal and coding variants
- [Sentence Transformers](./sentence-transformers.md) — The standard Python library for computing, training, and fine-tuning text embedding and reranker models
- [Together AI](./together-ai.md) — Inference and fine-tuning cloud for 200+ open-source models with strong price/performance and dedicated endpoints
- [torchtune](./torchtune.md) — PyTorch-native library for fine-tuning and experimenting with LLMs
- [TRL](./trl.md) — Hugging Face's library for post-training LLMs: SFT, DPO, GRPO, PPO, and reward modeling on top of Transformers
- [Unsloth](./unsloth.md) — Efficient fine-tuning toolkit for Llama, Qwen, Mistral, and other open models
- [Voyage AI](./voyage-ai.md) — Embedding and reranking models that consistently top retrieval benchmarks, now part of MongoDB
- [Weights & Biases](./weights-biases.md) — Experiment tracking and model management platform for ML and AI teams
