---
id: mlx-lm
name: MLX-LM
type: tool
job: [fine-tuning]
description: Apple MLX library for running and fine-tuning LLMs on Apple Silicon
url: "https://github.com/ml-explore/mlx-lm"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, local]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/ml-explore/mlx-lm"
docs_url: "https://github.com/ml-explore/mlx-lm"
github_url: "https://github.com/ml-explore/mlx-lm"
alternatives: [axolotl, llamafactory, peft, torchtune, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [prototype, research]
best_when:
  - You're developing or fine-tuning LLMs locally on Apple Silicon (M-series) hardware and want native performance
  - You want fast local iteration without needing a CUDA GPU or cloud spend
avoid_when:
  - You need to deploy or fine-tune at scale on NVIDIA GPU clusters (use Axolotl/Unsloth/torchtune there instead)
  - Your team's hardware is not Apple Silicon
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Apple MLX library for running and fine-tuning LLMs on Apple Silicon. Open source or free to start. Best for Apple Silicon local fine-tuning.

## Overview

Apple's MLX-based library for running and fine-tuning LLMs natively on Apple Silicon, taking advantage of unified memory architecture instead of requiring a discrete CUDA GPU.

## Why It's in the Arsenal

MLX-LM earns a place in the Arsenal because it directly addresses a recurring decision point: you're developing or fine-tuning LLMs locally on Apple Silicon (M-series) hardware and want native performance. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Native Apple Silicon (M-series) acceleration
- Supports both inference and LoRA-style fine-tuning
- Lightweight, Python-first API

## Architecture / How It Works

Built on Apple's MLX array framework, which is designed around unified memory, so the same machine's memory is shared between CPU and GPU/Neural Engine compute without explicit data transfer.

## Getting Started

```bash
pip install mlx-lm
```

## Use Cases

1. **Scenario**: you're developing or fine-tuning LLMs locally on Apple Silicon (M-series) hardware and want native performance
2. **Scenario**: you want fast local iteration without needing a CUDA GPU or cloud spend
3. **Scenario where this is NOT the right fit**: you need to deploy or fine-tune at scale on NVIDIA GPU clusters (use Axolotl/Unsloth/torchtune there instead) — evaluate an alternative instead

## Strengths

- You're developing or fine-tuning LLMs locally on Apple Silicon (M-series) hardware and want native performance
- You want fast local iteration without needing a CUDA GPU or cloud spend

## Limitations / When NOT to Use

- You need to deploy or fine-tune at scale on NVIDIA GPU clusters (use Axolotl/Unsloth/torchtune there instead)
- Your team's hardware is not Apple Silicon

## Integration Patterns

- *Wiring*: adopt MLX-LM as a Python dependency or sidecar service against the `fine-tuning` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `axolotl`, `llamafactory`, `peft`, `torchtune` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://github.com/ml-explore/mlx-lm)
- [Documentation](https://github.com/ml-explore/mlx-lm)
- [Source](https://github.com/ml-explore/mlx-lm)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*

