---
id: omnigent
name: omnigent
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python meta-harness giving one orchestration, policy and sandboxing layer over Claude Code, Codex, Cursor, OpenCode, Hermes and custom agents"
github_url: "https://github.com/omnigent-ai/omnigent"
license: Apache-2.0
primary_language: Python
tags: [orchestration, guardrails, security, agents]
maturity: alpha
cost_model: open-source
github_stars: 10322
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/omnigent-ai/omnigent/blob/main/docs/POLICIES.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Lets you swap or mix harnesses without rewriting, with policies and OS-level sandboxing applied uniformly above whichever agent runs."
best_for:
  - "You use more than one coding agent and you want one place to supervise them, compare outputs and ask one to review another's work."
  - "You need governance over what agents can do on your machine, because policies stack at server, agent and session level with spend caps and tool limits built in."
  - "You want to run agent sessions in disposable cloud sandboxes like Modal, E2B or Kubernetes instead of your laptop, and still drive them from a phone."
avoid_if:
  - "You are on Windows and need full sandboxing, because the native terminal wrappers and bwrap/seatbelt filesystem and network isolation are unavailable and you fall back to Job Objects that do not isolate the filesystem."
  - "You want a stable release, because the README labels the project alpha and telemetry is on by default."
  - "You need one agent with one config file, because the meta-harness premise is that you are running several and paying for that coordination."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics and issue count came from the GitHub API. Install commands, harness list, policy tiers, sandbox providers, Windows degradation and custom-agent YAML are read from the official README and docs; the server was not installed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Omnigent is a meta-harness: a common layer above Claude Code, Codex, Cursor, OpenCode, Hermes, Pi, Devin and Kiro, plus agents you write as short YAML files. Custom agents declare a prompt, an executor harness (SDK-based or native), local Python function tools whose schemas are auto-generated from the signature, MCP tools, and sub-agents a supervisor can delegate to, and an agent can author another agent's YAML for you. Governance is three-level: server-wide admin policy, per-agent developer policy, and per-session user policy, with the stricter session rules checked first, and spend caps and access limits as builtins. Sandbox execution spans Modal, Daytona, Blaxel, E2B, CoreWeave, Kubernetes, NVIDIA OpenShell, Boxlite, microsandbox and Databricks, and sessions sync across terminal, browser, phone and a native desktop app.

## Why it's in the Arsenal

The recurring problem is that agent tooling fragments: each CLI has its own config, its own permission model and its own idea of what a session is, so supervising more than one means writing glue and auditing boundaries per tool. Omnigent's bet is that the governance and session layer should live above the harness, so you can change harnesses without changing your controls. The tradeoff is that you now depend on a meta-layer with its own alpha surface, and OS-level isolation is genuinely weaker on Windows than on Linux and macOS.

## Architecture

A server hosts sessions and applies policy at three levels before dispatching work to a harness. Harnesses come in SDK form (claude-sdk, cursor, codex, openai-agents) and native form (claude-native, codex-native, cursor-native, hermes-native, pi), the native ones driven through tmux PTY wrappers. Isolation is layered: bwrap on Linux is mandatory for the native wrappers, macOS uses the built-in seatbelt sandbox, and there is an L7 egress proxy for network control; Windows falls back to Job Objects for process-tree containment and resource limits only. Sandbox providers are pluggable and can be provisioned server-side as managed hosts per session, and custom agents are YAML with a typed tool list (function, mcp, agent).

## Ecosystem Position

Omnient competes with Claude Code, Codex and opencode for the coding-agent slot but operates one level above them, so it is closer to a management plane than a competitor; it is an alternative to running each CLI directly when you need uniform policy. Compared with content/projects/frameworks entries such as LangGraph or CrewAI, it orchestrates existing harnesses rather than constructing agents from primitives. It complements entries in content/projects/agent-systems: ECC shapes one host's behaviour, while Omnigent applies policy across several, and the sandbox providers plug into the same class of infrastructure as the inference-engines phase but for execution rather than tokens. The custom-agent YAML overlaps with agent frameworks in spirit, without being a framework.

## Getting Started

One installer line, with extras for optional providers and sandbox backends:

```bash
curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh
# with extras:
curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh -s -- --extra modal,e2b
```

Requires Python 3.12+, uv, git, Node 22 LTS with npm and pnpm, and tmux; bubblewrap is required on Linux. Custom agents run with `omnigent run path/to/my_agent.yaml`.

## Key Use Cases

1. Cross-harness supervision: put Claude Code, Codex and Cursor in one session, ask one to review another's work, and keep the same policy and audit trail across all three.
2. Governed agent access: apply a policy at server, agent or session level that pauses for approval before risky actions, caps spend, or restricts which tools an agent reaches.
3. Ephemeral cloud runs: launch a session in a disposable Modal or E2B sandbox, drive it from a phone, and let the machine disappear when you are done.

## Strengths

- Uniform policy, spend caps and tool restrictions across every harness, applied at three scopes with the strictest winning.
- Real OS-level isolation on Linux (bwrap) and macOS (seatbelt) with an L7 egress proxy for network control, not just container-shaped sandboxing.
- Custom agents are a YAML file with auto-generated tool schemas, so an agent can author another agent without writing Python glue.
- Sessions follow you across terminal, browser, phone and desktop, and support live collaboration and forking.

## Limitations

Alpha status with telemetry enabled by default is a real adoption consideration for a tool that watches your other agents. Windows is a degraded mode: the native tmux/PTY wrappers are unavailable and Job Objects contain the process tree and enforce resource limits but do not isolate the filesystem or network, so the security story is materially weaker there. The dependency footprint is large (Python 3.12, Node 22, pnpm, tmux, bubblewrap on Linux) and any of these being missing stops native terminals from starting. Twelve sandbox providers is breadth without depth; expect uneven maturity between Modal and a self-hosted Kubernetes path. Roughly 1,500 open issues on a very young repository means expect breakage.

## Relation to the Arsenal

This is the meta-orchestration and governance layer in content/projects/agent-systems, sitting above the individual harnesses rather than beside them: it does not implement an agent loop, it supervises the ones in Codewhale, ECC's host set, and the OpenAI and Anthropic CLIs. The custom-agent YAML is the natural bridge to content/projects/frameworks, where you would build agent logic directly if you did not want to wrap an existing harness. Sandbox providers overlap with the container and cluster tooling adjacent to content/projects/inference-engines, and for observability of what those sessions did, re-gent in this same phase gives you per-turn attribution you would otherwise reconstruct by hand.

## Resources

- [GitHub — omnigent-ai/omnigent](https://github.com/omnigent-ai/omnigent)
- [Policy guide — docs/POLICIES.md](https://github.com/omnigent-ai/omnigent/blob/main/docs/POLICIES.md)
- [Project site — omnigent.ai](https://omnigent.ai)
