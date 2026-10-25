---
id: langchain
name: LangChain
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: The Python (and JS) framework that standardised LLM component interfaces — now positioned as an agent-engineering layer above LangGraph
github_url: "https://github.com/langchain-ai/langchain"
license: MIT
primary_language: Python
org_or_maintainer: "LangChain, Inc."
tags: [llm, rag, agents, orchestration]
maturity: production
cost_model: open-source
github_stars: 148417
github_stars_last_30d: 0
trending_score: 80
last_commit: "2026-10-25"
docs_url: "https://docs.langchain.com/oss/python/langchain/overview"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top]
health_signals: [org-backed, community-driven, production-proven]
ecosystem_role:
  - "The integration layer of the Python agent ecosystem: a standard interface for chat models, embeddings, retrievers and toolkits, wrapped around a large catalogue of provider packages that would otherwise each have their own calling convention"
best_for:
  - The provider churn problem is your real cost — you want `init_chat_model("openai:gpt-5.5")` to be the only line that changes when a model or vendor swaps out, with retrieval and tools already wired to the same interface
  - You are assembling a RAG or tool-using application and would rather import a maintained integration for a loader, vector store or retriever than write and keep one
  - You want a supported on-ramp to the wider LangChain stack — LangGraph for stateful control flow, LangSmith for traces and evals, Deep Agents for planning-and-subagent patterns — without adopting all of it up front
avoid_if:
  - Your agent needs explicit graph control, checkpointing and resumable state — use `langgraph` directly rather than bending chains into that shape
  - You intend to hold dependencies to a dozen packages and audit every one — the integration catalogue is the value and also the supply-chain surface, and a thinner client library will be easier to defend
  - Your workload is one model, one prompt, no retrieval — a provider SDK plus a retry wrapper is fewer moving parts than adopting a framework ecosystem
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, llamaindex, dspy, pydantic-ai, smolagents]
integrates_with: [langsmith-platform, huggingface-transformers]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: 148,417 stars, 677 open issues, MIT, last push 2026-10-25. README now headlines 'the agent engineering platform', quickstarts with `uv add langchain` and `init_chat_model`, and points to Deep Agents, LangGraph, integrations, LangSmith and LangSmith Deployment. Prior body was generator template prose."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"hackernews","url":"https://www.zenml.io/llmops-database/building-enterprise-scale-ai-applications-with-langchain-and-langsmith","date":"2025-01-01","description":"ZenML LLMOps case study: Rakuten Group built and deployed multiple production LLM applications (AI Analyst, AI Agent, AI Librarian) using LangChain and LangSmith"}
featured: false
status: active
---

## Overview

LangChain's durable contribution is an interface, not an algorithm. Before it, every model provider, embedding service, vector store and document loader had its own calling convention, and swapping one meant rewriting the code around it. LangChain defined a small set of protocols — chat model, embedder, retriever, tool, vector store — and convinced a few hundred providers to implement them, so a retriever is a retriever regardless of who serves it.

What sits around that today is an agent framework. The README calls itself "the agent engineering platform", the quickstart is two lines (`uv add langchain`, then `init_chat_model("openai:gpt-5.5")`), and the surrounding products do the heavier work: LangGraph for stateful orchestration, Deep Agents for planning and subagents with a filesystem, LangSmith for traces and evals, LangSmith Deployment for running the result.

## Why it's in the Arsenal

The catalog's value here is calibration. LangChain is the most-installed Python AI framework and also the most criticised one, and both facts are consequences of the same design decision — abstraction breadth.

Breadth is what makes a prototype fast. The common shape of an application (load documents, chunk, embed, retrieve, prompt, call a model, parse structured output) exists as maintained code, and the provider surface means the model choice is a string. For the first version of anything, that is days saved.

Breadth is also what makes a production audit hard: 148,000 stars attract contributors and pull requests, the integration catalogue is enormous, and the abstraction layers sit between you and the HTTP call when something goes wrong at 3 a.m. That tension is the entry's real content, and it is why the framework is catalogued with `langgraph` beside it rather than as a single monolith.

## Architecture

Three package layers, and knowing which one you are importing explains most of the friction people report.

`langchain-core` holds the interfaces, message types and runnable protocol; it is small, dependency-light and changes slowly. `langchain` holds the agent surface and the high-level chains. Partner packages (`langchain-openai`, `langchain-anthropic`, `langchain-community` and hundreds more) hold the integrations, each with its own release cadence and dependency tree.

The Runnable protocol — everything callable as `invoke`, `batch`, `stream`, `ainvoke` — is what allows composition without inheritance, and it is why a retriever can be dropped where a function is expected. Model construction goes through `init_chat_model`, which resolves a provider prefix to the right partner package at runtime, so a model change is a config change rather than an import change.

Orchestration beyond a linear sequence was moved out deliberately: LangGraph models agents as a state machine with explicit nodes, edges and a checkpointer, and LangChain's own documentation now routes complex control flow there. Reading the split correctly is the difference between using the framework as designed and fighting it.

## Ecosystem Position

Compared with `llamaindex` the framing is inverted: LlamaIndex starts from the retrieval problem and expands outward, LangChain starts from the composition problem and reaches into retrieval. For a document-heavy pipeline LlamaIndex's defaults are closer to the task; for an application that is mostly tools and orchestration with some retrieval, LangChain's shape fits better.

Against `dspy` the philosophical gap is largest. DSPy treats prompts as parameters to be optimised against a metric; LangChain treats them as strings to be assembled. They compose — DSPy inside a LangChain pipeline is a real pattern — but choosing one as your primary mental model determines how you debug.

Against `pydantic-ai` and `smolagents` the trade is size for capability: those are opinionated, thinner frameworks with fewer integrations and clearer failure modes. `langgraph` is not really an alternative but a successor for the hard half of the problem, and the honest arrangement for a serious agent is LangGraph for control flow plus LangChain for integrations rather than either alone.

## Getting Started

```bash
uv add langchain
```

```python
from langchain.chat_models import init_chat_model

model = init_chat_model("openai:gpt-5.5")   # swap the prefix to change provider
print(model.invoke("Explain retrieval-augmented generation in one paragraph.").content)
```

Tool calling follows the same shape — bind tools to the model, then let an agent loop drive them:

```python
from langchain.agents import create_agent
from langchain.tools import tool

@tool
def word_count(text: str) -> int:
    """Count words in a string."""
    return len(text.split())

agent = create_agent(model, tools=[word_count])
print(agent.invoke({"messages": [("user", "Count the words in: one two three")]}))
```

If you use a coding agent, install the documentation skill rather than letting it guess the API — the framework's surface has changed enough across versions that a stale example will silently import the wrong module.

## Key Use Cases

1. **Provider hedging during a model transition**: a team migrating from one vendor to another changes a model string and the retriever and tool code stays untouched, which is the cheapest form of portability available in Python.
2. **Internal RAG over a document estate**: loaders for the awkward formats (PDF, docx, HTML, spreadsheets) plus a vector-store abstraction mean the ingestion pipeline is assembly rather than bespoke work.
3. **Structured extraction at volume**: schema-bound output with retries, validated through Pydantic, over a batching runnable that fans out and rejoins — the least glamorous and most-used pattern in production.
4. **Prototyping an agent before committing to an architecture**: the agent loop is deliberately simple, so a week of experiments reveals whether the workflow needs LangGraph-grade state before you build the graph.
5. **Tracing an existing application**: adding LangSmith callbacks to a LangChain pipeline is a few lines, which makes the framework a practical on-ramp to observability even for teams that arrived sceptical.
6. **Multi-language parity**: LangChain.js mirrors the Python surface closely enough that a TypeScript frontend team and a Python backend team can share design rather than debate SDKs.

## Strengths

- The integration catalogue is unmatched, and integrations are maintained with tests — the unglamorous work that makes a framework worth its weight.
- `init_chat_model` plus the Runnable protocol give genuine provider portability and composability without inheritance tricks.
- The product split (LangGraph, LangSmith, Deep Agents) means the core framework stays relatively thin while the hard problems get purpose-built tools.
- Callback and tracing hooks are first-class, so observability is available from day one rather than bolted on.
- 148,000 stars and 325-package-strong ecosystem: nearly every problem you hit has an answered issue or a Stack Overflow thread.
- MIT licensed with an actively maintained release cadence — last push on the day this was reviewed.

## Limitations

- **Abstraction depth is the tax.** When a call fails, the stack trace runs through several layers before reaching the provider; teams without framework fluency debug the wrapper instead of the problem.
- **Version churn has a real cost.** The 1.0 reorganisation moved agents behind `create_agent` and pushed orchestration into LangGraph, so tutorials, blog posts and LLM-generated code frequently import modules that no longer exist in the same place.
- **Dependency surface is a supply-chain decision.** Hundreds of partner packages, each with its own dependencies, is a large audit and patching job; pin and review rather than resolve loosely.
- **677 open issues with a commercial maintainer.** Priorities follow the company's product roadmap, and an issue that matters to you but not to LangSmith's positioning can sit.
- **It will not force good architecture.** The framework happily assembles a chain that should have been a graph, and the resulting code is hard to test — the guidance to move to LangGraph is documentation, not a constraint.
- **Benchmark-free.** Nothing here tells you whether your pipeline is good; evaluation is a separate product.

## Relation to the Arsenal

Read it with `langgraph` (stateful orchestration), `llamaindex` (retrieval-first alternative), `dspy` (prompt optimisation), `pydantic-ai` and `smolagents` (thinner, more opinionated). For the tracing and evaluation layer it integrates with, see `langsmith-platform` and `langfuse`.

If you adopt it, adopt two rules with it: pin the version and read the migration notes before upgrading, and write the integration test at the level below the abstraction so a framework regression is distinguishable from your own bug.

## Resources

- [GitHub](https://github.com/langchain-ai/langchain)
- [Documentation](https://docs.langchain.com/oss/python/langchain/overview)
- [API reference](https://reference.langchain.com/python)
- [Integrations](https://docs.langchain.com/oss/python/integrations/providers/overview)
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [Deep Agents](https://docs.langchain.com/oss/python/deepagents/)
