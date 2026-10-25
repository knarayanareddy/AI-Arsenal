---
id: helicone
name: Helicone
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: "Apache-2.0 AI gateway plus observability: one base-URL change covers 100+ providers with routing, fallbacks, cost tracking and sessions"
github_url: "https://github.com/Helicone/helicone"
license: Apache-2.0
primary_language: TypeScript
org_or_maintainer: null
tags: [observability, monitoring, cloud, self-hosted]
maturity: production
cost_model: freemium
github_stars: 6238
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-10-24"
docs_url: "https://docs.helicone.ai/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: proxy
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - "An LLM gateway that doubles as the observability layer: the same base-URL redirect that routes traffic across providers is what produces the traces, costs and sessions"
best_for:
  - You want traces, costs and sessions without instrumenting the application, and are willing to send inference through a gateway to get them — one baseURL and one API key replaces per-provider SDK setup
  - You want provider routing and automatic fallbacks in the same component that records the calls, rather than a separate gateway plus a separate observability tool
  - You need the option to self-host the whole stack from Apache-2.0 sources, with a managed cloud and a 10k-request free tier as the alternative
avoid_if:
  - Your inference path must not include a third-party hop, whether for data-residency, contractual latency budget or compliance reasons — the async logging SDK exists, but it is a thinner product than the gateway
  - You need rigorous offline evaluation as the primary capability, since datasets, evaluators and experiment comparison are shallower here than in LangSmith or Langfuse
  - Your team has no appetite for operating ClickHouse, Postgres, MinIO and a worker tier, which is what the self-hosted docker-compose stack requires
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, langsmith-platform, phoenix, opik]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-25: GitHub API 6238 stars, 172 open issues, last push 2026-10-24. Body rewritten from the README, which now positions the proxy as an AI gateway (100+ providers, routing, fallbacks, sessions, 10k free requests/month) and documents the five-service self-hosted stack."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Helicone is a Y Combinator-backed (W23), Apache-2.0 platform whose integration surface is a URL. You point your OpenAI-compatible client at `https://ai-gateway.helicone.ai` with a Helicone key, and the gateway does two jobs at once: it routes the request to one of 100+ providers (OpenAI, Anthropic, Gemini, Bedrock, Groq, Together, Fireworks, Ollama and the rest) with automatic fallbacks, and it records the request, the response, the token cost and the timing as a trace. Nothing in the application imports a Helicone library to get the observability; the async logging SDK exists for teams that cannot add a hop, but the gateway is the product the documentation leads with.

That repositioning is the main thing to understand about the entry: it was catalogued as a proxy for logs and costs, and it now sells itself as an AI gateway whose observability is the differentiator. For a buyer the two readings differ — you are choosing an inference path, not only a dashboard.

## Why it's in the Arsenal

The other observability entries in this phase ask you to instrument: LangSmith and Langfuse want SDK calls or framework callbacks around your model invocations before they can show you anything. Helicone's argument is that the cheapest possible integration is the one you already have — if your client speaks the OpenAI API, changing the base URL is a one-line diff that works for every provider, and it is also the line that buys you routing and fallbacks.

That combination is worth cataloguing separately because it changes the failure mode: with an SDK you add code that can be wrong, with a gateway you add a hop that can be slow or unavailable. Teams should pick deliberately between those two risks rather than treating the tools as interchangeable.

## Architecture

The self-hosted stack is five services, documented in the repository: a Next.js web front end, a Cloudflare Worker that proxies and logs requests, a "Jawn" Express service that collects logs, Supabase as the application database and auth layer, ClickHouse for the analytics queries, and MinIO for object storage of raw request payloads. The docker-compose file brings the set up together; a Helm chart is available for enterprise deployments, and a manual deployment is explicitly not recommended.

On the hosted side the same components are operated for you, and the gateway adds provider abstraction on top: one key, model names resolved to whichever provider you have configured, with routing and fallback policies applied per request. Sessions group traces across a conversation or an agent run, which is what makes an agent's multi-step behaviour legible rather than a list of isolated calls.

## Ecosystem Position

Against LangSmith and Langfuse the split is instrumentation model plus depth: both offer richer dataset and evaluation tooling, and both ask the application to emit spans. Against Portkey, which is also a gateway, Helicone bundles the observability in rather than leaving it to a separate tool — that is the seam where the two overlap most directly. Phoenix and Opik sit closer to open-source evaluation and experimentation.

The practical arrangement in many stacks is Helicone or Portkey at the gateway, with Langfuse for evaluation and prompt versioning; picking Helicone's gateway means accepting that its evaluation features are adequate rather than best in class.

## Getting Started

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://ai-gateway.helicone.ai",
  apiKey: process.env.HELICONE_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",            // or any model from helicone.ai/models
  messages: [{ role: "user", content: "Hello!" }],
});
```

Self-hosting is a compose file rather than a tutorial:

```bash
git clone https://github.com/Helicone/helicone.git
cd docker
cp .env.example .env
./helicone-compose.sh helicone up
```

The free tier is 10,000 requests a month without a card, which is enough to see the traces for a small application before deciding whether the hop is acceptable.

## Key Use Cases

1. **Cost attribution across providers without code changes**: one gateway that normalises pricing across OpenAI, Anthropic, Gemini and the open-weight hosts is how a team finds out which feature is burning the budget, and the answer comes from production traffic rather than from an estimate.
2. **Provider fallbacks as a reliability measure**: the same base-URL change lets a request fail over from a primary provider to a secondary one, so an outage does not become an outage in your product.
3. **Agent and chatbot session debugging**: grouping traces into sessions turns a multi-turn agent into a readable transcript with per-step latency and tokens, which is the first tool you reach for when an agent behaves differently in production than in a test.
4. **Prompt iteration against production data**: the playground and prompt versioning let a prompt be edited and redeployed through the gateway without a code release, which is useful precisely because the data that motivated the edit is in the same UI.
5. **A self-hosted observability stack for regulated teams**: with the compose stack and MinIO on your own infrastructure, request payloads never leave your network, at the cost of operating five services.

## Strengths

- The integration cost is genuinely one line, and it is the same line for every provider — no per-SDK instrumentation, no callback wiring per framework, and no gap where a code path forgot to emit spans.
- Gateway and observability in one component means routing decisions and their consequences are recorded by the same system: you can see the fallback happen, not just that it did.
- Apache-2.0 with a working docker-compose stack and a documented five-service architecture, so self-hosting is a supported path rather than a build-it-yourself exercise with a paid Helm chart as the real answer.
- Cost tracking across providers is a first-class feature, including a documented method for how costs are computed, which matters because provider pricing pages and billing lines disagree often enough to need a reference.
- Cheap to trial: 10k requests a month free, no card, and a demo; the risk of evaluating it is an afternoon rather than a procurement.

## Limitations

- **The hop is the trade.** Every request goes through Helicone's infrastructure on the hosted product, which adds a network leg to your critical path and puts a third party inside your data flow. The async logging SDK removes the hop but is a thinner product, and the two paths do not have identical features.
- **Evaluation is not the strong suit.** Datasets, evaluators and experiment comparison are present but shallow compared with Langfuse or LangSmith; teams that want observability and rigorous evals usually end up running two tools.
- **Self-hosting is real work.** Five services including ClickHouse and MinIO, a compose script as the supported path, and Helm gated behind an enterprise contact — the open-source licence is not the same as a turnkey self-hosted deployment.
- **A crowded category with fast-moving scope.** 172 open issues at review time, a product that has shifted from "proxy for logs" to "AI gateway" within a year, and competitors (Portkey, Langfuse, Braintrust) converging on the same feature set. Interfaces and pricing are worth re-checking at each upgrade, not assumed stable.
- **Cost figures are only as good as the provider mapping.** Helicone computes spend from its own table of provider prices; a provider price change, a cached-token discount or a batch tier that it does not model shows up as a wrong number in a dashboard people make decisions from.
- **Governance claims need the contract, not the README.** SOC 2 and GDPR compliance are asserted on the hosted product, so for regulated work the audit report and the data-processing terms are the artifacts to review, and self-hosting is the alternative to negotiating them.

## Relation to the Arsenal

Read it beside `langfuse` and `langsmith-platform` (instrumentation-based observability with deeper evaluation), `phoenix` and `opik` (open-source evaluation and experimentation) and the gateway entries in the serving phase. The dividing question is where the hop goes: if adding a network leg to inference is acceptable, Helicone buys routing and observability for a one-line change; if it is not, an SDK-based tracer is the right shape and this entry is a comparison point rather than a candidate.

## Resources

- [GitHub](https://github.com/Helicone/helicone)
- [Documentation](https://docs.helicone.ai/)
- [Gateway overview](https://docs.helicone.ai/gateway/overview)
- [Self-hosting with Docker](https://docs.helicone.ai/getting-started/self-deploy-docker)

