---
id: "structured-output-and-tool-use"
title: "Structured Output & Tool Use"
entry_type: "guide"
section: "skills"
description: "The skill of getting reliable machine-readable output from LLMs: schemas, constrained decoding, and tool-call contracts"
tags:
  - structured-output
  - tool-use
  - guardrails
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Structured output is making a probabilistic text generator produce machine-parseable data — JSON, tool-call arguments, enum decisions — reliably enough for software to depend on. It is the boundary layer between the model and the rest of your system, and where most integration failures happen.

## Why It's in the Arsenal

Every LLM feature that isn't a chat window depends on parsing model output. Teams that treat this boundary casually inherit a steady stream of parse failures, silently wrong fields, and agent tools called with garbage arguments.

## Key Features

### Core Concepts

- Three reliability levels: prompted JSON (weakest), provider JSON/structured-output modes (schema-guided), constrained decoding (grammar-enforced — the output cannot violate the schema). Use the strongest your stack supports.
- Schema validity is not correctness: constrained decoding guarantees shape, not truth — validate semantics (ranges, cross-field consistency, referenced IDs exist) after parsing.
- Design schemas for the model: flat beats deeply nested, described enums beat free strings, required-with-null beats optional-and-guessing.
- Tool calls are structured output with side effects: validate arguments against the schema AND business rules before executing.
- Always define the failure path: on invalid output, retry with the validation error appended — and cap retries.

### Practical Workflow

1. Define the schema first (Pydantic/Zod/JSON Schema); generate types for both the prompt and the validator from it.
2. Use provider structured-output or a constrained-decoding library rather than parsing free text.
3. Log raw and parsed output separately; parse failures are your early-warning signal.
4. Eval schema compliance and semantic correctness as separate metrics.
5. Version schemas like APIs — model behavior changes when field names and descriptions do.

## Architecture / How It Works

Constrained decoding masks invalid tokens at each generation step so only schema-legal continuations are sampled. Provider "JSON modes" do a softer version server-side. Either way the pipeline is: schema → generation constraint → parse → semantic validation → typed object, with a bounded retry loop feeding validation errors back to the model.

## Getting Started

```text
Boundary-layer checklist:
[ ] single source of truth schema (Pydantic/Zod)
[ ] strongest available enforcement (structured output / grammar)
[ ] semantic validation after parse
[ ] bounded retry with error feedback (max 2)
[ ] raw + parsed output logged
[ ] fallback behavior defined for final failure
```

## Use Cases

1. **Scenario**: Extraction pipeline turning documents into database rows — every field validated before insert
2. **Scenario**: An agent whose tool arguments must be schema- and permission-checked before execution
3. **Scenario**: A router model that must return exactly one of five enum values, every time

## Strengths

- Converts the model boundary from hope to contract
- Constrained decoding eliminates whole failure classes mechanically
- Schema-first design doubles as documentation and eval criteria

## Limitations / When NOT to Use

- Over-constrained schemas can degrade content quality — the model spends capacity on format compliance; keep schemas as simple as the task allows
- Provider structured-output support varies in strictness and JSON-Schema feature coverage; test your actual schema per provider
- Not needed for human-facing prose — don't force JSON where text is the product

## Integration Patterns

- Use schema-native frameworks: [PydanticAI](../../projects/frameworks/pydantic-ai.md) builds the contract in; [DSPy](../../projects/frameworks/dspy.md) treats signatures as first-class.
- Apply [use JSON schema for outputs](../../tips-and-tricks/prompting/use-json-schema-for-outputs.md) and [use JSON only for machine-parsed outputs](../../tips-and-tricks/prompting/use-json-only-for-machine-parsed-outputs.md).
- For agents, pair with [validate tool arguments before execution](../../tips-and-tricks/agents-and-orchestration/validate-tool-arguments-before-execution.md).

## Resources

- [Structured-output tool shortlist](../../tools/by-job/structured-output.md)
- [Log raw and parsed model outputs](../../tips-and-tricks/debugging-and-observability/log-raw-and-parsed-model-outputs.md)
- [Agent Design](./agent-design.md)
- [Toolformer paper](../../research/agents-and-reasoning/schick-2023-toolformer.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
