---
id: dify
name: Dify
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Self-hosted LLM app platform — visual workflow canvas, RAG pipeline, sandboxed agents, model routing and observability behind one API
github_url: "https://github.com/langgenius/dify"
license: Modified Apache-2.0
primary_language: TypeScript
org_or_maintainer: null
tags: [agents, orchestration, rag, cloud]
maturity: production
cost_model: open-source
github_stars: 159597
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-10-26"
docs_url: "https://docs.dify.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [org-backed, community-driven, production-proven]
ecosystem_role:
  - Open-source LLM application development platform with a visual workflow builder, positioned as a low-code alternative to hand-coded agent frameworks
best_for:
  - You want a self-hostable, visual workflow builder for LLM applications (RAG, agents, chatbots) rather than writing orchestration code directly
  - Your team includes non-engineers who need to iterate on prompt/workflow logic without deploying code changes
avoid_if:
  - You need the flexibility of a code-first framework — visual builders like Dify trade off fine-grained control and version-control-friendly workflows for ease of iteration
  - You need deep custom logic that doesn't map cleanly onto Dify's node-based workflow model — at that point a code framework like LangGraph or a custom FastAPI service gives more control
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Dify's very high GitHub star count (145K+) and active documentation site (docs.dify.ai) reflect substantial community adoption; specific enterprise production case studies were not independently verified beyond the project's own marketing, so production-proven is not claimed here.
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.dify.ai/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

An open-source platform for building LLM applications through a visual workflow builder, combining RAG pipeline construction, agent orchestration, and prompt management in a single self-hostable product.

## Why it's in the Arsenal

The case for Dify rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Applications are built as node-based visual workflows (similar in spirit to a flowchart) connecting LLM calls, retrieval steps, tool calls, and conditional logic; the platform also exposes a backend API and SDK for embedding built workflows into external applications.

## Ecosystem Position

Upstream: integrates with many external vector databases and model providers as pluggable backends rather than depending on one. Downstream: none of particular note. Competing: Flowise, LangFlow, and other visual LLM-app builders; also competes indirectly with code-first frameworks like LangChain/LlamaIndex for teams choosing between low-code and code-first approaches. Complementary: can call out to vector databases (Qdrant, Milvus, Weaviate) and external APIs as workflow nodes.

## Getting Started

```bash
pip install dify
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Internal tools where a non-engineer owns the prompt**: the workflow canvas is the product. A support or operations team can change retrieval, add a conditional branch and ship without a deploy, which is worth more than API elegance to that buyer.
2. **Self-hosted RAG over a document corpus**: ingestion, chunking, retrieval and the chat surface ship together, so the alternative is stitching LangChain plus a vector store plus a UI plus an auth layer.
3. **Standardising model access across a company**: dozens of providers behind one credential store means teams stop pasting API keys into notebooks and spend becomes visible in one place.
4. **Agent tasks with real tools**: the agent sandbox runs commands, installs packages and handles files, and tools can come from the Dify Marketplace, an MCP server or your own API — the integration surface is the point.
5. **Prompt iteration with a comparison view**: the Prompt IDE exists so a prompt change can be evaluated against a model rather than argued about, which is a different workflow from editing a Python string.
6. **Embedding chat into an existing product**: every Dify app exposes a backend API, so the platform becomes the orchestration layer behind your own UI rather than the UI itself.
7. **LLMOps without building dashboards**: logs, annotations and per-app performance over time come with the platform, and they export to Opik, Langfuse or Arize Phoenix rather than locking the telemetry in.

## Strengths

- Breadth in one install: workflow canvas, RAG pipeline, agent sandbox, model management, prompt IDE, evaluation annotations and observability — the integration work between these is what most teams underestimate.
- Docker Compose with a 2-core / 4 GiB floor is a genuinely low bar for a platform of this scope, and it means a laptop trial is realistic.
- Hundreds of model providers plus any OpenAI-compatible endpoint, so model choice is configuration rather than a refactor.
- Backend-as-a-Service: every app has an API, so Dify can sit behind an existing product instead of replacing it.
- Observability integrations are vendor-neutral at the evaluation layer (Opik, Langfuse, Phoenix), which is more than most platforms of this type offer.
- The plugin and marketplace model means tool integrations are contributed rather than maintained by your team — 159k stars worth of ecosystem is a real asset here.

## Limitations

- **The licence is not plain Apache-2.0.** Dify's own licence adds conditions on top of Apache-2.0 (multi-tenant operation and logo/branding are restricted), so "open source" needs a lawyer's read before you resell it as a service. The GitHub API reports the licence as unclassified for exactly that reason.
- **It is a platform, not a library.** Adopting it means owning Postgres, Redis, a vector store, several services and their upgrades; the Python-framework alternative is a dependency, not an installation.
- **The canvas is a ceiling.** Anything the node types do not express becomes a code node or an external service, and the visual graph is harder to review, test and version-control than code. Teams routinely outgrow it in the direction they started from.
- **1,197 open issues.** The volume is proportionate to adoption, and it also means a bug you hit is one you wait on or fix yourself; the enterprise edition is where the support contract lives.
- **Release cadence breaks upgrades.** Self-hosted deployments need a migration plan between minor versions, and the community edition lags the cloud on features, so documentation and behaviour can disagree.
- **Agent quality depends on the model and the sandbox.** A general workflow platform cannot tune per-corpus like a purpose-built pipeline; the sandbox also inherits the security posture you give it, which is a hardening job, not a checkbox.

## Relation to the Arsenal

The platform-shaped alternative to the code-shaped frameworks: `langgraph` and `crewai` for orchestration you own, `dspy` if you want optimisation of prompts rather than a canvas, and `ragas` or `langfuse` for the evaluation layer Dify only partly covers. It consumes the same ingestion stack catalogued here — `marker`, `paddleocr` and `markitdown` for document parsing, `pgvector`, `qdrant` and `weaviate` for storage.

Where it displaces a framework entry, the reason is almost always the same: someone who is not a Python developer needs to change the behaviour.

## Resources

- [GitHub](https://github.com/langgenius/dify)
- [Documentation](https://docs.dify.ai/)
