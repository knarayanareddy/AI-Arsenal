---
id: ai-engineering-from-scratch
name: "AI Engineering From Scratch"
type: tool
job: [prototyping]
description: "Dependency-light implementations of transformers, agent loops, RAG and MCP servers written to be read and run"
url: "https://github.com/rohitg00/ai-engineering-from-scratch"
cost_model: open-source
pricing_detail: "MIT-licensed teaching code; running the larger examples needs a GPU, smaller ones run on a laptop"
tags: [transformers, agents, rag, research, training]
maturity: production
stack: [python, rust, typescript]
free_tier: true
free_tier_limits: "MIT source, unrestricted; compute for training examples is the real constraint"
self_hostable: true
open_source: true
source_url: "https://github.com/rohitg00/ai-engineering-from-scratch"
docs_url: null
github_url: "https://github.com/rohitg00/ai-engineering-from-scratch"
alternatives: []
integrates_with: []
added_date: "2026-10-04"
last_reviewed: "2026-10-04"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "The rare educational codebase that is worth reading before debugging a framework, because it shows the actual tensor shapes and control flow rather than an API surface"
status: active
phase: dx-and-tooling
audience: [research, prototype]
best_when:
  - "A framework abstraction is hiding the cause of a bug and you need the underlying computation in front of you"
  - "You are writing a custom loop or protocol server and want a small, correct reference rather than a dependency"
avoid_when:
  - "You need distributed training, kernel fusion or multi-GPU throughput, none of which readability-oriented code provides"
  - "Adopting the implementations as production dependencies, which transfers maintenance of every edge case to your team"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Scope and examples described from the repository layout; the pedagogical quality of individual chapters was sampled, not reviewed exhaustively."
buzz_sources: []
---

## Overview

AI Engineering From Scratch is a repository of implementations written to be understood: multi-head attention and positional encoding in raw tensor operations, a self-reflective retrieval loop, a protocol server for tool calls, classic reinforcement-learning algorithms, and multi-agent message passing. The point is not reuse; it is that reading the mechanics once makes every framework above them legible.

Examples are spread across Python, Rust and TypeScript, which is deliberate — the same algorithm expressed in a borrowed-memory language and a garbage-collected one teaches different things about where the cost actually lives.

There is no abstraction layer to learn, no plugin system, and no service to run. Each directory stands alone with its own dependencies, usually nothing beyond a tensor library.

## Why It's in the Arsenal

Operational teams inherit frameworks they did not write and cannot easily inspect. When token accounting drifts, when a retrieval loop retrieves the wrong thing, when a tool call is malformed, the fix requires knowing what the abstraction is doing underneath.

This is the entry the Arsenal points at for that knowledge. It is also a restraint on dependency adoption: having implemented a protocol server in an afternoon, an engineer can judge whether a heavyweight library earns its place.

## Key Features

- Transformer internals — attention, positional encoding, normalisation, feed-forward blocks — without a model framework.
- Agent loop implementations that expose state handling, tool dispatch and error recovery directly.
- A minimally dependent retrieval loop with reflection, showing where relevance decisions enter the pipeline.
- Protocol-server examples in two languages, useful for understanding how tools are described and invoked.
- Reinforcement-learning and vision primitives alongside the language work, for the parts of a stack that are not LLMs.

## Architecture / How It Works

Each module is a self-contained directory: a small dataset, the algorithm, and a script that runs it end to end on a toy prompt. Nothing is shared through a package index, so you can read one directory without understanding the rest — an advantage when the goal is to trace how tokens become a prediction.

The design consequence is that the code prioritises inline clarity over reuse — comments explain the maths, dimensions are explicit, and batched fast paths are often omitted where they would obscure the step being taught. That is the correct trade for the purpose and the wrong one for throughput: no cache blocking, no fused kernels, one request at a time.

## Getting Started

Pick the chapter nearest your current confusion, run it, and change one parameter — heads, context length, retrieval threshold — to see the effect. Reading the code without executing it undersells the material, because the tensor shapes are what usually clarify the concept.

## Use Cases

1. Debugging a production inference path where an abstraction returns shapes or scores that do not match expectations.
2. Interview preparation grounded in implementation rather than terminology.
3. Designing a minimal internal agent loop when a framework's overhead is not justified.
4. Teaching material for a study group that wants runnable code, not slides.

## Strengths

- Exposes the actual arithmetic of attention and retrieval, which framework documentation never does.
- Multiple languages reveal the same algorithm's costs in different memory models.
- Self-contained directories mean no dependency resolution before learning something.
- Serves as a reference implementation when you write a small custom component.

## Limitations / When NOT to Use

- Readability-first code lacks mixed precision, kernel fusion and distributed scaling; it is not a serving path.
- Copying modules into production shifts security patching and protocol compatibility onto your team indefinitely.
- Coverage is uneven by topic, and depth varies between chapters.
- Not a course: there is no graded progression, so it rewards a reader who already knows what they need.

## Integration Patterns

Keep it as a checked-out reference beside the projects you maintain, and port pieces rather than importing them. When a framework behaviour confuses your team, write the reduced case from this repository into a test that asserts the behaviour you expect — the reduced case is more durable documentation than any issue thread.

## Resources

- [GitHub — rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch)

## Buzz & Reception

Its reputation rests on repository stars and citations in learning-material threads; no formal evaluation exists, which is appropriate for teaching code. Judge it by whether a specific chapter resolves the specific confusion you have.
