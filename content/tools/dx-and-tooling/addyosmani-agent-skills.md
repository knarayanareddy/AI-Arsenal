---
id: addyosmani-agent-skills
name: Agent Skills (Addy Osmani)
type: tool
job: [prototyping]
description: "Collection of roughly two dozen markdown SKILL.md workflows and slash commands that install process gates into Claude Code, Cursor, Codex and 70 other agents"
url: "https://github.com/addyosmani/agent-skills"
cost_model: open-source
pricing_detail: Free and open source (MIT)
tags: [agents, observability]
maturity: production
stack: [polyglot]
free_tier: true
free_tier_limits: Fully free; no paid tier exists
self_hostable: true
open_source: true
source_url: "https://github.com/addyosmani/agent-skills"
docs_url: "https://github.com/addyosmani/agent-skills/blob/main/docs/getting-started.md"
github_url: "https://github.com/addyosmani/agent-skills"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when: ["You want the same spec-first, test-driven, review-gated process in every coding agent you use, and you would rather check process into the repo than re-explain it per tool.", "Your team keeps re-teaching an agent that tests are the proof, that changes should be small, and that review happens before merge, and you want those rules enforced consistently across contributors.", "You are evaluating agent process packs and want a documented side-by-side against Superpowers and Matt Pocock's skills before adopting one, which the repository ships as docs/comparison.md."]
avoid_when: ["You want runtime control, because these are plain Markdown instructions and nothing here executes, validates or blocks a step on your behalf.", "You plan to install a single skill through the per-skill command, because the README warns that path skips the repository-level references directory and leaves supplementary shared checklists unreachable.", "You are on an agent with no documented integration, because Cursor, Copilot and OpenCode each need manual placement of skill files and rule files in their own directories rather than a plugin install."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (73.2k), MIT license, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-08; on GitHub daily trending the same day. Repo created 2026-02 by Addy Osmani (Google Chrome engineering lead). Skill content quality assessed from the README's documented command structure, not independently exercised here.
verdict: recommended
verdict_rationale: High-signal single-curator skills pack with a clear mechanism (per-lifecycle-stage slash commands with quality gates) and rapid adoption; deliberately smaller scope than whole-methodology frameworks
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=daily","date":"2026-07-08","description":"On GitHub daily and weekly trending; 73.2k stars"}
---

## Overview

This repository packages engineering process as agent-readable skills. Each skill is a directory containing a SKILL.md with concrete steps, verification gates and what the author calls anti-rationalisation tables - patterns for the excuses an agent reaches for when it wants to skip a step. The catalogue follows the delivery lifecycle: defining work through interview-me, idea-refine and spec-driven-development; planning with planning-and-task-breakdown; building with incremental-implementation, test-driven-development, context-engineering, source-driven-development, doubt-driven-development, frontend-ui-engineering and api-and-interface-design; verifying with browser-testing-with-devtools and debugging-and-error-recovery; reviewing with code-review-and-quality, code-simplification, security-and-hardening and performance-optimization; and shipping with git-workflow-and-versioning, ci-cd-and-automation, deprecation-and-migration, documentation-and-adrs, observability-and-instrumentation and shipping-and-launch. A meta-skill maps incoming work to the right workflow, and separate agent personas for code review, test engineering and security auditing apply the same content from a different stance.

## Why It's in the Arsenal

The decision it resolves is how you make an agent's process consistent rather than dependent on which engineer is prompting it. Two people on one codebase get different quality from the same model because their instructions differ, and prompt files scattered across personal config directories are not reviewable. Putting the process in the repository as Markdown makes it a code-review artefact: a change to the test gate is a diff anyone can see. The tradeoff is that this is pure instruction, so it works only as far as the underlying model follows it, and it competes for the same context window as the code you are asking about.

## Key Features

- Zero runtime: it is Markdown, so there is nothing to deploy, version-pin or keep alive.
- Two dozen skills map onto a real delivery lifecycle rather than a grab-bag of prompts, and each carries verification gates rather than vague advice.
- Works across the major harnesses through a single npx installer plus native plugin paths for the most-used ones.
- MIT licensed and explicitly reusable, with a documented comparison against the two main alternatives.

## Architecture / How It Works

There is no executable core. Each skill is a Markdown document under skills/ with front matter that names it and describes when to use it, and the harness decides when to load one - either because the user invoked a slash command or because the described task matches. A using-agent-skills meta-skill sits above the rest and maps a request to the correct workflow, which is how activation works without every skill sitting in the prompt at once. Alongside them, agents/ holds persona definitions that shift stance rather than procedure: a senior staff engineer for review, a QA specialist for test strategy, a security engineer for threat modelling. Installation is either a native plugin per harness - a marketplace manifest for Claude Code, a plugin.json path for Codex, agy plugin install for Antigravity, gemini skills install for the Gemini CLI - or a generic npx skills add that writes into a target agent's skills directory. Native installs carry the repository's references/ directory; the single-skill path does not.

## Getting Started

The generic installer covers seventy-plus agents in one command; browse before you commit to the full set:

```bash
npx skills add addyosmani/agent-skills --list
npx skills add addyosmani/agent-skills
```

On Claude Code the native marketplace path is `/plugin marketplace add addyosmani/agent-skills` followed by `/plugin install agent-skills@addy-agent-skills`; if the marketplace clone fails over SSH, add your key or pass the full HTTPS URL to force HTTPS cloning.

## Use Cases

1. Standardise a team workflow: install the lifecycle pack into every contributor's agent so everyone gets the same spec, test and review gates from a checked-in file.
2. Fix a specific failure mode: pull just the one skill that addresses it, such as debugging-and-error-recovery for a flaky suite or code-simplification for a module nobody can maintain.
3. Run a review pass with a persona: invoke the code-reviewer or security-auditor agent definition so the same checklist is applied with the appropriate seniority framing.

## Strengths

It competes with Superpowers and with Matt Pocock's skills, and the repository is candid enough to ship a side-by-side comparison of all three rather than claiming a monopoly. It also overlaps with the ad-hoc prompt-file and rules-file conventions every coding agent already supports: this is the same mechanism as a .cursorrules file or a CLAUDE.md, formalised and made large. Compared with content/projects/frameworks entries such as langgraph or crewai, this is not a framework at all - it supplies no loop, no tool interface and no state, only the written workflow a harness you already run will follow. It complements the coding-agent tools in content/tools/dx-and-tooling, including aider and the agenta workspace, by setting expectations for how they should be driven.

## Limitations / When NOT to Use

The fundamental limitation is that instructions are not enforcement. Nothing here stops an agent from skipping a gate, and a weaker model will follow the workflow less reliably than a stronger one, so quality gains vary with the model you pair it with. Token cost is real: each activated skill occupies context, and the full lifecycle pack is not something to load into every conversation. The portability gap the README documents is the sharpest practical problem - a per-skill install omits the repository-level references directory, so shared checklists become unreachable and a skill degrades rather than fails loudly. Each agent also has a slightly different install shape, so maintaining an installation across a mixed fleet is a recurring chore. And because the content is a snapshot of one engineer's process, adopting it wholesale means adopting their opinions about change size, commit granularity and review standards.

## Integration Patterns

This sits in content/tools/dx-and-tooling as the process layer rather than a tool with a binary. It is the natural companion to the coding agents in the same phase, and to agenta in particular, whose permission tiers and background agents supply the runtime these skills assume exists. For the agent frameworks in content/projects/frameworks, contrast a written workflow against a programmatic orchestration graph; for anything you then need to serve, the serving layer lives in content/projects/inference-engines.

## Resources

- [GitHub — addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
- [Comparison against Superpowers and Matt Pocock's skills](https://github.com/addyosmani/agent-skills/blob/main/docs/comparison.md)
- [Adoption guide for greenfield and existing codebases](https://github.com/addyosmani/agent-skills/blob/main/docs/adoption-guide.md)

## Buzz & Reception

Turns an engineer's quality process into version-controlled markdown any coding agent loads on demand, so the workflow travels with the repository instead of living in one person's habits.
