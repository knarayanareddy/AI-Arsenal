---
id: antigravity-sdk-python
name: antigravity-sdk-python
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Google's Python SDK that wraps the Antigravity runtime so one Agent object owns binary discovery, tools, hooks, and policy"
github_url: "https://github.com/google-antigravity/antigravity-sdk-python"
license: Apache-2.0
primary_language: Python
tags: [agents, llm]
maturity: alpha
cost_model: open-source
github_stars: 3557
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-27"
docs_url: "https://antigravity.google/product/antigravity-sdk"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Hides the compiled runtime and the agentic loop behind a single async context manager instead of hand-wiring both."
best_for:
  - "You are already on Gemini or the Gemini Enterprise Agent Platform and want a stateful agent loop without writing the runtime plumbing."
  - "You are prototyping a console or UI agent and need ChatResponse tokens streamed without building your own transport."
  - "You are moving between API-key Express Mode and ADC-backed regional Vertex endpoints and want one config object covering both."
avoid_if:
  - "You need a provider-neutral stack, because the loop and the runtime binary are tied to Gemini and Antigravity."
  - "You are on a platform with no published wheel, since the compiled runtime ships only inside the platform-specific PyPI wheels."
  - "You expect a source checkout to run, because the README states the binary comes only from PyPI and the repo alone is insufficient."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 3557, Apache-2.0, Python, last commit 2026-09-27, topics, homepage. From README: pip name google-antigravity, Agent/LocalAgentConfig/ChatResponse, Express vs Standard auth, env-var precedence, PyPI-only binary. Hook and tool-registration internals not read."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The SDK exposes Agent and LocalAgentConfig from google.antigravity, with the agent used as an async context manager: entering it performs binary discovery, tool wiring, hook registration, and policy defaults, and awaiting agent.chat(...) returns a ChatResponse whose text is read with response.text(). Iteration over that response with async for yields conversational string tokens as they arrive and is advertised as adding no network overhead. Authentication is deliberately dual-path - Express Mode takes an API key with vertex=True and skips project and region setup, while Standard Mode takes a project and location and authenticates through Application Default Credentials after gcloud auth application-default login. The same settings can arrive as environment variables, and explicit keyword arguments always win over them.

## Why it's in the Arsenal

The decision it removes is whether to build the agent loop, the tool registry, and the runtime lifecycle yourself before writing a single line of agent logic. Google bundles a compiled runtime that discovers itself on disk and owns tool and policy wiring, and the SDK's job is to expose that as an ordinary async object so application code reads as chat calls. The dual authentication path targets the other recurring snag, where moving from a quick prototype to a regional enterprise endpoint normally forks your config code.

## Architecture

Three layers stack: a Python surface that models config and responses, an agentic loop that sequences model calls with tool invocations, and the platform-specific compiled runtime binary that the wheels carry. LocalAgentConfig merges two configuration sources, explicit keyword arguments first and environment variables as fallback, with GOOGLE_GENAI_USE_VERTEXAI or GOOGLE_GENAI_USE_ENTERPRISE selecting Vertex behavior plus GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION for the region. ChatResponse is a thin wrapper exposing text() for the full body and async iteration for streamed tokens, so streaming is a property of the same call rather than a separate API. Examples under examples/getting_started include hello_world.py and vertex.py as executable documentation of both auth modes.

## Ecosystem Position

The SDK overlaps with the OpenAI Agents SDK and Pydantic AI at the agent-loop level and competes with hand-rolled asyncio loops that wire tool calls by hand. Compared with Pydantic AI, which makes schema-typed structured output the central abstraction, Antigravity shifts the center of gravity to a bundled runtime and lifecycle management, so the two answer different questions about where agent state lives. It is not a general tool framework and does not aim to replace LangChain or CrewAI, and it sits above content/projects/inference-engines serving stacks only in the sense that it decides which Gemini endpoint receives the request. It complements content/projects/frameworks entries by giving one of them a ready loop, but it cannot be mixed with them without losing the runtime it wraps.

## Getting Started

Install from PyPI so the compiled runtime binary is present, export a key, and run the bundled example. Cloning the repository is explicitly not enough.

```bash
pip install google-antigravity
export GEMINI_API_KEY="your_api_key_here"
python ./examples/getting_started/hello_world.py
```

For Vertex Standard Mode, run `gcloud auth application-default login` first, then set GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION.

## Key Use Cases

1. Bootstrap an agent service: enter the context manager once and let the SDK handle runtime discovery, tool registration, and policy defaults before you write business logic.
2. Stream to a console or UI: iterate ChatResponse with async for and render tokens as they arrive on the same call surface you already use for the full response.
3. Move a prototype into a regional deployment: flip to Vertex mode and supply project and location, keeping the agent code unchanged.

## Strengths

- One async context manager owns binary discovery, tool wiring, hooks, and policy defaults, which is real plumbing removed.
- Streaming and non-streaming share a single call surface, so you do not maintain two request paths.
- Dual authentication modes let a prototype start on an API key and graduate to ADC-backed regional Vertex endpoints.
- Explicit kwargs take precedence over environment variables, which removes the usual surprise where a shell export silently changes production behavior.

## Limitations

This is a vendor lock-in by construction: the compiled runtime binary is closed-shipped, ships only in platform-specific wheels, and ties the agent loop to Gemini and Antigravity. Vendored binaries are hard to audit and hard to run on unusual architectures or fully offline air-gapped images. The README documents concepts through short examples rather than a reference manual, so hooks, policy defaults, and tool-registration semantics have to be discovered by reading code, and there is no stated compatibility policy for the agent loop shape. Tool registration is the framework's integration seam, and it is not documented in the excerpt, which is where most custom-tool work will land.

## Relation to the Arsenal

This framework-phase entry is a thin, vendor-specific agent loop, best compared against the other runtime frameworks catalogued under content/projects/frameworks. It talks to Gemini directly, so it sits above content/projects/inference-engines only insofar as model hosting is a separate concern from which agent loop you drive. Its tool-wiring surface is where retrieval connectors from content/projects/data-and-retrieval would attach, and it provides nothing for evaluation, so any quality gating has to come from the benchmark tooling elsewhere in the catalog.

## Resources

- [Repository and examples](https://github.com/google-antigravity/antigravity-sdk-python)
- [PyPI package and wheel list](https://pypi.org/project/google-antigravity/)
- [Antigravity product page](https://antigravity.google/product/antigravity-sdk)
