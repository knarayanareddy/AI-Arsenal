---
id: torchtitan
name: "torchtitan"
version_tracked: null
artifact_type: platform
category: llms
subcategory: fine-tuning
description: "PyTorch-native training platform with clean-room implementations of large-scale parallelism and extension points"
github_url: "https://github.com/pytorch/torchtitan"
license: "BSD-3-Clause"
primary_language: Python
org_or_maintainer: "PyTorch"
tags: [training, pytorch, fine-tuning, efficiency]
maturity: beta
cost_model: open-source
github_stars: 5697
github_stars_last_30d: 0
trending_score: 48
last_commit: "2026-09-03"
docs_url: "https://github.com/pytorch/torchtitan#readme"
demo_url: null
paper_url: "https://arxiv.org/abs/2410.06511"
paper_id: null
phase: training-and-alignment
domain: [language, general-purpose]
relation_to_stack: [build-on-top, study-and-reference, fork-and-adapt]
health_signals: [actively-maintained, org-backed, research-origin]
ecosystem_role:
  - "The readable reference for PyTorch-native distributed training: minimal clean-room implementations of tensor, pipeline, and data parallelism that are meant to be read and extended rather than consumed as a black box."
best_for:
  - "You are modifying the training loop itself — a new parallelism strategy, a custom kernel path, or a scheduling change — and need code small enough to hold in your head while changing it"
  - "You want a published, peer-reviewed account of how the parallelism primitives compose, rather than reverse-engineering behaviour out of a large framework"
avoid_if:
  - "You want a supported, batteries-included path to fine-tune a known model on your data — the project states it is under extensive development and recommends a PyTorch nightly"
  - "Your team needs stability guarantees across releases; the API surface moves, and downstream forks such as the AMD port exist precisely because upstream tracks nightly PyTorch"
upstream_dependencies: []
downstream_consumers: []
alternatives: [litgpt, openrlhf]
integrates_with: [megatron-lm, torchtune]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (5,697), forks (979), licence (BSD-3-Clause), language (Python), created 2023-12-13, last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The README records an ICLR 2025 paper (arXiv 2410.06511), a TitanRL experiment directory, and an AMD GPU fork. Architecture claims derive from README and docs, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "arxiv", "url": "https://arxiv.org/abs/2410.06511", "date": "2026-09-03", "description": "torchtitan paper, accepted at ICLR 2025; repository at 5,697 stars as of 2026-09-03 (GitHub API)"}]
featured: false
status: active
---

## Overview

torchtitan is a PyTorch-native platform for training generative models, maintained under the PyTorch organisation and released under BSD-3-Clause. Its stated purpose is not to be the easiest way to train a model but to be the most legible one: it provides minimal clean-room implementations of the scaling techniques — tensor, pipeline, context, and data parallelism — so that a developer can read how they compose and then change them. The design is published rather than only documented, with an accompanying paper accepted at ICLR 2025. It has been developed since 2023-12-13 and reached roughly 5,700 stars by 2026-09-03.

## Why it's in the Arsenal

Most training frameworks in this catalogue are optimised for getting a run started. torchtitan is optimised for understanding and modifying one, which is a genuinely different artefact and the reason it earns a separate entry from [torchtune](../../tools/model-layer/torchtune.md). When an engineer needs to change how gradients are sharded or how pipeline stages are scheduled, a framework with a large abstraction surface becomes an obstacle; a codebase small enough to read end to end becomes the tool. Having the reference implementation catalogued also gives reviewers something to compare a vendor's parallelism claims against.

## Architecture

Training is expressed as a composition of parallelism strategies over a model definition, configured rather than hard-coded, so tensor parallelism, pipeline parallelism, context parallelism, and fully-sharded data parallelism can be combined per run. Model definitions live in a separate module with documented instructions for adding a new one, which keeps the scaling machinery independent of any particular architecture. Distributed primitives come from PyTorch itself rather than a bundled layer, so behaviour tracks upstream rather than a fork. Documented extension points allow custom components without patching core, and the repository carries an experimental reinforcement-learning stack that reuses the same model definitions and kernels for generation, so training and rollout share one implementation.

## Ecosystem Position

It overlaps [Megatron-LM](../../tools/model-layer/megatron-lm.md) in subject matter but not in intent: Megatron is a large, production-oriented framework, while torchtitan deliberately stays minimal and readable, which is why it ships as a clean-room implementation. It is distinct from [torchtune](../../tools/model-layer/torchtune.md), which targets accessible fine-tuning of known models rather than pretraining-scale experimentation. Alongside [LitGPT](./litgpt.md) it shares the "hackable training code" goal, with torchtitan weighted toward distributed scaling. It complements rather than competes with RLHF toolkits such as [OpenRLHF](./openrlhf.md), and its experimental RL stack reuses the same model definitions rather than replacing them.

## Getting Started

```bash
pip install torchtitan
torchrun --nproc_per_node=8 train.py --job.config_file ./torchtitan/models/llama3/train_configs/debug_model.toml
```

Runs are configured through TOML files, so parallelism degrees and batch settings are data rather than code changes.

## Key Use Cases

1. **Modifying the training loop** — changing a parallelism strategy or schedule in a codebase small enough to reason about.
2. **Large-scale pretraining experiments** — composing tensor, pipeline, and context parallelism for a run across many GPUs.
3. **Reference study** — reading a published account of how PyTorch-native scaling primitives fit together.

## Strengths

- Deliberate minimalism is the feature: the scaling techniques are implemented in the open rather than hidden behind abstractions.
- Peer-reviewed documentation of the design means the parallelism claims can be checked against a paper, not only a README.
- Shared model definitions and kernels between training and the experimental RL stack remove a common source of train/serve divergence.

## Limitations

- The project describes itself as under extensive development and recommends a PyTorch nightly, so it is not a stable dependency.
- Minimalism means fewer conveniences: dataset handling, checkpoint management, and model coverage are thinner than in a batteries-included framework.
- Tracking nightly PyTorch pushes upgrade risk onto downstream users, which is why hardware vendors maintain their own forks.

## Relation to the Arsenal

Catalogued in the training-and-alignment phase because it is a training platform you build on or fork. For fine-tuning rather than pretraining-scale work, see [tools/model-layer](../../tools/model-layer/_index.md); for RLHF-specific toolkits, see [OpenRLHF](./openrlhf.md) and [verl](./verl.md).

## Resources

- [GitHub](https://github.com/pytorch/torchtitan)
- [Paper (arXiv 2410.06511, ICLR 2025)](https://arxiv.org/abs/2410.06511)
- [Extension documentation](https://github.com/pytorch/torchtitan/blob/main/docs/extension.md)

---
*Verified via the GitHub API on 2026-09-03 by @maintainer — enrichment_status: draft. 5,697 stars, 979 forks, BSD-3-Clause, Python, created 2023-12-13, last commit 2026-09-03.*
