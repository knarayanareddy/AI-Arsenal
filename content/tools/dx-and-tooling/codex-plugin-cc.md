---
id: codex-plugin-cc
name: Codex Plugin for Claude Code
type: tool
job: [prototyping]
description: Official OpenAI plugin that runs Codex from inside Claude Code for second-opinion code reviews and background task delegation
url: "https://github.com/openai/codex-plugin-cc"
cost_model: freemium
pricing_detail: Plugin is free and open source (Apache-2.0); Codex usage requires a ChatGPT subscription (including Free tier) or an OpenAI API key and counts against Codex usage limits
tags: [agents, code-gen, tool-use]
maturity: beta
stack: [typescript]
free_tier: true
free_tier_limits: Works with a free ChatGPT account, subject to Codex free-tier usage limits
self_hostable: false
open_source: true
source_url: "https://github.com/openai/codex-plugin-cc"
docs_url: "https://github.com/openai/codex-plugin-cc#readme"
github_url: "https://github.com/openai/codex-plugin-cc"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - You work in Claude Code but want an independent second model reviewing your changes — cross-model review (`/codex:review`, `/codex:adversarial-review`) catches blind spots that same-model self-review structurally cannot
  - You want to delegate long-running tasks to a background agent (`/codex:rescue`, `/codex:transfer`) without leaving your Claude Code session
avoid_when:
  - You don't use Claude Code — this is a Claude Code plugin, not a standalone Codex interface
  - You need air-gapped or fully local workflows — Codex calls OpenAI-hosted models and consumes your Codex usage limits
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (26.8k), Apache-2.0 license, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08; on GitHub weekly trending the same day. Command surface (/codex:review, adversarial-review, rescue, transfer, status, result, cancel) from the official README. Review-quality claims are OpenAI's own framing, not independently benchmarked here.
verdict: recommended
verdict_rationale: First-party (OpenAI) tooling that operationalizes cross-model review — a mechanism with real error-decorrelation value — with trivial install and no new infrastructure
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=weekly","date":"2026-07-08","description":"On GitHub weekly trending; 26.8k stars"}
---

> **TL;DR:** OpenAI's official plugin for running Codex inside Claude Code: `/codex:review` and `/codex:adversarial-review` for cross-model code review, plus background task delegation and session handoff commands. Free plugin (Apache-2.0); Codex usage needs a ChatGPT account or API key. Best as an independent second reviewer — a different model catches errors your primary agent's self-review can't.

## Overview

An official OpenAI plugin that embeds Codex into the Claude Code workflow. It provides slash commands for read-only Codex reviews of your current changes, a steerable "adversarial" challenge review, and a set of delegation commands (`/codex:rescue`, `/codex:transfer`, `/codex:status`, `/codex:result`, `/codex:cancel`) for handing work to Codex as a background job and managing it without leaving Claude Code.

## Why It's in the Arsenal

Same-model self-review has a structural weakness: the reviewer shares the author's blind spots. This plugin operationalizes cross-model review — a genuinely different model, trained by a different lab, critiques the diff — which decorrelates errors in a way no amount of same-model prompting can. That it's first-party from OpenAI, shipping through Claude Code's plugin marketplace, also makes it a notable signal of the coding-agent ecosystem interoperating rather than siloing.

## Key Features

- `/codex:review` — read-only Codex review of uncommitted changes or a branch, equivalent to running `/review` in Codex directly
- `/codex:adversarial-review` — steerable challenge review that argues against the change
- Background delegation: `/codex:rescue` and `/codex:transfer` hand tasks or whole sessions to Codex; `/codex:status`/`/codex:result`/`/codex:cancel` manage jobs
- `/codex:setup` handles Codex installation and login checks

## Architecture / How It Works

The plugin installs via Claude Code's plugin marketplace and shells out to the Codex CLI (`@openai/codex`) under your existing ChatGPT or API credentials. Reviews run Codex against your working tree read-only; delegated tasks run as background Codex jobs whose results are pulled back into the Claude Code session. Usage counts against your Codex limits, not Claude's.

## Getting Started

```bash
# In Claude Code:
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Use Cases

1. **Scenario**: before opening a PR, run `/codex:review --background` on a multi-file change and keep working while Codex produces an independent review
2. **Scenario**: Claude Code is stuck on a task — `/codex:rescue` hands the session context to Codex for a fresh attempt with a different model

## Strengths

- Cross-model review is a mechanism, not a vibe: independent training lineage means decorrelated failure modes
- First-party maintenance by OpenAI with marketplace distribution (26.8k stars as of 2026-07-08)

## Limitations / When NOT to Use

- Claude Code-only; useless in other harnesses
- Adds a second vendor dependency and consumes Codex usage limits; reviews on large diffs are slow enough that background mode is effectively required

## Integration Patterns

- Make `/codex:review --background` a pre-PR habit alongside your normal test/lint gate
- Pairs naturally with skills frameworks like [Superpowers](./superpowers.md): the methodology handles process discipline, Codex provides the independent reviewer its review stage calls for

## Resources

- [GitHub](https://github.com/openai/codex-plugin-cc)
- [Documentation](https://github.com/openai/codex-plugin-cc#readme)

## Buzz & Reception

On GitHub weekly trending with 26.8k stars as of 2026-07-08, roughly three months after its late-March 2026 release — widely noted as an unusual case of OpenAI shipping first-party tooling for a competitor's coding agent.
