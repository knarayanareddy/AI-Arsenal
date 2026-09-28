---
id: onyx
name: Onyx (formerly Danswer)
version_tracked: null
artifact_type: platform
category: rag
subcategory: platforms
description: "Self-hostable enterprise context layer that indexes 50-plus connected apps with permissions preserved"
github_url: "https://github.com/onyx-dot-app/onyx"
license: NOASSERTION
primary_language: Python
org_or_maintainer: onyx-dot-app
tags: [retrieval, self-hosted, agents, security]
maturity: production
cost_model: self-hostable
github_stars: 32271
github_stars_last_30d: 0
trending_score: 62
last_commit: "2026-09-28"
docs_url: "https://onyx.app"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained, org-backed, production-proven]
ecosystem_role:
  - "The leading open-source answer to Glean-style enterprise search: connector-first RAG where the hard problems are sync, document permissions, and freshness across dozens of workplace tools — not the chat layer"
best_for: ["You need an assistant over the tools your team already uses, because Onyx connects to more than fifty applications and ingests data along with its metadata and permissions.", "You are an enterprise team that must self-host, because data sovereignty is the framing of the product and the deploy path is a single shell command.", "You want an agent to act in external systems rather than only read, since external actions and MCP are supported alongside a secure sandbox for code execution."]
avoid_if: ["You need an OSI-approved licence for a self-hosted internal deployment, because the API reports the licence status as unasserted and that needs checking against the source before you commit.", "You are indexing one small corpus, because a fifty-connector platform with web search, sandboxes and artifacts is a lot of surface for a single document set.", "You want a retrieval engine rather than an application, because Onyx bundles the index, the agent harness, the chat surface and the integrations into one product."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [anything-llm, open-webui]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (30.7k) and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. License split (MIT core + ee directory) from the repository. Connector count and permission-sync claims from official docs; not independently tested here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/onyx-dot-app/onyx","date":"2026-07-08","description":"30.7k stars, active development, formerly Danswer"}
featured: false
status: active
---

## Overview

Onyx is positioned as the context layer for a team and for its AI agents. It connects to the applications an organisation already uses - more than fifty of them - pulls data along with metadata and permissions, and ingests it into a representation that can be queried. The architectural argument in the README is worth stating precisely: rather than having an agent coordinate dozens of MCP search calls and burn thousands of tokens iterating, Onyx fetches context from its internal representation in one pass and filters to the relevant ground-truth documents. The product surface is broader than search: agentic RAG on a hybrid index, a multi-step deep research flow, custom agents scoped to knowledge subsets with their own instructions and the ability to take actions, live web search through several providers plus an in-house crawler, a secure sandbox for code execution, downloadable artifacts, and voice mode. Any major LLM provider works, self-hosted or proprietary.

## Why it's in the Arsenal

The decision it addresses is permission-aware internal retrieval. A company assistant that reads everything is a compliance problem before it is a usefulness problem, so the ingestion layer has to carry the source system's access model rather than flattening it. Onyx makes permissions part of ingestion and claims that changes the retrieval story: a hybrid index plus a retrieval-tuned agent harness can answer from a prepared representation in one pass, which is both faster and far cheaper than an agent looping over search tools. The cost is consolidation - you are committing to one platform's index and its own agent harness rather than assembling retrieval from parts.

## Architecture

Ingestion is the load-bearing component: connectors read from each source and carry metadata and permissions into a shared representation, which is what makes a single query layer able to enforce access. Retrieval is hybrid index plus a custom agent harness tuned for information retrieval rather than a generic agent loop, and the README's argument is that this single-pass fetch replaces iterative tool-calling search. Around that sit the agent surface with per-agent knowledge subsets and instructions, an action layer for external applications exposed through MCP, a sandbox for code and intermediate artefacts, and artifact generation. The model layer is provider-neutral, covering self-hosted endpoints and proprietary APIs alike, and deployment is a single command against your own infrastructure.

## Ecosystem Position

Onyx competes directly with AnythingLLM, the other self-hosted workspace application in this batch, and the difference is scope: AnythingLLM is a workspace around documents you upload, while Onyx is a connector layer around systems you already run. It overlaps with the enterprise search products built on Elasticsearch-style indexes, but the agent harness and action layer are its own contribution. Compared with building a RAG stack from the vector stores in content/projects/data-and-retrieval plus a framework from content/projects/frameworks, Onyx is the integrated product and those are the components. It complements rather than replaces the MCP server tooling in content/tools/developer-experience, and its web search sits alongside the crawl4ai and Firecrawl entries in the ingestion phase.

## Getting Started

```bash
# Docker is the supported path for a local run
docker compose up -d

# or run the backend and frontend directly from a checkout
# backend
python -m uvicorn backend.server.main:app --host 0.0.0.0 --port 3000
# frontend
npm run dev
```
The compose file starts PostgreSQL, Redis, and the index, so budget for a few GB of RAM before you point it at a large corpus.

## Key Use Cases

1. Self-hosting an internal search and chat surface where documents must stay inside your network, using the indexed connectors rather than a third-party search SaaS.
2. Answering questions with access control, where document-level permissions carry through indexing instead of being applied after retrieval.
3. Keeping an index fresh as shared drives change, which the connector layer is built to handle without a manual re-upload.

## Strengths

- Self-hosted end to end, so a corpus that cannot go to a vendor never leaves the building.
- Permissions are a first-class concern, carried from connector metadata into retrieval rather than bolted on afterwards.
- Connector-driven ingestion means a new source is configuration, not a bespoke crawler.
- The Docker path makes a first run cheap, which matters for a stack this size.

## Limitations

Running this properly wants real memory: self-hosted search over a large document set plus a database and a container runtime, which is why the quickstart leans on Docker. Connector coverage is the usual self-hosted tax, so a source without a maintained connector needs custom ingestion work before search sees it at all. Onyx competes directly with AnythingLLM in this catalog, and the two make different bets: Onyx spends its effort on permissions and document-level freshness, AnythingLLM on local-model chat over a folder. It is an application rather than a library, so there is nothing to import and every change goes through the UI or its API.

## Relation to the Arsenal

This is a data-and-retrieval phase entry and the enterprise-integrated option in the folder, sitting next to anythingllm and mempalace in content/projects/agent-systems. Its retrieval is the hybrid index rather than a bare vector store, so read it against qdrant and milvus in the same folder if you are comparing the index layer itself. The agent harness makes the frameworks in content/projects/frameworks a comparison rather than a dependency. Upstream are the connectors to the systems it indexes; downstream sit the eval tooling in content/projects/benchmark-and-eval, because a permission-aware index still needs its answers measured on real questions.

## Resources

- [GitHub - onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx)
- [Project site](https://onyx.app)
- [Deployment docs linked from the README](https://docs.onyx.app)
