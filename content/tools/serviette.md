---
id: serviette
name: serviette
type: tool
job:
  - Real-time sync and self-hosted RAG server
description: A no-code RAG engine built on Pathway that keeps vector indices in sync with streaming documents across 8 vector databases.
url: https://github.com/pathwaycom/serviette
cost_model: open-source
pricing_detail: MIT Licensed open-source repository; self-hosted infrastructure costs apply.
tags:
  - rag
  - real-time
  - pathway
  - vector-database
  - no-code
  - pgvector
  - milvus
  - qdrant
maturity: production
stack:
  - python
  - pathway
  - rust
  - duckdb
  - pgvector
  - qdrant
  - milvus
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-24
last_reviewed: 2026-11-24
added_by: repo-maintainer
verdict: recommended
verdict_rationale: Serviette abstracts the complexity of building real-time data pipelines for RAG by combining Pathway's reactive streaming computation engine with unified target drivers for eight major vector databases. It solves the index staleness problem native to traditional batch-ingested RAG systems.
status: active
phase: orchestration
audience:
  - ai-engineers
  - data-engineers
  - llm-ops-teams
best_when: You need low-latency, real-time vector synchronization from live document sources (S3, Google Drive, local FS) to vector stores without writing custom streaming ingestion pipelines.
avoid_when: You only require static document ingestion or already possess a fully managed ETL pipeline with micro-batch trigger infrastructure.
github_url: https://github.com/pathwaycom/serviette
docs_url: null
---

## Overview

Serviette is a no-code Retrieval-Augmented Generation (RAG) backend engineered to bridge streaming storage backends with target vector databases. Built directly on top of Pathway's Rust-backed reactive data processing engine, Serviette continually monitors input file sinks, processes file deltas, computes dynamic embeddings, and reflects state changes in external vector stores with minimal latency.

Traditional RAG applications rely on periodic batch ETL jobs or ad-hoc webhook triggers to update document embeddings, introducing index staleness and eventual consistency lag. Serviette fundamentally restructures RAG data pipelines into event-driven stream processing flows. When a source document is modified, created, or deleted, Serviette propagates those delta operations end-to-end—re-indexing modified segments and pruning deleted vector records automatically.

By standardizing connectors for eight target vector databases (including pgvector, Qdrant, Milvus, ChromaDB, Pinecone, Weaviate, DuckDB, and MongoDB), Serviette provides an enterprise-ready server interface that unifies real-time ingestion, chunking strategies, embedding generation, and serving APIs into a single declarative deployment.

## Why It's in the Arsenal

Serviette solves the operational headache of maintaining real-time freshness in RAG vector stores. Instead of assembling custom Kafka topics, CDC connectors, document parsers, and embedding updater scripts, engineers deploy a unified container configured via YAML or environment variables.

Because it relies on Pathway's differential dataflow execution layer under the hood, memory footprint and compute usage are minimized during idle periods, while stream-processing throughput scales efficiently under high-velocity document updates. It eliminates manual vector store cleanup by treating document deletions as explicit operations in the dataflow pipeline.

## Key Features

Multi-Database Vector Sync: Native sink support for 8 distinct vector backends including Qdrant, Milvus, pgvector, Weaviate, Pinecone, ChromaDB, DuckDB, and MongoDB.

Differential Stream Processing: Leverages Pathway's engine to calculate micro-deltas on incoming documents, updating only modified text blocks rather than re-indexing full document corpora.

Automated State Pruning: Ingests delete events from storage sources and dispatches deletion operations directly to vector index instances to prevent ghost retrievals.

No-Code Configuration: Configured via standard schema definitions specifying source paths, embedding model endpoints (e.g., OpenAI, Hugging Face), target vector store credentials, and chunking parameters.

REST & OpenAPI Serving: Exposes unified REST endpoints for context retrieval and standard Q&A generation compatible with downstream orchestration frameworks.

## Trade-offs

Framework Abstraction Overhead: Because Serviette abstracts the underlying Pathway compute engine, advanced custom data transformations outside standard text-processing/chunking topologies require dropping down into the native Pathway Python SDK.

Memory Footprint for State Tracking: Maintaining differential dataflow state in memory for massive document streams requires proper sizing of worker nodes, particularly when tracking millions of active chunk hashes.

Ecosystem Dependency: Optimal performance is tightly coupled to Pathway's execution environment; troubleshooting pipeline bottlenecks requires understanding stream processing principles over simple script-based execution.
