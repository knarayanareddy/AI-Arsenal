---
title: "Serving & Deployment Tools"
section: "tools/serving-and-deployment"
auto_generated: false
---

# Serving & Deployment Tools

## What belongs here

Inference servers, API gateways, containerization/scaling platforms, and hosting providers for AI workloads.

## What does NOT belong here

Agent logic belongs in Orchestration; model training belongs in Model Layer.

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: Does this tool primarily get a model or app running and reachable in production?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Serving And Deployment in This Phase

### Recently Added

- [Envoy AI Gateway](./ai-gateway.md)
- [MCP Context Forge](./mcp-context-forge.md)
- [RamaLama](./ramalama.md)
- [ToolHive](./toolhive.md)
- [Anyscale](./anyscale.md)
- [Baseten](./baseten.md)
- [Cloudflare Workers AI](./cloudflare-workers-ai.md)
- [Cog (Replicate)](./cog.md)
- [CubeSandbox](./cubesandbox.md)
- [KServe](./kserve.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Envoy AI Gateway](./ai-gateway.md) — An Envoy Gateway extension for routing and governing traffic to generative AI services
- [Anyscale](./anyscale.md) — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- [AWS Bedrock](./aws-bedrock.md) — AWS managed service for accessing foundation models and building generative AI apps
- [Azure AI Studio](./azure-ai-studio.md) — Microsoft Azure platform for building, evaluating, and deploying AI applications
- [Baseten](./baseten.md) — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero
- [BentoML](./bentoml.md) — A framework for packaging, deploying, and scaling AI model services
- [Cloudflare Workers AI](./cloudflare-workers-ai.md) — Serverless GPU inference on Cloudflare's global edge network, billed per request with zero infrastructure
- [Cog (Replicate)](./cog.md) — Replicate's open tool for packaging ML models into containers — declare Python/CUDA deps and a predict interface, get a served HTTP API with no Dockerfile
- [CubeSandbox](./cubesandbox.md) — Self-hostable, hardware-isolated sandbox service for AI agent code execution with tens-of-milliseconds startup and an E2B-compatible API
- [FastAPI](./fastapi.md) — Python web framework for building APIs around AI services and model workflows
- [Fireworks AI](./fireworks-ai.md) — A managed platform for fast inference and fine-tuning of open models
- [Fly.io](./fly-io.md) — Application hosting platform with global machines and GPU options for AI services
- [Google Vertex AI](./google-vertex-ai.md) — Google Cloud platform for model APIs, training, evaluation, and AI application deployment
- [Hugging Face Inference Endpoints](./hf-inference-endpoints.md) — Managed Hugging Face service for deploying models as production inference endpoints
- [KServe](./kserve.md) — Kubernetes-native model-inference platform (CNCF) with serverless autoscaling and standardized inference protocol
- [KubeAI](./kubeai.md) — Kubernetes operator for serving LLMs and embeddings: an OpenAI-compatible endpoint with autoscaling (scale-from-zero) over vLLM/Ollama backends
- [LiteLLM](./litellm.md) — A proxy and SDK for routing requests across many LLM providers
- [LoRAX](./lorax.md) — Multi-LoRA inference server that serves thousands of fine-tuned adapters on a single base model and GPU
- [MCP Context Forge](./mcp-context-forge.md) — IBM gateway and registry for MCP, A2A, REST, and gRPC services with discovery and governance
- [Modal](./modal.md) — A serverless platform for deploying Python apps and GPU workloads
- [NVIDIA NIM](./nvidia-nim.md) — Prebuilt, optimized inference microservices: enterprise models packaged as containers with OpenAI-compatible APIs
- [OpenLLM](./openllm.md) — BentoML's tool for running any open-source LLM as an OpenAI-compatible API with one command
- [Portkey](./portkey.md) — An AI gateway for routing, observability, guardrails, and prompt management
- [Railway](./railway.md) — Developer-friendly cloud deployment platform for apps, workers, databases, and prototypes
- [RamaLama](./ramalama.md) — Containers-native CLI for pulling, isolating, and serving AI models on local systems
- [Ray](./ray.md) — Distributed compute engine for scaling Python and AI workloads — training, tuning, batch inference, and serving
- [Ray Serve](./ray-serve.md) — Scalable model-serving library on Ray for composing multi-model inference graphs in pure Python
- [Replicate](./replicate.md) — A hosted platform for running and deploying machine learning models via API
- [RunPod](./runpod.md) — GPU cloud with per-second billing and a serverless tier purpose-built for inference endpoints
- [SkyPilot](./skypilot.md) — Run AI workloads on any cloud or Kubernetes with automatic cheapest-GPU selection, spot handling, and one YAML interface
- [Text Embeddings Inference (TEI)](./text-embeddings-inference.md) — Hugging Face's Rust-based high-throughput inference server for embedding and reranker models
- [ToolHive](./toolhive.md) — Enterprise-oriented platform for running, isolating, and managing Model Context Protocol servers
- [NVIDIA Triton Inference Server](./triton-inference-server.md) — NVIDIA's production inference server for any framework (TensorRT, PyTorch, ONNX, vLLM) with dynamic batching and model ensembles
- [Vercel](./vercel.md) — Frontend cloud platform for deploying and scaling Next.js apps with edge functions
