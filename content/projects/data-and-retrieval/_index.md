---
title: "Data and Retrieval"
section: "projects/data-and-retrieval"
auto_generated: false
---

# Data and Retrieval

## What belongs here

Vector databases, embedding pipelines, document-processing/parsing tools, and full RAG platforms — the data layer that retrieval-augmented systems are built on.

## What does NOT belong here

RAG orchestration frameworks (LangChain, LlamaIndex, Haystack) belong in [Frameworks](../frameworks/_index.md); this folder is for the data storage/processing layer they sit on top of.

## Relation to the Tools vertical

Several entries here have a corresponding tool entry under `content/tools/data-ingestion/` covering usage-oriented job guidance (e.g. crawl4ai, firecrawl). Check each entry's `corresponding_tool_entry` field.

## Decision guidance

Before selecting a data/retrieval component:
- Key question to ask: do I need a dedicated vector database, or can I add vector search to a database I already operate (e.g. pgvector on existing PostgreSQL)?
- If you need usage guidance rather than architectural depth: see [tools/data-ingestion/](../../tools/data-ingestion/_index.md)
- See [Choose a Vector DB](../../architectures/decision-trees/choose-vector-db.md) for cross-cutting selection guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Data And Retrieval in This Phase

### Recently Added

- [Supabase](./supabase.md)
- [SurrealDB](./surrealdb.md)
- [Chroma](./chroma.md)
- [Crawl4AI](./crawl4ai.md)
- [Docling](./docling.md)
- [Firecrawl](./firecrawl.md)
- [LanceDB](./lancedb.md)
- [LlamaParse](./llamaparse.md)
- [Milvus](./milvus.md)
- [pgvector](./pgvector.md)

### Most Popular

- [Firecrawl](./firecrawl.md) — ⭐ 132342
- [RAGFlow](./ragflow.md) — ⭐ 82655
- [Supabase](./supabase.md) — ⭐ 74300
- [Crawl4AI](./crawl4ai.md) — ⭐ 68406
- [Docling](./docling.md) — ⭐ 61495
- [Milvus](./milvus.md) — ⭐ 44762
- [Qdrant](./qdrant.md) — ⭐ 32155
- [Chroma](./chroma.md) — ⭐ 28419
- [SurrealDB](./surrealdb.md) — ⭐ 28000
- [pgvector](./pgvector.md) — ⭐ 21738

### Browse All

- [Chroma](./chroma.md) — Developer-friendly embeddings database for local AI apps, prototypes, and lightweight RAG
- [Crawl4AI](./crawl4ai.md) — Open-source crawler and scraper designed to produce LLM-friendly web content
- [Docling](./docling.md) — IBM-origin open-source toolkit for parsing and exporting documents for generative AI
- [Firecrawl](./firecrawl.md) — Open-source and hosted web scraping API that turns websites into LLM-ready markdown/data
- [LanceDB](./lancedb.md) — Developer-friendly embedded and serverless vector database for multimodal AI retrieval
- [LlamaParse](./llamaparse.md) — Managed document parser from LlamaIndex for turning complex files into RAG-ready text
- [Milvus](./milvus.md) — Cloud-native vector database for large-scale ANN search and production vector workloads
- [pgvector](./pgvector.md) — PostgreSQL extension for vector similarity search inside an existing relational database
- [Pinecone](./pinecone-vector-db.md) — Managed vector database service for production semantic search and RAG applications
- [Qdrant](./qdrant.md) — Rust vector database for high-performance similarity search with filtering and hybrid search
- [RAGFlow](./ragflow.md) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities
- [Supabase](./supabase.md) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- [SurrealDB](./surrealdb.md) — Multi-model database combining graph, document, vector, and time-series for AI agents
- [Unstructured](./unstructured.md) — Open-source document ETL for converting complex files into structured data for LLM pipelines
- [Weaviate](./weaviate.md) — Open-source vector database combining object storage, vector search, filtering, and hybrid retrieval
