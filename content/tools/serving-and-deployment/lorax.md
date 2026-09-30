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

> **TL;DR:** the production-serving entry for LoRAX. Multi-LoRA inference server that serves thousands of fine-tuned adapters on a single base model and GPU — the deciding factor is operational cost and what you have to run, not the feature list.

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

1. **Where it sits**: on the production-serving leg, which means the decisions that matter are timeout, retry and degraded-mode behaviour, plus an interface boundary so LoRAX can be swapped without touching callers.
2. **Knowing when it has failed you**: the failure mode to test for is degraded rather than absent, since LoRAX is most likely to be slow or rate-limited in production rather than simply gone.
3. **Choosing between candidates**: LoRAX's comparison set is `bentoml`, `hf-inference-endpoints`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- The implementation detail worth reading before adopting LoRAX is specific — the base model stays resident in GPU memory; LoRA weight deltas are small enough to page in on demand. Custom SGMV (segmented gather matrix-vector) kernels apply different adapters to different sequences within the same batched matmul, so throughput approaches single-model serving even with many concurrent adapters — and that is where a capability claim either survives contact with your data or does not.
- Weighing LoRAX against `bentoml`, `hf-inference-endpoints` comes down to one question: who runs the process when it breaks — you or the vendor.
- The documented path into LoRAX runs through `huggingface`, so the contract to test is the one those adapters expose.
- What this entry cannot give you is measured behaviour: measure LoRAX's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to LoRAX, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for LoRAX describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where LoRAX overlaps `bentoml`, `hf-inference-endpoints`, choosing on feature lists alone is the mistake; the deciding axis is operational.

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
