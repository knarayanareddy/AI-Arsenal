---
id: "agent-skills-ecosystem"
title: "Agent Skills — Ecosystem"
entry_type: "guide"
section: "skills"
description: "Verified map of the agent-skills ecosystem: the official spec, first-party packs, and major community collections"
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

The agent-skills ecosystem is where reusable agent procedures are specified, published, and curated. This page maps the sources that matter, with repository evidence (stars and activity verified 2026-07-07), so you can pick trustworthy packs instead of installing whatever a listicle recommends.

## Why It's in the Arsenal

The ecosystem is large, fast-moving, and uneven: a handful of repos define the format and carry most of the quality, surrounded by a long tail of unreviewed packs. Since skills execute with your agent's permissions, source selection is a supply-chain decision, not a convenience one.

## Key Features

### The Spec and First-Party Sources

- **[anthropics/skills](https://github.com/anthropics/skills)** (~159k stars, active) — the canonical repository: the Agent Skills spec (`spec/agent-skills-spec.md`), a `skill-creator` meta-skill, a template, and 17 first-party skills (document tooling: `docx`/`pdf`/`pptx`/`xlsx`; `mcp-builder`, `webapp-testing`, `frontend-design`, and more). Start here for both the format and reference-quality examples.
- **[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)** (~29k stars, active) — Vercel's official pack; strong examples of vendor-maintained, framework-specific skills (Next.js/React conventions).

### Major Community Collections

- **[obra/superpowers](https://github.com/obra/superpowers)** (~248k stars, very active) — the largest skills framework: a full software-development methodology (planning, TDD, debugging, code review) expressed as composable skills. Opinionated; adopt the methodology, not just fragments.
- **[wshobson/agents](https://github.com/wshobson/agents)** (~38k stars, active) — multi-harness plugin marketplace targeting Claude Code, Codex CLI, Cursor, OpenCode, Copilot, and Gemini CLI; useful evidence that the format is converging cross-harness.
- **[alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)** (~21k stars, active) — 330+ skills spanning engineering, product, marketing, compliance, and operations across 12 harnesses; the broadest single collection, best treated as a menu to audit and cherry-pick from.

### Curated Lists

- **[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)** (~67k stars) and **[travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)** (~14k stars) — curated indexes; both updated within recent months. Use lists for discovery, then verify the underlying repo's activity yourself.

### Selection Criteria

1. Prefer spec-conformant skills (frontmatter + progressive disclosure per the Anthropic spec).
2. Check the *skill's* last update, not just the repo's — big collections carry stale entries.
3. Read every skill before installing: it is instructions your agent will execute with your permissions.
4. Prefer skills with embedded verification steps over pure prose procedures.

## Architecture / How It Works

The ecosystem has three layers: the **spec** (anthropics/skills defines the `SKILL.md` format and discovery model), **publishers** (first-party and community repos shipping skill directories), and **harnesses** (Claude Code, Codex, Cursor, Gemini CLI and others that index and load them). Marketplaces like wshobson/agents add cross-harness packaging on top.

## Getting Started

```text
Sane adoption path:
1. Read spec/agent-skills-spec.md in anthropics/skills
2. Install 1-2 first-party skills relevant to your stack; observe behavior
3. Author one skill for a recurring team procedure using skill-creator
4. Only then evaluate large community packs, skill by skill
```

## Use Cases

1. **Scenario**: Choosing a document-generation skill — anthropics/skills' `docx`/`xlsx` are the reference implementations
2. **Scenario**: Adopting a development methodology for agents — evaluate superpowers as a whole
3. **Scenario**: Standardizing skills across a team using multiple harnesses — the multi-harness marketplaces show what ports cleanly

## Strengths

- Clear quality anchor: the official spec repo doubles as the best example set
- Genuine cross-harness convergence reduces lock-in
- Curated lists plus verifiable GitHub signals make source vetting cheap

## Limitations / When NOT to Use

- Star counts measure popularity, not safety — audit skill contents regardless of source
- The ecosystem churns fast; verify activity before adopting (this page's figures date to 2026-07-07)
- Large collections optimize for breadth; production teams usually need five excellent skills, not 330 mediocre ones

## Integration Patterns

- Apply the authoring rules in [Agent Skills — Overview](./agent-skills-overview.md) when adapting community skills.
- Gate risky skill-driven actions with [require human approval for irreversible actions](../../tips-and-tricks/agents-and-orchestration/require-human-approval-for-irreversible-actions.md).
- Sandbox execution per [sandbox code execution tools](../../tips-and-tricks/agents-and-orchestration/sandbox-code-execution-tools.md).

## Resources

- [Agent Skills spec (anthropics/skills)](https://github.com/anthropics/skills)
- [Agent Skills — Overview](./agent-skills-overview.md)
- [Agent Design](../applied/agent-design.md)
- [Allowlist tools per agent role](../../tips-and-tricks/agents-and-orchestration/allowlist-tools-per-agent-role.md)

## Buzz & Reception

Star/activity figures verified via the GitHub API on 2026-07-07. Re-verify quarterly; this ecosystem moves fast enough that six-month-old guidance is stale.

---
*Last reviewed: 2026-07-07 by @maintainer*
