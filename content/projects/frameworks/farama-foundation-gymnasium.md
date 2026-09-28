---
id: farama-foundation-gymnasium
name: "Gymnasium"
version_tracked: null
artifact_type: library
category: evaluation
subcategory: libraries
description: "Standard API for reinforcement-learning environments with spaces, vectorisation, and a curated env registry"
github_url: "https://github.com/Farama-Foundation/Gymnasium"
license: "MIT"
primary_language: Python
org_or_maintainer: "Farama-Foundation"
tags: [rlhf, benchmark, evaluation]
maturity: production
cost_model: open-source
github_stars: 12590
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-27"
docs_url: "https://gymnasium.farama.org"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [reinforcement-learning]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "Standard API for reinforcement-learning environments, whose observation/action space contracts keep RL code portable across simulators and model implementations."
best_for:
  - "You are implementing or reproducing a reinforcement-learning algorithm and need one environment interface so the same code runs on classic control, box2d, and MuJoCo tasks."
  - "You are comparing published results across papers and want a common environment version and seeding contract, since Gym's version policy pins behaviour against upstream changes."
  - "You need vectorised rollouts on CPU with multiple environments stepping in one call, which is what most off-policy implementations assume for throughput."
avoid_if:
  - "You are working in a simulator whose engine has its own idiomatic batched API, since adapting it usually means fighting the space contract rather than using it."
  - "You need multi-agent environments, since this API is explicitly single-agent and multi-agent support lives elsewhere."
  - "You need a production service interface, because a step call is an in-process function with no networking, timeouts, or request handling."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (12590), MIT license, last commit 2026-09-27, Python as primary language and the topic list were API-verified. Space types, the terminated/truncated split, vector API modes, wrappers, and the passive checker are from the official docs and source; throughput and multi-agent caveats are engineering judgement, not benchmarked here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Farama-Foundation/Gymnasium", "date": "2026-09-28", "description": "12,590 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Gymnasium defines the Env protocol: reset returns an observation and info dict, step returns the next observation, a reward, a terminated flag for genuine terminal states, and a truncated flag for an external time limit, so an agent can learn to distinguish reaching the goal from being cut off mid-episode. Spaces are the other half: Box, Discrete, MultiDiscrete, MultiBinary, Tuple, and Dict describe shape, dtype, and bounds and provide sample and contains methods, which lets an algorithm validate that a policy's output matches the action space instead of failing deep inside the environment. On top sits a registry and gym.make that instantiates an environment by ID with wrappers applied, a large collection of reference environments including classic control, classic control with the Box2D extensions, Atari through the optional extras, MuJoCo, and the procedurally generated environments, plus a vector API with SyncVectorEnv and AsyncVectorEnv for batched stepping, a shared-memory observation transport for the asynchronous path, and wrapper utilities for recording video, transforming observations, and clipping actions. PassiveEnvChecker validates implementations, and the vector namespace returns batched observations with a batched space.

## Why it's in the Arsenal

The recurring decision is whether an RL result transfers to anything else. In practice RL code breaks at the seams: an algorithm hardcodes a 4-dim Box observation, an environment returns a dict, a time limit sets done without a terminal signal, and a reproduction silently diverges because an upstream release changed the physics defaults. Gymnasium resolves this by making the contract explicit and enforced — spaces are declared and checkable, terminated and truncated are separate signals, and the passivation of classic environments to pure function parameters means the environment code is auditable and versioned. The result is that a checkpoint, an algorithm, and a benchmark number mean the same thing in a different paper, which is the only reason cross-paper comparison in RL is possible at all.

## Architecture

An Env is any object with observation_space and action_space attributes plus reset and step. The core function is a near-pure transition: an internal state, parameters, an rng source, and a step returning the next state, reward, terminated, and truncated, so the same underlying implementation can back a stateful env and a vectorised one. make creates an env by registry ID and applies a wrapper stack, the outermost last, and order matters — TimeLimit before OrderEnforcing — with the passive checker inside to validate that the seeded rng produces repeatable transitions and that observations match the declared space. Vectorisation comes in two flavours: SyncVectorEnv steps a list of envs in one call in a single process, and AsyncVectorEnv runs each env in a worker process with shared memory for observation buffers and pipe-based control, which removes the Python per-step overhead for cheap classical environments. Wrappers are the composition mechanism for logging, video capture, resizing, reward shaping, and frame stacking, and the vector API adds autoreset semantics so an episode boundary during a batched step does not lose transitions.

## Ecosystem Position

Gymnasium is the successor to OpenAI Gym and is what stable-baselines3, CleanRL, and most current RL code depends on, so it is an ecosystem standard rather than one library among equals. It overlaps with PettingZoo and the multi-agent MPE environments for multi-agent work, which this API deliberately excludes, and with the vectorised JAX-based environments in Brax for GPU-resident simulation at a different abstraction level. Compared to the original Gym it fixes the done-versus-truncated bug and pins classic environment versions, which changes some historical results and is the reason old reproductions need an environment pin. It is not a simulator: MuJoCo, Isaac, and Box2D are the physics engines underneath. It is a complement to the training entries in content/projects/training-and-alignment rather than a replacement, since the library gives you rollouts and the algorithm libraries give you the update.

## Getting Started

Create an environment, check the spaces, and step it manually:

```bash
pip install "gymnasium[classic-control]"
```

```python
import gymnasium as gym

env = gym.make("CartPole-v1")
obs, info = env.reset(seed=42)
print(obs.shape, env.action_space, env.observation_space)

total, steps = 0.0, 0
terminated = truncated = False
while not (terminated or truncated):
    obs, reward, terminated, truncated, info = env.step(env.action_space.sample())
    total += reward
    steps += 1
print(f"return={total:.1f} in {steps} steps")
env.close()
```

Swap to batched rollouts with `gym.make_vec("Pendulum-v1", num_envs=8, vectorization_mode="async")` when you want off-policy throughput without a custom loop.

## Key Use Cases

1. Reproducing a published PPO or SAC result on a classic control or MuJoCo task with a pinned environment version so the number is comparable.
2. Batched rollout collection for off-policy algorithms, using AsyncVectorEnv to keep CPU utilisation high while the GPU trains.
3. Swapping one environment implementation for another — classic control for Box2D, or a real-world wrapper for a simulator — while the algorithm code stays unchanged.

## Strengths

- One stable contract for spaces, seeding, and termination that makes results comparable across papers and implementations.
- AsyncVectorEnv removes the per-step Python bottleneck that makes naive single-environment rollouts unbearably slow.
- The passive environment checker and the purity-oriented classic-control rewrite make environment bugs findable rather than mysterious.
- A large registry plus a wrapping mechanism, so task variants are configuration rather than forks.
  

## Limitations

The API is explicitly single-agent, so multi-agent work needs PettingZoo or a different abstraction, and the vector API's autoreset semantics have bitten people building custom collectors. Simulated environments run on CPU, so training throughput is bounded by simulation speed: a fast algorithm is idle waiting on physics, and a fast simulation is idle waiting on the update. The pure-function convention for classic control means those environments are frozen for version stability, which fixes their behaviour but also blocks improvements upstream. There is no networking, no fault tolerance, and no process supervision, so it is a library for research loops rather than for deploying an RL service, and the AsyncVectorEnv path adds shared-memory and pipe handling that can be its own source of subtle bugs.

## Relation to the Arsenal

This is the environment contract for the reinforcement-learning entries in content/projects/foundation-models, most obviously the Isaac-GR00T entry in the same phase, and it is the substrate any algorithm in content/projects/training-and-alignment assumes when it reports a return. The voice-audio and vision entries in that folder have their own domain-specific data conventions, so this is the one to read specifically for control and locomotion work. Where it is not the right tool is deep RL on GPUs at scale, where the JAX-based environments in this catalog take over, and the evaluation entries in content/projects/evaluation are where you would measure whether a run actually beat a baseline.

## Resources

- [Gymnasium documentation](https://gymnasium.farama.org)
- [Gymnasium GitHub repository](https://github.com/Farama-Foundation/Gymnasium)
- [Gymnasium API reference](https://gymnasium.farama.org/api/env/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (12,590 stars, last commit 2026-09-27, license MIT, verified via GitHub API on 2026-09-28)*
