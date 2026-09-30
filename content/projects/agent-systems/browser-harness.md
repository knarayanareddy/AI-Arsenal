---
id: browser-harness
name: browser-harness
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: Python harness that attaches a coding agent to your real Chrome over an editable CDP websocket and lets the agent write reusable helpers
github_url: "https://github.com/browser-use/browser-harness"
license: MIT
primary_language: Python
tags: [tool-use, code-gen]
maturity: beta
cost_model: open-source
github_stars: 18182
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-27"
docs_url: "https://github.com/browser-use/browser-harness/blob/main/install.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Operates the browser you are already logged into, and lets the agent accumulate domain helpers instead of re-solving the same site each run."
best_for:
  - "You are already signed into several sites in your own Chrome profile and you need an agent to act with those live sessions rather than a fresh automated browser."
  - "You keep re-explaining the same website workflow to agents and you want the agent to write a helper for it once and reuse it next time."
  - "You want your existing coding agent (Claude Code or Codex) to drive the browser without you writing a Playwright script for every task."
avoid_if:
  - "You need many browsers running in parallel with proxies and CAPTCHA solving, because the project explicitly routes that scale case to the paid Browser Use Cloud."
  - "You cannot enable Chrome remote debugging or do not want an agent attached to your personal browsing session, because setup requires ticking a box at chrome://inspect/#remote-debugging."
  - "You need a guarantee that the agent cannot modify its own tooling, because the design has the agent writing files into its workspace by design."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and open-issue count came from the GitHub API. Setup prompt, install command, protected-source design, MCP server name and the Cloud scaling path are read from the official README and docs/MCP.md; the CDP connection was not tested here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Browser Harness gives a coding agent direct control of your real browser through a single editable Chrome DevTools Protocol websocket rather than a fresh Playwright context. Its distinguishing mechanism is that src/browser_harness/ is protected while the agent writes reusable Python helpers into its own workspace directory, so each task can leave behind a new capability. A SKILL.md teaches the agent the browser workflow, install.md handles the connection, and the helpers are also exposed as MCP tools over stdio by browser-harness-mcp so any MCP client can drive the same helpers without writing a second CDP layer.

## Why it's in the Arsenal

The gap this fills is login state. Nearly every real web task depends on an authenticated session, and handing an agent your everyday browser profile is what makes that possible, but it also means the agent has to learn each site's shape. Self-writing helpers convert that learning into accumulating code instead of repeated token spend, which is the design bet behind the project's write-up on web agents that actually learn. The cost is that the agent is modifying its own tooling inside your session, so the protected-source boundary matters.

## Architecture

Installation wires a skill file into the coding agent that instructs it to register `browser-harness skill` and connect to the browser; the connection itself is a CDP websocket to the running Chrome instance after remote debugging is enabled. The MCP server, exposed as browser-harness-mcp over stdio, surfaces the same control helpers as tools so Claude Code, Cursor, Devin or any other MCP client can consume them. Helper code the agent writes lands in a per-agent workspace path while the library under src/browser_harness/ stays read-only, which is what keeps a buggy generated helper from corrupting the harness itself. Local browser recordings are an opt-in preference preserved across upgrades.

## Ecosystem Position

Where browser-use and Stagehand spawn their own managed browser instances, browser-harness deliberately attaches to yours, so it competes with them on task completion while differing on session model and on whether the tooling is editable at runtime. It overlaps with agent-browser tooling in content/projects/agent-systems because both wrap CDP, but it is an MCP server plus a skill rather than a Python library you import, and it complements the browser entries in that phase by giving a coding agent the driver instead of replacing the coding agent. Compared with content/projects/frameworks entries such as LangGraph, there is no graph here; the loop belongs to whatever agent you paste the setup prompt into.

## Getting Started

The documented path is a setup prompt you paste into Claude Code or Codex, which installs the package with uv under Python 3.12, registers the skill and connects to your browser:

```bash
uv tool install browser-harness
# then inside your coding agent run: browser-harness skill
# and open chrome://inspect/#remote-debugging to tick remote debugging
```

Ask whether local browser recordings should be enabled; the default is no and your choice is preserved on upgrade.

## Key Use Cases

1. Logged-in personal workflows: pull your own latest posts or download media from an account you are already signed into, with no re-authentication step.
2. Accumulating site knowledge: after the agent writes a helper for a specific page structure, subsequent tasks on the same site start from that helper rather than rediscovery.
3. Driving the browser from any MCP client: register browser-harness-mcp with stdio and let a non-Python client issue the same CDP operations.

## Strengths

- Uses your existing authenticated Chrome profile, which removes the single hardest part of real browser automation.
- Helpers written during one task persist as code, so capability accumulates instead of being re-derived per run.
- The core library is protected while generated helpers live in a workspace, giving a real boundary between tool and tooling.
- Ships an MCP stdio server, so it plugs into clients that are not Python at all.

## Limitations

Attaching to your everyday browser is a genuine security tradeoff: the agent acts with your live sessions and your cookies, so a compromised helper has real reach. Chrome must be started with remote debugging enabled through a manual checkbox, which is a persistent friction point and a documented step people get wrong. Parallelism is explicitly out of scope and is pushed to the paid Browser Use Cloud, so this is a single-session tool by design. A personal profile is also a fragile automation target: site redesigns and anti-bot measures can break helpers generated against yesterday's DOM. There are roughly 400 open issues on an 18k-star repository, which suggests active but noisy development.

## Relation to the Arsenal

This is the browser-automation member of content/projects/agent-systems, and it differs from the coding agents in the same phase by handing control outward to a real browser rather than inward to a repository. Compare it against browser-use and Stagehand in that phase, and against open-codex-computer-use for desktop-level rather than browser-level control. If the browser work needs to be part of a larger pipeline, the orchestration options live in content/projects/frameworks, while anything you run at scale on many browsers belongs closer to the serving concerns in content/projects/inference-engines and their hosted counterparts.

## Resources

- [GitHub — browser-use/browser-harness](https://github.com/browser-use/browser-harness)
- [Setup instructions — install.md](https://github.com/browser-use/browser-harness/blob/main/install.md)
- [Project site — browser-harness.com](https://browser-harness.com)
