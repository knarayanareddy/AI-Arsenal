---
id: jimenez-2023-swe-bench
title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
phase: evaluation-and-safety
venue: iclr
year: 2023
authors:
  - "Jimenez, C. E."
  - "Yang, J."
  - "Wettig, A."
  - "Yao, S."
  - "et al. (Princeton / UChicago)"
arxiv_id: "2310.06770"
arxiv_url: "https://arxiv.org/abs/2310.06770"
pdf_url: "https://arxiv.org/pdf/2310.06770"
code_url: "https://github.com/SWE-bench/SWE-bench"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1500

tldr: "SWE-bench: 2,294 real GitHub issues from 12 Python repos, graded by running the repos' own tests against model-generated patches — the benchmark that replaced toy coding problems and became the scoreboard of the coding-agent era"
key_contribution: "Built the first execution-graded benchmark of real-world software engineering — resolve an actual issue in a full repository, judged by the project's real test suite — exposing how far models were from practical SWE (sub-2% at release) and defining the metric coding agents now compete on"

builds_on: []

tags:
  - "evaluation"
  - "code-gen"
  - "agents"
  - "benchmark"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

HumanEval-style benchmarks test writing a function from a docstring; real software engineering means reading an issue, navigating a large codebase, and producing a patch that passes the project's tests without breaking others. SWE-bench operationalized exactly that: 2,294 issue-plus-pull-request pairs mined from 12 popular Python repositories, where a candidate patch is graded by executing the repo's own test suite (tests the fix should make pass, plus regression tests it must not break). At release, the best assisted model resolved under 2% — a gap that made the benchmark the coding-agent era's definitive target.

## Why it's in the Arsenal

- SWE-bench (and its SWE-bench Verified subset) is *the* number cited in every coding-agent release — evaluating claims about Devin-class agents, Claude, or GPT coding ability requires knowing what this benchmark actually measures and where it leaks
- Its construction method — mine real artifacts, grade by execution — is the template for the current generation of realistic agent benchmarks, replacing static string-matching evaluation

## Core Contribution

The task formulation and the grading harness: given a repository snapshot and an issue description, generate a patch; success requires the PR's "fail-to-pass" tests to pass and previously passing tests to stay green, executed in a containerized environment per instance. The collection pipeline (filter merged PRs that resolve issues and add tests) makes the benchmark cheaply extensible to new repos and time periods — an explicit anti-saturation, anti-contamination design.

## Key Results

- Best performing configuration at release (Claude 2 with BM25-retrieved context): 1.96% resolved — establishing how far frontier models were from real SWE (2023)
- Fine-tuned SWE-Llama models validated open evaluation but resolved <1%, showing the gap wasn't retrieval alone (2023)
- The benchmark's difficulty curve held: progress from ~2% to today's frontier scores tracked the emergence of agentic scaffolds (SWE-agent and successors) rather than raw model scaling only (2024)

## Methodology

Scrape merged PRs across 12 repos that (a) resolve at least one issue and (b) modify tests; the modified tests define machine-checkable success. Evaluation supplies the issue text and codebase (with retrieval or oracle-file settings) and executes patches in per-instance Docker environments. Later official refinements — notably SWE-bench Verified, a human-validated 500-instance subset removing ambiguous or under-specified tasks — addressed early grading noise.

## Practical Applicability

For anyone building or buying coding agents, this is the reference evaluation: scores are comparable across systems because grading is executable, and the Verified subset is the honest headline metric. The harness is also directly reusable for private evaluation — teams adapt the mining pipeline to their own repos to build in-house SWE benchmarks, the most faithful way to test an agent against your actual codebase.

## Limitations & Critiques

Known leaks and biases: solutions to these public GitHub issues exist in training corpora (contamination is mitigated by date-cutoff splits but not eliminated); independent audits found instances where weak or misleading tests allowed incorrect patches to count (motivating Verified); and the benchmark is Python-only, single-repo, and issue-shaped — it doesn't measure feature building, refactoring, or cross-repo work. Scaffold and model contributions are also entangled in reported scores.

## Reproductions & Follow-up Work

Fully open (code, data, containers) and continuously re-run across the industry — the de facto shared leaderboard of coding agents. Official descendants extend it: SWE-bench Verified (human-validated), Multimodal, and multilingual variants, plus community derivatives (SWE-bench Live for contamination-free freshness). `yang-2024-swe-agent` (agents-and-reasoning/) was built by the same group as the first serious agentic attack on it.

## Relation to the Arsenal

The benchmark counterpart to `yang-2024-swe-agent` (agents-and-reasoning/) and the evaluation standard implicitly referenced by every coding-agent project entry (`strix`, coding assistants in tools/dx-and-tooling/). Alongside `chiang-2024-chatbot-arena` (evaluation-and-safety/), it defines the modern pattern: grade by execution or human preference, not string match.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2310.06770)
- [arXiv](https://arxiv.org/abs/2310.06770)
- [Code + harness (SWE-bench/SWE-bench)](https://github.com/SWE-bench/SWE-bench)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
