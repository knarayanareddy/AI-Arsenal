---
id: command-r-plus
name: Command R+
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Cohere model family oriented toward enterprise RAG, tool use, and multilingual workflows
github_url: "https://huggingface.co/CohereForAI/c4ai-command-r-plus"
license: Custom
primary_language: Other
org_or_maintainer: null
tags: [llm, rag, tool-use, multimodal]
maturity: production
cost_model: open-source
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-06-13"
docs_url: "https://docs.cohere.com/"
demo_url: null
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/CohereForAI/c4ai-command-r-plus"
model_sizes: [104B]
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed]
ecosystem_role:
  - Enterprise RAG- and tool-use-optimized chat model, positioned as Cohere's mid-tier open-weight offering
best_for:
  - You need an open-weight model specifically tuned for RAG with citation grounding and multi-step tool use
  - You're building enterprise multilingual applications and want a model with strong retrieval-augmented behavior out of the box
avoid_if:
  - You need Cohere's current flagship — as of mid-2026 Cohere has moved on to Command A and the newer Command A+ (May 2026), which supersede Command R+ on most benchmarks and throughput
  - You need a permissively licensed model for unrestricted commercial redistribution — Command R+ ships under Cohere's custom, non-Apache/MIT license (CC-BY-NC for research use; commercial use requires a separate agreement)
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Cohere's own docs (Sept 2025 deprecation notice) confirm command-r/command-r-plus were deprecated for new customers effective Sept 15 2025 and are being phased toward Command A / Command A+; existing users can continue on command-r-plus-08-2024 but it is legacy, not current flagship. Architecture: 104B dense transformer, 128K context, tool-use and RAG-focused post-training per Cohere's model card."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

A 104-billion-parameter dense transformer chat model from Cohere, released in 2024 and explicitly optimized for retrieval-augmented generation with inline citations, multi-step tool use, and multilingual enterprise workloads across 10 languages.

## Why it's in the Arsenal

Enterprise RAG- and tool-use-optimized chat model, positioned as Cohere's mid-tier open-weight offering. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need an open-weight model specifically tuned for RAG with citation grounding and multi-step tool use. See Strengths / Limitations below before adopting it.

## Architecture

Command R+ is a dense (non-MoE) decoder-only transformer with a 128K token context window. Its distinguishing design choice versus a generic chat model is post-training specifically shaped around RAG: the model is trained to consume retrieved documents and produce grounded responses with inline citations, and to plan and execute multi-step tool-calling sequences rather than single-shot function calls.

## Ecosystem Position

Upstream: none of note (weights are the artifact). Downstream: served through Cohere's own API and via community integrations in LangChain, LlamaIndex, and Hugging Face Transformers. Competing: Llama 3 70B, Qwen 2.5 72B, and Mistral's dense models on general chat; more narrowly, Command A and Command A+ are Cohere's own successors that have superseded it as of 2026. Complementary: pairs with Cohere's Embed and Rerank models in the same retrieval stack it was designed for.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Replace with the specific model checkpoint for this family (see Resources).
pipe = pipeline("text-generation", model="<org>/<model-checkpoint>")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Scenario**: you need an open-weight model specifically tuned for RAG with citation grounding and multi-step tool use
2. **Scenario**: you're building enterprise multilingual applications and want a model with strong retrieval-augmented behavior out of the box

## Strengths

- You need an open-weight model specifically tuned for RAG with citation grounding and multi-step tool use
- You're building enterprise multilingual applications and want a model with strong retrieval-augmented behavior out of the box

## Limitations

- You need Cohere's current flagship — as of mid-2026 Cohere has moved on to Command A and the newer Command A+ (May 2026), which supersede Command R+ on most benchmarks and throughput
- You need a permissively licensed model for unrestricted commercial redistribution — Command R+ ships under Cohere's custom, non-Apache/MIT license (CC-BY-NC for research use; commercial use requires a separate agreement)

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://huggingface.co/CohereForAI/c4ai-command-r-plus)
- [Documentation](https://docs.cohere.com/)
