---
id: temporal
name: "Temporal"
type: tool
job: [orchestration]
description: "Durable-execution platform that guarantees workflow completion — increasingly the reliability backbone under production AI agents"
url: "https://temporal.io"
cost_model: freemium
pricing_detail: "MIT open-source server (self-host free); Temporal Cloud usage-based"
tags: [orchestration, stateful, agents]
maturity: production
stack: [go, polyglot]
free_tier: true
free_tier_limits: "Self-hosting is free; Cloud has usage-based pricing with credits for startups"
self_hostable: true
open_source: true
source_url: "https://github.com/temporalio/temporal"
docs_url: "https://docs.temporal.io"
github_url: "https://github.com/temporalio/temporal"
alternatives: [prefect, dagster, airflow]
integrates_with: [langgraph]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production]
best_when:
  - "Your agent/LLM pipelines must survive crashes, redeploys, and week-long human-in-the-loop waits without losing state"
  - "You want retries, timeouts, and compensation logic as code (workflow-as-code) instead of ad-hoc queues and cron"
avoid_when:
  - "Simple short-lived LLM calls — durable execution adds infrastructure and a real learning curve you may not need"
  - "Your team can't invest in the deterministic-workflow programming model (no naive nondeterminism inside workflows)"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (21,489), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The de facto durable-execution standard; the strongest answer to 'my agent died mid-task' in production"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/temporalio/temporal", "date": "2026-07-08", "description": "21,489 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A durable-execution engine: you write workflows as ordinary code in Go/Java/TypeScript/Python, and Temporal persists every step so execution resumes exactly where it left off after any failure — a property production agent systems increasingly rely on for long-running, tool-calling, human-approval flows.

## Why It's in the Arsenal

Temporal earns a place in the Arsenal because it directly addresses a recurring decision point: your agent/LLM pipelines must survive crashes, redeploys, and week-long human-in-the-loop waits without losing state. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Durable workflows: state survives process/infra failure
- Automatic retries, heartbeats, timeouts, signals/queries
- Polyglot SDKs; OpenAI Agents SDK integration for durable agents

## Architecture / How It Works

Workflow code runs deterministically against an event-sourced history stored by the Temporal service; side effects live in activities that are retried independently. On failure, replaying history reconstructs workflow state, giving exactly-once-effect semantics for long processes.

## Getting Started

```bash
brew install temporal && temporal server start-dev
pip install temporalio
```

## Use Cases

1. **Scenario**: your agent/LLM pipelines must survive crashes, redeploys, and week-long human-in-the-loop waits without losing state
2. **Scenario**: you want retries, timeouts, and compensation logic as code (workflow-as-code) instead of ad-hoc queues and cron
3. **Scenario where this is NOT the right fit**: simple short-lived LLM calls — durable execution adds infrastructure and a real learning curve you may not need — evaluate an alternative instead

## Strengths

- Your agent/LLM pipelines must survive crashes, redeploys, and week-long human-in-the-loop waits without losing state
- You want retries, timeouts, and compensation logic as code (workflow-as-code) instead of ad-hoc queues and cron

## Limitations / When NOT to Use

- Simple short-lived LLM calls — durable execution adds infrastructure and a real learning curve you may not need
- Your team can't invest in the deterministic-workflow programming model (no naive nondeterminism inside workflows)

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `prefect`, `dagster`, `airflow` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `temporal`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://temporal.io)
- [Documentation](https://docs.temporal.io)
- [GitHub](https://github.com/temporalio/temporal)

## Buzz & Reception

- 21,489 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
