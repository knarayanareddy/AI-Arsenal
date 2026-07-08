---
id: "cost-open-source"
title: "Tools by Cost — Open Source"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Cost facet Open Source, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

This routing page lists every tool in the Arsenal whose cost facet is Open Source. It is generated and maintained from each tool's frontmatter, so it stays exhaustive as the catalog grows.

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

1. **Scenario**: you need a cost fit of "Open Source" and want the full shortlist fast
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
| [Agent Reach](../data-ingestion/agent-reach.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | watching |
| [Apache Airflow](../orchestration/airflow.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Argilla](../data-ingestion/argilla.md) | data ingestion | data-labeling, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Axolotl](../model-layer/axolotl.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Chainlit](../dx-and-tooling/chainlit.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Chrome DevTools MCP](../dx-and-tooling/chrome-devtools-mcp.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | typescript | recommended |
| [Codebase Memory MCP](../dx-and-tooling/codebase-memory-mcp.md) | dx and tooling | memory-management | open-source | Yes | Yes | Yes | cpp | use-with-caution |
| [Crawl4AI](../data-ingestion/crawl4ai-tool.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [CubeSandbox](../serving-and-deployment/cubesandbox.md) | serving and deployment | deployment, security-and-guardrails | open-source | Yes | Yes | Yes | rust | watching |
| [Dagster](../orchestration/dagster.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [DVC](../model-layer/dvc.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [FastAPI](../serving-and-deployment/fastapi.md) | serving and deployment | prototyping, production-serving | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard](../evaluation-and-observability/giskard.md) | evaluation and observability | evaluation, security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Gradio](../dx-and-tooling/gradio.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Guidance](../model-layer/guidance.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [Instructor](../dx-and-tooling/instructor.md) | dx and tooling | structured-output | open-source | Yes | Yes | Yes | python, typescript | best-in-class |
| [Letta](../orchestration/letta.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python | recommended |
| [LiteLLM](../serving-and-deployment/litellm.md) | serving and deployment | production-serving, prompt-management | open-source | Yes | Yes | Yes | python | recommended |
| [LLaMA-Factory](../model-layer/llamafactory.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Llama Guard](../evaluation-and-observability/llamaguard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [LLM Guard](../evaluation-and-observability/llm-guard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | solid-choice |
| [LoRAX](../serving-and-deployment/lorax.md) | serving and deployment | production-serving | open-source | Yes | Yes | Yes | python, rust | solid-choice |
| [Megatron-LM](../model-layer/megatron-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | solid-choice |
| [Mem0](../orchestration/mem0.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Mesop](../dx-and-tooling/mesop.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [MLflow](../model-layer/mlflow.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [MLX-LM](../model-layer/mlx-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [olmOCR](../data-ingestion/olmocr.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [OpenAI Evals](../evaluation-and-observability/openai-evals.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Orca](../dx-and-tooling/orca.md) | dx and tooling | orchestration | open-source | Yes | Yes | Yes | typescript | watching |
| [Outlines](../model-layer/outlines.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [PEFT](../model-layer/peft.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Playwright](../data-ingestion/playwright.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | typescript, python | recommended |
| [Prefect](../orchestration/prefect.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [promptfoo](../evaluation-and-observability/promptfoo.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | typescript | recommended |
| [Puppeteer](../data-ingestion/puppeteer.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | typescript | recommended |
| [Pydantic AI](../orchestration/pydantic-ai-tool.md) | orchestration | structured-output, orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Ragas](../evaluation-and-observability/ragas.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Ray](../serving-and-deployment/ray.md) | serving and deployment | production-serving, orchestration, fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Rebuff](../evaluation-and-observability/rebuff.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Redis](../orchestration/redis-memory.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | polyglot | recommended |
| [SkillSpector](../evaluation-and-observability/skillspector.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | watching |
| [Superpowers](../dx-and-tooling/superpowers.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | polyglot | recommended |
| [TencentDB Agent Memory](../dx-and-tooling/tencentdb-agent-memory.md) | dx and tooling | memory-management | open-source | Yes | Yes | Yes | typescript | watching |
| [Text Embeddings Inference (TEI)](../serving-and-deployment/text-embeddings-inference.md) | serving and deployment | production-serving, vector-search | open-source | Yes | Yes | Yes | rust | recommended |
| [torchtune](../model-layer/torchtune.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [TruLens](../evaluation-and-observability/trulens.md) | evaluation and observability | evaluation, tracing | open-source | Yes | Yes | Yes | python | recommended |
| [Unsloth](../model-layer/unsloth.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Vespa](../data-ingestion/vespa.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | java, cpp | solid-choice |
| [Zep](../orchestration/zep.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python, typescript | recommended |
