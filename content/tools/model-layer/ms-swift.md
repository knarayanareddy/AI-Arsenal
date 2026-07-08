---
id: ms-swift
name: ms-swift
type: tool
job: [fine-tuning]
description: ModelScope's fine-tuning and RLHF framework covering 500+ LLMs and 200+ multimodal models — the broadest coverage in open fine-tuning, strongest on Qwen
url: "https://github.com/modelscope/ms-swift"
cost_model: open-source
pricing_detail: Open source (Apache-2.0)
tags: [fine-tuning, rlhf, multimodal]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; no usage limits
self_hostable: true
open_source: true
source_url: "https://github.com/modelscope/ms-swift"
docs_url: "https://swift.readthedocs.io/en/latest/"
github_url: "https://github.com/modelscope/ms-swift"
alternatives: [llamafactory, axolotl, unsloth]
integrates_with: [peft]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You fine-tune Qwen-family or other Chinese-ecosystem models — ms-swift is Alibaba/ModelScope's own framework and lands day-one support for those releases before community frameworks do
  - You need multimodal fine-tuning (vision-language, audio) or RLHF methods (DPO, GRPO, PPO) in the same framework as your SFT runs — its coverage there is broader than most alternatives
avoid_when:
  - Your models are mainstream Llama-family and your team is English-docs-first — LLaMA-Factory and Axolotl have larger Western communities and more battle-tested configs for that path
  - You want a thin library rather than a full CLI framework — PEFT plus your own loop is less to learn
version_tracked: null
verdict: solid-choice
verdict_rationale: Broadest model/method coverage in open fine-tuning and the definitive choice for Qwen-family work; smaller Western community than LLaMA-Factory or Axolotl
status: active
---

> **TL;DR:** ModelScope's fine-tuning/RLHF framework with the broadest model coverage in the space. Open source. Best for Qwen-family and multimodal fine-tuning.

## Overview

ms-swift (Scalable lightWeight Infrastructure for Fine-Tuning) is ModelScope's training framework: SFT, DPO/GRPO/PPO-style RLHF, and pretraining across 500+ text LLMs and 200+ multimodal models, with LoRA/QLoRA and quantized-training support, a CLI and web UI, and export paths to GGUF/AWQ. Backed by Alibaba's ModelScope, it's effectively the first-party training stack for the Qwen ecosystem.

## Why It's in the Arsenal

The fine-tuning phase already covers the Western defaults (Axolotl, LLaMA-Factory, Unsloth, torchtune); ms-swift fills the coverage they miss — day-one Qwen-family support and unusually broad multimodal + RLHF method coverage in a single framework. As Qwen checkpoints anchor much of open-weight practice, the framework that tracks them fastest earns a slot. See Strengths / Limitations below before adopting it.

## Key Features

- 500+ LLMs and 200+ multimodal models supported, with fastest coverage of Qwen releases
- Full method spread: SFT, DPO, GRPO, PPO, KTO, pretraining, and quantized training (QLoRA, GPTQ/AWQ-aware)
- CLI-driven with a Gradio web UI; Megatron-backend option for large multi-node runs
- Export to deployment formats (GGUF, AWQ) and direct ModelScope/HF hub integration

## Architecture / How It Works

A configuration/CLI layer over Transformers and PEFT (with an optional Megatron backend for large runs): `swift sft`/`swift rlhf` commands assemble model, template, dataset, and method from flags or config files; chat-template handling per model family is built in, which is where its day-one model support materially lives.

## Getting Started

```bash
pip install ms-swift
swift sft --model Qwen/Qwen2.5-7B-Instruct --dataset my_data.jsonl --train_type lora
```

## Use Cases

1. **Scenario**: LoRA/QLoRA fine-tuning of a just-released Qwen model the week it ships, before other frameworks add its template
2. **Scenario**: vision-language model fine-tuning (Qwen-VL class) where most text-first frameworks have thin or no support
3. **Scenario**: running SFT then DPO/GRPO in one framework without stitching TRL onto a separate SFT stack
4. **Scenario where this is NOT the right fit**: mainstream Llama fine-tuning with an English-first team — the larger communities around LLaMA-Factory/Axolotl reduce friction

## Strengths

- Widest model-coverage matrix in open fine-tuning, with first-party speed on the Qwen family — a structural advantage, not a feature
- SFT + RLHF + multimodal in one framework removes the usual multi-tool stitching
- Active org backing (ModelScope/Alibaba) with high release cadence (14.7k stars, daily commits as of 2026-07-08)

## Limitations / When NOT to Use

- Documentation and community discussion skew Chinese-first; English docs exist but lag — expect more self-service debugging for Western teams
- Full-framework abstraction: when a run misbehaves, you're debugging swift's template/config layers, not your own loop

## Integration Patterns

- Compare against [LLaMA-Factory](./llamafactory.md), [Axolotl](./axolotl.md), and [Unsloth](./unsloth.md) before adopting — they solve the same job in this phase.
- Builds on [PEFT](./peft.md) for adapter methods; exports feed llama.cpp/vLLM-style serving.
- Link this tool from job guides using its canonical ID `ms-swift`.

## Resources

- [Primary site](https://github.com/modelscope/ms-swift)
- [Documentation](https://swift.readthedocs.io/en/latest/)
- [Source](https://github.com/modelscope/ms-swift)

## Buzz & Reception

- 14.7k GitHub stars, Apache-2.0, daily commit activity verified via the GitHub API on 2026-07-08; the reference framework in Qwen model cards' fine-tuning instructions.

---
*Last reviewed: 2026-07-08 by @maintainer*
