---
id: trafilatura
name: "Trafilatura"
type: tool
job: [web-scraping]
description: "Python library for fast, accurate extraction of main text and metadata from web pages — the standard for LLM corpus building"
url: "https://trafilatura.readthedocs.io"
cost_model: open-source
pricing_detail: "Apache-2.0 open source"
tags: [data, retrieval, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/adbar/trafilatura"
docs_url: "https://trafilatura.readthedocs.io"
github_url: "https://github.com/adbar/trafilatura"
alternatives: [firecrawl, crawl4ai, jina-reader]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production, research]
best_when:
  - "You need boilerplate-free main-text extraction from HTML at corpus scale — it wins independent benchmarks on precision/recall balance"
  - "Offline/static HTML processing where an API service (Firecrawl) or headless browser (Crawl4AI) is unnecessary weight"
avoid_when:
  - "JavaScript-rendered pages — trafilatura parses static HTML; pair with a headless browser or use Crawl4AI"
  - "You want ready-to-use LLM-formatted output with screenshots/actions; that's the newer crawler tools' job"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (6,253), license, and last push (2026-07-01) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The quiet workhorse behind many LLM training corpora; still the accuracy/speed reference for text extraction"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/adbar/trafilatura", "date": "2026-07-08", "description": "6,253 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A scholarly-grade web scraping library used in major LLM data pipelines: given HTML, it extracts the main content (dropping navigation, ads, boilerplate), preserves structure, pulls metadata (author, date, sitename), and outputs text, Markdown, CSV, JSON, or XML-TEI — with crawling, sitemap, and feed utilities included.

## Why It's in the Arsenal

Trafilatura earns a place in the Arsenal because it directly addresses a recurring decision point: you need boilerplate-free main-text extraction from HTML at corpus scale — it wins independent benchmarks on precision/recall balance. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- State-of-the-art main-content extraction accuracy
- Metadata extraction: title, author, date, categories
- CLI + Python API; sitemap/feed crawling; multiple output formats

## Architecture / How It Works

Cascades fast heuristics over the DOM tree (density, markup signals, link ratios) with fallbacks to readability-style algorithms, trading a tiny accuracy loss for order-of-magnitude speed over ML extractors — which is why corpus projects (C4-style cleaning, web-scale pretraining data) adopted it.

## Getting Started

```bash
pip install trafilatura
trafilatura -u <article-url>
```

## Use Cases

1. **Scenario**: you need boilerplate-free main-text extraction from HTML at corpus scale — it wins independent benchmarks on precision/recall balance
2. **Scenario**: offline/static HTML processing where an API service (Firecrawl) or headless browser (Crawl4AI) is unnecessary weight
3. **Scenario where this is NOT the right fit**: javaScript-rendered pages — trafilatura parses static HTML; pair with a headless browser or use Crawl4AI — evaluate an alternative instead

## Strengths

- You need boilerplate-free main-text extraction from HTML at corpus scale — it wins independent benchmarks on precision/recall balance
- Offline/static HTML processing where an API service (Firecrawl) or headless browser (Crawl4AI) is unnecessary weight

## Limitations / When NOT to Use

- JavaScript-rendered pages — trafilatura parses static HTML; pair with a headless browser or use Crawl4AI
- You want ready-to-use LLM-formatted output with screenshots/actions; that's the newer crawler tools' job

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `firecrawl`, `crawl4ai`, `jina-reader` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `trafilatura`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://trafilatura.readthedocs.io)
- [Documentation](https://trafilatura.readthedocs.io)
- [GitHub](https://github.com/adbar/trafilatura)

## Buzz & Reception

- 6,253 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
