---
id: skyvern
name: Skyvern
version_tracked: null
artifact_type: platform
category: agents
subcategory: browser-agents
description: "Vision-LLM browser automation with a Playwright-compatible SDK and a no-code workflow builder"
github_url: "https://github.com/Skyvern-AI/skyvern"
license: AGPL-3.0
primary_language: Python
org_or_maintainer: Skyvern-AI
tags: [agents, llm]
maturity: production
cost_model: freemium
github_stars: 23090
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-09-28"
docs_url: "https://www.skyvern.com/docs/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose, vision]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "The workflow-automation pole of the browser-agent space: where browser-use targets developers building agents, Skyvern targets replacing brittle RPA scripts — vision + LLM planning over screenshots so automations survive website redesigns"
best_for: ["You are automating the same business process across many different vendor or partner sites and want one workflow definition rather than one script per site.", "You have XPaths breaking on a redesign and need navigation that re-derives targets from the visual page each run instead of following a fixed selector path.", "You want both a Python SDK for engineers and a no-code builder for the operations people who will actually maintain the workflow."]
avoid_if: ["You need byte-identical reproducibility, because an LLM choosing each interaction means two runs can differ even with the same workflow file.", "You cannot run multiple concurrent browser sessions and pay for the compute behind them, since Skyvern Cloud exists precisely because parallel instances cost infrastructure.", "You have no vision-capable model budget, because every page visit is a vision call rather than a cheap DOM parse."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [browser-use, stagehand]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (22.1k), AGPL-3.0, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. Anti-fragility claims describe the mechanism (vision-based grounding vs selectors) per official docs; per-task reliability not independently benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/Skyvern-AI/skyvern","date":"2026-07-08","description":"22.1k stars, YC-backed company, active development"}
featured: false
status: active
---

## Overview

Skyvern automates browser workflows by pairing a Playwright-compatible SDK with vision LLMs and a no-code workflow builder. Instead of encoding XPath or selector interactions, a swarm of agents comprehends the page visually, plans the next step, and executes it through Playwright, which the README credits to the task-driven design of BabyAGI and AutoGPT. Stated advantages are operating on unseen sites without custom code, resistance to layout changes because no predetermined selectors are searched for, and applying one workflow across many websites by reasoning through the interactions. Skyvern Cloud runs parallel instances with anti-bot detection bundled.

## Why it's in the Arsenal

The decision it addresses is selector maintenance. A DOM-driven script encodes today's markup, and when marketing ships a redesign your pipeline dies with a timeout rather than a clean failure. Vision-based navigation moves the brittleness into the model, which re-reads the page each run, so a layout change costs accuracy instead of uptime. The tradeoff is that a page the model cannot read now becomes a silent failure where a selector would have been explicit.

## Architecture

A task-driven planner decomposes the workflow into steps; specialised agents handle comprehension, action synthesis and extraction, exchanging structured outputs rather than free text. Page understanding uses a vision LLM over screenshots, and the chosen action is applied through Playwright, which supplies the actual browser control. Because targets are derived from the current visual state, no selector table is consulted during navigation. Execution is therefore a repeated observe-plan-act loop with the vision model in the critical path of every step.

## Ecosystem Position

It competes directly with browser-use in vision-driven browser automation, and the difference is packaging: Skyvern's pitch centres on a workflow builder plus a swarm of specialised agents for repeatable business processes, while browser-use leads with the open-source agent library and a hosted browser-hour tier. It overlaps with content/tools/data-ingestion/playwright, which is the deterministic substrate Skyvern drives, and complements content/tools/orchestration where a browser step is one node in a larger flow.

## Getting Started

The SDK is a Python package installed from PyPI, and the cloud tier needs no infrastructure at all:

```bash
pip install skyvern
```

Self-hosted installs run the service and point the SDK at your own instance; Skyvern Cloud at app.skyvern.com bundles parallel instances and anti-bot handling.

## Key Use Cases

1. Vendor onboarding repeated across dozens of partner portals: one workflow definition, applied to each site by reasoning rather than by per-site selectors.
2. Insurance or expense filing where forms change quarterly and a selector-based script would need a patch every release.
3. Non-technical workflow ownership: operations staff edit the flow in the builder while engineers keep the SDK path for custom logic.

## Strengths

- One workflow generalises across many sites, which is the specific win over per-site selector scripts.
- Layout changes degrade accuracy rather than breaking the run, since targets are re-derived every navigation step.
- Playwright-compatible SDK means existing browser knowledge and debugging tools transfer.
- Managed cloud with parallel instances and anti-bot handling removes the infrastructure work from small teams.

## Limitations

AGPL-3.0 is a real constraint for a team that needs to embed modified code in a proprietary product without releasing the corresponding source. Vision inference in the loop makes each step cost a model call, so a long workflow is materially more expensive than a DOM-parsing equivalent and slower per step. Runs are non-deterministic, so regression testing means judging outcomes rather than diffing traces, and Skyvern's own WebVoyager-style numbers are vendor-published. And with a swarm of agents in the path, diagnosing a wrong click means reasoning about several intermediate decisions rather than one selector.

## Relation to the Arsenal

This is the workflow-centric browser automation entry in content/projects/agent-systems, and its natural pair is browser-use in the same phase plus playwright in content/tools/data-ingestion as the driver underneath. It differs from the crawling entries such as crawl4ai in that it drives a live session rather than fetching pages. Its parallel-instance story makes it a candidate component for the orchestration entries in content/tools/orchestration when workflows need queuing and retries.

## Resources

- [GitHub — Skyvern-AI/skyvern](https://github.com/Skyvern-AI/skyvern)
- [Docs — skyvern.com/docs](https://www.skyvern.com/docs/)
- [Technical report on WebVoyager evaluation](https://www.skyvern.com/blog/skyvern-2-0-state-of-the-art-web-navigation-with-85-8-on-webvoyager-eval/)
