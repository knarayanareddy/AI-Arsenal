---
id: open-r1
name: Open R1 (Hugging Face)
version_tracked: null
artifact_type: framework
category: llms
subcategory: fine-tuning
description: Hugging Face's fully open reproduction of the DeepSeek-R1 reasoning pipeline — scripts and recipes to train reasoning models with GRPO-style RL
github_url: "https://github.com/huggingface/open-r1"
license: Apache-2.0
primary_language: Python
org_or_maintainer: Hugging Face
tags: [reasoning, rlhf, fine-tuning]
maturity: beta
cost_model: open-source
github_stars: 26399
github_stars_last_30d: 0
trending_score: 68
last_commit: "2026-04-02"
docs_url: "https://github.com/huggingface/open-r1"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [reasoning, reinforcement-learning]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, research-origin]
ecosystem_role:
  - The open, reproducible recipe for training R1-style reasoning models — SFT on reasoning traces plus GRPO reinforcement learning — turning DeepSeek's closed process into runnable scripts on open weights
best_for:
  - You want to train or study reasoning models with verifiable-reward RL (GRPO) on open models, using recipes that reproduce a known-good pipeline rather than assembling one from papers
  - You need reference dataset-generation and evaluation scripts for the reasoning-model training loop
avoid_if:
  - You just want to use a reasoning model — download an open R1-class checkpoint instead; this is training infrastructure, not a served model
  - You lack the compute for RL post-training — GRPO on capable base models is resource-intensive
upstream_dependencies: [trl, accelerate]
downstream_consumers: []
alternatives: [alignment-handbook, verl]
integrates_with: [trl]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 26.4k stars, Apache-2.0, last push 2026-04-02 verified via the GitHub API on 2026-07-08. Cadence has slowed since the initial R1 reproduction sprint; it remains the canonical open reproduction recipe. Included for reference-recipe value.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending","date":"2026-07-08","description":"26.4k stars; the reference open reproduction of DeepSeek-R1"}
featured: false
status: active
---

## Overview

Open R1 is Hugging Face's effort to fully reproduce the DeepSeek-R1 reasoning-model pipeline in the open: SFT on curated reasoning traces followed by GRPO reinforcement learning with verifiable rewards, plus the dataset-generation and evaluation tooling around it. It packages a known-good reasoning-training recipe as runnable scripts on open weights.

## Why it's in the Arsenal

When R1 showed that RL with verifiable rewards produces strong reasoning, the details were scattered across a report; Open R1 is the community's canonical, runnable answer — the same reference-recipe role `alignment-handbook` plays for SFT/DPO, extended to reasoning RL. It's the practical on-ramp for anyone training or studying R1-style models, and it anchors the reasoning corner of the training-and-alignment phase.

## Architecture

The pipeline has two stages: supervised fine-tuning on reasoning traces to instill format and chain-of-thought, then GRPO (Group Relative Policy Optimization) RL where a verifiable reward (e.g. answer correctness on math/code) shapes the policy without a learned reward model. Open R1 builds on `trl` and `accelerate` for the training loop and ships evaluation scripts to measure reasoning benchmarks — the mechanism that makes results comparable to the target.

## Ecosystem Position

Upstream: `trl` (RL trainers), `accelerate` (distribution), and open base models. Downstream: trained reasoning checkpoints. Complementary: `alignment-handbook` (preference/SFT recipes) and `verl` (a scalable RL training engine) cover adjacent training needs; Open R1 is specifically the R1-reasoning reproduction.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical training and evaluation recipes.
```

## Key Use Cases

1. **Scenario**: training a reasoning model with GRPO on open weights using a recipe that reproduces a known result
2. **Scenario**: studying the SFT-then-verifiable-reward-RL pipeline with real, runnable code

## Strengths

- Reproducible, org-backed recipe for reasoning-model RL — not a from-scratch reassembly of papers
- Ships the surrounding dataset-generation and evaluation tooling, not just a trainer

## Limitations

- Cadence has slowed since the initial reproduction sprint; treat as a reference recipe, not a fast-moving product
- Reasoning RL is compute-heavy; not a lightweight fine-tune

## Relation to the Arsenal

This is a training-and-alignment entry: infrastructure for producing models. For served reasoning models see [Foundation Models](../foundation-models/_index.md); for the underlying RL library see `trl`.

## Resources

- [GitHub](https://github.com/huggingface/open-r1)
