---
id: "transformers"
title: "Transformers"
entry_type: "guide"
section: "skills"
description: "Conceptual guide to transformer architecture and why it matters for LLM systems"
tags:
  - llm
  - transformers
  - attention
  - foundational
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

The transformer as a specific composition of operations rather than a family of models: attention, position handling, normalisation and the KV cache, in the order they run. The aim is that you can reason about a model's memory and latency behaviour instead of estimating it, and that you can tell which component a given efficiency technique modifies.

## Why It's in the Arsenal

Most operational questions about a model — memory growth, latency, where a technique applies — are answerable from the architecture rather than estimated. Naming the components and their order is what turns a model card into something you can reason about, and it is also what lets you spot which part a given optimisation changes.

## Key Features

- Gives exact operation order rather than a conceptual sketch, because that is where implementations diverge.
- Connects each efficiency technique to the component it modifies, which is what the choice requires.
- Notes that a from-scratch implementation is the reliable way to catch a silent numerical bug.

## Architecture / How It Works

A transformer converts token sequences into contextual representations using attention and feed-forward layers. Decoder-only transformers generate text autoregressively, which is why serving latency, KV cache, and token budgets matter so much.

## Getting Started

```bash
# Practical exercise
# Read a tiny transformer implementation, then inspect tokenization and generation step by step.
```

## Use Cases

1. **Scenario**: you are implementing attention yourself or debugging an implementation, and need the exact operation order.
2. **Scenario**: you are choosing a context-extension or efficiency technique and need to know which component it modifies.
3. **Scenario**: you need to reason about KV-cache memory growth and sequence length without guessing.

## Strengths

- Gives the exact operation order rather than a conceptual sketch, because the details are where implementations diverge.
- Connects each efficiency technique to the component it modifies, which is what you need to choose between them.
- Notes that a from-scratch implementation is the reliable way to catch a numerical bug you cannot see.

## Limitations / When NOT to Use

- The canonical architecture is a specific composition of choices, not a family, and most variation between models is precisely in which parts were changed.
- Efficiency techniques trade quality for memory in model-specific ways, so an abstract description hides the number you need.
- A from-scratch implementation is the fastest way to understand the tensor shapes, and it is also the easiest place to introduce a silent numerical bug.

## Integration Patterns

- Link this concept from inference-engine entries that alter attention or position handling, so the modification is explained where it is used.
- When a model family deviates from the canonical architecture, the deviation belongs here as well as in that model's entry.

## Resources

- [Attention Is All You Need](../../research/foundational/vaswani-2017-attention.md)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Andrej Karpathy YouTube](https://www.youtube.com/@AndrejKarpathy)
- [Hugging Face Transformers course](https://huggingface.co/learn/nlp-course)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

