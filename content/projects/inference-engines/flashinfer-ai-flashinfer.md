---
id: flashinfer-ai-flashinfer
name: "flashinfer"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "JIT-compiled CUDA kernels for attention, sampling, and quantization, dispatched to by high-throughput LLM serving engines"
github_url: "https://github.com/flashinfer-ai/flashinfer"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "flashinfer-ai"
tags: [pytorch, attention, inference]
maturity: production
cost_model: open-source
github_stars: 6516
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-28"
docs_url: "https://flashinfer.ai"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "Attention and sampling kernel library for LLM serving, supplying the fused attention, sampling, and quantization primitives that modern high-throughput engines dispatch to."
best_for:
  - "You are maintaining a serving engine and need tuned paged and radix attention kernels plus fused sampling without writing CUDA yourself."
  - "You serve mixture-of-experts models or multi-head latent attention architectures and need kernels for grouped-query and MLA layouts."
  - "You want FP8 or INT8 quantized KV cache and quantized sampling paths on Hopper or Blackwell without rebuilding an engine."
avoid_if:
  - "You are on AMD, Intel, or Apple Silicon hardware, since the kernels are CUDA-specific and have no portable fallback."
  - "You need something that works out of the box on a laptop or CPU, because first-use JIT compilation requires nvcc or NVRTC and a compatible toolchain."
  - "Your bottleneck is network, scheduling, or model loading rather than kernel time, where engine-level features will move the number far more."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (6516), Apache-2.0 license, last commit 2026-09-28, primary language C++, and all ten topics were read from the GitHub API. Kernel coverage, plan-based API, JIT compilation, and framework integration come from the official README and docs; no kernel was compiled or benchmarked on hardware here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/flashinfer-ai/flashinfer", "date": "2026-09-28", "description": "6,516 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

FlashInfer is a kernel library, not an engine. It provides prefill and decode attention for standard multi-head and grouped-query attention, multi-head latent attention for models such as the DeepSeek family, a radix tree attention variant that reuses shared prefixes across requests, and fused attention for prefill-with-decode. On the sampling side it implements top-k and top-p filtering, penalty application, rejection sampling for speculative decoding, and quantized sampling paths. It also covers KV-cache quantization to FP8, and its kernels are exposed through PyTorch operators as well as framework adapters so a serving engine can call them directly. The Python layer builds kernels from templated sources at runtime, which is why build times and toolchain requirements come up constantly in issue threads.

## Why it's in the Arsenal

The recurring engineering decision is whether to maintain your own attention and sampling kernels or depend on someone else's. Doing it yourself means tracking every new GPU architecture, every quantization format, and every speculative-decoding algorithm. FlashInfer isolates that work: an engine calls a stable Python API, and kernel optimization happens upstream in one place, with correctness and performance tested against a wide model matrix. For architectures that did not exist when most engines were written, such as MLA for DeepSeek-style models, the practical alternative is writing a backend yourself or shipping a fork, which is exactly the cost this library removes.

## Architecture

Kernels are written as templated CUDA C++ instantiated at JIT time through a generated module registry, so a call such as batch_prefill or batch_decode_with_kv_cache dispatches to a specialized binary compiled for the current shape, dtype, and head layout rather than to a runtime branch. State is passed through a per-plan workspace: the plan object preallocates buffers for query, key, value, and output given shapes and a configured backend, and subsequent calls reuse it, which is what avoids per-step allocation overhead. Attention variants share a common plan and call interface so an engine can switch backends per model. A framework adapter layer maps the plans onto PyTorch tensors, and a separate module implements the radix tree and sampling algorithms on top of the primitives.

## Ecosystem Position

FlashInfer overlaps with vLLM, SGLang, and TensorRT-LLM, all of which ship their own kernel sets, but it sits one layer lower: those engines either call it or reimplement what it does. It is a complement to a serving engine rather than a replacement, since it exposes operators and plans but no scheduler, no HTTP server, and no model loader. Compared to directly depending on PyTorch SDPA or FlashAttention, FlashInfer adds paged and radix-attention layouts, fused sampling, quantized caches, and MLA, which is what makes it usable under continuous batching where a monolithic attention call is impossible. It also overlaps with NVIDIA TransformerEngine, which owns the low-precision GEMM and normalization path, while FlashInfer concentrates on attention and sampling; the two are frequently used together in the same engine build.

## Getting Started

Install the prebuilt wheel for your CUDA version, then warm the JIT cache:

```bash
pip install flashinfer-python
```

```bash
# pre-build and cache kernels for the architecture you run on
python -m flashinfer.compile
# or set a cache directory shared across nodes
# export FLASHINFER_CUBIN_DIR=/shared/flashinfer-cache
```

```python
import torch, flashinfer

plan = flashinfer.BatchDecodeWithPagedKVCacheWrapper(
    torch.device("cuda:0"), kv_layout="NHD", use_cuda_graph=True
)
# plan.init(...) binds the allocated KV cache and page table, then:
plan.run(q, k_cache, v_cache, output
         )  # same call shape for vLLM/SGLang-style paged caches
```

Most users install it indirectly, since SGLang and newer vLLM builds can select it as the attention backend.

## Key Use Cases

1. Continuous-batching decode where paged attention and fused sampling set the achievable tokens-per-second-per-GPU ceiling.
2. Serving MLA architectures such as DeepSeek-style models, where the latent cache layout needs a dedicated kernel.
3. Speculative decoding, where fused rejection sampling and top-k/top-p filtering remove the Python-side overhead per draft round.

## Strengths

- Deep coverage of architectures the major engines need but rarely optimize well themselves, including MLA, radix attention, and quantized caches.
- JIT specialization per shape and dtype avoids the generic-branch penalty that limits generic attention libraries under real serving load.
- A single plan-and-call interface shared across attention variants, so switching backends does not ripple through engine code.
- Broadly adopted by SGLang and vLLM, so kernel work benefits every downstream engine rather than one codebase.

## Limitations

CUDA-only and NVIDIA-only, with no AMD, Intel, or Apple path. JIT compilation at first use means a cold start measured in minutes, an nvcc or NVRTC dependency, and a per-node cache that must be shared or the cost repeats. GPU architecture support lags new silicon by months, so a brand-new datacenter part will fall back to slower kernels. Because the API sits close to CUDA types, upgrading the library can break engine integration, and the project moves fast enough that pinning a version and testing is a real operational chore.

## Relation to the Arsenal

This is an inference-engine phase entry and is read alongside the engines that consume it, namely vLLM and SGLang, rather than as a standalone serving solution. It connects downward to the framework and training phases, since TransformerEngine handles the FP8 GEMM path that shares the same low-precision goal. The eval entry guidellm in the benchmarks-and-evals phase is the right tool for measuring whether a kernel swap actually moved your latency percentiles.

## Resources

- [FlashInfer GitHub repository](https://github.com/flashinfer-ai/flashinfer)
- [FlashInfer documentation site](https://flashinfer.ai)
- [SGLang attention backend documentation](https://docs.sglang.ai)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (6,516 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
