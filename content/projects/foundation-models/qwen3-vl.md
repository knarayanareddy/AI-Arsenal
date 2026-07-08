---
id: qwen3-vl
name: Qwen3-VL
version_tracked: null
artifact_type: model
category: multimodal
subcategory: open-source-models
description: Alibaba's open vision-language model family — image, video, and document understanding with strong OCR and GUI-grounding across sizes from edge to flagship
github_url: "https://github.com/QwenLM/Qwen3-VL"
license: Apache-2.0
primary_language: Python
org_or_maintainer: QwenLM (Alibaba)
tags: [multimodal, llm, agents]
maturity: production
cost_model: open-source
github_stars: 19555
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-01-30"
docs_url: "https://github.com/QwenLM/Qwen3-VL"
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [vision, language, multimodal]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained, production-proven]
ecosystem_role:
  - "The open-weights VLM to beat: the Qwen-VL lineage set the open standard for document/OCR understanding and GUI grounding (locating UI elements from instructions), which is why it powers most open computer-use and document-AI stacks — the vision-side counterpart to Qwen's dominance in open text models"
best_for:
  - "Document AI and OCR-heavy workloads — parsing scans, tables, charts, and multilingual text where the Qwen-VL family has consistently led open benchmarks"
  - "Vision-grounded agents: GUI element grounding and video understanding make it the default open model behind browser/computer-use agents that need to point at pixels"
avoid_if:
  - "Text-only workloads — the VL variants trade some pure-text quality against Qwen3 text models of equal size; use the text family unless you need vision"
  - "You need frontier-level visual reasoning with guarantees — closed models (Gemini/GPT-4o class) still lead on the hardest visual-reasoning evals; validate on your task first"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: [vllm, skyvern]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (19.6k), Apache-2.0, last push 2026-01-30 verified via the GitHub API on 2026-07-08 — the repo is the model-family cookbook/release hub; weights update on the Hub. Benchmark-leadership claims are stated as the family's track record, not per-checkpoint numbers.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/QwenLM/Qwen3-VL","date":"2026-07-08","description":"19.6k stars; Alibaba's flagship open VLM family"}
featured: false
status: active
---

## Overview

Qwen3-VL is Alibaba's open vision-language family: models from edge-deployable to flagship scale (dense and MoE variants) that handle images, multi-image inputs, video, and long documents, with signature strengths in multilingual OCR, structured-document parsing (tables/charts/formulas), and GUI grounding — returning coordinates for UI elements described in text. Weights ship under Apache-2.0 on Hugging Face/ModelScope; the repo is the family's cookbook and integration hub.

## Why it's in the Arsenal

Open multimodality has a clear leader lineage, and this is it: when open-source computer-use agents, document-AI pipelines, or VLM fine-tuning projects pick a base model, Qwen-VL is the default the way Llama once was for text. The catalog's agent entries that "see" (browser agents, GUI automation) mostly stand on exactly the grounding capability this family made openly available.

## Architecture

A vision encoder feeding a Qwen3 language backbone via a vision-language adapter, with native dynamic resolution (images processed at varying token budgets rather than fixed crops), interleaved image-text-video packing for long-context multimodal inputs, and grounding heads that emit bounding boxes/points as text tokens — the mechanism behind GUI-element localization.

## Ecosystem Position

Upstream: Qwen3 text backbones. Downstream: computer-use agents (`skyvern`-class and open computer-use stacks), document-AI pipelines, VLM fine-tunes via `ms-swift`/LLaMA-Factory. Competing: InternVL, Llama-vision variants, and closed frontier VLMs. Serving: first-class support in `vllm`, SGLang, and llama.cpp-ecosystem quantizations.

## Getting Started

```python
from transformers import AutoModelForImageTextToText, AutoProcessor
model = AutoModelForImageTextToText.from_pretrained("Qwen/Qwen3-VL-8B-Instruct", torch_dtype="auto", device_map="auto")
processor = AutoProcessor.from_pretrained("Qwen/Qwen3-VL-8B-Instruct")
# messages may mix {"type":"image"} / {"type":"video"} / {"type":"text"} content parts
```

## Key Use Cases

1. **Scenario**: production document understanding — invoices, scans, multilingual forms — where open weights are required for privacy or cost
2. **Scenario**: the perception model inside a GUI/browser agent: describe a target ("the blue submit button"), receive grounded coordinates

## Strengths

- Best-in-open document/OCR and GUI-grounding track record — capability niches with direct production demand, not leaderboard trivia
- Full size ladder under Apache-2.0 with strong serving-stack support makes deployment-tier matching easy

## Limitations

- Repo cadence is release-driven (last push 2026-01); day-to-day activity lives in Hub weights and serving integrations — track releases, not commits
- Like all open VLMs, hardest visual-reasoning tasks still favor closed frontier models; grounding quality degrades on dense/cluttered UIs

## Relation to the Arsenal

The open VLM anchor among foundation models — the perception layer for `skyvern`-class agent entries, fine-tunable via `ms-swift` (its first-party framework), served by `vllm`; complements `clip` (embedding-level vision) and `sam2` (segmentation).

## Resources

- [GitHub](https://github.com/QwenLM/Qwen3-VL)
- [Model weights](https://huggingface.co/Qwen)
