---
id: exa
name: Exa
type: tool
job: [web-scraping]
description: Neural search API for AI apps — embeddings-based web search that matches on meaning, plus content retrieval and similarity ("find similar pages") endpoints
url: "https://exa.ai"
cost_model: freemium
pricing_detail: Free API credits to start; usage-based pricing per search/content request above the free allowance
tags: [retrieval, embeddings, rag]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free starter API credits; usage-based billing beyond them
self_hostable: false
open_source: false
source_url: "https://github.com/exa-labs"
docs_url: "https://exa.ai/docs/reference/search-api-guide"
github_url: "https://github.com/exa-labs"
alternatives: [tavily, jina-reader]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - You want search that matches on meaning rather than keywords — an embeddings-based index is better at "pages like this" and descriptive queries than keyword engines
  - You need a "find similar" capability (given a URL, return semantically related pages) as a first-class endpoint, which keyword search APIs do not provide
avoid_when:
  - Your queries are navigational/keyword-exact (find a specific known page) — a conventional search API may match as well at lower cost
  - You require self-hosting or full control of the index — it is a hosted, closed service
version_tracked: null
enrichment_status: draft
enrichment_notes: Python SDK (exa-labs/exa-py) verified at ~217 stars, MIT, last push 2026-07-08 via GitHub API. Neural-vs-keyword advantage is claimed by the vendor and depends on query type; free-credit amounts are directional (confirm on pricing page).
verdict: recommended
verdict_rationale: A distinctive embeddings-native search API whose meaning-based matching and find-similar endpoint fill a gap keyword search APIs cannot, with clean SDKs and content retrieval built in
status: active
---

> **TL;DR:** An embeddings-based ("neural") web search API for AI apps: matches on meaning, retrieves cleaned page content, and offers a first-class find-similar-pages endpoint. Freemium; recommended when semantic/descriptive search beats keyword matching.

## Overview

Exa is a search API whose index is built for semantic matching: instead of keyword ranking, it embeds queries and documents so descriptive queries ("startups building open-source eval tooling") and similarity queries ("pages like this URL") return relevant results. It also retrieves cleaned page contents and highlights, so an agent can search and read in the same workflow.

## Why It's in the Arsenal

Keyword search APIs struggle with descriptive intent and cannot answer "find pages similar to this one." Exa's embeddings-native design targets exactly those cases, giving agents a retrieval mode that is complementary to keyword-oriented services like Tavily. That distinct capability — semantic + find-similar over the open web — is why it earns a data-ingestion entry rather than being redundant with existing search tools.

## Key Features

- Neural (embeddings-based) search that matches on meaning, plus an optional keyword mode
- Find-similar endpoint: given a URL, return semantically related pages
- Content retrieval with cleaned text and query-relevant highlights in the same API
- Python/TypeScript SDKs and framework integrations

## Architecture / How It Works

Exa maintains an embeddings index of web content; a query is embedded and matched against it for semantic relevance (with a keyword fallback mode), then results are returned with optional cleaned content and highlights. Because the index is embeddings-based, "find similar to this URL" is a native operation rather than a bolt-on, and content extraction is served alongside search results.

## Getting Started

```python
pip install exa-py
# from exa_py import Exa
# exa = Exa(api_key="...")
# res = exa.search_and_contents("open-source LLM eval tools", type="neural", num_results=5)
# for r in res.results:
#     print(r.title, r.url)
```

## Use Cases

1. **Scenario**: a discovery agent that must surface conceptually-related pages (competitors, similar research) via the find-similar endpoint
2. **Scenario**: a RAG ingestion step where descriptive queries need meaning-based recall, retrieving cleaned content directly for embedding

## Strengths

- Semantic matching handles descriptive and exploratory queries that trip up keyword search
- Find-similar-by-URL is a genuinely different primitive not offered by keyword search APIs
- Search + content retrieval in one API keeps agent tool count and latency down

## Limitations / When NOT to Use

- For exact/navigational lookups, keyword engines can be as good and cheaper — neural search is not always the win
- Hosted, closed index: no self-hosting, and you cannot fully inspect or tune ranking
- Coverage and freshness are bounded by Exa's crawl/index, which varies by domain

## Integration Patterns

- Use as the semantic-search tool in an agent, reserving a keyword search API for navigational queries
- Feed `search_and_contents` output straight into an embedding/RAG pipeline to skip a separate fetch step
- Contrast with [Tavily](./tavily.md) (keyword/agent search) and [Jina Reader](./jina-reader.md) (URL-to-clean-text): Exa's differentiator is semantic recall and find-similar

## Resources

- [Website](https://exa.ai)
- [API Guide](https://exa.ai/docs/reference/search-api-guide)
- [GitHub (exa-labs)](https://github.com/exa-labs)

## Buzz & Reception

Exa is a widely-referenced neural-search option in the AI-app ecosystem; its open Python SDK is smaller (~217 stars, GitHub API 2026-07-08) than keyword-search competitors, reflecting that the value is the hosted index rather than the client.
