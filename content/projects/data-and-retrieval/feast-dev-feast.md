---
id: feast-dev-feast
name: "feast"
version_tracked: null
artifact_type: platform
category: data-pipelines
subcategory: tools
description: "Declarative feature definitions in a registry, materialized offline for training and materialized online for low-latency serving reads"
github_url: "https://github.com/feast-dev/feast"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "feast-dev"
tags: [data]
maturity: production
cost_model: open-source
github_stars: 7311
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-28"
docs_url: "https://docs.feast.dev"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Feature store serving online and offline views of the same feature definitions, the standard answer to training/serving skew for retrieval and ranking models."
best_for:
  - "You are building a recommendation or ranking model and need point-in-time correct feature joins so training rows cannot leak future values."
  - "You have an online store such as Redis or DynamoDB and want materialization, TTL expiry, and a push API handled by one library instead of bespoke cron jobs."
  - "You need on-demand features computed from request-time context without precomputing every possible combination."
avoid_if:
  - "Your model has only a handful of features and the join fits in a single SQL query, since a feature store is pure operational overhead at that size."
  - "You cannot run or budget for the online store and the materialization worker, because the value only materializes when both exist and stay fresh."
  - "You need streaming-native sub-second freshness with complex windowed aggregates, where Kafka-side computation and a dedicated stream engine are stronger choices."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (7311), Apache-2.0 license, last commit 2026-09-28, primary language Python, and all ten GitHub topics including feature-store were read from the API. Feature views, on-demand transforms, TTL, materialization, and the supported store list come from the official docs; no store was provisioned and no materialization job was run."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/feast-dev/feast", "date": "2026-09-28", "description": "7,311 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Feast is an open source feature store organized around three concepts. A feature registry holds feature views, which pair an entity key with a schema, an event timestamp column, a freshness window, and a reference to a source table. On-demand feature views express request-time transforms as pandas or Python UDFs. The offline store materializes historical values for point-in-time-correct training joins, while the online store holds the latest value per entity key with a TTL so stale features expire instead of silently serving. A feature service is a named bundle of feature views that retrieval requests ask for together.

## Why it's in the Arsenal

Feast resolves training/serving skew, the failure where a model scores differently at inference than during evaluation because the feature pipeline that built training rows is not the pipeline that serves. Defining a feature once and deriving both views from that definition removes the second implementation. It also fixes leakage: offline joins are anchored to the event timestamp, so a row for a click at 10:00 never sees a feature value written at 11:00, and backtests stop looking better than they are. Freshness becomes a declared TTL instead of an incident.

## Architecture

You define features in Python files, point a feature_store.yaml at an offline store such as BigQuery, Snowflake, Redshift, Spark, DuckDB, or ClickHouse, and run feast apply to register them. Materialization jobs scan the source table, sort by event timestamp, and write the latest value per entity into the online store, which can be Redis, DynamoDB, Memcached, Cassandra, Postgres, or a local SQLite file for tests. get_online_features performs a batched key lookup, runs on-demand transforms locally on the returned rows, and returns typed values. A push API and Kafka ingestion write updates directly, and feast serve exposes a small Python feature server with a gRPC and HTTP interface.

## Ecosystem Position

Feast competes with Tecton, the managed SageMaker Feature Store, and the Databricks Feature Store, all of which sell the same abstraction with a hosted control plane, and it also overlaps with dbt-style transformation tooling when feature logic starts living in SQL. It is not a vector database: Qdrant, Milvus, and pgvector hold embeddings for semantic search, while Feast holds tabular features for ranking and aggregation, so the two are frequently combined in the same RAG or recommender service. Feast complements orchestration rather than replacing it, since materialization is a job that Ray, Airflow, or a Kubernetes CronJob can schedule, and the lineage of a served feature value ultimately depends on the batch job that ran upstream.

## Getting Started

Install the library, point it at an offline store, and register plus materialize a feature view:

```bash
pip install feast
```

```bash
feast init my_project && cd my_project/feature_repo
feast apply
feast materialize -d 2026-09-27 -t 2026-09-28   # backfill a date range into the online store
feast serve                          # local feature server on port 6566
```

```python
from feast import FeatureStore
store = FeatureStore(repo_path=".")
rows = store.get_online_features(
    features=["driver_hourly_stats:conv_rate", "driver_hourly_stats:acc_rate"],
    entity_rows=[{"driver_id": 1001}],
).to_dict()
```

## Key Use Cases

1. Recsys ranking where dozens of aggregations must be computed identically for training and for every online request.
2. Fraud and risk models that need point-in-time joins so historical backtests do not leak post-event feature values.
3. Shared features across several models and teams, where one registry replaces per-team SQL copies that drift apart within weeks.

## Strengths

- Single definition drives both the offline training table and the online lookup, which is the direct fix for training/serving skew.
- Point-in-time correct joins make offline features safe to use in backtests and model selection.
- Broad offline and online store coverage lets you keep BigQuery or Snowflake for history and Redis or DynamoDB for serving without writing glue.
- On-demand feature views handle request-time context without exploding the materialized feature space.

## Limitations

Feast is mostly a control plane, so the hard parts still cost you money: you run the offline warehouse, the online store, and the materialization worker, and a stale or failed materialization job is a silent data-quality incident rather than an error the library raises. On-demand transforms execute in your serving process, so a slow UDF adds latency to every request. Streaming support is thinner than batch, and the registry has no real schema migration story, meaning a feature type change is a coordinated cutover across consumers. Finally the online store must be sized for the entity cardinality of your busiest table, which for ad-tech workloads can be enormous and expensive.

## Relation to the Arsenal

This entry sits in the data-and-retrieval phase alongside vector stores such as Qdrant, Milvus, and Chroma, which handle the embedding side of a RAG stack rather than the tabular ranking features handled here. Upstream, the data-pipelines entries that build the source tables determine the freshness Feast can guarantee. Downstream, it feeds the training-and-alignment phase, and the models it serves are the ones benchmarked in the benchmarks-and-evals phase.

## Resources

- [Feast documentation](https://docs.feast.dev)
- [Feast GitHub repository](https://github.com/feast-dev/feast)
- [Feast concept guide on feature stores](https://docs.feast.dev/getting-started/concepts/feature-view)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (7,311 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
