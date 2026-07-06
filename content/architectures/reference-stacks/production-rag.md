---
id: "production-rag"
title: "Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost"
category: "reference-stacks"
decision_type: "progressive"
decision_summary: "Adopt the production RAG stack (first-class ingestion, evaluation, and observability from day one) once you have real users and need source attribution, regression testing, or measurable quality — not for a first prototype."
tags:
  - rag
  - retrieval
  - evaluation
  - observability

approaches:
  - name: "Production RAG Stack"
    description: "A production-shaped RAG stack (FastAPI, a RAG framework, dedicated document processing, a production vector DB, evaluation via RAGAS/Phoenix, and observability via Langfuse/Phoenix) that separates ingestion, retrieval, generation, evaluation, and observability into distinct, independently scalable layers."
    when_to_use:
      - "Deploying document Q&A to real users, where reliability and answer quality both matter"
      - "Building an internal knowledge assistant with measurable quality requirements, not just a demo"
      - "The RAG app must support source attribution and regression testing before shipping changes to retrieval, chunking, or prompts"
    when_not_to_use:
      - "There is no stable document corpus yet — building production ingestion infrastructure before the corpus is stable means rebuilding it once it changes"
      - "The need is a simple FAQ bot with a small, static set of answers — this stack's ingestion/eval/observability layers are unjustified overhead for that scope"
      - "The team has no capacity to operate evals, tracing, or ingestion pipelines — adopting this stack without that capacity means the layers exist but don't get used, which is worse than not having them and knowing it"
    tradeoffs:
      cost: "$20-$100/month at hobbyist scale, $300-$2,000/month at small-startup scale, $2,000+ at real scale — driven by inference, vector DB, reranking, and observability/eval trace volume."
      complexity: "Higher than the lean MVP stack by design — ingestion is treated as a first-class system (not a script), and eval/observability are present from day one rather than bolted on later."
      reliability: "Regression testing via a golden eval set (RAGAS) before shipping retrieval/prompt changes is a real reliability property this stack provides that the lean stack does not."

  - name: "Lean MVP Stack (see Lean MVP Stack entry)"
    description: "A minimal RAG setup (Gradio/Streamlit, hosted model or Ollama, LlamaIndex, Chroma) without dedicated ingestion infrastructure, evaluation harness, or production observability — appropriate before product-market fit is validated."
    when_to_use:
      - "The product idea is still unvalidated and speed of iteration matters more than production hardening"
    when_not_to_use:
      - "Real users depend on answer quality and source attribution — the lean stack has no mechanism to catch a retrieval regression before users see it"
    tradeoffs:
      cost: "Materially lower floor cost, appropriate before real usage volume exists."
      reliability: "No built-in regression testing or production-grade observability — acceptable for a prototype, not for a system real users depend on."

key_factors:
  - "User dependency: real users depending on answer quality is close to a forcing function for this stack's eval and observability layers"
  - "Corpus stability: an unstable, still-changing document corpus argues for delaying investment in production-grade ingestion infrastructure"
  - "Source attribution requirement: any requirement to show or verify sources needs this stack's dedicated document-processing and metadata layer, not just raw text chunking"
  - "Team operational capacity: adopting eval/tracing/ingestion infrastructure without the capacity to actually operate it produces unused infrastructure, not reliability"
  - "Change frequency: frequent changes to chunking, embeddings, or prompts make regression testing (this stack's RAGAS-based eval layer) proportionally more valuable"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing a RAG stack maturity level"] --> Users{"Real users depending on answer quality?"}
      Users -->|"No, still prototyping"| Lean["Use the Lean MVP Stack"]
      Users -->|"Yes"| Corpus{"Is the document corpus stable?"}
      Corpus -->|"No, still changing significantly"| StabilizeFirst["Stabilize the corpus before investing in production ingestion -- stay on a lighter setup meanwhile"]
      Corpus -->|"Yes"| Capacity{"Team has capacity to operate evals/tracing/ingestion ops?"}
      Capacity -->|"No"| BuildCapacity["Build that capacity before adopting the full stack, or scope down to what can actually be operated"]
      Capacity -->|"Yes"| ProdRAG["Use the Production RAG Stack"]

confidence: "established"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Production RAG Stack"
    tool_ids:
      - fastapi
    project_ids:
      - llamaindex
      - langchain
      - qdrant
      - pgvector
      - docling
      - ragas-rag-evaluation
      - phoenix
      - vllm
    build_example_ids:
      - intermediate-production-rag-api
      - intermediate-document-qa-pipeline
      - advanced-self-correcting-rag

related_decisions:
  - lean-mvp
  - choose-vector-db
  - choose-eval-framework

common_mistakes:
  - "Building the full production ingestion/eval/observability stack before the document corpus has stabilized, then rebuilding significant portions of it once the corpus changes shape — stabilize the corpus first, or accept the rebuild cost knowingly."
  - "Adopting this stack's eval and observability layers without the operational capacity to actually use them (reviewing traces, updating the golden eval set, acting on regression signals) — unused infrastructure provides no reliability benefit over not having it, while still costing money to run."
  - "Skipping the eval layer specifically because 'the retrieval looks good in manual testing,' then discovering a regression only after a chunking or prompt change ships to production — see [Measure Retrieval Recall Before Blaming Answer Quality](../../tips-and-tricks/rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md)."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This reference stack is the opinionated baseline for production-shaped, user-facing RAG systems. It separates ingestion, retrieval, generation, evaluation, and observability into distinct, independently scalable layers — a deliberately heavier architecture than a prototype needs, justified specifically once real users depend on answer quality and source attribution.

## The Decision

This is a progressive decision from the [Lean MVP Stack](./lean-mvp.md): most RAG products should start lean and graduate here once three conditions are met — real users depending on answer quality, a document corpus stable enough that investing in production ingestion won't be wasted, and team capacity to actually operate the eval and observability layers this stack adds. Adopting this stack's full weight before those conditions hold means paying its complexity cost for infrastructure that either gets rebuilt (unstable corpus) or goes unused (no operational capacity).

## Decision Framework

| Layer | Tool | Why This Choice |
|---|---|---|
| API | FastAPI | Typed Python API around retrieval/generation workflows |
| RAG Framework | LlamaIndex or LangChain | Retrieval pipeline and query orchestration |
| Document Processing | Docling or Unstructured | Reliable parsing before chunking/indexing |
| Vector DB | Qdrant or pgvector | Qdrant for vector workload, pgvector for Postgres-first teams |
| LLM | Hosted API or vLLM | Hosted for fastest launch, vLLM for self-hosted economics/control |
| Evaluation | RAGAS + Phoenix | Measure retrieval and answer quality |
| Observability | Langfuse / Phoenix | Trace retrieval, prompts, cost, and evals |

```mermaid
flowchart TD
    USER[User] --> API[FastAPI]
    API --> RET[RAG Framework]
    RET --> VDB[Qdrant / pgvector]
    DOCS[Documents] --> PARSE[Docling / Unstructured]
    PARSE --> CHUNK[Chunk + metadata]
    CHUNK --> VDB
    RET --> LLM[Hosted LLM / vLLM]
    API --> OBS[Langfuse / Phoenix]
    OBS --> EVAL[RAGAS / eval datasets]
    LLM --> API --> USER
```

Getting started:
```bash
pip install fastapi llama-index qdrant-client ragas arize-phoenix langfuse
# 1. Parse docs
# 2. Build index
# 3. Add traces
# 4. Create eval dataset before launch
```

This is a direct implementation reference for [Production RAG API](../../build-examples/rag-systems/intermediate-production-rag-api.md) and [Document Q&A Pipeline](../../build-examples/data-pipelines/intermediate-document-qa-pipeline.md), which build the ingestion and API layers concretely.

## Approach Deep-Dives

**The production RAG stack** treats ingestion as a first-class system rather than a one-off script specifically because document parsing quality dominates downstream retrieval quality — see [Store Parser and Chunker Version With Every Chunk](../../tips-and-tricks/rag-and-retrieval/store-parser-version-with-every-chunk.md) for why this matters in practice. Evaluation and observability are present from day one, not added after a quality incident, which is the entire point of graduating to this stack rather than continuing to iterate on a lean prototype. **The lean MVP stack** remains the correct choice until the specific triggers above (real users, stable corpus, operational capacity) are met — see [Lean MVP Stack](./lean-mvp.md) for the lighter-weight alternative and its own decision criteria.

## Common Mistakes

- **Building the full stack before the corpus stabilizes**, then rebuilding significant portions once the corpus changes shape.
- **Adopting eval/observability layers without the capacity to operate them.** Unused infrastructure costs money without providing reliability benefit.
- **Skipping the eval layer because retrieval "looks good" in manual testing**, then discovering a regression only after a chunking or prompt change ships.

## When This Guidance Might Be Outdated

Confidence is `established` for the overall layering pattern (ingestion/retrieval/generation/eval/observability as separate concerns is a stable RAG architecture principle), but specific tool recommendations at each layer should be re-checked periodically, and cost estimates should be re-verified against current provider pricing at each review cycle.

## Related Decisions

Directly follows from [Lean MVP Stack](./lean-mvp.md) as the natural graduation path, and interacts with [Choosing a Vector Database](../data-strategy/choose-vector-db.md) and [Choosing an Evaluation Strategy](../evaluation-strategy/choose-eval-framework.md) for the specific component decisions within this stack.

## Resources

- [LlamaIndex](../../projects/frameworks/llamaindex.md)
- [LangChain for RAG](../../projects/frameworks/langchain.md)
- [Qdrant](../../projects/data-and-retrieval/qdrant.md)
- [pgvector](../../projects/data-and-retrieval/pgvector.md)
- [Docling](../../projects/data-and-retrieval/docling.md)
- [RAGAS](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
