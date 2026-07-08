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

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: Does this tool primarily get data INTO the system, in a form the model layer can use?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Data Ingestion in This Phase

### Recently Added

- [Airbyte](./airbyte.md)
- [dlt](./dlt.md)
- [DocETL](./docetl.md)
- [Elasticsearch](./elasticsearch.md)
- [FAISS](./faiss.md)
- [Gitingest](./gitingest.md)
- [Great Expectations (GX Core)](./great-expectations.md)
- [MarkItDown](./markitdown.md)
- [Marqo](./marqo.md)
- [Meilisearch](./meilisearch.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Agent Browser Shield](./agent-browser-shield.md) — Secure AI web browsing by cleaning content and masking PII during agent runs
- [Agent Reach](./agent-reach.md) — Toolkit giving AI agents read and search access to Twitter/X, Reddit, YouTube, GitHub, and the wider web
- [Airbyte](./airbyte.md) — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- [Argilla](./argilla.md) — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- [Browserbase](./browserbase.md) — Hosted cloud browser platform for AI agents and automated browser workflows
- [Crawl4AI](./crawl4ai-tool.md) — Python crawler and scraper designed for LLM-friendly web content extraction
- [dlt](./dlt.md) — Python-native ELT library: declarative, schema-evolving data pipelines as code, popular with AI/agent workflows
- [DocETL](./docetl.md) — LLM-powered document-processing framework with map/reduce-style operators and an optimizer that rewrites LLM steps for accuracy (UC Berkeley EPIC lab)
- [Elasticsearch](./elasticsearch.md) — Distributed search and analytics engine with mature BM25, dense-vector kNN, and hybrid retrieval for RAG workloads
- [FAISS](./faiss.md) — Meta's foundational library for efficient similarity search over billions of dense vectors
- [Firecrawl](./firecrawl-tool.md) — API and open-source project for scraping and crawling websites into LLM-ready Markdown
- [Gitingest](./gitingest.md) — Turn any Git repository into a prompt-ready text digest — replace 'hub' with 'ingest' in a GitHub URL
- [Great Expectations (GX Core)](./great-expectations.md) — The standard open data-quality framework — declarative Expectations validate pipeline data, guarding the datasets your models train and retrieve on
- [Jina AI Reader](./jina-reader.md) — Reader endpoint for converting web pages into LLM-friendly text and Markdown
- [Label Studio](./label-studio.md) — An open-source data labeling platform for ML and AI datasets
- [MarkItDown](./markitdown.md) — Microsoft's utility for converting Office files, PDFs, images, and audio into LLM-friendly Markdown
- [Marqo](./marqo.md) — Vector search engine that bundles embedding inference with storage, so you send raw text/images and queries instead of running your own embed pipeline
- [Meilisearch](./meilisearch.md) — Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance
- [MinerU](./mineru.md) — OpenDataLab's high-fidelity PDF-to-Markdown/JSON extraction tool built on layout, formula, and table recognition models
- [olmOCR](./olmocr.md) — Open toolkit from AI2 that linearizes PDFs into clean text for LLM datasets and RAG ingestion
- [Pinecone](./pinecone.md) — A managed vector database for production semantic search applications
- [Playwright](./playwright.md) — Browser automation framework for reliable end-to-end tests and web scraping workflows
- [Prodigy](./prodigy.md) — Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
- [Puppeteer](./puppeteer.md) — Node.js browser automation library for Chrome and Chromium workflows
- [RAGatouille](./ragatouille.md) — Library that makes ColBERT late-interaction retrieval usable in any RAG pipeline in a few lines
- [Scale AI](./scale-ai.md) — Managed data labeling and data engine platform for enterprise AI datasets
- [ScrapeGraphAI](./scrapegraphai.md) — LLM-driven web scraping: describe the data you want in natural language and it builds the extraction pipeline, adapting to page structure vs selectors
- [Tabstack](./tabstack.md) — Empower AI systems to autonomously browse, search, and interact with the web via API
- [Taste Lab](./taste-lab.md) — Extracts and analyzes the design DNA of any website for AI agent consumption
- [Trafilatura](./trafilatura.md) — Python library for fast, accurate extraction of main text and metadata from web pages — the standard for LLM corpus building
- [Typesense](./typesense.md) — Open-source, typo-tolerant search engine — an Algolia alternative with vector and hybrid search built in
- [Vespa](./vespa.md) — Open-source search and ranking platform combining vector, lexical, and structured search with on-node ML inference
