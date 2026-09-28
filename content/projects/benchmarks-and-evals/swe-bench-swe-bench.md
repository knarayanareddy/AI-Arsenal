---
id: swe-bench-swe-bench
name: "SWE-bench"
version_tracked: null
artifact_type: dataset
category: evaluation
subcategory: evaluation
description: "Real GitHub issues paired with hidden fail-to-pass and pass-to-pass test suites, and the harness that turns a patch into a resolution rate"
github_url: "https://github.com/SWE-bench/SWE-bench"
license: "MIT"
primary_language: Python
org_or_maintainer: "SWE-bench"
tags: [benchmark, code-gen, evaluation]
maturity: production
cost_model: open-source
github_stars: 5928
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-18"
docs_url: "https://www.swebench.com"
demo_url: null
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [language, reasoning]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "The benchmark that made coding-agent evaluation standard: real GitHub issues paired with hidden tests, and the reference for reporting resolution rates honestly."
best_for:
  - "You are selecting a coding agent or model and need a number that reflects real repository work rather than synthetic function completion."
  - "You are publishing a coding-agent result and need a specific, runnable harness version so a reader can reproduce the resolution rate."
  - "You are building a training or filtering pipeline for code models and want a verifiable outcome signal for reinforcement learning."
avoid_if:
  - "Your target domain is a language, framework, or repository type under-represented in the sampled projects, where the aggregate score will mislead you."
  - "You want to measure documentation, config, or design work, since the suite scores only whether unit tests pass after a patch."
  - "You need a cheap signal, because the harness builds repository-specific Docker images and the full run is expensive in wall-clock and compute."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (5928), MIT license, last commit 2026-09-18, primary language Python, and the three topics were read from the GitHub API. Task structure, the FAIL_TO_PASS and PASS_TO_PASS fields, the Docker-based harness, and the Lite, Verified, Multimodal, and Pro variants come from the official paper and README; no image was built and no instance was evaluated here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/SWE-bench/SWE-bench", "date": "2026-09-28", "description": "5,928 stars and last commit 2026-09-18 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

SWE-bench takes GitHub issues from popular Python repositories and pairs each one with the test changes that the real fix would have to satisfy. Each task instance records the base repository commit, the issue text, the gold patch, and a test patch whose tests are split into FAIL_TO_PASS, meaning they fail before the patch and pass after, and PASS_TO_PASS, meaning they pass both ways as a regression guard. Evaluation runs a model or agent to produce a patch, applies it inside a container built for that specific task, runs the designated tests, and counts the instance resolved only if every FAIL_TO_PASS test passes and no PASS_TO_PASS test regresses. The project ships several variants: the original Verified set, a Lite subset for fast iteration, Multimodal for issues requiring images, and Pro for harder, contamination-resistant instances.

## Why it's in the Arsenal

The decision it resolves is how to score software-engineering capability at all. Human-judged issue resolution is slow and inconsistent, and function-level benchmarks such as HumanEval measure single-file puzzles that do not resemble real maintenance work. By using each repository's own test suite as the grader, SWE-bench removes the subjectivity: the tests were written independently of the model, and the regression split catches patches that pass by breaking something. That gives the field a common currency, which is why agent papers report a verified resolution rate and a harness version, and why a drop in score across harness revisions is treated as meaningful rather than noise.

## Architecture

The dataset is distributed as JSON task instances and loaded through the datasets library, each instance carrying repo, base_commit, problem_statement, patch, test_patch, FAIL_TO_PASS, and PASS_TO_PASS fields. The evaluation harness builds a Docker image per repository and per dependency environment, applies the test patch, snapshots the repo at base_commit, then hands the problem statement to the model, which emits a git diff that the harness applies with git apply. The runner then executes the selected tests with pytest, parses per-test outcomes, and applies the two-part resolution rule. Repository-specific environment specification, the per-repo constants mapping test commands, and the image build are the main sources of operational complexity, since a build failure is scored as unresolved unless handled explicitly.

## Ecosystem Position

SWE-bench competes with HumanEval, MBPP, and the LiveCodeBench family as the standard code benchmark, and it differs in kind rather than degree: those score function completion from a docstring, while this scores multi-file repository changes validated by a pre-existing test suite. It overlaps with EvalPlus, which hardens HumanEval and MBPP with far more test inputs; EvalPlus attacks weak tests inside function benchmarks, whereas SWE-bench's grading is already grounded in real tests, so the two failure modes are largely disjoint. It is a complement to a coding agent such as the ones in the agent-systems phase, which is the system under test rather than the measurement. It also differs from terminal-bench, which evaluates agent capability in a shell environment including tooling and CLI competence rather than only in a Python repository.

## Getting Started

Install the harness and run a small slice against a served model:

```bash
pip install swebench
# build the evaluation images first; this is the slow part
export SWE_BENCH_CONTAINER_ENDPOINT=unix:///tmp/swebench.sock
```

```bash
python -m swebench.inference.make_datasets \
    --splits lite --output_dir ./preds --model_name_or_path gpt-4o
```

```bash
python -m swebench.harness.run_evaluation \
    --dataset_name princeton-nlp/SWE-bench_Lite \
    --predictions_path ./preds/gpt-4o.jsonl \
    --max_workers 8 --run_id gpt4o-lite
```

Results, including per-instance logs, are written under the run directory as report.json. Point the harness at a local vLLM or TGI endpoint to evaluate a self-hosted model.

## Key Use Cases

1. Model and agent selection, comparing a coding agent's verified resolution rate against a prior release before committing to a vendor.
2. Reinforcement learning on execution feedback, using pass-to-pass as a reward signal on verifiable outcomes rather than a learned judge.
3. Regression tracking of an agent platform, where a small subset such as the Lite split runs in CI and catches a harness or tool-calling regression in minutes.

## Strengths

- Grading uses the repository's own tests, which were written independently of any model, so scores are not judge-contaminated.
- The FAIL_TO_PASS and PASS_TO_PASS split makes regression detection part of the score rather than an afterthought.
- Multiple difficulty and cost tiers, from the Lite subset for CI to Verified for headline numbers and Pro for contamination resistance.
- A pinned, versioned Docker-based harness, so a reported number is reproducible in a way a free-form agent demo never is.

## Limitations

The suite is Python-only and weighted toward a fixed set of established repositories, so it understates performance on other languages, on data engineering, and on greenfield work, and it can be gamed by changes that satisfy tests without being good engineering. Data contamination is a genuine and persistent concern for widely released models, which is why the Pro tier exists. The cost of evaluation is high: per-task container builds dominate wall-clock time, and an agent gets a full shell, so a badly configured harness can leak or hang. Scores also move with the harness and scaffold, which makes cross-paper comparison fragile unless the exact setup is stated.

## Relation to the Arsenal

This entry is the anchor of the benchmarks-and-evals phase and is read together with EvalPlus, guidellm, and the evaluate library in the same phase, which cover code correctness hardening, serving latency, and metric computation respectively. Its system under test lives in the agent-systems phase, where coding agents are built. Because the harness runs real Python repositories, the training-and-alignment phase is where a model trained on this signal would originate.

## Resources

- [SWE-bench GitHub repository](https://github.com/SWE-bench/SWE-bench)
- [SWE-bench leaderboard and variant documentation](https://www.swebench.com)
- [SWE-bench dataset cards on Hugging Face](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (5,928 stars, last commit 2026-09-18, license MIT, verified via GitHub API on 2026-09-28)*
