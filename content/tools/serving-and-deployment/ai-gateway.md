---
id: ai-gateway
name: Envoy AI Gateway
type: tool
job: [production-serving, deployment]
description: An Envoy Gateway extension for routing and governing traffic to generative AI services
url: "https://aigateway.envoyproxy.io"
cost_model: open-source
pricing_detail: Open source (Apache-2.0); infrastructure, provider, and cluster costs are separate
tags: [inference, routing, cloud, kubernetes, self-hosted]
maturity: beta
stack: [go]
free_tier: true
free_tier_limits: The gateway is open source; managed providers and model endpoints have their own charges
self_hostable: true
open_source: true
source_url: "https://github.com/envoyproxy/ai-gateway"
docs_url: "https://aigateway.envoyproxy.io/docs/"
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
best_when:
  - You need a Kubernetes-native policy boundary for authentication, top-level routing, and rate limiting across multiple model providers
  - You operate self-hosted inference clusters and want a second gateway tier to select or govern model endpoints
  - Your platform team already understands Envoy Gateway and prefers declarative infrastructure over a Python SDK
avoid_when:
  - You need a single-process local proxy with minimal dependencies; an Envoy Gateway deployment is a larger operational commitment
  - Your workload depends on provider-specific features that are not represented consistently through the gateway abstraction
  - You cannot operate Kubernetes, Envoy Gateway, and the supporting control-plane resources
version_tracked: null
enrichment_status: draft
enrichment_notes: "README and official documentation reviewed 2026-07-19; two-tier gateway and Envoy Gateway dependency are load-bearing placement details."
---

## Overview

Envoy AI Gateway extends Envoy Gateway for generative-AI traffic. Its reference architecture separates a tier-one gateway, which handles authentication, global routing, and rate limits, from a tier-two gateway in front of self-hosted model-serving clusters. The project exposes provider integrations while keeping the traffic boundary in the cloud-native gateway layer.

## Why It's in the Arsenal

AI gateways often collapse provider translation, authentication, routing, and inference operations into one application. Envoy AI Gateway is worth tracking because it brings those concerns into the Envoy Gateway/Kubernetes ecosystem, where platform teams already manage policy and traffic infrastructure. It is a stronger fit for an infrastructure-owned boundary than for an application developer looking for a quick OpenAI-compatible proxy.

## Key Features

- Tier-one and tier-two gateway pattern for hosted providers and self-hosted inference
- Authentication, global routing, and rate-limiting controls at the gateway boundary
- Provider integrations including OpenAI, Azure OpenAI, Gemini, Vertex AI, Bedrock, Mistral, Cohere, Groq, and others
- Endpoint-picker support for fine-grained selection within self-hosted model clusters

## Architecture / How It Works

The tier-one gateway is the central application entry point. It applies cross-provider policy and routes requests toward provider services or a tier-two gateway. The tier-two gateway sits closer to a self-hosted serving cluster and can select among model endpoints. This split preserves a global policy layer while allowing model-serving concerns to remain local to a cluster, but it also creates two deployment surfaces and two places to reason about authentication and observability.

## Getting Started

The project is designed to run with Envoy Gateway and Kubernetes rather than as a standalone binary:

```bash
git clone https://github.com/envoyproxy/ai-gateway.git
cd ai-gateway
kubectl version --client
```

Follow the official [getting-started guide](https://aigateway.envoyproxy.io/docs/getting-started/) to install Envoy Gateway, apply the AI Gateway CRDs/manifests, configure provider credentials as Kubernetes secrets, and send a request through the resulting gateway. Keep provider keys in cluster secrets rather than embedding them in manifests or shell history.

## Use Cases

1. **Scenario**: centralize authentication and rate limits for applications calling several hosted model providers
2. **Scenario**: expose a self-hosted vLLM or equivalent cluster behind a tier-two gateway while retaining a platform-owned tier-one boundary
3. **Scenario where this is NOT the right fit**: route a local developer's requests through a lightweight desktop proxy — the Kubernetes control plane is unnecessary overhead

## Strengths

- Aligns AI traffic policy with established Envoy Gateway and Kubernetes operations
- Separates global provider routing from local self-hosted endpoint selection
- Apache-2.0 project in a mature cloud-native ecosystem rather than a provider-specific SDK

## Limitations / When NOT to Use

- The two-tier model increases installation, upgrade, and troubleshooting surface compared with a single gateway process
- Provider APIs and feature parity continue to evolve; a common route does not erase provider-specific semantics
- The project does not remove the need to secure provider credentials, enforce payload policy, or instrument downstream model servers
- Kubernetes and Envoy expertise are prerequisites for a production deployment

## Integration Patterns

- Place tier one behind the platform's existing ingress and identity controls; keep provider credentials in Kubernetes secrets.
- Put tier two close to the serving cluster and test endpoint selection under realistic latency and capacity conditions.
- Compare with [MCP Context Forge](mcp-context-forge.md) when protocol federation and registry governance matter more than Envoy-native traffic policy.

## Resources

- [Official documentation](https://aigateway.envoyproxy.io/docs/)
- [Getting started](https://aigateway.envoyproxy.io/docs/getting-started/)
- [GitHub](https://github.com/envoyproxy/ai-gateway)
- [Envoy Gateway](https://github.com/envoyproxy/gateway)

## Buzz & Reception

1.8k GitHub stars verified via the repository API on 2026-07-19; Apache-2.0 and actively developed under the Envoy Proxy ecosystem. Adoption value is highest for teams with existing Kubernetes gateway operations.

---
*Last reviewed: 2026-07-19 by @maintainer*
