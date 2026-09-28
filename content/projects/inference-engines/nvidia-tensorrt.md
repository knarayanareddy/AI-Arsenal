---
id: nvidia-tensorrt
name: "TensorRT"
version_tracked: null
artifact_type: tool
category: llms
subcategory: inference-engines
description: "NVIDIA inference SDK that fuses and specialises a framework graph into an optimised engine plan for one GPU"
github_url: "https://github.com/NVIDIA/TensorRT"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "NVIDIA"
tags: [inference, pytorch, quantization]
maturity: production
cost_model: open-source
github_stars: 13369
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-22"
docs_url: "https://developer.nvidia.com/tensorrt"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "NVIDIA deep-learning inference SDK that fuses and specializes graphs for a specific GPU, converting framework graphs into engine plans for deployment."
best_for:
  - "You have a fixed model on a fixed NVIDIA GPU and need the lowest per-request latency you can get, especially for small models where launch overhead dominates."
  - "You are serving vision or recommendation models at high concurrency and want kernel fusion plus INT8 or FP8 paths without writing custom CUDA."
  - "You need INT8 quantisation with per-tensor or per-channel calibration and want the calibration and engine-building flow handled for you."
avoid_if:
  - "Your model or GPU changes often, because an engine plan is built for one GPU architecture and one software version and has to be rebuilt or repackaged."
  - "You need portability across accelerators, since the engine is NVIDIA-specific where ONNX Runtime or OpenVINO is the portable choice."
  - "You need dynamic batching across many different request shapes, which is what a serving engine such as vllm or sglang is built for instead."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (13369), Apache-2.0, last commit 2026-09-22, C++, and the topic list were API-verified. Build stages, fusion passes, optimisation profiles, precision modes, and the engine-plan portability constraint come from the official developer documentation. The missing-server-functionality and version-coupling notes reflect documented behaviour."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/TensorRT", "date": "2026-09-28", "description": "13,369 stars and last commit 2026-09-22 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

TensorRT is NVIDIA's inference SDK, and this repository holds its open-source components: the network definition API, the parser that ingests ONNX or a framework network definition, the builder, the engine, and the C++ and Python runtime. A build is a multi-stage pipeline. The parser produces a network of layers, the builder applies platform-specific fusions and tactics, and the result is a serialized engine plan optimised for the exact GPU architecture, TensorRT version, and build flags. Key ideas are layer fusion (convolutions, scale, activation, and normalisation merged into single kernels), kernel selection from a per-layer tactic library, precision selection across FP32, FP16, BF16, TF32, INT8, and FP8, and memory-pool reuse so activations never hit the general allocator. The builder config exposes the levers: optimisation profiles for dynamic shapes with min, opt, and max bounds, an INT8 calibration path using a calibrator or entropy calibration, and workspace size limits. TensorRT-LLM is the separate, higher-level layer that adds paged attention, fused attention and MLP kernels, and in-flight batching for LLM serving — the plain SDK is not a language-model server and does not implement continuous batching.

## Why it's in the Arsenal

The recurring decision is how much of your latency budget to hand to a vendor compiler. A framework runtime launches many small kernels, allocates repeatedly, and keeps tensors in layouts convenient for training; each of those costs microseconds that add up when the model is small or the batch is modest. TensorRT resolves this by observing the whole graph at build time and fusing across it, so a convolution-batchnorm-ReLU chain becomes one kernel with one memory write. Because the optimisation is specialised to a known GPU and a known input shape distribution, the result beats a general runtime by a wide margin on that target — at the cost of a build step in your release pipeline and a plan you cannot move to other hardware.

## Architecture

Build time: the parser walks an ONNX graph or a network definition and creates layers with explicit tensor precision. The builder then runs optimisation passes — convolution fusion into scale and activation, pooling and normalisation merges, and a shape-tensor analysis that propagates shapes so fusions are legal. Each layer is assigned a tactic by benchmarking or heuristic against a library of fused kernels, generated or selected for the current SM architecture. Precision flags and calibration data let INT8 or FP8 paths replace FP32 layers where accuracy permits. Finally the engine is serialized as a plan encoding the whole kernel sequence, so runtime execution is a linear walk with no search. Runtime: deserializing the plan with an execution context allocates a device memory pool, and each inference call takes device pointers bound to input tensors. Optimisation profiles map a dynamic dimension to a min, opt, and max range, with the runtime selecting a profile per request shape; padding to the profile bound means a shape outside the declared range fails rather than silently degrading. Execution is synchronous on the stream, so multi-stream concurrency and CUDA graph capture keep a GPU busy when one request does not saturate it.

## Ecosystem Position

TensorRT is the vendor-specific fast path and competes with ONNX Runtime, which is portable across CPU, GPU, and other accelerators, and with OpenVINO, which targets Intel hardware. Against ONNX Runtime the tradeoff is explicit: TensorRT typically wins latency on the GPU it was built for, while ONNX Runtime wins deployability and iteration speed, since building an engine is a real cost. TensorRT-LLM competes with vllm, sglang, and lmdeploy for LLM serving specifically, and those are the right answer when the problem is throughput under continuous batching rather than a fixed-model low-latency call. Compared to a hand-written CUDA kernel it is a portable-enough alternative that removes the maintenance burden, and it is complementary to the ONNX format entry, which is frequently its input.

## Getting Started

Build an engine from an ONNX model with an explicit dynamic-shape profile:

```bash
pip install tensorrt
```

```python
import tensorrt as trt

logger = trt.Logger(trt.Logger.WARNING)
builder = trt.Builder(logger)
network = builder.create_network(1 << int(trt.NetworkDefinitionCreationFlag.EXPLICIT_BATCH))
parser = trt.OnnxParser(network, logger)
parser.parse("model.onnx")

config = builder.create_builder_config()
profile = builder.create_optimization_profile()
profile.set_shape("images", (1, 3, 224, 224), (8, 3, 224, 224), (32, 3, 224, 224))
config.add_optimization_profile(profile)

engine = builder.build_serialized_network(network, config)
open("model.engine", "wb").write(engine)
```

Keep the ONNX file, the profile bounds, and the TensorRT and driver versions in version control, because all four determine the plan's behaviour.

## Key Use Cases

1. A latency-sensitive vision or recommendation service on a known GPU, where per-request time is the product metric and the model changes rarely.
2. INT8 or FP8 deployment of a classifier or detector where a calibration set exists and per-channel accuracy has been measured against the FP16 baseline.
3. An edge or embedded NVIDIA deployment where a single engine file plus the TensorRT runtime is the whole serving stack, with no framework dependency at the destination.

## Strengths

- Fusion and kernel selection at build time deliver the lowest per-request latency for a fixed model on a fixed NVIDIA GPU.
- Built-in INT8, FP8, and FP16 paths with calibration hooks, so quantisation is part of the build rather than a separate project.
- A serialized engine plan means runtime cost is a linear walk with no per-request planning, and no framework needs to ship.
- Strong ecosystem integration: ONNX input, the Python runtime, and TensorRT-LLM for generative models all come from one vendor path.

## Limitations

An engine plan is tied to one GPU architecture, one TensorRT version, and often one driver, so a fleet with mixed hardware needs multiple plans and a build matrix — an operational cost many teams underestimate. Building an engine takes seconds to minutes, which slows iteration and demands a prebuilt-model workflow. Dynamic shapes are supported through optimisation profiles, but a request outside the declared bounds fails rather than falling back, so profile bounds are a correctness risk. The plain SDK is not a server: no request batching, no queueing, no model multiplexing, and you manage your own concurrency with streams or CUDA graphs. INT8 accuracy is per-layer in places, so silent degradation is possible, and NVIDIA-only support rules the engine out wherever the deployment target is not an NVIDIA GPU.

## Relation to the Arsenal

This is the vendor-optimised inference entry in content/projects/inference-engines and the counterpart to onnxruntime and openvino, which is the comparison worth reading next; ONNX is frequently this tool's input format, as the onnx entry in the same folder explains. Against the vllm, sglang, and lmdeploy entries it is the low-latency-for-a-fixed-model counterpoint to continuous-batching servers, and TensorRT-LLM sits between the two. On the training side, the onnxruntime and apache-tvm entries cover export paths and the compiler design that this SDK's fusion passes belong to.

## Resources

- [TensorRT developer documentation](https://developer.nvidia.com/tensorrt)
- [TensorRT GitHub repository](https://github.com/NVIDIA/TensorRT)
- [TensorRT-LLM GitHub repository](https://github.com/NVIDIA/TensorRT-LLM)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (13,369 stars, last commit 2026-09-22, license Apache-2.0, verified via GitHub API on 2026-09-28)*
