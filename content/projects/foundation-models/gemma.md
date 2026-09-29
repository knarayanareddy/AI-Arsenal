---
id: gemma
name: Gemma
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Google open model family designed for efficient language and multimodal applications
github_url: "https://github.com/google-deepmind/gemma"
license: Custom
primary_language: Python
org_or_maintainer: null
tags: [llm, inference, multimodal, local]
maturity: production
cost_model: open-source
github_stars: 5410
github_stars_last_30d: 5410
trending_score: 70
last_commit: "2026-06-12"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language, multimodal]
relation_to_stack: [deploy-as-is, build-on-top, study-and-reference]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - Google DeepMind's first-generation open-weight small model family (Gemma 1/2)
best_for:
  - You specifically need the original Gemma 1/2 generation for compatibility with existing pipelines or comparative research
  - You want Google's smallest, most local-deployment-friendly open-weight models rather than the larger, newer Gemma 3/4 variants
avoid_if:
  - You're starting a new project — Gemma 3 (and now Gemma 4, released April 2026) supersede this generation with longer context, multimodal input, and better benchmarks at the same or smaller sizes
  - You need the efficient long-context architecture (interleaved local/global attention) that only shipped starting with Gemma 3
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Gemma 4 launched publicly in April 2026 per GitHub issue activity on google-deepmind/gemma referencing 'the April 2026 launch of Gemma 4'; this entry is kept as the original Gemma 1/2 generation, distinct from gemma-3 and the newer, not-yet-catalogued Gemma 4.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The first generation of Google DeepMind's open-weight small language model family (Gemma 1/2), released in 2024 as dense decoder-only transformer checkpoints and positioned as a lighter-weight, locally-deployable counterpart to the closed Gemini models. It shipped in 2B/7B (Gemma 1) and 2B/9B/27B (Gemma 2) sizes under a custom license.

## Why it's in the Arsenal

The case for Gemma rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

A dense decoder-only transformer built from the same research lineage as Gemini, released in 2B/7B (Gemma 1) and later 2B/9B/27B (Gemma 2) sizes, without the interleaved local/global sliding-window attention mechanism introduced later in Gemma 3.

## Ecosystem Position

Upstream: shares research lineage with Google's Gemini models. Downstream: broad support across Ollama, llama.cpp, vLLM, and Hugging Face Transformers. It competes with Llama 3, Mistral 7B, and Qwen models at comparable sizes; compared to them, Gemma's niche was small, local-friendly Google models. Superseded by: Gemma 3 (longer context, multimodal, more efficient attention) and, as of April 2026, Gemma 4.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Gemma checkpoints are published under the google org on Hugging Face (gated; see Resources).
generate = pipeline("text-generation", model="google/gemma-2-9b-it")
print(generate("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through Gemma, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What to measure first**: `specifically`, `original`, `gemma`, `generation` decide whether Gemma works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- What Gemma gives you that reading the feature list does not: a dense decoder-only transformer built from the same research lineage as Gemini, released in 2B/7B (Gemma 1) and later 2B/9B/27B (Gemma 2) sizes, without the interleaved local/global sliding-window attention mechanism introduced later in Gemma 3, which is the part you have to evaluate against your own workload.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Gemma footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for Gemma at your scale need measuring before this informs a production decision.
- No alternative is catalogued alongside Gemma here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

As a foundation-model entry this documents the original Gemma 1/2 weights and positioning, not serving. These small dense checkpoints suit local deployment — pair them with an inference stack from [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); for new work prefer Gemma 3/4.

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Documentation](https://github.com/google-deepmind/gemma)
