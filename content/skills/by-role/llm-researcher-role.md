---
id: "llm-researcher-role"
title: "LLM Researcher — Role Overview"
entry_type: "guide"
section: "skills"
description: "Role overview mapping the applied LLM researcher job to the Arsenal's paper track, benchmarks, and eval content"
tags:
  - llm
  - training
  - evaluation
  - benchmark
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The applied LLM Researcher reads, reproduces, and extends the research that production systems are built on — post-training methods, retrieval variants, evaluation science. This page routes that job to the Arsenal's paper collection, benchmark entries, and the research-oriented learning path.

## Why It's in the Arsenal

Research skill in industry is mostly *triage*: knowing which papers change practice, reproducing claims before adopting them, and translating results into engineering decisions. The Arsenal's curated paper entries — with honest supersession notes — are built for exactly that.

## Key Features

- Maps the role to the LLM Researcher learning path plus a primary-source reading sequence.
- Routes benchmark literacy to cataloged benchmark entries instead of leaderboard folklore.
- Emphasizes reproduction and eval design as the core applied-research skills.

## Architecture / How It Works

Applied researchers sit upstream of ML and AI engineers: they validate methods (a new tuning technique, a retrieval variant) and hand engineering-ready conclusions downstream. Their interface to the rest of the org is evals — a claim without a measurable eval does not transfer.

## Getting Started

1. **Read the spine** — the foundational sequence: [Attention Is All You Need](../../research/foundational/vaswani-2017-attention.md) → [GPT-3](../../research/foundational/brown-2020-gpt3.md) → [InstructGPT](../../research/training-and-alignment/ouyang-2022-instructgpt.md) → [DeepSeek-R1](../../research/training-and-alignment/deepseek-ai-2025-r1.md).
2. **Reproduce one result** — pick a method paper ([DPO](../../research/training-and-alignment/rafailov-2023-dpo.md), [RAPTOR](../../research/retrieval-and-memory/sarthi-2024-raptor.md)) and reproduce its headline claim at small scale.
3. **Build the eval** — encode the claim as a task eval per [Evaluation Methodology](../core-concepts/evaluation-methodology.md) so the finding transfers to engineering.

## Use Cases

1. **Scenario**: An engineer moving toward research-adjacent work on a model or platform team.
2. **Scenario**: Deciding whether a hyped paper should change your team's architecture.
3. **Scenario**: Building internal benchmarks that survive contamination and leaderboard gaming.

## Strengths

- Primary-source routing with supersession honesty (the Arsenal flags when papers no longer reflect practice).
- Reproduction-first framing keeps research grounded in evidence.
- Connects research output to the eval interface engineering actually consumes.

## Limitations / When NOT to Use

- Not a frontier-lab research curriculum; the focus is applied triage and reproduction.
- Paper relevance decays quickly — check each entry's supersession notes before investing.

## Integration Patterns

- Start with the [LLM Researcher learning path](../learning-paths/llm-researcher.md).
- Ground concepts with [Attention](../core-concepts/attention.md), [Alignment & RLHF](../core-concepts/alignment-and-rlhf.md), and [Fine-Tuning Methods](../core-concepts/fine-tuning-methods.md).
- Track fresh work through the research vertical's paper entries rather than raw arXiv volume.

## Resources

- [LLM Researcher learning path](../learning-paths/llm-researcher.md)
- [Attention Is All You Need](../../research/foundational/vaswani-2017-attention.md)
- [DeepSeek-R1 paper](../../research/training-and-alignment/deepseek-ai-2025-r1.md)
- [LLM-as-a-judge paper](../../research/evaluation-and-safety/zheng-2023-llm-as-a-judge.md)
- [Research platform reference stack](../../architectures/reference-stacks/research-platform.md)

## Buzz & Reception

Role-based routing is evergreen; review quarterly as the learning paths and tool landscape change.

---
*Last reviewed: 2026-07-07 by @maintainer*
