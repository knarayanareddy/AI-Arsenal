---
id: flowise
name: "Flowise"
type: tool
job: [orchestration, prototyping]
description: "Archived Node.js visual builder for LangChain-style agent graphs, now superseded by the Flowise successor"
url: "https://flowiseai.com"
cost_model: open-source
pricing_detail: "Apache-2.0 self-hosted free; Flowise Cloud from ~$35/mo"
tags: [orchestration, langchain]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Self-hosting is free; cloud has prediction/storage quotas per tier"
self_hostable: true
open_source: true
source_url: "https://github.com/FlowiseAI/Flowise"
docs_url: "https://docs.flowiseai.com"
github_url: "https://github.com/FlowiseAI/Flowise"
alternatives: [langflow, n8n, dify]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype]
best_when: ["You are maintaining an existing Flowise installation and need the documented npm and Docker paths to keep patching the JSON flow definitions in place.", "You want a visual agent builder whose output is inspectable JSON and a swagger-documented Express API rather than an opaque hosted canvas.", "You are migrating off the archived repo and need to know which LangChain node patterns you have to rebuild elsewhere before the old container stops receiving fixes."]
avoid_when: ["You are starting something new, because the README opens with a notice that Flowise has been archived and points to a separate Future of Flowise destination.", "You need ongoing features or upstream LangChain compatibility, because an archived repo means no new releases and no node updates for breaking library changes.", "You want a typed, testable definition of your agent graph, because a canvas-authored JSON flow gives you no unit-test surface and no static typing on the node contracts."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (54,424), license, and last push (2026-07-06) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: solid-choice
verdict_rationale: "The JS-ecosystem counterpart to Langflow; the fastest path from idea to embeddable chatbot for Node teams"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/FlowiseAI/Flowise", "date": "2026-07-08", "description": "54,424 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Flowise was a TypeScript visual builder for LLM applications: a React canvas where nodes covering LangChain primitives, vector stores, chat models and tools are wired into a DAG, persisted as JSON and served through an Express backend with swagger-ui API docs generated from the routes. The monorepo splits into server, ui, components (third-party node integrations) and api-documentation. It shipped as an npm global package, a Docker Compose stack and a single Docker image, with the Docker route needing a .env copied from .env.example.

## Why It's in the Arsenal

The decision it addressed was whether non-specialists could assemble a RAG or agent pipeline without writing Python. Dragging a retriever and a chain node onto a canvas removed the packaging and import boilerplate that stopped people at hello-world. That same choice is now the liability: the graph lives in a JSON document edited through a GUI, so it cannot be reviewed in a pull request, unit-tested, or refactored with the tools a team already uses.

## Key Features

- Extremely low barrier to a first working pipeline for teams without a Python or LangChain background.
- Flow definitions persist as JSON and expose an HTTP API, so a canvas build can be embedded without a Python host.
- Docker Compose and single-image paths cover both developer laptops and shared internal deployments.
- The monorepo separates node integrations into their own package, which kept the connector surface navigable at its size.

## Architecture / How It Works

The React frontend renders the node graph and serialises it to JSON; the Express server loads that document, resolves each node's component from the components package, and executes the chain through LangChain.js primitives. Model, vector store and tool credentials arrive through environment variables defined in .env. Development required pnpm install followed by pnpm build, and the README warns that a Node heap out of memory error during build needs NODE_OPTIONS=--max-old-space-size=4096 before retrying.

## Getting Started

The archived README still documents the full path. Global npm install is the shortest route:

```bash
npm install -g flowise
npx flowise start
```

Docker Compose from the repo's docker directory with .env copied from .env.example, or a single container: `docker run -d --name flowise -p 3000:3000 flowise`.

## Use Cases

1. Standing up an internal chatbot prototype where product or support staff assemble the flow themselves without a Python environment.
2. Inspecting and hand-editing an existing canvas-authored flow JSON during a migration off the archived project.
3. Serving a stable flow through the Express API for an embeddable widget, using the auto-generated swagger docs as the contract.

## Strengths

It competed with Langflow and Dify in the visual LLM-app builder category, and with n8n in general workflow automation, and Flowise's differentiator was the tightest LangChain node coverage of the three. It overlaps with LangChain itself as the library whose primitives it composes rather than reimplements. Compared with Dify, Flowise leaned harder on a canvas-and-export model and less on an application runtime with its own database, which is a large part of why an archive notice landed where it did.

## Limitations / When NOT to Use

The repository is archived, which is the defining constraint: no new features, no security cadence you can rely on, and no node updates when LangChain.js makes breaking changes. The GitHub license field reports NOASSERTION, so redistribution terms need to be confirmed from the repository's own LICENSE text before any commercial embedding. Node 20.0.0 is the floor, and building from source in the monorepo needs an explicit heap-size bump, which is an early signal of how heavy the build is. A JSON graph authored in a GUI also gives you no diffs, no tests, and no compile-time checking on node contracts.

## Integration Patterns

This entry sits in content/tools/orchestration next to langflow, which is the live successor in the same visual-builder category, and near the agent frameworks in content/projects/frameworks whose primitives it composed. If you are still running it, the migration path runs through langflow or a code-first framework; use this entry to understand what your existing flows do, not as a recommendation to adopt it.

## Resources

- [GitHub — FlowiseAI/Flowise (archived)](https://github.com/FlowiseAI/Flowise)
- [Docs — docs.flowiseai.com](https://docs.flowiseai.com)
- [Future of Flowise announcement](https://github.com/FlowiseAI/Flowise/blob/main/docs/Future%20of%20Flowise.md)

## Buzz & Reception

Gave non-Python teams a drag-and-drop canvas for RAG and agent chains that exported to JSON and served an Express API, before the project was archived.
