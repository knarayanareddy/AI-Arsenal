---
id: open-codex-computer-use
name: open-codex-computer-use
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "MCP server giving Codex, Claude Code and Gemini CLI non-intrusive desktop control through the OS accessibility API"
github_url: "https://github.com/iFurySt/open-codex-computer-use"
license: MIT
primary_language: Other
tags: [tool-use, guardrails]
maturity: beta
cost_model: open-source
github_stars: 2271
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-22"
docs_url: "https://github.com/iFurySt/open-codex-computer-use#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives open-source coding agents the same computer-use capability vendors ship, without screen-scraping the whole desktop."
best_for:
  - "You want Codex, Claude Code or Gemini CLI to operate your desktop applications and you are willing to grant Accessibility and Screen Recording permissions."
  - "You need cross-platform computer use and you want the same MCP server to work on macOS, Linux and Windows rather than maintaining three adapters."
  - "You want the setup automated into your agent's config, because install-codex-mcp, install-claude-mcp and install-gemini-mcp write the right files for each host."
avoid_if:
  - "You cannot grant Accessibility and Screen Recording on macOS, because the macOS runtime requires 14.0 or later and those two permissions, and the agent will not work without them."
  - "You need a hardened, sandboxed path for untrusted agents, because accessibility-tree control is broad by design and the permission model is delegated to the OS."
  - "You need proven reliability for unattended overnight GUI automation, because the README's demos are manual sessions rather than a published reliability benchmark."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language (Swift), topics and issue count came from the GitHub API. Install commands, MCP config shape, macOS permission requirements, host install helpers and skill install are read from the official README; no desktop automation run was performed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

open-computer-use is an MCP server that exposes desktop computer use to any MCP-capable agent. Its design point is non-intrusive: rather than screenshotting the entire display and asking a vision model to reason over pixels, it drives the operating system's accessibility API to enumerate and act on UI elements, which is both cheaper and more deterministic. The runtime is Swift, packaging ships via npm with the short ocu alias, and there are MCP install helpers that write into Codex config.toml, Claude's .claude.json or a Gemini settings file, plus a skill you can install with npx skills add for either Codex or Claude Code. macOS is the platform with the strictest permission requirement; Windows and Linux need no equivalent step.

## Why it's in the Arsenal

The engineering decision is what an agent sees. Pixel-based computer use is model-expensive, brittle on custom-rendered UI, and needs no special permissions but gets poor results on anything that does not look like a screenshot. Accessibility-tree control gets structured element semantics, works with native and Electron apps alike, and needs an explicit OS permission that makes the grant visible. The tradeoff is coverage: anything that does not expose accessibility metadata is out of reach, which is the classic limitation of the approach.

## Architecture

The Swift runtime queries the platform accessibility hierarchy for the foreground application, returning element roles, labels and bounds to the calling model, and applies actions such as click, type and scroll against those elements rather than coordinates. That server is exposed over MCP, so the agent host (Codex CLI or App, Claude Code, Gemini CLI, or any other MCP client) sees tools instead of a bespoke integration. Installation is written into each host's own config file by dedicated subcommands, which keeps host-specific details out of the setup prompt. A bundled skill carries the workflow guidance for how to drive the tools reliably.

## Ecosystem Position

This is the open alternative to the computer-use loop shipped with OpenAI's Codex, and it competes with Anthropic's computer-use tool and with the OS-level automation stack (AppleScript, UI Automation) that people wire up by hand. Compared with content/projects/agent-systems entries such as browser-harness, which targets the browser over CDP, this targets the whole desktop over accessibility; compared with harness-anything, which drives Office and Adobe through COM on Windows, this is broader and shallower per application. It complements content/projects/frameworks by giving an agent you build yourself a perception-and-action surface, and the MCP packaging means it drops into the same extension model as the rest of this phase.

## Getting Started

npm install, run once to register the MCP server, then install into whichever host you use:

```bash
npm i -g open-computer-use
open-computer-use
# write the MCP entry into Codex / Claude Code / Gemini config
open-computer-use install-codex-mcp
open-computer-use install-claude-mcp
```

On macOS 14+ grant Accessibility and Screen Recording on first run. Windows and Linux need no permission step.

## Key Use Cases

1. Cross-app automation from a coding agent: have Codex or Claude Code read a value from one native application and enter it in another without pixel coordinate guessing.
2. Access to apps without scripting APIs: drive an internal or third-party desktop tool that exposes no CLI, COM or AppleScript interface but does expose accessibility metadata.
3. Multi-host setup: run the same MCP server under Codex, Claude Code and Gemini CLI by pointing each at the same binary, instead of maintaining three drivers.

## Strengths

- Non-intrusive accessibility-based control, which is more deterministic and cheaper than full-screen vision on native and Electron apps.
- One Swift binary covering macOS, Linux and Windows rather than a per-platform rewrite.
- First-class MCP packaging with install helpers that write directly into Codex, Claude Code and Gemini configuration.
- MIT licensed and small enough to read, which matters for a tool that holds Accessibility permissions.

## Limitations

Accessibility-based control can only see what applications expose; custom-drawn interfaces, canvas-rendered UIs and some Electron surfaces are effectively invisible, and the failure is silent rather than loud. macOS 14+ is a hard floor and Accessibility plus Screen Recording are broad permissions that a security review will ask about. Windows and Linux paths are less exercised than macOS in the demos shown, and the project is young with a modest issue count. There is no published reliability benchmark for long unattended GUI runs, so treat the demos as demonstrations rather than a service level. It is a perception-and-action surface only: it does not decide what to do, which is still the agent's job.

## Relation to the Arsenal

This is the desktop-computer-use entry in content/projects/agent-systems, and the counterpart to browser-harness in the same phase: one drives the browser over CDP, this drives the whole desktop over the accessibility API. Where browser-use and Stagehand cover the web layer, this covers native applications. It plugs into the same MCP extension model the rest of this phase uses, so an agent loop from content/projects/frameworks can consume it directly, and the narrower Office-and-Adobe case that cares about document fidelity rather than breadth is better served by harness-anything.

## Resources

- [GitHub — iFurySt/open-codex-computer-use](https://github.com/iFurySt/open-codex-computer-use)
- [npm — open-computer-use](https://www.npmjs.com/package/open-computer-use)
- [Related project — open-browser-use](https://github.com/iFurySt/open-codex-browser-use)
