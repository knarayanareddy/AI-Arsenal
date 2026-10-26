---
id: openai-agents-sdk
name: OpenAI Agents SDK
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Lightweight Python agent framework — agents, handoffs, guardrails, sessions and tracing, with sandbox, realtime and voice run modes alongside text
github_url: "https://github.com/openai/openai-agents-python"
license: MIT
primary_language: Python
org_or_maintainer: "OpenAI"
tags: [agents, tool-use, guardrails, tracing]
maturity: production
cost_model: open-source
github_stars: 30297
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-22"
docs_url: "https://openai.github.io/openai-agents-python/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning, audio]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The reference implementation of the agent loop as a library: agents as configuration, handoffs as control transfer, guardrails as input/output checks, and a runner that owns the tool-calling cycle so you do not write it"
best_for:
  - You want the tool-calling loop written for you but not a graph engine — an agent is an object with instructions, tools and guardrails, and `Runner.run` does the iteration
  - The agent needs to survive a long-horizon task in a workspace — SandboxAgent gives it a container with files, commands and patches, rather than making every action a bespoke tool
  - "You want tracing on by default: runs are recorded to a trace view for debugging, and the same hooks can send spans elsewhere"
avoid_if:
  - You need explicit graph control with checkpointing and resumable state — this is a runner over agents, and `langgraph` models the state machine directly
  - You require a vendor-neutral governance story — the SDK is MIT and provider-agnostic by configuration, but the tracing backend and the roadmap are OpenAI's
  - You need to contribute fixes — pull requests are restricted to repository collaborators, so an external shop cannot upstream a patch
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai, pydantic-ai, google-adk, smolagents]
integrates_with: [openai-agents-sdk]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-26: 30,297 stars, 23 open issues, MIT, push 2026-10-22. README now states the SDK is provider-agnostic across the Responses and Chat Completions APIs plus 100+ other LLMs — the earlier 'OpenAI-only' avoid_if was wrong — and documents SandboxAgent, RealtimeAgent, VoicePipeline, sessions and human-in-the-loop. Package is `openai-agents`, not `openai-agents-sdk`."
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://openai.github.io/openai-agents-python/","date":"2026-06-13","description":"Official documentation"}
featured: false
status: active
---

## Overview

The Agents SDK is OpenAI's answer to a specific question: what does a minimal agent framework look like if you stop trying to model graphs? An `Agent` is a configuration object — a name, instructions, a model, tools, guardrails, handoffs. A `Runner` executes it, looping over tool calls until the model produces a final answer. Everything else in the framework hangs off those two ideas.

By late 2026 the framework covers four run modes rather than one. A text agent handles ordinary request-response work. A `SandboxAgent` runs inside a container with a manifest of files, so it can inspect a repository, run commands and apply patches over a long horizon without every capability being hand-wrapped as a tool. A `RealtimeAgent` speaks over a WebSocket for low-latency voice and multimodal interaction. A `VoicePipeline` stitches speech-to-text, an agent workflow and text-to-speech into one stream.

Around those sit the features a production agent needs and tutorials usually omit: sessions for automatic conversation history, human-in-the-loop mechanisms, guardrails on input and output, MCP and hosted tools alongside function tools, and tracing that is on by default.

## Why it's in the Arsenal

The catalog has frameworks that model agents as graphs and frameworks that model them as chains. This one models them as *a loop with a small vocabulary*, and that is the right shape for a large share of real agent work — triage, routing, retrieval-then-answer, a single tool-using researcher.

The value is what you do not write. The tool-calling cycle, retries on malformed tool arguments, handoff state, session persistence and trace emission are all handled, and they are exactly the parts that get subtly wrong when hand-rolled. A team that starts with a `while` loop over `tool_calls` usually ends up rebuilding this.

The sandbox mode is the more interesting addition. Giving an agent a workspace rather than a tool per action changes the failure surface: instead of a dozen narrow tools that each need schemas and tests, the agent gets shell, files and patches, and the containment boundary becomes the container. That is the same insight behind container-based coding agents, made available inside a library.

One correction the catalog needed: this SDK is not OpenAI-only. The README states it supports the Responses and Chat Completions APIs plus 100+ other models, so the "you must be on OpenAI" objection — which the earlier version of this entry raised — no longer holds.

## Architecture

Three layers, each replaceable.

The agent layer is declarative: `Agent(name=..., instructions=..., tools=[...], handoffs=[...])`. Handoffs are agents exposed as a mechanism to transfer control, so a router agent's decision is a structured action rather than a string you parse. Guardrails are input/output functions attached to an agent, running alongside the model call and short-circuiting with a tripwire when they fail.

The runner layer owns execution. `Runner.run` is async and returns a result with the final output plus the new items; `run_sync` wraps it. A run is a loop: call the model, collect tool calls, execute them (in parallel where declared), append results, repeat until a final message. Sessions plug in here as conversation-history storage — in-memory by default, Redis via an extra — so you do not thread message arrays through your code.

The tracing layer wraps each run in spans and ships them to a trace view, with the ability to configure an alternative processor. That default is genuinely useful during development and worth replacing or disabling deliberately in production, since agent traces contain prompts and tool arguments.

Sandbox execution is a separate client abstraction: `UnixLocalSandboxClient` on macOS and Linux, `DockerSandboxClient` via an extra elsewhere, or a hosted client. The manifest declares what is mounted — a git repository at a ref, for instance — which is what makes the workspace reproducible.

## Ecosystem Position

Against `langgraph` the boundary is explicit versus implicit control flow. LangGraph gives you nodes, edges and a checkpointer, so a long-running workflow can pause, persist and resume. The Agents SDK keeps orchestration inside the runner loop, which is simpler to adopt and coarser to control — when a workflow needs to survive a process restart mid-step, that is the signal you chose the wrong tool.

Against `crewai` the difference is role-play versus primitives: CrewAI models crews of role-playing agents with tasks, which reads well for content and research workflows and constrains you to its metaphor; this SDK gives you objects and lets you structure the collaboration.

Against `pydantic-ai` the overlap is largest — both are typed, developer-ergonomic agent libraries with tool calling and validation — and the choice usually comes down to whether you want Pydantic's model-agnostic design and dependency injection or this SDK's sessions, sandbox and tracing defaults. Against `google-adk` the split is ecosystem: ADK's deployment story is strongest inside Google Cloud, this one's is strongest against OpenAI's APIs. Against `smolagents` the difference is code-as-action: smolagents has agents write Python as their action space, which is more powerful and more dangerous.

## Getting Started

```bash
pip install openai-agents          # not "openai-agents-sdk"
pip install 'openai-agents[voice]' # optional audio stack
pip install 'openai-agents[redis]' # Redis-backed sessions
export OPENAI_API_KEY=...
```

```python
import asyncio
from agents import Agent, Runner, function_tool, SQLiteSession

@function_tool
def order_status(order_id: str) -> str:
    """Look up the shipping status of an order."""
    return fetch_status(order_id)          # your code

billing = Agent(name="Billing", instructions="Answer billing questions only.")
triage = Agent(
    name="Triage",
    instructions="Route the user to the right specialist.",
    tools=[order_status],
    handoffs=[billing],
)

async def main():
    session = SQLiteSession("user-42")     # history survives across turns
    result = await Runner.run(triage, "Where is order A-1042?", session=session)
    print(result.final_output)

asyncio.run(main())
```

For a workspace-based agent, install the sandbox extra and give it a manifest:

```python
from agents.run import RunConfig
from agents.sandbox import Manifest, SandboxAgent, SandboxRunConfig
from agents.sandbox.entries import GitRepo
from agents.sandbox.sandboxes import UnixLocalSandboxClient

agent = SandboxAgent(
    name="Workspace Assistant",
    instructions="Inspect the sandbox workspace before answering.",
    default_manifest=Manifest(entries={"repo": GitRepo(repo="org/project", ref="main")}),
)
result = Runner.run_sync(agent, "Summarise what this repository does.",
                         run_config=RunConfig(sandbox=SandboxRunConfig(client=UnixLocalSandboxClient())))
```

Set `OPENAI_AGENTS_DISABLE_TRACING=1` or configure a custom trace processor before production — the default ships agent runs, prompts included, to OpenAI's trace view.

## Key Use Cases

1. **Triage and routing**: a router agent whose handoffs are specialists, so classification and dispatch are structured actions rather than parsed prose.
2. **Customer-facing assistants with sessions**: history stored server-side per user, retrievable across turns, without building a message store first.
3. **Coding and repository agents**: a sandbox agent that clones a repo at a pinned ref, reads files, runs tests and proposes a patch, with containment provided by the container.
4. **Voice interfaces**: a realtime agent for conversational latency or a voice pipeline for asynchronous audio in and out, using the same agent definitions.
5. **Guardrailed customer interactions**: input checks that block prompt injection attempts and output checks that block policy violations, both as functions on the agent.
6. **Tool-rich internal automation**: function tools, MCP servers and hosted tools composed in one agent, which is the fastest path to an assistant that can actually act.
7. **Prototyping an agent architecture before committing**: the small vocabulary makes it cheap to try a router-with-specialists design and discover whether it needs graph-level state.

## Strengths

- The core loop is written for you and the surrounding vocabulary is small — a working multi-agent system fits in a screen or two.
- Sandbox run mode gives an agent a real workspace (files, shell, patches) instead of a dozen hand-wrapped tools, with containerisation as the containment boundary.
- Sessions remove the most tedious boilerplate in every agent codebase: conversation history that persists per user without a bespoke store.
- Tracing is on by default and useful immediately, which is the opposite of the usual pattern where observability is a later project.
- Handoffs and agents-as-tools cover delegation both ways, and guardrails run alongside the model call rather than as a post-hoc filter.
- Provider-agnostic by configuration, with the OpenAI path best-supported — you can start on one provider and move without a rewrite.
- 23 open issues on a 30,000-star project is an unusually clean tracker, and releases are frequent.

## Limitations

- **External contributions are closed.** Pull requests are limited to collaborators, so a fix you need cannot be upstreamed unless someone at OpenAI prioritises it.
- **Tracing defaults to sending data out.** Agent runs, prompts included, go to OpenAI's trace view unless you disable or redirect it — a compliance surprise waiting in a default.
- **The runner is not a durable workflow engine.** No checkpointer, no pause-and-resume across processes, no retry semantics at the step level; long-running business processes need one.
- **The abstractions sit close to one vendor's idioms.** Provider-agnostic support exists, but the parametrisation, tool-call and hosted-tool shape are OpenAI's, and other providers are adapted into it.
- **Voice and realtime modes are hardware-sensitive.** Realtime runs over a persistent WebSocket and voice pipelines deal in audio buffers; both are harder to test and observe than text, and neither behaves well behind a naive proxy.
- **Sandbox containment is your configuration.** A `UnixLocalSandboxClient` runs on your host by design; the isolation is only as good as the Docker or hosted client you choose.
- **Documentation and examples move fast.** The sandbox and realtime surfaces are recent, so blog posts and generated code frequently reference APIs that have moved.

## Relation to the Arsenal

Read it against `langgraph` (explicit state machines, checkpointing), `pydantic-ai` (typed, model-agnostic, dependency injection), `crewai` (role-based crews), `google-adk` (Google Cloud deployment) and `smolagents` (code-as-action). For what it delegates to, see `mcp-servers`; for tracing alternatives that can receive the spans, see `openlit` and `langfuse`.

A pragmatic pairing: this SDK for the agent loop, a graph framework or workflow engine when a process needs durable state, and a dedicated observability tool when traces must live in your own infrastructure.

## Resources

- [GitHub](https://github.com/openai/openai-agents-python)
- [Documentation](https://openai.github.io/openai-agents-python/)
- [Sandbox agents](https://openai.github.io/openai-agents-python/sandbox_agents)
- [Realtime quickstart](https://openai.github.io/openai-agents-python/realtime/quickstart/)
- [Human in the loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)
- [Tracing](https://openai.github.io/openai-agents-python/tracing/)
- [JavaScript/TypeScript version](https://github.com/openai/openai-agents-js)
