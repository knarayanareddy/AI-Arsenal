---
id: vellum
name: Vellum
type: tool
job: [prompt-management, evaluation]
description: Commercial platform to build LLM apps — prompt/workflow authoring, evaluation, versioning, and deployment via a visual builder plus SDK
url: "https://www.vellum.ai"
cost_model: freemium
pricing_detail: Free tier for evaluation; paid team/enterprise plans for production usage and collaboration
tags: [llm, evaluation]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free tier for small projects/evaluation; paid plans for production volume and team features
self_hostable: false
open_source: false
source_url: "https://www.vellum.ai"
docs_url: "https://docs.vellum.ai/home/getting-started/overview"
github_url: null
alternatives: [langsmith, humanloop, promptlayer, langfuse-prompts]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [production]
best_when:
  - Non-engineers (PMs, domain experts) need to iterate on prompts and workflows collaboratively while engineers keep versioning, evals, and deployment under control
  - You want prompt/workflow authoring, side-by-side evaluation, and deployment in one platform rather than stitching several point tools together
avoid_when:
  - You are a code-first team happy managing prompts in your repo with an open eval/observability stack — a closed platform adds cost and lock-in you may not need
  - You require self-hosting or full data control — Vellum is a hosted, closed product
version_tracked: null
enrichment_status: draft
enrichment_notes: Hosted, closed platform (no public GitHub repo). Feature breadth (authoring + eval + deploy) is vendor-described; evaluate the eval rigor against your needs. Free-tier limits are directional — confirm on the pricing page.
verdict: solid-choice
verdict_rationale: A capable all-in-one LLM-app platform whose real edge is cross-functional collaboration (non-engineers + engineers); code-first teams may prefer composing open tools instead
status: active
---

> **TL;DR:** A commercial platform for building, evaluating, versioning, and deploying LLM apps, with a visual builder for prompts/workflows plus an SDK — aimed at letting non-engineers and engineers collaborate on the same production app. Freemium; a solid choice when cross-functional prompt iteration matters.

## Overview

Vellum is an end-to-end platform for LLM application development: authoring prompts and multi-step workflows (visually or via SDK), running evaluations against test suites, versioning changes, and deploying to production behind an API. It targets the workflow gap where product/domain experts want to shape prompts but engineers need versioning, testing, and deployment discipline.

## Why It's in the Arsenal

Prompt-and-workflow iteration is often split across a playground, a spreadsheet of test cases, and ad-hoc deploys. Vellum earns a dx-and-tooling entry by unifying authoring, evaluation, and deployment with collaboration for non-engineers — a different emphasis than developer-first tools like LangSmith or open prompt registries, which is where it's worth reaching for over composing point tools.

## Key Features

- Visual builder for prompts and multi-step workflows, plus an SDK for code-first use
- Evaluation suites: run prompt/workflow variants against test cases and compare outputs
- Versioning and environment management for prompts/workflows
- Deployment behind a managed API with monitoring of production requests

## Architecture / How It Works

Prompts and workflows are authored and versioned in Vellum's platform; you attach evaluation datasets and metrics to compare variants before promoting a version. Deployed workflows are served behind Vellum's API, and production requests are logged for monitoring. Engineers can drive the same objects via the SDK, so visual edits and code stay in sync on one source of truth.

## Getting Started

```python
pip install vellum-ai
# from vellum.client import Vellum
# client = Vellum(api_key="...")
# Author a prompt/workflow in the UI, then invoke the deployed version:
# result = client.execute_workflow(workflow_deployment_name="my-workflow", inputs=[...])
# See docs (Resources) for eval suites and versioning.
```

## Use Cases

1. **Scenario**: a support-automation team where PMs tune prompts and engineers own evals, versioning, and the production endpoint
2. **Scenario**: comparing several prompt/workflow variants against a labeled test set before promoting the winner to production

## Strengths

- Unifies authoring, evaluation, versioning, and deployment so teams stop stitching tools together
- Visual builder lowers the barrier for non-engineers while the SDK keeps engineers in control
- Built-in evaluation encourages test-before-deploy discipline for prompt changes

## Limitations / When NOT to Use

- Closed, hosted platform: lock-in and no self-hosting, which some teams cannot accept
- Code-first teams may prefer keeping prompts in-repo with open eval/observability tooling
- Eval depth and metrics are the platform's; specialized eval needs may still require a dedicated tool

## Integration Patterns

- Use Vellum as the collaborative authoring + eval + deploy layer, calling deployed workflows from your app via SDK/API
- Compare with developer-first [LangSmith](../evaluation-and-observability/langsmith.md) and [Humanloop](../evaluation-and-observability/humanloop.md), and with prompt registries [PromptLayer](./promptlayer.md) and [Langfuse Prompts](./langfuse-prompts.md)
- Pair with a dedicated eval framework (Promptfoo, Ragas) when you need evaluation beyond the platform's built-ins

## Resources

- [Website](https://www.vellum.ai)
- [Documentation](https://docs.vellum.ai/home/getting-started/overview)

## Buzz & Reception

Vellum is a frequently-shortlisted commercial LLM-app platform, particularly for teams that need non-engineers in the prompt-iteration loop; as a closed product its traction shows through customer case studies rather than repo stars.
