---
id: "evaluation"
title: "Evaluation Tools"
entry_type: "guide"
section: "tools"
description: "Curated tools for evaluation workflows in AI engineering"
tags:
  - llm
  - data
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

This guide compares tools for the `evaluation` job. Use it as a routing page, then open the linked canonical project or tool entry for full details.

## Why It's in the Arsenal

Every model, prompt and agent change is a hypothesis, and without an offline signal the only way to learn whether it helped is to ship it. Grouping by this job makes the tooling findable at the point where the gap is felt, and keeps offline eval, runtime tracing and online metrics distinguishable rather than bundled as one thing.

## Key Features

- Entries are grouped by what they measure: offline suites, runtime tracing, and online metrics answer different questions and are not substitutes.
- LLM-as-judge entries are included with their known bias profile rather than presented as neutral scoring.
- Every entry states whether it needs a task-specific scorer set, since a generic benchmark measures the tool rather than your product.

## Architecture / How It Works

The shortlist is derived from the evaluation and observability facets on each tool entry. The comparison axis is what gets measured rather than which tool is larger: an offline suite, a runtime trace and an online metric can all be green while the product is broken, so they are listed as distinct categories rather than one ranking.

## Getting Started

```bash
# Pick one tool from the shortlist and validate it with a small proof of concept.
```

## Tool Shortlist

### RAGAS — 🔄

> **TL;DR:** RAGAS is a candidate for `evaluation` workflows. Full details: [RAGAS](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [RAGAS](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)
**Alternatives:** DeepEval, LangSmith Evals, Phoenix Evals, Promptfoo, Giskard

### DeepEval — 🔄

> **TL;DR:** DeepEval is a candidate for `evaluation` workflows. Full details: [DeepEval](../../projects/benchmarks-and-evals/deepeval.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [DeepEval](../../projects/benchmarks-and-evals/deepeval.md)
**Alternatives:** RAGAS, LangSmith Evals, Phoenix Evals, Promptfoo, Giskard

### LangSmith Evals — 🔄

> **TL;DR:** LangSmith Evals is a candidate for `evaluation` workflows. Full details: [LangSmith Evals](../evaluation-and-observability/langsmith.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [LangSmith Evals](../evaluation-and-observability/langsmith.md)
**Alternatives:** RAGAS, DeepEval, Phoenix Evals, Promptfoo, Giskard

### Phoenix Evals — 🔄

> **TL;DR:** Phoenix Evals is a candidate for `evaluation` workflows. Full details: [Phoenix Evals](../../projects/benchmarks-and-evals/phoenix.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Phoenix Evals](../../projects/benchmarks-and-evals/phoenix.md)
**Alternatives:** RAGAS, DeepEval, LangSmith Evals, Promptfoo, Giskard

### Promptfoo — 🔄

> **TL;DR:** Promptfoo is a candidate for `evaluation` workflows. Full details: [Promptfoo](../evaluation-and-observability/promptfoo.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Promptfoo](../evaluation-and-observability/promptfoo.md)
**Alternatives:** RAGAS, DeepEval, LangSmith Evals, Phoenix Evals, Giskard

### Giskard — 🔄

> **TL;DR:** Giskard is a candidate for `evaluation` workflows. Full details: [Giskard](../evaluation-and-observability/giskard.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Giskard](../evaluation-and-observability/giskard.md)
**Alternatives:** RAGAS, DeepEval, LangSmith Evals, Phoenix Evals, Promptfoo


<!-- AUTO-GENERATED MATCHING TOOLS BELOW — do not edit -->
This table is exhaustive for tools tagged with job = evaluation.

| Tool | Phase | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|
| [Agentic Security](../evaluation-and-observability/agentic-security.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [AgentOps](../evaluation-and-observability/agentops.md) | evaluation and observability | freemium | Yes | No | Yes | python | watching |
| [AI Infra Guard](../evaluation-and-observability/ai-infra-guard.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | use-with-caution |
| [any-agent](../orchestration/any-agent.md) | orchestration | open-source | Yes | Yes | Yes | python | solid-choice |
| [Argilla](../data-ingestion/argilla.md) | data ingestion | open-source | Yes | Yes | Yes | python | recommended |
| [Astra Autonomous Pentest](../evaluation-and-observability/astra-autonomous-pentest.md) | evaluation and observability | paid | No | No | No | python | watching |
| [Code Arena](../evaluation-and-observability/code-arena.md) | evaluation and observability | freemium | Yes | No | No | python | watching |
| [Deepchecks](../evaluation-and-observability/deepchecks.md) | evaluation and observability | freemium | Yes | Yes | Yes | python | solid-choice |
| [EvalScope](../evaluation-and-observability/evalscope.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Evidently](../evaluation-and-observability/evidently.md) | evaluation and observability | freemium | Yes | Yes | Yes | python | recommended |
| [FuzzyAI](../evaluation-and-observability/fuzzyai.md) | evaluation and observability | open-source | Yes | Yes | Yes | polyglot | use-with-caution |
| [Galileo](../evaluation-and-observability/galileo.md) | evaluation and observability | freemium | Yes | No | No | python | solid-choice |
| [garak (NVIDIA)](../evaluation-and-observability/garak.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard](../evaluation-and-observability/giskard.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard OSS](../evaluation-and-observability/giskard-oss.md) | evaluation and observability | open-source | No | Yes | Yes | python | watching |
| [Humanloop](../evaluation-and-observability/humanloop.md) | evaluation and observability | paid | No | No | No | python, typescript | solid-choice |
| [Inspect (UK AI Safety Institute)](../evaluation-and-observability/inspect-ai.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Inspect Petri](../evaluation-and-observability/inspect-petri.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | watching |
| [Laminar](../evaluation-and-observability/laminar.md) | evaluation and observability | open-source | Yes | Yes | Yes | typescript, python | solid-choice |
| [LangSmith](../evaluation-and-observability/langsmith.md) | evaluation and observability | freemium | Yes | No | No | python, typescript | recommended |
| [LangWatch](../evaluation-and-observability/langwatch.md) | evaluation and observability | open-source | Yes | Yes | Yes | python, typescript | solid-choice |
| [LM Evaluation Harness (EleutherAI)](../evaluation-and-observability/lm-evaluation-harness.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | best-in-class |
| [Monako Glass](../evaluation-and-observability/monako-glass.md) | evaluation and observability | paid | No | No | No | python | watching |
| [OpenAI Evals](../evaluation-and-observability/openai-evals.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [OpenJudge](../evaluation-and-observability/openjudge.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [Prompt flow (Microsoft)](../orchestration/promptflow.md) | orchestration | open-source | Yes | Yes | Yes | python | solid-choice |
| [promptfoo](../evaluation-and-observability/promptfoo.md) | evaluation and observability | open-source | Yes | Yes | Yes | typescript | recommended |
| [Prompty](../dx-and-tooling/prompty.md) | dx and tooling | open-source | Yes | Yes | Yes | typescript, python | solid-choice |
| [PyRIT](../evaluation-and-observability/pyrit.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Ragas](../evaluation-and-observability/ragas.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [TruLens](../evaluation-and-observability/trulens.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [UltraEval-Audio](../evaluation-and-observability/ultraeval-audio.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [UpTrain](../evaluation-and-observability/uptrain.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | use-with-caution |
| [UQLM](../evaluation-and-observability/uqlm.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [Vellum](../dx-and-tooling/vellum.md) | dx and tooling | freemium | Yes | No | No | python | solid-choice |
| [Weights & Biases Weave](../evaluation-and-observability/wandb-weave.md) | evaluation and observability | freemium | Yes | No | No | python | solid-choice |
| [Weights & Biases](../model-layer/weights-biases.md) | model layer | freemium | Yes | No | No | python | recommended |
<!-- AUTO-GENERATED MATCHING TOOLS ABOVE — do not edit -->

## Use Cases

1. **Scenario**: you need to know whether a prompt or model change improved anything, and you have no reliable offline test set.
2. **Scenario**: an agent ships a regression and you need eval tooling that catches it before your users do.
3. **Scenario**: you are choosing between scoring approaches and need to know which failure modes each one can and cannot see.

## Strengths

- Separates the tooling categories that get conflated: offline eval suites, runtime tracing, and online metrics answer different questions.
- Includes the LLM-as-judge family with its known bias profile rather than presenting it as neutral scoring.
- Notes that a metric without a task-specific scorer set measures the tool, not the product.

## Limitations / When NOT to Use

- LLM-as-judge scores correlate with human preference but not perfectly, and the gap widens on the subjective tasks most likely to matter to you.
- Every tool here needs a task-specific scorer set; a generic benchmark tells you about the tool, not about your product.
- Eval tooling measures what you choose to measure, so a green suite is evidence about coverage rather than about quality.

## Integration Patterns

- Link an eval tool here from the model-layer and orchestration entries, since those are where a regression is usually introduced.
- When a build example adds a gate, reference the tool it uses here so the pattern and the tool stay linked.

## Resources

- [RAGAS](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)
- [DeepEval](../../projects/benchmarks-and-evals/deepeval.md)
- [LangSmith Evals](../evaluation-and-observability/langsmith.md)
- [Phoenix Evals](../../projects/benchmarks-and-evals/phoenix.md)
- [Promptfoo](../evaluation-and-observability/promptfoo.md)
- [Giskard](../evaluation-and-observability/giskard.md)

## Buzz & Reception

This page is maintained as a curated shortlist, not a popularity ranking.

---
*Last reviewed: 2026-06-13 by @maintainer*
