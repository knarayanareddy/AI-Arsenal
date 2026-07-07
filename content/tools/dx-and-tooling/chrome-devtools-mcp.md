---
id: chrome-devtools-mcp
name: Chrome DevTools MCP
type: tool
job: [prototyping]
description: Official MCP server exposing Chrome DevTools to coding agents for live browser debugging
url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
cost_model: open-source
pricing_detail: Free and open source (Apache-2.0)
tags: [agents, tool-use, code-gen]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: Fully free and self-hostable; no paid tier exists
self_hostable: true
open_source: true
source_url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
docs_url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
github_url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
alternatives: [playwright, puppeteer]
integrates_with: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - Your coding agent (Claude Code, Cursor, Codex, Gemini CLI) needs to see what its frontend changes actually do — console errors, network requests, performance traces, rendered DOM — instead of coding blind
  - You want browser debugging grounded in the official DevTools implementation, maintained by the Chrome team itself, rather than a third-party wrapper
avoid_when:
  - You need scripted, repeatable browser automation for CI test suites — write Playwright tests directly instead of routing automation through an agent's MCP calls
  - Your agent harness has an equivalent built-in browser capability, where adding a second browser-control path creates confusion about which one acts
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (46.2k), Apache-2.0 license, Chrome team ownership, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-07; on GitHub weekly trending the same day.
verdict: recommended
verdict_rationale: First-party Chrome team MCP server; closes the "agent can't see its own frontend bugs" loop with official DevTools capabilities
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=weekly","date":"2026-07-07","description":"On GitHub weekly trending; 46.2k stars"}
---

> **TL;DR:** Official Chrome-team MCP server that gives coding agents DevTools access — console, network, performance traces, DOM — so they can debug the frontends they write. Free, Apache-2.0. Best for closing the agent code→verify loop on web apps.

## Overview

An official MCP (Model Context Protocol) server from the Chrome DevTools team that exposes browser debugging capabilities — reading console output, inspecting network requests, taking performance traces, examining the DOM, and driving page interactions — to any MCP-capable coding agent.

## Why It's in the Arsenal

Coding agents routinely write frontend code they cannot observe running, which makes their debugging guesswork. This server earns a place in the Arsenal because it closes that loop with the *official* DevTools implementation: the agent can reproduce the bug in a live browser, read the actual console error, and verify the fix — the same verify-before-claiming-done discipline the Arsenal recommends everywhere. Being maintained by the Chrome team itself distinguishes it from the many third-party browser MCP wrappers.

## Key Features

- Console, network, and DOM inspection exposed as MCP tools
- Performance tracing and analysis (Core Web Vitals workflows)
- Page interaction (navigate, click, type) via Puppeteer under the hood
- Works with any MCP client: Claude Code, Cursor, Codex, Gemini CLI, and others

## Architecture / How It Works

Runs as a local MCP server that launches or attaches to a Chrome instance via the DevTools Protocol (CDP), using Puppeteer for reliable automation. The agent calls MCP tools (e.g. take a trace, list network requests, read console messages); results return as structured text the model can reason over, rather than screenshots alone.

## Getting Started

```bash
# Add to any MCP-capable client (example: Claude Code)
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

## Use Cases

1. **Scenario**: an agent's frontend change breaks silently — it opens the page, reads the console error and failing network call, fixes the code, and re-verifies
2. **Scenario**: performance work — the agent records a trace, reads the analysis, and iterates on the slow path with real measurements

## Strengths

- First-party: maintained by the Chrome DevTools team, tracking DevTools capabilities directly (46k+ stars as of 2026-07-07)
- Structured debugging data (console, network, traces) is far more model-legible than screenshots

## Limitations / When NOT to Use

- Not a test framework: for repeatable CI automation, write Playwright tests instead of agent-driven MCP calls
- Grants the agent a real browser — treat pages it visits as untrusted input and scope what it may access

## Integration Patterns

- Pair with a coding agent for frontend work: implement → open page → read console/network → fix → re-verify
- Combine with [Playwright](../data-ingestion/playwright.md) tests: the agent debugs interactively via MCP, then encodes the regression as a deterministic test

## Resources

- [GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [npm package](https://www.npmjs.com/package/chrome-devtools-mcp)

## Buzz & Reception

On GitHub weekly trending with 46.2k stars as of 2026-07-07; widely adopted across MCP-capable coding agents since its 2025 launch by the Chrome team.
