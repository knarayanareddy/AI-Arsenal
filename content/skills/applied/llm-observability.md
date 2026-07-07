---
id: "llm-observability"
title: "LLM Observability"
entry_type: "guide"
section: "skills"
description: "The skill of instrumenting LLM systems: tracing, cost tracking, failure classification, and privacy-aware logging"
tags:
  - observability
  - tracing
  - monitoring
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

LLM observability is knowing what your system actually did: which prompt version ran, what context the model saw, what it returned, what it cost, and why it failed. LLM calls are non-deterministic, versioned, and expensive — which makes tracing more essential here than in conventional services, not less.

## Why It's in the Arsenal

Un-instrumented LLM systems are undebuggable: without the exact assembled context, a bad answer cannot be distinguished between retrieval miss, prompt bug, model regression, or user error. Instrumentation is the prerequisite for every other production skill in this vertical.

## Key Features

### Core Concepts

- Trace the full pipeline, not just the model call: retrieval inputs/outputs, tool I/O, context assembly, parsing — the failure is usually between the calls.
- Stamp every trace with prompt version, model version, and feature — attribution is the whole point.
- Separate failure classes: model errors (bad output) vs app errors (timeouts, parse failures) vs upstream errors (empty retrieval) need different owners and fixes.
- Cost is an observability signal: track per feature and per successful outcome, or one runaway feature quietly eats the budget.
- Traces contain user data: redact secrets/PII before storage and set retention deliberately — observability is a privacy surface.

### Practical Workflow

1. Instrument before launch — retrofitting tracing after an incident means debugging blind.
2. Log raw and parsed model outputs; parse failures are invisible otherwise.
3. Classify failures before fixing prompts; fixing the wrong class wastes weeks.
4. Alert on trend deltas (error rate, cost per request, latency percentiles), segmented by feature and version.
5. Replay traces with one variable changed to isolate regressions.

## Architecture / How It Works

Spans wrap each pipeline stage and nest under a request-level trace, carrying metadata (versions, token counts, cost) and payloads (context, output). OpenTelemetry-based conventions let LLM spans flow through existing observability stacks; dedicated LLM platforms add payload inspection, judged scoring, and dataset export on top.

## Getting Started

```text
Minimum trace schema per LLM call:
trace_id, feature, prompt_version, model_version
assembled_context (redacted), raw_output, parsed_output
tokens_in/out, cost, latency, ttft
error_class (model | app | upstream | none)
```

## Use Cases

1. **Scenario**: A "the bot is wrong" report — the trace shows retrieval returned nothing and the model improvised
2. **Scenario**: Attributing a 30% cost spike to one feature's prompt change last Tuesday
3. **Scenario**: Producing an audit trail of what an agent saw and did before an irreversible action

## Strengths

- Makes non-deterministic systems debuggable and regressions attributable
- Same infrastructure powers online evals, cost control, and incident response
- Mature tooling exists — most of the skill is schema and discipline, not building

## Limitations / When NOT to Use

- Full-payload tracing at 100% sampling is expensive; sample intelligently after launch stabilizes
- Traces are sensitive data — without redaction and retention policy, observability becomes liability
- Dashboards nobody reviews are storage costs; pair instrumentation with an operating ritual

## Integration Patterns

- Choose a platform with [choose an observability tool](../../architectures/evaluation-strategy/choose-observability-tool.md); [Langfuse](../../projects/benchmarks-and-evals/langfuse.md), [Phoenix](../../projects/benchmarks-and-evals/phoenix.md), [Helicone](../../projects/benchmarks-and-evals/helicone.md), and [OpenLLMetry](../../projects/benchmarks-and-evals/openllmetry.md) are cataloged.
- Apply [redact secrets before tracing](../../tips-and-tricks/debugging-and-observability/redact-secrets-before-tracing.md) and [separate model errors from app errors](../../tips-and-tricks/debugging-and-observability/separate-model-errors-from-app-errors.md).
- Browse the [observability vertical](../../observability/_index.md) for deeper operational guides.

## Resources

- [Choose an observability tool](../../architectures/evaluation-strategy/choose-observability-tool.md)
- [Trace tool inputs and outputs](../../tips-and-tricks/debugging-and-observability/trace-tool-inputs-and-outputs.md)
- [Track cost per successful outcome](../../tips-and-tricks/cost-and-performance/track-cost-per-successful-outcome.md)
- [Evals in Production](./evals-in-production.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
