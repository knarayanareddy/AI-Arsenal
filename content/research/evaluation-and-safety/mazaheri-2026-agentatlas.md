---
id: mazaheri-2026-agentatlas
title: 'AgentAtlas: Beyond Outcome Leaderboards for LLM Agents'
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Parsa Mazaheri
  - Kasra Mazaheri
arxiv_id: '2605.20530'
arxiv_url: https://arxiv.org/abs/2605.20530
pdf_url: https://arxiv.org/pdf/2605.20530
code_url: null
venue_url: https://arxiv.org/abs/2605.20530
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Provides a diagnostic vocabulary for separating agent outcomes, control decisions, trajectory failures, and benchmark coverage instead of relying on one success score."
key_contribution: "Defines six control-decision states, a trajectory-failure vocabulary, and a 0/1/2 coverage audit over fifteen agent benchmarks; its 1,342-item demonstration is explicitly illustrative rather than a public leaderboard."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - evaluation
  - reasoning
  - benchmark
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

AgentAtlas argues that final task success compresses too many decisions into one number. An agent may succeed by asking for clarification, refuse a dangerous action, recover from a failed tool, or take a long brittle path; an outcome-only leaderboard loses those distinctions. The paper proposes a vocabulary and audit protocol for making them visible.

## Why it's in the Arsenal

The framework is useful when benchmark scores are being used to choose an agent architecture or release a tool-enabled system. It gives an evaluator a language for asking whether a benchmark covers control decisions and trajectory quality, not just whether the final answer matched a key.

## Core Contribution

AgentAtlas defines six control states—Act, Ask, Refuse, Stop, Confirm, and Recover—and a trajectory-failure vocabulary that records primary error source and downstream impact. It also audits fifteen existing agent benchmarks with a 0/1/2 coverage scale. The illustrative study uses a synthetic 1,342-item set to show how taxonomy-aware labeling changes the measurement process.

## Key Results

- Explicit label menus can materially change mapped-label agreement in the illustrative study (2026).
- The choice of evaluation axis can change apparent model rankings (2026).
- The 1,342-item demonstration is not a public benchmark release and should not be read as a definitive model comparison (2026).

## Methodology

The authors define the control taxonomy and trajectory-failure fields, score benchmark coverage, and compare taxonomy-aware with taxonomy-blind prompt formats on the synthetic demonstration. The protocol is primarily a measurement design and audit exercise; it does not claim a new agent policy or a universally validated judge.

## Practical Applicability

Use the six states when labeling agent traces and designing acceptance tests. Record whether a tool call should have been made, whether clarification or refusal was appropriate, whether the agent stopped too early, and whether recovery preserved the task contract. Add coverage columns to benchmark reports so an apparent score is tied to the behavior actually tested.

## Limitations & Critiques

The central experiment is synthetic and illustrative, not a released benchmark with broad independent use. Taxonomy labels can introduce their own judgment and may not transfer cleanly across tasks. Coverage scores are also an audit aid, not a measure of benchmark quality or of an agent’s real-world safety.

## Reproductions & Follow-up Work

Apply the taxonomy to real traces from coding, browser, and enterprise-tool tasks. Measure inter-rater agreement, judge stability without explicit labels, and whether control-state metrics predict incidents or user interventions better than end-to-end success.

## Relation to the Arsenal

AgentAtlas complements agent benchmarks, observability, and evaluation strategy entries. Its strongest contribution is diagnostic vocabulary for failure analysis, not a new leaderboard.

## Resources

- [Primary source](https://arxiv.org/abs/2605.20530)
- [HTML paper](https://arxiv.org/html/2605.20530v2)
