---
title: "Data Ingestion Tools"
section: "tools/data-ingestion"
auto_generated: false
---

# Data Ingestion Tools

## What belongs here

Loaders, scrapers, parsers, chunkers, embedding/annotation pipelines, and vector search tools that bring external data into an AI system.

## What does NOT belong here

Model providers and fine-tuning belong in Model Layer; agent memory belongs in Orchestration.

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/_index.md) for cross-cutting guidance.
- Key question to ask: Does this tool primarily get data INTO the system, in a form the model layer can use?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Data Ingestion in This Phase

### Recently Added

- [Hugging Face AI Sheets](./aisheets.md)
- [Airbyte](./airbyte.md)
- [dlt](./dlt.md)
- [DocETL](./docetl.md)
- [Elasticsearch](./elasticsearch.md)
- [Exa](./exa.md)
- [FAISS](./faiss.md)
- [Gitingest](./gitingest.md)
- [Great Expectations (GX Core)](./great-expectations.md)
- [MarkItDown](./markitdown.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Agent Browser Shield](./agent-browser-shield.md) — Secure AI web browsing by cleaning content and masking PII during agent runs
- [Agent Reach](./agent-reach.md) — Open-source CLI that gives an agent read and search access to Twitter, Reddit, YouTube, Bilibili, Xiaohongshu and GitHub without paid APIs or per-site
- [Airbyte](./airbyte.md) — Open-source ELT platform with a 600+ connector catalogue for moving data from APIs, databases, files and warehouses into destinations
- [Hugging Face AI Sheets](./aisheets.md) — Spreadsheet-style web app for building, enriching and transforming datasets with LLM columns, deployable from Docker or pnpm against Hub or local models
- [Argilla](./argilla.md) — Human feedback and dataset curation UI in maintenance mode, with script-defined annotation and evaluation workflows
- [Browserbase](./browserbase.md) — Stagehand browser SDK with observe, act and extract primitives plus CUA models, MIT licensed and multi-language
- [Crawl4AI](./crawl4ai-tool.md) — Open-source crawler that returns LLM-ready Markdown from any page, with a paid cloud tier behind the same API
- [dlt](./dlt.md) — Python ELT library that turns APIs, files and databases into declarative pipelines with schema inference
- [DocETL](./docetl.md) — Declarative map-reduce framework where each pipeline step is a natural-language operation with a typed output schema
- [Elasticsearch](./elasticsearch.md) — Distributed search and analytics engine with a vector database, full-text search and near-real-time indexing
- [Exa](./exa.md) — Hosted MCP server exposing Exa web search and page fetch as two default tools for any MCP client
- [FAISS](./faiss.md) — C++ similarity search and clustering library for dense vectors with full Python and numpy wrappers and GPU implementations of key indexes
- [Firecrawl](./firecrawl-tool.md) — Web data API and open-source scraper returning clean markdown, structured JSON, screenshots, and interaction actions for agent use
- [Gitingest](./gitingest.md) — Turns a Git repository into a prompt-friendly text digest with file tree, size and token count
- [Great Expectations (GX Core)](./great-expectations.md) — Data quality library where Expectations are unit tests for datasets, runnable in a pipeline or in CI
- [Jina AI Reader](./jina-reader.md) — Reader endpoint for converting web pages into LLM-friendly text and Markdown
- [Label Studio](./label-studio.md) — An open-source data labeling platform for ML and AI datasets
- [MarkItDown](./markitdown.md) — Microsoft's utility for converting Office files, PDFs, images, and audio into LLM-friendly Markdown
- [Marqo](./marqo.md) — Deprecated open-source ecommerce search engine; the product now lives at marqo.ai
- [Meilisearch](./meilisearch.md) — Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance
- [MinerU](./mineru.md) — OpenDataLab's high-fidelity PDF-to-Markdown/JSON extraction tool built on layout, formula, and table recognition models
- [Nomic Atlas](./nomic-atlas.md) — Python client for a hosted platform that maps, labels and searches embeddings interactively in a browser
- [olmOCR](./olmocr.md) — Open toolkit from AI2 that linearizes PDFs into clean text for LLM datasets and RAG ingestion
- [Pinecone](./pinecone.md) — A managed vector database for production semantic search applications
- [Playwright](./playwright.md) — Browser automation framework for reliable end-to-end tests and web scraping workflows
- [Prodigy](./prodigy.md) — Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
- [Puppeteer](./puppeteer.md) — Node.js browser automation library for Chrome and Chromium workflows
- [RAGatouille](./ragatouille.md) — Library that makes ColBERT late-interaction retrieval usable in any RAG pipeline in a few lines
- [Reducto](./reducto.md) — Document ingestion API that parses complex PDFs (tables, figures, multi-column) into clean, structured, chunk-ready output for RAG pipelines
- [Scale AI](./scale-ai.md) — Managed data labeling and data engine platform for enterprise AI datasets
- [ScrapeGraphAI](./scrapegraphai.md) — LLM-driven web scraping: describe the data you want in natural language and it builds the extraction pipeline, adapting to page structure vs selectors
- [Tabstack](./tabstack.md) — Empower AI systems to autonomously browse, search, and interact with the web via API
- [Taste Lab](./taste-lab.md) — Extracts and analyzes the design DNA of any website for AI agent consumption
- [Tavily](./tavily.md) — Search API purpose-built for LLMs and agents — returns ranked, cleaned, LLM-ready results (and optional extracted content) from a single query call
- [Trafilatura](./trafilatura.md) — Python library for fast, accurate extraction of main text and metadata from web pages — the standard for LLM corpus building
- [Typesense](./typesense.md) — Open-source, typo-tolerant search engine — an Algolia alternative with vector and hybrid search built in
- [Vespa](./vespa.md) — Open-source search and ranking platform combining vector, lexical, and structured search with on-node ML inference
