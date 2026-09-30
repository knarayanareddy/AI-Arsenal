---
id: arize-ai-openinference
name: "openinference"
version_tracked: null
artifact_type: library
category: observability
subcategory: tracing
description: "OpenTelemetry semantic conventions and instrumentors for generative-AI spans, so LLM calls carry standard attributes regardless of which SDK issued them"
github_url: "https://github.com/Arize-ai/openinference"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Arize-ai"
tags: [observability, tracing, llm]
maturity: production
cost_model: open-source
github_stars: 1238
github_stars_last_30d: 0
trending_score: 25
last_commit: "2026-09-28"
docs_url: "https://arize-ai.github.io/openinference/"
demo_url: null
paper_url: null
paper_id: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "OpenTelemetry semantic conventions and instrumentation for LLM calls, which is the layer that makes AI traces comparable across vendor SDKs."
best_for:
  - "You need LLM traces to appear in an OpenTelemetry backend you already run, with standard attributes rather than a vendor format."
  - "You are switching agent frameworks or model providers and need traces that stay comparable across the change."
  - "You need prompt, completion, token counts, and model name on spans in a form a generic observability tool can query."
avoid_if:
  - "You want LLM-specific dashboards, evaluations, and alerting out of the box, since a convention produces spans rather than a product."
  - "You are on an older OpenTelemetry Collector with no support for the GenAI conventions, where the attributes go unread."
  - "You have no collector and no interest in one, since the value here is interoperability, which is what you would not be using."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (1238), Apache-2.0 license, last commit 2026-09-28, primary language Python, and all 19 topics were read from the GitHub API. Semantic conventions for LLM, retrieval, embedding, and agent spans, the versioned attribute model, per-framework instrumentors, and HTTP-level context propagation come from the official docs; no trace was emitted and no collector was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Arize-ai/openinference", "date": "2026-09-28", "description": "1,238 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

openinference defines semantic conventions for generative-AI telemetry within OpenTelemetry, together with the instrumentors that populate them. The convention specifies span names, span kinds, and a fixed set of attributes for an LLM call: the model, the provider, the input and output messages as structured attributes, token counts broken into input and output, and identifiers such as a span and session id. It also defines conventions for retrieval, embedding, agent, and tool spans, so a RAG pipeline or an agent loop produces a consistent span tree rather than an opaque nest of custom attributes. Instrumentation is provided for major providers and frameworks, and traces export over standard OTLP to whatever collector or backend you run. Because it is a convention, the same trace is readable in a generic OpenTelemetry UI and in AI-aware backends that implement the convention.

## Why it's in the Arsenal

The decision it resolves is whether AI traces are portable. A vendor SDK emits spans with its own attribute names and its own span structure, so a dashboard tuned to one SDK misinterprets another's traces, and a framework migration silently loses the observability you built. Encoding the attributes as OpenTelemetry semantic conventions means the trace is a first-class OTLP span, so your existing collector, storage, and dashboards work unchanged and the AI-specific fields are available as ordinary attributes to filter on. The second benefit is comparability: once prompts, token counts, and model names are named the same way across providers, you can ask which model used fewer tokens for the same task across a fleet, which is exactly the question a vendor-specific format makes hard. The third is that a community convention is a stability target, and conventions are versioned in a way a proprietary format is not.

## Architecture

The project has two parts. The semantic conventions module defines the attribute keys, their types, and their required or recommended status for each span type, following the OpenTelemetry conventions versioning model, so a trace records which convention version was applied. The instrumentors are thin wrappers around provider and framework clients: they intercept a model call, start a span of the appropriate kind, extract the prompt and messages, set the model and token attributes on completion, propagate the trace context into the underlying HTTP request, and end the span. Because propagation happens at the HTTP layer, the LLM call joins the same trace as the retrieval that produced its context, which is what makes a RAG pipeline legible as one trace rather than two disconnected ones. Instrumentation is configured with a tracer provider and an exporter, so it fits an existing OpenTelemetry setup, and auto-instrumentation is available for supported frameworks.

## Ecosystem Position

openinference is a rather than an alternative to an AI-specific observability product: it defines the trace format that such products consume, so a vendor backend implements these conventions while a generic OpenTelemetry backend stores the same spans with the AI fields as ordinary attributes. It competes with each provider's own tracing SDK, and it wins on portability, since swapping a model provider does not invalidate your dashboards, while it loses on out-of-the-box analysis, alerting, and cost tooling. It overlaps with the OpenLLMetry and OpenLLMetry-style tracing projects and with native framework callbacks such as LangSmith or Langfuse, but it is the layer that keeps a trace readable after you leave those. It complements the observability entry in the same phase and is a prerequisite for the evaluation tooling, since a metric computed offline has no production counterpart without these spans.

## Getting Started

Install the instrumentor for your stack and export to a collector:

```bash
pip install openinference-instrumentation-openai
pip install opentelemetry-exporter-otlp
```

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
export OPENINFERENCE_TRACING_ENABLED=true
python app.py     # LLM spans now flow to your collector
```

```python
# manual instrumentation when auto-instrumentation does not reach your call site
from openinference.instrumentation.openai import OpenAIInstrumentor

OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)
```

```python
# retrieval and embedding conventions give a RAG pipeline one connected trace
from openinference.instrumentation.langchain import LangchainInstrumentor
from openinference.semconv.trace import SpanAttributes

LangchainInstrumentor().instrument()
# emitted spans carry llm.model_name, llm.token_count.prompt,
# llm.token_count.completion, retrieval.query, and embedding.embedding_model_name
```

```python
# query the attributes from any OTLP backend
# span name llm, attribute llm.token_count.prompt > 2000, grouped by llm.model_name
```

Verify propagation by checking that a retriever span and its LLM span share a trace id; if they do not, the instrumentor was not attached early enough.

## Key Use Cases

1. Getting LLM calls into an existing OpenTelemetry stack so prompts, completions, and token counts are queryable with the rest of your traces.
2. Comparing providers or frameworks, since the conventions name the model and token counts identically so a cost and latency query works across both.
3. Tracing a RAG or agent pipeline as one connected trace, where retrieval, embedding, and generation spans share context instead of forming separate systems.

## Strengths

- Semantic conventions rather than a proprietary format, so traces stay readable in a generic OpenTelemetry backend and survive a vendor change.
- Standard attributes for prompts, completions, model names, and token counts, which is what makes cross-provider comparison possible.
- Context propagation at the HTTP layer, so retrieval and generation spans join one trace and a RAG pipeline is legible end to end.
- Versioned conventions, so a trace records which specification version applied rather than silently changing meaning.

## Limitations

It produces spans and nothing more: no dashboards, no evaluations, no anomaly detection, and no cost alerting, so an AI-aware backend remains necessary for the parts of observability teams actually look at. Instrumentation only works where it attaches, and auto-instrumentation misses a call made through an unpatched code path, which shows up as a silently missing span rather than an error. The value depends on a collector and a backend that implement the conventions, and an older or partial implementation will carry attributes nothing reads, so a upgrade path on the observability side is a prerequisite. Version skew between the instrumentor, the OpenTelemetry API, and the conventions is the most common break, and the attribute set is a moving target as the conventions evolve. Finally, prompts and completions land in spans by design, which is a data-governance decision about what may be sent to your tracing backend and should be made deliberately.

## Relation to the Arsenal

This is a benchmarks-and-evals phase entry in the observability subcategory, and it is the instrumentation layer beneath every production AI system rather than a tool you evaluate results with. The agents and agent frameworks in the agent-systems phase are the systems whose calls it traces, and the serving entries in the inference-engine phase appear as the model endpoints on those spans. Its cost and latency attributes are what the guidellm entry in the same phase measures offline, so the two cover the gap between a benchmark run and production reality. The RAG entries in data-and-retrieval appear as the retrieval and embedding spans that make a RAG trace readable.

## Resources

- [openinference GitHub repository](https://github.com/Arize-ai/openinference)
- [openinference documentation](https://arize-ai.github.io/openinference/)
- [OpenInference instrumentation packages, one per framework](https://github.com/Arize-ai/openinference/tree/main/packages)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (1,238 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
