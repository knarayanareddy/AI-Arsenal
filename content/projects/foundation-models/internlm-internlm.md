---
id: internlm-internlm
name: "InternLM"
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: "Shanghai AI Laboratory's bilingual model family, shipping InternLM, InternLM2, InternLM2.5, and InternLM3 weights alongside training and RLHF code"
github_url: "https://github.com/InternLM/InternLM"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "InternLM"
tags: [llm]
maturity: production
cost_model: open-source
github_stars: 7277
github_stars_last_30d: 0
trending_score: 22
last_commit: "2025-10-30"
docs_url: "https://internlm.readthedocs.io/"
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [community-driven]
ecosystem_role:
  - "Open bilingual model family with released weights, tokenizer, and training code, giving a reproducible base for long-context and Chinese-first research."
best_for:
  - "You are fine-tuning a bilingual assistant and want a base model whose tokenizer and data mixture were documented for Chinese and English together."
  - "You are researching long-context behavior and want a model released with long sequence training recipes and an associated evaluation harness."
  - "You need an Apache-2.0 base with matching pretrain, SFT, and RLHF code so your fine-tuning recipe is diffable against the original."
avoid_if:
  - "Your workload is English-only and quality-per-parameter is the deciding factor, because stronger English-first bases generally win on common benchmarks."
  - "You have no appetite for the Chinese-first data distribution, which can shift style, formatting, and safety behavior in ways that need retuning."
  - "Your serving budget only fits a very small model, since the useful checkpoints start around the 7B class and scale upward from there."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (7277), Apache-2.0 license, last commit 2025-10-30, primary language Python, and all ten topics were read from the GitHub API. Model sizes, the 256K long-context claim, grouped-query attention, and the InternEvo framework come from the official README and documentation; no checkpoint was downloaded or benchmarked here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/InternLM/InternLM", "date": "2026-09-28", "description": "7,277 stars and last commit 2025-10-30 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

InternLM is the official repository for a family of autoregressive language models developed at Shanghai AI Laboratory. InternLM 1 introduced a 100M to 7B scale series with the InternLM-Chat alignment branch. InternLM2 reworked the architecture with grouped-query attention, RoPE scaling for extended context, and a bilingual pretraining mixture, shipping sizes from 1B to 20B. InternLM2.5 added long-context variants reaching 256K tokens, stronger math and code ability, and tool-calling support. InternLM3 continues the line. Alongside the weights on Hugging Face and ModelScope, the repository hosts training, evaluation, deployment, and chat scripts, plus the InternEvo training framework used for large-scale RL.

## Why it's in the Arsenal

The decision InternLM addresses is whether a team can adopt a capable open model without inheriting an uninspectable data pipeline. Because the pretraining mixture, tokenizer, long-context recipe, and post-training code are all published, a team can reproduce the base, replicate the reported long-context behavior, and substitute its own SFT and RLHF stages without reverse-engineering a black box. That reproducibility matters most in Chinese-English deployments, where tokenizer choice and mixture balance materially affect output quality and where most Western base models were not tuned.

## Architecture

The models are decoder-only transformers trained with grouped-query attention to shrink the KV cache at inference, with rotary position embeddings and RoPE extension techniques such as NTK-aware and dynamic scaling to stretch context. InternLM2 shipped 1B, 7B, and 20B variants plus a 1.8B long-context model, and InternLM2.5 extended that range to 256K context while adding a function-calling interface. The repo ships InternEvo, a Megatron-style parallel training framework with ZeRO-style optimizer state partitioning, plus LLaMA-Factory, XTuner, and Swift integrations so the same weights can be fine-tuned through PyTorch, DeepSpeed, or veRL.

## Ecosystem Position

InternLM overlaps directly with Llama, Qwen, and Mistral in the open base model space, and it competes with Qwen most sharply on Chinese-English quality where both target the same deployment market. It is an alternative to Llama where Apache-2.0 licensing and a documented Chinese-English mixture matter, and it differs from Llama in that long-context capability arrived as a first-class release rather than a community fine-tune. Downstream it plugs into the same serving stack as any Hugging Face checkpoint, sitting alongside vLLM, SGLang, and llama.cpp in the inference-engine phase, and the XTuner and TRL entries in training-and-alignment cover the fine-tuning side.

## Getting Started

Download a checkpoint and run the chat entry point:

```bash
pip install torch transformers accelerate
huggingface-cli download internlm/internlm2_5-7b-chat --local-dir ./internlm2_5-7b-chat
```

```bash
python chat.py --model_path ./internlm2_5-7b-chat --device cuda:0
```

```bash
# or serve the OpenAI-compatible endpoint
lmdeploy serve ./internlm2_5-7b-chat --server-name 0.0.0.0 --server-port 8000
```

Fine-tuning runs through the released training scripts or through LLaMA-Factory and XTuner wrappers.

## Key Use Cases

1. Chinese-English customer support and enterprise assistants where a tokenizer tuned for both scripts reduces mixed-language token waste.
2. Long-document analysis at 128K to 256K context, where the officially released long-context checkpoints avoid hand-rolled RoPE patching.
3. Academic reproduction of bilingual pretraining, SFT, or RLHF studies, since the training and evaluation code sits beside the weights.

## Strengths

- Full stack of weights, tokenizer, pretraining recipe, and post-training code under Apache-2.0, so reproduction is possible rather than assumed.
- Long-context checkpoints released by the model authors instead of community fine-tunes, with the RoPE scaling documented.
- Bilingual tokenizer and mixture designed for Chinese and English, which is where most Western bases are weakest.
- Integrates with the mainstream serving and fine-tuning stacks, so no proprietary runtime is required to deploy it.

## Limitations

Third-party ecosystem depth lags Llama and Qwen: fewer quantized builds, fewer LoRA adapters, and far less community tuning for niche tasks. The Chinese-first mixture is a liability for English-only products, and the style and safety tuning reflects Chinese alignment assumptions that usually need to be redone. Long-context inference is memory-bound, and a 256K context on a 7B model will not fit on a single consumer GPU without aggressive KV-cache quantization. Reported benchmark numbers were produced by the authors on their own harness, so independent re-evaluation is worth doing before committing.

## Relation to the Arsenal

This is a foundation-model entry, so it is read alongside the other base model checkpoints in the catalog such as Llama, Qwen, and Mistral rather than a tool you install. Serving it pulls you to the inference-engine phase, where vLLM and SGLang handle the runtime, and fine-tuning it lands in training-and-alignment, where PEFT, TRL, and unsloth are the relevant peers. A RAG build on top of it needs the retrieval entries in data-and-retrieval.

## Resources

- [InternLM GitHub repository](https://github.com/InternLM/InternLM)
- [InternLM documentation and model cards](https://internlm.readthedocs.io/)
- [InternLM weights on Hugging Face](https://huggingface.co/internlm)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (7,277 stars, last commit 2025-10-30, license Apache-2.0, verified via GitHub API on 2026-09-28)*
