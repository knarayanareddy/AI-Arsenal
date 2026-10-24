---
id: reef
name: "REEF"
type: tool
job: [fine-tuning, orchestration]
description: "Continual-learning infrastructure that turns live agent trajectories into reinforcement-learning updates"
url: "https://github.com/Human-Agent-Society/reef"
cost_model: open-source
pricing_detail: "Apache-2.0 source; you supply the GPU cluster the rollout and training jobs share"
tags: [agents, fine-tuning, training, reasoning, research]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Apache-2.0 source is free; the cost is GPU capacity for simultaneous inference and training"
self_hostable: true
open_source: true
source_url: "https://github.com/Human-Agent-Society/reef"
docs_url: null
github_url: "https://github.com/Human-Agent-Society/reef"
alternatives: []
integrates_with: []
added_date: "2026-10-20"
last_reviewed: "2026-10-20"
added_by: repo-maintainer
reviewed_by: null
verdict: watching
verdict_rationale: "Makes closed-loop agent improvement concrete by wiring trajectory capture to off-policy RL, but the reward-shaping and infrastructure burden are research-grade"
status: active
phase: orchestration
audience: [research]
best_when:
  - "You already collect execution traces and want to close the loop from rollout to weight update instead of hand-curating datasets"
  - "Your agent's success signal is programmatically checkable, so rewards can be computed without a human in the loop"
avoid_when:
  - "The task has no reliable automated success metric and reward shaping would be guesswork"
  - "You have no dedicated GPU capacity for training alongside serving traffic"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Framework design taken from the repository and accompanying material; no training run was reproduced here, so the reported mechanics are unverified at implementation level."
buzz_sources: []
---

## Overview

REEF is infrastructure for the part of agent engineering that most frameworks stop short of: turning execution traces into model updates. Where a conventional agent stack captures logs for humans to read, REEF treats each rollout as training data, with the resulting state-action-reward sequences flowing into a replay buffer that feeds off-policy reinforcement learning.

The design leans on reflection tokens — special decoding symbols such as retrieval triggers and self-critique markers — that let the model make intermediate quality decisions inside its own output. Those tokens become part of the action space, so a training algorithm can penalise a confident hallucination at the point where it is generated rather than only at the end of a trajectory.

Rollout and training are separate tiers: vLLM-backed sampling produces trajectories while a Ray-orchestrated trainer consumes them, which keeps exploration from blocking on gradient updates.

## Why It's in the Arsenal

The Arsenal documents self-improving agents as a distinct category because the alternatives are well understood and both are unsatisfying: prompt iteration improves behaviour without changing the model, and offline fine-tuning needs a curated dataset that ages quickly. REEF represents the third path, where the system that runs the agent also produces its training corpus.

Cataloguing it is also a caution. Closed-loop learning is where reward hacking and policy collapse live, and the infrastructure cost is real, so the entry is marked as research-grade rather than a drop-in upgrade.

## Key Features

- Rollout capture from live environments into structured replay buffers usable by PPO, DPO and other off-policy methods.
- Native handling of reflection and critique tokens, including their role in retrieval triggering and generation checks.
- Distributed training across multi-node GPU clusters via Ray, decoupled from the sampling loop.
- vLLM integration for high-throughput candidate generation during exploration.
- Pluggable reward functions mixing environment signals, model self-critique and rule-based verification.

## Architecture / How It Works

An inference tier serves the current policy through vLLM and records every step: observation, chosen action, emitted tokens including reflection markers, and the resulting environment state. A reward function scores completed trajectories, using programmatic checks where the task allows and self-critique scores otherwise. Scored trajectories enter a replay buffer from which the trainer samples batches, computes policy-gradient updates and periodically publishes a new checkpoint back to the serving tier.

Separating sampling from training is what makes the loop practical: the trainer can lag without stalling users, and the memory footprint of generation stays bounded. The coupling point is the buffer, which also defines the staleness of the policy used to generate data.

## Getting Started

Expect to provision GPU nodes for both roles before running anything: a serving pool for vLLM and a training pool for the distributed job. Start from the repository's example environment, define one task with a deterministic reward, and run a short capture-only cycle to inspect the trajectory format before enabling weight updates. Enable training once the reward correlates with outcomes you would accept manually.

## Use Cases

1. Coding agents whose reward is derived from test results, so rollouts on real repositories become a training signal without human labelling.
2. Retrieval agents learning when to search: reflection tokens on retrieval decisions let the trainer penalise unnecessary or unhelpful lookups directly.
3. Multi-step tool-use policies where success is checkable against an environment's final state rather than against the transcript.
4. Research comparisons of reflection strategies, where the same rollout capture feeds several training variants.

## Strengths

- Trajectory capture and training share one data model, so the corpus for improvement is produced by normal operation rather than by a separate curation project.
- Reflection tokens move quality judgements inside the decoding loop, giving the optimiser a finer-grained signal than end-of-episode success alone.
- The sampling/training split lets exploration continue while checkpoints are produced.
- Off-policy discipline with disciplined replay is the mechanism intended to limit catastrophic forgetting of earlier capabilities.

## Limitations / When NOT to Use

- Requires standing GPU capacity for training alongside serving; the economics only work when you already run inference at scale.
- Reward misspecification is the dominant risk: an agent that learns to emit high-scoring critique markers without solving the task will look like progress in the metrics.
- The dependency surface is heavy — Ray, PyTorch distributed, vLLM, matching CUDA drivers — and version skew between them is a recurring operational cost.
- As a research framework in beta, interfaces and defaults are expected to change; production use implies owning a fork.

## Integration Patterns

Run this behind your existing agent runtime rather than inside it: the serving tier becomes the policy endpoint, and your application keeps calling a normal completion API. Emit rewards from the systems of record — test harnesses, database constraints, verification services — so the signal is auditable. Keep checkpoints in the same registry you use for other models, and gate promotion on offline evaluation before the new policy takes live traffic.

## Resources

- [GitHub — Human-Agent-Society/reef](https://github.com/Human-Agent-Society/reef)

## Buzz & Reception

No independent reproduction of REEF's training loop is recorded for this entry; the description follows the project's own material, and the beta status means published results should be treated as the authors' rather than community-confirmed. The practical question to answer first is whether your task admits a reward you trust.
