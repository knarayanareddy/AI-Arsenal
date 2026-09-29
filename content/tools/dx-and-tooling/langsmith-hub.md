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

LangSmith Hub earns a place in the Arsenal because it directly addresses a recurring decision point: you're building with LangChain/LangGraph and want prompt and dataset management in the same platform as your tracing. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Prompt/dataset sharing within a team
- Tight coupling to the LangChain/LangGraph ecosystem

## Architecture / How It Works

Prompts and datasets are stored in the LangSmith platform and referenced from LangChain/LangGraph code, with usage automatically tied back to tracing data.

## Getting Started

```bash
pip install langsmith
```

## Use Cases

1. **Scenario**: you're building with LangChain/LangGraph and want prompt and dataset management in the same platform as your tracing
2. **Scenario**: you want to share and version prompts across a team already standardized on LangSmith
3. **Scenario where this is NOT the right fit**: you're not using LangChain/LangGraph (the hub's value is tightly coupled to that ecosystem) — evaluate an alternative instead

## Strengths

- You're building with LangChain/LangGraph and want prompt and dataset management in the same platform as your tracing
- You want to share and version prompts across a team already standardized on LangSmith

## Limitations / When NOT to Use

- You're not using LangChain/LangGraph (the hub's value is tightly coupled to that ecosystem)
- You need a fully open-source, self-hostable prompt registry (consider Langfuse Prompts instead)

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

