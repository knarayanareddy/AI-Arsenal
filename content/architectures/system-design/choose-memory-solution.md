---
id: "choose-memory-solution"
title: "Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic"
category: "system-design"
decision_type: "composition"
decision_summary: "Choose the simplest memory layer that solves your actual continuity problem — session state for one conversation, summaries for long sessions, and semantic/dedicated memory only once personalization is a validated need."
tags:
  - agents
  - memory
  - embeddings
  - retrieval

approaches:
  - name: "Context-Window / Session State"
    description: "Pass prior conversation turns directly in the prompt; memory exists only as long as the context window holds it. No storage layer beyond the request itself."
    when_to_use:
      - "The interaction is a single session and does not need to persist after the request completes"
      - "Conversation length stays well within the model's context window (roughly under a few thousand tokens of history for cost/latency reasons, independent of the model's technical maximum)"
      - "There is no product requirement to recall anything across sessions"
    when_not_to_use:
      - "The conversation regularly exceeds a comfortable fraction of the context window, inflating cost and risking degraded attention over long contexts"
      - "Users expect the system to remember them across separate sessions"
    tradeoffs:
      cost: "Token cost grows linearly with conversation length; no storage cost."
      latency: "No additional round-trip; the full history is already in the prompt."
      complexity: "Lowest of all approaches — no infrastructure beyond the LLM call itself."
      data-requirements: "None beyond the current session's messages."

  - name: "Rolling Summaries"
    description: "Periodically compress older conversation turns into a shorter summary, keeping only the summary plus recent raw turns in the active context."
    when_to_use:
      - "A single session runs long enough to threaten the context budget but does not need to persist after the session ends"
      - "Losing some fine-grained detail from early in the conversation is an acceptable tradeoff for staying within budget"
    when_not_to_use:
      - "Exact wording or specific early details must be recoverable verbatim — summarization is lossy by construction"
      - "Memory needs to survive across sessions, not just within one long session"
    tradeoffs:
      cost: "Adds one extra LLM call per summarization pass, offset by lower per-turn token cost afterward."
      latency: "Summarization passes add periodic latency spikes, not a per-turn cost."
      accuracy: "Lossy — summarization can drop or subtly distort details from earlier turns; validate against your actual failure cases before relying on it for anything safety-critical."
      complexity: "Low-to-medium — requires a summarization trigger policy (turn count, token count, or time-based) and prompt design for the summarization step itself."

  - name: "Vector/Semantic Memory (DIY or Mem0/Zep)"
    description: "Store extracted facts or embeddings from past interactions in a vector store (or a dedicated memory product like Mem0 or Zep), retrieved by semantic similarity to the current query rather than kept in full in context."
    when_to_use:
      - "Personalization or long-term recall across many sessions is a real, validated product requirement, not a speculative nice-to-have"
      - "The volume of historical facts per user is large enough that keeping everything in context is infeasible"
      - "You want semantic (fuzzy) recall rather than exact structured lookup — e.g. 'what does this user generally prefer,' not 'what is this user's account ID'"
    when_not_to_use:
      - "The facts you need to remember are structured and small (preferences, settings, account info) — relational storage is simpler and more precise than semantic search for this"
      - "You have not yet validated that users actually benefit from cross-session recall — building this speculatively is a common overinvestment (see Common Mistakes)"
    tradeoffs:
      cost: "Embedding and storage costs scale with the number of facts retained per user; a dedicated memory product (Mem0/Zep) adds a subscription or usage-based cost on top of the underlying vector store."
      latency: "Adds a retrieval round-trip before generation, same class of cost as RAG retrieval."
      complexity: "Highest of the three approaches — requires fact extraction, storage, retrieval, and a retention/deletion policy (data governance, not just infrastructure)."
      data-requirements: "Requires enough historical interaction volume per user for semantic recall to be worth the infrastructure; thin on data, thin on payoff."

  - name: "Relational / Structured Memory"
    description: "Store explicit, structured facts (preferences, settings, account state) in a conventional database, retrieved by exact lookup rather than semantic search."
    when_to_use:
      - "The facts to remember have a clear schema (a preference, a setting, a fact with a defined field) rather than being fuzzy or narrative"
      - "Precision matters more than recall — you need the exact stored value, not 'something similar to'"
    when_not_to_use:
      - "The information is unstructured or narrative (things the user said, not things the user set)"
    tradeoffs:
      cost: "Lowest of the persistent options — ordinary database storage and query cost, no embedding cost."
      accuracy: "Highest precision of any approach for the specific facts it stores, since it is exact lookup, not similarity search."
      complexity: "Low — this is a standard schema-and-CRUD problem, not a novel memory architecture."

key_factors:
  - "Session boundary: does memory need to survive after this session ends, or only within it?"
  - "Fact structure: is what you need to remember a structured field (preference, setting) or fuzzy/narrative (something the user said)?"
  - "Volume per user: a handful of facts fits in a relational row; hundreds of interaction-derived facts justify semantic search infrastructure"
  - "Validated need: has cross-session personalization been shown to matter to users, or is it speculative?"
  - "Governance requirement: does the data need explicit retention limits, deletion on request, or audit trails? This affects every persistent option but is often skipped in early design"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["What memory is needed?"] --> Scope{"Does it need to survive past this session?"}
      Scope -->|"No, only within the current chat"| Length{"Will conversation length threaten the context budget?"}
      Length -->|"No"| Window["Use context-window/session state — no extra infrastructure"]
      Length -->|"Yes"| Summary["Use rolling summaries"]
      Scope -->|"Yes, across sessions"| Structure{"Is the information structured (settings, preferences) or fuzzy/narrative?"}
      Structure -->|"Structured"| Relational["Use relational/structured storage"]
      Structure -->|"Fuzzy/narrative"| Validated{"Has cross-session recall been validated as a real product need?"}
      Validated -->|"No, still speculative"| DeferBuild["Defer — instrument usage first, do not build semantic memory speculatively"]
      Validated -->|"Yes"| Volume{"Enough historical volume per user to justify infrastructure?"}
      Volume -->|"No"| Relational
      Volume -->|"Yes"| Semantic["Use vector/semantic memory (DIY vector store, or Mem0/Zep for a managed abstraction)"]

confidence: "context-dependent"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Vector/Semantic Memory (DIY or Mem0/Zep)"
    tool_ids:
      - mem0
      - zep
      - letta
      - redis-memory
    project_ids:
      - qdrant
      - pgvector
    build_example_ids: []

related_decisions:
  - choose-vector-db
  - rag-vs-fine-tuning

common_mistakes:
  - "Building semantic/vector memory before validating that cross-session personalization actually matters to users — this is the single most common overinvestment in agent memory architecture, and it is expensive to build and expensive to govern (retention, deletion, privacy) for a feature nobody asked for."
  - "Using Redis as the sole durable memory store: Redis is excellent for fast operational state (caches, queues, session data) but is not designed as the only copy of durable, must-not-lose memory — pair it with a durable database if the data must survive a cache eviction or restart."
  - "Storing everything in a vector store because it is available, including data that is actually structured (preferences, settings) and would be both cheaper and more precise as ordinary relational rows with exact lookup."
  - "Skipping a retention/deletion policy until a compliance or privacy incident forces the issue — memory that persists across sessions is a data-governance surface from day one, not an afterthought to add before a security review."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Agent memory is easy to overbuild. The core discipline this decision requires is choosing the simplest memory layer that actually solves the continuity problem you have — most systems need far less persistent memory than teams initially assume, and unvalidated semantic/long-term memory is one of the more common sources of wasted engineering effort and unnecessary data-governance risk in agent systems.

## The Decision

Separate memory needs along two axes before choosing an implementation: (1) does this need to survive past the current session, and (2) is the information structured (a setting, a preference — exact lookup) or fuzzy/narrative (something the user said or implied — semantic recall). Most memory architecture mistakes come from skipping this classification and defaulting to the most sophisticated option (vector/semantic memory) for problems that a simpler layer would solve more cheaply and more precisely.

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic. In prose: start by asking whether memory needs to outlive the current session at all — if not, plain context-window state is sufficient unless conversation length threatens the token budget, in which case rolling summaries buy headroom at the cost of losing some fine-grained detail. If memory does need to survive across sessions, classify the information: structured facts (settings, preferences, account state) belong in a relational store with exact lookup, which is both cheaper and more precise than semantic search for this kind of data. Fuzzy or narrative information (things the user said, implied preferences inferred from behavior) is the only case that plausibly justifies vector/semantic memory — but even here, first confirm that cross-session personalization has been validated as something users actually benefit from, since this is the step teams most often skip.

| Dimension | Context-Window | Rolling Summaries | Relational | Vector/Semantic (DIY or Mem0/Zep) |
|---|---|---|---|---|
| Survives past session | No | No (within one long session only) | Yes | Yes |
| Precision | N/A (raw text) | Lossy | Exact | Fuzzy/approximate |
| Infrastructure complexity | None | Low-medium | Low | Highest |
| Best for | Short single-session chat | Long single-session chat | Structured facts | Validated cross-session personalization |

## Approach Deep-Dives

**Context-window state** requires no additional infrastructure and is the correct default whenever memory doesn't need to outlive the current request. **Rolling summaries** extend a single session's effective length by periodically compressing older turns, at the cost of losing exact recall of early details — validate this loss against your actual failure modes rather than assuming it is harmless. **Relational/structured memory** is the most underused option in this decision space: teams frequently reach for semantic search when the actual data (a user's stated preference, a setting) would be both cheaper and more precisely retrieved from an ordinary database row. **Vector/semantic memory**, whether built directly on a vector store like [Qdrant](../../projects/data-and-retrieval/qdrant.md) or [pgvector](../../projects/data-and-retrieval/pgvector.md), or via a dedicated abstraction like [Mem0](../../tools/orchestration/mem0.md) or [Zep](../../tools/orchestration/zep.md), is the right tool only once cross-session, fuzzy recall has been validated as a genuine product need — [Letta](../../tools/orchestration/letta.md) additionally targets memory-first agent runtimes specifically, for teams building an agent framework around persistent state as a first-class concept rather than bolting memory onto an existing agent loop. [Redis](../../tools/orchestration/redis-memory.md) belongs in this picture as fast operational state (caches, session data, queues) rather than as the sole durable memory store.

## Common Mistakes

- **Building semantic/vector memory before validating the need.** This is the most common and most expensive overinvestment in this decision space — both the engineering cost and the ongoing data-governance burden are real, for a feature that may not move any user-facing metric.
- **Using Redis as the only durable memory store.** It excels at fast operational state but is not designed to be the single copy of must-not-lose data.
- **Storing structured data in a vector store out of convenience.** Preferences and settings are cheaper and more precisely retrieved from a relational row than from similarity search.
- **Deferring retention/deletion policy design.** Cross-session memory is a data-governance surface from the moment it exists, not something to retrofit before a compliance review.

## When This Guidance Might Be Outdated

Confidence here is rated `context-dependent` rather than `established` because the right answer genuinely varies by product, and because dedicated memory-abstraction products (Mem0, Zep, Letta) are still maturing rapidly — a product landscape check every 6 months is reasonable, since new entrants or feature changes in this specific tool category could shift which approach is the pragmatic default for "I need semantic memory but don't want to build it myself."

## Related Decisions

Vector database choice ([Choose a Vector Database](../data-strategy/choose-vector-db.md)) is a direct downstream decision once vector/semantic memory is chosen. This decision also interacts with [RAG vs Fine-Tuning](./rag-vs-fine-tuning.md): both RAG and semantic memory retrieve context by similarity search, but RAG retrieves from a static/slow-changing corpus while memory retrieves from an ever-growing, per-user interaction history — the infrastructure looks similar but the data lifecycle and governance requirements differ substantially.

## Resources

- [Mem0](../../tools/orchestration/mem0.md)
- [Zep](../../tools/orchestration/zep.md)
- [Letta](../../tools/orchestration/letta.md)
- [Redis](../../tools/orchestration/redis-memory.md)
- [Qdrant](../../projects/data-and-retrieval/qdrant.md)
- [pgvector](../../projects/data-and-retrieval/pgvector.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
