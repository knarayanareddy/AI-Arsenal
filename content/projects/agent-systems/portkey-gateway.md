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
org_or_maintainer: "Portkey-AI"
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
id: portkey-gateway
name: "Portkey AI Gateway"
artifact_type: platform
category: observability
subcategory: platforms
description: "A fast open-source AI gateway that routes requests to 1,600+ LLMs behind one API, with built-in guardrails, retries, fallbacks, caching, and observability"
github_url: https://github.com/Portkey-AI/gateway
license: "MIT"
primary_language: "TypeScript"
tags:
  - "observability"
  - "llm"
  - "self-hosted"
maturity: production
cost_model: open-source
github_stars: 12403
last_commit: "2026-05-25"
docs_url: https://portkey.ai/docs
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A unified LLM gateway that routes across many providers with reliability and guardrail features."
best_for:
  - "You want one API over many LLM providers with fallbacks, retries, caching, and load balancing"
  - "You need integrated guardrails and observability at the gateway layer for production LLM traffic"
avoid_if:
  - "You call a single provider and need no routing, guardrails, or fallback logic"
  - "You want a full LLMOps optimization loop rather than a routing/reliability gateway"
enrichment_notes: "Repository, MIT license, and 2026-05-25 activity verified via the GitHub API on 2026-07-12. Adds a hop in the request path; account for its latency and availability."
---

## Overview

Portkey AI Gateway is a fast, open-source gateway that fronts many LLM providers, over 1,600 models, behind a single unified API. It adds production reliability and control at the routing layer: automatic retries, fallbacks and load balancing across providers, semantic and simple caching, integrated guardrails, and request-level observability, so applications get resilience and governance without provider-specific code.

## Why it's in the Arsenal

As soon as an app depends on external LLMs, routing, fallback, caching, and guardrails become production necessities, and Portkey is a leading open gateway delivering them, making it a valuable observability/serving entry.

## Architecture

The gateway is a lightweight TypeScript service (deployable at the edge) that accepts an OpenAI-style request, applies a configurable routing policy, retries, provider fallbacks, weighted load balancing, then forwards to the chosen provider through a unified schema. It layers a caching store, a guardrails pipeline that can validate or transform inputs/outputs, and logging/metrics for each request, exposing observability while keeping the hot path fast.

## Ecosystem Position

Portkey competes with LiteLLM, Cloudflare AI Gateway, and TensorZero, differentiating on breadth of providers plus integrated guardrails and edge deployability. Compared with a bare proxy it adds reliability and governance features, and compared with a full optimization platform it focuses on routing, guardrails, and observability rather than a training/optimization loop, so it complements evaluation tools.

## Getting Started

Run the gateway (npm, Docker, or edge deploy), point your OpenAI-compatible client at it with provider keys and a routing config specifying fallbacks/retries/caching, then view request logs and metrics; guardrails are configured per route.

## Key Use Cases

Unified multi-provider LLM access; fallbacks and retries for reliability; caching to cut cost/latency; gateway-level guardrails and request observability.

## Strengths

Broad provider coverage, reliability features (retries, fallbacks, load balancing), caching, integrated guardrails, request observability, edge deployability, and an MIT license.

## Limitations

It introduces a hop whose latency and availability must be managed, it focuses on routing/reliability rather than a full optimization loop, and guardrail effectiveness depends on configuration.

## Relation to the Arsenal

It is a reliability-focused gateway alongside the other gateway and observability entries in the catalog.

## Resources

- [GitHub repository](https://github.com/Portkey-AI/gateway)
- [Documentation](https://portkey.ai/docs)
