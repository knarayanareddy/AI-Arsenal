---
id: claude-code
name: "Claude Code"
type: tool
job: [prototyping]
description: "Anthropic's terminal coding agent, distributed as a CLI that reads a repository, edits files, runs commands and handles git work from natural language"
url: "https://code.claude.com/docs"
cost_model: usage-based
pricing_detail: "Requires a Claude subscription (Pro/Max) or Anthropic API key; billed by usage"
tags: [agents, code-gen, tool-use, anthropic]
maturity: production
stack: [typescript]
free_tier: false
free_tier_limits: null
self_hostable: false
open_source: false
source_url: "https://github.com/anthropics/claude-code"
docs_url: "https://code.claude.com/docs/en/overview"
github_url: "https://github.com/anthropics/claude-code"
alternatives: [aider, openai-codex-cli, gemini-cli]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when: ["You want repository-wide changes with real tool access and you would rather start from a vendor's own agent than assemble a harness around a raw model API.", "You are standardising on one coding agent across a team and you want plugins for custom commands, subagents and hooks distributed from a documented directory rather than per-developer shell aliases.", "You want to report or triage issues from inside the session, because the /bug command submits feedback without leaving the terminal."]
avoid_when: ["You need an open-source agent you can fork and audit, because this repository carries no licence file and the API is a commercial product rather than source you can modify.", "You cannot send your code to a hosted model, because the tool is built around Anthropic's API and the README describes collecting usage data, conversation data and /bug feedback.", "You are scripting the agent as a library inside your own service, because the published surface is a CLI plus plugins, with no embeddable engine."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (136,859), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: best-in-class
verdict_rationale: "The reference implementation of terminal agentic coding; the skills/MCP/hooks ecosystem documented across this catalog largely originated here"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/anthropics/claude-code", "date": "2026-07-08", "description": "136,859 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Claude Code is Anthropic's agentic coding tool, distributed as the `@anthropic-ai/claude-code` package and a native installer, written in TypeScript and run from a terminal with IDE integration. The repository is deliberately thin: install instructions for macOS and Linux via a shell installer, a Homebrew cask, Windows via PowerShell and WinGet, a plugins directory documented separately, issue reporting through the `/bug` slash command or GitHub issues, and a data-collection section describing what feedback is captured. Node.js 18+ is the stated floor. The npm path is now marked deprecated in favour of the installer, which is the clearest signal that the distribution model is still moving. Functionally the tool covers the standard loop the README describes: understanding a codebase, executing routine tasks, explaining complex code, and handling git workflows through natural-language commands.

## Why It's in the Arsenal

The decision it removes is whether a coding agent is a product or a weekend project. The engineering here is the boring part that is hard to reproduce: deciding when to read rather than write, keeping an edit set reviewable, recovering from a bad command, and translating an intent into a git operation. The tradeoff is control and openness. You get a maintained agent with a plugin surface, and in exchange the loop is not yours, the licence is not permissive, and the model calls are metered.

## Key Features

- The loop, the tool set and the model are maintained together, so there is no harness assembly step before the first useful run.
- Works across terminal and IDE surfaces for the same session, so context is not lost when you move from a shell to an editor.
- A documented plugins directory for custom commands, subagents and hooks, which is a supported extension point rather than a prompt convention.
- In-session issue reporting through /bug, so a bug found while working is captured with the session rather than reconstructed later.

## Architecture / How It Works

The published artefact is a client, not a framework, so the internal loop is not open. What is documented is the distribution and extension shape: a native installer or the npm package provides the `claude` binary, plugins under the repository's `plugins/` directory extend it with custom commands and agents, and `/bug` opens a feedback path that carries session context. The tool runs in your terminal and can be driven from an IDE, and it invokes git as an external process rather than reimplementing version control. There is no published server component or library entry point in this repository, which is why everything else in this phase that wraps a loop has to bring its own.

## Getting Started

Use the native installer rather than npm, which the README marks deprecated, then run `claude` in a project directory:

```bash
curl -fsSL https://claude.ai/install.sh | bash
# macOS alternative: brew install --cask claude-code
cd /path/to/your/project && claude
```

Windows uses `irm https://claude.ai/install.ps1 | iex` or `winget install Anthropic.ClaudeCode`.

## Use Cases

1. Repository-scoped refactor: describe a change that spans files and let the agent read the relevant code, edit it and run the build or tests, then review the diff in the terminal.
2. Git workflow chores: ask for a branch, a commit message derived from the actual diff, or a rebase, without leaving the session you are working in.
3. Codebase explanation: point it at an unfamiliar module and get an account of how the pieces connect, which is the cheapest use of the tool and the one that needs no setup.

## Strengths

Claude Code is the reference implementation other coding agents in content/tools/dx-and-tooling are measured against, and it is a direct competitor to Cline, Codex and the provider-neutral terminal agents in content/projects/agent-systems, differing on the axis of who owns the loop and the model bill. It is an alternative to the MCP servers in the same phase, which contribute browser or DevTools capability to someone else's loop rather than being one, and to the agent frameworks in content/projects/frameworks, which you call from Python rather than run as a product. It complements content/projects/inference-engines only in the sense that a local model cannot serve it; if you need local inference for coding work, the harnesses in content/projects/agent-systems are the ones built for that.

## Limitations / When NOT to Use

This repository is not the tool. It contains install instructions, a plugins folder, a bug-report path and a data-collection notice, so the agent's behaviour, prompt construction and tool policy are not inspectable or forkable, and the absence of a licence file means you cannot redistribute or modify it. It is a closed product on a metered API, which makes cost predictable only if you watch the session and awkward for anything batch or unattended. Data handling is a real consideration: the README states usage data, associated conversation data and /bug feedback are collected, and points to commercial terms and privacy policies for the detail, so code-sensitive work needs a deliberate decision rather than a default. The npm install path is already deprecated, and the plugin surface is the documented way to extend, which means anything you need beyond that is unsupported.

## Integration Patterns

This is the anchor entry in content/tools/dx-and-tooling and the loop that the other tools in the same phase extend: chrome-devtools-mcp contributes browser instrumentation, and the MCP servers you register with it are the extension surface. Read it beside the open-source harnesses in content/projects/agent-systems when the question is whether to accept a vendor loop or run your own, and beside the frameworks in content/projects/frameworks when the question is whether you need a programmable agent rather than an interactive one. Model choice itself belongs to content/projects/foundation-models, and nothing in this phase makes local inference available to this particular tool.

## Resources

- [GitHub — anthropics/claude-code](https://github.com/anthropics/claude-code)
- [Official documentation — code.claude.com](https://code.claude.com/docs/en/overview)
- [Plugins directory documentation](https://github.com/anthropics/claude-code/blob/main/plugins/README.md)

## Buzz & Reception

Supplies the loop most coding-agent entries in this phase wrap: repository-aware edits, command execution and git work in one binary with the model already chosen.
