---
id: librechat
name: "LibreChat"
version_tracked: null
artifact_type: platform
category: agents
subcategory: platforms
description: "Self-hostable ChatGPT-style web client with multi-user auth, agents, MCP, skills and a sandboxed code interpreter"
github_url: "https://github.com/LibreChat-AI/LibreChat"
license: MIT
primary_language: TypeScript
org_or_maintainer: "LibreChat (Danny Avila)"
tags: [agents, self-hosted]
maturity: production
cost_model: self-hostable
github_stars: 45055
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-28"
docs_url: "https://www.librechat.ai"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [community-driven, actively-maintained]
ecosystem_role:
  - "The multi-provider self-hosted chat frontend: where Open WebUI grew up around Ollama, LibreChat grew up around unifying every commercial API (OpenAI, Anthropic, Google, Azure, Bedrock) behind one familiar ChatGPT-clone UX with enterprise-grade auth."
best_for: ["You are standing up an internal ChatGPT replacement and need per-user authentication, group management and conversation isolation rather than a shared API key.", "You need many model providers behind one UI, including OpenAI-compatible custom endpoints and local servers like Ollama and MLX, without a proxy layer in front.", "You want a sandboxed code interpreter for uploaded files inside the chat, running Python, Node, Go, C/C++, Java, PHP, Rust and Fortran in isolation."]
avoid_if: ["You want a lightweight single-user chat client, because the multi-tenant auth, group model and agent machinery are the point of the project and add real surface area.", "You cannot run a MongoDB and a Node service pair, which is the standard self-hosted topology behind the docker-compose and Kubernetes paths.", "You need attached code workspaces in production today, because the README labels workspaces highly experimental in this release."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [open-webui, anythingllm]
integrates_with: [ollama]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (40,447), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/danny-avila/LibreChat", "date": "2026-07-08", "description": "40,447 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

LibreChat's v0.8.8-rc4 changelog leads with an OpenAPI specification and Swagger UI covering inference, events, agent management and skill management, plus a Trace Viewer that renders a conversation as ordered steps with roles, agent identity, tool rounds, previews and cost. Agents can be built no-code, shared per user or group, extended with MCP servers, and given Skills as reusable SKILL.md bundles invoked inside the same run; subagents delegate to isolated child contexts. The Code Interpreter API executes in a sandboxed container and the README points at the ClickHouse code-interpreter project for the isolation layer.

## Why it's in the Arsenal

The decision it removes is who is allowed to spend which tokens. A shared ChatGPT or API key inside a company gives every user the same budget and no revocation path. LibreChat puts OIDC or local auth in front of a per-user agent configuration, so access follows your identity provider, providers and local endpoints are configured once for everyone, and an admin can turn a single person off without rotating a secret.

## Architecture

A React and Node.js server fronts MongoDB for conversations, agents and users, and calls providers through per-provider adapters covering Anthropic, AWS Bedrock, OpenAI, Azure, Google, Vertex and the Responses API, with any OpenAI-compatible endpoint treated as a custom target. MCP servers register tools per agent; Skills load instruction bundles that execute within the same run, and subagents get isolated context windows. File handling and Code Interpreter calls are proxied to a separate sandboxed execution service rather than run in the app process.

## Ecosystem Position

It competes with Open WebUI and Text-generation-WebUI in the self-hosted chat-client category, and differs by owning the agent and auth layer rather than being a thin frontend over an inference API. It overlaps with content/projects/agent-systems entries such as openai-swarm and OpenAI Agents SDK only in that it can talk to MCP tools; its own agent runtime is a product feature, not a library. Compared with content/tools/serving-and-deployment entries such as LiteLLM, LibreChat is the human-facing tier while LiteLLM is the routing tier, and they compose well together.

## Getting Started

The standard self-hosted path is Docker Compose with a .env file, which brings up the API, web client, MongoDB and the code interpreter:

```bash
git clone https://github.com/dagezt/LibreChat.git
cd LibreChat
cp .env.example .env
docker compose up -d
```

Node 20 and MongoDB are prerequisites for the source path.

## Key Use Cases

1. Internal assistant rollout: OIDC-backed users get their own conversation history, agents and file sandbox with no shared credential.
2. Provider shopping in one UI: an engineer switches between a frontier API, an Azure deployment and a local Ollama endpoint without changing application code.
3. Agent configuration as a team artefact: platform engineers publish an Agent with MCP tools and a SKILL.md bundle to a group and let the group iterate within guardrails.

## Strengths

- Broad provider coverage including Bedrock, Vertex, Responses API and arbitrary OpenAI-compatible endpoints.
- Multi-user auth, groups and per-user agent configuration with an agent marketplace and sharing model.
- Sandboxed code interpreter across eight language runtimes with isolated file handling.
- Trace Viewer that exposes agent identity, tool rounds and per-turn cost, which is rare in a chat UI at this maturity.

## Limitations

Self-hosting cost is real: Node plus MongoDB plus a separate sandboxed interpreter service is three things to patch, back up and monitor. Attached code workspaces, which let agents inspect and run commands in a repo, are explicitly highly experimental. Provider feature parity is inherently partial; a new Responses API or Claude capability lands only after the adapters catch up. And the codebase is large and fast-moving, with release candidates carrying the most interesting features, so production upgrades carry real regression risk.

## Relation to the Arsenal

This is the platform entry in content/projects/agent-systems and the place to look for the self-hosted chat tier. It consumes the model routing that content/tools/serving-and-deployment entries provide and the agent patterns that content/projects/frameworks define. Its sandboxed code interpreter is the same category as the runtime isolation in content/projects/agent-systems/nono, and its Trace Viewer feeds the observability tools in content/tools/evaluation-and-observability.

## Resources

- [GitHub — LibreChat-AI/LibreChat](https://github.com/dagezt/LibreChat)
- [Docs — librechat.ai](https://www.librechat.ai)
- [Code interpreter — ClickHouse/code-interpreter](https://github.com/ClickHouse/code-interpreter)
