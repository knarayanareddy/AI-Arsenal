---
id: verl
name: "verl"
version_tracked: null
artifact_type: framework
category: llms
subcategory: frameworks
description: "ByteDance's flexible RL training library for LLMs implementing the HybridFlow paper, powering large-scale GRPO/PPO reasoning runs"
github_url: "https://github.com/volcengine/verl"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Volcengine (ByteDance)"
tags: [alignment, fine-tuning, llm]
maturity: production
cost_model: open-source
github_stars: 22377
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://verl.readthedocs.io/en/latest/"
demo_url: null
paper_url: "https://arxiv.org/abs/2409.19256v2"
paper_id: null
phase: training-and-alignment
domain: [language, reinforcement-learning, reasoning]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, actively-maintained, research-origin]
ecosystem_role:
  - "The RL library behind much of the open reasoning-model wave: verl's HybridFlow design decouples the RL dataflow definition from execution backends, and most open GRPO reasoning reproductions built on it."
best_for:
  - "You are training reasoning models with GRPO/PPO at serious scale — verl is the stack many open o1-style reproductions standardized on, with FSDP/Megatron backends and vLLM/SGLang rollouts"
  - "You need to express non-standard RL dataflows (multi-turn, tool-calling rewards, agentic rollouts) — the hybrid-controller programming model makes custom pipelines first-class rather than forks"
avoid_if:
  - "You want a small-scale alignment run with minimal infrastructure — TRL on a single node covers DPO/PPO without Megatron/FSDP operational overhead"
  - "Your team cannot invest in understanding the hybrid-controller abstraction — the flexibility comes with a steeper learning curve than recipe-style trainers"
upstream_dependencies: [vllm]
downstream_consumers: []
alternatives: [openrlhf, trl]
integrates_with: [vllm, sglang]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (22,377), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/volcengine/verl", "date": "2026-07-08", "description": "22,377 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source RL training library for LLMs from ByteDance's Volcengine team, implementing the HybridFlow architecture: RL algorithms are written as high-level dataflow programs while a hybrid controller maps them onto distributed training (FSDP, Megatron-LM) and inference (vLLM, SGLang) backends. It became the de facto substrate for open reasoning-model training after the GRPO/R1 wave.

## Why it's in the Arsenal

The RL library behind much of the open reasoning-model wave: verl's HybridFlow design decouples the RL dataflow definition from execution backends, and most open GRPO reasoning reproductions built on it. It earns a place in the Arsenal because it directly addresses a recurring decision point: you are training reasoning models with GRPO/PPO at serious scale — verl is the stack many open o1-style reproductions standardized on, with FSDP/Megatron backends and vLLM/SGLang rollouts. See Strengths / Limitations below before adopting it.

## Architecture

The hybrid-controller model splits RL into a single-controller dataflow (the algorithm: rollout, reward, advantage, update) and multi-controller execution (each model's parallelism strategy). 3D-HybridEngine resharding switches the actor between training and generation layouts without full weight copies, which is the main throughput win over naive PPO implementations. Supports PPO, GRPO, DAPO, and multi-turn/agentic RL recipes.

## Ecosystem Position

Upstream: vLLM and SGLang for rollouts; FSDP and Megatron-LM for training parallelism. Competing: OpenRLHF (Ray-centric design) and TRL (single-node simplicity). Downstream: many published open reasoning models and RL recipes (DAPO, multi-turn agent RL) ship as verl configs, making it a reference implementation as much as a tool.

## Getting Started

```bash
git clone https://github.com/volcengine/verl && cd verl
pip install -e .
# Run the PPO quickstart against a small model (see docs/quickstart):
bash examples/ppo_trainer/run_qwen2-7b_seq_balance.sh
```

## Key Use Cases

1. **Scenario**: you are training reasoning models with GRPO/PPO at serious scale — verl is the stack many open o1-style reproductions standardized on, with FSDP/Megatron backends and vLLM/SGLang rollouts
2. **Scenario**: you need to express non-standard RL dataflows (multi-turn, tool-calling rewards, agentic rollouts) — the hybrid-controller programming model makes custom pipelines first-class rather than forks

## Strengths

- You are training reasoning models with GRPO/PPO at serious scale — verl is the stack many open o1-style reproductions standardized on, with FSDP/Megatron backends and vLLM/SGLang rollouts
- You need to express non-standard RL dataflows (multi-turn, tool-calling rewards, agentic rollouts) — the hybrid-controller programming model makes custom pipelines first-class rather than forks

## Limitations

- You want a small-scale alignment run with minimal infrastructure — TRL on a single node covers DPO/PPO without Megatron/FSDP operational overhead
- Your team cannot invest in understanding the hybrid-controller abstraction — the flexibility comes with a steeper learning curve than recipe-style trainers

## Relation to the Arsenal

This is a training-and-alignment entry: it documents a training/fine-tuning/alignment stack you run yourself. For managed fine-tuning paths and adjacent tooling, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/volcengine/verl)
- [Documentation](https://verl.readthedocs.io/en/latest/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (22,377 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*
