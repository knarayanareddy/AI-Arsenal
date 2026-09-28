---
id: finsight-ai
name: FinSight-AI
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "A Spring Boot equity-research workspace with recoverable workflows, snapshot-bound reports, and hybrid pgvector retrieval"
github_url: "https://github.com/juanjuandog/FinSight-AI"
license: MIT
primary_language: Java
tags: [orchestration, retrieval, inference, battle-tested]
maturity: beta
cost_model: open-source
github_stars: 1061
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-02"
docs_url: null
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Treats the expensive model call as a distributed transaction with leases, fencing tokens, and versioned snapshots."
best_for:
  - "You are running long research jobs that fail halfway and need stage-level recovery instead of restarting a paid run from scratch."
  - "You are caching generated reports and need them invalidated when the underlying filings or metrics change."
  - "You are building evidence-grounded answers and need every claim to resolve to a retrievable filing span with a trace."
avoid_if:
  - "You are building a trading system, because the project states plainly that it is a research aid and its output is not investment advice."
  - "You are outside the A-share market, since the data sources, filings, and metrics are specific to Chinese listed equities."
  - "You need a hosted product, because this is a self-hosted Java and Python stack you operate yourself."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1061, MIT, Java, last commit 2026-09-02, topics. From README: Java 17, Spring Boot 3.3.5, pgvector, named classes WorkflowOrchestrator, RedisBackedWorkflowLeaseService, StockAiAnalysisService, HybridRetrievalGateway, Redis Lua lease, snapshot hashes, FastAPI sidecar. Source files not read."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

FinSight AI is a Java 17 Spring Boot 3.3.5 backend with a Python FastAPI sidecar, PostgreSQL with pgvector, Redis, and RabbitMQ. The interesting engineering is not the chat UI but the reliability layer, which the README tabulates against specific named classes: WorkflowOrchestrator gives long-running research explicit task states, retries, timeout takeover, and dead-letter handling; RedisBackedWorkflowLeaseService uses idempotency keys plus a Redis Lua single-flight lease with a fencing token so duplicate concurrent requests cannot amplify expensive work; StockAiAnalysisService binds each report to its inputs through dataSnapshotHash, contextHash, and reportVersion so a cached answer is invalidated when source state moves; HybridRetrievalGateway combines full-text and vector recall with reciprocal-rank fusion, reranking, and an evidence trace. Embedding, reranking, and generation run behind the sidecar with deterministic fallbacks so model infrastructure can change independently.

## Why it's in the Arsenal

The recurring problem in any LLM workflow that costs real money is duplicate and orphaned execution: a user retries, a timeout fires, two workers pick up the same job, and you pay twice or lose the result. Idempotency keys plus a single-flight lease with a fencing token is the standard distributed-systems answer, and this project applies it at the workflow layer instead of assuming a queue gives you exactly-once. The snapshot-binding problem is the second one: an LLM report is worthless if it silently describes last month's filings, so hashing the data snapshot and the assembled context makes staleness detectable rather than something a reader has to notice.

## Architecture

Requests enter Spring Boot controllers and are dispatched as workflow stages through RabbitMQ, with state transitions persisted so a dead worker does not strand a job. Redis holds the Lua-scripted single-flight lease; the fencing token it issues invalidates any holder that lost the race, which is what stops a paused worker from writing after a new one took over. Retrieval runs against PostgreSQL with pgvector plus its full-text index, merged by reciprocal-rank fusion and reranked, returning an evidence trace the UI can render. The FastAPI sidecar isolates model infrastructure - embedding, reranking, generation - behind HTTP with deterministic fallbacks so a provider outage degrades rather than cascades. The frontend separates Company Research, AI Analysis, Evidence, Recent Events, and Watchlist into distinct workspaces instead of one dashboard.

## Ecosystem Position

FinSight overlaps with Bloomberg-style terminals and research platforms like AlphaSense, but at the level of an inspectable engineering reference rather than a data license. Compared with LangChain or LlamaIndex RAG stacks, its distinguishing layer is the reliability substrate - leases, fencing tokens, snapshot hashes, dead-letter handling - which those libraries leave to you. It competes with hand-rolled Spring Boot plus LangChain4j implementations that solve the same idempotency problem in application code, and its design reads like a reference answer for the at-least-once-plus-side-effects problem documented across content/projects/frameworks. The pgvector retrieval is a familiar pattern from content/projects/data-and-retrieval, while its evaluation and regression testing sit in the same category as content/projects/benchmark-and-eval.

## Getting Started

Clone the repository, start PostgreSQL with pgvector plus Redis and RabbitMQ, then run the Spring Boot backend and the FastAI sidecar. Both are documented in the repository docs.

```bash
git clone https://github.com/juanjuandog/FinSight-AI.git && cd FinSight-AI
docker compose up -d          # PostgreSQL (pgvector), Redis, RabbitMQ
./mvnw -f backend/pom.xml spring-boot:run
uvicorn ai-service.app.main:app --app-dir ai-service
```

See docs/architecture.md for the component map and docs/api.md for the HTTP surface.

## Key Use Cases

1. Run a long research job: let a multi-stage workflow survive a mid-run failure and resume from the last completed stage rather than repaying the whole run.
2. Invalidate stale reports: rely on dataSnapshotHash and reportVersion so a cached conclusion is regenerated when filings or metrics change underneath it.
3. Verify an answer: trace every claim in an AI Analysis output back to the filing or metric span the retrieval step returned.

## Strengths

- Idempotency keys plus a Redis Lua single-flight lease with fencing tokens, which is the correct answer to duplicate expensive execution rather than a hopeful lock.
- Reports bound to dataSnapshotHash, contextHash, and reportVersion, so staleness is a detectable state instead of a silent failure.
- Hybrid full-text plus vector retrieval with reciprocal-rank fusion, reranking, and an evidence trace rather than vector-only recall.
- Model infrastructure isolated behind a FastAPI sidecar with deterministic fallbacks, so a provider outage degrades instead of cascading.

## Limitations

Market coverage is narrow: the data sources, filings, and metrics target A-share listed companies, so this does not generalize to US or European equities without new ingestion work. Java and Python in one stack means two deployment pipelines and two failure surfaces to operate. Redis Lua single-flight is correct but adds latency on the hot path and depends on Redis availability, so Redis becomes part of the critical path for every expensive call. The project self-describes as a research aid and not investment advice, and no accuracy evidence for the generated analyses is published. GPL-adjacent concerns do not apply under MIT, but the Java stack is heavier to run than a Python-only equivalent.

## Relation to the Arsenal

This data-and-retrieval-phase entry is a vertical application whose retrieval and caching layers are the reusable part. Its workflow state machine follows patterns also visible in content/projects/frameworks, its pgvector and full-text hybrid retrieval sits squarely among the stores in this phase, and its regression-evaluation approach is the benchmark concern covered by content/projects/benchmark-and-eval. It calls model endpoints rather than hosting them, so content/projects/inference-engines is upstream of it, not downstream.

## Resources

- [Repository](https://github.com/juanjuandog/FinSight-AI)
- [Architecture documentation](https://github.com/juanjuandog/FinSight-AI/blob/master/docs/architecture.md)
- [API documentation](https://github.com/juanjuandog/FinSight-AI/blob/master/docs/api.md)
