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

The case for Command R+ rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

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

# Command R+ weights are on Hugging Face under CohereForAI (non-commercial license; see Resources).
generate = pipeline("text-generation", model="CohereForAI/c4ai-command-r-plus")
print(generate("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of Command R+ is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What to measure first**: `open-weight`, `model`, `specifically`, `tuned` decide whether Command R+ works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- Beyond the headline description, Command R+'s architecture section is the honest source: command R+ is a dense (non-MoE) decoder-only transformer with a 128K token context window. Its distinguishing design choice versus a generic chat model is post-training specifically shaped around RAG: the model is trained to consume retrieved documents and produce grounded responses with inline citations, and to plan and execute multi-step tool-calling sequences rather than single-shot function calls.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for Command R+ is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running Command R+ against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside Command R+ here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

As a foundation-model entry this documents the Command R+ weights and its RAG/tool-use post-training, not serving. It is designed to pair with Cohere's Embed and Rerank models in a retrieval stack — for the runtime side see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); note the non-commercial license.

## Resources

- [GitHub](https://huggingface.co/CohereForAI/c4ai-command-r-plus)
- [Documentation](https://docs.cohere.com/)
