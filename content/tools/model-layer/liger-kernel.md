---
id: liger-kernel
name: "Liger Kernel"
type: tool
job: [fine-tuning]
description: "Fused Triton kernels for LLM training (RMSNorm, RoPE, SwiGLU, fused cross-entropy) that cut memory and raise throughput as near drop-in layer replacements"
url: "https://github.com/linkedin/Liger-Kernel"
cost_model: open-source
pricing_detail: "BSD-2-Clause open source; free"
tags: [fine-tuning, training, efficiency]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Free and open source"
self_hostable: true
open_source: true
source_url: "https://github.com/linkedin/Liger-Kernel"
docs_url: "https://github.com/linkedin/Liger-Kernel"
github_url: "https://github.com/linkedin/Liger-Kernel"
alternatives: [unsloth, deepspeed]
integrates_with: [huggingface, trl, axolotl]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production, research]
best_when:
  - "You train/fine-tune Hugging Face LLMs and are memory- or throughput-bound — Liger's fused kernels reduce activation memory and speed up the forward/backward pass"
  - "You want the gains with minimal code change (a one-line model patch) rather than a new training framework"
avoid_when:
  - "Your architecture/layers aren't covered by the provided kernels — you'd get no benefit"
  - "You're not on a supported GPU/Triton stack, or you need bit-exact parity with reference layers for a sensitive experiment"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (6,489), BSD-2-Clause license, and last push (2026-07-06) verified via the GitHub API on 2026-07-08. Throughput/memory claims are the project's; not independently benchmarked here."
verdict: recommended
verdict_rationale: "High-leverage, low-friction training speedup for supported HF models; benefit is bounded to the layers it fuses and the hardware it supports"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/linkedin/Liger-Kernel", "date": "2026-07-08", "description": "6,489 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Liger Kernel (LinkedIn) is a library of fused Triton kernels for common LLM building blocks — RMSNorm, RoPE, SwiGLU, and a memory-efficient fused linear + cross-entropy — designed as near drop-in replacements. Patching a Hugging Face model to use them reduces activation memory and increases training throughput without changing your training loop.

## Why It's in the Arsenal

It earns a place because training memory and throughput are perennial bottlenecks, and Liger delivers gains with a one-line patch rather than a framework migration. It is a comparison point against broader training optimizers in the model-layer phase, not an unconditional recommendation — see Strengths / Limitations.

## Key Features

- Fused Triton kernels: RMSNorm, RoPE, SwiGLU, LayerNorm, fused linear cross-entropy
- One-line monkey-patch for supported Hugging Face model families
- Lower peak activation memory → larger batch/sequence or bigger models on the same GPU
- Composes with TRL, Axolotl, and similar HF-based trainers

## Architecture / How It Works

Standard PyTorch layers launch many small CUDA ops with extra memory traffic. Liger replaces them with hand-written Triton kernels that fuse operations (e.g. computing logits and cross-entropy without materializing the full logits tensor), cutting memory reads/writes and intermediate allocations while preserving the mathematical result.

## Getting Started

```bash
pip install liger-kernel
# from liger_kernel.transformers import apply_liger_kernel_to_llama
# apply_liger_kernel_to_llama()  # then train your HF model as usual
```

## Use Cases

1. **Scenario**: fit a larger batch or longer sequences into fixed GPU memory during fine-tuning
2. **Scenario**: raise tokens/sec on an existing HF training run with minimal changes
3. **Scenario where this is NOT the right fit**: your model uses custom layers Liger doesn't cover — no speedup to gain

## Strengths

- Large memory/throughput gains for supported models
- Minimal integration effort (model patch)
- Interops with the mainstream HF fine-tuning stack

## Limitations / When NOT to Use

- Benefit limited to the specific layers/architectures with kernels
- Requires a compatible GPU + Triton toolchain
- Fused kernels may differ from reference layers at the bit level

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `unsloth` and `deepspeed` before adopting — they overlap on the training-efficiency job.
- Link this tool from job guides using its canonical ID `liger-kernel`.
- Record hardware/toolchain assumptions before production adoption.

## Resources

- [GitHub](https://github.com/linkedin/Liger-Kernel)
- [Documentation / README](https://github.com/linkedin/Liger-Kernel)

## Buzz & Reception

- 6,489 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
