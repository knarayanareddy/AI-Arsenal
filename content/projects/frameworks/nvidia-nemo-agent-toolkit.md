---
id: nvidia-nemo-agent-toolkit
name: "NeMo-Agent-Toolkit"
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "NVIDIA's library for connecting LLMs to tools and data, with profiling, guardrails, and evaluation built into the agent workflow"
github_url: "https://github.com/NVIDIA/NeMo-Agent-Toolkit"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "NVIDIA"
tags: [agents, tool-use, guardrails]
maturity: production
cost_model: open-source
github_stars: 2647
github_stars_last_30d: 0
trending_score: 27
last_commit: "2026-09-26"
docs_url: "https://docs.nvidia.com/nemo/agent-toolkit/latest/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Toolkit for connecting LLMs to enterprise systems and data, with profiling and guardrail hooks that let an agent stack be tuned and wrapped for production use."
best_for:
  - "You need to profile where an agent spends its tokens and wall clock before optimizing, since the telemetry is the point of the toolkit."
  - "You are connecting an LLM to enterprise systems and want a defined tool interface rather than ad hoc function calling."
  - "You need guardrails and evaluation hooks around a production agent, added at the framework layer rather than in application code."
avoid_if:
  - "You want a minimal agent loop you can read in an afternoon, since this is a framework with configuration, plugins, and a learning curve."
  - "You are on non-NVIDIA hardware with no plan to use NeMo or NGC services, since parts of the ecosystem assume that stack."
  - "Your agent is a single classification call with one tool, where a full multi-agent framework is heavy machinery for one decision."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (2647), Apache-2.0 license, last commit 2026-09-26, and primary language Python were read from the GitHub API; the topics array is empty upstream. Profiling of steps and tool calls, guardrail middleware, multi-agent handoffs, and the evaluation layer come from the official docs and examples; no agent was run and no provider key was used here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/NeMo-Agent-Toolkit", "date": "2026-09-28", "description": "2,647 stars and last commit 2026-09-26 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

The NeMo Agent toolkit is an open-source library for building agents and tool-using workflows on top of large language models. It provides connectors to data sources and enterprise systems, a tool interface for wrapping functions and services, and support for multi-agent setups where specialists hand work to each other. Its distinguishing features are operational: built-in profiling of each agent step and tool call, integration with guardrails for input and output filtering, and evaluation tooling so a change to a prompt or a tool can be measured rather than argued about. It fits into the wider NeMo ecosystem, so retrieval, guard models, and alignment tooling are available as components, and it is designed to run against both hosted models and self-hosted ones on NVIDIA infrastructure.

## Why it's in the Arsenal

The decision it resolves is that agent quality is an engineering problem, not a prompting problem. When an agent is slow or wrong, the usual response is to change the prompt, which produces a change with no measurement attached and no way to know whether it helped. Putting profiling, evaluation, and guardrails at the framework level means every step's token count, latency, and tool-call outcome is recorded as data, so tuning becomes a loop against a metric. The second reason is integration cost: connecting an LLM to a real enterprise system involves authentication, retries, schema handling, and rate limits, and a maintained connector library absorbs that once instead of per project. The third is that guardrails applied outside the agent loop are easy to bypass, whereas a hook inside the framework sees every input and output.

## Architecture

The toolkit is a Python library with a configuration-driven runtime. Agents and tools are defined as classes or functions registered with the framework, and a tool call is marshalled through a schema that validates arguments, handles errors, and records the result. The agent loop is instrumented: each turn records model input and output tokens, wall-clock latency per step and per tool, and the tool arguments and return, which are the fields the profiler aggregates. Guardrails attach as middleware around model calls and tool calls, so a filter can inspect or rewrite content at both boundaries. Multi-agent workflows are expressed as a graph of agents with explicit handoffs, and the evaluation layer runs a defined question set through the agent and scores outputs with metrics or a judge model. The runtime targets NVIDIA inference stacks but can call any OpenAI-compatible endpoint, and profiling output can be shipped to an observability backend for aggregation.

## Ecosystem Position

The toolkit overlaps with the language-specific agent frameworks in the same phase, and it competes with general-purpose evaluation platforms by making profiling, guardrails, and evaluation part of the framework rather than a separate product. It is a rather than an alternative to an in-house agent wrapper, since the connectors absorb the authentication and schema work that every enterprise tool call otherwise repeats. It complements the inference-engine phase, where the endpoint it calls is served, and the observability phase, where its profiler output is aggregated. Its main rival in practice is doing none of this and calling the provider SDK directly, which is cheaper until the first incident.

## Getting Started

Install the toolkit and run a tool-using agent with profiling enabled:

```bash
pip install nemo-agent-toolkit
# provider credentials and, if using NeMo services, an NGC API key
export OPENAI_API_KEY=...
```

```bash
# run the included example agent
python examples/getting_started/agent_with_tool.py \
    --profiling --output-dir ./agent_profile
```

```python
# define a tool, then an agent that may call it
@function_tool
def lookup_inventory(sku: str) -> dict:
    """Return stock levels for a SKU."""
    return {"sku": sku, "on_hand": 12}

agent = Agent(
    name="inventory-agent",
    llm="gpt-4o",
    tools=[lookup_inventory],
    profiler=Profiler(enabled=True, output_dir="./agent_profile"),
)

result = await agent.run("How many units of SKU A-4472 are in stock?")
print(result.output, result.usage)   # tokens and per-step latency recorded
```

```bash
# evaluate a prompt or tool change against a question set
python -m nemo_agent_toolkit.eval \
    --agent-config ./config.yaml --dataset ./eval_questions.jsonl
```

## Key Use Cases

1. Diagnosing an agent that is slow or expensive, using per-step and per-tool latency and token records rather than guesswork.
2. Connecting an LLM to an internal system through a typed tool schema, so argument validation and error handling live in one place.
3. Adding input and output guardrails to a production agent at the framework layer, so the filter cannot be bypassed by a code path that forgot it.

## Strengths

- Profiling, guardrails, and evaluation are part of the framework, so measuring and hardening an agent is a config change rather than a side project.
- Typed tool schemas with validation and error handling absorb the integration work that every enterprise tool call repeats.
- Explicit multi-agent handoffs, which makes a multi-agent topology reviewable instead of emergent.
- Connector coverage for common enterprise data sources, so authentication and schema handling are solved once.

## Limitations

The framework carries real weight: configuration, plugin registration, and its own conventions are a day of reading before the first tool call, which is a poor trade for a simple two-step agent. The NVIDIA orientation means parts of the wider ecosystem assume NeMo services or NVIDIA hardware, and while the model call is OpenAI-compatible, the surrounding tooling is less portable than a framework that is vendor-neutral by construction. The evaluation story is only as good as the question set you write, so an agent can look well-evaluated against thirty easy questions while failing in production. Profilers and middleware add latency and can mask the behavior you are trying to measure, and a large plugin surface is where version upgrades tend to break things. It is also young enough that its APIs have moved between releases.

## Relation to the Arsenal

This is a framework-phase entry in the agent-systems category, and it is the NVIDIA-ecosystem counterpart to the language-specific agent frameworks in the same phase rather than a replacement for them. It pulls in the retrieval entries for grounding, the observability entries for tracing where its profiler output is aggregated, and the model entries in foundation-models for the endpoint it calls. Because it also touches the benchmarks-and-evals phase through its evaluation layer, it is one of the few entries here that spans framework and eval concerns, which is exactly the point of the design.

## Resources

- [NeMo Agent toolkit GitHub repository](https://github.com/NVIDIA/NeMo-Agent-Toolkit)
- [NeMo Agent toolkit documentation](https://docs.nvidia.com/nemo/agent-toolkit/latest/)
- [NeMo Agent toolkit examples](https://github.com/NVIDIA/NeMo-Agent-Toolkit/tree/main/examples)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (2,647 stars, last commit 2026-09-26, license Apache-2.0, verified via GitHub API on 2026-09-28)*
