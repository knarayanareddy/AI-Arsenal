---
id: rtk
name: rtk
type: tool
job: [prototyping]
description: Rust CLI shim that rewrites shell command output into condensed form before a coding agent reads it
url: "https://www.rtk-ai.app"
cost_model: open-source
pricing_detail: "Free and self-hostable; no paid tier required"
tags: [efficiency, inference]
maturity: beta
stack: [rust]
free_tier: true
free_tier_limits: "Free while in beta; no hosted seat cap."
self_hostable: true
open_source: true
docs_url: "https://www.rtk-ai.app"
github_url: "https://github.com/rtk-ai/rtk"
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
verdict: recommended
verdict_rationale: "Attacks agent token cost at the busiest interface, the shell, with a dependency-free binary and sub-10ms overhead."
status: active
phase: dx-and-tooling
audience: [prototype]
best_when:
  - "You run a coding agent that calls ls, grep, git diff and test runners hundreds of times per session and that output dominates your input tokens."
  - "You want zero-dependency tooling on a work machine, since it is a single static Rust binary with no runtime to install."
  - "You need test and lint output reduced to just the failures, because passing test names and clean lint lines are pure token cost."
avoid_when:
  - "You need the full unfiltered output of a command for correctness reasons, since aggregation and truncation are the entire design and the discarded detail is not recoverable."
  - "You are working where the agent's commands are audited verbatim, because rewriting the stream changes what the audit log contains."
  - "You need to cut output tokens or prompt tokens, since rtk addresses one input contributor, bash output, and the README is explicit that this is not a 90% bill reduction."
---

## Overview

rtk is a command-line proxy, distributed as a single Rust binary with no runtime dependencies, that sits between a coding agent and the shell. When the agent runs a supported command, rtk intercepts the output and rewrites it into a more compact representation before the agent ever sees it. The command table is long and specific: ls and tree become a tree with per-directory file counts instead of one line per entry; cat and read return file signatures and structure rather than whole bodies; grep and rg truncate long lines and group matches by file; git status renders in a compact grouped stat form and git diff drops headers and surrounding context; git log is reduced to hash, author and subject; and test and lint runners, including cargo test, npm test, pytest, go test, ruff check and sqlfluff lint, report only failures with passing cases collapsed to a count. The README claims support for more than a hundred commands with under ten milliseconds of added overhead, and the project is available via Homebrew and GitHub releases.

## Why It's in the Arsenal

Coding agents interact with a codebase almost entirely through shell commands, and the raw output of those commands is formatted for human eyes rather than for a model. A passing test suite prints thousands of tokens describing success, a directory listing prints one line per file, and a git log prints a wall of decoration. None of that helps the model decide its next action, yet all of it is billed every turn and re-sent in every later turn of the trajectory. rtk removes the formatting tax at the one interface every agent already uses, with no configuration, no code change and no dependency to manage. The recurring decision it resolves is whether to hand-tune prompts to cope with noisy tool output, or make the output small enough that the coping disappears.

## Key Features

- A single static Rust binary with no runtime dependencies, so there is nothing to install, version-manage or conflict with.
- Under ten milliseconds of overhead per command, invisible next to model latency, so the saving is not paid for in responsiveness.
- Per-command parsers rather than generic truncation, so a diff still looks like a diff and a test report still names the failing test.
- Installs as a path shim, so adoption needs no change to the agent, the model, or the project's configuration files.

## Architecture / How It Works

The binary is a shim placed ahead of the real tools on the agent's path, so an agent invoking ls or git is transparently routed through rtk, which runs the underlying command, parses the output according to that command's known shape, and emits a condensed rendering. Parsers are per-command rather than generic: tree walkers build hierarchical counts for listing commands, match groups are aggregated per file for grep-style tools, diffs are stripped of headers and reduced to changed hunks, and test and lint runners parse structured output such as the NDJSON emitted by go test to separate failures from successes before printing only the failures. The design is intentionally stateless and local, with no model call anywhere in the path, which is what keeps the overhead at milliseconds rather than seconds. Because the transformation is lossy, the correct workflow is to use the compressed view for orientation and re-run the original command when the full detail actually matters.

## Getting Started

Install the binary with Homebrew or from a GitHub release, make sure it precedes the real commands on the agent's path, and let it intercept. There is no configuration step and no daemon to babysit.

```bash
brew install rtk
```

```bash
# or from a release artifact
chmod +x rtk && sudo mv rtk /usr/local/bin/
rtk --version
```

Once it is on the path, a coding agent invoking `git diff`, `ls` or `pytest` receives the condensed form automatically; running `rtk <command>` by hand is the quickest way to see what your agent will now see. Architecture notes live in docs/contributing/ARCHITECTURE.md and troubleshooting guidance on the project site.

## Use Cases

1. Cutting agent input tokens in long sessions where shell output is the dominant contributor to request size.
2. Failure-first triage: rely on the condensed test and lint output so a 3,000-line green test run becomes a single line while failures keep their detail.
3. Low-friction onboarding: drop a dependency-free binary onto a work machine and change nothing in the agent's configuration.

## Strengths

Its closest functional neighbour is Headroom, which compresses the same class of content at the context layer rather than at the shell: rtk is narrower, faster and dependency-free, while Headroom also handles RAG chunks, files and conversation history and offers an MCP server. It overlaps with harness features that summarise or truncate tool results, such as context compaction built into some coding agents, and differs in being model-agnostic and independent of the harness. It is an alternative to instructing a model to ignore verbose output, which is unreliable, and it complements rather than replaces the agent frameworks in content/projects/agent-systems, since those own the loop while rtk cleans one channel of it. The clear non-overlap is with the shell tooling itself: rtk does not make git faster or better, it makes what git prints cheaper for a model to read.

## Limitations / When NOT to Use

Compression is lossy by construction: aggregated counts, truncated lines and collapsed passing tests cannot be recovered from the condensed view, so any investigation needing the full raw output has to bypass the shim. Coverage is bounded to a curated list of more than a hundred commands, and an unsupported command passes through unchanged, so the benefit is uneven across a real workload. Rewriting the shell stream also changes what gets logged, printed and captured by screen-recording or audit tooling, which in a regulated or debugging context is a behavioural change rather than a transparent optimisation. The savings claim is explicitly about bash output as a fraction of input tokens, not about the bill, since prompts, history, output tokens and provider pricing all contribute independently, and a project with unusually small command output will see little. The project is young, created in January 2026, with an open-issue count in the thousands, so behaviour and command coverage will keep changing.

## Integration Patterns

This is a dx-and-tooling entry and the nearest thing in the catalogue to a zero-infrastructure intervention on agent cost; its sibling phase contains Headroom, which does the same job for a wider class of content at a different layer. It operates below the agent harnesses in content/projects/agent-systems and below the shell experience that content/tools/dx-and-tooling otherwise covers, which is why it needs no configuration and no code change. It is orthogonal to the serving entries in content/projects/inference-engines and to the model catalogue in content/projects/foundation-models, since it changes neither what runs nor how fast. Where content/tools/evaluation-and-observability measures what an agent did, rtk quietly reduces what it had to read in the first place.

## Resources

- [Repository and command coverage table](https://github.com/rtk-ai/rtk)
- [Project site and troubleshooting guide](https://www.rtk-ai.app)
- [Architecture notes](https://github.com/rtk-ai/rtk/blob/develop/docs/contributing/ARCHITECTURE.md)

## Buzz & Reception

Attacks agent token cost at the busiest interface, the shell, with a dependency-free binary and sub-10ms overhead.

