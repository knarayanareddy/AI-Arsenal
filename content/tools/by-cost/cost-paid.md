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

The shortlist of paid tooling, grouped because per-token and per-call pricing turns your architecture into a cost decision. What matters on this page is not the feature list but the unit economics: which costs are metered, which are committed, and how each behaves as volume changes.

## Why It's in the Arsenal

Per-token and per-call pricing makes architecture a financial decision, because caching, batching, routing and context management all show up on the invoice. Grouping by cost model keeps the unit economics in view at the point of tool selection, rather than surfacing them when the first bill arrives.

## Key Features

- Every entry states the metering unit, because a per-token price and a per-seat price behave differently as you scale.
- Committed and metered costs are distinguished, so the shape of the bill is predictable before the first invoice.
- Contract terms are treated as part of the decision, since they outlive the code written against them.

## Architecture / How It Works

Each entry records the metering unit and whether the cost is committed or metered, because that is what determines the shape of the bill as volume changes. The page is generated from the pricing and cost-model frontmatter facets rather than maintained by hand, so a price change lands in one place.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you are building a costed plan and need per-unit prices and what drives them.
2. **Scenario**: you are deciding whether a paid managed service is cheaper than hosting the equivalent yourself.
3. **Scenario**: you need to know which costs are metered and which are committed, because the two behave differently as volume changes.

## Strengths

- Distinguishes metered from committed cost, which behave very differently as volume changes.
- Treats the contract as part of the decision, not just the price list.
- Makes clear that per-token pricing turns caching, batching and routing into engineering requirements.

## Limitations / When NOT to Use

- Published prices cover the common case; enterprise agreements, committed-use discounts and egress charges routinely change the effective unit cost.
- Paid per-token or per-call pricing makes your architecture a cost decision: caching, batching and model routing become engineering requirements.
- A paid service is a procurement decision as well as a technical one, and the contract terms outlive the code you write against it.

## Integration Patterns

- Link a paid tool here from any entry whose architecture depends on its pricing, especially agent and long-context workloads where loops multiply cost.
- When a pricing change lands, check the cost-relevant entries rather than only the tool entry.

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
| [NVIDIA NIM](../serving-and-deployment/nvidia-nim.md) | serving and deployment | production-serving, deployment | paid | Yes | Yes | No | python, cpp | solid-choice |
| [Prodigy](../data-ingestion/prodigy.md) | data ingestion | data-labeling | paid | Yes | No | No | python | recommended |
| [Scale AI](../data-ingestion/scale-ai.md) | data ingestion | data-labeling | paid | Yes | No | No | polyglot | recommended |
