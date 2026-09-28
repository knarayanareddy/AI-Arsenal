---
id: accelerate
name: Hugging Face Accelerate
type: tool
job: [fine-tuning]
description: "Thin PyTorch wrapper that runs an existing training loop on CPU, TPU, or single and multi-GPU with fp8, fp16 and bf16 mixed precision"
url: "https://github.com/huggingface/accelerate"
cost_model: open-source
pricing_detail: Open source (Apache-2.0)
tags: [pytorch, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; no usage limits
self_hostable: true
open_source: true
source_url: "https://github.com/huggingface/accelerate"
docs_url: "https://huggingface.co/docs/accelerate/index.html"
github_url: "https://github.com/huggingface/accelerate"
alternatives: [torchtune, megatron-lm]
integrates_with: [peft, axolotl]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when: ["You already have a working PyTorch training loop and you need the same file to run on a TPU pod or a multi-node GPU cluster without rewriting the loop.", "You want fp8 mixed precision through Transformer Engine or MS-AMP and would rather not hand-manage autocast, GradScaler and device placement yourself.", "You debug on a laptop CPU and deploy to a cluster, and you need one script that runs unchanged in both places."]
avoid_when: ["You do not want to write a training loop yourself, because the README says outright that Accelerate is not a high-level framework and points you at other libraries for that job.", "You need ZeRO-3, FSDP or Megatron-LM guarantees, because the supported-integrations list still labels DeepSpeed, FSDP and Megatron-LM as experimental.", "Your pipeline leans on custom collective or pipeline-parallel internals, because Accelerate wraps your loop and deliberately leaves that scheduling control with you."]
version_tracked: null
verdict: recommended
verdict_rationale: The de facto distribution layer under the Hugging Face training stack; the right abstraction when you own the training loop
status: active
enrichment_status: draft
---

## Overview

Accelerate keeps a raw PyTorch script intact and pushes three concerns behind one Accelerator object: where tensors live, what precision they run at, and how a DataLoader is sharded. The README diff shows the whole contract - construct Accelerator, swap a hardcoded device string for accelerator.device, pass model, optimizer and dataloader through accelerator.prepare(), and replace loss.backward() with accelerator.backward(loss). Because prepare() returns wrapped objects, the same training body runs unmodified on single CPU, single GPU, multi-GPU on one node, multi-GPU across nodes, or TPU. Checkpointing goes through accelerator.unwrap_model(), accelerator.get_state_dict() and accelerator.save(), and notebook_launcher() brings the same abstraction into Colab and Kaggle.

## Why It's in the Arsenal

The recurring decision is whether one training script can be the only training script. Teams accumulate per-cluster launch branches, hand-written GradScaler blocks and device-placement bugs that only appear on the multi-node path nobody tests locally. Accelerate collapses that into a config file, so the tradeoff becomes whether the thin wrapper fits your loop. The honest boundary the README draws is control: you still own scheduling, gradient accumulation and pipeline shape, and the CLI is explicitly optional because you can always go back to plain python or torchrun.

## Key Features

- Small, auditable surface: the README states the entire API is the Accelerator object, so there is little to learn and little to debug.
- The same code path covers CPU, TPU, single GPU, multi-GPU single node and multi-GPU multi node, which removes the divergence between local and cluster runs.
- fp8 support via Transformer Engine or MS-AMP is a first-class mixed-precision option rather than a patch.
- Apache-2.0, and it is the backend Transformers uses on the PyTorch side, so upstream model releases assume it works.

## Architecture / How It Works

accelerate config writes a YAML to the default cache location and accelerate launch starts the processes, so the runtime has no launcher of its own. On init the Accelerator resolves distributed state through torch.distributed, wraps the model in DDP, FSDP or a DeepSpeed engine depending on configuration, and moves the DataLoader into an AcceleratorDataLoader that performs batch sharding and optional step-based skipping. Mixed precision is a context manager around the model call combined with a GradScaler for fp16; fp8 instead delegates to Transformer Engine or MS-AMP, and Megatron-LM is another backend behind the same prepare() surface. DeepSpeedPlugin lets you pass zero_stage and gradient_accumulation_steps from Python when the config file is not enough, and examples/config_yaml_templates holds ready-made configurations for common hardware layouts.

## Getting Started

Install into a virtual environment, write the config once interactively, then launch the same script you already debugged:

```bash
pip install accelerate
accelerate config
accelerate launch --multi_gpu --num_processes 2 examples/nlp_example.py
```

Skip the config step by passing torchrun arguments straight through, or use mpirun -np 2 python your_script.py for multi-CPU runs.

## Use Cases

1. Cluster porting without a rewrite: take a script that hardcodes device='cpu', add the five lines from the README, and get a TPU or multi-GPU run from the same file.
2. Mixed precision as a config change: switch fp16 to bf16 to fp8 for a new accelerator generation without touching the loss or optimizer code.
3. Notebook and TPU development: wrap a training_function in notebook_launcher() and use the same script in a Colab TPU cell and on the training cluster.

## Strengths

It competes with calling torchrun and torch.distributed yourself, which buys the same portability but leaves precision, dataloader sharding and checkpoint unwrapping as your code, and it overlaps with writing a DeepSpeed or FSDP block directly into the script. Compared with the high-level trainers the README lists - fastai, Catalyst, Kornia, Animus and pytorch-accelerated - Accelerate is deliberately rather than a framework: it adds no Runner, no experiment config and no callback system, so it is not a substitute if you wanted those. It complements entries in content/projects/training-and-alignment such as peft-library and trl, which sit above it and expect a prepared model, and it consumes nothing from the serving side.

## Limitations / When NOT to Use

The obvious limitation is that it will not write your training loop: the README explicitly says not to use it if you want that, which means experiment tracking, LR scheduling conventions and resume logic remain yours. Three of the four distributed backends the README lists - DeepSpeed, FSDP and Megatron-LM - are still marked experimental, so a production ZeRO-3 pipeline inherits an upstream caveat. The stated floor is PyTorch 1.10.0 and Python 3.8, which means you are testing against a wide range of PyTorch versions across the ecosystem. There is also no abstraction above the loop, so anything the library does not model - heterogeneous per-rank precision, custom sharding strategies, pipeline parallelism - needs custom code inside your loop again.

## Integration Patterns

This is the portability layer for the model and fine-tuning work in content/projects/training-and-alignment, sitting underneath peft-library, trl and ms-swift rather than beside them. Its own phase folder, content/tools/model-layer, holds the other training-adjacent utilities; if you need serving rather than training, content/projects/inference-engines covers the deployment side. For the RL and agent-training entries in the same training phase, the optimizer loop lives in those tools and Accelerate is what keeps the underlying script multi-device.

## Resources

- [GitHub — huggingface/accelerate](https://github.com/huggingface/accelerate)
- [Official docs — huggingface.co/docs/accelerate](https://huggingface.co/docs/accelerate/index.html)
- [CLI reference and config templates](https://github.com/huggingface/accelerate/tree/main/examples/config_yaml_templates)

## Buzz & Reception

Five added lines make one training script portable across CPU, TPU and multi-node GPU without adopting a higher-level training framework.
