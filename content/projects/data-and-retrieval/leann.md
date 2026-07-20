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
org_or_maintainer: StarTrail-org
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 50
trending_score: 34
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: leann
name: LEANN
artifact_type: library
category: rag
subcategory: vector-databases
description: A storage-efficient vector index for on-device RAG that reportedly cuts index size by ~97% via graph-based selective recomputation instead of storing all
github_url: https://github.com/StarTrail-org/LEANN
license: MIT
primary_language: Python
tags:
  - rag
  - embeddings
  - self-hosted
  - llm
maturity: beta
cost_model: open-source
github_stars: 12714
last_commit: '2026-07-19'
docs_url: https://github.com/StarTrail-org/LEANN
phase: data-and-retrieval
domain:
  - language
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - research-origin
ecosystem_role:
  - A low-storage vector index that makes private, on-device RAG practical by avoiding full embedding storage.
best_for:
  - You need fully local, private RAG on a personal device where storing all embeddings is too large
  - You want to index large personal corpora (files, mail, browser history) with a tiny on-disk footprint
avoid_if:
  - You need maximum query throughput at datacenter scale, where a full ANN vector database is more appropriate
  - Recomputation latency during search is unacceptable for your workload
enrichment_notes: Repository, MIT license, and 2026-07-03 activity verified via the GitHub API on 2026-07-12. MLSys 2026 paper; storage-savings figures are project-reported.
---

## Overview

LEANN is a storage-efficient vector index designed for private, on-device retrieval-augmented generation. Its headline claim is roughly 97% storage savings versus a conventional vector index by not persisting every embedding; instead it stores a compact graph and selectively recomputes embeddings at query time, making local RAG over large personal corpora feasible on ordinary devices.

## Why it's in the Arsenal

On-device, private RAG is bottlenecked by the storage cost of embeddings, and LEANN attacks exactly that with a novel recompute-instead-of-store design backed by a research paper, making it a distinct and timely retrieval entry.

## Architecture

LEANN builds a pruned proximity graph over the corpus and stores only that graph plus the raw text rather than the full high-dimensional embedding matrix. At query time it traverses the graph and recomputes embeddings for the small set of candidate nodes it actually visits, trading a modest amount of compute during search for a large reduction in persistent storage, and it integrates with local embedding models and LLMs for an end-to-end private pipeline.

## Ecosystem Position

LEANN competes with vector databases and libraries like FAISS, Chroma, and Qdrant, differentiating on storage footprint rather than raw throughput. Compared with those systems that keep all embeddings in memory or on disk, LEANN targets the personal-device regime where space is the binding constraint, so it complements datacenter vector stores rather than replacing them.

## Getting Started

Install the package, point it at a set of documents to build the LEANN index, and query it through the provided RAG interface with a local embedding model and LLM; the index file remains small even for large corpora.

## Key Use Cases

Private RAG over personal files, email, and browser history; on-device assistants with strict storage limits; laptop/phone-scale semantic search; privacy-sensitive retrieval without cloud storage.

## Strengths

Very small index footprint, fully local and private operation, research-backed selective-recomputation design, MIT license, and active maintenance.

## Limitations

Query-time recomputation adds latency versus stored-embedding indexes, it targets device-scale rather than high-throughput datacenter workloads, and the reported 97% savings are project-reported and depend on corpus and configuration.

## Relation to the Arsenal

It sits alongside the vector-database and RAG entries as the storage-efficient, on-device option.

## Resources

- [GitHub repository](https://github.com/StarTrail-org/LEANN)
