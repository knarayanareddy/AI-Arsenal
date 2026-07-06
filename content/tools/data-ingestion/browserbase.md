---
id: browserbase
name: Browserbase
type: tool
job:
  - web-scraping
description: "Hosted cloud browser platform for AI agents and automated browser workflows"
url: "https://www.browserbase.com"
cost_model: freemium
pricing_detail: "Free tier with limited sessions; paid plans scale by concurrency and session minutes"
tags: [agents, cloud, tool-use]
maturity: production
stack:
  - typescript
free_tier: true
free_tier_limits: "Limited number of concurrent sessions on the free tier"
self_hostable: false
open_source: false
source_url: null
docs_url: "https://docs.browserbase.com"
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
best_when:
  - "You need a reliable cloud browser to run AI-agent web interactions or scrape JavaScript-heavy sites at scale"
avoid_when:
  - "You require a fully self-hosted or on-prem browser stack with no external dependency"
enrichment_status: draft
enrichment_notes: "Stub added 2026-07-06 to resolve a dangling 'integrates_with' reference from content/projects/agent-systems/stagehand.md. Full evaluation pending human review."
version_tracked: null
corresponding_project_entry: null
buzz_sources: []
---

## Overview

Browserbase is a hosted cloud browser platform for running AI-agent web interactions and automated browser workflows at scale. This is a **stub entry** added to resolve a dangling cross-reference; it has not yet been fully evaluated against the Arsenal's review rubric.

## Why It's in the Arsenal

Referenced as an integration target for browser-automation agent frameworks (e.g. Stagehand) that need a managed, reliable browser environment instead of a local headless browser.

## Key Features

- Managed cloud browsers with session recording and stealth/anti-bot options.
- Programmatic control via SDK and REST API for agent-driven navigation.
- Built-in infrastructure for concurrency, scaling, and debugging sessions.

## Architecture / How It Works

A managed pool of cloud browsers is exposed through an SDK/API. Agents (or scraping scripts) drive a remote browser session; Browserbase handles provisioning, session capture, and teardown.

## Getting Started

```bash
npm install @browserbasehq/sdk
```

```ts
import Browserbase from '@browserbasehq/sdk';
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
```

## Use Cases

1. **Agent web interaction**: give an LLM agent a reliable browser for multi-step tasks.
2. **Resilient scraping**: render JavaScript-heavy pages that basic HTTP fetch cannot.

## Strengths

- Removes the operational burden of running and scaling headless browsers.
- Session replay/debugging aids agent reliability work.

## Limitations / When NOT to Use

- Cloud-only (not self-hostable) — unsuitable where data must never leave your infrastructure.
- Adds a per-session cost and external dependency versus a local browser.

## Integration Patterns

Pairs with browser-automation frameworks (e.g. Stagehand, Playwright) as the execution backend for agent-driven or scripted browser tasks.

## Resources

- [Browserbase](https://www.browserbase.com)
- [Documentation](https://docs.browserbase.com)
- [GitHub](https://github.com/browserbase)

## Buzz & Reception

_Not yet curated — stub entry pending full review._

---

*Last reviewed: 2026-07-06 by @maintainer — stub entry; full evaluation pending.*
