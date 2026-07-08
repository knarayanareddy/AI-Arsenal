---
id: "stack-polyglot"
title: "Tools by Stack — Polyglot"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Stack facet Polyglot, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

This routing page lists every tool in the Arsenal whose stack facet is Polyglot. It is generated and maintained from each tool's frontmatter, so it stays exhaustive as the catalog grows.

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

1. **Scenario**: you need a stack fit of "Polyglot" and want the full shortlist fast
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
| [Agent Skills (Addy Osmani)](../dx-and-tooling/addyosmani-agent-skills.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | polyglot | recommended |
| [AWS Bedrock](../serving-and-deployment/aws-bedrock.md) | serving and deployment | deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Azure AI Studio](../serving-and-deployment/azure-ai-studio.md) | serving and deployment | deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Cerebras Inference](../model-layer/cerebras-inference.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | watching |
| [Cohere](../model-layer/cohere.md) | model layer | production-serving | usage-based | Yes | Yes | No | python, polyglot | solid-choice |
| [Fly.io](../serving-and-deployment/fly-io.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | polyglot | recommended |
| [GitHub Copilot](../dx-and-tooling/github-copilot.md) | dx and tooling | prototyping | freemium | Yes | No | No | typescript, python, polyglot | solid-choice |
| [Google Vertex AI](../serving-and-deployment/google-vertex-ai.md) | serving and deployment | deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Groq](../model-layer/groq.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | recommended |
| [Jina AI Reader](../data-ingestion/jina-reader.md) | data ingestion | web-scraping | freemium | Yes | No | No | polyglot | recommended |
| [OpenRouter](../model-layer/openrouter.md) | model layer | production-serving, prototyping | usage-based | Yes | No | No | typescript, python, polyglot | recommended |
| [Railway](../serving-and-deployment/railway.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | polyglot | recommended |
| [Redis](../orchestration/redis-memory.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | polyglot | recommended |
| [RunPod](../serving-and-deployment/runpod.md) | serving and deployment | production-serving, deployment, fine-tuning | usage-based | No | No | No | python, polyglot | solid-choice |
| [Scale AI](../data-ingestion/scale-ai.md) | data ingestion | data-labeling | paid | Yes | No | No | polyglot | recommended |
| [Superpowers](../dx-and-tooling/superpowers.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | polyglot | recommended |
| [Temporal](../orchestration/temporal.md) | orchestration | orchestration | freemium | Yes | Yes | Yes | go, polyglot | recommended |
| [Together AI](../model-layer/together-ai.md) | model layer | production-serving, fine-tuning | usage-based | Yes | No | No | python, polyglot | recommended |
| [Voyage AI](../model-layer/voyage-ai.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | recommended |
