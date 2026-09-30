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
org_or_maintainer: "1Panel-dev"
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
id: maxkb
name: "MaxKB"
artifact_type: platform
category: tooling
subcategory: platforms
description: "Open-source knowledge-base agent platform with built-in RAG chunking, a workflow engine and MCP tool use in one Docker image"
github_url: "https://github.com/1Panel-dev/MaxKB"
license: GPL-3.0
primary_language: Python
tags: [rag, self-hosted]
maturity: beta
cost_model: self-hostable
github_stars: 22885
last_commit: "2026-09-28"
docs_url: "https://maxkb.cn"
phase: agent-system
domain:
  - "language"
  - "general-purpose"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
  - "community-driven"
ecosystem_role:
  - "A self-hosted platform that combines document RAG, an agent/workflow engine, and model-backend abstraction for building internal knowledge assistants."
best_for: ["You are building an internal customer-service or enterprise knowledge assistant and you need document upload, chunking and retrieval working on the first deploy rather than assembled from parts.", "You want retrieval plus a visual workflow plus MCP tool use in one product, because those three usually mean three services you now have to integrate and secure.", "You need the assistant to reach private models such as DeepSeek, Llama and Qwen alongside hosted ones such as OpenAI, Claude and Gemini from a single provider list."]
avoid_if: ["You want to build retrieval logic in code, because this is a deployable application with a UI and an opinionated pipeline rather than a library you import.", "You cannot run containers in your environment, because the documented quick start is a docker run with a persistent volume on port 8080.", "You need multi-tenant isolation or an identity model, because the README's enterprise claims are about application scope rather than documented per-tenant security boundaries."]
enrichment_notes: "Official repository, GPL-3.0 license, and 2026-07-10 activity were reviewed on 2026-07-12. Enterprise-grade claims remain draft pending your own security and scale testing."
---

## Overview

MaxKB, short for Max Knowledge Brain, is an open-source platform for building enterprise-grade agents and is applied to intelligent customer service, corporate internal knowledge bases, academic research and education. Its RAG pipeline supports direct document upload or automatic crawling of online documents with automatic text splitting and vectorisation, positioned as a way to reduce hallucination in question answering. On top of that sits an agentic workflow with a workflow engine, a function library and MCP tool use for more complex business logic, plus zero-coding integration paths into third-party business systems. It is model-agnostic across private models such as DeepSeek, Llama and Qwen and public ones such as OpenAI, Claude, Gemini and MiniMax, and handles text, image, audio and video natively. The technical stack the README names is a Vue.js frontend on a Python and Django backend with LangChain as the LLM framework.

## Why it's in the Arsenal

The decision it removes is how long the path from an empty server to a working internal assistant is. Most stacks make you stand up a vector database, choose a chunking strategy, write a retriever, wrap it in an agent, and then build the admin surface that lets a colleague upload the next document. MaxKB ships that whole sequence as one image, which is why its stated audience is enterprise operations rather than ML engineers. MCP tool use is the forward-looking piece, since it means an assistant can reach internal systems through a protocol rather than a bespoke integration per tool.

## Architecture

A Django backend owns ingestion, retrieval and the agent runtime, with a Vue.js single-page application providing the admin console, chat surface and workflow editor. The RAG path uploads documents or crawls URLs, splits text into chunks, vectorises them and stores them in a vector backend; the README's topics list pgvector and the model list is provider-agnostic, so retrieval quality depends on the embedding model you configure rather than a fixed one. The workflow engine executes a visual graph with conditionals, loops and function nodes, and tool nodes can resolve against MCP servers, which is the extension path for reaching internal systems. Multimodal input and output run through the same pipeline, so a text, image, audio or video request does not need a separate application. The whole thing persists to a mounted volume, which is the only stateful part of the deployment.

## Ecosystem Position

MaxKB competes in the open-source knowledge-base-agent category with Dify, FastGPT and RAGFlow, and it is the narrowest of that group: RAG plus a workflow engine plus MCP, without Dify's broader application scope or RAGFlow's document-parsing depth. Where RAGFlow leads on layout-aware PDF extraction and MaxKB leads on a simple one-container deploy with a low-knowledge-entry workflow editor, that is the axis to weigh. It overlaps with the retrieval frameworks in content/projects/framework such as LangChain, which is in fact its own underlying LLM framework, so MaxKB is a productised application of that layer rather than a competitor to it. Against the vector database entries in content/projects/data-and-retrieval, MaxKB is a consumer that hides the index; choose a vector store entry directly when you need to control the index yourself.

## Getting Started

The documented quick start is a single container with a persistent volume mapped into the image, then the web UI on port 8080:

```bash
docker run -d --name=maxkb --restart=always -p 8080:8080 \
  -v ~/.maxkb:/opt/maxkb 1panel/maxkb
```

Log in at `http://your_server_ip:8080` with the default admin credentials the README prints, then change the password and register a model provider. The project also publishes an offline installation guide for environments that cannot pull the public image, which is the path most Chinese deployments take.

## Key Use Cases

1. Internal knowledge assistant: upload policies, manuals and FAQs, let the pipeline chunk and vectorise them, and expose a cited question-answering surface to staff.
2. Customer service deflection: connect the assistant to product documentation and let a workflow route unresolved questions to a human or open a ticket through an MCP tool.
3. Document Q&A with mixed media: ask questions over a corpus that includes images, audio and video, since the platform handles those modalities on the same path as text.

## Strengths

- One container to deploy, with the RAG pipeline already wired end to end, which collapses the usual week of integration work.
- MCP tool use in the workflow, so internal system integration follows a protocol instead of one custom connector per tool.
- Model-agnostic across both private and hosted providers, so you can move between a self-hosted model and a commercial API without changing the application.
 - Native text, image, audio and video support in the same pipeline rather than four separate preprocessing paths.

## Limitations

The quick start ships a published default admin password, so any deployment exposed beyond a trusted network is compromised until you change it. GPL-3.0 rules the code out of closed-source commercial products, and the copyleft obligation propagates to a modified deployment that users interact with over a network. The one-container story also means you inherit the project's own choices: Django and LangChain underneath, Vue on top, and an embedded vector store configuration, none of which you can swap for something your organisation standardises on without forking. Document parsing is a fixed pipeline rather than a pluggable one, so a corpus of layout-heavy PDFs is where you will hit its ceiling. The README is largely Chinese-first, and there is no published evidence of retrieval benchmarks, multi-tenancy model, or audit logging in the project description.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the deploy-and-forget knowledge-base option, and it is the most direct comparison target for Dify and the visual builders in the framework phase. It consumes the vector database and retrieval entries in content/projects/data-and-retrieval implicitly, so pair it with those when you outgrow the built-in index. Its agent and workflow surface meets the framework entries such as LangChain, which it actually uses underneath, so the overlap is deliberate rather than accidental. For evaluation of the answers it produces, the eval entries in content/projects/benchmark-and-eval are the missing half of the loop. If your workload is scheduled batch indexing rather than conversational Q&A, the orchestration entries are the more honest fit.

## Resources

- [GitHub — 1Panel-dev/MaxKB](https://github.com/1Panel-dev/MaxKB)
- [Documentation site — maxkb.cn](https://maxkb.cn)
- [Offline installation guide](https://maxkb.cn/docs/)
