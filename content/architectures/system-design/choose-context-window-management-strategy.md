---
id: "choose-context-window-management-strategy"
title: "Managing a Growing Context Window: Truncation, Summarization, or Retrieval Offload"
category: "system-design"
decision_type: "progressive"
decision_summary: "Truncate when recency is what matters; summarize/compact when older content still carries information you cannot lose; offload to retrieval when the material is large, reusable, and only sometimes relevant."
tags:
  - llm
  - rag
  - memory
  - agents

approaches:
  - name: "Truncation / Sliding Window"
    description: "Keep the most recent tokens (and any pinned system content) and drop the oldest once the context approaches the window limit."
    when_to_use:
      - "Conversations or logs where recent turns dominate and old turns rarely matter — chat UIs, tail-focused monitoring"
      - "You need a bounded, predictable cost and latency per call and can tolerate losing old detail"
    when_not_to_use:
      - "Early content carries constraints the model must keep honoring (the user's original goal, a spec stated once at the top)"
      - "Agents whose earlier steps hold decisions the later steps depend on — silent truncation causes them to forget their own plan"
    tradeoffs:
      complexity: "Lowest — a token-count check and a drop rule."
      cost: "Bounded and predictable — the window is capped."
      accuracy: "Loses anything outside the window with no recovery path; the model cannot know what it forgot."
      latency: "Best — no extra model calls, smaller prompts."

  - name: "Summarization / Compaction"
    description: "Periodically compress older context into a running summary (or structured state) that stays in the prompt, so information survives in condensed form rather than being dropped."
    when_to_use:
      - "Long conversations or agent runs where older content still matters but not at full fidelity"
      - "You can afford occasional compaction calls to keep the working context small while retaining the gist"
    when_not_to_use:
      - "Exact details matter and cannot survive lossy compression (precise numbers, verbatim quotes, legal text)"
      - "Latency-critical single-shot calls where an extra summarization round-trip is unacceptable"
    tradeoffs:
      accuracy: "Retains the gist across a long horizon, but compression is lossy and can drop details or introduce summary errors that compound."
      cost: "Adds periodic summarization calls; net cost can still drop by shrinking every subsequent prompt."
      complexity: "Moderate — a compaction trigger, a summary store, and prompt assembly logic."
      latency: "Occasional compaction spikes; steady-state prompts stay small."

  - name: "Retrieval Offload (RAG over History/Documents)"
    description: "Store the full material outside the prompt (vector store, database, files) and retrieve only the relevant pieces per turn, so the window holds a small task-relevant slice of a large corpus."
    when_to_use:
      - "The material is large, reusable across sessions, and only a fraction is relevant to any one turn (knowledge bases, long document sets, long-term agent memory)"
      - "You need to cite or ground answers in specific source passages rather than a lossy summary"
    when_not_to_use:
      - "Small, always-relevant context that fits comfortably — adding a retrieval stage is needless complexity"
      - "Tasks needing holistic reasoning over the entire corpus at once, which retrieval's per-turn slicing fragments"
    tradeoffs:
      scalability: "Scales to corpora far larger than any context window by keeping only a slice in the prompt."
      complexity: "Highest — an indexing/retrieval pipeline and its own recall/precision failure modes."
      accuracy: "Grounded and citable when retrieval is good; a retrieval miss silently starves the model of context."
      latency: "Adds a retrieval step per turn, usually small relative to generation."

key_factors:
  - "Does old content still matter? Recency-dominant tasks tolerate truncation; constraint-bearing history needs summarization or retrieval"
  - "Fidelity required: lossy summaries are fine for gist, unacceptable for exact figures or verbatim text"
  - "Corpus size and reuse: large, reusable, sparsely-relevant material belongs outside the prompt in retrieval, not compressed into it"
  - "Latency and cost shape: truncation is cheapest per call; summarization trades periodic calls for smaller steady-state prompts; retrieval adds a per-turn lookup"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Context approaching the window limit"] --> Old{"Does older content still matter?"}
      Old -->|"No, recency dominates"| Trunc["Truncation / sliding window"]
      Old -->|"Yes"| Fidelity{"Need exact detail or only the gist?"}
      Fidelity -->|"Gist is enough"| Size1{"Large, reusable corpus?"}
      Fidelity -->|"Exact detail required"| Size2{"Large, reusable corpus?"}
      Size1 -->|"No"| Summ["Summarization / compaction"]
      Size1 -->|"Yes"| Ret1["Retrieval offload"]
      Size2 -->|"Yes"| Ret2["Retrieval offload (citable passages)"]
      Size2 -->|"No"| Both["Keep verbatim in-window; combine with light summarization of the rest"]

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Truncation / Sliding Window"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Summarization / Compaction"
    project_ids:
      - langchain
    tool_ids: []
    build_example_ids: []
  - approach_name: "Retrieval Offload (RAG over History/Documents)"
    project_ids:
      - llamaindex
      - haystack
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-memory-solution
  - rag-vs-fine-tuning
  - choose-chunking-strategy

common_mistakes:
  - "Treating a bigger context window as a substitute for management — even large windows degrade on 'lost in the middle' retrieval and cost scales with tokens, so unbounded stuffing is a cost and quality problem, not a solution."
  - "Silent truncation that drops the user's original instruction — pin durable constraints (system goal, spec) so the window-management rule never evicts them."
  - "Summarizing exact-detail content — compressing precise figures or verbatim text into a gist and then reasoning over the gist introduces errors that look like model mistakes."
  - "Reaching for retrieval on small, always-relevant context — the indexing pipeline and retrieval-miss failure mode are pure overhead when the content fits in the window anyway."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Every stateful LLM system eventually produces more context than fits — long conversations, multi-step agent runs, large document sets. How you decide what to keep in the prompt is a first-order design choice, because it sets the ceiling on both cost (tokens per call) and quality (what the model can actually see). The three strategies are not mutually exclusive, but they answer different questions: truncation asks "what is recent?", summarization asks "what is the gist?", and retrieval asks "what is relevant right now?" Most mature systems combine them.

## The Decision

Start from whether older content still matters. If recency dominates — a support chat where the last few turns carry the intent — truncation is the right, cheapest answer, provided you pin the durable constraints so they are never evicted. If older content still carries information, the next question is fidelity: gist-level information survives summarization, but exact figures and verbatim text do not, and reasoning over a lossy summary produces errors that masquerade as model failures. When the material is large, reusable across sessions, and only sometimes relevant, move it out of the prompt entirely and retrieve the relevant slice per turn — that is the only approach that scales past the window at all, at the cost of a retrieval pipeline and its own miss modes.

## Decision Framework

| Situation | Recommended approach | Canonical entries |
|---|---|---|
| Recency dominates, old turns disposable | Truncation / sliding window | — |
| Old content matters, gist suffices | Summarization / compaction | [LangChain](../../projects/frameworks/langchain.md) |
| Large, reusable, sparsely-relevant corpus | Retrieval offload | [LlamaIndex](../../projects/frameworks/llamaindex.md), [Haystack](../../projects/frameworks/haystack.md) |
| Long-term agent memory | Retrieval + memory layer | [Choosing a Memory Solution](./choose-memory-solution.md) |

The frontmatter decision tree encodes the branching: relevance of old content first, then fidelity, then corpus size and reuse.

## Approach Deep-Dives

**Truncation** wins on simplicity and predictable cost, and its failure mode is entirely about what falls off the edge. The discipline that makes it safe is pinning: the system goal and any once-stated constraints must be exempt from the drop rule, or the model will confidently forget its own instructions.

**Summarization/compaction** keeps a long horizon in a small prompt by trading fidelity for reach. It shines for conversational gist and agent-run history, but compression errors compound — a detail dropped in summary N is gone for every turn after, and a wrong summary is treated as fact. Trigger compaction on a token threshold and keep the summary auditable.

**Retrieval offload** is the only strategy that scales to corpora larger than the window, because it never tries to fit everything in — it fits the relevant slice. It brings RAG's full toolbox and RAG's full failure surface: a retrieval miss silently starves the model, and holistic "reason over everything" tasks fragment when sliced. It is also the natural substrate for long-term agent memory.

## Common Mistakes

- **Assuming a bigger window removes the problem** — quality degrades in the middle of long contexts and cost scales with tokens.
- **Evicting the user's original instruction** via naive truncation — pin durable constraints.
- **Summarizing content that needs exact fidelity** — precise numbers and verbatim text do not survive compression.
- **Adding retrieval to small, always-relevant context** — needless pipeline and a new failure mode.

## When This Guidance Might Be Outdated

Rated `emerging-consensus`: the three levers are stable, but the boundaries move with model capability. Longer, cheaper context windows keep raising the size at which truncation or summarization stays viable before retrieval is worth its complexity, and better long-context attention narrows the "lost in the middle" penalty. Re-check where your models' effective (not advertised) context quality drops off before deciding a given approach is unnecessary.

## Related Decisions

Context-window management is the mechanical layer beneath [Choosing a Memory Solution](./choose-memory-solution.md), overlaps [RAG vs. Fine-Tuning](./rag-vs-fine-tuning.md) when the question is how to get knowledge into the model, and depends on [Choosing a Chunking Strategy](../data-strategy/choose-chunking-strategy.md) whenever the offload path is retrieval.

## Resources

- [LangChain](../../projects/frameworks/langchain.md)
- [LlamaIndex](../../projects/frameworks/llamaindex.md)
- [Haystack](../../projects/frameworks/haystack.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
