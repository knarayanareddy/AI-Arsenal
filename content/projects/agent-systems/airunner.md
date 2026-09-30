---
id: airunner
name: airunner
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: PySide6 desktop application bundling a local chat companion and a layered image canvas over llama.cpp and whisper.cpp sidecar processes
github_url: "https://github.com/Capsize-Games/airunner"
license: GPL-3.0
primary_language: Python
tags: [local, multimodal]
maturity: beta
cost_model: open-source
github_stars: 1316
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-23"
docs_url: "https://github.com/Capsize-Games/airunner/wiki"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Pairs a persistent offline companion with SDXL and Z-Image Turbo generation in one app, with no API key and no subscription."
best_for:
  - "You want a private conversational companion that keeps long-term memory of you across sessions and never phones home."
  - "You sketch on a layer and want to convert the sketch into an SDXL or Z-Image Turbo render, then iterate with img2img and inpainting in place."
  - "You need one application that manages model downloads from HuggingFace and Civitai plus local LLM, TTS and STT runtimes, so you are not juggling four separate tools."
avoid_if:
  - "You need speech-to-text outside English, because the README language matrix marks STT as unsupported for Japanese, Spanish, French, Chinese and Korean."
  - "You are building a server-side pipeline rather than a desktop app, because this is a GUI-and-daemon product with an offscreen test mode, not a library you import into your own service."
  - "You intend to embed it in a closed-source product, because the project is GPL-3.0 and the obligations survive distribution."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (GPL-3.0), last commit, primary language, topics and open-issue count came from the GitHub API. Feature matrix, install channels, language support table and the four-package architecture are read from the official README and linked architecture docs; runtime behaviour was not exercised here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AI Runner ships two interlocking surfaces in one Python 3.13 codebase: a companion you name, give a personality and a voice, which accumulates RAG-backed long-term memory and tracks time, date and local weather; and a multi-layer drawing canvas that supports sketching, image-to-image iteration, compositing, filters and background removal. Image generation targets SDXL and Z-Image Turbo with LoRA and embedding support. Inference is delegated to llama.cpp and whisper.cpp sidecars built in the companion airunner-native repository, and the app manages weights through built-in HuggingFace and Civitai downloaders. Packaging spans itch.io desktop downloads, PyPI, and ghcr.io container images including a linux-headless variant.

## Why it's in the Arsenal

The decision it settles is whether a creative agent needs a hosted service at all. Here the model catalogue is local, the NSFW and prompt classifiers run on-device, and the memory store never leaves the machine unless you deliberately enable a cloud feature. The cost is disk and VRAM: you own the weights, the LoRA stack and the inference sidecars, and the repo is maintained by a single engineer at Capsize LLC, which is why sponsorship is prominent rather than incidental.

## Architecture

The repository splits into four packages: src holds the PySide6 desktop client and its daemon bridge, services holds a headless daemon with a FastAPI server, runtime registry and orchestration layer, native is the launcher and runtime layout helper, and scripts covers tests and UI builds. Both the GUI and the daemon talk to llama.cpp and whisper.cpp sidecars rather than embedding inference, and both read state from AIRUNNER_BASE_PATH. Model acquisition runs through the services-side downloader, which writes into that same base path, and memory retrieval sits on top of a local document RAG flow.

## Ecosystem Position

Where Stable Diffusion WebUI and ComfyUI are generation-first, AI Runner treats generation as one half of a companion app, so it overlaps only partially. It competes with SillyTavern for the offline-character-chat niche, but adds an image canvas and real inference sidecars rather than a frontend for someone else's API, and it overlaps with its own dockerised headless mode for server deployments. Compared with content/projects/inference-engines entries such as ollama or llama-cpp, it consumes those runtimes instead of competing, while entries in content/projects/frameworks such as LangChain supply orchestration that this app deliberately does not generalise.

## Getting Started

Install from PyPI, the container registry, or the itch.io desktop build which needs no Python setup at all:

```bash
pip install airunner
# or, headless in a container:
docker pull ghcr.io/capsize-games/airunner:linux-headless
```

Then start the app and point it at a local model directory; the built-in downloaders fetch weights from HuggingFace or Civitai on first run.

## Key Use Cases

1. Offline companion with continuity: talk to a named persona whose memory, personality and mood persist across restarts and are grounded in local time and weather.
2. Sketch-to-render iteration: draw a rough composition on one canvas layer, generate an SDXL interpretation, then mask and inpaint specific regions without leaving the app.
3. Layered composition: stack generated backgrounds, painted elements and filters across separate canvas layers and export the composite in one pass.

## Strengths

- No API key, account or network connection required for either the companion or the canvas.
- Real native runtimes via llama.cpp and whisper.cpp sidecars rather than HTTP calls to a hosted endpoint.
- Ships a linux-headless container image, so the same app can serve a server workflow as well as a desktop.
- Built-in safety stack with configurable NSFW filtering and an always-on prompt classifier for illegal content.

## Limitations

Single-maintainer bus factor is the headline risk: one engineer at Capsize LLC ships and releases everything, which is unusual for a GPL project of this scope. Language coverage is uneven, with the README matrix marking STT as English-only and the GUI as English-only while TTS and LLM support Japanese and a partial set of European and Asian languages. VRAM requirements for SDXL with LoRAs are real and not documented per model, and the container path still needs weights mounted. This is also GPL-3.0, which matters if you intend to embed it in a closed-source product, and the offscreen functional tests need a real local runtime, so CI cost is non-trivial.

## Relation to the Arsenal

This entry sits in content/projects/agent-systems as the multimodal-companion case, closer to an end-user application than to a harness others build on. Its inference dependencies live in content/projects/inference-engines, notably llama-cpp and the whisper.cpp lineage, and the layered canvas approach differs from the server-side pipelines you would find in content/projects/frameworks. For speech models specifically, the inference-engines phase also holds dedicated ASR entries you can pair if you only need transcription.

## Resources

- [GitHub — Capsize-Games/airunner](https://github.com/Capsize-Games/airunner)
- [Architecture docs and package split](https://github.com/Capsize-Games/airunner/tree/master/docs/architecture)
- [Native runtime sidecars — airunner-native](https://github.com/Capsize-Games/airunner-native)
