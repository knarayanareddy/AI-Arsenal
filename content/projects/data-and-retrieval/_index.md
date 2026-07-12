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

- [Apache Arrow](./apache-arrow.md)
- [Chandra](./chandra-ocr.md)
- [Cognita](./cognita.md)
- [DeepSearcher](./deep-searcher.md)
- [DuckDB](./duckdb.md)
- [EasyOCR](./easyocr.md)
- [FastGPT](./fastgpt.md)
- [Hugging Face Tokenizers](./hf-tokenizers.md)
- [LaTeX-OCR (pix2tex)](./latex-ocr.md)
- [LEANN](./leann.md)

### Most Popular

- [Firecrawl](./firecrawl.md) — ⭐ 132342
- [PaddleOCR](./paddleocr.md) — ⭐ 85010
- [RAGFlow](./ragflow.md) — ⭐ 82655
- [Tesseract OCR](./tesseract-ocr.md) — ⭐ 75262
- [Supabase](./supabase.md) — ⭐ 74300
- [Crawl4AI](./crawl4ai.md) — ⭐ 68406
- [AnythingLLM](./anything-llm.md) — ⭐ 62924
- [Docling](./docling.md) — ⭐ 61495
- [Pathway LLM App](./pathway-llm-app.md) — ⭐ 59063
- [Milvus](./milvus.md) — ⭐ 44762

### Browse All

- [AnythingLLM](./anything-llm.md) — All-in-one desktop and server RAG application — drop in documents, pick any LLM and vector DB, chat with citations, no code required
- [Apache Arrow](./apache-arrow.md) — A universal columnar in-memory format and multi-language toolbox that enables zero-copy data interchange between analytics and ML tools across process and
- [Chandra](./chandra-ocr.md) — An OCR model from Datalab that handles complex tables, forms, and handwriting with full layout understanding, output as structured Markdown/HTML/JSON
- [Chroma](./chroma.md) — Developer-friendly embeddings database for local AI apps, prototypes, and lightweight RAG
- [cleanlab](./cleanlab.md) — Data-centric AI library that finds label errors, outliers, and low-quality examples in any dataset via confident-learning statistics on predictions
- [Cognee](./cognee.md) — Memory engine that replaces naive RAG with ECL pipelines combining knowledge graphs and embeddings over documents and conversations
- [Cognita](./cognita.md) — A modular, production-oriented RAG framework from TrueFoundry that organizes ingestion, embedding, retrieval, and serving into configurable
- [Crawl4AI](./crawl4ai.md) — Open-source crawler and scraper designed to produce LLM-friendly web content
- [Daft](./daft.md) — High-performance data engine for AI and multimodal workloads across images, audio, video, and structured data
- [DataChain](./datachain.md) — Typed and versioned context layer for unstructured data across S3, GCS, and Azure
- [DeepSearcher](./deep-searcher.md) — An open deep-research framework from Zilliz that reasons over private data by iteratively planning sub-queries, searching a vector store
- [Deep Lake](./deeplake.md) — AI data runtime with multimodal storage, retrieval, training, and agent-oriented data access
- [Docling](./docling.md) — IBM-origin open-source toolkit for parsing and exporting documents for generative AI
- [DuckDB](./duckdb.md) — An in-process analytical SQL database that runs fast columnar OLAP queries directly on files (Parquet, CSV, Arrow) without a server
- [EasyOCR](./easyocr.md) — A ready-to-use Python OCR library supporting 80+ languages with a CRAFT text detector and a CRNN recognizer, requiring no training to run
- [FastGPT](./fastgpt.md) — Open-source knowledge-base and RAG platform with visual workflow orchestration for building question-answering and agent applications over your own data
- [Firecrawl](./firecrawl.md) — Open-source and hosted web scraping API that turns websites into LLM-ready markdown/data
- [Graphiti](./graphiti.md) — Framework for building real-time, temporally-aware knowledge graphs that serve as queryable memory for agents
- [GraphRAG](./graphrag.md) — Microsoft's knowledge-graph RAG — LLM-extracted entity graphs with hierarchical community summaries that answer global questions vector RAG can't
- [Hugging Face Tokenizers](./hf-tokenizers.md) — Hugging Face's fast Rust-backed tokenizers library for training and running BPE, WordPiece, and Unigram tokenizers with full alignment tracking
- [LanceDB](./lancedb.md) — Developer-friendly embedded and serverless vector database for multimodal AI retrieval
- [LangExtract](./langextract.md) — Python library for grounded structured extraction from unstructured text with source spans and visualization
- [LaTeX-OCR (pix2tex)](./latex-ocr.md) — A vision-transformer model that converts images of mathematical equations into LaTeX code, with CLI, GUI, and API interfaces
- [LEANN](./leann.md) — A storage-efficient vector index for on-device RAG that reportedly cuts index size by ~97% via graph-based selective recomputation instead of storing all
- [LightRAG](./lightrag.md) — Graph-based RAG that builds an entity/relationship knowledge graph over your corpus and does dual-level (local + global) retrieval
- [Liteparse](./liteparse.md) — A fast open-source document parser from LlamaIndex, written in Rust, that converts PDFs and documents into structured, LLM-ready output
- [LlamaParse](./llamaparse.md) — Managed document parser from LlamaIndex for turning complex files into RAG-ready text
- [Marker](./marker.md) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- [Milvus](./milvus.md) — Cloud-native vector database for large-scale ANN search and production vector workloads
- [NeMo Data Designer](./nemo-data-designer.md) — Toolkit for generating synthetic data from scratch or seed data with configurable schemas, constraints, and model providers
- [OCRmyPDF](./ocrmypdf.md) — A command-line tool that adds a searchable OCR text layer to scanned PDFs using Tesseract while preserving the original page images and metadata
- [Onyx (formerly Danswer)](./onyx.md) — Self-hosted enterprise search and chat over 40+ workplace connectors (Slack, Drive, Confluence, Jira...) with permissions-aware retrieval
- [Orama](./orama.md) — A tiny TypeScript search engine and RAG pipeline that runs full-text, vector, and hybrid search in the browser, on the server
- [PaddleOCR](./paddleocr.md) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
- [PageIndex](./pageindex.md) — Vectorless, reasoning-based document indexing system for structured retrieval over long documents
- [Pathway LLM App](./pathway-llm-app.md) — Ready-to-run RAG and AI pipeline templates that stay synchronized with live enterprise data sources
- [pgvector](./pgvector.md) — PostgreSQL extension for vector similarity search inside an existing relational database
- [Pinecone](./pinecone-vector-db.md) — Managed vector database service for production semantic search and RAG applications
- [Pixeltable](./pixeltable.md) — Unified multimodal backend for AI data apps with tables, computed columns, media, and model functions
- [Polars](./polars.md) — A fast, multi-threaded DataFrame library in Rust with a lazy query optimizer and Arrow memory model, a high-performance alternative to pandas for AI/ML data
- [PyMuPDF](./pymupdf.md) — A high-performance Python library binding the MuPDF engine for fast text, image, and table extraction and manipulation of PDFs and other document formats
- [Qdrant](./qdrant.md) — Rust vector database for high-performance similarity search with filtering and hybrid search
- [RAGFlow](./ragflow.md) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities
- [SentencePiece](./sentencepiece.md) — Google's unsupervised text tokenizer and detokenizer implementing BPE and unigram models directly on raw text, widely used to train tokenizers for LLMs and NMT
- [SimpleMem](./simplemem.md) — Efficient lifelong memory framework for text and multimodal LLM agents
- [Supabase](./supabase.md) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- [SurrealDB](./surrealdb.md) — Multi-model database combining graph, document, vector, and time-series for AI agents
- [Surya](./surya.md) — Modern OCR toolkit with 90+ language text recognition, layout analysis, reading-order detection, and table recognition — the models behind Marker
- [Tesseract.js](./tesseract-js.md) — A pure-JavaScript OCR library that runs Tesseract compiled to WebAssembly in the browser and Node, supporting 100+ languages without a server
- [Tesseract OCR](./tesseract-ocr.md) — The long-standing open-source OCR engine that recognizes text in 100+ languages using an LSTM line recognizer, widely used as the default OCR backend
