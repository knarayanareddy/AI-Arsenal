---
id: verl
name: "verl"
version_tracked: null
artifact_type: framework
category: llms
subcategory: frameworks
description: "ByteDance-initiated RL post-training library implementing HybridFlow, with FSDP/Megatron backends and vLLM/SGLang rollouts for GRPO and PPO"
github_url: "https://github.com/verl-project/verl"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "verl-project (initiated by ByteDance Seed)"
tags: [alignment, fine-tuning, llm]
maturity: production
cost_model: open-source
github_stars: 24007
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-10-23"
docs_url: "https://verl.readthedocs.io/en/latest/"
demo_url: null
paper_url: "https://arxiv.org/abs/2409.19256v2"
paper_id: null
phase: training-and-alignment
domain: [language, reinforcement-learning, reasoning]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, actively-maintained, research-origin]
ecosystem_role:
  - "The RL post-training stack behind much of the open reasoning-model work: HybridFlow splits dataflow definition from execution, and the ecosystem built around it (recipes, VLA, omni-modal, observability) now spans more code than the library itself"
best_for:
  - You are running GRPO or PPO on reasoning tasks and need real throughput — vLLM or SGLang rollouts feeding FSDP or Megatron updates, with 3D-HybridEngine resharding to cut the actor-swap cost
  - Your RL dataflow is not a textbook one — multi-turn tool use, agentic rollouts, custom rewards — and you need to express it as a controller graph rather than fork a monolithic trainer
  - "You want the community's reference implementation: most open o1-style reproductions and several published RL results were produced on this code"
avoid_if:
  - You want DPO or a small single-node alignment run — `trl` needs a day of setup, not a cluster and a device-mapping plan
  - Your team will not invest in the hybrid-controller abstraction — the flexibility is real and so is the learning curve, and a recipe-style trainer will get to a baseline sooner
  - You need a stable API across quarters — this is a fast-moving research-derived project with a large issue count, and internals move between releases
upstream_dependencies: [vllm]
downstream_consumers: []
alternatives: [openrlhf, trl, deepspeed]
integrates_with: [vllm, sglang, megatron-lm]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: 24,007 stars, 1,394 open issues, Apache-2.0, last push 2026-10-23, repo now under verl-project (migrated from volcengine in 2026-01). README documents the HybridFlow model, FSDP/Megatron and vLLM/SGLang integration, 3D-HybridEngine resharding, and the extracted verl-recipe plus verl-vla/omni/SpeCo/RL-Insight ecosystem."
added_date: "2026-07-08"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

verl is the open implementation of HybridFlow, a EuroSys paper about how to structure RLHF training when generation and optimisation want different parallelism. It was started by ByteDance's Seed team, migrated to its own `verl-project` organisation in January 2026, and is now maintained by a community that has spun out an ecosystem around it.

The library trains language models with reinforcement learning — GRPO and PPO being the two everyone uses — by composing a controller graph: a rollout stage that generates with vLLM or SGLang, a reward stage, an advantage computation, and a training stage that updates with FSDP or Megatron-LM. The controller decides *what* happens; the workers decide *where* it runs, across an arbitrary device mapping.

It is not a small library. It is the thing you reach for when a single-GPU alignment script is no longer the constraint.

## Why it's in the Arsenal

RL post-training is where the reasoning-model wave actually happened, and verl is the infra that made it reproducible outside a handful of labs. When an open GRPO recipe reproduces an o1-style result on a 7B model, the odds are good that the training loop came from here.

The technical reason is 3D-HybridEngine. RL training oscillates between two modes with incompatible memory layouts: generation wants paged KV caches and many parallel sequences; training wants model-parallel shards and activation buffers. Naively, each switch means re-sharding the actor, and at scale that resharding is a large fraction of wall-clock. verl's contribution is to reshard efficiently between the two layouts, eliminating memory redundancy and communication that otherwise dominates.

The second reason is the field's direction. verl's ecosystem now includes `verl-vla` for robot policies, `verl-omni` for diffusion and omni-modal RL, `verl-SpeCo` for speculative decoding co-training, `uni-agent` for agent training, and `RL-Insight` for observability. RL post-training is broadening past text reasoning, and this is where that work is landing.

## Architecture

The hybrid controller is a single-process program that drives distributed workers through a Ray-based or single-controller backend. Writing a new algorithm means writing a controller: call `generate`, compute rewards, call `update_actor`. The dataflow is Python control flow, which is why custom multi-turn or tool-use RL is expressible rather than a fork.

Workers are role-based: actor, reference, critic, reward model. Each role can be placed on its own GPU group with its own parallel strategy, so an actor trained with Megatron tensor parallelism can generate through vLLM with a different sharding — `fsdp_workers` and `megatron_workers` are separate implementations of the same interface.

Data flows through a transfer queue between stages, which is what allows asynchronous and partially off-policy variants to be built without rewriting the algorithm. The `experimental` tree holds fully-async and one-step-off-policy implementations, plus a transfer-queue module that is being folded into the core.

The recipes moved out in January 2026: `recipe/` is now a `verl-recipe` submodule, with GRPO, DAPO, GSPO and multi-turn examples living there. Initialise it with `git submodule update --init --recursive recipe` or the examples you expect will be missing.

## Ecosystem Position

Against `openrlhf` the difference is architecture: OpenRLHF is a Ray-based, more monolithic trainer that is easier to stand up for standard PPO and harder to bend into a novel dataflow. verl's controller model is more work to learn and more capable once learned.

Against `trl` the boundary is scale. TRL is the right answer for DPO on one node or a first RLHF experiment, with a clean API and Hugging Face integration. It does not offer device mapping across heterogeneous GPU groups or Megatron-scale actor training, and it is not trying to.

`deepspeed` and `megatron-lm` are infrastructure rather than alternatives: verl uses them as training backends and `vllm`/`sglang` as rollout backends, which is why an existing investment in any of those is preserved rather than replaced.

Within this catalog, `open-r1`-style reproductions and `torchtune`/`litgpt` occupy adjacent ground — those cover SFT and fine-tuning, verl covers the RL stage that follows. The honest framing: if your plan stops at SFT or DPO, you do not need this; if it includes verifiable-reward RL, you probably do.

## Getting Started

```bash
git clone https://github.com/verl-project/verl && cd verl
git submodule update --init --recursive recipe
pip install -e .
```

```bash
# GRPO on a small model with vLLM rollouts, 8 GPUs
python3 -m verl.trainer.main_ppo \
  algorithm.adv_estimator=grpo \
  data.train_files=$HOME/data/gsm8k/train.parquet \
  actor_rollout_ref.model.path=Qwen/Qwen3.5-4B \
  actor_rollout_ref.rollout.name=vllm \
  actor_rollout_ref.rollout.n=5 \
  trainer.n_gpus_per_node=8
```

Two things to get right before a long run: the rollout engine's GPU memory fraction (a vLLM instance that grabs too much leaves the trainer no room, which surfaces as an OOM during the first update rather than at startup), and the number of samples per prompt, since GRPO's advantage estimate depends on it and a value of 1 silently degrades to REINFORCE-like behaviour.

## Key Use Cases

1. **Verifiable-reward RL on reasoning tasks**: maths and code problems with programmatic rewards, GRPO across a node of GPUs, which is the workload that made this library popular.
2. **Agentic RL with tools**: multi-turn rollouts where the reward depends on environment state — the controller graph expresses the loop, and the rollout engine handles the generation.
3. **Custom algorithm research**: implementing a new advantage estimator or a variant of PPO is a controller edit rather than a patch to a trainer.
4. **Scale-out from the start**: Megatron backends for trillion-parameter-scale actor training with LoRA and router replay, per the project's own conference material.
5. **Post-training multimodal and diffusion models**: `verl-omni` extends the same controller model to diffusion RL and omni-modal training.
6. **Robot policy post-training**: `verl-vla` applies the stack to vision-language-action models across simulators and real hardware.

## Strengths

- The hybrid-controller model genuinely delivers: a new RL dataflow is a Python function, not a fork of a training loop.
- 3D-HybridEngine resharding attacks the real cost of RL training — the repeated transition between generation and optimisation layouts.
- Backend coverage means no lock-in: FSDP or Megatron for training, vLLM or SGLang for rollouts, chosen per role.
- Device mapping across separate GPU groups lets a rollout fleet and a training fleet share a cluster with different parallelisms.
- The paper is public and the code matches it, which is rare among RL frameworks and makes the design auditable.
- A large, active ecosystem — recipes, observability, VLA, omni-modal and speculative decoding — signals that the abstraction is being reused rather than merely cited.

## Limitations

- **The abstraction has a cost.** Understanding the controller/worker split, device mapping and transfer queue takes real time; teams expecting `trainer.train()` will be lost for a week.
- **1,394 open issues.** Velocity is high and so is the ratio of open questions to answers; expect to debug against source rather than documentation.
- **Internals move.** The recipe extraction to a submodule and the org migration both changed workflows in 2026, and experimental modules are explicitly unstable.
- **Cluster assumptions are baked in.** A single-GPU run is possible but pointless — the value is in multi-node scheduling, and the setup burden reflects that.
- **Rollout/training mismatch is a silent quality risk.** Numerical differences between the inference and training implementations of the same weights distort the policy gradient, which is what the separate `vexact` project exists to address.
- **Reward design is yours.** The framework makes RL runnable; it does not tell you whether your reward is gameable, and reward hacking will show up as improving curves with degrading outputs.

## Relation to the Arsenal

Pair it with `vllm` or `sglang` for rollouts and `megatron-lm`, `deepspeed` or FSDP for updates. Compare with `openrlhf` (simpler, more monolithic) and `trl` (single-node, recipe-style). For the SFT stage that precedes RL, see `torchtune`, `litgpt` and `axolotl`; for the evaluation that must catch reward hacking, see [Benchmarks and Evals](../benchmarks-and-evals/_index.md).

## Resources

- [GitHub](https://github.com/verl-project/verl)
- [Documentation](https://verl.readthedocs.io/en/latest/)
- [HybridFlow paper](https://arxiv.org/abs/2409.19256v2)
- [Recipes](https://github.com/verl-project/verl-recipe)
- [RL-Insight (observability)](https://github.com/verl-project/rl-insight)
