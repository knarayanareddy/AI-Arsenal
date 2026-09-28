---
id: cognee
name: "Cognee"
version_tracked: null
artifact_type: framework
category: rag
subcategory: vector-databases
description: "Memory platform that turns documents, code and conversations into a self-hosted knowledge graph agents can query"
github_url: "https://github.com/topoteretes/cognee"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Topoteretes"
tags: [memory, retrieval, graphs, local]
maturity: production
cost_model: open-source
github_stars: 31135
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-28"
docs_url: "https://www.cognee.ai"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language, general-purpose]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The pipeline-centric take on agent memory: cognee models memory construction as composable Extract-Cognify-Load (ECL) tasks that build a knowledge graph plus embeddings from any data source, aiming at the space between raw vector RAG and heavyweight graph platforms."
best_for: ["You are building agent memory and the cost of an embedding-plus-LLM pipeline per session is the sticking point, because the default path is deliberately small models on your CPU.", "You want memory that is inspectable rather than opaque, because the store is a knowledge graph you can query, so you can see why a fact was retrieved.", "You are assembling shared team memory across documentation, tickets, code and conversations, which is the Company Brain pattern the project names as its primary use case."]
avoid_if: ["You need a managed SLA, because this is a self-hosted graph stack you operate, with a Discord and a subreddit rather than a support contract.", "You want retrieval quality that a frontier embedding model would give you out of the box, because CPU-sized small models are the default and you are trading accuracy for the zero-cost claim.", "You already have a graph database and a vector store wired into production, because adding a second memory system is a new consistency problem rather than a simplification."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [graphiti, mem0]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (27,350), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/topoteretes/cognee", "date": "2026-07-08", "description": "27,350 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Cognee turns documents, code and conversations into a knowledge graph that an agent can search and reuse as persistent long-term memory across sessions. The design emphasis is local operation: the README states it runs locally for free with no API key required, relying on free small models that run on the CPU. Ingestion is not limited to documents - a Company Brain mode is described for bringing documentation, conversations, tickets, code and agent work into shared memory so a team can connect a decision to the discussion and implementation behind it. There is a research paper behind the retrieval layer, Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning by Markovic and colleagues, and a plugin ecosystem plus community add-ons. The README is maintained in nine languages.

## Why it's in the Arsenal

The decision it addresses is memory cost and memory legibility. Most agent memory layers are a vector store plus a summariser, which is opaque - you cannot ask why a fact surfaced, and you pay per token to build it. A graph representation makes the relationships first-class and the pipeline reproducible on commodity hardware. The other half of the argument is organisational: if memory is a graph you can query and share, it stops being a per-agent cache and becomes infrastructure a team can point multiple agents at, which is what the Company Brain framing is selling.

## Architecture

Ingestion is a two-stage transform: content is parsed into units, then those units are linked into a graph of entities and relationships that sits in a graph database while the text and vectors live alongside it for retrieval. Query time mixes the graph structure with semantic search, which is the subject of the cited paper - the work is on optimising how a graph is presented to an LLM for multi-hop reasoning, not just how it is stored. The embedding and generation steps default to small CPU-runnable models, which is the mechanism behind the no-API-key claim and also the source of the accuracy ceiling. A plugin layer lets extra sources and backends be added without changing the core pipeline.

## Ecosystem Position

Cognee competes with the other agent-memory projects - mem0, letta, zep - and the differentiator is the graph representation plus the zero-cost local default, where those typically ship a hosted tier. It overlaps with graph-based retrieval approaches on the graph axis, and differs from a plain vector database such as qdrant or milvus in content/projects/data-and-retrieval by owning the ingest and memory semantics rather than just the storage. Compared with mempalace, which stores text verbatim and retrieves it semantically, Cognee builds structure and therefore can lose wording in exchange for relationships. It complements rather than replaces the framework entries in content/projects/frameworks, which need a memory interface to plug into, and it is an alternative to wiring a graph checkpointer plus a separate vector store yourself.

## Getting Started

Install and point it at a directory of material to index:

```bash
pip install cognee
cognee add <path-to-your-docs-or-code>
cognee cognify
cognee search "what did we decide about the schema change?"
```

The add, cognify, search sequence is the documented local flow, and it needs no API key because the default models run on CPU. The docs and demo link in the README cover the graph and the query layer in more depth.

## Key Use Cases

1. Cross-session agent memory: give an agent a memory that survives restarts without a per-token embedding bill on every conversation turn.
2. Company Brain: index docs, tickets and code together so a question about why a design decision was made returns the discussion and the implementation, not just the decision record.
3. Dependency-aware questions: ask a multi-hop question about how components relate, where a graph traversal beats flat nearest-neighbour retrieval.

## Strengths

- No API key and CPU-only default models, so memory cost is compute you already own rather than a recurring inference bill.
- Graph representation makes retrieval relationships inspectable and supports multi-hop questions a flat vector store answers poorly.
- Ingests documents, code and conversations into one store, which is what makes a shared team memory possible.
- Apache-2.0 with a cited research paper for the graph-to-LLM interface, and plugins for extending sources and backends.

## Limitations

The zero-cost default is also the quality ceiling: CPU-sized small models will be weaker embedders and generators than the hosted frontier models most memory systems assume, and you will feel that on entity resolution and multi-hop answers. A knowledge graph built by extraction is only as good as the extractor, and errors compound as the graph grows, so re-indexing a changed corpus is a real cost. It is a self-hosted stack with a graph database dependency and a plugin surface you have to secure. The competitive claim is a README assertion - at 31k stars with a September 2026 commit the project is active, but no independent benchmark is cited for the memory quality.

## Relation to the Arsenal

This is a data-and-retrieval phase entry that is functionally an agent-memory component, so read it beside mempalace, mem0 and letta in the same folder and in content/projects/agent-systems for the difference between verbatim and structured memory. The graph and vector stores it uses are the entries in content/projects/data-and-retrieval such as milvus and qdrant, and the embedders it defaults to sit in content/projects/model-layer. Downstream, the frameworks in content/projects/frameworks need a memory interface, and the eval tooling in content/projects/benchmark-and-eval is where you would measure whether its recall beats a flat vector store on your own questions.

## Resources

- [GitHub - topoteretes/cognee](https://github.com/topoteretes/cognee)
- [Project site and docs](https://www.cognee.ai)
- [Research paper on arXiv 2505.24478](https://arxiv.org/abs/2505.24478)
