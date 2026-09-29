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

nanoGPT appears in this catalog as a reference point for the training-and-alignment phase; the useful question is whether the method fits your data scale and hardware budget. The sections below state what it claims to do and what adopting it would commit you to.

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

1. **Sizing the nanoGPT run**: decide data scale and hardware budget before choosing a method, because those two variables eliminate most approaches before quality is ever measured.
2. **What dominates the decision**: `understand`, `exactly`, `pretraining`, `whole` are the variables that actually move the outcome for nanoGPT in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare nanoGPT against `litgpt` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- What nanoGPT gives you that reading the feature list does not: model.py implements a standard pre-norm decoder-only transformer (learned positional embeddings, GELU MLP) with optional Flash Attention via PyTorch SDPA; train.py handles gradient accumulation, mixed precision, DDP, cosine LR decay, and checkpoint resume. Everything else (data prep, sampling, eval) is small standalone scripts — the absence of abstraction is the design, which is the part you have to evaluate against your own workload.
- It is a training-and-alignment entry in this catalog, so the comparison that matters is against the other training-and-alignment projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for nanoGPT is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for nanoGPT at your scale need measuring before this informs a production decision.
- Where nanoGPT overlaps `litgpt`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

This is the training-and-alignment entry for nanoGPT in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/karpathy/nanoGPT)
- [Documentation](https://github.com/karpathy/nanoGPT#readme)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 60962 as of 2026-07-08; last commit 2025-11-12; both verified via the GitHub API.*
