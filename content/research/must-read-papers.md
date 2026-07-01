---
id: "must-read-papers"
title: "Must-Read AI Papers"
entry_type: "guide"
section: "research"
description: "Categorized reading guide for foundational and high-leverage AI papers"
tags:
  - foundational
  - llm
  - research
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

This guide groups canonical AI papers by the engineering decision they inform. Each line is intentionally short so humans and LLM agents can scan it quickly.

## Why It's in the Arsenal

A good engineering reading list should explain what a paper introduced, not just list titles. This page routes readers to canonical entries and original papers.

## Key Features

- Categorized by practical engineering relevance
- One-line paper summaries
- Links to arXiv and local Arsenal entries

## Architecture / How It Works

### Foundational Architecture

- [Attention Is All You Need](foundational/vaswani-2017-attention.md) — 2017 — Transformer architecture
- [BERT](foundational/devlin-2018-bert.md) — 2018 — bidirectional pretraining
- [GPT-3](foundational/brown-2020-gpt3.md) — 2020 — few-shot scaling
- [LLaMA 3 Herd](foundational/dubey-2024-llama3.md) — 2024 — open foundation model recipe

### Instruction Tuning & RLHF

- [InstructGPT](training-and-alignment/ouyang-2022-instructgpt.md) — 2022 — RLHF instruction following
- [Constitutional AI](training-and-alignment/bai-2022-constitutional-ai.md) — 2022 — AI-feedback alignment
- [Direct Preference Optimization](training-and-alignment/rafailov-2023-dpo.md) — 2023 — simpler preference optimization

### RAG

- [Retrieval-Augmented Generation](foundational/lewis-2020-rag.md) — 2020 — retrieval plus generation
- [HyDE](retrieval-and-memory/gao-2022-hyde.md) — 2022 — hypothetical-document retrieval
- [RAPTOR](retrieval-and-memory/sarthi-2024-raptor.md) — 2024 — recursive retrieval summaries
- [GraphRAG](retrieval-and-memory/edge-2024-graphrag.md) — 2024 — graph/community retrieval

### Agents & Tool Use

- [Chain-of-Thought](agents-and-reasoning/wei-2022-chain-of-thought.md) — 2022 — reasoning traces
- [ReAct](agents-and-reasoning/yao-2022-react.md) — 2022 — reasoning plus actions
- [Toolformer](agents-and-reasoning/schick-2023-toolformer.md) — 2023 — self-supervised tool use
- [Tree of Thoughts](agents-and-reasoning/yao-2023-tree-of-thoughts.md) — 2023 — search over reasoning paths

### Efficient Inference and Fine-Tuning

- [LoRA](training-and-alignment/hu-2021-lora.md) — 2021 — low-rank adaptation
- [GPTQ](inference-and-efficiency/frantar-2022-gptq.md) — 2022 — post-training quantization
- [Speculative Decoding](inference-and-efficiency/leviathan-2022-speculative-decoding.md) — 2022 — faster decoding with draft models
- [QLoRA](training-and-alignment/dettmers-2023-qlora.md) — 2023 — quantized fine-tuning

### Current SOTA / Model Reports

- [DeepSeek-R1](training-and-alignment/deepseek-ai-2025-r1.md) — 2025 — open reasoning model recipe
- [Qwen2.5-Math](training-and-alignment/yang-2024-qwen25-math.md) — 2024 — math specialist self-improvement

## Getting Started

```bash
# Read one category at a time; convert takeaways into evals or architecture decisions.
```

## Use Cases

1. **Scenario**: You need a fast research reading path for AI engineering decisions
2. **Scenario**: You want to map papers to practical architecture and evaluation choices

## Strengths

- Organizes research by engineering relevance rather than publication date alone
- Links canonical paper entries where available
- Keeps benchmark and technique tracking separate from implementation guides

## Limitations / When NOT to Use

- Does not replace reading the original papers
- Benchmark leaderboards change frequently and should be verified before claims

## Integration Patterns

- Use paper entries as background context for architecture decisions.
- Link papers from projects, tools, tips, and reference stacks only when the connection is direct.
- Convert repeated research takeaways into tips or decision-tree updates.

## Resources

- [Research papers folder](papers/)
- [SOTA benchmarks](sota-benchmarks.md)
- [Emerging techniques](emerging-techniques.md)

## Buzz & Reception

Research guide pages should be reviewed regularly because SOTA claims and active topics change quickly.

---
*Last reviewed: 2026-06-14 by @maintainer*

