---
id: chen-2026-uniclawbench
title: 'UniClawBench: A Universal Benchmark for Proactive Agents on Real-World Tasks'
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Zhekai Chen
  - Chengqi Duan
  - Kaiyue Sun
  - Bohao Li
  - Yuqing Wang
  - Manyuan Zhang
  - Xihui Liu
arxiv_id: '2607.08768'
arxiv_url: https://arxiv.org/abs/2607.08768
pdf_url: https://arxiv.org/pdf/2607.08768
code_url: https://github.com/HKU-MMLab/UniClawBench
venue_url: https://uniclawbench.github.io/
practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0
tldr: "Evaluates proactive agents on 400 bilingual real-world tasks in live Docker environments using capability-specific checkpoints and hidden closed-loop supervision."
key_contribution: "Separates skill usage, exploration, long-context reasoning, multimodal understanding, and cross-platform coordination instead of mixing them into one scenario label."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - evaluation
  - benchmark
  - multimodal
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

UniClawBench targets proactive agents that operate everyday tools rather than answer isolated prompts. Its central criticism of earlier evaluations is practical: sandboxed tools, clean inputs, and single-turn scoring can hide the exploration, coordination, and recovery work required in a real environment.

## Why it's in the Arsenal

The benchmark is useful for teams deciding whether an agent scaffold works outside a polished demo. It separates capability dimensions that are often conflated in an end-to-end success number, and it runs tasks in live containers with step-level checkpoints instead of comparing only a final text answer.

## Core Contribution

UniClawBench defines five capability axes: skill usage, exploration, long-context reasoning, multimodal understanding, and cross-platform coordination. It instantiates them in 400 bilingual real-world tasks. A closed-loop evaluator uses an executor agent, a hidden supervisor, and a user agent to simulate multi-turn feedback without exposing the grading criteria.

## Key Results

- The 2026 paper compares multiple models and agent frameworks rather than treating the framework as a fixed part of the model (2026).
- The live-container and checkpoint protocol is designed to reveal where a failure occurred: tool discovery, planning, execution, or coordination (2026).
- The paper releases code and benchmark resources, but the reported rankings remain tied to its task environments and framework configurations (2026).

## Methodology

Tasks run in Docker environments and are scored through fine-grained completion checkpoints. The executor performs the work, the hidden supervisor evaluates progress, and the user agent supplies feedback in the loop. Cross-framework comparisons are intended to separate base-model capability from scaffold design, although the two remain coupled through prompts and tool interfaces.

## Practical Applicability

Use the benchmark’s decomposition when building an agent evaluation suite: include tool discovery, noisy or incomplete instructions, multimodal inputs, and recovery checkpoints. Preserve the container image, tool inventory, prompts, supervisor policy, and raw action trace so a failure can be reproduced rather than reduced to a score.

## Limitations & Critiques

Real-world tasks still reflect the authors’ chosen tools, languages, and Docker boundaries. A hidden supervisor is more realistic than a visible answer key but is itself an evaluator whose behavior requires calibration. Bilingual coverage does not establish broad language or cultural coverage, and cross-framework results can be affected by unequal integration effort.

## Reproductions & Follow-up Work

Run the official artifact with pinned images and models, then replace a subset of tasks with the organization’s real tools and policies. Report capability-level failures, checkpoint completion, recovery cost, and evaluator disagreement instead of only an overall completion rate.

## Relation to the Arsenal

UniClawBench belongs beside agent harnesses and planning benchmarks as a deployment-realism evaluation. It complements execution benchmarks by making exploration, coordination, and tool discovery visible.

## Resources

- [Primary source](https://arxiv.org/abs/2607.08768)
- [Project website](https://uniclawbench.github.io/)
- [Code/data artifact](https://github.com/HKU-MMLab/UniClawBench)
