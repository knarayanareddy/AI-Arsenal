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
org_or_maintainer: "Lightricks"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: ltx-2
name: "LTX-2"
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "Lightricks' DiT-based synchronized audio-and-video foundation model, released with open weights, a Python package, LoRA training, and an API"
github_url: https://github.com/Lightricks/LTX-2
license: "Other"
primary_language: "Python"
tags:
  - "multimodal"
  - "vision"
  - "voice"
  - "streaming"
  - "training"
maturity: beta
cost_model: open-source
github_stars: 8320
last_commit: "2026-07-08"
docs_url: https://ltx.io/model/ltx-2
phase: foundation-model
domain:
  - "multimodal"
  - "vision"
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Provides a focused building block for downstream AI workflows"
best_for:
  - "Synchronized audio-video generation for creative prototypes"
  - "LoRA adaptation of audiovisual generation to a house style"
avoid_if:
  - "You need a permissive license or deterministic frame-perfect production output"
  - "Your hardware cannot support a large diffusion-transformer workload"
enrichment_notes: "The repository metadata reports NOASSERTION, normalized here to Other; the README and model distribution include gated Hugging Face weights despite open code and an API. Draft pending review."
---

## Overview

LTX-2 treats sound and moving images as one generation problem rather than adding a soundtrack after video synthesis. Its DiT foundation model is positioned for synchronized audio-video output, giving creators and multimodal researchers a single checkpoint to evaluate for timing, motion, and acoustic coherence.

## Why it's in the Arsenal

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. LTX-2 is especially useful because short synchronized audiovisual concept clips.

## Architecture

The Python package exposes inference and LoRA training around the audiovisual DiT, while hosted API access provides another deployment route. Conditioning, diffusion sampling, and synchronized audio/video decoding create a heavier pipeline than text-to-image; batching and GPU scheduling will strongly influence latency and cost.

## Ecosystem Position

LTX-2 overlaps with commercial video-generation APIs and complements image/video diffusion systems that lack native audio. Its open code and adapter training are attractive for customization, but the custom license and gated weights make it less straightforward than an Apache or MIT model for redistribution.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For LTX-2, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Short synchronized audiovisual concept clips; LoRA-tuned branded video experiments. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

Native synchronized sound, open training hooks, and both local-package and API paths make LTX-2 unusually complete for audiovisual prototyping.

## Limitations

Weights are gated and the license is custom/Other, so access and commercial-use terms need review. Audio-video sync can degrade with long clips, unusual prompts, or aggressive sampling; the headline quality should be treated as vendor-reported until evaluated on the intended duration, resolution, and content policy.

## Relation to the Arsenal

LTX-2 sits at a distinct boundary in the catalog: provides a focused building block for downstream ai workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/Lightricks/LTX-2)
- [Model site](https://ltx.io/model/ltx-2)
