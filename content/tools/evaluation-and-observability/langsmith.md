---
id: langsmith
name: LangSmith
type: tool
job: [evaluation, tracing, monitoring]
description: A managed platform for tracing, evaluating, and monitoring LangChain applications
url: "https://smith.langchain.com"
cost_model: freemium
pricing_detail: Free and paid plans vary by usage
tags: [observability, evaluation, tracing, langchain]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: false
open_source: false
source_url: null
docs_url: null
github_url: null
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production]
best_when:
  - You're building with LangChain or LangGraph and want first-party tracing, evaluation, and monitoring with minimal integration work
  - You need managed, polished tracing UI without standing up your own observability backend
avoid_when:
  - You want a framework-agnostic or fully open-source/self-hostable observability stack (consider Langfuse or Phoenix)
  - Cost at high trace volume is a concern and you haven't compared pricing against self-hosted alternatives
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for evaluation, tracing, monitoring workflows when it matches your stack and cost constraints
status: active
---

## Overview

LangChain's managed platform for tracing, evaluating, and monitoring applications built with LangChain or LangGraph, with first-party integration requiring minimal setup.

## Why It's in the Arsenal

LangSmith earns a place in the Arsenal because it directly addresses a recurring decision point: you're building with LangChain or LangGraph and want first-party tracing, evaluation, and monitoring with minimal integration work. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- First-party tracing for LangChain/LangGraph apps
- Built-in evaluation and dataset management
- Managed, polished tracing UI

## Architecture / How It Works

LangChain/LangGraph applications emit trace data automatically via the integration; LangSmith's backend stores and renders these traces alongside evaluation runs and monitoring dashboards.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://smith.langchain.com
```

## Use Cases

1. **Scenario**: you're building with LangChain or LangGraph and want first-party tracing, evaluation, and monitoring with minimal integration work
2. **Scenario**: you need managed, polished tracing UI without standing up your own observability backend
3. **Scenario where this is NOT the right fit**: you want a framework-agnostic or fully open-source/self-hostable observability stack (consider Langfuse or Phoenix) — evaluate an alternative instead

## Strengths

- You're building with LangChain or LangGraph and want first-party tracing, evaluation, and monitoring with minimal integration work
- You need managed, polished tracing UI without standing up your own observability backend

## Limitations / When NOT to Use

- You want a framework-agnostic or fully open-source/self-hostable observability stack (consider Langfuse or Phoenix)
- Cost at high trace volume is a concern and you haven't compared pricing against self-hosted alternatives

## Integration Patterns

- *Wiring*: adopt LangSmith over an HTTP endpoint from whichever service owns the call site against the `evaluation, tracing, monitoring` job.  For evaluation or tracing, emit spans and scores from your own service so a bad generation is traceable back to the prompt, the model and the parameters that produced it, rather than only visible as an aggregate score.
- *Alternatives*: no direct sibling is catalogued in this phase yet, which makes this entry the reference point for the job. Treat that as a gap to check rather than as evidence of uniqueness: the honest comparison is against whatever your team already runs for this job.
- *Deployment and cost*: Confirm which tier you are on before committing: free-tier limits change, and a self-hosted option usually exists if the hosted quota becomes the constraint.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://smith.langchain.com)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

