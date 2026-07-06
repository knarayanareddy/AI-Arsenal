---
id: supabase
name: Supabase
version_tracked: null
artifact_type: platform
category: tooling
subcategory: platforms
description: "Open-source backend platform: Postgres database, auth, storage, and realtime APIs"
github_url: "https://github.com/supabase/supabase"
license: Apache-2.0
primary_language: TypeScript
org_or_maintainer: supabase
tags: [data, self-hosted, cloud, retrieval]
maturity: production
cost_model: freemium
github_stars: 74300
trending_score: 50
last_commit: "2026-06-13"
docs_url: "https://supabase.com/docs"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - "Open-source backend platform (Postgres + Auth + Storage + Realtime) commonly used as the data and persistence layer for AI agents and AI-native apps"
best_for:
  - "You need a managed or self-hosted Postgres backend with auth, storage, and realtime out of the box for an AI app or agent"
  - "You want vector/embeddings storage via pgvector alongside relational data in one system"
avoid_if:
  - "You require a non-Postgres datastore or a fully proprietary managed-only backend with no self-host option"
  - "Your team needs deep single-tenant isolation guarantees beyond what a shared Postgres instance provides"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stub added 2026-07-06 to resolve a dangling 'alternatives' reference from content/projects/agent-systems/insforge.md. Full evaluation pending human review."
added_date: "2026-07-06"
last_reviewed: "2026-07-06"
added_by: maintainer
reviewed_by: null
buzz_sources: []
featured: false
status: active
---

## Overview

Supabase is an open-source backend platform built around Postgres, providing authentication, storage, realtime subscriptions, and edge functions. This is a **stub entry** added to resolve a dangling cross-reference; it has not yet been fully evaluated against the Arsenal's review rubric.

## Why it's in the Arsenal

Listed as an alternative backend/platform for AI coding agents and AI-native apps that need a managed or self-hostable data layer. Referenced by other entries (e.g. InsForge) as a comparable platform.

## Architecture

A hosted and self-hostable control plane around a Postgres database, exposing Auth, Storage, Realtime, and Edge Functions, plus a vector/embeddings path via pgvector.

## Ecosystem Position

Complementary to agent frameworks and orchestration layers that need durable state; competes with other backend-as-a-service platforms. Supabase's agent-native surface (MCP server, Postgres tooling) makes it a common persistence choice for coding agents.

## Getting Started

```bash
# Spin up a local Supabase stack
npx supabase init
npx supabase start
```

## Key Use Cases

1. **AI app persistence**: relational + vector storage for agent memory, chat history, and retrieved documents.
2. **Auth for AI products**: drop-in auth and row-level security for user-facing AI apps.

## Strengths

- Open-source core (Apache-2.0) with a generous free/self-host path.
- Postgres-native, so transactional and vector workloads live in one system.

## Limitations

- Postgres-centric; not a fit if a non-Postgres store is required.
- Shared tenancy may not meet every single-tenant isolation requirement.

## Relation to the Arsenal

Serves as a reference persistence/platform option for agent-system and data-and-retrieval workflows documented across the Arsenal.

## Resources

- [Supabase](https://supabase.com)
- [Documentation](https://supabase.com/docs)
- [GitHub](https://github.com/supabase/supabase)

---

*Last reviewed: 2026-07-06 by @maintainer — stub entry; full evaluation pending.*
