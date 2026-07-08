---
id: addyosmani-agent-skills
name: Agent Skills (Addy Osmani)
type: tool
job: [prototyping]
description: Production-grade engineering skills for AI coding agents, organized as 8 slash commands mapping to the development lifecycle
url: "https://github.com/addyosmani/agent-skills"
cost_model: open-source
pricing_detail: Free and open source (MIT)
tags: [agents, code-gen, planning]
maturity: beta
stack: [polyglot]
free_tier: true
free_tier_limits: Fully free; no paid tier exists
self_hostable: true
open_source: true
source_url: "https://github.com/addyosmani/agent-skills"
docs_url: "https://github.com/addyosmani/agent-skills#readme"
github_url: "https://github.com/addyosmani/agent-skills"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - You want lifecycle discipline for a coding agent but with explicit, per-stage control — each of the 8 slash commands (/spec, /plan, /build, /test, /review, /webperf, /code-simplify, /ship) activates only the skills for that stage, so you invoke exactly the rigor you need
  - You want a skills pack curated by one senior engineer with a consistent editorial voice, rather than a sprawling community collection of uneven quality
avoid_when:
  - You want the methodology to trigger automatically without per-stage commands — an auto-triggering framework fits that workflow better
  - Your work is not web/software-product development — several skills (e.g. /webperf) assume that domain
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (73.2k), MIT license, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-08; on GitHub daily trending the same day. Repo created 2026-02 by Addy Osmani (Google Chrome engineering lead). Skill content quality assessed from the README's documented command structure, not independently exercised here.
verdict: recommended
verdict_rationale: High-signal single-curator skills pack with a clear mechanism (per-lifecycle-stage slash commands with quality gates) and rapid adoption; deliberately smaller scope than whole-methodology frameworks
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=daily","date":"2026-07-08","description":"On GitHub daily and weekly trending; 73.2k stars"}
---

> **TL;DR:** Addy Osmani's curated skills pack for coding agents: 8 slash commands mapping to the development lifecycle (spec → plan → build → test → review → ship, plus /webperf and /code-simplify), each activating the right skills and quality gates for that stage. MIT. Best when you want explicit per-stage control; pick an auto-triggering framework if you want zero-command methodology enforcement.

## Overview

A collection of production-grade engineering skills for AI coding agents, packaged behind 8 lifecycle slash commands. Each command encodes the workflows and quality gates a senior engineer applies at that stage — spec before code, small atomic tasks, tests as proof, code-health review before merge — so the agent follows them consistently. An optional `/build auto` mode runs the whole plan autonomously after one human approval, pausing on failures.

## Why It's in the Arsenal

Skill packs vary wildly in quality; this one earns a place through mechanism and curation. The mechanism is per-stage activation: instead of loading one giant methodology, each slash command loads only the skills relevant to its lifecycle stage, keeping context lean and the agent's behavior predictable. The curation is a single senior engineer (Chrome engineering lead) with a consistent quality bar — the opposite failure mode from sprawling community collections. It's a primary reference in the [agent-skills ecosystem guide](../../skills/agent-skills/agent-skills-ecosystem.md).

## Key Features

- 8 lifecycle commands: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/webperf`, `/code-simplify`, `/ship`
- Each command activates stage-appropriate skills and quality gates automatically
- `/build auto`: approve the plan once, then autonomous task-by-task execution — every task still test-driven and committed individually, pausing on failures or risky steps
- Web-specific depth: performance auditing (`/webperf`) grounded in measure-before-optimize practice

## Architecture / How It Works

Skills are Markdown documents grouped by lifecycle stage; the slash commands are thin routers that load the relevant group into the agent's context. Quality gates are encoded as explicit checks within each stage's skills (e.g., tests must pass before `/review`, review before `/ship`), so the discipline lives in the loaded instructions rather than in the harness.

## Getting Started

```bash
# See the repository README (Resources below) for the current
# per-harness installation instructions.
```

## Use Cases

1. **Scenario**: feature development where you drive stage transitions yourself — `/spec` a feature, `/plan` it, then `/build auto` to execute the approved plan autonomously
2. **Scenario**: a web-performance pass on an existing app via `/webperf`, with the agent measuring before proposing optimizations

## Strengths

- Per-stage skill activation keeps context small and behavior predictable — you always know which rigor is in force
- Fast, broad adoption (73.2k stars as of 2026-07-08, ~5 months after creation) with a single accountable curator

## Limitations / When NOT to Use

- Command-driven: nothing enforces the methodology if you skip the commands — auto-triggering frameworks close that gap
- Web/product-development slant; less applicable to ML pipelines, infra, or research code

## Integration Patterns

- Use standalone as your agent's lifecycle discipline, or borrow individual stage skills into an existing setup
- Compare with [Superpowers](./superpowers.md): auto-triggering whole methodology vs. this pack's explicit per-stage commands — the choice is control granularity

## Resources

- [GitHub](https://github.com/addyosmani/agent-skills)
- [Documentation](https://github.com/addyosmani/agent-skills#readme)

## Buzz & Reception

On GitHub daily and weekly trending with 73.2k stars as of 2026-07-08; one of the fastest-growing agent-skills repositories since its February 2026 creation, amplified by the author's large developer-education following.
