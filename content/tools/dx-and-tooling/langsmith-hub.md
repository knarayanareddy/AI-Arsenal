---
id: langsmith-hub
name: LangSmith Hub
type: tool
job: [prompt-management]
description: LangSmith prompt and dataset workflows for LangChain and LangGraph applications
url: "https://docs.smith.langchain.com/"
cost_model: freemium
pricing_detail: Free tier plus paid LangSmith plans
tags: [langchain, evaluation, llm]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: false
open_source: false
source_url: null
docs_url: "https://docs.smith.langchain.com/"
github_url: null
alternatives: [langfuse-prompts, promptlayer]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [production]
best_when:
  - You're building with LangChain/LangGraph and want prompt and dataset management in the same platform as your tracing
  - You want to share and version prompts across a team already standardized on LangSmith
avoid_when:
  - You're not using LangChain/LangGraph (the hub's value is tightly coupled to that ecosystem)
  - You need a fully open-source, self-hostable prompt registry (consider Langfuse Prompts instead)
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** LangSmith Hub covers the prompt-management leg. The capability is documented; the behaviour at your load is not, so measure latency and degraded-mode handling yourself before adopting it.

## Overview

LangSmith's prompt and dataset management surface for LangChain/LangGraph applications, sharing infrastructure with LangSmith's tracing platform.

Treat LangSmith Hub as a service with a schema, not as code you own unlike `langfuse-prompts`, `promptlayer`; on the prompt-management path; under a freemium cost model; with `langsmith-hub`, `name`, `langsmith`. The cache, the retry policy and an explicit timeout are your responsibilities at this boundary, and getting them wrong presents as a provider problem when it is a client one.

## Why It's in the Arsenal

The entry exists because LangSmith Hub is a langSmith prompt and dataset workflows for LangChain and LangGraph applications. Read it beside `langfuse-prompts`, `promptlayer`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- Prompt/dataset sharing within a team
- Tight coupling to the LangChain/LangGraph ecosystem

## Architecture / How It Works

Prompts and datasets are stored in the LangSmith platform and referenced from LangChain/LangGraph code, with usage automatically tied back to tracing data.

The integration happens in the developer's loop rather than at runtime, through a config file, a CLI or an editor extension, so the failure mode is a broken or ambiguous configuration rather than an outage in a request path. Data crosses a boundary you do not control unlike `langfuse-prompts`, `promptlayer`; on the prompt-management path; under a freemium cost model; with `langsmith-hub`, `name`, `langsmith`, which makes the failure modes specific: timeouts, exhausted quotas and expired credentials. Decide what your system does in each case before the first request, because a dependency that is slow and one that is absent need different handling.

## Getting Started

Install the client for your language, then make one call to confirm the credentials, network path and configuration are reachable before wiring LangSmith Hub into anything else. The command below calls the hosted service against the `prompt-management` job and returns a result you can inspect directly.

```bash
pip install langsmith
```

Follow the official documentation at https://docs.smith.langchain.com/ for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Integrating LangSmith Hub**: the prompt-management call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Validating the choice**: put LangSmith Hub and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Choosing between candidates**: LangSmith Hub's comparison set is `langfuse-prompts`, `promptlayer`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- Beyond the marketing, LangSmith Hub's own notes are the useful part: prompts and datasets are stored in the LangSmith platform and referenced from LangChain/LangGraph code, with usage automatically tied back to tracing data.
- LangSmith Hub overlaps `langfuse-prompts`, `promptlayer` in this phase. Read those entries before choosing: the feature comparison is usually closer than the deployment comparison, and the latter is what you inherit.
- Depending on LangSmith Hub means depending on a service rather than a package, which makes substitution easy and outage handling someone else's.
- What this entry cannot give you is measured behaviour: measure LangSmith Hub's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to LangSmith Hub, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for LangSmith Hub describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where LangSmith Hub overlaps `langfuse-prompts`, `promptlayer`, choosing on feature lists alone is the mistake; the deciding axis is operational.

## Integration Patterns

- *Wiring*: adopt LangSmith Hub over an HTTP endpoint from whichever service owns the call site against the `prompt-management` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `langfuse-prompts`, `promptlayer` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: Confirm which tier you are on before committing: free-tier limits change, and a self-hosted option usually exists if the hosted quota becomes the constraint.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://docs.smith.langchain.com/)
- [Documentation](https://docs.smith.langchain.com/)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for prompt-management.

---
*Last reviewed: 2026-06-30 by @maintainer*

