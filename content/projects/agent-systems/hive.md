---
id: hive
name: hive
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python agent harness where a Queen agent loop spawns worker clones coordinated through a shared ledger, with crash-safe park and resume"
github_url: "https://github.com/aden-hive/hive"
license: Apache-2.0
primary_language: Python
tags: [agents, orchestration, stateful]
maturity: alpha
cost_model: open-source
github_stars: 11081
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-14"
docs_url: "https://github.com/aden-hive/hive/tree/main/docs/architecture"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Collapses multi-agent orchestration into one primitive so there is no graph to compile, while keeping recovery, cost enforcement and oversight in the loop itself."
best_for:
  - "You want many agents working one long-running business process and you would rather describe the outcome than wire a DAG of nodes and edges."
  - "You need crash-safe resume for agent runs because your workload is long enough that a restart mid-process is unacceptable."
  - "You want cost enforcement and human oversight built into the runtime rather than bolted on, because both are features of the shared primitive."
avoid_if:
  - "You need a statically defined graph with conditional branching you control precisely, because there is deliberately no graph to compile."
  - "You are only running one short task, because colony growth and the tracker ledger pay off across long jobs, not single prompts."
  - "You need a stable documented API, because the repository's README is short, its default branch is early and it carries a high open-issue count."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics, open-issue count and creation date came from the GitHub API. Colony model, clone-based workers, ledger, park/resume, cost enforcement and provider list are read from the official README; the runtime was not installed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenHive's unit of work is a colony: a Queen agent, which is the persistent client-facing lead, plus however many worker agents a job needs. Its distinguishing architectural claim is one primitive — the Queen is an agent loop and every worker is a clone of it with the same tools and model but its own task, so there is nothing to wire. Coordination runs through a shared tracker ledger and a persistent task plan rather than a data buffer. Operational features include crash-safe park/resume, cost enforcement, out-of-band observability, Queen personas with CEO-style routing and scoped evolving memory, plus browser use and MCP with a documented tool count around 102. Model providers covered include OpenAI, Anthropic and Google Gemini.

## Why it's in the Arsenal

The engineering decision is how much orchestration you want to specify. Most frameworks make you declare a graph; Hive asks you to state an outcome and lets the Queen grow the colony at runtime, which suits processes whose shape is not known up front. The tradeoff is that you give up explicit control over execution order and branching, and you inherit the ledger as the coordination substrate whether or not you would have chosen it.

## Architecture

Every agent in the colony is the same loop. The Queen holds the client conversation, routes work, and spawns worker clones on demand; workers share the same tool set and model configuration as their parent but carry an independent task. Because there is no intermediate message bus, coordination happens by reading and writing a shared tracker ledger plus a persistent plan file, which is also what makes state crash-safe: park captures enough to resume the colony after a failure. Human oversight and out-of-band observability are attached to the loop rather than being a separate service, and MCP exposes the tool surface to external clients.

## Ecosystem Position

Hive overlaps with LangGraph and CrewAI on multi-agent orchestration but deliberately sits at a different altitude: those are libraries you import and configure, this is a runtime you run. It competes with CrewAI's team model and AutoGen's conversable agents on the same problem, while occupying the operational layer that fewer projects cover (park/resume, cost enforcement, oversight). Compared with content/projects/agent-systems entries such as ECC, which shapes an existing harness, Hive owns the harness; compared with content/projects/frameworks it is a service rather than a dependency. The model layer sits in content/projects/inference-engines if you serve your own weights.

## Getting Started

Zero-setup is the project's claim: clone the repo, install dependencies and point it at a provider key.

```bash
git clone https://github.com/aden-hive/hive.git
cd hive
pip install -e .
# configure an OpenAI, Anthropic or Gemini key in the environment or .env
```

Then describe the outcome you want the colony to run; the README points at docs/architecture for the mechanism.

## Key Use Cases

1. Long parallel job with unknown shape: give the Queen a business-process outcome and let it spawn workers as the work decomposes.
2. Crash-resumable automation: run a process long enough that a restart would be costly, relying on park/resume rather than restarting from zero.
3. Oversight-heavy workflows: keep cost caps and human checkpoints inside the runtime so you can leave the process running unattended.

## Strengths

- One primitive instead of a graph means far less orchestration code to write and debug.
- Clone-based workers make parallelism a property of the design rather than something you wire per node.
- Crash-safe park/resume plus cost enforcement and oversight are in the runtime, not bolted on afterwards.
- Zero-setup model-agnostic start with OpenAI, Anthropic and Gemini supported out of the box.

## Limitations

The README is short and the architecture doc is where the substance lives, so adoption cost is higher than the marketing suggests. Alpha maturity with a very high open-issue count (over 1,300) on a repository created in January 2026 signals heavy activity and heavy breakage. By design there is no declarative graph, so if you need deterministic ordering or explicit conditional branching you must build it around the runtime. Colony growth is the Queen's judgement, which is a hard thing to bound when the goal is vague. Y Combinator backing means commercial incentives may shape the roadmap in ways the README does not describe.

## Relation to the Arsenal

This is the multi-agent runtime in content/projects/agent-systems, and the most ambitious orchestration model in the phase: single primitive plus colony growth, versus the tool-and-loop models most neighbouring entries use. Compare it with ECC, which installs process discipline into someone else's harness, and with the frameworks phase entries (LangGraph, CrewAI, AutoGen) that give you a library to build the same thing yourself. Its observability and cost surfaces also touch the evaluation and observability concerns that live in other phases, and the browser-use capability overlaps with browser-use and browser-harness entries in this same phase.

## Resources

- [GitHub — aden-hive/hive](https://github.com/aden-hive/hive)
- [Architecture overview — docs/architecture](https://github.com/aden-hive/hive/tree/main/docs/architecture)
- [Aden — the company behind Hive](https://www.ycombinator.com/companies/aden)
