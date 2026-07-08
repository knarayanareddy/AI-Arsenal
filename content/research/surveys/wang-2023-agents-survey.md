---
id: wang-2023-agents-survey
title: "A Survey on Large Language Model based Autonomous Agents"
phase: surveys
venue: other
year: 2023
authors:
  - "Wang, L."
  - "Ma, C."
  - "Feng, X."
  - "Zhang, Z."
  - "Yang, H."
  - "Zhang, J."
  - "Chen, Z."
  - "Tang, J."
  - "Chen, X."
  - "Lin, Y."
  - "Zhao, W. X."
  - "Wei, Z."
  - "Wen, J."
arxiv_id: "2308.11432"
arxiv_url: "https://arxiv.org/abs/2308.11432"
pdf_url: "https://arxiv.org/pdf/2308.11432"
code_url: "https://github.com/Paitesanshi/LLM-Agent-Survey"
venue_url: "https://link.springer.com/article/10.1007/s11704-024-40231-1"

practical_applicability: high
reproduction_status: no-code
result_status: current
has_code: true
citation_count_approx: 2500

tldr: "The reference taxonomy for LLM agents: a unified four-module framework — profile, memory, planning, action — that organizes agent construction, applications, and evaluation; the profiling/memory/planning/action vocabulary most agent frameworks now use"
key_contribution: "Proposed the unified agent-architecture decomposition (profiling module, memory module, planning module, action module) and systematically mapped the field's construction strategies, capability-acquisition approaches, applications, and evaluation methods onto it — the organizing frame for agent-system design discussions since"

builds_on:
  - "yao-2022-react"

tags:
  - "agents"
  - "planning"
  - "memory"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

This survey (first released August 2023, maintained through subsequent revisions) unifies the exploding LLM-agent literature under a four-module architecture: a profiling module defining the agent's role and attributes; a memory module (short-term context, long-term stores, retrieval/reflection operations); a planning module (with and without feedback — task decomposition, self-reflection, external planners); and an action module (tool use, embodiment, output spaces). It then surveys capability acquisition (fine-tuning vs prompting), application domains, and both subjective and objective evaluation strategies.

## Why it's in the Arsenal

- Agent frameworks in this catalog describe themselves in exactly this survey's terms — memory modules, planning strategies, tool/action spaces — making it the fastest route to a structural understanding of how agent systems differ
- Its module decomposition is a practical design rubric: specifying an agent means making a deliberate choice in each of the four modules, and the survey enumerates the option space per module

## Core Contribution

The four-module frame's value is that it is exhaustive at the right granularity: essentially every agent system — from ReAct scaffolds to generative-agent simulations to autonomous coding agents — decomposes cleanly into its cells, which turned an incoherent literature into a comparable design space. The survey also systematized planning taxonomies (single-path vs multi-path decomposition, feedback-driven refinement) and memory operations (reading, writing, reflection) that later work and framework documentation adopted directly.

## Key Results

- Organized 100+ agent systems into the profile/memory/planning/action framework with construction-strategy comparison tables (survey Section 2, 2023)
- Mapped capability-acquisition methods (fine-tuning on agent trajectories vs prompt engineering vs mechanism engineering) across the systems surveyed (2023)
- Consolidated agent evaluation into subjective (human annotation, Turing-style) and objective (task success, benchmark suites) protocols, cataloging the then-available benchmarks (2023)

## Methodology

Systematic literature organization: agent systems published roughly 2021-2024 are decomposed module-by-module, with each module's design space enumerated (e.g. memory: unified vs hybrid structure; formats; reading/writing/reflection operations) and populated by exemplar systems; applications are grouped by domain (social science, natural science, engineering); evaluation approaches are classified and their limitations noted; a maintained companion repository tracks the field.

## Practical Applicability

Its module rubric maps directly onto agent-framework configuration: choosing an agent framework means choosing what each module gives you — e.g. LangGraph exposes planning/state control, memory platforms provide the memory module, tool-calling APIs define the action space. Using the survey's decomposition when designing forces the questions that ad-hoc agent building skips: what persists across sessions (memory), how are plans revised on failure (planning with feedback), and what actions are actually available (action-space design).

## Limitations & Critiques

The field it surveys moved faster than any survey can: multi-agent orchestration, computer-use agents, and RL-trained agentic models postdate its frame, and its application/evaluation sections aged quickest as agent benchmarks professionalized (SWE-bench-class, terminal/computer-use suites). The four-module frame also under-weights what production experience later emphasized — context engineering, cost/latency budgets, and reliability engineering — treating agent design as architecture selection rather than operational discipline.

## Reproductions & Follow-up Work

Continuously maintained (v4 with journal publication in Frontiers of Computer Science, 2024) with an actively updated companion repository; its vocabulary structures subsequent surveys (multi-agent, tool-learning, agentic-RL) and the conceptual sections of agent-framework documentation. It remains the default first citation for the agent-architecture literature.

## Relation to the Arsenal

Provides the organizing frame for this catalog's agent coverage: the systems in projects/agent-systems/ differ precisely along its four modules; `packer-2023-memgpt` and `ji-2026-mragent` (retrieval-and-memory/) elaborate its memory module; `yao-2022-react`, `shinn-2023-reflexion`, and `wang-2023-voyager` (agents-and-reasoning/) are canonical planning/action instances; and content/skills/applied/agent-design.md applies the same decomposition prescriptively.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2308.11432)
- [arXiv](https://arxiv.org/abs/2308.11432)
- [Code](https://github.com/Paitesanshi/LLM-Agent-Survey)
- [Venue](https://link.springer.com/article/10.1007/s11704-024-40231-1)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
