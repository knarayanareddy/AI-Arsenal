---
id: loop-engineering
name: loop-engineering
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Pattern library and npx CLI for running recurring agent loops around a codebase, with autonomy levels, cost tiers and a Loop Ready score"
github_url: "https://github.com/cobusgreyling/loop-engineering"
license: MIT
primary_language: TypeScript
tags: [orchestration, community-favorite, kubernetes]
maturity: beta
cost_model: open-source
github_stars: 11330
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://cobusgreyling.github.io/loop-engineering/"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Treats agent work as a scheduled system with discovery, verification and persisted state, rather than something you re-prompt by hand."
best_for:
  - "You want agents to keep a repository healthy between your own working sessions, because the daily-triage pattern runs on a one-to-two-hour cadence and starts report-only."
  - "You need to hand PR babysitting to a loop and you want the autonomy level and cost tier explicit before you enable writes."
  - "You are porting a workflow between Claude Code, Codex, Grok or OpenCode and you want one pattern definition that targets all four."
avoid_if:
  - "You want an agent framework or SDK, because this is a set of documented patterns plus a CLI, not a library you import."
  - "You are starting with one long task rather than recurring work, because every pattern here is defined by cadence and runs repeatedly."
  - "You need week-one automation, because the project deliberately defaults the first week to report-only so nothing writes before you have seen the output."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Pattern list, cadence and autonomy table, cost tiers, CLI commands and week-one report-only default are read from the official README and docs; no loop was executed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Loop Engineering is a repository of patterns for operating coding agents around a codebase, plus an npx-published CLI (@cobusgreyling/loop) that scaffolds them. The core claim is that you design the loop — discover work, hand it to an agent, verify results, persist state — instead of typing the next prompt. Each pattern declares a cadence, a week-one autonomy level (L1 report, L1 draft, L1 watch, L2 cautious, L2 patch-only, L1 off-peak, L1 propose-only) and a cost tier: daily-triage, thin-loop, PR babysitter, CI sweeper, dependency sweeper, changelog drafter, post-merge cleanup and issue triage. The CLI targets a harness with --tool (claude by default, or grok, codex, opencode), writes a STATE.md for long loops, and exposes loop-init, loop-doctor and loop-audit commands plus a Loop Ready score.

## Why it's in the Arsenal

The failure mode it addresses is the abandoned agent workflow: you set up something clever, it runs unattended, and three weeks later you cannot tell whether it helped or silently burned money. Loop Engineering makes the operating envelope explicit per pattern (cadence, week-one autonomy, cost) and persists state so each run is inspectable and the score moves. The cost is that you are committing to a recurring process and to CI infrastructure, which is real work to set up and to keep honest.

## Architecture

Patterns are Markdown documents plus, for some, starter directories such as the thin-loop starter that needs no STATE.md. The CLI reads the pattern definition, scaffolds the loop into a repository, targets a specific harness through the --tool flag, and persists progress in a STATE.md file that survives between runs. Autonomy is expressed as a level per pattern for the first week (report-only for most), which then escalates; loop-doctor checks the installation and loop-audit inspects the current setup and produces the Loop Ready score. The stated stance is optimise the context window and persist everything else, so state lives on disk rather than in the conversation.

## Ecosystem Position

This is not an agent and not a framework: it is the operating layer around one, so it competes with nothing in content/projects/frameworks and complements everything in content/projects/agent-systems by assuming you already have a harness. Where ECC installs discipline inside Claude Code, loop-engineering installs cadence and state outside it, and the two compose. Compared with the CI-sweeping and dependency-update bots in the data-and-retrieval and devops toolchains, it does the same maintenance with a model that can reason about the diff rather than apply a canned bump. Agent-skill marketplaces overlap in spirit but sell reusable abilities rather than recurring loops.

## Getting Started

The CLI is used with npx; scaffold a loop in the current repo and check the setup:

```bash
npx @cobusgreyling/loop init . --pattern daily-triage --tool claude
npx @cobusgreyling/loop doctor .
```

--tool defaults to claude; swap it for grok, codex or opencode. Week one is report-only, so nothing writes until you have seen what the loop finds.

## Key Use Cases

1. Repository hygiene on a schedule: run daily-triage every one to two hours to surface issues, CI failures and dependency drift without a human reading every notification.
2. PR babysitting: use the PR babysitter pattern at a five-to-fifteen-minute cadence at L1 watch to track a PR through CI and review rather than polling by hand.
3. Cost-aware automation selection: choose between thin-loop (very low cost), dependency sweeper (medium) and CI sweeper (very high) by first reading the declared cost tier rather than discovering it in the invoice.

## Strengths

- Explicit autonomy and cost metadata per pattern, so the risk and spend of each loop are legible before you enable it.
- Report-only first week is a built-in safety default that reduces the chance of an unattended loop damaging a repo on day one.
- Harness-agnostic: the same pattern targets Claude Code, Codex, Grok or OpenCode, so vendor lock-in is a config value.
- Persisted state between runs means each loop is inspectable and the Loop Ready score gives a trend rather than a one-off verdict.

## Limitations

This is prompt-and-process material, so its value depends entirely on your repository and your model; there is no code quality bar to hold it to. Eight hours of daily-triage at L2 CI sweeping is real money, and the cost tiers are qualitative rather than measured. Running unattended loops that open pull requests or push fixes changes your review surface permanently and can produce comment noise your maintainers will notice. Autonomy escalation is a manual decision, so the system does not decide when it is safe to write, which means the safety burden stays with you. Adoption is also young: created mid-2026 with a small issue count and a single visible maintainer.

## Relation to the Arsenal

This is the process-and-cadence layer in content/projects/agent-systems, and it is the entry to read when the question is how often an agent runs and with what autonomy rather than which agent to use. It composes directly with ECC, which supplies the skills and hooks that a loop calls, and with the terminal agents in this phase that the loops drive. Where the frameworks phase holds orchestration libraries, this holds the recurring procedure; and its autonomous-branch behaviour touches the same review-boundary questions as the observability and evaluation phases, where you would go to measure whether a loop is actually helping.

## Resources

- [GitHub — cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering)
- [Showcase and pattern picker](https://cobusgreyling.github.io/loop-engineering/)
- [npm — @cobusgreyling/loop](https://www.npmjs.com/package/@cobusgreyling/loop)
