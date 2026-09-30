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
org_or_maintainer: "SillyTavern"
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
id: sillytavern
name: "SillyTavern"
artifact_type: platform
category: tooling
subcategory: platforms
description: "Local LLM front end unifying text, image and TTS backends with lorebooks, Visual Novel mode and a large extension ecosystem"
github_url: "https://github.com/SillyTavern/SillyTavern"
license: AGPL-3.0
primary_language: Other
tags: [multimodal, llm]
maturity: production
cost_model: open-source
github_stars: 33887
last_commit: "2026-09-23"
docs_url: "https://docs.sillytavern.app/"
phase: agent-system
domain:
  - "language"
  - "general-purpose"
relation_to_stack:
  - "deploy-as-is"
  - "fork-and-adapt"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A locally hosted conversation frontend that manages personas, prompt assembly, context budgeting, and connections to many local or hosted model backends."
best_for: ["You are running a local text model and you want prompt templates, sampling parameters and lorebook-driven world context that a bare completion endpoint does not give you.", "You want one interface over many backends, because the README lists KoboldAI/CPP, Horde, NovelAI, Ooba, Tabby, OpenAI, OpenRouter, Claude and Mistral as supported connections.", "You want to couple text generation with images and speech, since Automatic1111 and ComfyUI image generation plus TTS voice models are integrated into the same session."]
avoid_if: ["You need an embeddable library or a multi-user service, because this is a locally installed user interface for a single operator rather than a component you build on.", "You need a turnkey chat product with no learning curve, because the project's stated vision explicitly includes a steep learning curve as part of the appeal.", "You need a supported commercial product, because it is a community passion project that is always free and open source with no hosted service."]
enrichment_notes: "Official repository, AGPL-3.0 license, and 2026-07-11 activity were reviewed on 2026-07-12. Suitability beyond single-user/local use remains draft."
---

## Overview

SillyTavern is a locally installed user interface for interacting with text generation LLMs, image generation engines and TTS voice models, described as a front end for power users. It provides a single unified interface over many backends including KoboldAI/CPP, Horde, NovelAI, Ooba, Tabby, OpenAI, OpenRouter, Claude and Mistral, with a mobile-friendly layout, Visual Novel Mode, Automatic1111 and ComfyUI image generation integration, text-to-speech, WorldInfo lorebooks, a customizable UI and auto-translate, plus a deliberately large number of prompt options. The project began in February 2023 as a fork of TavernAI 1.2.8 and by the README's account has over 300 contributors and three years of independent development. Hardware needs are minimal: anything that runs NodeJS 20 or higher, with a 3000-series NVIDIA card and 6GB of VRAM recommended if you also run local inference.

## Why it's in the Arsenal

The decision it removes is how much control you have over what actually reaches the model. A chat API gives you a messages array; SillyTavern gives you a prompt construction surface, sampling parameters, and lorebooks that inject world knowledge on keyword match, which is what long-form and roleplay workflows need and ordinary SDKs do not expose. It also removes the need to run separate tools for images and speech in the same session, since ComfyUI and TTS hang off the same conversation. The trade is the interface's own complexity: the vision section openly names a steep learning curve as intentional, and the extension ecosystem is a surface you have to keep an eye on.

## Architecture

A NodeJS 20 server renders the chat interface locally and holds the conversation state, prompt assembly and sampler configuration. Backend connections are adapters over the supported text providers, so the same session can move between a local KoboldAI-compatible server, a hosted API such as OpenAI or Claude, or a Horde worker, and the prompt is built according to whichever template that backend expects. WorldInfo lorebooks sit in the prompt assembly path and inject entries when their keywords appear, which is the mechanism behind persistent world context. Image generation routes to Automatic1111 or ComfyUI over their HTTP APIs, and TTS routes to a voice model, so text, image and speech results share one conversation view. Extensibility is via third-party extensions loaded into the server, and the UI is restyleable, which is why both count as first-class features rather than afterthoughts.

## Ecosystem Position

SillyTavern occupies the local chat front-end niche alongside Open WebUI and LM Studio's own chat, and it competes on prompt control and model flexibility rather than on multi-user features: this is a single-operator interface, not a shared assistant. It overlaps with the agent entries in content/projects/agent-systems only loosely, since the conversation is human-driven rather than tool-calling, though extensions are the path to adding tools. Compared with a hosted chat product, it is the same conversation with the weights on your machine and the provider bill removed, which is the trade every local-first front end makes. It complements rather than competes with the inference entries in content/projects/inference-engines, which supply the local server SillyTavern talks to. Its extension ecosystem is also the main supply-chain surface, which is a category-wide concern rather than specific to this project.

## Getting Started

Clone the repository, install Node dependencies, and start the server, which serves the interface locally:

```bash
git clone https://github.com/SillyTavern/SillyTavern.git
cd SillyTavern
npm install
node server.js
```

Open the printed local URL, then add a connection in the API connections panel for a local KoboldAI-compatible endpoint or a hosted provider key. NodeJS 20 or higher is the stated requirement, and the project publishes separate Windows, macOS and Linux install guides under docs.sillytavern.app.

## Key Use Cases

1. Local model exploration: run a GGUF or full-precision model through llama.cpp or a KoboldAI-compatible server and tune sampling and prompt templates interactively.
2. Long-form and roleplay writing: use WorldInfo lorebooks for persistent world context and Visual Novel Mode for a scene-oriented interface.
3. Unified creative session: generate text, images through ComfyUI or Automatic1111, and speech in one conversation without switching tools.

## Strengths

- Deep prompt and sampling control, with the project's stated goal of maximising utility and control over prompts rather than hiding them.
- One interface over many backends including local servers, Horde and major hosted APIs, so model comparison needs no reconfiguration.
- Integrated image generation and TTS in the same conversation, avoiding tool-switching for multimodal creative work.
- Minimal hardware requirements, running on anything with NodeJS 20 while inference happens elsewhere.

## Limitations

AGPL-3.0 rules it out of most closed-source commercial products without a separate arrangement, and the project itself is positioned as a free community passion project with no hosted offering, so support is community Discord rather than an SLA. It is a single-operator local interface with no multi-user auth, tenancy or centralised policy, which is exactly the wrong shape for a shared team assistant. The extension ecosystem is the largest risk surface: third-party extensions run inside the server process, and there is no curation layer comparable to a package registry's trust process. The breadth of prompt and backend options is a real learning cost, and a large community product with 300-plus contributors will accumulate settings that only make sense to people who have read the documentation site.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the local human-in-the-loop chat surface, and it is the natural client for the inference entries in content/projects/inference-engines that expose a local completion endpoint. Compare it against the other self-hosted front ends in this batch to decide which UI suits your workflow, and against the agent frameworks in content/projects/framework if you actually need tool-calling rather than a chat. The retrieval entries in content/projects/data-and-retrieval become relevant the moment you want grounding in your own documents, which SillyTavern does not do natively. For batch or scheduled work, none of this applies and the orchestration entries are the right place.

## Resources

- [GitHub — SillyTavern/SillyTavern](https://github.com/SillyTavern/SillyTavern)
- [Documentation — docs.sillytavern.app](https://docs.sillytavern.app/)
- [Installation guides, including Windows and macOS](https://docs.sillytavern.app/installation/)
