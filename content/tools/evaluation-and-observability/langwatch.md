---
id: langwatch
name: LangWatch
type: tool
job: [evaluation, tracing]
description: Open-source LLM observability and evaluation platform — OpenTelemetry-based tracing plus online/offline evals and datasets, self-hostable or cloud
url: "https://langwatch.ai"
cost_model: open-source
pricing_detail: Open source (Apache-2.0), self-hostable; managed cloud with free tier and paid plans
tags: [observability, tracing, evaluation]
maturity: beta
stack: [python, typescript]
free_tier: true
free_tier_limits: Self-host for free; managed cloud has a free tier with paid plans above it
self_hostable: true
open_source: true
source_url: "https://github.com/langwatch/langwatch"
docs_url: "https://langwatch.ai/docs/introduction"
github_url: "https://github.com/langwatch/langwatch"
alternatives: [langsmith, humanloop, promptfoo, ragas]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [prototype, production]
best_when:
  - You want LLM tracing and evaluation in one open, self-hostable platform standardized on OpenTelemetry, rather than a closed SaaS or two separate tools
  - You need to run evals both offline (on datasets) and online (on live production traffic) against the same traced data
avoid_when:
  - You only need lightweight offline prompt testing in CI — a single eval library (Promptfoo, Ragas) is simpler than standing up a platform
  - You want a mature, deeply-integrated managed product and are willing to pay for it — a more established SaaS may have broader integrations today
version_tracked: null
enrichment_status: draft
enrichment_notes: langwatch/langwatch verified ~3.3k stars, Apache-2.0, last push 2026-07-08 via GitHub API. OpenTelemetry-based, self-hostable. Beta maturity — feature set and APIs still evolving; evaluate the eval metrics against your needs.
verdict: solid-choice
verdict_rationale: A credible open, self-hostable alternative that unifies OTel-based tracing with online/offline evals; less battle-tested than incumbent SaaS but avoids lock-in
status: active
---

> **TL;DR:** An open-source (Apache-2.0), self-hostable LLM observability + evaluation platform built on OpenTelemetry: trace LLM/agent calls and run online and offline evals over the same data. Free to self-host, cloud available; a solid choice when you want tracing + evals without SaaS lock-in.

## Overview

LangWatch is an open-source platform that combines LLM observability (tracing of prompts, chains, and agent steps) with evaluation (running metrics/judges on datasets and on live traffic). It is built on OpenTelemetry, so instrumentation follows an open standard, and it can be self-hosted or used as managed cloud.

## Why It's in the Arsenal

LLM observability and evaluation are often bought as a closed SaaS or assembled from a tracing tool plus a separate eval library. LangWatch earns an evaluation-and-observability entry as an open, self-hostable option that unifies both on OpenTelemetry — filling the "avoid lock-in but still get tracing + evals together" gap that neither closed SaaS nor single-purpose eval libraries cover.

## Key Features

- OpenTelemetry-based tracing of LLM, chain, and agent executions
- Online evaluations on production traffic and offline evaluations on datasets
- Dataset management and annotation for building eval sets from real traffic
- Self-hostable (open source) or managed cloud; SDKs for Python and TypeScript

## Architecture / How It Works

Your app emits OpenTelemetry spans (via LangWatch SDKs or OTel instrumentation) capturing LLM calls and steps; LangWatch ingests and assembles them into traces. Evaluators (metrics or LLM-judges) run against traced data — either continuously on live traffic or on curated datasets — and results surface in dashboards. Because it speaks OTel, instrumentation isn't proprietary and can coexist with other OTel tooling.

## Getting Started

```python
pip install langwatch
# import langwatch
# langwatch.setup(api_key="...")  # or point at your self-hosted instance
# @langwatch.trace()
# def handle(msg): ...
# See docs (Resources) for online/offline evaluators and dataset setup.
```

## Use Cases

1. **Scenario**: tracing a production agent and running online quality/safety evaluators on live traffic to catch regressions
2. **Scenario**: curating a dataset from real traced failures, then running offline evals on prompt changes before deploy

## Strengths

- Open source and self-hostable — avoids SaaS lock-in and keeps data in your environment
- OpenTelemetry foundation means standards-based, non-proprietary instrumentation
- Unifies tracing and evaluation (online + offline) instead of requiring two tools

## Limitations / When NOT to Use

- Beta maturity: fewer integrations and less battle-testing than incumbent observability SaaS
- Standing up a platform is overkill if you only need offline prompt tests in CI
- Eval metric depth is evolving; specialized evaluation needs may still want a dedicated framework

## Integration Patterns

- Instrument with OpenTelemetry/LangWatch SDK, self-host the platform, and run online evaluators on production traces
- Compare with closed [LangSmith](./langsmith.md) and [Humanloop](./humanloop.md); use LangWatch when open/self-hosted matters
- Complement with focused eval libraries [Promptfoo](./promptfoo.md) or [Ragas](./ragas.md) for CI-time offline checks

## Resources

- [Website](https://langwatch.ai)
- [Documentation](https://langwatch.ai/docs/introduction)
- [GitHub (langwatch/langwatch)](https://github.com/langwatch/langwatch)

## Buzz & Reception

LangWatch sits at ~3.3k GitHub stars with active daily development (GitHub API, 2026-07-08), reflecting demand for an open, OpenTelemetry-native alternative to closed LLM-observability platforms.
