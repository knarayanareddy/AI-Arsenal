---
id: google-adk
name: Google ADK
version_tracked: "2.0"
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Google's code-first agent framework, version 2.0 — Agent and Workflow primitives, a graph execution engine, a Task API for delegation, and an eval/dev UI
github_url: "https://github.com/google/adk-python"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Google"
tags: [agents, orchestration, graphs, tool-use]
maturity: production
cost_model: open-source
github_stars: 22013
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-26"
docs_url: "https://adk.dev/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "Google's agent framework with a graph runtime rather than a loop: `Agent` for the unit, `Workflow` for the edges, and a Task API for multi-turn delegation between them — with a local dev UI that covers eval and debugging"
best_for:
  - You want both a simple agent and an explicit flow in one framework — `Agent` for the unit of work, `Workflow(edges=[...])` when the order should be deterministic rather than model-decided
  - Multi-agent delegation needs structure — the Task API supports single-turn controlled output and multi-turn task modes, including humans in the loop
  - "You value a development UI: `adk web` gives a local interface for running, evaluating and debugging agents, including trajectory inspection, without assembling three tools"
avoid_if:
  - Deployment must stay off Google Cloud — the framework is deployment-agnostic in principle, but Cloud Run and Vertex AI Agent Engine are the supported first-class paths, and other targets are containerisation work you own
  - You need a two-person prototype in an afternoon — the 2.0 surface (workflows, tasks, config, dev UI) is a system, and a smaller library gets to a first demo faster
  - Your team is Python-only by policy for maintenance reasons — ADK ships Java, Kotlin, Go and TypeScript siblings with their own release trains, which is an ecosystem to track
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai, openai-agents-sdk, pydantic-ai]
integrates_with: [google-vertex-ai, mcp-servers]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-26: 22,013 stars, 424 open issues, Apache-2.0, push same day, now branded ADK 2.0 with docs at adk.dev. README documents Workflow graph runtime (routing, fan-out/in, loops, retry, nested workflows), Task API, Agent Config, tool confirmation HITL, `adk run`/`adk web`, Python 3.11+, bi-weekly releases, and states the framework is model-agnostic and deployment-agnostic."
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

ADK is Google's agent framework, and version 2.0 reorganised it around two classes. `Agent` is the unit: a model, instructions, tools, and the behaviour you want. `Workflow` is the structure: a graph declared with edges, where `edges=[("START", step_a, step_b)]` means the order is yours rather than the model's discretion.

That split is the important design decision. Most frameworks pick a side — either an autonomous loop where the model chooses what happens next, or a graph where you do — and then make the other awkward. ADK treats both as legitimate and lets you put an agent inside a workflow node or run one standalone, which matches how agent systems actually evolve: a prototype is one agent, and the production version is that agent as one step in a flow with retries and a human approval.

Around the core sits a runtime you would otherwise build: routing, fan-out and fan-in, loops, retry, shared state, dynamic nodes, nested workflows, and a Task API for structured agent-to-agent delegation with single-turn or multi-turn modes. There is a no-code Agent Config path, tool confirmation for human approval before a side-effecting call, and a development UI (`adk web`) that handles running, evaluating and debugging agents including their trajectories.

## Why it's in the Arsenal

The catalog needs one framework where production concerns are first-class rather than bolted on, and this is it. Retries, loops, state, nested composition and human approval are the things that break when an agent leaves the notebook, and ADK exposes them as runtime features instead of patterns you implement.

The dev UI deserves specific credit, because it changes the debugging workflow. Agent failures are often trajectory failures — the model chose a reasonable-looking path that was wrong three steps ago — and a UI that shows the trajectory, lets you rewind and evaluates against a set of cases turns that from guesswork into inspection. Teams that debug agents from log files alone pay for it in time.

The third reason is portability between autonomy and control. Because an agent is a node and a workflow is a graph, you can start with an autonomous researcher and pin down the risky steps later without changing frameworks — which is precisely the migration most teams do by hand and most frameworks make painful.

## Architecture

Two primitives and a runtime. `Agent` holds the model, instructions, tools and sub-agent declarations. `Workflow` holds edges — a list of tuples naming the source, the step and the destination — plus the node types those edges connect, including agents, tasks and dynamic nodes. `START` is a reserved node, so a workflow's entry point is declared rather than inferred.

The Task API is the delegation layer. Instead of a handoff where control transfers and the caller loses the thread, a task is a structured request to another agent with a declared output contract, available in a single-turn mode (controlled output) or a multi-turn mode (a conversation between agents). That distinction matters for composition: a critic agent reviewing another's output wants single-turn control, while two specialists collaborating want multi-turn.

Tools come from four directions: pre-built Google and third-party tools, plain Python functions, OpenAPI specs, and MCP servers. Tool confirmation inserts a human gate in front of a call, which is the mechanism for anything with a side effect — a payment, a deploy, a delete.

Serving has two modes. `adk run path/to/agent` gives an interactive CLI for a quick loop; `adk web path/to/agents_dir` starts the development UI, which handles multiple agents in a directory. Deployment targets the container either way — Cloud Run for a stateless HTTP service, or Vertex AI Agent Engine for the managed runtime with sessions and memory.

Model access is not limited to Gemini: the framework states it is model-agnostic, and other providers attach through the model interface, though the Google path is the one with first-party tooling.

## Ecosystem Position

Against `langgraph` the comparison is now much closer than it was, and the differences are in ergonomics rather than capability: both have graph execution, state and human-in-the-loop. LangGraph is model- and cloud-neutral with a larger body of public examples; ADK ships a dev UI, an eval surface and a deployment path in the box, and its Task API gives delegation semantics LangGraph leaves to you.

Against `openai-agents-sdk` the split is philosophical: that SDK hands you a runner loop and a small vocabulary, which is faster to adopt for triage-and-answer work; ADK gives you a graph runtime and expects you to declare structure. Against `crewai` the difference is role-play versus explicit graphs — CrewAI's crews read naturally for content workflows and constrain you to its metaphor. Against `pydantic-ai` the boundary is typing and dependency injection versus runtime features: Pydantic AI is leaner and more model-neutral, ADK is heavier and more complete.

The polyglot siblings matter for a procurement decision: Java, Kotlin, Go and TypeScript variants mean a multi-language organisation can standardise the concept across services, at the cost of tracking several release trains for feature parity.

## Getting Started

```bash
pip install google-adk        # Python 3.11+
adk run path/to/my_agent
adk web path/to/agents_dir    # development UI: run, evaluate, inspect trajectories
```

```python
from google.adk import Agent, Workflow

generate_fruit = Agent(name="generate_fruit", instruction="Return the name of a random fruit. Return only the name.")
describe_benefit = Agent(name="describe_benefit", instruction="Tell me a health benefit about the specified fruit.")

root_agent = Workflow(
    name="root_agent",
    edges=[("START", generate_fruit, describe_benefit)],
)
```

Two practices that prevent rework: install with the published constraints file (`pip install google-adk -c constraints-3.11.txt`) because the transitive dependency surface is large and Google ships per-Python-version constraints; and read the 2.0 migration notes if you have pre-2.0 code, since the `Workflow` primitive and the Task API are new and examples from 2025 assume the older single-agent shape.

## Key Use Cases

1. **Deterministic pipelines over agents**: extract, verify, enrich, publish — where each step is an agent and the order is a business rule, not a model's choice.
2. **Human approval before side effects**: tool confirmation in front of the deploy, the payment or the destructive operation, with the conversation paused rather than logged after the fact.
3. **Multi-agent delegation with contracts**: a planner delegating to specialists using the Task API's single-turn controlled output, so the output shape is typed rather than hoped for.
4. **Agent evaluation in the dev loop**: `adk web` against a directory of eval cases, inspecting trajectories rather than only final answers.
5. **Google Cloud deployment**: containerise and run on Cloud Run, or use Vertex AI Agent Engine when sessions, memory and managed scaling are needed.
6. **Mixed-language estates**: the Java, Go and TypeScript siblings let a platform team keep one conceptual model across services written in different languages.
7. **No-code agent assembly**: Agent Config builds agents from configuration for teams whose domain experts should not edit Python, with the code path available when they outgrow it.

## Strengths

- The Agent/Workflow split makes the autonomy-versus-control decision incremental rather than architectural — start loose, pin down the risky parts later.
- The runtime covers what production needs: retries, loops, fan-out/fan-in, nested workflows, shared state and dynamic nodes.
- The Task API gives delegation real semantics (single-turn contracts or multi-turn collaboration) rather than an ambiguous handoff.
- `adk web` bundles run, eval, debug and trajectory inspection, which removes the usual three-tool debugging setup.
- Tool confirmation is a first-class HITL mechanism for side-effecting tools, not a custom middleware pattern.
- Apache-2.0, Google-backed, bi-weekly releases, and four language siblings for multi-service organisations.
- Documentation moved to a dedicated site (adk.dev) with samples in `adk-recipes`, which is a better starting point than a README.

## Limitations

- **Deployment convenience is Google-shaped.** Cloud Run and Agent Engine are the paved paths; anywhere else, you own the containerisation, session store and scaling.
- **The 2.0 surface is young.** Workflows, tasks and Agent Config are recent additions, so a large share of tutorials, blog posts and LLM-generated code target the older shape and will not run.
- **424 open issues with a fast release cadence.** Bi-weekly releases mean version drift between the package, the constraints files and the docs; pin exactly.
- **Dependency weight is real.** The constraints-file recommendation is an admission that the transitive tree is fragile enough to need pinning, and `google-adk[extensions]` adds more.
- **Optimised for Gemini first.** Model-agnostic support exists, but tool-call formats, evaluation defaults and documentation assume Google's models; other providers work rather than shine.
- **The graph is code, not a visual spec.** There is no state-machine diagram as the source of truth, so understanding a large workflow means reading Python.
- **Python 3.11+ and a large installation.** A constraint for older enterprise images, and a non-trivial image size for a small service.

## Relation to the Arsenal

Compare with `langgraph` (neutral, larger example base), `openai-agents-sdk` (runner loop, sandbox and realtime modes), `crewai` (role-based crews), `pydantic-ai` (leaner, type-first). For the managed runtime it deploys to, see `google-vertex-ai`; for tool integration, `mcp-servers`.

If your agent work is Gemini-centric and will run on Google Cloud, ADK is the shortest path from prototype to a deployed service. If neutrality or a lighter footprint matters more, LangGraph or Pydantic AI will cost you the bundled dev UI and gain you portability.

## Resources

- [Documentation](https://adk.dev/)
- [GitHub](https://github.com/google/adk-python)
- [Samples (adk-recipes)](https://github.com/google/adk-recipes)
- [ADK Web](https://github.com/google/adk-web)
- [Agent Config](https://adk.dev/agents/config/)
- [Tool confirmation](https://adk.dev/tools-custom/confirmation/)
- [Java](https://github.com/google/adk-java) · [Kotlin](https://github.com/google/adk-kotlin) · [Go](https://github.com/google/adk-go) · [TypeScript](https://github.com/google/adk-js)
