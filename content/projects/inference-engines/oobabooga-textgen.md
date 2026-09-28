---
id: oobabooga-textgen
name: "textgen"
version_tracked: null
artifact_type: tool
category: llms
subcategory: tools
description: "AGPL-3.0 desktop and local-server front end for self-hosted LLMs with vision, tool calling, and OpenAI-compatible APIs"
github_url: "https://github.com/oobabooga/textgen"
license: "AGPL-3.0"
primary_language: Python
org_or_maintainer: "oobabooga"
tags: [local, llm, quantization, self-hosted]
maturity: production
cost_model: open-source
github_stars: 47720
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-08-17"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language, vision]
relation_to_stack: [deploy-as-is]
health_signals: [community-driven]
ecosystem_role:
  - "Desktop and local-server front end for self-hosted LLMs with vision, tool-calling, and OpenAI-compatible endpoints — the reference for evaluating quantizations on consumer hardware."
best_for:
  - "You have several GGUFs or quantized checkpoints of the same model and want to A/B them in one interface with identical prompts and sampling settings."
  - "You want an OpenAI-compatible endpoint for a local model on a workstation or a home server, so a desktop app can sit in front of the same backend other clients call."
  - "You are testing vision-language checkpoints and need a UI that sends an image with the prompt without writing a multimodal client."
avoid_if:
  - "You need to ship a modified version inside a closed commercial product, because AGPL-3.0 obligations attach to networked use of the work."
  - "You need multi-user serving with auth, quotas, and request routing, because this is a local single-process tool rather than a server tier."
  - "You need a tokenization-accuracy-driven serving stack, because its documented purpose is comparing and chatting with local models, not maximizing throughput on GPUs."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 47720 stars, AGPL-3.0 license, Python primary language, last commit 2026-08-17, empty topics, no homepage. Supported backends, API endpoints, and launcher options come from the repository README and wiki; no model was loaded in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/oobabooga/textgen", "date": "2026-09-28", "description": "47,720 stars and last commit 2026-08-17 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

text-generation-webui is a local interface for running and evaluating self-hosted language models. It loads models in multiple backends - llama.cpp with GGUF, ExLlamaV2, AutoAWQ, AutoGPTQ, Transformers, ExLlama, and others - and lets you switch between them from the UI, which is the feature that makes it a comparison bench rather than just a chat app. It supports text and vision-language models, tool calling, and exposes an OpenAI-compatible API so other clients can use the same local backend, alongside its own API extensions for embeddings and reranking. It runs as a desktop application with an embedded server or as a browser-served local server, and the model files live on disk as GGUF or safetensors that you supply.

## Why it's in the Arsenal

The recurring decision text-generation-webui resolves is honest local evaluation. When you quantize a model, the question is whether the degradation is acceptable for your prompt distribution, and the honest answer requires running the same prompts across builds with controlled sampling. Doing that in a notebook means reloading the backend, rewriting the prompt plumbing, and losing the ability to flip to vision or tools without new code. Here the backend switch is a dropdown, so a quantization comparison takes minutes and a tool-calling test is a checkbox. The second recurring decision is the local API surface: many tools assume a local model is reachable, and shipping an OpenAI-compatible endpoint from the same process means the desktop UI and any script see identical behavior.

## Architecture

The application is a Python server plus a web front end, packaged as a desktop app through an embedded runtime. The model registry maps an extension - GGUF, AWQ, GPTQ, safetensors - to its backend implementation, and each backend exposes a common interface for load, generate with streaming, and unload, so the UI can hot-swap. Prompt assembly handles chat template rendering, with templates for the supported model families and a fallback for unknown ones, and sampling controls expose temperature, top-p, top-k, repetition penalty, and a per-model preset saved server-side. Vision-language models take an image with the prompt and a processor supplied by the model, and tool calling routes a function call through a matching-library layer that parses the emitted JSON and dispatches to a registered function. The server exposes an OpenAI-compatible chat completions route plus its own endpoints for embeddings, reranking, and model listing, and supports optional authentication for LAN exposure. Launchers exist for desktop, Docker, and direct Python invocation, and settings are stored in a YAML file so a benchmark environment is reproducible.

## Ecosystem Position

text-generation-webui overlaps with Ollama and LM Studio for the local-model chat slot, and compared with Ollama it gives far more direct control over backend and quantization choice while requiring more setup; compared with LM Studio it is scriptable and free while being less polished as a desktop app. It competes with the coding agents in this batch for the same local-model-on-your-machine workflow, but with a chat surface rather than an edit-and-run loop. It is an alternative to writing a llama.cpp or transformers loading script for every evaluation, and it is rather than a production server: the text-generation serving entries in content/projects/inference-engines/ exist precisely because this process is not built for concurrent throughput. It complements the GGUF quantization ecosystem by giving you the surface to judge the result, and it sits alongside the model-definition layer in content/projects/frameworks/ that the Transformers backend loads through.

## Getting Started

Install the dependencies and launch the local server, which prints the URL for the web interface:

```bash
python3 -m pip install -r requirements.txt
python server.py --listen --port 5000 --n-gpu-layers 99
```

Open the printed URL, choose a model file from the models directory, and select a backend in the interface. Use the Desktop launcher for a packaged build rather than running the server directly.

## Key Use Cases

1. Compare quantizations of one model - a Q4_K_M against a Q5_K_M against a full-precision build - with identical prompts and sampling, which is the only defensible way to pick a local build.
2. Serve a workstation-local OpenAI-compatible endpoint that desktop clients, scripts, and the same UI all share without each one loading its own copy of the weights.
3. Smoke-test a vision-language or tool-calling checkpoint interactively before committing to a serving stack or an agent integration.

## Strengths

- Backend switcher across llama.cpp, ExLlamaV2, AWQ, GPTQ, and Transformers, which is what makes single-box comparison of builds practical.
- Text plus vision-language plus tool calling in one interface, so multimodal and function-calling tests need no separate client.
- OpenAI-compatible endpoints for chat, embeddings, and reranking, so other tools can reuse the local model without a shim.
- Free and open source with model files left on disk, so nothing leaves the machine and you control the build.

## Limitations

AGPL-3.0 is a real constraint for anything you modify and expose over a network, which is a different and stronger obligation than GPL for server use. Throughput and concurrency are not the design target: a single local process with per-request generation is fine for interactive use and poor for serving many clients, and multi-user features such as auth, quotas, and routing are thin. Backend parity is uneven, so features like tool calling or vision work on some backends and not others, and you can lose a capability simply by switching backends. The Python server adds startup and reload latency compared with a bare llama.cpp binary, and memory configuration is manual and easy to get wrong on a machine with one GPU and other workloads. And because a large share of users are hobbyists, the most-reported issues tend to be packaging and version drift rather than model-level problems.

## Relation to the Arsenal

The local-evaluation and chat surface for the checkpoints in content/projects/foundation-models/ and the serving engines in content/projects/inference-engines/, which is where you move once a local build is chosen and throughput matters. It overlaps with the desktop and server entries in this same batch that address the same trade-off, and it is a practical front end for the quantizations produced by the training and alignment entries in content/projects/training-and-alignment/. The agent entries in content/projects/agent-systems/ typically call the OpenAI-compatible endpoint it exposes rather than hosting the model themselves. Treat it as a bench and a local desktop client, and size the deployment separately.

## Resources

- [GitHub — oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui)
- [Project wiki with backend and extension guides](https://github.com/oobabooga/text-generation-webui/wiki)
- [Releases and one-click installers](https://github.com/oobabooga/text-generation-webui/releases)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (47,720 stars, last commit 2026-08-17, license AGPL-3.0, verified via GitHub API on 2026-09-28)*
