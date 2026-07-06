---
id: "local-first"
title: "Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling"
category: "reference-stacks"
decision_type: "fork"
decision_summary: "Choose the local-first stack when data cannot leave your environment or per-token cloud billing is unacceptable — accept a lower capability ceiling on hard reasoning tasks in exchange for privacy and cost control."
tags:
  - local
  - self-hosted
  - llm
  - inference

approaches:
  - name: "Local-First Stack"
    description: "A fully local stack (Ollama or llama.cpp for inference, local RAG framework, local vector storage, local UI, local or self-hosted observability) where no data or inference call leaves the local device or network."
    when_to_use:
      - "Sensitive data cannot leave the device or network under any circumstance"
      - "Offline demos or field deployments where cloud connectivity isn't guaranteed"
      - "Cost-controlled prototypes where per-token cloud billing is unacceptable, and local hardware is available"
    when_not_to_use:
      - "The task needs frontier-model quality on hard reasoning tasks that current open-weight local models don't yet match"
      - "Centralized multi-tenant governance is needed immediately — a local-first stack has no built-in mechanism for this"
      - "Users have weak local hardware and there is no server-side fallback option"
    tradeoffs:
      cost: "$0-$50/month at hobbyist scale (local hardware only); $100-$1,000/month at small-startup scale (local server/GPU, storage, ops) — no per-token billing at any scale, but real hardware procurement and maintenance cost that varies widely."
      accuracy: "Bounded by the capability of open-weight models that fit on available local hardware — a real ceiling versus frontier hosted models, though this gap narrows over time and should be re-checked against your specific task, not assumed fixed."
      complexity: "Requires operating local inference (Ollama/llama.cpp) and local vector storage yourself, but avoids cloud API integration and billing complexity entirely."
      data-requirements: "All data, embeddings, and traces stay local by construction — this is the entire point of the stack, not an incidental property."

  - name: "Cloud API Stack (e.g. Lean MVP or Production RAG using hosted models)"
    description: "The same general stack shape (RAG framework, vector storage, UI, observability) but using a hosted model API instead of local inference — see Lean MVP Stack or Production RAG Stack."
    when_to_use:
      - "Data has no residency/privacy constraint preventing cloud processing"
      - "Task quality requirements exceed what locally-hostable open-weight models currently provide"
    when_not_to_use:
      - "Any hard data-residency or offline-operation requirement exists"
    tradeoffs:
      cost: "Per-token billing scales with usage with no ceiling from idle capacity, unlike local hardware's fixed cost."
      accuracy: "Access to frontier hosted model capability, without a local-hardware ceiling."

key_factors:
  - "Data residency/privacy requirement: a hard requirement to keep data local is close to a forcing function for this stack"
  - "Connectivity requirement: offline or field-deployment scenarios rule out cloud-API-dependent stacks entirely"
  - "Task difficulty: hard reasoning tasks may still favor frontier hosted models over what fits on available local hardware — check this for your specific task, not as a general assumption"
  - "Available local hardware: the stack's practical model-size ceiling is set by what the target deployment hardware (developer laptop, local server) can run at acceptable latency"
  - "Cost sensitivity to usage volume: high-volume, cost-sensitive workloads benefit from this stack's flat hardware cost versus per-token cloud billing"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing local-first vs cloud API"] --> Residency{"Data cannot leave local environment?"}
      Residency -->|"Yes"| Local["Use the Local-First Stack"]
      Residency -->|"No"| Offline{"Must work offline / field deployment?"}
      Offline -->|"Yes"| Local
      Offline -->|"No"| Quality{"Does the task need frontier-model quality beyond current open-weight local models?"}
      Quality -->|"Yes"| Cloud["Use a cloud API stack (Lean MVP or Production RAG)"]
      Quality -->|"No"| CostSensitive{"Cost-sensitive at high, steady usage volume?"}
      CostSensitive -->|"Yes"| Local
      CostSensitive -->|"No"| Cloud

confidence: "evolving"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Local-First Stack"
    project_ids:
      - ollama
      - llama-cpp
      - llama-3
      - qwen-2-5
      - gemma-3
      - chroma
      - lancedb
    tool_ids: []
    build_example_ids:
      - starter-local-llm-chat

related_decisions:
  - choose-llm
  - lean-mvp

common_mistakes:
  - "Committing to local-first for a task that genuinely needs frontier-model reasoning quality, discovering the capability gap only after building the stack, rather than checking it against the specific task upfront."
  - "Deploying to users with weak local hardware and no server-side fallback, producing an unacceptably slow experience that a hybrid (local for simple tasks, cloud for hard ones) would have avoided."
  - "Assuming local-first is automatically cheaper at scale — local hardware has real procurement and maintenance costs that can exceed cloud billing at certain usage patterns, and this should be calculated rather than assumed."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This reference stack is an opinionated baseline for privacy-first, offline, or cost-controlled AI applications where no data or inference call leaves the local device or network. It keeps data and inference under local control by construction, at the cost of a capability ceiling versus frontier hosted models — a tradeoff worth making explicitly rather than assuming, since the size of that gap varies by task and shifts over time.

## The Decision

The forcing function for this stack is almost always data residency, offline operation, or cost-per-token sensitivity at high volume — if none of these apply, a cloud API stack likely serves the same application shape with less operational burden and a higher capability ceiling. The one factor genuinely worth checking per-task rather than assuming is model capability: local open-weight models have closed much of the gap with frontier hosted models for many tasks, but hard reasoning tasks may still favor a hosted model, and this should be validated against your specific use case rather than treated as settled.

## Decision Framework

| Layer | Tool | Why This Choice |
|---|---|---|
| LLM Runtime | Ollama | Fastest local model UX for developers |
| Low-level Runtime | llama.cpp | Portable GGUF inference and edge deployment |
| Models | Llama / Qwen / Gemma / Phi | Open-weight families with local variants |
| RAG Framework | LlamaIndex or txtai | Local indexing and retrieval workflows |
| Vector DB | Chroma / LanceDB / pgvector | Local-first vector storage options |
| UI | Gradio / Open WebUI-style frontend | Local user interface |
| Observability | Langfuse self-host or local logs | Trace locally when data cannot leave environment |

```mermaid
flowchart TD
    USER[Local user] --> UI[Local UI]
    UI --> APP[Local app]
    APP --> RET[Local RAG]
    RET --> VDB[Chroma / LanceDB / pgvector]
    APP --> RUNTIME[Ollama / llama.cpp]
    RUNTIME --> MODEL[Open-weight model]
    APP --> LOGS[Local logs / self-hosted Langfuse]
    MODEL --> APP --> UI --> USER
```

Getting started:
```bash
ollama pull llama3.1
ollama run llama3.1
pip install llama-index chromadb gradio
# Keep all documents, embeddings, and traces local.
```

## Approach Deep-Dives

**The local-first stack** works well for demos, private corpora, and offline use, and can graduate to self-hosted server inference (see [Choosing a Deployment Target](../serving-patterns/choose-deployment-target.md)'s self-hosted high-throughput serving path) without changing the overall architecture, just the inference layer's scale. **A cloud API stack** covering the same application shape (see [Lean MVP Stack](./lean-mvp.md) or [Production RAG Stack](./production-rag.md)) removes the local-hardware capability ceiling and per-hardware maintenance burden, at the cost of per-token billing and data leaving the local environment.

## Common Mistakes

- **Committing to local-first for a task that needs frontier reasoning quality**, discovering the gap only after building — check this against your specific task upfront.
- **Deploying to weak local hardware with no server fallback**, producing an unacceptably slow experience a hybrid approach would avoid.
- **Assuming local-first is automatically cheaper at scale.** Local hardware has real procurement/maintenance costs that can exceed cloud billing for certain usage patterns — calculate rather than assume.

## When This Guidance Might Be Outdated

Confidence is `evolving` because the capability gap between local open-weight models and frontier hosted models continues to shift — the "When NOT to Use" guidance about needing frontier quality should be re-checked against current open-weight model benchmarks for your specific task category, not assumed to remain the same gap indefinitely.

## Related Decisions

Directly related to [Choosing a Model](../model-selection/choose-llm.md)'s local-vs-cloud fork (this stack is essentially the local-first path fully realized as a complete stack), and to [Lean MVP Stack](./lean-mvp.md) as the closest cloud-API-based equivalent in scope and complexity.

## Resources

- [Ollama](../../projects/inference-engines/ollama.md)
- [llama.cpp](../../projects/inference-engines/llama-cpp.md)
- [Llama 3.x](../../projects/foundation-models/llama-3.md)
- [Qwen 2.5 / QwQ](../../projects/foundation-models/qwen-2-5.md)
- [Gemma 3](../../projects/foundation-models/gemma-3.md)
- [Chroma](../../projects/data-and-retrieval/chroma.md)
- [LanceDB](../../projects/data-and-retrieval/lancedb.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
