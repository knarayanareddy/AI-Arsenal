---
id: lobe-chat
name: LobeChat (LobeHub)
version_tracked: null
artifact_type: platform
category: llms
subcategory: platforms
description: Self-hostable, multi-provider AI chat platform with plugins, agents marketplace, knowledge base, and one-click deployment
github_url: "https://github.com/lobehub/lobehub"
license: "Apache-2.0 (with additional terms for multi-tenant SaaS)"
primary_language: TypeScript
org_or_maintainer: lobehub
tags: [llm, self-hosted, agents]
maturity: production
cost_model: self-hostable
github_stars: 79620
github_stars_last_30d: 0
trending_score: 72
last_commit: "2026-07-08"
docs_url: "https://lobehub.com/docs"
demo_url: "https://lobechat.com"
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [actively-maintained, community-driven, production-proven]
ecosystem_role:
  - One of the two dominant self-hosted chat frontends (alongside Open WebUI), differentiated by its TypeScript/Next.js stack, agent/plugin marketplace, and polished multi-provider UX — the "bring your own API keys" deployment pattern for teams that want a ChatGPT-class interface without sending data to a SaaS
best_for:
  - You want a production-quality, self-hosted chat UI over multiple providers (OpenAI, Anthropic, Gemini, Ollama, local models) with file/knowledge-base RAG, TTS/STT, and plugin function calling out of the box
  - Your team is TypeScript-native and may fork the UI — LobeChat's Next.js codebase is far easier to extend for web engineers than Python-based alternatives
avoid_if:
  - You need strict open-source licensing for a multi-tenant commercial deployment — the license adds terms beyond plain Apache-2.0 for that case; review before building a product on it
  - You only need a thin UI over a local Ollama instance — Open WebUI is lighter to run and more tightly integrated with local-model workflows
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

LobeChat is a self-hostable AI chat platform: a modern Next.js frontend over any combination of model providers (hosted APIs and local runtimes), with an agents/plugins marketplace, built-in knowledge-base RAG, multimodal input, and speech in/out. It occupies the "deployable product" end of the chat-UI spectrum — closer to running your own ChatGPT than to a demo scaffold.

## Why it's in the Arsenal

The self-hosted chat frontend is the most common first deployment for teams adopting LLMs with data-residency requirements, and LobeChat is one of the two default answers (with Open WebUI). It earns its entry on adoption scale (79k+ stars, daily commits), breadth (plugins, RAG, multi-provider), and a fork-friendly TypeScript codebase — the practical differentiator for web-engineering teams.

## Architecture

Next.js application with a provider-abstraction layer routing chats to OpenAI/Anthropic/Google/OpenRouter/Ollama and others; PostgreSQL-backed server mode for multi-user deployments with auth; plugin system implementing function calling against a marketplace of community plugins; knowledge-base pipeline (upload → chunk → embed → retrieve) for file-grounded chat. Deploys via Docker or Vercel one-click.

## Ecosystem Position

Upstream: model providers and local runtimes (Ollama). Competing: Open WebUI (Python, local-first), LibreChat (multi-provider, enterprise auth focus). Complementary: serving engines like vLLM/Ollama that it fronts. The marketplace gives it an ecosystem-flywheel dynamic the alternatives mostly lack.

## Getting Started

```bash
docker run -d -p 3210:3210 -e OPENAI_API_KEY=sk-... lobehub/lobe-chat
```

## Key Use Cases

1. **Scenario**: an internal ChatGPT replacement over company-approved providers, self-hosted for data residency, with per-user auth and shared assistants
2. **Scenario**: a customizable chat product base — fork the Next.js codebase, keep the provider layer and plugin system, reskin the UX

## Strengths

- Broadest polished feature set among self-hosted chat UIs: plugins/function calling, knowledge-base RAG, TTS/STT, multi-provider, agent marketplace
- TypeScript/Next.js stack makes it the most fork-and-extend-friendly option for web teams; very active development (daily commits as of 2026-07-08)

## Limitations

- License is Apache-2.0 with additional terms constraining multi-tenant commercial SaaS use — fine for internal deployment, needs legal review for productization
- Heavier than minimal local-first UIs; the full server mode (Postgres, auth) is real infrastructure to operate

## Relation to the Arsenal

This is an agent-system entry: a deployable platform, not a library. Compare with `open-webui` (projects) for the local-first alternative; the serving engines it fronts live in [tools/serving-and-deployment](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/lobehub/lobehub)
- [Documentation](https://lobehub.com/docs)
