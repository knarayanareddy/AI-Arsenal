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
org_or_maintainer: "openai"
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
id: gpt-oss
name: "gpt-oss"
artifact_type: model
category: llms
subcategory: open-source-models
description: "OpenAI open-weight language models for reasoning, agentic tasks, and developer applications"
github_url: https://github.com/openai/gpt-oss
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "llm"
  - "reasoning"
  - "tool-use"
  - "structured-output"
  - "foundational"
maturity: beta
cost_model: open-source
github_stars: 20237
last_commit: "2026-06-09"
docs_url: https://gpt-oss.com
phase: foundation-model
domain:
  - "language"
  - "reasoning"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Open-weight reasoning models that compete with hosted frontier APIs while complementing local inference engines"
best_for:
  - "Self-hosted reasoning and tool-calling assistants on controlled infrastructure"
  - "Agent experiments that need inspectable weights and structured outputs"
avoid_if:
  - "You cannot preserve the required Harmony response format in your serving stack"
  - "You need a small CPU-only model or a turnkey hosted safety and monitoring layer"
enrichment_notes: "OpenAI open-weight release; Harmony formatting is mandatory, and MXFP4 and evaluation claims are vendor-reported. Draft pending review."
---

## Overview

OpenAI's gpt-oss release contains 20B and 120B open-weight reasoning models aimed at agentic work, tool use, and general developer applications. Unlike a conventional chat checkpoint, each model expects the Harmony response format so reasoning, tool calls, and final answers are serialized in a protocol the runtime understands. The Apache-2.0 release is therefore both a model artifact and a serving-integration exercise.

## Why it's in the Arsenal

It earns a place because it gives developers a current, permissively licensed OpenAI model family that can be downloaded, fine-tuned, and served outside a hosted endpoint. The combination of native function calling, structured outputs, web/Python tool patterns, and two model sizes makes it a useful reference point for open-weight agent stacks.

## Architecture

The models are decoder transformers trained around Harmony-formatted conversations, with tool channels for web browsing, Python execution, and structured outputs. Transformers applies the chat template automatically, while direct generation requires the `openai-harmony` package; MXFP4 MoE weights are designed to fit the 20B model in roughly 16GB and the 120B model on a single 80GB accelerator. Serving recipes cover Transformers, vLLM, Ollama, and LM Studio.

## Ecosystem Position

gpt-oss competes with other open-weight reasoning models and with hosted frontier APIs, while complementing vLLM, Ollama, and agent frameworks that provide the runtime around it. Its differentiator is not merely parameter count but the combination of inspectable weights and an explicit tool-oriented response protocol.

## Getting Started

Install Transformers and the `openai-harmony` dependency, authenticate to Hugging Face, and download `openai/gpt-oss-20b` or `openai/gpt-oss-120b`. Start with the repository Transformers example so the Harmony chat template is applied; then use the documented vLLM, Ollama, or LM Studio recipes after checking GPU memory and kernel support.

## Key Use Cases

Use it for self-hosted coding or research agents, structured extraction with tool calls, and evaluations where reasoning traces must remain available to the developer. The 20B checkpoint is the practical entry point for a single workstation, while the 120B model targets larger GPU servers.

## Strengths

Apache-2.0 licensing, explicit tool-use behavior, structured outputs, fine-tuning support, and MXFP4-aware deployment paths make the release unusually practical for local experimentation. The two sizes also let teams compare quality and infrastructure cost within one model family.

## Limitations

Harmony is a hard integration requirement rather than an optional prompt style; an incompatible chat template can make the model behave incorrectly. MXFP4 memory figures and benchmark results are OpenAI-reported, and actual throughput, quality, and long-context behavior depend on the serving engine and hardware.

## Relation to the Arsenal

It is an upstream foundation model for the Arsenal's agent systems, coding tools, and inference engines. Compared with the catalog's smaller task-specific models, gpt-oss offers broader reasoning and tool behavior but demands more careful protocol and accelerator integration.

## Resources

- [GitHub](https://github.com/openai/gpt-oss)
- [Model site](https://gpt-oss.com)
- [Hugging Face models](https://huggingface.co/openai/gpt-oss-20b)
