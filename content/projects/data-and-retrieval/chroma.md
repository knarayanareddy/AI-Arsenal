---
id: chroma
name: Chroma
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: "Developer-focused vector database with a four-function core API, automatic embedding and indexing, and a hosted cloud tier"
github_url: "https://github.com/chroma-core/chroma"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: null
tags: [embeddings, retrieval, rag]
maturity: production
cost_model: freemium
github_stars: 29404
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://docs.trychroma.com"
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
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Developer-friendly embedded/lightweight vector database, the most common default for RAG prototyping and small-to-medium production apps
best_for: ["You are prototyping a RAG feature and want a vector database working in a few lines, because the core API is four functions and embedding plus indexing happen automatically on add.", "You want to add your own embeddings instead of the built-in defaults, because the add call accepts either documents or precomputed vectors.", "You need metadata filtering on results, since the query path takes a where clause for metadata and a where_document clause for full-text containment."]
avoid_if: ["You need a mature distributed vector database with a proven scaling story, because the open-source Chroma is developer-oriented and the scaling claims belong to the hosted cloud tier.", "You want many concurrent production writers, because the embedded mode is explicitly for prototyping and the server deployment is the step beyond that.", "You need an open-source license with no proprietary component, because the hosted cloud service is a separate commercial product and the license field needs confirming."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Chroma is the most frequently used vector database in RAG tutorials, LangChain/LlamaIndex quickstarts, and starter templates across the ecosystem, which is strong practical-adoption evidence for the prototyping/small-scale niche it targets.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Chroma is a vector database aimed at developers, installable with pip or npm and runnable either in-process or as a client-server instance. The README's pitch is that the core API is only four functions, with get_collection, get_or_create_collection and delete_collection available alongside create. The add call is the interesting part: pass documents and Chroma handles tokenisation, embedding and indexing automatically, or pass your own embeddings and skip the built-in model. Metadata is a first-class argument on both add and query, with a where clause for metadata equality filters and a where_document clause for full-text containment inside the document text, and query returns the n nearest results for query_texts. On top of the open-source project sits Chroma Cloud, a hosted service described as serverless vector, hybrid and full-text search with a free credits entry point.

## Why it's in the Arsenal

The decision it removes is how many decisions you make before the first retrieval works. Most vector stores make you choose an embedding model, decide dimensionality, manage an index type and write a collection lifecycle before anything returns. Chroma collapses that: give it documents and it tokenises, embeds and indexes them, which means the first useful query is three lines rather than a configuration exercise. Keeping that ergonomics while remaining a real server is the design bet, and the where/where_document filter pair is the detail that matters later, because unfiltered nearest-neighbour search is rarely what a RAG system should ship.

## Architecture

The client owns the small API surface: create a client, create a collection, add documents with metadata and ids, and query with query_texts, n_results and optional filters. On add, the default path runs the embedding function over the text, produces vectors, and writes them into the collection's index along with the document and its metadata; supplying your own embeddings bypasses the built-in model entirely, which is the escape hatch for teams with a specific embedding requirement. Query executes a nearest-neighbour search over the collection and then applies the where metadata filter and the where_document containment filter, either of which can be omitted. Collections are the unit of organisation, with get, get_or_create and delete operations for lifecycle. The architecture has two deployment shapes: an in-process client for prototyping, which the README recommends because persistence can be added, and a client-server mode started with a run command against a database path, which is the production-shaped one. Chroma Cloud is the hosted equivalent with serverless vector, hybrid and full-text search.

## Ecosystem Position

Chroma competes with the other vector databases in content/projects/data-and-retrieval, and the differentiator is the developer ergonomics: four functions and automatic embedding versus a collection lifecycle and an index configuration you own. It overlaps with Qdrant and the embedded stores on the same workload, where the honest boundary is operational maturity and scaling rather than retrieval capability, since both do filtered nearest-neighbour search. It is not a full-text search engine, so it meets the search-engine entries in content/projects/data-ingestion only at the hosted tier, where hybrid and full-text search are named. Against a retrieval framework in content/projects/framework, Chroma is the store rather than the pipeline: you would use both, with the framework doing chunking and prompting and Chroma holding the vectors.

## Getting Started

Install the client and go from an in-process database to a query in a few lines:

```bash
pip install chromadb
# for client-server mode instead: chroma run --path /chroma_db_path
```

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("all-my-documents")
collection.add(
    documents=["This is document1", "This is document2"],
    metadatas=[{"source": "notion"}, {"source": "google-docs"}],
    ids=["doc1", "doc2"],
)
results = collection.query(query_texts=["What changed?"], n_results=2,
                           where={"source": "notion"})
```

The README links a Google Colab that runs the same snippet, and Chroma Cloud has a separate signup path if you would rather not operate the server.

## Key Use Cases

1. RAG prototyping: stand up a working vector search in minutes, then swap the in-process client for a server deployment when the workload is real.
2. Filtered retrieval: use the where metadata filter or where_document containment filter to restrict results by source or by text present in the document.
3. Bring your own embeddings: supply precomputed vectors to add so an existing embedding pipeline stays authoritative and Chroma only handles storage and search.

## Strengths

- Extremely small API surface, four functions, with get_or_create and delete available, so the concept count is genuinely low.
- Automatic tokenisation, embedding and indexing on add, with a documented path to supply your own vectors instead.
- Metadata filtering and full-text document containment in the query path, which most prototypes skip and most RAG systems need.
- Two deployment shapes, an in-process client and a client-server mode, plus a hosted cloud tier with hybrid and full-text search.

## Limitations

The in-process client is framed as being for easy prototyping, so the production shape is the server deployment and the operational work that comes with it, and the scaling story in the README belongs to the hosted cloud rather than the open-source project. Automatic embedding is convenient and a trap at the same time: it means the default path chooses a model for you, and switching models later means re-embedding everything you have added. Chroma is a vector store, not a search engine, so lexical and hybrid retrieval beyond the where_document filter is not what it is for. Chroma Cloud is a separate commercial product with its own pricing, and the license field on the repository should be confirmed rather than assumed.

## Relation to the Arsenal

This is the default vector store entry for content/projects/data-and-retrieval and the storage layer the retrieval frameworks in content/projects/framework expect to be handed. Compare it against the other vector databases in the same phase on operational maturity rather than on API shape, and against the search engines in content/projects/data-ingestion when lexical or hybrid retrieval is the actual requirement. The ingestion entries in the same phase supply the chunking and extraction that produces the documents you add. For hosted search at scale, the Chroma Cloud tier overlaps the managed options rather than replacing the self-hosted vector databases.

## Resources

- [GitHub — chroma-core/chroma](https://github.com/chroma-core/chroma)
- [Documentation — docs.trychroma.com](https://docs.trychroma.com)
- [Chroma Cloud signup](https://trychroma.com/signup)
