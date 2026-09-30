---
id: chatterbox
name: Chatterbox (Resemble AI)
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "Resemble AI's open-source zero-shot TTS family in sizes from 110M to 500M, covering CPU-real-time Nano, one-step Turbo and 23-language Multilingual V3"
github_url: "https://github.com/resemble-ai/chatterbox"
license: MIT
primary_language: Python
org_or_maintainer: resemble-ai
tags: [voice, multimodal, edge, local]
maturity: production
cost_model: open-source
github_stars: 26600
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-07-21"
docs_url: "https://huggingface.co/ResembleAI/Chatterbox-Multilingual-TTS"
demo_url: "https://huggingface.co/spaces/ResembleAI/Chatterbox"
paper_url: null
paper_id: null
phase: foundation-model
domain: [audio]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, production-proven, actively-maintained]
ecosystem_role:
  - "The commercial-vendor gambit in open TTS: a voice-AI company (Resemble) open-sourcing a production-grade cloning model under MIT — bringing things research repos skip (default perceptual watermarking, emotion-intensity control, multilingual checkpoints, a paid-API upgrade path) and instantly becoming the most-starred open cloning-TTS release of its generation"
best_for: ["You need a voice agent that responds in a conversational timeframe and you want the 350M Turbo checkpoint, whose speech-token-to-mel decoder runs in one step instead of ten.", "You are deploying on hardware with no GPU and you need English TTS that runs three times faster than realtime on eight CPU cores, which is what the 110M Nano checkpoint targets.", "You need cross-language voice cloning from one reference clip, because Multilingual V3 covers 23 languages and dedicated Single Language Pack finetunes exist for Chinese, Latam and Spain Spanish, Brazilian and European Portuguese, and Hindi."]
avoid_if: ["You need a hard latency SLA for a high-QPS production voice service, because the README points you to Resemble AI's commercial endpoint with sub-200ms latency for that case rather than the open weights.", "You need output free of watermarks, because every generated file carries a Perth perceptual-threshold neural watermark that survives MP3 compression and edits.", "You need a model whose licences let you train a competing commercial service on the same stack, because the reference architectures (S3Tokenizer, HiFT-GAN) are acknowledged upstream work and the repo's own disclaimer is blunt."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [f5-tts, kokoro]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (25.4k), MIT, last push 2026-06-10 verified via the GitHub API on 2026-07-08. Benchmark claim (preferred over ElevenLabs in side-by-side evals) is the vendor's published result, flagged as such. Multilingual v2 coverage per official README.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/resemble-ai/chatterbox","date":"2026-07-08","description":"25.4k stars; Resemble AI's open production TTS, a 2025 breakout release"}
featured: false
status: active
---

## Overview

Chatterbox is a family of MIT-licensed text-to-speech models from Resemble AI, all doing zero-shot voice cloning from a short reference clip rather than fine-tuned per-speaker voices. The current line is four entries: Chatterbox-Nano at 110M and Chatterbox-Turbo at 350M, both English, both sharing an architecture whose speech-token-to-mel decoder was distilled from ten steps to one, with native paralinguistic tags such as `[laugh]`, `[cough]` and `[chuckle]`; Chatterbox-Multilingual V3 at 500M covering 23 languages with improved speaker similarity and reduced hallucination; and a Single Language Pack of six dedicated finetunes at 500M each. The original English Chatterbox stays relevant for its two creative controls, `exaggeration` (defaults to 0.5) and `cfg_weight` (defaults to 0.5, drop to around 0.3 for fast speakers or dramatic delivery). Code lives in `chatterbox.tts` for the English model, `chatterbox.tts_turbo` for Turbo and Nano, and `chatterbox.mtl_tts` for multilingual, with Gradio apps and voice-conversion examples at the repo root.

## Why it's in the Arsenal

The decision this resolves is whether a voice feature needs a per-utterance API call at all. Zero-shot cloning from a ten-second reference means voice identity is data you supply rather than a speaker ID you enrol, which is what makes per-customer voices practical outside a studio. The size ladder is the other contribution: the same family covers on-device CPU, low-latency English agents and 23-language localisation, so the deployment target picks the checkpoint instead of forcing one compromise. The cost is that watermarking is unconditional, which matters if your pipeline needs clean audio for downstream training or redistribution.

## Architecture

All models load through `from_pretrained(device=...)`, and generation is `model.generate(text, audio_prompt_path=...)` with a fallback to no prompt for the default voice; audio comes back as a tensor written with `torchaudio.save(path, wav, model.sr)`. Nano is not a separate code path: it loads through the same `ChatterboxTurboTTS` class with `nano=True`, which is a clean signal that Turbo and Nano share weights layout and decoder. Multilingual is a separate class, `ChatterboxMultilingualTTS`, taking a `language_id` and a `t3_model` selector of `v3` or the legacy `v2` checkpoint. Sampler controls are exposed as generation parameters rather than config files, and every output passes through the Perth implicit watermarker on the way out, with `perth.PerthImplicitWatermarker().get_watermark()` returning 0.0 or 1.0 for verification. Development is pinned to Python 3.11 on Debian 11 with dependencies locked in `pyproject.toml`.

## Ecosystem Position

Chatterbox competes with Piper, Kokoro, Coqui TTS and F5-TTS in the same open-TTS category, and the differentiator is the size ladder plus zero-shot cloning rather than a single fixed voice set. It is an alternative to the hosted endpoints (ElevenLabs and Cartesia are the two it publishes Podonos head-to-head comparisons against) for anyone who cannot send text to a third party or who needs per-user voices without onboarding calls. Compared with ChatTTS in the same content/projects/foundation-models phase, Chatterbox is MIT with no non-commercial clause on the weights and covers 23 languages against two, while ChatTTS goes further on explicit prosody tokens. It also overlaps with the ASR entries in content/projects/inference-engines, which handle the other half of a voice pipeline.

## Getting Started

Install from PyPI, then clone a voice from a reference clip with the one-step Turbo decoder:

```bash
pip install chatterbox-tts
```

```python
from chatterbox.tts_turbo import ChatterboxTurboTTS
model = ChatterboxTurboTTS.from_pretrained(device="cuda")   # nano=True for the 110M CPU model
wav = model.generate("Calling you back [chuckle], got a minute?", audio_prompt_path="ref.wav")
```

The project is developed and tested on Python 3.11; a source install uses `pip install -e .` after cloning.

## Key Use Cases

1. Low-latency voice agent: serve English dialogue from the 350M Turbo checkpoint so first audio arrives without a ten-step decoder in the path.
2. On-device narration: run the 110M Nano model on CPU at three times realtime for a desktop or embedded listener that must not call out to a server.
3. Localised voice: clone one speaker and render the same voice across the 23 Multilingual V3 languages, or swap to a Single Language Pack finetune when dialect accuracy matters more than breadth.

## Strengths

- A genuine size ladder from 110M to 500M covering CPU, GPU-agent and multilingual deployment, all from one codebase and one install.
- The distilled single-step speech-token-to-mel decoder is a concrete latency win over the ten-step path it replaces.
- Zero-shot cloning from a short reference clip, with a separate voice-conversion example in the repo for existing recordings.
- MIT licensed with PerTh watermarking included and an extraction script, which is a more complete responsible-release story than most open TTS.

## Limitations

Every file carries a neural watermark, and while the README claims near-perfect detection even after MP3 compression and editing, that is a constraint on your pipeline rather than a feature you can disable; if you need clean audio for training or redistribution, this is the wrong family. Turbo and Nano are English only, so any multilingual requirement jumps to a 500M checkpoint and the associated VRAM. Quality is governed by two generation knobs, `exaggeration` and `cfg_weight`, and the README's own advice is that a mismatched reference-clip language leaks its accent into the output unless `cfg_weight` is set to 0, which is the kind of tuning that needs a held-out set to tune on. Finally, the vendor's own answer for production scale is its paid endpoint, which is an honest signal about where the open weights stop being the recommended path.

## Relation to the Arsenal

This is the open-weights TTS entry in content/projects/foundation-models and the one to read first if you are choosing a speech model for a product. Its closest neighbour in the same phase is ChatTTS, which trades broad language coverage and permissive licensing for deeper explicit prosody control; compare the two on licence and language count before either. The speech-to-text half of a voice pipeline lives in content/projects/inference-engines, and if you are building the agent that consumes this audio, the harnesses in content/projects/agent-systems are the layer above. Anything serving at production QPS probably belongs closer to content/tools/serving-and-deployment once you leave the vendor's hosted endpoint.

## Resources

- [GitHub — resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox)
- [Audio samples and demo pages](https://resemble-ai.github.io/chatterbox_demopage/)
- [Turbo evaluation reports on Podonos](https://podonos.com/resembleai/chatterbox-turbo-vs-elevenlabs-turbo)
