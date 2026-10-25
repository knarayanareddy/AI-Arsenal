---
id: litgpt
name: "LitGPT"
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Lightning AI's hackable library of 20+ LLM implementations with recipes to pretrain, fine-tune and deploy at scale"
github_url: "https://github.com/Lightning-AI/litgpt"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Lightning AI"
tags: [fine-tuning, training, llm]
maturity: production
cost_model: open-source
github_stars: 13728
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-13"
docs_url: "https://github.com/Lightning-AI/litgpt/tree/main/tutorials"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language]
relation_to_stack: [build-on-top, fork-and-adapt, study-and-reference]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "Readable single-file model implementations plus production training recipes: LitGPT occupies the space between educational nanoGPT-style code and heavyweight training frameworks, with each architecture reimplemented from scratch and no abstraction layers to dig through."
best_for:
  - "You want to actually read and modify the model code you train — every architecture is a from-scratch single-file implementation, not a wrapper over transformers"
  - "You need validated pretraining/fine-tuning recipes (FSDP, TPU support, LoRA/QLoRA) with Lightning Fabric handling the distributed plumbing"
avoid_if:
  - "You need day-one support for every new model release — the from-scratch implementation approach means new architectures land slower than in transformers-based trainers"
  - "You want a YAML-only, no-code fine-tuning experience — Axolotl or LLaMA-Factory are more config-driven"
upstream_dependencies: []
downstream_consumers: []
alternatives: [axolotl, llamafactory, torchtune]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-25 via the GitHub API (13,728 stars, 317 open issues, last push 2026-10-13) and against the README model table, which is the evidence for the staleness limitation. Sections rewritten from the README and tutorials."
added_date: "2026-07-08"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Lightning-AI/litgpt", "date": "2026-10-25", "description": "13,728 stars and 317 open issues on GitHub as of 2026-10-25 (GitHub API)"}]
featured: false
status: active
---

## Overview

A library of 20+ LLM architectures reimplemented from scratch in readable PyTorch, with command-line recipes for pretraining, LoRA/QLoRA fine-tuning, continued pretraining, and deployment. The design bet is transparency: no framework indirection between you and the model code, while Lightning Fabric supplies distributed training (FSDP, DDP, TPU) when you scale.

## Why it's in the Arsenal

Most fine-tuning tooling hides the model behind a configuration schema, which is the right trade until the thing you need to change is in the model. LitGPT takes the opposite position: every architecture is a single readable file with a shared GPT base class and dataclass configs, so attention, normalisation and the loss are code you can open, edit and step through. That makes it the entry for teams who are modifying the architecture rather than only selecting one, and it is why several open pretraining efforts used it as a base instead of a higher-level trainer.

It also demonstrates a specific architectural bet worth seeing in practice: one library covers LoRA, QLoRA, adapter tuning, full fine-tuning, continued pretraining and 1-1000+ GPU/TPU runs through Lightning Fabric, without those becoming separate tools with separate config formats.
## Architecture

Each model family (Llama, Gemma, Qwen, Phi, Mistral, and others) is a standalone implementation sharing a common GPT base class; configs are dataclasses, not registry magic. Training uses Lightning Fabric strategies for sharding; quantization paths (bitsandbytes) enable QLoRA on consumer GPUs; `litgpt serve` exposes an OpenAI-compatible endpoint for quick deployment.

## Ecosystem Position

Upstream: PyTorch and Lightning Fabric. Downstream: checkpoints convert to and from Hugging Face format, so a LitGPT-trained adapter can be served by vLLM or llama.cpp, and `litgpt serve` gives a web endpoint when you do not want a separate server.

The comparison that decides between LitGPT and `axolotl` or `llamafactory` is not features — all three train LoRA on the same GPUs, and the latter two are YAML-first and therefore faster to start. It is what happens when a model needs a change the framework did not anticipate: in LitGPT that is an edit to one file, in a config-driven trainer it is a fork of the trainer or a wait for upstream. Against `torchtune` the difference is a mature recipe catalogue versus a broad model list, and against plain `transformers` plus `peft` it is that LitGPT already wires the training loop, the memory settings and the checkpoint conversion together.
## Getting Started

```bash
pip install 'litgpt[extra]'
litgpt download microsoft/phi-2
litgpt finetune_lora microsoft/phi-2 --data JSON --data.json_path my_data.json
```

## Key Use Cases

1. **Modifying an architecture, not just selecting one**: changing attention, adding a head, swapping the loss or testing a normalisation variant means editing model code, and a single-file implementation is the cheapest place to do that without forking a whole framework.
2. **Pretraining a small model from scratch**: the repository ships pretraining recipes and a TinyLlama-derived lineage, so the path from raw text to a checkpoint exists end to end rather than starting at someone else's base weights.
3. **Fine-tuning where the recipe matters more than the UI**: LoRA, QLoRA, adapter and full fine-tuning configurations live in the repository and are tested, which is what you want when a run has to be reproducible rather than clickable.
4. **Studying how a model is implemented**: reading a 300-line Llama or Gemma implementation next to the paper is a different exercise from reading a `transformers` modelling file with its compatibility shims, and it is the usual reason teams install LitGPT in the first place.
## Strengths

- No abstraction layers between the training script and the model: debugging a loss spike means reading the code that produced it, not tracing a framework's callback stack.
- One library covers the whole workflow — download, pretrain, finetune (LoRA/QLoRA/adapter/full), evaluate, convert, serve — so a team does not assemble four tools with four config formats to do one job.
- Distributed support is inherited from Lightning Fabric, so FSDP and TPU paths exist without LitGPT reimplementing them, and the same script scales from one GPU to a cluster.
- fp4/fp8/fp16/fp32 options plus bitsandbytes quantisation make QLoRA on a consumer card a documented configuration rather than an exercise in memory arithmetic.
- The from-scratch implementations double as reference code: when a model behaves differently from its paper, comparing against LitGPT's version is a fast way to find whether the discrepancy is in the model or the harness.
## Limitations

- **The model list lags the field, and the README shows it.** As of October 2026 the supported architectures top out at Llama 3.3, Qwen2.5, Gemma 3 and Phi 4 — no Llama 4, Qwen3, Gemma 4 or DeepSeek base models. Because each architecture is hand-written, a new release is work rather than a config entry, so budget for porting a model yourself or waiting.
- **From-scratch implementations mean from-scratch divergence.** A hand-written model can differ subtly from the reference in a way that shows up only in loss curves or long-context behaviour; the repository is well tested, but you are trusting its tests on the architecture you pick, not the upstream lab's.
- **317 open issues** at review time against a small maintainer team, and the project is vendor-adjacent: Lightning AI funds it and the README advertises Lightning Cloud GPUs, which is normal but means roadmap priorities and documentation framing follow the company.
- **YAML-first teams will find it slower to start.** Axolotl and LLaMA-Factory let a non-engineer fine-tune from a config file; LitGPT assumes someone who will read and edit Python and is comfortable with Fabric's launch model.
- **No published throughput numbers for your hardware.** The README's performance claims are qualitative, so time-to-train and memory per GPU at your sequence length and batch size are measurements you take during the first run, not figures you can plan from.
## Relation to the Arsenal

This is a self-hosted training and fine-tuning stack in content/projects/training-and-alignment, so it occupies the same slot as deepspeed, peft and trl rather than the managed fine-tuning services catalogued in content/tools/model-layer. The trade it makes is control: you supply the GPUs and the checkpoint, and in exchange you own the training loop, the memory configuration and every failure mode that comes with running the job yourself.

## Resources

- [GitHub](https://github.com/Lightning-AI/litgpt)
- [Documentation](https://github.com/Lightning-AI/litgpt/tree/main/tutorials)

---
*Last reviewed: 2026-10-25 by @maintainer; github_stars 13728 as of 2026-10-25; last commit 2026-10-13; both verified via the GitHub API.*
