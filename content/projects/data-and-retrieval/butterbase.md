---
id: butterbase
name: butterbase
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "A Postgres-backed backend-as-a-service with auth, storage, functions, an LLM gateway, and an MCP server for agents"
github_url: "https://github.com/butterbase-ai/butterbase"
license: Apache-2.0
primary_language: TypeScript
tags: [data, tool-use, routing]
maturity: beta
cost_model: self-hostable
github_stars: 3690
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-27"
docs_url: "https://butterbase.ai"
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Puts the database, the agent-facing tool surface, and the AI gateway in one self-hosted deployment instead of three vendors."
best_for:
  - "You are building a SaaS product and want Postgres with row-level security plus agent-manageable auth without assembling Supabase-style pieces yourself."
  - "You are shipping an agent that needs to act on your backend through tools rather than bespoke glue code calling your REST API."
  - "You are self-hosting for data residency reasons and need storage, KV, and functions alongside your primary database."
avoid_if:
  - "You are on a serverless edge platform without a container runtime, because functions run on the Deno runtime inside this stack."
  - "You need a battle-tested multi-region control plane, since this is a self-hosted deployment you operate yourself."
  - "You are expecting Supabase feature parity, because the row-level security and auth surface is narrower than the incumbent's."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 3690, Apache-2.0, TypeScript, last commit 2026-09-27, topics. From README: route paths, Deno functions, Durable Objects, edge SSR, KV in v0.2.0, AI gateway, RAG, MCP server, Supabase alternative framing. SETUP.md and runtime behavior not read."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Butterbase bundles a per-app Postgres data plane with declarative schema at /schema, automatic REST endpoints at /auto-api, migrations, and first-class row-level security policy management with user-isolation helpers at /rls. On the compute side it offers TypeScript serverless functions on Deno, Durable Objects as stateful per-key actors for chat rooms, multiplayer, rate limiters, and long-running agents, WebSocket realtime subscriptions, edge SSR for Next.js, Remix, and Astro handlers, plus static and SPA frontend hosting. The AI layer is a single gateway endpoint covering chat, embeddings, and model listing with pluggable router adapters, plus managed RAG collections with ingestion and synthesized answers. Storage is S3 or R2 backed with presigned URLs and ACLs, and a regional quota-protected KV store with TTL and audit trail arrived in v0.2.0. The MCP server is the point of the whole thing: agents operate the backend through tools.

## Why it's in the Arsenal

The recurring decision is how many vendors a product with an agent surface ends up paying. Every SaaS app needs a relational database with tenant isolation, and every agent product needs a tool surface, an embedding endpoint, and document storage - normally four separate services and four failure modes. Colocating them means the agent's authentication is the same identity system as the app's, so tool calls carry the same tenant isolation as ordinary API requests instead of needing a parallel permission model.

## Architecture

The request path is HTTP-first: routes under /schema, /auto-api, /rls, /functions, /durable-objects, /realtime, /storage, /gateway, and /rag each own one capability, with automatic REST generation derived from the declarative schema rather than hand-written. State lives in Postgres for relational data and a separate regional key-value tier for hot counters and TTL data, while binary objects go to S3 or R2 through presigned URLs. The AI gateway normalizes chat, embeddings, and model listing behind one endpoint and delegates routing to pluggable adapter modules, so swapping providers is an adapter change rather than a call-site change. The MCP server is a peer surface over the same capabilities, which means an agent and an HTTP client exercise identical authorization paths.

## Ecosystem Position

Butterbase is positioned explicitly as a Supabase alternative and competes with Firebase, Appwrite, and PocketBase on the same backend-as-a-service ground. Compared with Supabase, the differentiator is the agent-native surface - MCP server plus durable per-key actors plus an in-box AI gateway - rather than a broader SQL feature set, and the README's self-host path is the real answer to Supabase's managed-tier dependency. It overlaps with the other MCP servers catalogued in content/projects/data-and-retrieval, but those expose third-party tools whereas this exposes your own backend. Its gateway and RAG components touch the same territory as content/projects/inference-engines while sitting one layer up, where routing happens above the model server instead of inside it.

## Getting Started

Self-host with Docker, then create a project and point an MCP client at the generated endpoint. The repository ships SETUP.md for the self-host path.

```bash
git clone https://github.com/butterbase-ai/butterbase.git && cd butterbase
docker compose up -d
# then create an app and generate its MCP endpoint from the console
```

See SETUP.md in the repository for the full bring-up sequence and required environment variables.

## Key Use Cases

1. Give an agent real backend tools: register the MCP server so the agent reads and writes Postgres through the same RLS policies your web app uses.
2. Run a long-lived agent with state: use a Durable Object as a per-key actor instead of bolting a queue and a state store onto your model calls.
3. Collapse vendor count: ship chat, embeddings, and model listing from one gateway and document RAG from the same deployment as your relational data.

## Strengths

- Postgres plus RLS as the single source of truth, so agent tool calls inherit real tenant isolation instead of a parallel permission model.
- First-class MCP surface over the same capabilities the HTTP API exposes, so agents and clients share one authorization path.
- Durable Objects give per-key stateful actors for chat and rate limiting without bolting on a separate state backend.
- Apache-2.0 licensed with a documented self-host path and a ROADMAP, so the deployment model is yours to operate.

## Limitations

You own the reliability engineering: there is no managed tier, no multi-region replication story, and no SLA unless you build one. Functions run on Deno, which means Node-only packages and npm-specific tooling need a workaround or an explicit port. Automatic REST generation is convenient until your schema needs a hand-tuned endpoint, at which point you drop down to custom routes and own that SQL. The AI gateway's value depends entirely on the router adapters you configure, and RAG quality will follow whichever embedding provider you plug in. AGPL-style expectations do not apply here since it is Apache-2.0, but the project is young enough that core interfaces may still move between versions.

## Relation to the Arsenal

This data-and-retrieval-phase entry is a full application backend rather than a retrieval component, though its RAG collections and gateway touch that territory. The agents it serves would be built with the runtimes in content/projects/frameworks, the chat and embedding calls resolve down into content/projects/inference-engines, and its MCP endpoint belongs to the same integration family as the other connector servers in this phase.

## Resources

- [Repository](https://github.com/butterbase-ai/butterbase)
- [Website](https://butterbase.ai)
- [Self-host setup guide](https://github.com/butterbase-ai/butterbase/blob/main/SETUP.md)
