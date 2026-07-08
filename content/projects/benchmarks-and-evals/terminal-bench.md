---
id: terminal-bench
name: "Terminal-Bench"
version_tracked: null
artifact_type: framework
category: evaluation
subcategory: evaluation
description: "Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models"
github_url: "https://github.com/laude-institute/terminal-bench"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Stanford / Laude Institute"
tags: [evaluation, agents, llm]
maturity: beta
cost_model: open-source
github_stars: 2427
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-01-22"
docs_url: "https://www.tbench.ai/docs/run-terminal-bench-2-0"
demo_url: null
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [language, reasoning, general-purpose]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [research-origin, org-backed, actively-maintained]
ecosystem_role:
  - "The benchmark that measures what coding agents actually do all day: multi-step tasks executed in real Docker-sandboxed terminals with outcome-based verification, adopted by frontier labs as a headline agentic metric alongside SWE-bench."
best_for:
  - "You are evaluating or building terminal/coding agents — tasks span compiling, debugging, sysadmin, data processing and even model training, each verified by executable checks rather than LLM judges"
  - "You want a harness, not just a dataset — the tb CLI runs any agent (built-in adapters for Claude Code, Codex CLI, and custom agents) against containerized tasks reproducibly"
avoid_if:
  - "You need a mature, saturated benchmark with years of comparable scores — it is young and the task set is still evolving between versions"
  - "Your agents do not operate through a shell — browser-only or API-orchestration agents need different harnesses"
upstream_dependencies: []
downstream_consumers: []
alternatives: [swe-bench]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (2,427), primary language, license, and last commit (2026-01-22) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/laude-institute/terminal-bench", "date": "2026-07-08", "description": "2,427 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A benchmark and evaluation harness for AI agents operating in a terminal: each task gives the agent a real containerized shell environment, an English task description, and an executable verification script that checks the end state. Task difficulty ranges from routine (fix a build) to hard (recover corrupted data, train a small model), targeting the gap between coding-snippet benchmarks and real operational work.

## Why it's in the Arsenal

The benchmark that measures what coding agents actually do all day: multi-step tasks executed in real Docker-sandboxed terminals with outcome-based verification, adopted by frontier labs as a headline agentic metric alongside SWE-bench. It earns a place in the Arsenal because it directly addresses a recurring decision point: you are evaluating or building terminal/coding agents — tasks span compiling, debugging, sysadmin, data processing and even model training, each verified by executable checks rather than LLM judges. See Strengths / Limitations below before adopting it.

## Architecture

Tasks are self-contained Docker environments with a task.yaml (instruction, timeouts), setup scripts, and outcome-verification tests; the tb CLI orchestrates agent-environment sessions, records full terminal transcripts (asciinema), and computes pass rates. Agent adapters wrap commercial CLIs (Claude Code, Codex, Gemini CLI) and custom agents behind a common interface, so results are comparable across harnesses.

## Ecosystem Position

Upstream: Docker for sandboxing. Competing/complementary: SWE-bench (repo-level code fixes, narrower but deeper), HAL and AgentBench (broader agent task suites). Frontier labs (Anthropic, OpenAI, Google) cite Terminal-Bench scores in model releases, which makes it one of the few community benchmarks with direct lab adoption; leaderboard at tbench.ai.

## Getting Started

```bash
uv tool install terminal-bench
tb tasks list
tb run --agent claude-code --model claude-sonnet-4-5 --task-id hello-world
```

## Key Use Cases

1. **Scenario**: you are evaluating or building terminal/coding agents — tasks span compiling, debugging, sysadmin, data processing and even model training, each verified by executable checks rather than LLM judges
2. **Scenario**: you want a harness, not just a dataset — the tb CLI runs any agent (built-in adapters for Claude Code, Codex CLI, and custom agents) against containerized tasks reproducibly

## Strengths

- You are evaluating or building terminal/coding agents — tasks span compiling, debugging, sysadmin, data processing and even model training, each verified by executable checks rather than LLM judges
- You want a harness, not just a dataset — the tb CLI runs any agent (built-in adapters for Claude Code, Codex CLI, and custom agents) against containerized tasks reproducibly

## Limitations

- You need a mature, saturated benchmark with years of comparable scores — it is young and the task set is still evolving between versions
- Your agents do not operate through a shell — browser-only or API-orchestration agents need different harnesses

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://github.com/laude-institute/terminal-bench)
- [Documentation](https://www.tbench.ai/docs/run-terminal-bench-2-0)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (2,427 stars, last commit 2026-01-22, verified via GitHub API on 2026-07-08)*
