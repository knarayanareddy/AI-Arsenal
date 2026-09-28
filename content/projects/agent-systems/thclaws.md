---
id: thclaws
name: thClaws
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Rust agent harness whose workspace holds several agents side by side, each isolated in its own folder and supervised process"
github_url: "https://github.com/thClaws/thClaws"
license: Apache-2.0
primary_language: Rust
tags: [agents, inference, security]
maturity: beta
cost_model: open-source
github_stars: 1227
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-25"
docs_url: "https://thclaws.ai/manual"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Lets a coding agent, a research agent and a writing agent share one project without sharing files, memory or browser logins."
best_for:
  - "You want several agents working the same project with different jobs and you need their file access, memory and sessions kept apart."
  - "You switch between agents mid-task and you want each to keep its conversation, scroll position and half-typed message when you come back."
  - "You want GUI, CLI, headless and webapp surfaces from one Rust binary rather than four separate tools."
avoid_if:
  - "You cannot accept a path migration on upgrade, because the first time v0.126.0 opens a workspace it moves the project into .thclaws/bots/main/ and anything holding the old path breaks."
  - "You run an older thClaws build against an upgraded folder, because the older client finds a note asking you to update rather than a working project."
  - "You need more than eight concurrent agents in one workspace, because that is the documented ceiling."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (MIT OR Apache-2.0), last commit, primary language (Rust), topics and issue count came from the GitHub API. Workspace layout (.thclaws/bots/<name>/), per-agent isolation, the eight-agent ceiling, upgrade migration behaviour and surfaces are read from the official README release notes; the binary was not installed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

thClaws is a native Rust agent harness (MIT OR Apache-2.0) that presents a workspace as a shelf of agents rather than a single agent. Each agent lives under .thclaws/bots/<name>/ with its own sessions, knowledge bases, settings and browser profile, and an agent's file tools stop at that folder so one cannot read or write another's work. Every agent is a separate process supervised by the app, so a crash restarts one agent without disturbing the others and an agent you switch away from keeps working; up to eight run at once. Surfaces are a desktop app and thclaws --serve in the browser, with chat, terminal, files and UI tabs per agent, plus multi-provider support, MCP, skills, plugins and agent teams.

## Why it's in the Arsenal

The problem it solves is context collision. Running a research agent and a coding agent in one project without separation means shared memory, shared files and a shared browser session, and debugging that is miserable. thClaws makes isolation structural: separate processes, separate directories, separate credentials, with a shared rail to switch between them. The cost is an opinionated on-disk layout, since the v0.126.0 upgrade moved existing projects into a bots directory and broke absolute paths for anything that referenced them.

## Architecture

The application supervises one process per agent. Each agent's state is confined to .thclaws/bots/<name>/, which holds its sessions, knowledge bases, settings and browser profile, and the file tools enforce that boundary so cross-agent reads and writes fail. The left rail in both the desktop app and thClaws --serve selects among agents, and switching preserves each agent's conversation and in-progress input because that state lives in its own process. Agent templates can be pulled from thClaws.cloud or started blank. Older clients encountering a migrated folder are given an upgrade notice rather than a corrupt workspace.

## Ecosystem Position

thClaws competes with multi-agent desktop shells in content/projects/agent-systems such as AionUi, WeSight and Omnigent, but its differentiator is per-agent filesystem and credential isolation rather than unified supervision of external CLIs. Compared with CowAgent's agent teams, which share a conversation and knowledge, thClaws deliberately separates agents into independent workspaces. It is complementary to content/projects/frameworks entries: those build agents you compose in code, this one hosts several you switch between. Provider and MCP support overlaps with the terminal agents in this phase, and the Telegram bot topic indicates the same always-on reach the personal assistants pursue.

## Getting Started

The same binary serves CLI, desktop and headless surfaces; pick the download for your platform:

```bash
# after downloading the release binary and putting it on PATH
thclaws
# serve the workspace in a browser instead of the desktop app
thclaws --serve
# run a single prompt in a project
thclaws -p "summarise this repository"
```

Before upgrading an existing workspace, commit or back up: the migration into .thclaws/bots/main/ changes the project path.

## Key Use Cases

1. Parallel agents in one project: keep a coding agent, a research agent and a writing agent side by side without their memory, files or browser logins colliding.
2. Crash isolation: one agent dies or hangs, and the others keep running and their state is untouched.
3. Surface flexibility: start a task from the terminal, watch it in the desktop app, and share the same workspace over the browser without switching tools.

## Strengths

- Structural isolation: per-agent directories, file-tool boundaries and separate processes mean agents cannot corrupt each other.
- Process supervision with independent restart, so a single agent failure does not end the session.
- One Rust binary for desktop, browser, CLI and headless, keeping behaviour consistent across surfaces.
- Multi-provider, MCP, skills, plugins and agent templates in the same workspace model.

## Limitations

The v0.126.0 upgrade moved existing workspaces into .thclaws/bots/main/, which breaks editors, scripts and other clones holding the old absolute path; that migration is the first thing to check before adopting. An older thClaws binary will not open an upgraded folder, so mixed versions across machines break the workspace. Isolation also means agents cannot easily collaborate, which is a real limitation if you want them to build on each other's output without an explicit handoff. With roughly 1,200 stars, 8 open issues and active daily commits, the project is young and the workspace layout may change again. Hosted workspaces on thClaws.cloud are not covered by the migration path.

## Relation to the Arsenal

This is the multi-agent-per-project entry in content/projects/agent-systems, and the one that treats isolation rather than collaboration as the organising principle. Compare it with AionUi and WeSight, which supervise external CLI agents, and with CowAgent, whose agent teams share knowledge rather than separating it. Its provider and MCP surface overlaps with the terminal agents in this phase, and its always-on channel ambitions (Telegram bot topic) line it up with the personal assistants here. For building agents you orchestrate programmatically instead of switching between, the frameworks phase is the layer above.

## Resources

- [GitHub — thClaws/thClaws](https://github.com/thClaws/thClaws)
- [Project site and downloads — thclaws.ai](https://thclaws.ai)
- [Agent templates — thclaws.cloud](https://thclaws.cloud/templates)
