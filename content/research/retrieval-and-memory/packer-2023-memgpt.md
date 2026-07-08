---
id: packer-2023-memgpt
title: "MemGPT: Towards LLMs as Operating Systems"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2023
authors:
  - "Packer, C."
  - "Wooders, S."
  - "Lin, K."
  - "Fang, V."
  - "Patil, S. G."
  - "Gonzalez, J. E."
arxiv_id: "2310.08560"
arxiv_url: "https://arxiv.org/abs/2310.08560"
pdf_url: "https://arxiv.org/pdf/2310.08560"
code_url: "https://github.com/letta-ai/letta"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 600

tldr: "Framed context-window management as an OS problem: the LLM manages its own memory hierarchy via self-editing function calls, paging information between in-context 'main memory' and external storage — the founding pattern of agent memory systems"
key_contribution: "Virtual context management — an LLM given tools to edit its own core memory, page conversation history to external storage, and retrieve on demand, with interrupts and self-directed control flow — establishing the agentic-memory design pattern that products (Letta, and memory layers generally) industrialized"

builds_on:
  - "vaswani-2017-attention"
implemented_in:
  - "letta"

tags:
  - "memory"
  - "agents"
  - "rag"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

MemGPT observed that fixed context windows make long-running conversations and large-document tasks structurally impossible, and borrowed the answer from operating systems: give the LLM a memory hierarchy — a small always-in-context core memory it can edit via function calls, plus external recall/archival storage it pages data into and out of — with an event loop and interrupts for control flow. The agent decides what to remember, revise, and retrieve, making effectively unbounded memory usable through a bounded window.

## Why it's in the Arsenal

- Agent memory is a first-class engineering problem in every long-running agent this catalog covers, and MemGPT is the paper that named the design space: self-editing memory, memory tiers, paging via tool calls — the vocabulary of `letta`, `mem0`, `zep`, and `graphiti` design docs
- The OS analogy (main memory vs external storage, interrupts) remains the clearest mental model for reasoning about what belongs in-context versus retrieved

## Core Contribution

The self-managed memory hierarchy as an agent design pattern: memory operations (core_memory_append/replace, archival insert/search, conversation search) exposed as ordinary tool calls so the model itself performs memory management, guided by warnings as context pressure grows (the 'memory pressure interrupt'). This inverted the then-dominant framing of memory as an external RAG pipeline bolted around the model, and it is the inversion that agent-memory products adopted.

## Key Results

- On deep-memory-retrieval and conversation-opener tasks over multi-session dialogue, MemGPT substantially outperformed fixed-context baselines including recursive-summarization approaches (paper Section 4, 2023)
- On document QA over corpora far exceeding the context window, MemGPT with paged retrieval matched or beat truncation and retrieval-augmented fixed-context baselines as document count scaled (2023)
- Nested key-value retrieval tasks showed self-directed multi-hop memory access that fixed-context agents could not perform (2023)

## Methodology

A tiered memory: main context (system instructions + editable core memory + FIFO message queue) and external context (recall storage for full history, archival storage as a vector DB). The LLM operates in an event loop, emitting function calls for memory edits, searches, and pagination; a queue manager evicts messages to recall storage under pressure, inserting summaries and warnings. Evaluated on multi-session consistency benchmarks and scaled document-analysis QA against fixed-context and summarization baselines.

## Practical Applicability

The pattern, not the artifact, is what you deploy: production agent-memory systems (Letta — the paper's own successor — plus mem0, Zep, and the memory features in agent frameworks) all implement recognizable variants of core-memory + archival tiers with model-driven writes. When designing a long-running agent, MemGPT's decomposition remains the right checklist: what is always in-context and editable, what is retrievable, who decides writes, and how is memory pressure signaled — with the known caveat that model-driven memory writes need evaluation, since models both over-write trivia and miss salient facts.

## Limitations & Critiques

Self-managed memory inherits the model's judgment: the paper's own error analysis notes weaker models mismanage memory functions, and reliably deciding what is worth storing remains unsolved — production systems often add heuristic or learned write policies rather than trusting the agent fully. The evaluations are narrow (synthetic retrieval tasks, two domains) and predate rigorous long-horizon agent benchmarks; and expanding effective memory via paging costs tokens and latency per hop, a real trade against simply using a long-context model for mid-sized tasks.

## Reproductions & Follow-up Work

The project became Letta, an open agent platform with persistent memory as its core primitive; the memory-tier pattern reappears across `mem0`, `zep`/`graphiti` (temporal knowledge graphs), and agent-framework memory modules. Academic follow-ups on agentic memory (e.g. memory benchmarks like LoCoMo, and graph-structured agent memory such as MRAgent) treat MemGPT as the canonical baseline.

## Relation to the Arsenal

The founding paper for the agent-memory sub-area this catalog covers through `letta`, `mem0`, `zep`, `graphiti`, and `cognee` (projects/data-and-retrieval and agent-systems); complements retrieval-centric entries (`karpukhin-2020-dpr`, `edge-2024-graphrag`) by moving the write path, not just the read path, under model control. See also `ji-2026-mragent` (same phase) for a recent graph-memory successor.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2310.08560)
- [arXiv](https://arxiv.org/abs/2310.08560)
- [Code](https://github.com/letta-ai/letta)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
