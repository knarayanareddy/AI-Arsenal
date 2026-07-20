---
id: gemma-3
name: Gemma 3
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Google open model family with efficient text and multimodal variants for local and hosted use
github_url: https://github.com/google-deepmind/gemma
license: Custom
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - multimodal
  - local
maturity: production
cost_model: open-source
github_stars: 5574
github_stars_last_30d: 164
trending_score: 28
last_commit: '2026-07-17'
docs_url: https://ai.google.dev/gemma
demo_url: null
paper_url: null
paper_id: null
hf_url: https://huggingface.co/google
model_sizes:
  - 1B
  - 4B
  - 12B
  - 27B
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain:
  - language
  - vision
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
  - production-proven
ecosystem_role:
  - Google DeepMind's third-generation open-weight model family with efficient long-context multimodal support
best_for:
  - You need a 128K-context multimodal (text+image) open-weight model that runs efficiently on constrained hardware, thanks to its interleaved local/global attention design
  - You want Google's current-generation open-weight family across a wide size range (1B-27B) for anything from edge deployment to strong general-purpose serving
avoid_if:
  - You need the absolute latest Google open-weight generation — Gemma 4 launched in April 2026 and is the newer architecture; evaluate whether its improvements matter for your use case before defaulting to Gemma 3
  - You need audio or video understanding — Gemma 3's multimodal support is text+image only, not full omni-modal input
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Architecture details (5:1 local:global sliding-window attention interleaving, 128K context except 1B model at 32K, GQA with QK-norm, RoPE base frequency split between local/global layers) are drawn directly from the Gemma 3 Technical Report (arXiv 2503.19786) and corroborated by independent technical write-ups, not vendor marketing copy.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: conference
    url: https://infohub.delltechnologies.com/en-us/p/from-lab-to-production-running-gemma-3-using-dell-enterprise-hub-on-openshift/
    date: '2026-04-01'
    description: Dell Technologies documents production deployment of Gemma 3 12B/27B on PowerEdge XE9680 servers via Dell Enterprise Hub on OpenShift
featured: false
status: active
---

## Overview

Google DeepMind's third-generation open-weight model family, released in 2025, adding multimodal (text+image) input and a long 128K-token context window across model sizes from 1B to 27B parameters.

## Why it's in the Arsenal

Google DeepMind's third-generation open-weight model family with efficient long-context multimodal support. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need a 128K-context multimodal (text+image) open-weight model that runs efficiently on constrained hardware, thanks to its interleaved local/global attention design. See Strengths / Limitations below before adopting it.

## Architecture

A dense decoder-only transformer using Grouped-Query Attention with QK-norm (replacing Gemma 2's soft-capping), and a distinguishing 5:1 interleaving of local sliding-window attention layers (1024-token span) to global attention layers. Only the global layers (1/6 of total) need to retain KV cache for the full 128K context, which is the specific architectural mechanism that keeps long-context inference memory-feasible on constrained hardware. RoPE base frequency is 1M on global layers and 10K on local layers.

## Ecosystem Position

Upstream: built on the Gemma 1/2 architecture lineage and Gemini research. Downstream: day-one support in Ollama, llama.cpp, vLLM, and Hugging Face Transformers; TranslateGemma is a fine-tuned derivative built specifically on Gemma 3. Competing: Llama 3/4, Qwen 2.5/3, Mistral Small/Ministral at comparable sizes. Superseded by: Gemma 4 (April 2026 release).

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

1. **Scenario**: you need a 128K-context multimodal (text+image) open-weight model that runs efficiently on constrained hardware, thanks to its interleaved local/global attention design
2. **Scenario**: you want Google's current-generation open-weight family across a wide size range (1B-27B) for anything from edge deployment to strong general-purpose serving

## Strengths

- You need a 128K-context multimodal (text+image) open-weight model that runs efficiently on constrained hardware, thanks to its interleaved local/global attention design
- You want Google's current-generation open-weight family across a wide size range (1B-27B) for anything from edge deployment to strong general-purpose serving

## Limitations

- You need the absolute latest Google open-weight generation — Gemma 4 launched in April 2026 and is the newer architecture; evaluate whether its improvements matter for your use case before defaulting to Gemma 3
- You need audio or video understanding — Gemma 3's multimodal support is text+image only, not full omni-modal input

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Documentation](https://ai.google.dev/gemma)
