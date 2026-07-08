---
id: strands-agents
name: "Strands Agents SDK"
type: tool
job: [orchestration]
description: "Open-source model-driven agent SDK from AWS: build agents from a model + tools + prompt with a native agentic loop, MCP support, and provider-agnostic models"
url: "https://strandsagents.com"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; free (you pay for whatever model provider/hosting you use)"
tags: [agents, orchestration, tool-use]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "SDK is free; model inference billed by your chosen provider"
self_hostable: true
open_source: true
source_url: "https://github.com/strands-agents/sdk-python"
docs_url: "https://strandsagents.com/"
github_url: "https://github.com/strands-agents/sdk-python"
alternatives: [openai-agents-sdk, pydantic-ai-tool, crewai]
integrates_with: [composio, litellm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when:
  - "You want a lightweight, model-driven agent loop (model decides tool calls) rather than a hand-wired graph, with first-class MCP tool support"
  - "You want provider-agnostic backends (Bedrock, Anthropic, OpenAI, local) behind one agent API"
avoid_when:
  - "You need deterministic, explicitly-authored control flow — a graph framework gives more control than a model-driven loop"
  - "You've already standardized on another agent SDK; the core loop abstractions are similar enough that switching rarely pays off"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (6,483), Apache-2.0 license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08 (repo resolves from strands-agents/sdk-python). Feature claims from official docs; not hands-on verified here."
verdict: watching
verdict_rationale: "Clean model-driven agent SDK with strong MCP/provider support and AWS backing; the model-driven-loop category is still consolidating against graph-based frameworks"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/strands-agents/sdk-python", "date": "2026-07-08", "description": "6,483 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Strands Agents is an open-source SDK (open-sourced by AWS) that takes a model-driven approach to agents: you supply a model, a set of tools, and a prompt, and the SDK runs the reasoning/tool-use loop, letting the model decide which tools to call. It has native Model Context Protocol (MCP) support and is provider-agnostic across model backends.

## Why It's in the Arsenal

It earns a place because it represents the "let the model drive the loop" school of agent building (versus explicitly-wired graphs), backed by AWS and with strong MCP integration. It is a comparison point against other agent SDKs in the orchestration phase, not an unconditional recommendation — see Strengths / Limitations.

## Key Features

- Model-driven agentic loop (model plans and calls tools)
- Native MCP client support for external tool servers
- Provider-agnostic models (Amazon Bedrock, Anthropic, OpenAI, local, others)
- Multi-agent primitives and streaming

## Architecture / How It Works

An `Agent` binds a model, a tool registry, and a system prompt. On each turn the model receives the conversation plus available tool schemas, may emit tool calls that the SDK executes (including MCP-served tools), feeds results back, and repeats until it produces a final answer — so control flow emerges from the model rather than a static graph.

## Getting Started

```bash
pip install strands-agents strands-agents-tools
# from strands import Agent ; agent = Agent(model=..., tools=[...]) ; agent("your task")
```

## Use Cases

1. **Scenario**: build a tool-using assistant where the model decides the steps, with MCP tools plugged in
2. **Scenario**: keep model provider optionality (Bedrock now, another provider later) behind one agent API
3. **Scenario where this is NOT the right fit**: workflows needing explicit, deterministic step control — a graph framework fits better

## Strengths

- Minimal, model-driven agent abstraction
- First-class MCP and multi-provider support
- Backed and used by AWS; production-oriented

## Limitations / When NOT to Use

- Model-driven loops trade determinism for flexibility
- Younger ecosystem than the most established agent frameworks
- Multi-agent/complex orchestration patterns still maturing

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `openai-agents-sdk`, `pydantic-ai-tool`, and `crewai` before adopting — they compete for the same orchestration job.
- Link this tool from job guides using its canonical ID `strands-agents`.
- Record model-provider and hosting assumptions before production adoption.

## Resources

- [Official Site](https://strandsagents.com)
- [Documentation](https://strandsagents.com/)
- [GitHub](https://github.com/strands-agents/sdk-python)

## Buzz & Reception

- 6,483 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
