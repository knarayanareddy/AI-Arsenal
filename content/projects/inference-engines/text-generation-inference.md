---
id: text-generation-inference
name: Text Generation Inference
version_tracked: null
artifact_type: platform
category: llms
subcategory: inference-engines
description: Hugging Face inference server for serving large text-generation models in production
github_url: "https://github.com/huggingface/text-generation-inference"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [llm, inference, streaming, batching]
maturity: production
cost_model: open-source
github_stars: 10863
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-03-21"
docs_url: "https://huggingface.co/docs/text-generation-inference"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats: [HF, GPTQ, AWQ]
api_compatible: openai
phase: inference-engine
domain: [language]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed, community-driven]
ecosystem_role:
  - Hugging Face's original production LLM serving toolkit, now in maintenance mode as HF redirects investment to vLLM and SGLang
best_for:
  - You have an existing production deployment on TGI and need to maintain it — it remains functional and receives critical bug fixes
  - You specifically need a documented long-prompt handling advantage TGI's V3 overview describes, and have already validated it against vLLM/SGLang for your workload
avoid_if:
  - You're starting a new production serving deployment — Hugging Face officially placed TGI into maintenance mode as of December 11, 2025, accepting only minor bug fixes and documentation updates, and now directs new work toward vLLM, SGLang, llama.cpp, and MLX
  - You need ongoing feature development, new model architecture support, or active performance optimization — none of that is happening in TGI going forward per Hugging Face's own documentation
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Directly confirmed via Hugging Face's own official documentation (huggingface.co/docs/inference-endpoints/en/engines/tgi): 'Text Generation Inference is in maintenance mode as of 12/11/2025... only pull requests for minor bug fixes, documentation improvements, and lightweight maintenance tasks will be accepted.' This is a primary-source status confirmation, not third-party inference."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"hackernews","url":"https://huggingface.co/docs/inference-endpoints/en/engines/tgi","date":"2025-12-11","description":"Hugging Face's own documentation confirms TGI entered maintenance mode on 12/11/2025, redirecting new inference-engine investment to vLLM, SGLang, llama.cpp, and MLX"}
featured: false
status: archived
---

## Overview

Hugging Face's original toolkit for serving large language models in production, offering continuous batching and tensor-parallel serving, now placed in maintenance mode as Hugging Face redirects its inference-engine investment elsewhere.

## Why it's in the Arsenal

Hugging Face's original production LLM serving toolkit, now in maintenance mode as HF redirects investment to vLLM and SGLang. It earns a place in the Arsenal because it directly addresses a recurring decision point: you have an existing production deployment on TGI and need to maintain it — it remains functional and receives critical bug fixes. See Strengths / Limitations below before adopting it.

## Architecture

A Rust-and-Python serving stack implementing continuous batching, tensor parallelism, and quantization support for production LLM deployment, historically notable for strong long-prompt/long-context handling performance documented in its V3 architecture overview.

## Ecosystem Position

Upstream: integrates with Hugging Face Transformers and the Hugging Face Hub for model loading. Downstream: powers (or historically powered) Hugging Face's own Inference Endpoints product. Competing: vLLM and SGLang, both of which Hugging Face has explicitly stated it is now investing in instead. Superseded by: vLLM and SGLang as Hugging Face's own recommended path per their December 2025 maintenance-mode announcement.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/run command for this specific inference engine.
```

## Key Use Cases

1. **Scenario**: you have an existing production deployment on TGI and need to maintain it — it remains functional and receives critical bug fixes
2. **Scenario**: you specifically need a documented long-prompt handling advantage TGI's V3 overview describes, and have already validated it against vLLM/SGLang for your workload

## Strengths

- You have an existing production deployment on TGI and need to maintain it — it remains functional and receives critical bug fixes
- You specifically need a documented long-prompt handling advantage TGI's V3 overview describes, and have already validated it against vLLM/SGLang for your workload

## Limitations

- You're starting a new production serving deployment — Hugging Face officially placed TGI into maintenance mode as of December 11, 2025, accepting only minor bug fixes and documentation updates, and now directs new work toward vLLM, SGLang, llama.cpp, and MLX
- You need ongoing feature development, new model architecture support, or active performance optimization — none of that is happening in TGI going forward per Hugging Face's own documentation

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/huggingface/text-generation-inference)
- [Documentation](https://huggingface.co/docs/text-generation-inference)
