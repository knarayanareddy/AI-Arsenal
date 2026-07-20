---
id: chatterbox
name: Chatterbox (Resemble AI)
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: Resemble AI's MIT-licensed production TTS — zero-shot cloning with emotion-exaggeration control, multilingual coverage, and watermarked outputs by default
github_url: https://github.com/resemble-ai/chatterbox
license: MIT
primary_language: Python
org_or_maintainer: resemble-ai
tags:
  - self-hosted
  - multimodal
  - inference
maturity: production
cost_model: open-source
github_stars: 25587
github_stars_last_30d: 161
trending_score: 53
last_commit: '2026-06-10'
docs_url: https://github.com/resemble-ai/chatterbox
demo_url: https://huggingface.co/spaces/ResembleAI/Chatterbox
paper_url: null
paper_id: null
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - production-proven
  - actively-maintained
ecosystem_role:
  - 'The commercial-vendor gambit in open TTS: a voice-AI company (Resemble) open-sourcing a production-grade cloning model under MIT — bringing things research repos skip (default perceptual watermarking, emotion-intensity control, multilingual checkpoints, a paid-API upgrade path) and instantly becoming the most-starred open cloning-TTS release of its generation'
best_for:
  - Commercial products needing self-hosted voice cloning — MIT license end to end (code and weights), which the F5-class alternatives' non-commercial training-data terms can't offer
  - 'Expressive dialogue/agent voices: the exaggeration control dials emotion intensity per utterance — a control axis most open TTS lacks'
avoid_if:
  - You need minimal-footprint TTS — it's a 0.5B-parameter GPU-class model; Kokoro serves the embedded/CPU case at a fraction of the cost
  - Your compliance posture forbids watermark removal debates entirely — outputs carry Resemble's PerTh watermark by design; verify that fits (or is required by) your policy before deploying
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - f5-tts
  - kokoro
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (25.4k), MIT, last push 2026-06-10 verified via the GitHub API on 2026-07-08. Benchmark claim (preferred over ElevenLabs in side-by-side evals) is the vendor's published result, flagged as such. Multilingual v2 coverage per official README.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/resemble-ai/chatterbox
    date: '2026-07-08'
    description: 25.4k stars; Resemble AI's open production TTS, a 2025 breakout release
featured: false
status: active
---

## Overview

Chatterbox is Resemble AI's open TTS family: a 0.5B-parameter Llama-backbone acoustic model trained on ~500k hours of speech, offering zero-shot voice cloning from short references, a unique emotion-exaggeration control, and (in v2/multilingual releases) 20+ language coverage — all MIT-licensed, with every output carrying Resemble's PerTh perceptual watermark. The vendor's side-by-side evals report it preferred over ElevenLabs (vendor-published claim).

## Why it's in the Arsenal

It resolved the open-TTS licensing trap: research models like F5 ship MIT code over non-commercially-trained checkpoints, while Chatterbox is commercially clean end to end — which is why it became the default recommendation for products needing self-hosted cloning. The built-in watermarking also makes it the reference example of responsible-release mechanics in generative audio, a pattern worth studying beyond TTS.

## Architecture

A two-stage design: a Llama-architecture autoregressive model generates speech tokens conditioned on text and reference-speaker embeddings (where cloning and the exaggeration control live), and a decoder renders tokens to waveform; alignment-informed inference stabilizes long inputs. The PerTh watermarker embeds an imperceptible, retrievable signature in all generated audio.

## Ecosystem Position

Vendor lineage: Resemble AI's commercial voice platform (the paid upgrade path). Peers: `f5-tts` (flow-matching research pole), `kokoro` (efficiency pole), CosyVoice/Fish-Speech (multilingual rivals), ElevenLabs (the closed benchmark). Downstream: self-hosted agent/dubbing stacks and a fast-growing fork ecosystem (streaming servers, quantized variants).

## Getting Started

```bash
pip install chatterbox-tts
```

```python
from chatterbox.tts import ChatterboxTTS
model = ChatterboxTTS.from_pretrained(device="cuda")
wav = model.generate("Welcome back.", audio_prompt_path="reference.wav", exaggeration=0.7)
```

## Key Use Cases

1. **Scenario**: a commercial product shipping self-hosted custom voices — cloning under MIT with no training-data license asterisk
2. **Scenario**: expressive game/agent dialogue where per-line emotion intensity control matters more than raw naturalness rankings

## Strengths

- The only top-tier open cloning model with commercially clean licensing across code and weights — the deciding mechanism for product use
- Production affordances research repos lack: watermarking by default, emotion control, multilingual checkpoints, active org backing

## Limitations

- GPU-class serving cost; not the answer for embedded or CPU-only deployment
- Vendor-published quality comparisons should be re-validated on your content; watermark presence may be a feature or a blocker depending on your use case

## Relation to the Arsenal

The production pole of the open-TTS trio (`f5-tts` research/cloning, `kokoro` efficiency); pairs with `faster-whisper`/`whisperx` to complete a self-hosted voice loop, and with the guardrails guidance in [architectures/system-design](../../architectures/system-design/_index.md) on responsible generation.

## Resources

- [GitHub](https://github.com/resemble-ai/chatterbox)
- [Demo Space](https://huggingface.co/spaces/ResembleAI/Chatterbox)
