---
id: portkey
name: Portkey
type: tool
job: [prompt-management, monitoring]
description: An AI gateway for routing, observability, guardrails, and prompt management
url: "https://portkey.ai"
cost_model: freemium
pricing_detail: Free and paid SaaS tiers
tags: [observability, guardrails, cloud]
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
phase: serving-and-deployment
audience: [production]
best_when:
  - You want an AI gateway combining routing, caching, guardrails, and observability in front of multiple LLM providers
  - You need centralized cost and usage observability across teams calling many different model APIs
avoid_when:
  - You only need simple multi-provider routing without the gateway/guardrails layer (LiteLLM alone may be enough)
  - You need a fully open-source, self-hostable gateway with no managed-service dependency for advanced features
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for prompt-management, monitoring workflows when it matches your stack and cost constraints
status: active
---

## Overview

An AI gateway that sits in front of multiple LLM providers, combining routing, caching, guardrails, and centralized observability into one layer.

## Why It's in the Arsenal

Portkey appears here as a reference point for the prompt-management, monitoring job. The useful question is what it would cost you to operate, which the sections below try to answer.

## Key Features

- Multi-provider routing with caching and guardrails
- Centralized cost/usage observability across teams
- Configurable fallback and retry policies

## Architecture / How It Works

Application traffic is routed through Portkey's gateway, which applies configured policies (caching, guardrails, routing rules) before forwarding requests to the underlying model provider and logging the result.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://portkey.ai
```

## Use Cases

1. **Integrating Portkey**: the prompt-management, monitoring call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Validating the choice**: put Portkey and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Deciding at all**: nothing is catalogued against Portkey here, so the honest first step is confirming the prompt-management, monitoring job needs a dedicated tool rather than the simpler approach you already have.

## Strengths

- Beyond the marketing, Portkey's own notes are the useful part: application traffic is routed through Portkey's gateway, which applies configured policies (caching, guardrails, routing rules) before forwarding requests to the underlying model provider and logging the result.
- No direct sibling is catalogued for Portkey in this phase, so it is the reference point for the job here; treat the absence as a gap in the catalog rather than as evidence that nothing else fits.
- Depending on Portkey means depending on a service rather than a package, which makes substitution easy and outage handling someone else's.
- What this entry cannot give you is measured behaviour: measure Portkey's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to Portkey, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for Portkey describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.

## Integration Patterns

- *Wiring*: adopt Portkey over an HTTP endpoint from whichever service owns the call site against the `prompt-management, monitoring` job.  For evaluation or tracing, emit spans and scores from your own service so a bad generation is traceable back to the prompt, the model and the parameters that produced it, rather than only visible as an aggregate score.
- *Alternatives*: no direct sibling is catalogued in this phase yet, which makes this entry the reference point for the job. Treat that as a gap to check rather than as evidence of uniqueness: the honest comparison is against whatever your team already runs for this job.
- *Deployment and cost*: Confirm which tier you are on before committing: free-tier limits change, and a self-hosted option usually exists if the hosted quota becomes the constraint.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://portkey.ai)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

