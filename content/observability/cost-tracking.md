---
id: "cost-tracking"
title: "Cost Tracking"
entry_type: "guide"
section: "observability"
description: "Guide to token cost math and cost observability for LLM applications"
tags:
  - observability
  - cloud
  - inference
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

LLM cost tracking means attributing spend to models, users, features, prompts, environments, and workflows.

The goal is not just to know the bill. The goal is to catch regressions when prompts grow, retrieval adds too much context, agents loop, or a model route escalates too often.

## Why It's in the Arsenal

AI unit economics can break silently. A prompt change or agent retry loop can multiply costs before users notice quality changes.

## Key Features

### Token cost math

```text
request_cost = (input_tokens / 1_000_000 * input_price_per_1m)
             + (output_tokens / 1_000_000 * output_price_per_1m)
```

For a feature:

```text
feature_cost = sum(request_cost for all calls in workflow)
cost_per_success = total_feature_cost / successful_user_outcomes
```

### Manual tracking template

| Date | Feature | Model | Input Tokens | Output Tokens | Cost | User/Team | Notes |
|---|---|---:|---:|---:|---:|---|---|
| YYYY-MM-DD | support-rag | model-name | 0 | 0 | $0.00 | team | note |

## Architecture / How It Works

Cost tracking works best when every trace includes:

- model name
- provider
- prompt version
- feature name
- environment
- user/team/tenant ID
- input tokens
- output tokens
- latency
- success/failure state

Tools with cost dashboards or cost attribution include Langfuse, LangSmith, Helicone, Braintrust, and several gateway/proxy platforms.

## Getting Started

```bash
# Add cost tags before optimization.
# You cannot optimize what you do not attribute.
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

- [Langfuse](../projects/benchmarks-and-evals/langfuse.md) — sdk/self-host
- [LangSmith](../projects/benchmarks-and-evals/langsmith-platform.md) — platform/managed
- [Phoenix](../projects/benchmarks-and-evals/phoenix.md) — otel-native
- [Helicone](../projects/benchmarks-and-evals/helicone.md) — proxy
- [Opik](../projects/benchmarks-and-evals/opik.md) — platform
- [OpenLIT](../projects/benchmarks-and-evals/openlit.md) — otel-native
- [OpenLLMetry](../projects/benchmarks-and-evals/openllmetry.md) — otel-native
- [Lunary](../projects/benchmarks-and-evals/lunary.md) — sdk
- [Braintrust](../projects/benchmarks-and-evals/braintrust.md) — platform/eval-first
- [Agenta](../projects/benchmarks-and-evals/agenta.md) — platform

## Buzz & Reception

Observability is now a core production requirement for LLM apps because model behavior, retrieval quality, latency, and cost can all regress independently.

---
*Last reviewed: 2026-06-13 by @maintainer*

