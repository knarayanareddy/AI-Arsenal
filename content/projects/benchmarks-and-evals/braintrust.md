---
id: braintrust
name: Braintrust
version_tracked: null
artifact_type: service
category: observability
subcategory: tracing
description: "TypeScript SDK that emits traces, runs scored evals and wraps OpenAI, LangChain, OpenTelemetry and Temporal code for the Braintrust platform"
github_url: "https://github.com/braintrustdata/braintrust-sdk-javascript"
license: Apache-2.0
primary_language: TypeScript
org_or_maintainer: null
tags: [evaluation, tracing, observability, llm]
maturity: beta
cost_model: usage-based
github_stars: 28
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-09-28"
docs_url: "https://www.braintrust.dev/docs/reference/sdks/typescript"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: platform
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - Managed evaluation and observability platform, positioned around rigorous, data-driven LLM evaluation workflows
best_for: ["You ship a TypeScript product whose quality depends on model output and you want per-span traces with token counts attached to the same place as your regression scores.", "You are swapping models or rewriting prompts and you need an eval harness that runs from the CLI on a committed dataset instead of by reading transcripts.", "Your TypeScript stack already speaks OpenTelemetry or runs Temporal workflows, and you want those spans folded into the same trace without rewriting the instrumentation layer."]
avoid_if: ["You cannot send prompts and completions to a third-party service, because the platform this SDK targets is hosted and trace payloads leave your process.", "You are a Python shop, because the Python SDK was split out into a separate braintrust-sdk-python repository and is not covered by this package.", "You want evaluation that runs with no hosted backend at all, because this SDK writes results to a Braintrust workspace keyed on BRAINTRUST_API_KEY rather than to a local file."]
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, langsmith-platform, phoenix, helicone]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production case studies found beyond the project's own marketing site; as a closed-source managed service, internal architecture details are not independently verifiable from a public repository.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

This repository is the JavaScript and TypeScript half of Braintrust's tooling: the core `braintrust` package covers logging, tracing, evals and a `bt` CLI, while the packages under ./integrations wrap individual frameworks. The package table lists `@braintrust/browser` with an AsyncLocalStorage polyfill for bundler targets that lack it, `@braintrust/otel` as a span processor for OpenTelemetry compatibility, `@braintrust/temporal` as a client and worker plugin with workflow interceptors, plus two deprecated packages (`@braintrust/langchain-js` and `@braintrust/openai-agents`) that now live inside the main package. The repo was renamed from braintrust-sdk when the Python code moved out, and the quickstart pairs `Eval(...)` with autoevals scorers such as LevenshteinScorer.

## Why it's in the Arsenal

The recurring decision is how you tell whether a change made the product better. Ad-hoc prompt tweaking produces anecdotes; this SDK makes the evidence path mechanical, because a trace records what the app actually sent and received, and an Eval run scores a dataset against the same task function. The unresolved question is hosting, because the SDK is Apache-2.0 while the platform it feeds is a commercial service, so a team with a data-residency constraint has to weigh the SDK's convenience against the fact that payloads leave the process.

## Architecture

The core package exposes an `Eval` construct that takes a name, a data source, a task function and a scores array; the task is executed over the dataset and each row is scored by the supplied scorers before results are written to the workspace. Integration packages are thin adapters that translate a framework's own call and span objects into Braintrust's log shape rather than reimplementing instrumentation, which is why the OpenTelemetry package is a span processor and the Temporal package is a client/worker plugin with workflow interceptors that open spans around workflow and activity boundaries. The `bt` CLI, invoked as `npx bt` or `pnpm exec bt`, covers the command surface such as `braintrust eval` against a `.eval.ts` file. Authentication is a single BRAINTRUST_API_KEY environment variable read at eval or publish time.

## Ecosystem Position

Where Langfuse, Phoenix and Opik all bundle their own tracing backends, this repository is only the client half of one of them, so it complements rather than replaces a Langfuse or Opik deployment you already run. It competes with DeepEval and Ragas for the eval-authoring role, but the authored artefact is a TypeScript module and a CLI invocation instead of a Python test suite, which is the deciding difference for a Node codebase. Compared with the OpenLLMetry and OpenTelemetry entries in content/projects/benchmarks-and-evals, it is a vendor-bound wrapper: the span data is Braintrust's shape, so switching backends means re-adapting at the integration layer rather than changing a collector URL.

## Getting Started

Install the core SDK plus the autoevals scorer pack, write an eval module, then run it with the CLI and your key:

```bash
npm install braintrust autoevals
# tutorial.eval.ts: Eval("Say Hi Bot", { data, task, scores: [LevenshteinScorer] })
BRAINTRUST_API_KEY=<YOUR_API_KEY> npx braintrust eval tutorial.eval.ts
```

The `bt` CLI is installed alongside the package and is also reachable through npx or pnpm exec.

## Key Use Cases

1. Prompt regression suite: keep a versioned dataset and a task function, so a prompt edit shows up as a score delta rather than as a vibe check.
2. Cross-framework tracing: instrument the OpenAI client, a LangChain chain and a Temporal workflow through the same workspace so one request tells a single story.
3. Browser-side capture: use the @braintrust/browser build with its AsyncLocalStorage polyfill to keep trace context alive inside a bundled frontend.

## Strengths

- One package family covers the model call, the retrieval framework, the OTel span and the durable workflow, so instrumentation is not re-written per layer.
- Evals are plain TypeScript modules executed by a CLI, which fits an existing npm test-runner culture better than a Python eval harness.
- Apache-2.0 client code, and the repo publishes its own release notes so SDK breaking changes are traceable.
- The Temporal plugin's workflow interceptors give durable-execution spans a first-class shape rather than retrofitting them onto generic HTTP traces.

## Limitations

The repository is a client, not a platform: adopting it means adopting Braintrust's hosted workspace, and the star count on this JavaScript repo is a small fraction of the platform's reach because the Python SDK and the backend live elsewhere, so repo metrics understate real adoption. Two of the six published integration packages are explicitly deprecated, which tells you the package boundary is still moving and that older docs will name packages that no longer carry the feature. Trace volume has a direct cost: high-traffic apps log every span, so retention and sampling policy are budget decisions rather than afterthoughts. Evaluation quality is only as good as the dataset, and autoevals scorers such as LevenshteinScorer are a starting point rather than a substitute for a domain-specific rubric.

## Relation to the Arsenal

This is the JavaScript entry in content/projects/benchmarks-and-evals, and the natural companion to the observability entries in the same phase rather than a replacement for them: those capture generic spans, this one adds eval runs on top of the same trace data. Where content/projects/frameworks entries such as LangChain generate the calls, this SDK records and scores them, and the MCP-style integration packages here are the seam a content/tools/dx-and-tooling agent harness would use to make its own work measurable. If your stack is Python, read the sibling braintrust-sdk-python entry instead and treat this one as out of scope.

## Resources

- [GitHub — braintrustdata/braintrust-sdk-javascript](https://github.com/braintrustdata/braintrust-sdk-javascript)
- [TypeScript SDK reference](https://www.braintrust.dev/docs/reference/sdks/typescript)
- [bt CLI quickstart and release notes](https://www.braintrust.dev/docs/reference/cli/quickstart)
