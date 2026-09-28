---
id: snakers4-silero-vad
name: "silero-vad"
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: models
description: "Small CPU-fast voice-activity detector that gates streaming ASR and realtime voice interfaces"
github_url: "https://github.com/snakers4/silero-vad"
license: "MIT"
primary_language: Python
org_or_maintainer: "snakers4"
tags: [voice, streaming, onnx, edge]
maturity: production
cost_model: open-source
github_stars: 10313
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-23"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [audio]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Small CPU-fast voice-activity detector that gates streaming ASR and realtime voice agents, costing milliseconds per chunk instead of seconds."
best_for:
  - "You are building a streaming voice interface and need to know when the user starts and stops talking so you can finalise a turn without a fixed silence timer."
  - "You are batching transcription across long recordings and need speech segments first so the recogniser skips hours of silence instead of decoding them."
  - "You need a voice gate that runs in a browser, on a Raspberry Pi, or in a mobile app, where a torch dependency would be unacceptable."
avoid_if:
  - "You need word-level timestamps with no extra latency, since gating adds a boundary decision you still have to account for in alignment."
  - "You need to distinguish overlapping speakers, since a binary speech-versus-non-speech decision is all this model produces."
  - "You are already paying for an end-to-end speech model with its own internal activity detection, where a separate gate is redundant work."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (10313), MIT, last commit 2026-09-23, Python, and the topic list were API-verified; no homepage field. The two-stage dilated CNN design, 512-sample frame chunking, ONNX and TorchScript exports, and the post-processing parameter names come from the official README and source. Latency and model-size figures are the project's published numbers, not re-measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/snakers4/silero-vad", "date": "2026-09-28", "description": "10,313 stars and last commit 2026-09-23 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Silero VAD is a small voice-activity detection model: given a short audio window it returns a probability that the window contains speech. The important properties are size and speed — the model runs at a few milliseconds per chunk on a single CPU thread, with the PyTorch, ONNX, and TorchScript variants all under a megabyte or so, and the ONNX build is what makes browser and edge deployment practical. Inference is chunked: audio is fed in frames of 512 samples at 16 kHz, each frame scored independently, and the probability series is smoothed and thresholded into speech and non-speech spans, with configurable minimum speech duration, minimum silence duration, and a speech threshold that trades missed speech against false triggers. get_speech_timestamps returns the spans directly, and get_timestamps returns word-like chunk boundaries. The library wraps all of this behind a single model object with a reset between streams, and the same model is used inside popular streaming ASR setups where it decides when to run the recogniser and when to emit a final result.

## Why it's in the Arsenal

The recurring decision is when to run the expensive part of a speech pipeline. The default is a fixed-energy threshold or a fixed-duration trigger, both of which are wrong in the same ways: energy picks up fans and keyboards and misses quiet speech, and a timer either cuts a slow speaker off or adds an awkward delay to every reply. A learned VAD is neither — it is a small model trained on labelled speech versus non-speech that runs in about a millisecond, so you can afford to run it on every chunk and make the decision per frame. That buys proper turn-taking: you start the recogniser when the user actually starts speaking and finalise when they actually stop, which is what makes a voice interface feel responsive instead of sluggish.

## Architecture

The model is a small dilated 1-D convolutional network over the raw waveform, structured in two stages: a first stage at a higher frame rate producing a per-frame speech probability, and a second stage operating on that sequence to make a more global decision, which is what lets it use context longer than a single 32 ms window without a large receptive field. The wrapper handles everything around it: resampling to 16 kHz mono, splitting the stream into the model's expected 512-sample frames, running a forward pass per frame, collecting the probability series, and post-processing it into spans. That post-processing is where the tunables live — a speech probability threshold, a minimum speech duration to drop blips, a minimum silence duration to merge gaps inside one utterance, and windowing parameters to choose how much padding a returned segment gets. On a streaming call the model object holds no cross-stream state, so reset between streams is required; the ONNX and TorchScript exports run the identical weights without torch, which is the deployment story for browsers and embedded targets.

## Ecosystem Position

Silero VAD is the default voice-activity gate in the streaming ASR world and overlaps with WebRTC's VAD, which is the classical energy-and-zero-crossing-rate approach: Silero is far more accurate on real audio and comparable in cost, while WebRTC needs no model download. It is a complement rather than a competitor to faster-whisper and whisperx, which is where the recognition happens once a span is found, and to the ASR side of NeMo Speech for the same reason. Against pyannote.audio it answers a different question entirely — speech versus non-speech rather than who is speaking — so the two are commonly stacked. Compared with a vendor streaming API that returns voice-activity metadata for free, it is the option when the audio cannot leave your process or the vendor's internal detection does not fit your turn policy.

## Getting Started

Install and extract speech spans from a file:

```bash
pip install silero-vad
```

```python
import torch
from silero_vad import load_onnx, get_speech_timestamps

model = load_onnx()

wav = torch.rand(1, 16000 * 30)          # 30 s of 16 kHz mono audio
speech = get_speech_timestamps(
    wav, model,
    sampling_rate=16000,
    threshold=0.5,
    min_speech_duration_ms=250,
    min_silence_duration_ms=100,
    return_speech=True,
)
for chunk in speech:
    print(f"speech: {chunk['start']/16000:.2f}s - {chunk['end']/16000:.2f}s")
```

In a browser the same weights load from the ONNX build with onnxruntime-web, and get_timestamps gives you word-like chunk boundaries for streaming ASR or turn detection.

## Key Use Cases

1. Turn detection in a voice assistant: start the recogniser on speech onset and finalise the transcript on a silence threshold the model justifies rather than a fixed timer.
2. Pre-segmenting hours of recorded audio so batch ASR decodes only speech, which can cut processing time by an order of magnitude on sparse recordings.
3. On-device wake gating in a browser or embedded app where the ONNX build is small enough to download and fast enough to run per frame.

## Strengths

- Runs in roughly a millisecond per chunk on one CPU thread, so gating every frame is affordable in a way full recognition is not.
- Tiny model: the PyTorch, ONNX, and TorchScript builds are all small enough to ship inside an application bundle.
- Tunable post-processing for speech threshold, minimum speech duration, and minimum silence duration, which is where turn quality is actually decided.
- ONNX export makes it usable in browsers and embedded targets where a torch dependency rules it out.
  

## Limitations

The output is a binary speech-versus-non-speech decision, so it does nothing for overlapping speakers, and the model is general rather than tuned for a specific language or accent. The threshold defaults are generic: a noisy call, a quiet dictation user, or a meeting with a lot of crosstalk each need retuning, and a bad threshold produces clipped words or hallucinated triggers that are hard to debug downstream. It is a gate, not a recogniser — every span still costs a full ASR pass, so latency and cost are only reduced, not removed. Several parameters interact in ways the API does not explain well, and the model is trained on a specific distribution of audio, so unusual conditions such as heavy compression or synthetic voice can behave unexpectedly.

## Relation to the Arsenal

This is the voice-activity entry in content/projects/inference-engines, and it is the first component in a streaming speech pipeline: silero-vad decides when, faster-whisper and whisperx transcribe, and pyannote-audio in the frameworks folder decides who. In the training-and-alignment folder, the NeMo Speech entry offers a whole-stack path when you want one framework's serving story rather than a composable set of parts. For realtime voice agents in content/projects/agent-systems, this is the component that determines perceived responsiveness, which is usually the difference between a demo and a product. It is also a dependency of the browser-side inference entries, where onnxruntime-web runs the same weights.

## Resources

- [Silero VAD GitHub repository](https://github.com/snakers4/silero-vad)
- [Silero VAD documentation and changelog](https://github.com/snakers4/silero-vad/blob/master/README.md)
- [WebRTC VAD, the classical alternative](https://github.com/ricky0123/vad)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (10,313 stars, last commit 2026-09-23, license MIT, verified via GitHub API on 2026-09-28)*
