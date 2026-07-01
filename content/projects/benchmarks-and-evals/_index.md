---
title: "Benchmarks and Evals"
section: "projects/benchmarks-and-evals"
auto_generated: false
---

# Benchmarks and Evals

## What belongs here

Evaluation harnesses, LLM observability/tracing platforms, and RAG-specific evaluation frameworks — the tooling that tells you whether your AI system is working correctly, safely, or efficiently.

## What does NOT belong here

Data-labeling tools for building training data belong in [Data and Retrieval](../data-and-retrieval/_index.md); this folder is about judging behavior after the fact, not producing training data.

## Relation to the Tools vertical

Several entries here have a corresponding tool entry under `content/tools/evaluation-and-observability/` covering usage-oriented job guidance (e.g. langsmith, langfuse-prompts). Check each entry's `corresponding_tool_entry` field.

## Decision guidance

Before selecting an evaluation/observability platform:
- Key question to ask: do I need RAG-specific metrics (favor Ragas/DeepEval), general tracing (favor Langfuse/LangSmith/Phoenix), or OpenTelemetry-native instrumentation (favor OpenLIT/OpenLLMetry)?
- If you need usage guidance rather than architectural depth: see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md)
- See [Choose an Eval Framework](../../architectures/decision-trees/choose-eval-framework.md) and [Choose an Observability Tool](../../architectures/decision-trees/choose-observability-tool.md) for cross-cutting guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Benchmarks And Evals in This Phase

### Recently Added

- [Agenta](./agenta.md)
- [Braintrust](./braintrust.md)
- [DeepEval](./deepeval.md)
- [Helicone](./helicone.md)
- [Langfuse](./langfuse.md)
- [LangSmith](./langsmith-platform.md)
- [Lunary](./lunary.md)
- [OpenLIT](./openlit.md)
- [OpenLLMetry](./openllmetry.md)
- [Opik](./opik.md)

### Most Popular

- [Langfuse](./langfuse.md) — ⭐ 29021
- [Opik](./opik.md) — ⭐ 19609
- [DeepEval](./deepeval.md) — ⭐ 16140
- [Ragas for RAG Evaluation](./ragas-rag-evaluation.md) — ⭐ 14355
- [Phoenix](./phoenix.md) — ⭐ 10124
- [OpenLLMetry](./openllmetry.md) — ⭐ 7000
- [Helicone](./helicone.md) — ⭐ 5809
- [Agenta](./agenta.md) — ⭐ 3900
- [OpenLIT](./openlit.md) — ⭐ 2522
- [Braintrust](./braintrust.md) — ⭐ 0

### Browse All

- [Agenta](./agenta.md) — Open-source LLMOps platform for prompt management, evaluation, observability, and playgrounds
- [Braintrust](./braintrust.md) — Managed eval-first platform for LLM traces, datasets, scorers, prompt experiments, and CI gates
- [DeepEval](./deepeval.md) — An open-source evaluation framework for testing LLM applications in CI
- [Helicone](./helicone.md) — Proxy-based LLM observability platform for logs, costs, caching, experiments, and analytics
- [Langfuse](./langfuse.md) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- [LangSmith](./langsmith-platform.md) — Managed LangChain platform for tracing, evaluation, prompt workflows, and deployment feedback
- [Lunary](./lunary.md) — Open-source LLM observability and analytics platform for chatbots, RAG apps, and prompts
- [OpenLIT](./openlit.md) — OpenTelemetry-native platform for LLM observability, GPU monitoring, evals, prompts, and guardrails
- [OpenLLMetry](./openllmetry.md) — OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop
- [Opik](./opik.md) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- [Phoenix](./phoenix.md) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
- [Ragas for RAG Evaluation](./ragas-rag-evaluation.md) — Evaluation framework for measuring retrieval-augmented generation quality and regressions
