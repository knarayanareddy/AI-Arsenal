---
id: agents-best-practices
name: agents-best-practices
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A provider-neutral Agent Skill covering harness design, permission ladders, typed tool contracts, and production-readiness audits"
github_url: "https://github.com/DenisSergeevitch/agents-best-practices"
license: MIT
primary_language: Other
tags: [agents, structured-output, guardrails]
maturity: alpha
cost_model: open-source
github_stars: 2357
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-22"
docs_url: "https://github.com/DenisSergeevitch/agents-best-practices/blob/main/SKILL.md"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Encodes one opinionated doctrine for where autonomy stops and a human approves, instead of leaving tool permissions to improvisation."
best_for:
  - "You are starting a new agent from scratch and need the smallest approval-gated harness that can do one real job."
  - "You are reviewing an existing agent's tool permissions and need a written map of which calls run, which are gated, which are denied."
  - "You are a platform team standardizing hooks, evals, and observability across every internal agent you ship."
avoid_if:
  - "You want a library to import, because this repository is instruction text the agent reads rather than a package you depend on."
  - "You are eight weeks from a launch and need tested implementation rather than design guidance."
  - "You are in the middle of a live incident, where reading doctrine is slower than reading the trace."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 2357, MIT, null primary language, last commit 2026-09-22, topics. From README: install commands, SKILL.md plus references layout, nine use cases, freshness/self-update behavior. references/ contents and audit procedures were not read or run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The deliverable is a single SKILL.md plus a references directory, with an icon, installable globally through the Agent Skills CLI or by cloning into a user-level skills directory. Its organizing claim is that the model proposes actions while the harness validates, authorizes, executes, records, and returns observations. The reference material covers the loop from context builder to model call to typed tool call, permission levels with an approval-gated Level 2 harness as the recommended starting point, environment-adaptive and speculative tool execution, planning mode, memory, connectors, evals, prompt caching, and production readiness. Nine worked use cases show the same doctrine applied to a CRM renewal-risk agent and to non-coding domains.

## Why it's in the Arsenal

The decision it resolves is the autonomy boundary: what an agent may do unattended, what it must ask about, and what it must never touch. That choice is usually made once at the start of a project and then contradicted by every feature added afterwards. Encoding it as an auditable permission map with named levels turns that decision into a reviewable artifact, and the MVP blueprint case exists so the first version of an agent is deliberately small rather than an aspirational architecture diagram.

## Architecture

Nothing executes. SKILL.md is the entrypoint an agent loads, and the references directory holds deeper material it pulls only when a conversation touches a relevant topic - the file is scoped by subject rather than read wholesale. Freshness is handled procedurally: on each new task the skill checks the repository's main revision, pins a consistent upstream snapshot when the installed copy is stale, preserves local edits and installer-managed copies, respects write permissions, and says so out loud when freshness cannot be confirmed. Installation targets are the conventional directories - ${CODEX_HOME:-$HOME/.codex}/skills, ~/.claude/skills, or a project-level .claude/skills.

## Ecosystem Position

Where LangGraph and CrewAI supply an execution runtime, this competes with the hand-written CLAUDE.md and .cursorrules files teams already maintain, so it is doctrine rather than a framework and it overlaps with the book-derived rule packs in the sibling framework entries without importing their content. Compared with Pydantic AI or the OpenAI Agents SDK, which enforce typed tool schemas at runtime, the permission levels here are conventions the model is asked to honor. It complements rather than replaces a harness: adopt it first and you will still need a real runtime from content/projects/frameworks to execute anything.

## Getting Started

Install globally with the Agent Skills CLI so every project can discover it, or clone it into the skills directory your agent already reads.

```bash
npx skills add DenisSergeevitch/agents-best-practices -g
# manual equivalent for Claude Code, user level
git clone https://github.com/DenisSergeevitch/agents-best-practices.git "$HOME/.claude/skills/agents-best-practices"
```

Then ask it to blueprint an MVP harness for your domain and it will start from an approval-gated level rather than an open tool grant.

## Key Use Cases

1. Draft the first version of an agent: describe the domain and get a minimal permission ladder plus a single-job core loop instead of a feature list.
2. Audit an existing agent: map every current tool call to an autonomy level and find the ones running unattended that should not be.
3. Standardize across a fleet: give every internal agent the same hook, eval, and observability expectations so review stops being bespoke.

## Strengths

- Provider-neutral, so the guidance survives a model or harness switch instead of being tied to one vendor's loop.
- Scopes a long reference set behind one entrypoint, keeping the always-loaded surface small.
- Ships a freshness check with an honest failure mode, which matters because installed skill copies silently rot.
- Applies beyond coding agents, which makes the permission discipline usable for support, finance, or legal automation.

## Limitations

The central weakness is that every recommendation is advisory. A model can rationalize its way past a level-2 approval gate, and nothing here measures whether it actually did, so the permission map is a design document rather than a control. The install-time self-update step writes into skill directories, which collides with managed or read-only installs and with teams that pin versions through their own tooling. Permission ladders also assume a risk model; a public read-only agent and one that drafts refund emails need different answers from the same doctrine, and the skill does not know which one you have.

## Relation to the Arsenal

This is a framework-phase design artifact with no runtime, so it pairs directly with the executable harnesses in the sibling content/projects/frameworks entries. Its permission and observability expectations assume tools that return data, which the connector and retrieval layers in content/projects/data-and-retrieval supply, and its production-readiness section is written against the serving stack described in content/projects/inference-engines.

## Resources

- [Repository and SKILL.md entrypoint](https://github.com/DenisSergeevitch/agents-best-practices)
- [SKILL.md source](https://github.com/DenisSergeevitch/agents-best-practices/blob/main/SKILL.md)
- [Agent Skills CLI](https://github.com/vercel-labs/skills)
