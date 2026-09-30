---
id: agenta
name: Agenta
version_tracked: null
artifact_type: platform
category: observability
subcategory: tracing
description: "Self-hostable workspace where you build agents by chatting with them, then share them with a team and run them in the background on schedules or events"
github_url: "https://github.com/Agenta-AI/agenta"
license: NOASSERTION
primary_language: TypeScript
org_or_maintainer: null
tags: [self-hosted, agents]
maturity: beta
cost_model: self-hostable
github_stars: 4787
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://agenta.ai/docs/self-host/quick-start"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: platform
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Open-source LLMOps platform combining prompt management, evaluation, and observability in a self-hostable stack
best_for: ["You want a non-specialist on your team to build and share an automation, because agents are defined in chat and shared with role-based access rather than as code they would have to review.", "You need agents that run unattended on a schedule or an event from a connected app, and you need per-tool permissions deciding what may run automatically, what needs approval, and what is blocked.", "You already pay for a Claude or ChatGPT subscription and would rather run agents against that on your own infrastructure than move every task onto metered API billing."]
avoid_if: ["You intend to expose the instance beyond a trusted network, because sign-ups are open by default and the documentation routes you to a separate guide for restricting registration.", "You need harness coverage beyond Claude Code, Pi and Codex today, because the roadmap marks Gemini, OpenCode, E2B, Vercel, Cloudflare, Modal and BoxLite as not yet delivered.", "You cannot accept a Docker dependency with socket access, because agents execute in a separate runner container that needs the daemon, and the docs are explicit that docker group membership is effectively root on that host."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, langsmith-platform, phoenix, helicone]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production case studies found beyond the project's own documentation; assessment is based on public repository structure and feature documentation rather than an external case study.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Agenta is positioned as a workspace rather than a library. You describe the work in conversation, connect the applications the agent needs, iterate on it through feedback, then either use it directly in chat or promote it to a background agent that fires on a schedule or on an event from a connected app. The workspace is shared with the agent on real files, so document writing, research organisation and wiki maintenance happen in a common directory. Integrations arrive through MCP or through Composio, which the README describes as covering more than a thousand applications including Gmail, Slack, Notion and GitHub. Around that sit the pieces that decide whether a background agent is safe to leave running: per-tool permission tiers, and a trace plus configuration version history so a failure can be attributed to a specific change. The model layer is deliberately wide - the roadmap lists OpenAI, Anthropic, OpenRouter, Mistral, Cohere, Perplexity, Together, Groq, Google, Azure, Bedrock, OpenAI-compatible endpoints and self-hosted Ollama.

## Why it's in the Arsenal

The decision is where an agent becomes an owned asset rather than a script in someone's shell history. Prompt-level agents are easy to make and hard to operate: nobody knows which version is live, what it was allowed to do, or what it touched at three in the morning. Versioning the configuration, tracing every run, and separating automatic from approval-gated actions turns the agent into something with a review trail. The cost is the platform underneath - Docker Compose, Postgres, a runner service and a UI - which is real infrastructure to own for a small team, and the reason the commercial cloud tier exists alongside the self-hosted path.

## Architecture

The web app, API and databases deploy as a Docker Compose stack fronted by Traefik, with Postgres and its alembic migrations for the OSS path, and Traefik handles routing so the API and services URLs are externally reachable. Agents do not run in the web process: a separate runner service executes them, and the runtime choices cover a local runtime plus Daytona and Docker sandboxes, so the isolation boundary is the runner rather than a library call. Upgrades are explicit - pull with --pull always, then run the migration to head - which tells you the data model is versioned and not treated as disposable. Permission tiers are evaluated at the tool-call boundary, and the trace store records model requests, token usage and estimated cost per agent, which is what makes the version history useful for cost attribution and not just debugging. Harnesses are pluggable rather than built in, which is why Claude Code, Pi and Codex appear on a roadmap alongside each other.

## Ecosystem Position

It competes with Dify, Flowise and Langflow in the visual agent-builder category, and the sharpest difference is who the builder is: those three hand you a canvas to assemble a workflow, while Agenta leads with a conversation and treats the graphical layer as a workspace on top. It also overlaps with content/projects/frameworks entries such as crewai and langgraph, but in the opposite direction - they are libraries you import, this is a platform you deploy that also exposes an SDK. Compared with AgentOps or Langfuse, which watch agents after they run, Agenta owns the configuration, permissions and scheduling that determine what the agent does at all. Its model layer is a consumer of whatever you configure, including a local ollama endpoint, and its harness layer delegates to CLIs you already trust.

## Getting Started

Self-hosting runs from a sparse clone so you do not pull the whole repository:

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/Agenta-AI/agenta
cd agenta
git sparse-checkout set hosting/docker-compose api/oss/databases/postgres api/ee/databases/postgres
cp hosting/docker-compose/oss/env.oss.gh.example hosting/docker-compose/oss/.env.oss.gh
docker compose -f hosting/docker-compose/oss/docker-compose.gh.yml --env-file hosting/docker-compose/oss/.env.oss.gh --profile with-web --profile with-traefik up -d
```

Open http://localhost to sign up. A Kubernetes Helm path and a self-hosting skill install are documented as alternatives.

## Key Use Cases

1. Team-shared automation: a non-engineer builds an agent in conversation, and the rest of the team gets it with role-based access and a version history rather than a pasted prompt.
2. Unattended scheduled work: register a background agent on a schedule or an event from a connected app, with permissions deciding which tool calls proceed without a human.
3. Regression review after a change: diff two configuration versions against their traces to see which edit changed token spend, tool usage and failure rate.

## Strengths

- Agents are built by conversation, which removes the code-review barrier for people who can describe the work but would not write the pipeline.
- Per-tool permission tiers, including an explicit block state, make unattended execution defensible rather than reckless.
- Configuration version history plus run traces turn agent behaviour into something you can compare and attribute.
- Self-hosting lets you run against an existing Claude or ChatGPT subscription instead of moving every task to metered API billing.

## Limitations

The security posture is the headline caveat: sign-ups are open by default, so anyone who can reach the instance creates their own organization, and hardening it is a documented extra step rather than a default. Harness support is genuinely narrow right now - three harnesses shipped, with six runtimes and two channel destinations still unchecked on the roadmap, which means a team on a mixed toolchain will hit gaps. Operational surface is large for the value: Compose, Postgres, Traefik, migrations and a runner container that needs Docker socket access. The project also has a commercial cloud tier, so be deliberate about which of your agent runs happen on the hosted path. And the open-source-versus-enterprise split in the repository layout means some capabilities you may want are not in the version you can self-host.

## Relation to the Arsenal

This is the workspace-and-operations entry in content/projects/benchmarks-and-evals, which is an unusual home for a product platform and reflects how its role is defined here: the place agents are built, run and compared rather than the place they are evaluated as a benchmark. It sits alongside the observability tools in content/projects/evaluation-and-observability, which would watch an agent after the fact, and it wraps the coding agents in content/tools/dx-and-tooling as a harness rather than replacing them. For orchestration you build in code rather than through a UI, the frameworks phase holds those libraries.

## Resources

- [GitHub — Agenta-AI/agenta](https://github.com/Agenta-AI/agenta)
- [Self-host quick start](https://agenta.ai/docs/self-host/quick-start)
- [Product site and docs](https://agenta.ai/docs/)
