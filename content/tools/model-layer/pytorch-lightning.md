---
id: pytorch-lightning
name: PyTorch Lightning
type: tool
job: [fine-tuning]
description: The organize-don't-abstract PyTorch training framework — LightningModule structures your code while the Trainer owns distribution and checkpointing
url: "https://github.com/Lightning-AI/pytorch-lightning"
cost_model: open-source
pricing_detail: Open source (Apache-2.0); Lightning AI cloud platform is a separate paid product
tags: [training, pytorch, fine-tuning]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Framework fully open source; no usage limits
self_hostable: true
open_source: true
source_url: "https://github.com/Lightning-AI/pytorch-lightning"
docs_url: "https://lightning.ai/docs/pytorch/stable/"
github_url: "https://github.com/Lightning-AI/pytorch-lightning"
alternatives: [accelerate, torchtune]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You train custom models (not just LLM fine-tunes) and want engineering discipline — the LightningModule/Trainer split standardizes checkpointing, logging, precision, and multi-GPU across a research team's codebases
  - Your training code must scale from laptop debugging to multi-node without rewrites, with mature callbacks (early stopping, checkpointing, profilers) instead of hand-rolled equivalents
avoid_when:
  - Your work is exclusively LLM fine-tuning with standard methods — recipe frameworks (Axolotl, LLaMA-Factory, torchtune) encode more domain knowledge per line of your code
  - You want zero framework opinion in your loop — Accelerate keeps you closer to raw PyTorch
version_tracked: null
verdict: recommended
verdict_rationale: The most mature general PyTorch training framework; the right layer for custom-model teams, one layer too general for pure LLM fine-tuning
status: active
---

> **TL;DR:** The standard general-purpose PyTorch training framework. Open source. Best for custom-model training discipline; recipe frameworks beat it for pure LLM fine-tuning.

## Overview

PyTorch Lightning splits training code into a LightningModule (your model, losses, optimizers — pure PyTorch) and a Trainer that owns everything else: device placement, DDP/FSDP/DeepSpeed strategies, mixed precision, gradient accumulation, checkpointing, and logger integrations. The pitch is "organize, don't abstract": research code stays visible while the engineering scaffolding becomes framework-provided and uniform.

## Why It's in the Arsenal

Not every model-layer job is an LLM fine-tune: teams training encoders, diffusion models, rankers, and bespoke architectures need training infrastructure, and Lightning is that category's long-standing default (31k stars, a decade of production use). It anchors the general-training end of the phase, complementing the LLM-recipe frameworks. See Strengths / Limitations below before adopting it.

## Key Features

- Trainer-managed distribution strategies (DDP, FSDP, DeepSpeed) and precision (bf16/fp16) via arguments, not code
- Callback system: checkpointing, early stopping, LR monitoring, profiling — composable and battle-tested
- Logger integrations (W&B, MLflow, TensorBoard) behind one interface
- Fabric, a lower-level sibling API, for teams wanting Accelerate-style minimalism within the Lightning ecosystem

## Architecture / How It Works

The Trainer drives a standardized loop calling your LightningModule hooks (`training_step`, `configure_optimizers`, etc.); strategies encapsulate distributed backends, plugins handle precision/cluster environments, and callbacks observe lifecycle events. Determinism, sanity-checking, and resume-from-checkpoint semantics are framework responsibilities.

## Getting Started

```bash
pip install lightning
```

```python
import lightning as L
trainer = L.Trainer(max_epochs=3, devices=4, strategy="fsdp", precision="bf16-mixed")
trainer.fit(MyLightningModule(), datamodule=dm)
```

## Use Cases

1. **Scenario**: a research team standardizing many custom-model training codebases so any member can run, resume, and scale any project
2. **Scenario**: training non-LLM deep models (vision, audio, ranking, diffusion) where LLM recipe frameworks don't apply but multi-GPU/precision/checkpointing rigor still does
3. **Scenario**: scaling a working single-GPU prototype to multi-node FSDP by changing Trainer arguments
4. **Scenario where this is NOT the right fit**: standard LoRA fine-tuning of an open LLM — recipe frameworks encode the method knowledge you'd otherwise rebuild

## Strengths

- A decade of hardening: edge cases in resume, precision, and distributed training that DIY loops rediscover are already handled
- Uniform structure across projects is a real team-velocity mechanism, not aesthetics
- Scales down (laptop, `fast_dev_run`) as well as up (multi-node) — rare among training frameworks

## Limitations / When NOT to Use

- Hook-based inversion of control: nonstandard training schemes (unusual optimization loops, RL) fight the Trainer's assumptions
- For LLM fine-tuning specifically it knows nothing about templates, PEFT methods, or quantization recipes — you'd reassemble what Axolotl-class tools ship

## Integration Patterns

- Compare against [Accelerate](./accelerate.md) (thinner) and [torchtune](./torchtune.md) (LLM-recipe layer) before adopting — the right choice depends on how custom your training is.
- Logs to [Weights & Biases](./weights-biases.md) or [MLflow](./mlflow.md) via built-in loggers.
- Link this tool from job guides using its canonical ID `pytorch-lightning`.

## Resources

- [Primary site](https://lightning.ai/docs/pytorch/stable/)
- [Documentation](https://lightning.ai/docs/pytorch/stable/)
- [Source](https://github.com/Lightning-AI/pytorch-lightning)

## Buzz & Reception

- 31.2k GitHub stars and sustained active development (verified via the GitHub API, 2026-07-08); one of the most-adopted training frameworks in PyTorch history.

---
*Last reviewed: 2026-07-08 by @maintainer*
