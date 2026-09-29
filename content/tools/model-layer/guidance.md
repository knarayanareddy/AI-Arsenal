---
id: guidance
name: Guidance
type: tool
job: [structured-output]
description: Microsoft guidance library for controlling and constraining language model generation
url: "https://github.com/guidance-ai/guidance"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [structured-output, llm, guardrails]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/guidance-ai/guidance"
docs_url: "https://github.com/guidance-ai/guidance"
github_url: "https://github.com/guidance-ai/guidance"
alternatives: [instructor, outlines, pydantic-ai-tool]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, prototype]
best_when:
  - You want fine-grained, token-level control over generation structure (interleaving control flow with model output)
  - You're building advanced prompting patterns that need more control than a templating library offers
avoid_when:
  - You just need typed structured output extraction with retries (Instructor is simpler for that)
  - You need a small, stable dependency surface — Guidance's API has changed significantly across versions, so pin carefully
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** the structured-output entry for Guidance. Microsoft guidance library for controlling and constraining language model generation — the deciding factor is operational cost and what you have to run, not the feature list.

## Overview

A library for fine-grained, token-level control over LLM generation, letting you interleave control-flow logic directly with model output rather than relying purely on prompt text.

## Why It's in the Arsenal

Guidance is catalogued here on the strength of its own documentation and public record rather than an independent measurement, so treat the claims below as what the project states about itself until you have run it.

## Key Features

- Token-level control over generation structure
- Interleaves program logic with model sampling
- Useful for advanced, non-standard prompting patterns

## Architecture / How It Works

Generation is expressed as a program mixing literal text, control flow, and model-generated spans; the library drives the underlying model step by step according to that program.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring Guidance into anything else. The command below runs against the `structured-output` job and returns a result you can inspect directly.

```bash
pip install guidance
```

Follow the official documentation at https://github.com/guidance-ai/guidance for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Integrating Guidance**: the structured-output call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Validating the choice**: put Guidance and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Choosing between candidates**: Guidance's comparison set is `instructor`, `outlines`, `pydantic-ai-tool`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- Beyond the marketing, Guidance's own notes are the useful part: generation is expressed as a program mixing literal text, control flow, and model-generated spans; the library drives the underlying model step by step according to that program.
- Against `instructor`, `outlines`, `pydantic-ai-tool`, the difference that decides this is deployment model and cost rather than the feature list, and Guidance sits at the hosted end of that axis.
- Depending on Guidance means depending on a service rather than a package, which makes substitution easy and outage handling someone else's.
- What this entry cannot give you is measured behaviour: measure Guidance's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to Guidance, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for Guidance describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where Guidance overlaps `instructor`, `outlines`, `pydantic-ai-tool`, choosing on feature lists alone is the mistake; the deciding axis is operational.

## Integration Patterns

- *Wiring*: adopt Guidance as a Python dependency or sidecar service against the `structured-output` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `instructor`, `outlines`, `pydantic-ai-tool` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://github.com/guidance-ai/guidance)
- [Documentation](https://github.com/guidance-ai/guidance)
- [Source](https://github.com/guidance-ai/guidance)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for structured-output.

---
*Last reviewed: 2026-06-30 by @maintainer*

