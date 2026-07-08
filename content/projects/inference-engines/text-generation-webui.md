---
id: text-generation-webui
name: text-generation-webui (oobabooga)
version_tracked: null
artifact_type: tool
category: llms
subcategory: inference-engines
description: The Gradio-based local LLM workbench — multiple loader backends, deep sampling control, character/instruct modes, extensions, and an OpenAI-compatible API
github_url: "https://github.com/oobabooga/text-generation-webui"
license: AGPL-3.0
primary_language: Python
org_or_maintainer: oobabooga
tags: [llm, self-hosted, inference]
maturity: production
cost_model: open-source
github_stars: 47433
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-06-02"
docs_url: "https://github.com/oobabooga/text-generation-webui/wiki"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [community-driven, actively-maintained]
ecosystem_role:
  - "The power-user workbench of local LLMs — the AUTOMATIC1111 of text generation: where Ollama hides knobs, it exposes all of them (loaders, quantization formats, samplers, LoRA hot-loading), which made it the community's model-experimentation bench"
best_for:
  - "Hands-on model experimentation: comparing quantization formats and loader backends (llama.cpp, ExLlama-family, Transformers) and tuning sampling parameters most runtimes don't expose"
  - "Local chat with full control — characters/instruction templates, LoRA loading, and an extension ecosystem (RAG, TTS, multimodal) — plus an OpenAI-compatible API for other apps"
avoid_if:
  - "You want appliance simplicity — Ollama or LM Studio get a model chatting in minutes with none of the knob surface"
  - "You're deploying multi-user production serving — this is a single-user workbench; vLLM-class servers own that job"
upstream_dependencies: [llama-cpp]
downstream_consumers: []
alternatives: [ollama, localai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (47.4k), AGPL-3.0, and maintenance state (last push 2026-06-02 — slower cadence than its 2023-24 peak but still active) verified via the GitHub API on 2026-07-08. Positioning claims are community-consensus characterization.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/oobabooga/text-generation-webui","date":"2026-07-08","description":"47.4k stars; the long-standing community local-LLM workbench"}
featured: false
status: active
---

## Overview

text-generation-webui ("oobabooga") is a Gradio UI over multiple LLM loader backends — llama.cpp for GGUF, ExLlama-family for EXL2/GPTQ, and Transformers — exposing the full sampling-parameter surface, chat/instruct/notebook modes, character personas, on-the-fly LoRA loading, and an extension system, plus an OpenAI-compatible API server. Portable builds install with a click on Windows/Linux/macOS, CPU or GPU.

## Why it's in the Arsenal

Before local LLMs had appliances, they had this workbench — and it remains the tool for the experimentation job the appliances deliberately hide: which quantization format, which loader, which sampler settings actually suit a model on your hardware. Understanding local-model behavior at that level is a skill the Arsenal covers, and this is its canonical instrument (47k stars, still maintained).

## Architecture

Python/Gradio app with a loader abstraction per model format; sampling pipeline exposing the complete parameter set (temperature through min-p, DRY, dynamic temperature); prompt-template system per model family with chat/instruct modes; extensions hook the pipeline (multimodal, TTS, RAG, translation); an OpenAI-compatible FastAPI server runs alongside the UI.

## Ecosystem Position

Upstream: llama.cpp, ExLlama-family, and Transformers as loaders. Competing: Ollama/LM Studio (appliance UX), LocalAI (API-first), KoboldCpp (adjacent community tool). Its extension ecosystem and sampler surface remain its moat; production serving was never its lane.

## Getting Started

```bash
git clone https://github.com/oobabooga/text-generation-webui
cd text-generation-webui
./start_linux.sh   # or start_windows.bat / start_macos.sh
# UI at http://localhost:7860
```

## Key Use Cases

1. **Scenario**: evaluating a new open-weight model properly — trying GGUF vs EXL2 quantizations, loaders, and sampler settings to find what your hardware actually supports well
2. **Scenario**: local chat power use — personas, instruction templates, LoRA swapping — with an OpenAI-compatible endpoint for other local apps

## Strengths

- The most complete knob surface in local inference: every loader, format, and sampling parameter in one place — the mechanism behind its workbench role
- Mature extension ecosystem and years of accumulated community configs for popular models

## Limitations

- Single-user by design; no batching/scheduling for concurrent load — wrong tool for serving
- Development cadence has slowed from its peak and the Gradio UI shows its age; AGPL-3.0 constrains embedding it in products

## Relation to the Arsenal

The experimentation counterpart to `ollama` (appliance) and `vllm` (server) among inference engines; the quantization trade-offs it exposes hands-on are the same ones documented in the local-model tips in [tips-and-tricks](../../tips-and-tricks/_index.md).

## Resources

- [GitHub](https://github.com/oobabooga/text-generation-webui)
- [Wiki](https://github.com/oobabooga/text-generation-webui/wiki)
