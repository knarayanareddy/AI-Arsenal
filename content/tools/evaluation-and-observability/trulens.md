---
id: trulens
name: TruLens
type: tool
job: [evaluation, tracing]
description: An evaluation and tracking toolkit for LLM and RAG applications
url: "https://www.trulens.org"
cost_model: open-source
pricing_detail: Open-source with ecosystem integrations
tags: [evaluation, rag, tracing]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/truera/trulens"
docs_url: null
github_url: "https://github.com/truera/trulens"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [research, production]
best_when:
  - You need feedback-function-based evaluation and tracking specifically for LLM and RAG applications
  - You want an open-source toolkit to instrument an app and score outputs against custom feedback functions
avoid_when:
  - You need a fully managed SaaS dashboard with minimal setup (consider LangSmith or Braintrust)
  - Your evaluation needs are simple enough that a lighter library like Promptfoo or OpenAI Evals would suffice
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for evaluation, tracing workflows when it matches your stack and cost constraints
status: active
---

## Overview

An open-source toolkit for instrumenting and evaluating LLM and RAG applications using customizable 'feedback functions' that score outputs against criteria you define.

## Why It's in the Arsenal

TruLens earns a place in the Arsenal because it directly addresses a recurring decision point: you need feedback-function-based evaluation and tracking specifically for LLM and RAG applications. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Feedback-function-based scoring of LLM/RAG outputs
- Instrumentation for tracing application internals
- Open-source, self-hostable

## Architecture / How It Works

An application is instrumented with TruLens wrappers; each run's inputs/outputs are captured and scored by configured feedback functions, with results stored for comparison across versions.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://www.trulens.org
```

## Use Cases

1. **Scenario**: you need feedback-function-based evaluation and tracking specifically for LLM and RAG applications
2. **Scenario**: you want an open-source toolkit to instrument an app and score outputs against custom feedback functions
3. **Scenario where this is NOT the right fit**: you need a fully managed SaaS dashboard with minimal setup (consider LangSmith or Braintrust) — evaluate an alternative instead

## Strengths

- You need feedback-function-based evaluation and tracking specifically for LLM and RAG applications
- You want an open-source toolkit to instrument an app and score outputs against custom feedback functions

## Limitations / When NOT to Use

- You need a fully managed SaaS dashboard with minimal setup (consider LangSmith or Braintrust)
- Your evaluation needs are simple enough that a lighter library like Promptfoo or OpenAI Evals would suffice

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `trulens` rather than duplicating details.

## Resources

- [Official Site](https://www.trulens.org)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

