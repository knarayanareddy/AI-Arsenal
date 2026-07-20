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
org_or_maintainer: waybarrios
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
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: vllm-mlx
name: vLLM-MLX
artifact_type: tool
category: llms
subcategory: inference-engines
description: MLX-backed OpenAI- and Anthropic-compatible local inference server for Apple Silicon with batching, vision, and MCP tool calling
github_url: https://github.com/waybarrios/vllm-mlx
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - inference
  - batching
  - multimodal
  - local
maturity: alpha
cost_model: open-source
github_stars: 1446
last_commit: '2026-06-28'
docs_url: https://github.com/waybarrios/vllm-mlx
phase: inference-engine
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - community-driven
  - experimental
ecosystem_role:
  - Apple-Silicon alternative to CUDA-centric vLLM deployments, complementing MLX and local coding-agent clients
best_for:
  - Serving Llama or Qwen models behind an OpenAI-compatible local endpoint
  - Testing multimodal and MCP-enabled agents on an Apple Silicon workstation
avoid_if:
  - You need NVIDIA production clusters or broad CUDA model compatibility
  - You require a long-established serving API with extensive conformance testing
enrichment_notes: Young community project; Apple-only scope and 400+ tokens/sec claim are repository-reported. Draft pending review.
---

## Overview

vLLM-MLX adapts the familiar model-server experience to Apple Silicon by using MLX rather than CUDA. It exposes OpenAI- and Anthropic-compatible endpoints, continuous batching, vision-language inputs, MCP tool calling, and metrics, making a Mac a useful local stand-in for agent clients that normally target a GPU server.

## Why it's in the Arsenal

It earns a slot by addressing a real hardware gap: developers with Apple Silicon can exercise OpenAI-compatible agent and multimodal clients without translating their code to a bespoke desktop runner. The project is Apache-2.0 and includes serving features beyond a one-request demo.

## Architecture

The server loads MLX models and manages an HTTP API with continuous batching, chat/completions, image inputs, reranking, MCP tool calls, and Prometheus-style metrics. Its compatibility layer lets Claude Code or OpenAI SDK clients target localhost, while the MLX backend handles Apple GPU execution and memory management.

## Ecosystem Position

vLLM-MLX competes with MLX-native runners and complements Apple Silicon tools such as MLX-LM and MLX-VLM. It is an alternative to CUDA vLLM for local development, not a drop-in replacement for vLLM's cluster-scale scheduler or model coverage.

## Getting Started

Install the package from the repository or PyPI as documented, choose a supported MLX model, and start the server with the provided CLI. Point an OpenAI-compatible client at `http://localhost:8000/v1`, then verify batching, multimodal input, or MCP configuration with the README examples.

## Key Use Cases

Use it for local coding assistants, multimodal prompt experiments, MCP tool clients, and API-compatible development before deploying to CUDA infrastructure. It is also useful for measuring how an agent behaves when the model remains on a developer's Mac.

## Strengths

The API compatibility, continuous batching, multimodal support, and MCP integration make it more capable than a simple MLX command-line wrapper. A native MLX path also avoids requiring a CUDA machine for local iteration.

## Limitations

Apple Silicon is mandatory, and the project is young compared with mainstream serving engines. The README's 400+ tokens/sec claim depends on model, prompt, generation length, and Apple hardware; model support and API edge cases need independent testing.

## Relation to the Arsenal

It complements the Arsenal's inference-engine entries and local agent tools while competing with Ollama and llama.cpp-style Mac runners. Its niche is API-compatible MLX serving, not general cloud inference orchestration.

## Resources

- [GitHub](https://github.com/waybarrios/vllm-mlx)
