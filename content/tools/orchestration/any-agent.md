---
id: any-agent
name: "any-agent"
type: tool
job: [orchestration, evaluation]
description: "Mozilla AI's thin adapter layer that runs one agent interface across six different agent frameworks"
url: "https://mozilla-ai.github.io/any-agent/"
cost_model: open-source
pricing_detail: "Apache-2.0 open source (Mozilla AI); free (you pay your own LLM provider costs)"
tags: [evaluation, orchestration]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open source and free"
self_hostable: true
open_source: true
source_url: "https://github.com/mozilla-ai/any-agent"
docs_url: "https://docs.mozilla.ai/any-agent/"
github_url: "https://github.com/mozilla-ai/any-agent"
alternatives: [openai-agents-sdk, langchain, smolagents]
integrates_with: [openai-agents-sdk, langchain, smolagents, google-adk]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, research]
best_when: ["You are choosing between agent frameworks and need the same prompt, tool set and evaluation harness run against every candidate before you commit.", "You maintain an evaluation suite that must produce comparable numbers across LangChain, LlamaIndex and OpenAI Agents SDK runs rather than three bespoke scripts.", "You are a researcher who wants a minimal common surface to diff agent behaviour instead of each framework's own telemetry vocabulary."]
avoid_when: ["You just need a working agent loop for a new product, because the README explicitly steers new projects to the successor package mozilla-ai-tinyagent.", "You need new features, because the project is in soft deprecation and the maintainers will only take security and bug-fix pull requests.", "You are on Python 3.10, because the stated requirement is 3.11 or newer and the import surface assumes modern typing syntax."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (1,181), Apache-2.0 license, and last push (2026-07-01) verified via the GitHub API on 2026-07-08. Feature claims from official docs; not hands-on verified here."
verdict: solid-choice
verdict_rationale: "Useful meta-layer for evaluating and switching agent frameworks; by nature it trails each framework's bleeding edge"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/mozilla-ai/any-agent", "date": "2026-07-08", "description": "1,181 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

any-agent normalises six frameworks into one import: AgentConfig holds the system prompt, model identifier and framework name, while AnyAgent loads the matching backend at run time. Backed packages are Agno, Google ADK, LangChain, LlamaIndex, the OpenAI Agents SDK and smolagents, with TinyAgent available as the distilled core. Alongside the execution surface there are first-class concepts for tools, tracing, serving and evaluation, so the same declaration can be run behind a FastAPI-style endpoint or scored against a dataset without rewriting the agent.

## Why It's in the Arsenal

The recurring decision is whether a framework comparison is a fair comparison. Every framework ships its own message shape, its own tool-calling convention and its own notion of a trace, so a benchmark written twice silently measures two different things. any-agent's value is that the agent definition is written once and executed by whichever backend you name, letting a team hold a single prompt and tool list constant while swapping the executor underneath.

## Key Features

- One declarative config format removes per-framework glue code from evaluation harnesses.
- Optional install extras keep the dependency footprint proportional to the frameworks actually under test.
- Built-in tracing and evaluation concepts mean a scored run and a served run share one definition.
- Apache-2.0 licensing, so benchmark code can live inside a commercial repository.

## Architecture / How It Works

Configuration and execution are split: AgentConfig is a serialisable dataclass carrying instructions, model and framework choice, and AnyAgent is the loader that turns that config into a live backend client. Framework-specific code lives in optional install extras, so a pip install pulls only the adapters you asked for. Tracing hooks wrap the run, the serving layer exposes the same agent over HTTP, and the evaluation module drives a dataset against the identical config, which is what makes A/B numbers across frameworks defensible.

## Getting Started

Install the base package plus the adapters for the frameworks you intend to exercise, then export the provider key for whichever model you name:

```bash
pip install 'any-agent'
export MISTRAL_API_KEY="YOUR_KEY_HERE"
```

The Python entry point is fixed across backends:

```python
from any_agent import AgentConfig, AnyAgent
```

Requires Python 3.11 or newer.

## Use Cases

1. Run one prompt and tool list against every supported framework to produce an apples-to-apples quality and latency comparison.
2. Serve the identical agent definition over HTTP so an evaluation harness and a production caller exercise the same code path.
3. Diff framework behaviour on tool-calling edge cases, since the trace format is normalised rather than backend-specific.

## Strengths

It sits between rather than beside the frameworks it wraps: LangChain, LlamaIndex and the OpenAI Agents SDK appear here as adapter targets rather than competitors. Compared with dspy, which optimises prompts and programs rather than swapping agent runtimes, any-agent changes who executes the loop. It complements content/tools/evaluation entries such as ragas by supplying a consistent agent surface to evaluate, and it competes with no single framework on its own terms.

## Limitations / When NOT to Use

The README carries an explicit soft-deprecation notice: no new features are planned and the successor package mozilla-ai-tinyagent is what Mozilla recommends for greenfield work. Adding a framework means opening a ticket and writing an adapter, so the supported set of six is fixed by contributor capacity rather than a formal policy. Because each adapter is only as faithful as its maintainer, subtle behavioural differences can still leak between backends, and version skew across six dependency trees is a real upgrade hazard. Python 3.11 is a hard floor.

## Integration Patterns

any-agent sits in content/tools/orchestration as a wrapper layer over agent frameworks rather than a framework itself: it normalises the LangChain and LlamaIndex agent APIs behind one interface, so a workflow can switch backends without rewriting the orchestration around them. Run its output into the evaluation harnesses in content/tools/evaluation-and-observability to score trajectories, since the package exists to make a run comparable across backends rather than to be the terminal step. Requires Python 3.11 or newer, and the README's own positioning is that the underlying frameworks keep changing their surface, which is the churn this package absorbs for you. For the LangChain and LlamaIndex implementations it delegates to, see the framework entries in content/projects/frameworks; for the successor package that supersedes this one, watch the repository rather than assuming a stable API.

## Resources

- [GitHub — mozilla-ai/any-agent](https://github.com/mozilla-ai/any-agent)
- [Docs — agents, tools, tracing, serving, evaluation](https://docs.mozilla.ai/any-agent/)
- [PyPI — any-agent](https://pypi.org/project/any-agent/)

## Buzz & Reception

Wraps Agno, Google ADK, LangChain, LlamaIndex, OpenAI Agents SDK and smolagents behind one AgentConfig/AnyAgent API so cross-framework benchmarks stay honest.
