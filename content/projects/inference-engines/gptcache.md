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
org_or_maintainer: zilliztech
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 5
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: gptcache
name: GPTCache
artifact_type: library
category: tooling
subcategory: libraries
description: A semantic cache for LLM applications that stores past query embeddings and responses to serve similar future queries from cache, cutting API cost and latency
github_url: https://github.com/zilliztech/GPTCache
license: MIT
primary_language: Python
tags:
  - llm
  - embeddings
  - self-hosted
  - observability
maturity: beta
cost_model: open-source
github_stars: 8099
last_commit: '2025-07-11'
docs_url: https://gptcache.readthedocs.io/
phase: inference-engine
domain:
  - language
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
ecosystem_role:
  - A semantic caching layer that reuses answers to similar prompts to reduce LLM cost and latency.
best_for:
  - You have repetitive or similar LLM queries and want to cut cost and latency with a semantic cache
  - You want drop-in caching for LangChain/LlamaIndex apps keyed by embedding similarity, not exact match
avoid_if:
  - Your queries are highly unique so cache hit rates would be low
  - Serving slightly stale or approximate answers is unacceptable for your use case
enrichment_notes: Repository, MIT license, and 2025-07-11 activity verified via the GitHub API on 2026-07-12. Upstream cadence has slowed; validate similarity thresholds to avoid wrong-answer hits.
---

## Overview

GPTCache is a semantic cache built for LLM applications. Instead of only caching exact string matches, it embeds each incoming query, looks for a semantically similar previous query in a vector store, and if the similarity is high enough returns the cached response, so repetitive or near-duplicate prompts are served without another model call, reducing API cost and latency.

## Why it's in the Arsenal

Cost and latency are primary constraints on LLM apps, and semantic caching is a distinct lever that exact-match caches cannot provide, making GPTCache a useful tooling entry for serving and observability.

## Architecture

GPTCache runs a pipeline: an embedding function converts the prompt to a vector, a vector store performs similarity search over cached queries, a similarity evaluator decides whether the best match is close enough to reuse, and a cache store holds the associated responses. Each stage is pluggable (embedding model, vector store, eviction policy, similarity threshold), and adapters integrate it with OpenAI-style clients and frameworks like LangChain and LlamaIndex.

## Ecosystem Position

GPTCache complements gateways and serving engines like LiteLLM, Portkey, and vLLM by adding a semantic-cache layer, and it competes with exact-match caches. Compared with a plain key-value cache it hits on paraphrases via embedding similarity, and compared with a gateway's simple cache it is a dedicated, tunable semantic cache, so it is often placed in front of LLM calls rather than replacing the serving stack.

## Getting Started

Install with `pip install gptcache`, configure an embedding function, a vector store, and a similarity threshold, then wrap your LLM client with the GPTCache adapter so calls check the cache before hitting the provider.

## Key Use Cases

Caching repetitive LLM queries; cutting cost/latency for FAQ-style assistants; reusing answers across paraphrased prompts; reducing load on rate-limited providers.

## Strengths

Semantic (embedding-based) cache hits, pluggable embedding/vector-store/eviction components, framework adapters, tunable similarity thresholds, and an MIT license.

## Limitations

Upstream cadence has slowed since 2025, low query diversity is needed for good hit rates, and an overly loose similarity threshold can return subtly wrong cached answers, so thresholds require validation.

## Relation to the Arsenal

It is the semantic-caching layer that complements the gateway and inference-engine entries in the catalog.

## Resources

- [GitHub repository](https://github.com/zilliztech/GPTCache)
- [Documentation](https://gptcache.readthedocs.io/)
