---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "TransformerOptimus"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: superagi
name: "SuperAGI"
artifact_type: framework
category: agents
subcategory: autonomous
description: "Dev-first autonomous agent platform with a GUI, action console, toolkit marketplace and vector-backed memory"
github_url: "https://github.com/TransformerOptimus/SuperAGI"
license: MIT
primary_language: Python
tags: [agents, tool-use, self-hosted, docker]
maturity: beta
cost_model: open-source
github_stars: 17697
last_commit: "2025-01-22"
docs_url: "https://superagi.com/docs/"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "study-and-reference"
  - "deploy-as-is"
health_signals:
  - "community-driven"
  - "research-origin"
ecosystem_role:
  - "An early autonomous-agent platform pairing a GUI and tool marketplace with concurrent, memory-backed agents."
best_for: ["You are piloting autonomous agents with non-engineers in the loop and need a graphical interface plus an action console where a human grants permissions per run.", "You want a toolkit marketplace instead of hand-written connectors, because packages for Twitter, Instagram, email, Jira, file management and knowledge search install into an agent's workflow.", "You are evaluating token spend per agent, because the platform exposes performance telemetry and an optimised-token-usage control rather than leaving cost to guesswork."]
avoid_if: ["You are starting a new project, because the last commit on record is from January 2025 and the surrounding agent frameworks have moved on substantially since.", "You need a library rather than a platform, since the unit of deployment is a Docker Compose stack with Postgres, Redis, Celery and nginx rather than a pip package.", "You want hosted support or an SLA, because the community routes in the README run to a Discord, a subreddit and a maintainer's social account rather than a support contract."]
enrichment_notes: "Repository, MIT license, and 2025-01-22 activity verified via the GitHub API on 2026-07-12. Upstream cadence slowed; include as a reference-era platform."
---

## Overview

SuperAGI is a self-hostable platform for provisioning, managing and running autonomous agents. Agents are created and configured in a graphical interface, then driven through an action console where a human supplies input and grants permissions for each run. A toolkit marketplace supplies the capabilities - Twitter, Instagram, coding, knowledge search, email, Jira, file manager and more - and each toolkit is attached to an agent's workflow rather than coded into it. Below that sit multiple vector database connections for agent memory, performance telemetry for optimisation, and a workflows feature that automates tasks using predefined ReAct steps. The repository is a full application stack: a Python service, a Next.js gui, Celery workers, Redis, Postgres migrations via Alembic, and nginx configuration for local or GPU Docker Compose runs.

## Why it's in the Arsenal

The decision it addresses is supervision. An autonomous agent that can call a toolkit is only deployable if someone can see what it did, approve what it is about to do, and tell whether last week's run was worth the tokens. That is a console-plus-telemetry problem rather than a framework problem, and it is why the product ships a GUI instead of a library. The marketplace also answers the maintenance question: the connectors are the part that rots as third-party APIs change, and moving that churn outside your own repository is worth a lot.

## Architecture

The runtime is a Python service backed by Postgres for state and Alembic migrations, with Celery and Redis for asynchronous agent work, fronted by a Next.js gui and an nginx reverse proxy. Agent memory is persisted into a connected vector database - the repository topics list Pinecone - so a run can retrieve prior context rather than starting cold. Toolkits are installed from a marketplace and registered as callable capabilities in the agent's workflow, which is why the platform is config-driven rather than code-driven. Docker Compose files exist for regular CPU use and for GPU-backed local LLMs, and a config_template.yaml carries the model provider and connection settings. Telemetry is collected per agent so token usage and performance can be reviewed after each run.

## Ecosystem Position

SuperAGI competes with the platform-shaped agent products such as Dify and Flowise in the same way n8n competes with Zapier, offering a UI and a marketplace rather than a library, and it is the older of the three, which is both its historical contribution and its current problem. It overlaps with CrewAI and AutoGen at the framework layer, where behaviour is defined in code and there is no console to supervise from, so the choice is supervision versus control. Compared with agno in the orchestration phase, which serves agents as an API with Postgres and JWT-scoped sessions, SuperAGI is a desktop-style web app with a human in the loop. It complements the inference engines such as Ollama and vLLM when you use the local-LLM compose path, and the eval tooling in content/projects/benchmark-and-eval for measuring what the agents actually do.

## Getting Started

Clone, copy the config template, and bring the compose stack up:

```bash
git clone https://github.com/TransformerOptimus/SuperAGI.git
cd SuperAGI
cp config_template.yaml config.yaml
docker compose -f docker-compose.yaml up --build
```

The README also documents a GPU compose file for local LLMs, plus a Superagi Cloud path where you sign in and add a model provider key in account settings.

## Key Use Cases

1. Supervised autonomous task: configure an agent with a toolkit, then use the action console to give it a goal and approve each consequential action.
2. Knowledge-grounded agent: connect a vector store so the agent retrieves from a private corpus instead of answering from model priors.
3. Toolkit trial: install a marketplace connector such as Jira or Instagram, watch token cost and latency in telemetry, and decide whether it belongs in your own codebase.

## Strengths

- Action console with per-run permissions, which is the missing piece in most agent frameworks for anyone deploying beyond a demo.
- Toolkit marketplace moves connector maintenance out of your own repository.
- Performance telemetry and token-usage control make agent cost a reviewable number rather than a surprise invoice.
- GPU and CPU compose variants plus a local-LLM path, so the stack is not hard-wired to a hosted provider.

## Limitations

The decisive fact is cadence: the last recorded commit is January 2025, so this is a stalled codebase that the agent-framework field has moved well past. That staleness cascades - marketplace tools target older API shapes, the ReAct workflow predates current reasoning-model patterns, and dependency pinning will be the first thing to break. It is also a heavy deployment: the compose stack brings Postgres, Redis, Celery, an nginx proxy and a Next.js frontend, so small is not a description that applies. Community support routes to Discord and social channels with no published support contract.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the platform-shaped ancestor of the current agent tooling, and its closest live comparison is agno in content/tools/orchestration, which solves the same supervision problem with a service API instead of a GUI. Read it beside the framework entries in content/projects/frameworks - CrewAI, AutoGen - if the deciding question is control versus supervision. The inference engines it can call live in content/projects/inference-engines, and the vector stores it can use sit in content/projects/data-and-retrieval. For anything starting today, the same folder's OpenHands and stagehand entries are the more current reference points.

## Resources

- [GitHub - TransformerOptimus/SuperAGI](https://github.com/TransformerOptimus/SuperAGI)
- [Project site and docs - superagi.com](https://superagi.com/)
- [Toolkit marketplace](https://marketplace.superagi.com/)
