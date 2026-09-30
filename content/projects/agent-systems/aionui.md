---
id: aionui
name: AionUi
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: Electron desktop client that drives dozens of external CLI coding agents plus a bundled Office-document agent behind one visual workspace
github_url: "https://github.com/iOfficeAI/AionUi"
license: Apache-2.0
primary_language: TypeScript
tags: [agents, community-favorite]
maturity: beta
cost_model: open-source
github_stars: 33185
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-09"
docs_url: "https://www.aionui.com"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives CLI agents a graphical front end, a file workspace and cron scheduling without replacing the agent runtimes underneath."
best_for:
  - "You already run Claude Code, Codex, OpenClaw or Hermes Agent in a terminal and you want file diffs, permission prompts and a chat surface without rewriting your workflow."
  - "You produce PowerPoint, Word or Excel deliverables and you want an agent that emits an editable .pptx with Morph transitions rather than a text outline."
  - "You want to monitor and steer long-running agent work from your phone through Telegram, Lark, DingTalk or WeChat while the agent runs on an unattended machine."
avoid_if:
  - "You are deploying headless with no desktop environment, because AionUi is an Electron GUI and its cron automation is designed to run alongside that window on a host you keep alive."
  - "You need byte-level control of agent internals, because AionUi orchestrates external CLIs through its own backend rather than exposing their configuration surface."
  - "You have no API budget at all and no local model, because the built-in agent is API-driven even though the UI itself is free."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics and open-issue count came from the GitHub API. Feature claims (Morph PPT, OfficeCLI, agent auto-detection, mobile bridges, cron) are read from the official README and repo layout; installation was not performed here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AionUi is a TypeScript Electron shell around a separate Rust backend called AionCore. It ships a built-in agent with three office tracks (pptx, docx, xlsx) that delegate heavy document work to OfficeCLI, and it auto-detects installed CLI agents so Claude Code, Codex, Qwen Code, Hermes Agent, OpenClaw and Cursor Agent all appear in the same sidebar. Beyond chat it adds a file workspace with diffs, tool panels with permission prompts, cron-style scheduled jobs, and mobile bridges over Telegram, Lark, DingTalk and WeChat. Remote access goes through the bundled WebUI rather than an exposed shell service.

## Why it's in the Arsenal

The recurring pain is fragmentation: an agent's model routing lives in one terminal, its file changes in an editor, its scheduled jobs in cron, and its mobile entry point in a separate bot. AionUi collapses those into one desktop control plane that talks to agents already on your PATH, which means the harness underneath stays swappable while the supervision surface does not. The tradeoff is a second process between you and the agent, and a codebase young enough that releases and agent-detection behaviour move quickly.

## Architecture

The Electron renderer talks to AionCore, which owns agent process supervision, the built-in agent engine, the assistant catalog (assistants.json) and the built-in skill bundles. External CLI agents are auto-detected on disk and spawned as child processes whose output is streamed into the chat pane; tool calls surface as permission prompts before they execute. Document output is delegated to OfficeCLI, which produces Morph-animated PPTX, DOCX and XLSX/CSV artefacts that stay editable in Office. Mobile clients connect over the same bridge contracts the WebUI uses, and cron jobs are evaluated server-side so work continues while the window is closed.

## Ecosystem Position

Where Open WebUI and LibreChat are chat-first, AionUi is agent-first: the unit of work is a CLI agent session with a file workspace, not a conversation. It competes with the desktop shells built by Hermes, OpenClaw and CowAgent for the same job of supervising local agents, and complements content/projects/agent-systems entries such as Codewhale by giving their CLIs a GUI rather than reimplementing the loop. Compared with Dify or Flowise, which run their own orchestration in the browser, AionUi delegates to CLIs you already trust, and it sits closer to content/projects/frameworks work only when you are building agent logic rather than supervising it.

## Getting Started

Grab a signed installer for your platform from Releases; there is no build step required. Development uses two repositories, AionUi for the Electron frontend and AionCore for the backend:

```bash
git clone https://github.com/iOfficeAI/AionUi.git
git clone https://github.com/iOfficeAI/AionCore.git
# runtime users: download the macOS / Windows / Linux installer from Releases
```

Launch the app, add an API key or let it detect your installed CLI agents, and the workspace opens at http://localhost:3000.

## Key Use Cases

1. Deck production from a brief: prompt the built-in PPT assistant and receive an editable Morph-animated .pptx whose slide-to-slide transitions were authored, not templated.
2. Unified agent supervision: run Claude Code and Codex side by side in one file workspace, watching diffs and approving tool calls in a single permission stream.
3. Unattended scheduled work: register a cron job that posts a digest to Telegram or Lark overnight while the desktop session is not being watched.

## Strengths

- Works immediately after install because the built-in agent needs no separate CLI runtime, unlike shells that only wrap external harnesses.
- Auto-detects two dozen existing CLI agents, so switching harnesses is a sidebar change rather than a migration.
- Office output stays editable in Word, Excel and PowerPoint instead of exporting flattened renders.
- Apache-2.0 licensed with signed installers for macOS, Windows and Linux.

## Limitations

The project is young and moving: it was created in August 2025 and carries a very high open-issue count for a 33k-star repo, so expect breakage in agent detection and bridge behaviour between releases. It is a GUI application first, so headless or server-only deployments are awkward even though cron is supported. Desktop output quality is bounded by whatever models your API key buys; there is no bundled local inference path. Development requires maintaining two repositories in lockstep, which raises the cost of forking. The README also foregrounds a Kimi subscription partnership, so the recommended path carries a vendor flavour worth weighing against your own provider list.

## Relation to the Arsenal

This is the desktop supervision layer inside content/projects/agent-systems, sitting alongside the terminal-native coding agents it wraps. Look at content/projects/frameworks entries such as LangGraph and CrewAI when the question is who orchestrates the work; look here when the question is how you watch and steer an agent that already exists. For document and retrieval plumbing underneath, the data-and-retrieval phase holds the ingestion options, and the inference-engines phase holds the serving layer if you swap the built-in agent for a local one.

## Resources

- [GitHub — iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi)
- [Official site and docs — aionui.com](https://www.aionui.com)
- [Companion backend — iOfficeAI/AionCore](https://github.com/iOfficeAI/AionCore)
