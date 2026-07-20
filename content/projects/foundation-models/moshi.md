---
id: moshi
name: Moshi
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: models
description: Full-duplex speech-to-speech foundation model from Kyutai that listens and speaks simultaneously with low latency, no explicit ASR/TTS pipeline
github_url: https://github.com/kyutai-labs/moshi
license: Apache-2.0
primary_language: Python
org_or_maintainer: Kyutai
tags:
  - multimodal
  - voice
  - inference
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 10629
github_stars_last_30d: 104
trending_score: 48
last_commit: '2026-05-16'
docs_url: https://github.com/kyutai-labs/moshi
demo_url: null
paper_url: https://arxiv.org/abs/2410.00037
paper_id: null
hf_url: https://huggingface.co/kyutai
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - research-origin
  - org-backed
  - actively-maintained
ecosystem_role:
  - Open real-time speech-to-speech model that demonstrates the full-duplex conversational architecture, an alternative to chaining ASR + LLM + TTS with the latency and turn-taking rigidity that pipeline imposes
best_for:
  - You need genuinely low-latency, full-duplex voice conversation (the model can listen and speak at once, handle interruptions) that a serial ASR->LLM->TTS pipeline cannot deliver
  - You want an open, self-hostable reference for how end-to-end speech-to-speech works, including the Mimi neural audio codec it ships with
avoid_if:
  - You only need one-way synthesis (TTS) or transcription (ASR) — a dedicated TTS/ASR model is simpler and higher quality for that single task
  - You need production-grade, broad-language conversational quality today — Moshi is a research-forward model, not a turnkey product with an SLA
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (10,525), Apache-2.0 license, and last commit (2026-05-16) verified via the GitHub API on 2026-07-08. Capability claims from the paper/README; not hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/kyutai-labs/moshi
    date: '2026-07-08'
    description: 10,525 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

Moshi is a full-duplex speech-to-speech foundation model from Kyutai. Unlike a serial pipeline (speech recognition → LLM → text-to-speech), Moshi models the conversation end-to-end and can listen and speak at the same time, enabling natural interruptions and sub-second latency. It ships with Mimi, a streaming neural audio codec.

## Why it's in the Arsenal

It is the leading open demonstration of the full-duplex conversational architecture — the direction voice agents are moving. Cataloging it gives practitioners a self-hostable reference for real-time voice interaction versus the ASR+LLM+TTS pipeline most systems use today. It is a comparison/reference point, not a turnkey product recommendation.

## Architecture

Moshi jointly models two audio streams (user and assistant) as token sequences produced by the Mimi codec, with a temporal transformer generating assistant audio tokens in real time while continuously consuming user audio. Because generation and listening are interleaved rather than turn-gated, the model supports overlap and interruption that serial pipelines cannot.

## Ecosystem Position

It contrasts with pipeline voice stacks (Whisper + LLM + a TTS like CosyVoice) and with closed real-time voice APIs. Its niche is open, low-latency, full-duplex conversation and the reusable Mimi codec.

## Getting Started

```bash
pip install moshi   # PyTorch; MLX and Rust backends also provided
# download weights from Hugging Face (kyutai) and run the local server/client
```

## Key Use Cases

1. **Scenario**: a low-latency voice assistant that handles interruptions naturally
2. **Scenario**: research or a product prototype needing an open speech-to-speech baseline
3. **Scenario where this is NOT the right fit**: plain transcription or one-way narration — use a dedicated ASR or TTS model

## Strengths

- True full-duplex, low-latency conversation
- Open weights + reusable Mimi streaming codec
- Multiple backends (PyTorch, MLX, Rust)

## Limitations

- Research-forward; not a production SLA product
- Conversational quality/language breadth still maturing
- Real-time serving has non-trivial compute requirements

## Relation to the Arsenal

- Compare against pipeline stacks and `cosyvoice`/`gpt-sovits` (TTS) before adopting.
- Reference this project by its canonical ID `moshi`.
- Validate latency and quality on your hardware before committing.

## Resources

- [GitHub Repository](https://github.com/kyutai-labs/moshi)
- [Paper (arXiv)](https://arxiv.org/abs/2410.00037)
