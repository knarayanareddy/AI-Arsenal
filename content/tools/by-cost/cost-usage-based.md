---
id: "cost-usage-based"
title: "Tools by Cost — Usage Based"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Cost facet Usage Based, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The shortlist of usage-billed tooling, grouped because metering makes your workload an input to your bill. Retries, verbose prompts, long context and agent loops all multiply cost quietly, so the metering point is the fact that decides which optimisations are worth building.

## Why It's in the Arsenal

Usage pricing makes your workload an input to your bill, so the metering point decides which optimisations are worth building. Grouping by cost model keeps that visible during selection, at the point where caching and routing decisions are still cheap to make differently.

## Key Features

- Every entry states where metering happens, which is what determines which optimisation reduces the bill.
- Multipliers on spend — retries, long context, agent loops — are called out because they are where unexpected cost originates.
- Hard caps are described as service-level controls rather than cost controls, since they stop traffic to stop spend.

## Architecture / How It Works

Each entry records where metering happens, which is what determines which optimisation reduces the bill. The page is generated from the cost-model and pricing frontmatter facets, and the metering notes live in the tool entries so they are updated where the behaviour is described.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: your spend scales with usage and you need to model the bill before committing to an architecture.
2. **Scenario**: you want to know which usage-based options have a floor, a cap, or an egress charge that surprises people.
3. **Scenario**: you are designing for cost control and need to know where metering happens so you can reduce it.

## Strengths

- Makes the metering point visible, since that is what determines which optimisations reduce the bill.
- Treats retries and agent loops as cost multipliers, which is where unexpected spend comes from.
- Notes the bluntness of hard caps, which stop service rather than cost.

## Limitations / When NOT to Use

- Usage-based pricing makes your workload an input to your bill: retries, verbose prompts and agent loops all multiply cost quietly.
- Metering granularity differs per provider, so equivalent architectures can cost very different amounts.
- A hard spend cap is a blunt instrument: it stops spend by stopping service, which is rarely the behaviour you want in production.

## Integration Patterns

- Link a usage-based tool here from any entry whose request volume is user-driven rather than fixed.
- When a build example adds caching or routing for cost reasons, cross-reference the cost page so the rationale is recorded.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [Anyscale](../serving-and-deployment/anyscale.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | python | solid-choice |
| [AWS Bedrock](../serving-and-deployment/aws-bedrock.md) | serving and deployment | deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Azure AI Studio](../serving-and-deployment/azure-ai-studio.md) | serving and deployment | deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Baseten](../serving-and-deployment/baseten.md) | serving and deployment | production-serving, deployment | usage-based | Yes | No | No | python | recommended |
| [Cerebras Inference](../model-layer/cerebras-inference.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | watching |
| [Claude Code](../dx-and-tooling/claude-code.md) | dx and tooling | prototyping | usage-based | No | No | No | typescript | best-in-class |
| [Cloudflare Workers AI](../serving-and-deployment/cloudflare-workers-ai.md) | serving and deployment | production-serving | usage-based | Yes | No | No | typescript | solid-choice |
| [Cohere](../model-layer/cohere.md) | model layer | production-serving | usage-based | Yes | Yes | No | python, polyglot | solid-choice |
| [DocETL](../data-ingestion/docetl.md) | data ingestion | orchestration | usage-based | Yes | Yes | Yes | python | watching |
| [E2B](../orchestration/e2b.md) | orchestration | orchestration | usage-based | Yes | Yes | Yes | typescript, python, go | recommended |
| [Exa](../data-ingestion/exa.md) | data ingestion | web-scraping | usage-based | Yes | No | No | python | recommended |
| [Fireworks AI](../serving-and-deployment/fireworks-ai.md) | serving and deployment | production-serving | usage-based | No | No | No | python, typescript | solid-choice |
| [Fly.io](../serving-and-deployment/fly-io.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | polyglot | recommended |
| [Google Vertex AI](../serving-and-deployment/google-vertex-ai.md) | serving and deployment | deployment | usage-based | Yes | No | No | polyglot | recommended |
| [Groq](../model-layer/groq.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | recommended |
| [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | python, typescript | recommended |
| [Modal](../serving-and-deployment/modal.md) | serving and deployment | deployment, production-serving | usage-based | No | No | No | python | recommended |
| [Nomic Atlas](../data-ingestion/nomic-atlas.md) | data ingestion | data-labeling | usage-based | Yes | No | No | python | solid-choice |
| [OpenAI Codex CLI](../dx-and-tooling/openai-codex-cli.md) | dx and tooling | prototyping | usage-based | No | No | Yes | rust | recommended |
| [OpenRouter](../model-layer/openrouter.md) | model layer | production-serving, prototyping | usage-based | Yes | No | No | typescript, python, polyglot | recommended |
| [Railway](../serving-and-deployment/railway.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | polyglot | recommended |
| [Reducto](../data-ingestion/reducto.md) | data ingestion | structured-output | usage-based | Yes | No | No | python | solid-choice |
| [Replicate](../serving-and-deployment/replicate.md) | serving and deployment | deployment, production-serving | usage-based | No | No | No | python, typescript | solid-choice |
| [RunPod](../serving-and-deployment/runpod.md) | serving and deployment | production-serving, deployment, fine-tuning | usage-based | No | No | No | python, polyglot | solid-choice |
| [Together AI](../model-layer/together-ai.md) | model layer | production-serving, fine-tuning | usage-based | Yes | No | No | python, polyglot | recommended |
| [Voyage AI](../model-layer/voyage-ai.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | recommended |
| [XiuRouter](../serving-and-deployment/xiurouter.md) | serving and deployment | production-serving, prototyping | usage-based | No | No | No | polyglot | watching |
| [Zep](../orchestration/zep.md) | orchestration | memory-management | usage-based | Yes | Yes | Yes | python, typescript | recommended |
