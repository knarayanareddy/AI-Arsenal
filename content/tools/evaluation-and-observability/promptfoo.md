---
id: promptfoo
name: promptfoo
type: tool
job: [evaluation]
description: An open-source CLI and platform for prompt and LLM regression testing
url: "https://www.promptfoo.dev"
cost_model: open-source
pricing_detail: Open-source with hosted options
tags: [evaluation, llm, monitoring]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: true
open_source: true
source_url: "https://github.com/promptfoo/promptfoo"
docs_url: null
github_url: "https://github.com/promptfoo/promptfoo"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [prototype, production]
best_when:
  - You want CLI-driven, CI-friendly regression testing for prompts and LLM outputs
  - You need to red-team prompts for jailbreaks/injection as part of your evaluation suite
avoid_when:
  - You need deep RAG-pipeline-specific metrics (faithfulness, retrieval precision) — pair with RAGAS or DeepEval
  - You want a fully managed, hosted-only experience with no local CLI workflow
version_tracked: null
verdict: recommended
verdict_rationale: Useful option for evaluation workflows when it matches your stack and cost constraints
status: active
---

## Overview

An open-source CLI and platform for regression-testing prompts and LLM outputs, with built-in support for red-teaming prompts against jailbreaks and injection.

## Why It's in the Arsenal

promptfoo earns a place in the Arsenal because it directly addresses a recurring decision point: you want CLI-driven, CI-friendly regression testing for prompts and LLM outputs. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- CLI-driven, CI-friendly prompt regression testing
- Built-in red-teaming test cases for jailbreaks/injection
- Side-by-side comparison across models/prompts

## Architecture / How It Works

Test cases (prompt + assertions) are defined in config files; the CLI runs them against one or more target models and reports pass/fail results suitable for CI gating.

## Getting Started

```bash
# Visit the official documentation for installation and setup.
# URL: https://www.promptfoo.dev
```

## Use Cases

1. **Scenario**: you want CLI-driven, CI-friendly regression testing for prompts and LLM outputs
2. **Scenario**: you need to red-team prompts for jailbreaks/injection as part of your evaluation suite
3. **Scenario where this is NOT the right fit**: you need deep RAG-pipeline-specific metrics (faithfulness, retrieval precision) — pair with RAGAS or DeepEval — evaluate an alternative instead

## Strengths

- You want CLI-driven, CI-friendly regression testing for prompts and LLM outputs
- You need to red-team prompts for jailbreaks/injection as part of your evaluation suite

## Limitations / When NOT to Use

- You need deep RAG-pipeline-specific metrics (faithfulness, retrieval precision) — pair with RAGAS or DeepEval
- You want a fully managed, hosted-only experience with no local CLI workflow

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `promptfoo` rather than duplicating details.

## Resources

- [Official Site](https://www.promptfoo.dev)

## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-06-30 by @maintainer*

