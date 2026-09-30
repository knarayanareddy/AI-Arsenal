---
id: pocketflow
name: PocketFlow
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A hundred-line Python LLM framework whose Node, Flow, and nested-Flow primitives express multi-agent, RAG, and workflow patterns"
github_url: "https://github.com/The-Pocket/PocketFlow"
license: MIT
primary_language: Python
tags: [agents, orchestration, community-favorite, pytorch]
maturity: production
cost_model: open-source
github_stars: 11201
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-07-26"
docs_url: "https://the-pocket.github.io/PocketFlow/"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Lets you read the entire abstraction surface in one file instead of adopting a framework to express a five-step loop."
best_for:
  - "You need a flow you can hold in your head and hand to a colleague as one file rather than a dependency tree."
  - "You are prototyping an agent pattern and want to see whether it is a graph or a nested flow before committing."
  - "You are constrained to air-gapped or audited environments where zero dependencies is a hard requirement."
avoid_if:
  - "You need built-in retry, persistence, or observability, because none of that is in the hundred lines."
  - "You are on a runtime other than Python and one of the community ports, since the ports are separate projects with their own fidelity."
  - "You want a maintained abstraction, because the design bet is that patterns come from reading the source instead."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 11201, MIT, Python, last commit 2026-07-26, topics, homepage. From README: 100-line single file, Node/Flow/connect/two_or_parallel, zero dependencies, pip install or copy source, nested Flow in Node, seven language ports. Line count and port fidelity unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

PocketFlow is a single Python file of roughly 100 lines containing three concepts: Node, a callable with a parameter plus successor wiring; Flow, which manages the graph by having each node's successor be the next node; and the ability to nest a Flow inside a Node so a subflow behaves as one step. That is the whole abstraction, and the README argues it is sufficient: multi-agent, workflow orchestration, RAG, and agentic coding patterns all compose from connect and two_or_parallel orchestration primitives. The library declares zero dependencies and zero vendor lock-in, and installation is either pip install pocketflow or copying the source file directly into a project - the README treats the copy as a legitimate install path. Port implementations exist for TypeScript, Java, C++, Go, Rust, and PHP as separate repositories.

## Why it's in the Arsenal

The recurring decision is whether a multi-agent pattern warrants a framework. Most agent work that looks like it needs orchestration actually needs five nodes, two edges, and a loop - and a framework adds a dependency, an upgrade surface, and a learning curve to express that. PocketFlow's argument is that the graph abstraction is so thin that composing patterns is reading the source, and that agents can generate correct code against it because there is almost no API to get wrong. Nesting a Flow inside a Node is the load-bearing idea: it is what turns a flat graph into modular sub-workflows without a separate orchestrator concept.

## Architecture

Node is the unit of work: it defines its own logic and holds a successor reference set at instantiation. Flow is a registry of nodes plus the machinery to start from an entry node and follow successors until none remain, and the connect method wires predecessor to successor. Flow exposes two_or_parallel, which runs downstream nodes either sequentially or concurrently, and that single primitive is what expresses branching, fan-out, and aggregation. Nesting works by letting a Flow's run be invoked from inside a Node's exec, so the inner graph is opaque to the outer one and can be reused as a component. Because there is no retry, checkpoint, tracing, or schema layer, the composition happens entirely in your own code, which is the tradeoff the README's comparison table against LangChain-style frameworks is making.

## Ecosystem Position

PocketFlow competes with LangChain, LlamaIndex, CrewAI, and AutoGen on the same agent-orchestration ground while claiming the opposite trade: no wrappers, no abstractions, no dependencies, and a line count roughly two orders of magnitude smaller. Compared with LangChain's agent, chain, and per-provider wrappers, it offers nothing ready-made - you write the provider call, the memory handling, and the error handling yourself. It overlaps with the other minimal-framework entries in content/projects/frameworks, particularly the from-scratch teaching material that makes the same no-abstraction argument, and it is an alternative to importing a framework when your flow genuinely is small. It composes with anything: model access comes from content/projects/inference-engines and tools from content/projects/data-and-retrieval, with no integration layer in between.

## Getting Started

Install from PyPI or copy the single source file into your project; the copy path is an intended usage, not a workaround.

```bash
pip install pocketflow
# or vendor it directly
curl -O https://raw.githubusercontent.com/The-Pocket/PocketFlow/main/pocketflow/__init__.py
```

Then read docs at the-pocket.github.io/PocketFlow, where the design-pattern pages cover agents, multi-agent systems, workflows, and RAG as compositions of the same primitives.

## Key Use Cases

1. Prototype an agent pattern in an afternoon: express the flow as Node, Flow, and connect, then judge whether a real framework is warranted.
2. Ship a small production flow: vendor one file with zero dependencies into a locked-down or audited environment.
3. Teach orchestration: show a reader the two_or_parallel primitive and let them build branching, fan-out, and nesting themselves.

## Strengths

- The entire abstraction is readable in one sitting, so you can debug an agent by reading its source.
- Zero dependencies and an explicit copy-the-file install path, which solves supply-chain review and air-gapped deployment.
- Flow-in-Node nesting makes modular sub-workflows a language feature rather than an architectural convention.
- Two orchestration primitives cover branching, parallelism, and aggregation, which is a small surface to reason about.

## Limitations

Everything a framework would have provided is your problem: retries, timeouts, state persistence, checkpointing, tracing, structured output validation, and provider error handling are all absent by design. A hundred lines is not a benchmark of fitness, and patterns that genuinely need durability will outgrow it without warning, since there is no layer telling you that you have hit the ceiling. There are no tests to speak of and no semantic versioning guarantee, so an upstream change can alter behavior on a library you thought was settled. The TypeScript, Java, C++, Go, Rust, and PHP versions are separate repositories whose fidelity to the Python original is unverified.

## Relation to the Arsenal

This framework-phase entry occupies the minimal end of the sibling content/projects/frameworks phase, and the contrast with the heavier harnesses catalogued there is the point of including it. It defines no storage, so anything retrieved comes from content/projects/data-and-retrieval, and it hosts nothing, so every model call in your flow resolves through content/projects/inference-engines. With no tracing built in, an agent built on PocketFlow has nothing to evaluate until you add instrumentation from content/projects/benchmark-and-eval yourself.

## Resources

- [Repository](https://github.com/The-Pocket/PocketFlow)
- [Documentation and design patterns](https://the-pocket.github.io/PocketFlow/)
- [PyPI package](https://pypi.org/project/pocketflow/)
