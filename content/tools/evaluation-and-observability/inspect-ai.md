---
id: inspect-ai
name: "Inspect"
type: tool
job: [evaluation]
description: "UK AI Safety Institute's framework for LLM evaluations: solvers, scorers, and sandboxed agentic tasks as code"
url: "https://inspect.aisi.org.uk"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [evaluation, agents, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/UKGovernmentBEIS/inspect_ai"
docs_url: "https://inspect.aisi.org.uk"
github_url: "https://github.com/UKGovernmentBEIS/inspect_ai"
alternatives: [lm-evaluation-harness, deepeval, promptfoo]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [research, production]
best_when:
  - "You're building serious custom evals — especially agentic ones with tool use and sandboxed execution — and want a principled task/solver/scorer architecture"
  - "You need evals that frontier labs and governments also run (Inspect underpins AISI's official evaluations)"
avoid_when:
  - "You just want standard benchmark numbers (MMLU etc.) fast — lm-evaluation-harness has them prepackaged"
  - "Simple prompt A/B checks in CI; promptfoo is lighter"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (2,315), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The best-architected open eval framework, with unique credibility from AISI's frontier-model evaluations"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/UKGovernmentBEIS/inspect_ai", "date": "2026-07-08", "description": "2,315 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source evaluation framework from the UK AI Security Institute: evals are Python tasks combining datasets, solvers (prompting strategies, multi-turn agents with tool use), and scorers, with built-in sandboxing (Docker) for code-execution evals, a log viewer, and support for every major model API — the framework behind AISI's own frontier evaluations.

## Why It's in the Arsenal

Inspect earns a place in the Arsenal because it directly addresses a recurring decision point: you're building serious custom evals — especially agentic ones with tool use and sandboxed execution — and want a principled task/solver/scorer architecture. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Task/solver/scorer architecture; agent evals with tools and sandboxes
- VS Code extension and log viewer for eval debugging
- Parallel execution across providers; extensive built-in benchmark ports

## Architecture / How It Works

A task defines dataset + solver chain + scorer; solvers can be full agent loops with tool calls executing inside sandboxed environments; scorers range from exact-match to model-graded. Logs capture every interaction for the viewer, and inspect eval parallelizes across models/epochs.

## Getting Started

```bash
pip install inspect-ai
inspect eval inspect_evals/gpqa --model openai/gpt-4o
```

## Use Cases

1. **Scenario**: you're building serious custom evals — especially agentic ones with tool use and sandboxed execution — and want a principled task/solver/scorer architecture
2. **Scenario**: you need evals that frontier labs and governments also run (Inspect underpins AISI's official evaluations)
3. **Scenario where this is NOT the right fit**: you just want standard benchmark numbers (MMLU etc.) fast — lm-evaluation-harness has them prepackaged — evaluate an alternative instead

## Strengths

- You're building serious custom evals — especially agentic ones with tool use and sandboxed execution — and want a principled task/solver/scorer architecture
- You need evals that frontier labs and governments also run (Inspect underpins AISI's official evaluations)

## Limitations / When NOT to Use

- You just want standard benchmark numbers (MMLU etc.) fast — lm-evaluation-harness has them prepackaged
- Simple prompt A/B checks in CI; promptfoo is lighter

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `lm-evaluation-harness`, `deepeval`, `promptfoo` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `inspect-ai`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://inspect.aisi.org.uk)
- [Documentation](https://inspect.aisi.org.uk)
- [GitHub](https://github.com/UKGovernmentBEIS/inspect_ai)

## Buzz & Reception

- 2,315 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
