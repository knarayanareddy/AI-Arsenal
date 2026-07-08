---
id: ktransformers
name: KTransformers
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: CPU/GPU heterogeneous inference for giant MoE models — experts on CPU with AMX kernels, attention on GPU, running DeepSeek-class models on desktops
github_url: "https://github.com/kvcache-ai/ktransformers"
license: Apache-2.0
primary_language: Python
org_or_maintainer: kvcache-ai
tags: [inference, quantization, efficiency]
maturity: beta
cost_model: open-source
github_stars: 17384
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-07-07"
docs_url: "https://kvcache-ai.github.io/ktransformers/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [research-origin, actively-maintained, experimental]
ecosystem_role:
  - "The existence proof that frontier-scale open MoE models don't require datacenter GPUs: exploits MoE sparsity by placing the rarely-all-active expert weights in CPU RAM with optimized AMX kernels while the GPU handles attention — 671B-parameter DeepSeek at usable speeds on a workstation"
best_for:
  - "Running DeepSeek-R1/V3-class MoE models locally when you have abundant CPU RAM (hundreds of GB) but only a single 24GB-class GPU — the configuration no pure-GPU engine can serve"
  - "Studying heterogeneous inference: its kernel-injection framework (YAML rules replacing module implementations) is the cleanest open example of CPU-offload done by architecture-aware design rather than naive swapping"
avoid_if:
  - "Your models fit in VRAM — vLLM/SGLang or llama.cpp are simpler and faster when offload isn't needed"
  - "You need production-grade multi-user serving stability — this is research-origin software moving fast; treat deployments as experimental"
upstream_dependencies: []
downstream_consumers: []
alternatives: [llama-cpp, vllm]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (17.3k), Apache-2.0, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-08. Performance claims (DeepSeek-671B on 24GB GPU + large RAM, AMX speedups) are the project's published benchmarks from the MADSys/Approaching-AI team; not independently reproduced here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/kvcache-ai/ktransformers","date":"2026-07-08","description":"17.3k stars; trended on the DeepSeek-local wave; Tsinghua MADSys research origin"}
featured: false
status: active
---

## Overview

KTransformers (from Tsinghua's MADSys group) runs very large MoE models on heterogeneous hardware by exploiting what MoE sparsity means physically: only a few experts activate per token, so the huge expert weights can live in CPU RAM — served by Intel AMX/AVX-optimized kernels — while attention and shared layers run on GPU. The result that made it famous: DeepSeek-R1/V3 (671B parameters) generating at usable speeds on a single 24GB GPU plus a large-RAM workstation.

## Why it's in the Arsenal

It changed the local-inference frontier by mechanism rather than compression: instead of quantizing a model until it fits VRAM, it partitions the architecture across the memory hierarchy according to activation patterns. As open frontier models increasingly ship as MoE, the CPU/GPU-heterogeneous pattern KTransformers pioneered is becoming core inference-engineering knowledge — and this is its reference implementation.

## Architecture

A Transformers-compatible frontend with a YAML-driven injection framework: rules match module paths and replace implementations with optimized kernels — Marlin/GPU kernels for dense parts, llamafile/AMX CPU kernels for expert FFNs kept in RAM. Placement policy routes each token's active experts to CPU compute, avoiding weight transfer over PCIe (compute-where-the-weights-live). Serves via a chat UI and an OpenAI-compatible API.

## Ecosystem Position

Upstream: Transformers model definitions, quantized weight formats (GGUF-family). Competing: llama.cpp's simpler layer-offload (general but activation-agnostic) and pure-GPU engines (vLLM/SGLang) when VRAM suffices. Its niche — giant MoE on one GPU — currently has no serious rival; llama.cpp has since adopted related MoE-offload ideas.

## Getting Started

```bash
pip install ktransformers
# DeepSeek-class MoE with GPU attention + CPU experts:
python -m ktransformers.local_chat --model_path deepseek-ai/DeepSeek-V3 --gguf_path ./DeepSeek-V3-GGUF
```

## Key Use Cases

1. **Scenario**: running DeepSeek-R1-class open frontier models on-premises for privacy-sensitive work with a workstation (single 24GB GPU, 384GB+ RAM) instead of an 8×H100 node
2. **Scenario**: research on heterogeneous inference — the injection framework makes kernel/placement experiments declarative

## Strengths

- Only practical open path to frontier-scale MoE inference on single-GPU hardware — a capability class, not an optimization percentage
- Architecture-aware offload (experts to CPU by activation sparsity) with AMX-optimized kernels — principled where naive offload is bandwidth-bound

## Limitations

- Sharp hardware constraints: benefits require large CPU RAM and ideally AMX-capable Xeons; consumer DDR4 setups see much weaker results
- Research-velocity software: setup friction, model-support gaps, and breaking changes are common; not a production serving substitute

## Relation to the Arsenal

The heterogeneous-inference frontier next to `llama-cpp` (general local runtime) and `vllm` (datacenter serving); pairs with the MoE research lineage (`fedus-2021-switch-transformer`) explaining the sparsity it exploits.

## Resources

- [GitHub](https://github.com/kvcache-ai/ktransformers)
- [Documentation](https://kvcache-ai.github.io/ktransformers/)
