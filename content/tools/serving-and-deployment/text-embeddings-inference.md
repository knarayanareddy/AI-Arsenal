---
id: text-embeddings-inference
name: Text Embeddings Inference (TEI)
type: tool
job: [production-serving, vector-search]
description: Hugging Face's Rust-based high-throughput inference server for embedding and reranker models
url: "https://huggingface.co/docs/text-embeddings-inference/index"
cost_model: open-source
pricing_detail: Apache-2.0 open source; self-hosted compute costs only
tags: [embeddings, inference, self-hosted, efficiency]
maturity: production
stack: [rust]
free_tier: true
free_tier_limits: Fully open source
self_hostable: true
open_source: true
source_url: "https://github.com/huggingface/text-embeddings-inference"
docs_url: "https://huggingface.co/docs/text-embeddings-inference/index"
github_url: "https://github.com/huggingface/text-embeddings-inference"
alternatives: [vllm, hf-inference-endpoints]
integrates_with: [huggingface]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: serving-and-deployment
audience: [production]
best_when:
  - You self-host open embedding or reranker models (BGE, GTE, E5, sentence-transformers) and need production throughput with dynamic batching
  - You want one container that serves embeddings, rerankers, and sequence classifiers behind a simple HTTP API with no Python server overhead
avoid_when:
  - You use a managed embedding API (OpenAI, Cohere, Voyage) and have no self-hosting requirement — TEI adds ops for nothing
  - Your model architecture isn't supported (TEI covers popular encoder families, not arbitrary custom models)
version_tracked: null
verdict: recommended
verdict_rationale: The default way to serve open embedding and reranker models in production — fast, single-binary, and boring in the good sense
status: active
enrichment_status: draft
---

> **TL;DR:** Hugging Face's Rust inference server for embedding and reranker models — dynamic batching, flash attention, single container. The default for self-hosted embedding serving.

## Overview

Text Embeddings Inference (TEI) is a Rust-based inference server purpose-built for embedding, reranking, and sequence-classification models. It ships token-based dynamic batching, flash attention, and optimized kernels for popular encoder families (BGE, GTE, E5, sentence-transformers, Qwen embedding models), exposed over a small HTTP/gRPC API in a single container (~5K stars, Apache-2.0, actively maintained by Hugging Face).

## Why It's in the Arsenal

Embedding serving is the workhorse behind every self-hosted RAG stack, and doing it with a general Python web server leaves large throughput on the table: encoder inference benefits enormously from token-level dynamic batching, which TEI implements natively. It is the embedding-side counterpart to vLLM's role for generation, and the natural deployment target for the Arsenal's embedding-model decision guidance.

## Key Features

- Token-based dynamic batching for high-throughput encoder inference
- Serves embeddings, rerankers (cross-encoders), and classifiers from one server
- Flash attention and cuBLASLt-optimized kernels; CPU, Turing→Hopper GPU support
- Small single-binary/container deployment with Prometheus metrics and OpenTelemetry

## Architecture / How It Works

Incoming requests are tokenized and packed into token-budgeted batches (rather than fixed request counts), keeping the GPU saturated under mixed-length traffic; results are unpacked per request. Model weights load from the Hugging Face Hub or a local path at startup.

## Getting Started

```bash
docker run --gpus all -p 8080:80 ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id BAAI/bge-large-en-v1.5
```

## Use Cases

1. **Scenario**: self-hosted RAG ingestion + query embedding at production traffic with strict latency SLOs
2. **Scenario**: serving a cross-encoder reranker beside the embedder from the same infrastructure
3. **Scenario where this is NOT the right fit**: teams already on managed embedding APIs with no data-residency requirement

## Strengths

- Dramatic throughput gains over naive Python serving for the same model, via token-based batching
- One deployment pattern covers embed + rerank + classify
- Boring, focused scope: it does encoder serving and nothing else

## Limitations / When NOT to Use

- Architecture coverage is curated, not universal — verify your model family is supported before committing
- No built-in vector storage or retrieval; it is strictly the inference tier
- GPU kernels are NVIDIA-focused; other accelerators get CPU-grade paths

## Integration Patterns

- Compare against vLLM-style engines (which now also serve some embedding models) and [HF Inference Endpoints](./hf-inference-endpoints.md) (managed TEI) before adopting.
- Link this tool from job guides using its canonical ID `text-embeddings-inference`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Documentation](https://huggingface.co/docs/text-embeddings-inference/index)
- [Source](https://github.com/huggingface/text-embeddings-inference)

## Buzz & Reception

- Included because TEI is the standard self-hosted embedding-serving layer in current RAG deployment writeups and backs Hugging Face's own managed embedding endpoints.

---
*Last reviewed: 2026-07-08 by @maintainer*
