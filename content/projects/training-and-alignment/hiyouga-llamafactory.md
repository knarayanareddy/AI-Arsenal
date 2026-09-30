---
id: hiyouga-llamafactory
name: "LlamaFactory"
version_tracked: null
artifact_type: framework
category: llms
subcategory: fine-tuning
description: "Apache-2.0 fine-tuning workbench covering 100+ LLM and VLM families behind one YAML config for LoRA, QLoRA, and RLHF"
github_url: "https://github.com/hiyouga/LlamaFactory"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "hiyouga"
tags: [fine-tuning, rlhf, llm]
maturity: production
cost_model: open-source
github_stars: 75142
github_stars_last_30d: 0
trending_score: 39
last_commit: "2026-09-28"
docs_url: "https://llamafactory.readthedocs.io"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language, vision, multimodal]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "The unified fine-tuning workbench covering 100+ LLMs and VLMs behind one config surface — the fastest route from a base checkpoint to a LoRA/QLoRA/RLHF artifact."
best_for:
  - "You need an instruction-tuned artifact for a specific domain and want SFT plus LoRA in a single config file rather than a hand-assembled PEFT and Trainer script."
  - "2. You are fine-tuning a vision-language model on image-text pairs and would otherwise maintain separate tokenizer, processor, and collator code per checkpoint family."
  - "3. You want DPO or PPO alignment on top of an SFT adapter and need the reference-model, reward, and rollout wiring already solved."
avoid_if:
  - "You are doing algorithmic research on optimization or RL, because the abstraction deliberately hides the training loop behind configs and a subclassed Trainer."
  - "2. Your GPU fleet is exotic - only a non-CUDA accelerator or a single very small board - because the supported matrix assumes mainstream CUDA hardware with flash attention and bitsandbytes."
  - "3. You need a training recipe the project has not templated, since a method that does not fit the config surface means forking the framework."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 75142 stars, Apache-2.0 license, Python primary language, last commit 2026-09-28, 19 GitHub topics including lora, qlora, rlhf, peft, quantization. Model-count, backend, and export-path claims come from the official README and docs; no fine-tuning run was executed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/hiyouga/LlamaFactory", "date": "2026-09-28", "description": "75,142 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

LlamaFactory is a unified fine-tuning workbench whose entire premise is that the difference between adapting Llama, Qwen, Gemma, Mixtral, or a vision-language variant is configuration, not code. A single YAML or a set of CLI flags selects the model, the dataset and its formatting (Alpaca-style or ShareGPT-style conversations), the tuning method - full fine-tuning, freeze, LoRA, QLoRA with bitsandbytes, or RLHF with PPO/DPO/KTO - and the precision and attention implementation. It ships training and inference entry points, a web UI for launching jobs, and an export path that merges adapters so the result is a plain checkpoint any runtime can load.

## Why it's in the Arsenal

The decision LlamaFactory removes is the two-day tax at the start of every fine-tuning project: writing tokenizer and chat-template handling, pinning target modules for the right layer names, building a collator that masks prompt tokens correctly, and wiring either DeepSpeed or FSDP without silently degrading the run. Each family has different attention naming, different LoRA target conventions, and subtly different template requirements, and getting any of them wrong produces a model that trains cleanly and behaves badly. Centralizing that in maintained per-family overrides means the failure modes are already someone's solved bug. The corresponding cost is that you give up a hand-written loop, so any method outside the config surface means maintaining a fork.

## Architecture

A run is defined by four layers: the model loader, which instantiates the family through the transformers Auto classes and applies a small set of compatibility patches (attention implementations, rope settings, extra `pad_token` handling) so downstream code can assume one interface; the adapter layer, which builds either full-parameter training, PEFT LoRA with the family's correct `target_modules` list, or a QLoRA setup with a bitsandbytes 4-bit quantized base frozen in place; the data layer, where a registered dataset is normalized into either the instruction/input/output triple or the ShareGPT multi-turn role format, and a template applies the family's chat markup with loss masked over the prompt span; and the trainer, a `transformers.Trainer` subclass extended with a distributed backend - DeepSpeed ZeRO or FSDP - plus optional DeepSpeed ZeRO-3 CPU offload for weights that do not fit. RLHF runs the same pipeline with an added reward model and, for PPO, a value head and reference model, with vLLM used to generate rollouts faster than a Hugging Face generate loop. After training, the export path either merges the LoRA delta into the base weights or writes the adapter separately for later hot-swapping.

## Ecosystem Position

LlamaFactory competes with Axolotl, ms-swift, and Unsloth in the single-box fine-tuning workbench category, and compared to those it trades peak throughput for breadth of supported families and a config surface you can hand to a non-specialist. It overlaps with PEFT and TRL, which it composes rather than replaces - TRL supplies the DPO and PPO trainers it configures. It is an alternative to writing a bespoke `Trainer` script per project, and it is rather than a serving stack: export produces a checkpoint for the entries in content/projects/inference-engines/. Underneath it sits the model-definition layer in content/projects/frameworks/, and the smaller reference implementations in content/projects/training-and-alignment/ exist to teach the parts this one automates.

## Getting Started

Install the workbench and launch a QLoRA run against a single GPU:

```bash
python -m pip install llamafactory[torch,metrics,trl,peft]
llamafactory-cli train \
  --model_name_or_path Qwen/Qwen3-1.7B \
  --stage sft \
  --do_train \
  --finetuning_type lora \
  --dataset alpaca_en_demo \
  --template qwen \
  --output_dir saves/qwen3-1.7b/lora/sft
```

The matching `llamafactory-cli chat` and `llamafactory-cli export` commands merge the adapter into a standalone checkpoint afterwards.

## Key Use Cases

1. Domain-adapt a 7B-70B instruct model on a single 48-80GB GPU using QLoRA, with prompt-token masking and the family's chat template handled for you.
2. Instruction-tune a vision-language checkpoint on image-text pairs, keeping the image processor and text tokenizer in the same job definition.
3. Run preference optimization on top of an SFT adapter, loading a reward model and letting the trainer manage the reference-policy bookkeeping.

## Strengths

- The widest single-config coverage of model families of any workbench, so a new checkpoint is usually usable on day one.
- QLoRA plus DeepSpeed ZeRO makes a 70B target reachable on consumer hardware without writing memory-management code.
- DPO, PPO, and KTO alignment run on the same config surface as SFT, so the preference-tuning step is not a rewrite.
- Apache-2.0 with a Chinese-first documentation set that is unusually complete, which is a real advantage when the upstream paper is in another language.

## Limitations

The config abstraction is a ceiling as well as a floor: a custom objective, a novel regularizer, or an unusual optimizer means forking or dropping to a raw TRL script. Throughput trails the hand-tuned stacks - a few percent on well-tuned LoRA jobs, and a larger gap on QLoRA where dequantization overhead dominates - because the code prioritizes compatibility over kernel-level tuning. Support is uneven at the edges: the newest model families often land days after release, and vision-language coverage is deeper for some families than others. Training large MoE checkpoints still hits wall-clock and memory limits that no amount of configuration fixes, and the dependency set is heavy, so a pin conflict with your existing environment is a normal first-week experience.

## Relation to the Arsenal

The primary training-and-alignment entry for the Arsenal's model-definition layer, using huggingface-transformers as its substrate and PEFT/TRL underneath. The smaller sibling projects in content/projects/training-and-alignment/ - nanochat and minimind - exist to show the internals this workbench abstracts, and are the right starting point if you want to understand a training loop rather than configure one. Its outputs are what the inference engines in content/projects/inference-engines/ serve, and its datasets usually come from the retrieval and document stages in content/projects/data-and-retrieval/. Compare it against the alternatives above when throughput on a specific architecture becomes the binding constraint.

## Resources

- [GitHub — hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory)
- [LlamaFactory documentation](https://llamafactory.readthedocs.io)
- [Hugging Face TRL, the RL trainer library it configures](https://huggingface.co/docs/trl/index)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (75,142 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
