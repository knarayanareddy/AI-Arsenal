---
id: any-agent
name: "any-agent"
type: tool
job: [orchestration, evaluation]
description: "One Python abstraction over many agent frameworks (LangChain, OpenAI Agents, Google ADK, smolagents) plus framework-agnostic tracing and evaluation"
url: "https://mozilla-ai.github.io/any-agent/"
cost_model: open-source
pricing_detail: "Apache-2.0 open source (Mozilla AI); free (you pay your own LLM provider costs)"
tags: [agents, orchestration, evaluation]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open source and free"
self_hostable: true
open_source: true
source_url: "https://github.com/mozilla-ai/any-agent"
docs_url: "https://mozilla-ai.github.io/any-agent/"
github_url: "https://github.com/mozilla-ai/any-agent"
alternatives: [openai-agents-sdk, langchain, smolagents]
integrates_with: [openai-agents-sdk, langchain, smolagents, google-adk]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, research]
best_when:
  - "You want to try/compare multiple agent frameworks behind one API without rewriting your agent for each"
  - "You want framework-agnostic tracing and evaluation (via OpenTelemetry) to benchmark agents apples-to-apples"
avoid_when:
  - "You've already committed to one framework and use its advanced, framework-specific features — the abstraction can hide or lag them"
  - "You need a specific framework's newest capability immediately; a wrapper adds an indirection/latency layer"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (1,181), Apache-2.0 license, and last push (2026-07-01) verified via the GitHub API on 2026-07-08. Feature claims from official docs; not hands-on verified here."
verdict: solid-choice
verdict_rationale: "Useful meta-layer for evaluating and switching agent frameworks; by nature it trails each framework's bleeding edge"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/mozilla-ai/any-agent", "date": "2026-07-08", "description": "1,181 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

any-agent (Mozilla AI) is a single Python API that wraps many agent frameworks — LangChain, OpenAI Agents SDK, Google ADK, smolagents, and more — so you can define an agent once and run it on any of them. It adds a framework-agnostic tracing and evaluation layer (OpenTelemetry-based) so agents built on different frameworks can be compared on the same footing.

## Why It's in the Arsenal

It earns a place because choosing an agent framework is high-stakes and hard to reverse; any-agent lets you defer and compare that choice empirically. It is a comparison point / meta-layer for the orchestration phase, not an unconditional recommendation — see Strengths / Limitations.

## Key Features

- One API over multiple agent frameworks (build once, swap backend)
- Framework-agnostic tracing via OpenTelemetry
- Built-in agent evaluation to compare frameworks/configs
- Serve agents over A2A/MCP-style interfaces

## Architecture / How It Works

any-agent defines a common agent configuration (model, tools, instructions) and adapters that translate it into each supported framework's native constructs. Execution is traced through a shared telemetry layer, so runs across frameworks emit comparable spans/metrics that the evaluation module scores against your criteria.

## Getting Started

```bash
pip install any-agent
# from any_agent import AnyAgent, AgentConfig
# agent = AnyAgent.create("openai", AgentConfig(model_id=..., tools=[...]))
# swap "openai" for "langchain"/"smolagents"/... to compare
```

## Use Cases

1. **Scenario**: benchmark the same agent across frameworks before committing
2. **Scenario**: get uniform tracing/evaluation regardless of the underlying framework
3. **Scenario where this is NOT the right fit**: you rely on one framework's advanced, native-only features — the abstraction may not expose them

## Strengths

- Avoids lock-in; empirical framework comparison
- Consistent observability/evaluation across frameworks
- Backed by Mozilla AI

## Limitations / When NOT to Use

- Abstraction can lag or hide framework-specific features
- Extra indirection layer to maintain and debug
- Younger project; coverage varies by framework

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against committing directly to `openai-agents-sdk`, `langchain`, or `smolagents` — any-agent wraps these rather than replacing them.
- Link this tool from job guides using its canonical ID `any-agent`.
- Record which frameworks/features you depend on before production adoption.

## Resources

- [Official Site & Docs](https://mozilla-ai.github.io/any-agent/)
- [GitHub](https://github.com/mozilla-ai/any-agent)

## Buzz & Reception

- 1,181 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
