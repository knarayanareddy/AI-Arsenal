---
id: lm-format-enforcer
name: "LM Format Enforcer"
type: tool
job: [structured-output]
description: "Token-filtering library that guarantees LLM output conforms to JSON Schema or regex, integrated into vLLM"
url: "https://github.com/noamgat/lm-format-enforcer"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [structured-output, inference, llm]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/noamgat/lm-format-enforcer"
docs_url: "https://github.com/noamgat/lm-format-enforcer#readme"
github_url: "https://github.com/noamgat/lm-format-enforcer"
alternatives: [outlines, guidance, instructor]
integrates_with: [vllm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production]
best_when:
  - "You serve open models via vLLM/TGI and need hard structural guarantees with minimal quality distortion — it lets the model control whitespace/field order within the schema"
  - "Regex- or schema-constrained generation where retry-based approaches (Instructor) are too slow or unreliable"
avoid_when:
  - "You're calling hosted APIs (OpenAI/Anthropic) — constrained decoding needs logit access; use their native structured outputs or Instructor"
  - "You need a full grammar/programming model for generation; Outlines and Guidance offer richer languages"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (2,024), license, and last push (2026-04-04) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: solid-choice
verdict_rationale: "A pragmatic, engine-integrated constrained-decoding option; Outlines has more mindshare but LMFE's flexibility approach reduces schema-forcing artifacts"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/noamgat/lm-format-enforcer", "date": "2026-07-08", "description": "2,024 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A constrained-decoding library: given a JSON Schema or regex, it computes which tokens are permissible at each step and masks the rest, guaranteeing parseable output from any open model — while deliberately leaving the model freedom over ordering and formatting to minimize quality degradation, and shipping as a built-in backend in vLLM.

## Why It's in the Arsenal

LM Format Enforcer earns a place in the Arsenal because it directly addresses a recurring decision point: you serve open models via vLLM/TGI and need hard structural guarantees with minimal quality distortion — it lets the model control whitespace/field order within the schema. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- JSON Schema and regex constraints via token-level filtering
- Ships as a supported guided-decoding backend in vLLM/TGI
- Flexibility-preserving: model keeps control of order/whitespace

## Architecture / How It Works

Builds a character-level automaton from the schema/regex, maps it onto the tokenizer's vocabulary to produce per-step allowed-token sets, and applies them as logit masks during sampling — so invalid continuations are never sampled rather than repaired afterwards.

## Getting Started

```bash
pip install lm-format-enforcer
# vllm serve model --guided-decoding-backend lm-format-enforcer
```

## Use Cases

1. **Scenario**: you serve open models via vLLM/TGI and need hard structural guarantees with minimal quality distortion — it lets the model control whitespace/field order within the schema
2. **Scenario**: regex- or schema-constrained generation where retry-based approaches (Instructor) are too slow or unreliable
3. **Scenario where this is NOT the right fit**: you're calling hosted APIs (OpenAI/Anthropic) — constrained decoding needs logit access; use their native structured outputs or Instructor — evaluate an alternative instead

## Strengths

- You serve open models via vLLM/TGI and need hard structural guarantees with minimal quality distortion — it lets the model control whitespace/field order within the schema
- Regex- or schema-constrained generation where retry-based approaches (Instructor) are too slow or unreliable

## Limitations / When NOT to Use

- You're calling hosted APIs (OpenAI/Anthropic) — constrained decoding needs logit access; use their native structured outputs or Instructor
- You need a full grammar/programming model for generation; Outlines and Guidance offer richer languages

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `outlines`, `guidance`, `instructor` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `lm-format-enforcer`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://github.com/noamgat/lm-format-enforcer)
- [Documentation](https://github.com/noamgat/lm-format-enforcer#readme)
- [GitHub](https://github.com/noamgat/lm-format-enforcer)

## Buzz & Reception

- 2,024 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
