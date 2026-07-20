---
id: stagehand
name: Stagehand
version_tracked: null
artifact_type: framework
category: agents
subcategory: browser-agents
description: Open-source browser-AI framework for reliable AI agent web interactions
github_url: https://github.com/browserbase/stagehand
license: MIT
primary_language: TypeScript
org_or_maintainer: null
tags:
  - agents
  - orchestration
maturity: production
cost_model: open-source
github_stars: 23568
github_stars_last_30d: 18168
trending_score: 55
last_commit: '2026-07-17'
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain:
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
ecosystem_role:
  - Hybrid AI+code browser automation framework from Browserbase, positioned between brittle CSS-selector scripts and fully autonomous browsing agents
best_for:
  - You want browser automation that mixes deterministic code (for known, stable page structure) with AI-assisted actions (for unfamiliar or changing pages), rather than choosing one extreme or the other
  - You need self-healing automation that survives website changes — Stagehand's caching layer replays AI-discovered actions for 10-100x speedup and falls back to AI re-discovery when cached actions break
avoid_if:
  - You want a fully autonomous, screenshot-driven browsing agent that decides its own actions end-to-end without you writing any workflow code — Browser Use's model is closer to that; Stagehand deliberately keeps a human-authored code skeleton
  - You need pure deterministic browser automation for a well-defined, stable test suite — plain Playwright without the AI layer is simpler and has no LLM-call latency/cost
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - playwright
  - firecrawl
integrates_with:
  - browserbase
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Architecture (CDP-native as of v3, removing the prior Playwright dependency for a 44% performance improvement on complex DOM interactions; act()/extract()/observe()/agent() primitives; multi-provider LLM support) is sourced from Browserbase's own deepwiki documentation and corroborated by independent third-party comparison coverage (scrapfly.io), not just marketing copy.
added_date: '2026-06-14'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: newsletter
    url: https://toolradar.com/featured/techpresso
    date: '2026-06-14'
    description: Featured in Techpresso under browser-agents
featured: false
status: active
---

## Overview

An open-source browser automation framework from Browserbase that blends natural-language, AI-driven actions with deterministic code-level control, aimed at building web automation that is more resilient to page changes than pure CSS-selector scripts while remaining more predictable than a fully autonomous browsing agent.

## Why it's in the Arsenal

Hybrid AI+code browser automation framework from Browserbase, positioned between brittle CSS-selector scripts and fully autonomous browsing agents. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want browser automation that mixes deterministic code (for known, stable page structure) with AI-assisted actions (for unfamiliar or changing pages), rather than choosing one extreme or the other. See Strengths / Limitations below before adopting it.

## Architecture

As of v3, Stagehand talks directly to the browser via the Chrome DevTools Protocol (CDP-native), having removed its earlier Playwright dependency for a reported 44% performance improvement on complex DOM interactions. Core primitives are act() for single actions, extract() for structured data capture, observe() for element discovery, and agent() for multi-step autonomous exploration; an ActCache/AgentCache layer stores and replays AI-discovered actions for large speedups on repeated workflows, with automatic self-healing when cached actions fail due to site changes.

## Ecosystem Position

Upstream: integrates with multiple LLM providers (OpenAI, Anthropic, Google) via a pluggable client architecture for its AI-driven actions. Downstream: none of particular note. Competing: Playwright and Puppeteer for pure code-based automation; Browser Use for fully autonomous screenshot-driven browsing agents. Complementary: designed to integrate with Browserbase's managed browser-session infrastructure, though it can run against any CDP-compatible browser.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical deployment command for this specific agent system.
```

## Key Use Cases

1. **Scenario**: you want browser automation that mixes deterministic code (for known, stable page structure) with AI-assisted actions (for unfamiliar or changing pages), rather than choosing one extreme or the other
2. **Scenario**: you need self-healing automation that survives website changes — Stagehand's caching layer replays AI-discovered actions for 10-100x speedup and falls back to AI re-discovery when cached actions break

## Strengths

- You want browser automation that mixes deterministic code (for known, stable page structure) with AI-assisted actions (for unfamiliar or changing pages), rather than choosing one extreme or the other
- You need self-healing automation that survives website changes — Stagehand's caching layer replays AI-discovered actions for 10-100x speedup and falls back to AI re-discovery when cached actions break

## Limitations

- You want a fully autonomous, screenshot-driven browsing agent that decides its own actions end-to-end without you writing any workflow code — Browser Use's model is closer to that; Stagehand deliberately keeps a human-authored code skeleton
- You need pure deterministic browser automation for a well-defined, stable test suite — plain Playwright without the AI layer is simpler and has no LLM-call latency/cost

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/browserbase/stagehand)
- [Documentation](https://github.com/browserbase/stagehand)
