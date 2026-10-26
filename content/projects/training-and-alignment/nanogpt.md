---
id: nanogpt
name: nanoGPT
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: Karpathy's frozen ~600-line GPT training repository — still the clearest complete implementation of a pretraining loop, superseded for new work by nanochat
github_url: https://github.com/karpathy/nanoGPT
license: MIT
primary_language: Python
org_or_maintainer: Andrej Karpathy
tags:
  - training
  - llm
  - foundational
maturity: production
cost_model: open-source
github_stars: 64088
github_stars_last_30d: 19
trending_score: 17
last_commit: '2025-11-12'
docs_url: https://github.com/karpathy/nanoGPT#readme
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain:
  - language
relation_to_stack:
  - study-and-reference
  - fork-and-adapt
health_signals:
  - community-driven
  - research-origin
ecosystem_role:
  - 'The teaching implementation the field keeps forking: a complete GPT-2 pretraining stack in two readable files, and the substrate the nanoGPT speedrun community measured training-efficiency research against'
best_for:
  - You want to see every part of pretraining in one sitting — data shard loading, the transformer block, the optimizer loop and DDP fit in two files you can read in an afternoon
  - You are teaching or learning training mechanics and want a codebase where nothing is hidden behind a configuration system
  - You are running a small architecture or optimizer experiment where forking 600 lines is faster than understanding a framework
avoid_if:
  - You need to fine-tune a current instruction model — the architecture is GPT-2 era (learned positions, no RoPE, no GQA, no SwiGLU), so modern checkpoints do not fit it
  - You want an actively developed base — the repository has been frozen since November 2025 by design, and `karpathy-nanochat` is where the author's recipe work continues
  - You need multi-node training — parallelism stops at single-node DDP, and Megatron-class stacks or `torchtune` are the next step up
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - karpathy-nanochat
  - litgpt
  - torchtune
  - karpathy-micrograd
integrates_with: []
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: 'Re-verified 2026-10-25: 64,069 stars, 353 open issues, MIT, last push 2025-11-12 — no commits for roughly a year. Deliberately frozen as a completed teaching artifact; status set to watching and the successor (karpathy/nanochat, 58,916 stars, last push 2026-09-07) named in the body.'
added_date: '2026-07-08'
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: watching
---

## Overview

nanoGPT is two files. `model.py` defines a GPT with the GPT-2 architecture — token and learned position embeddings, pre-LayerNorm transformer blocks, causal self-attention — in roughly three hundred lines. `train.py` is the training loop: memory-mapped data shards, gradient accumulation, cosine learning-rate decay with warmup, mixed precision, and optional DDP across GPUs, in about the same length.

Everything else in the repository is configuration. `config/train_shakespeare_char.py` trains a character-level model on a laptop; `config/train_gpt2.py` reproduces GPT-2 124M on OpenWebText, which the README budgets at about four days on eight A100s. The point of the file split is that there is no framework between you and the tensors.

The repository has not changed since November 2025 and that is the design. It is a finished teaching artifact, not a maintained library.

## Why it's in the Arsenal

The catalog has plenty of training stacks that scale. It has almost nothing that is *readable*, and readability is what you need when training behaviour surprises you.

There is a specific kind of confusion that only nanoGPT resolves: you have a loss curve that diverges at step 4,000 in a production framework, and every candidate explanation is a config flag in a library you did not write. Reading 600 lines of loop — where the only things that happen are forward, backward, clip, step — rebuilds the mental model that lets you reason about the framework again. That is why thousands of engineers who would never train in nanoGPT still read it.

It is also the substrate of a genuine research community. The nanoGPT speedrun treats "reach GPT-2 124M quality in the shortest wall-clock time" as a competitive benchmark, and the record-setting forks are where several now-standard training tricks were first demonstrated. The repo itself stays still while the ecosystem around it moves, which makes it a clean baseline.

## Architecture

The model is GPT-2 verbatim: twelve layers at 124M, 768 hidden, twelve heads, context 1,024, GELU activations, learned absolute position embeddings. No rotary embeddings, no grouped-query attention, no SwiGLU, no RMSNorm — which is precisely why it is a poor fit for modern checkpoints and an excellent fit for understanding.

The loop is conventional and explicit. Data is pre-tokenised into `uint16` shards on disk and memory-mapped, so no tokenisation happens during training and the dataloader is a few lines of slicing. The optimizer is AdamW with a parameter-group split (weight decay applied only to matrices), gradient clipping at 1.0, `bf16` or `fp16` autocast depending on the device, and DDP when more than one GPU is present. Checkpoints are plain `torch.save` calls with a resume path.

There is no checkpoint conversion layer, no distributed sharding, no activation checkpointing, and no fault tolerance. Every one of those absences is a decision that keeps the file readable, and every one is a feature you will need the moment the model does not fit on one node.

## Ecosystem Position

`karpathy-nanochat` is the successor and the honest recommendation for new work: same author, same readability, but the pipeline runs pretrain → midtrain → SFT to produce a chat model rather than stopping at base-model pretraining. If your goal is "train something that answers questions", start there; if your goal is "understand what pretraining does", nanoGPT remains clearer because it does less.

Against `litgpt` and `torchtune` the boundary is purpose. Those are libraries: checkpoint conversion for dozens of architectures, LoRA and QLoRA, FSDP, recipes for fine-tuning real models. nanoGPT is not competing with them and will fail immediately if you point it at a modern checkpoint.

`karpathy-micrograd` is the layer below — autograd from scratch, no transformer. Reading micrograd, then nanoGPT, then nanochat is the shortest path from "how does a gradient work" to "how is a chat model made".

The community forks are worth naming as a comparison class of their own: modded-nanogpt variants trade readability for speed and hold the current speedrun records. They are better for measuring a training trick and worse for learning, and the fact that they diverge from the base repo is the clearest evidence of what the base repo is for.

## Getting Started

```bash
git clone https://github.com/karpathy/nanoGPT && cd nanoGPT
pip install torch numpy transformers datasets tiktoken wandb tqdm
```

```bash
# character-level model on Shakespeare, laptop-scale, minutes
python data/shakespeare_char/prepare.py
python train.py config/train_shakespeare_char.py

# GPT-2 124M on OpenWebText, needs GPUs
python data/openwebtext/prepare.py --ngpu 8
torchrun --standalone --nproc_per_node=8 train.py config/train_gpt2.py
```

Sample from a checkpoint with `python sample.py --out_dir=out-shakespeare-char`. The two things worth changing first are `compile=True` (a free ~1.5× on modern PyTorch) and `dtype`, which should be `bf16` on Ampere or newer and `fp16` on older cards — the config comments say so, and getting it wrong produces loss curves that look like bad hyperparameters.

## Key Use Cases

1. **Learning pretraining end to end**: one afternoon with `train.py` answers questions that framework documentation answers poorly — where the learning-rate schedule applies, why warmup exists, what accumulation actually does to the effective batch.
2. **Teaching**: a workshop can run the Shakespeare character model on laptops in minutes and still show the same code path a GPT-2 reproduction uses.
3. **Baseline for a training-efficiency experiment**: the speedrun ecosystem made this the reference implementation, so a claimed optimisation has a comparable starting point.
4. **Debugging intuition for a production stack**: when a loss spike appears in a framework, a 600-line reference is where you rebuild the model of what the framework is doing.
5. **Forking for architecture experiments**: attention variants, normalization choices and optimizer tweaks are a handful of line edits rather than a plugin system.
6. **A first DDP exercise**: two GPUs and one flag is the gentlest introduction to distributed data-parallel training that exists in Python.

## Strengths

- Roughly 600 lines total and no abstraction layer: the highest ratio of understanding to reading in the entire training ecosystem.
- Complete rather than illustrative — data preparation, training, evaluation and sampling all work, and the GPT-2 124M reproduction is a real result, not a toy.
- Every design decision is visible and commented, including the ones you would otherwise take on faith (parameter groups, gradient clipping, warmup, DDP averaging).
- The speedrun community gives it an unusual property for a teaching repo: a benchmark culture with public records and reproducible optimisations.
- MIT, dependency-light, runs on a laptop's CPU for the character-level path.
- Remarkably stable — the code you read today matches the code in every tutorial that references it.

## Limitations

- **GPT-2 architecture only.** No RoPE, GQA, SwiGLU or RMSNorm means no modern weights load; adapting it to a current model is a rewrite, not a config change.
- **Frozen since November 2025.** No security or compatibility updates; a future PyTorch release that changes an API will break it and nobody upstream is watching.
- **Single-node DDP is the ceiling.** No FSDP, no tensor or pipeline parallelism, no sharding — the moment the model exceeds one node's memory, this codebase is finished.
- **353 open issues and no maintainer triage.** It is a teaching artifact, and issue reports are mostly questions that the README answered.
- **No checkpoint interop.** Converting to or from Hugging Face format is manual work, which is exactly the undifferentiated effort `litgpt` exists to remove.
- **Not a fine-tuning tool.** The instruction-tuning path, chat templates and preference optimisation all live elsewhere; do not try to make this a chat-model trainer.

## Relation to the Arsenal

Sequence it: `karpathy-micrograd` for autograd, nanoGPT for pretraining, `karpathy-nanochat` for the modern full recipe. For real workloads, `litgpt` and `torchtune` cover fine-tuning with checkpoint interop, and `megatron-lm`/`deepspeed` cover scale-out.

For the data side of pretraining, the OpenWebText pipeline is the worked example; for evaluation of what you trained, see [Benchmarks and Evals](../benchmarks-and-evals/_index.md).

## Resources

- [GitHub](https://github.com/karpathy/nanoGPT)
- [README walkthrough](https://github.com/karpathy/nanoGPT#readme)
- [nanochat (successor)](https://github.com/karpathy/nanochat)
- [modded-nanogpt speedrun](https://github.com/KellerJordan/modded-nanogpt)
- [Let's build GPT (video)](https://www.youtube.com/watch?v=kCc8FmEb1nY)
