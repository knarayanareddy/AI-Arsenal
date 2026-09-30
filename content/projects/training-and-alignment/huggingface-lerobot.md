---
id: huggingface-lerobot
name: "lerobot"
version_tracked: null
artifact_type: framework
category: agents
subcategory: frameworks
description: "Apache-2.0 robotics learning stack standardizing datasets, policies, and evaluation so imitation learning transfers across robot hardware"
github_url: "https://github.com/huggingface/lerobot"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "huggingface"
tags: [vision, data, agents]
maturity: beta
cost_model: open-source
github_stars: 27825
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://huggingface.co/docs/lerobot"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [reinforcement-learning, vision]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "End-to-end robotics learning stack that standardizes datasets, policies, and evaluation so imitation and RL policies transfer across robot hardware."
best_for:
  - "You have one policy that must run on two different robot arms, and you need a common action and observation representation so the model transfers instead of being retrained per embodiment."
  - "You want to train imitation-learning policies from demonstration data collected on real hardware, and you need the data format, the training loop, and the evaluation protocol already wired together."
  - "You are contributing or comparing robotics policies and want a shared dataset and leaderboard convention so results are comparable rather than self-reported."
avoid_if:
  - "You have a fixed simulator-only task and want to iterate quickly, because the hardware integration and real-data emphasis are the point and simulator throughput is not the goal."
  - "You need safety-certified control for a deployed system, since this is a research and development stack with no certification story around the learned controller."
  - "Your task is autonomous driving at scale or a manipulation benchmark with its own mature tooling, where the problem domain has conventions this stack is only beginning to absorb."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 27825 stars, Apache-2.0 license, Python primary language, last commit 2026-09-28, empty topics, homepage huggingface.co/docs/lerobot. Dataset format, policy interface, evaluation protocol, and hardware drivers are from official docs; the training command flags reflect documented usage and were not run on hardware."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/huggingface/lerobot", "date": "2026-09-28", "description": "27,825 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

LeRobot is a framework for robot learning built around a simple observation: the reason policies do not transfer is that datasets, action spaces, and evaluation protocols differ per lab, so results are incomparable and models are hardware-specific. Its answer is to standardize all three. Datasets are stored in a common format - episodes of frames with observation, action, and metadata - and published on the Hub, so a demonstration set collected on one arm can be reused for another. Policies are implemented behind a common interface that takes an observation and returns an action, with implementations spanning behavior cloning, recent Transformer-based policies with action chunking, diffusion policies, and reinforcement-learning methods trained in simulation and transferred to hardware. Hardware support covers a range of arms, grippers, and mobile platforms through a driver abstraction, and evaluation runs the same protocol everywhere, producing comparable success rates.

## Why it's in the Arsenal

The recurring decision LeRobot resolves is the data format. Robot learning has a dataset problem before it has a model problem: a demonstration set is expensive to collect, tied to one embodiment's action space, stored in whatever format the collecting lab used, and often unreusable by anyone else. Standardizing the episode format and publishing sets on a Hub means a policy can be trained on data from hardware you do not own, and the abstraction over embodiments means the same policy class runs on several arms with only a configuration change. That does not remove the hard parts - generalization across embodiments is still an open research question - but it makes them researchable rather than blocked by plumbing. The second decision is a shared evaluation protocol, which is what turns a leaderboard entry into a comparable claim instead of a self-reported success rate, and it is the piece the field most lacked.

## Architecture

The stack has four layers. The dataset layer defines an episode as a sequence of frames, each carrying a timestamp, an observation dict - images, robot state, sometimes force or torque - and an action, plus episode-level metadata like the task description; datasets are written in a streaming columnar format and versioned on the Hub, so a dataset is a downloadable artifact with a fixed frame rate and a declared robot type. The dataset API can resample, filter, and compute statistics across episodes, and normalization statistics ship with the dataset so a policy trains on consistent ranges. The policy layer defines a common interface: given a batch of observations, produce actions, with implementations that differ in architecture - a vision-language backbone for observation, a Transformer decoder that emits a chunk of future actions with temporal ensembling, or a diffusion policy that denoises an action sequence - but share the training, evaluation, and checkpoint interfaces. The training layer supplies scripts for behavior cloning, pretraining, and simulation-based RL with domain randomization, plus distributed data-parallel training on a single node, and the evaluation layer runs a fixed protocol - a set of tasks, a number of rollouts, a success criterion - over a robot and reports comparable numbers. Hardware is reached through driver abstractions for specific arms, grippers, and teleoperation setups, so collecting data, training, and evaluating a policy use the same configuration object.

## Ecosystem Position

LeRobot competes with the robotics stacks that come with particular hardware vendors and with simulation-first RL toolkits, and compared with vendor stacks it wins on hardware neutrality and shared data, while losing on the tight, optimized integration a manufacturer provides with its own arm. It overlaps with the general training frameworks in this batch only in that it uses them underneath, and it is rather than a general ML library - compared with them, the abstraction is over robots, not over datasets. It is an alternative to collecting demonstrations per project in a bespoke format, and it complements the vision entries in this batch: the observation side of a policy is a perception problem, and the on-device perception graphs there are the same latency-versus-accuracy trade-off applied to a control loop. It also sits downstream of the data-and-retrieval phase, since collecting and curating demonstration episodes is a data-engineering problem with the same storage and versioning concerns. Compared with the simulation-first RL toolchains, its distinguishing bet is that real-world demonstration data is the scarce resource and should be the shared artifact.

## Getting Started

Install the package and train a policy on a published dataset, then evaluate it:

```bash
python3 -m pip install "lerobot[smolvla]"
lerobot-train \
  --dataset_id lerobot/svla_so100_pickplace \
  --policy.smolvla.pretrained_path=\"lerobot/smolvla_base\" \
  --output_dir=outputs/train/smolvla_so100 \
  --job_name=smolvla_so100_pickplace \
  --policy.device=cuda
```

Then point `lerobot-eval` at the same output directory and a robot configuration to run the standard protocol.

## Key Use Cases

1. Training a pick-and-place policy on demonstrations collected on one arm and evaluating it on another, which is only reasonable if the data format and action abstraction are shared.
2. Reusing a public dataset on the Hub for pretraining, so a small team is not paying to collect thousands of demonstrations before its first experiment.
3. Comparing policy architectures under one protocol, since identical data, task set, and success criterion make the comparison mean something.

## Strengths

- A shared dataset format and Hub-published demonstration sets, which is the precondition for reuse across labs and embodiments.
- Hardware abstraction spanning multiple arms and grippers, so a policy class is portable in a way vendor-locked stacks are not.
- One evaluation protocol across the ecosystem, turning a success rate into a comparable claim rather than a self-report.
- Apache-2.0 with implementations of behavior cloning, Transformer-with-action-chunking, diffusion, and simulation RL behind a common interface.

## Limitations

Real hardware is the bottleneck: collection is slow, resets are manual, and each experiment competes for access to an arm, so iteration speed is measured in physical time no software change fixes. The hardware coverage is a moving target, and a given arm is supported better than another, so the portability claim is strongest for the best-supported platforms. Simulation-to-real remains the unsolved part - policies still need substantial real data or careful domain randomization - and the leaderboard entries reflect that rather than hiding it. The framework is young: APIs move, and a training run written against last month's version may need edits. And there is no safety story around a learned controller on real hardware, which means every deployment carries the risk management of the research lab that built it.

## Relation to the Arsenal

The robotics branch of the training-and-alignment phase, and the place in the Arsenal where the vision entries in this batch meet a control loop - a perception model whose output is an action rather than a class. It uses the deep frameworks in content/projects/frameworks/ as its substrate and the training patterns in content/projects/training-and-alignment/ for its scripts. The data-and-retrieval phase is the closest neighbor, because dataset versioning, normalization statistics, and streaming storage are the same problems one scale up and the other hit at the start. Where the classical machine-learning entry in this batch wins on tabular data outright, this is the domain where a learned policy is genuinely ahead, and the evaluation entries in content/projects/evaluation/ are where a shared protocol would be enforced. Choose it when you have real robots and demonstration data; a simulator-only project that iterates in minutes does not need this layer.

## Resources

- [GitHub — huggingface/lerobot](https://github.com/huggingface/lerobot)
- [LeRobot documentation](https://huggingface.co/docs/lerobot)
- [Datasets and policies on the Hub](https://huggingface.co/lerobot)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (27,825 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
