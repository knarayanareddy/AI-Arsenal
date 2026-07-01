---
title: "Foundational Research"
section: "research/foundational"
auto_generated: false
---

# Foundational Research

## What belongs here

Seminal works that redefined how the field thinks — not merely "important" or "widely cited," but genuinely field-defining, the small set of papers every AI engineer is expected to know by name (Attention Is All You Need, BERT, GPT-3-style scaling demonstrations, foundational technical reports for widely-used model families).

## What does NOT belong here

A paper proposing a specific, reusable technique (a training objective, a quantization method, a retrieval trick) belongs in the phase folder matching that technique's domain (`training-and-alignment/`, `inference-and-efficiency/`, `retrieval-and-memory/`, etc.) even if it is well-known — foundational/ is reserved for papers that changed the field's frame of reference, not papers that are merely popular within an existing frame.

## Engineering frame

What is the small set of papers I need to have actually read — not just heard of — to understand why the rest of this catalog's architecture, training, and inference decisions look the way they do?

## Reading order guidance

- Start with [Attention Is All You Need](./vaswani-2017-attention.md) — the architectural substrate everything else in this catalog builds on.
- Read [BERT](./devlin-2018-bert.md) next to see the encoder-only, bidirectional-pretraining branch of that architecture.
- Read [Language Models are Few-Shot Learners (GPT-3)](./brown-2020-gpt3.md) to see the decoder-only, scale-driven branch that produced the emergent behavior most of today's LLM engineering assumes.
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](./lewis-2020-rag.md) and [The Llama 3 Herd of Models](./dubey-2024-llama3.md) are field-defining for their respective sub-areas (the term "RAG" itself, and the current reference architecture for an open-weight foundation model family) rather than the field as a whole — read them once you have the first three as context.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Foundational in This Phase

### Recently Added

- [Language Models are Few-Shot Learners](./brown-2020-gpt3.md)
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./devlin-2018-bert.md)
- [Attention Is All You Need](./vaswani-2017-attention.md)
- [The Llama 3 Herd of Models](./dubey-2024-llama3.md)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](./lewis-2020-rag.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Language Models are Few-Shot Learners](./brown-2020-gpt3.md) — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](./devlin-2018-bert.md) — Showed bidirectional masked-language-model pretraining beats left-to-right pretraining, meaning you should reach for an encoder-only model (not a decoder-only LLM) for classification/embedding tasks
- [The Llama 3 Herd of Models](./dubey-2024-llama3.md) — Documented Meta's dense 405B-parameter Llama 3 herd as an open-weight family competitive with GPT-4 -- the reference technical report for an open-weight family, though Meta's current line has moved to Llama 4's MoE design
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](./lewis-2020-rag.md) — Coined 'RAG': a jointly-trained retriever plus generator beats closed-book generation on knowledge-intensive tasks -- ground generation in retrieved documents, though production RAG today uses a simpler decoupled pipeline
- [Attention Is All You Need](./vaswani-2017-attention.md) — Showed self-attention alone (no recurrence or convolution) can model sequences, enabling fully parallelised training that made today's LLM-scale training runs computationally feasible
