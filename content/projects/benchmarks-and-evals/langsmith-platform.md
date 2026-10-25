---
id: langsmith-platform
name: LangSmith
version_tracked: null
artifact_type: service
category: observability
subcategory: tracing
description: "LangChain's observability, evaluation, prompt and agent-deployment platform — cloud by default, self-hosted on the enterprise plan"
github_url: "https://github.com/langchain-ai/langsmith-python"
license: Proprietary
primary_language: Other
org_or_maintainer: null
tags: [observability, tracing, evaluation, langchain]
maturity: production
cost_model: freemium
github_stars: 17
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-10-24"
docs_url: "https://docs.langchain.com/langsmith/observability"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: platform
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, production-proven]
ecosystem_role:
  - LangChain's commercial platform for tracing, evaluation, prompts and agent deployment, which is also the reference implementation of the tracing conventions the rest of the ecosystem follows
best_for:
  - You are already running LangChain or LangGraph, where tracing is an environment variable rather than an integration, and the framework authors are the people who know what a run should look like
  - You want evaluation, annotation queues, prompt versioning and production monitoring in one place rather than four tools stitched together
  - Regulated data forces self-hosting or BYOC but you still want the managed product — both exist, on the enterprise plan
avoid_if:
  - You need an open-source tracing backend you can fork or run without a commercial contract, which is Langfuse or Phoenix rather than this
  - You are not on the enterprise plan and cannot accept a 180-day retention ceiling on SaaS traces, since self-hosting and BYOC are gated behind that plan
  - Your stack is deliberately framework-neutral and you do not want a vendor whose product and frameworks share a roadmap
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, phoenix, helicone, opik]
integrates_with: [langchain, langgraph]
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Re-verified 2026-10-25 against docs.langchain.com: Cloud/BYOC/self-hosted topologies (self-hosted and BYOC need the enterprise plan), 14-day base vs 180-day extended retention with automatic upgrades, plus Engine and Deployment. github_url moved to the Python SDK repo after langsmith-sdk was archived on 2026-10-16."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.ibm.com/think/topics/langsmith","date":"2025-11-17","description":"IBM documents Factory's production use of LangSmith (integrated with AWS CloudWatch) for secure, reliable LLM operations, doubling iteration speed and reducing open-to-merge time by 20%"}
featured: false
status: active
---

## Overview

LangSmith is LangChain's commercial platform, and it has grown well past tracing. The current product covers observability (traces, threads, dashboards, alerts, online evaluators, automation rules), evaluation (datasets, experiments, evaluators, pairwise comparison, annotation queues), prompt engineering (the prompt hub, versioned and deployed through the platform) and LangSmith Deployment, which hosts and scales agent servers. A newer "Engine" feature scans traces for recurring failures and proposes the root cause, which is the same job a human does by hand after an incident.

Deployment is the part most summaries get wrong. There are three topologies: Cloud (LangChain runs everything), BYOC (LangChain runs the control plane, your data plane stays in your VPC) and self-hosted (you run it, from a Helm chart or docker-compose). Self-hosted and BYOC are enterprise-plan features, not community options, so "managed-only" describes the entry-level product rather than the product.

## Why it's in the Arsenal

The entry earns its place on integration depth rather than features. LangChain and LangGraph emit traces through environment variables, so the observability exists before anyone writes a span, and the same run objects feed datasets, experiments and evaluators without an export step. That is a materially shorter path than instrumenting an SDK in an arbitrary application and then rebuilding a dataset by hand.

It is also the anchor for the category: the trace conventions other tools in this phase follow, the pricing model competitors benchmark against, and the reference point for what an LLM observability product includes in 2026. Reading Langfuse, Phoenix or Helicone without it leaves the comparison half-formed.

## Architecture

Instrumentation is layered: the Python and JavaScript SDKs register a tracer, framework integrations (LangChain, LangGraph, OpenAI, Anthropic, CrewAI, Pydantic AI, the Vercel AI SDK and others) attach spans automatically, and anything else can be instrumented explicitly with decorators or the OTel-compatible API. A run is the unit — an LLM call, a retriever call, a tool call or an arbitrary function — and runs group into traces and threads, which is what makes a multi-turn agent legible instead of a list of calls.

The backend stores runs, feedback and datasets, and everything else is a view over that store: the tracing UI, the monitoring dashboards, the experiments (a dataset plus an evaluator plus a target function), the annotation queues and the online evaluators that score production traffic. Retention is a first-class design decision rather than a detail — see the limitations, because it changes both cost and what you can do with a trace after the fact.

## Ecosystem Position

LangSmith overlaps Langfuse most directly, and the split is licence plus ecosystem pull: Langfuse is MIT-licensed, framework-agnostic and self-hostable without a sales call, while LangSmith is proprietary but closer to the framework many teams already use. It competes with Phoenix (Arize) and Opik (Comet) on evaluation tooling, where both are more open and LangSmith is broader — traces, datasets, prompts, annotation and hosting in one product. Against Helicone the difference is the integration point: Helicone sees traffic because it proxies the request, whereas LangSmith sees it because instrumented code emits spans to an SDK endpoint, so only one of them observes calls the application never made through a client library.

The usual arrangement is one tracing backend plus one evaluation harness; LangSmith's argument is that they are the same product, which is also the lock-in to weigh against the shorter setup path. Where it is weakest is the provider boundary: it observes what your instrumented code calls through the SDK, so a gateway or an external proxy layer in front of the model provider sits outside the trace unless you instrument that hop too.

## Getting Started

```bash
pip install -U langsmith
export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY="<your-key>"
# Any LangChain/LangGraph call now emits traces; no code change required.
```

```python
from langsmith import traceable

@traceable            # for anything outside a framework
def retrieve_and_answer(question: str) -> str:
    return pipeline(question)
```

Create an account at `smith.langchain.com` (no card for the developer tier), then set the project with `LANGSMITH_PROJECT`. Datasets and experiments are built from traces in the UI or from the SDK, and `langsmith export` is the way out if you need the raw runs.

## Key Use Cases

1. **Debugging an agent in production**: threads and turns turn a multi-step run into something readable, and the Engine feature groups the recurring failures so triage starts from a pattern rather than a single bad trace.
2. **Evaluation as a gate before release**: a dataset built from real traces, an evaluator written against it and an experiment comparing two prompt versions is the loop the product is built around, and it closes without leaving the UI.
3. **Online evaluation of live traffic**: evaluators attached to a project score production runs automatically and route them to annotation queues, which is how a team turns an incident into a regression case without manual collection.
4. **Prompt versioning and deployment**: the hub keeps prompt versions with the traces that motivated each change, which is the audit trail a prompt change usually lacks.
5. **Agent hosting**: LangSmith Deployment runs the agent server itself in the same topology as the observability data, so an agent built on LangGraph can be deployed and observed under one contract.

## Strengths

- The shortest path from a LangChain application to traces that exist: an environment variable, no code, and no span-naming convention to invent.
- One store behind tracing, datasets, experiments and online evaluation means a failing production trace becomes a dataset example in a couple of clicks, which is the single biggest practical advantage over running separate tools.
- Managed polish is real: dashboards, alerts, annotation queues, pairwise experiments and a usable trace viewer are all present, and the team maintains them as a product rather than a side project.
- Deployment topologies cover the compliance argument — Cloud, BYOC and self-hosted, with the same feature set on enterprise — so a data-residency objection does not automatically end the evaluation.
- The pricing model is unusually explicit about trade-offs: cheaper base-retention traces versus extended retention, with a documented list of which actions trigger an upgrade.

## Limitations

- **Retention shapes what the product can do for you.** SaaS traces are priced in two tiers — 14-day base and 180-day extended — and from September 2026 the maximum SaaS retention for extended traces is 180 days. Anything you want to keep beyond that has to be promoted into a dataset, or the platform itself has to be self-hosted.
- **Retention auto-upgrades cost money silently.** Online evaluators, automation rules and API feedback can each promote a trace to the extended tier at a higher price, and the default is on for new evaluators and rules. A team that enables both without reading the billing page gets an invoice that looks wrong and is not.
- **Proprietary, and the free tier is not the product.** Self-hosted and BYOC require the enterprise plan, so the licence objection ("can we run it ourselves?") is answerable but not cheaply, and there is no fork to fall back on.
- **The LangChain pull is real lock-in.** The deepest integrations assume LangChain or LangGraph, and a team that later replaces the framework keeps the traces but loses the automatic instrumentations — a cost worth pricing before adopting it *because* it is convenient now.
- **The surface is expanding quickly.** Deployment, Engine, prompt hub and evaluation have all been added to what was a tracing tool, and the documentation now spans cloud, BYOC and self-hosted topologies. Expect names and navigation to move between visits, and pin the SDK version your CI depends on.
- **The GitHub presence is SDK-only.** The platform itself is closed, so `github_stars` and `last_commit` describe the Python client (`langchain-ai/langsmith-python`, split out of the archived `langsmith-sdk` in October 2026), not the product; do not read repository activity as a product health signal.

## Relation to the Arsenal

Read it beside `langfuse` (open-source, framework-agnostic), `phoenix` and `opik` (open evaluation tooling), `braintrust` (the closest commercial peer with a similar tracing-plus-evals shape) and `helicone` (gateway-based capture). The deciding questions are licence, where the integration lives and what retention you can live with — not the feature list, which converges across all of them.

## Resources

- [Documentation](https://docs.langchain.com/langsmith/observability)
- [Platform setup: cloud, BYOC, self-hosted](https://docs.langchain.com/langsmith/platform-setup)
- [Usage, retention and billing](https://docs.langchain.com/langsmith/usage-and-billing)
- [Python SDK](https://github.com/langchain-ai/langsmith-python)
- [JavaScript SDK](https://github.com/langchain-ai/langsmith-javascript)

