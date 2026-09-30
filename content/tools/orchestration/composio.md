---
id: composio
name: "Composio"
type: tool
job: [orchestration]
description: "Hosted tool layer supplying agents with pre-authenticated OAuth sessions for more than a thousand apps"
url: "https://composio.dev"
cost_model: freemium
pricing_detail: "Free tier; usage-based paid plans for higher tool-call volumes and enterprise auth"
tags: [tool-use, security]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: "Free tier with monthly tool-call quota"
self_hostable: false
open_source: true
source_url: "https://github.com/ComposioHQ/composio"
docs_url: "https://docs.composio.dev"
github_url: "https://github.com/ComposioHQ/composio"
alternatives: [chrome-devtools-mcp]
integrates_with: [langchain, crewai, openai-agents-sdk]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You are shipping a product where each of your users must connect their own accounts — Gmail, Calendar, Slack — and you need per-user OAuth state you do not have to build.", "You want to avoid loading hundreds of tool definitions into the model context, because Composio's default meta tools discover, authenticate and execute app tools at runtime instead.", "You already use OpenAI Agents, LangChain or the Vercel AI SDK and want a provider adapter that hands the framework a ready tool list."]
avoid_when: ["You need the whole stack to run inside your own VPC with no third-party control plane, because the session model is defined in Composio's hosted service and the tool calls leave your process.", "You have a policy against sending tool arguments to a third-party service, since every execute call carries user data across the Composio boundary.", "You need long-lived unattended credentials for a single tenant, because the whole design centres on per-user interactive session creation with a COMPOSIO_API_KEY behind it."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (29,134), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: watching
verdict_rationale: "Strongest managed tool-catalog play for agents; the category (vs raw MCP servers) is still shaking out"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ComposioHQ/composio", "date": "2026-07-08", "description": "29,134 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Composio is an integration service that hands an agent a working session against a third-party app. You create a session scoped to one of your users, ask it for its tools, and pass that tool list straight into your agent framework. Sessions ship meta tools by default: rather than pinning hundreds of schemas into your system prompt, the agent searches for a tool at runtime, triggers the auth flow if it is not connected, then executes it. The monorepo carries the TypeScript core, the Python SDK, a CLI for scripting tools from a shell, and provider adapters for OpenAI Agents, Claude Agent SDK, Vercel AI SDK and LangChain. There is also a sandbox and a trigger system for inbound events.

## Why It's in the Arsenal

The recurring engineering decision is who owns OAuth for your end users. Doing it yourself means storing refresh tokens, handling token rotation, writing per-provider consent screens and dealing with each app's scope quirks — a cost that scales with the number of integrations, not the number of users. Composio moves that to a service where the session id is the only piece of state your application keeps. The second decision is context budget: exposing 1,000 tools as function schemas would swamp most models, so the meta-tool pattern trades a little latency for a tiny prompt.

## Key Features

- Per-user session isolation is the primitive, so multi-tenant products do not have to invent a credential store.
- Runtime tool discovery via meta tools keeps context small even with 1000+ integrations available.
- Provider adapters for the major agent SDKs mean the framework is a swap rather than a rewrite.
- MIT-licensed SDK with a CLI, so integration work can be scripted and tested outside the app.

## Architecture / How It Works

The SDK creates a session bound to a user_id, and session_id becomes the handle you persist and later pass to composio.use() to resume across turns. Tool discovery is two-stage: the session exposes meta tools that search the catalogue, and only the resolved tool is then executed against the upstream app with the stored credentials. Provider adapters translate that resolved tool into the calling framework's own function-calling shape, so an OpenAI Agents tool, a LangChain StructuredTool and a Composio session all present the same capability. The CLI exposes the same search/execute path for shell scripting, and the sandbox provides an isolated place to run tool code.

## Getting Started

Create a session for a user, take its tools, and hand them to the framework:

```bash
pip install composio composio-openai-agents openai-agents
```

```python
from composio import Composio
from composio_openai_agents import OpenAIAgentsProvider

composio = Composio(provider=OpenAIAgentsProvider())
session = composio.create(user_id="user_123")
tools = session.tools()
```

You need a COMPOSIO_API_KEY from the dashboard first; store session.session_id and reuse it with composio.use() for later turns.

## Use Cases

1. Personal-assistant product: each user connects their own Gmail, Slack and Notion once, and the assistant can later read and act on their behalf without your app ever holding a refresh token.
2. Support triage: the agent searches for a ticketing tool at runtime, authenticates the workspace connection, and files or updates tickets during the conversation.
3. DevOps automation with many systems: one session exposes GitHub, Jira and PagerDuty, and the tool-search step keeps the prompt small enough that you do not have to prune schemas.

## Strengths

Composio competes with the do-it-yourself approach that most agent products start with, writing one OAuth client per app, and it overlaps with MCP servers such as filesystem or GitHub servers in the same 'let the model call things' category, except Composio owns the credential lifecycle while an MCP server usually inherits whatever the host process already has. It complements rather than replaces the tool-defining work in CrewAI or LangGraph, both of which will happily consume a Composio tool list. Compared with n8n, which is a workflow canvas with a large integration catalogue, Composio is a headless SDK: no canvas, but direct per-user sessions and a tool-search step. Look at it next to LangChain's own partner integrations and the browser drivers in browser-use if your actions are UI-shaped rather than API-shaped.

## Limitations / When NOT to Use

This is a hosted control plane in the request path: every tool call crosses Composio, which is a latency cost and a data-residency decision you have to make explicitly. The session model assumes interactive auth, so headless service accounts and unattended long-running jobs fit awkwardly. The catalogue is broad but shallow for edge cases — a tool existing in the list does not mean it covers the field you need — and each provider adapter is a compatibility surface that lags framework releases. The MIT license covers the SDK, not the hosted service pricing or its tier limits.

## Integration Patterns

This sits in content/tools/orchestration, the same phase as agno and n8n, but at the credential layer rather than the runtime layer. It is the natural companion to the framework entries in content/projects/frameworks — LangChain, LlamaIndex, AutoGen — which define the agent that consumes these tools. Pair it with litellm if you are also standardising model access, and with browser-use in content/projects/agent-systems when the action has no API and you must drive a UI instead.

## Resources

- [GitHub — ComposioHQ/composio](https://github.com/ComposioHQ/composio)
- [Documentation — docs.composio.dev](https://docs.composio.dev)
- [Quickstart and session concepts](https://docs.composio.dev)

## Buzz & Reception

Hand-rolling OAuth against Gmail, Slack, GitHub and a thousand more apps is months of work; a per-user session object with discover/authenticate/execute meta tools collapses that into one SDK call
