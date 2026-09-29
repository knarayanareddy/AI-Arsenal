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

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring Trafilatura into anything else. The command below runs against the `web-scraping` job and returns a result you can inspect directly.

```bash
pip install trafilatura
trafilatura -u <article-url>
```

Follow the official documentation at https://trafilatura.readthedocs.io for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

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

- _Verified for Trafilatura: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt Trafilatura as a Python dependency or sidecar service against the `web-scraping` job.  For a RAG pipeline this is the retrieval leg: keep the embedding model and the index in separate services so you can re-embed the corpus without touching the query path, and re-run the benchmark after any change to the chunking or the vector store.
- *Alternatives*: `firecrawl`, `crawl4ai`, `jina-reader` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://trafilatura.readthedocs.io)
- [Documentation](https://trafilatura.readthedocs.io)
- [GitHub](https://github.com/adbar/trafilatura)

## Buzz & Reception

- 6,253 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
