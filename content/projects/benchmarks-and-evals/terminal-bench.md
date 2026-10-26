---
id: terminal-bench
name: "Terminal-Bench"
version_tracked: null
artifact_type: framework
category: evaluation
subcategory: evaluation
description: "Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models"
github_url: "https://github.com/harbor-framework/terminal-bench-1"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "harbor-framework"
tags: [evaluation, agents, llm]
maturity: beta
cost_model: open-source
github_stars: 2610
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-11"
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
enrichment_notes: "Star count (2,606), primary language, license, and last commit (2026-07-11) verified via the GitHub API on 2026-10-24. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-10-24"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/harbor-framework/terminal-bench-1", "date": "2026-07-08", "description": "2,427 stars on GitHub as of 2026-07-08 (GitHub API)"}]
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

1. **Comparing two agents you already run**: the same task revision through two adapters removes the scaffolding difference, which is the only way a "model A is better at ops work" claim becomes checkable.
2. **Regression-testing an agent after a model swap**: a pass-rate delta on a fixed task revision is a concrete signal, unlike a subjective read of a handful of transcripts.
3. **Building a task for a failure you hit in production**: the task format (instruction, setup, verification tests, timeouts) is the cheapest way to make a real failure repeatable.
4. **Choosing a harness rather than a model**: because adapters normalise the interface, differences between agents show up as task outcomes instead of protocol differences.
5. **Interrogating a published agent score**: a number is reproducible only when the task revision and harness are named, so requesting those two details is the fastest way to separate a measurement from a marketing figure.
6. **Teaching what agents actually do**: the tasks span compiling, debugging, sysadmin and data processing, which is a better description of the job than a chat transcript.
## Strengths

- Outcome-based verification: tasks carry executable tests, so a pass means the system state is correct rather than that an LLM judge liked the answer.
- Real environments — each task is a self-contained Docker container with setup and a time budget, which is where agent failures actually happen.
- The harness records full terminal transcripts, so a failed run can be read rather than guessed at.
- Agent adapters normalise commercial CLIs and custom agents behind one interface, which makes cross-agent comparison legitimate.
- ~100 tasks in beta is already enough to separate good agents from bad, and the task format is contribution-friendly.
- Apache-2.0 with a community task pipeline, and the maintainers shipped a successor framework (`harbor`) rather than letting the harness rot.
## Limitations

- **The harness moved.** This repository is the 1.x line (`terminal-bench-1`, last push July 2026); Terminal-Bench 2.0 runs on `harbor`, a separate framework that has most of the recent activity. A new deployment should start there, and this entry documents the lineage rather than the current default.
- **Beta scale limits discrimination.** Around a hundred tasks means a handful of flaky tasks moves the pass rate by several points; treat small deltas as noise and check per-task variance.
- **Docker is a hard requirement.** Air-gapped or locked-down environments need images mirrored and a registry of their own before the benchmark can run at all.
- **Shell-only by design.** Browser agents, API orchestrators and GUI automation have no place to stand here, so the benchmark says nothing about them.
- **Task quality varies.** Community-contributed tasks differ in ambiguity and difficulty; a task whose instruction is underspecified penalises a careful agent.
- **Cost per run is real.** Long-horizon tasks each need minutes of container time plus model calls, so a full sweep across several agents is a budget line, not a quick check.
- **Two versions in circulation.** Scores published against 1.x and 2.0 are not comparable, and a comparison that does not name the version should be discarded.

## Relation to the Arsenal

The terminal-side complement to `swe-bench` (repository patches) and the harness most often reported alongside it when frontier labs characterise a coding agent. For the agents it measures, see `openhands`, `openai-agents-sdk` and the coding-agent entries in [Frameworks](../frameworks/_index.md).

For what to do with a failing task, the loop is `terminal-bench` to reproduce, then the agent's own tracing (`openlit`, `langfuse`) to find the step that broke.
## Relation to the Arsenal

This is the benchmark-and-eval entry for Terminal-Bench in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/harbor-framework/terminal-bench-1)
- [Documentation](https://www.tbench.ai/docs/run-terminal-bench-2-0)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 2427 as of 2026-07-08; last commit 2026-01-22; both verified via the GitHub API.*
