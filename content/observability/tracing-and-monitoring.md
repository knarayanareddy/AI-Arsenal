---
id: "tracing-and-monitoring"
title: "Tracing and Monitoring"
entry_type: "guide"
section: "observability"
description: "Comparison of tracing approaches for LLM and agent systems"
tags:
  - observability
  - tracing
  - monitoring
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

Tracing shows the sequence of model calls, retrieval calls, tool calls, parser steps, errors, and retries that produced an AI system output.

Monitoring turns those traces into operational signals: latency, cost, error rates, quality regressions, and usage patterns.

## Why It's in the Arsenal

AI failures are often distributed across prompts, retrieval, tools, and model behavior. Traces are the fastest way to isolate the failing layer.

## Key Features

| Tool | Approach | Self-host | Evaluation | Best Fit |
|---|---|---|---|---|
| Langfuse | SDK / integrations | Yes | Yes | Open-source full-lifecycle observability |
| LangSmith | Managed platform | No | Yes | LangChain/LangGraph teams |
| Phoenix | OTel-native | Yes | Yes | RAG and agent debugging |
| Helicone | Proxy | Yes / Cloud | Limited | Fast request/cost logging |
| Opik | Platform | Yes | Yes | Prompt/eval-centered workflows |
| OpenLIT | OTel-native | Yes | Yes | OTel plus GPU monitoring |
| OpenLLMetry | OTel-native instrumentation | Yes | No | Vendor-neutral instrumentation |
| Lunary | SDK | Yes / Cloud | Limited | Chatbot/RAG analytics |
| Braintrust | Managed platform | No | Yes | Eval-first teams |
| Agenta | Platform | Yes / Cloud | Yes | Prompt collaboration and evals |

## Architecture / How It Works

### SDK approach

- Add a library to application code.
- Best for deep spans: tool calls, retrievers, prompt versions, custom metadata.
- Examples: Langfuse, Lunary.

### Proxy approach

- Route model-provider traffic through a gateway.
- Best for fast rollout and cost/request logging across services.
- Example: Helicone.

### OTel-native approach

- Emit OpenTelemetry spans that can flow into standard collectors/backends.
- Best for teams with existing observability platforms.
- Examples: Phoenix, OpenLIT, OpenLLMetry.

### Platform approach

- Use a hosted or self-hosted product that combines traces, evals, datasets, prompts, and collaboration.
- Examples: LangSmith, Braintrust, Opik, Agenta.

## Getting Started

```bash
# Start with tracing one production-critical path.
# Then add cost tags and eval scores after traces are visible.
```

## Use Cases

1. **Scenario**: Selecting an observability stack before launching an LLM application
2. **Scenario**: Debugging quality, cost, and latency problems in production

## Strengths

- Gives engineers a shared vocabulary for observability tradeoffs
- Links directly to canonical tool/project entries

## Limitations / When NOT to Use

- Does not replace hands-on evaluation with your own traces
- Pricing, limits, and hosted/self-hosted features must be verified before purchase

## Integration Patterns

- Instrument model calls, retrievers, tool calls, and agent state transitions.
- Attach user, session, environment, feature, model, and prompt-version metadata.
- Convert production failures into evaluation examples.

## Resources

- [Langfuse](../projects/observability/tracing/langfuse.md) — sdk/self-host
- [LangSmith](../projects/observability/tracing/langsmith-platform.md) — platform/managed
- [Phoenix](../projects/observability/tracing/phoenix.md) — otel-native
- [Helicone](../projects/observability/tracing/helicone.md) — proxy
- [Opik](../projects/observability/tracing/opik.md) — platform
- [OpenLIT](../projects/observability/tracing/openlit.md) — otel-native
- [OpenLLMetry](../projects/observability/tracing/openllmetry.md) — otel-native
- [Lunary](../projects/observability/tracing/lunary.md) — sdk
- [Braintrust](../projects/observability/tracing/braintrust.md) — platform/eval-first
- [Agenta](../projects/observability/tracing/agenta.md) — platform

## Buzz & Reception

Observability is now a core production requirement for LLM apps because model behavior, retrieval quality, latency, and cost can all regress independently.

---
*Last reviewed: 2026-06-13 by @maintainer*

