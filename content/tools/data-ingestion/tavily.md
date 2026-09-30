---
id: tavily
name: Tavily
type: tool
job: [web-scraping]
description: Search API purpose-built for LLMs and agents — returns ranked, cleaned, LLM-ready results (and optional extracted content) from a single query call
url: "https://www.tavily.com/"
cost_model: freemium
pricing_detail: Free tier with a monthly API-credit allowance; usage-based paid plans above it
tags: [agents, retrieval, rag]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free monthly API-credit allowance for development; paid tiers scale credits
self_hostable: false
open_source: false
source_url: "https://github.com/tavily-ai"
docs_url: "https://docs.tavily.com/welcome"
github_url: "https://github.com/tavily-ai"
alternatives: [exa, firecrawl-tool, jina-reader]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - Your agent needs current web knowledge and you want one call that returns ranked, de-duplicated, cleaned results instead of raw HTML you must scrape and parse yourself
  - You want a search step that already trims boilerplate and can return a synthesized answer plus source snippets, minimizing tokens fed into the model
avoid_when:
  - You need to crawl and fully render arbitrary sites (JS-heavy pages, auth walls) — a crawler/browser tool fits better than a search API
  - Data residency or offline operation is required — it is a hosted API with no self-hosted option
version_tracked: null
enrichment_status: draft
enrichment_notes: Official Python SDK (tavily-ai/tavily-python) verified at 1.3k stars, MIT, last push 2026-06-10 via GitHub API on 2026-07-08. The search API itself is a closed hosted service; free-tier credit limits are directional (confirm current numbers on the pricing page).
verdict: recommended
verdict_rationale: The de facto search API for agent frameworks — LLM-tuned ranking and cleaned, token-efficient results make it a lower-friction default than scraping search engines yourself
status: active
---

> **TL;DR:** the web-scraping entry for Tavily. Search API purpose-built for LLMs and agents — returns ranked, cleaned, LLM-ready results (and optional extracted content) from a single query call — the deciding factor is operational cost and what you have to run, not the feature list.

## Overview

Tavily is a search API built specifically to feed LLMs and agents rather than humans. A single call runs a search, filters and de-duplicates results, strips boilerplate, and returns LLM-ready snippets — optionally including extracted full-page content and a short synthesized answer. It exists because wiring general web search into an agent otherwise means scraping a search engine, fetching pages, and cleaning HTML before anything reaches the model.

## Why It's in the Arsenal

Almost every agent framework's "web search" tool now defaults to or documents Tavily, because it collapses the search→fetch→clean→rank pipeline into one API call and returns token-efficient text. That makes it the pragmatic baseline for giving an agent current web knowledge, which is why it belongs in the data-ingestion phase alongside crawlers and readers rather than as a novelty.

## Key Features

- Single-call search returning ranked, de-duplicated, cleaned results tuned for LLM consumption
- Optional content extraction (full page text) and a synthesized answer with cited sources
- Search-depth and domain include/exclude controls to scope results
- First-class SDKs and framework integrations (LangChain, LlamaIndex, and others)

## Architecture / How It Works

Tavily runs the query against web sources, applies its own relevance ranking and content cleaning server-side, and returns structured JSON (results, snippets, optional extracted content and answer). The client is thin — you send a query plus parameters (search depth, max results, domain filters) and get back model-ready text, so the heavy lifting of fetching and cleaning happens in the service.

## Getting Started

```python
pip install tavily-python
# from tavily import TavilyClient
# client = TavilyClient(api_key="tvly-...")
# resp = client.search("latest on RAG evaluation", search_depth="advanced")
# for r in resp["results"]:
#     print(r["title"], r["url"])
```

## Use Cases

1. **Where it sits**: on the web-scraping leg, which means the decisions that matter are timeout, retry and degraded-mode behaviour, plus an interface boundary so Tavily can be swapped without touching callers.
2. **Measuring it**: the two numbers this entry does not give you are end-to-end latency at your real request shape and the error rate when the upstream is degraded; both are worth recording before you depend on Tavily.
3. **Choosing between candidates**: Tavily's comparison set is `exa`, `firecrawl-tool`, `jina-reader`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- The implementation detail worth reading before adopting Tavily is specific — tavily runs the query against web sources, applies its own relevance ranking and content cleaning server-side, and returns structured JSON (results, snippets, optional extracted content and answer). The client is thin — you send a query plus parameters (search depth, max results, domain filters) and get back model-ready text, so the heavy lifting of fetching and cleaning happens in the service — and that is where a capability claim either survives contact with your data or does not.
- Tavily's honest comparison set is `exa`, `firecrawl-tool`, `jina-reader`; what separates them is rarely capability, it is what you must operate.
- Tavily is reached over an API rather than vendored, so replacing it is a client swap; the offset is that its availability and pricing are the vendor's to change.
- What this entry cannot give you is measured behaviour: measure Tavily's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- Depending on Tavily means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for Tavily describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where Tavily overlaps `exa`, `firecrawl-tool`, `jina-reader`, choosing on feature lists alone is the mistake; the deciding axis is operational.

## Integration Patterns

- Register Tavily as the search tool in an agent framework, then let the planner call it when it needs external facts
- Pair with a crawler like [Firecrawl](../data-ingestion/firecrawl-tool.md) or a reader like [Jina Reader](../data-ingestion/jina-reader.md): Tavily finds and ranks, the crawler/reader fetches full content when deep extraction is needed
- Contrast with [Exa](./exa.md), which emphasizes embeddings/neural search semantics over keyword-style web search

## Resources

- [Website](https://www.tavily.com/)
- [Documentation](https://docs.tavily.com/welcome)
- [GitHub (tavily-ai)](https://github.com/tavily-ai)

## Buzz & Reception

Tavily has become the commonly-documented default search tool across LLM agent frameworks; its open-source Python SDK sits at ~1.3k stars (GitHub API, 2026-07-08) with the closed search service behind it.
