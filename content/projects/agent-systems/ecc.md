---
id: ecc
name: ECC
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "MIT-licensed harness layer installing 68 agents, 286 skills, hooks, memory and AgentShield scanning into Claude Code, Codex and others"
github_url: "https://github.com/affaan-m/ECC"
license: MIT
primary_language: Other
tags: [agents, code-gen, security]
maturity: production
cost_model: open-source
github_stars: 268797
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://ecc.tools"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Encodes the plan-test-implement-review-verify loop once instead of restating it in every prompt, with adapters across seven harnesses."
best_for:
  - "You keep rewriting the same engineering prompt for Claude Code and you would rather install the process once as skills, agents and hooks."
  - "You run agents across more than one harness and you want a common skill and agent library with a documented capability matrix rather than per-tool setup."
  - "You want a security pass over agent configuration itself, because AgentShield scans prompts, hooks, MCP config, permissions, secrets and agent files."
avoid_if:
  - "You expect identical feature parity across harnesses, because the README ships a support status matrix and calls several integrations capability-limited adapters."
  - "You have already layered multiple ECC installs into the same harness, because duplicate skills, commands and hooks are a known state that needs the reset path rather than another install."
  - "You want a small auditable dependency, because this is a large prompt-and-config surface whose behaviour you are adopting wholesale."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Asset counts (68 agents, 286 skills, 94 commands), the workflow loop, install commands, adapter list, AgentShield scope and identifier scheme are read from the official README; nothing was installed during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

ECC installs a full engineering workflow into an existing coding agent rather than replacing it. It provides 68 specialised agents (planning, review, build repair, security, architecture, domain work), 286 skills covering TDD, research, security, docs, frontend, data, ML and operations, 94 legacy command shims, plus hooks for enforcement and session summaries, rules that are always loaded by language, memory with continuous learning and instincts, and AgentShield for scanning agent configuration. Its stated loop is plan, test, implement, review, verify, remember, improve. Claude Code is the best-supported host via a native plugin; Codex has a native plugin path plus a deprecated sync script; Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity and Qwen get capability-limited adapters. The repo is MIT forever, with a hosted GitHub App for private repos.

## Why it's in the Arsenal

The recurring problem is drift in how an agent works. Ask two sessions to fix a bug and you get one that tests first and one that patches then apologises, and neither leaves a durable trace of what worked. ECC's answer is to make the process a property of the harness: hooks enforce it, rules preload it, and repeated wins become skills. The cost is adoption risk and a large surface, plus the documentation's own warning about stacking installs.

## Architecture

Distribution happens through harness-specific mechanisms: a Claude Code plugin identified as ecc@ecc from a GitHub marketplace, and an npm package named ecc-universal, with the three identifiers deliberately different because marketplace keys are canonical and constrained. Codex installs from a repo marketplace that carries the manifest, skills, MCP configuration, hook runtime and assets in one cache entry. Hooks provide enforcement and continuous learning; rules are loaded always-on per language pack; memory and instincts persist what works; and AgentShield is a scanner over prompts, hooks, MCP config, permissions and secrets. Legacy command shims exist so older slash-command muscle memory keeps working during the move to a skills-first surface.

## Ecosystem Position

ECC overlaps with agent-framework entries such as CrewAI and AutoGen in intent but sits at a different altitude: it is configuration and prompts for an existing harness rather than a library you import. It competes with Anthropic's own example workflows and with community prompt packs, while the hosted GitHub App is a direct alternative to CodeRabbit and Greptile for private-repository review. Compared with the terminal coding agents in content/projects/agent-systems, it is complementary rather than rival: those own the loop, ECC shapes how the loop is run. Where content/projects/frameworks gives you a library, ECC gives you a policy layer with a host dependency.

## Getting Started

For Claude Code the native plugin route is the supported path and the manual install is explicitly discouraged:

```bash
# inside Claude Code
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
```

For Codex, add the repo marketplace and the plugin, then check the install:

```bash
codex plugin marketplace add affaan-m/ECC
codex plugin add ecc@ecc
node scripts/ecc.js doctor
```

Rule packs are copied separately because Claude Code plugins cannot distribute them.

## Key Use Cases

1. Standardising agent behaviour: install the plan-test-implement-review loop once so every session in that harness behaves the same way.
2. Multi-host teams: keep one skill library and run it in Claude Code and Codex against an explicit capability matrix rather than two divergent prompt sets.
3. Auditing agent configuration: run AgentShield over prompts, hooks, MCP servers, permissions and agent files before letting an agent near a sensitive repo.

## Strengths

- Very large curated surface (68 agents, 286 skills) that encodes engineering practice rather than one-off prompting tricks.
- Enforcement through hooks and always-loaded rules, so the process holds even when a session drifts.
- A documented capability matrix across seven harnesses, which is rarer and more honest than claiming universal parity.
- AgentShield treats agent configuration as a security surface, a category most harnesses ignore.

## Limitations

This is a prompt-and-configuration distribution with roughly 300 assets, so the review burden scales with what you adopt and behaviour is harder to test than code. The README warns explicitly against stacking install methods and ships a reset path because duplicate skills, commands and hooks are a real failure mode. Adapter parity is explicitly uneven, so workflows may behave differently on Cursor or Gemini than on Claude Code. Roughly 233 open issues on a very high-traffic repository, single-maintainer shipping cadence, and an official warning about unofficial mirrors and supply-chain risk around a project this widely installed. Guided npm setup is not in the current npm release, so installation depends on harness-native commands.

## Relation to the Arsenal

This is the harness-policy layer in content/projects/agent-systems, sitting on top of the terminal agents in the same phase rather than beside them as a rival: it has no loop of its own, it installs into someone else's. The security-scanning component overlaps with guardrails you would otherwise assemble from content/projects/frameworks or a dedicated scanning tool, and the memory and continuous-learning parts sit alongside the agent-memory entries in content/projects/data-and-retrieval. For the loop itself, look at Codewhale, Whale or DeepSeek-Reasonix as the hosts you would install ECC into.

## Resources

- [GitHub — affaan-m/ECC](https://github.com/affaan-m/ECC)
- [Project site — ecc.tools](https://ecc.tools)
- [npm — ecc-universal](https://www.npmjs.com/package/ecc-universal)
