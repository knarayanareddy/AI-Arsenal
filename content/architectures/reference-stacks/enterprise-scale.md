---
id: "enterprise-scale"
title: "Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified"
category: "reference-stacks"
decision_type: "progressive"
decision_summary: "Adopt the enterprise-scale stack (identity, gateway, guardrails, audit as first-class layers) once regulatory or multi-team governance requirements exist, not by default."
tags:
  - cloud
  - kubernetes
  - evaluation
  - security

approaches:
  - name: "Enterprise-Scale Stack (identity, gateway, guardrails, audit as first-class layers)"
    description: "A governed stack built around an enterprise cloud platform (Bedrock/Azure AI Studio/Vertex AI), a central model gateway for routing/budget/policy, layered guardrails, and full-lifecycle observability with eval gates — designed for regulated or multi-team organizations, not for shipping speed."
    when_to_use:
      - "The organization already has enterprise cloud/security standards (existing AWS/Azure/GCP commitment, identity provider, compliance requirements)"
      - "Regulated workloads require audit trails and fine-grained access control by design, not as an afterthought"
      - "Multiple AI applications need to share model access, budgets, and observability infrastructure centrally"
    when_not_to_use:
      - "The team needs to ship in days, not weeks — this stack's governance layers are pure overhead for that timeline"
      - "There is no platform/DevOps support to operate the additional layers (gateway, guardrails, centralized observability) this stack assumes"
      - "The workload is a simple internal prototype with no compliance requirement"
    tradeoffs:
      cost: "$1,000-$10,000+/month even at small-startup scale, dominated by cloud platform services, gateway, observability, and managed databases — the floor cost is meaningfully higher than a lean stack regardless of usage volume, since governance infrastructure has a cost independent of traffic."
      complexity: "Highest of any reference stack in this catalog — identity, gateway, guardrails, and centralized observability are each a real operational surface, not optional add-ons."
      reliability: "Designed for centralized policy enforcement and audit, which is a reliability property specifically valuable for regulated and multi-team contexts, not a general reliability advantage over simpler stacks."

  - name: "Production RAG Stack (no enterprise governance layer)"
    description: "A production-shaped stack (FastAPI, RAG framework, vector DB, evaluation, observability) without a centralized gateway, layered guardrails, or enterprise cloud governance assumptions — see the Production RAG Stack entry for full detail."
    when_to_use:
      - "The team needs production reliability and observability but does not yet have (or need) multi-team governance, audit, or compliance requirements"
      - "A single team or small number of teams own the AI application, without the cross-team budget/policy coordination the enterprise stack assumes"
    when_not_to_use:
      - "Regulatory or audit requirements exist that this stack's simpler observability/access model doesn't satisfy"
      - "Multiple independent teams need centrally governed, budgeted access to shared model infrastructure"
    tradeoffs:
      cost: "Materially lower floor cost than the enterprise stack — no gateway or centralized-governance infrastructure tax."
      complexity: "Lower — fewer layers to operate, appropriate for single-team ownership."

key_factors:
  - "Existing enterprise cloud/security commitment: an organization already inside AWS/Azure/GCP governance gets much of this stack's value at lower incremental cost than one adopting it fresh"
  - "Regulatory/audit requirement: a hard compliance requirement is close to a forcing function for the enterprise stack's governance layers"
  - "Number of teams/applications sharing infrastructure: centralized gateway and budget/policy controls pay off specifically when multiple teams share model access"
  - "Platform/DevOps capacity: this stack assumes dedicated operational capacity for identity, gateway, and guardrail layers, not just the application team"
  - "Timeline pressure: a days-to-ship timeline is close to incompatible with standing up this stack's governance layers from scratch"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing a stack scope"] --> Regulated{"Regulated workload or hard compliance requirement?"}
      Regulated -->|"Yes"| Enterprise["Use the Enterprise-Scale Stack"]
      Regulated -->|"No"| MultiTeam{"Multiple teams sharing model access, budgets, or observability?"}
      MultiTeam -->|"Yes"| Enterprise
      MultiTeam -->|"No"| Timeline{"Need to ship in days?"}
      Timeline -->|"Yes"| ProdRAG["Use the Production RAG Stack (or Lean MVP if even faster)"]
      Timeline -->|"No, but need production reliability"| ProdRAG

confidence: "established"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Enterprise-Scale Stack (identity, gateway, guardrails, audit as first-class layers)"
    tool_ids:
      - aws-bedrock
      - azure-ai-studio
      - google-vertex-ai
      - nemo-guardrails
      - openlit
    project_ids:
      - microsoft-agent-framework
      - langgraph
      - qdrant
    build_example_ids: []

related_decisions:
  - choose-deployment-target
  - choose-observability-tool
  - production-rag

common_mistakes:
  - "Adopting the enterprise stack's full governance layer for a single-team application with no compliance requirement, paying its cost and complexity floor for governance value nobody needs yet."
  - "Starting autonomous agents in production before identity, logging, and eval gates exist — this stack's own getting-started guidance exists specifically to prevent this ordering mistake, and skipping it undermines the entire governance rationale for choosing this stack in the first place."
  - "Assuming enterprise cloud platform lock-in is unavoidable once chosen — the gateway layer (LiteLLM/Portkey-style) exists specifically to decouple application code from a single cloud provider's model API, and skipping it reintroduces the lock-in this stack is designed to avoid."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This reference stack is an opinionated baseline for governed, regulated, or multi-team AI systems — not a universally better stack than a simpler production setup, but a deliberately heavier one whose cost is only justified by real governance requirements. It prioritizes identity, auditability, observability, evaluation, and cloud alignment over minimal setup, which is the correct tradeoff specifically for the organizations described in When to Use, and the wrong one for everyone else.

## The Decision

This is fundamentally a progressive decision: most organizations should start with a simpler production stack and adopt this stack's governance layers specifically once a triggering requirement appears (regulatory audit need, a second team needing shared model access, a compliance review). Adopting the full enterprise stack speculatively, before those requirements exist, means paying its cost and complexity floor for value that isn't being used yet.

## Decision Framework

| Layer | Tool | Why This Choice |
|---|---|---|
| Cloud Platform | AWS Bedrock / Azure AI Studio / Vertex AI | Use existing enterprise cloud controls |
| Gateway | LiteLLM / Portkey-style gateway | Central model routing, budgets, policy, and audit |
| Orchestration | Microsoft Agent Framework / LangGraph | Production agent/workflow control |
| Data/RAG | Qdrant / Weaviate / managed vector DB | Governed retrieval with metadata and tenancy |
| Observability | OpenTelemetry + Phoenix/OpenLIT/Langfuse | Trace and evaluate across services |
| Security | Llama Guard / NeMo Guardrails | Layered input/output and action guardrails |
| Workflow Ops | Dagster / Airflow | Scheduled ingestion, eval, and data pipelines |

```mermaid
flowchart TD
    USER[Enterprise user] --> ID[Identity / policy]
    ID --> APP[AI application]
    APP --> GATEWAY[Model gateway]
    GATEWAY --> MODEL[Bedrock / Azure / Vertex / self-hosted]
    APP --> RAG[Governed RAG service]
    RAG --> VDB[Managed or self-hosted vector DB]
    APP --> GUARD[Guardrails]
    APP --> OTel[OpenTelemetry collector]
    OTel --> OBS[Phoenix / OpenLIT / Langfuse]
    PIPE[Dagster / Airflow ingestion] --> RAG
    OBS --> EVAL[Eval gates / dashboards]
```

Getting started: choose the enterprise cloud platform first, then enforce policy through the gateway and observability layers before adding autonomous agent capability — do not start with autonomous agents before identity, logging, and eval gates exist.

## Approach Deep-Dives

**The enterprise-scale stack** separates policy, model access, data access, and observability into distinct, independently governable layers — this is the source of both its value (auditability, centralized control) and its cost (each layer is real infrastructure to operate). At small-startup scale, expect $1,000-$10,000/month; at real scale, $10,000+, dominated by cloud services, gateway, observability retention, and managed databases, plus the platform/support team needed to operate it. **The production RAG stack** (see [Production RAG Stack](./production-rag.md)) provides most of the same component categories (RAG framework, vector DB, evaluation, observability) without the centralized governance layer, at a materially lower cost floor — the right choice whenever the enterprise stack's specific governance requirements (audit, multi-team budget/policy, regulatory compliance) aren't yet present.

## Common Mistakes

- **Adopting full enterprise governance for a single-team, non-regulated application.** This pays the cost/complexity floor for value nobody is using.
- **Starting autonomous agents before identity, logging, and eval gates exist.** This undermines the entire governance rationale for choosing this stack.
- **Skipping the gateway layer and calling a cloud provider's model API directly**, reintroducing the vendor lock-in this stack's gateway layer exists specifically to avoid.

## When This Guidance Might Be Outdated

Confidence is `established` for the overall governance-layering pattern itself (identity → gateway → guardrails → observability is a stable enterprise architecture pattern), but the specific tool recommendations at each layer should be re-checked periodically as the gateway and guardrails tool categories are less mature than the pattern itself.

## Related Decisions

Directly related to [Production RAG Stack](./production-rag.md) as the lighter-weight alternative, and to [Choosing a Deployment Target](../serving-patterns/choose-deployment-target.md) and [Choosing an Observability Tool](../evaluation-strategy/choose-observability-tool.md), both of which this stack's layers depend on.

## Resources

- [AWS Bedrock](../../tools/serving-and-deployment/aws-bedrock.md)
- [Azure AI Studio](../../tools/serving-and-deployment/azure-ai-studio.md)
- [Google Vertex AI](../../tools/serving-and-deployment/google-vertex-ai.md)
- [Microsoft Agent Framework](../../projects/frameworks/microsoft-agent-framework.md)
- [LangGraph](../../projects/frameworks/langgraph.md)
- [Qdrant](../../projects/data-and-retrieval/qdrant.md)
- [OpenLIT](../../projects/benchmarks-and-evals/openlit.md)
- [NeMo Guardrails](../../tools/evaluation-and-observability/nemo-guardrails.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
