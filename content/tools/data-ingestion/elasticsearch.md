---
id: elasticsearch
name: Elasticsearch
type: tool
job: [vector-search]
description: "Distributed search and analytics engine with a vector database, full-text search and near-real-time indexing"
url: "https://www.elastic.co/elasticsearch"
cost_model: freemium
pricing_detail: Free self-managed tiers (AGPL/ELv2 licensing); Elastic Cloud is usage/resource priced; some ML features gated to paid tiers
tags: [retrieval, data]
maturity: production
stack: [java]
free_tier: true
free_tier_limits: Self-managed basic tier free; Elastic Cloud trial; semantic/ML features vary by license tier
self_hostable: true
open_source: true
source_url: "https://github.com/elastic/elasticsearch"
docs_url: "https://www.elastic.co/products/elasticsearch"
github_url: "https://github.com/elastic/elasticsearch"
alternatives: [qdrant, vespa, pinecone]
integrates_with: [langchain, llamaindex]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: data-ingestion
audience: [production]
best_when: ["You need full-text search, vector search and aggregations on the same data without running two stores and a consistency layer between them.", "Your workload is hybrid retrieval where lexical precision and embedding recall both matter, because both live in one query engine.", "You need log, APM and security analytics alongside application search, which is the rest of the Elastic Stack described in the README."]
avoid_when: ["You want a small single-node deployment with no operations burden, because a distributed cluster is JVM, heap and shard management.", "You cannot accept Elastic's licensing terms for your use, since the license field reports NOASSERTION and the source-available licensing needs review.", "Your corpus is small enough for an embedded index, because a cluster is a large overhead for a few million documents."]
version_tracked: null
verdict: solid-choice
verdict_rationale: The pragmatic hybrid-retrieval choice wherever an ES cluster already exists; rarely the greenfield pick for pure vector workloads
status: active
enrichment_status: draft
---

## Overview

Elasticsearch is a distributed search and analytics engine, a scalable data store and a vector database optimised for speed and relevance on production-scale workloads. It is the foundation of Elastic's open stack, searching near real time over large datasets, performing vector search, and serving the retrieval and analytics workloads the README lists: augmented generation for RAG, general and full-text search, logs, metrics, application performance monitoring and security logs. The simplest setup is a managed deployment on Elastic Cloud; self-managed installs are documented separately for local development, with the repository carrying an explicit warning that the local Docker script is not for production.

## Why It's in the Arsenal

The recurring retrieval decision is whether hybrid queries need two systems. A vector index finds semantically similar text and a lexical index finds the exact identifier, the product code, the error string; running both means a second store, a second consistency problem and a fusion step whose behaviour you have to tune. Elasticsearch puts both in one inverted index with the same shard model and the same query DSL, so hybrid retrieval is a query rather than a distributed-systems project.

## Key Features

- Inverted index plus vector fields in one engine, so hybrid scoring needs no second store and no consistency layer.
- Mature distributed design with sharding, replicas and near-real-time refresh that has decades of production use.
- Aggregation engine built in, which turns search results into dashboards without a separate OLAP system.
- Broad platform coverage: the same engine serves RAG, logs, metrics, APM and security analytics.

## Architecture / How It Works

Documents are indexed into sharded Lucene segments with an inverted index mapping terms to postings lists, which is what makes exact-term lookup fast and aggregations cheap. Refresh intervals trade query visibility against indexing throughput, and near-real-time search is the consequence of that design rather than a feature bolted on. Vector fields are stored alongside text in the same documents and scored in the same query, so hybrid scoring combines term relevance with k-nearest-neighbour similarity without a second index. Shards and replicas are managed across nodes for availability and throughput.

## Getting Started

For local work the README points at a Docker script for Elasticsearch plus Kibana, with an explicit warning that it is for development and testing only:

```bash
docker run -d --name es01 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:latest
curl -s localhost:9200
```

Production should use a managed deployment on Elastic Cloud rather than this single-node setup.

## Use Cases

1. Hybrid retrieval for a RAG system where exact term matches and semantic matches must be combined in one query.
2. Log and security analytics, which the README lists as first-class use cases enabled by the same engine.
3. Aggregated search dashboards: facet counts, histograms and rollups computed inside the same index as the results.
4. Vector similarity search alongside metadata filtering, which is the pattern most production RAG systems converge on.

## Strengths

It competes with OpenSearch, Solr and the dedicated vector databases in content/projects/data-and-retrieval such as Qdrant and Milvus, and the decisive difference is breadth: Elasticsearch is a general search and analytics platform where vectors are one field type among many, while those are purpose-built vector stores. It overlaps with content/tools/data-ingestion entries as an indexing destination for crawled content. Compared with a pure vector database it wins on lexical precision and aggregations and loses on vector-specific throughput at extreme scale, so the choice depends on which query dominates.

## Limitations / When NOT to Use

The GitHub license field reports NOASSERTION, and the source-available licensing model means you must confirm the terms for your distribution model before deploying it in a product. Operationally a cluster is JVM, heap sizing and shard lifecycle, and the README's own local-setup warning is explicit that the quickstart path is not production-shaped. Indexing is eventually consistent through the refresh interval, so a read-after-write query can miss a document. And for pure vector workloads at high throughput, a specialised store will usually beat it on cost per query.

## Integration Patterns

This is the general-purpose search and vector-database entry in content/tools/data-ingestion. Read it against the specialised vector stores in content/projects/data-and-retrieval such as pgvector, Qdrant and Milvus when the workload is purely embedding similarity, and against the crawling entries such as Crawl4AI where ingestion feeds its index. Its hybrid retrieval story is also the mechanism behind several RAG architectures compared in content/projects/benchmarks-and-evals.

## Resources

- [GitHub — elastic/elasticsearch](https://github.com/elastic/elasticsearch)
- [Product page — elastic.co/products/elasticsearch](https://www.elastic.co/products/elasticsearch)
- [Local development setup script](https://github.com/elastic/elasticsearch/blob/main/run-elasticsearch-locally.asciidoc)

## Buzz & Reception

One inverted index with vector search and aggregations in the same cluster, so hybrid lexical-plus-embedding retrieval runs against a single query surface.
