---
id: open-connector
name: open-connector
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "A self-hostable connector gateway exposing 1500-plus SaaS providers and 10000-plus actions through SDK, CLI, MCP, and OpenAPI"
github_url: "https://github.com/oomol-lab/open-connector"
license: Apache-2.0
primary_language: TypeScript
tags: [data, security, tool-use, routing]
maturity: beta
cost_model: self-hostable
github_stars: 5911
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://oomol.com"
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Owns OAuth credentials and scopes in one inspectable runtime instead of scattering them across every agent integration."
best_for:
  - "You are an agent that must act inside SaaS tools and need OAuth with scoped tokens held somewhere other than the agent's context."
  - "You are building integrations for many tenants and need one auditable store for credentials, scopes, policies, and run logs."
  - "You want one contract that works from TypeScript code, a CLI, an MCP host, or a plain HTTP client without rewriting each."
avoid_if:
  - "You only need one or two API integrations, where hand-written OAuth and a small SDK call will be less work."
  - "You cannot operate OAuth applications yourself, since self-hosting makes you responsible for redirect URIs, secrets, and consent flows."
  - "You need guaranteed uptime of a provider's connector, because action executors are per-provider and their coverage varies."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 5911, Apache-2.0, TypeScript, last commit 2026-09-28, topics, homepage. From README: 1500+ providers, 10000+ actions, four credential types, lazy-loaded executors, SDK/oo CLI/MCP/OpenAPI surfaces, SQLite or PostgreSQL, Node.js 22+. Dynamic badge counts not fetched."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenConnector is a connector gateway whose catalog spans more than 1500 providers and more than 10000 prebuilt Actions, covering GitHub, Gmail, Notion, BigQuery, Google Analytics, Supabase, Airtable, Slack, and others. Credentials come in four shapes - API keys, OAuth2, custom credential payloads, and no-auth providers - and each Action carries an inspectable contract: request and response schemas, the scopes it requires, and lazily loaded executor source. Runtime controls are the actual product: connection identity, granted scopes, runtime tokens, allow and block policies per action, temporary file transit, and redacted run logs. Four consumption paths share the same provider IDs, action IDs, schemas, and contracts - a Connector SDK for application code, the oo CLI as a local-agent relay, MCP from agent hosts, and HTTP plus OpenAPI 3.1 for custom clients - with a Web Console for administration and debugging.

## Why it's in the Arsenal

The recurring decision is where a user's third-party credentials live when an agent acts on their behalf. The naive answer puts an OAuth token in a prompt or a config file, which means every integration duplicates refresh logic and every compromise leaks every account. Centralizing credential custody in a gateway with per-connection identity and per-action scope policy means the agent holds a runtime token rather than a durable secret, revocation is one place, and the run log records what each action did with which scopes. The four consumption surfaces matter because the integration surface changes with the caller and the contract should not.

## Architecture

A gateway process owns connection state and the Action catalog, with PostgreSQL or SQLite behind it for local or hosted deployments and local or S3-compatible storage for file transit. Incoming requests from SDK, CLI, MCP, or HTTP resolve a provider ID plus action ID to a contract, verify the caller's identity against granted scopes, evaluate the action's allow or block policy, mint or check a runtime token, and execute a lazily loaded provider-specific executor. Responses and side effects land in redacted run logs so an operator can audit without leaking secrets. Node.js 22+ is required and the code is TypeScript, and deployment targets include Docker, Cloudflare Workers, Fly.io, RepoCloud, and others, with the same contract IDs maintained across the hosted and self-hosted deployments.

## Ecosystem Position

OpenConnector positions itself explicitly as an alternative to Pipedream and Composio, and competes with n8n, Make, and Zapier at the integration layer while differing in target: those are workflow builders for humans, this is a tool surface for agents. Compared with Composio, the meaningful difference is custody - self-hosting keeps credentials and run logs inside your infrastructure instead of a vendor's. It overlaps with the MCP servers in content/projects/data-and-retrieval in transport, and those can be registered as providers here rather than replaced. It complements content/projects/frameworks by supplying the tool side of an agent loop, and it changes nothing about serving, so content/projects/inference-engines is unrelated except as the model that calls these actions.

## Getting Started

Self-host with Docker or Node.js, register OAuth applications for the providers you need, and connect the gateway to your agent over MCP.

```bash
git clone https://github.com/oomol-lab/open-connector.git && cd open-connector
docker compose up -d           # SQLite or PostgreSQL state
npx oo mcp                    # expose the catalog to an agent host
```

Use the Web Console to add connections and grant scopes, then read docs/deployment-options/ for Cloudflare, Fly.io, and other targets.

## Key Use Cases

1. Give an agent scoped SaaS access: issue a runtime token scoped to one provider and action set so the agent never holds a durable OAuth secret.
2. Unify integration contracts: call the same action from TypeScript, the CLI, an MCP host, or HTTP without maintaining four client implementations.
3. Audit agent actions: read redacted run logs showing which connection, which action, and which scopes were exercised for every call.

## Strengths

- Centralized credential custody with per-connection identity and per-action scope policy, instead of tokens scattered across integrations.
- One contract across SDK, CLI, MCP, and OpenAPI, with identical provider and action IDs between hosted and self-hosted.
- Lazy-loaded executor source means you can read what an action actually does before allowing it.
- Redacted run logs and allow/block policies make agent behavior auditable and revocable in one place.

## Limitations

The 1500-provider and 10000-action numbers measure catalog breadth, not depth, and any single connector's coverage of a provider's API will be partial - usually enough to be useful, rarely complete. Self-hosting transfers real responsibility: you manage OAuth app registration, redirect URIs, client secrets, token refresh, and consent, which is the bulk of the work people underestimate. Per-provider executors are the least-maintained surface and will break when a vendor ships an API change. Availability depends on each upstream SaaS, and rate limits differ per provider with no uniform handling. There is no managed SLA on the open-source build, and the hosted runtime is a separate commercial dependency.

## Relation to the Arsenal

This data-and-retrieval-phase entry is an action surface rather than a data store, so it complements the retrieval tools in this phase rather than competing with them, and it can register those MCP servers as providers. Its tool surface is what makes an agent in content/projects/frameworks able to act outside its own runtime, and it sits entirely above content/projects/inference-engines with no model involvement of its own.

## Resources

- [Repository](https://github.com/oomol-lab/open-connector)
- [Deployment options documentation](https://github.com/oomol-lab/open-connector/blob/main/docs/deployment-options/)
