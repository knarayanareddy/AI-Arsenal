---
id: llamafactory
name: LLaMA-Factory
type: tool
job: [fine-tuning]
description: Unified fine-tuning framework and UI for many LLMs and training methods
url: "https://github.com/hiyouga/LLaMA-Factory"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/hiyouga/LLaMA-Factory"
docs_url: "https://github.com/hiyouga/LLaMA-Factory"
github_url: "https://github.com/hiyouga/LLaMA-Factory"
alternatives: [axolotl, mlx-lm, peft, torchtune, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, prototype]
best_when:
  - You want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
  - You're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI
avoid_when:
  - You need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead)
  - You require long-term, narrowly-scoped production training infra rather than a general-purpose toolkit
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Unified fine-tuning framework and UI for many LLMs and training methods. Open source or free to start. Best for fine-tuning with UI and many model recipes.

## Overview

A unified fine-tuning framework with both a web UI and CLI, supporting a very broad set of open models and training methods so teams can experiment without building custom training scripts.

## Why It's in the Arsenal

LLaMA-Factory earns a place in the Arsenal because it directly addresses a recurring decision point: you want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Web UI for no-code fine-tuning experiments
- Broad model-family and training-method coverage
- Built-in evaluation and export tooling

## Architecture / How It Works

Training jobs are configured through the UI or CLI and dispatched to underlying Transformers/PEFT/DeepSpeed training loops, with results exportable as merged or adapter checkpoints.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring LLaMA-Factory into anything else. The command below runs against the `fine-tuning` job and returns a result you can inspect directly.

```bash
pip install llamafactory
```

Follow the official documentation at https://github.com/hiyouga/LLaMA-Factory for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Scenario**: you want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
2. **Scenario**: you're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI
3. **Scenario where this is NOT the right fit**: you need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead) — evaluate an alternative instead

## Strengths

- You want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
- You're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI

## Limitations / When NOT to Use

- You need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead)
- You require long-term, narrowly-scoped production training infra rather than a general-purpose toolkit

## Integration Patterns

- *Wiring*: adopt LLaMA-Factory as a Python dependency or sidecar service against the `fine-tuning` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `axolotl`, `mlx-lm`, `peft`, `torchtune` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://github.com/hiyouga/LLaMA-Factory)
- [Documentation](https://github.com/hiyouga/LLaMA-Factory)
- [Source](https://github.com/hiyouga/LLaMA-Factory)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*

