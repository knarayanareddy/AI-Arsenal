---
id: torchtune
name: torchtune
type: tool
job: [fine-tuning]
description: PyTorch-native post-training library with readable SFT, KD, DPO, PPO and GRPO recipes — development wound down in 2025, so treat it as reference code
url: "https://github.com/meta-pytorch/torchtune"
cost_model: open-source
pricing_detail: BSD-3-Clause and free; the real cost is that no one is maintaining it upstream
tags: [fine-tuning, llm, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Unlimited but unmaintained — upstream development wound down in 2025, with no fixes or new model support
self_hostable: true
open_source: true
source_url: "https://github.com/meta-pytorch/torchtune"
docs_url: "https://pytorch.org/torchtune/main/index.html"
github_url: "https://github.com/meta-pytorch/torchtune"
alternatives: [axolotl, llamafactory, mlx-lm, peft, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research]
best_when:
  - You want to read and modify the training loop — each recipe is one readable Python file rather than a configuration system over an opaque trainer
  - Your work sits inside PyTorch and you would rather use native FSDP, `torchao` quantisation and activation offloading than a wrapper's abstractions
  - "You need the recipes as a reference: SFT, knowledge distillation, DPO, PPO, GRPO and quantisation-aware training are each implemented in plain PyTorch in one repository"
avoid_when:
  - You need support for a model released after mid-2025 — upstream wound down, so new architectures are not being added
  - You want a maintained dependency with security fixes and issue triage — the model coverage is frozen and the tracker is largely unanswered
  - A config-only workflow would do — Axolotl or LLaMA-Factory cover more model families with less code reading
version_tracked: null
verdict: deprecated
verdict_rationale: Excellent reference implementation of PyTorch post-training, but upstream development wound down in 2025 — adopt as reading material or as code you own, not as a maintained dependency
status: watching
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: repo is meta-pytorch/torchtune (5,823 stars, 469 open issues, last push 2026-09-09). README carries a warning that torchtune is no longer actively maintained and development wound down in 2025 (issue #2883). Recipe and model coverage recorded from the README's own tables."
---

> **TL;DR:** The most readable PyTorch post-training codebase there is — and no longer maintained, which makes it a template to copy rather than a library to depend on.

## Overview

torchtune implemented LLM post-training in plain PyTorch. Instead of a framework with a trainer class, it shipped recipes: one file per technique, each a complete training loop you could read in an hour — `lora_finetune_single_device`, `full_finetune_distributed`, `knowledge_distillation_distributed`, plus preference-optimisation and RL variants for DPO, PPO and GRPO, and quantisation-aware training.

Models were native PyTorch implementations inside the library rather than wrappers around `transformers`: Llama 3.2 (including the vision variants), Llama 3.3, Llama 4, Gemma 2 and 3, Mistral, Phi and Qwen2.5/Qwen3. Configuration was YAML, run through `tune run <recipe> --config <config>`, with `tune ls` listing every available pairing.

In 2025 the project wound down. The README now opens with a notice that torchtune is no longer actively maintained, credits its 150-plus contributors, and links the issue that documents the decision.

## Why It's in the Arsenal

Because the reason to read it has not expired with the maintenance.

Post-training libraries split into two kinds: those that hide the loop behind configuration, and those that expose it. torchtune was the best of the second kind for PyTorch. If you need to know what a DPO loss does to a logit, how activation offloading interacts with checkpointing, or where FSDP wrapping has to happen relative to the optimizer, this code answers it in the form of working code rather than a paper.

That makes it the reference for a specific job: writing your own recipe. A team that forks a recipe and owns it has a maintainable asset; a team that installs the package and expects new model support has a dead dependency, and the entry needs to say which of those it is recommending.

It is also a warning about documentation drift in the other direction: the README's "recent updates" list still reads as current from May 2025, and 469 open issues remain open. A project can look alive from the file list and be finished.

## Key Features

- **Readable recipes as the unit of work**: full fine-tune, LoRA/QLoRA and distillation, each in one file, single-device and distributed variants named for what they do.
- **The full post-training set**: SFT, knowledge distillation, DPO, PPO, GRPO and quantisation-aware training, each with runnable example configs.
- **Native PyTorch model implementations**: Llama 3.2 (text and vision), Llama 3.3, Llama 4, Gemma 2/3, Mistral, Phi and Qwen2.5/Qwen3, defined in library code rather than imported from a model hub wrapper.
- **YAML configuration with discovery**: `tune run <recipe> --config <model>/<recipe>` and `tune ls <recipe>` to enumerate what exists.
- **Memory-efficiency toolkit**: activation checkpointing, activation offloading, `torchao` quantisation for QLoRA, and gradient accumulation wired into the recipes.
- **Multi-node training** (added February 2025) with FSDP, so a full fine-tune scales beyond a single node.
- **Checkpoint conversion**: `tune convert` to and from the Hugging Face format, which is what makes a trained adapter usable in vLLM or Transformers for inference.
- **PEFT options beyond LoRA**: DoRA and QLoRA variants with the same recipe structure.

## Architecture / How It Works

The design centres on a small number of composable pieces. A recipe constructs a model from the library's own implementation, wraps the components with FSDP as configured, builds an optimizer and a learning-rate schedule, and runs an explicit loop with loss, backward, clip, step and periodic evaluation. PEFT is a module-level transformation: adapters are injected into named projections, base weights are frozen, and only the adapter parameters enter the optimizer.

Configuration is a YAML file plus command-line overrides, resolved through a config system that also instantiates the components. That is the one abstraction the library insisted on, and it is the part people found fussy — but it also means a recipe is reproducible from a single file.

Checkpoints are PyTorch-native, with a conversion step to the Hugging Face naming scheme. The conversion is the critical operational detail: an adapter trained here is only useful if it loads into the serving stack, and the converter was the bridge.

## Getting Started

Existing installs still work; new work should treat the code as a starting point:

```bash
pip install torchtune
tune ls lora_finetune_single_device           # list shipped configs
tune download meta-llama/Llama-3.2-3B --output-dir ./models/
tune run lora_finetune_single_device --config llama3_2/3B_lora_single_device
```

```yaml
# config override, e.g. custom_sft.yaml
model: llama3_2/3B
tokenizer: llama3_2
checkpointer: llama3_2
dataset: my_dataset
epochs: 2
batch_size: 4
optimizer: torch.optim.AdamW
lr: 2e-5
```

```bash
tune run lora_finetune_single_device --config llama3_2/3B_lora_single_device epochs=2
tune convert ./models/llama3_2_3b --output-dir ./hf-converted   # back to HF format
```

The dataset component is where every adaptation starts: point it at your JSONL, inherit the message-transform contract, and the rest of the recipe is unchanged. If you fork, pin the commit and vendor the recipe — an unpinned clone will silently follow whatever upstream state exists.

## Use Cases

1. **Learning how post-training actually works**: reading `lora_finetune_distributed` end to end is faster than assembling the same knowledge from papers and framework docs.
2. **Writing a recipe you will own**: copy the recipe, delete the PEFT path you do not need, keep the memory-management configuration, and you have a training script with no framework dependency.
3. **DPO and preference training reference**: the loss, the paired-data collation and the reference-model handling in one file, which is the clearest place to compare implementations.
4. **GRPO before committing to an RL framework**: the recipe shows the loop at a small scale in a form you can debug, unlike a multi-backend RL stack.
5. **Quantisation-aware training experiments**: QAT and QLoRA paths in the same codebase, so the effect of quantisation on fine-tuning is a config change.
6. **Adapting for a new model you add yourself**: the library's model implementations show what a PyTorch LLM needs — rotary embeddings, attention masking, KV-cache interface — for a model it does not ship.
7. **Auditing a vendor claim**: when a hosted fine-tuning product describes its method, this is a readable baseline to compare the description against.

## Strengths

- The clearest PyTorch post-training code in public: recipes are complete files, not framework hooks.
- Rare breadth in one place — SFT, distillation, DPO, PPO, GRPO and QAT under one config system with the same structure.
- Native model implementations with no `transformers` indirection, which is why it stays readable when the model code matters.
- Memory-efficiency features (activation offloading, `torchao` quantisation, checkpointing) are wired into the recipes rather than left as an exercise.
- Checkpoint conversion to Hugging Face format makes the output usable in the serving tools this catalog also lists.
- Free and permissive (BSD-3-Clause), with 150-plus contributors' worth of review behind the code.

## Limitations / When NOT to Use

- **Unmaintained since 2025.** The README warns explicitly; no new architectures, no fixes, no security response, and 469 open issues that no one is triaging.
- **Model coverage is frozen at mid-2025.** Llama 4 and Qwen3 are the last additions; anything newer requires implementing the architecture yourself.
- **Deprecation is not the same as abandonment by the ecosystem.** Most successor tools inherited the recipes' ideas, which means forks diverge and existing fixes are not merged anywhere.
- **The config system is polarising.** A YAML instantiation layer between you and the recipe is more machinery than the "just Python" pitch suggests.
- **Not a turnkey fine-tuning product.** No dataset validation, no evaluation harness, no hyperparameter defaults tuned per model — those are Axolotl's and LLaMA-Factory's features.
- **Distributed recipes assume you know FSDP.** The multi-node path is documented, and debugging a sharding problem here is still debugging FSDP.
- **Adoption as a dependency is the mistake being warned against.** Treating it as a library means inheriting a dead end; treating it as source material is the intended use.

## Integration Patterns

- *Fork, don't install*: copy the recipe and its config into your repository, pin the commit in the attribution, and make the training script yours — that converts the maintenance gap into an owned asset.
- *Convert before serving*: run `tune convert` and load the result into `vllm` or Transformers to prove the artefact before you build evaluation around it.
- *Memory planning*: sequence length, activation checkpointing and offloading are the three knobs that decide whether a model fits; set them from measured memory rather than from the config's defaults.
- *Alternatives in the same job*: `axolotl` for a config-driven workflow with broad model coverage, `llamafactory` for a UI-plus-config route over many families, `unsloth` for speed on single-GPU LoRA, `mlx-lm` for Apple silicon, `peft` when you want to assemble the loop yourself.
- *Before committing*: check whether your target model appears in `tune ls`; if it does not, the recipe is still readable but the support is not there.

## Resources

- [GitHub](https://github.com/meta-pytorch/torchtune)
- [Documentation](https://pytorch.org/torchtune/main/index.html)
- [Recipes overview](https://pytorch.org/torchtune/main/recipes/recipes_overview.html)
- [The future of torchtune (wind-down issue)](https://github.com/meta-pytorch/torchtune/issues/2883)

## Buzz & Reception

- Well regarded while active for readability and memory efficiency, and widely used in PyTorch-native fine-tuning tutorials.
- Its wind-down is now the most important thing to know about it, and the README's own notice is the primary source rather than any third-party commentary.

---
*Last reviewed: 2026-10-25 by @maintainer*
