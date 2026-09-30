---
id: karpathy-nanochat
name: "nanochat"
version_tracked: null
artifact_type: tool
category: llms
subcategory: fine-tuning
description: "MIT-licensed single-GPU recipe that pretrains, midtrains, and instruction-tunes a small chat model end to end in one repository"
github_url: "https://github.com/karpathy/nanochat"
license: "MIT"
primary_language: Python
org_or_maintainer: "karpathy"
tags: [llm, pytorch, fine-tuning]
maturity: alpha
cost_model: open-source
github_stars: 58303
github_stars_last_30d: 0
trending_score: 37
last_commit: "2026-09-07"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language, reasoning]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "The smallest honest chat-model recipe — pretrain, midtrain, and SFT a full pipeline on one GPU — used as the reference for what a modern small-model stack actually requires."
best_for:
  - "You are designing a training stack and want one readable pipeline covering tokenizer, pretrain, midtrain, SFT, and evaluation with no framework magic between the stages."
  - "You want a reproducible reference for the midtraining step, which is the least-documented phase in most small-model chat recipes and the one that most affects instruction-following behavior."
  - "You are evaluating whether your own training stack is missing a stage, since a four-stage pipeline with a held-out perplexity and chat check is a fast way to find the gap."
avoid_if:
  - "You need a model good enough to serve, because the target is deliberately a small model with a small token budget and its output will not hold a real workload."
  - "You need multi-node or multi-GPU training, because the whole design presumes one accelerator and a data budget measured in hours rather than weeks."
  - "You want a supported production stack with issue triage and release notes, since the project is a reference implementation and its breaking changes are unannounced."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 58303 stars, MIT license, Python primary language, last commit 2026-09-07, empty topics list, no homepage field. Stage names and the speedrun script are read from the repository README and script list; the hundred-dollar cost and quality claims are the author's own and were not reproduced."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/karpathy/nanochat", "date": "2026-09-28", "description": "58,303 stars and last commit 2026-09-07 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

nanochat is Karpathy's end-to-end chat-model recipe, organized as a sequence of scripts that go from raw text to a working assistant: a tokenizer trainer that produces a BPE vocabulary, a pretrain script for the base model, a midtrain stage that trains on chat-format data, a supervised fine-tune stage, and an evaluation script that reports a held-out perplexity alongside a handful of generated chat samples. The stated goal is the strongest chat model a small number of GPU-hours can buy, and the repository makes each stage runnable on a single accelerator so the whole curve can be re-measured rather than assumed. It is deliberately narrow: a small model, a small token budget, and no attempt at scale.

## Why it's in the Arsenal

The decision nanochat resolves is sequencing. A surprising number of small chat models are trained as pretrain, then SFT, then hoped upon, and the gap between them is a missing midtraining stage where the model sees formatted conversations and a share of pretraining data so it does not forget language while learning to answer. Putting the stages in one repository with a costed recipe makes that visible and, more importantly, makes it measurable: you can run the pipeline in a day and see which stage bought what. The other thing it settles is tooling sufficiency, since it deliberately does the work with modest custom code and small-scale instrumentation, which is a useful calibration against the assumption that a good small model requires an industrial training platform.

## Architecture

The pipeline is a set of stages sharing one model file and one data pipeline. The tokenizer stage fits a byte-level BPE with a trainer script and writes a compact vocabulary, so no external tokenizer library is required at runtime. Pretraining uses a standard decoder with rotary embeddings, weight-tied embeddings, and a distributed-data-parallel setup sharded over a single process group; the loop streams reshaped token batches, tracks training and validation loss separately, and checkpoints periodically. Midtraining reuses the same model class and optimizer state path but changes the data distribution to a mixture of chat transcripts, tool-use dialogue, and a replayed slice of pretraining data - that replay fraction is the interesting part, because it trades instruction adherence against catastrophic forgetting. The SFT stage is another supervised pass over curated conversations with prompt tokens masked, after which the evaluation script computes a validation-set perplexity and prints model replies to a small fixed prompt set so a regression is visible by reading rather than only by a number. Datasets are prepared into a single concatenated token stream with a validation split, so the training scripts never touch raw text at runtime.

## Ecosystem Position

nanochat overlaps with nanoGPT, which covers pretraining without the chat stages, and it is the counterpart to minimind in this batch, which follows a similar pedagogy with more variants covered. Compared with a config-driven workbench such as the LlamaFactory entry, nanochat competes for the study-and-reference slot rather than the production slot: it gives you the phases and the reasoning, while the workbench gives you breadth and a UI. It builds on the same model-definition layer as huggingface-transformers for optional export and comparison, and it is an alternative to assembling your own training scripts from a framework cookbook, since the joining parts are the actual content. For anything beyond single-accelerator, small-model training, the entries in content/projects/training-and-alignment/ are the right place to go next.

## Getting Started

Clone the repository and run the pipeline end to end on one GPU, starting with the speedrun which does all stages in a single script:

```bash
git clone https://github.com/karpathy/nanochat.git
cd nanochat
python -m pip install -r requirements.txt
export CUDA_VISIBLE_DEVICES=0
bash speedrun.sh
```

That script runs tokenizer, pretrain, midtrain, SFT, and the chat evaluation, printing validation perplexity and sample replies when it finishes.

## Key Use Cases

1. Audit your own small-model recipe: run the pipeline end to end in a day and see where your version diverges, particularly whether it includes a midtraining stage with pretraining replay.
2. Benchmark a model-training stack's throughput claims by comparing wall-clock and validation perplexity against a recipe with published numbers.
3. Generate a small but coherent instruct model for a device-constrained demo, a regression fixture, or a course where a hundred-dollar-scale result is the point.

## Strengths

- Full lifecycle in one repo, so pretrain, midtrain, SFT, and evaluation are visible together rather than scattered across projects.
- Costs are stated up front, which makes the recipe a real baseline instead of an unbounded research project.
- Deliberately minimal dependencies, so it runs on consumer hardware and does not depend on a framework release train.
- MIT licensed and short enough to read end to end, which is what makes it useful for design review rather than only for running.

## Limitations

The model is intentionally small and the token budget modest, so output quality is bounded by design and there is no path to a competitive model without replacing most of the recipe. Everything is single-accelerator: no sharding, no FSDP, no ZeRO, no pipeline parallelism, so the architecture says nothing about how to train at scale. It targets one accelerator architecture and one framework generation, so hardware changes and library updates are the usual failure mode, and there is no release or compatibility policy to plan around. The data preparation is tuned to a handful of public corpora, so reproducing the numbers on your own domain data means re-tuning stages that are not separately ablated. And because the project is a snapshot of one author's approach, ideas that later lose favor stay baked into the code without an upgrade path.

## Relation to the Arsenal

The study-and-reference anchor of content/projects/training-and-alignment/, paired with minimind in this same batch as the other minimal codebase. Its output is a small checkpoint you can serve through content/projects/inference-engines/ or a local runtime, and its tokenizer and data preparation are the parts most worth borrowing into a real pipeline. The model-definition contracts it implements come from content/projects/frameworks/, and the datasets come from content/projects/data-and-retrieval/. If your goal is a production fine-tuning job, move from here to the LlamaFactory entry; if your goal is understanding the stages, stay here.

## Resources

- [GitHub — karpathy/nanochat](https://github.com/karpathy/nanochat)
- [Author's other LLM training projects](https://github.com/karpathy)
- [nanoGPT, the pretraining-only predecessor](https://github.com/karpathy/nanoGPT)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (58,303 stars, last commit 2026-09-07, license MIT, verified via GitHub API on 2026-09-28)*
