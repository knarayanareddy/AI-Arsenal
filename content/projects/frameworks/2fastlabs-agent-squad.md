---
id: 2fastlabs-agent-squad
name: "agent-squad"
version_tracked: null
artifact_type: framework
category: agents
subcategory: multi-agent
description: "Multi-agent framework that routes requests across specialised agents with per-agent model selection"
github_url: "https://github.com/2FastLabs/agent-squad"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "2FastLabs"
tags: [agents, routing, orchestration]
maturity: beta
cost_model: open-source
github_stars: 7775
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-23"
docs_url: "https://2fastlabs.github.io/agent-squad/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Multi-agent framework routing tasks across specialised agents with per-agent model selection, illustrating the cost/latency tradeoff of parallel agent decomposition."
best_for:
  - "You want to route simple questions to a cheap fast model and only escalate to an expensive one when a specialist is needed, with the routing logic in your code rather than in a prompt."
  - "You are experimenting with decomposition — splitting a request into domain specialists and merging their answers — and want a small framework that shows the pattern clearly."
  - "You are deploying on AWS Lambda or Bedrock and want a multi-agent pattern that fits a serverless budget rather than a long-lived service."
avoid_if:
  - "You are latency-sensitive, because several agent round trips in series cost multiple model calls, and the cheapest version of this pattern is still slower than one call."
  - "Your tasks are hard to decompose, since the framework's premise is that a request has a home in a specialist, and a genuinely cross-domain request falls through all of them."
  - "You need a mature production framework with durable state, tracing, and a large ecosystem, since this is a small project with a much narrower feature set."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (7775), Apache-2.0 license, last commit 2026-09-23, Python as primary language and the topic list were API-verified. Orchestrator, router, agent handler, team agent, and the FastAPI and Lambda service layer come from the official docs and repo examples; cost, latency, and routing-fragility caveats are engineering judgement about multi-agent patterns, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/2FastLabs/agent-squad", "date": "2026-09-28", "description": "7,775 stars and last commit 2026-09-23 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

agent-squad is a small multi-agent framework whose central object is an orchestrator holding a list of agents, each with a name, a description, a handler, and its own model configuration. When a request arrives, the orchestrator either routes directly to an agent named in the request or asks the routing logic to classify it — using a classifier model, a keyword heuristic, or a custom function — and dispatches to the winning specialist. The agent handler is an ordinary async callable, so an agent can be a chatbot, a Bedrock-backed model call, a Lambda function, or anything else that takes a message and returns a response, and a multi-agent handler lets one agent delegate to several in parallel and merge their answers. The service layer is a FastAPI or AWS Lambda adapter with streaming and non-streaming chat endpoints, plus a multi-agent-team endpoint that composes several agents behind one route. TypeScript ports of the same patterns exist, and the repository ships runnable examples and an interactive demo mode, which is what makes it useful as a reference rather than only as a dependency.

## Why it's in the Arsenal

The recurring decision in an LLM service is which model handles which request. Sending everything to the strongest model is the obvious default and it is usually wrong: most traffic is a simple question, and the quality difference on that traffic is invisible while the cost and latency difference is not. A routing layer fixes that by making the mapping from request type to model an explicit, inspectable piece of code — you can see which specialist fired, change the routing rule, and give the hard path a bigger model. The framework's second contribution is showing the decomposition pattern in a codebase small enough to read: specialists as independent handlers, parallel dispatch, and answer merging are all visible in a couple of files.

## Architecture

The design is a small class hierarchy. A multi-agent base holds routing, an agent list, and a conversation history, and exposes a route_request that takes an incoming message, picks a target agent either from an explicit hint or by running the classifier, then invokes that agent and returns its response alongside the chosen agent name. The classifier step is pluggable: a Bedrock model call with a short prompt listing agent names and descriptions, a keyword match, or a caller-supplied function, which is the extension point most teams replace. An agent is a plain object with a handler — typically a closure that formats the request, calls a model, and returns text — so adding a specialist means writing a function and a description, not subclassing a framework. A team agent composes several of these in parallel with asyncio.gather and merges their results, which is the decomposition case. The service layer wraps a configured orchestrator in a FastAPI app or a Lambda handler with streaming and non-streaming endpoints and conversation persistence, and the TypeScript port mirrors the same interfaces. Nothing persists state beyond a conversation history list, and there is no scheduler, queue, or retry layer, which keeps it readable and small.

## Ecosystem Position

agent-squad competes with crewai, autogen, and LangGraph for multi-agent orchestration, and it is the smallest and most explicit of them: where LangGraph models the control flow as a graph you can checkpoint and stream, and crewai gives you role scaffolding and a task abstraction, this gives you a router and a list of handlers. Against the langgraph and openai-agents-sdk entries in content/projects/agent-systems it is the same problem with less machinery, which is the right choice for a reference implementation and the wrong one for a durable production workflow. It is complementary to the model-provider entries in content/projects/inference-engines — it calls them rather than replacing them — and to the tool-definition entries, where a handler typically wraps a tool. Compared with a plain LLM gateway such as litellm, a router that understands task semantics rather than just provider health is a different layer.

## Getting Started

Define two specialists and route between them:

```bash
git clone https://github.com/2FastLabs/agent-squad && cd agent-squad
pip install -e ".[examples,anthropic]"
```

```python
import asyncio
from agentsquad import MultiAgentOrchestrator, ClaudeAgent

orchestrator = MultiAgentOrchestrator()
orchestrator.add_agent(ClaudeAgent(
    name="health",
    description="Answers questions about health and fitness",
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
    region="us-east-1",
))
orchestrator.add_agent(ClaudeAgent(
    name="computer",
    description="Answers questions about computers and related technology",
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
    region="us-east-1",
))

async def main():
    response, agent_used = await orchestrator.route_request(
        "I have a headache, what should I do?", user_id="u1", session_id="s1"
    )
    print(agent_used, response)

asyncio.run(main())
```

Run the examples directory for a streaming FastAPI service and an interactive demo to see routing decisions in the terminal.

## Key Use Cases

1. Cost control on a chat service where most requests are simple, routing them to a small model and escalating only when a specialist matches.
2. A domain assistant split across specialists — support, billing, technical — where each handler wraps a different prompt, tool set, or model.
3. Learning or prototyping decomposition: a small, readable codebase showing routing, parallel multi-agent dispatch, and result merging as explicit code.

## Strengths

- Explicit, inspectable routing: you can log which agent fired for which request and change the rule in code rather than in a prompt.
- Per-agent model and provider configuration, so a cheap model and an expensive one coexist behind one endpoint.
- A team agent that dispatches in parallel and merges, which is the decomposition pattern most people need to see once.
- Small and readable, with a FastAPI and Lambda service layer and a TypeScript port, so the pattern transfers between stacks.
  

## Limitations

Every specialist hop is another model call, so a routed multi-agent request costs several times a single call in both latency and tokens, and a team agent multiplies that in parallel. Routing accuracy is the whole game and it is fragile: a classifier prompt that does not cleanly separate the domains sends requests to the wrong specialist, and there is no fallback, retry, or escalation path. State is minimal — a conversation history list, no persistence, no checkpointing, no durable queues — so anything long-running or resumable is out of scope. The framework is opinionated in AWS and Anthropic terms, with a TypeScript port rather than first-class parity, and it is a small project with a narrow feature set compared with LangChain or LangGraph. Multi-agent decomposition generally does not improve accuracy on tasks that are not genuinely separable, so the added cost often buys routing rather than reasoning.

## Relation to the Arsenal

This is the multi-agent entry in content/projects/frameworks, and the comparison worth making is with the agent frameworks in content/projects/agent-systems — LangGraph, the openai-agents-sdk, and autogen — which trade this framework's simplicity for durable state and explicit graph control flow. The specialists it routes to are ordinary handlers that call the model providers in content/projects/inference-engines, and the tools they wrap are the tool-definition entries. For observability, the langfuse and opik entries are where you would see the routing decisions and per-agent costs this makes. Versus a plain gateway such as litellm, this routes on task semantics while a gateway routes on provider health — two different layers that are often both present.

## Resources

- [agent-squad documentation site](https://2fastlabs.github.io/agent-squad/)
- [agent-squad GitHub repository](https://github.com/2FastLabs/agent-squad)
- [Multi-agent team examples](https://2fastlabs.github.io/agent-squad/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (7,775 stars, last commit 2026-09-23, license Apache-2.0, verified via GitHub API on 2026-09-28)*
