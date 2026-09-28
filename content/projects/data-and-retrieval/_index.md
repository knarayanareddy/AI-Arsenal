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

- [dolma](./allenai-dolma.md)
- [anysearch-mcp-server](./anysearch-mcp-server.md)
- [butterbase](./butterbase.md)
- [ClickHouse](./clickhouse-clickhouse.md)
- [codeseek](./codeseek.md)
- [cvat](./cvat-ai-cvat.md)
- [Scrapling](./d4vinci-scrapling.md)
- [DB-GPT](./eosphoros-ai-db-gpt.md)
- [feast](./feast-dev-feast.md)
- [FinSight-AI](./finsight-ai.md)

### Most Popular

- [Firecrawl](./firecrawl.md) — ⭐ 185940
- [PaddleOCR](./paddleocr.md) — ⭐ 85010
- [Crawl4AI](./crawl4ai.md) — ⭐ 84414
- [Scrapling](./d4vinci-scrapling.md) — ⭐ 84212
- [RAGFlow](./ragflow.md) — ⭐ 82655
- [Tesseract OCR](./tesseract-ocr.md) — ⭐ 75262
- [Supabase](./supabase.md) — ⭐ 74300
- [Docling](./docling.md) — ⭐ 68132
- [AnythingLLM](./anything-llm.md) — ⭐ 66555
- [TrendRadar](./trendradar.md) — ⭐ 62598

### Browse All

- [Airweave](./airweave.md) — Archived context-retrieval layer that continuously syncs apps and databases behind one LLM-friendly search API
- [dolma](./allenai-dolma.md) — Toolkit for generating, annotating, and inspecting OLMo pretraining data, with stage-wise tools and a decontamination pass
- [anysearch-mcp-server](./anysearch-mcp-server.md) — An MCP server exposing general and vertical web search, parallel batch queries, and full-page Markdown extraction over one hosted API
- [AnythingLLM](./anything-llm.md) — All-in-one local AI workspace for chatting with documents, running agents, and multi-user setups with minimal setup friction
- [Apache Arrow](./apache-arrow.md) — Apache Software Foundation columnar format, IPC serialization and Flight RPC underpinning in-memory data exchange
- [AutoRAG](./autorag.md) — AutoRAG 2.0 self-evolving librarian agent that searches across retrieval methods, opens sources to verify, and curates cited answers
- [butterbase](./butterbase.md) — A Postgres-backed backend-as-a-service with auth, storage, functions, an LLM gateway, and an MCP server for agents
- [Chandra](./chandra-ocr.md) — Document OCR model from Datalab that renders pages to HTML, Markdown or JSON with layout, and runs locally on Hugging Face or against a vLLM server
- [Chroma](./chroma.md) — Developer-focused vector database with a four-function core API, automatic embedding and indexing, and a hosted cloud tier
- [cleanlab](./cleanlab.md) — Data-centric AI library that finds label errors, duplicates and outliers using your own trained model's predictions
- [ClickHouse](./clickhouse-clickhouse.md) — Apache-2.0 columnar OLAP engine with vectorized execution, MergeTree storage, and sub-second scans over event and trace data
- [codeseek](./codeseek.md) — A Rust CLI that indexes seven languages with tree-sitter call graphs plus hybrid dense and sparse search, exposed as MCP tools
- [Cognee](./cognee.md) — Memory platform that turns documents, code and conversations into a self-hosted knowledge graph agents can query
- [Cognita](./cognita.md) — Archived RAG platform from TrueFoundry that wraps LangChain and LlamaIndex into a modular, API-driven, UI-configurable production structure
- [Crawl4AI](./crawl4ai.md) — Open-source crawler that turns any page into LLM-ready Markdown, runnable locally or through a hosted API with MCP
- [cvat](./cvat-ai-cvat.md) — Web platform for annotating images, video, and 3D scenes with review workflows, consensus, and AI-assisted labeling
- [Scrapling](./d4vinci-scrapling.md) — BSD-3-Clause adaptive scraping framework that detects blocking, escalates to a stealth browser, and re-locates selectors when markup shifts
- [Daft](./daft.md) — Python-native distributed data engine in Rust that processes images, audio, video and structured data together with LLM and embedding operations
- [DataChain](./datachain.md) — Versioned, typed dataset layer over S3, GCS and Azure with local query and an agent-facing knowledge base
- [DeepSearcher](./deep-searcher.md) — Deep research agent that searches a private corpus in Milvus and writes a cited report from the retrieved evidence
- [Deep Lake](./deeplake.md) — Storage format and database for AI holding embeddings, media, text and annotations with vector search, versioning and lineage
- [docext](./docext.md) — On-premises document toolkit using vision-language models for image-to-markdown conversion, key information extraction, and IDP benchmarking
- [Docling](./docling.md) — IBM-originated document parser producing a unified DoclingDocument with layout, tables, formulas and OCR
- [DuckDB](./duckdb.md) — In-process analytical SQL engine that queries Parquet and CSV files directly from the FROM clause
- [EasyOCR](./easyocr.md) — Ready-to-use Python OCR package with 80-plus supported languages, a Gradio web demo, and a simple reader API
- [DB-GPT](./eosphoros-ai-db-gpt.md) — Agentic data platform connecting LLMs to enterprise databases via text-to-SQL, RAG, and multi-agent roles
- [FastGPT](./fastgpt.md) — Knowledge-base and visual workflow platform for LLM apps with RAG retrieval, data processing and Flow orchestration
- [feast](./feast-dev-feast.md) — Declarative feature definitions in a registry, materialized offline for training and materialized online for low-latency serving reads
- [FinSight-AI](./finsight-ai.md) — A Spring Boot equity-research workspace with recoverable workflows, snapshot-bound reports, and hybrid pgvector retrieval
- [Firecrawl](./firecrawl.md) — Web data API with search, scrape, crawl and map endpoints, AGPL-licensed and also sold as a hosted service
- [FlashRAG](./flashrag.md) — Python toolkit for modular RAG research with retrievers, rerankers, generators, datasets, and benchmark pipelines
- [Graphiti](./graphiti.md) — Framework for temporal knowledge graphs that track how facts change over time with provenance, incremental updates and hybrid retrieval
- [GraphRAG](./graphrag.md) — Microsoft's knowledge-graph RAG — LLM-extracted entity graphs with hierarchical community summaries that answer global questions vector RAG can't
- [Hugging Face Tokenizers](./hf-tokenizers.md) — Hugging Face's fast Rust-backed tokenizers library for training and running BPE, WordPiece, and Unigram tokenizers with full alignment tracking
- [datasets](./huggingface-datasets.md) — Loads, caches, and streams Hugging Face Hub corpora as Arrow-backed map-style or iterable datasets
- [huggingface_hub](./huggingface-huggingface-hub.md) — Official Python client and CLI for the Hugging Face Hub, covering download, upload, cache management, and repo operations
- [colpali](./illuin-tech-colpali.md) — Vision-language retrieval models that index document page images directly with one embedding per image patch instead of OCR text
- [infinity](./infiniflow-infinity.md) — C++ database that runs dense, sparse, tensor, and full-text search plus relational filtering in a single engine over one table
- [ktx](./ktx.md) — An executable context layer that ingests warehouse metadata and company docs, then serves approved metrics as read-only SQL to agents
- [LanceDB](./lancedb.md) — Embedded multimodal lakehouse on the Lance columnar format, with vector, full-text and SQL search in one engine
- [LangExtract](./langextract.md) — Python library for grounded structured extraction from unstructured text with source spans and visualization
- [LaTeX-OCR (pix2tex)](./latex-ocr.md) — A vision-transformer model that converts images of mathematical equations into LaTeX code, with CLI, GUI, and API interfaces
- [LEANN](./leann.md) — Vector index that recomputes embeddings on demand, claiming 97 percent storage savings without accuracy loss
- [LightRAG](./lightrag.md) — Graph-based RAG that builds an entity/relationship knowledge graph over your corpus and does dual-level (local + global) retrieval
- [Liteparse](./liteparse.md) — A fast open-source document parser from LlamaIndex, written in Rust, that converts PDFs and documents into structured, LLM-ready output
- [LlamaParse](./llamaparse.md) — Deprecated SDK repository for LlamaParse, the managed document-parsing and knowledge-agent service
- [Marker](./marker.md) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- [MemoryOS](./memoryos.md) — EMNLP 2025 memory operating system for personalized agents with hierarchical storage and retrieval
- [DiskANN](./microsoft-diskann.md) — Disk-based approximate-nearest-neighbour index with filtered search, built for vector collections larger than one machine's memory
- [Milvus](./milvus.md) — Distributed vector database in Go and C++ with HNSW and DiskANN indexes plus a single-binary Lite mode
- [NeMo Data Designer](./nemo-data-designer.md) — Toolkit for generating synthetic data from scratch or seed data with configurable schemas, constraints, and model providers
- [hnswlib](./nmslib-hnswlib.md) — Header-only C++ HNSW implementation with Python bindings, tunable memory versus recall, and no server or daemon
- [OCRmyPDF](./ocrmypdf.md) — A command-line tool that adds a searchable OCR text layer to scanned PDFs using Tesseract while preserving the original page images and metadata
- [Onyx (formerly Danswer)](./onyx.md) — Self-hostable enterprise context layer that indexes 50-plus connected apps with permissions preserved
- [open-connector](./open-connector.md) — A self-hostable connector gateway exposing 1500-plus SaaS providers and 10000-plus actions through SDK, CLI, MCP, and OpenAPI
- [opendataloader-pdf](./opendataloader-project-opendataloader-pdf.md) — Apache-2.0 Java PDF parser producing tagged, structured output for LLM ingestion while also repairing PDFs for accessibility
- [Orama](./orama.md) — A tiny TypeScript search engine and RAG pipeline that runs full-text, vector, and hybrid search in the browser, on the server
- [PaddleOCR](./paddleocr.md) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
- [PageIndex](./pageindex.md) — Vectorless, reasoning-based document indexing system for structured retrieval over long documents
- [Pathway LLM App](./pathway-llm-app.md) — Ready-to-run RAG and AI pipeline templates that stay synchronized with live enterprise data sources
- [pgvector](./pgvector.md) — PostgreSQL extension for vector similarity search inside an existing relational database
- [Pinecone](./pinecone-vector-db.md) — Official Python client for the Pinecone managed vector database, with a schema-declared document index as the current API
- [PixelRAG](./pixelrag.md) — Renders documents as screenshot tiles and retrieves over the images, with an 8.28M-page Wikipedia index and a pixelbrowse agent skill
- [Pixeltable](./pixeltable.md) — Unified multimodal backend for AI data apps with tables, computed columns, media, and model functions
- [Polars](./polars.md) — A fast, multi-threaded DataFrame library in Rust with a lazy query optimizer and Arrow memory model, a high-performance alternative to pandas for AI/ML data
- [PyMuPDF](./pymupdf.md) — A high-performance Python library binding the MuPDF engine for fast text, image, and table extraction and manipulation of PDFs and other document formats
- [Qdrant](./qdrant.md) — Rust vector database for high-performance similarity search with filtering and hybrid search
- [RAGFlow](./ragflow.md) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities
- [RAGLite](./raglite.md) — Python RAG toolkit using DuckDB or PostgreSQL with late chunking, late interaction, reranking, and query adapters
- [Semble](./semble.md) — MinishLab's CPU code-search library for agents, returning relevant snippets through natural-language retrieval, CLI, MCP, or subagent integrations
- [SentencePiece](./sentencepiece.md) — Google's unsupervised text tokenizer and detokenizer implementing BPE and unigram models directly on raw text, widely used to train tokenizers for LLMs and NMT
- [SimpleMem](./simplemem.md) — Efficient lifelong memory framework for text and multimodal LLM agents
- [annoy](./spotify-annoy.md) — Read-only memory-mapped approximate nearest-neighbour index built on a forest of random-projection trees
- [Supabase](./supabase.md) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- [SurrealDB](./surrealdb.md) — Multi-model database combining graph, document, vector, and time-series for AI agents
- [Surya](./surya.md) — Modern OCR toolkit with 90+ language text recognition, layout analysis, reading-order detection, and table recognition — the models behind Marker
- [Tesseract.js](./tesseract-js.md) — A pure-JavaScript OCR library that runs Tesseract compiled to WebAssembly in the browser and Node, supporting 100+ languages without a server
- [Tesseract OCR](./tesseract-ocr.md) — The long-standing open-source OCR engine that recognizes text in 100+ languages using an LSTM line recognizer, widely used as the default OCR backend
- [tiktoken](./tiktoken.md) — OpenAI's fast BPE tokenizer library for counting and encoding tokens for OpenAI models, essential for context-window budgeting and cost estimation
- [RedPajama-Data](./togethercomputer-redpajama-data.md) — Preparation pipeline and filter configurations for assembling open web-scale pretraining corpora, released alongside the RedPajama V1 and V2 datasets
- [TrendRadar](./trendradar.md) — A self-hosted trend and news aggregator with AI filtering, translation, push delivery to chat platforms, and an MCP server
- [UltraRAG](./ultrarag.md) — Low-code MCP framework for building, evaluating, and deploying complex RAG pipelines
- [Unstructured](./unstructured.md) — Open-source document ETL for converting complex files into structured data for LLM pipelines
- [Vortex](./vortex.md) — Extensible columnar file format and compression framework in Rust, designed for fast random access and zero-copy reads of large analytical and ML datasets
- [Weaviate](./weaviate.md) — Open-source vector database combining object storage, vector search, filtering, and hybrid retrieval
- [X-AnyLabeling](./x-anylabeling.md) — An AI-assisted data-labeling tool that uses models like Segment Anything and detectors to auto-annotate images and video for computer-vision dataset creation
- [xtreme1](./xtreme1.md) — An open-source annotation platform for images, 3D LiDAR point clouds, sensor fusion, and LLM preference data with RLHF
- [Zerox OCR](./zerox.md) — A document-extraction library that renders each page to an image and asks a vision LLM to return clean Markdown, handling complex layouts model-agnostically
- [zvec](./zvec.md) — Lightweight, in-process vector database from Alibaba for local RAG and agent memory
- [private-gpt](./zylon-ai-private-gpt.md) — Apache-2.0 self-hosted API layer bundling RAG, tools, agent skills, MCP, and text-to-SQL over any OpenAI-compatible server
