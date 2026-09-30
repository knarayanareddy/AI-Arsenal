---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "dataelement"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: bisheng
name: "BISHENG"
artifact_type: platform
category: agents
subcategory: platforms
description: "Enterprise LLM devops platform pairing a flowchart workflow canvas with RAG pipelines, agent tools and model management in one console"
github_url: "https://github.com/dataelement/bisheng"
license: Apache-2.0
primary_language: Python
tags: [rag, retrieval]
maturity: beta
cost_model: open-source
github_stars: 12014
last_commit: "2026-09-28"
docs_url: "http://www.bisheng.ai"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "An enterprise-oriented platform that unifies workflow building, RAG, agents, and model governance behind one system."
best_for: ["You are an enterprise platform team in China or a Chinese-market deployment and you need a single console for RAG, workflow, fine-tuning and prompt observability rather than five stitched tools.", "You are a domain expert who cannot write orchestration code but needs loops, parallelism and human-in-the-loop checkpoints visualised as a flowchart instead of code.", "You need on-premise model management that includes a private model catalogue alongside OpenAI, Claude, Gemini and MiniMax in the same provider list."]
avoid_if: ["You want a small library you can embed in an existing Python service, because this is a full application platform with its own runtime, database and UI.", "You have no capacity to operate a stateful server deployment, because self-hosting means owning the whole stack rather than importing a package.", "You are outside the Chinese-language-first ecosystem and need English-first documentation, because the canonical README and linked design wiki are Chinese-language."]
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. Enterprise focus; expect operational overhead to self-host."
---

## Overview

Bisheng packages the full lifecycle of an enterprise LLM application behind a web console. The README lists its pieces as a RAG pipeline that handles document upload or URL crawling with automatic chunking and vectorisation, an agentic workflow engine with loops, parallelism, batch nodes and conditional branching, a general-purpose agent whose behaviour is shaped by AGL (Agent Guidance Language) so domain experts' preferences are encoded directly, unified model management across private and hosted providers, evaluation, supervised fine-tuning, dataset management and observability. The workflow canvas is the distinguishing surface: drawing a loop shape creates a loop, aligning elements creates parallelism, and selecting several inputs turns them into a batch, so control-flow concepts that need dedicated components elsewhere are gestures here.

## Why it's in the Arsenal

The decision it removes is whether a business process with a person in the middle has to be either fully manual or fully autonomous. BishENG's workflow supports human-in-the-loop interruption and feedback inside a running execution, including mid-conversation, which is exactly the gap its README contrasts with tools that can only run start-to-finish. For an enterprise that already has document review, report generation, policy-diff and ticket-assistance processes, the pitch is that domain logic lives in a canvas an operations person can edit rather than in Python only a developer can change.

## Architecture

A Python backend exposes a layered set of services: ingestion and chunking feeding a vector store for retrieval, a workflow execution engine that interprets the canvas graph including loop, parallel and batch constructs, a model-management layer that normalises private models such as DeepSeek, Llama and Qwen alongside public APIs, and an observability layer that records runs. A React frontend renders the canvas and the multi-modal chat surface, and the same application serves SFT and dataset management rather than delegating to a separate training stack. The AGL framework is the layer that sits between a domain expert's stated rules and agent execution, translating preferences and business logic into constraints the agent applies at run time. Because the components share one deployment and one metadata store, upgrades are platform-wide rather than per-service.

## Ecosystem Position

Bisheng sits in the same no-code LLM application builder category as Dify and Flowise, and it competes with both on breadth: Dify leans toward a polished general application platform, Flowise toward visual agent and chain composition, while Bisheng packages workflow, RAG, model management, SFT, evaluation and enterprise system management into one deployment and leans harder on the human-in-the-loop story. Against MaxKB, which is a narrower RAG-plus-agent knowledge base tool, Bisheng adds a full application orchestration framework and AGL-guided agents. It overlaps with the orchestration entries in content/projects/orchestration, but its unit of work is a visual business process rather than a scheduled batch DAG. It complements the fine-tuning tools in content/projects/training-and-alignment by owning the dataset and SFT surface that those frameworks assume you already have.

## Getting Started

The documented path is a single container with a persistent volume on port 8080, then the admin login in the browser:

```bash
docker run -d --name=bisheng --restart=always -p 8080:8080 \
  -v ~/.bisheng:/opt/bisheng dataelement/bisheng
```

Open `http://your_server_ip:8080`, sign in with the default admin account the README prints, and register a model provider before building your first workflow. An offline image set is documented for environments that cannot pull from public registries.

## Key Use Cases

1. Document-heavy knowledge workflows: ingest a policy or manual corpus, then route a question through retrieval, an LLM call and a human approval step before publishing an answer.
2. Fixed-layout report generation: assemble a report from several retrieved and generated sections inside a batch-and-merge workflow rather than one giant prompt.
3. Enterprise assistant deployment: put one retrieval-augmented assistant in front of an internal system with zero-coding integration so business users can extend it without a deploy.

## Strengths

- Breadth in a single deployment: RAG, workflow, agents, model management, evaluation, SFT, datasets and observability rather than an integration exercise.
- Visual control flow that maps loops, parallelism and batching onto direct manipulation, which lowers the barrier for non-developers.
- AGL layer for encoding domain expertise as guidance the agent applies at run time instead of retraining or prompt-poking per request.
- Apache-2.0 licensed, actively committed, and deployed by organisations the README names as industry leaders and Fortune 500 companies.

## Limitations

Documentation is Chinese-first: the canonical README, the linked workflow design wiki and the offline install guide are all Chinese-language, which raises the cost for international teams. The platform is a full server application with its own database, frontend and runtime, so adopting it is an infrastructure commitment rather than a dependency add, and there is no lightweight embeddable mode. Because canvas, backend, model registry and training features ship together, the installed surface is far larger than what a single workflow needs, and the GitHub description itself enumerates a long feature list with limited detail on any one subsystem. Operational maturity outside its home market is unproven from the repository alone, and the maintainers do not publish benchmark numbers for retrieval quality or workflow throughput.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the enterprise-platform counterpart to the developer-first agent frameworks there, and it pairs naturally with the vector database entries in content/projects/data-and-retrieval that its RAG pipeline indexes into. Compare it against Dify and Flowise in the framework phase when the deciding question is whether you want a business-operable canvas or a code-first graph you own. Its SFT and dataset features also meet the content/projects/training-and-alignment entries, which is the boundary to check before assuming you need both. For scheduled batch work rather than conversational applications, the orchestration entries are the more honest starting point.

## Resources

- [GitHub — dataelement/bisheng](https://github.com/dataelement/bisheng)
- [Workflow design documentation (Chinese)](https://github.com/dataelement/bisheng)
- [AGL — Agent Guidance Language](https://github.com/dataelement/AgentGuidanceLanguage)
