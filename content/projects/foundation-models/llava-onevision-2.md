---
id: llava-onevision-2
name: LLaVA-OneVision-2
version_tracked: null
artifact_type: library
category: llms
subcategory: open-source-models
description: "Open 8B vision-language model releasing data, encoders, training code, checkpoints and logs for image, video and spatial tasks"
github_url: "https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2"
license: Apache-2.0
primary_language: Python
tags: [multimodal, llm, data]
maturity: beta
cost_model: open-source
github_stars: 1214
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://evolvinglmms-lab.github.io/LLaVA-OneVision-2/projects/index.html"
demo_url: null
phase: foundation-model
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Ships the whole multimodal recipe, including a codec-stream vision encoder, instead of a checkpoint with an opaque data pipeline."
best_for:
  - "You are training or fine-tuning a vision-language model on long video and need an encoder that spends tokens on motion rather than on redundant static frames."
  - "You want a VLM whose training data, intermediate logs and evaluation reproduction scripts are public, because you intend to run the same recipe and compare numbers."
  - "You are building spatial or video-caption pipelines and you want a single architecture covering images, long-form video and spatial reasoning rather than three separate models."
avoid_if:
  - "You need a frontier-closed VLM, since this is an 8B open release whose vision-language quality sits below the best proprietary systems on most general tasks."
  - "You need a plug-and-play API only, because running it means pulling model weights and accepting a specific runtime such as the vLLM or NeMo integration path they document."
  - "You are on a tight inference budget, because an 8B multimodal model with video input is far more expensive per request than a text-only 8B and usually needs an engine with vision support."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, homepage and issue count. Architecture, dataset names, report IDs and serving links are read from the README; no checkpoint was downloaded and no benchmark was re-run here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

LLaVA-OneVision-2 is the next generation of the LLaVA-OneVision family from EvolvingLMMs-Lab, an 8B multimodal model that unifies single images, long-form video and spatial understanding under one architecture. Its distinguishing contribution is OneVision-Encoder and OneVision-Encoder-Lang, HEVC-style vision transformers that add a codec-stream input mode alongside plain images and uniform-frame video. In that mode the encoder selects only motion-rich and residual-rich patches and samples dense frames sparsely, which buys much longer temporal coverage for a fixed token budget than uniform frame sampling. The release is unusually complete: model weights on Hugging Face, the LLaVA-OneVision-2-Data and VideoCaption and Spatial datasets, a technical report at arXiv 2605.25979, a codec playground, documented vLLM and NVIDIA NeMo serving paths, and evaluation reproduction instructions. The wider family history includes OneVision-Encoder (arXiv 2602.08683) and an RL recipe for LLaVA-OneVision-1.5 released in December 2025.

## Why it's in the Arsenal

Multimodal training has a reproducibility gap: model cards publish weights and headline benchmarks, and hide the data mixture, the frame-sampling policy and the training logs. For video specifically, the frame-sampling choice dominates both cost and quality, and it is almost never published. LLaVA-OneVision-2 closes part of that gap by shipping a codec-aligned encoder whose selection policy is described and code-released, plus the datasets and evaluation scripts needed to reproduce the numbers. The recurring engineering decision it removes is how to spend a fixed visual token budget over a long video: uniform frame sampling wastes tokens on static frames, and this encoder makes the motion-aware alternative a drop-in input mode rather than a research detour.

## Architecture

The model is built around a vision transformer that accepts three input modes. Image mode tokenises a single image. Uniform-frame video mode samples frames at a fixed stride and patchifies them, which is the standard approach. Codec-stream mode is the new path: it consumes HEVC-style coded residuals, keeps patches whose content is motion- or residual-rich, and thins the remaining dense frames so temporal coverage extends far beyond what uniform sampling reaches at the same token cost. Encoder outputs are projected into the language model's embedding space by a connector, and the language backbone handles image, multi-frame video and text in one sequence, which is what lets a single model serve captioning, visual question answering, video reasoning and spatial tasks rather than specialising per task. The released OneVision-Encoder-Lang variant adds a language-aware variant of the same selection idea. Downstream, the repository documents both a vLLM model implementation and an NVIDIA NeMo Automodel coverage path, and the project hosts a Space for inspecting the encoder-codec behaviour interactively.

## Ecosystem Position

It overlaps with other open multimodal model lines, including Qwen2.5-VL and Qwen3-VL, InternVL and the earlier LLaVA-OneVision-1.5 checkpoints, but differs in what it publishes: an encoder and its codec-stream input mode rather than only a checkpoint plus an instruction-tuning dataset. It competes with closed video-language systems such as GPT-4o video and Gemini for long-form video understanding while remaining a downloadable 8B model, and it is an alternative to assembling your own frame sampler around an open ViT. It complements the training-and-alignment tools in content/projects/training-and-alignment, which handle generic fine-tuning of VLMs, and the serving entries in content/projects/inference-engines, where vLLM and SGLang need an explicit model implementation before the weights are usable in production.

## Getting Started

Clone the repository for the full training and data pipeline, or pull the released instruction checkpoint directly from the Hugging Face Hub. The README documents a 4B quick start on a single node as the cheapest first step.

```bash
git clone https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2.git
cd LLaVA-OneVision-2
```

```python
from transformers import AutoProcessor, AutoModelForImageTextToText

model_id = "lmms-lab-encoder/LLaVA-OneVision-2-8B-Instruct"
proc = AutoProcessor.from_pretrained(model_id)
model = AutoModelForImageTextToText.from_pretrained(
    model_id, dtype="auto", device_map="auto"
)
```

For serving, the project links a vLLM model-executor page and a NeMo Automodel coverage page; follow the one matching your runtime rather than assuming stock Transformers support for the codec mode.

## Key Use Cases

1. Long-video understanding on a fixed token budget: feed hours of footage through the codec-stream mode and keep only motion- and residual-rich patches.
2. Video captioning datasets: use the released LLaVA-OneVision-2-VideoCaption and Spatial datasets as a starting point or as a comparison target for your own mixture.
3. Reproducing published multimodal benchmarks: the repository includes evaluation reproduction instructions, so published numbers can be re-derived rather than trusted.

## Strengths

- Codec-stream input mode puts token budget where motion is, extending temporal coverage far beyond uniform frame sampling.
- Unusually complete release: weights, data, encoder, training code, technical report and evaluation reproduction are all public.
- One architecture spans image, long-video and spatial tasks, so a single model replaces three specialised checkpoints.
- Documented serving paths through vLLM and NVIDIA NeMo mean the weights are not locked to a bespoke runtime.

## Limitations

The scale is modest: 8B parameters leave a real quality gap against frontier proprietary vision-language models on broad perception and instruction following. Video input is expensive, and the token savings of the codec mode depend on content, so a mostly static clip gains little and a busy scene can still exceed the context budget. The project is young, with the 2.x release landing in April 2026 and a small but active community, so recipe details and checkpoints may change quickly. Serving requires a runtime with an explicit model implementation, which is extra work compared to dropping in a text-only model, and the documented vLLM path is newer and less battle-tested than stock vLLM paths. Datasets carry their own provenance and redistribution conditions, and the codec-mode encoder adds a preprocessing dependency that the plain image path does not need.

## Relation to the Arsenal

This is a model entry in content/projects/foundation-models, sitting next to other open foundation checkpoints rather than to serving engines. Its practical pairing is content/projects/inference-engines, where vLLM, SGLang or NeMo have to carry the architecture before you can serve it at scale, and content/projects/training-and-alignment, where the released data and recipes are inputs to a fine-tuning stack. For benchmark context, read the evaluation entries under content/projects/benchmarks-and-evals and the methodology layer in content/research/evaluation-and-safety, because a published multimodal number is only as meaningful as the harness that produced it.

## Resources

- [Repository and quick start](https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2)
- [Technical report (arXiv 2605.25979)](https://arxiv.org/pdf/2605.25979)
- [Model weights on Hugging Face](https://huggingface.co/lmms-lab-encoder/LLaVA-OneVision-2-8B-Instruct)
