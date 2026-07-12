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
org_or_maintainer: "index-tts"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: index-tts
name: "IndexTTS"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "An industrial-grade controllable zero-shot text-to-speech system from Bilibili, designed for efficient"
github_url: https://github.com/index-tts/index-tts
license: "NOASSERTION"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "self-hosted"
  - "llm"
  - "streaming"
maturity: beta
cost_model: open-source
github_stars: 21803
last_commit: "2026-07-08"
docs_url: https://github.com/index-tts/index-tts
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A production-oriented zero-shot TTS system emphasizing stability, efficiency, and character-level pronunciation control for CJK and English."
best_for:
  - "You need stable, efficient zero-shot cloning tuned for Chinese and English with explicit pinyin/pronunciation correction"
  - "You want an industry-backed open TTS system aimed at deployment rather than a pure research demo"
avoid_if:
  - "You cannot verify the repository's non-standard license terms for commercial use"
  - "You need broad coverage of many non-CJK languages, where multilingual-first models fit better"
enrichment_notes: "Repository and 2026-07-08 activity verified via the GitHub API on 2026-07-12. License metadata is NOASSERTION; confirm terms before adoption. Efficiency claims are project-reported."
---

## Overview

IndexTTS is a zero-shot text-to-speech system developed within Bilibili that emphasizes industrial reliability: stable synthesis, efficient inference, and controllable pronunciation. A distinctive feature is character- and pinyin-level control, which lets users correct the model's pronunciation of specific tokens, a common pain point for Chinese-English mixed content.

## Why it's in the Arsenal

It represents a deployment-minded open TTS system from a large media company rather than a research artifact, and its explicit pronunciation-correction control solves a real production problem, making it a distinct and practical entry.

## Architecture

IndexTTS builds on a neural codec plus language-model TTS pipeline with a GPT-style token predictor conditioned on a reference speaker for zero-shot cloning. It adds a controllable front end that accepts pinyin and character-level hints so operators can override the model's default pronunciation, and later versions focus on latency and stability improvements for serving.

## Ecosystem Position

It competes with fish-speech and XTTS on open zero-shot cloning but differentiates on production stability and CJK pronunciation control. Compared with hosted APIs it offers self-hostability, and unlike research-first models it prioritizes predictable behavior over novelty, positioning it alongside other industry-backed speech stacks rather than pure academic releases.

## Getting Started

Clone the repository, download the released checkpoints, and run inference through the provided scripts or WebUI with input text and a reference clip; pronunciation overrides are supplied via pinyin annotations in the text.

## Key Use Cases

Chinese/English media narration and dubbing; virtual presenters and streamers; voice for interactive products where pronunciation must be exact; self-hosted zero-shot cloning.

## Strengths

Production focus, efficient and stable inference, precise pronunciation control, strong CJK support, active maintenance, and organizational backing.

## Limitations

The license is reported as NOASSERTION and must be reviewed for commercial use; language strength is centered on Chinese and English; documentation is partly in Chinese; and reported efficiency numbers are not independently benchmarked here.

## Relation to the Arsenal

It adds a deployment-oriented voice-audio model to the catalog and cross-links to serving and latency guidance.

## Resources

- [GitHub repository](https://github.com/index-tts/index-tts)
