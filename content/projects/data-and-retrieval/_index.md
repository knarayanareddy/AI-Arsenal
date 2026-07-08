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

- [AnythingLLM](./anything-llm.md)
- [cleanlab](./cleanlab.md)
- [Cognee](./cognee.md)
- [Graphiti](./graphiti.md)
- [GraphRAG](./graphrag.md)
- [LightRAG](./lightrag.md)
- [Marker](./marker.md)
- [Onyx (formerly Danswer)](./onyx.md)
- [PaddleOCR](./paddleocr.md)
- [Surya](./surya.md)

### Most Popular

- [Firecrawl](./firecrawl.md) — ⭐ 132342
- [PaddleOCR](./paddleocr.md) — ⭐ 85010
- [RAGFlow](./ragflow.md) — ⭐ 82655
- [Supabase](./supabase.md) — ⭐ 74300
- [Crawl4AI](./crawl4ai.md) — ⭐ 68406
- [AnythingLLM](./anything-llm.md) — ⭐ 62924
- [Docling](./docling.md) — ⭐ 61495
- [Milvus](./milvus.md) — ⭐ 44762
- [LightRAG](./lightrag.md) — ⭐ 37469
- [Marker](./marker.md) — ⭐ 37280

### Browse All

- [AnythingLLM](./anything-llm.md) — All-in-one desktop and server RAG application — drop in documents, pick any LLM and vector DB, chat with citations, no code required
- [Chroma](./chroma.md) — Developer-friendly embeddings database for local AI apps, prototypes, and lightweight RAG
- [cleanlab](./cleanlab.md) — Data-centric AI library that finds label errors, outliers, and low-quality examples in any dataset via confident-learning statistics on predictions
- [Cognee](./cognee.md) — Memory engine that replaces naive RAG with ECL pipelines combining knowledge graphs and embeddings over documents and conversations
- [Crawl4AI](./crawl4ai.md) — Open-source crawler and scraper designed to produce LLM-friendly web content
- [Docling](./docling.md) — IBM-origin open-source toolkit for parsing and exporting documents for generative AI
- [Firecrawl](./firecrawl.md) — Open-source and hosted web scraping API that turns websites into LLM-ready markdown/data
- [Graphiti](./graphiti.md) — Framework for building real-time, temporally-aware knowledge graphs that serve as queryable memory for agents
- [GraphRAG](./graphrag.md) — Microsoft's knowledge-graph RAG — LLM-extracted entity graphs with hierarchical community summaries that answer global questions vector RAG can't
- [LanceDB](./lancedb.md) — Developer-friendly embedded and serverless vector database for multimodal AI retrieval
- [LightRAG](./lightrag.md) — Graph-based RAG that builds an entity/relationship knowledge graph over your corpus and does dual-level (local + global) retrieval
- [LlamaParse](./llamaparse.md) — Managed document parser from LlamaIndex for turning complex files into RAG-ready text
- [Marker](./marker.md) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- [Milvus](./milvus.md) — Cloud-native vector database for large-scale ANN search and production vector workloads
- [Onyx (formerly Danswer)](./onyx.md) — Self-hosted enterprise search and chat over 40+ workplace connectors (Slack, Drive, Confluence, Jira...) with permissions-aware retrieval
- [PaddleOCR](./paddleocr.md) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
- [pgvector](./pgvector.md) — PostgreSQL extension for vector similarity search inside an existing relational database
- [Pinecone](./pinecone-vector-db.md) — Managed vector database service for production semantic search and RAG applications
- [Qdrant](./qdrant.md) — Rust vector database for high-performance similarity search with filtering and hybrid search
- [RAGFlow](./ragflow.md) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities
- [Supabase](./supabase.md) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- [SurrealDB](./surrealdb.md) — Multi-model database combining graph, document, vector, and time-series for AI agents
- [Surya](./surya.md) — Modern OCR toolkit with 90+ language text recognition, layout analysis, reading-order detection, and table recognition — the models behind Marker
- [Unstructured](./unstructured.md) — Open-source document ETL for converting complex files into structured data for LLM pipelines
- [Weaviate](./weaviate.md) — Open-source vector database combining object storage, vector search, filtering, and hybrid retrieval
- [zvec](./zvec.md) — Lightweight, in-process vector database from Alibaba for local RAG and agent memory
