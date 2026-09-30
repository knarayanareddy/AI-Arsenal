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

The shortlist of tooling you can adopt without a licence fee or a per-seat charge, filtered so every entry is installable, self-hostable or permissively licensed. The point of grouping by cost is that it forces the comparison to include what replaces the fee: the hosting, the on-call, and the patching that a licence does not charge you for.

## Why It's in the Arsenal

A licence fee is the easiest cost to see and the least important one. Grouping by cost model forces the harder question into the open: what does adopting this cost once the licence is free, and who absorbs that. It is also where the copyleft question gets asked early, because an AGPL dependency discovered after you have built on it is expensive to unwind.

## Key Features

- Every entry here is permissively licensed or self-hostable, with the specific licence named in the entry rather than assumed.
- Adoption cost is stated as infrastructure plus maintenance time, because that is what replaces the zero licence fee.
- Copyleft options are separated from permissive ones, since the obligations differ sharply and AGPL reaches network-served use.

## Architecture / How It Works

Each entry records the licence explicitly rather than inferring it from a repository badge, because permissive and copyleft obligations differ sharply and AGPL reaches network-served use. The page is regenerated from the tool frontmatter facets, so a new tool with a permissive licence appears here without anyone editing this text.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you want tooling with no licence cost or seat count and need to know what operating cost replaces it.
2. **Scenario**: you are comparing a permissive-licence option against a paid one and need to know where the hidden cost lands.
3. **Scenario**: you are deciding whether a permissive licence is compatible with your product's distribution model.

## Strengths

- Groups by licence family rather than by price, because the obligations are what actually constrain a product.
- Surfaces the operating cost that replaces the licence fee, which is the comparison people skip.
- Makes the single-maintainer risk visible, since a permissive licence says nothing about durability.

## Limitations / When NOT to Use

- Licence cost is not total cost: a permissive project you must host, secure, patch and upgrade can exceed a paid service over its lifetime.
- "Open source" covers permissive and copyleft; the obligations differ sharply, and AGPL in particular reaches network-served use.
- Maintenance risk is real and unevenly distributed: a permissively licensed project with one maintainer is a dependency with a bus factor of one.

## Integration Patterns

- Link a permissively licensed tool here from an entry that ships inside a commercial product, so the obligation is checked at the point of adoption.
- When a licence changes (a re-licence to AGPL, for instance), update this page and every entry affected.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [Hugging Face Accelerate](../model-layer/accelerate.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [AdalFlow](../dx-and-tooling/adalflow.md) | dx and tooling | prototyping, prompt-management | open-source | Yes | Yes | Yes | python | watching |
| [Agent Skills (Addy Osmani)](../dx-and-tooling/addyosmani-agent-skills.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | polyglot | recommended |
| [Agent Reach](../data-ingestion/agent-reach.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | watching |
| [Agentic Security](../evaluation-and-observability/agentic-security.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Agno](../orchestration/agno.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | watching |
| [Envoy AI Gateway](../serving-and-deployment/ai-gateway.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | go | recommended |
| [AI Infra Guard](../evaluation-and-observability/ai-infra-guard.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | use-with-caution |
| [Aider](../dx-and-tooling/aider.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Airbyte](../data-ingestion/airbyte.md) | data ingestion | data-labeling, web-scraping | open-source | Yes | Yes | Yes | java, python | solid-choice |
| [Apache Airflow](../orchestration/airflow.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Hugging Face AI Sheets](../data-ingestion/aisheets.md) | data ingestion | data-labeling, prototyping | open-source | Yes | Yes | Yes | typescript | watching |
| [any-agent](../orchestration/any-agent.md) | orchestration | orchestration, evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Argilla](../data-ingestion/argilla.md) | data ingestion | data-labeling, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Axolotl](../model-layer/axolotl.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [BAML](../dx-and-tooling/baml.md) | dx and tooling | structured-output | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Browserbase](../data-ingestion/browserbase.md) | data ingestion | web-scraping | open-source | Yes | No | No | typescript | watching |
| [Chainlit](../dx-and-tooling/chainlit.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Chrome DevTools MCP](../dx-and-tooling/chrome-devtools-mcp.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | typescript | recommended |
| [Cline](../dx-and-tooling/cline.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | typescript | recommended |
| [Codebase Memory MCP](../dx-and-tooling/codebase-memory-mcp.md) | dx and tooling | memory-management | open-source | Yes | Yes | Yes | cpp | use-with-caution |
| [Cog (Replicate)](../serving-and-deployment/cog.md) | serving and deployment | deployment | open-source | Yes | Yes | Yes | python, go | solid-choice |
| [Crawl4AI](../data-ingestion/crawl4ai-tool.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [CubeSandbox](../serving-and-deployment/cubesandbox.md) | serving and deployment | deployment, security-and-guardrails | open-source | Yes | Yes | Yes | rust | watching |
| [DeepSpeed](../model-layer/deepspeed.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python, cpp | recommended |
| [dlt](../data-ingestion/dlt.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [DVC](../model-layer/dvc.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [EvalScope](../evaluation-and-observability/evalscope.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [FAISS](../data-ingestion/faiss.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | cpp, python | best-in-class |
| [FastAPI](../serving-and-deployment/fastapi.md) | serving and deployment | prototyping, production-serving | open-source | Yes | Yes | Yes | python | recommended |
| [FastEmbed](../model-layer/fastembed.md) | model layer | vector-search | open-source | Yes | Yes | Yes | python | recommended |
| [Flowise](../orchestration/flowise.md) | orchestration | orchestration, prototyping | open-source | Yes | Yes | Yes | typescript | solid-choice |
| [FuzzyAI](../evaluation-and-observability/fuzzyai.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | polyglot | use-with-caution |
| [garak (NVIDIA)](../evaluation-and-observability/garak.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard](../evaluation-and-observability/giskard.md) | evaluation and observability | evaluation, security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard OSS](../evaluation-and-observability/giskard-oss.md) | evaluation and observability | evaluation, security-and-guardrails, monitoring | open-source | No | Yes | Yes | python | watching |
| [Gitingest](../data-ingestion/gitingest.md) | data ingestion | web-scraping, prototyping | open-source | Yes | Yes | Yes | python | solid-choice |
| [Goose](../dx-and-tooling/goose.md) | dx and tooling | prototyping, orchestration | open-source | Yes | Yes | Yes | rust | recommended |
| [Gradio](../dx-and-tooling/gradio.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Great Expectations (GX Core)](../data-ingestion/great-expectations.md) | data ingestion | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Guidance](../model-layer/guidance.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [headroom](../dx-and-tooling/headroom.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Inspect (UK AI Safety Institute)](../evaluation-and-observability/inspect-ai.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Inspect Petri](../evaluation-and-observability/inspect-petri.md) | evaluation and observability | evaluation, security-and-guardrails | open-source | Yes | Yes | Yes | python | watching |
| [Instructor](../dx-and-tooling/instructor.md) | dx and tooling | structured-output | open-source | Yes | Yes | Yes | python, typescript | best-in-class |
| [Jan](../dx-and-tooling/jan.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | typescript, rust | solid-choice |
| [KServe](../serving-and-deployment/kserve.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | go, python | solid-choice |
| [KubeAI](../serving-and-deployment/kubeai.md) | serving and deployment | deployment, production-serving | open-source | Yes | Yes | Yes | go | solid-choice |
| [Laminar](../evaluation-and-observability/laminar.md) | evaluation and observability | tracing, monitoring, evaluation | open-source | Yes | Yes | Yes | typescript, python | solid-choice |
| [Langflow](../orchestration/langflow.md) | orchestration | orchestration, prototyping | open-source | Yes | Yes | Yes | python, typescript | solid-choice |
| [LangWatch](../evaluation-and-observability/langwatch.md) | evaluation and observability | evaluation, tracing | open-source | Yes | Yes | Yes | python, typescript | solid-choice |
| [Letta](../orchestration/letta.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python | recommended |
| [Liger Kernel](../model-layer/liger-kernel.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [LiteLLM](../serving-and-deployment/litellm.md) | serving and deployment | production-serving, prompt-management | open-source | Yes | Yes | Yes | python | recommended |
| [LLaMA-Factory](../model-layer/llamafactory.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Llama Guard](../evaluation-and-observability/llamaguard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [LLM Guard](../evaluation-and-observability/llm-guard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | solid-choice |
| [llmfit](../model-layer/llmfit.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | rust | recommended |
| [LM Evaluation Harness (EleutherAI)](../evaluation-and-observability/lm-evaluation-harness.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | best-in-class |
| [LM Format Enforcer](../model-layer/lm-format-enforcer.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | solid-choice |
| [LoRAX](../serving-and-deployment/lorax.md) | serving and deployment | production-serving | open-source | Yes | Yes | Yes | python, rust | solid-choice |
| [marimo](../dx-and-tooling/marimo.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [MarkItDown](../data-ingestion/markitdown.md) | data ingestion | web-scraping, data-labeling | open-source | Yes | Yes | Yes | python | solid-choice |
| [MCP Context Forge](../serving-and-deployment/mcp-context-forge.md) | serving and deployment | production-serving, orchestration, monitoring, security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Megatron-LM](../model-layer/megatron-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | solid-choice |
| [Mesop](../dx-and-tooling/mesop.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [MinerU](../data-ingestion/mineru.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [Mirascope](../orchestration/mirascope.md) | orchestration | orchestration, structured-output | open-source | Yes | Yes | Yes | python | solid-choice |
| [MLflow](../model-layer/mlflow.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [MLX-LM](../model-layer/mlx-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [olmOCR](../data-ingestion/olmocr.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [Open WebUI](../dx-and-tooling/open-webui.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python, typescript | best-in-class |
| [OpenAI Evals](../evaluation-and-observability/openai-evals.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenJudge](../evaluation-and-observability/openjudge.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenLLM](../serving-and-deployment/openllm.md) | serving and deployment | production-serving | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenPipe ART](../model-layer/openpipe-art.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Orca](../dx-and-tooling/orca.md) | dx and tooling | orchestration | open-source | Yes | Yes | Yes | typescript | watching |
| [Outlines](../model-layer/outlines.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [PEFT](../model-layer/peft.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Playwright](../data-ingestion/playwright.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | typescript, python | recommended |
| [Prompt flow (Microsoft)](../orchestration/promptflow.md) | orchestration | orchestration, evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [promptfoo](../evaluation-and-observability/promptfoo.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | typescript | recommended |
| [Prompty](../dx-and-tooling/prompty.md) | dx and tooling | prompt-management, evaluation, prototyping | open-source | Yes | Yes | Yes | typescript, python | solid-choice |
| [Puppeteer](../data-ingestion/puppeteer.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | typescript | recommended |
| [Pydantic AI](../orchestration/pydantic-ai-tool.md) | orchestration | structured-output, orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [PyRIT](../evaluation-and-observability/pyrit.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [PyTorch Lightning](../model-layer/pytorch-lightning.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Ragas](../evaluation-and-observability/ragas.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [RAGatouille](../data-ingestion/ragatouille.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | python | watching |
| [RamaLama](../serving-and-deployment/ramalama.md) | serving and deployment | production-serving, deployment, prototyping | open-source | Yes | Yes | Yes | python | solid-choice |
| [Ray](../serving-and-deployment/ray.md) | serving and deployment | production-serving, orchestration, fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Ray Serve](../serving-and-deployment/ray-serve.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | python | recommended |
| [Rebuff](../evaluation-and-observability/rebuff.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Repomix](../dx-and-tooling/repomix.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | typescript | recommended |
| [rtk](../dx-and-tooling/rtk.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | rust | recommended |
| [ScrapeGraphAI](../data-ingestion/scrapegraphai.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [Sentence Transformers](../model-layer/sentence-transformers.md) | model layer | fine-tuning, vector-search | open-source | Yes | Yes | Yes | python | best-in-class |
| [SkillSpector](../evaluation-and-observability/skillspector.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | watching |
| [SkyPilot](../serving-and-deployment/skypilot.md) | serving and deployment | deployment, fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Strands Agents SDK](../orchestration/strands-agents.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | watching |
| [Superpowers](../dx-and-tooling/superpowers.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | polyglot | recommended |
| [Tabby](../dx-and-tooling/tabby-ml.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | rust | solid-choice |
| [TencentDB Agent Memory](../dx-and-tooling/tencentdb-agent-memory.md) | dx and tooling | memory-management | open-source | Yes | Yes | Yes | typescript | watching |
| [Text Embeddings Inference (TEI)](../serving-and-deployment/text-embeddings-inference.md) | serving and deployment | production-serving, vector-search | open-source | Yes | Yes | Yes | rust | recommended |
| [ToolHive](../serving-and-deployment/toolhive.md) | serving and deployment | security-and-guardrails, deployment | open-source | No | Yes | Yes | go | watching |
| [torchtune](../model-layer/torchtune.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Trafilatura](../data-ingestion/trafilatura.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [NVIDIA Triton Inference Server](../serving-and-deployment/triton-inference-server.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | cpp, python | recommended |
| [TRL](../model-layer/trl.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | best-in-class |
| [TruLens](../evaluation-and-observability/trulens.md) | evaluation and observability | evaluation, tracing | open-source | Yes | Yes | Yes | python | recommended |
| [UltraEval-Audio](../evaluation-and-observability/ultraeval-audio.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Unsloth](../model-layer/unsloth.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [UpTrain](../evaluation-and-observability/uptrain.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | use-with-caution |
| [UQLM](../evaluation-and-observability/uqlm.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Vespa](../data-ingestion/vespa.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | java, cpp | solid-choice |
