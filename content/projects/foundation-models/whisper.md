---
id: whisper
name: Whisper
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: 'OpenAI''s open-source speech recognition model: robust multilingual transcription and translation trained on 680k hours of audio'
github_url: https://github.com/openai/whisper
license: MIT
primary_language: Python
org_or_maintainer: OpenAI
tags:
  - voice
  - multimodal
  - llm
maturity: production
cost_model: open-source
github_stars: 105281
github_stars_last_30d: 738
trending_score: 80
last_commit: '2026-04-15'
docs_url: https://github.com/openai/whisper#readme
demo_url: null
paper_url: https://arxiv.org/abs/2212.04356
paper_id: null
phase: foundation-model
domain:
  - audio
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - production-proven
  - research-origin
ecosystem_role:
  - 'The default open speech-to-text model: weakly-supervised training on 680k hours made it robust to accents, noise, and domain shift in a way prior open ASR never was, and it anchors an entire deployment ecosystem (faster-whisper, whisper.cpp, distil-whisper, WhisperX).'
best_for:
  - You need reliable transcription across languages, accents, and noisy real-world audio without per-domain fine-tuning — zero-shot robustness is Whisper's defining property
  - You want deployment-path freedom — the same weights run via the reference repo, CTranslate2 (faster-whisper, ~4x speedup), whisper.cpp (CPU/edge), or hosted APIs
avoid_if:
  - You need true real-time streaming ASR — Whisper is a 30-second-window batch model; streaming wrappers add latency/accuracy compromises versus native streaming architectures
  - You need speaker diarization or word-level timestamps out of the box — those come from ecosystem tools (WhisperX, pyannote), not the base model
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count, license, and last commit verified via the GitHub API on 2026-07-08. The reference repo receives maintenance-level updates; the surrounding ecosystem (faster-whisper, whisper.cpp, distil-whisper) is where deployment innovation happens — that is expected for a stable foundation model, not a health concern.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/openai/whisper
    date: '2026-07-08'
    description: 104,543 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

OpenAI's open-source automatic speech recognition model, trained with weak supervision on 680,000 hours of multilingual web audio. It transcribes and translates ~100 languages with strong robustness to real-world conditions, and its open MIT release made high-quality ASR a commodity — most open voice stacks today are Whisper plus ecosystem accelerators.

## Why it's in the Arsenal

The default open speech-to-text model: weakly-supervised training on 680k hours made it robust to accents, noise, and domain shift in a way prior open ASR never was, and it anchors an entire deployment ecosystem (faster-whisper, whisper.cpp, distil-whisper, WhisperX). It earns a place in the Arsenal because it directly addresses a recurring decision point: you need reliable transcription across languages, accents, and noisy real-world audio without per-domain fine-tuning — zero-shot robustness is Whisper's defining property. See Strengths / Limitations below before adopting it.

## Architecture

An encoder-decoder transformer over 30-second log-Mel spectrogram windows; multitask tokens condition the decoder for transcription, translation-to-English, language ID, and timestamp prediction. Sizes span tiny (39M) to large-v3 (1.5B) plus the distilled large-v3-turbo variant that trades minor accuracy for ~6x decode speed — the practical default for most deployments.

## Ecosystem Position

Upstream: PyTorch. Downstream: faster-whisper (CTranslate2), whisper.cpp (GGML edge inference), WhisperX (alignment+diarization), and distil-whisper are the de facto production deployment layer; voice-agent stacks (including the speech-to-speech entry in frameworks) use it as the STT stage. Competing: NVIDIA Parakeet/Canary (English speed/accuracy leaders on Open ASR), Deepgram-class commercial APIs.

## Getting Started

```bash
pip install -U openai-whisper
whisper audio.mp3 --model turbo
# or the faster production path:
pip install faster-whisper
```

## Key Use Cases

1. **Scenario**: you need reliable transcription across languages, accents, and noisy real-world audio without per-domain fine-tuning — zero-shot robustness is Whisper's defining property
2. **Scenario**: you want deployment-path freedom — the same weights run via the reference repo, CTranslate2 (faster-whisper, ~4x speedup), whisper.cpp (CPU/edge), or hosted APIs

## Strengths

- You need reliable transcription across languages, accents, and noisy real-world audio without per-domain fine-tuning — zero-shot robustness is Whisper's defining property
- You want deployment-path freedom — the same weights run via the reference repo, CTranslate2 (faster-whisper, ~4x speedup), whisper.cpp (CPU/edge), or hosted APIs

## Limitations

- You need true real-time streaming ASR — Whisper is a 30-second-window batch model; streaming wrappers add latency/accuracy compromises versus native streaming architectures
- You need speaker diarization or word-level timestamps out of the box — those come from ecosystem tools (WhisperX, pyannote), not the base model

## Relation to the Arsenal

This is a foundation-model entry: it documents model weights, architecture, and generational position. For hosted/managed access paths to models, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/openai/whisper)
- [Documentation](https://github.com/openai/whisper#readme)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (104,543 stars, last commit 2026-04-15, verified via GitHub API on 2026-07-08)*
