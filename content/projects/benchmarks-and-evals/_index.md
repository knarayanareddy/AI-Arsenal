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

- [openinference](./arize-ai-openinference.md)
- [evalplus](./evalplus-evalplus.md)
- [evaluate](./huggingface-evaluate.md)
- [SWE-bench](./swe-bench-swe-bench.md)
- [guidellm](./vllm-project-guidellm.md)
- [LightEval](./lighteval.md)
- [lmms-eval](./lmms-eval.md)
- [Pipelock](./pipelock.md)
- [BigCodeBench](./bigcodebench.md)
- [MTEB](./mteb.md)

### Most Popular

- [Langfuse](./langfuse.md) — ⭐ 29021
- [Opik](./opik.md) — ⭐ 19609
- [DeepEval](./deepeval.md) — ⭐ 16140
- [Ragas for RAG Evaluation](./ragas-rag-evaluation.md) — ⭐ 14355
- [Phoenix](./phoenix.md) — ⭐ 10124
- [OpenLLMetry](./openllmetry.md) — ⭐ 7000
- [SWE-bench](./swe-bench-swe-bench.md) — ⭐ 5928
- [Helicone](./helicone.md) — ⭐ 5809
- [lmms-eval](./lmms-eval.md) — ⭐ 4300
- [Agenta](./agenta.md) — ⭐ 3900

### Browse All

- [Agenta](./agenta.md) — Open-source LLMOps platform for prompt management, evaluation, observability, and playgrounds
- [openinference](./arize-ai-openinference.md) — OpenTelemetry semantic conventions and instrumentors for generative-AI spans, so LLM calls carry standard attributes regardless of which SDK issued them
- [BigCodeBench](./bigcodebench.md) — Code-generation benchmark testing diverse function calls and complex instructions across 139 libraries — the harder successor to HumanEval
- [Braintrust](./braintrust.md) — Managed eval-first platform for LLM traces, datasets, scorers, prompt experiments, and CI gates
- [DeepEval](./deepeval.md) — An open-source evaluation framework for testing LLM applications in CI
- [evalplus](./evalplus-evalplus.md) — Hardened successor to HumanEval and MBPP that adds far more test inputs to catch solutions passing weak tests
- [Helicone](./helicone.md) — Proxy-based LLM observability platform for logs, costs, caching, experiments, and analytics
- [evaluate](./huggingface-evaluate.md) — A metrics registry where each metric declares the columns it needs, so a score is computed the same way in every project that uses it
- [Langfuse](./langfuse.md) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- [LangSmith](./langsmith-platform.md) — Managed LangChain platform for tracing, evaluation, prompt workflows, and deployment feedback
- [LightEval](./lighteval.md) — Hugging Face's all-in-one LLM evaluation toolkit for running benchmarks across multiple inference backends with reproducible
- [lmms-eval](./lmms-eval.md) — Multimodal evaluation toolkit spanning text, image, video, and audio tasks and model adapters
- [Lunary](./lunary.md) — Open-source LLM observability and analytics platform for chatbots, RAG apps, and prompts
- [MTEB](./mteb.md) — The Massive Text Embedding Benchmark — the standard evaluation suite and leaderboard for embedding and reranker models across 1000+ tasks
- [OpenLIT](./openlit.md) — OpenTelemetry-native platform for LLM observability, GPU monitoring, evals, prompts, and guardrails
- [OpenLLMetry](./openllmetry.md) — OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop
- [Opik](./opik.md) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- [Phoenix](./phoenix.md) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
- [Pipelock](./pipelock.md) — AI-agent firewall for MCP, A2A, HTTP, and WebSocket egress with exfiltration and SSRF controls
- [Ragas for RAG Evaluation](./ragas-rag-evaluation.md) — Evaluation framework for measuring retrieval-augmented generation quality and regressions
- [SWE-bench](./swe-bench-swe-bench.md) — Real GitHub issues paired with hidden fail-to-pass and pass-to-pass test suites, and the harness that turns a patch into a resolution rate
- [Terminal-Bench](./terminal-bench.md) — Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models
- [guidellm](./vllm-project-guidellm.md) — Benchmark driver that sweeps concurrency against a live endpoint and reports the first-token and inter-token latency a real user waits on
