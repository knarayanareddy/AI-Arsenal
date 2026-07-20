---
id: gpt-researcher
name: GPT Researcher
version_tracked: null
artifact_type: framework
category: agents
subcategory: autonomous
description: Autonomous deep-research agent that plans queries, scrapes and cross-validates 20+ sources, and writes cited research reports
github_url: https://github.com/assafelovic/gpt-researcher
license: Apache-2.0
primary_language: Python
org_or_maintainer: Assaf Elovic / community
tags:
  - agents
  - rag
  - orchestration
maturity: production
cost_model: open-source
github_stars: 28482
github_stars_last_30d: 331
trending_score: 66
last_commit: '2026-07-18'
docs_url: https://docs.gptr.dev
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - 'The reference open-source implementation of ''deep research'': a planner-executor architecture that decomposes a question into parallel search queries, scrapes and filters sources, and synthesizes a long-form cited report — predating and paralleling the commercial deep-research products.'
best_for:
  - You want deep-research capability you can self-host, point at internal documents, or embed in your own product rather than paying per-report for commercial equivalents
  - You need reports with traceable citations aggregated from many sources — the planner/executor design cross-validates across 20+ scraped pages by default, reducing single-source hallucination
avoid_if:
  - You need guaranteed factual accuracy for high-stakes decisions — aggregation reduces but does not eliminate hallucination, and web-source quality gates are heuristic
  - A single web search suffices for your use case — a full research run costs multiple LLM calls and minutes of latency versus one cheap query
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with:
  - langgraph
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (28,151), primary language, license, and last commit (2026-07-05) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/assafelovic/gpt-researcher
    date: '2026-07-08'
    description: 28,151 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

An autonomous agent for deep web and local research: given a question, a planner agent generates targeted sub-queries, execution agents scrape and evaluate sources in parallel, and a writer agent synthesizes a cited report (~2,000+ words). It popularized the plan-and-execute research pattern in open source and supports local documents, custom retrievers, and a multi-agent LangGraph pipeline for deeper runs.

## Why it's in the Arsenal

The reference open-source implementation of 'deep research': a planner-executor architecture that decomposes a question into parallel search queries, scrapes and filters sources, and synthesizes a long-form cited report — predating and paralleling the commercial deep-research products. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want deep-research capability you can self-host, point at internal documents, or embed in your own product rather than paying per-report for commercial equivalents. See Strengths / Limitations below before adopting it.

## Architecture

A planner-executor split inspired by Plan-and-Solve: the planner produces research questions; per-question crawler agents (Tavily or pluggable retrievers, bs4/Playwright scraping) gather and summarize sources while tracking citations; the publisher composes the final report (PDF/Markdown/Word). The 'Deep Research' mode runs a tree of recursive research steps with configurable depth/breadth and concurrency; an MCP server exposes it to other agent stacks.

## Ecosystem Position

Upstream: search providers (Tavily, Google, DuckDuckGo, custom), any major LLM. Competing: commercial deep-research features (OpenAI, Gemini, Perplexity) and open alternatives (Onyx, khoj research modes). Complementary: LangGraph multi-agent mode; usable as a library, REST API, or MCP tool inside larger agent products.

## Getting Started

```bash
pip install gpt-researcher
# python:
from gpt_researcher import GPTResearcher
researcher = GPTResearcher(query='Impact of EU AI Act on open-source model releases', report_type='research_report')
await researcher.conduct_research()
report = await researcher.write_report()
```

## Key Use Cases

1. **Scenario**: you want deep-research capability you can self-host, point at internal documents, or embed in your own product rather than paying per-report for commercial equivalents
2. **Scenario**: you need reports with traceable citations aggregated from many sources — the planner/executor design cross-validates across 20+ scraped pages by default, reducing single-source hallucination

## Strengths

- You want deep-research capability you can self-host, point at internal documents, or embed in your own product rather than paying per-report for commercial equivalents
- You need reports with traceable citations aggregated from many sources — the planner/executor design cross-validates across 20+ scraped pages by default, reducing single-source hallucination

## Limitations

- You need guaranteed factual accuracy for high-stakes decisions — aggregation reduces but does not eliminate hallucination, and web-source quality gates are heuristic
- A single web search suffices for your use case — a full research run costs multiple LLM calls and minutes of latency versus one cheap query

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/assafelovic/gpt-researcher)
- [Documentation](https://docs.gptr.dev)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (28,151 stars, last commit 2026-07-05, verified via GitHub API on 2026-07-08)*
