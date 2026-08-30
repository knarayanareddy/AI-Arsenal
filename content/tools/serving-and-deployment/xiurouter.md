---
id: xiurouter
name: XiuRouter
type: tool
job: [production-serving, prototyping]
description: "Hosted multi-model API service with OpenAI, Anthropic, and Gemini protocol routes plus scoped keys and usage records"
url: "https://router.xiu.ai/"
cost_model: usage-based
pricing_detail: "Usage-based; prices vary by model and service group and are published on the live pricing page"
tags: [llm, routing, inference]
maturity: production
stack: [polyglot]
free_tier: false
self_hostable: false
open_source: false
source_url: null
docs_url: "https://docs.xiu.ai/router/"
github_url: null
alternatives: [openrouter, litellm, portkey]
integrates_with: []
added_date: "2026-08-28"
last_reviewed: "2026-08-28"
added_by: MuduiClaw
reviewed_by: null
verdict: watching
verdict_rationale: "The live service is usable, but independent usage evidence and longer-term reliability history are not yet represented here"
status: active
phase: serving-and-deployment
audience: [prototype, production]
best_when:
  - "You need one hosted service for clients that use OpenAI Chat Completions, OpenAI Responses, Anthropic Messages, or Gemini GenerateContent"
  - "You want API keys limited by model, budget, and expiration, with request-level usage and cost records"
avoid_when:
  - "You require a self-hosted or open-source gateway"
  - "You require every listed model to support every protocol without validating the target combination"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Operator-submitted entry. Public endpoints and official documentation were checked on 2026-08-28; independent production usage has not been reviewed."
buzz_sources: []
---

## Overview

XiuRouter is a hosted model API service operated by XiuLab Inc. It exposes
OpenAI Chat Completions, OpenAI Responses, Anthropic Messages, and Gemini
GenerateContent routes for applications, agents, and developer tools.

## Why It's in the Arsenal

XiuRouter belongs in the serving and deployment layer because it gives
developers protocol-specific routes to multiple model providers without
requiring them to run a gateway. It is especially relevant when an application
mixes OpenAI-style clients with software that expects Anthropic or Gemini
request formats.

## Key Features

- OpenAI Chat Completions and Responses routes
- Anthropic Messages and Gemini GenerateContent routes
- API keys scoped by model, budget, and expiration
- Public model and pricing catalog, request playground, and usage records

## Architecture / How It Works

Clients use the base URL that matches their protocol, authenticate with a
XiuRouter API key, and explicitly select the target model and service group.
The service forwards the request through that selected route and records model,
token, status, latency, and cost details for later review. It does not
automatically switch providers when the selected route fails. Model
availability, pricing, and protocol support can change, so the target model and
route should be verified with a small request before a production rollout.

## Getting Started

```bash
curl https://router-api.xiu.ai/v1/models \
  -H "Authorization: Bearer $XIUROUTER_API_KEY"
```

Use `https://router-api.xiu.ai/v1` for OpenAI-style clients. Anthropic Messages
and Gemini GenerateContent clients use the API root and append their native
request paths; follow the current documentation for each client.

## Use Cases

1. **Multi-protocol agents**: connect coding agents and developer tools that use
   different model API formats through one hosted service.
2. **Controlled application access**: issue keys with model, budget, and expiry
   limits, then audit requests in usage records.
3. **Protocol migration testing**: compare an existing Chat Completions client
   with a Responses, Messages, or GenerateContent integration.

## Strengths

- Supports four commonly used API routes instead of exposing only an
  OpenAI-compatible chat endpoint
- Combines scoped credentials, live pricing, request testing, and usage records
  in one console

## Limitations / When NOT to Use

- It is a hosted, closed-source service and cannot be self-hosted
- It does not provide automatic provider fallback; clients that require
  failover must implement and validate that behavior themselves
- A listed model or route does not guarantee that every model and service group
  supports every protocol
- Prices and availability are dynamic and should be read from the live catalog
  rather than copied into long-lived configuration

## Integration Patterns

- Start with a scoped key and a small request against the exact model and
  protocol combination the client will use.
- Preserve provider-specific request behavior instead of assuming that changing
  only the base URL makes all protocol features interchangeable.
- Compare with `openrouter`, `litellm`, and `portkey` when choosing between a
  hosted model service, a self-hosted proxy, and a broader gateway platform.

## Resources

- [Official Site](https://router.xiu.ai/)
- [Documentation](https://docs.xiu.ai/router/)
- [Pricing](https://router.xiu.ai/en/pricing)

## Buzz & Reception

Independent production reports have not yet been added to this entry.

---
*Last reviewed: 2026-08-28 by @MuduiClaw*
