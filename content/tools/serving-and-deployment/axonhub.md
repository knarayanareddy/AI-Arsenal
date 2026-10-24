---
id: axonhub
name: "AxonHub"
type: tool
job: [deployment]
description: "Go-based LLM gateway translating provider schemas, failing over automatically and metering spend per key"
url: "https://github.com/looplj/axonhub"
cost_model: open-source
pricing_detail: "Apache-2.0 self-hosted; you pay the operation cost and the upstream inference bill it routes"
tags: [routing, observability, monitoring, llm]
maturity: beta
stack: [go]
free_tier: true
free_tier_limits: "Source is unlimited; throughput is bounded by the instances you run"
self_hostable: true
open_source: true
source_url: "https://github.com/looplj/axonhub"
docs_url: null
github_url: "https://github.com/looplj/axonhub"
alternatives: []
integrates_with: []
added_date: "2026-10-11"
last_reviewed: "2026-10-11"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "A small Go proxy that covers the three gateway jobs that matter — schema translation, failover and per-key budgets — without the operational weight of a Python-sidecar design"
status: active
phase: serving-and-deployment
audience: [production, prototype]
best_when:
  - "Applications are already written against one provider's schema and must be able to use several without an SDK refactor"
  - "Spend and rate limits need enforcement at the boundary, per key or per team, before requests reach a provider"
avoid_when:
  - "A managed gateway's compliance posture is the deciding factor and you cannot operate the proxy yourself"
  - "The requirement is enterprise identity federation or policy engines, which a routing proxy does not provide"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Features summarised from the repository and documentation; failover and streaming behaviour under load were not benchmarked here."
buzz_sources: []
---

## Overview

AxonHub is a reverse proxy for model APIs. A client speaks one protocol — most often the OpenAI chat-completions shape — and the gateway translates to and from whichever upstream provider a request is routed to, including Anthropic, Gemini and DeepSeek endpoints, plus self-hosted servers.

It earns its place less on routing and more on the things every application ends up needing at the boundary: what happens when a provider returns 429, how token spend is attributed per tenant, and whether streaming survives the hop intact. Those are cross-cutting concerns that are painful to reimplement in each service and cheap to centralise.

Written in Go, deployed as a binary or container, and intended to be inline on the production path.

## Why It's in the Arsenal

The Arsenal treats provider coupling as an architectural risk. An application that imports three SDKs and branches on provider name in business logic is expensive to change; one that speaks a single protocol to a gateway is not.

AxonHub is catalogued as the self-hosted version of that boundary. It also represents a class of component that is easy to underestimate: a proxy on the hot path must be measured for latency and must fail open or closed deliberately.

## Key Features

- Protocol translation between OpenAI, Anthropic and Gemini request and response shapes, including tool-call and streaming frames.
- Automatic failover on 429 and 5xx responses to configured secondary providers.
- Per-key budgets and rate limits enforced before dispatch.
- Token, latency and time-to-first-token accounting exported to standard observability backends.
- Native server-sent-events passthrough so incremental output is preserved through the hop.

## Architecture / How It Works

A request arrives with a credential identifying its tenant, is validated against that tenant's quota, then rewritten into the upstream provider's schema. The response — buffered or streamed — is translated back into the client's expected shape, with usage recorded as tokens and latency. Failover is a policy at dispatch: when the primary returns a retryable status, the same logical request is reissued against the next configured target.

Because translation happens at the boundary, the client's tool-calling syntax stays constant while the underlying provider changes. Because metering happens there too, cost attribution does not depend on each application reporting its own usage.

## Getting Started

Run it in front of one provider first and diff responses against a direct call — especially tool-call payloads and streamed deltas, which is where translation bugs appear. Add a second provider and force a 429 to observe failover behaviour and how much output the client actually received before the switch.

## Use Cases

1. Multi-provider redundancy for a product whose availability target exceeds any single provider's.
2. Cost attribution across teams, where each key has a budget and spend is reported without application changes.
3. Migration off a provider: send the same traffic to the new endpoint, compare outputs and latency, then flip.
4. A single internal endpoint for self-hosted models and hosted APIs, so application config does not list providers.

## Strengths

- Single-protocol clients survive provider switches, which removes SDK churn from application code.
- Failover at the boundary covers outages that per-application retry logic usually implements inconsistently.
- Budget enforcement before dispatch stops runaway spend rather than reporting it afterwards.
- Go's concurrency model keeps proxy overhead low under many parallel streams.

## Limitations / When NOT to Use

- A self-hosted proxy is another availability dependency; misconfiguration or a bad deploy takes down every model call.
- Provider APIs drift, particularly around tool calls and multimodal input, so the gateway must be upgraded regularly to stay compatible.
- Global rate limits across instances require a shared state store, which adds infrastructure.
- Managed gateways may carry compliance certifications this project does not.

## Integration Patterns

Run at least two instances behind a load balancer with health checks, and treat the gateway as tier-zero infrastructure in your on-call rotation. Define failover policy per route explicitly — retrying a non-idempotent long generation can duplicate spend — and export usage metrics into the same dashboards as application latency so a provider slowdown is visible as one graph. Keep provider keys in the gateway, not in services.

## Resources

- [GitHub — looplj/axonhub](https://github.com/looplj/axonhub)

## Buzz & Reception

Interest comes from repository activity rather than from published production case studies; the beta label reflects that the schema-translation surface is still moving. The measurement that decides adoption is overhead per streamed request on your own traffic.
