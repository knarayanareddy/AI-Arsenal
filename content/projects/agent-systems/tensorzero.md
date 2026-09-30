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
org_or_maintainer: "tensorzero"
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
id: tensorzero
name: "TensorZero"
artifact_type: platform
category: observability
subcategory: platforms
description: "Rust LLMOps platform unifying a unified LLM gateway, observability, evaluation, optimization and experimentation in one deployment"
github_url: "https://github.com/tensorzero/tensorzero"
license: Apache-2.0
primary_language: Rust
tags: [observability, embeddings]
maturity: beta
cost_model: self-hostable
github_stars: 11715
last_commit: "2026-06-11"
docs_url: "https://www.tensorzero.com/docs/"
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
  - "An LLMOps platform that turns gateway traffic and feedback into evaluation and optimization of prompts and models."
best_for: ["You want routing and performance telemetry in the same system as the data you optimize on, because the gateway records every call and the eval and A/B tooling reads that data.", "You are self-hosting a high-throughput gateway and the added latency matters, because the project publishes a sub-millisecond p99 overhead claim at 10k+ QPS for its Rust proxy.", "You want prompt templates and JSON schemas enforced as the interface between your application and models, which is a first-class gateway feature here rather than an application concern."]
avoid_if: ["You need the current codebase in this repository, because the GitHub API reports the repository as archived and the last commit is from June 2026.", "You want a hosted managed gateway with no operations, because this is a self-hosted platform you deploy and run yourself.", "You only need a proxy and nothing else, because the platform's scope spans gateway, observability, evaluation, optimization and experimentation, which is more surface than a simple proxy."]
enrichment_notes: "Repository, Apache-2.0 license, and 2026-06-11 activity verified via the GitHub API on 2026-07-12. Optimization value depends on collecting quality feedback signals."
---

## Overview

TensorZero is an open-source LLMOps platform that unifies an LLM gateway, observability, evaluation, optimization and experimentation. The gateway exposes a single unified API to every major provider, hosted or self-hosted, and supports tool use, structured JSON output, batch inference, embeddings, multimodal image and file input, and inference caching. It also provides prompt templates and schemas to enforce a structured interface between an application and its models, and the README states a sub-millisecond p99 latency overhead at 10k+ QPS, attributed to the Rust implementation. On top of the gateway sits an automated-engineer capability, described as analyzing observability data, setting up evals, optimizing prompts and models and running A/B tests, which is the mechanism that turns traffic into improvements. The repository is Apache-2.0, and the GitHub API reports it as archived with the most recent commit in June 2026, so the current state deserves checking before adopting.

## Why it's in the Arsenal

The decision it removes is splitting the request path from the learning loop. A typical stack has a proxy for routing and retries, a tracing vendor for logs, an eval framework for tests, and a spreadsheet for comparing prompt variants, and none of them share a schema, so connecting production traffic to an experiment means hand-mapping identifiers. TensorZero's premise is that the gateway already sees every request and response, so the eval and A/B surface can be built on that same record rather than a parallel instrumentation story. The cost of that coherence is that it is a platform: you deploy and version one system rather than picking the best tool per layer.

## Architecture

The gateway is a Rust service that terminates a unified inference API and fans out to providers, with tool use, JSON-schema-constrained output, batching, embeddings, multimodal input and caching handled in the proxy rather than in each client. Prompt templates and schemas live in the gateway, so the contract between an application and a model is versioned configuration rather than string concatenation in application code. Every call and response is recorded, which is what makes observability a property of the system instead of an SDK you must adopt in each service; ClickHouse-style analytical storage is the pattern the platform's data layer follows. Evaluation and experimentation then run against those records: variants of a prompt or model are compared with the same schema, and an automated-engineer component analyses the observability data, proposes evals, optimises prompts and models and runs A/B tests. The Rust proxy is the reason the latency claim is plausible, since the gateway sits in the hot path of every request.

## Ecosystem Position

TensorZero competes most directly with the Portkey gateway entry in this same batch: both are Rust or TypeScript proxies in front of many providers with retries and fallbacks, and the difference is that TensorZero extends past routing into a data-driven optimisation loop while Portkey leads with catalogue breadth and guardrails. It overlaps with the observability and eval entries in content/projects/benchmark-and-eval and content/projects/evaluation-and-observability, but by owning both rather than integrating, which is the interesting part of the design and also the part that makes it heavier than a focused tracer. Compared with a model-serving engine in content/projects/inference-engines, it sits in front of them rather than replacing them. Its archived repository status is the real differentiator in practice: it is the strongest signal in the entry list that you should read the current project state before planning around it.

## Getting Started

The documented path is a container that brings up the gateway and its data store, then a call through the unified endpoint:

```bash
docker run -d --name tensorzero -p 3000:3000 -v ./data:/app/data \
  ghcr.io/tensorzero/tensorzero
```

Point an OpenAI-compatible client at the local endpoint and send a request. A five-minute quick start, a deployment guide, an API reference and a configuration reference are all linked from the README, and the configuration file is where providers, models, prompt templates and schemas are declared. Because the repository is archived, read the current project documentation for the release you install.

## Key Use Cases

1. Production-to-eval loop: point the gateway at your traffic, then build evals and A/B tests from the recorded calls instead of re-instrumenting a separate dataset.
2. Structured model interface: define a prompt template plus a JSON schema in the gateway so every client gets validated output rather than ad-hoc parsing.
3. High-throughput self-hosted routing: proxy many providers behind one API with retries, caching, batching and a low overhead budget on latency-sensitive paths.

## Strengths

- Gateway and improvement loop share one schema, so observability data is directly usable as eval and experimentation input.
- Rust proxy with a published sub-millisecond p99 overhead claim at 10k+ QPS, which is unusual specificity for a gateway.
- Prompt templates and JSON schemas as first-class gateway features, so the model interface is versioned configuration rather than application string work.
- Apache-2.0 and self-hostable, with the gateway, data layer and optimisation tooling deployable as one system.

## Limitations

The GitHub API reports this repository as archived, with the last commit in June 2026, which is a substantial caution: the code, the docs and the container images you find here may no longer be what the project ships, and anyone planning a deployment needs to establish the current state from the project's own site first. Even setting that aside, the platform scope is wide, and a team that only needs a proxy is taking on a data store and an optimisation surface along with it. The sub-millisecond overhead figure is a vendor benchmark on the project's own hardware, and your routing rules, caching and analytics load will change it. The automated-engineer component is the newest and least documented part, so treat its A/B and optimisation claims as unproven until you have run it on your own traffic.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the combined gateway and optimisation platform, and its closest sibling in this batch is the portkey-gateway entry, which solves routing with a different emphasis. It sits in front of the serving entries in content/projects/inference-engines rather than replacing them, and it overlaps the eval and observability entries in content/projects/benchmark-and-eval and content/projects/evaluation-and-observability by absorbing part of their role. For agent memory and routing within an agent, the memory entries in the same phase are complementary. The archived status is worth weighing against the active gateway alternatives before you plan a build on it.

## Resources

- [GitHub — tensorzero/tensorzero (archived)](https://github.com/tensorzero/tensorzero)
- [Documentation — tensorzero.com/docs](https://www.tensorzero.com/docs/)
- [Project site — tensorzero.com](https://tensorzero.com)
