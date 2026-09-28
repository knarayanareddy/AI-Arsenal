---
id: n8n
name: "n8n"
type: tool
job: [orchestration, prototyping]
description: "Fair-code workflow automation canvas with AI nodes, custom code steps and 1500+ integrations"
url: "https://n8n.io"
cost_model: self-hostable
pricing_detail: "Fair-code license: free self-hosted; paid cloud from ~$24/mo"
tags: [orchestration, agents, self-hosted]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Self-hosted community edition is free and unmetered"
self_hostable: true
open_source: true
source_url: "https://github.com/n8n-io/n8n"
docs_url: "https://docs.n8n.io"
github_url: "https://github.com/n8n-io/n8n"
alternatives: [langflow, flowise, dify]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You are wiring an LLM into a process that already touches a dozen business systems and you want the orchestration to be something a colleague can open and read, not a Python DAG nobody else can follow.", "You need a human-in-the-loop approval step mid-workflow, because approval nodes and long-running execution are native to the editor rather than something you bolt on.", "You want to self-host the automation tier for compliance and use the AI features alongside deterministic logic, mixing visual nodes with JavaScript or Python and npm packages in the same flow."]
avoid_when: ["You need an OSI-approved open-source licence, because n8n is fair-code under the Sustainable Use License with an n8n Enterprise License, which is source-available rather than open source.", "You are building a purely programmatic agent and want versioning, diffs and typed interfaces, because the unit of work is a JSON workflow definition edited through a canvas and a community template gallery.", "You need a library to embed in your own service, because this is a full platform with its own execution engine, credential store and editor, not a component you import."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (195,670), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The workflow-automation platform that captured the AI wave; unmatched integration breadth for glue-plus-agents jobs"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/n8n-io/n8n", "date": "2026-07-08", "description": "195,670 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

n8n is a workflow automation platform that has grown an AI surface rather than starting as one. You build flows on a visual canvas where nodes cover SaaS integrations, LLM calls and agent steps, and you drop into custom JavaScript, Python or npm packages when a node does not do what you need. The README reports 1,500+ integrations and 9,000+ workflow templates, so most connections are configuration rather than code. Model choice is yours — OpenAI, Anthropic, Google or an open-source model — and the architecture does not change when you switch. Deployment is Docker or cloud, with role-based access and audit trails for the enterprise tier, and MCP appears on both sides: n8n can consume MCP servers and expose itself as one.

## Why It's in the Arsenal

The recurring decision is whether agent logic lives inside application code or in an inspectable process definition. n8n's position is that the second is worth a lot when the process touches real systems and needs an approval gate: an operator can open the canvas, see exactly which call hits which account, and change it without a deploy. The cost is that you are now running a platform — a database, an execution engine, a credential store — and the workflow JSON is a first-class artefact that needs its own review discipline rather than a code review.

## Key Features

- Visual canvas plus real code steps, so the parts of a flow that need an HTTP call or a regex are not a fight.
- 1,500+ integrations and 9,000+ templates, which is the fastest path to a connected flow that exists in the catalogue.
- Model-neutral by design, so moving from a hosted API to a self-hosted endpoint is a configuration change.
- Self-hostable with role-based access and audit trails, which is the whole reason to host it yourself.

## Architecture / How It Works

The runtime is a Node and TypeScript execution engine that walks a workflow definition of nodes and edges, each node being a typed operation with credentials resolved from the platform's own encrypted store. Long-running executions persist state, which is what allows a wait node, a human approval step and a retry to coexist in one flow. AI capability arrives as a node family and as agent steps layered over the same graph, so a model call is just another node with a model provider selected in configuration. The MCP story is bidirectional: the platform registers as an MCP client to consume external tool servers and can expose its own workflows as an MCP server, which turns a flow into a tool another agent can invoke.

## Getting Started

The install script brings up a container with a persistent volume, and the editor lands on port 5678:

```bash
curl -fsSL https://get.n8n.io | sh
```

Or run the image directly:

```bash
docker volume create n8n_data
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

## Use Cases

1. Agentic business process: an inbound event triggers an agent step that calls internal tools, then pauses for human approval before writing to a system of record.
2. Model-portable pipelines: build a flow against a hosted model for prototyping, then switch the node to a self-hosted endpoint without rewriting the graph.
3. Expose automation as a tool: publish a flow as an MCP server so another agent can call your process as a single capability rather than reimplementing the integration.

## Strengths

n8n competes with Zapier and Make in general automation and with Dify and Flowise in the AI-workflow column, where the difference is n8n's maturity as a business integration tool and its fair-code licence versus their open-source equivalents. It overlaps with Temporal, the other entry in this batch's orchestration phase, on durability and retries: Temporal is a code-first durable execution library with no canvas, while n8n is a canvas-first platform with code escape hatches. It complements rather than replaces the agent frameworks in content/projects/frameworks, since a crew or a LangGraph run can be invoked from a node, and it is an alternative to hand-rolled orchestration code when the flow is legible rather than algorithmic.

## Limitations / When NOT to Use

The licence is the first thing to check: fair-code under the Sustainable Use License and an n8n Enterprise License, so the source is visible but the permissions are not the ones an OSI licence would grant. A large template gallery creates a security surface — community workflows carry credentials and code — and reviewing them is real work. Running it yourself means owning the database, upgrades, credential encryption and the execution engine's resource behaviour under concurrency. The canvas is excellent for describing a flow and mediocre for reviewing a change, because workflow JSON diffs are hard to read.

## Integration Patterns

This is an orchestration-phase tool and the natural counterpart to the agent frameworks in content/projects/frameworks, which define behaviour in code where n8n describes it on a canvas. Read it beside Temporal in the same phase for the durable-execution comparison, beside dify and flowise for the open-source AI-workflow alternative, and beside n8n's own MCP surface together with the MCP servers in content/tools/developer-experience. The retrieval layer — qdrant, chroma — is what a RAG node in a flow would reach for.

## Resources

- [GitHub — n8n-io/n8n](https://github.com/n8n-io/n8n)
- [Project site and docs — n8n.io](https://n8n.io)
- [Integrations catalogue](https://n8n.io/integrations/)

## Buzz & Reception

Puts agent logic, business logic and human approval on one canvas you can inspect, with JavaScript and Python steps available the moment a node falls short, and it runs on your own infrastructure
