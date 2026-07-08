---
id: "stack-python"
title: "Tools by Stack — Python"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Stack facet Python, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

This routing page lists every tool in the Arsenal whose stack facet is Python. It is generated and maintained from each tool's frontmatter, so it stays exhaustive as the catalog grows.

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

1. **Scenario**: you need a stack fit of "Python" and want the full shortlist fast
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
| [Hugging Face Accelerate](../model-layer/accelerate.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Agent Browser Shield](../data-ingestion/agent-browser-shield.md) | data ingestion | security-and-guardrails, web-scraping | freemium | Yes | No | No | python | watching |
| [Agent Reach](../data-ingestion/agent-reach.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | watching |
| [AGNT.Hub](../orchestration/agnt-hub.md) | orchestration | orchestration, security-and-guardrails | paid | No | No | No | python | watching |
| [Apache Airflow](../orchestration/airflow.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Argilla](../data-ingestion/argilla.md) | data ingestion | data-labeling, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Astra Autonomous Pentest](../evaluation-and-observability/astra-autonomous-pentest.md) | evaluation and observability | security-and-guardrails, evaluation | paid | No | No | No | python | watching |
| [Axolotl](../model-layer/axolotl.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [BentoML](../serving-and-deployment/bentoml.md) | serving and deployment | deployment, production-serving | freemium | Yes | Yes | Yes | python | recommended |
| [Chainlit](../dx-and-tooling/chainlit.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Cloudskill](../orchestration/cloudskill.md) | orchestration | orchestration, prompt-management | paid | No | No | No | python | watching |
| [Code Arena](../evaluation-and-observability/code-arena.md) | evaluation and observability | evaluation | freemium | Yes | No | No | python | watching |
| [Conan](../evaluation-and-observability/conan.md) | evaluation and observability | monitoring, tracing | paid | No | No | No | python | watching |
| [Crawl4AI](../data-ingestion/crawl4ai-tool.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [Dagster](../orchestration/dagster.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [DVC](../model-layer/dvc.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [Empromptu AI](../orchestration/empromptu-ai.md) | orchestration | orchestration, deployment | freemium | Yes | No | No | python | watching |
| [FastAPI](../serving-and-deployment/fastapi.md) | serving and deployment | prototyping, production-serving | open-source | Yes | Yes | Yes | python | recommended |
| [Fireworks AI](../serving-and-deployment/fireworks-ai.md) | serving and deployment | production-serving | usage-based | No | No | No | python, typescript | solid-choice |
| [Giskard](../evaluation-and-observability/giskard.md) | evaluation and observability | evaluation, security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Google Pomelli 2.0](../dx-and-tooling/google-pomelli-2-0.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Gradio](../dx-and-tooling/gradio.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Guardrails AI](../evaluation-and-observability/guardrails-ai.md) | evaluation and observability | security-and-guardrails, structured-output | freemium | Yes | Yes | Yes | python | recommended |
| [Guidance](../model-layer/guidance.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | python, typescript | recommended |
| [Honen](../dx-and-tooling/honen.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Hugging Face Hub](../model-layer/hugging-face-hub.md) | model layer | model-registry | freemium | Yes | No | No | python | recommended |
| [Humanloop](../evaluation-and-observability/humanloop.md) | evaluation and observability | prompt-management, evaluation | paid | No | No | No | python, typescript | solid-choice |
| [Ideogram](../model-layer/ideogram.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Ideogram AI](../model-layer/ideogram-ai.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Instructor](../dx-and-tooling/instructor.md) | dx and tooling | structured-output | open-source | Yes | Yes | Yes | python, typescript | best-in-class |
| [Kimi K2.5](../model-layer/kimi-k2-5.md) | model layer | production-serving, orchestration | freemium | Yes | No | No | python | watching |
| [Label Studio](../data-ingestion/label-studio.md) | data ingestion | data-labeling | freemium | Yes | Yes | Yes | python | recommended |
| [Langfuse Prompts](../dx-and-tooling/langfuse-prompts.md) | dx and tooling | prompt-management | freemium | Yes | Yes | Yes | python, typescript | recommended |
| [LangSmith](../evaluation-and-observability/langsmith.md) | evaluation and observability | evaluation, tracing, monitoring | freemium | Yes | No | No | python, typescript | recommended |
| [LangSmith Hub](../dx-and-tooling/langsmith-hub.md) | dx and tooling | prompt-management | freemium | Yes | No | No | python, typescript | recommended |
| [Letta](../orchestration/letta.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python | recommended |
| [LiteLLM](../serving-and-deployment/litellm.md) | serving and deployment | production-serving, prompt-management | open-source | Yes | Yes | Yes | python | recommended |
| [LLaMA-Factory](../model-layer/llamafactory.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Llama Guard](../evaluation-and-observability/llamaguard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Manus](../orchestration/manus.md) | orchestration | prototyping, orchestration | paid | No | No | No | python | watching |
| [Mem0](../orchestration/mem0.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Memoriq](../orchestration/memoriq.md) | orchestration | memory-management | freemium | Yes | No | No | python | watching |
| [Mesop](../dx-and-tooling/mesop.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [MLflow](../model-layer/mlflow.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [MLX-LM](../model-layer/mlx-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Modal](../serving-and-deployment/modal.md) | serving and deployment | deployment, production-serving | usage-based | No | No | No | python | recommended |
| [Monako Glass](../evaluation-and-observability/monako-glass.md) | evaluation and observability | monitoring, evaluation | paid | No | No | No | python | watching |
| [ms-swift](../model-layer/ms-swift.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | solid-choice |
| [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [olmOCR](../data-ingestion/olmocr.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [OpenAI Evals](../evaluation-and-observability/openai-evals.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [OrchestraML](../orchestration/orchestraml.md) | orchestration | orchestration, fine-tuning | freemium | Yes | No | No | python | watching |
| [Outlines](../model-layer/outlines.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [PEFT](../model-layer/peft.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Pinecone](../data-ingestion/pinecone.md) | data ingestion | vector-search | freemium | Yes | No | No | python, typescript | recommended |
| [Playwright](../data-ingestion/playwright.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | typescript, python | recommended |
| [Portkey](../serving-and-deployment/portkey.md) | serving and deployment | prompt-management, monitoring | freemium | Yes | No | No | python, typescript | recommended |
| [Prefect](../orchestration/prefect.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Prodigy](../data-ingestion/prodigy.md) | data ingestion | data-labeling | paid | Yes | No | No | python | recommended |
| [PromptLayer](../dx-and-tooling/promptlayer.md) | dx and tooling | prompt-management | freemium | Yes | No | No | python, typescript | recommended |
| [Pydantic AI](../orchestration/pydantic-ai-tool.md) | orchestration | structured-output, orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [PyTorch Lightning](../model-layer/pytorch-lightning.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Qwen 3](../model-layer/qwen-3.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Rebuff](../evaluation-and-observability/rebuff.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Recursi](../dx-and-tooling/recursi.md) | dx and tooling | production-serving | freemium | Yes | No | No | python | watching |
| [Replicate](../serving-and-deployment/replicate.md) | serving and deployment | deployment, production-serving | usage-based | No | No | No | python, typescript | solid-choice |
| [SeaTicket](../orchestration/seaticket.md) | orchestration | orchestration | freemium | Yes | No | No | python | watching |
| [ShellMate](../dx-and-tooling/shellmate.md) | dx and tooling | production-serving | freemium | Yes | No | No | python | watching |
| [SkillSpector](../evaluation-and-observability/skillspector.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | watching |
| [Spotlight by Backplanes](../evaluation-and-observability/spotlight-by-backplanes.md) | evaluation and observability | tracing, monitoring | freemium | Yes | No | No | python | watching |
| [Streamlit](../dx-and-tooling/streamlit.md) | dx and tooling | prototyping | freemium | Yes | Yes | Yes | python | recommended |
| [Taste Lab](../data-ingestion/taste-lab.md) | data ingestion | web-scraping | freemium | Yes | No | No | python | watching |
| [torchtune](../model-layer/torchtune.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [TruLens](../evaluation-and-observability/trulens.md) | evaluation and observability | evaluation, tracing | open-source | Yes | Yes | Yes | python | recommended |
| [Unsloth](../model-layer/unsloth.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Vaani](../dx-and-tooling/vaani.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Weights & Biases Weave](../evaluation-and-observability/wandb-weave.md) | evaluation and observability | tracing, evaluation | freemium | Yes | No | No | python | solid-choice |
| [Weights & Biases](../model-layer/weights-biases.md) | model layer | model-registry, evaluation | freemium | Yes | No | No | python | recommended |
| [Zep](../orchestration/zep.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python, typescript | recommended |
