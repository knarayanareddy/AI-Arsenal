---
id: "attention"
title: "Attention"
entry_type: "guide"
section: "skills"
description: "Conceptual guide to attention mechanisms and their practical consequences for LLM engineering"
tags:
  - attention
  - transformers
  - llm
  - efficiency
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Attention is the mechanism that lets a transformer weigh every token against every other token when producing output. You do not need to derive the math, but you do need its consequences: quadratic cost in sequence length, the KV cache, why long contexts degrade, and why "lost in the middle" happens.

## Why It's in the Arsenal

Almost every production LLM behavior an engineer debugs — context truncation, latency growth with prompt size, degraded recall of mid-prompt facts — traces back to how attention works. Understanding it turns mysterious failures into predictable ones.

## Key Features

### Core Concepts

- Self-attention compares every token to every other token: compute and memory scale roughly quadratically with sequence length.
- The KV cache stores per-token keys/values so generation does not recompute the full prefix; it is why long chats consume GPU memory even when idle.
- Multi-head attention lets the model attend to different relationships in parallel; grouped-query attention (GQA) and multi-query attention trade heads for memory savings.
- Positional encodings (RoPE and variants) determine how far a model can generalize beyond its trained context length.
- Attention is not uniform: models empirically attend most reliably to the start and end of the prompt.

### Practical Consequences

1. Put critical instructions at the start and the question at the end of long prompts.
2. Budget context deliberately — more tokens means slower, costlier, and often less accurate attention.
3. Expect first-token latency to grow with prompt length (prefill is attention over the whole prompt).
4. KV-cache reuse (prompt caching) only works for identical prefixes — order your prompt so stable content comes first.

## Architecture / How It Works

Each token produces query, key, and value vectors. A token's output is a weighted sum of all values, weighted by query-key similarity. Prefill computes attention over the whole prompt at once; decoding then generates one token at a time against the cached keys/values.

## Getting Started

```text
Mental model for cost:
prefill_cost  ~ prompt_tokens^2        (dominates first-token latency)
decode_cost   ~ output_tokens x prompt_tokens   (dominates per-token latency)
kv_cache_size ~ prompt_tokens x layers x heads  (dominates GPU memory)
```

## Use Cases

1. **Scenario**: Diagnosing why answers ignore facts buried in the middle of a long retrieved context
2. **Scenario**: Estimating latency/cost impact before doubling a prompt's context budget
3. **Scenario**: Structuring prompts so provider-side prompt caching actually hits

## Strengths

- Explains most context-length behavior from one mechanism
- Directly informs prompt structure, caching strategy, and serving economics
- Foundation for understanding GQA, sliding-window, and other efficiency variants

## Limitations / When NOT to Use

- Mechanism intuition does not replace measuring your model's actual long-context recall
- Architecture details vary by model family; verify before relying on a specific behavior
- Not a substitute for retrieval — attention over a huge context is not a search engine

## Integration Patterns

- Pair with [context budgeting tips](../../tips-and-tricks/prompting/use-context-budgets-per-section.md) when designing prompts.
- Use [KV-cache hit rate measurement](../../tips-and-tricks/inference-and-serving/measure-kv-cache-hit-rate.md) when serving models yourself.
- Read alongside the [Transformers](./transformers.md) concept page.

## Resources

- [Attention Is All You Need](../../research/foundational/vaswani-2017-attention.md)
- [Transformers](./transformers.md)
- [Measure first token latency](../../tips-and-tricks/cost-and-performance/measure-first-token-latency.md)
- [Cache stable system prompts](../../tips-and-tricks/cost-and-performance/cache-stable-system-prompts.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
