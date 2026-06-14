---
id: "evaluation-pipelines"
title: "Evaluation Pipelines"
entry_type: "guide"
section: "observability"
description: "Guide to repeatable LLM, RAG, and agent evaluation workflows"
tags:
  - evaluation
  - observability
  - rag
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

Evaluation pipelines turn AI quality expectations into repeatable checks that can run before and after deployment.

For RAG and agents, evaluations should inspect more than final answers. They should also inspect retrieved context, tool calls, faithfulness, latency, and cost.

## Why It's in the Arsenal

LLM apps regress in non-obvious ways. Evaluation pipelines create a feedback loop between production failures, datasets, scorers, traces, and release decisions.

## Key Features

### What to evaluate

| Layer | What to Check | Example Tooling |
|---|---|---|
| Retrieval | relevance, recall, context precision | RAGAS, Phoenix |
| Generation | correctness, faithfulness, style | DeepEval, Braintrust, Opik |
| Agents | tool correctness, loop avoidance, final outcome | LangSmith, Langfuse, Phoenix |
| Cost/latency | token budget, time to first token | Helicone, Langfuse, Braintrust |

## Architecture / How It Works

A practical evaluation pipeline:

1. Capture production traces.
2. Promote failures or edge cases into a versioned dataset.
3. Run deterministic checks where possible.
4. Add model-graded scores only where human labels are too expensive.
5. Gate prompt/model/retriever changes in CI.
6. Review score drift with trace examples, not just averages.

## Getting Started

```bash
# Pseudocode CI flow
# 1. load eval dataset
# 2. run app version against dataset
# 3. score outputs
# 4. fail build if critical score drops
```

Recommended starting points:

- RAG quality: RAGAS or Phoenix evals
- General LLM app tests: DeepEval or Braintrust
- LangGraph/LangChain workflows: LangSmith plus custom eval datasets
- Prompt regression: Opik, Agenta, Braintrust, or Langfuse

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

