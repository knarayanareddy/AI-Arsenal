---
id: agent-memory-techniques
name: Agent_Memory_Techniques
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Thirty executable notebooks that rebuild one chat assistant on progressively richer memory backends, then score them against the LoCoMo benchmark"
github_url: "https://github.com/NirDiamant/Agent_Memory_Techniques"
license: Apache-2.0
primary_language: Other
tags: [memory, rag, graphs]
maturity: alpha
cost_model: open-source
github_stars: 1079
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-21"
docs_url: "https://diamantai.substack.com/"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Lets you compare memory designs side by side on one agent instead of trusting a single vendor's numbers."
best_for:
  - "You are choosing a memory backend for a long-running support agent and need measured recall before you commit."
  - "You are writing a design doc on agent memory and want runnable code for the buffer, vector, and graph approaches to attach."
  - "You are onboarding engineers who have never implemented context paging and want a path from a naive buffer to a MemGPT-style setup."
avoid_if:
  - "You are shipping an agent this quarter and need a memory service with an on-call rotation behind it."
  - "You are working air-gapped, because several notebooks call hosted embedding endpoints to build their vector index."
  - "You are looking for one blessed memory design, since the repository exists to show competing implementations side by side."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1079, Apache-2.0, Jupyter Notebook, last commit 2026-09-21, topics. From README: 30 notebooks, learning paths, decision tree, LoCoMo section. Notebook internals and any recall figures were not read or executed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The repository is a curriculum, not a library: an all_techniques directory holds one numbered notebook per pattern, starting at 01_conversation_buffer_memory and climbing through sliding-window truncation, vector-store recall, episodic versus semantic separation, working memory, and the MemGPT-style paging loop where context is treated as a scarce resource that gets evicted and reloaded. Later notebooks wrap hosted and open memory services, and a LoCoMo section scores the built systems on question-answering recall over long multi-session conversations. Learning paths and a decision-tree diagram in the README exist because the notebook order encodes a real escalation: add structure only when the simpler version measurably fails.

## Why it's in the Arsenal

The recurring decision it forces you to make is how much conversation to keep verbatim and how to find the part of it that matters next turn. Every notebook implements the same question-answering loop against a different memory substrate, so the marginal cost of moving from a truncated buffer to an embedding index is visible as recall delta and as token-per-turn overhead rather than as an abstract architecture claim.

## Architecture

There is no shared runtime to learn: each notebook is self-contained and defines its own chat loop, so the comparison is between designs rather than between APIs. The vector-store notebooks embed message or document chunks, write them to an index, and retrieve by similarity at answer time; the knowledge-graph notebooks build entities and relations in a graph store and traverse it on recall; the MemGPT-style notebooks implement explicit paging where a controller decides what to evict. That inconsistency is the teaching device - it makes each memory contract visible instead of hiding it behind one abstraction.

## Ecosystem Position

The collection sits above rather than beside Mem0, Zep, Letta, and Graphiti: instead of shipping another memory server, it wraps each one in a notebook so you can read the calling convention each one expects. Compared with LangChain's and LlamaIndex's own memory abstractions, it does not compete on the store, the retrieval, or the agent loop; it isolates them in one place so you can see what a memory provider actually costs in tokens and latency. Every provider in the set is exercised against the same scripted conversation, so a swap is a config change and the comparison is a benchmark you can rerun rather than a claim on a leaderboard.

## Getting Started

Clone the repository, create an isolated environment, and run the notebooks in order. Python 3.10 or newer and Jupyter are the stated requirements.

```bash
git clone https://github.com/NirDiamant/Agent_Memory_Techniques.git
cd Agent_Memory_Techniques
python -m venv .venv && source .venv/bin/activate
pip install jupyter langchain chromadb openai python-dotenv
jupyter lab
```

Then open all_techniques/01_conversation_buffer_memory first, or jump straight to the technique your agent needs.

## Key Use Cases

1. Prototype a memory strategy: build notebook 01, measure where recall breaks, then escalate only to the pattern that fixes it.
2. Justify an architecture choice: paste two notebook outputs into a design review to show the recall-versus-token tradeoff on your own transcript.
3. Onboard a team: run the learning path as a workshop so everyone shares one vocabulary for eviction, retrieval, and evidence.

## Strengths

- Every pattern is executable code, so claims about a memory design can be rerun against your own transcripts.
- Covers the full escalation from a truncated buffer to graph-backed memory instead of endorsing one vendor.
- Includes benchmark scoring rather than stopping at a qualitative description of each approach.
- Learning paths and a decision tree cut the time it takes to find the one notebook relevant to your stack.

## Limitations

Notebooks drift against upstream packages: LangChain, Mem0, and Zep APIs move quickly and older cells in the collection will break without edits. Many notebooks require paid hosted embedding or chat APIs, so the headline recall numbers are not reproducible on a laptop without keys, and results also depend heavily on the chunking and embedding model you choose rather than on the memory architecture itself. There is no packaging, no tests, and no maintenance commitment, which makes this teaching material rather than something to vendor into a production service.

## Relation to the Arsenal

This is a framework-phase entry that documents the memory substrate rather than supplying one. For the frameworks you would bolt a chosen memory pattern onto, see the sibling content/projects/frameworks entries; for the vector and graph stores the notebooks call, look at content/projects/data-and-retrieval; for the agent runtimes that own the loop around memory, content/projects/inference-engines covers what happens once context is assembled.

## Resources

- [Repository and notebook index](https://github.com/NirDiamant/Agent_Memory_Techniques)
- [All technique notebooks](https://github.com/NirDiamant/Agent_Memory_Techniques/tree/main/all_techniques)
- [Author's course companion site](https://www.diamant-ai.com/courses)
