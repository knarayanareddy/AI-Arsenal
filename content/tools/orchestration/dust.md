---
id: dust
name: "Dust"
type: tool
job: [orchestration, vector-search]
description: "Hosted team platform for agents over company data, with connectors, permission-aware retrieval and credit pricing"
url: "https://dust.tt/"
cost_model: freemium
pricing_detail: "Free seat with 500 lifetime credits; Pro at $24-30/seat/month including 8,000 monthly credits; enterprise adds SSO, audit logs and single-tenant deployment"
tags: [agents, rag, orchestration, retrieval, cloud]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "500 credits, granted once rather than monthly; every ongoing workflow needs a paid seat"
self_hostable: false
open_source: false
source_url: "https://dust.tt/"
docs_url: "https://docs.dust.tt/"
github_url: null
alternatives: [docsgpt, db-gpt]
integrates_with: []
added_date: "2026-10-21"
last_reviewed: "2026-10-24"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "A polished hosting story with permission-aware retrieval and 20+ connectors, but the platform is closed: no self-hosting, and credit-based seats get expensive for chatty agents"
status: active
phase: orchestration
audience: [production]
best_when:
  - "Non-engineers must build and run their own assistants over company data, and a hosted workspace is acceptable"
  - "Answers have to respect each user's document permissions end to end, including in Slack and other chat surfaces"
avoid_when:
  - "Data residency or procurement rules require the platform to run inside your own infrastructure and network boundary"
  - "Usage is dominated by high-volume, low-value calls where per-credit pricing is the wrong shape"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Pricing and plan structure read from the vendor's pricing page on 2026-10-24. The former dust-tt/dust repository now returns 404, so self-hosting claims from earlier cataloguing were removed rather than re-described."
buzz_sources: []
---

## Overview

Dust is a hosted platform where a company assembles assistants over its own documents and tools: connect a data source, pick a model, write the instructions and the assistant appears in Slack, the web app or an API call. Connectors handle Drive, Notion, GitHub and about twenty others, and the same connection can expose both content for retrieval and actions for the agent.

It competes on the administrative layer rather than on retrieval quality alone. Users, spaces, OAuth-linked identities and per-document permissions are first-class, so an answer in a shared channel is filtered by what that specific person may read rather than by a workspace-wide grant.

The product is now closed-source. The `dust-tt/dust` repository that this catalogue previously described is gone, so the self-hosting path is no longer available; enterprise plans offer single-tenant deployment, which is still the vendor's infrastructure.

## Why It's in the Arsenal

The Arsenal's retrieval entries cluster around frameworks you assemble yourself. This one represents the opposite trade: a managed surface where the connectors, the permission model and the chat integrations already exist, and the cost is a per-seat subscription with a credit meter on top.

It is catalogued with the correction that matters most to anyone following an older link: the open-source repository was withdrawn. Recording that explicitly is more useful than quietly deleting the entry, because teams evaluating it from a stale blog post will otherwise plan around self-hosting that does not exist.

## Key Features

- Twenty-plus managed connectors, from Drive and Notion to GitHub, with OAuth handled per user rather than by a shared service account.
- Spaces and per-document permissions applied inside retrieval, so an assistant in a shared channel answers within the reader's access.
- Multi-agent workflows with schedules and event triggers, plus MCP servers for custom tools.
- A choice of more than twenty models per agent, billed through a single credit currency.
- US or EU data residency, SSO with Okta, Entra ID or Jumpcloud, and SOC 2 Type II on the business plans.

## Architecture / How It Works

Connections index documents into a retrieval layer, storing text alongside the source document identifiers and the permission metadata the source exposes. At query time the assistant's retrieval step joins on the asking user's identity, so chunks from documents that user cannot open never enter the context window. The prompt is assembled with the agent's instructions and tools, the model is called from whichever provider was selected, and tool invocations route back through the connector layer.

Agents run as workflows: a trigger, a sequence of steps, and optional handoffs between specialised agents. Because everything is hosted, the operator surface is configuration and billing rather than infrastructure, and the failure modes are credit exhaustion and connector scope rather than crashed workers.

## Getting Started

Start with one connector and one space, invite two colleagues, and ask a question whose answer lives in a document only one of them can see — the differential answer is the thing to verify first. Then watch the credit meter for a week of ordinary use before rolling out to a team, because seat price is predictable and consumption is not.

## Use Cases

1. A sales team querying CRM notes, call transcripts and shared drive documents from Slack without exporting anything.
2. Support engineers answering from an internal knowledge base where article visibility differs by region.
3. Recurring operational digests built as scheduled multi-agent workflows.
4. A pilot where the business, not the platform team, owns the assistant's behaviour and iteration.

## Strengths

- Permission-aware retrieval is built in, including the case where two colleagues get different answers to the same question.
- Connector breadth and per-user OAuth remove the integration work that dominates a self-built RAG project.
- Chat surfaces and scheduled workflows meet users where they work, which drives adoption more than features do.
- Model choice per agent lets one team run a cheap model for triage and an expensive one for research.
- Administrative controls — SSO, audit logs, residency, SOC 2 — are the ones a security review asks about.

## Limitations / When NOT to Use

- Closed platform: no source access, no self-hosting, and no ability to fix a retrieval bug by patching code.
- Credits are consumed per message and scale with model choice and tool use, so heavy agentic workflows are hard to forecast.
- Free seats receive a lifetime credit allowance, which makes evaluation cheap and sustained use effectively paid.
- Logic lives in the platform's configuration rather than your repository, so version control and review are weaker than with code.
- Leaving means rebuilding connectors, prompts and permission mapping elsewhere.

## Integration Patterns

Treat it as a product you operate, not infrastructure you own: budget credits per team, alert on consumption, and keep a written inventory of connectors and the scopes each one holds. For anything that must stay inside your network, plan the exit — export prompts and connector lists periodically so a migration is a port rather than an archaeology project. Evaluate the permission model against a real org chart before rollout, not with a test user.

## Resources

- [Dust](https://dust.tt/)
- [Dust documentation](https://docs.dust.tt/)

## Buzz & Reception

The vendor reports thousands of teams and hundreds of thousands of deployed agents, which is marketing rather than measurement; what is verifiable is the plan structure, the connector list and the withdrawal of the open repository. Treat adoption numbers as directional and price your own usage from the credit table.
