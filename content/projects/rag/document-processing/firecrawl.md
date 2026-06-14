---
id: firecrawl
name: Firecrawl
type: platform
category: rag
subcategory: document-processing
description: >-
  Open-source and hosted web scraping API that turns websites into LLM-ready
  markdown/data
github_url: 'https://github.com/firecrawl/firecrawl'
license: AGPL-3.0
primary_language: TypeScript
tags:
  - rag
  - data
  - cloud
maturity: production
cost_model: freemium
github_stars: 132342
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://docs.firecrawl.dev/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
alternatives: []
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Firecrawl crawls and scrapes websites into LLM-ready Markdown and structured data. Use it when web pages are the source documents for RAG.

## Overview

Firecrawl is useful for RAG ingestion from websites, docs sites, and web content that needs cleaning before embedding.

## Why It's in the Arsenal

Web ingestion is a common RAG bottleneck; Firecrawl packages crawling, scraping, and LLM-ready output behind an API/self-hostable project.

## Key Features

- Crawl and scrape APIs
- Markdown output for LLM ingestion
- Hosted and open-source options
- Search/scrape/crawl workflows
- TypeScript codebase

## Architecture / How It Works

Firecrawl runs web crawling/scraping jobs and returns cleaned content suitable for downstream chunking and indexing.

## Getting Started

```bash
pip install firecrawl-py
```

```python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="fc-YOUR_API_KEY")
page = app.scrape_url("https://example.com")
```

## Use Cases

1. **Scenario**: Crawling docs websites
2. **Scenario**: Building web-backed RAG indexes
3. **Scenario**: Extracting Markdown from web pages

## Strengths

- LLM-ready web output
- Hosted API lowers setup effort
- Can be self-hosted under AGPL terms

## Limitations / When NOT to Use

- Dynamic sites and anti-bot protections still matter
- Hosted use has cost/rate limits
- AGPL license must be reviewed for self-hosted commercial use

## Integration Patterns

- Crawl docs into Markdown, then chunk/index with RAG framework
- Store source URL and crawl timestamp
- Re-crawl on schedule and evaluate drift

## Resources

- [GitHub](https://github.com/firecrawl/firecrawl)
- [Docs](https://docs.firecrawl.dev/)

## Buzz & Reception

- Included because this project is frequently evaluated in production RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*

