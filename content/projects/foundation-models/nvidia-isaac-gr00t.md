---
id: nvidia-isaac-gr00t
name: "Isaac-GR00T"
version_tracked: null
artifact_type: model
category: agents
subcategory: models
description: "Generalist robot foundation model pairing a vision-language-action backbone with synthetic data in Isaac"
github_url: "https://github.com/NVIDIA/Isaac-GR00T"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "NVIDIA"
tags: [vision, data, agents]
maturity: alpha
cost_model: open-source
github_stars: 8136
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-08-20"
docs_url: "https://developer.nvidia.com/isaac/gr00t"
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [vision, reinforcement-learning]
relation_to_stack: [study-and-reference, deploy-as-is]
health_signals: [org-backed]
ecosystem_role:
  - "Generalist robot foundation model and simulation stack for embodied agents, pairing a VLA backbone with synthetic-data generation in Isaac."
best_for:
  - "You are a robotics researcher who needs one policy to perform a range of manipulation tasks without training a separate model per skill."
  - "You have a small number of real robot demonstrations and need to augment them with synthetic trajectories generated in simulation before fine-tuning."
  - "You are building on NVIDIA Isaac and want the foundation-model policy and the simulation and deployment tooling from the same vendor path."
avoid_if:
  - "You want a proven production recipe, since the model, the data recipe, and the hardware stack are all moving targets across releases."
  - "Your target robot is not an NVIDIA-supported arm, because the fine-tuning and deployment paths assume Isaac hardware and its ROS and SDK integration."
  - "You need to run this on a single workstation GPU, since the training and simulation stack expects substantial memory and often multiple devices."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (8136), Apache-2.0, last commit 2026-08-20, Python, and the topic list were API-verified. The VLA policy with a diffusion action head, post-training path, Isaac Lab integration, data schema, and Gr00t-Dreams are described from the official repo and developer page. The model version string and config filenames are as published in the README and were not executed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/Isaac-GR00T", "date": "2026-09-28", "description": "8,136 stars and last commit 2026-08-20 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Isaac GR00T is NVIDIA's foundation model for generalist robots, and the release is two things at once: a VLA policy and the surrounding tooling. The policy takes a vision observation and a language instruction and produces robot actions, built as a vision-language backbone fused with a diffusion action head so the action distribution can be multimodal, which matters because several valid trajectories often exist for the same instruction. The model is trained on a mixture of human demonstration data, simulation data, and synthetic video, and the practical contribution is the recipe: a small amount of real data for a new task combined with large synthetic sets is intended to transfer a generalist policy to a specific robot. Around that, the repository carries the post-training and inference code, an Isaac Lab integration for generating synthetic demonstrations with domain randomisation, a data schema and conversion path for bringing your own episodes in, and Gr00t-Dreams, a synthetic-data generation component. The stated goal is a policy that runs across embodiments via a morphology-aware adaptation layer rather than one model per robot.

## Why it's in the Arsenal

The recurring decision in robot learning is how to get enough demonstrations to train a policy. Real teleoperation is expensive and slow — a task might take a hundred successful episodes per skill, and each is human time — so a policy that only works for the skills you collected is the realistic outcome. GR00T attacks the data problem from both sides: a single backbone trained across many tasks and embodiments so new skills need less data, and a simulation and synthetic-generation path that manufactures the volume a real robot cannot. That is why the interesting part of the release is the data pipeline rather than the network, and why reading it as a robotics project rather than an LLM project is the right frame.

## Architecture

The policy follows the vision-language-action pattern. Visual observations go through a vision encoder, language instructions through a text encoder, and the two are fused by a cross-attention or adapter stage into a conditioning representation; that representation is then the input to a diffusion-based action head that iteratively denoises a trajectory of future actions conditioned on the fused features, which is what allows multiple valid action sequences from one instruction rather than a single regressed mean. The backbone is trained across a heterogeneous mixture of datasets, with different robot morphologies mapped into a common action and observation space through a normalisation and embodiment-specific adaptation step, so one set of weights covers several arms. Post-training adapts the generalist to a target robot and task from a small real demonstration set. Simulation runs in Isaac Lab, where tasks are defined programmatically with domain randomisation over object poses, lighting, materials, and dynamics, producing trajectories in the same schema as real demonstrations. Gr00t-Dreams extends this with generative video models used to synthesise additional task data, and the data tooling converts third-party and legacy datasets into the shared schema so a team's existing archives are usable.

## Ecosystem Position

Isaac GR00T competes in the emerging generalist-robot-policy space with OpenVLA and Octo, which are open-weight research policies rather than a vendor stack, and with π0 from Physical Intelligence, which is closed. Compared with OpenVLA, GR00T is integrated with simulation, synthetic data generation, and deployment tooling in one place, while OpenVLA is a model you bring your own data and hardware to. It is complementary to Isaac Sim and Isaac Lab, which supply the simulation it generates data in, and it depends on the Jetson and workstation hardware path for deployment, which is the opposite of the framework-agnostic stance OpenVLA takes. It also overlaps with the toolchain and fine-tuning entries in the frameworks phase: this is a model plus data recipe, and it needs an inference stack to run the policy. For a fixed single-task behaviour, a behaviour-cloning baseline on collected data is cheaper and often more reliable than a generalist policy.

## Getting Started

Clone the repo and check the Isaac dependency stack before anything else:

```bash
git clone https://github.com/NVIDIA/Isaac-GR00T && cd Isaac-GR00T
pip install -e .
# requires Isaac Sim / Isaac Lab, a CUDA GPU with substantial VRAM,
# and the Isaac ROS bridge for on-robot deployment
```

```python
from gr00t.experiment.runner import run

# the runner takes a model config and a fine-tuning data config and
# starts from the released generalist checkpoint
run(
    model_config="configs/model/gr00t_n1_7.yaml",
    data_config="configs/data/finetune_custom.yaml",
    max_steps=20_000,
)
```

The data config is where your demonstration schema is declared; the README covers converting an existing dataset into it. Expect the Isaac stack, not this repo, to be the hard dependency.

## Key Use Cases

1. Learning a manipulation skill on a new robot from a few dozen real demonstrations, with the generalist policy as the starting point rather than a from-scratch model.
2. Generating synthetic demonstrations in Isaac Lab with domain randomisation to supplement sparse real data before fine-tuning.
3. Evaluating whether a single generalist policy covers a set of related tasks, instead of maintaining one model per task as a classical behaviour-cloning stack would.
  

## Strengths

- One VLA policy intended to span tasks and embodiments, which is the data-efficiency argument a per-skill model cannot make.
- An integrated path from simulation and synthetic generation through fine-tuning to deployment, all in the NVIDIA Isaac environment.
- A diffusion action head that models multimodal trajectories, so it does not collapse to a mean action on ambiguous instructions.
- Data tooling that ingests third-party and legacy datasets into a common schema, which is the practical hurdle in most robotics projects.
  

## Limitations

Everything moves: the model version, the data recipe, the Isaac versions, and the supported hardware list are all changing between releases, so a recipe that worked will need re-tuning and there is little stability to build a team process on. The stack is heavy — Isaac Sim plus Isaac Lab plus a GPU with large memory, and often more than one — so this is not something you try on a laptop. It is coupled to NVIDIA hardware and the Isaac ROS bridge, so a different arm or a non-NVIDIA deployment target is a significant detour. Generalist policies are still worse than specialised ones on any single narrow task, so a classical behaviour-cloning model on collected data remains the honest baseline to beat. Success rates in the published results come from curated task suites, and real-world reliability in unstructured settings is a much weaker claim.

## Relation to the Arsenal

This is the embodied-agents entry in content/projects/foundation-models, and it is the model half of a two-part read — the simulation half is Isaac Sim and Isaac Lab, which live in the frameworks and inference-engine phases and are where synthetic data is actually produced. It is also the clearest case in the catalog where a foundation model is a data strategy rather than an architecture: the training entries in content/projects/training-and-alignment cover the fine-tuning mechanics, and OpenVLA and Octo are the research-policy comparison to read alongside. For deployment, the inference-engine entries cover the runtime side, and the vision backbone entries are what the observation encoder draws on. If the task is not manipulation, none of this applies and a language model is the right tool.

## Resources

- [Isaac GR00T GitHub repository](https://github.com/NVIDIA/Isaac-GR00T)
- [Isaac GR00T developer page](https://developer.nvidia.com/isaac/gr00t)
- [Isaac Lab documentation](https://isaac-sim.github.io/IsaacLab/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (8,136 stars, last commit 2026-08-20, license Apache-2.0, verified via GitHub API on 2026-09-28)*
