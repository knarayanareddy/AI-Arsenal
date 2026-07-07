---
id: "context-engineering"
title: "Context Engineering"
entry_type: "guide"
section: "skills"
description: "The skill of assembling the right tokens at the right time: system prompts, retrieval, history, and tool results"
tags:
  - llm
  - memory
  - retrieval
  - structured-output
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Context engineering is the discipline of deciding what goes into the model's context window on every call — instructions, examples, retrieved documents, conversation history, tool results — and in what order. It generalizes prompt engineering: the prompt is just the static part of a context that is mostly assembled dynamically.

## Why It's in the Arsenal

In production systems, most quality problems are context problems: the right instruction buried under irrelevant retrieval, stale history crowding out the question, tool output pasted raw. Treating context assembly as engineered code — budgeted, ordered, tested — is what makes LLM features reliable.

## Key Features

### Core Concepts

- Context is a budgeted resource: every section (system, examples, retrieval, history, tool output) gets an explicit token allocation.
- Order matters twice: models recall start/end best, and prompt caching requires stable prefixes — put static content first, the question last.
- Separation of trust: user content and retrieved documents must be delimited and never allowed to act as instructions.
- Compression is a first-class operation: summarize history, strip boilerplate from retrieved chunks, prefer IDs/references over copying data.
- Less is often more: irrelevant context actively degrades answers, it does not just waste tokens.

### Practical Workflow

1. Write the context layout as a template with named, budgeted sections.
2. Rank candidate context by expected usefulness; cut from the bottom, never truncate blindly.
3. Delimit every untrusted block (XML tags or fences) and state its role explicitly.
4. Log the fully assembled context for every call so failures are debuggable.
5. Eval context changes like code changes — a layout tweak is a behavioral change.

## Architecture / How It Works

A context pipeline sits between your application state and the model call: gather candidates (retrieval, memory, tools) → score/rank → compress → assemble into the template → enforce budgets → call. Each stage is independently testable, which is the point.

## Getting Started

```text
Context template skeleton:
[system: role, rules, output contract]        (stable → cacheable)
[few-shot examples]                            (stable)
[retrieved context, delimited, ranked]         (dynamic, budgeted)
[conversation summary + recent turns]          (dynamic, budgeted)
[user question]                                (last)
[reserved output tokens]
```

## Use Cases

1. **Scenario**: A RAG assistant whose answers improve when you remove half the retrieved chunks
2. **Scenario**: An agent that forgets instructions after ten tool calls — history is evicting the system prompt
3. **Scenario**: Cutting cost 40% by restructuring prompts for provider prompt-cache hits

## Strengths

- Unifies prompting, retrieval, and memory decisions under one budget
- Makes quality regressions attributable — you can diff what the model saw
- Directly reduces cost and latency as a side effect of discipline

## Limitations / When NOT to Use

- Cannot compensate for bad retrieval or a model too weak for the task
- Over-engineering context pipelines before you have evals is premature — measure first
- Aggressive summarization loses details; keep raw sources addressable by reference

## Integration Patterns

- Enforce with [context budgets per section](../../tips-and-tricks/prompting/use-context-budgets-per-section.md) and [rank context by expected usefulness](../../tips-and-tricks/prompting/rank-context-by-expected-usefulness.md).
- Secure with [use delimiters around retrieved context](../../tips-and-tricks/prompting/use-delimiters-around-retrieved-context.md) and [separate user content from system instructions](../../tips-and-tricks/prompting/separate-user-content-from-system-instructions.md).
- For agents, apply [budget context before adding tools](../../tips-and-tricks/agents-and-orchestration/budget-context-before-adding-tools.md).

## Resources

- [Context Windows](../core-concepts/context-windows.md)
- [Prompt Engineering Fundamentals](../prompt-engineering/fundamentals.md)
- [Compress retrieved context before generation](../../tips-and-tricks/cost-and-performance/compress-retrieved-context-before-generation.md)
- [Choose a memory solution](../../architectures/system-design/choose-memory-solution.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
