---
id: lobe-chat
name: LobeChat (LobeHub)
version_tracked: null
artifact_type: platform
category: llms
subcategory: platforms
description: "Self-hostable chat and agent workspace that hires, schedules and reports on a fleet of configured agents"
github_url: "https://github.com/lobehub/lobehub"
license: NOASSERTION
primary_language: TypeScript
org_or_maintainer: lobehub
tags: [agents, orchestration, self-hosted]
maturity: production
cost_model: open-source
github_stars: 82874
github_stars_last_30d: 0
trending_score: 72
last_commit: "2026-09-28"
docs_url: "https://lobehub.com/docs"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [actively-maintained, community-driven, production-proven]
ecosystem_role:
  - One of the two dominant self-hosted chat frontends (alongside Open WebUI), differentiated by its TypeScript/Next.js stack, agent/plugin marketplace, and polished multi-provider UX — the "bring your own API keys" deployment pattern for teams that want a ChatGPT-class interface without sending data to a SaaS
best_for: ["You want a polished, self-hosted chat front end for your own models and your own API keys, deployed with Docker or a one-click Vercel, Zeabur, Sealos or Alibaba Cloud deploy.", "You are standardising on MCP tools and want them discoverable from one client rather than re-plumbed per application, which the plugin surface handles.", "You need an always-on agent operation — scheduled runs, a roster of agents and a report on what they did — rather than a chat window that only acts while somebody is looking."]
avoid_if: ["You need a clean OSS licence you can read, because the GitHub API reports NOASSERTION for this repository, so the licence position needs checking against the source before you commit to it commercially.", "You want a minimal client, because this is a large TypeScript product with a plugin ecosystem and a UI-first design, and a thin SDK would be a better fit for embedding.", "You expect stable internals across upgrades, because the README describes the project as under active development with feedback invited on any issue."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [open-webui, librechat]
integrates_with: [ollama]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (79.6k), TypeScript, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. License nuance (Apache-2.0 base with additional terms) from the repository's LICENSE file. Feature claims from official docs; not independently benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/lobehub/lobehub","date":"2026-07-08","description":"79.6k stars, active daily development"}
featured: false
status: active
---

## Overview

LobeHub is a chat and agent workspace built around the idea that agents are units of work. Rather than a single conversation, the product models hiring an agent, scheduling it, and reporting on what it did — the framing is a Chief Agent Operator running an AI team rather than a chat app with tools bolted on. It ships as a TypeScript app you can deploy with Docker or through hosted platforms, connects to model providers through an OpenAI-compatible configuration, and carries a plugin system for MCP tools, an agent-creation surface, collaboration features for multi-agent setups, and a self-hosting path with documented environment variables. The visual design and i18n (English, Simplified Chinese) are first-class parts of the product.

## Why it's in the Arsenal

The decision it addresses is supervision of agents that run without you. Once a model can take real actions, the hard question stops being capability and becomes operations: who is on the roster, what ran overnight, and what did it change. LobeHub's answer is to make the agent the schedulable entity and treat the interface as a report surface. The second decision is where the model runs and where the keys live — self-hosting means the OpenAI-compatible configuration and the credentials stay in your deployment rather than in someone else's account.

## Architecture

The front end is TypeScript, typically Next.js-shaped, talking to configured model providers through an API-compatible endpoint and an OpenAI key set in environment variables. Plugins are the extension point: an MCP server is registered as a plugin and its tools become available to agents in the workspace, which is how a generalist chat client becomes a tool-using client. Scheduling and the agent roster are the second structural layer, since the product's core loop is create agent, give it tools, schedule it, read the report. Self-hosting runs the same application under Docker with a data store you control, and the README also documents deployment to Vercel, Zeabur, Sealos and Alibaba Cloud as alternative targets.

## Ecosystem Position

LobeHub competes in the same slot as AnythingLLM and Open WebUI — self-hosted chat clients with tool support — and the differentiator is the operator framing rather than the chat. It overlaps with the agent frameworks in content/projects/frameworks such as mastra and with n8n in content/tools/orchestration, since both are about scheduling and connecting systems, though n8n's unit is a visual workflow and LobeHub's is an agent. Compared with the coding agents OpenHands and mistral-vibe, this is a workspace rather than a terminal loop. It complements the MCP tooling such as context7 and chrome-devtools-mcp, which are consumed as plugins, and it is a client rather than a competitor to the inference engines in content/projects/inference-engines.

## Getting Started

Docker is the self-hosting route; the compose file plus an OpenAI-compatible key is the whole setup:

```bash
git clone https://github.com/lobehub/lobehub.git
cd lobehub
docker compose up -d
```

Set the OpenAI-compatible base URL and key in the environment configuration before first load, then open the web UI and add MCP servers as plugins to give the agents tools.

## Key Use Cases

1. Unattended agent operation: schedule an agent to run on a cadence and read a report of what it did, instead of triggering it by hand each morning.
2. Personal multi-model front end: one client over several providers, with the keys and the traffic on your own deployment.
3. MCP tool hub: register a set of MCP servers once and give every agent in the workspace the same tool surface, instead of wiring tools per conversation.

## Strengths

- Deployment breadth is unusually practical: Docker plus documented paths to Vercel, Zeabur, Sealos and Alibaba Cloud.
- Agent-first product model with scheduling and reporting, which suits long-running work better than a chat transcript.
- Plugin architecture makes MCP servers first-class tools rather than an integration someone has to write.
- Strong UI and Simplified Chinese localisation, both of which matter for internal rollouts.

## Limitations

The GitHub API reports NOASSERTION for the licence, which for a project you may self-host inside a company is a real question to resolve against the source rather than assume. It is a large application with a broad plugin surface, so a bad plugin or a misconfigured provider is a support surface a lean team has to own. Scheduling and reporting are product features on top of whichever model you point it at, so the reliability you observe is the reliability of that model and provider combination, not of the client. Being under active development means schema changes in stored conversation data are possible.

## Relation to the Arsenal

This is an agent-systems phase entry, and its closest siblings in that folder are AnythingLLM and open-webui, which solve the same self-hosted-client problem with a different emphasis. Pair it with the MCP server entries — context7, chrome-devtools-mcp — since those are what you plug in, and with mastra or vercel-ai-sdk in content/projects/frameworks if you are also building the application side. The inference engines such as ollama or vllm sit underneath as the endpoint this client will happily point at.

## Resources

- [GitHub — lobehub/lobehub](https://github.com/lobehub/lobehub)
- [Project site — lobehub.com](https://lobehub.com)
- [Self-hosting and plugin documentation](https://lobehub.com/docs)
