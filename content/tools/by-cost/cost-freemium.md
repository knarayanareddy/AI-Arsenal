---
id: "cost-freemium"
title: "Tools by Cost — Freemium"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Cost facet Freemium, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

This routing page lists every tool in the Arsenal whose cost facet is Freemium. It is generated and maintained from each tool's frontmatter, so it stays exhaustive as the catalog grows.

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

1. **Scenario**: you need a cost fit of "Freemium" and want the full shortlist fast
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
| [Agent Browser Shield](../data-ingestion/agent-browser-shield.md) | data ingestion | security-and-guardrails, web-scraping | freemium | Yes | No | No | python | watching |
| [AgentOps](../evaluation-and-observability/agentops.md) | evaluation and observability | tracing, monitoring, evaluation | freemium | Yes | No | Yes | python | watching |
| [Airbyte](../data-ingestion/airbyte.md) | data ingestion | data-labeling, web-scraping | freemium | Yes | Yes | Yes | java, python | solid-choice |
| [BentoML](../serving-and-deployment/bentoml.md) | serving and deployment | deployment, production-serving | freemium | Yes | Yes | Yes | python | recommended |
| [Browserbase](../data-ingestion/browserbase.md) | data ingestion | web-scraping | freemium | Yes | No | No | typescript | watching |
| [Claude Artifact Player](../dx-and-tooling/claude-artifact-player.md) | dx and tooling | structured-output | freemium | Yes | No | No | typescript | watching |
| [ClearML](../model-layer/clearml.md) | model layer | model-registry, orchestration | freemium | Yes | Yes | Yes | python | solid-choice |
| [Code Arena](../evaluation-and-observability/code-arena.md) | evaluation and observability | evaluation | freemium | Yes | No | No | python | watching |
| [Codex Plugin for Claude Code](../dx-and-tooling/codex-plugin-cc.md) | dx and tooling | prototyping | freemium | Yes | No | Yes | typescript | recommended |
| [Composio](../orchestration/composio.md) | orchestration | orchestration | freemium | Yes | No | Yes | python, typescript | watching |
| [Continue](../dx-and-tooling/continue-dev.md) | dx and tooling | prototyping | freemium | Yes | Yes | Yes | typescript | recommended |
| [Cursor](../dx-and-tooling/cursor.md) | dx and tooling | prototyping | freemium | Yes | No | No | typescript | recommended |
| [Deepchecks](../evaluation-and-observability/deepchecks.md) | evaluation and observability | evaluation, monitoring | freemium | Yes | Yes | Yes | python | solid-choice |
| [Dropstone 3](../dx-and-tooling/dropstone-3.md) | dx and tooling | orchestration, prototyping | freemium | Yes | No | No | typescript | watching |
| [E2B](../orchestration/e2b.md) | orchestration | orchestration | freemium | Yes | Yes | Yes | typescript, python, go | recommended |
| [Empromptu AI](../orchestration/empromptu-ai.md) | orchestration | orchestration, deployment | freemium | Yes | No | No | python | watching |
| [Evidently](../evaluation-and-observability/evidently.md) | evaluation and observability | evaluation, monitoring | freemium | Yes | Yes | Yes | python | recommended |
| [Firecrawl](../data-ingestion/firecrawl-tool.md) | data ingestion | web-scraping | freemium | Yes | Yes | Yes | typescript | recommended |
| [Flowise](../orchestration/flowise.md) | orchestration | orchestration, prototyping | freemium | Yes | Yes | Yes | typescript | solid-choice |
| [Gemini CLI](../dx-and-tooling/gemini-cli.md) | dx and tooling | prototyping | freemium | Yes | No | Yes | typescript | recommended |
| [GitHub Copilot](../dx-and-tooling/github-copilot.md) | dx and tooling | prototyping | freemium | Yes | No | No | typescript, python, polyglot | solid-choice |
| [Google Pomelli 2.0](../dx-and-tooling/google-pomelli-2-0.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Guardrails AI](../evaluation-and-observability/guardrails-ai.md) | evaluation and observability | security-and-guardrails, structured-output | freemium | Yes | Yes | Yes | python | recommended |
| [Honen](../dx-and-tooling/honen.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Hugging Face Hub](../model-layer/hugging-face-hub.md) | model layer | model-registry | freemium | Yes | No | No | python | recommended |
| [Ideogram](../model-layer/ideogram.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Ideogram AI](../model-layer/ideogram-ai.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Jina AI Reader](../data-ingestion/jina-reader.md) | data ingestion | web-scraping | freemium | Yes | No | No | polyglot | recommended |
| [Kimi K2.5](../model-layer/kimi-k2-5.md) | model layer | production-serving, orchestration | freemium | Yes | No | No | python | watching |
| [Label Studio](../data-ingestion/label-studio.md) | data ingestion | data-labeling | freemium | Yes | Yes | Yes | python | recommended |
| [Langfuse Prompts](../dx-and-tooling/langfuse-prompts.md) | dx and tooling | prompt-management | freemium | Yes | Yes | Yes | python, typescript | recommended |
| [LangSmith](../evaluation-and-observability/langsmith.md) | evaluation and observability | evaluation, tracing, monitoring | freemium | Yes | No | No | python, typescript | recommended |
| [LangSmith Hub](../dx-and-tooling/langsmith-hub.md) | dx and tooling | prompt-management | freemium | Yes | No | No | python, typescript | recommended |
| [LM Studio](../dx-and-tooling/lm-studio.md) | dx and tooling | prototyping | freemium | Yes | Yes | No | typescript, cpp | recommended |
| [Meilisearch](../data-ingestion/meilisearch.md) | data ingestion | vector-search | freemium | Yes | Yes | Yes | rust | recommended |
| [Memoriq](../orchestration/memoriq.md) | orchestration | memory-management | freemium | Yes | No | No | python | watching |
| [n8n](../orchestration/n8n.md) | orchestration | orchestration, prototyping | freemium | Yes | Yes | Yes | typescript | recommended |
| [OrchestraML](../orchestration/orchestraml.md) | orchestration | orchestration, fine-tuning | freemium | Yes | No | No | python | watching |
| [Pinecone](../data-ingestion/pinecone.md) | data ingestion | vector-search | freemium | Yes | No | No | python, typescript | recommended |
| [Portkey](../serving-and-deployment/portkey.md) | serving and deployment | prompt-management, monitoring | freemium | Yes | No | No | python, typescript | recommended |
| [PromptLayer](../dx-and-tooling/promptlayer.md) | dx and tooling | prompt-management | freemium | Yes | No | No | python, typescript | recommended |
| [Qursor](../dx-and-tooling/qursor.md) | dx and tooling | orchestration, structured-output | freemium | Yes | No | No | typescript | watching |
| [Qwen 3](../model-layer/qwen-3.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Recursi](../dx-and-tooling/recursi.md) | dx and tooling | production-serving | freemium | Yes | No | No | python | watching |
| [SeaTicket](../orchestration/seaticket.md) | orchestration | orchestration | freemium | Yes | No | No | python | watching |
| [ShellMate](../dx-and-tooling/shellmate.md) | dx and tooling | production-serving | freemium | Yes | No | No | python | watching |
| [Spotlight by Backplanes](../evaluation-and-observability/spotlight-by-backplanes.md) | evaluation and observability | tracing, monitoring | freemium | Yes | No | No | python | watching |
| [Streamlit](../dx-and-tooling/streamlit.md) | dx and tooling | prototyping | freemium | Yes | Yes | Yes | python | recommended |
| [Superlog](../evaluation-and-observability/superlog.md) | evaluation and observability | monitoring, tracing | freemium | Yes | No | No | typescript | watching |
| [Tabstack](../data-ingestion/tabstack.md) | data ingestion | web-scraping | freemium | Yes | No | No | typescript | watching |
| [Taste Lab](../data-ingestion/taste-lab.md) | data ingestion | web-scraping | freemium | Yes | No | No | python | watching |
| [Temporal](../orchestration/temporal.md) | orchestration | orchestration | freemium | Yes | Yes | Yes | go, polyglot | recommended |
| [Typesense](../data-ingestion/typesense.md) | data ingestion | vector-search | freemium | Yes | Yes | Yes | cpp | solid-choice |
| [Vaani](../dx-and-tooling/vaani.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Vercel](../serving-and-deployment/vercel.md) | serving and deployment | deployment, production-serving | freemium | Yes | No | No | typescript | best-in-class |
| [Weights & Biases Weave](../evaluation-and-observability/wandb-weave.md) | evaluation and observability | tracing, evaluation | freemium | Yes | No | No | python | solid-choice |
| [Weights & Biases](../model-layer/weights-biases.md) | model layer | model-registry, evaluation | freemium | Yes | No | No | python | recommended |
| [Windsurf](../dx-and-tooling/windsurf.md) | dx and tooling | prototyping | freemium | Yes | No | No | typescript | solid-choice |
