---
id: page-agent
name: PageAgent
version_tracked: null
artifact_type: library
category: agents
subcategory: browser-agents
description: JavaScript in-page GUI agent from Alibaba that controls web interfaces with natural language
github_url: https://github.com/alibaba/page-agent
license: MIT
primary_language: TypeScript
org_or_maintainer: alibaba
tags:
  - agents
  - tool-use
maturity: beta
cost_model: open-source
github_stars: 27246
github_stars_last_30d: 2434
trending_score: 80
last_commit: '2026-07-20'
docs_url: https://alibaba.github.io/page-agent/
demo_url: https://alibaba.github.io/page-agent/
paper_url: null
paper_id: null
phase: agent-system
domain:
  - general-purpose
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - In-page GUI agent that runs inside the web page itself (a script tag, not a separate browser process), letting any site add "control this UI with natural language" — a different architecture from external browser agents like Stagehand or Browser Use
best_for:
  - You want to add a natural-language copilot to your own web app so users can drive its UI conversationally — PageAgent runs in-page with direct DOM access, no browser infrastructure to operate
  - 'You need GUI automation that works without screenshots or CDP: it reads the live DOM directly, which is cheaper and faster than vision-based agents for structured web UIs'
avoid_if:
  - You need to automate third-party sites you don't control — an in-page agent must be embedded by the site owner; use an external browser agent (see the Stagehand entry) instead
  - Your UI is canvas-heavy or renders outside the DOM — DOM-based perception has nothing to read there and vision-based approaches will do better
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - stagehand
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (24.8k), MIT license, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-07; on GitHub weekly and monthly trending. Architecture description (in-page script, DOM-based perception, MCP support) from the project's own documentation.
added_date: '2026-07-07'
last_reviewed: '2026-07-07'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/trending?since=weekly
    date: '2026-07-07'
    description: On GitHub weekly and monthly trending; 24.8k stars
featured: false
status: active
---

## Overview

An open-source in-page GUI agent from Alibaba: you embed it in your own web application as a JavaScript library, and it lets users control the interface with natural language by reading and acting on the live DOM directly — no separate browser process, screenshots, or automation infrastructure.

## Why it's in the Arsenal

In-page GUI agent that inverts the usual browser-agent architecture: instead of an external process driving a browser (Stagehand, Browser Use), the agent lives inside the page the site owner ships. It earns a place in the Arsenal because it addresses a distinct decision point — adding conversational control to *your own* product's UI — that external browser agents handle poorly, and because DOM-native perception is a meaningfully cheaper mechanism than vision-based agents for structured UIs. See Strengths / Limitations below before adopting it.

## Architecture

PageAgent is embedded as a script in the host page. It builds its perception from the live DOM (element roles, text, structure) rather than screenshots, plans actions with an LLM, and executes them as direct DOM interactions (clicks, input, navigation) in the same JavaScript context. Because it shares the page's runtime, it needs no CDP connection or browser infrastructure; MCP support allows exposing page capabilities to external agents as well.

## Ecosystem Position

Upstream: LLM providers for planning. Downstream: any web app that embeds it. Competing: external browser agents ([Stagehand](./stagehand.md), Browser Use) for automation of arbitrary sites; product-copilot SDKs for in-app assistance. Complementary: can coexist with external agents — in-page for first-party UX, external for cross-site workflows.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical deployment command for this specific agent system.
```

## Key Use Cases

1. **Scenario**: you want users of your web app to drive its UI conversationally ("create a report for last quarter and share it with the team") without you hand-wiring each command
2. **Scenario**: you want GUI automation for structured web UIs without the cost and latency of screenshot/vision-based perception

## Strengths

- In-page, DOM-native architecture: no browser infrastructure to operate, and perception is cheaper and faster than vision-based agents on structured UIs
- Org-backed (Alibaba), MIT-licensed, and very actively developed (24.8k stars, pushed 2026-07-07)

## Limitations

- Only works on pages that embed it — it cannot automate third-party sites you don't control
- DOM-based perception fails on canvas-heavy or non-DOM-rendered UIs, where vision-based agents do better

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/alibaba/page-agent)
- [Documentation](https://alibaba.github.io/page-agent/)
