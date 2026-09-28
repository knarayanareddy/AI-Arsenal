---
id: dao-ailab-flash-attention
name: "flash-attention"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "BSD-3-Clause exact-attention kernels that avoid materializing the attention matrix, cutting memory and speeding up sequence length"
github_url: "https://github.com/Dao-AILab/flash-attention"
license: "BSD-3-Clause"
primary_language: Python
org_or_maintainer: "Dao-AILab"
tags: [attention, pytorch, efficiency]
maturity: production
cost_model: open-source
github_stars: 25025
github_stars_last_30d: 0
trending_score: 35
last_commit: "2026-09-28"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "IO-aware exact attention kernels that cut attention memory and time enough to change what context length is servable — upstream of nearly every long-context engine."
best_for:
  - "You are serving long context and run out of memory building the attention matrix, because a blockwise kernel changes memory scaling from quadratic to linear in sequence length."
  - "You are fine-tuning a transformer and want the speedup without changing the model, since these are exact kernels that produce the same attention output as the reference implementation."
  - "You need head dimensions beyond what a stock kernel supports, where multi-query and grouped-query attention variants and the sliding-window kernel cover shapes the default path does not."
avoid_if:
  - "You are on AMD, Intel, or Apple hardware without a supported path, because the fast kernels are CUDA-first and a fallback exists but is not the reason to adopt the library."
  - "You need approximate attention to fit an even longer context, because these kernels are exact and buy headroom rather than trading accuracy for length."
  - "You are deploying to a runtime that only ships a standard attention implementation, since a custom kernel has to be compiled and matched to the serving stack's shape and dtype constraints."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 25025 stars, BSD-3-Clause license, Python primary language, last commit 2026-09-28, empty topics, no homepage. IO-awareness, online softmax, triangular causal scheduling, and the MQA/GQA and sliding-window variants are from the published papers and README; no kernel was compiled or benchmarked in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Dao-AILab/flash-attention", "date": "2026-09-28", "description": "25,025 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

FlashAttention is a family of fused attention kernels that compute the same output as a reference attention implementation while never materializing the full attention matrix in memory. The insight is IO-aware: instead of writing intermediate tiles of the score matrix to HBM and reading them back for the softmax, each block keeps its score tile in on-chip shared memory, applies the online softmax update, and accumulates into the output accumulator, so global memory traffic is reduced by orders of magnitude and the operation becomes memory-bound rather than launch- and bandwidth-bound. The repository ships multiple generations, each with a forward and backward kernel: the second version tiles for both the forward and the backward pass with a parallelization scheme over query blocks that improved GPU utilization substantially, the third reorganizes the work across thread blocks and warp specialisation for Hopper-class hardware, and separate paths handle multi-query and grouped-query attention, the causal case, and a sliding-window variant. Because the computation is exact, a model using these kernels is numerically equivalent to one using the naive path, only faster and with a much smaller memory footprint.

## Why it's in the Arsenal

The recurring decision this library resolves is where the quadratic memory wall is felt in practice. In a naive attention implementation, the score matrix of size sequence-length-squared times heads times batch is the largest tensor in the model, and for long contexts it dominates memory and is written and reread several times, so both memory capacity and bandwidth - not arithmetic - are what limit you. Fusing the tiles so the softmax happens on-chip removes that traffic, which is why the speedups are large and why they scale with sequence length rather than being a constant factor. The second decision is exactness: every design in the family deliberately avoids approximation, so a team can adopt the kernels without a quality argument and without a different accuracy story to defend. The third is that the backward pass is engineered as carefully as the forward, which is what made the library usable for training rather than inference only - and a training speedup compounds across every future run.

## Architecture

The kernels are written in CUDA and built through a compilation path that targets the architecture in use. In the forward pass, a block of queries loads its Q tile and iterates over K and V tiles for the keys it attends to; for each K tile it computes scores on-chip, applies the online softmax update by rescaling the running accumulator and statistics rather than normalizing twice, and accumulates the corresponding V tile into the output. For the causal case, the loop is triangular and query blocks are assigned to thread blocks according to a schedule that balances the causal workload across the GPU, which is where a large part of the speedup over the first version came from. The backward pass recomputes the score tiles from Q, K, V, and the saved output and log-sum-exp statistics, so no score matrix is ever stored; gradients for Q, K, and V are accumulated in separate passes. Variants exist for multi-query and grouped-query attention, where several query heads share one key-value head so the K and V tiles are loaded once and reused, a sliding-window version that bounds the key range, and heads beyond the supported dimension handled by splitting. Python bindings expose the kernels as drop-in functions, and the ecosystem reaches them through most deep learning frameworks, which select them when a request's shape and dtype qualify.

## Ecosystem Position

FlashAttention is upstream of nearly every long-context engine and training stack, and compared with the PyTorch scaled-dot-product attention it replaces, it is the same mathematical function with a different memory schedule - so it is not a competing library but a kernel that frameworks adopt. It overlaps with other memory-efficient and sparse attention implementations, where the distinction is exactness: approximate and sparse variants trade accuracy or coverage for length, while this family trades nothing. It is an alternative to shortening the context, which is what most teams reach for first, and it is rather than a serving engine or a training framework - compared with those in content/projects/inference-engines/, this is the layer underneath them, and most of them already use it. The model-definition layer in content/projects/frameworks/ is where a model is configured to use the kernel, and the serving engines decide which requests qualify. It complements the vision kernels in content/projects/agent-systems/ only in the sense that both exploit hardware locality, and it composes with them the same way. The practical consequence: enabling these kernels is usually the first thing to try when a long-context request OOMs, because the fix is usually in a backend flag rather than in code.

## Getting Started

Build the package against your CUDA toolkit and check the forward path against the reference implementation:

```bash
git clone https://github.com/Dao-AILab/flash-attention.git
cd flash-attention
python3 -m pip install .
```

```python
import torch
import flash_attn

q = torch.randn(4, 2048, 8, 64, device="cuda", dtype=torch.float16)
out = flash_attn.flash_attn_qkvpacked_func(q, q, q, causal=True)
print(out.shape)
```

In practice most teams enable it through their framework's attention implementation setting rather than calling the kernels directly.

## Key Use Cases

1. Serving long context where the naive attention matrix is the largest memory allocation, and a linear-in-length memory schedule is the difference between fitting and not.
2. Fine-tuning a long-sequence model where the backward pass is the bottleneck and a fused backward kernel cuts step time across every subsequent run.
3. A model using grouped-query or multi-query attention, where sharing one key-value head across query heads makes the K and V tile loads amortize across heads and the dedicated kernel path realizes that.

## Strengths

- Exact attention with the same output as the reference implementation, so adoption needs no quality argument and no change to model behavior.
- Memory scaling becomes linear rather than quadratic in sequence length, which changes what context lengths are servable rather than merely making them faster.
- Memory-bandwidth-bound rather than launch-bound, so the speedup grows with sequence length instead of saturating at a constant factor.
- A backward kernel engineered to the same standard, so the benefit applies to training as well as inference and compounds over a project.

## Limitations

CUDA-first: the fast paths target NVIDIA GPUs, and other hardware either falls back to a slower implementation or has no path at all, so portability is a real constraint. The kernels are hand-tuned to specific head dimensions, dtypes, and sequence-length regimes, and a shape outside the supported set either fails or silently uses a slower path, which makes a matrix of model shapes a deployment variable. Compilation is not free - the build compiles for target architectures and the wheels are built per CUDA version, so a mismatched environment is a common first-hour problem. Because attention is exact rather than approximate, it improves what fits but does not change the fundamental cost of processing a very long sequence, so extreme contexts still need a different algorithm. And it is a kernel library, not a model system: adopting it correctly means understanding which requests your serving stack actually routes through the fast path.

## Relation to the Arsenal

The kernel layer underneath the long-context work in the Arsenal: the serving engines in content/projects/inference-engines/ and the training frameworks in content/projects/frameworks/ both select these kernels as an attention implementation, so this entry is a dependency of those rather than an alternative to them. The checkpoints it makes trainable and servable live in content/projects/foundation-models/, and the evaluation entries in content/projects/evaluation/ are where you would measure whether a longer context actually improved a metric rather than assuming it. Where the array frameworks in this batch compete for the same hardware with a different programming model, this is the specialized implementation of one operation for one vendor's GPUs. The ordering to keep in mind: reach for a shorter context or an approximate attention scheme when length is the problem, and reach for this when memory capacity and bandwidth are.

## Resources

- [GitHub — Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention)
- [FlashAttention paper on arXiv](https://arxiv.org/abs/2205.14135)
- [FlashAttention-2 paper on arXiv](https://arxiv.org/abs/2307.08691)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (25,025 stars, last commit 2026-09-28, license BSD-3-Clause, verified via GitHub API on 2026-09-28)*
