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
org_or_maintainer: "oramasearch"
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
id: orama
name: "Orama"
artifact_type: library
category: rag
subcategory: vector-databases
description: "A tiny TypeScript search engine and RAG pipeline that runs full-text, vector, and hybrid search in the browser, on the server"
github_url: https://github.com/oramasearch/orama
license: "NOASSERTION"
primary_language: "TypeScript"
tags:
  - "rag"
  - "embeddings"
  - "self-hosted"
  - "llm"
maturity: beta
cost_model: open-source
github_stars: 10475
last_commit: "2026-07-03"
docs_url: https://docs.orama.com/
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A lightweight, isomorphic search library bringing full-text, vector, and hybrid search to browsers and edge runtimes."
best_for:
  - "You need in-browser or edge search over a bounded dataset without a separate search server"
  - "You want full-text, vector, and hybrid search in a tiny TypeScript dependency for a JS/TS app"
avoid_if:
  - "You have very large corpora needing a scalable distributed backend, where a server-side engine fits better"
  - "You need managed persistence and sharding rather than an in-memory index built at runtime"
enrichment_notes: "Repository and 2026-07-03 activity verified via the GitHub API on 2026-07-12; license metadata is NOASSERTION, so review terms. Best for bounded, client-side datasets."
---

## Overview

Orama is a small, dependency-light search engine and RAG pipeline written in TypeScript that runs anywhere JavaScript runs, the browser, a server, or an edge function, in a very small bundle. It supports full-text, vector, and hybrid search over an in-memory index and adds RAG helpers, making client-side and edge search practical without a dedicated search server.

## Why it's in the Arsenal

Bringing full-text plus vector search to the browser and edge in a tiny isomorphic package is a distinctive capability, enabling private, low-latency search and RAG for JS/TS applications, which makes it a valuable retrieval entry.

## Architecture

Orama builds an in-memory index at runtime combining an inverted index for BM25-style full-text scoring with a vector index for embedding similarity, and it fuses them for hybrid search. Because it is pure TypeScript with no native dependencies, the same code runs in browsers, Node, Deno, Bun, and edge runtimes; documents and their embeddings are loaded into memory, and it exposes plugins and a RAG answer-generation layer on top.

## Ecosystem Position

Orama competes with server-side engines like Elasticsearch, Typesense, and Meilisearch and with vector databases, differentiating on being isomorphic and tiny rather than a hosted backend. Compared with those systems it trades scalability and persistence for zero-infrastructure, in-process search close to the user, so it complements heavy backends for bounded or client-side datasets.

## Getting Started

Install with `npm install @orama/orama`, create a schema with `create()`, `insert()` documents (optionally with embeddings), then `search()` with full-text, vector, or hybrid mode; RAG helpers layer answer generation over results.

## Key Use Cases

In-browser documentation and site search; edge-function search with low latency; private client-side search over bounded data; lightweight RAG in JS/TS apps.

## Strengths

Tiny isomorphic bundle, full-text plus vector plus hybrid search, runs in browser/server/edge, RAG helpers, and active organizational backing.

## Limitations

It is in-memory and best for bounded datasets rather than massive corpora, lacks the distributed persistence and sharding of server engines, and the license metadata is non-standard (NOASSERTION) and should be reviewed for commercial use.

## Relation to the Arsenal

It is the client-side/edge option among the retrieval and vector-search entries.

## Resources

- [GitHub repository](https://github.com/oramasearch/orama)
- [Documentation](https://docs.orama.com/)
