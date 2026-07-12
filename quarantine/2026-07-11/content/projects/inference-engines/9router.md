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
org_or_maintainer: decolua
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: 9router
name: 9Router
artifact_type: platform
category: tooling
subcategory: platforms
description: Open-source model router and gateway connecting coding agents to multiple providers with fallback and compatibility layers
github_url: https://github.com/decolua/9router
license: MIT
primary_language: TypeScript
tags:
  - inference
  - routing
  - code-gen
  - agents
  - observability
  - cloud

maturity: beta
cost_model: open-source
github_stars: 21800
last_commit: '2026-07-10'
docs_url: https://github.com/decolua/9router
phase: inference-engine
domain:
  - language
  - general-purpose

relation_to_stack:
  - deploy-as-is
  - fork-and-adapt

health_signals:
  - actively-maintained
  - community-driven

ecosystem_role:
  - A provider-routing gateway for coding-agent and model API traffic.
best_for:
  - You need one gateway for multiple model providers and fallback policies.
  - You can audit provider credentials, terms, routing, and cost behavior.
avoid_if:
  - You need a single-vendor client with a smaller operational surface.
  - You cannot monitor or constrain provider selection and spend.
enrichment_notes: Official repository, MIT license, TypeScript stack, and v0.5.30 activity were checked on 2026-07-11. Provider compatibility and cost behavior remain workload-dependent.
---

## Overview

9Router is an open-source model router and gateway for coding-agent clients. It connects compatible clients to multiple providers, adds fallback and routing behavior, and exposes a management surface for provider configuration.

## Why it's in the Arsenal

Routing is a practical control point for provider availability, cost, and capability. 9Router is included as a current example, while the entry deliberately avoids treating “free” provider access or compatibility as a guarantee.

## Architecture

The repository combines a TypeScript gateway and CLI/UI surfaces with provider adapters, configuration and credential handling, compatibility translations, and fallback logic. The gateway becomes a critical policy and observability boundary because it can redirect model traffic and expose usage controls.

## Ecosystem Position

9Router sits between clients or agent systems and model providers. It overlaps with model gateways and inference routing tools; it does not replace provider contracts, authentication, or workload-specific evaluation.

## Getting Started

Pin a release, configure one provider, and validate request, streaming, tool, and error semantics before adding fallback routes. Record provider, model, token, latency, and cost metadata without logging secrets or sensitive prompts.

## Key Use Cases

- Provider fallback for coding-agent and model clients
- Centralized routing and configuration for heterogeneous model access

## Strengths

- Active provider and compatibility work
- One operational point for routing and fallback policy

## Limitations

- Provider behavior, quotas, terms, and prices change independently
- A gateway adds another stateful service and can become a concentrated outage or credential risk

## Relation to the Arsenal

This is an inference-layer gateway, not a model or agent framework. Combine it with budget controls, health checks, secret rotation, and independent quality evaluation.

## Resources

- [Official source](https://github.com/decolua/9router)
- [Official license](https://github.com/decolua/9router/blob/master/LICENSE)
- [Official releases](https://github.com/decolua/9router/releases)

