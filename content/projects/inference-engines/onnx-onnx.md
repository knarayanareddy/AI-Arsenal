---
id: onnx-onnx
name: "onnx"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "Versioned serialization format and operator schema for ML graphs, plus checker and shape-inference tooling"
github_url: "https://github.com/onnx/onnx"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "onnx"
tags: [onnx, inference]
maturity: production
cost_model: open-source
github_stars: 21539
github_stars_last_30d: 0
trending_score: 35
last_commit: "2026-09-27"
docs_url: "https://onnx.ai/onnx/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "The interchange format for machine-learning graphs — the contract that lets a model trained in one framework run through many runtimes and accelerators."
best_for:
  - "You trained a model in PyTorch and must hand it to a team whose runtime is C++ or Java, or to a mobile target, without shipping a Python process."
  - "You publish model artifacts and want a format whose compatibility rules are written down in a versioned operator set rather than implied by a framework release."
  - "You are replacing a legacy TorchScript or SavedModel pipeline and need an intermediate format with a schema checker to validate the conversion before rollout."
avoid_if:
  - "Your graph relies on custom control flow or an operator that has no ONNX standard schema, because export will silently fall back to custom-domain nodes no runtime implements."
  - "You need to train or fine-tune through this artifact, since onnx is a serialization and shape-inference layer with no backward pass."
  - "Your model is small and the team is all Python, since torch.export plus a direct PyTorch path removes an entire conversion step."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (21539), Apache-2.0 license, last commit 2026-09-27, Python as primary language and the topic list were API-verified. Opset history, external-data requirements, and converter names come from the official documentation and spec, not from hands-on runs of this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/onnx/onnx", "date": "2026-09-28", "description": "21,539 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

onnx defines a protobuf-serialised model format built from a GraphProto of NodeProto operators, ValueInfoProto type/shape annotations, and TensorProto initializers holding the weights, with a top-level ModelProto carrying an opset_import table that pins the operator version each node was written against. The Python package ships onnx.helper for building graphs programmatically, onnx.checker for structural validation, onnx.shape_inference for propagating dimensions, onnx.numpy_helper and onnx.reference for interop with NumPy and a pure-Python operator reference implementation, and the onnxscript package for expressing graphs in Python source. Opset versioning is the central discipline: opset 1.8 is effectively the floor for modern use, 13 introduced a series of shape and Reduce semantics changes, and 17 through 23 cover the quantised linear-algebra operators. Large models must move weights out of the single protobuf into an external data file referenced by TensorProto.external_data.

## Why it's in the Arsenal

The recurring decision is artifact portability across a runtime boundary you do not control. Without a shared format, a model trained in framework X has to be re-exported and separately validated for every target runtime, and the failure surfaces late — at the deployment step, on the target hardware, with a different accuracy number. onnx moves that risk to export time: a graph that passes onnx.checker and shape inference is a graph whose structural assumptions every conformant runtime agrees on, so the same bytes can be handed to a server team, an edge device vendor, and a hardware compiler without three separate conversions.

## Architecture

The format is a graph IR, not a runtime. A ModelProto holds a single GraphProto whose nodes reference named values; initializers supply constant tensors, and ValueInfoProto entries attach dtype and shape to every intermediate so consumers can plan memory before executing. The checker walks the graph verifying that every input is produced or declared and that each node's attributes type-check against its operator's schema, including version-conditional field constraints. Shape inference is a separate multi-pass analysis that propagates dimensions through each operator, inserts inferred ValueInfoProto entries, and can expand subgraphs so control flow is analysable. On top of this sits the exporter ecosystem: torch.onnx.export in PyTorch, tf2onnx from TensorFlow, skl2onnx for scikit-learn, and onnxmltools for converters, each of which lowers its framework graph to standard or custom-domain ONNX nodes. Weights above 2 GB must be externalised, and initializers can be re-pointed to a memmap'd file without rewriting the graph.

## Ecosystem Position

onnx is a format, so it does not compete with runtimes; it competes with the older serialisation conventions it replaced. It is a direct alternative to TorchScript, whose Python-bound graph froze a framework version into the artifact, and to TensorFlow SavedModel or the Core ML protobuf schema, which are tied to their own ecosystems. ONNX Runtime is the reference consumer of the format, but onnx.ai/onnxruntime and TensorRT are the deploy-side options where speed matters, and OpenVINO, MNN, ncnn, and Core ML tooling are the other backends. Compared to XLA or NVRTC as a portability target, onnx is a graph interchange standard rather than a just-in-time compiler, and it complements rather than duplicates vllm or sglang, which serve token generation through their own model runners.

## Getting Started

Export a trained PyTorch model, then validate that the graph is structurally sound before anyone tries to run it:

```bash
pip install onnx onnxruntime
```

```python
import torch, onnx
from onnx.checker import check_model

model = torch.nn.Linear(8, 2).eval()
dummy = torch.randn(1, 8)
torch.onnx.export(
    model, (dummy,), "linear.onnx",
    input_names=["x"], output_names=["logits"],
    dynamic_axes={"x": {0: "batch"}, "logits": {0: "batch"}},
    opset_version=17,
)
check_model("linear.onnx")
```

Then sanity-check numerics against PyTorch with onnxruntime.InferenceSession before optimising for any hardware backend.

## Key Use Cases

1. Shipping a trained model into a C++ or Java service that has no Python runtime and no framework licence, by exporting once and consuming with ONNX Runtime.
2. Building a model registry where a build gate runs onnx.checker plus shape inference to reject exports with dynamic-shape or op-version mismatches before release.
3. Handing a graph to hardware tooling for fusion — TensorRT, OpenVINO, or a vendor compiler — which reads ONNX as its canonical input rather than a framework checkpoint.

## Strengths

- Operator semantics are pinned by opset version, so an artifact's behaviour is reproducible independent of the exporting framework's release cadence.
- The checker and shape-inference pass catch structural and dimensional errors at export time instead of at the target deployment.
- A large body of converters exists (torch.onnx, tf2onnx, skl2onnx, onnxmltools), making it a common denominator for heterogenous model estates.
- External-data initialisers keep multi-gigabyte weights out of the protobuf and allow memory-mapped loading.

## Limitations

Coverage is the recurring trap. Operators added by a framework faster than the opset absorbs them export as custom-domain nodes that no standard runtime implements, and quantised ops such as the QLinear* and MatMulInteger family have uneven backend coverage, so an INT8 export may load but fall back or fail. Control flow written with Python branching does not map cleanly, and dynamic shapes force an eager-mode contract that many backends optimise poorly. ONNX itself is only the format: there is no execution, scheduling, or serving layer, and you still need ONNX Runtime or a vendor runtime. Converter versions lag framework releases, so you will occasionally pin an older torch during export, and an Apache-2.0 format licence does not clear the licences of the weights inside it.

## Relation to the Arsenal

This entry is the format contract that sits between content/projects/inference-engines entries such as onnxruntime, nvidia-tensorrt, and openvino — those consume what onnx defines. On the training side, huggingface-transformers and the serving entries in content/projects/inference-engines assume the runtime has already resolved graph semantics. For local CPU inference of language models, llama-cpp and ollama take a different path that bypasses graph IR entirely, which is worth reading next to understand what the format buys and costs.

## Resources

- [ONNX documentation and operator sets](https://onnx.ai/onnx/)
- [ONNX GitHub repository](https://github.com/onnx/onnx)
- [ONNX Runtime documentation](https://onnxruntime.ai/docs/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (21,539 stars, last commit 2026-09-27, license Apache-2.0, verified via GitHub API on 2026-09-28)*
