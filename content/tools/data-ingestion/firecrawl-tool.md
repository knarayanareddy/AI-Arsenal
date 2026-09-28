---
id: firecrawl-tool
name: Firecrawl
type: tool
job: [web-scraping]
description: "Web data API and open-source scraper returning clean markdown, structured JSON, screenshots, and interaction actions for agent use"
url: "https://github.com/firecrawl/firecrawl"
cost_model: freemium
pricing_detail: Open-source plus hosted API pricing
tags: [agents, retrieval]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/firecrawl/firecrawl"
docs_url: "https://docs.firecrawl.dev"
github_url: "https://github.com/firecrawl/firecrawl"
alternatives: [crawl4ai-tool, jina-reader, playwright, puppeteer]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when: ["You are building an agent that reads the live web and you need markdown out rather than raw HTML, because the scrape endpoint converts any URL to markdown, HTML, screenshots or structured JSON.", "You are scraping at a rate that gets you blocked on a single origin, because rotating proxies and rate-limit orchestration are handled rather than left to you.", "You need a page clicked through before extracting content, because the interact endpoint scrapes a page then drives it with AI prompts or code, and actions cover click, scroll, write, wait and press."]
avoid_when: ["You need a self-hosted scraper you fully control with no external dependency, because the reliability and coverage claims belong to the hosted service.", "Your organisation forbids strong-copyleft code in your stack, because the repository is AGPL-3.0.", "You are extracting a static, small, known set of pages, because a direct fetch plus an HTML-to-text step is cheaper than a scraping API call."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
corresponding_project_entry: firecrawl
enrichment_status: draft
---

## Overview

Firecrawl is positioned as the API to search, scrape and interact with the web at scale, and as open source with a hosted service. The README's reliability claim is coverage of 96 percent of the web including JavaScript-heavy pages, without proxy configuration, and it cites a coverage benchmark of its own. Latency is claimed at P95 of 3.4 seconds across millions of pages, and the output is LLM-ready: clean markdown, structured JSON, screenshots and other formats intended to reduce token spend. The hard operational parts are handled by the service, namely rotating proxies, request orchestration, rate limits and JavaScript-blocked content. The endpoint surface is layered: search returns full page content from web results, scrape converts one URL to markdown, HTML, screenshots or structured JSON, and interact scrapes a page and then drives it with AI prompts or code. Above those sit an agent mode for describing what you need, a crawl mode for all URLs on a site, and a map mode for discovery. Media parsing covers web-hosted PDFs and DOCX, and an MCP command connects it to an agent or MCP client.

## Why It's in the Arsenal

The decision it removes is the part of web research that is not research. Scraping at any real volume means rotating proxies, respecting rate limits, rendering pages that need JavaScript, retrying, and normalising the output, and a model gets worse at everything if you hand it raw HTML. Firecrawl packages that operational layer and returns markdown, which is the format a language model reasons over best. The interaction endpoint is the newer idea worth noting: some pages only reveal their content after a click or a login step, and driving the page before extracting turns an unscrapable site into a scannable one.

## Key Features

- Output designed for language models, with markdown, structured JSON and screenshots so token spend is not wasted on markup.
 - Rotating proxies, request orchestration, rate limits and JavaScript-blocked content handled in the service, which is the hard part of web scraping.
- Interaction actions and the interact endpoint cover pages whose content only appears after a click, scroll or form entry.
- Open-source with an MCP command for agent clients, and a documented crawl and map surface for site-level work rather than only single URLs.

## Architecture / How It Works

A hosted platform terminates requests and does the fetching, the proxy rotation and the retry and rate-limit handling, which is the layer that makes the coverage claim possible and is explicitly not something the client implements. Rendering runs for JavaScript-heavy pages so the extracted text reflects the hydrated document rather than the initial HTML. The scrape endpoint then normalises the result into one of several output forms, with markdown as the LLM-oriented one, structured JSON for schema-driven extraction, and screenshots when a vision model needs to see the page. Interact composes scrape with an action layer, so a sequence of click, scroll, write, wait and press operations, or an AI prompt describing the interaction, runs before the extraction step. Crawl applies the same scrape path across a site's URL set, and map only enumerates URLs. Media parsing reuses the pipeline for web-hosted PDFs and DOCX rather than treating them as a separate format problem.

## Getting Started

Self-host the open-source scraper, or use the hosted API with a key for the managed proxy and rendering layer:

```bash
# self-hosted scraper
git clone https://github.com/firecrawl/firecrawl.git
cd firecrawl
docker compose up
```

```bash
# MCP into an agent client with a single command
npx -y firecrawl-mcp
```

The API is documented on the project site with the search, scrape, interact, crawl and map endpoints, and a hosted signup is linked from the README for the managed path.

## Use Cases

1. Agent web research: give an agent a scrape tool that returns markdown so it can read and cite pages without handling HTML or proxies.
2. Content behind interaction: use the interact endpoint to click, scroll, fill or wait on a page before extracting content that is not in the initial response.
3. Site-wide ingestion: crawl a documentation site or a competitor's pages in one call and feed the markdown into a retrieval pipeline rather than writing a crawler.

## Strengths

Firecrawl competes directly with the browser automation and scraping entries in content/projects/data-ingestion, and the axis is reliability at scale versus control: driving a browser yourself gives you full control and full responsibility for proxies, rendering and anti-bot measures, while a service gives you coverage you would otherwise engineer. It overlaps with the retrieval-phase entries in content/projects/data-and-retrieval, where the markdown it returns is exactly the text a chunking and embedding pipeline wants, so the two are usually complementary in one ingestion path. Against a hosted search API, it is the extraction half rather than the ranking half. It complements the research agents in content/projects/agent-systems, which is the main consumer of a scrape API, and its MCP endpoint makes it a tool server in the same category as the other agent tooling there.

## Limitations / When NOT to Use

The 96 percent coverage, P95 latency and general reliability figures are the project's own benchmarks, and coverage claims of this kind depend on the target population of sites and change as anti-bot measures evolve. The hardest operational work happens in a hosted service you do not control, so the self-hosted path does not inherit the coverage claim, and the self-hosted scraper is where you take on proxies and rendering yourself. AGPL-3.0 rules the code out of most closed-source commercial products without a separate arrangement. A scraping API charges per page, and an agent that loops over a site can produce a bill proportional to its own curiosity, so per-run page budgets belong in the agent. Results also inherit whatever the site returns, so paywalled, consent-walled and login-gated content remains a rights question rather than a technical one.

## Integration Patterns

This belongs in content/projects/data-ingestion as the at-scale web extraction layer, and it is the direct comparison to the browser automation and scraper entries in the same phase. Its markdown output is the input to the chunking, embedding and vector steps in content/projects/data-and-retrieval, so read the two phases together when building a web-grounded RAG pipeline. The research agents in content/projects/agent-systems are its primary consumers, and its MCP endpoint makes it a tool server in that phase. Where a hosted search API in the same category ranks results, this is the extraction half, so a serious research agent may use both.

## Resources

- [GitHub — firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- [Project site and API docs — firecrawl.dev](https://firecrawl.dev)
- [Web coverage benchmark](https://www.firecrawl.dev/blog/the-worlds-best-web-data-api-v25)

## Buzz & Reception

Hides rotating proxies, JavaScript-blocked pages and rate limits behind one API so a research agent gets markdown rather than a scraping project.
