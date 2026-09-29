---
id: phi-cookbook
name: Phi Cookbook
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Microsoft examples and recipes for building with the Phi model family
github_url: "https://github.com/microsoft/PhiCookBook"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [llm, inference, local, reasoning]
maturity: production
cost_model: open-source
github_stars: 3750
github_stars_last_30d: 3750
trending_score: 70
last_commit: "2026-06-09"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [org-backed, actively-maintained, community-driven]
ecosystem_role:
  - Microsoft's official companion resource of samples and guides for building with the Phi model family
best_for:
  - You're building an application on Phi-4 or other Phi models and want Microsoft's own reference implementations, fine-tuning recipes, and deployment samples rather than reverse-engineering usage patterns
  - You want a curated, actively-maintained (2026 commit activity confirmed) collection of Phi usage patterns across multiple frameworks and deployment targets
avoid_if:
  - You're looking for the model weights themselves rather than usage guidance — this is a cookbook/samples repository, not the Phi-4 model repository
  - You need cookbook-style guidance for a different model family — this repo is Phi-specific and won't transfer directly to Llama, Qwen, or Gemma tooling patterns
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub Actions workflow activity confirmed as recently as January 2026 (PR #454, microsoft/PhiCookBook), and the repo is directly linked from Microsoft's own Phi-4 Hugging Face model card as the recommended fine-tuning cookbook, confirming both recency and official-status as a companion resource rather than an unofficial community fork."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Microsoft's official collection of samples, tutorials, and deployment recipes for building applications with the Phi model family, maintained alongside the model releases themselves.

## Why it's in the Arsenal

Phi Cookbook is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Not a model architecture itself — a curated repository of Jupyter notebooks, sample code, and guides covering fine-tuning, quantization, and deployment patterns across multiple frameworks (Hugging Face Transformers, ONNX Runtime, Ollama) for the Phi model family.

## Ecosystem Position

Upstream: depends entirely on the Phi model family (phi-4 and predecessors) as its subject matter. Downstream: none — it is a leaf reference resource, not a dependency of other projects. Competing: informal community tutorials and blog posts covering Phi usage; this repo's advantage is being the vendor-official, kept-current version. Complementary: pairs directly with the phi-4 entry in this catalog.

## Getting Started

```bash
# PhiCookBook is a samples/recipes repo, not a model — clone it and open the notebooks (see Resources).
git clone https://github.com/microsoft/PhiCookBook
# then follow the fine-tuning, quantization, and deployment notebooks for the Phi model family
```

## Key Use Cases

1. **Taking the dependency**: the weights for Phi Cookbook are the small part — the commitment is context behaviour, licensing and hosting, and those three decide whether the checkpoint is usable in your product at all.
2. **What dominates the decision**: `building`, `application`, `phi-4`, `models` are the variables that actually move the outcome for Phi Cookbook in this phase, and none of them appear in a feature comparison.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- What Phi Cookbook gives you that reading the feature list does not: not a model architecture itself — a curated repository of Jupyter notebooks, sample code, and guides covering fine-tuning, quantization, and deployment patterns across multiple frameworks (Hugging Face Transformers, ONNX Runtime, Ollama) for the Phi model family, which is the part you have to evaluate against your own workload.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Phi Cookbook footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running Phi Cookbook against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside Phi Cookbook here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

As a foundation-model entry this catalogs a companion resource rather than weights: it points at Microsoft's official Phi build recipes. Pair it with the phi-4 model entry; for actually serving Phi models see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/microsoft/PhiCookBook)
- [Documentation](https://github.com/microsoft/PhiCookBook)
