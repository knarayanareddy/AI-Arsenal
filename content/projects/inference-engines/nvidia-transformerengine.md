---
id: nvidia-transformerengine
name: "TransformerEngine"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "NVIDIA library of fused transformer primitives with FP8 and FP4 GEMM paths, low-precision attention, and framework plugin integration"
github_url: "https://github.com/NVIDIA/TransformerEngine"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "NVIDIA"
tags: [pytorch, transformers]
maturity: production
cost_model: open-source
github_stars: 3554
github_stars_last_30d: 0
trending_score: 28
last_commit: "2026-09-25"
docs_url: "https://docs.nvidia.com/deeplearning/transformer-engine/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Transformer primitives with FP8/FP4 paths and fused kernels for NVIDIA GPUs, supplying the low-precision building blocks training and inference stacks share."
best_for:
  - "You are training or serving large transformer models on Hopper, Ada, or Blackwell and need FP8 or FP4 GEMM with correct scaling."
  - "You want the low-precision path without hand-writing quantization logic, since the fused kernels own the scale and the amax history."
  - "You need the same numerics in training and inference, so a checkpoint trained at FP8 does not shift behavior when served at FP8."
avoid_if:
  - "You are on AMD, Intel, or Apple Silicon, since the library is built on NVIDIA's FP8 and FP4 tensor core instructions."
  - "Your model is small enough that FP16 already fits, since the added complexity and the calibration step rarely pay off there."
  - "You need portable numerics across vendors, since recipes tuned through this library will need a different low-precision path elsewhere."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (3554), Apache-2.0 license, last commit 2026-09-25, primary language Python, and all ten topics were read from the GitHub API. Scaling modes, amax history and delayed scaling, the fused module set, framework integrations, and checkpoint state come from the official README and user guide; no FP8 run was executed on GPU here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/TransformerEngine", "date": "2026-09-28", "description": "3,554 stars and last commit 2026-09-25 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

TransformerEngine is a library that accelerates transformer models on NVIDIA GPUs by providing fused and low-precision implementations of the operations that dominate them. The core is a GEMM API that takes unquantized fp32 or bf16 inputs and quantizes them inside the kernel to FP8 or FP4, applying the scaling strategy you configure: per-tensor, per-row, or per-block, and keeping an amax history so the scaling factor is derived from observed ranges rather than a static constant. Around that sit fused modules for LayerNorm, GeLU, SwiGLU, multi-head and grouped-query attention, normalization, and residual add, plus a fused RMSNorm path. The library ships framework integrations for PyTorch and JAX, so a linear or normalization layer in an existing model can be swapped without rewriting surrounding code, and it exposes FP8 training recipes and checkpoint-aware state for resuming low-precision runs.

## Why it's in the Arsenal

The recurring decision is whether a low-precision path is worth the numerical risk, and the answer usually depends on scaling rather than the format itself. Naive quantization to FP8 without a properly derived scale either overflows on outlier activations or throws away precision on a channel that needed it, and a model that trains stably in bf16 can diverge into NaNs within a few hundred steps. Owning the scaling inside the kernel, with per-block strategies and an amax history that tracks range drift, is what converts FP8 from a lossy experiment into a default. The second benefit is the numerics being identical between training and inference, so a checkpoint carries its scale state and does not need recalibration at serving time.

## Architecture

The GEMM entry points dispatch to cuBLAS FP8 and FP4 matrix multiply paths with a scaling mode selected at call time, and the wrapper handles the quantization of inputs to the block granularity, the reduction of partial amax values across the tensor-parallel group, and the update of the scaling history buffer. Fused modules compose GEMM with the surrounding elementwise operations inside one kernel, so activation, normalization, and residual add do not round-trip through global memory. A delayed-scaling mode accumulates amax over a configurable number of steps before recomputing scale, which bounds the memory cost of tracking history. The PyTorch integration registers linear and normalization layers that consult a global configuration for recipe, FP8 format, and margin, and checkpoint save and load serialize the amax history so a resumed run keeps its statistics instead of restarting them.

## Ecosystem Position

TransformerEngine overlaps with DeepSpeed, Megatron-LM, and torchao, all of which expose low-precision paths, but they are layers above it: each of those can be configured to take its GEMM and fused attention from this library rather than implementing its own. It is a rather than an alternative to a pure PyTorch or Triton implementation, since the reason to adopt it is precisely that the scaling and fused-kernel work is done and maintained against new GPU architectures. It is a complement to FlashInfer, which owns the attention and sampling kernel layer; the two address the same throughput goal from different angles and appear together in a tuned inference engine. Compared to cuBLAS FP8 directly, it is a higher-level contract that handles scaling state and framework wiring, which is what you want for a whole transformer rather than a single matmul. It also overlaps with a framework's own automatic mixed-precision implementation, which is what the project generally replaces.

## Getting Started

Install the library and put a layer on the FP8 recipe:

```bash
pip install transformer_engine[pytorch]   # or transformer_engine[jax]
```

```python
import torch
import transformer_engine.pytorch as te

te.fp8_quantization = te.Fp8Quantization(
    fp8_format=te.Format.HYBRID,     # e4m3 for fwd, e5m2 for grad
    fp8_margin=0,                    # scale margin on the amax history
    fp8_amax_history_len=1024,       # amax window for delayed scaling
    fp8_amax_compute_algo=te.MaxHistory,
)

Linear = te.LayerNormLinear(
    d_in=4096, d_out=4096,
    tp_size=1, tp_group=None,        # tensor-parallel group
    init_method="xavier_uniform",
    bias=False, fuse_wgrad_accumulation=True,
)
y = Linear(x)
```

```bash
# framework-level recipes and reference training configs live under examples/
python -m transformer_engine.pytorch.performance --check-fp8 --fp8-dtype e4m3
# set the training recipe explicitly, and verify per-layer amax rather than trusting defaults
NVTE_FP8_MAX_TOKENS=4096 NVTE_FP8_MAX_INTERVAL=1000 python train.py
```

Budget memory for the amax history: it scales with model width times the history length, which is not negligible on a wide model.

## Key Use Cases

1. FP8 or FP4 training of a large transformer on Hopper, Ada, or Blackwell where bf16 memory or bandwidth is the binding constraint.
2. A low-precision inference path that reuses the training-time scaling state, avoiding a separate post-training quantization step.
3. Incremental adoption, since individual linear and normalization layers are swapped, so a team can convert one block and measure before converting the model.

## Strengths

- FP8 and FP4 GEMM with per-tensor, per-row, and per-block scaling strategies, so precision loss is managed rather than assumed.
- Fused GEMM plus activation, normalization, and residual paths, which removes intermediate memory traffic on the operations that dominate a transformer.
- Identical numerics in training and inference, with amax history serialized so a checkpoint resumes with its statistics intact.
- PyTorch and JAX integration that swaps individual layers, so adoption does not require rewriting the surrounding model code.

## Limitations

The library is tied to NVIDIA architectures with the required tensor core instructions, so FP4 support is confined to the newest parts and there is no portable equivalent. FP8 training is genuinely finicky: the default recipe suits most models but some architectures need margin, a longer amax window, or delayed scaling tuned per layer, and getting that wrong produces NaNs several thousand steps in, far from the cause. The amax history buffers are real memory, and the fused-wgrad accumulation path is hard to debug when it interacts with optimizer state. Compatibility is version-coupled across CUDA, cuBLAS, PyTorch, and GPU architecture, and installing against a mismatch usually fails at build time or, worse, at a kernel dispatch. It also does nothing for non-transformer models, so the investment is specific to one architecture family.

## Relation to the Arsenal

This is an inference-engine phase entry in the same layer as FlashInfer: one supplies low-precision GEMM and fused primitives, the other supplies attention and sampling, and tuned engines use both. The serving engines in the inference-engine phase are the layer that consumes these primitives, and the training-and-alignment phase is where a low-precision fine-tune actually happens. For quantizing an already-trained checkpoint for serving without retraining, a quantization entry in the same catalog is the cheaper path than training in FP8.

## Resources

- [TransformerEngine GitHub repository](https://github.com/NVIDIA/TransformerEngine)
- [TransformerEngine documentation](https://docs.nvidia.com/deeplearning/transformer-engine/)
- [FP8 formats and scaling primer](https://docs.nvidia.com/deeplearning/transformer-engine/user-guide/examples/advanced/fp8_primer.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (3,554 stars, last commit 2026-09-25, license Apache-2.0, verified via GitHub API on 2026-09-28)*
