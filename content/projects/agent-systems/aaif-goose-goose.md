---
id: aaif-goose-goose
name: "goose"
version_tracked: null
artifact_type: tool
category: agents
subcategory: coding-agents
description: "Apache-2.0 Rust agent that installs dependencies, edits files, and runs commands locally, extended through provider-agnostic MCP tools"
github_url: "https://github.com/aaif-goose/goose"
license: "Apache-2.0"
primary_language: Rust
org_or_maintainer: "aaif-goose"
tags: [code-gen, pytorch, tool-use, local, agents]
maturity: production
cost_model: open-source
github_stars: 54732
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-09-28"
docs_url: "https://github.com/block/goose/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Extensible agent written in Rust that goes beyond code suggestions: it installs and executes commands, edits files, and runs tests locally while exposing a provider-agnostic MCP client."
best_for:
  - "You are on a workstation and want an agent that can install a missing CLI, run the project's build, and iterate on failures without you relaying output by hand."
  - "You have internal tools already exposed as MCP servers and want one agent binary that consumes them alongside filesystem and shell access."
  - "You are evaluating models on a fixed task suite and want the harness itself to be small and fast enough that model differences dominate the measurement."
avoid_if:
  - "You cannot grant an agent shell access on the machine, because the core value is unsandboxed local execution and the permission model is cooperative rather than isolating."
  - "You are deploying a hosted multi-tenant agent service and need per-tenant isolation, since this is a single-user local tool rather than a managed runtime."
  - "You need a stable versioned extension API, because extension goes through MCP servers whose interfaces you do not control and which can change between releases."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 54732 stars, Apache-2.0 license, Rust primary language, last commit 2026-09-28, 4 GitHub topics (acp, ai, ai-agents, mcp), homepage goose-docs.ai. Install command, configuration flow, and MCP extension design come from the official docs; no agent session was run locally."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/aaif-goose/goose", "date": "2026-09-28", "description": "54,732 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

goose is an extensible AI agent whose defining property is action: it installs packages, runs commands, creates and edits files, and drives a project toward a working state, rather than printing suggestions for you to apply. It is written in Rust for the binary and shipped with both a desktop and a CLI client, and it is explicitly provider-agnostic - the model is chosen through a configuration extension, so Anthropic, OpenAI, or a local OpenAI-compatible endpoint all work. Capability comes from MCP servers, which supply tools as well as prompt patterns; goose ships a set of built-in ones for developer workflows and reads others from local configuration, and the repo tracks the Agent Client Protocol for editor integration.

## Why it's in the Arsenal

The recurring decision goose resolves is the trust-and-capability tradeoff for local agents. Once an agent can run commands, the interesting engineering is not the prompting but the permission surface: which tools exist, what they are allowed to touch, and whether a human approved the action. Expressing capability as MCP servers means that surface is a list you can read and pin, not hidden prompt text, and the same list works across editors and across model providers. The Rust core is a practical choice rather than a benchmark one - a single static binary with predictable startup is what makes a local agent pleasant to invoke from a script or a keybinding, which is where these tools actually live.

## Architecture

The binary is a Rust core with a session model: a conversation plus an accumulating list of available tools, where the extension layer loads each configured MCP server, negotiates its tool list, and registers those tools for the model. On each turn the model receives the conversation and the tool schemas, emits a tool call, and the core dispatches it to the owning server, appending the result to the session. Tool calls execute in the local environment through the permission model exposed in the client, where the user can allow a tool for the session, allow it once, or deny it; results include stdout and stderr so the model can read the failure. Sessions are persisted and resumable, which is what makes a long migration task survivable across a restart. Model access is a separate extension resolved from configuration, so a provider change touches one config file rather than the agent code, and the desktop client renders the same session stream the CLI does.

## Ecosystem Position

goose competes directly with opencode, Aider, and Cline in the local agent space, and compared with opencode it favors a smaller Rust core and a tool surface expressed as MCP servers rather than a client-server session protocol. It overlaps with Claude Code on the same permission-prompt workflow, and it complements MCP itself rather than replacing it - the server ecosystem is the extension mechanism, so anything written for another MCP client works here too. It is an alternative to writing your own shell-loop agent in Python, and it is rather than an agent framework: for graph-structured multi-agent orchestration with typed state, the frameworks in content/projects/agent-systems/ are a different shape of thing. The Lightpanda entry in this batch is the complementary piece for a fast web-fetch tool inside one of its MCP servers.

## Getting Started

Install the binary and start a session with a provider configured, then grant the tool permissions when prompted:

```bash
brew install block/goose/tap/goose   # or download the release binary
goose configure
goose session
```

The configure step sets the model provider, key, and which MCP extensions to enable; the session command starts the interactive loop, and goose mcp add registers an additional tool server.

## Key Use Cases

1. Bootstrap a new project on a laptop: describe the target, let the agent install the toolchain, scaffold files, and run the build until it passes.
2. Run the same task against several model providers from one configuration, keeping the tool set and permissions fixed so the comparison is about model behavior.
3. Wire existing internal MCP servers into a general assistant so operational actions and file edits happen in one governed session.

## Strengths

- Rust single-binary core with fast startup, which makes it usable from a keybinding or a script rather than only from a long-lived window.
- Provider-agnostic configuration, so a local OpenAI-compatible endpoint and a hosted frontier model are the same kind of choice.
- Explicit MCP-based capability surface, which makes the tool inventory reviewable and pinable instead of implicit in a prompt.
- Apache-2.0 licensing and a documented extension format, so building a private internal tool server is a supported path.

## Limitations

Permissions are cooperative: an allowed tool runs with the full privileges of the invoking user, so a misconfigured or prompt-injected extension can do real damage, and there is no per-tool sandbox. It is a single-user local agent, so multi-tenancy, request-scoped isolation, and hosted execution are all out of scope. Rust extension work is more constrained than Python for building custom tools - an MCP server is usually a separate process, which adds a failure mode and a startup cost per tool. Performance and reliability track the attached model: with a small local model the edit-and-verify loop stalls quickly. And the ecosystem of first-party extensions is smaller than the projects it overlaps with, so some workflow capability that arrives elsewhere takes longer to appear here.

## Relation to the Arsenal

The Rust-side counterpart to opencode in the same agent-systems folder, and the tool-authoring partner for Lightpanda in this batch when a fast navigation primitive is needed inside an MCP server. Its model backends are the entries in content/projects/inference-engines/, and the repository-scoped knowledge it works over often comes from content/projects/data-and-retrieval/. Contrast it with the durable-execution entry in this batch, Conductor, which wraps a request-scoped agent loop like goose's in retries, timers, and human approval for work that must survive restarts.

## Resources

- [GitHub — aaif-goose/goose](https://github.com/aaif-goose/goose)
- [goose documentation and extension guides](https://github.com/block/goose/)
- [MCP server registry](https://github.com/modelcontextprotocol/servers)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (54,732 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
