---
id: "agent-skills-overview"
title: "Agent Skills — Overview"
entry_type: "guide"
section: "skills"
description: "What agent skills are: reusable instruction packs for coding agents, how they work, and how to author them"
tags:
  - agents
  - tool-use
  - code-gen
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Agent skills are reusable instruction packs — Markdown procedures, optionally with scripts and reference files — that a coding agent (Claude Code, Codex, Cursor, Gemini CLI, and others) loads on demand to perform a task the way your team wants it done. They are distinct from the human learning guides elsewhere in this vertical: a skill here is something an *agent* executes, not something a person studies.

## Why It's in the Arsenal

Skills are becoming the packaging format for agent expertise: instead of re-prompting an agent every session, teams codify procedures once and reuse them everywhere. Knowing how to consume and author them is now part of the AI engineering toolkit.

## Key Features

### Core Concepts

- A skill is a directory with a `SKILL.md` (frontmatter: name + description; body: the procedure), optionally bundled with scripts, templates, and reference docs.
- Progressive disclosure: the agent sees only skill names/descriptions up front and loads the full body when the task matches — skills spend context only when used.
- Skills differ from MCP: MCP servers give agents *tools* (capabilities/API access); skills give agents *procedures* (how to use capabilities well). They compose.
- Portability is converging: the same skill format increasingly works across Claude Code, Codex, Cursor, and other harnesses, typically discovered from `.claude/skills/` or `.agents/skills/` in a repo.
- Skills are code: version them in git, review changes, and treat third-party skills as supply-chain inputs — they are instructions your agent will follow.

### Authoring Ground Rules

1. One skill = one job, with an unambiguous trigger description (the agent decides to load it from the description alone).
2. Write procedures as strict checklists with verification steps, not essays.
3. Reference concrete files/commands in the repo; a skill that says "run the tests" is weaker than one that names the command.
4. Keep the body short and push detail into referenced files the agent reads only when needed.
5. Test by running the agent on the task cold; if it deviates, the skill — not the agent — needs fixing.

## Architecture / How It Works

At session start the harness indexes available skills (name + description only). When a task matches, the agent reads the full `SKILL.md` into context and follows it, loading bundled resources lazily. This keeps dozens of skills installable with near-zero context overhead until invoked.

## Getting Started

```text
Minimal skill layout:
.claude/skills/deploy-checklist/
  SKILL.md          # frontmatter: name, description; body: the procedure
  scripts/verify.sh # optional supporting assets
  reference.md      # optional deep-dive the agent reads on demand
```

## Use Cases

1. **Scenario**: Codifying your team's release checklist so any agent session performs it identically
2. **Scenario**: Installing community skill packs to give a coding agent domain workflows out of the box
3. **Scenario**: Replacing an oversized system prompt with on-demand procedures that don't burn context

## Strengths

- Reusable, reviewable, versionable agent expertise
- Near-zero context cost until invoked (progressive disclosure)
- Increasingly portable across agent harnesses

## Limitations / When NOT to Use

- Skills are instructions, not guarantees — agents can still deviate; keep verification steps in the skill itself
- Third-party skills execute with your agent's permissions: audit before installing
- A skill cannot fix missing capability — if the agent lacks the tool or access, write an MCP server or fix permissions instead

## Integration Patterns

- Pair skills (procedures) with MCP servers (capabilities) — see the [tool-use tips](../../tips-and-tricks/agents-and-orchestration/allowlist-tools-per-agent-role.md) for permissioning discipline.
- Apply [Agent Design](../applied/agent-design.md) principles when a skill orchestrates multi-step actions: budgets, approval gates, verification.
- Discover community packs via the [agent skills ecosystem](./agent-skills-ecosystem.md) page.

## Resources

- [Agent Skills Ecosystem](./agent-skills-ecosystem.md)
- [Agent Design](../applied/agent-design.md)
- [Prompt Engineering Fundamentals](../prompt-engineering/fundamentals.md)
- [Sandbox code execution tools](../../tips-and-tricks/agents-and-orchestration/sandbox-code-execution-tools.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
