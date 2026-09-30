---
id: qdrant
name: Qdrant
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Rust vector database for high-performance similarity search with filtering and hybrid search
github_url: "https://github.com/qdrant/qdrant"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: null
tags: [rag, embeddings, retrieval, self-hosted]
maturity: production
cost_model: open-source
github_stars: 32155
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://qdrant.tech/documentation/"
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
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Open-source vector database written in Rust, positioned as a performance-focused, self-hostable alternative with a strong managed-cloud option
best_for:
  - You want a self-hostable, open-source vector database with strong performance (Rust implementation) and both a free self-hosted path and a managed cloud option
  - You need rich payload filtering combined with vector search (Qdrant's filtering is a frequently cited strength) for use cases beyond pure nearest-neighbor lookup
avoid_if:
  - You need the absolute simplest embedded/zero-infrastructure setup for prototyping — Chroma or LanceDB have a lower barrier to entry for that specific use case
  - You're already committed to a different database for other reasons and want to minimize the number of systems you operate — pgvector might let you avoid adding a new dedicated system entirely
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "production-proven requires third-party adoption evidence; only technical/how-to production-tuning content was found (Qdrant's own blog, third-party config guides), not a named-customer case study. Not claimed. Last reviewed: 2026-07-01."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source vector database written in Rust, offering both self-hosted and managed cloud deployment options, with a particular emphasis on performance and rich payload/metadata filtering alongside vector similarity search.

## Why it's in the Arsenal

The case for Qdrant rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Implemented in Rust for performance, using HNSW-based approximate nearest-neighbor indexing combined with a payload filtering engine that can apply complex boolean/range filters efficiently alongside vector search, plus support for sharding and replication for horizontal scaling.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note as a dependency, though widely used as a RAG retrieval backend. Competing: Milvus and Weaviate at similar scale/feature scope; Chroma/LanceDB for simpler embedded use cases. Complementary: integrates with LangChain, LlamaIndex, and Haystack as a standard vector store backend.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of Qdrant is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What dominates the decision**: `self-hostable`, `open-source`, `vector`, `database` are the variables that actually move the outcome for Qdrant in this phase, and none of them appear in a feature comparison.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- The implementation detail worth checking before adopting Qdrant is specific — implemented in Rust for performance, using HNSW-based approximate nearest-neighbor indexing combined with a payload filtering engine that can apply complex boolean/range filters efficiently alongside vector search, plus support for sharding and replication for horizontal scaling — because that is where the capability claim either survives contact with your data or does not.
- It is a data-and-retrieval entry in this catalog, so the comparison that matters is against the other data-and-retrieval projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for Qdrant is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running Qdrant against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside Qdrant here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

This is the data-and-retrieval entry for Qdrant in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/qdrant/qdrant)
- [Documentation](https://qdrant.tech/documentation/)
