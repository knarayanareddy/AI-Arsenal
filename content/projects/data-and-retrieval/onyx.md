---
id: onyx
name: Onyx (formerly Danswer)
version_tracked: null
artifact_type: platform
category: rag
subcategory: platforms
description: Self-hosted enterprise search and chat over 40+ workplace connectors (Slack, Drive, Confluence, Jira...) with permissions-aware retrieval
github_url: "https://github.com/onyx-dot-app/onyx"
license: "MIT (core) with enterprise-licensed directory"
primary_language: Python
org_or_maintainer: onyx-dot-app
tags: [rag, self-hosted, retrieval]
maturity: production
cost_model: self-hostable
github_stars: 30772
github_stars_last_30d: 0
trending_score: 62
last_commit: "2026-07-08"
docs_url: "https://docs.onyx.app"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained, org-backed, production-proven]
ecosystem_role:
  - "The leading open-source answer to Glean-style enterprise search: connector-first RAG where the hard problems are sync, document permissions, and freshness across dozens of workplace tools — not the chat layer"
best_for:
  - Your knowledge lives across Slack, Google Drive, Confluence, Jira, GitHub etc. and answers must respect per-user document permissions — Onyx's connector + permission-mirroring layer is the differentiator no chat-first RAG app has
  - You want self-hosted "company brain" search with hybrid retrieval and citations without paying per-seat for a Glean-class SaaS
avoid_if:
  - Your corpus is a folder of files rather than SaaS tools — connector-first architecture is overhead there; AnythingLLM-style apps are simpler
  - "You need every capability open-source: multi-tenancy and some enterprise auth features live in the enterprise-licensed directory"
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

Onyx (renamed from Danswer) is self-hosted enterprise search and chat: 40+ connectors continuously sync content from workplace tools into a hybrid search index, retrieval respects the source systems' document permissions per user, and a chat UI answers with citations. The pitch is Glean without the SaaS — your data, your infrastructure, open core.

## Why it's in the Arsenal

Enterprise RAG's actual hard problems are connectors, permission fidelity, and index freshness — not prompt chains — and Onyx is the most complete open-source implementation of that unglamorous layer (30k+ stars, active company backing). It's in the Arsenal as the deploy-as-is option for workplace search and as the reference for how permission-aware retrieval is engineered.

## Architecture

Python backend with connector workers performing scheduled/incremental syncs per source; documents chunked and indexed into Vespa for hybrid (vector + keyword) retrieval; permission metadata mirrored from sources and enforced as retrieval-time filters per requesting user; chat layer with configurable LLM providers and assistants; deployed via Docker Compose or Kubernetes.

## Ecosystem Position

Upstream: workplace SaaS APIs (the connector surface), Vespa for retrieval, any LLM provider for generation. Competing: Glean (SaaS incumbent), AnythingLLM/Open WebUI (document-chat, not connector-first). Its Vespa usage makes it a notable production reference for the `vespa` tool entry.

## Getting Started

```bash
git clone https://github.com/onyx-dot-app/onyx.git
cd onyx/deployment/docker_compose
docker compose -f docker-compose.dev.yml up -d
```

## Key Use Cases

1. **Scenario**: company-wide question answering over Slack + Drive + Confluence + Jira where a support engineer must not retrieve documents HR restricted — permission mirroring is the requirement, not a nice-to-have
2. **Scenario**: studying production RAG architecture — connector sync, hybrid indexing, and permission filtering as implemented by a system deployed at real enterprises

## Strengths

- Permission-aware retrieval across 40+ live connectors — the capability that separates enterprise search from document chat, and the hardest part to build in-house
- Hybrid retrieval on Vespa with continuous incremental sync; open-core MIT with an actively-funded company behind maintenance

## Limitations

- Operationally heavy: Vespa, Postgres, connector workers, and background sync jobs are a real platform to run — expect infrastructure investment, not a desktop app
- Multi-tenancy and parts of enterprise auth sit behind the enterprise license; permission fidelity is only as good as each connector's mirroring implementation — verify per source before trusting it for sensitive data

## Relation to the Arsenal

The connector-first pole of the RAG-application spectrum — contrast `anything-llm` (document-first). Its retrieval layer is a production case study for the `vespa` entry in [tools/data-ingestion](../../tools/data-ingestion/_index.md), and the monitoring guidance in observability/ applies to its sync/freshness failure modes.

## Resources

- [GitHub](https://github.com/onyx-dot-app/onyx)
- [Documentation](https://docs.onyx.app)
