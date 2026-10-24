---
id: ruby-llm
name: "RubyLLM"
type: tool
job: [orchestration, structured-output]
description: "Idiomatic Ruby client for multi-provider chat, tool calling, structured output and embeddings"
url: "https://github.com/crmne/ruby_llm"
cost_model: open-source
pricing_detail: "MIT-licensed gem; inference is billed by OpenAI, Anthropic, Gemini or your local Ollama host"
tags: [llm, orchestration, tool-use, structured-output, embeddings]
maturity: beta
stack: [ruby]
free_tier: true
free_tier_limits: "MIT source is free; provider usage is billed per token, and Ollama keeps it local"
self_hostable: true
open_source: true
source_url: "https://github.com/crmne/ruby_llm"
docs_url: null
github_url: "https://github.com/crmne/ruby_llm"
alternatives: []
integrates_with: []
added_date: "2026-10-18"
last_reviewed: "2026-10-18"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Removes the sidecar-Python tax for Rails teams by putting provider translation, tools and schemas in the Ruby process; the price is a thinner surrounding AI ecosystem"
status: active
phase: orchestration
audience: [production, prototype]
best_when:
  - "The application is a Rails or Ruby service and a Python sidecar would add a deployment unit and a second on-call surface for no functional gain"
  - "Prompt code should live beside the domain model it serves, with provider differences normalised behind one call"
avoid_when:
  - "You need vector store bindings, chunking strategies or fine-tuning tooling that only Python libraries provide today"
  - "The workload is thousands of concurrent streaming connections, where the GVL becomes the bottleneck before the model does"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Interface described from the repository README; no throughput test was run, so concurrency claims under the GVL remain untested here."
buzz_sources: []
---

## Overview

RubyLLM is a native Ruby client that treats model providers as interchangeable. Chat, streaming, tool calling, structured output, multimodal payloads and embeddings are exposed through one object model, so an application written against Anthropic can move to OpenAI or a local Ollama instance without rewriting its call sites.

The design goal is to make AI a normal part of a Rails codebase. That means idiomatic Ruby: objects rather than nested hashes, environment-based credential configuration, retries and error normalisation handled inside the client, and streaming surfaced as an enumerator instead of a raw SSE parse loop.

Provider-specific schema differences are translated internally — tool definitions, JSON response formats and multimodal content blocks all arrive in a canonical shape, which is what keeps a provider swap a configuration change.

## Why It's in the Arsenal

The Arsenal catalogues language ecosystems explicitly because availability, not capability, decides what a team actually ships. For Ruby shops the realistic alternatives have been a hand-rolled HTTP client, an unmaintained gem, or a Python sidecar running a framework the team does not operate.

This entry is the reference for the third option being unnecessary. It also documents the boundary honestly: orchestration is solved in Ruby, while the surrounding retrieval and training ecosystem is not.

## Key Features

- One interface across OpenAI, Anthropic, Gemini and Ollama, configured from environment variables.
- Structured output enforced via JSON schema and provider response formats, returning typed Ruby objects rather than loose hashes.
- Tool calling declared as Ruby classes with argument schemas, invoked in-process with results fed back to the model.
- Multimodal assembly for images, base64 assets and PDFs alongside text.
- Embedding helpers for both hosted models and local Ollama, for teams building retrieval without a second stack.
- Streaming over SSE exposed as idiomatic Ruby enumeration.

## Architecture / How It Works

Each provider adapter maps a canonical request — system instructions, message history, sampling settings, tools and output format — onto that vendor's wire format, then normalises the response back. Streaming adapters parse server-sent events and yield deltas, which keeps the calling code free of transport concerns while preserving token-level latency.

Tool invocation is a local concern: the gem validates arguments against the declared schema, calls the Ruby method and returns the result as a tool message, so a failing tool becomes a structured error the model can respond to rather than an exception in the request path. Credentials resolve through environment variables per provider, which makes Rails credentials or a secrets manager the only place keys live.

## Getting Started

Add the gem to the bundle, export the API keys for the providers you intend to use, and make one chat call in a console before wiring anything into a model or controller. Then add a single tool class and a structured-output schema and confirm both in isolation; those two features are where provider differences actually bite, so proving them early is cheaper than debugging them under a request.

## Use Cases

1. An assistant embedded in a Rails admin panel that answers questions over the application's own records using tool calls into existing models.
2. Background enrichment jobs that extract structured fields from support tickets or documents, writing typed results to the database.
3. A hybrid deployment where routine classification runs on a local Ollama model and hard cases escalate to a hosted provider through the same interface.
4. Retrieval over an internal knowledge base where embeddings are generated locally and stored in whatever vector capability you already run.

## Strengths

- Provider translation is centralised, so adding a second model vendor is a configuration change rather than a new client.
- Tool schemas and structured outputs share one declaration style, which keeps validation close to the Ruby method it protects.
- Error normalisation and retries inside the client mean request handlers stay free of provider-specific rescue trees.
- Staying in-process removes a network hop, a deployment unit and a language boundary from the request path.

## Limitations / When NOT to Use

- The surrounding ecosystem is thinner: specialised vector store bindings, advanced chunkers and fine-tuning toolchains are still Python-first, so those become your integrations.
- The GVL limits concurrent streaming throughput; at high volume you will be tuning thread pools or moving work into Sidekiq rather than relying on the web tier.
- New provider features land in official SDKs first, so experimental capabilities — prompt caching flags, proprietary endpoints — may lag in the Ruby surface.
- The gem is beta, so pin versions and read release notes before upgrading a production application.

## Integration Patterns

Call the client from service objects or jobs rather than controllers, so retries and timeouts are decided in one place. Keep tool implementations thin wrappers over existing domain services; that way authorisation and idempotency remain where the rest of the application already enforces them. For streaming, proxy deltas through your own endpoint with a correlation identifier so latency and token counts can be recorded server-side instead of inferred from the browser.

## Resources

- [GitHub — crmne/ruby_llm](https://github.com/crmne/ruby_llm)

## Buzz & Reception

The entry reflects the project README and its visible adoption in the Rails community; no independent throughput benchmark is recorded, and the concurrency characteristics under the GVL are the claim most likely to surprise a team at scale. Measure your own streaming profile before assuming parity with a Python deployment.
