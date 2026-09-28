---
id: apache-tvm
name: "tvm"
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: "Compiler stack that lowers deep-learning graphs through tensor IR to code for CPUs, GPUs, and accelerators"
github_url: "https://github.com/apache/tvm"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "apache"
tags: [inference]
maturity: production
cost_model: open-source
github_stars: 13781
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-28"
docs_url: "https://tvm.apache.org/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Compiler stack that lowers deep-learning graphs across CPU, GPU, and custom accelerators, and the reference for the two-level scheduling and codegen design serving engines reuse."
best_for:
  - "You need inference on a custom or less-common accelerator and want a compiler that generates kernels for it instead of writing device code by hand."
  - "You are chasing latency on a deployment target and want an automated search over tiling, fusion, and layout rather than manual kernel tuning."
  - "You are building a framework and want the two-level schedule and code-generation design that later serving engines reuse."
avoid_if:
  - "You just want fast token generation from an existing open-weight model, since a dedicated server such as vllm or sglang already has continuous batching, paged attention, and tuned kernels."
  - "Your team has no compiler background, because schedule tuning, tensor shapes, and lowering bugs are a steep on-ramp even when the payoff is large."
  - "You need a stable, release-managed runtime, since TVM releases are irregular and its API has shifted across major versions."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (13781), Apache-2.0 license, last commit 2026-09-28, Python as primary language and the topic list were API-verified. Dialect layering, schedule primitives, auto-scheduler, and TVM Runtime structure are from the official architecture docs; the TE snippet follows the documented schedule API but was not compiled for this entry, and XLA and TensorRT positioning is engineering judgement."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/apache/tvm", "date": "2026-09-28", "description": "13,781 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

TVM is an end-to-end compiler for deep-learning systems. A frontend (Relax, or the older Relay graph representation) ingests a model graph and applies operator-fusion passes; a target describes the hardware with an ISA, vector lanes, thread blocks, and memory hierarchy; and the compiler lowers the graph through a sequence of dialects. Relax is the newer graph-level IR, TensorIR the loop-nest-level IR, and Object and bytecode the executable form. The central abstraction is a schedule: a set of primitive transformations — split, tile, fuse, vectorize, reordering, and parallelisation — applied to an axis of a loop nest, which the auto-scheduler or a template library searches over per operator. On-device deployment uses TVM Runtime, a lightweight standalone C ABI executor with a graph executor, memory planner, and graph types, and it is what carries compiled artefacts into production. End-to-end flows such as LLM, SDXL, and Llama provide higher-level pipelines on top of the compiler core.

## Why it's in the Arsenal

The recurring decision is whether performance work should be hand-written device code or a compiler search. Hand tuning works until you have more than one target: a kernel optimised for an A100 is wrong on a CPU, and every new device is a rewrite. TVM's answer is to make the search a first-class, portable program — you describe the target's hardware constraints once, and the schedule space is explored automatically or chosen from a tuned template, with the same source graph producing specialised code per target. That is why the design matters beyond this repo: splitting a computation into a high-level graph and a low-level schedule, with search in between, is the reference later serving stacks and hardware vendors copy.

## Architecture

The pipeline is layered by abstraction level. A frontend parses a model into a graph IR where the whole model is a single function, so cross-operator fusion and graph-level rewrites such as constant folding and layout transformation are legal. The graph is partitioned into primitive functions, one per group of fused operators. Each primitive function is lowered to a tensor-level loop nest in TensorIR, which introduces explicit iteration ranges, buffers, and access patterns. A schedule then restructures that loop nest: axes are tiled into outer and inner parts, inner axes vectorised, neighbouring iterations fused, and loops annotated as parallel or vectorized, with layout assignment governing memory access patterns. Template libraries supply hand-derived schedules for known operators while auto-scheduling trains an agent over a cost model to find one. Code generation emits target-specific source — LLVM for CPU, CUDA for NVIDIA, and backends for others — compiled into a shared library and packaged with an executable graph. TVM Runtime loads that library, owns memory planning, and executes the graph with an executor supporting graph tuning, which lets a deployment adjust kernel selection per input shape without recompiling.

## Ecosystem Position

TVM sits alongside XLA as the two general-purpose deep-learning compilers, and the distinction is instructive: XLA fuses within a graph for targets it knows well, while TVM exposes the schedule and the search explicitly, which is what makes it applicable to a new accelerator. It overlaps with IREE, a compiler and runtime spun out of the same project and now the main path for on-device deployment, and with Halide, which pioneered the compute and schedule split. Against a serving engine such as vllm, sglang, or tensorrt-llm it is a different layer entirely: those fuse for performance using hand-tuned and heuristic pipelines, whereas TVM is the general machinery that could generate such kernels. Compared to writing a custom kernel with a vendor API it is an alternative that trades implementation effort for compiler complexity, and it complements tensorrt rather than replacing it, since TensorRT fuses a frozen graph for one GPU family.

## Getting Started

Compile a small elementwise-plus-relu network for the LLVM CPU target and save the built module:

```bash
git clone --recursive https://github.com/apache/tvm && cd tvm
mkdir -p build && cp cmake/config.cmake build/
cd build && cmake .. && make -j
```

```python
import tvm
from tvm import te

n = 1024
A = te.placeholder((n,), name="A")
k = te.reduce_axis((0, n), name="k")
B = te.compute((n,), lambda i: te.sum(A[k] * A[k], axis=k), name="B")
s = te.create_schedule(B.op)
s[B].parallel(te.fuse(s[B].fuse, s[B].axis[0]))
s[B].vectorize(s[B].axis[0])

mod = tvm.build(s, [A, B], target="llvm", name="sqnorm")
import numpy as np
mod(np.ones(n, dtype="float32"), np.empty(n, dtype="float32"))
```

The schedule lines are the tuning surface — that is the whole point of the design.

## Key Use Cases

1. Adding kernel generation for a custom accelerator by implementing a Target, a schedule space, and codegen, instead of maintaining per-model device code.
2. Cutting inference latency on a fixed deployment target through automated schedule search over tiling, fusion, and layout.
3. Shipping a compiled model to a device through TVM Runtime, where the artefact is a graph plus a library rather than a framework process.
  

## Strengths

- Portable across targets: one graph and one search infrastructure produce specialised code for CPU, GPU, and custom hardware.
- Schedule search is automatable, so latency tuning stops being a bespoke per-target engineering project.
- The graph and schedule split is the clearest published statement of how modern kernel compilers reason about performance.
- TVM Runtime is a small standalone C ABI, so deployed artefacts carry no framework dependency.
  

## Limitations

The learning curve is real: schedules, loop nests, memory layouts, and lowering bugs are a compiler skill set, not a Python one, and debugging a miscompiled kernel is much harder than debugging a model. Build and compile times are long, and the autotuning step multiplies that, so iteration is slower than editing eager code. TVM releases are irregular and the API shifts between major versions, so pinning and upgrading are genuine work, and some model coverage in the higher-level flows trails the PyTorch path. It is also the wrong tool for the majority of teams: if vllm or TensorRT already meets your latency target, adopting a compiler is a large investment for a gain you may not need. Performance gains from auto-scheduling are workload-specific and can be negligible on operators that are already well-optimised upstream.

## Relation to the Arsenal

This is the compiler-layer entry in content/projects/inference-engines and the read to do before onnxruntime, openvino, and nvidia-tensorrt, since those are runtime-level implementations of the same problem for a narrower target. The ggml entry in the same folder takes the opposite hand-written-C route to the same latency goal, which makes it a useful contrast in design philosophy. Against vllm and sglang this is the substrate rather than a competitor, and against the framework entries in content/projects/frameworks it is the export path where a model stops being a graph and becomes code for one specific machine.

## Resources

- [Apache TVM documentation](https://tvm.apache.org/docs/)
- [Apache TVM GitHub repository](https://github.com/apache/tvm)
- [Relax and TensorIR dialect guides](https://tvm.apache.org/docs/arch/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (13,781 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
