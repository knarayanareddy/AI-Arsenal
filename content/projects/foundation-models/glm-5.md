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
org_or_maintainer: zai-org
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 16
trending_score: 31
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: glm-5
name: GLM-5
artifact_type: model
category: llms
subcategory: open-source-models
description: Z.ai's open-weight GLM-5 series for long-horizon agentic coding, with 1M-token context and sparse-attention IndexShare
github_url: https://github.com/zai-org/GLM-5
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - reasoning
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 6680
last_commit: '2026-07-15'
docs_url: https://docs.z.ai/guides/llm/glm-5.2
phase: foundation-model
domain:
  - language
  - reasoning
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Competes with open-weight coding LLMs (Qwen3, DeepSeek) and closed frontier models on agentic-engineering benchmarks
best_for:
  - Long-horizon agentic coding tasks that run for hundreds of tool-calling rounds
  - Self-hosting an open-weight frontier-class model with 1M-token context
avoid_if:
  - You need small on-device models — this is a large flagship series
  - Your workload is simple single-turn chat where a smaller model is cheaper
enrichment_notes: Verified via GitHub API + README; benchmark claims (SWE-bench Pro, Terminal-Bench) vendor-reported. Draft pending review.
---

## Overview

GLM-5 is Z.ai's (Zhipu) open-weight flagship large-language-model line, with GLM-5, GLM-5.1, and the latest GLM-5.2 releases sharing one repository. The series is explicitly built for long-horizon agentic engineering — sustaining productive work across hundreds of reasoning rounds and thousands of tool calls rather than plateauing after a quick first pass — and GLM-5.2 adds a solid 1M-token context window and flexible thinking-effort levels for coding.

## Why it's in the Arsenal

It is one of the strongest open-weight coding-and-agent model families, released under Apache-2.0 with a technical report, and it is directly relevant to engineers building autonomous coding agents who want to self-host rather than depend on a closed API.

## Architecture

GLM-5.2 introduces IndexShare, a sparse-attention scheme that reuses the same indexer across every four sparse-attention layers, which the authors report cuts per-token FLOPs by 2.9x at 1M-token context. It also improves the multi-token-prediction (MTP) layer to raise speculative-decoding acceptance length by up to 20%. The models are distributed as open weights with an API on the Z.ai platform.

## Ecosystem Position

GLM-5 competes directly with other open-weight coding LLMs such as the Qwen3 and DeepSeek families and, on agentic benchmarks, aims to close the gap to closed frontier models like Claude Opus and Gemini Pro. It is complementary to inference engines (vLLM, SGLang) that serve it and to agent harnesses that drive it; the weights are an upstream dependency for anyone building on top.

## Getting Started

Read the GLM-5.2 blog and GLM-5 technical report, pull weights from Hugging Face / ModelScope, and serve with a compatible inference engine, or call the hosted API on the Z.ai platform. Coding effort levels are selectable to trade latency for quality.

## Key Use Cases

Autonomous coding agents; repository-scale code generation (NL2Repo); terminal-task agents; long-context document and codebase reasoning.

## Strengths

Open Apache-2.0 weights, 1M-token context, strong reported agentic-coding benchmarks, an efficiency-oriented sparse-attention design, and active multi-version maintenance.

## Limitations

It is a large flagship series with substantial serving requirements — not suited to on-device or tight-latency budgets, and the headline SWE-bench Pro / Terminal-Bench numbers are vendor-reported and should be revalidated on your own tasks. Sparse-attention IndexShare benefits depend on serving-stack support.

## Relation to the Arsenal

An upstream model dependency for the agent-system and coding-agent entries, and a peer to the other open-weight LLM foundation-model entries in the catalog.

## Resources

- [GitHub](https://github.com/zai-org/GLM-5)
- [GLM-5.2 blog](https://z.ai/blog/glm-5.2)
- [API docs](https://docs.z.ai/guides/llm/glm-5.2)
