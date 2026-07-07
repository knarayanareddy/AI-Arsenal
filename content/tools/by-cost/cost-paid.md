---
id: "cost-paid"
title: "Tools by Cost — Paid"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Cost facet Paid, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

This routing page lists every tool in the Arsenal whose cost facet is Paid. It is generated and maintained from each tool's frontmatter, so it stays exhaustive as the catalog grows.

## Why It's in the Arsenal

Tool-by-facet pages let builders shortlist options along the two axes that matter most for adoption cost and integration fit, without browsing the entire repository.

## Key Features

- Exhaustive: every matching tool, derived from frontmatter
- Auto-updating: regenerated whenever tool facets change
- Links to canonical tool entries instead of duplicating long-form content

## Architecture / How It Works

The table below is produced by scripts/generate-tool-facet-guides.js from the cost_model and stack facets on each tool. Adding or editing a tool updates the relevant facet pages on the next generation.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you need a cost fit of "Paid" and want the full shortlist fast
2. **Scenario**: comparing options before a production or prototyping decision

## Strengths

- Fast, exhaustive shortlist for humans and LLM agents
- Avoids duplicate long-form tool descriptions

## Limitations / When NOT to Use

- Does not replace hands-on evaluation
- Pricing, hosting, and integration details change; verify before production

## Integration Patterns

- Link to canonical tool IDs from architecture docs and decision trees
- Pair with the By-Job and By-Phase routing pages for cross-cutting views

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [AGNT.Hub](../orchestration/agnt-hub.md) | orchestration | orchestration, security-and-guardrails | paid | No | No | No | python | watching |
| [Astra Autonomous Pentest](../evaluation-and-observability/astra-autonomous-pentest.md) | evaluation and observability | security-and-guardrails, evaluation | paid | No | No | No | python | watching |
| [Basedash](../dx-and-tooling/basedash.md) | dx and tooling | structured-output | paid | No | No | No | typescript | watching |
| [Cloudskill](../orchestration/cloudskill.md) | orchestration | orchestration, prompt-management | paid | No | No | No | python | watching |
| [Conan](../evaluation-and-observability/conan.md) | evaluation and observability | monitoring, tracing | paid | No | No | No | python | watching |
| [Humanloop](../evaluation-and-observability/humanloop.md) | evaluation and observability | prompt-management, evaluation | paid | No | No | No | python, typescript | solid-choice |
| [Manus](../orchestration/manus.md) | orchestration | prototyping, orchestration | paid | No | No | No | python | watching |
| [Monako Glass](../evaluation-and-observability/monako-glass.md) | evaluation and observability | monitoring, evaluation | paid | No | No | No | python | watching |
| [Prodigy](../data-ingestion/prodigy.md) | data ingestion | data-labeling | paid | Yes | No | No | python | recommended |
| [Scale AI](../data-ingestion/scale-ai.md) | data ingestion | data-labeling | paid | Yes | No | No | polyglot | recommended |
