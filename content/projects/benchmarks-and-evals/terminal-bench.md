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

Terminal-Bench is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

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

1. **Running Terminal-Bench on your own workload**: the published score conditions on someone else's tasks, harness and prompt, so reproduce it on a slice of your data before treating it as a decision input.
2. **What the Terminal-Bench scenarios have in common**: each describes a measurement that would change a decision rather than a number that is merely interesting.
3. **Choosing between candidates**: compare Terminal-Bench against `swe-bench` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- What Terminal-Bench gives you that reading the feature list does not: tasks are self-contained Docker environments with a task.yaml (instruction, timeouts), setup scripts, and outcome-verification tests; the tb CLI orchestrates agent-environment sessions, records full terminal transcripts (asciinema), and computes pass rates. Agent adapters wrap commercial CLIs (Claude Code, Codex, Gemini CLI) and custom agents behind a common interface, so results are comparable across harnesses, which is the part you have to evaluate against your own workload.
- It is a benchmark-and-eval entry in this catalog, so the comparison that matters is against the other benchmark-and-eval projects rather than against projects in adjacent phases.
- Recorded as beta, so the capability is real while the interface is still moving; pin the version you depend on rather than tracking head.

## Limitations

- The cost this entry cannot quantify for you is operational: the Terminal-Bench footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running Terminal-Bench against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Terminal-Bench is beta, so the interface and even the scope can change between minor versions; any code written against it should be isolated behind your own boundary rather than imported directly across your codebase.

## Relation to the Arsenal

This is the benchmark-and-eval entry for Terminal-Bench in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/laude-institute/terminal-bench)
- [Documentation](https://www.tbench.ai/docs/run-terminal-bench-2-0)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 2427 as of 2026-07-08; last commit 2026-01-22; both verified via the GitHub API.*
