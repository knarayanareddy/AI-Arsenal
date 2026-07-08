---
title: "Foundation Models"
section: "projects/foundation-models"
auto_generated: false
---

# Foundation Models

## What belongs here

Open-weight LLMs, embedding models, multimodal models, and speech models — the weights themselves plus their official training/inference reference code.

## What does NOT belong here

Runtimes that serve these weights (llama.cpp, vLLM, Ollama) belong in [Inference Engines](../inference-engines/_index.md); frameworks you build agent or RAG applications on top of belong in [Frameworks](../frameworks/_index.md).

## Relation to the Tools vertical

Foundation-model entries document the model itself — its architecture, training approach, and position in the model ecosystem — not how to operate it in production. Several models here also have a corresponding entry under `content/tools/model-layer/` for hosted/managed access; check each entry's `corresponding_tool_entry` field.

## Decision guidance

Before selecting a foundation model:
- Key question to ask: does this model's architecture, license, and current-generation status (not a superseded predecessor) actually fit my constraints?
- If you need usage guidance rather than architectural depth: see [tools/model-layer/](../../tools/model-layer/_index.md) and [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md)
- See [Choose an LLM](../../architectures/decision-trees/choose-llm.md) for cross-cutting selection guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Foundation Models in This Phase

### Recently Added

- [GLM-4 / GLM-4.5](./glm-4.md)
- [Kimi K2](./kimi-k2.md)
- [OLMo](./olmo.md)
- [SAM 2 (Segment Anything Model 2)](./sam2.md)
- [Whisper](./whisper.md)
- [TranslateGemma](./translategemma.md)
- [Command R+](./command-r-plus.md)
- [DeepSeek-V3 / R1](./deepseek-v3-r1.md)
- [Falcon 3](./falcon-3.md)
- [Gemma](./gemma.md)

### Most Popular

- [Whisper](./whisper.md) — ⭐ 104543
- [DeepSeek-V3 / R1](./deepseek-v3-r1.md) — ⭐ 103749
- [Qwen 2.5 / QwQ](./qwen-2-5.md) — ⭐ 27298
- [Qwen](./qwen.md) — ⭐ 21281
- [SAM 2 (Segment Anything Model 2)](./sam2.md) — ⭐ 19492
- [Kimi K2](./kimi-k2.md) — ⭐ 10889
- [Mistral / Mixtral](./mistral-models.md) — ⭐ 10816
- [Llama 3.x](./llama-3.md) — ⭐ 9242
- [Yi](./yi.md) — ⭐ 7820
- [OLMo](./olmo.md) — ⭐ 6574

### Browse All

- [Command R+](./command-r-plus.md) — Cohere model family oriented toward enterprise RAG, tool use, and multilingual workflows
- [DeepSeek-V3 / R1](./deepseek-v3-r1.md) — DeepSeek open-weight MoE and reasoning model family known for strong cost-performance
- [Falcon 3](./falcon-3.md) — TII open model family with compact 1B to 10B text-only variants for local deployment
- [Gemma](./gemma.md) — Google open model family designed for efficient language and multimodal applications
- [Gemma 3](./gemma-3.md) — Google open model family with efficient text and multimodal variants for local and hosted use
- [GLM-4 / GLM-4.5](./glm-4.md) — Zhipu AI's open-weights model family unifying reasoning, coding, and agentic capability, with MoE flagships and strong small dense variants
- [Kimi K2](./kimi-k2.md) — Moonshot AI's trillion-parameter open-weights MoE model optimized for agentic tool use and coding, with 32B active parameters
- [Llama 3.x](./llama-3.md) — Meta open-weight Llama 3 family for general, multilingual, code, and multimodal applications
- [Mistral / Mixtral](./mistral-models.md) — Mistral open-weight model family including dense and mixture-of-experts language models
- [OLMo](./olmo.md) — AI2's fully-open language model family: weights, training data, code, and checkpoints all released — the reference for reproducible LLM science
- [Phi-4](./phi-4.md) — Microsoft small language model family optimized for efficient reasoning and local-friendly deployment
- [Phi Cookbook](./phi-cookbook.md) — Microsoft examples and recipes for building with the Phi model family
- [Qwen](./qwen.md) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- [Qwen 2.5 / QwQ](./qwen-2-5.md) — Alibaba Qwen open-weight family spanning small, large, coding, math, and reasoning models
- [SAM 2 (Segment Anything Model 2)](./sam2.md) — Meta's promptable segmentation foundation model unified across images and video — click/box prompts yield masks tracked through time via streaming memory
- [TranslateGemma](./translategemma.md) — Open translation model family built on Gemma 3 supporting 55 languages efficiently
- [Whisper](./whisper.md) — OpenAI's open-source speech recognition model: robust multilingual transcription and translation trained on 680k hours of audio
- [Yi](./yi.md) — 01.AI open model family with bilingual and long-context variants from small to mid-large sizes
