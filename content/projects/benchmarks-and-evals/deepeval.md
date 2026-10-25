---
id: deepeval
name: DeepEval
version_tracked: null
artifact_type: library
category: observability
subcategory: evaluation
description: A pytest-shaped evaluation framework for LLM apps, with RAG, agent-trajectory and multimodal metrics in one Apache-2.0 Python library
github_url: "https://github.com/confident-ai/deepeval"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [evaluation, llm, observability, monitoring]
maturity: production
cost_model: open-source
github_stars: 19090
trending_score: 70
last_commit: "2026-10-23"
docs_url: "https://deepeval.com"
demo_url: null
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - General-purpose open-source LLM evaluation framework designed to run in CI like a unit-test suite
best_for:
  - You want LLM evaluation to feel like writing unit tests — DeepEval is explicitly designed to integrate with pytest and CI pipelines for automated regression testing
  - You need broad evaluation metric coverage (not just RAG-specific) spanning hallucination detection, answer relevance, bias, and more, in one framework
  - You are evaluating an agent rather than a single response and need trajectory-level metrics such as task completion, tool correctness and step efficiency
avoid_if:
  - You need the deepest RAG-specific metric library specifically — Ragas has a narrower but more RAG-focused metric set that some teams prefer for that specific use case
  - You want a fully managed platform with a UI rather than a code-first, CI-integrated testing library — Braintrust or LangSmith's UI-driven evaluation workflows may fit better for less CI-centric teams
  - Your test data cannot leave your infrastructure in any form, because `deepeval login` uploads every test case to Confident AI by default and that has to be turned off deliberately
upstream_dependencies: []
downstream_consumers: []
alternatives: [ragas, promptfoo, giskard]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Re-verified against the GitHub API on 2026-10-25: 19,090 stars, 779 open issues, Apache-2.0, last push 2026-10-23. Body re-read against the README (metric families, pytest runner, `deepeval login` upload behaviour, integrations list); the earlier 2026-06-13 last_commit was the batch-import placeholder."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

DeepEval is an Apache-2.0 Python library that treats LLM output quality as a test suite: you construct `LLMTestCase` objects, attach metrics to them, and assert inside pytest, so a quality regression fails a build the same way a broken unit test does. The metric surface is wider than most single frameworks attempt — RAG faithfulness and contextual precision, agent-trajectory metrics (task completion, tool correctness, step efficiency, plan adherence), multi-turn conversation metrics, voice-agent metrics, MCP server usage, multimodal image metrics, and the older hallucination/bias/toxicity/JSON-schema checks — and every metric returns the judge's written reasoning alongside the score, not just a number.

## Why it's in the Arsenal

The rest of this phase is made up of libraries that score something (Ragas for RAG), harnesses that drive a black-box endpoint from YAML (promptfoo), scanners that look for failure modes across a dataset (Giskard), and hosted platforms that record production traffic (LangSmith, Helicone). DeepEval is the entry that puts a broad metric set behind pytest's own runner, which is the shape a team that already blocks merges on tests can adopt without inventing a new workflow or paying for a dashboard.

It is also catalogued at the agent layer rather than only at RAG, which most of its competitors were not doing until 2026: the trajectory metrics ask whether the agent finished the task and called the right tools with the right arguments, which is a different question from whether one response was faithful to its context.

## Architecture

A metric is a Python class exposing `measure()`/`a_measure()` and setting `score`, `reason`, `threshold` and `is_successful`. Three construction styles coexist: G-Eval builds an LLM judge from a natural-language criterion, DAG compiles the judgment into a deterministic decision graph so the same input yields the same verdict, and the non-generative metrics (BLEU/ROUGE-style comparison, JSON-schema conformance, some classification checks) run locally with no model call at all. `assert_test(test_case, [metrics])` raises when any metric falls below its threshold, and `deepeval test run` wraps pytest to produce a report alongside ordinary test output.

Datasets are `EvaluationDataset` objects holding goldens, iterated in bulk through `dataset.evals_iterator(metrics=[...])`; the library can also synthesise single- and multi-turn inputs to start from. Trajectory metrics need more than an input and an output, so DeepEval ships tracing entry points — a `trace()` context manager and framework callbacks for LangChain, LangGraph, CrewAI, Pydantic AI, OpenAI Agents, Google ADK and Mastra — that record each LLM call, tool call and sub-agent handoff for the metric to score afterwards.

## Ecosystem Position

Against Ragas the overlap is real and the difference is in the runner: Ragas is a RAG-metric library that grew an experiment harness, DeepEval is a test runner that grew metrics. promptfoo treats the application as an HTTP endpoint and sweeps prompt and model variations, which is the better fit when the thing under test is a deployed configuration rather than a Python object. Giskard scans a model or dataset for categories of failure and reports them; DeepEval asserts on individual cases you have already written. LangSmith and Helicone answer what happened in production, and DeepEval's hosted sibling Confident AI sits on top of the same library for that job.

The practical consequence is that these are not interchangeable — a team usually ends up with DeepEval or promptfoo as the CI gate, and one of the platforms for production, with Ragas appearing only if the metric definitions themselves are the deliverable.

## Getting Started

```bash
pip install -U deepeval        # Python 3.9+
```

```python
from deepeval import assert_test
from deepeval.metrics import FaithfulnessMetric, TaskCompletionMetric
from deepeval.test_case import LLMTestCase

def test_rag_answer():
    case = LLMTestCase(
        input="What is the refund window?",
        actual_output=my_app("What is the refund window?"),
        retrieval_context=[doc.page_content for doc in retrieved],
    )
    assert_test(case, [FaithfulnessMetric(threshold=0.7)])

# Run as usual: deepeval test run test_rag.py, or plain pytest.
```

`deepeval login` is optional but is the first thing the README recommends; it uploads test cases to Confident AI for cloud reports, so decide that question before running it against real customer data.

## Key Use Cases

1. **Gating a RAG pipeline in CI**: faithfulness and contextual precision catch the specific regression that RAG systems suffer most — retrieval returning plausible text that the answer then contradicts — and they fail the build instead of showing up as a bad answer three weeks later.
2. **Scoring an agent on the trajectory, not the final string**: task completion plus tool correctness distinguishes an agent that got the right answer by luck from one that followed a correct path, which is the failure mode a final-answer assertion cannot see.
3. **Comparing two models or prompts on your own cases**: the same test file run against two configurations produces comparable per-metric scores with reasons attached, which is the cheapest defensible way to decide a model swap.
4. **Generating a starting suite**: the synthetic dataset generation gives a team with no eval set something to run in an afternoon, to be replaced case by case with real failures as they appear.

## Strengths

- One API covers metric families that otherwise require three tools: RAG, agent trajectory, multi-turn conversation, MCP and multimodal all use the same test-case and assertion shape.
- Failures come with the judge's reasoning, so a score of 0.4 is diagnosable rather than merely disappointing; that reason string is usually what tells you whether the metric or the application is wrong.
- pytest compatibility means no new CI system: the gate is a test file in the existing job, with the usual reporting, sharding and retry mechanics around it.
- Deterministic metric construction (DAG) exists for cases where an LLM judge's variance would make a threshold meaningless, and the local non-generative metrics cost nothing per run.
- Actively developed by the vendor: 2026 alone added agent, MCP and voice metric families, and the repository was pushed to the day before this review.

## Limitations

- The LLM-judge metrics cost tokens on every case and inherit the judge model's variance; a threshold tuned against one judge silently changes meaning when the judge is upgraded, so the judge version belongs in the test configuration and a re-baseline belongs in the upgrade checklist.
- Thresholds are set per metric by the caller, and the defaults are unlikely to be right for your application — the honest work is calibrating each one against cases you have already labelled, which is often more effort than writing the tests.
- `deepeval login` logs all test cases to Confident AI by default per the README. That is convenient and is a data-handling decision, so teams with regulated content need to run the library without logging rather than accept the default.
- 779 open issues at review time, and the metric surface moves fast enough that names and signatures shift between minor versions; pin the version in the same lockfile as the application.
- Python-only for the metric definitions. TypeScript bindings exist for tracing integrations, but the suite itself is a Python package, so a Node service has to be exercised over HTTP or from a Python test harness it does not otherwise use.

## Relation to the Arsenal

Read it beside `ragas` (narrower metric set, RAG-focused), `promptfoo` (endpoint-level sweeps and prompt comparison), `giskard` (failure-mode scanning) and `langsmith-platform` or `helicone` (production observation rather than pre-merge gating). The choosing question is where in the lifecycle the failure is caught, and a team with an existing pytest suite gets the most from this entry because the gate lands where their block already is.

## Resources

- [GitHub](https://github.com/confident-ai/deepeval)
- [Documentation](https://deepeval.com/docs/getting-started)
- [Metric reference](https://deepeval.com/docs/metrics-introduction)
