---
id: pyrit
name: "PyRIT"
type: tool
job: [security-and-guardrails, evaluation]
description: "Microsoft's Python Risk Identification Toolkit for red-teaming generative AI systems, born from its AI Red Team"
url: "https://azure.github.io/PyRIT/"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [security, evaluation, agents]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/microsoft/PyRIT"
docs_url: "https://azure.github.io/PyRIT/"
github_url: "https://github.com/microsoft/PyRIT"
alternatives: [garak, promptfoo]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production, research]
best_when:
  - "You're red-teaming a full application (not just a model): multi-turn attack orchestration, converters, and custom objectives"
  - "You want the framework Microsoft's own AI Red Team battle-tested on 100+ products, including automated attacker LLMs"
avoid_when:
  - "You want a one-command scan with built-in reporting — garak is turnkey where PyRIT is a framework you program"
  - "Non-Python security teams; the orchestration model assumes engineering investment"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (4,074), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most capable open framework for programmatic, multi-turn AI red teaming; complements rather than replaces scanners"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/microsoft/PyRIT", "date": "2026-07-08", "description": "4,074 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A red-teaming framework from Microsoft's AI Red Team: composable orchestrators run single- and multi-turn attack strategies (including LLM-driven adversarial agents like crescendo and PAIR-style loops) against any target, with prompt converters (encodings, translations, obfuscations) and scorers to identify harms systematically.

## Why It's in the Arsenal

The case for PyRIT rests on its documentation and observed adoption rather than a controlled comparison here; the sections below state what it claims and what depending on it would commit you to.

## Key Features

- Attack orchestrators: multi-turn, adversarial-LLM, skeleton-key strategies
- Converters mutate payloads (base64, leetspeak, translation) to bypass filters
- Pluggable targets (APIs, Azure, local) and scorers; memory of all attempts

## Architecture / How It Works

An attack combines a target (the system under test), converters that transform seed prompts, an optional adversarial LLM that adapts across turns toward an objective, and scorers that judge success; all interactions persist to memory for analysis — making red-team campaigns reproducible experiments.

## Getting Started

```bash
pip install pyrit-ai
# compose PromptSendingAttack(objective_target=..., converters=[...]) and run
```

## Use Cases

1. **Integrating PyRIT**: the security-and-guardrails, evaluation call is a dependency with its own failure modes, not a library call — settle timeout, retry and what happens when it is unavailable before the first request goes through.
2. **Measuring it**: the two numbers this entry does not give you are end-to-end latency at your real request shape and the error rate when the upstream is degraded; both are worth recording before you depend on PyRIT.
3. **Choosing between candidates**: PyRIT's comparison set is `garak`, `promptfoo`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- Beyond the marketing, PyRIT's own notes are the useful part: an attack combines a target (the system under test), converters that transform seed prompts, an optional adversarial LLM that adapts across turns toward an objective, and scorers that judge success; all interactions persist to memory for analysis — making red-team campaigns reproducible experiments.
- PyRIT overlaps `garak`, `promptfoo` in this phase. Read those entries before choosing: the feature comparison is usually closer than the deployment comparison, and the latter is what you inherit.
- PyRIT is a service call, so its failure surface is timeouts, quotas and key expiry rather than anything you can patch.
- Marked beta, so PyRIT's interface may still move; pin the version you build against rather than tracking latest.

## Limitations / When NOT to Use

- Depending on PyRIT means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for PyRIT describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- PyRIT is beta, so interface churn is expected; read the changelog before an upgrade rather than after one breaks you.

## Integration Patterns

- *Wiring*: adopt PyRIT as a Python dependency or sidecar service against the `security-and-guardrails, evaluation` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `garak`, `promptfoo` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://azure.github.io/PyRIT/)
- [Documentation](https://azure.github.io/PyRIT/)
- [GitHub](https://github.com/microsoft/PyRIT)

## Buzz & Reception

- 4,074 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
