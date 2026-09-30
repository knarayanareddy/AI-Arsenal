---
id: mova
name: MOVA
version_tracked: null
artifact_type: library
category: llms
subcategory: open-source-models
description: An OpenMOSS generative model that denoises video and audio jointly through asymmetric towers joined by cross-attention
github_url: "https://github.com/OpenMOSS/MOVA"
license: Apache-2.0
primary_language: Python
tags: [multimodal, voice]
maturity: beta
cost_model: open-source
github_stars: 1118
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://mosi.cn/models/mova"
demo_url: null
phase: foundation-model
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Replaces the two-stage video-then-audio cascade with one bimodal model, removing lip-sync drift and sound-effect mismatch as a pipeline artefact."
best_for:
  - "You are producing short clips where lip-sync matters, and a cascaded video model plus a separate audio model keeps drifting apart."
  - "You need environment-aware sound effects that match what is visibly happening in the frame, and a silent generator forces you to add audio afterwards."
  - "You want to fine-tune a video-audio generator on your own domain with LoRA and you need training code and scripts rather than weights alone."
avoid_if:
  - "You need a photorealistic or broadcast-grade image, since MOVA's headline claim is joint audio-video fidelity rather than single-frame image quality against Sora 2, Veo 3 or Kling."
  - "You have no GPU budget for diffusion, because joint video-audio generation is expensive per clip and the model is not a lightweight fine-tune target."
  - "You need a commercial licence cleared for a product, since the code and weights are released but a hosted API and a separate usage agreement also exist upstream."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, homepage and issue count. Architecture description, benchmark size, release dates and ComfyUI/API availability are read from the README; no generation was run, and the lip-sync and sound-effect quality claims are the authors' reported results."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

MOVA, short for MOSS Video and Audio, is an open foundation model from OpenMOSS that generates video and its synchronised audio in one inference pass rather than chaining a video model and a sound generator. The repository ships model weights on the Hugging Face Hub, inference and training code, LoRA fine-tuning scripts, and an evaluation directory released in May 2026, alongside a 732-sample MOVA Benchmark for Arena on Hugging Face intended as a reproducible evaluation set. The architecture is described as an asymmetric dual tower: pretrained video and audio towers fused by a bidirectional cross-attention mechanism so each modality conditions the other during generation. Claimed capability areas are multilingual lip-synchronisation and environment-aware sound effects, and the argument against cascades is that error accumulates when a silent clip is handed to a second model after the fact. Ecosystem reach includes a ComfyUI node contributed by a community developer, a hosted API application, a Discord and a Feishu community channel, and a technical report at arXiv 2602.08794.

## Why it's in the Arsenal

Every cascaded video-audio pipeline has the same structural defect: the video model never sees the audio and the audio model never sees the video, so lip-sync and sound-effect timing are fixed in a second pass against an already-final picture. When the picture changes, the audio is wrong, and you regenerate. MOVA removes that seam by making both modalities co-generate, so the sound is conditioned on the same latent the picture is being drawn from. The recurring decision it resolves is whether to accept a lip-sync penalty and a resynthesis loop for budget reasons or to move the cost into a single joint model, which is a real trade for anyone shipping clips with speech or scene-dependent sound.

## Architecture

Generation is a diffusion process over two coupled latent streams. A pretrained video tower and a pretrained audio tower are used asymmetrically, so their capacity and conditioning behaviour are not forced to be symmetric, and a bidirectional cross-attention fusion module lets the video branch attend to audio features and vice versa while denoising proceeds. Because both streams advance in the same loop, the audio schedule is conditioned on the video state rather than on a finished clip, which is what keeps mouth movements and phonemes aligned. On top of the released checkpoint, the repository provides LoRA fine-tuning scripts for domain adaptation and an evaluation harness with the Arena benchmark set, so claims about lip-sync and sound-effect quality can be checked against a fixed sample list instead of cherry-picked demos. Inference runs locally from the released weights; a ComfyUI integration and a hosted API exist for people who do not want to run diffusion locally.

## Ecosystem Position

MOVA's real competitors are closed video generators with native audio such as Sora 2, Veo 3 and Kling, and it positions explicitly against them by releasing weights, training pipelines and LoRA scripts that those do not. Within the open world it overlaps with audio-visual research models and with cascaded open pipelines where a video model is paired with a separate text-to-audio or sound-effects model, and the difference is architectural rather than a quality claim: joint generation cannot be reproduced by better prompt engineering on a two-model stack. It complements rather than replaces the TTS and audio-generation entries in content/projects/foundation-models, because a lip-synced clip still needs good dialogue text and MOVA handles the multimodal coupling, not scriptwriting. It is an alternative to stitching a video model with a sound library, and it sits downstream of any text-to-video prompt work you do in content/tools.

## Getting Started

Clone the repository for weights, inference and LoRA fine-tuning, then run the provided quick-start workflow. A hosted API and a ComfyUI node are available if you would rather not manage GPU memory for a diffusion model.

```bash
git clone https://github.com/OpenMOSS/MOVA.git
cd MOVA
pip install -r requirements.txt
```

Model weights are published as a Hugging Face collection rather than in the repository, and the evaluation harness lives under evaluation/ in the checkout. Expect a CUDA GPU with meaningful memory: joint video and audio diffusion is not a consumer-laptop workload.

## Key Use Cases

1. **Where it fits**: "You are producing short clips where lip-sync matters, and a cascaded video model plus a separate audio model keeps drifting apart
2. **Adoption checkpoint**: before building on MOVA, reproduce the specific claim you are relying on — install it, run it against a representative slice of your data, and record the number that would make you abandon the choice. A project entry can tell you what is claimed; only your own run tells you what is true.

## Strengths

- The implementation detail worth checking before adopting MOVA is specific — generation is a diffusion process over two coupled latent streams. A pretrained video tower and a pretrained audio tower are used asymmetrically, so their capacity and conditioning behaviour are not forced to be symmetric, and a bidirectional cross-attention fusion module lets the video branch attend to audio features and vice versa while denoising proceeds. Because both streams advance in the same loop, the audio schedule is conditioned on the video state rather than on a finished clip, which is what keeps mouth movements and phonemes aligned. On top of the released checkpoint, the repository provides LoRA fine-tuning scripts for domain adaptation and an evaluation harness with the Arena benchmark set, so claims about lip-sync and sound-effect quality can be checked against a fixed sample list instead of cherry-picked demos. Inference runs locally from the released weights; a ComfyUI integration and a hosted API exist for people who do not want to run diffusion locally — because that is where the capability claim either survives contact with your data or does not.
- Sits in the foundation-model phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Recorded as beta, so the capability is real while the interface is still moving; pin the version you depend on rather than tracking head.

## Limitations

- Adoption risk for MOVA is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running MOVA against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- MOVA is beta, so the interface and even the scope can change between minor versions; any code written against it should be isolated behind your own boundary rather than imported directly across your codebase.

## Relation to the Arsenal

This entry sits in content/projects/foundation-models, alongside other open generative checkpoints such as the video, image and audio generation models catalogued there, and it is the multimodal-coherence half of a clip pipeline rather than a serving concern. The engines under content/projects/inference-engines are what you would reach for to serve it at volume, and the SGLang path is already hinted at in the repository topics, which is a useful bridge to the serving entries. For evaluation, the Arena benchmark it publishes belongs alongside the benchmark tooling in content/projects/benchmarks-and-evals and the methodology discussion under content/research/evaluation-and-safety, since generated-media quality claims are unusually sensitive to the harness.

## Resources

- [Repository, inference and LoRA fine-tuning](https://github.com/OpenMOSS/MOVA)
- [Technical report (arXiv 2602.08794)](https://arxiv.org/abs/2602.08794)
- [Model weights collection on Hugging Face](https://huggingface.co/collections/OpenMOSS-Team/mova)
