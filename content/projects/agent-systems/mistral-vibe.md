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
org_or_maintainer: "mistralai"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: mistral-vibe
name: "Mistral Vibe"
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Mistral's open-source terminal coding agent with subagent delegation, a trust-folder model and MCP support"
github_url: "https://github.com/mistralai/mistral-vibe"
license: Apache-2.0
primary_language: Python
tags: [code-gen, agents]
maturity: beta
cost_model: usage-based
github_stars: 5016
last_commit: "2026-09-23"
docs_url: "https://github.com/mistralai/mistral-vibe#readme"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Mistral open-source CLI coding assistant with skills and subagents"
  - "Terminal alternative for delegated repository work and voice interaction"
best_for: ["You want a terminal coding agent from a model vendor so the default model and the agent harness are developed and versioned together rather than assembled from parts.", "You are running a parallel job — migrations, refactors, test sweeps — and want the agent to delegate chunks to subagents through the task tool instead of blocking on one sequential loop.", "You want to bring your own external tools, because MCP server configuration and a skills system for custom slash commands are both first-class in the README."]
avoid_if: ["You need to work offline, because the agent is powered by Mistral's hosted models and the install path assumes an API key rather than pointing at a local server.", "You are on Windows and want first-class support, because the README states plainly that it works there but that UNIX environments are officially supported and targeted.", "You need to read or modify files outside the project, because the trust-folder system exists precisely to keep the agent inside directories you have granted."]
enrichment_notes: "The CLI is an active open-source project, but coding-agent quality and tool permissions remain model- and repository-dependent. Draft pending review."
---

## Overview

Mistral Vibe is a command-line coding assistant powered by Mistral's models. It gives you a conversational interface to a codebase with a concrete toolset: read, write and patch files; recursive search with grep and ripgrep support; shell execution with managed sessions, polling and stdin helpers; a todo list for tracking progress; and an ask-user-question tool for interactive clarification. On top of that sit subagent delegation through a task tool, built-in agents, a project-aware context step that feeds the agent the working directory, git branch and recent commit history, and a voice mode. Configuration lives in a Vibe home directory and covers the API key, OpenTelemetry tracing, custom system prompts, custom agent configurations, tool management and MCP servers.

## Why it's in the Arsenal

The decision it addresses is agent plumbing you would otherwise write yourself. A coding loop needs file reads, a patch primitive that does not clobber the file, recursive search, a shell it can poll, and a way to ask the human a question mid-run — and each of those has sharp edges. Vibe ships all of them, including the parts that are easy to skip and expensive to reinvent, such as managed shell sessions and a trust-folder boundary. Subagent delegation matters for real work: a refactor across twenty files is a different execution shape from a one-file fix.

## Architecture

The CLI is Python and wraps a conversational agent loop over a fixed tool registry — file read/write/patch, grep with ripgrep, shell execution with managed sessions and polling, todo tracking, ask-user-question, and task for delegation. Project context is assembled before the model call: the working directory, the current git branch and recent commit history are injected so the agent knows where it is. Subagents run the same loop in a child context, which is what makes parallel chunking possible. Configuration is file-based in a Vibe home directory, holding the API key, telemetry, system prompt overrides, per-agent configuration, the enabled tool set and registered MCP servers. Skills are the extension point for custom slash commands.

## Ecosystem Position

Mistral Vibe competes directly with aider and with the coding agents such as OpenHands in the same terminal slot, and the differentiators are first-party model integration and the subagent delegation tool. It overlaps with gpt-engineer, the archived predecessor in this batch, but the loop has moved on: subagents, project-aware git context and a trust-folder boundary versus a single generate-and-execute pass over a prompt file. Compared with the browser-driving agents, stagehand and browser-use, this one never touches a GUI and instead works the file tree and shell. It complements the MCP server entries such as context7, which you register in its MCP configuration, and it is a client of the inference layer rather than a competitor to vLLM or SGLang.

## Getting Started

The one-line installer is the documented recommendation on Linux and macOS, and uv is the alternative:

```bash
curl -LsSf https://mistral.ai/vibe/install.sh | bash
```

```bash
uv tool install mistral-vibe
```

pip install mistral-vibe works as well. Then set your API key in the Vibe home configuration and run it in a project directory you have granted trust.

## Key Use Cases

1. Repo-wide refactor: hand over a cross-cutting change and let the agent delegate file groups to subagents rather than grinding through them in one context.
2. Test and CI repair: give it a failing suite, the shell tool, and the git context, and let it iterate on the actual failure output.
3. Tool-augmented editing: register MCP servers so the agent can consult documentation or internal APIs while editing, with the trust folder keeping that scope bounded.

## Strengths

- First-party coupling between the coding agent and Mistral's own models, so the harness and the model ship together.
- Real subagent delegation with a task tool, which changes how large multi-file work actually executes.
- Trust-folder system gives an explicit, reviewable boundary on what the agent is allowed to touch.
- Managed shell sessions with polling and stdin helpers, which is the detail most hand-rolled agent loops get wrong.

## Limitations

It is tied to a hosted Mistral service, so cost is per token and there is no documented path to point the loop at a local server in the excerpt. Windows works but is explicitly not the supported target, which limits it for teams on mixed platforms. The feature surface is broad — voice mode, built-in agents, custom slash commands, skills, MCP, telemetry — and each one is a thing to configure, secure and keep current. Being a young project with roughly 5k stars, tool behaviour and configuration schema can move between releases. Agent quality still depends on the underlying model, and no benchmark numbers are published in the README.

## Relation to the Arsenal

This is an agent-systems phase entry and the closest thing in the batch to a first-party vendor CLI. Compare it with the other terminal coding agents in that folder — OpenHands, aider in content/tools/developer-experience, gpt-engineer as the historical ancestor — and with the framework entries in content/projects/frameworks if you need to embed the loop rather than run it in a terminal. Its tools plug in over MCP, so the MCP servers in content/tools/developer-experience are the natural extension, and the model layer underneath is where a self-hosted stack would diverge.

## Resources

- [GitHub — mistralai/mistral-vibe](https://github.com/mistralai/mistral-vibe)
- [Mistral documentation hub](https://docs.mistral.ai/)
- [Mistral platform and model access](https://mistral.ai/)
