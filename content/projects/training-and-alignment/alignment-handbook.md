---
id: alignment-handbook
name: The Alignment Handbook (Hugging Face)
version_tracked: null
artifact_type: library
category: llms
subcategory: fine-tuning
description: Hugging Face's reproducible post-training recipes — the exact configs and scripts behind Zephyr-class models for SFT, DPO, and ORPO on open weights
github_url: "https://github.com/huggingface/alignment-handbook"
license: Apache-2.0
primary_language: Python
org_or_maintainer: huggingface
tags: [fine-tuning, rlhf, llm]
maturity: production
cost_model: open-source
github_stars: 5627
github_stars_last_30d: 0
trending_score: 35
last_commit: "2026-05-26"
docs_url: "https://github.com/huggingface/alignment-handbook"
demo_url: null
paper_url: "https://arxiv.org/abs/2310.16944"
paper_id: null
phase: training-and-alignment
domain: [language, safety-and-alignment]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [org-backed, research-origin]
ecosystem_role:
  - "The reference recipes of open post-training: not a framework but the published, reproducible configs (datasets, hyperparameters, multi-stage pipelines) that produced Zephyr and its successors — the closest thing the field has to a canonical answer for 'what settings actually work for SFT then DPO on a 7B model'"
best_for:
  - "Starting a post-training project from known-good hyperparameters — fork the recipe for your model size and method (full SFT, QLoRA, DPO, ORPO) instead of rediscovering learning rates and beta values"
  - "Learning post-training practice by reading working pipelines: each recipe is a complete, runnable account of a published model's training, which no paper's methods section actually provides"
avoid_if:
  - "You want a maintained end-to-end training product — it's a recipe collection over TRL/Accelerate with research-cadence upkeep (last push 2026-05), not a supported framework"
  - "Your target models or methods postdate the recipes — coverage centers on Mistral/Llama-class dense models; newest architectures and RL methods (GRPO-era) live in TRL and newer repos first"
upstream_dependencies: [peft, accelerate]
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (5.6k), Apache-2.0, and last push (2026-05-26) verified via the GitHub API on 2026-07-08. Linked paper is the Zephyr report the recipes reproduce. Below the usual star bar but admitted for its reference-recipe role — its value is canonicity, not adoption volume.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/huggingface/alignment-handbook","date":"2026-07-08","description":"5.6k stars; HF H4 team's published post-training recipes"}
featured: false
status: active
---

## Overview

The Alignment Handbook, from Hugging Face's H4 team, publishes the complete training recipes behind their aligned models — Zephyr 7B onward: YAML configs plus scripts for continued pretraining, SFT, DPO, and ORPO, in full-parameter and QLoRA variants, with the exact datasets, learning rates, and multi-stage sequencing that produced the published checkpoints. It runs on TRL, Accelerate, and PEFT.

## Why it's in the Arsenal

Post-training is hyperparameter-fragile, and the field's dirty secret is that papers rarely publish enough to reproduce results. This repo is the exception that became infrastructure: when practitioners ask "what beta for DPO?" or "SFT epochs before preference tuning?", the handbook's recipes are the standard citation. It anchors the training-and-alignment phase as reference material the framework entries (Axolotl, ms-swift, torchtune) don't provide: known-good numbers.

## Architecture

A thin `alignment-handbook` package over the HF stack: recipes are YAML configs consumed by task scripts (`run_sft.py`, `run_dpo.py`, `run_orpo.py`) that instantiate TRL trainers; Accelerate/DeepSpeed configs handle scale-out; each published model's directory pairs configs with the datasets and evaluation setup used, making runs reproducible end to end.

## Ecosystem Position

Upstream: TRL (trainers), `accelerate` (distribution), `peft` (QLoRA variants). Peers: training frameworks (Axolotl, LLaMA-Factory) that implement methods but don't publish validated recipes; model-specific cookbooks that lack its breadth. Its Zephyr lineage (arXiv:2310.16944) made distilled DPO the default open post-training pattern of its era.

## Getting Started

```bash
git clone https://github.com/huggingface/alignment-handbook && cd alignment-handbook
pip install .
ACCELERATE_LOG_LEVEL=info accelerate launch --config_file recipes/accelerate_configs/multi_gpu.yaml \
  scripts/run_sft.py recipes/zephyr-7b-beta/sft/config_qlora.yaml
```

## Key Use Cases

1. **Scenario**: bootstrapping an SFT→DPO pipeline for a 7B-class model by forking the Zephyr recipe and swapping in your dataset — inheriting validated hyperparameters
2. **Scenario**: teaching or auditing post-training practice — the recipes are complete, runnable ground truth for how published aligned models were actually trained

## Strengths

- Reproducibility as the product: exact configs behind released checkpoints, a rigor level neither papers nor frameworks deliver
- Method breadth with paired full-parameter/QLoRA variants makes compute-tier trade-offs concrete

## Limitations

- Research-cadence maintenance; recipes age as architectures and methods move (the GRPO/RL wave lives elsewhere) — treat it as reference, not tracker
- Assumes HF-stack fluency; it teaches settings, not fundamentals

## Relation to the Arsenal

The recipe layer of the training-and-alignment phase: pair with `rafailov-2023-dpo` (the method it operationalizes), `dettmers-2023-qlora` (its low-compute variants), and the fine-tuning tools (`axolotl`, `ms-swift`, `torchtune`) that implement the same methods framework-style.

## Resources

- [GitHub](https://github.com/huggingface/alignment-handbook)
- [Zephyr paper](https://arxiv.org/abs/2310.16944)
