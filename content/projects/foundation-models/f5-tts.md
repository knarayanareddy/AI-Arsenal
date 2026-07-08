---
id: f5-tts
name: F5-TTS
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: Flow-matching open TTS with zero-shot voice cloning from seconds of reference audio — the fully non-autoregressive design that made open cloning fast and simple
github_url: "https://github.com/SWivid/F5-TTS"
license: MIT
primary_language: Python
org_or_maintainer: SWivid (SJTU)
tags: [multimodal, self-hosted, inference]
maturity: production
cost_model: open-source
github_stars: 14902
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-05"
docs_url: "https://github.com/SWivid/F5-TTS"
demo_url: "https://huggingface.co/spaces/mrfakename/E2-F5-TTS"
paper_url: "https://arxiv.org/abs/2410.06885"
paper_id: null
phase: foundation-model
domain: [audio]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [research-origin, actively-maintained, community-driven]
ecosystem_role:
  - "The open reference for flow-matching TTS: where autoregressive cloning systems (XTTS lineage) generate token-by-token with alignment machinery, F5 pads text to speech length and denoises the whole utterance in parallel via flow matching — a radical simplification that delivers zero-shot cloning at real-time-plus speeds and made it the community's fine-tuning base for new languages"
best_for:
  - "Zero-shot voice cloning from a few seconds of reference audio, self-hosted under MIT (code) — narration, dubbing, and dataset generation without per-voice training"
  - "Fine-tuning for underserved languages: the community has produced dozens of language ports precisely because the non-autoregressive recipe trains stably on modest data"
avoid_if:
  - "You need streaming conversational latency — non-autoregressive generation produces whole utterances; dialogue-agent stacks want streaming-first systems (Kokoro-class for speed, commercial APIs for polish)"
  - "Cloning ethics/consent can't be enforced in your product — released checkpoints are trained under CC-BY-NC data terms (Emilia); check the model-license note, and gate voice inputs"
upstream_dependencies: []
downstream_consumers: []
alternatives: [kokoro, chatterbox]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (14.9k), MIT code license, active development (last push 2026-07-05) verified via the GitHub API on 2026-07-08. Checkpoint data licensing (CC-BY-NC training data for the main release) noted from the repo. Paper arXiv:2410.06885.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/SWivid/F5-TTS","date":"2026-07-08","description":"14.9k stars; leading open flow-matching TTS with zero-shot cloning"}
featured: false
status: active
---

## Overview

F5-TTS ("Fairytaler that Fakes Fluent and Faithful speech with Flow matching") is a fully non-autoregressive text-to-speech system: a Diffusion Transformer trained with flow matching that clones any voice zero-shot from a short reference clip. Its design deletes the usual TTS machinery — no phoneme aligner, no duration model, no text encoder — by padding text tokens to the target length and letting the model infill; Sway Sampling at inference improves quality/speed without retraining.

## Why it's in the Arsenal

Open voice cloning had been autoregressive and fiddly; F5 demonstrated that a drastically simpler parallel architecture matches or beats it while running faster (RTF ~0.15) and training more reproducibly — which is why it became the base the community fine-tunes for new languages, and one of the most-deployed self-hosted cloning stacks. It anchors the audio-generation slot among foundation models the way Whisper anchors recognition.

## Architecture

Text (character sequence) is padded with filler tokens to speech length and concatenated with a masked mel-spectrogram; a DiT backbone trained with conditional flow matching infills the masked speech conditioned on reference audio + text; ConvNeXt blocks preprocess text for alignment-free conditioning; a vocoder (Vocos) renders mels to audio. Inference-time Sway Sampling skews flow steps toward early trajectory regions — a drop-in quality win.

## Ecosystem Position

Predecessors: E2-TTS (the design it stabilizes), autoregressive cloners (XTTS/coqui lineage, now archived upstream). Peers: `kokoro` (small, fast, no cloning), `chatterbox` (production-oriented cloning with watermarking), CosyVoice/Fish-Speech-class systems. Downstream: many community language fine-tunes and self-hosted narration/dubbing stacks.

## Getting Started

```bash
pip install f5-tts
f5-tts_infer-gradio   # web UI
# or CLI:
f5-tts_infer-cli --model F5TTS_v1_Base --ref_audio ref.wav --ref_text "reference transcript" --gen_text "text to speak"
```

## Key Use Cases

1. **Scenario**: self-hosted narration/dubbing with per-speaker voices from seconds of consented reference audio — no per-voice training runs
2. **Scenario**: building TTS for a language commercial APIs serve poorly, by fine-tuning the base on a modest single-language corpus

## Strengths

- Architectural simplicity is the feature: no aligner/duration stack means fewer failure modes and easy fine-tuning — the mechanism behind its community adoption
- Strong quality at real-time-plus speeds with MIT code and active maintenance (multilingual v1 checkpoints, ecosystem runtimes: MLX, TensorRT-LLM ports)

## Limitations

- Whole-utterance generation: not a streaming conversational engine, and long-form requires chunking heuristics
- Main checkpoints inherit non-commercial training-data terms (Emilia CC-BY-NC) — commercial deployments must verify checkpoint licensing, not just the MIT code

## Relation to the Arsenal

The speech-synthesis counterpart to `faster-whisper`/`whisperx` (recognition) among audio entries; contrast with `kokoro` (speed/size pole) and `chatterbox` (production-cloning pole) for the TTS decision.

## Resources

- [GitHub](https://github.com/SWivid/F5-TTS)
- [Paper](https://arxiv.org/abs/2410.06885)
- [Demo Space](https://huggingface.co/spaces/mrfakename/E2-F5-TTS)
