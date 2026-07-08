---
id: browser-use
name: "Browser Use"
version_tracked: null
artifact_type: framework
category: agents
subcategory: browser-agents
description: "The most-starred open-source browser agent: connects LLMs to a real browser so agents can navigate, fill forms and complete web tasks autonomously"
github_url: "https://github.com/browser-use/browser-use"
license: "MIT"
primary_language: Python
org_or_maintainer: "Browser Use"
tags: [agents, tool-use, orchestration]
maturity: beta
cost_model: open-source
github_stars: 103506
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://docs.browser-use.com"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [community-driven, actively-maintained, org-backed]
ecosystem_role:
  - "The default open-source answer to 'let my agent use the web': it fuses DOM extraction with vision, feeds an LLM a structured view of interactive elements, and executes actions — the model most autonomous web-agent products are built on or benchmarked against."
best_for:
  - "You want fully autonomous web task execution (research, form-filling, multi-site workflows) driven by natural-language goals rather than hand-authored automation scripts"
  - "You are prototyping agent products that need web access today — the Python API is a few lines, supports any LangChain-compatible LLM, and has a large community of examples"
avoid_if:
  - "You need deterministic, repeatable automation for stable pages — LLM-driven navigation is slower, costlier, and less predictable than Playwright scripts or Stagehand's hybrid code+AI model"
  - "You are deploying unattended agents against authenticated/sensitive accounts — prompt-injection-via-webpage is an unsolved risk class for autonomous browser agents"
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

An open-source library that makes websites usable by AI agents: it renders pages, extracts interactive elements into a structured text+screenshot representation, and lets an LLM decide clicks, typing, and navigation in a perception-action loop. It became the highest-profile open browser-agent project during the 2025 agent wave, with a hosted cloud offering funding continued development.

## Why it's in the Arsenal

The default open-source answer to 'let my agent use the web': it fuses DOM extraction with vision, feeds an LLM a structured view of interactive elements, and executes actions — the model most autonomous web-agent products are built on or benchmarked against. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want fully autonomous web task execution (research, form-filling, multi-site workflows) driven by natural-language goals rather than hand-authored automation scripts. See Strengths / Limitations below before adopting it.

## Architecture

A perception layer combines DOM parsing (via CDP/Playwright) with optional vision — numbered bounding boxes over interactive elements — into a compact state the LLM reasons over; an action registry (click, input, scroll, tab management, file handling) executes decisions, with retries and self-correction on failures. Supports multi-tab flows, custom functions, and persistent browser profiles for authenticated sessions.

## Ecosystem Position

Upstream: Playwright/CDP for browser control; any major LLM for reasoning. Competing: Stagehand (hybrid deterministic+AI automation), Skyvern, and closed operator-style agents (OpenAI Operator, Claude computer use). Complementary: pairs with agent frameworks (LangGraph, CrewAI) as the web-access tool; WebVoyager-style benchmarks report ~89% task success for its cloud configuration — treat vendor-reported numbers as upper bounds.

## Getting Started

```bash
pip install browser-use
uvx playwright install chromium --with-deps
# python:
from browser_use import Agent, ChatOpenAI
agent = Agent(task='Find the cheapest direct flight LIS->NYC next month', llm=ChatOpenAI(model='gpt-4.1'))
await agent.run()
```

## Key Use Cases

1. **Scenario**: you want fully autonomous web task execution (research, form-filling, multi-site workflows) driven by natural-language goals rather than hand-authored automation scripts
2. **Scenario**: you are prototyping agent products that need web access today — the Python API is a few lines, supports any LangChain-compatible LLM, and has a large community of examples

## Strengths

- You want fully autonomous web task execution (research, form-filling, multi-site workflows) driven by natural-language goals rather than hand-authored automation scripts
- You are prototyping agent products that need web access today — the Python API is a few lines, supports any LangChain-compatible LLM, and has a large community of examples

## Limitations

- You need deterministic, repeatable automation for stable pages — LLM-driven navigation is slower, costlier, and less predictable than Playwright scripts or Stagehand's hybrid code+AI model
- You are deploying unattended agents against authenticated/sensitive accounts — prompt-injection-via-webpage is an unsolved risk class for autonomous browser agents

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/browser-use/browser-use)
- [Documentation](https://docs.browser-use.com)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (103,506 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*
