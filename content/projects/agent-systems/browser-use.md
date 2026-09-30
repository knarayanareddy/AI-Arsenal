---
id: browser-use
name: "Browser Use"
version_tracked: null
artifact_type: framework
category: agents
subcategory: browser-agents
description: "Open-source browser agent that drives Chrome for LLM, available as a Python library, a CLI, or hosted cloud browsers"
github_url: "https://github.com/browser-use/browser-use"
license: MIT
primary_language: Python
org_or_maintainer: "Browser Use"
tags: [agents, embeddings]
maturity: production
cost_model: open-source
github_stars: 116618
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-26"
docs_url: "https://docs.browser-use.com/llms.txt"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [community-driven, actively-maintained, org-backed]
ecosystem_role:
  - "The default open-source answer to 'let my agent use the web': it fuses DOM extraction with vision, feeds an LLM a structured view of interactive elements, and executes actions — the model most autonomous web-agent products are built on or benchmarked against."
best_for: ["You are automating a booking, checkout or form-heavy portal where the layout changes often enough that hand-written XPath breaks every other week.", "You want an agent to complete CAPTCHA-gated or residential-IP-sensitive flows and you need stealth browsers, proxy rotation and CAPTCHA solving rather than a bare headless Chrome.", "You already run an LLM tool-calling loop and just need the browser handed to it as one more tool, either through the CLI or the Agents API."]
avoid_if: ["You need deterministic repeatability on a site you control, because an LLM choosing each click makes the same script non-reproducible in a way an assertion-based test is not.", "Your budget cannot absorb per-browser-hour cloud costs at scale, because the hosted tier is billed at $0.02 per browser-hour on top of your model spend.", "You are legally barred from automated access to a target site, because the stealth and residential-proxy feature set exists precisely to defeat the controls that site operator set."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [stagehand, playwright]
integrates_with: [browserbase]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (103,506), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/browser-use/browser-use", "date": "2026-07-08", "description": "103,506 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

browser-use ships the same agent in three shapes: an open-source Python and TypeScript library you embed, a Browser Use CLI that connects an existing agent to remote or local browsers, and a hosted Agents API plus cloud browsers. The project markets browser-hours at $0.02 with stealth, CAPTCHA solving and residential proxies, which is the piece that makes the open-source agent usable against real commercial sites rather than demo pages. Docs and the product map are published as llms.txt so an agent can read the feature list itself.

## Why it's in the Arsenal

The decision it removes is whether a browser task needs a hand-written automation script. A DOM-selector script encodes today's layout and fails the next time marketing ships a redesign, and keeping it alive turns into a maintenance stream of broken specs. An agent instead looks at the accessibility tree and screenshot, decides the next action, and re-derives it each run, so the cost of a UI change moves from a code fix to a re-prompt.

## Architecture

The agent loop observes the page, compresses the DOM plus screenshot into a prompt the model can reason about, calls a model with a set of action tools, and executes the chosen action through Playwright. Because the model sees the live DOM rather than a pre-baked selector map, the planner re-derives coordinates and targets on every step. The CLI and library layers both connect to a local or remote browser endpoint, while the hosted tier adds browser orchestration, proxy egress and CAPTCHA resolution outside your process.

## Ecosystem Position

It competes directly with Skyvern in the vision-driven browser automation lane and overlaps with Playwright, which supplies the browser control it drives. Where Playwright is a scripted test runner with no model in the loop, browser-use puts an LLM in that loop and gives up determinism for adaptability. It complements content/tools/data-ingestion entries such as crawl4ai when you want a live interactive session instead of a static crawl, and it is a distinct choice from content/projects/agent-systems entries that solve code tasks rather than web tasks.

## Getting Started

Install the library from PyPI, then start a session with a model key exported:

```bash
pip install browser-use
```

The library and CLI share one browser endpoint model; the README points at browser-use.com/llms.txt for the current product map covering the open-source agent, Browser Harness, cloud browsers and the hosted Agents API pricing.

## Key Use Cases

1. End-to-end booking: find an available slot, pick a date and time, clear the CAPTCHA, and confirm without writing a single selector.
2. Legacy portal migration: reproduce a manual operator's click path on a site whose markup keeps shifting, and hand back a short transcript per run.
3. Competitive monitoring: drive a logged-in dashboard and extract fields that a plain HTTP fetch cannot reach because state lives in JavaScript.

## Strengths

- Three deployment shapes from one codebase, so you can prototype in-process and move to cloud browsers without rewriting the agent.
- Stealth, CAPTCHA solving and residential proxies solve the anti-bot problem that otherwise caps LLM browser work at sandbox demo sites.
- Both Python and TypeScript implementations, unusual for a tool at this star count.
- MIT licensed, which keeps the library embeddable in commercial products.

## Limitations

Reliability is bounded by the model you point at it, and a wrong click on a destructive button is a real operational risk with no compile-time guard. Cloud usage is billed per browser-hour, so a loop that fails to terminate costs money rather than just time. The README itself splits the product into three tiers, which is a signal that the open-source library alone does not include the anti-detection machinery that production use needs. Sessions are heavy: each concurrent agent is a full browser with its own memory footprint, and long-horizon tasks accumulate latency at every model call.

## Relation to the Arsenal

This is a headline entry in content/projects/agent-systems. Read it next to content/tools/data-ingestion/playwright, which is the deterministic substrate underneath it, and against Skyvern and the commercial stagehand-style tools for the vision-driven alternative. Its cloud browser tier is the counterpart to the self-hosted inference entries in content/projects/inference-engines when you want tokens locally but browsers remote.

## Resources

- [GitHub — browser-use/browser-use](https://github.com/browser-use/browser-use)
- [Docs index, llms.txt](https://docs.browser-use.com/llms.txt)
- [Product map and pricing, browser-use.com/llms.txt](https://browser-use.com/llms.txt)
