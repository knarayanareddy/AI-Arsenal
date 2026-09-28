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
org_or_maintainer: NousResearch
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: hermes-agent
name: Hermes Agent
artifact_type: platform
category: agents
subcategory: autonomous
description: "Nous Research's self-improving personal agent with a TUI, messaging gateway, skill authoring and seven terminal backends"
github_url: "https://github.com/NousResearch/hermes-agent"
license: MIT
primary_language: Python
tags: [agents, llm]
maturity: beta
cost_model: open-source
github_stars: 249768
last_commit: "2026-09-28"
docs_url: "https://hermes-agent.nousresearch.com/docs"
phase: agent-system
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A general-purpose agent runtime that combines provider access, persistent context, tools, skills, and channel adapters in one deployable system.
best_for: ["You want one agent reachable from Telegram, Discord, Slack, WhatsApp, Signal and a terminal at the same time, from a single gateway process on a small VPS.", "You are spending money on idle GPU or VM capacity and want the execution environment to hibernate between sessions, which the Modal and Daytona backends support directly.", "You want the agent to write and then refine its own SKILL.md playbooks from experience, with FTS5 session search giving it recall of past conversations."]
avoid_if: ["You need a governed agent runtime with an approval chain and a compliance story, because this is a personal-agent product rather than a managed platform.", "You must not have the agent able to write files outside a boundary you define, because local, Docker and SSH backends are chosen for flexibility rather than confinement.", "You need a hard SLA on tool latency, because a large part of the runtime is LLM-driven and the gateway can queue behind long tool calls."]
enrichment_notes: Official repository, MIT license, and same-day repository activity were reviewed on 2026-07-11. Installation, permission defaults, and production suitability still require hands-on review.
---

## Overview

Hermes Agent is packaged as Hermes Agent for the terminal and Hermes Desktop, built by Nous Research around a self-improving loop: agent-curated memory with periodic nudges, autonomous skill creation after complex tasks, skills that improve during use, FTS5 session search with LLM summarisation for cross-session recall, and Honcho dialectic user modelling. The interface is a TUI with multiline editing, slash-command autocomplete, interrupt-and-redirect and streaming tool output. A gateway fronts Telegram, Discord, Slack, WhatsApp, Signal and CLI, a cron scheduler runs unattended jobs, and subagents run in isolated contexts for parallel workstreams.

## Why it's in the Arsenal

The decision it removes is where an assistant that has already solved your problem lives. Most chat agents restart with no memory, so you re-explain your environment every morning. Hermes persists procedure as skills rather than as conversation history, which means the accumulated know-how is short, reviewable markdown instead of an opaque vector store, and it can be searched with FTS5 over past sessions when the skill does not quite cover the case.

## Architecture

A gateway process owns the channel adapters and dispatches turns to the agent core, which orchestrates tool calls and the memory loop. Seven terminal backends sit behind one interface — local, Docker, SSH, Singularity, Modal, Daytona and Vercel Sandbox — so the same agent loop runs against a workstation or a hibernating serverless sandbox. Subagents spawn into isolated contexts, and Python scripts can call tools over RPC, which collapses multi-step pipelines into turns that cost no context window. Model choice is a runtime switch across Nous Portal, OpenRouter, OpenAI or your own endpoint.

## Ecosystem Position

It competes with Claude Code and OpenAI Codex CLI in the coding-agent slot and with OpenHands in open-source coding agents, but differentiates on the persistent personal-agent side: multi-channel gateway, cron automation and a self-authoring skill loop rather than a single IDE panel. It overlaps with the memory-layer entries such as mem0 and zep, where those supply a memory service and Hermes instead curates skills as local markdown. Compared with content/tools/dx-and-tooling entries in this catalog, it treats the chat gateway and the scheduler as first-class, not as add-ons.

## Getting Started

The README's quick install for Linux, macOS and WSL2 is a single curl installer:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | sh
```

Homebrew and Nix are also published; `hermes model` switches providers at runtime with no code change, and the gateway is what binds your messaging channels to the agent.

## Key Use Cases

1. A Telegram-driven daily brief: cron schedules the job, the gateway delivers the report to your phone while the agent runs on a five-dollar VPS.
2. Skill accumulation: after a non-trivial task the agent writes a SKILL.md playbook, then refines that file on later encounters of the same class of problem.
3. Parallel research: spawn isolated subagents per workstream so each burns its own context instead of polluting the main thread, and call tools from Python over RPC for the mechanical steps.

## Strengths

- One gateway process binds six chat surfaces plus a terminal TUI, so the agent is where the user already is.
- Skills are plain markdown under an open standard, which makes accumulated procedure reviewable in a pull request.
- Terminal backend abstraction spans local, container, SSH and two hibernating serverless runtimes, so idle cost can approach zero.
- MIT licensed with model choice decoupled from the runtime through a single CLI switch.

## Limitations

Autonomous skill authoring means the agent edits its own instructions, so a bad run can write a bad skill that persists across sessions and needs review discipline. Running it on a cheap VPS puts your shell, filesystem and credentials in reach of the same agent that is generating its own playbooks, and nono-style sandboxing is a separate concern you have to solve. The gateway fans out to six platforms, which is a broad surface to keep patched. And a 249k-star repository with a fast-moving feature list is a moving target; the docs site rather than the README is the faster source of truth.

## Relation to the Arsenal

This is a flagship entry in content/projects/agent-systems and the runtime I am running inside. Read it against content/tools/dx-and-tooling entries such as cline and openai-codex-cli for the coding-agent comparison, and against content/projects/agent-systems/nono for the sandboxing boundary. Its cron and gateway story lines up with the workflow orchestration entries in content/tools/orchestration, and its skill format is the same SKILL.md convention used by the trpc-agent-go self-evolution feature.

## Resources

- [GitHub — NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- [Docs — hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs)
- [Terminal backends and gateway configuration](https://hermes-agent.nousresearch.com/docs)
