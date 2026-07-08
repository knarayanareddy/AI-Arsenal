---
id: rd-agent
name: RD-Agent
version_tracked: null
artifact_type: framework
category: agents
subcategory: autonomous
description: Microsoft agent framework that automates R&D — proposing ideas, writing and running code, and iterating on data-science/quant modeling and factor mining
github_url: "https://github.com/microsoft/RD-Agent"
license: MIT
primary_language: Python
org_or_maintainer: "Microsoft Research"
tags: [agents, llm, evaluation]
maturity: beta
cost_model: open-source
github_stars: 13824
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-06-15"
docs_url: "https://rdagent.readthedocs.io/en/latest/"
demo_url: null
paper_url: "https://arxiv.org/abs/2505.14738"
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: agent-system
domain: [language]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, research-origin, actively-maintained]
ecosystem_role:
  - Research-and-development automation agent from Microsoft; a specialized alternative to general coding agents, targeting the propose->implement->evaluate loop of data-science and quantitative modeling rather than generic software tasks
best_for:
  - You want to automate an iterative R&D loop — hypothesis/idea proposal, code implementation, execution, and evaluation — in data-science, model, or quant-finance factor-mining settings
  - You want a research-backed reference for how an agent can improve its own solutions across iterations, not just perform one-shot code generation
avoid_if:
  - You need a general-purpose coding assistant for everyday software tasks — a code-focused agent (Aider, OpenHands, Cursor) fits general engineering better than an R&D-loop agent
  - You need a stable, turnkey product — RD-Agent is research-forward and expects data-science literacy and compute to run its loops
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (13,824), MIT license, and last commit (2026-06-15) verified via the GitHub API on 2026-07-08. Capability claims from the paper/docs; not hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/microsoft/RD-Agent", "date": "2026-07-08", "description": "13,824 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

RD-Agent is a Microsoft Research framework for automating research and development. It frames R&D as two collaborating roles — a Researcher that proposes ideas/hypotheses and a Developer that implements and runs them — iterating on the results. It targets data-science and quantitative-finance workflows such as model tuning and factor mining.

## Why it's in the Arsenal

It represents a distinct agent category: automating the propose→implement→evaluate research loop rather than generic coding. For teams doing data-science or quant modeling, that specialization is the point. It is a comparison/reference entry in the agent-system phase, not a general coding-agent recommendation.

## Architecture

RD-Agent separates idea generation from implementation: the Research component proposes changes/hypotheses; the Development component turns them into runnable code, executes experiments, and returns metrics; the loop then refines based on evaluation. Domain scenarios (e.g. quant factor mining, Kaggle-style modeling) provide the environment and scoring the agent optimizes against.

## Ecosystem Position

It contrasts with general coding agents (Aider, OpenHands) and with orchestration frameworks. Its niche is closed-loop, evaluation-driven R&D automation from a major research lab.

## Getting Started

```bash
pip install rdagent
# configure an LLM backend, then run a scenario (e.g. data-science or quant factor mining) via the CLI
```

## Key Use Cases

1. **Scenario**: automate iterative model tuning / factor mining in a quant or data-science pipeline
2. **Scenario**: study how an agent improves solutions across evaluation-driven iterations
3. **Scenario where this is NOT the right fit**: everyday general software tasks — a general coding agent is a better fit

## Strengths

- Specialized for iterative, evaluation-driven R&D
- Researcher/Developer separation with concrete scenarios
- Research-backed and org-maintained

## Limitations

- Research-forward; expects data-science literacy and compute
- Narrower than general coding agents by design
- Running loops can incur significant LLM/compute cost

## Relation to the Arsenal

- Compare against general coding agents (Aider, OpenHands) for non-R&D work.
- Reference this project by its canonical ID `rd-agent`.
- Budget LLM/compute cost per iteration before running long loops.

## Resources

- [GitHub Repository](https://github.com/microsoft/RD-Agent)
- [Documentation](https://rdagent.readthedocs.io/en/latest/)
- [Paper (arXiv)](https://arxiv.org/abs/2505.14738)
