---
id: lorax
name: LoRAX
type: tool
job: [production-serving]
description: Archived multi-LoRA inference server that pioneered adapter multiplexing — read it as the reference design; serve adapters with vLLM or SGLang instead
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
last_reviewed: "2026-10-24"
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
verdict: use-with-caution
verdict_rationale: "A clear reference for multi-adapter serving, archived in favour of newer engines: read it to understand the technique rather than to deploy it"
status: archived
enrichment_status: draft
---

> **TL;DR:** the reference design for multi-LoRA serving, not a deployment target. The repository is archived: read it to understand adapter multiplexing, then run vLLM or SGLang multi-LoRA, which absorbed the technique and are still maintained.

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

1. **Reading it rather than running it**: the project is archived, so its value now is as the clearest written account of adapter multiplexing — heterogeneous continuous batching, adapter prefetch and SGMV kernels — which is the design every modern multi-LoRA server inherits.
2. **Understanding why vLLM and SGLang multi-LoRA work the way they do**: the scheduler and kernel ideas transfer directly, and the docs explain the throughput argument better than a changelog does.
3. **Historical cost modelling for fine-tune serving**: the "thousands of adapters on one GPU" claim is what made per-customer adapters economically viable, and the reasoning still defines the ceiling on adapter count.
4. **Evaluating an existing LoRAX deployment**: if you inherited one, the archived status is the finding — plan the migration rather than extending it.

## Strengths

- The clearest explanation of adapter multiplexing available in open source: base model resident, adapter deltas paged in, different adapters batched into one forward pass.
- Optimisations that became the template: SGMV kernels, adapter exchange scheduling, adapter-tiering to hide load latency.
- A complete operational story for its time — Docker images, Helm charts, Prometheus metrics, OpenTelemetry tracing, OpenAI-compatible API with per-request `adapter_id`.
- Apache-2.0 with no commercial strings, which is why its ideas spread even as the codebase stopped.

## Limitations / When NOT to Use

- **The repository is archived.** It is not a deployment target in 2026: no fixes, no new model support, no security patches.
- **The successors absorbed the feature.** vLLM and SGLang both serve many LoRA adapters per base model, with active development and far wider model coverage; the reason to read LoRAX is understanding, not operation.
- **It is a fork of text-generation-inference**, so its model support stopped where that lineage stopped plus whatever was added before archiving.
- **Hardware assumptions are dated.** Ampere-or-newer CUDA kernels compiled per architecture; newer GPU generations are not covered.
- **Single-node, single-model-family design.** Cross-node adapter routing, which larger deployments need, was never in scope.

## Integration Patterns

- *Do not wire it in.* For multi-adapter serving today, use `vllm` or `sglang` multi-LoRA mode behind an OpenAI-compatible endpoint.
- *Read it for*: the scheduling argument, the SGMV kernel approach, and the vocabulary (adapter exchange, heterogeneous batching) used in newer engines' documentation.
- *Alternatives*: `ray-serve` when adapters need to be routed across a cluster, `bentoml` when the unit is a packaged model rather than an adapter, and hosted endpoints when the adapter count is small enough that per-endpoint pricing is cheaper than a GPU.

## Resources

- [Documentation](https://loraexchange.ai/)
- [Source](https://github.com/predibase/lorax)

## Buzz & Reception

- Included because LoRAX is the reference open-source implementation of multi-LoRA serving, widely cited in fine-tune-serving cost analyses and adapter-multiplexing writeups.

---
*Last reviewed: 2026-07-08 by @maintainer*
