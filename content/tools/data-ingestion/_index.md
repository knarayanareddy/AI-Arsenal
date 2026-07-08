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

- [Great Expectations (GX Core)](./great-expectations.md)
- [Agent Reach](./agent-reach.md)
- [olmOCR](./olmocr.md)
- [Browserbase](./browserbase.md)
- [Agent Browser Shield](./agent-browser-shield.md)
- [Tabstack](./tabstack.md)
- [Taste Lab](./taste-lab.md)
- [Argilla](./argilla.md)
- [Crawl4AI](./crawl4ai-tool.md)
- [Firecrawl](./firecrawl-tool.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Agent Browser Shield](./agent-browser-shield.md) — Secure AI web browsing by cleaning content and masking PII during agent runs
- [Agent Reach](./agent-reach.md) — Toolkit giving AI agents read and search access to Twitter/X, Reddit, YouTube, GitHub, and the wider web
- [Argilla](./argilla.md) — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- [Browserbase](./browserbase.md) — Hosted cloud browser platform for AI agents and automated browser workflows
- [Crawl4AI](./crawl4ai-tool.md) — Python crawler and scraper designed for LLM-friendly web content extraction
- [Firecrawl](./firecrawl-tool.md) — API and open-source project for scraping and crawling websites into LLM-ready Markdown
- [Great Expectations (GX Core)](./great-expectations.md) — The standard open data-quality framework — declarative Expectations validate pipeline data, guarding the datasets your models train and retrieve on
- [Jina AI Reader](./jina-reader.md) — Reader endpoint for converting web pages into LLM-friendly text and Markdown
- [Label Studio](./label-studio.md) — An open-source data labeling platform for ML and AI datasets
- [olmOCR](./olmocr.md) — Open toolkit from AI2 that linearizes PDFs into clean text for LLM datasets and RAG ingestion
- [Pinecone](./pinecone.md) — A managed vector database for production semantic search applications
- [Playwright](./playwright.md) — Browser automation framework for reliable end-to-end tests and web scraping workflows
- [Prodigy](./prodigy.md) — Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
- [Puppeteer](./puppeteer.md) — Node.js browser automation library for Chrome and Chromium workflows
- [Scale AI](./scale-ai.md) — Managed data labeling and data engine platform for enterprise AI datasets
- [Tabstack](./tabstack.md) — Empower AI systems to autonomously browse, search, and interact with the web via API
- [Taste Lab](./taste-lab.md) — Extracts and analyzes the design DNA of any website for AI agent consumption
