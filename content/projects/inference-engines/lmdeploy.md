---
id: lmdeploy
name: LMDeploy
version_tracked: null
artifact_type: platform
category: llms
subcategory: inference-engines
description: Toolkit for compressing, deploying, and serving LLMs with TurboMind and PyTorch backends
github_url: https://github.com/InternLM/lmdeploy
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - quantization
  - cloud
maturity: production
cost_model: open-source
github_stars: 7965
github_stars_last_30d: 70
trending_score: 21
last_commit: '2026-07-20'
docs_url: https://lmdeploy.readthedocs.io/en/latest/
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats:
  - HF
  - AWQ
  - W4A16
api_compatible: openai
phase: inference-engine
domain:
  - language
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - InternLM's (Shanghai AI Lab) inference and serving toolkit, with particular strength serving InternLM and other Chinese-origin open-weight models
best_for:
  - You're deploying InternLM models specifically and want the toolkit built and optimized by the same organization
  - You need a serving toolkit with strong quantization support (AWQ, W4A16) integrated directly into the deployment pipeline
avoid_if:
  - You need the largest community and broadest model-family support — vLLM and SGLang have substantially larger adoption and community integration coverage across model families
  - You want the most actively-innovating serving engine for cutting-edge model architectures — LMDeploy's development pace and community size are smaller than vLLM/SGLang's
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production evidence found beyond the project's own documentation and its association with InternLM's model releases; architecture claims are based on the public repository structure.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An inference and serving toolkit from Shanghai AI Laboratory (InternLM's developing organization), providing optimized deployment for InternLM and other open-weight model families with a particular focus on quantization.

## Why it's in the Arsenal

InternLM's (Shanghai AI Lab) inference and serving toolkit, with particular strength serving InternLM and other Chinese-origin open-weight models. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're deploying InternLM models specifically and want the toolkit built and optimized by the same organization. See Strengths / Limitations below before adopting it.

## Architecture

Provides both a Python inference engine and a serving component with support for continuous batching, tensor parallelism, and quantization formats (AWQ, W4A16) targeting efficient multi-GPU deployment.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note. Competing: vLLM, SGLang, TGI (in maintenance mode) — LMDeploy occupies a similar niche with a smaller community than the two leading options. Complementary: primarily used to serve InternLM models, though it supports other open-weight families.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/run command for this specific inference engine.
```

## Key Use Cases

1. **Scenario**: you're deploying InternLM models specifically and want the toolkit built and optimized by the same organization
2. **Scenario**: you need a serving toolkit with strong quantization support (AWQ, W4A16) integrated directly into the deployment pipeline

## Strengths

- You're deploying InternLM models specifically and want the toolkit built and optimized by the same organization
- You need a serving toolkit with strong quantization support (AWQ, W4A16) integrated directly into the deployment pipeline

## Limitations

- You need the largest community and broadest model-family support — vLLM and SGLang have substantially larger adoption and community integration coverage across model families
- You want the most actively-innovating serving engine for cutting-edge model architectures — LMDeploy's development pace and community size are smaller than vLLM/SGLang's

_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/InternLM/lmdeploy)
- [Documentation](https://lmdeploy.readthedocs.io/en/latest/)
