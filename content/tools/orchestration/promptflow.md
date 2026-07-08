---
id: promptflow
name: Prompt flow (Microsoft)
type: tool
job: [orchestration, evaluation]
description: Microsoft's LLM app development suite — build flows as executable DAGs with a visual trace UI, batch-evaluate them, and deploy the same flow to Azure ML
url: "https://microsoft.github.io/promptflow/"
cost_model: open-source
pricing_detail: Open source (MIT); Azure AI integration billed separately if used
tags: [llm, agents, evaluation]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source locally; Azure services are pay-as-you-go
self_hostable: true
open_source: true
source_url: "https://github.com/microsoft/promptflow"
docs_url: "https://microsoft.github.io/promptflow/"
github_url: "https://github.com/microsoft/promptflow"
alternatives: [langfuse, promptfoo]
integrates_with: [azure-ai-studio]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when:
  - Your organization is on Azure and wants one artifact from prototype to production — a flow authored locally runs unchanged as an Azure ML/AI Studio managed endpoint, with the same tracing and evaluation attached
  - You want evaluation wired into development, not bolted on — batch runs execute a flow over a dataset and score it with evaluation flows, making prompt changes measurable before deploy
avoid_when:
  - You need dynamic agentic control flow (loops, planner-driven tool selection, multi-agent handoffs) — Prompt flow's DAG model fits pipeline-shaped apps; agent frameworks fit open-ended ones
  - You're avoiding ecosystem coupling — outside Azure, the deploy/monitor story thins and general-purpose frameworks plus a dedicated eval tool cover the same ground
version_tracked: null
verdict: solid-choice
verdict_rationale: The strongest option for Azure-centric teams because the local-to-managed-endpoint path is real; elsewhere a competent but ecosystem-flavored choice
status: active
---

## Overview

Prompt flow is Microsoft's development suite for LLM applications: flows are DAGs of Python and LLM nodes defined in YAML, executed with full tracing, visualized in a local UI, batch-run over datasets for evaluation, and deployable as-is to Azure ML / AI Studio managed endpoints. It bundles what is usually three tools — orchestration, tracing, and evaluation — into one flow artifact.

## Why It's in the Arsenal

Its distinctive mechanism is the single-artifact lifecycle: the same flow definition is the dev harness, the eval target, and the production deployment, which eliminates the rewrite step where most prototype quality evaporates. For the large population of Azure-committed teams it's the default answer, and its built-in batch-evaluation loop is a pattern worth stealing even if you don't adopt the tool.

## Key Features

- Flows as YAML DAGs of Python/LLM/prompt nodes with variants for A/B-ing prompts
- Local visual trace UI showing every node's inputs, outputs, latency, and token usage
- Batch runs + evaluation flows: score a flow over a dataset with LLM-graded or coded metrics
- One-command deployment of a flow to Azure ML endpoints; VS Code extension for authoring

## Architecture / How It Works

A flow directory (flow.dag.yaml + node sources) is the unit of everything: the executor resolves the DAG, streams traces per node, and exposes the flow as a function, a batch job, or an HTTP endpoint. Evaluation is the same machinery pointed at outputs — an evaluation flow consumes another flow's batch results and emits metrics, so eval infra is not a separate system.

## Getting Started

```bash
pip install promptflow promptflow-tools
pf flow init --flow my_flow --type chat
pf flow test --flow my_flow --interactive
pf run create --flow my_flow --data data.jsonl   # batch run for evaluation
```

## Use Cases

1. **Scenario**: an Azure-based team shipping a RAG or copilot app that must move from notebook to managed endpoint without a rewrite
2. **Scenario**: gating prompt changes on batch-eval scores over a golden dataset before deployment
3. **Scenario where this is NOT the right fit**: an autonomous agent that plans its own tool calls at runtime — the static DAG model is the wrong shape; use an agent framework

## Strengths

- Prototype-to-production continuity on Azure is genuinely unmatched by framework-plus-glue stacks
- Evaluation as a first-class flow type builds the measure-before-ship habit into the workflow

## Limitations / When NOT to Use

- DAG-shaped: poor fit for dynamic agentic control flow
- Value concentrates inside Azure; standalone users trade ecosystem coupling for features other stacks match

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `promptflow` rather than duplicating details.

## Resources

- [GitHub](https://github.com/microsoft/promptflow)
- [Docs](https://microsoft.github.io/promptflow/)

## Buzz & Reception

11.2k GitHub stars (verified via API 2026-07-08); MIT; Microsoft-maintained. The reference LLM-app toolchain within the Azure AI ecosystem.

---
*Last reviewed: 2026-07-08 by @maintainer*
