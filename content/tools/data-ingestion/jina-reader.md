---
id: jina-reader
name: Jina AI Reader
type: tool
job: [web-scraping]
description: URL-to-Markdown reader endpoint at r.jina.ai, with per-request controls for extraction, caching, proxies and PDF pagination
url: "https://jina.ai/reader/"
cost_model: freemium
pricing_detail: Rate-limited free tier without a key; token-based billing with an API key, and OCR extraction costs 40x the token rate
tags: [data, rag, cloud]
maturity: production
stack: [polyglot]
free_tier: true
free_tier_limits: Unauthenticated requests work at a low rate limit; an API key raises it, then usage is billed per token
self_hostable: false
open_source: false
source_url: null
docs_url: "https://jina.ai/reader/"
github_url: null
alternatives: [crawl4ai-tool, firecrawl-tool, playwright, puppeteer]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - You want one HTTP call to turn a page into clean Markdown, with no browser, no renderer and no scraping service to operate
  - The extraction needs tuning per site — CSS selectors to keep or drop, a wait-for element, a proxy country, a cache tolerance — and you want those as request headers rather than as code
  - The target is a PDF or a JS-heavy page where returning the right page range and letting the fetch wait for the DOM is cheaper than building a Playwright worker pool
avoid_when:
  - The content is behind authentication or a session you cannot replay as a cookie header — the reader fetches as an anonymous browser unless you supply the credentials
  - You must keep page content inside your network — r.jina.ai is a hosted fetch, so the URL and the page pass through a third party unless you self-host something else
  - You are crawling thousands of pages per run on a budget — per-token billing on extracted Markdown gets expensive at corpus scale, where a self-hosted crawler amortises
verdict: recommended
verdict_rationale: The best-in-class single-page reader when a hosted fetch is acceptable; the per-request controls are what make it worth using over a naive fetch-and-strip script
status: active
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25 from jina.ai/reader: header controls (X-Engine, X-Return-Format, X-Timeout, X-Token-Budget, X-Target-Selector, X-Wait-For-Selector, X-Remove-Selector, X-Proxy, X-No-Cache, X-Cache-Tolerance, X-Respond-Timing, DNT), jina-ocr-v1 at 40x token cost, X-Page for PDFs, s.jina.ai search and mcp.jina.ai MCP surface."
---

> **TL;DR:** Prepend `r.jina.ai/` to a URL and get Markdown back — the value is not the one-liner, it is that extraction, caching, proxying and pagination are all per-request headers you can change without deploying code.

## Overview

Jina AI Reader is a hosted fetch-and-extract service. A request to `r.jina.ai/<url>` has a browser load the page, waits for it to render, strips navigation and boilerplate, and returns the main content as Markdown (or plain text, HTML, or a screenshot).

The delivery mechanism is unusual even for an API: the URL itself is the request, so it works from a shell, a notebook, an agent's tool call, or a `fetch()` with no client library. Everything optional arrives as headers — which engine to use, which selectors to keep or discard, how long to wait, which country's proxy to exit from, whether cached content is acceptable, and which page of a PDF to extract.

That header surface is the product. Without it you have a web scraper; with it you have a way to encode per-source extraction knowledge in configuration rather than in a browser-worker codebase.

## Why It's in the Arsenal

RAG pipelines and agent tools both need the same primitive — a URL in, usable text out — and both usually build it badly the first time. A naive `requests.get` plus a regex strip fails on every page that renders client-side; a full Playwright service works and costs a container, a browser image and an on-call rotation.

The Reader sits between those: a network call with enough knobs to handle most of the awkward cases. `X-Target-Selector` scopes extraction to `article` or `#post-body`; `X-Remove-Selector` deletes `nav`, `footer`, `.sidebar`; `X-Wait-For-Selector` handles dynamically loaded content; `X-Proxy` picks an exit country for geo-restricted pages; `X-Timeout` and `X-Respond-Timing` trade latency for completeness. Each of those replaces a line of scraping code you would otherwise maintain.

For agents it is even more directly useful: it is the fetch tool, exposed over HTTP and as an MCP server, and it returns text an LLM can consume rather than HTML it has to parse.

## Key Features

- **Zero-setup fetch by URL prefix**: `https://r.jina.ai/https://example.com` returns Markdown with no key required, at a lower rate limit.
- **Return-format control**: Markdown, text, HTML, screenshot, or a JSON envelope carrying URL, title, content and timestamp.
- **Engine selection (`X-Engine`)**: choose the fetch path that balances quality, speed and completeness for the site in question.
- **Selector-level extraction**: `X-Target-Selector` to keep, `X-Remove-Selector` to discard, `X-Wait-For-Selector` to wait, all as CSS.
- **Token budget (`X-Token-Budget`)**: caps the response size and fails the request rather than silently truncating, which makes cost predictable per call.
- **PDF pagination (`X-Page`)**: extracts a named page from a multi-page document, which is otherwise the part of PDF handling people get wrong.
- **OCR mode (`X-Respond-With: jina-ocr-v1`)**: converts images and scanned pages to Markdown at 40× the normal token rate.
- **Cache governance**: `X-No-Cache`, `X-Cache-Tolerance` and `DNT` decide freshness and whether the request is logged at all.
- **Proxy and identity controls**: country-specific proxies, custom `User-Agent`, `Referer` and cookie forwarding for pages that gate on them.
- **Link and image summaries**: optional sections listing the page's links or images, which helps an agent decide where to go next.
- **Streaming mode** for large pages, so a slow render does not return half a document.
- **Search alongside read**: `s.jina.ai` returns a SERP in the same shape, so retrieval and extraction share one interface.

## Architecture / How It Works

The server side is a browser fleet plus an extraction pipeline. A request resolves to a fetch: the chosen engine loads the URL, the pipeline waits for the configured readiness signal, removes the elements you excluded, scopes extraction to the targets you kept, converts the surviving DOM to Markdown and applies the format options (images retained or stripped, links annotated, GFM toggles).

Responses are cached by default, with the age controlled per request: `X-Cache-Tolerance` accepts cached content younger than N seconds, and `X-No-Cache` forces a live fetch. Cookies and `DNT` bypass or disable that cache, since personalised or sensitive content must not be shared between callers.

Cost accounting follows the conversion rather than the fetch: you are billed on the tokens of Markdown returned, which is why `X-Token-Budget` exists and why OCR mode — which generates far more text per page — is priced at 40× the normal rate.

The failure modes are therefore service-shaped: a timeout on a slow origin, a rate-limit response under load, an empty body when a selector matched nothing, and quota exhaustion. None of them are debuggable from your side beyond the response, which is the trade for not operating a browser fleet.

## Getting Started

```bash
curl "https://r.jina.ai/https://example.com"
```

```bash
curl "https://r.jina.ai/https://docs.example.com/guide" \
  -H "X-Return-Format: markdown" \
  -H "X-Target-Selector: article" \
  -H "X-Remove-Selector: nav, footer, .sidebar" \
  -H "X-Timeout: 20" \
  -H "X-Token-Budget: 20000"
```

With a key, add `-H "Authorization: Bearer $JINA_API_KEY"` to leave the unauthenticated rate limit behind. For a Python client the call is a normal `requests.get` against the prefixed URL; the `reader-py` helper and the MCP server both exist for teams that would rather not hand-roll it.

Validate extraction before trusting it: fetch two pages from the same site with and without `X-Target-Selector` and diff the output. When the selector is wrong you get a short, plausible-looking document rather than an error, and that is the failure mode that quietly degrades a RAG index.

## Use Cases

1. **RAG ingestion for documentation and blogs**: one call per URL, Markdown with headings intact, chunked downstream — the shortest path from a link list to an indexable corpus.
2. **Agent fetch tool**: expose the reader as the agent's read-the-web capability, over HTTP or MCP, so the model gets text rather than raw HTML.
3. **Selector-tuned ingestion per source**: keep extraction rules for a dozen sites in a table of headers instead of a scraper repository, and change one row when a site redesigns.
4. **PDF page extraction**: pull page 12 of a filing or report with `X-Page` when full-document conversion would blow the token budget.
5. **Scanned-document pipelines**: OCR mode turns image-only pages into Markdown when the alternative is running your own OCR service, at a cost you can measure per document.
6. **Geo-restricted or gated pages**: a country-specific proxy plus cookie forwarding reaches content that a datacentre IP from the wrong region cannot.
7. **Comparison during a scraping decision**: put the reader and `crawl4ai-tool` on the same twenty URLs and compare output fidelity and cost per page before choosing.

## Strengths

- The shortest possible path from URL to usable text: a prefix, no SDK, no key, no browser.
- The per-request header surface encodes real scraping knowledge — selectors, waits, proxies, cache policy — where it can be changed without a deploy.
- Token-budget enforcement fails loudly instead of truncating, which is what makes per-call cost governable.
- PDF page selection and OCR mode cover the two document cases that most DIY pipelines handle badly.
- A JSON envelope with title and timestamp, not just text, so provenance is available for citations.
- Status page and predictable HTTP failure modes make it integrable into retry logic without reverse-engineering the service.

## Limitations / When NOT to Use

- **It is a third-party fetch.** The URL and the page content pass through Jina's infrastructure unless `DNT` is set; for internal wikis, customer data or regulated content that is a policy question, not a performance one.
- **Per-token billing scales with content, not pages.** Long pages and OCR conversions cost multiples of a short article, and a corpus crawl needs arithmetic before it needs code.
- **The free path is rate-limited.** Unauthenticated requests are fine for a prototype and unusable for a batch job; the limit is published, and it changes.
- **Extraction quality is per-site and unverified by default.** A wrong selector returns a short document with a 200 status, so silent data loss is the characteristic failure and only diffing catches it.
- **No crawling semantics.** There is no frontier, no politeness delay, no robots.txt handling across a site — it is one URL per call, and site-scale traversal is the caller's problem.
- **Session state is limited to what a cookie header can express.** Multi-step logins, CAPTCHAs and JavaScript-driven auth are out of scope.
- **Latency is a hosted round-trip plus a page render.** For a latency-critical interactive path, a cached copy in your own storage will beat it every time.

## Integration Patterns

- *Wiring*: call the reader over HTTP from the ingestion worker, behind an interface that returns `(markdown, title, fetched_at)` so the extraction dependency is swappable. Store the raw Markdown before chunking, so re-chunking never means re-fetching.
- *Per-source configuration*: keep a table of selector and timeout headers keyed by domain; that table is the extraction knowledge base, and reviewing it is how ingestion quality is maintained.
- *Cost control*: set `X-Token-Budget` per call, use `X-Cache-Tolerance` for pages that rarely change, and reserve OCR mode for pages that produce empty or unusably short output without it.
- *Failure handling*: treat a 5xx and a rate-limit 429 differently — one retries with backoff, the other needs a queue — and treat an unusually short successful response as a probable selector failure worth alerting on.
- *Alternatives in the same job*: `firecrawl-tool` for crawling and structured extraction at site scale, `crawl4ai-tool` for a self-hosted crawler you operate, `playwright` and `puppeteer` when the interaction itself must be scripted rather than the extraction.
- *Before production*: measure fidelity on a labelled set of twenty pages from your real sources, record cost per page, and set an explicit timeout below the reader's own so your retry logic owns the failure.

## Resources

- [Reader API](https://jina.ai/reader/)
- [Rate limits](https://jina.ai/api-dashboard/rate-limit)
- [Status](https://status.jina.ai/)
- [Issue tracker](https://github.com/jina-ai/reader/issues)
- [OpenAI-compatible citation mode](https://cookbook.openai.com/articles/openai-harmony#browser-tool)

## Buzz & Reception

- Widely used as the default "read a URL" tool in agent frameworks and MCP tool lists, largely because the no-key prefix form makes it the lowest-friction option in a prompt or a shell.

---
*Last reviewed: 2026-10-25 by @maintainer*
