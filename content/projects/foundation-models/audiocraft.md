---
id: audiocraft
name: AudioCraft (Meta)
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: Meta's audio-generation library and open models — MusicGen for text-conditioned music, AudioGen for sound effects, built on the EnCodec codec
github_url: "https://github.com/facebookresearch/audiocraft"
license: MIT
primary_language: Python
org_or_maintainer: Meta AI (FAIR)
tags: [voice, multimodal, self-hosted]
maturity: production
cost_model: open-source
github_stars: 23456
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-03-03"
docs_url: "https://github.com/facebookresearch/audiocraft"
demo_url: null
paper_url: "https://arxiv.org/abs/2306.05284"
paper_id: null
phase: foundation-model
domain: [audio]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [org-backed, research-origin]
ecosystem_role:
  - The reference open stack for generative audio — EnCodec tokenizes audio into discrete codes, and MusicGen/AudioGen are LMs over those codes, making audio generation a language-modeling problem with open weights
best_for:
  - You want open-weight, locally runnable music or sound-effect generation with text (and melody) conditioning, including fine-tuning on your own audio
  - You want to study the codec-tokens-plus-LM architecture that underlies most modern audio generation systems
avoid_if:
  - You need current state-of-the-art commercial music quality — hosted services and newer models have surpassed MusicGen's fidelity; this is the open reference, not the frontier
  - You need vocals/singing or long-form structured compositions — MusicGen targets short instrumental clips
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 23.5k stars, MIT license, last push 2026-03-03 verified via the GitHub API on 2026-07-08. Development cadence is slow (research code post-release); included as the canonical open audio-generation reference. Model weights carry their own non-commercial terms for some checkpoints — verify per model card.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"arxiv","url":"https://arxiv.org/abs/2306.05284","date":"2026-07-08","description":"MusicGen paper (Simple and Controllable Music Generation)"}
featured: false
status: active
---

## Overview

AudioCraft is Meta's open library for generative audio, bundling three components: EnCodec, a neural codec that compresses audio into discrete token streams; MusicGen, a language model over those tokens that generates music from text and optional melody conditioning; and AudioGen, its counterpart for environmental sound effects. Training and inference code are open, with released checkpoints at several sizes.

## Why it's in the Arsenal

The catalog's foundation-model phase covers speech (Whisper-family) but generative audio is a distinct slot, and AudioCraft is its canonical open occupant. The architectural idea it embodies — tokenize audio with a neural codec, then model the tokens with an LM — is the pattern nearly all subsequent audio-generation systems use, so it earns a place both as usable open weights and as the reference implementation of the mechanism.

## Architecture

EnCodec encodes waveforms into parallel streams of discrete codes (residual vector quantization); MusicGen is a single-stage transformer LM over those code streams with an interleaving pattern that avoids needing multiple cascaded models. Text conditioning comes from a frozen text encoder; melody conditioning from chromagram features. Generation is autoregressive over audio tokens, then decoded back to waveform by EnCodec.

## Ecosystem Position

Upstream: PyTorch; frozen text encoders for conditioning. Downstream: fine-tuned music/SFX models and research forks. Competing: hosted commercial music-generation services (higher fidelity, closed) and newer open audio models; complementary to speech models like `whisper` (recognition) — different task, same modality.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install and generation examples.
```

## Key Use Cases

1. **Scenario**: generating instrumental music or sound effects locally from text prompts with open weights
2. **Scenario**: studying or building on the codec-tokens-plus-LM audio-generation architecture

## Strengths

- The reference open implementation of modern audio generation, with training code — not just weights
- Melody conditioning and multiple checkpoint sizes make it practical to adapt

## Limitations

- No longer the fidelity frontier; slow post-release cadence typical of research code
- Short instrumental clips only — no vocals or long-form structure; some checkpoints carry non-commercial weight licenses

## Relation to the Arsenal

This is a foundation-model entry: the weights and training code themselves. For serving runtimes see [Inference Engines](../inference-engines/_index.md); for speech recognition see the Whisper-family entries.

## Resources

- [GitHub](https://github.com/facebookresearch/audiocraft)
- [MusicGen paper](https://arxiv.org/abs/2306.05284)
