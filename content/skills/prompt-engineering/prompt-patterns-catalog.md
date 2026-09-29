---
id: "prompt-patterns-catalog"
title: "Prompt Patterns Catalog"
entry_type: "guide"
section: "skills"
description: "Catalog of practical prompt patterns for structured LLM application behavior"
tags:
  - llm
  - structured-output
  - reasoning
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

Named patterns indexed by the failure they address, so a pattern can be looked up from an observed symptom rather than from a category. Entries are treated as unverified until run on your own data, which is the honest posture for a catalogue of this kind.

## Why It's in the Arsenal

A pattern is useful when you can get from a symptom to a candidate technique, which means the index has to be keyed on the failure rather than the technique name. Maintaining that index across model generations is the ongoing work, and keeping superseded patterns annotated rather than deleted is what preserves the history.

## Key Features

- Indexed by the failure a pattern addresses, so lookup starts from a symptom.
- Kept separate from the fundamentals guide so reference and method do not compete.
- Entries are unverified until run locally, which is the honest posture for a pattern list.

## Architecture / How It Works

Prompt patterns are reusable interface designs. The same pattern can work across models, but each model may require different examples, delimiters, and output constraints.

## Getting Started

```bash
# Pick one pattern, add examples, then run evals.
# Do not combine many patterns before measuring the baseline.
```

## Use Cases

1. **Scenario**: you need a named pattern for a specific failure you have observed, rather than general advice.
2. **Scenario**: you are documenting your team's prompt conventions and want a shared reference to point at.
3. **Scenario**: you are reviewing a prompt and want to check whether a known pattern would address the failure you are seeing.

## Strengths

- Names patterns by the failure they address, so you can look one up from an observed symptom.
- Keeps the catalogue separate from the fundamentals guide, so reference and method do not compete.
- Treats entries as unverified until run locally, which is the honest posture for a pattern list.

## Limitations / When NOT to Use

- A catalogue is a lookup table, not a method: recognising a pattern does not tell you whether it suits your task or your model.
- Patterns are stated in terms of intent, and two patterns often address the same observed failure from different angles.
- New patterns appear faster than old ones are retired, so treat any single entry as unverified until you have run it on your own data.

## Integration Patterns

- Link a pattern from a framework entry's documented prompt technique, so the catalogue index stays complete.
- When a pattern stops working across model versions, annotate it rather than deleting the entry and losing the history.

## Resources

- [Prompt engineering fundamentals](fundamentals.md)
- [Instructor](../../tools/dx-and-tooling/instructor.md)
- [Outlines](../../tools/model-layer/outlines.md)
- [Guidance](../../tools/model-layer/guidance.md)
- [Pydantic AI](../../tools/orchestration/pydantic-ai-tool.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

