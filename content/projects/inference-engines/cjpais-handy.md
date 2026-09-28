---
id: cjpais-handy
name: "Handy"
version_tracked: null
artifact_type: tool
category: voice-audio
subcategory: tools
description: "MIT-licensed Rust desktop app for fully offline Whisper-family speech-to-text, built as a Tauri v2 native client"
github_url: "https://github.com/cjpais/Handy"
license: "MIT"
primary_language: Rust
org_or_maintainer: "cjpais"
tags: [voice]
maturity: production
cost_model: open-source
github_stars: 32347
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://handy.computer"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [audio, language]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Local speech-to-text application in Rust that runs Whisper-family models entirely offline, aimed at dictation and captioning without a cloud round trip."
best_for:
  - "You dictate on a laptop and the audio must never leave the device, whether for a compliance rule, a confidential codebase, or simply an unreliable connection."
  - "You want a global hotkey that injects transcribed text into whatever application has focus, which is the difference between a transcription tool and dictation."
  - "You are choosing a local Whisper variant and a quantization for your hardware and want a small surface to try them, since the model choice and compute type are user-selectable."
avoid_if:
  - "You need speaker diarization or per-speaker labels, because the app is a single-stream transcriber and does not separate voices."
  - "You need a batch pipeline over a directory of audio files with structured output, because the interface is built around interactive dictation rather than batch jobs."
  - "You need the lowest possible latency on very long recordings, because transcription speed tracks model size and hardware, and a large model on CPU can fall behind real time."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 32347 stars, MIT license, Rust primary language, last commit 2026-09-28, 4 GitHub topics including cross-platform, speech-to-text, tauri-v2, accessibility. Tauri v2 shell, local Whisper variants, and native insertion are described in the official README; the app was not built or run in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/cjpais/Handy", "date": "2026-09-28", "description": "32,347 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Handy is a desktop speech-to-text application for macOS, Windows, and Linux that runs Whisper-family models locally and does nothing else. The native shell is Rust through Tauri v2, so the window and the hotkey handling are thin while the transcription work happens in-process against a local model, and there is no account, no telemetry, and no network call in the normal path. It exposes controls for the model variant, the compute type, and the language, shows the recognized text in an overlay you can edit before insertion, and injects the result into the focused application through a global shortcut. The appeal is narrow and deliberate: it is the smallest thing that makes offline dictation feel finished.

## Why it's in the Arsenal

The recurring decision Handy resolves is whether a dictation key may phone home. Cloud speech-to-text is more accurate on noisy audio and costs nothing to set up, which is why it is the default, and that default is a problem for confidential material, air-gapped environments, and anyone who records without thinking about it. A local Whisper model makes that a non-question, and the remaining engineering problem is UX rather than accuracy: a global hotkey, an overlay for reviewing the text, and insertion into the focused app. That is what the project spends its effort on, and it is a reasonable focus, because a transcription tool that requires you to leave your editor is not a dictation tool. The cost of the tradeoff is model-driven and hardware-driven: local accuracy on a small model with a CPU backend is well behind a frontier cloud service, and speed scales with the model you select and the hardware underneath.

## Architecture

The application is a Tauri v2 shell wrapping a Rust core. The frontend is a webview rendering the settings and the transcription overlay, and the Rust side owns the model lifecycle: it resolves the selected Whisper variant from a local model directory, loads it with an inference engine, and exposes a streaming or buffered transcribe call that consumes audio from the system input device through the platform capture API. The core runs the acoustic-to-token pipeline locally - mel spectrogram front end, encoder, cross-attention over the decoded prompt, and a decoder emitting tokens with sampling parameters - and applies the same timestamp and segment logic a Whisper implementation normally uses, so the overlay can show the text as it is finalized. Text insertion is done natively per platform, writing to the focused application through the accessibility API on macOS and the equivalent on Windows and Linux, which is the part that makes it feel native rather than a web app pretending to be. Settings, the chosen model, and hotkey bindings are persisted through the Tauri store, and the model files are managed on disk by the user or by an in-app download step, so an air-gapped machine can place them manually and run with no network at all.

## Ecosystem Position

Handy competes with cloud dictation built into macOS and Windows and with the desktop wrappers around local Whisper runtimes, and compared with the OS built-ins it wins on privacy and model choice while losing on accuracy on difficult audio and on zero-setup convenience. It overlaps with the local Whisper and faster-whisper entries in the Arsenal's voice stack, which supply the model and the runtime, and with the TTS entries, which are the reverse direction; the separation of concerns is clean, so the useful comparison is which runtime and which quantization, not which product. It is an alternative to a system-wide cloud dictation key, and it is rather than a speech research toolkit - for training, diarization, or forced alignment, the speech toolchain in content/projects/inference-engines/ and the model entries in content/projects/foundation-models/ are the relevant layer. Inside the Arsenal it is the on-device counterpart to the hosted speech APIs, and the honest reason to pick it is that the audio cannot leave the machine.

## Getting Started

Build and run the desktop application from source, or install a packaged release for your platform:

```bash
git clone https://github.com/cjpais/Handy.git
cd Handy
cargo tauri dev
```

Place a Whisper model in the configured models directory, bind the global shortcut, and dictate into any focused application. Packaged builds for macOS, Windows, and Linux are published on the releases page.

## Key Use Cases

1. Dictating into an editor or terminal without sending audio to a third party, which is the case for confidential code, meeting notes, or regulated data.
2. Working on an air-gapped or intermittently connected machine where a cloud dictation key simply fails and a local model keeps working.
3. A quick A/B of Whisper variants and compute types on your own hardware, since the model selection is a setting rather than a rebuild.

## Strengths

- Fully local by default, with no account, telemetry, or network dependency in the transcription path.
- Global hotkey plus native text insertion into the focused application, which is what makes it usable as a daily dictation tool rather than an editor add-on.
- Tauri v2 shell keeps the resident footprint small and the UI responsive while a model runs.
- Model and compute type are user-selectable, so a machine with an NPU-class accelerator and one without can both be served by the same app.

## Limitations

There is no speaker diarization, so a conversation with more than one voice produces an undifferentiated transcript - that is the most requested feature and the most conspicuous gap. Accuracy trails a frontier cloud service on noisy, accented, or overlapping speech, and the gap widens with the smaller quantized models a laptop can run in real time. Latency is bounded by hardware and model size, so a large model on CPU will not keep up with a fast talker and the app will lag behind speech. The release model is a curated selection rather than a full menu, so if your preferred runtime or quantization is absent, you are waiting on the project or forking it. And because the transcription quality is entirely the underlying model's, evaluating this app is largely evaluating the Whisper variant and the compute type you selected.

## Relation to the Arsenal

The desktop, privacy-first end of the voice and audio surface in the Arsenal, sitting on top of the local Whisper runtimes and speech model entries in the Arsenal's inference and model phases. Its counterpart for non-dictation work - batch transcription, alignment, speaker separation - is the speech toolchain listed under content/projects/inference-engines/, and the TTS entries are the reverse direction for synthesis. Where the retrieval and document entries in content/projects/data-and-retrieval/ handle text you already have, this handles audio you do not yet have in text form. If your requirement is a service with diarization and batch throughput, use the library layer instead of the desktop app.

## Resources

- [GitHub — cjpais/Handy](https://github.com/cjpais/Handy)
- [Project site](https://handy.computer)
- [Releases for packaged desktop builds](https://github.com/cjpais/Handy/releases)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (32,347 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*
