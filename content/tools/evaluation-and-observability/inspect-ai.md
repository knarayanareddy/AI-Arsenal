---
id: inspect-ai
name: Inspect (UK AI Safety Institute)
type: tool
job: [evaluation]
description: The UK AI Safety Institute's evaluation framework — a Python-first way to build agentic, tool-using, and graded evals with a built-in log viewer
url: "https://inspect.aisi.org.uk"
cost_model: open-source
pricing_detail: Open source (MIT)
tags: [evaluation, llm, agents]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; model/API costs are your own
self_hostable: true
open_source: true
source_url: "https://github.com/UKGovernmentBEIS/inspect_ai"
docs_url: "https://inspect.aisi.org.uk"
github_url: "https://github.com/UKGovernmentBEIS/inspect_ai"
alternatives: [lm-evaluation-harness, openai-evals]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [research, production]
best_when:
  - You're writing custom evals for agentic or tool-using behaviour — Inspect models an eval as solvers (prompt/tool/multi-step flows) plus scorers (including model-graded), which fits agent and safety evaluations that fixed benchmark harnesses can't express
  - You need to inspect what happened — the bundled log viewer replays every sample's messages, tool calls, and scores, which is decisive when debugging why an eval scored the way it did
avoid_when:
  - You just want standard academic benchmark numbers with minimal setup — lm-evaluation-harness ships those tasks ready-made; Inspect is a framework you write evals in
  - Your team wants a no-code/hosted eval product — Inspect is a code-first library, not a SaaS dashboard
version_tracked: null
verdict: recommended
verdict_rationale: The strongest open framework for authoring bespoke agentic and safety evals, from a serious institutional author (UK AISI); choose it when you're building evals, not just running benchmarks
status: active
---

## Overview

Inspect is an LLM evaluation framework from the UK AI Safety Institute: you compose an eval from a dataset, a solver (the strategy that produces answers — a prompt, a tool-use loop, a multi-turn agent, a self-critique chain), and a scorer (exact match, pattern, or model-graded), then run it across providers with a rich interactive log viewer for post-hoc inspection. It's built for the evaluations governments and labs use to assess model capabilities and risks.

## Why It's in the Arsenal

Evaluation is bifurcating: standardized benchmarks (lm-eval's turf) versus bespoke evals of agentic and safety-relevant behaviour, which need real code. Inspect is the best open answer for the second class, and its institutional provenance and log-viewer transparency make it credible where results carry weight. It complements, rather than competes with, the benchmark harness.

## Key Features

- Solver/scorer abstraction expressing multi-step, tool-using, and self-critique evals — not just single-shot Q&A
- Built-in tool support and sandboxing for agent evals; model-graded scoring with reference judges
- Interactive log viewer replaying messages, tool calls, and per-sample scores
- Provider-agnostic (OpenAI, Anthropic, Google, HF, vLLM, and more) via one model interface

## Architecture / How It Works

`@task` composes dataset + solver + scorer. Solvers are chainable steps operating on a `TaskState` (messages, tool calls, model outputs); tools are Python functions the solver may invoke in a loop; scorers reduce completed states to metrics, optionally by calling a grader model. Every run writes a structured `.eval` log the viewer renders — the mechanism behind its debuggability.

## Getting Started

```bash
pip install inspect-ai
inspect eval my_eval.py --model openai/gpt-4o
inspect view   # open the interactive log viewer
```

## Use Cases

1. **Scenario**: measuring whether an agent completes a multi-step tool task safely — model the tools and success criteria as a solver+scorer
2. **Scenario**: capability/safety evals whose results need audit-grade transparency into every model interaction
3. **Scenario where this is NOT the right fit**: you just need MMLU/GSM8K numbers — reach for lm-evaluation-harness's ready tasks instead

## Strengths

- Expresses agentic/tool-using evals natively, where benchmark harnesses assume single-shot tasks
- Log viewer makes eval results inspectable and defensible — a real differentiator for safety work

## Limitations / When NOT to Use

- It's a framework: you author evals in Python, which is more effort than running a prebuilt benchmark suite
- Younger and smaller ecosystem than the established harnesses; fewer off-the-shelf tasks

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `inspect-ai` rather than duplicating details.

## Resources

- [GitHub](https://github.com/UKGovernmentBEIS/inspect_ai)
- [Docs](https://inspect.aisi.org.uk)

## Buzz & Reception

2.3k GitHub stars (verified via API 2026-07-08); MIT; actively developed by the UK AI Safety Institute. Increasingly adopted for agentic and safety evaluations where authorship credibility matters.

---
*Last reviewed: 2026-07-08 by @maintainer*
