---
id: maestro
name: maestro
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Roboflow's fine-tuning toolkit that packages config, data loading and training loops for Florence-2, PaliGemma 2 and Qwen2.5-VL"
github_url: "https://github.com/roboflow/maestro"
license: Apache-2.0
primary_language: Python
tags: [fine-tuning, multimodal, edge]
maturity: beta
cost_model: open-source
github_stars: 2696
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-24"
docs_url: "https://maestro.roboflow.com"
demo_url: null
phase: training-and-alignment
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Collapses per-model vision-language fine-tuning boilerplate into one CLI, one JSONL data format and shared LoRA/QLoRA defaults."
best_for:
  - "You are fine-tuning Florence-2, PaliGemma 2 or Qwen2.5-VL on a single GPU and you want a working recipe without writing the training loop yourself."
  - "You are turning labelled images into a VLM that emits structured output such as JSON or bounding boxes and you want QLoRA rather than a full fine-tune."
  - "You already have annotations in a JSONL file and you want a Colab-runnable baseline before you invest in a custom trainer."
avoid_if:
  - "You need to support model families beyond Florence-2, PaliGemma 2 and Qwen2.5-VL, because the recipe list is the product and it is deliberately short."
  - "You need distributed training, custom loss functions or a research-modified optimizer schedule, because you would be fighting a fixed training loop."
  - "You intend to put several supported models in one environment, since the project explicitly recommends a separate Python environment per model because their dependency requirements clash."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, homepage and issue count. Model recipes, install extras, CLI flags and Colab links are read from the README; no fine-tune was run, so the VRAM and throughput figures implied by the Colab claims are unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

maestro is a Python package published on PyPI by Roboflow that takes the repetitive parts of vision-language fine-tuning and hides them behind one interface. Each supported model contributes a core module containing its configuration schema, data loading and training routine, and the toolkit supplies the surrounding machinery: reproducible run configuration, a single consistent JSONL data format, LoRA and QLoRA adapter support, and graph freezing to keep activation memory inside consumer-hardware limits. The 1.0.0 release in February 2025 added Florence-2, PaliGemma 2 and Qwen2.5-VL, with recipes for Florence-2 at 0.9B for object detection, PaliGemma 2 at 3B for JSON data extraction, and Qwen2.5-VL at 3B and 7B for JSON extraction and object detection. Object-detection recipes are labelled experimental in the README. Four Colab notebooks ship with the project, one per model-and-task combination, so a free-tier GPU session can complete an end-to-end fine-tune without a local cluster.

## Why it's in the Arsenal

The first ninety minutes of any VLM fine-tune are spent on plumbing that has already been solved: freezing the vision tower, wiring the processor, formatting chat templates per model, choosing an adapter rank, and making sure a run is reproducible when it fails. Most teams write that plumbing from a blog post, get it half working, and lose a day to a processor that expects a different key. maestro's contribution is to make that plumbing a first-class, versioned library per model, with the same CLI shape across all of them and a shared data format so switching models does not mean rewriting the dataset. The decision it removes is whether to build a bespoke trainer or adopt a maintained recipe for the models Roboflow actually ships data tooling for.

## Architecture

The package is organised around per-model core modules under a shared CLI and SDK. A command such as maestro paligemma_2 train resolves the model-specific module, loads a YAML-style configuration for dataset location, epochs, batch size, optimizer and metrics, and delegates to that module's training routine. Data arrives as JSONL so the same file works across Florence-2, PaliGemma 2 and Qwen2.5-VL, with the module translating it into the prompt-plus-image format that model expects. Memory is controlled by LoRA or QLoRA on the language side plus graph freezing, which detaches parts of the vision-language graph so activations are not stored for backpropagation through the frozen weights. The same configuration object governs reproducibility, and metrics are declared in the config so evaluation is part of the run rather than a separate script.

## Ecosystem Position

It competes with general fine-tuning frameworks such as Hugging Face Transformers Trainer wrappers, LLaMA-Factory, ms-swift and XTuner, all of which cover far more model families, and its pitch is the opposite one: fewer models, more opinionated defaults, a single data format and a working Colab for each recipe. Where LLaMA-Factory and ms-swift chase breadth for enterprises fine-tuning many architectures, maestro assumes you picked one of three models and wants the first run done today. It overlaps with the Qwen-VL-Series-Finetune entry in this same batch, which goes deeper on Qwen-specific DPO, GRPO and video training, and it complements the data tooling in content/projects/data-and-retrieval, since Roboflow annotation formats and maestro's JSONL contract are two ends of the same pipeline. It is an alternative to writing a bespoke trainer, not a superseding replacement for the deeper frameworks.

## Getting Started

Install the extra for the model you plan to use. The project recommends a dedicated virtual environment per model because their dependency requirements conflict, then a single CLI invocation to start training.

```bash
pip install "maestro[paligemma_2]"
```

```bash
maestro paligemma_2 train \
  --dataset /path/to/train.jsonl \
  --epochs 3 \
  --batch-size 2 \
  --metrics accuracy
```

If you would rather not set up an environment at all, the repository ships Colab notebooks for Florence-2 detection, PaliGemma 2 JSON extraction, Qwen2.5-VL JSON extraction with QLoRA, and Qwen2.5-VL 7B detection, each runnable on free-tier GPUs.

## Key Use Cases

1. Structured extraction from images: fine-tune PaliGemma 2 3B or Qwen2.5-VL 3B with QLoRA to emit a fixed JSON schema from document or form images.
2. Detection with a compact VLM: adapt Florence-2 at 0.9B to your object categories when a detector fine-tune is cheaper than a general VLM fine-tune.
3. Baseline before custom work: get a reproducible, Colab-runnable fine-tune of a supported model in an afternoon, then fork the training loop only once you have a number to beat.

## Strengths

- Three maintained model recipes instead of dozens of unmaintained forks, so a broken dependency is a fixed problem rather than a research project.
- One consistent JSONL data format across models, which makes swapping the backbone a config change instead of a data rewrite.
- LoRA, QLoRA and graph freezing keep runs inside consumer GPU budgets, and Colab notebooks prove the claim on free-tier hardware.
- Reproducibility is handled in the configuration layer, so a run can be repeated after a crash or handed to a colleague.

## Limitations

The recipe list is the ceiling: Florence-2, PaliGemma 2 and Qwen2.5-VL, with object-detection paths marked experimental, and no path to add a new architecture without writing a core module. There is no distributed or multi-node training story, which puts a real ceiling on dataset size. Dependency conflicts are real enough that the maintainers tell you to isolate each model in its own environment, and that adds friction to any workflow that must compare two models side by side. The release history is thin, with the notable 1.0.0 entry in February 2025, so expect slower upstream adaptation than a framework tracking many backbones. Object-detection support is flagged experimental, and there is no built-in model registry or evaluation service, only a training loop and metrics configuration.

## Relation to the Arsenal

This is a training-and-alignment entry that assumes you already have data. Read it next to the annotation and dataset tooling in content/projects/data-and-retrieval, since maestro consumes the JSONL that annotation tools export, and next to the broader trainers in content/projects/training-and-alignment such as LLaMA-Factory, XTuner and ms-swift when breadth matters more than a working first run. Its output weights are what content/projects/inference-engines then serves, and the model families it fine-tunes live in content/projects/foundation-models. Where content/tools/evaluation-and-observability tracks experiments, maestro's metric configuration is the lighter-weight alternative for a single-run check.

## Resources

- [Repository and CLI reference](https://github.com/roboflow/maestro)
- [PyPI package maestro](https://pypi.org/project/maestro/)
- [Colab cookbook: Qwen2.5-VL JSON extraction](https://colab.research.google.com/github/roboflow/maestro/blob/develop/cookbooks/maestro_qwen2_5_vl_json_extraction.ipynb)
