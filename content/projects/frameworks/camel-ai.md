---
id: camel-ai
name: "CAMEL"
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "Apache-2.0 multi-agent research framework with ChatAgent, agent societies, synthetic data generation and benchmark suites for studying agent behaviour at scale"
github_url: "https://github.com/camel-ai/camel"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "CAMEL-AI.org"
tags: [agents, orchestration, research, llm]
maturity: production
cost_model: open-source
github_stars: 17791
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-20"
docs_url: "https://docs.camel-ai.org/"
demo_url: null
paper_url: "https://arxiv.org/abs/2303.17760"
paper_id: null
phase: framework
domain: [language, general-purpose]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [research-origin, community-driven, actively-maintained]
ecosystem_role:
  - "The oldest living multi-agent framework (the March 2023 CAMEL paper predates AutoGen and CrewAI) with a research identity: finding the scaling laws of agents by simulating million-agent societies, generating synthetic training data, and spawning the OWL and Loong projects."
best_for: ["You are running a multi-agent study and you need a framework where a society of agents can hold real state, exchange messages and be scored on a repeatable benchmark.", "You need synthetic instruction data at volume, because the data-generation module ships CoT generation, Self-Instruct, Source2Synth and a self-improving loop rather than a hand-rolled prompt loop.", "You are building an application where several specialised agents must divide a job, and you would rather assemble a Workforce or RolePlaying society than write your own message router."]
avoid_if: ["You want a thin agent loop for one job, because CAMEL ships a broad research surface with societies, datagen, memory, retrievers, interpreters, storages and benchmarks, and most of that will be dead weight.", "You cannot point it at a hosted model, because the quickstart resolves models through ModelFactory against provider platform types and the example sets an OpenAI key.", "You need a small, well-understood dependency with a narrow blast radius, because the project is explicitly organised around scaling laws of agents and its module set is large and evolving."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [autogen, crewai, metagpt]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (17,343), primary language, license, and last commit (2026-07-07) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/camel-ai/camel", "date": "2026-07-08", "description": "17,343 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

CAMEL is the Apache-2.0 framework published with the NeurIPS 2023 paper on communicative agents for exploring large language model society, and it is maintained as a research collective of more than a hundred researchers rather than a product team. The module list in the README is the real map: agents, agent societies, data generation, models, tools, memory, storages, benchmarks, interpreters, data loaders, retrievers, runtime and human-in-the-loop tooling. A single unit of work is a `ChatAgent` built from a model plus tools, obtained through `ModelFactory.create(...)` and driven with `agent.step(...)`; above that sit societies such as RolePlaying and Workforce, plus RAG and graph-RAG cookbooks. Published synthetic datasets on Hugging Face cover AI Society, code, math, physics, chemistry and biology in chat and instruction formats, with Nomic Atlas visualisations for instructions and tasks.

## Why it's in the Arsenal

The decision this resolves is whether a multi-agent claim survives contact with a measurement. A framework where you assemble three agents and read their transcript answers nothing about whether more agents help; a framework with society abstractions, stateful memory, built-in benchmarks and a synthetic-data pipeline is set up so the question is answerable. The design principles the README states are the real design: evolvability through data generation, scalability toward millions of agents, statefulness for multi-step interaction, and code-as-prompt. The cost is breadth, since every subsystem you do not use still has to compile, import cleanly and be versioned alongside the parts you do.

## Architecture

A `ChatAgent` is constructed with a model handle, an optional tool list and a memory policy, and it advances through `step()` calls that append to a message list you can inspect directly. Societies wrap agents: RolePlaying assigns two agents opposing system prompts and alternates turns, while Workforce assembles a team with a coordinator that decomposes a task and delegates to specialists. Tools are attached at construction time (the quickstart passes `SearchToolkit().search_duckduckgo` into the agent), and the RAG and graph-RAG cookbooks layer retrievers and a dynamic knowledge graph over the same agent interface. Data generation runs as its own pipeline producing instruction and chat-format corpora, and the benchmarks package runs agent evaluations against standardised tasks. Optional model request/response JSON logging is toggled with `CAMEL_MODEL_LOG_ENABLED`, `CAMEL_MODEL_LOG_MODEL_CONFIG_ENABLED` and `CAMEL_LOG_DIR`, written as UTF-8 JSON so multilingual text survives without escape noise.

## Ecosystem Position

CAMEL competes with CrewAI, AutoGen and LangGraph for the multi-agent orchestration slot, and the split is about what you are optimising for: CrewAI sells role-based crews as a product, LangGraph sells an explicit state graph you control, and CAMEL sells the research substrate, with societies, benchmarks and synthetic data generation sitting underneath either. It also overlaps with MetaGPT and ChatDev, which were built on top of it and are listed as projects built with CAMEL. Compared with entries in content/projects/frameworks that are application-shaped, this one complements them: the datagen and benchmark modules are the pieces you would reuse when training a model on generated instructions, and the model layer it consumes is a hosted provider rather than a self-hosted runtime from content/projects/inference-engines.

## Getting Started

Install from PyPI, add the tool extras, set a provider key and drive a single agent before you assemble a society:

```bash
pip install camel-ai
pip install 'camel-ai[web_tools]'
export OPENAI_API_KEY='your_openai_api_key'
```

Then create a model with ModelFactory, pass a tool to `ChatAgent(model=model, tools=[search_tool])` and call `agent.step("What is CAMEL-AI?")`.

## Key Use Cases

1. Scaling study: spin up a large simulated society, vary the agent count and record emergent behaviour on a standardised benchmark rather than a hand-built scenario.
2. Synthetic instruction corpus: drive the CoT, Self-Instruct, Source2Synth or self-improving pipelines to produce instruction-format and chat-format data for fine-tuning.
3. Role-specialised workforce: assemble a Workforce society where a coordinator agent splits work across specialists with distinct prompts, tools and memory scopes.

## Strengths

- The module set spans agents, societies, memory, storage, retrievers, interpreters and benchmarks in one library, so a society experiment does not require four separate projects.
- A hundred-plus researcher collective publishes synthetic datasets and Atlas visualisations of instructions and tasks, which is unusual depth of released artefacts.
- Statefulness is a first-class design principle, so multi-step environment interaction is supported rather than bolted on.
- Apache-2.0 with README translations into Simplified Chinese and Japanese and a documented citation for the underlying paper.

## Limitations

The library is large and the surface area is the main cost: societies, datagen, memory, retrievers, interpreters, storages, runtime and benchmarks all evolve on the same cadence, so pinning versions and reading changelogs is part of operating it. The quickstart path assumes a hosted provider key, which is at odds with the scalability ambition of millions of agents, since per-agent token cost dominates long simulated runs. Many modules are research contributions rather than hardened products, so API shapes may change as experiments move. Community is strongest in Chinese-language channels (WeChat, QQ) with English support concentrated in Discord, which affects where you will get answers. There is also no first-party hosted tier, so running a large society is entirely on your own budget.

## Relation to the Arsenal

This is the research-oriented multi-agent framework in content/projects/frameworks, and the most useful thing to read it alongside is the other orchestration entry in the same phase if you are choosing between an explicit graph and a role-based workforce. It differs from content/projects/agent-systems, which are end-user harnesses with chat surfaces: CAMEL has no chat product, it is something you import. Its data-generation and benchmark modules reach down into content/projects/benchmarks-and-evals, its retrievers would sit on a vector store from content/projects/data-and-retrieval, and any self-hosted model it drives comes from content/projects/inference-engines.

## Resources

- [GitHub — camel-ai/camel](https://github.com/camel-ai/camel)
- [Documentation and cookbooks — docs.camel-ai.org](https://docs.camel-ai.org/)
- [Underlying paper — arXiv 2303.17760](https://arxiv.org/abs/2303.17760)
