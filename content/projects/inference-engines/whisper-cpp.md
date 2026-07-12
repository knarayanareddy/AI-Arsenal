---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "ggml-org"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: whisper-cpp
name: "whisper.cpp"
artifact_type: library
category: voice-audio
subcategory: inference-engines
description: "A dependency-free C/C++ port of OpenAI's Whisper that runs speech-to-text on CPU and consumer hardware via the ggml/GGUF tensor library"
github_url: https://github.com/ggml-org/whisper.cpp
license: "MIT"
primary_language: "C++"
tags:
  - "voice"
  - "inference"
  - "self-hosted"
  - "llm"
  - "streaming"
maturity: production
cost_model: open-source
github_stars: 51732
last_commit: "2026-07-11"
docs_url: https://github.com/ggml-org/whisper.cpp
phase: inference-engine
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A portable ASR runtime that executes the Whisper encoder-decoder from quantized GGUF weights with no Python or CUDA dependency."
best_for:
  - "You need offline, on-device transcription on a laptop, phone, or edge board where a PyTorch + CUDA stack is impractical"
  - "You want to embed speech-to-text directly into a C/C++, Swift, or WASM application as a single linked library"
avoid_if:
  - "You need training or fine-tuning of Whisper; this is inference-only and expects existing GGUF checkpoints"
  - "You require the absolute lowest word-error-rate at scale on datacenter GPUs, where the PyTorch/faster-whisper path can be tuned further"
enrichment_notes: "Repository, MIT license, and 2026-07-11 activity verified via the GitHub API on 2026-07-12. Accuracy/latency characteristics are model- and hardware-dependent and not benchmarked here."
---

## Overview

whisper.cpp reimplements OpenAI's Whisper automatic-speech-recognition model in plain C/C++ on top of the ggml tensor library, the same core that powers llama.cpp. It loads quantized GGUF checkpoints and runs the full mel-spectrogram front end, transformer encoder, and autoregressive decoder without Python, PyTorch, or a GPU, which makes it one of the most portable ways to get Whisper-quality transcription onto CPUs, phones, and browsers.

## Why it's in the Arsenal

It is the reference example of turning a research model into a deployable artifact. For engineers who need transcription inside a shipped application rather than a notebook, whisper.cpp removes the entire heavyweight ML runtime and replaces it with a single compiled dependency.

## Architecture

The project ports Whisper's encoder-decoder transformer to ggml operators and stores weights in the GGUF format with integer quantization (Q4, Q5, Q8) to shrink memory. It computes the 80-bin log-mel spectrogram in C, runs the convolutional stem and attention encoder, then does greedy or beam-search decoding with a token-level timestamp path. SIMD kernels (AVX, NEON), Metal, CUDA, and Vulkan backends are optional accelerators, and streaming is handled by a sliding audio window.

## Ecosystem Position

It complements rather than competes with the original PyTorch Whisper and with faster-whisper (which uses CTranslate2): those target Python and datacenter GPUs, whereas whisper.cpp targets embedded and native deployment. Compared to cloud ASR APIs it trades managed scale for privacy, offline operation, and zero per-minute cost, and it sits alongside llama.cpp as the audio member of the ggml family.

## Getting Started

Clone and `make`, download a GGUF model with the bundled script (for example `base.en` or `large-v3`), then run `./main -m models/ggml-base.en.bin -f audio.wav`. Bindings exist for Python, Go, Rust, Node, and Swift, and a `stream` example demonstrates real-time microphone transcription.

## Key Use Cases

On-device voice notes and dictation; subtitle and caption generation for media pipelines; privacy-preserving meeting transcription; embedding ASR into mobile and desktop apps; batch transcription on CPU-only servers.

## Strengths

No runtime dependencies, small quantized footprint, broad hardware backends, permissive MIT license, and a large binding ecosystem. It is well maintained and tracks upstream Whisper model releases quickly.

## Limitations

It is inference-only, so training and fine-tuning must happen elsewhere and be converted to GGUF. Quantization can trade some accuracy for size, beam search is slower on CPU, and very long files still require chunking. Word-error-rate ultimately depends on the chosen Whisper checkpoint, not on this runtime.

## Relation to the Arsenal

It pairs with the catalog's serving and voice-audio entries and mirrors llama.cpp in the LLM space, giving the Arsenal a canonical example of edge-friendly model deployment.

## Resources

- [GitHub repository](https://github.com/ggml-org/whisper.cpp)
- [Whisper paper (OpenAI)](https://arxiv.org/abs/2212.04356)
- [ggml library](https://github.com/ggml-org/ggml)
