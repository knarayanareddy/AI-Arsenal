---
id: baml
name: "BAML"
type: tool
job: [structured-output]
description: "DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output"
url: "https://www.boundaryml.com"
cost_model: open-source
pricing_detail: "Apache-2.0 open-source toolchain; free (BoundaryML offers paid tooling/support around it)"
tags: [structured-output, llm, tool-use]
maturity: beta
stack: [python, typescript]
free_tier: true
free_tier_limits: "Open-source and free; you pay your own LLM provider costs"
self_hostable: true
open_source: true
source_url: "https://github.com/BoundaryML/baml"
docs_url: "https://docs.boundaryml.com/"
github_url: "https://github.com/BoundaryML/baml"
alternatives: [instructor, outlines, guidance]
integrates_with: [openai-agents-sdk, langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want prompts as versioned, typed source (with generated clients + tests) rather than scattered f-strings, across Python and TypeScript"
  - "You need reliable structured output from any model — BAML's parser repairs near-miss JSON instead of requiring constrained decoding"
avoid_when:
  - "You want to stay in plain Python objects/decorators with no separate DSL or codegen step — a library like Instructor is lighter"
  - "Your use case is a couple of one-off prompts; the DSL + build step is overhead you won't recoup"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (8,528), Apache-2.0 license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims from official docs; not hands-on verified here."
verdict: recommended
verdict_rationale: "Strong prompts-as-code approach with model-agnostic schema-aligned parsing; the cost is adopting a DSL + codegen workflow"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/BoundaryML/baml", "date": "2026-07-08", "description": "8,528 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

BAML (Boundary AI Markup Language) treats LLM calls as typed functions defined in `.baml` files: you declare input/output schemas and the prompt, and BAML generates a type-safe client for Python/TypeScript. Its "Schema-Aligned Parsing" coerces and repairs imperfect model output into the declared type rather than relying solely on constrained decoding, so it works across providers.

## Why It's in the Arsenal

It earns a place because it tackles two recurring pains at once: unversioned, untyped prompt sprawl and unreliable structured output. It is a comparison point against other structured-output libraries in the dx-and-tooling phase, not an unconditional recommendation — see Strengths / Limitations.

## Key Features

- `.baml` DSL for typed prompts and input/output schemas
- Generated, type-safe clients for Python and TypeScript
- Schema-Aligned Parsing that repairs near-miss JSON from any model
- Playground/VS Code tooling and testable prompt functions

## Architecture / How It Works

You author functions in `.baml`; the BAML compiler generates client code binding those functions to your language's types. At runtime the client renders the prompt, calls the model, and parses the response through the schema-aligned parser, which fixes common deviations (trailing text, minor format errors) to satisfy the declared type — decoupling reliability from any single provider's structured-output feature.

## Getting Started

```bash
npm install -g @boundaryml/baml   # or: pip install baml-py
baml-cli init
# define a function in baml_src/, run generate, then call the typed client
```

## Use Cases

1. **Scenario**: manage prompts as typed, versioned source with generated clients across a Python + TS codebase
2. **Scenario**: get dependable structured extraction from models that lack strong native JSON modes
3. **Scenario where this is NOT the right fit**: you prefer staying in plain Python with decorators and no DSL — a lighter library fits better

## Strengths

- Prompts-as-code: typed, testable, version-controlled
- Provider-agnostic reliable structured output
- Polyglot (Python + TypeScript) with good editor tooling

## Limitations / When NOT to Use

- Requires learning a DSL and adding a codegen build step
- Overhead for tiny/one-off prompt use
- Another artifact type (`.baml`) in the repo to maintain

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `instructor`, `outlines`, and `guidance` before adopting — they compete for the same structured-output job.
- Link this tool from job guides using its canonical ID `baml`.
- Record prompt-versioning and codegen workflow assumptions before production adoption.

## Resources

- [Official Site](https://www.boundaryml.com)
- [Documentation](https://docs.boundaryml.com/)
- [GitHub](https://github.com/BoundaryML/baml)

## Buzz & Reception

- 8,528 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
