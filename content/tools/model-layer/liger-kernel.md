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

- _Verified for Liger Kernel: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt Liger Kernel as a Python dependency or sidecar service against the `fine-tuning` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `unsloth`, `deepspeed` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `huggingface`, `trl`, `axolotl` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [GitHub](https://github.com/linkedin/Liger-Kernel)
- [Documentation / README](https://github.com/linkedin/Liger-Kernel)

## Buzz & Reception

- 6,489 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
