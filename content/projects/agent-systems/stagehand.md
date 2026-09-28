---
id: stagehand
name: Stagehand
version_tracked: null
artifact_type: framework
category: agents
subcategory: browser-agents
description: "Browser agent SDK whose observe() returns real CSS selectors so credentials never reach the model"
github_url: "https://github.com/browserbase/stagehand"
license: MIT
primary_language: TypeScript
org_or_maintainer: null
tags: [tool-use, data, agents, local]
maturity: production
cost_model: usage-based
github_stars: 25439
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-28"
docs_url: "https://stagehand.dev"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Hybrid AI+code browser automation framework from Browserbase, positioned between brittle CSS-selector scripts and fully autonomous browsing agents
best_for: ["You are automating an authenticated application and need a persistent signed-in session, because a userDataDir keeps cookies between runs so the next invocation starts already logged in.", "You need structured data out of a page with a schema you control, since extract() takes a Zod or Pydantic object and returns validated records rather than free text.", "You want a browser agent that self-heals when a site redesigns a form, because act() re-resolves the target at call time instead of replaying a recorded coordinate."]
avoid_if: ["You need every action to be pixel-deterministic, because the model decides what a phrase like 'click the sign in button' refers to on the live page each time.", "You cannot send page structure to a model provider, because resolving a target requires a model call against the live DOM, which is a data-egress decision you have to make explicitly.", "You want a zero-dependency scraper for a static site, because running Chromium and paying per model call is heavy for a page that plain HTTP and a parser could read."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [playwright, firecrawl]
integrates_with: [browserbase]
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Architecture (CDP-native as of v3, removing the prior Playwright dependency for a 44% performance improvement on complex DOM interactions; act()/extract()/observe()/agent() primitives; multi-provider LLM support) is sourced from Browserbase's own deepwiki documentation and corroborated by independent third-party comparison coverage (scrapfly.io), not just marketing copy.
added_date: "2026-06-14"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso under browser-agents"}
featured: false
status: active
---

## Overview

Stagehand is a browser automation SDK built by Browserbase around three verbs. observe() takes a natural-language description and returns real selectors for the matching elements, which is what lets you keep secrets out of the prompt: you fill a password field with page.locator(...).fill(process.env.APP_PASSWORD) and the credential never becomes a token. act() performs an interaction and re-resolves its target at execution time, so a layout change degrades to a re-plan rather than a crash. extract() takes an instruction plus a Zod or Pydantic schema and returns validated data. The browser handle is yours - a local Chromium launched with a persistent userDataDir, or a hosted browser - and the README shows both TypeScript and Python entry points.

## Why it's in the Arsenal

The recurring decision in browser automation is where the model meets the page. The screenshot-first approach throws away the DOM and is slow and brittle; the pure-selector approach breaks on every redesign and needs constant maintenance. Stagehand splits the two: the model is used to find elements and then real selectors do the work, so the expensive reasoning happens once per target rather than once per pixel. That also fixes the security problem, since a password typed into a field the model only located - rather than one the model read from a screenshot - never has to be in the context window.

## Architecture

The SDK sits on top of a Playwright-compatible browser handle, which is why localBrowser.launch with a userDataDir is enough to get a persistent profile and cookies survive across runs. Stagehand.create attaches a model - the README example uses an openai/gpt-5.4-mini-style identifier with an API key - and each verb issues a request that returns structured data rather than prose. observe() returns selector strings, which you hand straight to page.locator. act() resolves and performs in one step, which is where the self-healing behaviour comes from, because the resolution happens against the current DOM rather than against a cached plan. extract() combines a read of the page with schema validation, so downstream code gets typed fields and a shape failure is a validation error rather than a parsing bug.

## Ecosystem Position

Stagehand competes with Playwright and Puppeteer, which are deterministic drivers where you write the selector yourself, and the trade is explicit: Stagehand re-plans, Playwright replays. It overlaps with browser-use, which also drives a browser from natural language, though that project leans on its own agent loop and element extraction while this one hands you three composable calls. Compared with page-agent, which runs in-page and manipulates text-based DOM without a browser driver, Stagehand needs a real browser session and gets authenticated state and form interaction for free. It complements the ingestion tools such as crawl4ai and firecrawl rather than replacing them, since those target anonymous page reads while this one is built around a signed-in session.

## Getting Started

Install the package and the browser it drives, then resolve a target before acting on it:

```bash
npm install @browserbasehq/stagehand zod
npx playwright install chromium
```

The README's opening example launches localBrowser with a userDataDir of ./browser-data, calls Stagehand.create with a model name and API key, then uses observe, act and extract against the live page.

## Key Use Cases

1. Authenticated extraction: sign in once into a billing portal, keep the session in a userDataDir, then extract invoices on a schedule with a typed schema.
2. Form-heavy internal tools: drive a twenty-click ERP or CRM procedure in plain language, with the model only resolving the control at each step.
3. Redesign-tolerant scripts: keep a natural-language step when the vendor ships a layout change, because act() re-resolves instead of replaying a stale selector.

## Strengths

- observe() returns real selectors, which keeps credentials and other secrets out of the model context entirely.
- Persistent userDataDir means an authenticated session is a normal run rather than a login-flow re-execution each time.
- extract() validates against a schema, so a shape change surfaces as a typed error rather than a downstream mystery.
- act() re-resolves at call time, which is what makes scripts survive vendor redesigns better than recorded coordinates.

## Limitations

Every verb costs a model call, so a thirty-step procedure is thirty decisions and thirty times the latency and spend; this is not a free replacement for a deterministic Playwright script. Model calls carry the page's text to a provider, so PII handling and data-residency become your decision rather than the SDK's. The Python and TypeScript surfaces are not identical, so porting logic between them is real work. Reliability on ambiguous phrasing is bounded by the underlying model, and there is no published pass rate for the observe step, so self-heals should be read as a design property rather than a guarantee.

## Relation to the Arsenal

This is an agent-systems phase entry and the closest thing in the folder to an extraction-focused browser tool. Contrast it with browser-use in the same phase, which is a fuller autonomous agent loop, and with page-agent, which needs no browser driver at all. It complements the ingestion layer in content/tools/data-ingestion - crawl4ai, firecrawl, trafilatura - for anonymous page reads, and pairs with the dev-experience MCP servers such as chrome-devtools-mcp when you want raw DevTools data rather than a model in the loop. The inference engines underneath are whatever provider you point the model field at.

## Resources

- [GitHub - browserbase/stagehand](https://github.com/browserbase/stagehand)
- [Docs - stagehand.dev](https://stagehand.dev)
- [Quickstart and TypeScript/Python examples in the README](https://github.com/browserbase/stagehand#readme)
