---
id: google-brax
name: "brax"
version_tracked: null
artifact_type: framework
category: evaluation
subcategory: libraries
description: "Massively parallel rigid-body simulation library where entire environments are vmapped and jitted on TPU or GPU"
github_url: "https://github.com/google/brax"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "google"
tags: [rlhf, jax, vision, evaluation]
maturity: production
cost_model: open-source
github_stars: 3241
github_stars_last_30d: 0
trending_score: 28
last_commit: "2026-09-15"
docs_url: "https://brax.readthedocs.io"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [reinforcement-learning]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Massively parallel rigid-body simulation on accelerators, where environment steps are vmapped on-device so RL training no longer bottlenecked on physics CPU time."
best_for:
  - "You are training a policy with thousands of parallel rollouts and the CPU simulator is the bottleneck rather than the update step."
  - "You want to run a whole batch of locomotion environments on a single accelerator with the physics inlined into the training graph."
  - "You need differentiable or at least fully jitted simulation so a model-based or planning method can use the same code path."
avoid_if:
  - "Your task is not rigid-body dynamics, since the engine covers articulated bodies, not fluids, cloth, or deformables."
  - "You need contact-rich manipulation with complex friction models, since the generalized and positional solvers are simplified."
  - "You need photorealistic rendering for imitation learning, where a renderer-based simulator rather than a physics engine is what you require."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (3241), Apache-2.0 license, last commit 2026-09-15, and primary language Python were read from the GitHub API; the topics array is empty upstream and no homepage is declared. The pytree state, vmap-over-environments design, generalized versus mjx backends, collider and actuator systems, and export tooling come from the official README and docs; no environment was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/google/brax", "date": "2026-09-28", "description": "3,241 stars and last commit 2026-09-15 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Brax is a physics engine and reinforcement-learning environment library built on JAX. Instead of running one simulation per process, an entire environment is written as a pure function from state and actions to next state, so a batch of N independent environments is a vmap over that function and the whole thing compiles and runs on a TPU or GPU. Environments are assembled from composable components: the rigid body system with joint types, a collider system with convex-hull and plane collision, terrain generation, actuator models for torque and position control, and a sensor system. On top of that, a Gym-style API with vectorized environments, the MJX backend for a differentiable physics rewrite, and a suite of locomotion and manipulation tasks from the Brax training environments are provided. The maintained successor line is the newer engine version with its own training loop and a vmap-based generalized solver.

## Why it's in the Arsenal

The decision it resolves is whether reinforcement-learning throughput is bounded by simulation. A policy gradient run with a CPU physics engine spends most of its wall clock stepping environments, so adding accelerators to the update step barely helps. Brax makes the simulator a batched tensor program, so the same jitted step advances thousands of environments and the gradient update can fuse with rollout collection where a differentiable backend is used. That changes which algorithm is practical, since it makes long-horizon on-policy methods and massive parallel PPO trains on a single device feasible rather than requiring a cluster of simulator processes. It also makes environments cheap to copy, so domain randomization over hundreds of variants costs a vmap rather than a process pool.

## Architecture

The simulation state is a pytree of named arrays: generalized coordinates and velocities, joint transforms, collision geometry, and actuator state, all with leading batch axes. A pipeline transforms controls into applied force, integrates collision geometry for moving bodies, resolves penetration and contact with a velocity-level and a position-level solver, and applies resulting impulses to the generalized coordinates through the mass matrix inverse. Every stage is a pure function, so the pipeline is wrapped in jit and the batch dimension is expressed with vmap, which is what allows a single compiled program to advance all parallel worlds. The MJX backend replaces the constraint solver with differentiable formulations built from JAX primitives so gradients flow through the physics. Environments build on top through derived systems with actuators, sensors, termination conditions, and the Gymnasium API, and the training entry points collect vmapped rollouts and apply PPO updates on the same device.

## Ecosystem Position

Brax is a rather than an alternative to MuJoCo or Isaac Gym, since it solves the same problem of simulation throughput with a different mechanism: accelerator vectorization and a simplified solver, versus a mature constraint solver in C for accuracy, and a GPU-parallel renderer-based simulator for photorealism. It is a genuine alternative to a process-parallel setup, which is how most RL codebases run today, and it is a complement to Scenic, sharing the JAX and Flax execution model so the same jitted-training philosophy covers vision and control. Compared to MJX it is the earlier and broader ecosystem, while the successor Brax v2 engine is where new features land. It also overlaps with the training-and-alignment phase, since reinforcement learning is a training loop like any other, and the policy optimization tooling there applies equally once a simulator produces transitions. Its upstream dependencies, JAX and Flax, matter more to it than the surrounding ecosystem.

## Getting Started

Install with an accelerator backend and run a vectorized environment:

```bash
pip install brax
# backend, e.g. pip install -U "jax[cuda12]"
```

```python
import jax
import brax.envs

env = brax.envs.create(
    env_name="ant",
    backend="generalized",     # or "mjx" for the differentiable path
    num_envs=4096,             # worlds advanced in parallel on device
    auto_reset=True,
)
jit_reset = jax.jit(env.reset)
jit_step = jax.jit(env.step)

state = jit_reset(jax.random.PRNGKey(0))
for _ in range(1000):
    state = jit_step(state, jax.random.uniform(state.obs.shape))
```

```bash
# train a policy from the bundled training entry point
pip install git+https://github.com/google/brax.git@v2
python -m brax.training.acme ppo --env=ant --num_envs=4096 --num_iterations=100
```

```bash
# export a trained policy to a deployment format
python -m brax.tools.export --policy_path ./policy.pkl --export_path ./policy.json
```

Expect the first step to compile for a minute or two; the compiled executable is then cached for later runs of the same shape.

## Key Use Cases

1. Training a locomotion policy where the CPU simulator was the throughput limit and thousands of on-device rollouts make on-policy methods practical.
2. Domain randomization over hundreds of terrain or dynamics variants, which is a vmap instead of a process pool.
3. Model-based or planning work that needs gradients through the physics, which the MJX backend provides directly.

## Strengths

- Thousands of environments advanced in parallel on one accelerator, so RL wall clock is set by the update step rather than by the simulator.
- Simulation written as pure JAX functions, so it composes with pmap, scan, and a differentiable backend in the same graph.
- Composable systems, actuators, and sensors, so a new task is assembly rather than a from-scratch engine integration.
- Domain randomization is cheap at scale, which makes the overfitting-to-one-terrain problem tractable for locomotion.

## Limitations

The solvers are deliberately simplified relative to MuJoCo, so contact-rich manipulation and precise friction behavior can diverge from physics you would trust for hardware transfer, and there is no soft-body or fluid simulation. Environments are rigid-body only, which rules out cloth, granular media, and deformables entirely. The first call compiles for a minute or more, so interactive debugging of an environment is genuinely awkward, and each new shape triggers a recompile. Setup is a real dependency risk: the JAX backend, the Brax version, and any successor engine must agree, and mixing the old and new APIs in one project is a frequent source of breakage. Learning rates and hyperparameters from the published recipes also assume the simulator's own dynamics, so transferring a policy to real hardware is a separate project rather than a checkbox.

## Relation to the Arsenal

This is a framework-phase entry whose upstream dependencies are the Flax and JAX ecosystem, and its nearest sibling in the catalog is Scenic, which applies the same whole-program compilation philosophy to vision. Its output is a policy, which is a model artifact, so it flows into the same serving concerns as any other checkpoint, and the evaluation entries in the benchmarks-and-evals phase apply to policies as much as to classifiers. Nothing in the foundation-model phase is a dependency here, which makes it one of the few entries in this catalog that is genuinely self-contained apart from JAX.

## Resources

- [Brax GitHub repository](https://github.com/google/brax)
- [Brax documentation](https://brax.readthedocs.io)
- [MJX, a differentiable physics backend, as a reference](https://github.com/google/mjx)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (3,241 stars, last commit 2026-09-15, license Apache-2.0, verified via GitHub API on 2026-09-28)*
