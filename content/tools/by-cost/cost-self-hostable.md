---
id: "cost-self-hostable"
title: "Tools by Cost — Self Hostable"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Cost facet Self Hostable, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The shortlist of tooling you can run inside your own network, grouped because data residency, compliance and air-gapped requirements routinely rule out everything else. Grouping by this axis surfaces a fact the feature list hides: self-hosting replaces a licence fee with an operating commitment you now own.

## Why It's in the Arsenal

Data residency, compliance and air-gapped requirements routinely remove everything else, which is a better reason to choose a tool than any feature comparison. Grouping by cost model makes self-hostable options findable from the requirement rather than from a preference, and keeps the operating commitment visible next to the licence.

## Key Features

- Every entry states what you take on: uptime, patching, scaling and on-call, none of which the licence covers.
- Hardware sizing guidance is against peak rather than average, since idle capacity is where the cost actually lands.
- Entries with no hosted counterpart are marked, because data-residency requirements often leave only these.

## Architecture / How It Works

Each entry records what you take on when you self-host: uptime, patching, scaling and on-call. The page is generated from the self-hostable frontmatter facet, so an option that adds or drops self-hosting is reflected without a separate edit here.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: data residency or compliance rules prevent you sending data to a hosted API, and you need to know what you now own.
2. **Scenario**: you want to compare the cost of self-hosting against the hosted equivalent at your actual volume.
3. **Scenario**: you need an offline or air-gapped capability and are checking which options support it.

## Strengths

- Groups by what you take on, since the licence is free and the operations are not.
- Makes the peak-versus-average hardware sizing explicit, which is the step where the cost model breaks.
- Flags options with no self-hosted equivalent as genuine differentiators rather than defaults.

## Limitations / When NOT to Use

- Self-hostable means you own the uptime, the patching, the scaling and the on-call, none of which appear in the licence.
- The hardware is sized for your peak, not your average, so the cost model has a step function in it.
- Some hosted tiers have no self-hosted equivalent, so "self-hostable" is a genuine differentiator rather than a feature to assume.

## Integration Patterns

- Link a self-hostable option here from any entry constrained by data residency, so the compliant choice is findable from the requirement.
- When an entry claims compliance suitability, verify it against the tool's actual hosting model.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [n8n](../orchestration/n8n.md) | orchestration | orchestration, prototyping | self-hostable | Yes | Yes | Yes | typescript | recommended |
| [Redis](../orchestration/redis-memory.md) | orchestration | memory-management | self-hostable | Yes | Yes | Yes | polyglot | recommended |
| [Temporal](../orchestration/temporal.md) | orchestration | orchestration | self-hostable | Yes | Yes | Yes | go, polyglot | recommended |
