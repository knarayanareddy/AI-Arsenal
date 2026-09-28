---
id: toon
name: toon
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A compact serialization of the JSON data model using CSV-style tabular rows, with a spec, TypeScript SDK, CLI, and benchmarks"
github_url: "https://github.com/toon-format/toon"
license: MIT
primary_language: TypeScript
tags: [structured-output, efficiency, inference]
maturity: beta
cost_model: open-source
github_stars: 25436
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-03"
docs_url: "https://toonformat.dev"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Drops redundant per-record syntax on uniform data while staying a lossless view of the JSON you already have."
best_for:
  - "You are sending arrays of same-shaped records to a model and paying for repeated JSON key names on every item."
  - "You are feeding a model structured data it must parse reliably and want explicit headers rather than brace matching."
  - "You already produce JSON programmatically and need a token-efficient encoding without changing your data model."
avoid_if:
  - "You are working with deeply nested or irregular data, since the README states JSON may be more efficient there."
  - "You need a format every downstream consumer parses, because most models and libraries expect JSON."
  - "You have a workload with few records, since the overhead of a header line dominates at small n."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 25436, MIT, TypeScript, last commit 2026-09-03, topics, homepage. From README: spec v4.1, four forms including keyed tabular, nested field groups, ~117 vs ~66 token example, lossless JSON encoding claim, npm @toon-format/toon. Benchmarks not reproduced."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

TOON borrows YAML's indentation for nested objects and CSV's row structure for uniform arrays, and the combination is what produces the savings. Four forms are selected automatically from the data's shape. Inline form puts a primitive array on its header line, as in alerts[2]: frost,wind. Tabular form declares the field list once in a header - forecast[3]{day,temp{min,max},condition,rainChance}: - then writes one flat row per element, with the nested field group temp{min,max} folded into the header while rows stay flat. Keyed tabular form covers objects whose values are uniform objects such as config maps, feature flags, and records by ID, marked by a colon after the length so each row carries its own key. The format is a lossless encoding of the JSON data model, positioned as a translation layer rather than a new schema, and the project publishes benchmarks comparing token counts and parse accuracy across representative datasets.

## Why it's in the Arsenal

The recurring cost in any LLM pipeline is that JSON repeats every key on every record, so a hundred-row table pays for a hundred copies of the same column names. TOON declares the schema once in a header and writes values positionally, which is why the weather example drops from about 117 tokens to about 66. That matters most exactly where structured output is used hardest - tool results, API responses, tabular data - and it is the rare case where you cut tokens without any information loss, since the decode path is deterministic. The human-readability property is the secondary dividend: a header plus rows is legible to a person debugging a prompt, which brace-and-comma JSON is not.

## Architecture

Encoding is a shape-directed descent over the JSON value tree. At each node the encoder inspects whether children share a uniform key set; when they do, it emits a tabular header listing each field once and writes the rows inline, handling nested uniform sub-objects as a parenthesized field suffix. Uniform arrays of primitives collapse to a single key plus a comma-separated list, while non-uniform arrays fall back to an indented list of records, so the output stays flat and line-oriented rather than repeating a key per row. The decoder is the inverse: it reads the header to rebuild the array of records, then walks the indentation depth to rebuild nesting, so a round trip is deterministic and the token saving comes from the header being written once per table rather than once per row.

## Ecosystem Position

TOON competes with compact prompt formats rather than with agent frameworks: the direct comparison is other token-efficient encodings, and its advantage over plain JSON is structural, not algorithmic. Compared with MessagePack, CBOR, or Protobuf, which are binary and denser still, TOON deliberately stays human-readable, so it trades some of that density for the ability to eyeball a prompt. Compared with YAML, which is similarly readable, TOON's win is concentrated on arrays of uniform records where YAML repeats dashes and nesting. It overlaps with the compression and context-cost work in content/projects/frameworks that reduces prompt size, and it is an alternative to spending effort on prompt wording when the overhead is structural. It operates on the data an agent receives rather than on the agent, so it composes with any harness and sits upstream of content/projects/inference-engines, where the saved tokens are realized as lower cost.

## Getting Started

Install the TypeScript SDK and encode a value; the CLI and the spec cover the rest.

```bash
npm install @toon-format/toon
# then in TypeScript: import { encode, decode } from '@toon-format/toon'
```

The full specification lives at github.com/toon-format/spec, and the CLI ships with the package for converting JSON to and from TOON at the shell.

## Key Use Cases

1. Shrink tool results: return a hundred-row record set as TOON instead of JSON and cut the repeated key overhead on every item.
2. Improve parse reliability: give the model an explicit field header per table so it reads columns positionally instead of matching braces.
3. Debug a prompt by eye: read the encoded payload in a log and see the structure a human can verify, rather than counting brackets.

## Strengths

- Lossless round-trip of the JSON data model, so no information is traded for the token savings.
- Shape-directed encoding picks tabular, keyed tabular, inline, or structural form automatically per node.
- Nested field groups fold uniform sub-objects into the table header, keeping rows flat and headers single-declaration.
- Human-readable output, which makes an encoded prompt reviewable in a log - something binary formats give up entirely.

## Limitations

The gain is concentrated in uniform arrays and it evaporates on deeply nested or irregular structures, where the README explicitly says JSON may be more efficient. There is a crossover point at small record counts where the header line costs more than the keys it saves. Adoption is an ecosystem problem more than a technical one: if any consumer in your chain expects JSON, you need a decode step, and models trained on JSON have no prior for this syntax. The project itself warns the format is stable but still an idea in progress, with the spec open to change. The benchmarks are self-published by the format's authors, so the parse-accuracy and token-count deltas should be reproduced on your own data before you commit an architecture to them.

## Relation to the Arsenal

This framework-phase entry changes how data is serialized for prompts rather than how agents are built, which puts it alongside the context-budget entries in content/projects/frameworks that attack the same cost from the prompt side. It complements content/projects/data-and-retrieval by giving anything that returns structured records a cheaper wire format, and its savings land directly in content/projects/inference-engines where prompt tokens are metered. No evaluation harness ships with it, so validating parse accuracy on your own models needs content/projects/benchmark-and-eval.

## Resources

- [Repository and TypeScript SDK](https://github.com/toon-format/toon)
- [Full specification (SPEC.md)](https://github.com/toon-format/spec/blob/main/SPEC.md)
- [npm package](https://www.npmjs.com/package/@toon-format/toon)
