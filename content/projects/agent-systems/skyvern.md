---
id: skyvern
name: Skyvern
version_tracked: null
artifact_type: platform
category: agents
subcategory: browser-agents
description: LLM + computer-vision browser automation that operates websites from natural-language goals instead of brittle DOM selectors
github_url: "https://github.com/Skyvern-AI/skyvern"
license: AGPL-3.0
primary_language: Python
org_or_maintainer: Skyvern-AI
tags: [agents, tool-use, vision]
maturity: production
cost_model: self-hostable
github_stars: 22154
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-07-08"
docs_url: "https://docs.skyvern.com"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose, vision]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "The workflow-automation pole of the browser-agent space: where browser-use targets developers building agents, Skyvern targets replacing brittle RPA scripts — vision + LLM planning over screenshots so automations survive website redesigns"
best_for:
  - You maintain Selenium/Playwright/RPA scripts that break on every site update — Skyvern's per-run visual grounding (annotated screenshots → LLM-chosen actions) removes the hardcoded-selector fragility by mechanism
  - Your automation spans many unknown or changing third-party sites (procurement portals, government forms, invoice downloads) where writing per-site scripts doesn't scale
avoid_if:
  - Your automation runs on a handful of stable, known sites at high volume — deterministic Playwright scripts are faster, cheaper per run, and easier to debug than LLM-planned actions
  - AGPL-3.0 is incompatible with how you'd embed it — the license propagates for network-service usage; the hosted cloud is the escape hatch
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

Skyvern automates browser workflows from natural-language goals: it screenshots the page, detects and annotates interactable elements with computer vision, and asks an LLM to plan the next action — click, type, select — iterating until the goal completes. Because grounding is visual and per-run rather than selector-based and pre-scripted, the same workflow keeps working across site redesigns and across sites it has never seen.

## Why it's in the Arsenal

Browser automation is the most economically obvious agent application, and its historical failure mode is selector rot. Skyvern is the production-oriented open-source system attacking that failure by mechanism (vision grounding replaces selectors), with company backing and a workflow engine (loops, chained tasks, 2FA handling, proxies) that distinguishes "RPA replacement" from "agent demo." It complements rather than duplicates `browser-use` — different audience, same space.

## Architecture

Task loop: Playwright-driven browser → screenshot + DOM-assisted element detection → annotated elements passed to a multimodal LLM → structured action plan → execution → repeat until termination. A workflow layer composes tasks with control flow, data extraction schemas, credential/2FA handling, and webhooks; runs are observable step-by-step with the screenshots and reasoning recorded. Self-host via Docker or use the managed cloud.

## Ecosystem Position

Upstream: multimodal LLM providers, Playwright. Competing: browser-use (developer library), Stagehand (AI-native Playwright extension), classic RPA (UiPath) on the incumbent side. Complementary: orchestration frameworks that trigger Skyvern workflows as steps in larger pipelines.

## Getting Started

```bash
pip install skyvern
skyvern quickstart
skyvern run task --prompt "Find a quote for auto insurance on <site> with these details..."
```

## Key Use Cases

1. **Scenario**: replacing a portfolio of breakage-prone RPA scripts (portal logins, form submissions, document downloads) with goal-level automations that tolerate UI changes
2. **Scenario**: one automation across many heterogeneous third-party sites — e.g. fetching invoices from dozens of vendor portals — where per-site scripting is economically impossible

## Strengths

- Vision-based grounding removes the root cause of RPA fragility (hardcoded selectors) rather than patching it — the architectural bet the whole project rests on
- Production workflow machinery beyond the agent loop: chained tasks, loops, structured extraction, 2FA/TOTP support, proxy management, and full run observability

## Limitations

- LLM-planned actions cost more per run and are less deterministic than scripted automation — wrong economics for high-volume workflows on stable, known sites
- AGPL-3.0 constrains embedding in commercial products; and like all browser agents, prompt-injection via hostile page content is an open risk for workflows touching untrusted sites

## Relation to the Arsenal

Sits alongside `browser-use` (developer framework) and `stagehand` (AI-augmented Playwright) as the deploy-as-is workflow platform of the browser-agent trio; agent-reliability guidance in [tips-and-tricks/agents-and-orchestration](../../tips-and-tricks/agents-and-orchestration/_index.md) applies directly.

## Resources

- [GitHub](https://github.com/Skyvern-AI/skyvern)
- [Documentation](https://docs.skyvern.com)
