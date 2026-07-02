---
id: "validate-tool-arguments-before-execution"
title: "Validate Tool Arguments Before Execution, Not Inside the Tool"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - structured-output
difficulty: "beginner"
impact: "high"
time_to_implement: "1 hour"
phase: agents-and-orchestration
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (LangGraph/tool-calling pipelines)"
applies_to:
  - agent-tool-use
  - function-calling
  - multi-tool-agents
gotchas:
  - "Validating types alone isn't enough -- an argument can be well-typed but semantically wrong (a negative quantity, a date in the past for a future-only field)"
  - "Silently coercing invalid arguments (stringifying a number, truncating an overlong string) hides model errors instead of surfacing them for the agent to retry"
  - "If validation errors aren't fed back into the agent's context, it repeats the same invalid call indefinitely -- always return the validator's rejection reason to the model"
metrics: []
related_tips:
  - cap-agent-tool-retries
  - sandbox-code-execution-tools
added_date: "2026-06-13"
last_reviewed: "2026-07-02"
added_by: maintainer
enrichment_status: reviewed
---

## What & Why

Validate a model-generated tool call's arguments against an explicit schema (types, ranges, enums, required fields) before the tool function ever runs, and reject invalid calls with a structured error the agent can read and correct. This catches malformed or hallucinated arguments — a string where a tool expects an integer, an out-of-range enum value — before they reach code that assumes well-formed input.

## Before / After

**Before:**
```python
def execute_tool(call):
    return TOOLS[call.name](**call.args)  # crashes on bad args
```

**After:**
```python
def execute_tool(call):
    schema = TOOL_SCHEMAS[call.name]
    try:
        validated = schema.model_validate(call.args)
    except ValidationError as e:
        return ToolResult(error=str(e), retry=True)
    return TOOLS[call.name](**validated.model_dump())
```

## Implementation

Define a Pydantic model per tool matching its expected argument schema, validate before calling the underlying function, and on failure return the validation error text back into the agent's context as a tool result (not a raised exception that crashes the loop) so the model can see what was wrong and retry.

## Gotchas

- Validating types alone isn't enough — an argument can be well-typed but semantically wrong (a negative quantity, a date in the past for a future-only field); add field-level validators for domain constraints in addition to type checks
- Silently coercing invalid arguments (stringifying a number, truncating an overlong string) hides model errors instead of surfacing them for the agent to retry
- If validation errors aren't fed back into the agent's context, it repeats the same invalid call indefinitely — always return the validator's rejection reason to the model, and pair with `cap-agent-tool-retries` to bound retry loops

## When NOT to Apply

- Skip building custom validation if your tool-calling framework already enforces JSON-schema-based argument validation before invocation (check first — many do)
- Skip this for tools with no meaningful invalid-argument space (a no-argument `get_current_time()` call has nothing to validate)

## Verification

Production-verified: schema-validated tool arguments with structured rejection-and-retry is a standard pattern in LangGraph and comparable tool-calling frameworks, and is the direct mechanism referenced in this catalog's own `use-json-schema-for-outputs` and `multi-tool-agent` build example for reducing malformed structured-output rates.
