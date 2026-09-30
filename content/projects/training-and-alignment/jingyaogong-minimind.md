---
id: jingyaogong-minimind
name: "minimind"
version_tracked: null
artifact_type: tool
category: llms
subcategory: fine-tuning
description: "Apache-2.0 minimal LLM codebase that pretrains and instruction-tunes a 64M-parameter model on one consumer GPU in roughly two hours"
github_url: "https://github.com/jingyaogong/minimind"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "jingyaogong"
tags: [llm, pytorch, fine-tuning]
maturity: beta
cost_model: open-source
github_stars: 62810
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-09-22"
docs_url: "https://jingyaogong.github.io/minimind"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language]
relation_to_stack: [study-and-reference]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Minimal end-to-end LLM training codebase that fits a 64M-parameter model on a single consumer GPU in about two hours — the reference for reading a full pretraining loop without framework noise."
best_for:
  - "You are an engineer joining an LLM project and need to understand the full pretraining loop - data packing, RoPE, grouped-query attention, loss scaling - without first learning a framework's abstractions."
  - "2. You are building a curriculum or workshop and need a codebase small enough for a reader to hold in their head and run on hardware a student owns."
  - "3. You are prototyping a new architectural variant and want a baseline you can diff against, since the model file is a few hundred readable lines rather than a generated config."
avoid_if:
  - "You need a competitive model, because a 64M-parameter model trained on a small corpus is a pedagogical artifact and will not hold a real workload."
  - "2. You need distributed training, FSDP, or ZeRO, because the entire point is a single-device script with no sharding code to read or debug."
  - "3. You need a supported, maintained path to production, since the project follows upstream model releases closely and its breaking changes track paper publication rather than release cadence."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 62810 stars, Apache-2.0 license, Python primary language, last commit 2026-09-22, only 2 GitHub topics. Architecture details (RMSNorm, RoPE, GQA, SwiGLU, MoE and distillation scripts) come from the repository README and code layout; the two-hour 64M training claim is the project's own README figure and was not reproduced."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/jingyaogong/minimind", "date": "2026-09-28", "description": "62,810 stars and last commit 2026-09-22 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

minimind is a deliberately small end-to-end LLM project: a compact model definition, a dataset preparation step, and separate training scripts for pretraining, continued pretraining, supervised fine-tuning, and - in recent versions - a mixture-of-experts variant and a distillation recipe. The default target is a roughly 64M-parameter decoder trained from scratch on a single consumer GPU in about two hours, which is short enough to iterate on while reading. The model follows the mainstream decoder recipe - RMSNorm, rotary position embeddings, SwiGLU, grouped-query attention, tied embeddings - and the repository also documents conversion to and evaluation against an external open-weight model so the output can be sanity-checked against a real target.

## Why it's in the Arsenal

The decision minimind resolves is comprehension cost. Frameworks are excellent at running experiments and terrible at letting you see what is happening: a training step crosses a config parser, a model registry, a `Trainer` subclass, a collator, and a scheduler, and a bug in any of them surfaces as a curve that declines to move. Here the whole path - tokenize, pack into fixed-length blocks, build the batch, forward, cross-entropy over shifted labels, AdamW with cosine decay and warmup, gradient accumulation, checkpoint, resume - is in a few hundred lines you can read in one sitting. The second benefit is that experiments are cheap enough to be real: changing the learning rate schedule and rerunning costs minutes, so you can build intuition about what actually moves a loss curve instead of reading about it.

## Architecture

The model file assembles a standard decoder: an embedding table, N blocks of RMSNorm, causal self-attention with rotary embeddings and grouped-query key-value heads, an MLP using a SwiGLU gate, a final norm, and a tied LM head, with weights initialized by scaled normal rather than the naive scheme. Data preparation converts a raw corpus into a binary token file, and the training loop memmaps that file, slices fixed-length blocks, and shifts the labels by one so the next-token objective falls out of an ordinary cross-entropy. The training script wraps AdamW with a warmup-then-cosine schedule, gradient accumulation for an effective batch larger than VRAM allows, and optional `torch.compile`; on mixed hardware the device is selected by inspection so the same script runs on CUDA, MPS, or CPU. The instruction-tuning stage adds a supervised dataset in a chat template with prompt masking and a short assistant-only loss span, so the pretrained checkpoint's behavior is trained rather than prompted. Later additions cover a DeepSeek-style sparse MoE configuration with a load-balancing auxiliary loss, and a distillation script that trains the small model against logits from a larger open-weight teacher.

## Ecosystem Position

minimind competes with nanoGPT and litgpt as the read-the-whole-loop reference implementation, and compared with those it goes further into post-training and MoE territory rather than stopping at pretraining. It is an alternative to learning a framework's extension points, and it is rather than a training platform: there is no multi-node support, no experiment tracker, and no model registry. It complements rather than replaces the workbench in content/projects/training-and-alignment/ - once you understand the loop here, the config-driven runs in LlamaFactory make more sense - and it sits on the same model-definition layer as huggingface-transformers, which it can export to. The nanochat entry in this batch is the closest comparison and covers a similar ground with a different emphasis.

## Getting Started

Clone the repository, train the small base model, and inspect the loss curve the run prints:

```bash
git clone https://github.com/jingyaogong/minimind.git
cd minimind
python -m pip install -r requirements.txt
python train_pretrain.py --epochs 1 --hidden_size 512 --num_hidden_layers 8
```

The pretraining script prints periodic loss values and writes a checkpoint; follow with `train_sft.py` for the instruction-tuned variant.

## Key Use Cases

1. Onboard an engineer to LLM training by having them read one file end to end and modify it - swap the activation, add a layer, change the schedule - with a two-hour feedback loop.
2. Prototype an architecture change on a scale where a full training run is cheap, then port the idea into a real fine-tuning stack once the loss curve confirms it.
3. Produce a small instruct model for a device-constrained demo, a course, or a regression fixture in a test suite, where a 64M model is the right size rather than a compromise.

## Strengths

- Legibility first: the entire pretraining path is short enough to audit line by line, which no framework-level stack achieves.
- A two-hour single-GPU loop makes architecture experiments genuinely repeatable instead of aspirational.
- Covers the full post-training arc, with SFT and preference-style recipes, plus a sparse MoE variant for readers studying expert routing.
- Apache-2.0, dependency-light, and runnable on CPU or Apple silicon, so it is not gated behind a hardware budget.

## Limitations

The model is far too small to be useful, and the quality ceiling of the output is a fixed property of the design, not a hyperparameter you can tune away. Everything is single-device: no data parallelism, no FSDP, no ZeRO, no sharding, so nothing here scales past a single card. Coverage is narrow by design - a small set of model sizes, a few dataset shapes - and the absence of an evaluation harness means you have no way to tell whether a change helped beyond watching training loss. Maintenance follows upstream paper and checkpoint releases, so scripts change under you as new architectures land; pin a commit before relying on it. And because the code is deliberately simplified, the habits it teaches around memory pressure, checkpointing discipline, and data sharding are ones you must learn elsewhere before running a real job.

## Relation to the Arsenal

The teaching counterpart to the production fine-tuning workbench in content/projects/training-and-alignment/, and the natural companion to nanochat in this same batch. It depends on the model-definition and tokenizer contracts from huggingface-transformers in content/projects/frameworks/ only for optional export, which is itself a teaching point about what a minimal training loop actually needs. The datasets it consumes usually originate in content/projects/data-and-retrieval/, and its checkpoints are small enough to serve from the entries in content/projects/inference-engines/ or llama.cpp directly. Read it before adopting the workbench, not instead of it.

## Resources

- [GitHub — jingyaogong/minimind](https://github.com/jingyaogong/minimind)
- [Project documentation site](https://jingyaogong.github.io/minimind)
- [nanoGPT, the comparable minimal codebase](https://github.com/karpathy/nanoGPT)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (62,810 stars, last commit 2026-09-22, license Apache-2.0, verified via GitHub API on 2026-09-28)*
