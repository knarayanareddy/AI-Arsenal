---
id: qwen-agent
name: Qwen-Agent
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Agent framework from the Qwen team for building tool-using, code-executing, and RAG agents that exploit Qwen's function calling and long context
github_url: "https://github.com/QwenLM/Qwen-Agent"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Qwen Team (Alibaba)"
tags: [agents, llm, rag]
maturity: beta
cost_model: open-source
github_stars: 16694
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-03-04"
docs_url: "https://github.com/QwenLM/Qwen-Agent"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: agent-system
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, actively-maintained, community-driven]
ecosystem_role:
  - Qwen-native agent framework; the reference option when your stack is built on Qwen models and you want function calling, code interpreter, and RAG components tuned to Qwen rather than a model-agnostic framework
best_for:
  - You are building on Qwen models and want an agent framework tuned to their function calling, long context, and tool use, with reference components (browser assistant, code interpreter, RAG) to start from
  - You want a relatively lightweight, example-driven framework from the model authors rather than a large general-purpose orchestration stack
avoid_if:
  - You need to stay model-agnostic across many providers — a framework like LangGraph or the OpenAI Agents SDK is designed for that, whereas Qwen-Agent is Qwen-centric
  - You need a large ecosystem of integrations and long-term enterprise support — more established agent frameworks have wider tooling
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (16,694), Apache-2.0 license, and last commit (2026-03-04) verified via the GitHub API on 2026-07-08. Feature claims from the README; not hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/QwenLM/Qwen-Agent", "date": "2026-07-08", "description": "16,694 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Qwen-Agent is an agent framework from the Qwen team for building LLM applications that use tools, execute code, and do retrieval, built around Qwen's function-calling and long-context capabilities. It ships reference components — a code interpreter, browser assistant, and RAG examples — that double as building blocks.

## Why it's in the Arsenal

For teams standardized on Qwen models, a framework maintained by the model authors and tuned to their tool-use behavior is a natural fit. It is the Qwen-native comparison point against model-agnostic agent frameworks; the tradeoff (model lock-in vs tighter integration) is stated below.

## Architecture

It wraps a Qwen model with an agent loop that parses tool/function calls, executes registered tools (including a sandboxed code interpreter), and feeds results back for further reasoning. Retrieval and long-document handling lean on Qwen's long context. Reference assistants compose these pieces into runnable apps.

## Ecosystem Position

It competes with model-agnostic agent frameworks (LangGraph, OpenAI Agents SDK, CrewAI, Strands). Its niche is first-party Qwen integration and example-driven components rather than provider neutrality.

## Getting Started

```bash
pip install -U "qwen-agent[gui,rag,code_interpreter]"
# configure a Qwen model (DashScope or local/OpenAI-compatible endpoint), register tools, run the agent
```

## Key Use Cases

1. **Scenario**: a tool-using assistant or code interpreter built on Qwen models
2. **Scenario**: long-document RAG that leverages Qwen's long context
3. **Scenario where this is NOT the right fit**: a provider-agnostic agent that must swap models freely — a neutral framework fits better

## Strengths

- First-party Qwen integration (function calling, long context)
- Ready-made components: code interpreter, browser assistant, RAG
- Lightweight and example-driven

## Limitations

- Qwen-centric; not designed for provider neutrality
- Smaller integration ecosystem than major frameworks
- Reference components need hardening for production

## Relation to the Arsenal

- Compare against `langgraph`, `crewai`, and the OpenAI Agents SDK before adopting.
- Reference this project by its canonical ID `qwen-agent`.
- Sandbox the code interpreter carefully before exposing it to untrusted input.

## Resources

- [GitHub Repository](https://github.com/QwenLM/Qwen-Agent)
