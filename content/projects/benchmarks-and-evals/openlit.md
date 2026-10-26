---
id: openlit
name: OpenLIT
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: Apache-2.0, OpenTelemetry-native platform for agent tracing, evals, guardrails, prompt management and GPU cost monitoring
github_url: https://github.com/openlit/openlit
license: Apache-2.0
primary_language: TypeScript
org_or_maintainer: null
tags:
  - observability
  - tracing
  - monitoring
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 2885
github_stars_last_30d: 363
trending_score: 44
last_commit: '2026-10-26'
docs_url: https://docs.openlit.io/
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: otel-native
phase: benchmark-and-eval
domain:
  - language
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - An OpenTelemetry-native tracing and evaluation platform whose telemetry is standard OTLP, so the same traces can land in its own UI or in whatever backend the team already runs
best_for:
  - Your organisation already has an OTel collector and a backend (Grafana, Datadog, Jaeger, Tempo) and you want LLM spans to arrive there as ordinary OTel spans rather than as a second proprietary data silo
  - You want to trace coding-agent sessions (Claude Code, Codex, Cursor, OpenCode) and see the tool calls, not just the model completions
  - You need GPU metrics and cost accounting for self-hosted inference alongside LLM traces, in one self-hosted Apache-2.0 stack
avoid_if:
  - Nobody on the team has run an OTel collector before and you want a product that works out of the box — the setup assumes you know what an OTLP endpoint is
  - You want deep, curated LLM evaluation datasets and experiment comparison as the primary feature; Langfuse or LangSmith are further along there
  - You need a supported commercial product with an SLA, since this is a community-driven project with a large open-issue count and no vendor contract behind it
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - openllmetry
  - langfuse
  - phoenix
  - helicone
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: 'Re-verified 2026-10-25: GitHub API 2881 stars, 170 open issues, last push 2026-10-22, Apache-2.0. Body rewritten from the README, which now positions the project as an agent-harness platform (tracing, evals with CI gates, runtime guardrails, prompt hub, rule engine, vault, GPU monitoring) and documents the coding-agent CLI.'
added_date: '2026-06-13'
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenLIT is an Apache-2.0 observability platform whose design constraint is that the telemetry is not its own. Instrumentation produces standard OpenTelemetry spans and metrics, exported over OTLP, and the platform is a consumer of that stream rather than the definition of it. Point `OTEL_EXPORTER_OTLP_ENDPOINT` at OpenLIT's collector and its dashboard fills; point the same variable at an existing collector and the identical spans arrive in Grafana, Datadog or Jaeger with no code change.

Around that spine it has accumulated the pieces an agent team needs after tracing: evaluations (LLM-as-a-judge, programmatic checks, human feedback, and CI gates over them), runtime guardrails for prompt injection and restricted topics, a prompt hub with context management, a rule engine, secret storage, model and prompt comparison, cost accounting with custom pricing, and GPU monitoring for NVIDIA, AMD and Intel hardware.

## Why it's in the Arsenal

Most LLM observability products ask you to choose them: the SDK is theirs, the data format is theirs, and the retention policy is theirs. OpenLIT's answer to that is architectural. Because the artifact is OTel, adopting it is reversible — you can run it next to an existing observability stack, and if you stop using its UI the spans keep flowing to whatever collector you point at. That is a materially different adoption risk from a proprietary-format platform, and it is checkable: read a span and see whether it is an OTel span.

The second reason is the coding-agent path. `openlit coding install --vendor=claude-code` (or `cursor`, `codex`, `opencode`) instruments agent sessions that happen in a terminal rather than in your application, which is where a lot of engineering work now happens and where application-level SDKs see nothing.

## Architecture

Two deployment surfaces. The SDK (`pip install openlit`, then `openlit.init()`) monkey-patches supported providers, frameworks and vector databases to emit spans and metrics, with 70+ integrations spanning the OpenAI Agents SDK, LangGraph, CrewAI and the coding agents. The platform is a docker-compose stack started with `docker compose up -d`, serving a UI on port 3000 and an OTLP HTTP receiver on 4318; a Python SDK default of `http://127.0.0.1:4318` is the whole configuration for a local install.

The separation matters operationally: the SDK writes OTLP, the collector receives it, and the UI queries whatever store the compose stack provisions. Because the boundary is a standard protocol, the collector can fan out — send to OpenLIT for the agent-specific views and to Tempo or Datadog for organisational retention, from the same instrumentation.

Guardrails and the rule engine run at the platform layer rather than in the client, which is what allows a policy change without redeploying the agent; the vault exists so the rules and prompt management can reference secrets the agent never holds.

## Ecosystem Position

The nearest neighbour is `openllmetry` (Traceloop), which is also OTel-native and also emits LLM spans — the difference is packaging: OpenLLMetry is instrumentation plus a backend-agnostic exporter, OpenLIT is instrumentation plus a platform with an opinionated store and UI. Against `langfuse` and `langsmith-platform` the boundary is the data model rather than features: those define their own trace format and give you a richer evaluation product, while OpenLIT keeps the format standard and trails on evaluation depth.

Against `phoenix` (Arize) the overlap is evaluation and tracing on OTel foundations, with Phoenix stronger on the notebook-driven experiment loop and OpenLIT stronger on the agent and GPU-monitoring side. Self-hosting is not a differentiator here — all four run in your infrastructure — so the choice comes down to whether organisational observability already exists, in which case OTel-native wins, or is being created for this project, in which case a purpose-built product is less work.

## Getting Started

```bash
git clone https://github.com/openlit/openlit.git
cd openlit && docker compose up -d      # UI on http://127.0.0.1:3000, OTLP on :4318
```

```bash
pip install openlit                     # or: npm install openlit
export OTEL_EXPORTER_OTLP_ENDPOINT="http://127.0.0.1:4318"
```

```python
import openlit
openlit.init()   # instruments supported providers, frameworks and vector DBs
```

For coding agents, add the CLI and check it worked before trusting the traces:

```bash
curl -fsSL https://raw.githubusercontent.com/openlit/openlit/main/cli/scripts/install.sh | sh
openlit configure --endpoint http://127.0.0.1:4318
openlit coding install --vendor=all && openlit doctor
```

`openlit doctor` is the step people skip; a CLI-style agent that is not emitting spans looks identical to one whose instrumentation failed to install, and the doctor command distinguishes them.

## Key Use Cases

1. **Bolting agent spans onto an existing observability estate**: a platform team that already runs a collector can have tool calls, retrieval steps and token counts appear in the dashboards their on-call rota already watches, instead of standing up a second place nobody looks at.
2. **Reconstructing what a coding agent did**: instrumenting a terminal agent records the file edits and shell invocations inside a session, which is the only durable record of why an unfamiliar diff exists.
3. **Policy changes without redeploys**: prompt-injection and topic filtering run in the platform, so a rule can be tightened against observed traffic while the agent binary stays untouched.
4. **Economics of a self-hosted model**: per-call token accounting next to utilisation and memory pressure on NVIDIA, AMD and Intel accelerators turns "is this cheaper than the API" from an argument into a chart.
5. **A gate in the pipeline**: judge and programmatic checks replayed over recorded traffic, scoring a prompt revision against the previous one before it reaches users.
## Strengths

- The telemetry is standard OTLP, which is the difference between an adoption you can reverse and one you cannot: swapping the backend is a configuration change, not a re-instrumentation.
- One command to start the whole platform locally (`docker compose up -d`), and one line to instrument (`openlit.init()`), so the time from "is this useful" to "here is our data" is minutes.
- Real breadth in what gets instrumented — 70+ integrations covering LLM providers, agent frameworks, vector databases and coding agents — which matters because a trace with a missing span is worse than no trace.
- Guardrails, prompt hub and rule engine in the same system as the traces means policy decisions can reference the data that motivated them.
- GPU monitoring alongside token costs makes self-hosted inference legible; most competitors stop at the API bill.
- Apache-2.0 with no paid tier gating the core, so a self-hosted proof of concept does not start with a procurement conversation.

## Limitations

- **Collector literacy is assumed.** An OTLP endpoint, a collector pipeline and span context are prerequisites the quickstart does not teach; a first-time team burns a day on vocabulary before the first trace lands, and the docs are written for readers who already have it.
- **170 open issues, no vendor SLA.** Nothing stands behind the project but the maintainers' attention. When a blocker appears while you are debugging a production agent, the escalation path is a GitHub thread — budget for that, or keep a second backend warm.
- **Evaluation is the weak flank.** Datasets, experiment comparison and evaluator curation exist but are shallow relative to purpose-built evaluation products, so the sane arrangement is this project for spans and a specialist next to it for judge design and regression datasets.
- **Monkey-patching breaks quietly on upgrades.** `openlit.init()` instruments third-party libraries at import time, so a provider SDK release can change the shape of a span, or drop one, without an error. Pin the instrumented SDKs together and re-verify after upgrades.
- **The UI moved faster than the API.** Screens and navigation changed repeatedly through 2026 as the pitch shifted from LLM observability to agent-harness engineering; bookmarks and dashboard muscle memory do not survive a minor release.
- **You still operate a store.** Compose brings up several services plus a database; span volume grows, retention is a decision you make, and upgrades are yours — the same operational load as any self-hosted alternative.
## Relation to the Arsenal

Read it beside `openllmetry` (the instrumentation-only OTel path), `langfuse` and `langsmith-platform` (proprietary trace formats with deeper evaluation) and `phoenix` (OTel-based evaluation, stronger on experiments). The dividing question is whether an OTel backend already exists in your organisation: if it does, OpenLIT's spans join it and the platform is optional; if it does not, you are choosing a backend, and the evaluation depth of the alternatives gets more weight than the data format.

## Resources

- [GitHub](https://github.com/openlit/openlit)
- [Documentation](https://docs.openlit.io/)
- [Agent observability guide](https://docs.openlit.io/latest/openlit/observability/agents/overview)
- [Comparison pages](https://openlit.io/compare)
