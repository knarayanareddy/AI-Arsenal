---
id: "tokenization"
title: "Tokenization"
entry_type: "guide"
section: "skills"
description: "Practical guide to tokenization and its impact on cost, latency, context limits, and prompt behavior"
tags:
  - llm
  - inference
  - efficiency
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Tokenization converts text into the integer units models actually process. Tokens — not characters or words — are what you pay for, what fills the context window, and what the model reasons over. Most surprising LLM behavior around numbers, code, and non-English text starts here.

## Why It's in the Arsenal

Cost estimates, context budgets, latency projections, and chunking strategies are all denominated in tokens. Engineers who think in words consistently mis-size all four.

## Key Features

### Core Concepts

- Modern models use subword tokenizers (BPE variants): common words are one token, rare words split into several.
- English averages roughly 3-4 characters per token; code, non-Latin scripts, and numbers tokenize far less efficiently.
- Tokenizers differ per model family — the same prompt has different token counts on different providers.
- Numbers are often split into arbitrary chunks, which is one reason arithmetic is unreliable.
- Special tokens (chat template markers, tool-call delimiters) consume budget invisibly.

### Practical Workflow

1. Count tokens with the actual model's tokenizer, never by word count.
2. Measure token counts for your real production inputs, not English test strings.
3. Track cost per feature in tokens, split by input vs output (output tokens usually cost more).
4. When chunking documents for RAG, size chunks in tokens so they survive the context budget.

## Architecture / How It Works

A tokenizer is a lookup built from a fixed vocabulary learned over a training corpus. Text is greedily segmented into the longest matching vocabulary entries, producing a sequence of integer IDs. The model never sees raw text — only these IDs — so anything the tokenizer represents awkwardly, the model handles awkwardly.

## Getting Started

```bash
# Rules of thumb (verify with the real tokenizer):
# English prose:  ~0.75 words per token
# Source code:    ~0.5 words per token, whitespace-sensitive
# CJK text:       often ~1 character per token or worse
```

## Use Cases

1. **Scenario**: Estimating monthly cost for a feature before building it
2. **Scenario**: Debugging why a prompt fits for English users but truncates for others
3. **Scenario**: Choosing chunk sizes for a retrieval pipeline

## Strengths

- Makes cost and context arithmetic concrete instead of guessed
- Explains model weaknesses (arithmetic, spelling, character-level tasks) mechanically
- Small, self-contained concept with immediate daily payoff

## Limitations / When NOT to Use

- Token counts are model-specific; rules of thumb break across providers
- Tokenizer knowledge does not fix arithmetic weaknesses — route those to tools
- Byte-level and multimodal tokenization vary further; verify per model

## Integration Patterns

- Combine with [token budgets per feature](../../tips-and-tricks/cost-and-performance/set-token-budgets-per-feature.md) for cost control.
- Use with [context budgets per section](../../tips-and-tricks/prompting/use-context-budgets-per-section.md) when designing prompts.
- Pair with [Context Windows](./context-windows.md) for capacity planning.

## Resources

- [Context Windows](./context-windows.md)
- [Track cost per feature](../../tips-and-tricks/cost-and-performance/track-cost-per-feature.md)
- [Reserve output tokens before adding context](../../tips-and-tricks/prompting/reserve-output-tokens-before-adding-context.md)
- [Transformers](./transformers.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
