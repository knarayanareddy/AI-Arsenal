---
id: dust
name: "Dust"
type: tool
job: [orchestration, vector-search]
description: "Self-hostable enterprise agent platform with typed connectors, hybrid retrieval and model failover"
url: "https://github.com/dust-tt/dust"
cost_model: open-source
pricing_detail: "MIT-licensed core for self-hosting; the vendor also sells a managed multi-tenant plan"
tags: [agents, rag, orchestration, retrieval, self-hosted, cloud]
maturity: production
stack: [typescript, rust]
free_tier: true
free_tier_limits: "Self-hosted core is free; the managed product has its own trial and per-seat tiers"
self_hostable: true
open_source: true
source_url: "https://github.com/dust-tt/dust"
docs_url: null
github_url: "https://github.com/dust-tt/dust"
alternatives: [docsgpt, db-gpt]
integrates_with: []
added_date: "2026-10-21"
last_reviewed: "2026-10-21"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "A genuine platform rather than a library: connectors, hybrid retrieval and per-workspace scoping built in, which is exactly why it needs Postgres, Qdrant and worker fleets to run"
status: active
phase: orchestration
audience: [production]
best_when:
  - "Multiple business units need to author their own assistants over company data without each team rebuilding ingestion, permissions and retrieval"
  - "Answers must respect per-user document permissions, so OAuth identity has to reach the retrieval filter rather than being applied after the fact"
avoid_when:
  - "A single script or one internal endpoint is all you need and a database plus vector service would be pure overhead"
  - "The team writing the orchestration is Python-first and unwilling to maintain TypeScript and Rust services"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Architecture taken from the repository and product documentation; the self-hosted stack was not deployed or load-tested for this entry."
buzz_sources: []
---

## Overview

Dust is an open-source platform for building and operating assistants over enterprise data. It is deliberately not a library: the repository contains a Next.js/TypeScript application layer, Rust workers for document parsing and indexing, and the persistence that ties them together — Postgres for relational state, Qdrant for vectors.

That shape follows from the problem it solves. Internal assistants fail on permissions far more often than on prompt quality: a user asks a question, retrieval returns passages from documents they cannot open, and the assistant leaks. Dust attaches workspace identity and connector OAuth tokens to the retrieval path so scoping happens in the query, not in a post-filter.

Model access is abstracted, so OpenAI, Anthropic, Google and self-hosted endpoints are interchangeable per agent, with runtime fallback when a provider degrades.

## Why It's in the Arsenal

The Arsenal needs a reference for the "platform" end of the orchestration spectrum. Most catalogued entries are libraries that assume one engineering team; Dust assumes many teams, a shared data plane and an administrator who cares about which workspace can reach which connector. Those are different requirements, and they change the deployment story completely.

Cataloguing it also makes the cost visible: every capability that comes pre-built — incremental sync, hybrid search, audit logs — is a service you must operate if you self-host.

## Key Features

- Incremental connectors for Slack, Notion, Google Drive and GitHub, with rate-limit handling and payload normalisation in Rust workers.
- Hybrid retrieval combining vector similarity with keyword matching and metadata filters across Qdrant and Postgres.
- Agents declared as TypeScript specifications: instructions, retrieval configuration, tool signatures and guardrails in one reviewable object.
- Provider abstraction with runtime switching and failover between hosted and local endpoints.
- Workspace-level access control threaded into retrieval filters, plus audit trails of agent runs.

## Architecture / How It Works

Connector workers pull documents incrementally, normalise them into chunks, compute embeddings and write both vector and relational records. At query time the application layer resolves the caller's workspace and connector identities, builds a filtered retrieval request against Qdrant, then assembles the prompt from the retrieved passages plus agent instructions and conversation state. Model calls go through the abstraction layer, which selects a provider and falls back on error.

Splitting Rust from TypeScript is a deliberate allocation of work: parsing, chunking and embedding are CPU- and memory-bound and live in workers, while orchestration, UI and REST endpoints stay in a language where iteration is fast. The boundary between them is a queue, which is also where backpressure lives.

## Getting Started

Self-hosting means bringing up the full dependency set — Postgres, Qdrant, the web application and the worker fleet — typically through the provided Docker Compose file or Helm chart, then configuring connector credentials and at least one model provider key. Start with one connector and one workspace before onboarding a real department; the permission model is easiest to validate with a small, well-understood corpus.

## Use Cases

1. A support organisation querying ticket history and product docs from one assistant, where each agent's answers are limited to the channels its users can already read.
2. An engineering portal that answers questions over repository documentation and design notes, with connectors scoped to the internal GitHub organisation.
3. Departmental onboarding assistants that share one ingestion pipeline but differ in instructions and tone per team.
4. A regulated pilot where model calls must route to a self-hosted endpoint but connector data still comes from SaaS tools.

## Strengths

- Pre-built connectors remove the per-source ingestion work that dominates a from-scratch RAG project.
- Identity reaches the retrieval filter, which is the mechanism that makes cross-team deployment defensible to a security reviewer.
- The worker tier absorbs ingestion bursts without degrading query latency, since the two run in separate processes.
- Provider failover is a platform primitive, so a model outage degrades quality rather than taking the assistant offline.

## Limitations / When NOT to Use

- Operating the stack means owning Postgres, a vector service, a queue-backed worker fleet and the web tier; that is four things to monitor before the first user arrives.
- Core extension lives in TypeScript and Rust, so a Python-heavy team pays a language tax on every customisation.
- Small workloads inherit the whole footprint: the platform's fixed cost dominates when a single prompt would have sufficed.
- Self-hosting and the managed product diverge over time; features documented for the SaaS may land later, or not at all, in the open repository.

## Integration Patterns

Front Dust with your existing identity provider, let it own connector credentials, and keep the retrieval corpus in the same trust domain as the users it serves. Internal applications usually call the REST API rather than embedding the UI, with the caller's identity passed through so scoping survives. For observability, export run traces from the application layer and correlate them with worker ingestion logs; the two halves of a failed answer look different and are worth alerting separately.

## Resources

- [GitHub — dust-tt/dust](https://github.com/dust-tt/dust)
- [Dust documentation](https://docs.dust.tt/)

## Buzz & Reception

The entry reflects the repository and vendor documentation; no independent self-hosted deployment report is recorded here. The claim to verify before committing is operational, not functional: how much of the stack your team can run on call, and whether the open repository keeps pace with the managed product.
