---
id: "choose-vector-db"
title: "Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed"
category: "data-strategy"
decision_type: "fork"
decision_summary: "Choose vector storage by your existing database, scale, and operational appetite — pgvector if you already run Postgres, an embedded store for prototypes, a self-hosted engine for production control, or a managed service to minimize ops."
tags:
  - rag
  - embeddings
  - retrieval
  - self-hosted

approaches:
  - name: "Postgres-Native (pgvector)"
    description: "Add the pgvector extension to an existing PostgreSQL instance, storing embeddings as a column type alongside relational data rather than in a separate system."
    when_to_use:
      - "You already operate Postgres in production and want to avoid adding a new database system for vectors alone"
      - "Vector workload is moderate scale (roughly under 10 million vectors) and doesn't need vector-DB-specific features like advanced payload filtering at very large scale"
      - "You want vectors and relational metadata to live in the same transactional system, simplifying joins and consistency"
    when_not_to_use:
      - "Scale exceeds what a single Postgres instance comfortably handles for vector workloads (tens of millions of vectors with high query throughput)"
      - "You need vector-DB-specific features (multi-vector search, advanced sparse+dense hybrid search) that pgvector doesn't implement as natively as a dedicated engine"
    tradeoffs:
      cost: "No new infrastructure if Postgres is already running; incremental cost is storage and compute on the existing instance."
      complexity: "Lowest of any option if Postgres is already operated by your team — one fewer system to run, monitor, and back up."
      scalability: "Adequate to roughly 10M vectors on typical hardware; beyond that, dedicated vector engines generally outperform on both latency and operational ease at scale."
      reliability: "Inherits Postgres's mature backup/replication/HA tooling — a meaningful advantage over adding a newer, less battle-tested system."

  - name: "Embedded / Local (Chroma, LanceDB)"
    description: "An embedded or lightweight vector store that runs in-process or as a simple local service, requiring minimal setup and no separate infrastructure to operate."
    when_to_use:
      - "Prototyping, local development, or small-scale applications (roughly under 1 million vectors)"
      - "You want zero operational overhead and are not yet committed to a production scale or feature set"
    when_not_to_use:
      - "You need production-grade concurrent write throughput, replication, or multi-node scale"
      - "Multiple services need concurrent access to the same index with strong consistency guarantees"
    tradeoffs:
      cost: "Free and minimal — no separate infrastructure to provision or pay for."
      complexity: "Lowest setup complexity of any option — often a single pip install and a local directory."
      scalability: "Limited — designed for prototypes and single-node use, not for large-scale production concurrent access."
      compute-requirements: "Runs comfortably on a laptop or a single small server."

  - name: "Self-Hosted Production (Qdrant, Weaviate)"
    description: "A dedicated, self-operated vector database designed for production workloads, offering advanced filtering, hybrid search, and horizontal scale beyond what embedded or Postgres-native options provide."
    when_to_use:
      - "Production self-hosted retrieval where you need advanced metadata filtering, multitenancy, or hybrid (dense+sparse) search"
      - "Scale is in the 1M-100M vector range with meaningful query throughput requirements"
      - "You have the operational capacity to run and monitor a dedicated database system"
    when_not_to_use:
      - "You want to avoid operating a new database system entirely — a managed option removes this burden at a cost"
      - "Your scale and feature needs are already well served by pgvector, and you don't need the additional complexity"
    tradeoffs:
      cost: "Self-hosting compute/storage cost, but no per-query vendor fee — often cheaper at sustained scale than managed alternatives."
      complexity: "Higher than pgvector or embedded options — requires dedicated operational ownership (monitoring, upgrades, backup) of a new system."
      scalability: "Designed for production scale (millions to tens of millions of vectors) with horizontal scaling paths."
      flexibility: "High — advanced filtering, hybrid search, and multitenancy features purpose-built for retrieval workloads."

  - name: "Managed (Pinecone, Qdrant Cloud, Weaviate Cloud, Zilliz)"
    description: "A hosted, fully managed vector database service, trading operational control for minimal ops burden."
    when_to_use:
      - "You want to minimize the operational surface area your team owns, and are willing to pay a premium for that"
      - "Team size or expertise doesn't support operating a dedicated database system in-house"
    when_not_to_use:
      - "Cost sensitivity at very large scale makes the managed premium prohibitive versus self-hosting the same engine"
      - "Data residency or compliance requirements preclude storing vectors on third-party infrastructure"
    tradeoffs:
      cost: "Usage-based pricing that is typically higher per-vector than self-hosting the equivalent engine at sustained scale, in exchange for near-zero ops burden."
      complexity: "Lowest operational complexity among production-grade options — no infrastructure to run."
      reliability: "Vendor-managed SLA and infrastructure, removing your team's operational risk but introducing vendor dependency risk instead."

  - name: "Distributed at Scale (Milvus / Zilliz)"
    description: "A vector database purpose-built for very large-scale, distributed vector workloads beyond what a single-node or moderately-scaled self-hosted engine handles well."
    when_to_use:
      - "Scale exceeds roughly 100 million vectors, or query throughput requires horizontal distribution across many nodes"
    when_not_to_use:
      - "Scale is well under 100M vectors — the added distributed-systems complexity is not justified below this range"
    tradeoffs:
      complexity: "Highest of all options — a distributed system requires meaningfully more operational expertise than a single-node engine."
      scalability: "Purpose-built for the largest vector workloads in this comparison, with horizontal scaling designed in from the start."

key_factors:
  - "Existing database investment: already running Postgres strongly favors pgvector unless scale/features force a move"
  - "Scale: under 1M vectors favors embedded options; 1M-100M favors self-hosted production engines; over 100M favors distributed systems like Milvus"
  - "Operational appetite: teams unwilling or unable to operate a new database system should weight managed options higher despite the cost premium"
  - "Feature needs: advanced hybrid search, multitenancy, or complex metadata filtering point toward Qdrant/Weaviate over pgvector or embedded options"
  - "Compliance/data residency: constraints here can rule out managed/hosted options regardless of their operational appeal"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing vector storage"] --> PG{"Already running Postgres in production?"}
      PG -->|"Yes, and scale is under ~10M vectors"| PGV["Use pgvector"]
      PG -->|"No, or scale/features exceed Postgres"| Hosting{"Prefer self-hosted or managed?"}
      Hosting -->|"Managed, minimize ops"| Managed["Use Pinecone, Qdrant Cloud, Weaviate Cloud, or Zilliz"]
      Hosting -->|"Self-hosted"| Scale{"Expected scale?"}
      Scale -->|"Under 1M vectors, prototype"| Embedded["Use Chroma or LanceDB"]
      Scale -->|"1M-100M, production"| Features{"Need advanced hybrid search / multitenancy / filtering?"}
      Features -->|"Yes, performance-critical filtering"| Qdrant["Use Qdrant"]
      Features -->|"Yes, schema-rich hybrid search"| Weaviate["Use Weaviate"]
      Features -->|"No strong feature need"| PGV
      Scale -->|"Over 100M, distributed"| Milvus["Use Milvus / Zilliz"]

confidence: "established"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Postgres-Native (pgvector)"
    project_ids:
      - pgvector
    tool_ids: []
    build_example_ids:
      - intermediate-document-qa-pipeline
  - approach_name: "Embedded / Local (Chroma, LanceDB)"
    project_ids:
      - chroma
      - lancedb
    tool_ids: []
    build_example_ids:
      - starter-basic-rag-chatbot
  - approach_name: "Self-Hosted Production (Qdrant, Weaviate)"
    project_ids:
      - qdrant
      - weaviate
    tool_ids: []
    build_example_ids:
      - intermediate-production-rag-api
  - approach_name: "Managed (Pinecone, Qdrant Cloud, Weaviate Cloud, Zilliz)"
    project_ids:
      - pinecone-vector-db
    tool_ids: []
    build_example_ids: []
  - approach_name: "Distributed at Scale (Milvus / Zilliz)"
    project_ids:
      - milvus
    tool_ids: []
    build_example_ids: []

related_decisions:
  - rag-vs-fine-tuning
  - choose-memory-solution

common_mistakes:
  - "Adopting a dedicated vector database before validating that pgvector (or even an embedded option) would have been sufficient — teams frequently add a new database system for a workload that would have fit comfortably in infrastructure they already operate and understand."
  - "Choosing a managed service for cost reasons at genuinely large sustained scale, where self-hosting the equivalent engine would be materially cheaper — the managed premium compounds significantly once vector counts and query volume grow, and the crossover point is worth calculating explicitly rather than assuming managed is always simpler-and-therefore-better."
  - "Selecting Milvus or another distributed system for a workload well under 100M vectors, importing distributed-systems operational complexity that the scale does not yet justify."
  - "Ignoring data residency or compliance constraints until after committing to a managed vendor, then discovering the constraint rules out that vendor's infrastructure entirely."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Vector database choice is one of the most common RAG architecture decisions, and it is also one of the easier ones to overthink: the right starting point is usually determined by two questions — what database infrastructure do you already operate, and what scale do you actually expect — not by a feature-by-feature comparison of every available engine.

## The Decision

Start with operational reality, not features. If your team already runs Postgres in production, pgvector removes an entire category of new-system operational risk and is the right default up to a meaningful scale (roughly 10 million vectors). If you don't have that starting point, the next fork is scale: prototypes and small applications are well served by embedded options with zero operational overhead, production workloads in the 1-100 million vector range justify a dedicated self-hosted engine with production features, and workloads beyond that scale justify the added complexity of a distributed system. Managed services are a valid choice at any scale point where minimizing operational ownership is worth a cost premium — this is a genuine, defensible tradeoff, not a fallback for teams who "couldn't figure out" self-hosting.

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic; condensed as a quick-reference table:

| Constraint | Recommended Start | Canonical Entry |
|---|---|---|
| Existing Postgres, moderate scale | pgvector | [pgvector](../../projects/data-and-retrieval/pgvector.md) |
| Fast local prototype | Chroma or LanceDB | [Chroma](../../projects/data-and-retrieval/chroma.md), [LanceDB](../../projects/data-and-retrieval/lancedb.md) |
| Self-hosted production, performance-critical filtering | Qdrant | [Qdrant](../../projects/data-and-retrieval/qdrant.md) |
| Self-hosted production, schema-rich hybrid search | Weaviate | [Weaviate](../../projects/data-and-retrieval/weaviate.md) |
| Managed, minimum ops | Pinecone / Qdrant Cloud / Weaviate Cloud | [Pinecone](../../projects/data-and-retrieval/pinecone-vector-db.md) |
| Large distributed scale (100M+ vectors) | Milvus / Zilliz | [Milvus](../../projects/data-and-retrieval/milvus.md) |

## Approach Deep-Dives

**Postgres-native (pgvector)** is the most operationally conservative choice for teams already running Postgres, and its ceiling (roughly 10M vectors on typical hardware) covers a large share of real-world RAG workloads — teams often overestimate how much scale they actually need before reaching for a dedicated engine. **Embedded/local options** (Chroma, LanceDB) exist specifically to remove setup friction for prototypes; they are not designed for concurrent production write throughput and should not be pushed past that boundary. **Self-hosted production engines** (Qdrant, Weaviate) earn their operational complexity when advanced filtering, hybrid search, or multitenancy are genuine requirements, not aspirational ones. **Managed services** trade a real cost premium for near-zero operational ownership — a legitimate choice for teams whose engineering capacity is better spent elsewhere, but one worth costing out explicitly against self-hosting at your actual projected scale. **Distributed systems** (Milvus/Zilliz) are justified specifically by scale beyond what a single-node engine handles well; adopting one earlier imports meaningful operational complexity for no corresponding benefit.

## Common Mistakes

- **Adopting a dedicated vector database before validating pgvector would have been insufficient.** This is the most common overinvestment in this decision — many workloads fit comfortably in infrastructure teams already operate.
- **Choosing managed for cost reasons at large sustained scale**, where the managed premium compounds significantly and self-hosting the equivalent engine would be cheaper — calculate the actual crossover point rather than assuming managed is simpler and therefore cheaper.
- **Selecting a distributed system (Milvus) for a workload well under 100M vectors**, importing operational complexity the scale doesn't justify.
- **Deciding on a managed vendor before checking data residency/compliance constraints**, then discovering the constraint rules the vendor out after commitment.

## When This Guidance Might Be Outdated

Confidence is rated `established` because the underlying tradeoffs (operational cost of self-hosting vs. managed premium, feature differentiation between engines) are relatively stable industry patterns rather than a fast-moving frontier — but the specific scale thresholds (10M for pgvector, 100M for distributed systems) are hardware- and version-dependent and should be re-verified against current pgvector/engine benchmarks roughly annually, since indexing algorithm improvements (HNSW tuning, quantization) can shift these numbers meaningfully over a year or two.

## Related Decisions

This decision is directly downstream of [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md) — vector storage only matters once RAG (or the hybrid approach) is chosen. It shares infrastructure concerns with [Choosing an Agent Memory Architecture](./choose-memory-solution.md), since semantic/vector memory uses the same class of storage as RAG retrieval, just with a different data lifecycle.

## Resources

- [pgvector](../../projects/data-and-retrieval/pgvector.md)
- [Chroma](../../projects/data-and-retrieval/chroma.md)
- [LanceDB](../../projects/data-and-retrieval/lancedb.md)
- [Qdrant](../../projects/data-and-retrieval/qdrant.md)
- [Weaviate](../../projects/data-and-retrieval/weaviate.md)
- [Pinecone](../../projects/data-and-retrieval/pinecone-vector-db.md)
- [Milvus](../../projects/data-and-retrieval/milvus.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
