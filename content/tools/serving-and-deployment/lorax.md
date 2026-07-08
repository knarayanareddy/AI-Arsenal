---
id: lorax
name: LoRAX
type: tool
job: [production-serving]
description: Multi-LoRA inference server that serves thousands of fine-tuned adapters on a single base model and GPU
url: "https://loraexchange.ai/"
cost_model: open-source
pricing_detail: Apache-2.0 open source; managed serving available via Predibase
tags: [inference, fine-tuning, self-hosted, efficiency]
maturity: production
stack: [python, rust]
free_tier: true
free_tier_limits: Fully open source
self_hostable: true
open_source: true
source_url: "https://github.com/predibase/lorax"
docs_url: "https://loraexchange.ai/"
github_url: "https://github.com/predibase/lorax"
alternatives: [bentoml, hf-inference-endpoints]
integrates_with: [huggingface]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: serving-and-deployment
audience: [production]
best_when:
  - You serve many LoRA fine-tunes of the same base model (per-customer, per-task adapters) and can't afford a GPU per variant
  - You need adapters loaded/swapped dynamically per request with continuous batching across heterogeneous adapters
avoid_when:
  - You serve one model with no adapters — vLLM-class engines are more actively developed for the single-model case
  - Your fine-tunes are full-parameter (not LoRA); adapter multiplexing doesn't apply
version_tracked: null
verdict: solid-choice
verdict_rationale: The purpose-built answer to the many-fine-tunes economics problem; evaluate against vLLM's own multi-LoRA support, which has closed much of the gap
status: active
enrichment_status: draft
---

> **TL;DR:** Multi-LoRA inference server: one base model, one GPU, thousands of hot-swappable fine-tuned adapters with continuous batching across them. Purpose-built for per-customer fine-tune economics.

## Overview

LoRAX (LoRA eXchange), from Predibase, is an inference server (forked from HF text-generation-inference) designed around adapter multiplexing: it keeps one base model resident and dynamically loads LoRA adapters per request, batching requests for *different* adapters into the same forward pass via heterogeneous continuous batching and SGMV kernels (~3.8K stars, Apache-2.0).

## Why It's in the Arsenal

The economics of fine-tuning break at serving time: a dedicated GPU per fine-tune makes per-customer or per-task adapters unaffordable. LoRAX is the clearest open-source implementation of the fix — adapter multiplexing — and complements the Arsenal's fine-tuning guidance (start with LoRA) by answering the "and then how do we serve 200 of them?" question.

## Key Features

- Dynamic adapter loading from HF Hub, S3, or local disk at request time
- Heterogeneous continuous batching: different adapters share one batch/forward pass
- Adapter-tiering and prefetch scheduling to hide load latency
- OpenAI-compatible API with per-request `adapter_id`; structured-output support

## Architecture / How It Works

The base model stays resident in GPU memory; LoRA weight deltas are small enough to page in on demand. Custom SGMV (segmented gather matrix-vector) kernels apply different adapters to different sequences within the same batched matmul, so throughput approaches single-model serving even with many concurrent adapters.

## Getting Started

```bash
docker run --gpus all -p 8080:80 ghcr.io/predibase/lorax:main \
  --model-id mistralai/Mistral-7B-Instruct-v0.2
# then pass {"parameters": {"adapter_id": "my-org/my-lora"}} per request
```

## Use Cases

1. **Scenario**: SaaS with a fine-tuned adapter per customer, served from a shared GPU pool
2. **Scenario**: task-specialized adapters (extraction, classification, summarization) behind one endpoint selected per request
3. **Scenario where this is NOT the right fit**: a single fine-tune at high traffic — merge the adapter into the base model and use a mainstream engine

## Strengths

- Solves a real cost cliff: thousands of fine-tunes at roughly one model's serving cost
- Request-level adapter selection makes A/B testing adapters trivial
- Production affordances inherited from TGI (metrics, token streaming, quantization support)

## Limitations / When NOT to Use

- Development pace trails vLLM; vLLM's own multi-LoRA support now covers many of these scenarios — benchmark both
- LoRA-only leverage: full fine-tunes and non-adapter architectures gain nothing
- Adapter cold-loads add tail latency when the working set exceeds GPU/CPU cache tiers

## Integration Patterns

- Compare against vLLM's multi-LoRA mode and [HF Inference Endpoints](./hf-inference-endpoints.md) before adopting — the single-engine mainstream may already cover your adapter count.
- Link this tool from job guides using its canonical ID `lorax`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Documentation](https://loraexchange.ai/)
- [Source](https://github.com/predibase/lorax)

## Buzz & Reception

- Included because LoRAX is the reference open-source implementation of multi-LoRA serving, widely cited in fine-tune-serving cost analyses and adapter-multiplexing writeups.

---
*Last reviewed: 2026-07-08 by @maintainer*
