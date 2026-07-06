---
id: "choose-observability-tool"
title: "Choosing an Observability Approach: Integration Model First, Feature List Second"
category: "evaluation-strategy"
decision_type: "fork"
decision_summary: "Choose observability by how telemetry enters your system — SDK, framework-native, OpenTelemetry, or proxy — before comparing features, since integration model determines your real switching cost."
tags:
  - observability
  - tracing
  - evaluation
  - monitoring

approaches:
  - name: "Self-Hosted, Full-Lifecycle (Langfuse, Opik)"
    description: "An open-source, self-hostable platform combining tracing, prompt management, and evaluation in one system, avoiding both vendor lock-in and per-seat/per-trace SaaS pricing."
    when_to_use:
      - "Self-hosting is a requirement (data residency, cost control at scale, or avoiding vendor dependency)"
      - "You want tracing, prompt management, and evaluation in one system rather than stitching together separate tools"
    when_not_to_use:
      - "You have no self-hosting capacity or appetite and would rather pay for a fully managed service"
    tradeoffs:
      cost: "Free to self-host (infrastructure cost only); commercial hosted tiers available if self-hosting isn't wanted."
      complexity: "Operating your own instance is a real ongoing responsibility, offset by avoiding per-seat/per-trace vendor pricing at scale."
      flexibility: "High — open-source means no vendor-imposed feature gating or migration risk if the vendor changes pricing or direction."

  - name: "Framework-Native (LangSmith for LangChain/LangGraph)"
    description: "An observability platform built by and tightly integrated with a specific framework's maintainer, offering the least-friction integration if you're already using that framework."
    when_to_use:
      - "You are already building on LangChain/LangGraph and want the integration with the lowest setup friction and best framework-specific trace fidelity"
    when_not_to_use:
      - "You are not using that framework — the tight integration benefit disappears and you're better served by a framework-agnostic option"
      - "You need portability across frameworks; framework-native tools are, by design, most valuable within their own ecosystem"
    tradeoffs:
      complexity: "Lowest integration friction specifically within its native framework; higher friction if you use multiple frameworks or plan to migrate away."
      flexibility: "Lower portability outside its native framework ecosystem in exchange for tighter integration within it."

  - name: "OpenTelemetry-Native (Phoenix, OpenLIT, OpenLLMetry)"
    description: "Observability built on the OpenTelemetry standard, allowing traces to flow into any OTel-compatible backend rather than being locked to one vendor's proprietary format."
    when_to_use:
      - "You want to avoid vendor lock-in at the telemetry-format level and may want to route traces to a different backend later without re-instrumenting"
      - "Your organization already has OpenTelemetry infrastructure for non-AI observability and wants AI tracing to plug into the same pipeline"
    when_not_to_use:
      - "You need AI-specific features (prompt management, eval-dataset UI) that a pure OTel-instrumentation library doesn't provide out of the box — you may need to pair it with a backend that adds those features"
    tradeoffs:
      flexibility: "Highest portability of any approach — the instrumentation format itself is vendor-neutral, so backend choice is decoupled from instrumentation choice."
      complexity: "Requires understanding OTel concepts (spans, exporters) if your team hasn't used it before, though this pays off in reduced long-term lock-in."

  - name: "Proxy / Gateway (Helicone)"
    description: "Route model API calls through a proxy that logs requests/responses transparently, requiring minimal application code changes."
    when_to_use:
      - "You want observability with the smallest possible code change — routing traffic through a proxy rather than adding SDK calls throughout your codebase"
      - "You primarily need request/response/cost logging rather than deep multi-step trace visibility into agent or RAG pipeline internals"
    when_not_to_use:
      - "You need fine-grained internal trace visibility (individual retrieval steps, tool calls) that a request/response proxy cannot see, since it only observes the boundary, not the internals"
    tradeoffs:
      complexity: "Lowest code-change burden — a proxy/gateway swap rather than instrumenting throughout the codebase."
      flexibility: "Limited to what's visible at the API-call boundary; cannot see inside a multi-step pipeline the way SDK-based tracing can."

  - name: "Evaluation-First (Braintrust, Opik)"
    description: "A platform where evaluation workflows (not just tracing) are the primary design center, for teams whose main need is systematic eval-driven development."
    when_to_use:
      - "Evaluation-first development is the primary need — you want eval datasets, scoring, and regression detection as the core workflow, with tracing as a supporting feature"
    when_not_to_use:
      - "Tracing/debugging production issues is the primary need rather than systematic evaluation — a tracing-first tool may serve that better"
    tradeoffs:
      complexity: "Optimized for eval-centric workflows; may require more setup for teams whose primary need is production debugging rather than evaluation."

key_factors:
  - "Integration model: SDK-native, framework-native, OTel-standard, or proxy — this determines your actual switching cost later and should be resolved before any feature comparison"
  - "Self-hosting requirement: data residency or cost-at-scale concerns favor open-source, self-hostable options over closed SaaS-only platforms"
  - "Existing framework commitment: heavy LangChain/LangGraph usage favors LangSmith's tight integration unless portability is a stronger priority"
  - "Primary need: debugging/tracing production issues vs systematic evaluation-driven development point toward different tools even within the same integration model"
  - "Existing OTel infrastructure: organizations with OTel pipelines for other observability should weight OTel-native AI tracing tools higher for pipeline consistency"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing an observability approach"] --> Integration{"How should telemetry enter the system?"}
      Integration -->|"Minimal code change, proxy the API calls"| Proxy["Use a proxy/gateway (Helicone)"]
      Integration -->|"Already OTel-instrumented elsewhere"| OTel["Use an OTel-native tool (Phoenix, OpenLIT, OpenLLMetry)"]
      Integration -->|"Heavy LangChain/LangGraph usage"| Framework["Use LangSmith"]
      Integration -->|"SDK-native, want full lifecycle"| SelfHost{"Self-hosting required or preferred?"}
      SelfHost -->|"Yes"| OSS["Use Langfuse or Opik"]
      SelfHost -->|"No preference"| Need{"Primary need: debugging/tracing, or eval-driven development?"}
      Need -->|"Tracing/debugging"| OSS
      Need -->|"Evaluation-first workflow"| EvalFirst["Use Braintrust or Opik"]

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Self-Hosted, Full-Lifecycle (Langfuse, Opik)"
    project_ids:
      - langfuse
      - opik
    tool_ids: []
    build_example_ids:
      - intermediate-multi-tool-agent
      - intermediate-production-rag-api
  - approach_name: "Framework-Native (LangSmith for LangChain/LangGraph)"
    project_ids:
      - langsmith-platform
    tool_ids:
      - langsmith
    build_example_ids:
      - advanced-multi-agent-research
  - approach_name: "OpenTelemetry-Native (Phoenix, OpenLIT, OpenLLMetry)"
    project_ids:
      - phoenix
      - openlit
      - openllmetry
    tool_ids: []
    build_example_ids: []
  - approach_name: "Proxy / Gateway (Helicone)"
    project_ids:
      - helicone
    tool_ids: []
    build_example_ids: []
  - approach_name: "Evaluation-First (Braintrust, Opik)"
    project_ids:
      - braintrust
      - opik
      - agenta
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-eval-framework

common_mistakes:
  - "Choosing a tool by feature checklist before checking the integration model — a proxy-based tool cannot see inside a multi-step pipeline no matter how many features its dashboard has, and this limitation is invisible until you actually need that internal visibility."
  - "Adopting a framework-native tool (LangSmith) while planning to migrate away from that framework later, then discovering the observability tooling doesn't transfer with the migration."
  - "Launching to production without any trace sampling or observability in place, treating it as a post-launch addition — by the time a production incident makes this urgent, you have no historical trace data to debug it with."
  - "Choosing an evaluation-first platform for a team whose primary need is production debugging, or vice versa — these are related but distinct primary use cases, and the tools in this category differentiate meaningfully on which one they optimize for."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Observability is the production trust layer for LLM applications, and this decision is easiest to get right by resolving integration model before comparing feature lists — the right tool depends less on which dashboard looks best and more on how telemetry actually enters your system, since that determines your real switching cost if you need to change tools later.

## The Decision

Ask how telemetry should enter the system before anything else. A proxy/gateway approach (Helicone) requires the least code change but can only see request/response boundaries, not internal pipeline steps. A framework-native tool (LangSmith) offers the tightest integration if you're already deep in that framework's ecosystem, at the cost of portability if you migrate away. An OpenTelemetry-native tool (Phoenix, OpenLIT, OpenLLMetry) trades a bit more setup complexity for vendor-neutral instrumentation that can route to any OTel-compatible backend later. A full-lifecycle SDK-native platform (Langfuse, Opik) combines tracing, prompt management, and evaluation, and is worth self-hosting when data residency or cost-at-scale considerations matter. Once integration model is resolved, the remaining choice is largely about whether your primary need is production debugging/tracing or systematic evaluation-driven development, since some tools in this category differentiate specifically on that axis (Braintrust leans evaluation-first; most others lean tracing-first with evaluation as a supporting feature).

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic; condensed as a quick-reference table:

| Need | Recommended Start | Canonical Entry |
|---|---|---|
| Self-hosted full lifecycle | Langfuse | [Langfuse](../../projects/benchmarks-and-evals/langfuse.md) |
| LangChain/LangGraph native | LangSmith | [LangSmith](../../projects/benchmarks-and-evals/langsmith-platform.md) |
| RAG eval + OTel | Phoenix | [Phoenix](../../projects/benchmarks-and-evals/phoenix.md) |
| Proxy/gateway logging | Helicone | [Helicone](../../projects/benchmarks-and-evals/helicone.md) |
| Eval-first workflow | Braintrust / Opik | [Braintrust](../../projects/benchmarks-and-evals/braintrust.md), [Opik](../../projects/benchmarks-and-evals/opik.md) |
| OTel instrumentation only | OpenLLMetry | [OpenLLMetry](../../projects/benchmarks-and-evals/openllmetry.md) |
| OTel + GPU monitoring | OpenLIT | [OpenLIT](../../projects/benchmarks-and-evals/openlit.md) |
| Prompt collaboration | Agenta | [Agenta](../../projects/benchmarks-and-evals/agenta.md) |

## Approach Deep-Dives

**Self-hosted, full-lifecycle platforms** (Langfuse, Opik) are the right default for teams that want tracing, prompt management, and evaluation without stitching together separate systems, and are worth the self-hosting operational cost specifically when data residency or per-trace SaaS pricing at scale is a real concern. **Framework-native tools** (LangSmith) offer the best integration experience within their specific ecosystem, and that specificity is the whole value proposition — teams outside that ecosystem gain nothing from choosing it. **OpenTelemetry-native tools** are the right choice for organizations optimizing for long-term flexibility over short-term setup speed, since OTel's vendor-neutral format is specifically designed to decouple instrumentation from backend choice. **Proxy/gateway tools** (Helicone) trade internal visibility for near-zero integration friction — appropriate when request/response-level logging (cost, latency, basic content) is genuinely sufficient and multi-step pipeline internals don't need to be traced. **Evaluation-first platforms** (Braintrust, and Opik in its evaluation-centric usage) are differentiated specifically by treating eval datasets and regression scoring as the primary workflow rather than a secondary feature bolted onto tracing.

## Common Mistakes

- **Choosing by feature checklist before checking integration model.** A proxy-based tool cannot see pipeline internals regardless of dashboard feature count — this limitation is invisible until you need that visibility.
- **Adopting a framework-native tool while planning to migrate away from that framework.** The observability tooling doesn't transfer with a framework migration.
- **Launching without trace sampling, treating observability as a post-launch addition.** By the time an incident makes this urgent, there is no historical trace data to debug with.
- **Choosing an evaluation-first platform for a debugging-primary need, or vice versa.** These are related but distinct primary use cases that the tools in this category differentiate on.

## When This Guidance Might Be Outdated

Confidence is rated `emerging-consensus` because the observability/eval tooling landscape is still consolidating — several tools in this category have been adding features that blur the original integration-model distinctions (tracing-first tools adding eval features and vice versa), so re-check whether the categorical distinctions in this entry still hold at each review, roughly every 6-12 months.

## Related Decisions

This decision is closely related to [Choosing an Evaluation Strategy](./choose-eval-framework.md) — several tools referenced in both entries (Langfuse, Braintrust, Opik) combine tracing and evaluation functionality, so choosing one often resolves both decisions simultaneously, though the underlying decision criteria remain conceptually distinct.

## Resources

- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)
- [LangSmith](../../projects/benchmarks-and-evals/langsmith-platform.md)
- [Phoenix](../../projects/benchmarks-and-evals/phoenix.md)
- [Helicone](../../projects/benchmarks-and-evals/helicone.md)
- [Braintrust](../../projects/benchmarks-and-evals/braintrust.md)
- [Opik](../../projects/benchmarks-and-evals/opik.md)
- [OpenLIT](../../projects/benchmarks-and-evals/openlit.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
