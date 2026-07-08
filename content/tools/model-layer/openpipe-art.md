---
id: openpipe-art
name: OpenPipe ART
type: tool
job: [fine-tuning]
description: Open-source Agent Reinforcement Trainer that fine-tunes multi-step LLM agents with RL (GRPO) using an LLM-judge reward instead of labeled steps
url: "https://openpipe.ai"
cost_model: open-source
pricing_detail: Open source (Apache-2.0); OpenPipe also offers a hosted training/inference platform
tags: [fine-tuning, agents, rlhf]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: Library is free and open source; hosted OpenPipe platform is usage-based
self_hostable: true
open_source: true
source_url: "https://github.com/OpenPipe/ART"
docs_url: "https://docs.openpipe.ai/introduction"
github_url: "https://github.com/OpenPipe/ART"
alternatives: [trl, unsloth, llamafactory]
integrates_with: [trl]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You want to improve a multi-step agent on a task where success is measurable (did the trajectory achieve the goal?) rather than collecting labeled step-by-step supervision
  - You want RL fine-tuning (GRPO) with a reduced reward-engineering burden — its RULER approach uses an LLM judge to score trajectories instead of a hand-built reward function
avoid_when:
  - Your task is single-turn or already solved by prompting/SFT — RL fine-tuning adds substantial complexity and compute for little gain
  - You cannot define any reliable success signal or judge for the task — RL without a trustworthy reward will optimize the wrong thing
version_tracked: null
enrichment_status: draft
enrichment_notes: OpenPipe/ART verified ~10.3k stars, Apache-2.0, last push 2026-07-08 via GitHub API. RULER (LLM-judge reward) effectiveness is reported by the project and early adopters; RL fine-tuning results are task-dependent — validate on your own task before trusting sample-efficiency claims.
verdict: recommended
verdict_rationale: A focused, fast-moving open-source library that makes RL fine-tuning of agents tractable by cutting reward engineering via an LLM judge — a distinct capability from SFT-oriented fine-tuning tools
status: active
---

> **TL;DR:** ART (Agent Reinforcement Trainer) is an open-source library for RL fine-tuning of multi-step LLM agents using GRPO, with a "RULER" LLM-judge reward that removes most hand-built reward engineering — so you train on task outcomes, not labeled steps. Apache-2.0; recommended for outcome-measurable agent tasks.

## Overview

ART, from OpenPipe, is an open-source trainer for improving LLM *agents* with reinforcement learning. Instead of supervised fine-tuning on labeled examples, it optimizes a model against task outcomes over multi-step trajectories using GRPO. Its RULER component uses an LLM as a judge to score trajectories, so you avoid writing a bespoke reward function for every task.

## Why It's in the Arsenal

Most fine-tuning tooling (TRL, Unsloth, LLaMA-Factory) centers on SFT or single-turn preference optimization. Training a multi-step agent to actually complete tasks is a different problem, and reward engineering is the usual blocker. ART earns a model-layer entry because it targets that gap — outcome-driven RL for agents with a judge-based reward — which is why it grew to ~10k stars quickly rather than being redundant with existing trainers.

## Key Features

- RL fine-tuning of multi-step agents via GRPO (group-relative policy optimization)
- RULER: an LLM-judge reward that scores trajectories, replacing hand-built reward functions
- Integrations with common inference/training backends and popular open models
- Runnable locally or against OpenPipe's hosted platform for managed training/inference

## Architecture / How It Works

You define an agent task and let it roll out trajectories; ART groups sampled trajectories and applies GRPO to update the policy toward higher-reward behavior. Rather than requiring a numeric reward function, RULER prompts an LLM judge to rank/score trajectories against the task goal, and that signal drives the RL update — turning "did the agent succeed?" into a usable training reward.

## Getting Started

```python
pip install openpipe-art
# Define a rollout that runs your agent and returns a trajectory,
# then train with GRPO + RULER scoring. See the ART docs (Resources)
# for the current trainer API, backends, and example notebooks.
```

## Use Cases

1. **Scenario**: improving a tool-using agent on a benchmark where success is checkable (task completed / not), using outcome reward instead of labeled steps
2. **Scenario**: bootstrapping a reward from an LLM judge (RULER) when writing a precise reward function for a fuzzy task would be impractical

## Strengths

- Makes RL fine-tuning of agents approachable by cutting the biggest cost — reward engineering — via an LLM judge
- Optimizes real task outcomes over trajectories, which SFT cannot directly do
- Open source (Apache-2.0), actively developed, with a hosted option for scaling

## Limitations / When NOT to Use

- RL fine-tuning is complex and compute-hungry — unjustified for single-turn tasks solvable by prompting or SFT
- Reward quality is everything: a weak or gameable LLM judge will steer the model toward reward hacking
- Fast-moving beta: APIs and best practices change, so pin versions and expect iteration

## Integration Patterns

- Use after SFT: bootstrap with supervised fine-tuning (e.g. via [TRL](./trl.md) or [LLaMA-Factory](./llamafactory.md)), then apply ART's RL to optimize multi-step outcomes
- Pair with [Unsloth](./unsloth.md)-style efficient training backends where supported to reduce GPU cost
- Serve the resulting agent model on a serving platform (Baseten, Modal) once trained

## Resources

- [Website](https://openpipe.ai)
- [Documentation](https://docs.openpipe.ai/introduction)
- [GitHub (OpenPipe/ART)](https://github.com/OpenPipe/ART)

## Buzz & Reception

ART reached ~10.3k GitHub stars with active daily development (GitHub API, 2026-07-08), reflecting strong interest in practical RL fine-tuning for agents and in the RULER judge-as-reward idea specifically.
