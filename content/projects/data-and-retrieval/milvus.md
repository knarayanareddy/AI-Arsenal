---
id: milvus
name: Milvus
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: "Distributed vector database in Go and C++ with HNSW and DiskANN indexes plus a single-binary Lite mode"
github_url: "https://github.com/milvus-io/milvus"
license: Apache-2.0
primary_language: Go
org_or_maintainer: null
tags: [retrieval, data, kubernetes, self-hosted]
maturity: production
cost_model: open-source
github_stars: 46274
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://milvus.io"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain: [language, multimodal]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained, production-proven]
ecosystem_role:
  - Distributed, horizontally-scalable vector database designed from the ground up for billion-scale vector search, a CNCF-adjacent project backed by Zilliz
best_for: ["You need a vector index that outgrew a single machine, because the architecture is fully distributed and K8s-native with horizontal scaling and real-time streaming updates.", "You have a corpus too large for RAM, since DiskANN is in the topic set alongside HNSW, which is the disk-based index for that case.", "You want one dependency from prototype to cluster, because Milvus Lite installs from pip for a quickstart while the same project runs as a distributed service."]
avoid_if: ["You want an embedded library with no server, because the quickstart path is a real service even in Standalone mode, and only Milvus Lite avoids that.", "You are choosing on benchmark claims alone, because the performance figures in the ecosystem come from vendor comparisons rather than a neutral harness.", "You need a permissive licence with no foundation governance, because the project is under the LF AI and Data Foundation with a single major contributor vendor."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Milvus has a long production track record (predating the LLM/RAG wave, originally built for general large-scale similarity search) and is backed by Zilliz, which also offers a managed cloud version — this combination of open-source maturity plus commercial backing gives strong production-proven signal.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://cloud.google.com/customers/zilliz","date":"2025-06-19","description":"Google Cloud case study: Milvus/Zilliz Cloud reported over 10,000 global enterprise customers by end of 2024, running production semantic search, RAG, and agentic workloads"}
featured: false
status: active
---

## Overview

Milvus is a vector database built for scale, written in Go and C++ with hardware acceleration for both CPU and GPU. It stores and searches unstructured data - text, images, multimodal payloads - organised as collections of vectors with attached metadata. The architecture is fully distributed and Kubernetes-native, so it scales horizontally, handles tens of thousands of concurrent search queries over billions of vectors, and keeps data fresh with real-time streaming ingestion. It also supports Standalone mode on a single machine, and Milvus Lite is a lightweight build installable with pip for quickstarts. The index options cover the usual ground plus DiskANN for the out-of-core case. The project sits under the LF AI and Data Foundation, is Apache-2.0, and is offered as a managed service through Zilliz Cloud with serverless, dedicated and bring-your-own-cloud options.

## Why it's in the Arsenal

The decision it addresses is the point where a vector index stops fitting on one box. Single-node embedded stores are simpler and faster until the corpus, the write rate or the concurrent query load makes a single process the bottleneck - and at that point you are doing a migration under load. Milvus's answer is to be the same software at both scales, with partitioning and streaming ingestion built in rather than bolted on, so the operational story is horizontal scale and a distributed deployment rather than a rewrite. The trade is complexity proportional to that capability: a distributed vector database is a system you have to operate, size and observe.

## Architecture

The engine is split into Go for the distributed coordination and service layer and C++ for the compute and index layer, with hardware acceleration paths for both CPU and GPU. Collections are partitioned, which is what makes a distributed scan and a scoped retrieval both possible, and streaming ingestion keeps a write path separate from bulk load so index freshness is not a batch concern. Index choice is the main performance lever: HNSW in memory for the hot case, DiskANN on disk for the large one, with the graph structure maintained as vectors arrive. The client is pymilvus, exposing a MilvusClient for the common path, and the same project ships a Lite variant that runs in-process so the code you write locally is close to what you run in the cluster.

## Ecosystem Position

Milvus competes with qdrant and the other distributed stores in content/projects/data-and-retrieval, and the honest comparison is that qdrant is Rust and simpler to operate while Milvus has the longer history of running very large clusters and a broader index menu including DiskANN. It overlaps with zvec in the same folder, which targets the embedded case where Milvus would be oversized, and with the local retrieval entries a small team would use instead. Compared with a hosted vector service, running it yourself means owning capacity planning for a distributed system. It complements rather than replaces the embedding models in content/projects/model-layer and the ingestion tools that produce the vectors, and the RAG frameworks in content/projects/frameworks are its most common consumers.

## Getting Started

Install the Python SDK and connect a client; the Lite build is the pip-installable path for a quickstart:

```bash
pip install -U pymilvus
```

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")
```

A local server runs from the project docker-compose, and a fully managed alternative is available on Zilliz Cloud with a free tier for evaluation.

## Key Use Cases

1. Large-scale similarity search: index billions of vectors and serve tens of thousands of concurrent queries from a horizontally scaled cluster.
2. Streaming freshness: keep an index current from a live event stream rather than rebuilding on a batch schedule, so new content is queryable immediately.
3. Disk-resident index: use the DiskANN path for a corpus that no longer fits in memory, trading some latency for capacity.

## Strengths

- One codebase from a pip-installed Lite quickstart to a distributed Kubernetes deployment, so prototype and production are the same software.
- Index menu includes a disk-based option for corpora beyond RAM, not only the in-memory graph every other store ships.
- GPU and CPU acceleration paths in C++ alongside a Go service layer, which is the combination that makes very large indexes practical.
- Apache-2.0 under a foundation, so governance is not a single vendor's roadmap.

## Limitations

A distributed vector database is a system to operate: capacity planning, partition configuration, monitoring and upgrades are all your work, and the operational cost is real even at moderate scale. The architecture is Go plus C++ with Kubernetes as the assumed deployment, which is a heavier assumption than a single binary or an embedded library. Performance comparisons in this space are largely vendor-run, and the index-selection logic interacts with your data distribution in ways that require benchmarking on your own corpus. Being the older and larger of the two dominant open vector stores, it also carries more surface area - more configuration, more components - than the Rust alternatives.

## Relation to the Arsenal

This is a data-and-retrieval phase entry and the distributed-scale counterpoint to the embedded stores in the same folder such as lancedb and zvec. Read it against qdrant for the Rust-versus-Go operational comparison, and against the Lite-versus-cluster decision the project itself frames. Upstream of it sit the ingestion tools in content/tools/data-ingestion and the embedding models in content/projects/model-layer; downstream sit the RAG frameworks in content/projects/frameworks and the eval tooling in content/projects/benchmark-and-eval where you would measure recall rather than trust a throughput number.

## Resources

- [GitHub - milvus-io/milvus](https://github.com/milvus-io/milvus)
- [Project site and docs](https://milvus.io)
- [Zilliz Cloud managed service](https://zilliz.com/cloud)
