---
id: laminar
name: Laminar
type: tool
job:
- tracing
- monitoring
- evaluation
description: OpenTelemetry-based tracing, evaluation, datasets, and monitoring for
  LLM and agent applications
url: https://laminar.sh
cost_model: open-source
pricing_detail: Apache-2.0 core; hosted plans and provider/API costs are separate
tags:
- observability
- tracing
- monitoring
- evaluation
- agents
maturity: beta
stack:
- typescript
- python
free_tier: true
free_tier_limits: Self-host the open-source stack or use the hosted service; model
  calls remain billable
self_hostable: true
open_source: true
source_url: https://github.com/lmnr-ai/lmnr
docs_url: https://laminar.sh
github_url: https://github.com/lmnr-ai/lmnr
alternatives:
- langsmith
- wandb-weave
integrates_with: []
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- prototype
- production
best_when:
- You need spans that preserve agent steps, LLM calls, tool calls, latency, and token
  information for debugging
- You want to turn captured traces into annotated datasets and evaluations instead
  of maintaining separate logging and labeling systems
avoid_when:
- Your organization requires a mature self-hosted control plane and has not verified
  parity with Laminar's managed product
- You cannot send prompts, tool arguments, or model outputs to a system whose retention
  and redaction behavior you have not reviewed
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: solid-choice
verdict_rationale: A focused AI trace-to-evaluation workflow with both SDKs and a
  Docker Compose self-hosting path
status: active
---

## Overview

Laminar is an AI observability platform that captures OpenTelemetry-style traces from LLM and agent applications, then makes those traces useful for evaluation, annotation, datasets, and custom dashboards. The repository presents a self-hostable Docker Compose deployment alongside a managed Laminar service, so the deployment choice is part of the adoption decision.

## Why It's in the Arsenal

Laminar is worth cataloging because it treats an agent trace as the beginning of an improvement loop rather than a terminal log line. Its README connects tracing with dataset creation, signals, evaluations, MCP support, and a CLI, giving teams a concrete path from a failed tool call to a labeled example without first exporting events into an unrelated annotation product.

## Key Features

The platform records model and tool spans, supports Python and TypeScript SDKs, offers trace inspection, custom signals, dataset annotation, evaluations, MCP-related workflows, and dashboards. The project also documents an isolated local deployment, which matters for teams that need to test instrumentation before deciding whether a hosted control plane is acceptable.

## Architecture / How It Works

Application SDKs emit structured spans to a Laminar backend, where traces can be searched, rendered, scored, and promoted into datasets. The trace model follows OpenTelemetry concepts while adding AI-specific attributes such as prompts, completions, token usage, and agent/tool relationships. Docker Compose provides the local service topology; the managed product is a separate operational boundary.

## Getting Started

The repository's self-hosting path starts the local services with Docker Compose:

```bash
git clone https://github.com/lmnr-ai/lmnr.git
cd lmnr
docker compose up -d
```

Then configure the SDK's `baseUrl` and ports as described in the self-hosting guide, install the SDK for the application language, and send a test trace before enabling prompt or output capture for sensitive workloads.

## Use Cases

Laminar fits an agent team debugging why a tool loop stalls, a support team labeling real conversations for an offline evaluator, or an inference team comparing latency and token cost across provider changes. It is especially useful when the same trace needs both human annotation and automated scoring, rather than only a time-series metric.

## Strengths

The trace-to-dataset path is more concrete than generic application logging, and the OpenTelemetry orientation gives the emitted spans a familiar interoperability target. First-class attention to agent sessions, MCP, evaluations, and annotation also matches the failure modes of multi-step systems better than a dashboard that only records one request and one response.

## Limitations / When NOT to Use

Self-hosting is not equivalent to feature parity with the managed Laminar service; verify which integrations, authentication controls, upgrades, and retention policies are available in the deployment you will operate. Captured prompts, tool arguments, and outputs can contain secrets or personal data, so redaction, access control, and retention must be designed before broad instrumentation.

## Integration Patterns

Instrument the agent boundary and provider client first, attach stable run and dataset identifiers, and export only the fields needed for evaluation. Pair Laminar with an inference gateway for routing and with a security scanner for adversarial tests; use the resulting traces to promote representative failures into regression cases.

## Buzz & Reception

3,100 GitHub stars verified during the 2026-07-19 discovery sweep; YC-backed project with an open-source self-hosting path and a separate managed service.

## Resources

- [Laminar](https://laminar.sh)
- [GitHub](https://github.com/lmnr-ai/lmnr)
- [Tracing documentation](https://laminar.sh/docs/tracing/introduction)
- [Self-hosting guide](https://laminar.sh/docs/hosting-options#self-hosted-docker-compose)
