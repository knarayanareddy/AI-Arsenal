---
id: re-gent
name: re_gent
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Go CLI that version-controls agent activity in .regent/, so any line can be blamed to the prompt that wrote it"
github_url: "https://github.com/regent-vcs/re_gent"
license: Apache-2.0
primary_language: Go
tags: [observability, data]
maturity: beta
cost_model: open-source
github_stars: 795
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-07-02"
docs_url: "https://github.com/regent-vcs/re_gent#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Records every tool-using agent turn as a content-addressed Step, giving agents the log, blame and diff primitives git gives humans."
best_for:
  - "An agent made a change you cannot explain and you need to know which prompt produced it, because rgt blame maps a file line back to a step, session and prompt text."
  - "You run more than one agent concurrently and you need to separate their histories, because sessions are tracked per agent with filterable logs."
  - "You want to inspect one step in full, including the tool arguments, the diff and the surrounding conversation."
avoid_if:
  - "You only use one agent in one repo and never need attribution, because git plus your agent's own session log may already be enough."
  - "You need the recorded history to be a commit you can push, because this is a separate store under .regent/ with its own object format rather than a git remote."
  - "You need broad language coverage for the tracked tools, because the integration surface named in the README is Claude Code, Codex and OpenCode."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language (Go), topics and issue count came from the GitHub API. Directory layout (.regent/objects, refs, index.db, config.toml), Step struct fields, command set and host integrations are read from the official README; no repository was tracked during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

re_gent stores agent activity under a .regent/ directory that deliberately mirrors git's layout: content-addressed BLAKE3 blobs in objects/, session pointers in refs/ (one per agent), a SQLite query index at index.db, and config.toml. Every tool-using turn becomes a Step: a content-addressed snapshot with a parent pointer, the tree it produced, and the tool name, arguments and result recorded as causes, so the provenance graph is first-class rather than reconstructed. Three primitives do the work: rgt log for a session timeline, rgt blame FILE:LINE for the step, session, tool and prompt behind a specific line, and rgt show STEP for the full diff plus the user and assistant messages around it. Installation is Homebrew or go install, initialised with rgt init, and tracking is automatic once the agent works.

## Why it's in the Arsenal

The problem it names is that agents write code without leaving a trail you can interrogate. When something regresses, the questions are always the same: what did it do, which prompt caused this line, and what did it see when it did it. Git answers none of these for machine-authored changes, so re_gent builds a parallel VCS whose unit is the agent step rather than the human commit. The tradeoff is that you now maintain two histories of the same tree, and the boundary between them is a convention rather than a git invariant.

## Architecture

Each Step is a BLAKE3-addressed object holding a parent reference, the resulting tree hash, and a causes list of tool name, arguments and result. Refs map each agent session to its current head, so several agents working the same repo do not overwrite each other, and index.db provides the queryable history that makes log and blame fast without walking every object. Working-tree changes are captured automatically as the agent runs, which is why the README stresses no manual commits are needed. Reading is done through three commands backed by the same object graph: log for the timeline, blame resolving a line to its originating step, and show expanding one step into diff and conversation.

## Ecosystem Position

re_gent competes with git history plus an agent session log, and with the session replay features built into Claude Code and Codex, on the same problem: attributing a change to a cause. Where those give you a transcript, re_gent gives you a content-addressed DAG with parent links, so you can walk backwards through a session the way you walk commits. It is complementary to the coding agents in content/projects/agent-systems rather than a rival: it observes Claude Code, Codex and OpenCode without replacing them, and it is the kind of auditing layer the observability and evaluation phases would otherwise require you to build. Compared with a dedicated tracing stack, it is narrower and much easier to adopt.

## Getting Started

Install via Homebrew or go install, initialise in the repository, and work as you normally would:

```bash
brew tap regent-vcs/tap && brew install regent
cd your-project
rgt init
# work with Claude Code, Codex or OpenCode normally; activity is tracked automatically
rgt log
rgt blame src/file.go:42
```

Useful extras: rgt sessions lists concurrent agent sessions and rgt log --session filters history to one of them.

## Key Use Cases

1. Debugging a bad refactor: a regression appears, and rgt log plus rgt blame plus rgt show reconstruct which step changed the handler and what prompt asked for it.
2. Concurrent agent sessions: two agents work the same repository and you need to know which session introduced a line before you revert it.
3. Prompt-to-line attribution: someone asks why a specific function exists, and the answer is a step hash and the prompt text that produced it.

## Strengths

- Line-level attribution back to the originating prompt, which no agent transcript gives you directly.
- Content-addressed Step DAG with parent links, so a session can be walked backwards like a commit history.
- Per-agent refs and a SQLite index keep concurrent sessions separate and queries fast.
- Fully automatic capture with no manual commits, which is the only design that survives real agent usage.

## Limitations

This is a young project with under 800 stars, 29 open issues and last activity around July 2026, so expect rough edges. It maintains a second object store alongside git: .regent/ duplicates history, can drift from the working tree, and needs its own lifecycle (what you do when you rebase, reset or switch branches is not addressed in the README). Integration is named only for Claude Code, Codex and OpenCode, so other agents are unsupported. Attribution tells you which prompt wrote a line, not whether the prompt was right; you still need tests or review to judge the change. Storage growth is unbounded because every step is retained.

## Relation to the Arsenal

This is the provenance and audit entry in content/projects/agent-systems, and it is the piece most of the coding agents in the same phase lack. Where those record a transcript you can scroll, re_gent records a content-addressed DAG you can query, which is what makes it usable for post-incident work rather than just replay. It sits next to ECC, whose AgentShield scans agent configuration for security; together those two cover configuration risk and change provenance. For general tracing and metrics, the observability tooling in other phases is broader but shallower on agent-specific attribution.

## Resources

- [GitHub — regent-vcs/re_gent](https://github.com/regent-vcs/re_gent)
- [Bad-refactor walkthrough example](https://github.com/regent-vcs/re_gent/tree/main/examples/bad-refactor)
- [Homebrew tap](https://github.com/regent-vcs/homebrew-tap)
