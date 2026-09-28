---
id: d4vinci-scrapling
name: "Scrapling"
version_tracked: null
artifact_type: library
category: data-pipelines
subcategory: tools
description: "BSD-3-Clause adaptive scraping framework that detects blocking, escalates to a stealth browser, and re-locates selectors when markup shifts"
github_url: "https://github.com/D4Vinci/Scrapling"
license: "BSD-3-Clause"
primary_language: Python
org_or_maintainer: "D4Vinci"
tags: [retrieval, pytorch]
maturity: beta
cost_model: open-source
github_stars: 84212
github_stars_last_30d: 0
trending_score: 39
last_commit: "2026-09-27"
docs_url: "https://scrapling.readthedocs.io/en/latest/"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Adaptive web-scraping framework that detects and adapts to anti-bot measures, giving agent pipelines a resilient fetch layer instead of a static request loop."
best_for:
  - "You are building a research or agent pipeline that hits sites with bot defenses and need automatic escalation from plain HTTP to a stealth browser rather than hand-tuned per-domain workarounds."
  - "2. You maintain many extractors and a routine CSS change silently breaks one overnight, so you want selectors that re-resolve by content and attribute similarity."
  - "3. You want a crawl loop with the ergonomics of requests plus a Playwright escape hatch, in one Python import, without a two-architecture codebase."
avoid_if:
  - "You have a signed contract, an official API, or a data license, because circumventing defenses is both brittle and a legal exposure you should not take on."
  - "2. Your targets render everything client-side behind a login and captcha, because no amount of adaptation substitutes for authorization or a compliant account."
  - "3. You need guaranteed, court-grade provenance for archival work, since the adaptive layer deliberately re-resolves elements in ways that weaken a fixed chain of custody."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 84212 stars, BSD-3-Clause license, Python primary language, last commit 2026-09-27, 20 GitHub topics including mcp-server, stealth, xpath. Driver names, escalation behavior, and adaptive-matcher design come from the official docs and source; not hands-on verified against defended sites."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/D4Vinci/Scrapling", "date": "2026-09-28", "description": "84,212 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Scrapling is an adaptive web-scraping framework that treats anti-bot defense and layout churn as expected conditions rather than exceptions. It starts with a fast HTTP request layer, inspects the response for block indicators such as challenge pages or missing expected content, and can escalate automatically to a stealth browser session built on a patched Firefox build. Beyond fetching, the parsing side is adaptive: an element locator is retried by text and attribute similarity when its original CSS or XPath stops matching, so a routine class-name change degrades into a warning instead of an empty dataframe. The project also ships an MCP server mode, which is what lets a coding agent use it as a retrieval tool rather than only as a library.

## Why it's in the Arsenal

The recurring decision Scrapling resolves is what to do when a fetch returns something that is not the page you asked for. A naive scraper treats a 200 with a Cloudflare interstitial as success and passes challenge markup downstream, where it surfaces as mysteriously empty results hours later. Detection-plus-escalation moves that failure to the boundary where it can be handled, and adaptive selectors address the other half of the problem: brittle extractors. Both are cross-cutting concerns that a pipeline handling many domains would otherwise implement four slightly different ways, which is the actual duplication Scrapling removes. The flip side is real and worth stating plainly: it is a tool for scraping material you are permitted to scrape, and the same machinery is a liability against sites that have said no.

## Architecture

The fetch layer is polymorphic over four drivers sharing one response contract: a plain HTTP fetcher for the cheap path, a session-based fetcher that reuses cookies and connection state, a Playwright-backed driver for JavaScript execution, and a stealth driver that launches a patched Firefox with fingerprint and automation traits altered. Each response is handed to an adaptive parser whose locators hold the original CSS/XPath plus a structural fingerprint; on a miss, the matcher scores candidate elements by tag shape, attribute overlap, and text similarity to recover the target instead of returning None. A scheduler runs the crawl with concurrency, retry, and delay controls, and the element wrappers returned to the caller expose `.css()`, `.xpath()`, `.attrib`, and `.find_all` so extraction code reads like ordinary DOM traversal. Because the same object graph serves the library and the MCP surface, an agent can call the parser without importing anything.

## Ecosystem Position

Scrapling competes with Scrapy for crawl architecture, with Playwright and Puppeteer for rendering, and with cloud extraction APIs such as Apify and Zyte for the anti-bot end of the problem, where it trades a per-record service fee for the operational burden of running browsers yourself. It overlaps with browser-use rather than complementing it, since both give an agent a web-fetch capability; the difference is that browser-use targets an LLM decision loop while Scrapling is a deterministic parser you can call without a model in the loop. It complements the document-ingestion entries in content/projects/data-and-retrieval/ by handling live HTML, where those tools handle files. The mainstream opinion is that a first-party API beats all of these, which is the boundary this framework sits right up against.

## Getting Started

Install the library and fetch a page with the adaptive fetcher, escalating when a block is detected:

```bash
python -m pip install scrapling
```

```python
from scrapling.fetchers import Fetcher

page = Fetcher.get("https://example.com/listings")
print(page.css("a.item::attr(href)")[:5])
```

Use `StealthyFetcher` for the same call when the site is behind a challenge; the library is also runnable as an MCP server so an agent can call it as a tool.

## Key Use Cases

1. Build a research agent that must retrieve live pages from a handful of sources that mix plain HTML with client-rendered and lightly defended listings.
2. Maintain a wide extractor fleet where selectors break routinely, and get a warning plus an automatic content-based rematch instead of a silent empty result.
3. Expose a controlled fetch capability to a coding agent over MCP, so browsing stays inside a sandboxed tool boundary rather than arbitrary network access from the model.

## Strengths

- One API across the cheap HTTP path and the expensive stealth-browser path, so a prototype does not have to be rewritten when a site escalates its defenses.
- Adaptive locators that recover from selector drift using text and attribute similarity, which is the failure mode that quietly ruins unattended extractors.
- MCP server mode, making it usable by agents without granting the model raw network access.
- BSD-3-Clause licensing and a `Selector` API close enough to familiar CSS/XPath usage that extraction code is cheap to review.

## Limitations

The stealth path costs a real browser process per page, so a large crawl is materially slower and heavier than plain HTTP - a thousand guarded pages is an infrastructure decision, not a script. Adaptive matching is heuristic: when a site genuinely changes content, recovery can latch onto a plausible wrong element and produce confident garbage rather than an error. Escalation is also not a guarantee, because vendors continuously fingerprint browsers and the framework is always a version or two behind the arms race. Legal and terms-of-service exposure is entirely on the operator, and the BSD license does nothing about that. Expect churn: the project is young and the API surface has moved between minor versions.

## Relation to the Arsenal

The live-web branch of the data-and-retrieval phase, sitting alongside the file-oriented document parsers in content/projects/data-and-retrieval/ such as opendataloader-project-opendataloader-pdf, which handle PDFs rather than dynamic pages. Its agent-facing role overlaps the browser entry in content/projects/agent-systems/ and Lightpanda in this batch: use Lightpanda when you need fast navigation without a rendering engine, and Scrapling when you need rendered content plus defense escalation. Downstream it feeds retrieval stages in content/projects/data-and-retrieval/ as the document source, and the model side of that pipeline is covered by content/projects/foundation-models/.

## Resources

- [GitHub — D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)
- [Scrapling documentation](https://scrapling.readthedocs.io/en/latest/)
- [Parsel documentation, the selector syntax it builds on](https://parsel.readthedocs.io/en/latest/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (84,212 stars, last commit 2026-09-27, license BSD-3-Clause, verified via GitHub API on 2026-09-28)*
