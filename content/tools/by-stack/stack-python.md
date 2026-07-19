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
| [AdalFlow](../dx-and-tooling/adalflow.md) | dx and tooling | prototyping, prompt-management | open-source | Yes | Yes | Yes | python | watching |
| [Agent Browser Shield](../data-ingestion/agent-browser-shield.md) | data ingestion | security-and-guardrails, web-scraping | freemium | Yes | No | No | python | watching |
| [Agent Reach](../data-ingestion/agent-reach.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | watching |
| [Agentic Security](../evaluation-and-observability/agentic-security.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [AgentOps](../evaluation-and-observability/agentops.md) | evaluation and observability | tracing, monitoring, evaluation | freemium | Yes | No | Yes | python | watching |
| [Agno](../orchestration/agno.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | watching |
| [AGNT.Hub](../orchestration/agnt-hub.md) | orchestration | orchestration, security-and-guardrails | paid | No | No | No | python | watching |
| [AI Infra Guard](../evaluation-and-observability/ai-infra-guard.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | use-with-caution |
| [Aider](../dx-and-tooling/aider.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Airbyte](../data-ingestion/airbyte.md) | data ingestion | data-labeling, web-scraping | freemium | Yes | Yes | Yes | java, python | solid-choice |
| [Apache Airflow](../orchestration/airflow.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [any-agent](../orchestration/any-agent.md) | orchestration | orchestration, evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Anyscale](../serving-and-deployment/anyscale.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | python | solid-choice |
| [Argilla](../data-ingestion/argilla.md) | data ingestion | data-labeling, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Astra Autonomous Pentest](../evaluation-and-observability/astra-autonomous-pentest.md) | evaluation and observability | security-and-guardrails, evaluation | paid | No | No | No | python | watching |
| [Axolotl](../model-layer/axolotl.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [BAML](../dx-and-tooling/baml.md) | dx and tooling | structured-output | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Baseten](../serving-and-deployment/baseten.md) | serving and deployment | production-serving, deployment | usage-based | Yes | No | No | python | recommended |
| [BentoML](../serving-and-deployment/bentoml.md) | serving and deployment | deployment, production-serving | freemium | Yes | Yes | Yes | python | recommended |
| [Cerebras Inference](../model-layer/cerebras-inference.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | watching |
| [Chainlit](../dx-and-tooling/chainlit.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [ClearML](../model-layer/clearml.md) | model layer | model-registry, orchestration | freemium | Yes | Yes | Yes | python | solid-choice |
| [Cloudskill](../orchestration/cloudskill.md) | orchestration | orchestration, prompt-management | paid | No | No | No | python | watching |
| [Code Arena](../evaluation-and-observability/code-arena.md) | evaluation and observability | evaluation | freemium | Yes | No | No | python | watching |
| [Cog (Replicate)](../serving-and-deployment/cog.md) | serving and deployment | deployment | open-source | Yes | Yes | Yes | python, go | solid-choice |
| [Cohere](../model-layer/cohere.md) | model layer | production-serving | usage-based | Yes | Yes | No | python, polyglot | solid-choice |
| [Composio](../orchestration/composio.md) | orchestration | orchestration | freemium | Yes | No | Yes | python, typescript | watching |
| [Conan](../evaluation-and-observability/conan.md) | evaluation and observability | monitoring, tracing | paid | No | No | No | python | watching |
| [Crawl4AI](../data-ingestion/crawl4ai-tool.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [Dagster](../orchestration/dagster.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Deepchecks](../evaluation-and-observability/deepchecks.md) | evaluation and observability | evaluation, monitoring | freemium | Yes | Yes | Yes | python | solid-choice |
| [DeepSpeed](../model-layer/deepspeed.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python, cpp | recommended |
| [dlt](../data-ingestion/dlt.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [DocETL](../data-ingestion/docetl.md) | data ingestion | orchestration | open-source | Yes | Yes | Yes | python | watching |
| [DVC](../model-layer/dvc.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [E2B](../orchestration/e2b.md) | orchestration | orchestration | freemium | Yes | Yes | Yes | typescript, python, go | recommended |
| [Empromptu AI](../orchestration/empromptu-ai.md) | orchestration | orchestration, deployment | freemium | Yes | No | No | python | watching |
| [EvalScope](../evaluation-and-observability/evalscope.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Evidently](../evaluation-and-observability/evidently.md) | evaluation and observability | evaluation, monitoring | freemium | Yes | Yes | Yes | python | recommended |
| [Exa](../data-ingestion/exa.md) | data ingestion | web-scraping | freemium | Yes | No | No | python | recommended |
| [FAISS](../data-ingestion/faiss.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | cpp, python | best-in-class |
| [FastAPI](../serving-and-deployment/fastapi.md) | serving and deployment | prototyping, production-serving | open-source | Yes | Yes | Yes | python | recommended |
| [FastEmbed](../model-layer/fastembed.md) | model layer | vector-search | open-source | Yes | Yes | Yes | python | recommended |
| [Fireworks AI](../serving-and-deployment/fireworks-ai.md) | serving and deployment | production-serving | usage-based | No | No | No | python, typescript | solid-choice |
| [Galileo](../evaluation-and-observability/galileo.md) | evaluation and observability | evaluation, monitoring | freemium | Yes | No | No | python | solid-choice |
| [garak (NVIDIA)](../evaluation-and-observability/garak.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard](../evaluation-and-observability/giskard.md) | evaluation and observability | evaluation, security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard OSS](../evaluation-and-observability/giskard-oss.md) | evaluation and observability | evaluation, security-and-guardrails, monitoring | open-source | No | Yes | Yes | python | watching |
| [GitHub Copilot](../dx-and-tooling/github-copilot.md) | dx and tooling | prototyping | freemium | Yes | No | No | typescript, python, polyglot | solid-choice |
| [Gitingest](../data-ingestion/gitingest.md) | data ingestion | web-scraping, prototyping | open-source | Yes | Yes | Yes | python | solid-choice |
| [Google Pomelli 2.0](../dx-and-tooling/google-pomelli-2-0.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Gradio](../dx-and-tooling/gradio.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [Great Expectations (GX Core)](../data-ingestion/great-expectations.md) | data ingestion | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Groq](../model-layer/groq.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | recommended |
| [Guardrails AI](../evaluation-and-observability/guardrails-ai.md) | evaluation and observability | security-and-guardrails, structured-output | freemium | Yes | Yes | Yes | python | recommended |
| [Guidance](../model-layer/guidance.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [Hugging Face Inference Endpoints](../serving-and-deployment/hf-inference-endpoints.md) | serving and deployment | deployment, production-serving | usage-based | Yes | No | No | python, typescript | recommended |
| [Honen](../dx-and-tooling/honen.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Hugging Face Hub](../model-layer/hugging-face-hub.md) | model layer | model-registry | freemium | Yes | No | No | python | recommended |
| [Humanloop](../evaluation-and-observability/humanloop.md) | evaluation and observability | prompt-management, evaluation | paid | No | No | No | python, typescript | solid-choice |
| [Ideogram](../model-layer/ideogram.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Ideogram AI](../model-layer/ideogram-ai.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Inspect (UK AI Safety Institute)](../evaluation-and-observability/inspect-ai.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [Inspect Petri](../evaluation-and-observability/inspect-petri.md) | evaluation and observability | evaluation, security-and-guardrails | open-source | Yes | Yes | Yes | python | watching |
| [Instructor](../dx-and-tooling/instructor.md) | dx and tooling | structured-output | open-source | Yes | Yes | Yes | python, typescript | best-in-class |
| [Kimi K2.5](../model-layer/kimi-k2-5.md) | model layer | production-serving, orchestration | freemium | Yes | No | No | python | watching |
| [KServe](../serving-and-deployment/kserve.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | go, python | solid-choice |
| [Label Studio](../data-ingestion/label-studio.md) | data ingestion | data-labeling | freemium | Yes | Yes | Yes | python | recommended |
| [Laminar](../evaluation-and-observability/laminar.md) | evaluation and observability | tracing, monitoring, evaluation | open-source | Yes | Yes | Yes | typescript, python | solid-choice |
| [Langflow](../orchestration/langflow.md) | orchestration | orchestration, prototyping | open-source | Yes | Yes | Yes | python, typescript | solid-choice |
| [Langfuse Prompts](../dx-and-tooling/langfuse-prompts.md) | dx and tooling | prompt-management | freemium | Yes | Yes | Yes | python, typescript | recommended |
| [LangSmith](../evaluation-and-observability/langsmith.md) | evaluation and observability | evaluation, tracing, monitoring | freemium | Yes | No | No | python, typescript | recommended |
| [LangSmith Hub](../dx-and-tooling/langsmith-hub.md) | dx and tooling | prompt-management | freemium | Yes | No | No | python, typescript | recommended |
| [LangWatch](../evaluation-and-observability/langwatch.md) | evaluation and observability | evaluation, tracing | open-source | Yes | Yes | Yes | python, typescript | solid-choice |
| [Letta](../orchestration/letta.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python | recommended |
| [Liger Kernel](../model-layer/liger-kernel.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [LiteLLM](../serving-and-deployment/litellm.md) | serving and deployment | production-serving, prompt-management | open-source | Yes | Yes | Yes | python | recommended |
| [LLaMA-Factory](../model-layer/llamafactory.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Llama Guard](../evaluation-and-observability/llamaguard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [LLM Guard](../evaluation-and-observability/llm-guard.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | solid-choice |
| [LM Evaluation Harness (EleutherAI)](../evaluation-and-observability/lm-evaluation-harness.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | best-in-class |
| [LM Format Enforcer](../model-layer/lm-format-enforcer.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | solid-choice |
| [LoRAX](../serving-and-deployment/lorax.md) | serving and deployment | production-serving | open-source | Yes | Yes | Yes | python, rust | solid-choice |
| [Manus](../orchestration/manus.md) | orchestration | prototyping, orchestration | paid | No | No | No | python | watching |
| [marimo](../dx-and-tooling/marimo.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [MarkItDown](../data-ingestion/markitdown.md) | data ingestion | web-scraping, data-labeling | open-source | Yes | Yes | Yes | python | solid-choice |
| [Marqo](../data-ingestion/marqo.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | python | solid-choice |
| [MCP Context Forge](../serving-and-deployment/mcp-context-forge.md) | serving and deployment | production-serving, orchestration, monitoring, security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Megatron-LM](../model-layer/megatron-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | solid-choice |
| [Mem0](../orchestration/mem0.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Memoriq](../orchestration/memoriq.md) | orchestration | memory-management | freemium | Yes | No | No | python | watching |
| [Mesop](../dx-and-tooling/mesop.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python | recommended |
| [MinerU](../data-ingestion/mineru.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [Mirascope](../orchestration/mirascope.md) | orchestration | orchestration, structured-output | open-source | Yes | Yes | Yes | python | solid-choice |
| [MLflow](../model-layer/mlflow.md) | model layer | model-registry | open-source | Yes | Yes | Yes | python | recommended |
| [MLX-LM](../model-layer/mlx-lm.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Modal](../serving-and-deployment/modal.md) | serving and deployment | deployment, production-serving | usage-based | No | No | No | python | recommended |
| [Monako Glass](../evaluation-and-observability/monako-glass.md) | evaluation and observability | monitoring, evaluation | paid | No | No | No | python | watching |
| [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | recommended |
| [Nomic Atlas](../data-ingestion/nomic-atlas.md) | data ingestion | data-labeling | freemium | Yes | No | No | python | solid-choice |
| [NVIDIA NIM](../serving-and-deployment/nvidia-nim.md) | serving and deployment | production-serving, deployment | paid | Yes | Yes | No | python, cpp | solid-choice |
| [olmOCR](../data-ingestion/olmocr.md) | data ingestion | data-labeling | open-source | Yes | Yes | Yes | python | recommended |
| [Open WebUI](../dx-and-tooling/open-webui.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | python, typescript | best-in-class |
| [OpenAI Evals](../evaluation-and-observability/openai-evals.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenJudge](../evaluation-and-observability/openjudge.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenLLM](../serving-and-deployment/openllm.md) | serving and deployment | production-serving | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenPipe ART](../model-layer/openpipe-art.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [OpenRouter](../model-layer/openrouter.md) | model layer | production-serving, prototyping | usage-based | Yes | No | No | typescript, python, polyglot | recommended |
| [OrchestraML](../orchestration/orchestraml.md) | orchestration | orchestration, fine-tuning | freemium | Yes | No | No | python | watching |
| [Outlines](../model-layer/outlines.md) | model layer | structured-output | open-source | Yes | Yes | Yes | python | recommended |
| [PEFT](../model-layer/peft.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Pinecone](../data-ingestion/pinecone.md) | data ingestion | vector-search | freemium | Yes | No | No | python, typescript | recommended |
| [Playwright](../data-ingestion/playwright.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | typescript, python | recommended |
| [Portkey](../serving-and-deployment/portkey.md) | serving and deployment | prompt-management, monitoring | freemium | Yes | No | No | python, typescript | recommended |
| [Prefect](../orchestration/prefect.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Prodigy](../data-ingestion/prodigy.md) | data ingestion | data-labeling | paid | Yes | No | No | python | recommended |
| [Prompt flow (Microsoft)](../orchestration/promptflow.md) | orchestration | orchestration, evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [PromptLayer](../dx-and-tooling/promptlayer.md) | dx and tooling | prompt-management | freemium | Yes | No | No | python, typescript | recommended |
| [Prompty](../dx-and-tooling/prompty.md) | dx and tooling | prompt-management, evaluation, prototyping | open-source | Yes | Yes | Yes | typescript, python | solid-choice |
| [Pydantic AI](../orchestration/pydantic-ai-tool.md) | orchestration | structured-output, orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [PyRIT](../evaluation-and-observability/pyrit.md) | evaluation and observability | security-and-guardrails, evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [PyTorch Lightning](../model-layer/pytorch-lightning.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Qwen 3](../model-layer/qwen-3.md) | model layer | production-serving | freemium | Yes | No | No | python | watching |
| [Ragas](../evaluation-and-observability/ragas.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | recommended |
| [RAGatouille](../data-ingestion/ragatouille.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | python | watching |
| [RamaLama](../serving-and-deployment/ramalama.md) | serving and deployment | production-serving, deployment, prototyping | open-source | Yes | Yes | Yes | python | solid-choice |
| [Ray](../serving-and-deployment/ray.md) | serving and deployment | production-serving, orchestration, fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Ray Serve](../serving-and-deployment/ray-serve.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | python | recommended |
| [Rebuff](../evaluation-and-observability/rebuff.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [Recursi](../dx-and-tooling/recursi.md) | dx and tooling | production-serving | freemium | Yes | No | No | python | watching |
| [Reducto](../data-ingestion/reducto.md) | data ingestion | structured-output | usage-based | Yes | No | No | python | solid-choice |
| [Replicate](../serving-and-deployment/replicate.md) | serving and deployment | deployment, production-serving | usage-based | No | No | No | python, typescript | solid-choice |
| [RunPod](../serving-and-deployment/runpod.md) | serving and deployment | production-serving, deployment, fine-tuning | usage-based | No | No | No | python, polyglot | solid-choice |
| [ScrapeGraphAI](../data-ingestion/scrapegraphai.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [SeaTicket](../orchestration/seaticket.md) | orchestration | orchestration | freemium | Yes | No | No | python | watching |
| [Sentence Transformers](../model-layer/sentence-transformers.md) | model layer | fine-tuning, vector-search | open-source | Yes | Yes | Yes | python | best-in-class |
| [ShellMate](../dx-and-tooling/shellmate.md) | dx and tooling | production-serving | freemium | Yes | No | No | python | watching |
| [SkillSpector](../evaluation-and-observability/skillspector.md) | evaluation and observability | security-and-guardrails | open-source | Yes | Yes | Yes | python | watching |
| [SkyPilot](../serving-and-deployment/skypilot.md) | serving and deployment | deployment, fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Spotlight by Backplanes](../evaluation-and-observability/spotlight-by-backplanes.md) | evaluation and observability | tracing, monitoring | freemium | Yes | No | No | python | watching |
| [Strands Agents SDK](../orchestration/strands-agents.md) | orchestration | orchestration | open-source | Yes | Yes | Yes | python | watching |
| [Streamlit](../dx-and-tooling/streamlit.md) | dx and tooling | prototyping | freemium | Yes | Yes | Yes | python | recommended |
| [Taste Lab](../data-ingestion/taste-lab.md) | data ingestion | web-scraping | freemium | Yes | No | No | python | watching |
| [Tavily](../data-ingestion/tavily.md) | data ingestion | web-scraping | freemium | Yes | No | No | python | recommended |
| [Together AI](../model-layer/together-ai.md) | model layer | production-serving, fine-tuning | usage-based | Yes | No | No | python, polyglot | recommended |
| [torchtune](../model-layer/torchtune.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [Trafilatura](../data-ingestion/trafilatura.md) | data ingestion | web-scraping | open-source | Yes | Yes | Yes | python | recommended |
| [NVIDIA Triton Inference Server](../serving-and-deployment/triton-inference-server.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | cpp, python | recommended |
| [TRL](../model-layer/trl.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | best-in-class |
| [TruLens](../evaluation-and-observability/trulens.md) | evaluation and observability | evaluation, tracing | open-source | Yes | Yes | Yes | python | recommended |
| [UltraEval-Audio](../evaluation-and-observability/ultraeval-audio.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Unsloth](../model-layer/unsloth.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python | recommended |
| [UpTrain](../evaluation-and-observability/uptrain.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | use-with-caution |
| [UQLM](../evaluation-and-observability/uqlm.md) | evaluation and observability | evaluation | open-source | Yes | Yes | Yes | python | solid-choice |
| [Vaani](../dx-and-tooling/vaani.md) | dx and tooling | structured-output | freemium | Yes | No | No | python | watching |
| [Vellum](../dx-and-tooling/vellum.md) | dx and tooling | prompt-management, evaluation | freemium | Yes | No | No | python | solid-choice |
| [Voyage AI](../model-layer/voyage-ai.md) | model layer | production-serving | usage-based | Yes | No | No | python, polyglot | recommended |
| [Weights & Biases Weave](../evaluation-and-observability/wandb-weave.md) | evaluation and observability | tracing, evaluation | freemium | Yes | No | No | python | solid-choice |
| [Weights & Biases](../model-layer/weights-biases.md) | model layer | model-registry, evaluation | freemium | Yes | No | No | python | recommended |
| [Zep](../orchestration/zep.md) | orchestration | memory-management | open-source | Yes | Yes | Yes | python, typescript | recommended |
