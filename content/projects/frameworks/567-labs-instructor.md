---
id: 567-labs-instructor
name: "instructor"
version_tracked: null
artifact_type: library
category: llms
subcategory: libraries
description: "Library that constrains LLM output to a Pydantic model, validating and retrying until it parses"
github_url: "https://github.com/567-labs/instructor"
license: "MIT"
primary_language: Python
org_or_maintainer: "567-labs"
tags: [structured-output, llm, tool-use]
maturity: production
cost_model: open-source
github_stars: 13953
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-27"
docs_url: "https://python.useinstructor.com/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Constrains LLM output to Pydantic models with automatic retry and validation, turning free-form generation into a schema-checked function result."
best_for:
  - "You are building a tool-calling agent and need arguments to arrive as validated Python objects rather than a JSON string you parse and hope."
  - "You have several model providers with inconsistent structured-output support and want one code path that works across all of them."
  - "You are extracting typed records from documents and need validation, automatic retries, and clear errors when the model produces something off-schema."
avoid_if:
  - "Your single provider already guarantees schema conformance natively, where calling that structured-output feature directly is simpler and free."
  - "You need a streaming response token by token, since validation and retries work against a completed response rather than an incremental one."
  - "Your model is not good at following schemas at all, since retries cost tokens and a weak model will loop rather than converge."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (13953), MIT license, last commit 2026-09-27, Python as primary language and the topic list were API-verified. Mode selection, the retry-with-errors loop, partial streaming, and the adapter list come from the official docs; retry-cost and schema-versioning caveats are engineering judgement about this pattern, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/567-labs/instructor", "date": "2026-09-28", "description": "13,953 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

instructor takes a Pydantic model and a language model client, sends the schema to the model, and returns an instance of that model. The interesting work is in the retry layer: on a validation error the library captures the specific Pydantic error, appends it to the conversation as a correction message, and asks the model again, so a schema violation becomes a repair step rather than an exception. Mode selection picks the best available mechanism per provider — native structured output, a tool-call variant, or JSON mode with a grammar or a re-ask — and the same client wrapper works across OpenAI, Anthropic, Gemini, Mistral, Groq, Cohere, Azure, and local backends through the model provider abstraction. Beyond extraction there is a streaming path that yields partially constructed objects as fields arrive, iterable helpers for extracting a list of objects from a single response, a patch mode for oversized responses, and adapter support so custom clients can be taught the same contract. Type conversion runs through Pydantic v2, so literals, enums, constrained numerics, and nested models are all enforced.

## Why it's in the Arsenal

The recurring decision is what happens when a model does not return the shape your code expects. The common approach — ask nicely in the prompt, then parse the JSON, then hope — fails in production for reasons that are hard to debug: a stringified number, a wrapped object, a field hallucinated from a different example, a list flattened into prose. Instructor moves that failure inside the library: the Pydantic schema becomes the contract, the error message becomes the feedback, and the retry loop repairs the output against real field-level errors. That converts a whole class of brittle parsing code into a function call and makes the schema the single source of truth that the model, the validator, and your type checker all agree on.

## Architecture

A create call wraps a completion: the library patches the client so the response is routed through the mode-specific handler, which either uses a provider's native structured-output parameter with the JSON schema, a function or tool call with the schema as parameters, or JSON mode with a constrained grammar. The response is then validated by Pydantic. On failure, a retry hook catches the ValidationError, appends the model output plus the structured error to the message list, and re-issues the request; the loop is bounded by max_retries and each attempt uses a fresh seed so a deterministic failure does not repeat verbatim. For lists, the extraction path asks for a wrapper object containing an array, then validates the container, which lets a whole response be validated at once rather than item by item. Streaming uses a partial-model pattern: as partial JSON arrives it is parsed against the schema and a best-effort instance is yielded, so downstream code can consume fields early without giving up validation. Provider adapters implement a small common interface over create, create_partial, and model parameters, so adding an unsupported provider means writing one adapter rather than changing the core.

## Ecosystem Position

Instructor competes with outlines and lm-format-enforcer, which solve the same problem with grammar-based constrained decoding: those guarantee the token stream is valid by construction, whereas instructor primarily validates and repairs, with optional grammar backends layered on. Compared to jsonformer it is a much smaller surface and Pydantic-native. Against a provider's own structured-output feature, instructor is a compatibility layer rather than a competitor — models that support native schemas work better through it, and the library's win is portability across providers plus a uniform retry policy. It is not a validation library: pydantic handles typing and cleanlab handles data quality, and it does not replace an eval harness for measuring extraction accuracy, which is where ragas-rag-evaluation sits.

## Getting Started

Ask for a validated object from any supported provider, with retries on failure:

```bash
pip install instructor
```

```python
import instructor, openai
from pydantic import BaseModel, Field

client = instructor.from_openai(openai.OpenAI())

class Ticket(BaseModel):
    title: str = Field(max_length=60)
    severity: int = Field(ge=1, le=5)
    tags: list[str]

ticket = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=Ticket,
    messages=[{"role": "user", "content": "Login endpoint 500s on SSO. Triage it."}],
    max_retries=3,
)
print(ticket.severity, ticket.tags)
```

Swap from_openai for from_anthropic or from_groq and the call site is unchanged; use create_partial with a Pydantic partial model for streaming.

## Key Use Cases

1. An agent whose tools take typed arguments, where a malformed number or an unexpected enum value would otherwise be a runtime crash rather than a repairable error.
2. Document extraction into a nested Pydantic schema, where one wrong field fails the record and a repair loop is cheaper than a manual re-parse.
3. A multi-provider service that must not lose its integration when a provider changes or lacks native structured output, since the schema contract stays fixed at the boundary.

## Strengths

- Pydantic-native, so one schema definition serves validation, type hints, documentation, and the model's structured output.
- Field-level validation errors are fed back to the model, which repairs a malformed response instead of failing the request.
- One adapter layer across many hosted and local providers removes per-provider integration code.
- Supports lists, partial streaming, and bounded multi-retry policies, covering extraction cases a single-object call misses.

## Limitations

Retries cost tokens and latency, and a model that is poor at schemas will burn the retry budget without converging, so max_retries is a real cost knob rather than a safety net. Validation is post-hoc rather than constrained decoding, so a malformed intermediate can consume tokens before failing, and a field returned as a string is coerced by Pydantic only where the type allows it. The API is a patched client, so stack traces and error types come from a shim and can be harder to read than a plain SDK error, and a provider adapter that falls back to a weaker mode will quietly give you different guarantees than the native path. Streaming yields best-effort partial objects, so downstream code must tolerate fields that later change, and there is no first-class schema versioning for a model already deployed against production data.

## Relation to the Arsenal

This is the structured-output entry in content/projects/frameworks, and it is the layer that makes the tool-calling contracts in content/projects/agent-systems dependable — the agent frameworks there either use it directly or reimplement the same validate-and-retry loop. It is also the natural companion to the Pydantic entry and to the evaluation work that measures extraction accuracy with ragas-rag-evaluation. Where the model is being tuned rather than prompted, the training entries in content/projects/training-and-alignment explain the other half of improving schema adherence, and provider gateways like litellm and portkey-gateway sit upstream of the same adapters.

## Resources

- [Instructor documentation](https://python.useinstructor.com/)
- [Instructor GitHub repository](https://github.com/567-labs/instructor)
- [Reask and validation recipes](https://python.useinstructor.com/concepts/reask_validation/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (13,953 stars, last commit 2026-09-27, license MIT, verified via GitHub API on 2026-09-28)*
