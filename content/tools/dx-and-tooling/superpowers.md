---
id: superpowers
name: Superpowers
type: tool
job: [prototyping]
description: Composable agent-skills framework encoding a full software development methodology (spec, plan, TDD, subagent-driven implementation) for coding agents
url: "https://github.com/obra/superpowers"
cost_model: open-source
pricing_detail: Free and open source (MIT); optional commercial support from Prime Radiant
tags: [agents, code-gen, planning, tool-use]
maturity: production
stack: [polyglot]
free_tier: true
free_tier_limits: Fully free and self-hostable; commercial support is optional
self_hostable: true
open_source: true
source_url: "https://github.com/obra/superpowers"
docs_url: "https://github.com/obra/superpowers#readme"
github_url: "https://github.com/obra/superpowers"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - Your coding agent jumps straight into writing code without a spec or plan and produces sprawling, untested changes — Superpowers front-loads spec extraction, chunked design review, and a plan explicit enough for "a junior engineer with no context" before any code is written
  - You want one methodology that ports across harnesses — it installs into Claude Code, Codex (app and CLI), Cursor, Copilot CLI, OpenCode, and others, so the workflow survives switching agents
avoid_when:
  - Your tasks are small, one-shot edits — the spec/plan/TDD ceremony adds real overhead that only pays off on multi-step feature work
  - You disagree with its opinions (strict red/green TDD, YAGNI, subagent-driven task execution) — it is a whole methodology, and cherry-picking fragments loses the mechanism that makes it work
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (249.5k), MIT license, and active development (last push 2026-07-06) verified via the GitHub API on 2026-07-08; on GitHub daily and weekly trending the same day. Workflow description (spec extraction, chunked design review, subagent-driven development) from the project README; productivity claims not independently benchmarked here.
verdict: recommended
verdict_rationale: The largest agent-skills framework (249k+ stars), marketplace-distributed, with a coherent mechanism (spec-plan-TDD discipline via auto-triggering skills) rather than a loose prompt collection
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=daily","date":"2026-07-08","description":"On GitHub daily and weekly trending; 249.5k stars"}
---

> **TL;DR:** A complete software-development methodology for coding agents, packaged as composable, auto-triggering skills: extract a spec, review the design in digestible chunks, produce an explicit implementation plan, then execute it via subagents with strict red/green TDD. MIT, harness-agnostic (Claude Code, Codex, Cursor, Copilot CLI, OpenCode, and more). Best for multi-step feature work; overkill for one-shot edits.

## Overview

Superpowers is an agent-skills framework that encodes an opinionated software-development methodology — spec before code, chunked design review, explicit planning, test-driven implementation, subagent-driven execution — as a set of composable skills plus bootstrap instructions that make the agent apply them automatically. Rather than a library you call, it changes how your existing coding agent works from the moment a session starts.

## Why It's in the Arsenal

The dominant failure mode of coding agents on non-trivial work is skipping straight to code: no spec, no plan, no tests, and long sessions that drift. Superpowers attacks that mechanism directly — skills trigger automatically when the agent detects it's building something, forcing spec extraction and human sign-off before implementation, then delegating execution to reviewed subagent tasks. It is also the reference point for the agent-skills pattern itself, covered in the [agent-skills ecosystem guide](../../skills/agent-skills/agent-skills-ecosystem.md).

## Key Features

- Auto-triggering skills: no slash commands needed; the methodology activates when the agent starts building
- Spec extraction and chunked design review with human sign-off gates before code
- Implementation plans written to be executable by "a junior engineer with poor taste and no context" — i.e., explicit enough for an LLM
- Subagent-driven development: worker agents execute tasks while the orchestrating agent inspects and reviews their output
- Installs into Claude Code (official plugin marketplace), Codex app/CLI, Cursor, Factory Droid, GitHub Copilot CLI, Kimi Code, OpenCode, and others

## Architecture / How It Works

A set of Markdown skill documents plus initial instructions loaded into the harness. The bootstrap instructions make the agent recognize when a skill applies and load it; the skills themselves encode the methodology stages (brainstorm/spec, design review, planning, TDD execution, code review). Multi-hour autonomous runs stay on-plan because the plan itself — not the agent's context memory — is the source of truth for what to do next.

## Getting Started

```bash
# Claude Code (official marketplace):
#   /plugin marketplace → install Superpowers
# Other harnesses (Codex, Cursor, OpenCode, ...): see per-harness
# install instructions in the README (Resources below).
```

## Use Cases

1. **Scenario**: a multi-day feature build where the agent works autonomously for hours — the spec/plan sign-off happens once up front, then subagents execute task-by-task with TDD
2. **Scenario**: standardizing how a team's coding agents work across mixed harnesses (some engineers on Claude Code, some on Codex/Cursor) with one shared methodology

## Strengths

- Whole-methodology coherence: spec, plan, TDD, and review reinforce each other rather than being isolated prompt snippets
- Massive adoption and first-party marketplace distribution (249k+ stars as of 2026-07-08; available via the official Claude plugin marketplace)

## Limitations / When NOT to Use

- Heavy for small tasks: the spec/plan ceremony is real overhead on one-shot edits
- Strongly opinionated (strict TDD, YAGNI, subagent execution); teams that reject those opinions will fight the framework rather than benefit from it

## Integration Patterns

- Install per-harness (each harness needs its own installation) and let skills auto-trigger; no per-task invocation needed
- Compare with [Agent Skills (Addy Osmani)](./addyosmani-agent-skills.md) — slash-command-driven lifecycle stages vs. Superpowers' auto-triggering whole methodology

## Resources

- [GitHub](https://github.com/obra/superpowers)
- [Documentation](https://github.com/obra/superpowers#readme)

## Buzz & Reception

On GitHub daily and weekly trending with 249.5k stars as of 2026-07-08 — the most-starred agent-skills framework by a wide margin, distributed through the official Claude Code plugin marketplace and widely discussed as the canonical example of methodology-as-skills.
