---
id: firecrawl
name: Firecrawl
version_tracked: null
artifact_type: platform
category: rag
subcategory: document-processing
description: "Web data API with search, scrape, crawl and map endpoints, AGPL-licensed and also sold as a hosted service"
github_url: "https://github.com/firecrawl/firecrawl"
license: AGPL-3.0
primary_language: TypeScript
org_or_maintainer: null
tags: [data, retrieval, tool-use]
maturity: production
cost_model: freemium
github_stars: 185940
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://docs.firecrawl.dev"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained, production-proven]
ecosystem_role:
  - Managed API (with a smaller open-source self-hosted variant) for crawling entire websites into clean, LLM-ready Markdown
best_for: ["You need one call to turn a site into a corpus, because the crawl endpoint takes a single request to scrape all URLs of a website while map discovers them first.", "You want several output shapes from the same page, since scrape returns markdown, HTML, screenshots or structured JSON rather than forcing one representation.", "You are on JS-heavy or bot-walled targets, because the README's central claim is that rotating proxies, orchestration, rate limits and JS-blocked content are handled for you."]
avoid_if: ["You need an OSI-approved open-source licence for the server, because the repository is AGPL-3.0 and the API you would deploy is the code you would have to open.", "You cannot send target content to a third party, because the value proposition is their proxy and browser infrastructure, which means your URLs and the fetched content transit their systems.", "You need a predictable bill, because the hosted tier is metered per request and the README's own numbers are marketing figures, not a rate card."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: firecrawl-tool
enrichment_status: reviewed
enrichment_notes: Documents the same project as the firecrawl-tool entry in the tools vertical; this entry covers architecture/ecosystem position, the tool entry covers usage-oriented job guidance. Firecrawl is widely adopted across RAG tutorials and production ingestion pipelines.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso (including Firecrawl MCP variant) as an LLM-ready data extraction tool"}
featured: false
status: active
---

## Overview

Firecrawl is a web data API organised around a small set of endpoints. Search returns web results with full page content. Scrape converts any single URL to markdown, HTML, screenshots or structured JSON. Interact scrapes a page and then drives it with AI prompts or code. Around those sit Agent for describe-what-you-need data gathering, Crawl for all URLs of a site in one request, Map for instant URL discovery, and Batch Scrape for thousands of URLs asynchronously. Output targets LLM consumption directly - clean markdown, structured JSON, screenshots - with the stated goal of spending fewer tokens. It also parses media: web-hosted PDFs and DOCX go through the same path. Actions cover click, scroll, write, wait and press before extraction, and any agent or MCP client can connect with a single command.

## Why it's in the Arsenal

The decision it addresses is who owns the failure modes. Scraping at scale fails on proxies, rate limits, JavaScript walls and layout changes, none of which are your application's problem and all of which are somebody's full-time job. The endpoint split is the design choice worth noticing: discovery, single-page retrieval, whole-site acquisition and structured extraction are distinct operations with distinct cost and latency profiles, so a pipeline picks the cheap one it needs rather than paying for a full crawl to read a single page. The price is delegation - you are renting someone else's browser fleet and your request data goes with it.

## Architecture

The service is TypeScript and wraps a browser-based fetch stack behind HTTP. A scrape is a page load plus a content extraction pass, with the requested representation selected at request time, which is why markdown, raw HTML, a screenshot and a schema-validated JSON object are all outputs of the same underlying fetch. Actions are commands issued against the loaded page before extraction runs, so interaction and extraction share one session. Crawl and Batch Scrape are the asynchronous layer: map enumerates URLs, crawl walks them within a request, and batch handles thousands of URLs as a job with results retrieved separately. On the agent side the API is exposed over MCP with a single-command registration, so the same capabilities a script can call are available to an agent as tools.

## Ecosystem Position

Firecrawl competes with Crawl4AI, and the difference is precisely the thing it sells: Firecrawl runs the browsers and the proxies so you do not, while Crawl4AI is a free library that hands you the browser and the responsibility. Both return Markdown, so the deciding test is whether your targets block your IP. It overlaps with trafilatura in this batch's ingestion set for lightweight static extraction, and with the scraping layer inside agent-reach, which takes the routing view of the same sites. Compared with a hand-rolled browser pipeline, this is less control and far less operational burden. It complements rather than replaces the downstream stack: the markdown it returns is what you chunk, embed and store in the vector databases in content/projects/data-and-retrieval, and the OCR entry chandra-ocr handles the document side it parses.

## Getting Started

Sign up for a key and instantiate the client; the same key covers the other endpoints:

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="YOUR_API_KEY")
```

The README's Search and Scrape examples both start from that client, and the playground on the site lets you confirm behaviour before writing the pipeline. Self-hosting is possible under AGPL-3.0, and you bring your own proxy and browser capacity in that case.

## Key Use Cases

1. Whole-site acquisition: map a documentation site, crawl every URL in one request, and land Markdown in a vector store without writing a scraper.
2. Structured extraction: scrape a page once and get schema-shaped JSON instead of prose you have to parse per template.
3. Hard targets: sites behind JavaScript walls or IP-based blocking, where running your own browser fleet is not an option.

## Strengths

- Endpoint taxonomy that matches real pipelines, so discovery, one page, a whole site and a bulk job are separate cheap operations.
- Multiple representations from a single fetch, letting you take markdown for context, JSON for structure and screenshots for verification.
- The hard infrastructure - rotating proxies, rate-limit handling, JS-blocked content - is the product rather than your problem.
- Actions before extraction, so a page behind a click-through is reachable without a separate browser session.

## Limitations

AGPL-3.0 is the constraint to check first: hosting the server yourself means modifications to a network service come with source obligations, which is fine internally and awkward in a redistributed product. The hosted tier is metered per request with no rate card in the README, and a whole-site crawl at scale is a line item that grows with the site. Every URL and its content transit a third party, which is a real constraint for confidential targets. The performance claims - coverage and a P95 in seconds across millions of pages - are the vendor's own marketing, benchmarked by the vendor, and should be measured on your own target list before you rely on them.

## Relation to the Arsenal

This is a data-and-retrieval phase entry and the counterpart to crawl4ai in the same data-ingestion set, which is the free self-hosted route to the same output. Read it alongside trafilatura, which is the right answer for static pages that need no browser at all, and chandra-ocr and docling for the document and PDF side of the same ingestion problem. Its MCP surface pairs it with the coding agents in content/tools/developer-experience. Downstream, everything it returns is input to the chunking and vector-store entries in this same folder, and the eval tooling in content/projects/benchmark-and-eval is where you would measure extraction fidelity on your own sites.

## Resources

- [GitHub - firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- [Project site and playground](https://firecrawl.dev)
- [Benchmark post behind the coverage and latency claims](https://www.firecrawl.dev/blog/the-worlds-best-web-data-api-v25)
