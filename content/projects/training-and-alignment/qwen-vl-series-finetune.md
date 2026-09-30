---
id: qwen-vl-series-finetune
name: Qwen-VL-Series-Finetune
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Single-repo training scripts for Qwen2-VL, Qwen2.5-VL, Qwen3-VL and Qwen3.5 spanning SFT, DPO, GRPO and classification"
github_url: "https://github.com/2U1/Qwen-VL-Series-Finetune"
license: Apache-2.0
primary_language: Python
tags: [fine-tuning, multimodal, rlhf]
maturity: beta
cost_model: open-source
github_stars: 1972
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-09"
docs_url: "https://github.com/2U1/Qwen-VL-Series-Finetune"
demo_url: null
phase: training-and-alignment
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives a Qwen-VL owner one maintained script family for SFT, preference and RL training without adopting a general multi-model trainer."
best_for:
  - "You are fine-tuning a Qwen-VL checkpoint and you want LoRA, DoRA, full fine-tuning, DPO or GRPO in one place instead of four forks."
  - "You need video or mixed-modality training with ZeRO-3 and you want a working script rather than an example to adapt."
  - "You are porting Qwen-specific ideas such as window-attention patches and separate learning rates for the projector and vision tower, and you want the upstream-shaped implementation."
avoid_if:
  - "You need a general multi-architecture trainer, since the repository is deliberately scoped to the Qwen-VL family and its authors keep separate sibling repos for Phi3-Vision, Llama 3.2 Vision, Molmo, Pixtral, SmolVLM and Gemma 3."
  - "You need a stable, tested release cadence, because the update log shows frequent dependency bumps such as transformers 5.3.0 and liger-kernel 0.8.0 that can break a working environment."
  - "You need managed training infrastructure, since this is scripts you run and debug yourself with no job queue, checkpoint management or experiment tracking."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, default branch and issue count. Feature list, dependency versions, install methods and the window-attention patch are read from the README; no training run was executed and no memory or throughput figure was measured."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

This repository is a training script set for the Qwen-VL family, covering Qwen2-VL, Qwen2.5-VL, Qwen3-VL and Qwen3.5 using Hugging Face Transformers and Liger-Kernel only. Supported training modes include full supervised fine-tuning, LoRA and DoRA, DPO, GRPO, video training and a classification path with an optional two-layer MLP head. The feature set is unusually deep for a single-repo trainer: multi-image and video input, mixed-modality datasets with ZeRO-3 sharding, separate learning rates for the visual projector and the vision tower, partial unfreezing of only a few LLM and vision layers, reasoning-mode training for Qwen3-VL and Qwen3.5, in-training evaluation driven by a user-supplied compute_metrics function, and LoRA weight merging. There is also a monkey patch of Qwen2.5-VL window attention and forward added in August 2025 to cut memory and speed up training, and Gradio inference for quick checks. Its author maintains parallel sibling repositories for Phi3-Vision, Llama 3.2 Vision, Molmo, Pixtral, SmolVLM and Gemma 3, which tells you exactly how the project's scope is meant to be read.

## Why it's in the Arsenal

Qwen-VL has a habit of shipping architecture that upstream Transformers supports only after the fact, so users end up patching their own trainers. The recurring work is not writing an SFT loop, it is getting a specific Qwen detail right: the visual tower's learning rate, window attention memory, the reasoning chat template, MoE expert routing in Qwen3-VL, or the DPO and GRPO variant that actually runs for a video model. This repository consolidates those Qwen-specific answers into one script set, and the sibling repos show the same treatment applied per model family. The decision it removes is whether to write and maintain a bespoke trainer with your own patches, or adopt a Qwen-specialised reference and spend your time on data and evaluation instead.

## Architecture

Training runs through plain Transformers Trainer subclasses with Liger-Kernel supplying fused, memory-efficient kernels for the Qwen transformer blocks, which is what makes single-node fine-tuning of a 7B VL model practical on consumer GPUs. Data is supplied as a dataset directory with a declared modality mix, and the script builds Qwen chat-template-formatted conversations; a dedicated reasoning-format section describes the think-then-answer structure required for Qwen3-VL and Qwen3.5 reasoning checkpoints. Parameter-efficient modes attach LoRA or DoRA adapters, optionally limited to a chosen number of LLM layers and vision-tower layers, and support different learning rates for the projector versus the vision backbone. Preference and RL paths reuse the same data plumbing: DPO consumes chosen and rejected pairs, and GRPO adds the extra prerequisites the README lists separately. Video training resolves memory by lowering image resolution, and evaluation during training is wired through a compute_metrics function the user implements for their own task. Inference after training is available through a Gradio web UI, and LoRA adapters can be merged back into the base weights.

## Ecosystem Position

It is a Qwen-specialised alternative to the general trainers in content/projects/training-and-alignment such as LLaMA-Factory, ms-swift and XTuner, all of which cover many families with more polished experiment management, and a peer rather than a replacement for the Roboflow maestro entry in this batch, which covers fewer models with easier defaults. It overlaps directly with unsloth, which pursues the same low-memory, kernel-optimised fine-tuning goal with broader framework support, and the difference is that here the optimisation is bolted onto stock Transformers with Liger-Kernel rather than replacing the model internals. It complements rather than duplicates the alignment research in content/research/training-and-alignment, which supplies the DPO and GRPO derivations the scripts implement, and it produces checkpoints for the serving engines in content/projects/inference-engines.

## Getting Started

Create an isolated environment and install either the requirements file or the conda environment file, then edit the dataset path in the training script. The repository ships a Dockerfile for the CUDA setup if you would rather not assemble it yourself.

```bash
git clone https://github.com/2U1/Qwen-VL-Series-Finetune.git
cd Qwen-VL-Series-Finetune
conda env create -f environment.yaml && conda activate qwen_vl_finetune
```

For a LoRA run, edit `MODEL_ID`, `DATA_ID` and the LoRA flags near the top of the relevant training script and launch it with deepspeed or plain torch. The README notes `liger_kernel==0.8.0` and a `transformers==5.3.0`-class codebase as the tested pairing at the time of writing.

## Key Use Cases

1. SFT a Qwen2.5-VL or Qwen3-VL model on your own image or video instruction data, with LoRA or DoRA on a single workstation GPU.
2. Preference and RL training: run DPO on chosen/rejected pairs, or GRPO where the README's prerequisites are met, including for video data.
3. Task-specific heads: train the classification path with the optional two-layer MLP head when you want labels rather than free-form generation.

## Strengths

- One repository covers SFT, LoRA, DoRA, full fine-tuning, DPO, GRPO, classification and video across four Qwen-VL generations.
- Qwen-specific detail is handled in-repo, including window-attention memory patches, split learning rates for projector and vision tower, and reasoning-mode templates.
- Liger-Kernel fused kernels keep memory low enough for single-node fine-tuning without a custom model implementation.
- In-training evaluation, Gradio inference and LoRA merging make a script-based workflow usable without building surrounding tooling.

## Limitations

It is scripts, not a product: there is no experiment tracker, no job queue, no checkpoint lifecycle management, and debugging a failed run means reading the code. The scope is one model family by design, and the author's sibling repositories exist precisely because nothing here generalises, so supporting another architecture means starting over. Dependency churn is a genuine operational cost, with a March 2026 jump to transformers 5.3.0 and a May 2026 bump to liger-kernel 0.8.0 both landing in the same codebase, and a working environment can break without a code change on your side. GRPO and video-DPO paths are recent and less exercised than SFT, and several options such as the classification head and partial unfreezing are described as experimental. The monkey patch for Qwen2.5-VL window attention is exactly the kind of change that requires re-validation whenever upstream Transformers changes.

## Relation to the Arsenal

This belongs in content/projects/training-and-alignment next to the general trainers, and its outputs feed content/projects/foundation-models and content/projects/inference-engines, since a fine-tuned Qwen-VL checkpoint is only useful once an engine can serve it. Read it alongside the alignment research in content/research/training-and-alignment for the DPO and GRPO formulations, and alongside the retrieval entries in content/projects/data-and-retrieval if your data starts as documents rather than images. The alternative path through a managed toolchain lives in content/tools, and the evaluation wiring here is the lightweight counterpoint to content/tools/evaluation-and-observability.

## Resources

- [Repository and training scripts](https://github.com/2U1/Qwen-VL-Series-Finetune)
- [Liger-Kernel (LinkedIn)](https://github.com/linkedin/Liger-Kernel)
- [Qwen2.5-VL-7B-Instruct base checkpoint](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct)
