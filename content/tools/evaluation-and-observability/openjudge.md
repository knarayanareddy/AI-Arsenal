---
id: openjudge
name: OpenJudge
type: tool
job:
- evaluation
description: AgentScope framework for reusable LLM graders, benchmark-backed evaluation,
  and judge-model training
url: https://agentscope-ai.github.io/OpenJudge/
cost_model: open-source
pricing_detail: Apache-2.0 software; hosted OpenJudge and model/provider usage may
  incur separate costs
tags:
- evaluation
- agents
- llm
- benchmark
- research
maturity: beta
stack:
- python
free_tier: true
free_tier_limits: Local package is open source; an online grader service is also available
self_hostable: true
open_source: true
source_url: https://github.com/agentscope-ai/OpenJudge
docs_url: https://agentscope-ai.github.io/OpenJudge/
github_url: https://github.com/agentscope-ai/OpenJudge
alternatives:
- evalscope
- promptfoo
integrates_with:
- agentscope
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- prototype
- research
- production
best_when:
- You need reusable rubric-based graders and datasets for evaluating agent, RAG, reference,
  or paper-review outputs
- You want grader validation and leaderboard-style comparison rather than a single
  uncalibrated LLM-as-judge prompt
avoid_when:
- You need a deterministic metric for a high-stakes decision and cannot provide human
  labels or calibrate the judge
- Your evaluation is a simple unit test where a full grader registry, benchmark dataset,
  and judge-model workflow adds more machinery than value
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: solid-choice
verdict_rationale: A broad grader and benchmark framework with explicit validation
  and a judge-model training path
status: active
---

## Overview

OpenJudge is an AgentScope evaluation framework for building, validating, and running reusable LLM graders. It includes benchmark-backed graders, a web application, dataset integrations, agent and reference-answer evaluation, and a path to training dedicated judge models when prompt-based judging is not enough.

## Why It's in the Arsenal

OpenJudge earns a slot because evaluation quality depends as much on the grader as on the system being tested. Its insistence that graders ship with benchmark data and pytest validation, plus applications such as agent evaluation and academic-reference checking, makes it a more concrete foundation for judge workflows than an isolated scoring prompt.

## Key Features

The project provides built-in graders, custom rubric construction, benchmark datasets, leaderboard views, pytest-based grader validation, AgentScope integration, and a training pipeline for dedicated judge models. The README also highlights PawBench, a model-by-harness agent benchmark, and online execution through openjudge.me.

## Architecture / How It Works

An OpenJudge grader combines an input schema, rubric or scoring logic, model configuration, and validation examples. Evaluation runs feed system outputs and reference information into that grader, producing structured quality judgments that can be compared across models or harnesses. Local Python execution and the hosted application are two deployment surfaces over the same grader-oriented model.

## Getting Started

Install the Python package and follow the quickstart example:

```bash
pip install py-openjudge
```

Then import a model such as `OpenAIChatModel`, select a built-in grader or define a rubric, and run it on a small labeled set. The online app at `https://openjudge.me/app/` is useful for exploring graders, but production decisions should run from pinned local code and datasets.

## Use Cases

Use OpenJudge to score agent trajectories against a task rubric, evaluate hallucinated references in generated papers, or compare RAG answers when a reference answer is incomplete but quality dimensions can be stated explicitly. Its benchmark and grader-training paths are useful when a team has enough reviewed examples to calibrate a judge beyond one prompt.

## Strengths

OpenJudge treats grader artifacts and their test data as first-class objects, which makes judge behavior easier to inspect and regress. The breadth from prompt-based graders to trained judge models also lets a team start with a rubric and move toward a specialized evaluator only when the data and scale justify it.

## Limitations / When NOT to Use

An LLM judge can reproduce model biases, reward fluent but incorrect answers, or disagree with domain experts; benchmark-backed validation reduces but does not eliminate that risk. The online service is convenient but introduces a hosted-data boundary, and judge-model training requires substantial labeled data and compute that a small evaluation may not have.

## Integration Patterns

Version grader prompts, judge models, benchmark rows, and expected score distributions together. Use OpenJudge for offline release gates, then sample production traces into a human-reviewed dataset before changing the rubric; pair it with tracing so a surprising score can be linked back to the exact tool calls and retrieved evidence.

## Buzz & Reception

734 GitHub stars verified during the 2026-07-19 discovery sweep; AgentScope project with public graders, benchmarks, and an online application.

## Resources

- [Documentation](https://agentscope-ai.github.io/OpenJudge/)
- [GitHub](https://github.com/agentscope-ai/OpenJudge)
- [Online app](https://openjudge.me/app/)
- [PawBench](https://github.com/agentscope-ai/PawBench)
