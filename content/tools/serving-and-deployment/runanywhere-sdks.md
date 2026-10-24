---
id: runanywhere-sdks
name: "RunAnywhere SDKs"
type: tool
job: [deployment]
description: "Cross-platform SDKs running LLMs, vision and speech models on device through one C++ core"
url: "https://github.com/RunanywhereAI/runanywhere-sdks"
cost_model: open-source
pricing_detail: "Open source under a repository-specific licence, which is worth reading before shipping in a commercial app"
tags: [local, edge, multimodal, quantization, inference]
maturity: beta
stack: [cpp]
free_tier: true
free_tier_limits: "No usage limits from the project; device memory and thermal headroom are the real caps"
self_hostable: true
open_source: true
source_url: "https://github.com/RunanywhereAI/runanywhere-sdks"
docs_url: null
github_url: "https://github.com/RunanywhereAI/runanywhere-sdks"
alternatives: []
integrates_with: []
added_date: "2026-10-14"
last_reviewed: "2026-10-14"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "Collapses five native integrations into one runtime with real memory controls; the licence and app-size cost are the things to check before shipping"
status: active
phase: serving-and-deployment
audience: [production, prototype]
best_when:
  - "One feature must run offline on iOS, Android and web from a shared codebase rather than three native integrations"
  - "You need control over context size, quantisation and memory mapping because the device, not a server, sets the limit"
avoid_when:
  - "Concurrency and throughput dominate and a server-side engine with batching is the right shape"
  - "The licence terms cannot be cleared for your distribution model before a release date"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Capabilities described from the repository; licence is reported by the repository metadata as non-standard, so verify it directly before planning a release."
buzz_sources: []
---

## Overview

RunAnywhere SDKs packages on-device inference behind one API across Swift, Kotlin, React Native, Flutter and WebAssembly. The core is C++: llama.cpp for language models, Whisper for speech, ONNX Runtime for vision and other graphs, with dispatch to Metal, Vulkan, NEON and WebGPU depending on the device.

The value is consolidation. Shipping local models on mobile normally means a Metal binding for iOS, JNI and Vulkan work for Android, and an Emscripten harness for web — three codebases with three failure modes, each of which can crash the host app when memory runs out. One runtime with idiomatic wrappers means the native crash surface is maintained once.

It also exposes the levers that matter on constrained hardware: memory-mapped model loading, explicit context length, KV cache allocation and quantisation choice.

## Why It's in the Arsenal

The Arsenal's local entries have so far been desktop and server shaped. This one covers the opposite end: consumer devices where the model must fit in a few gigabytes and heat, battery and app-store size are design constraints as much as latency.

It is catalogued with a caveat, because the licence is non-standard and a mobile SDK decision is hard to reverse once an app is in a store.

## Key Features

- One inference API across Swift, Kotlin, React Native, Flutter and WebAssembly.
- Backend dispatch to Metal, Vulkan, ARM NEON, OpenCL and WebGPU per platform.
- Model families covering language, vision-language, speech recognition and speech synthesis.
- Memory-mapped loading, configurable KV cache, and context trimming to avoid out-of-memory terminations.
- Grammar-constrained decoding for JSON output, which is what makes on-device extraction usable.
- Quantisation support for GGUF and related formats.

## Architecture / How It Works

A thin language wrapper calls into the C++ core, which selects an execution provider at initialisation based on the device and the ops the model needs. Weights are memory-mapped rather than copied into the heap, so the operating system can page them and the app avoids doubling its resident size on load.

Generation runs through a token loop with streaming callbacks; context growth is bounded by an explicit policy that trims or evicts rather than letting the allocator fail. Grammar-constrained decoding masks logits at each step so the output token sequence matches a schema by construction instead of by post-hoc repair.

## Getting Started

Start with one platform and one small quantised model, measure resident memory and time per token on the oldest device you support, and only then add a second platform. Reading the licence file belongs at the start of that process, not after a prototype has become a roadmap item.

## Use Cases

1. An offline assistant in a mobile app that must answer without network access.
2. On-device transcription and summarisation of meetings where audio cannot leave the phone.
3. A field application in low-connectivity environments needing structured extraction from photos.
4. A shared Flutter or React Native codebase where local inference should not fork per platform.

## Strengths

- Removes three separate native integrations in favour of one maintained core.
- Memory-mapped weights and explicit context control address the failure mode that actually crashes mobile apps.
- Grammar-constrained decoding makes structured output reliable without server-side retries.
- Backend dispatch means the same code reaches Metal, Vulkan and WebGPU accelerators.
- Multimodal coverage of language, vision and speech avoids stitching several SDKs together.

## Limitations / When NOT to Use

- The licence is non-standard; audit it against your distribution and commercial requirements before adopting.
- App and download size grow materially, so weights usually need dynamic download and versioning.
- Sustained generation on a phone throttles; battery and thermal behaviour must be handled in the app itself.
- Device fragmentation means per-model, per-device benchmarking is unavoidable.
- Beta surface with breaking changes likely between minor releases.

## Integration Patterns

Ship without weights and fetch quantised models on first run so the store binary stays small, and gate downloads by device memory class. Log time-to-first-token and tokens per second by device model in your telemetry, with a local fallback to a server endpoint when a request exceeds a latency budget. Treat model updates like app updates: signed, versioned, and reversible.

## Resources

- [GitHub — RunanywhereAI/runanywhere-sdks](https://github.com/RunanywhereAI/runanywhere-sdks)
- [RunAnywhere documentation](https://docs.runanywhere.ai/)

## Buzz & Reception

Attention comes from mobile developers tracking on-device inference; no independent performance comparison across platforms is recorded here. The numbers that decide adoption are resident memory and thermal behaviour on your oldest supported device.
