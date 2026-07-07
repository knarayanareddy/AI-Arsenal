---
id: "context-windows"
title: "Context Windows"
entry_type: "guide"
section: "skills"
description: "Guide to context window limits, effective context, and budgeting strategies for production prompts"
tags:
  - llm
  - memory
  - chunking
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The context window is the maximum number of tokens a model can process in one request — prompt plus output combined. The advertised limit and the *effective* limit (where quality holds up) are different numbers, and engineering around that gap is a core production skill.

## Why It's in the Arsenal

"Just put everything in context" is the most common failure pattern in LLM application design. Understanding effective context turns context management from an afterthought into an explicit budget.

## Key Features

### Core Concepts

- The window covers input AND output; unreserved output tokens cause silent truncation of answers.
- Effective recall degrades before the advertised limit — long-context benchmarks routinely show mid-context facts being missed.
- Position matters: information at the start and end of the prompt is recalled more reliably than the middle.
- Longer contexts cost more and slow prefill; a bigger window is a capacity, not a recommendation.
- Conversation history grows without bound unless actively managed.

### Practical Workflow

1. Set an explicit token budget per prompt section (system, examples, retrieved context, history, output).
2. Reserve output tokens first, then allocate the remainder.
3. Prefer retrieval of the few most relevant chunks over stuffing whole documents.
4. Summarize or drop stale conversation history instead of letting it accumulate.
5. Test recall with facts planted at the start, middle, and end of your typical prompt length.

## Architecture / How It Works

Attention operates over every token in the window, so capacity limits come from memory (KV cache) and training length. Models extended past their trained length via positional-encoding tricks often show degraded quality in the extended range — which is why effective context should be measured, not assumed.

## Getting Started

```text
Example budget for a 128k-window RAG app:
system + instructions   2k
few-shot examples       2k
retrieved context      12k   (top-k chunks, ranked)
conversation history    6k   (summarized beyond that)
reserved output         4k
headroom               rest  (deliberately unused)
```

## Use Cases

1. **Scenario**: Deciding between longer context and better retrieval for a document QA feature
2. **Scenario**: Debugging answers that ignore facts present in the prompt
3. **Scenario**: Designing history management for a long-running assistant

## Strengths

- Turns vague "prompt too long" problems into explicit, testable budgets
- Prevents the most common silent failures: output truncation and mid-context misses
- Directly connects to cost and latency planning

## Limitations / When NOT to Use

- Effective-context behavior is model-specific and changes across versions; re-measure on upgrades
- Budgets do not fix bad retrieval — irrelevant context wastes budget no matter how well allocated
- Some tasks (whole-codebase reasoning) genuinely need long context; budget, do not just shrink

## Integration Patterns

- Enforce budgets with [context budgets per section](../../tips-and-tricks/prompting/use-context-budgets-per-section.md).
- Manage history with [summarize repeated conversation blocks](../../tips-and-tricks/prompting/summarize-repeated-conversation-blocks.md).
- Detect failures with [detect context truncation in tests](../../tips-and-tricks/evaluation/detect-context-truncation-in-tests.md).

## Resources

- [Attention](./attention.md)
- [Tokenization](./tokenization.md)
- [Reserve output tokens before adding context](../../tips-and-tricks/prompting/reserve-output-tokens-before-adding-context.md)
- [Drop unused conversation history](../../tips-and-tricks/cost-and-performance/drop-unused-conversation-history.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
