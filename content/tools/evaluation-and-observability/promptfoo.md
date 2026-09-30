---
id: promptfoo
name: promptfoo
type: tool
job: [evaluation]
description: An open-source CLI and platform for prompt and LLM regression testing
url: "https://www.promptfoo.dev"
cost_model: open-source
pricing_detail: Open-source with hosted options
tags: [evaluation, llm, monitoring]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/promptfoo/promptfoo"
docs_url: null
github_url: "https://github.com/promptfoo/promptfoo"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [prototype, production]
best_when:
  - You want CLI-driven, CI-friendly regression testing for prompts and LLM outputs
  - You need to red-team prompts for jailbreaks/injection as part of your evaluation suite
avoid_when:
  - You need deep RAG-pipeline-specific metrics (faithfulness, retrieval precision) — pair with RAGAS or DeepEval
  - You want a fully managed, hosted-only experience with no local CLI workflow
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for evaluation workflows when it matches your stack and cost constraints
status: active
---

## Overview

An open-source CLI and platform for regression-testing prompts and LLM outputs, with built-in support for red-teaming prompts against jailbreaks and injection.

Treat promptfoo as a service with a schema, not as code you own on the evaluation path; under a open-source cost model; with `promptfoo`, `name`, `type`. The cache, the retry policy and an explicit timeout are your responsibilities at this boundary, and getting them wrong presents as a provider problem when it is a client one.

## Why It's in the Arsenal

The entry exists because promptfoo is An open-source CLI and platform for prompt and LLM regression testing. No direct sibling is catalogued in this phase, which makes this the reference point for the job rather than evidence of uniqueness.

## Key Features

- CLI-driven, CI-friendly prompt regression testing
- Built-in red-teaming test cases for jailbreaks/injection
- Side-by-side comparison across models/prompts

## Architecture / How It Works

Test cases (prompt + assertions) are defined in config files; the CLI runs them against one or more target models and reports pass/fail results suitable for CI gating.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://www.promptfoo.dev
```

## Use Cases

1. **What it does in a system**: promptfoo sits on the evaluation leg of the pipeline, so the work is deciding its timeout, retry and degraded-mode behaviour and putting it behind an interface that lets you replace it without a rewrite.
2. **Measuring it**: the two numbers this entry does not give you are end-to-end latency at your real request shape and the error rate when the upstream is degraded; both are worth recording before you depend on promptfoo.
3. **Deciding at all**: nothing is catalogued against promptfoo here, so the honest first step is confirming the evaluation job needs a dedicated tool rather than the simpler approach you already have.

## Strengths

- What promptfoo gives you that its headline description does not: test cases (prompt + assertions) are defined in config files; the CLI runs them against one or more target models and reports pass/fail results suitable for CI gating, which is the part to check against your own pipeline before trusting the feature list.
- No direct sibling is catalogued for promptfoo in this phase, so it is the reference point for the job here; treat the absence as a gap in the catalog rather than as evidence that nothing else fits.
- promptfoo is a service call, so its failure surface is timeouts, quotas and key expiry rather than anything you can patch.
- What this entry cannot give you is measured behaviour: measure promptfoo's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- Depending on promptfoo means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for promptfoo describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.

## Integration Patterns

- *Wiring*: adopt promptfoo as a TypeScript package in the same runtime as your API against the `evaluation` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: no direct sibling is catalogued in this phase yet, which makes this entry the reference point for the job. Treat that as a gap to check rather than as evidence of uniqueness: the honest comparison is against whatever your team already runs for this job.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://www.promptfoo.dev)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

