---
id: openrlhf
name: OpenRLHF
version_tracked: null
artifact_type: framework
category: llms
subcategory: frameworks
description: High-performance RLHF/RL training framework built on Ray, vLLM and DeepSpeed for PPO, GRPO and DPO at scale
github_url: https://github.com/OpenRLHF/OpenRLHF
license: Apache-2.0
primary_language: Python
org_or_maintainer: OpenRLHF
tags:
  - fine-tuning
  - alignment
  - llm
maturity: production
cost_model: open-source
github_stars: 9828
github_stars_last_30d: 59
trending_score: 45
last_commit: '2026-07-14'
docs_url: https://openrlhf.readthedocs.io/en/latest/
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain:
  - language
  - reinforcement-learning
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - community-driven
  - actively-maintained
  - research-origin
ecosystem_role:
  - 'The community-standard distributed RLHF stack: it separates actor/critic/reward/reference models across GPUs via Ray and accelerates rollout generation with vLLM, making full-scale PPO practical outside big labs.'
best_for:
  - You need distributed PPO/GRPO/REINFORCE++ on models too large for single-node TRL — OpenRLHF's Ray-based actor separation and vLLM rollout acceleration are built for 7B–70B+ scale
  - You want implementations of newer alignment algorithms (GRPO, REINFORCE++, DPO variants) validated by the community before they land in more conservative frameworks
avoid_if:
  - You are fine-tuning a small model on one node — TRL or Axolotl is far simpler to operate than a Ray cluster
  - You need a stable, long-term-supported API — the framework tracks research fast and interfaces shift between releases
upstream_dependencies:
  - vllm
  - deepspeed
downstream_consumers: []
alternatives:
  - trl
integrates_with:
  - vllm
  - deepspeed
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (9,769), primary language, license, and last commit (2026-07-06) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/OpenRLHF/OpenRLHF
    date: '2026-07-08'
    description: 9,769 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

An open-source RLHF training framework designed around a key bottleneck: reinforcement learning on LLMs spends most wall-clock time on generation, not gradient updates. OpenRLHF schedules actor, critic, reward, and reference models as separate Ray workers and runs rollout generation through vLLM, so PPO-style training scales across nodes without the single-process memory ceiling that limits simpler trainers.

## Why it's in the Arsenal

The community-standard distributed RLHF stack: it separates actor/critic/reward/reference models across GPUs via Ray and accelerates rollout generation with vLLM, making full-scale PPO practical outside big labs. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need distributed PPO/GRPO/REINFORCE++ on models too large for single-node TRL — OpenRLHF's Ray-based actor separation and vLLM rollout acceleration are built for 7B–70B+ scale. See Strengths / Limitations below before adopting it.

## Architecture

Ray orchestrates four model roles (actor, critic, reward, reference) as independent placement groups, each wrapped in DeepSpeed ZeRO for memory efficiency; generation is offloaded to vLLM engines that sync weights from the actor between rollout rounds. Supported algorithms include PPO, GRPO, REINFORCE++, DPO/IPO/cDPO, KTO, rejection sampling, and conditional SFT, all driven from a unified trainer CLI.

## Ecosystem Position

Upstream: vLLM (rollout serving), DeepSpeed (ZeRO sharding), Ray (scheduling). Competing: TRL for single-node/simpler alignment jobs, verl for the ByteDance-flavored RL stack. Complementary: checkpoints export to standard Hugging Face format, so serving and eval stacks downstream are unaffected.

## Getting Started

```bash
pip install openrlhf
# Distributed PPO with vLLM rollouts (see docs for full flags):
ray start --head
python -m openrlhf.cli.train_ppo_ray --pretrain <model> --reward_pretrain <rm> --vllm_num_engines 2
```

## Key Use Cases

1. **Scenario**: you need distributed PPO/GRPO/REINFORCE++ on models too large for single-node TRL — OpenRLHF's Ray-based actor separation and vLLM rollout acceleration are built for 7B–70B+ scale
2. **Scenario**: you want implementations of newer alignment algorithms (GRPO, REINFORCE++, DPO variants) validated by the community before they land in more conservative frameworks

## Strengths

- You need distributed PPO/GRPO/REINFORCE++ on models too large for single-node TRL — OpenRLHF's Ray-based actor separation and vLLM rollout acceleration are built for 7B–70B+ scale
- You want implementations of newer alignment algorithms (GRPO, REINFORCE++, DPO variants) validated by the community before they land in more conservative frameworks

## Limitations

- You are fine-tuning a small model on one node — TRL or Axolotl is far simpler to operate than a Ray cluster
- You need a stable, long-term-supported API — the framework tracks research fast and interfaces shift between releases

## Relation to the Arsenal

This is a training-and-alignment entry: it documents a training/fine-tuning/alignment stack you run yourself. For managed fine-tuning paths and adjacent tooling, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/OpenRLHF/OpenRLHF)
- [Documentation](https://openrlhf.readthedocs.io/en/latest/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (9,769 stars, last commit 2026-07-06, verified via GitHub API on 2026-07-08)*
