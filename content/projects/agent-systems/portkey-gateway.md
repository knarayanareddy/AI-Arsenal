---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "Portkey-AI"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: portkey-gateway
name: "Portkey AI Gateway"
artifact_type: platform
category: observability
subcategory: platforms
description: "Open-source AI gateway routing to 1,600+ language, vision, audio and image models with retries, fallbacks, guardrails and load balancing"
github_url: "https://github.com/Portkey-AI/gateway"
license: MIT
primary_language: TypeScript
tags: [routing, guardrails]
maturity: beta
cost_model: freemium
github_stars: 13098
last_commit: "2026-05-25"
docs_url: "https://portkey.ai/docs"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A unified LLM gateway that routes across many providers with reliability and guardrail features."
best_for: ["You are integrating a first model provider in minutes and you want a single base URL with a provider-neutral request shape, because the quickstart is a single npx command and a two-minute integration claim.", "You need automatic retries, fallbacks and conditional routing so a provider outage or rate limit does not surface as an application error.", "You want guardrails in the request path, because the project ships a guardrail catalogue alongside routing and an MCP gateway for tool servers."]
avoid_if: ["You need the current enterprise feature set in the open-source build, because the README says the core enterprise gateway is merging into open source with a 2.0 release and points at a pre-release branch for that.", "You want an open-source license for a commercial product without conditions, because the repository is MIT but the hosted gateway and enterprise features are separately commercial.", "You are serving a single provider on a single workload where a direct SDK call would do, because a gateway is a hop and a dependency you now have to operate."]
enrichment_notes: "Repository, MIT license, and 2026-05-25 activity verified via the GitHub API on 2026-07-12. Adds a hop in the request path; account for its latency and availability."
---

## Overview

The Portkey AI Gateway is an open-source, enterprise-ready routing layer for language, vision, audio and image models, described as reaching 1,600+ models through one API with an integration path of under two minutes. Its functional set covers automatic retries and fallbacks to prevent downtime, load balancing and conditional routing to scale applications, guardrails to protect deployments, multi-modal support beyond text, agentic workflow integrations, and an MCP Gateway that manages MCP servers with enterprise auth and observability. The quickstart runs the gateway locally with npx, after which the API is served on a local port with a separate console surface. A pre-release 2.0 branch is where the previously closed-source enterprise gateway core is being merged into the open repository.

## Why it's in the Arsenal

The decision it removes is how many places your application has to know about model providers. Without a gateway, every provider difference in request shape, error taxonomy, retry semantics and streaming behaviour is code in your service, and adding a fallback provider is an afternoon of new branches. A gateway makes those policies declarative: retries, fallbacks, load balancing and conditional routing become configuration, and a provider outage becomes a routing event rather than a page. The guardrail catalogue is the second decision, since input and output checks are otherwise a separate service in the request path.

## Architecture

The gateway is a TypeScript service that terminates a single OpenAI-compatible API on one port and fans requests out to the configured provider based on routing rules. Around the proxy sit the policy layers: automatic retries absorb transient provider errors, fallbacks move traffic to a secondary model when the primary fails, load balancing distributes across endpoints, and conditional routing selects a model on request attributes. Guardrails evaluate requests and responses inline, and the MCP Gateway component proxies tool servers with auth and observability attached, which is what lets a tool call inherit the same routing and logging as a model call. A console is served alongside the API for inspecting traffic and configuration. The 2.0 architecture moves the enterprise core, including its proxy and caching layers, into the open repository on a pre-release branch, so the current main branch and the 2.0 branch are not the same product.

## Ecosystem Position

The gateway space has several credible occupants and the README's own framing is the axis: Portkey ships 1,600+ models with a guardrail catalogue, LiteLLM's proxy offers a similarly broad routing layer, and the TensorZero entry in this same batch leads with a single self-hosted unified API and sub-millisecond overhead. It competes most directly with those proxies and overlaps with the agent frameworks in content/projects/framework only where they route model calls. The MCP Gateway component is the overlap that matters with the MCP-related entries, since a gateway that terminates tool traffic sits between your agent and its tool servers. Compared with calling a provider SDK directly, a gateway costs a network hop and a service to operate, which is the trade the routing policies are paying for.

## Getting Started

Run the gateway from npm and point any OpenAI-compatible client at the local endpoint:

```bash
# needs Node.js and npm
npx @portkey-ai/gateway
```

The API then answers on `http://localhost:8787/v1` and a console is available under the console path on the same host. Add a provider key and a routing rule through the console or config, and the 2.0 pre-release branch is where the enterprise core currently lives if you need it.

## Key Use Cases

1. Provider failover: configure a fallback chain so a primary model rate-limits or goes down and requests continue against a secondary with retries in between.
2. Multi-provider rollout: route by model or by request attribute so a new provider gets a percentage of traffic while the old one drains.
3. Governed MCP tool access: front your MCP servers with the gateway so tool calls inherit auth, logging and the same observability as model calls.

## Strengths

- Very broad model catalogue behind one provider-neutral API, so integration really is close to a two-minute job for a first provider.
- Retries, fallbacks, load balancing and conditional routing are configuration, which moves reliability policy out of application code.
- Guardrails live in the request path rather than beside it, so a policy check is not another service to wire up.
- MIT-licensed core with a console for inspecting traffic, and a documented path for the enterprise gateway to merge into open source.

## Limitations

The repository is mid-merge: the README is explicit that the core enterprise gateway is shipping as a pre-release 2.0 branch, so the open main branch and the branch most users are pointed at are not the same feature set, and pinning to main may mean missing capabilities you expect from the marketing. Hosted gateway and enterprise features are commercial, so the open-source artifact is the routing core rather than the managed product. Routing through a gateway adds latency and another failure domain, and provider-specific features that do not map onto the unified API shape are necessarily flattened or lost. Model catalogue breadth is a maintenance liability: provider APIs change, and the catalogue is only as good as the team's ability to track them.

## Relation to the Arsenal

This is the routing entry for content/projects/agent-systems and the component that sits in front of whichever inference backend you choose from content/projects/inference-engines. Compare it directly with the tensorzero entry in this batch, since both solve provider routing and differ in emphasis: catalogue breadth plus guardrails here, a single self-hosted unified API plus a data-driven optimization loop there. Its MCP Gateway overlaps with the MCP-protocol entries in the same phase, which you would otherwise run separately. The observability and guardrail surface also meets the eval and tracing entries in content/projects/evaluation-and-observability, which is where you would measure whether the routing policies helped.

## Resources

- [GitHub — Portkey-AI/gateway](https://github.com/Portkey-AI/gateway)
- [Documentation — portkey.wiki](https://portkey.ai/docs)
- [AI Gateway product page](https://portkey.ai/features/ai-gateway)
