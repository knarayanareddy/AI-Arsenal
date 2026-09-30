---
id: ggml-org-ggml
name: "ggml"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "C tensor library with a build-graph execution model, providing quantized matmul kernels for local inference"
github_url: "https://github.com/ggml-org/ggml"
license: "MIT"
primary_language: C++
org_or_maintainer: "ggml-org"
tags: [inference, quantization, local]
maturity: production
cost_model: open-source
github_stars: 15416
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-24"
docs_url: "https://github.com/ggml-org/ggml"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "The C tensor and graph library underneath the llama.cpp ecosystem, defining the quantized runtime that made local LLM inference on commodity hardware practical."
best_for:
  - "You are writing a new inference runtime or accelerator backend and need a tensor library with a graph-building execution model rather than eager op-by-op dispatch."
  - "You are quantizing and want reference implementations of the block-wise Q4, Q5, and Q8 dequantisation and matmul schemes that every GGUF quantisation type maps onto."
  - "You need to support hardware without a vendor GPU stack and want a small C library with plain scalar fallbacks that still run correctly anywhere."
avoid_if:
  - "You only need to run a language model, because llama.cpp already packages this library and you will not out-engineer it by linking it directly."
  - "Your workload is dense float32 GPU tensor work, where a library tuned for quantized low-bit CPU paths is the wrong shape of tool."
  - "You need autograd and training, since the graph execution model here is forward inference only with no backward pass."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (15416), MIT license, last commit 2026-09-24, C++ as primary language and the topic list were API-verified. Context arenas, backend scheduling, GGUF block quantisation, and the graph-optimizer pass are described from the repository source and docs; the multi-backend C snippet is illustrative of the documented API and was not compiled for this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ggml-org/ggml", "date": "2026-09-28", "description": "15,416 stars and last commit 2026-09-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

ggml is a C library for machine-learning inference with three abstractions. ggml_tensor is a typed, strided, n-dimensional tensor with a name, a buffer reference, and an op tag; ggml_context allocates and owns tensor memory with arena allocation so a whole graph can be created and freed at once. ggml_backend defines the execution interface, covering a scheduler, graph computation, and buffer types with a buffer interface for uploading weights, with CPU and CUDA backends implementing it. Operations are C functions like ggml_mul_mat, ggml_add, ggml_soft_max, and ggml_conv_2d that do not execute anything: they append a node describing the op to the current context. The graph is then planned by backend_sched, which partitions nodes across backends, and ggml_backend_graph_compute runs it. The model-format layer defines GGML file layout and quantization, including the block sizes and per-block scales that GGUF stores for each quantisation type.

## Why it's in the Arsenal

The recurring decision is how to get a model to run fast on hardware that has no vendor-optimised stack, meaning a laptop CPU, an edge box, or a device with an NPU that only speaks C. A general framework resolves this with hand-written kernels per backend, which does not scale past a handful of targets. ggml's answer is to define the operator set once in C, express graphs declaratively, and let each backend implement the small number of primitives the whole model is built from, essentially matmul, add, softmax, and norms. That is why adding a backend is tractable: you implement a few kernels, not a whole framework, which is how the same quantised model ends up running on so many architectures.

## Architecture

Work happens in two phases. Construction: you open a ggml_context with a computed size, then call op functions that validate shapes, allocate result tensors from the context arena, and record a node with its op tag, src pointers, and parameters into that context's graph list. Nothing has been computed. Planning: backend_sched takes the source graph, allocates work buffers in shared and compute pools, and partitions nodes into backend segments by hard placement rules, where weight tensors are pinned to the backend that owns them, so a matmul with CPU-resident weights is split into a transfer to GPU, a GPU compute, and a copy back. Execution: backend_sched_graph_compute walks segments in order, letting each backend synchronise only when it must. Quantization lives in the same layer: weights are stored in block-quantised formats such as Q4_0, Q4_K, Q5_K, Q6_K, and Q8_0 where each block shares a scale, and the CPU backend's mul_mat kernels dequantise one block at a time into a small scratch buffer, which is what keeps memory bandwidth rather than FLOPs as the bottleneck. A graph-optimizer pass rewrites patterns such as RoPE and normalisation fusions before scheduling.

## Ecosystem Position

ggml is the foundation layer that llama.cpp, koboldcpp, and several Whisper ports build on, so it is a prerequisite rather than a competitor for them; choosing llama.cpp is choosing ggml plus a model loader, a sampler, and a CLI. It competes with oneDNN, XLA, and Apache TVM at the graph-scheduling level while being far smaller and more manual, and it is an alternative to writing raw oneDNN or vendor BLAS calls when the model is quantised rather than dense. Compared with TensorRT, which generates fused kernels for one GPU family, ggml is the opposite bet: a single portable C path that is decent everywhere. It is not a tensor library for training, since there is no autograd, so PyTorch and the training-framework entries cover that half of the work.

## Getting Started

Build a graph and run it on the CPU backend:

```bash
git clone https://github.com/ggml-org/ggml && cd ggml
cmake -B build && cmake --build build --config Release -j
```

```c
#include "ggml.h"
#include "ggml-cpu.h"

struct ggml_init_params p = { 1024*1024, NULL, false };
struct ggml_context *ctx = ggml_init(p);
struct ggml_tensor *a = ggml_new_tensor_2d(ctx, GGML_TYPE_F32, 4, 8);
struct ggml_tensor *b = ggml_new_tensor_2d(ctx, GGML_TYPE_F32, 8, 1);
struct ggml_tensor *c = ggml_mul_mat(ctx, a, b);        // builds the node

struct ggml_cgraph *gf = ggml_new_graph(ctx);
ggml_build_forward_expand(gf, c);
struct ggml_backend *be = ggml_backend_cpu_init();
ggml_backend_graph_compute(be, gf);
printf("%f\n", ((float *)c->data)[0]);
```

Swap the backend to `ggml_backend_cuda_init` to run the same graph on an NVIDIA GPU.

## Key Use Cases

1. Adding a new device backend to the local-LLM ecosystem by implementing the backend interface: buffer type, graph compute, and a handful of fused kernels.
2. Shipping a quantised model to constrained hardware where a plain C path with block-wise dequantisation is the only thing that meets the memory and latency budget.
3. Embedding inference in an application that cannot take a Python or large-runtime dependency, linking the C library directly and driving a prebuilt graph.

## Strengths

- A small, dependency-free C core that compiles anywhere, which is the reason the ecosystem reaches so many devices.
- Block-quantised matmul kernels that make low-bit inference bandwidth-efficient, addressing the actual bottleneck in CPU generation.
- The declarative build-then-schedule model lets one graph span CPU and GPU with a single mixed placement pass.
- Serves as the reference implementation of the quantisation and block layouts that the GGUF ecosystem standardised on.

## Limitations

The API is C with manual memory arenas, so tensor lifetime is a real discipline and lifetime bugs surface as segfaults rather than exceptions; there is no meaningful shape broadcasting and no autograd, so it is inference-only. Performance depends on how much platform-specific tuning each backend carries, giving good results on x86 with AVX2, weaker results on anything without dedicated kernels, and CPU inference that stays slower than a GPU server for large models. Graph construction verbosity is high, and building a model by hand is far more work than using the layers that already exist upstream. Because the API changes with upstream refactors, pinning a version for a native integration is a real maintenance cost, and the project is a moving target for anyone depending on internal headers.

## Relation to the Arsenal

Read this immediately before llama-cpp and ollama in content/projects/inference-engines, since those are the consumers that make ggml's design decisions legible and the practical entry point for almost every user. The ollama entry is a packaging and model-management layer over the same runtime, while the vllm and sglang entries take the opposite high-throughput-GPU path with continuous batching. Against onnxruntime and openvino, this is the portable low-bit CPU end of the same inference problem, and the quantisation discussion connects back to the onnx entry's operator coverage questions.

## Resources

- [ggml GitHub repository](https://github.com/ggml-org/ggml)
- [ggml documentation and backends](https://github.com/ggml-org/ggml/tree/master/docs)
- [ggml organization overview](https://github.com/ggml-org)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (15,416 stars, last commit 2026-09-24, license MIT, verified via GitHub API on 2026-09-28)*
