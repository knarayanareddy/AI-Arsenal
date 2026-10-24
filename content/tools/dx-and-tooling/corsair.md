---
id: corsair
name: "Corsair"
type: tool
job: [orchestration, security-and-guardrails]
description: "Integration gateway handling user OAuth, token refresh and schema normalisation for agent tools"
url: "https://github.com/corsairdev/corsair"
cost_model: open-source
pricing_detail: "Self-hosted open-source gateway; the cost is the database and secrets infrastructure you operate"
tags: [agents, tool-use, security, structured-output, self-hosted]
maturity: beta
stack: [typescript]
free_tier: true
free_tier_limits: "Self-hosted and unrestricted; provider APIs you call may impose their own quotas"
self_hostable: true
open_source: true
source_url: "https://github.com/corsairdev/corsair"
docs_url: null
github_url: "https://github.com/corsairdev/corsair"
alternatives: []
integrates_with: []
added_date: "2026-10-03"
last_reviewed: "2026-10-03"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Puts user-delegated OAuth and response shaping in one place instead of in every agent, which is the part teams most often get wrong; beta, so integration breadth is thin"
status: active
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "Agents must act as the signed-in person across several SaaS products, so consent, refresh and revocation belong in one audited component"
  - "Third-party API responses are too large or too irregular for model context and need normalising before they reach the prompt"
avoid_when:
  - "The agent only touches internal systems where a service credential covers every call and no per-user consent exists"
  - "You need a large catalogue of pre-built connectors today rather than the ability to write one"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Design described from the repository and documentation; the OAuth lifecycle was not exercised against a live provider for this entry."
buzz_sources: []
---

## Overview

Corsair is a self-hosted gateway that sits between an agent and the SaaS APIs it acts on. Its job is the part that is tedious to rebuild and easy to get wrong: run the OAuth authorization-code flow per user, store tokens safely, refresh them before expiry, execute the API call and normalise the response into something small enough to put in a prompt.

It exposes those integrations twice over — as plain REST endpoints and as Model Context Protocol tools — so a client with MCP support can discover them without bespoke wiring. The gateway holds the credential vault; the agent holds no provider secrets at all.

In TypeScript, with providers declared as schema-plus-mapping definitions, so adding an integration is a declarative task rather than new runtime code.

## Why It's in the Arsenal

The Arsenal documents the tool-use boundary as a design decision. Most agent stacks treat credentials as environment variables, which works until an agent must act on behalf of a specific end user: then every call needs the right token, every token expires, and every provider shapes its responses differently.

Corsair is catalogued because it makes that boundary explicit and centralised. It is also a useful contrast with workflow automation built for trigger-action pipelines — those assume a linear hand-off, while an agent chooses tools at runtime.

## Key Features

- A managed OAuth2 engine covering the authorization-code grant, encrypted token storage and background refresh across providers.
- MCP-native exposure of connected integrations, so compatible clients discover tools without per-provider adapters.
- Response normalisation that flattens nested provider payloads into concise JSON, protecting the context budget.
- Declarative provider definitions in TypeScript: a schema plus mapping functions per API.
- Per-user scope isolation, so a tool can only reach what that user actually authorised.

## Architecture / How It Works

A user completes consent once; the gateway exchanges the code, encrypts the refresh token and associates it with that user and provider. On a tool call the request carries the user's session, the gateway resolves the matching token, refreshes it if needed, injects it into the outgoing request and maps the provider response through the integration's schema before returning it.

Because credentials resolve at call time rather than at deployment, adding a user does not require a new deployment or secret. Because normalisation happens server-side, the model sees a stable, compact shape even when the provider changes its own schema.

## Getting Started

Stand up the gateway with its database, register an OAuth application with one provider, and walk a single user through consent end to end — including a forced token expiry — before wiring it into an agent. That expiry test is the one most teams skip and the one that decides whether the gateway is trustworthy in production.

## Use Cases

1. A support assistant that reads a customer's own tickets and files in the tools they have already authorised.
2. A personal-agent product where each end user connects their own accounts and scopes are enforced per user.
3. Internal automation that must respect per-employee Google Drive permissions rather than a service account's blanket access.
4. MCP clients pointing at a company gateway to get a governed tool catalogue instead of many direct integrations.

## Strengths

- Credential handling is centralised, so revocation and rotation are one operation instead of an audit across services.
- Scope isolation is enforced per user, which is the property a security review will ask about first.
- Response normalisation protects the context window, the resource most agent systems exhaust first.
- MCP exposure means the same gateway serves several agent clients without duplicating integration code.

## Limitations / When NOT to Use

- Integration breadth is thin at beta; expect to write provider definitions rather than find them.
- Self-hosting adds a database and a secrets store to operate, which is a real cost next to a managed alternative.
- Mapping layers are coupled to upstream APIs: a breaking change at a provider breaks tool execution until the definition is updated.
- The gateway is on the critical path, so its availability bounds every agent that depends on it.

## Integration Patterns

Deploy it as an internal service behind the same authentication as your other APIs, with the credential store in the secrets manager you already run and backups treated as sensitive data. Have agents call it over MCP so the tool catalogue is governed in one place, and log the user, provider and scope for every call — that record is what makes an over-broad tool invocation traceable. Refresh failures should surface as re-consent prompts, not as silent tool errors.

## Resources

- [GitHub — corsairdev/corsair](https://github.com/corsairdev/corsair)

## Buzz & Reception

Reception is inferred from repository activity; no independent production deployment is recorded here, and the beta label means the provider catalogue is still being built out. The property to verify before adopting is how the gateway behaves when refresh fails mid-session.
