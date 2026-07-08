---
id: pyrit
name: "PyRIT"
type: tool
job: [security-and-guardrails, evaluation]
description: "Microsoft's Python Risk Identification Toolkit for red-teaming generative AI systems, born from its AI Red Team"
url: "https://azure.github.io/PyRIT/"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [security, evaluation, agents]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/microsoft/PyRIT"
docs_url: "https://azure.github.io/PyRIT/"
github_url: "https://github.com/microsoft/PyRIT"
alternatives: [garak, promptfoo]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production, research]
best_when:
  - "You're red-teaming a full application (not just a model): multi-turn attack orchestration, converters, and custom objectives"
  - "You want the framework Microsoft's own AI Red Team battle-tested on 100+ products, including automated attacker LLMs"
avoid_when:
  - "You want a one-command scan with built-in reporting — garak is turnkey where PyRIT is a framework you program"
  - "Non-Python security teams; the orchestration model assumes engineering investment"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (4,074), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most capable open framework for programmatic, multi-turn AI red teaming; complements rather than replaces scanners"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/microsoft/PyRIT", "date": "2026-07-08", "description": "4,074 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A red-teaming framework from Microsoft's AI Red Team: composable orchestrators run single- and multi-turn attack strategies (including LLM-driven adversarial agents like crescendo and PAIR-style loops) against any target, with prompt converters (encodings, translations, obfuscations) and scorers to identify harms systematically.

## Why It's in the Arsenal

PyRIT earns a place in the Arsenal because it directly addresses a recurring decision point: you're red-teaming a full application (not just a model): multi-turn attack orchestration, converters, and custom objectives. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Attack orchestrators: multi-turn, adversarial-LLM, skeleton-key strategies
- Converters mutate payloads (base64, leetspeak, translation) to bypass filters
- Pluggable targets (APIs, Azure, local) and scorers; memory of all attempts

## Architecture / How It Works

An attack combines a target (the system under test), converters that transform seed prompts, an optional adversarial LLM that adapts across turns toward an objective, and scorers that judge success; all interactions persist to memory for analysis — making red-team campaigns reproducible experiments.

## Getting Started

```bash
pip install pyrit-ai
# compose PromptSendingAttack(objective_target=..., converters=[...]) and run
```

## Use Cases

1. **Scenario**: you're red-teaming a full application (not just a model): multi-turn attack orchestration, converters, and custom objectives
2. **Scenario**: you want the framework Microsoft's own AI Red Team battle-tested on 100+ products, including automated attacker LLMs
3. **Scenario where this is NOT the right fit**: you want a one-command scan with built-in reporting — garak is turnkey where PyRIT is a framework you program — evaluate an alternative instead

## Strengths

- You're red-teaming a full application (not just a model): multi-turn attack orchestration, converters, and custom objectives
- You want the framework Microsoft's own AI Red Team battle-tested on 100+ products, including automated attacker LLMs

## Limitations / When NOT to Use

- You want a one-command scan with built-in reporting — garak is turnkey where PyRIT is a framework you program
- Non-Python security teams; the orchestration model assumes engineering investment

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `garak`, `promptfoo` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `pyrit`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://azure.github.io/PyRIT/)
- [Documentation](https://azure.github.io/PyRIT/)
- [GitHub](https://github.com/microsoft/PyRIT)

## Buzz & Reception

- 4,074 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
