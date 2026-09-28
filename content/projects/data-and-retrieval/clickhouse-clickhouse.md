---
id: clickhouse-clickhouse
name: "ClickHouse"
version_tracked: null
artifact_type: platform
category: data-pipelines
subcategory: tools
description: "Apache-2.0 columnar OLAP engine with vectorized execution, MergeTree storage, and sub-second scans over event and trace data"
github_url: "https://github.com/ClickHouse/ClickHouse"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "ClickHouse"
tags: [data, observability, embeddings]
maturity: production
cost_model: open-source
github_stars: 50123
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-09-28"
docs_url: "https://clickhouse.com/docs"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Columnar OLAP engine that doubles as an LLM workload store: sub-second analytical scans over event logs, embedding tables, and agent trace history."
best_for:
  - "You are storing LLM traces, token logs, or embedding metadata and need p50 and p99 latency percentiles per model per hour over months of data, which is a columnar scan problem rather than a row-store index problem."
  - "You are computing per-model cost and quality rollups over event streams and want sub-second queries with primary-key-ordered MergeTree tables and materialized views instead of a pre-aggregated warehouse."
  - "You need vector similarity search over an embedding table alongside ordinary analytical columns on the same rows, so one query can filter by tenant and time and rank by distance."
avoid_if:
  - "You need row-level transactional updates at high frequency, because the storage engine is append-and-merge by design and updates are mutations rather than in-place writes."
  - "Your dataset is small enough for a single-node embedded database, since ClickHouse's operational weight and configuration surface exceed what a small workload needs."
  - "Your team has no capacity to tune parts, read replicas, and merge behavior, because misconfigured merges and uneven data distribution produce latency problems that are not obvious from the query alone."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 50123 stars, Apache-2.0 license, C++ primary language, last commit 2026-09-28, 16 GitHub topics. Engine names, merge and PREWHERE behavior, and vector HNSW support are drawn from official ClickHouse documentation; no server was run in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ClickHouse/ClickHouse", "date": "2026-09-28", "description": "50,123 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

ClickHouse is a columnar analytical database whose execution model is vectorized rather than row-at-a-time: queries are split into granules, each is processed in a batch of columns with SIMD-friendly loops, and results are assembled afterward. Storage is dominated by MergeTree, an LSM-style family where each insert forms a part, parts merge in the background according to a merge selector, and an optional primary key defines the sort order that makes range filters effective. On top sit projections, materialized views for pre-aggregation, and specialized engines - GraphiteMergeTree for time series, ReplicatedMergeTree for cluster replicas, S3Queue for object-storage ingest, and vector types with an HNSW index for similarity search. The client surface is a SQL dialect with its own function library, a JSON type, and an HTTP interface.

## Why it's in the Arsenal

The recurring decision ClickHouse resolves is analytical query cost at high row counts. A row store reading a month of token-level logs either builds large secondary indexes, maintains denormalized aggregates by hand, or times out; a columnar store reads only the columns a predicate touches, at a few gigabytes per second per node, because decompression, filtering, and aggregation run in tight columnar loops. For AI workloads specifically, the win is composite: you want to filter traces by model, tenant, and timestamp and simultaneously group by latency and cost, and you want a vector distance over the same rows - operations that conventional OLAP and vector databases each handle badly on their own. The price is a different storage discipline: append-heavy, merge-aware, and tolerant of slow-changing dimensions rather than hot updates.

## Architecture

A table is a set of immutable parts, each holding min/max metadata per column and an index of primary-key values. The MergeTree engine merges parts in the background according to a comparator, so write amplification is traded for read efficiency, and ReplacingMergeTree deduplicates by sort key at merge time - the standard trick for at-least-once ingest. The query path parses SQL into a plan, then the interpreter and vectorized execution engine read whole columns, apply PREWHERE before other predicates to skip granules, evaluate expressions in a pipeline of block processors, and aggregate with hash- or sort-based strategies chosen by the query. Sparse and dense primary indexes make ORDER BY columns the ones range predicates exploit; other predicates fall back to full scans, so sort order in the DDL is a performance decision. Materialized views are insert triggers that write into a second table, which is how pre-aggregations stay correct incrementally rather than recomputed by a cron job. Distributed tables shard across a cluster over a sharding key, with replica placement decoupled through the Replicated family and a coordination service managing topology. S3Queue and Kafka engines turn object storage or a topic into a part source, so ingest scales independently of query.

## Ecosystem Position

ClickHouse competes with DuckDB for the in-process analytical query layer and with warehouse engines such as BigQuery and Snowflake for managed scale, and compared to those it wins on self-hosted cost predictability and loses on managed convenience and on late lookups. It overlaps with a dedicated vector database such as Qdrant or Milvus on similarity search, where ClickHouse wins by keeping embeddings and the surrounding structured columns in the same place and loses on the highly-tuned ANN index tuning that purpose-built stores offer. It is an alternative to maintaining a separate OLAP warehouse plus a vector store plus a trace store for the same data, and it is not a transactional store: compared with Postgres, a high-rate update workload is the wrong fit. The vector stores in content/projects/data-and-retrieval/ are the retrieval-side counterparts, and the observability tools in content/projects/evaluation/ are what often generate the data it stores.

## Getting Started

Run a single node locally and create a MergeTree table sorted the way you will query it, then aggregate:

```bash
docker run --rm -it clickhouse/clickhouse-server
```

```sql
CREATE TABLE llm_traces
(
  ts DateTime,
  model LowCardinality(String),
  tenant_id UInt64,
  prompt_tokens UInt32,
  completion_tokens UInt32,
  latency_ms UInt32
)
ENGINE = MergeTree
ORDER BY (tenant_id, ts)
PARTITION BY toYYYYMM(ts)
TTL ts + INTERVAL 90 DAY;

SELECT model, count() AS calls,
       quantile(0.99)(latency_ms) AS p99_ms,
       sum(prompt_tokens) AS tokens
FROM llm_traces
WHERE tenant_id = 42 AND ts > now() - INTERVAL 1 DAY
GROUP BY model;
```

## Key Use Cases

1. Cost and latency observability for LLM traffic: ingest per-call token counts and latencies as rows and query per-model percentiles, spend, and error rate over any window.
2. Cost attribution and billing: partition by month, keep model names in a LowCardinality dimension, and roll up with materialized views as usage arrives rather than nightly batches.
3. Hybrid retrieval and analytics: keep embeddings alongside the metadata needed to filter them - tenant, timestamp, language - and run vector search with a structured predicate in one query.

## Strengths

- Columnar vectorized execution makes wide analytical scans fast enough that pre-aggregation is often unnecessary for moderate volumes.
- Efficient compression: LZ4 and ZSTD columns plus sparse indexes routinely cut storage several-fold versus an uncompressed row store.
- MergeTree's ORDER BY, partition keys, and TTL clauses make retention and pruning a DDL decision instead of a deletion job.
- Native vector types with an HNSW index let similarity search run against the same rows as the structured filters, avoiding a second system.

## Limitations

MergeTree is append-and-merge, so high-rate updates and deletes are expensive mutations that trigger extra merges; ReplacingMergeTree dedupes only at merge time, which means duplicate reads are possible until it runs. The operational surface is large - shard count, replication, merge selectors, TTL policy, and part granularity all interact, and a bad choice shows up as background CPU and memory pressure rather than an error. Ingestion patterns matter enormously: many small inserts create part explosion and merge storms, and the mitigation is batching, which couples your write path to the table design. Single-node durability and backup are your responsibility, and restoring a large cluster is not a fast operation. There is also no managed cloud offering in the way the hyperscalers provide one, so a team without ClickHouse experience is taking on real operational learning.

## Relation to the Arsenal

The analytical and observability substrate for content/projects/evaluation/ entries that need to store traces, token counts, and latency distributions at volume, and the store that vector-search entries in content/projects/data-and-retrieval/ are often compared against when embeddings must be filtered. The retrieval frameworks in that same phase supply the writes, and the observability tools in content/projects/evaluation/ supply the schema discipline. DuckDB is the in-process counterpart for single-node analysis, and the object-storage and pipeline entries in content/projects/data-and-retrieval/ are the natural upstream for the S3Queue-style ingest. Read the schema and ORDER BY design as a deliberate part of any adoption: this engine punishes a bad sort key far more than it punishes a missing feature.

## Resources

- [GitHub — ClickHouse/ClickHouse](https://github.com/ClickHouse/ClickHouse)
- [ClickHouse documentation](https://clickhouse.com/docs)
- [MergeTree engine family reference](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (50,123 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
