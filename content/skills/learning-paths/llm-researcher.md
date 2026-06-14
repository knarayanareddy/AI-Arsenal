---
id: "llm-researcher"
title: "LLM Researcher Learning Path"
entry_type: "guide"
section: "skills"
description: "Math-heavy and paper-first path for studying model architecture, alignment, reasoning, and evaluation"
tags:
  - research
  - llm
  - reasoning
  - evaluation
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

This path is for people who want to understand and contribute to LLM research rather than only integrate tools. It emphasizes papers, math, experiments, benchmark design, and reproducibility.

## Why It's in the Arsenal

AI Arsenal is useful only if builders can turn curated tools and papers into practical skill development. This guide explains what to learn, what to build, and where to go next.

## Key Features

### Month 1: Mathematical and ML Foundations

- Linear algebra, probability, optimization, information theory basics.
- Implement a tiny neural network and transformer block.

### Month 2: Transformer Foundations

- Read [Attention Is All You Need](../../research/papers/attention-is-all-you-need.md), BERT, GPT-3, and LLaMA 3 reports.
- Watch Karpathy's transformer/GPT materials.

### Month 3: Training and Post-Training

- Study instruction tuning, RLHF, DPO, LoRA, QLoRA, and PEFT.
- Reproduce a small fine-tuning run with PEFT or torchtune.

### Month 4: Reasoning and Agents

- Study Chain-of-Thought, ReAct, Tree of Thoughts, Toolformer, DeepSeek-R1.
- Build an eval harness for reasoning tasks.

### Month 5: RAG and Evaluation

- Study RAG, HyDE, RAPTOR, GraphRAG, RAGAS, and LLM-as-a-Judge.
- Build a retrieval benchmark with a small corpus.

### Month 6: Original Project

- Choose one technique, reproduce a small result, and write a report with ablations.

## Architecture / How It Works

The path alternates between reading papers and reproducing small experiments. Every paper should produce a question: what would I measure, what would I ablate, and when would this matter in a real system?

## Getting Started

```bash
# Pick one paper and create a reproduction checklist.
# Do not start with a large model; start with a small experiment.
```

## Use Cases

1. **Scenario**: You want a structured learning path instead of a random list of links
2. **Scenario**: You are using AI Arsenal with an LLM to plan study, projects, or hiring loops
3. **Scenario**: You need to map skills to concrete projects and production practices

## Strengths

- Turns broad AI topics into sequenced milestones
- Prioritizes free and primary-source resources where possible
- Connects learning to Arsenal projects, tools, decision trees, and build examples

## Limitations / When NOT to Use

- Does not replace hands-on building and evaluation
- Resource quality and availability can change over time
- Paid resources should be treated as optional unless explicitly required by your team

## Integration Patterns

- Use the learning path as an LLM prompt context when planning a study schedule.
- Convert each milestone into one portfolio artifact or internal project.
- Pair every conceptual topic with one build example and one evaluation checklist.

## Resources

- [Must-read papers](../../research/must-read-papers.md)
- [SOTA benchmarks](../../research/sota-benchmarks.md)
- [Emerging techniques](../../research/emerging-techniques.md)
- [Hugging Face course](https://huggingface.co/learn)
- [Andrej Karpathy YouTube](https://www.youtube.com/@AndrejKarpathy)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

