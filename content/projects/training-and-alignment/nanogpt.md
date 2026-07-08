---
id: nanogpt
name: "nanoGPT"
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Karpathy's minimal ~600-line GPT training repository — the canonical starting point for understanding LLM pretraining"
github_url: "https://github.com/karpathy/nanoGPT"
license: "MIT"
primary_language: Python
org_or_maintainer: "Andrej Karpathy"
tags: [training, llm, foundational]
maturity: production
cost_model: open-source
github_stars: 60962
github_stars_last_30d: 0
trending_score: 50
last_commit: "2025-11-12"
docs_url: "https://github.com/karpathy/nanoGPT#readme"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [community-driven, research-origin]
ecosystem_role:
  - "The canonical minimal GPT pretraining codebase: ~300 lines of model and ~300 lines of training loop that reproduce GPT-2 (124M) on OpenWebText, forked thousands of times as the substrate for training experiments and the speedrun community."
best_for:
  - "You want to understand exactly what LLM pretraining does — the whole stack (model, data loader, training loop, DDP) fits in two readable files"
  - "You are running small-scale architecture or optimizer experiments — its simplicity makes it the standard fork target (the nanoGPT speedrun ecosystem measures training-efficiency research against it)"
avoid_if:
  - "You need production fine-tuning of modern instruction models — it implements GPT-2-era architecture only (no RoPE, GQA, SwiGLU out of the box)"
  - "You need multi-node scale-out or modern parallelism — it stops at simple DDP; use LitGPT, torchtune, or Megatron-class stacks beyond one node"
upstream_dependencies: []
downstream_consumers: []
alternatives: [litgpt]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count, license, and last commit verified via the GitHub API on 2026-07-08. Deliberately minimal and infrequently updated by design — 'simplest, fastest repository for training/finetuning medium-sized GPTs'; low commit frequency is not a health concern for a reference implementation."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/karpathy/nanoGPT", "date": "2026-07-08", "description": "60,962 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A deliberately minimal repository for training GPT-2-class models: plain PyTorch, no framework, a single model file and a single training script that reproduce GPT-2 124M on OpenWebText in about four days on one 8xA100 node. Its value is pedagogical and experimental — it is the reference codebase people fork when they want to change something fundamental about training.

## Why it's in the Arsenal

The canonical minimal GPT pretraining codebase: ~300 lines of model and ~300 lines of training loop that reproduce GPT-2 (124M) on OpenWebText, forked thousands of times as the substrate for training experiments and the speedrun community. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want to understand exactly what LLM pretraining does — the whole stack (model, data loader, training loop, DDP) fits in two readable files. See Strengths / Limitations below before adopting it.

## Architecture

model.py implements a standard pre-norm decoder-only transformer (learned positional embeddings, GELU MLP) with optional Flash Attention via PyTorch SDPA; train.py handles gradient accumulation, mixed precision, DDP, cosine LR decay, and checkpoint resume. Everything else (data prep, sampling, eval) is small standalone scripts — the absence of abstraction is the design.

## Ecosystem Position

Upstream: PyTorch only. Downstream: an entire genre of forks — modded-nanoGPT speedruns (where optimizer research like Muon surfaced), architecture-ablation studies, and countless educational derivatives. Competing: LitGPT for maintained multi-architecture training; Karpathy's own llm.c for the C/CUDA rewrite. It pairs naturally with the Zero To Hero lecture series.

## Getting Started

```bash
git clone https://github.com/karpathy/nanoGPT && cd nanoGPT
pip install torch numpy transformers datasets tiktoken wandb tqdm
python data/shakespeare_char/prepare.py
python train.py config/train_shakespeare_char.py
```

## Key Use Cases

1. **Scenario**: you want to understand exactly what LLM pretraining does — the whole stack (model, data loader, training loop, DDP) fits in two readable files
2. **Scenario**: you are running small-scale architecture or optimizer experiments — its simplicity makes it the standard fork target (the nanoGPT speedrun ecosystem measures training-efficiency research against it)

## Strengths

- You want to understand exactly what LLM pretraining does — the whole stack (model, data loader, training loop, DDP) fits in two readable files
- You are running small-scale architecture or optimizer experiments — its simplicity makes it the standard fork target (the nanoGPT speedrun ecosystem measures training-efficiency research against it)

## Limitations

- You need production fine-tuning of modern instruction models — it implements GPT-2-era architecture only (no RoPE, GQA, SwiGLU out of the box)
- You need multi-node scale-out or modern parallelism — it stops at simple DDP; use LitGPT, torchtune, or Megatron-class stacks beyond one node

## Relation to the Arsenal

This is a training-and-alignment entry: it documents a training/fine-tuning/alignment stack you run yourself. For managed fine-tuning paths and adjacent tooling, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/karpathy/nanoGPT)
- [Documentation](https://github.com/karpathy/nanoGPT#readme)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (60,962 stars, last commit 2025-11-12, verified via GitHub API on 2026-07-08)*
