---
id: browserbase
name: Browserbase
type: tool
job:
  - web-scraping
description: "Stagehand browser SDK with observe, act and extract primitives plus CUA models, MIT licensed and multi-language"
url: "https://www.browserbase.com"
cost_model: open-source
pricing_detail: "Free tier with limited sessions; paid plans scale by concurrency and session minutes"
tags: [agents, llm]
maturity: production
stack:
  - typescript
free_tier: true
free_tier_limits: "Limited number of concurrent sessions on the free tier"
self_hostable: false
open_source: false
source_url: null
docs_url: "https://docs.stagehand.dev"
github_url: "https://github.com/browserbase"
alternatives: []
integrates_with: []
added_date: "2026-07-06"
last_reviewed: "2026-07-06"
added_by: maintainer
reviewed_by: null
verdict: watching
verdict_rationale: "Stub entry added to resolve a dangling reference; full catalog evaluation pending"
status: active
phase: data-ingestion
audience:
  - prototype
  - production
best_when: ["You want an LLM to drive a browser but still need to control the credential step yourself, because observe returns real selectors you fill directly instead of typing secrets into a model.", "You have scripts that break when a site redesigns its form, and you want act to re-derive the target instead of patching a stale selector.", "You need schema-validated extraction from a page, because extract takes a Zod or Pydantic schema and returns typed records rather than prose."]
avoid_when: ["You need a fully autonomous agent that logs in for you, because the security model deliberately keeps credentials on your side of the observe call.", "You are committed to Python only and do not want two SDKs, since Stagehand publishes TypeScript, Python and Go surfaces with parity.", "You want zero model cost, because every observe, act and extract call is a model invocation even when the page has not changed."]
enrichment_status: draft
enrichment_notes: "Stub added 2026-07-06 to resolve a dangling 'integrates_with' reference from content/projects/agent-systems/stagehand.md. Full evaluation pending human review."
version_tracked: null
corresponding_project_entry: null
buzz_sources: []
---

## Overview

Stagehand is presented as the SDK for browser agents, with the pitch of signing in once, keeping the session, and pulling structured data out the other side. The API is three primitives: observe returns real CSS selectors for described elements so credentials never reach the model, act performs an action and self-heals when a site redesigns, and extract returns schema-validated data against a Zod or Pydantic definition. Sessions persist through a user data directory so a run starts already authenticated. TypeScript, Python and Go surfaces are documented, and CUA models are published alongside the SDK.

## Why It's in the Arsenal

The design decision Stagehand makes is where the credential boundary sits. Most browser agents take a whole task description and fill a login form themselves, which means the password transits a model. Splitting the API so observe hands back a selector and your own code performs the fill keeps secrets out of the model entirely, while act and extract still absorb the brittleness of the pages after login. You get the resilience of an agent without the credential exposure of a monolithic one.

## Key Features

- Credentials never reach the model, because observe returns selectors your code fills directly.
- extract is schema-validated, so downstream code receives typed records rather than prose to parse.
- act self-heals on redesign, which is the specific failure mode that breaks most scrapers in production.
- MIT licensed with TypeScript, Python and Go surfaces, so it fits an existing polyglot stack.

## Architecture / How It Works

A local or hosted browser is launched with a persistent user data directory, and the Stagehand instance binds to it plus a model. observe inspects the page and returns concrete selectors, which your code uses directly through the Playwright-compatible locator API. act sends a natural-language instruction and executes the resolved interaction in the live page, re-deriving the target when the DOM has moved. extract pairs an instruction with a validation schema so the returned structure is typed rather than parsed from free text.

## Getting Started

The TypeScript quickstart from the README installs the SDK and the Zod schema library, then launches a persistent local browser:

```bash
npm install @browserbasehq/stagehand zod
```

```typescript
const browser = await localBrowser.launch({ userDataDir: "./browser-data" });
const stagehand = await Stagehand.create({ browser, model: { modelName: "openai/gpt-5.4-mini" } });
```

Python and Go equivalents use Pydantic and the same three primitives.

## Use Cases

1. Authenticated extraction: sign in once with a persisted session, then extract structured records from a dashboard that requires login.
2. Redesign resilience: keep a script's intent in natural language so a marketing redesign is absorbed by act rather than crashing a stale selector.
3. Typed web data: pull a table into a schema-validated array of records with Zod or Pydantic instead of scraping HTML and parsing it downstream.

## Strengths

It competes with Playwright directly for browser automation, and the difference is who decides the next action: Playwright is a deterministic script you write, Stagehand is a model in the loop resolving intent at each step. It overlaps with browser-use and Skyvern in the same agent-automation lane, where Stagehand's distinguishing bet is the fine-grained three-primitive API rather than a monolithic agent loop. It complements content/tools/data-ingestion entries such as Playwright, which supply the runtime it drives, and it pairs with the MCP tooling in content/tools/serving-and-deployment when an agent needs browser access as a tool.

## Limitations / When NOT to Use

Every primitive is a model call, so cost and latency scale with the number of pages and steps, and a long authenticated workflow can get expensive without batching. Caching is not mentioned in the README, which means re-observing the same element on each run is likely a cost you carry. Model choice is explicit in the constructor, so you own the provider decision and its failure modes. And while act self-heals a redesign, it cannot self-heal a wrong intent: if your instruction is ambiguous, the browser will confidently do the wrong thing.

## Integration Patterns

This is the browser-automation SDK entry in content/tools/data-ingestion, and it sits between the deterministic Playwright entry and the fuller agents in content/projects/agent-systems such as browser-use. Its model-driven extraction feeds directly into the retrieval entries in content/projects/data-and-retrieval, and its CUA model release is a bridge to the vision-driven agent entries. If you are choosing between self-hosted and hosted browsers, the same SDK covers both paths.

## Resources

- [GitHub — browserbase/stagehand](https://github.com/browserbase/stagehand)
- [Docs — stagehand.dev](https://stagehand.dev)
- [Quickstart guide](https://docs.stagehand.dev)

## Buzz & Reception

Splits browser work into observe, act and extract so a model returns real Playwright selectors for you to execute, keeping credentials out of the prompt while self-healing on redesign.
