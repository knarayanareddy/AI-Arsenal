---
id: peft
name: PEFT
type: tool
job: [fine-tuning]
description: "Hugging Face adapter library — LoRA, QLoRA, IA3 and prefix tuning wrapped around any Transformers or Diffusers model, with adapter hot-swapping at inference"
url: "https://github.com/huggingface/peft"
cost_model: open-source
pricing_detail: Apache-2.0 and free; the cost is GPU time for the adapter training run and the base model you still have to store
tags: [fine-tuning, llm, huggingface]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Unlimited; the constraint is the base model, not the library
self_hostable: true
open_source: true
source_url: "https://github.com/huggingface/peft"
docs_url: "https://huggingface.co/docs/peft"
github_url: "https://github.com/huggingface/peft"
alternatives: [axolotl, llamafactory, mlx-lm, torchtune, unsloth]
integrates_with: [huggingface-transformers, accelerate, axolotl]
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You already have a training loop and want adapters inside it — `get_peft_model(model, LoraConfig(...))` is the whole integration, and the rest of your code is unchanged
  - "You need to hold many adaptations of one base model: adapters are tens of megabytes each, so swapping or serving several is a disk problem rather than a GPU-cost problem"
  - "You want the published memory profile rather than a guess: the README's own table shows a 12B model going from OOM on an 80GB A100 to 56GB of GPU with LoRA, and 22GB with DeepSpeed CPU offloading"
avoid_when:
  - You want a finished fine-tuning pipeline — dataset handling, config management, evaluation and checkpoint export are what `axolotl` and `llamafactory` add on top of this library
  - You are not on Transformers or Diffusers — the library wraps those classes, and a custom model needs its own adapter implementation
  - You need maximum single-GPU LoRA speed — `unsloth` trades generality for hand-written kernels and is faster for that specific case
verdict: best-in-class
verdict_rationale: The reference implementation of adapter fine-tuning — nearly every other tool in this cluster wraps it, which makes it the compatibility target rather than one option among several
status: active
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-26: 21,851 stars, 104 open issues, Apache-2.0, push same day. README confirms Transformers/Diffusers/Accelerate integration, `get_peft_model` + `PeftModel.from_pretrained` flow, and the memory table (12B model: full fine-tune OOM on A100 80GB, LoRA 56GB, LoRA+DeepSpeed CPU offload 22GB)."
---

> **TL;DR:** The library every other fine-tuning tool in this catalog builds on — adapters as a wrapper around a frozen base model, which turns "which model can I afford to tune" into "how many adapters can I store".

## Overview

PEFT implements parameter-efficient fine-tuning as a modelling trick rather than a training framework. You load a model exactly as you normally would, wrap it with `get_peft_model(model, config)`, and train as usual — except only a small number of injected parameters are trainable. `model.print_trainable_parameters()` is the reality check, and for a LoRA on a 3B model it reports something like 3.7M trainable out of 3.09B, or 0.12%.

The consequence is storage arithmetic that changes how a team works. A full fine-tune of a 7B model produces a 14GB checkpoint per experiment; a LoRA adapter is tens of megabytes. Ten experiments become 500MB instead of 140GB, adapters for different customers fit on one disk, and loading a different adaptation is `PeftModel.from_pretrained(base, "adapter-name")` rather than a model swap.

The library covers the method families — LoRA and its quantised and DoRA variants, IA3, prefix and prompt tuning, and adapter-based approaches — behind one configuration interface, and integrates with Transformers for training, Diffusers for image models, and Accelerate for distributed runs.

## Why It's in the Arsenal

Almost every other entry in the fine-tuning cluster wraps this one. `axolotl`, `llamafactory` and `torchtune`-style tools all end up calling PEFT (or implementing the same interface) for the adapter step, which makes it the compatibility layer of the ecosystem — an adapter trained through any of them loads here.

Then there is the memory table, which is the most useful piece of documentation in the category. On a single A100 80GB: full fine-tuning of a 3B model needs 47GB, LoRA needs 14.4GB, and LoRA with DeepSpeed CPU offloading needs 9.8GB GPU plus 17.8GB of CPU RAM. A 12B model cannot be fully fine-tuned at all on that card, but fits in 56GB with LoRA and 22GB with offloading. Those numbers decide what hardware you rent, and they are measured rather than claimed.

The third reason is inference-side flexibility. Because an adapter is a separate artifact applied to a base model, one serving deployment can hold several adaptations and select per request — the mechanism behind per-tenant or per-task models without multiplying GPU memory.

## Key Features

- **LoRA and QLoRA**: low-rank updates to chosen projections, with optional 4-bit base model quantisation — the default route for fine-tuning a model that barely fits.
- **DoRA**: weight-decomposed low-rank adaptation, available as a LoRA variant when plain LoRA underfits.
- **IA3, prefix tuning, prompt tuning and p-tuning**: alternative parametrisations for cases where a low-rank weight update is the wrong shape, such as classification heads or very small adaptation budgets.
- **`target_modules` control**: aim adapters at `q_proj`/`v_proj`, at all linear layers, or at a custom list — the single most consequential hyperparameter for quality.
- **`get_peft_model` / `PeftModel.from_pretrained`**: a two-function integration with any Transformers training loop.
- **Adapter composition**: load and combine multiple adapters, or merge one into the base weights for a zero-overhead deployment.
- **`merge_and_unload`**: fold the adapter into the base model so serving has no PEFT dependency and no inference cost.
- **Quantised base support**: train on top of `bitsandbytes` 4-bit or 8-bit models, which is what makes QLoRA fit on consumer cards.
- **Diffusers integration**: the same adapter concepts for image models, which is why LoRA styles transfer between text and image tooling.
- **`print_trainable_parameters` and per-method configs**: the numbers you need to size a run, available before training starts.
- **Saved adapter format**: `adapter_config.json` plus weights, which is why adapters are portable between tools that respect the format.

## Architecture / How It Works

An adapter is a wrapper, not a fork of the model. `get_peft_model` walks the module tree, replaces targeted `nn.Linear` (or embedding) layers with PEFT modules that hold the frozen original weight and a small set of new trainable parameters, and freezes everything else. The forward pass computes the original output and adds the low-rank contribution, so gradients reach only the injected parameters.

Saving therefore writes only the adapter: a `adapter_config.json` describing the method, rank, alpha, dropout and target modules, plus the weights. Loading reads that config, reconstructs the wrapper around whatever base model you supply, and loads the weights into it. The base model is a dependency of the adapter, not part of it — which is exactly why an adapter is small and why the base model version has to match.

Merging is the deployment optimisation: `merge_and_unload` computes `W + BA` once and returns a plain model, so serving has no adapter overhead. The trade is that you lose the ability to swap adaptations, so merged weights are for a single fixed behaviour.

The failure modes follow from that design. A wrong `target_modules` list trains almost nothing and produces an adapter that does not change behaviour. A mismatched base model revision produces an adapter that loads and degrades output silently. And merging a quantised adapter into a quantised base is lossy in ways that differ from the training-time behaviour.

## Getting Started

```bash
pip install peft transformers accelerate
```

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, TaskType, get_peft_model

model_id = "Qwen/Qwen2.5-3B-Instruct"
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype="bfloat16", device_map="auto")

cfg = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    task_type=TaskType.CAUSAL_LM,
)
model = get_peft_model(model, cfg)
model.print_trainable_parameters()      # check the percentage before you train
```

```python
# train with any loop, then
model.save_pretrained("qwen2.5-3b-lora")

# inference
from peft import PeftModel
base = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype="bfloat16", device_map="auto")
model = PeftModel.from_pretrained(base, "qwen2.5-3b-lora")
model = model.merge_and_unload()        # optional: fold in for cost-free serving
```

Two checks before spending GPU hours: confirm `trainable%` is what you expect (a fraction of a percent is normal, exactly zero means `target_modules` missed), and record the base model revision in the adapter's metadata so a later load cannot silently attach to a different checkpoint.

## Use Cases

1. **Per-tenant adaptation**: one base model, an adapter per customer or per document domain, selected per request — storage scales in megabytes rather than in GPUs.
2. **Fine-tuning a model that does not fit**: QLoRA on a quantised base is the only practical way to adapt a 70B model on a small number of cards.
3. **Task heads without touching the backbone**: classification, routing or extraction where the base model must stay byte-identical across tasks.
4. **Rapid experiment loops**: train ten adapters over a weekend and compare them on the same eval set, instead of ten full checkpoints and a storage problem.
5. **Style and format adaptation for image models**: the Diffusers path applies the same idea to diffusion models, which is how visual styles are distributed.
6. **Serving many behaviours from one deployment**: load several adapters, keep the base in memory once, switch per request — the cheapest form of model multiplexing.
7. **Downstream of a full fine-tune**: full fine-tune a base once, then adapt cheaply per domain, so the expensive run is not repeated.

## Strengths

- The two-function integration (`get_peft_model`, `PeftModel.from_pretrained`) works with any Transformers loop, including ones you wrote yourself.
- The published measured memory table makes capacity planning concrete — 47GB → 14.4GB → 9.8GB for one 3B model on one GPU.
- Adapters as separate artifacts make experiment storage and multi-tenant serving tractable, which is a workflow change rather than a tuning gain.
- `merge_and_unload` removes the library from the serving path, so production inference pays no adapter overhead.
- Covered methods span the useful range — LoRA, DoRA, QLoRA, IA3, prefix and prompt tuning — behind one configuration shape.
- Apache-2.0, 104 open issues, active on the day of review, and effectively the compatibility target every other fine-tuning tool conforms to.

## Limitations / When NOT to Use

- **The pipeline above it is your problem.** Dataset formatting, packing, evaluation and export live in whichever tool you wrap around this one, so the library answers "how do I adapt weights" and nothing else.
- **Base-model coupling is the sharp edge.** An adapter is meaningless without the exact base revision it was trained against, and a mismatch loads successfully and degrades quietly.
- **`target_modules` is an easy way to train nothing.** The default heuristics do not know your architecture; a wrong list produces a plausible-looking adapter that changes nothing.
- **Adapter quality is not free.** Low-rank capacity is finite; tasks that need new factual knowledge rather than a behaviour change often want full fine-tuning or retrieval instead.
- **Merging is one-way in practice.** Once merged you cannot swap, and merging quantised adapters into quantised bases is lossy in ways the training run does not predict.
- **Transformers- and Diffusers-shaped.** A custom model needs its own adapter implementation, and the wrapper assumes a module tree it can walk.
- **Speed is not the selling point.** For single-GPU LoRA throughput, `unsloth`'s kernels beat the general implementation.

## Integration Patterns

- *Wiring*: wrap the model immediately after loading so `print_trainable_parameters` gates the run; save the adapter with the base model ID and revision in the metadata; keep the adapter in the same artifact store as the base.
- *Serving*: either merge for a single fixed behaviour, or keep the base resident and load adapters per request where the server supports it — measure the switch cost, it is not free at high request rates.
- *Evaluation*: score the adapter against the unadapted base on the same held-out set, not against a paper's number; catastrophic forgetting on unrelated prompts is the common regression and a base-model comparison catches it.
- *Alternatives in the same job*: `axolotl` or `llamafactory` for a config-driven pipeline, `unsloth` for speed, `mlx-lm` on Apple silicon, `torchtune` for readable recipes you own (noting it is unmaintained).
- *Before training*: check `trainable%`, confirm the target modules exist in your architecture, and decide up front whether you will merge or swap — that answer determines how you version the artifact.

## Resources

- [GitHub](https://github.com/huggingface/peft)
- [Documentation](https://huggingface.co/docs/peft)
- [Adapter conceptual guide](https://huggingface.co/docs/peft/en/conceptual_guides/adapter)
- [PEFT organisation (method walkthroughs)](https://huggingface.co/PEFT)
- [LoRA paper](https://arxiv.org/abs/2106.09685)

## Buzz & Reception

- Effectively the default way parameter-efficient fine-tuning is done in the Transformers ecosystem — its adapter format is what other tools read and write, which is a stronger form of adoption than a star count.
- The recurring complaint is not about correctness but about scope: practitioners arrive expecting a fine-tuning pipeline and find a modelling library, then reach for Axolotl or LLaMA-Factory to get one.
