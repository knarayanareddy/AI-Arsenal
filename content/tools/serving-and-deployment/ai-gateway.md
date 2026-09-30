---
id: ai-gateway
name: Envoy AI Gateway
type: tool
job: [production-serving, deployment]
description: "Envoy Gateway-based control plane giving every model and tool one OpenAI-compatible endpoint, with credentials, routing, quotas and failover held centrally"
url: "https://aigateway.envoyproxy.io"
cost_model: open-source
pricing_detail: Open source (Apache-2.0); infrastructure, provider, and cluster costs are separate
tags: [kubernetes, agents]
maturity: production
stack: [go]
free_tier: true
free_tier_limits: The gateway is open source; managed providers and model endpoints have their own charges
self_hostable: true
open_source: true
source_url: "https://github.com/envoyproxy/ai-gateway"
docs_url: "https://theagentrouter.ai/docs/getting-started/"
github_url: "https://github.com/envoyproxy/ai-gateway"
alternatives: [litellm]
integrates_with: []
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
reviewed_by: maintainer
verdict: recommended
verdict_rationale: A credible cloud-native gateway boundary for teams that already operate Envoy Gateway and Kubernetes
status: active
phase: serving-and-deployment
audience: [production, prototype]
best_when: ["You already run Kubernetes with Envoy Gateway and want to front several model providers behind one OpenAI-compatible address so application teams stop handling provider credentials.", "You need to attribute usage to teams and enforce quotas centrally, which is a control-plane problem the routing and rate-limit resources solve without touching application code.", "You are migrating off the Envoy AI Gateway name and need to know what breaks, because the project documents exactly which identifiers were preserved and which URLs redirect."]
avoid_when: ["You are not running Kubernetes with Envoy Gateway, because the data plane is Envoy and the whole design assumes that gateway, so this is not a library you call from a process.", "You want a small single-binary router for a laptop, because a standalone CLI mode exists but the project's centre of gravity is the Kubernetes deployment with custom resources.", "You need deep provider-specific semantics beyond the OpenAI shape, because compatibility is expressed through that one API surface, so providers that diverge from it surface as rough edges rather than handled cases."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "README and official documentation reviewed 2026-07-19; two-tier gateway and Envoy Gateway dependency are load-bearing placement details."
---

## Overview

Agent Router, formerly Envoy AI Gateway, is an Agentic AI Foundation project built on Envoy Gateway. It presents a single OpenAI-compatible endpoint in front of hosted providers, self-hosted inference clusters and MCP servers, and the framing in the README is that the router controls while Envoy carries. Configuration is expressed as Kubernetes custom resources: an AIGatewayRoute describes request matching, an AIServiceBackend describes an upstream, and a BackendSecurityPolicy attaches credentials, all under the aigateway.envoyproxy.io API group. Routing is the part that is genuinely LLM-aware rather than HTTP-aware, since requests for one logical model can be distributed across replicas that differ in cache state. The rename was handled conservatively: the API group, the custom resource names, the aigw CLI, the envoy-ai-gateway-system namespace, the container images, the Helm charts and the Go module path are all unchanged, and old repository and website links redirect.

## Why It's in the Arsenal

The decision is who holds the credentials and the limits. Left in application code, every service that calls a model holds a provider key, every team implements its own retry and failover, and usage attribution is reconstructed from billing reports after the fact. Moving that to a gateway means one place to rotate a key, one place to set a quota, and one place to see which service spent what. The cost is infrastructure: this is a Kubernetes control plane with a data plane, not a library, and you are committing to Envoy as the proxy. The documented two-tier pattern exists because global authentication and routing genuinely want to be separate from per-cluster model access, which is a real design constraint rather than bureaucracy.

## Key Features

- Credentials, routing and quotas live in version-controlled Kubernetes resources, so a policy change is a reviewable diff rather than a config push.
- OpenAI compatibility means existing client libraries work unchanged, so adoption does not require rewriting call sites.
- Built on Envoy Gateway rather than a bespoke proxy, inheriting a mature data plane with its own connection handling and observability.
- The rename preserved CRDs, CLI, namespace, images, charts and module path, so the migration is genuinely a no-op for existing deployments.

## Architecture / How It Works

The control plane is the custom resources; the data plane is Envoy Gateway running the translation from them. A route resource binds a listener and path to one or more backends, and a backend security policy carries the credential reference for a given upstream, which is how a single route can span providers with different authentication mechanisms. Because Envoy performs the forwarding, the gateway inherits its connection handling, retry behaviour and observability rather than reimplementing them. The aigw CLI supports a standalone run that exposes a local OpenAI-compatible endpoint on port 1975 with provider auto-configuration, which is the fastest way to evaluate provider translation without deploying anything; the CLI is documented as experimental and under active development. Provider coverage spans the major hosted services across the OpenAI, Google, AWS and Chinese ecosystems. Tool traffic over MCP is handled alongside model traffic, so an agent's model calls and tool calls pass through the same policy surface. On Kubernetes, the deployment follows the standard install pattern with the operator's namespace unchanged across the rename.

## Getting Started

Run it standalone on a laptop with one command and point any OpenAI-compatible client at the local port:

```bash
OPENAI_API_KEY=sk-your-key aigw run
```

Then send requests to http://localhost:1975/v1. The CLI guide covers installation and provider auto-configuration; the Getting Started guide covers deploying on Kubernetes with Envoy Gateway and creating the gateway resources.

## Use Cases

1. Central credential custody: give teams one internal endpoint and a BackendSecurityPolicy each, so no application holds a provider key and rotation is a resource edit.
2. Quota and attribution: apply global rate limits at the tier-one gateway and read per-team usage without instrumenting every service.
3. Failover across providers: route one logical model name to several backends so an outage on one is a routing decision rather than an application change.

## Strengths

It competes with LiteLLM's proxy and with Portkey in the AI gateway category, and the differentiator is that this is a Kubernetes-native control plane on an established data plane rather than a self-contained proxy process - which wins when your platform team already runs Envoy Gateway and loses if you do not. It also overlaps with content/projects/inference-engines entries such as AIBrix, which ships its own LLM gateway plugins for routing inside a Kubernetes inference cluster; the distinction is that one is the enterprise control plane for all AI traffic while the other is the serving control plane for one engine's replicas, so they complement rather than substitute. Compared with content/tools/serving-and-deployment siblings, this owns credential and quota policy rather than model processes. The model backends it fronts are the serving entries in content/projects/inference-engines.

## Limitations / When NOT to Use

The binding constraint is Envoy Gateway: if you do not run it, adopting this means adopting it, and there is no path that avoids that dependency. The compatibility surface is the OpenAI shape, so provider-specific features outside it - vendor tool-calling extensions, non-standard parameters, provider-specific streaming semantics - either do not work or degrade quietly, which is a real source of integration bugs. The aigw CLI is documented as experimental, so the low-friction evaluation path is also the least stable one. Running a gateway in the path of every model call adds a hop and a failure domain, and credential management through a policy resource means an access-control bug there is a fleet-wide exposure rather than a single-service one. Finally, this controls traffic; it does not serve models, so you still need the inference layer behind it.

## Integration Patterns

This is the traffic-policy entry in content/tools/serving-and-deployment, sitting above the inference engines rather than beside them. Its Kubernetes-side sibling is AIBrix in content/projects/inference-engines, which routes inside a serving cluster where this one routes across your whole AI estate - the two are frequently deployed together. The model backends it fronts are the engines in content/projects/inference-engines, and if the question is tracing rather than routing, content/projects/evaluation-and-observability holds that.

## Resources

- [GitHub — theagentrouter/agent-router](https://github.com/theagentrouter/agent-router)
- [Documentation and quickstart](https://theagentrouter.ai/docs/getting-started/)
- [CLI guide for the standalone aigw mode](https://theagentrouter.ai/docs/cli/)

## Buzz & Reception

Moves provider keys, rate limits and failover out of application code and into Kubernetes custom resources, so one client library points at whichever backend is currently healthy.
