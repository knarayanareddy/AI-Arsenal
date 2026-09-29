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

> **TL;DR:** LangSmith prompt and dataset workflows for LangChain and LangGraph applications. Free tier plus paid LangSmith plans. Best for LangChain prompt workflows.

## Overview

LangSmith's prompt and dataset management surface for LangChain/LangGraph applications, sharing infrastructure with LangSmith's tracing platform.

## Why It's in the Arsenal

The entry exists because LangSmith Hub is a langSmith prompt and dataset workflows for LangChain and LangGraph applications. Read it beside `langfuse-prompts`, `promptlayer`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- Prompt/dataset sharing within a team
- Tight coupling to the LangChain/LangGraph ecosystem

## Architecture / How It Works

Prompts and datasets are stored in the LangSmith platform and referenced from LangChain/LangGraph code, with usage automatically tied back to tracing data.

## Getting Started

Install the client for your language, then make one call to confirm the credentials, network path and configuration are reachable before wiring LangSmith Hub into anything else. The command below calls the hosted service against the `prompt-management` job and returns a result you can inspect directly.

```bash
pip install langsmith
```

Follow the official documentation at https://docs.smith.langchain.com/ for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Where it fits**: You're building with LangChain/LangGraph and want prompt and dataset management in the same platform as your tracing.
2. **Adoption checkpoint**: compare LangSmith Hub against `langfuse-prompts`, `promptlayer` on the same `prompt-management` task and the same traffic shape, and measure the two numbers this entry does not give you — end-to-end latency and the error rate when the dependency is degraded.

## Strengths

- In concrete terms, LangSmith Hub is a langSmith prompt and dataset workflows for LangChain and LangGraph applications — the mechanism named in this entry's architecture is what to check against your own pipeline, because that is where the behaviour actually lives.
- Weighing LangSmith Hub against `langfuse-prompts`, `promptlayer` comes down to one question you should answer first: who runs the process when it breaks, you or the vendor.
- LangSmith Hub is reached over an API rather than vendored as a library, so replacing it later is a client swap; the offset is that its availability, rate limits and pricing are the vendor's to change.
- The gap this entry cannot close for you is measured behaviour: latency, concurrency limits and degraded-dependency handling for LangSmith Hub all need testing on your own traffic shape.

## Limitations / When NOT to Use

- There is no self-hosted path to LangSmith Hub, so availability, quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for LangSmith Hub describes capability rather than behaviour at your request shape, so latency, concurrency and failure handling are the parts you have to measure yourself.

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

