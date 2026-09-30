---
id: crawl4ai-tool
name: Crawl4AI
type: tool
job: [web-scraping]
description: "Open-source crawler that returns LLM-ready Markdown from any page, with a paid cloud tier behind the same API"
url: "https://github.com/unclecode/crawl4ai"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [data, retrieval, tool-use]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/unclecode/crawl4ai"
docs_url: "https://docs.crawl4ai.com"
github_url: "https://github.com/unclecode/crawl4ai"
alternatives: [firecrawl-tool, jina-reader, playwright, puppeteer]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when: ["You are building a RAG ingestion pipeline and need clean Markdown from arbitrary pages without writing your own boilerplate-stripping and content-selection heuristics.", "You need to handle JavaScript-heavy pages, because the crawler runs a real browser rather than fetching static HTML, and the async API returns a structured result object.", "You want the same interface whether you self-host or delegate, because the README tabulates library, your own Docker server and the cloud API as three ways to call the same scrape, search and extract surface."]
avoid_when: ["You need a guarantee on bot-walled sites, because the cloud tier handles those with its own proxy infrastructure and the self-hosted path leaves proxy management to you.", "You are subject to a policy against sending page content to a third party, because the cloud option processes every URL on their infrastructure for a per-request price.", "You are extracting a large static site where a sitemap walk and direct file fetch would do, because a browser per page is heavy and slow for content that never needs rendering."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
corresponding_project_entry: crawl4ai
enrichment_status: draft
---

## Overview

Crawl4AI is a Python web crawler built to produce Markdown for LLM consumption rather than to archive HTML. The core is an async web crawler that loads a page in a real browser and returns a result object whose markdown field is already cleaned of navigation, boilerplate and scripts. There are three delivery shapes. The library runs in your process. Your own Docker server runs the same thing on your machine. Crawl4AI Cloud is a hosted API with the same surface plus search and answer endpoints, priced per request, and it exposes an MCP endpoint so an agent can call it directly. The README pins a release cadence - the top of the file names v0.9.4 dated 23 September 2026 - and a comparison table makes the trade explicit: who runs the browsers, who owns the proxies, and who pays.

## Why It's in the Arsenal

The decision it addresses is the boring one that costs everyone a week. Converting a page into something a model can read is not a solved problem by default: naive extraction returns navigation, cookie banners and script tags, which poisons the embedding. Every team ends up writing a variant of a readability algorithm, and each variant has a different failure mode on the sites you care about. Shipping it as a maintained library means the heuristics get updated for you, and shipping the cloud tier means the anti-bot problems get absorbed by someone whose job that is. What you keep is the choice: self-host when the content is sensitive, delegate when the site is hostile.

## Key Features

- Markdown is the primary output, so the boilerplate-stripping heuristics are someone else's maintenance burden.
- A real browser is in the path by default, which handles JavaScript-rendered pages that a static fetch returns empty.
- Three delivery shapes on one interface, so the self-host decision can be made per workload rather than per project.
- An MCP endpoint on the cloud tier, which is the shortest path to giving an agent working web access.

## Architecture / How It Works

The crawler drives Chromium through a browser automation layer, so JavaScript execution and rendering are part of the normal path rather than a fallback. The result object carries multiple representations of the same page - markdown, and in the hosted tier HTML, links, media and screenshots - so a caller can pick the cheapest one for the job. On the cloud side, the API is a thin HTTP surface with scrape, batch and job endpoints plus search and answer, all authenticated by a bearer key, and the same key registers the MCP endpoint. Batch and jobs are asynchronous, which is how a large crawl avoids holding a request open, and the library form is an async context manager so the browser lifecycle is explicit rather than leaked.

## Getting Started

Install, run the one-time browser setup, and scrape a page asynchronously:

```bash
pip install -U crawl4ai
crawl4ai-setup
```

```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://news.ycombinator.com")
        print(result.markdown)

asyncio.run(main())
```

The same key also works against the hosted API if you prefer to hand page rendering to them.

## Use Cases

1. RAG corpus construction: crawl a documentation site or a set of news sources and push the resulting Markdown straight into a chunker and vector store.
2. Agent browsing: register the hosted MCP endpoint and let an agent fetch and read pages as a tool without writing an extraction step.
3. Bulk acquisition: use the batch or jobs endpoints to crawl thousands of URLs asynchronously rather than serially in one process.

## Strengths

Crawl4AI competes with Firecrawl, and the difference is ownership of the hard parts: Firecrawl's pitch is that it handles rotating proxies and JS-blocked content for you, while Crawl4AI's is that the library is free and the browser runs on your machine. Both return Markdown, so the real test is whether your target sites block you. It overlaps with trafilatura in this batch's data-ingestion tools, which is a lighter extractor for static text, and with the scraping language in agent-reach, which routes to whichever backend currently works. Compared with a raw HTTP fetch plus a parser, this is slower and heavier but handles rendering. It complements rather than replaces the vector stores in content/projects/data-and-retrieval, and the OCR entries such as chandra-ocr handle the PDF-side of the same problem.

## Limitations / When NOT to Use

Running a browser per page is genuinely expensive in CPU and memory, which is the cost you accept by self-hosting rather than delegating. Bot-walled and rate-limited sites are not solved locally: the cloud tier's advantage is precisely the proxy pool and orchestration it operates, so self-hosting hands that problem to you along with the IP reputation risk. The cloud tier is metered per request with published live prices, so a large crawl is a real line item and free-forever applies only to the library. Version churn is a factor - the project ships numbered releases frequently, and the result object's fields are part of your code, so pin a version.

## Integration Patterns

This is a data-ingestion tool and the entry's counterpart in the same folder is trafilatura, which is the right answer for static text where you do not need a browser. Read it against firecrawl in content/projects/data-and-retrieval for the self-host-versus-service decision, and against the PDF and scan side in the same folder - chandra-ocr, docling, pymupdf - since a crawler that meets a PDF needs different machinery. The agent-reach entry in this same phase sits one layer up as capability routing. Downstream, the vector stores in content/projects/data-and-retrieval receive what this produces, and the eval tooling in content/projects/benchmark-and-eval is where you measure extraction quality.

## Resources

- [GitHub - unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)
- [Project site](https://crawl4ai.com)
- [Docs](https://docs.crawl4ai.com)

## Buzz & Reception

Page-to-Markdown is the step every RAG pipeline hand-rolls with a fragile parser; this ships it as a maintained library with a browser, plus a cloud tier
