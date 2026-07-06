---
id: "lean-mvp"
title: "Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff"
category: "reference-stacks"
decision_type: "progressive"
decision_summary: "Start with the lean MVP stack (hosted models, simple RAG, minimal infra) to validate an idea fast; graduate to the production RAG stack once you have real users and need durability, evaluation, and multi-tenant reliability."
tags:
  - llm
  - rag
  - cloud
  - featured

approaches:
  - name: "Lean MVP Stack"
    description: "A minimal, fast-to-build stack (Gradio/Streamlit UI, hosted LLM or Ollama, LlamaIndex, Chroma, basic tracing, Railway/Fly.io hosting) optimized for speed of validation over production robustness."
    when_to_use:
      - "You are validating product demand or building a weekend prototype/internal demo, and speed to a working system matters more than production hardening"
      - "A solo developer or very small team needs to prove an idea works before investing in production infrastructure"
      - "The application is a small RAG app over a limited document set, not yet facing real production traffic"
    when_not_to_use:
      - "You have strict enterprise compliance requirements — this stack has no governance layer"
      - "You need high-throughput production serving or large multi-tenant workloads — this stack is explicitly not designed for scale"
    tradeoffs:
      cost: "$0-$50/month at hobbyist scale, $50-$300/month at small-startup scale — the lowest floor cost of any reference stack in this catalog, dominated by hosted model tokens or local compute."
      complexity: "Lowest of any reference stack — every component is chosen specifically to minimize setup time."
      scalability: "Not recommended past small-startup scale — the stack's own cost-estimate guidance explicitly recommends moving to the production RAG stack rather than scaling this one further."
      flexibility: "All components are easily swappable, which is a deliberate design choice supporting migration to a more robust stack later without a full rewrite."

  - name: "Production RAG Stack"
    description: "See the Production RAG Stack entry for full detail — a more durable stack with a proper API layer, production vector DB, evaluation harness, and observability from day one."
    when_to_use:
      - "The prototype has validated product demand and now faces real user traffic requiring reliability guarantees the lean stack doesn't provide"
      - "Source attribution, regression testing, or measurable quality requirements have become real product needs, not speculative future concerns"
    when_not_to_use:
      - "The idea is still unvalidated — building the production stack's additional durability before validating demand is premature investment"
    tradeoffs:
      cost: "Meaningfully higher floor cost than the lean stack, justified once real usage exists."
      complexity: "Higher setup cost, justified by durability and evaluation infrastructure the lean stack intentionally omits."

key_factors:
  - "Validation stage: pre-product-market-fit favors the lean stack; validated demand with real users favors graduating to the production stack"
  - "Team size: solo/small teams benefit most from the lean stack's minimal operational surface"
  - "Compliance requirement: any real compliance need rules out the lean stack immediately, regardless of validation stage"
  - "Traffic reality: actual (not projected) traffic exceeding what the lean stack's components comfortably handle is the concrete signal to graduate"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing a stack for a new AI product idea"] --> Validated{"Is product demand already validated with real users?"}
      Validated -->|"No, still validating"| Compliance{"Any compliance/enterprise requirement even at this stage?"}
      Compliance -->|"Yes"| Enterprise["Skip ahead to Enterprise-Scale Stack considerations"]
      Compliance -->|"No"| Lean["Use the Lean MVP Stack"]
      Validated -->|"Yes, real users and traffic"| ProdRAG["Graduate to the Production RAG Stack"]

confidence: "established"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Lean MVP Stack"
    tool_ids:
      - gradio
      - streamlit
      - railway
    project_ids:
      - llamaindex
      - chroma
      - ollama
    build_example_ids:
      - starter-basic-rag-chatbot

related_decisions:
  - production-rag
  - choose-deployment-target

common_mistakes:
  - "Building production-grade durability (eval harness, multi-tenant isolation, dedicated observability) before validating that the underlying product idea has real demand — this is premature investment in exactly the direction the lean stack exists to avoid."
  - "Staying on the lean stack past validated product-market fit, once real user traffic starts exposing the stack's explicit scale ceiling — the stack's own cost-estimate guidance flags 'scale: not recommended' for a reason."
  - "Treating the lean stack's component choices as permanent architecture decisions rather than deliberately swappable placeholders — the whole point of choosing Gradio/Chroma/a simple host is that each is easy to replace once real requirements emerge."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This reference stack is an opinionated baseline for proving an AI product idea works before investing in production infrastructure. It prioritizes build speed over architectural completeness deliberately — every component is chosen to minimize time-to-working-demo, with the explicit expectation that a validated idea graduates to a more durable stack (see [Production RAG Stack](./production-rag.md)) rather than this stack being hardened in place indefinitely.

## The Decision

This is a progressive decision, not a permanent architectural commitment: the lean stack is the correct starting point for validating a new idea, and staying on it after validation (once real users and real traffic exist) is itself a common mistake this entry calls out explicitly. The signal to graduate is concrete, not a vague sense that things are getting more serious — actual traffic or reliability requirements exceeding what this stack's minimal-setup components comfortably handle.

## Decision Framework

| Layer | Tool | Why This Choice |
|---|---|---|
| UI | Gradio or Streamlit | Fastest Python-first path to a working demo |
| LLM | Hosted API or Ollama | Hosted for quality/speed; Ollama for local/private demos |
| RAG Framework | LlamaIndex | Fast ingestion and retrieval abstractions |
| Vector DB | Chroma | Minimal local setup for prototypes |
| Observability | Langfuse or LangSmith | Basic traces before users test the app |
| Deployment | Railway or Fly.io | Low-friction hosting for MVP APIs/apps |

```mermaid
flowchart TD
    U[User] --> UI[Gradio / Streamlit]
    UI --> API[FastAPI or app logic]
    API --> RET[LlamaIndex Retriever]
    RET --> VDB[Chroma]
    API --> LLM[Hosted LLM API or Ollama]
    API --> OBS[Langfuse / LangSmith]
    LLM --> API --> UI --> U
```

Getting started:
```bash
pip install gradio llama-index chromadb langfuse
# Build UI + ingestion + query path first
# Add deployment only after local eval passes
```

## Approach Deep-Dives

**The lean MVP stack** keeps every component swappable by design — this is not an accident of using simple tools, but the deliberate point: a solo developer or small team should be able to prove an idea works and migrate individual components later without a full rewrite. Cost stays low ($0-$300/month across hobbyist to small-startup scale) because every choice (hosted API or Ollama, Chroma over a production vector DB, a simple host over Kubernetes) trades production robustness for near-zero setup friction. **Graduating to the production RAG stack** is the correct next step once real user traffic exposes requirements this stack doesn't address: durability under concurrent load, evaluation regression gates, multi-tenant isolation, and dedicated observability retention.

## Common Mistakes

- **Building production durability before validating product demand.** This is premature investment in exactly the direction this stack exists to avoid.
- **Staying on the lean stack past validated product-market fit.** The stack's own guidance flags scale as "not recommended" for a reason.
- **Treating component choices as permanent architecture rather than deliberately swappable placeholders.**

## When This Guidance Might Be Outdated

Confidence is `established` for the overall "validate cheap, then graduate" pattern, which is a stable product-development principle independent of the AI tooling landscape — but the specific component recommendations (Gradio/Streamlit, Chroma, Railway/Fly.io) should be re-checked periodically as the fastest-to-set-up options in each category can shift.

## Related Decisions

Directly precedes [Production RAG Stack](./production-rag.md) as the natural graduation path, and interacts with [Choosing a Deployment Target](../serving-patterns/choose-deployment-target.md) for the hosting-layer decision specifically.

## Resources

- [Gradio](../../tools/dx-and-tooling/gradio.md)
- [Streamlit](../../tools/dx-and-tooling/streamlit.md)
- [LlamaIndex](../../projects/frameworks/llamaindex.md)
- [Chroma](../../projects/data-and-retrieval/chroma.md)
- [Ollama](../../projects/inference-engines/ollama.md)
- [Railway](../../tools/serving-and-deployment/railway.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
