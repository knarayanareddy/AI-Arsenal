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
org_or_maintainer: vllm-project
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 64
trending_score: 35
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: semantic-router
name: Semantic Router (vLLM)
artifact_type: library
category: tooling
subcategory: inference-engines
description: An intelligent mixture-of-models router that classifies each request semantically and routes it to the most suitable model for efficient heterogeneous LLM
github_url: https://github.com/vllm-project/semantic-router
license: Apache-2.0
primary_language: Go
tags:
  - inference
  - llm
  - self-hosted
  - observability
maturity: beta
cost_model: open-source
github_stars: 4996
last_commit: '2026-07-20'
docs_url: https://github.com/vllm-project/semantic-router
phase: inference-engine
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - A semantic request router that sends each query to the cheapest capable model across a heterogeneous fleet.
best_for:
  - You run several models of different size/cost and want to route each request to the cheapest capable one
  - You want to cut inference cost and latency by reserving large models for queries that need them
avoid_if:
  - You serve a single model, where routing adds complexity without benefit
  - You cannot tolerate occasional misrouting of borderline queries
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. A vLLM-project component; routing accuracy depends on the classifier and configuration.
---

## Overview

Semantic Router is an intelligent mixture-of-models router from the vLLM project that decides, per request, which model should handle a query. By classifying each incoming request semantically, it routes simple prompts to smaller cheaper models and hard ones to larger models, enabling efficient inference across a heterogeneous fleet rather than sending everything to one expensive model.

## Why it's in the Arsenal

Model routing is a key cost-and-latency lever once teams run multiple models, and a purpose-built semantic router from the vLLM ecosystem is a distinct, practical inference entry.

## Architecture

The router runs a fast classifier (embedding- and intent-based) over each request to predict the required capability or category, then applies routing policies to select a backend model and forward the request, optionally with caching and observability of routing decisions. Implemented in Go for throughput, it sits in front of model servers such as vLLM instances and exposes an OpenAI-compatible surface so applications need no changes.

## Ecosystem Position

Semantic Router complements inference servers like vLLM and gateways like LiteLLM/Portkey, differentiating by focusing on semantic model selection rather than just proxying or load balancing. Compared with a static gateway it adds capability-aware routing to save cost, and compared with running one large model it trades a small risk of misrouting for substantial efficiency across a fleet.

## Getting Started

Deploy the router configured with your model backends and routing categories, point clients at its OpenAI-compatible endpoint, and tune the classifier/policies; observability shows how requests are being routed.

## Key Use Cases

Cost-optimized serving across small and large models; latency reduction by reserving big models for hard queries; capability-aware routing in heterogeneous fleets; A/B and policy-driven model selection.

## Strengths

Semantic capability-aware routing, OpenAI-compatible drop-in surface, Go performance, observability of routing, vLLM-project backing, and an Apache-2.0 license.

## Limitations

It adds a component and only helps when multiple models are served, routing accuracy depends on the classifier and configuration, and borderline queries can be misrouted, requiring monitoring and tuning.

## Relation to the Arsenal

It is the routing layer that complements the inference-engine and gateway entries in the catalog.

## Resources

- [GitHub repository](https://github.com/vllm-project/semantic-router)
