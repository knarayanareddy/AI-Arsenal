---
id: qwen-agent
name: Qwen-Agent
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "Alibaba's agent framework for Qwen models with RAG, code interpreter, MCP and a Gradio demo application"
github_url: "https://github.com/QwenLM/Qwen-Agent"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Qwen Team (Alibaba)"
tags: [rag, retrieval]
maturity: production
cost_model: open-source
github_stars: 17132
github_stars_last_30d: 0
trending_score: 38
last_commit: "2026-03-04"
docs_url: "https://qwenlm.github.io/Qwen-Agent/"
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
best_for: ["You are serving Qwen or QwQ models and need the function-calling template that matches the checkpoint rather than a generic JSON-mode prompt.", "You want a runnable assistant out of the box, since the package ships Browser Assistant, Code Interpreter and Custom Assistant applications alongside the framework.", "You are connecting Qwen to MCP servers and want a reference integration that already ships the cookbook patterns."]
avoid_if: ["You need provider-neutral abstractions, because the framework's templates, demos and defaults are built around Qwen's instruction-following conventions.", "You plan to run the Python executor against untrusted input, because the README states plainly that it is not sandboxed and is for local testing only.", "You are behind on Qwen releases, because the default function-call template is versioned and the README documents how to fall back to the previous one."]
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

Qwen-Agent is a framework for building LLM applications on Qwen's instruction following, tool use, planning and memory capabilities, and it also ships the applications: Browser Assistant, Code Interpreter and Custom Assistant. It backs Qwen Chat as its backend. Installation is modular with extras for gui, rag, code_interpreter and mcp, and the changelog shows continued work on Qwen3-VL and Qwen3-Coder tool-call demos, native API tool-call interfaces including vLLM's built-in parser, MCP cookbooks, and the reasoning_content field. The January 2026 release added the DeepPlanning agent evaluation benchmark.

## Why it's in the Arsenal

The recurring decision with any open model family is whether the tool-calling format the model was tuned on matches what your orchestration layer sends. Mismatched templates produce calls that parse fine and fail at runtime, and the fix is invisible from the framework side. Qwen-Agent removes that guess by shipping the templates that correspond to each Qwen generation, and by letting you plug vLLM's native parser in when you would rather have the server do the parsing.

## Architecture

Tool schemas are rendered into the function-call template that matches the active Qwen checkpoint, which is why the package carries templates rather than a single universal prompt. RAG is an extra that brings a retrieval component; code interpreter is another that brings the Python executor; MCP support registers external tools. The Gradio layer, an extra itself, exposes the assistant in a browser for local testing, and native API tool-call support lets a vLLM-served model emit structured calls parsed server-side.

## Ecosystem Position

It competes with smolagents and the general Python agent frameworks, but its centre of gravity is the Qwen model family rather than provider neutrality, so it overlaps with content/projects/foundation-models entries such as qwen more than with LangChain-style abstractions. It complements the inference entries in content/projects/inference-engines, since vLLM serving plus Qwen templates is the documented pairing. Compared with an MCP-first agent framework, Qwen-Agent treats MCP as one integration among several rather than the architecture.

## Getting Started

Install with the extras you need, and use the bare package for the minimal path:

```bash
pip install -U "qwen-agent[gui,rag,code_interpreter,mcp]"
```

The Gradio GUI requires Python 3.10 or higher. Development installs come from the source repository rather than PyPI stable.

## Key Use Cases

1. Qwen-native tool calling: serve Qwen3-Coder behind vLLM with its native parser and reuse the shipped tool-call templates instead of writing your own.
2. An internal assistant demo: run the Browser Assistant or Custom Assistant application and extend it with your own functions and RAG index.
3. MCP rollout: register MCP servers against a Qwen model and use the shipped cookbooks as the reference wiring.

## Strengths

- Function-call templates are versioned to the Qwen generation, removing the most common source of silent tool-call failures.
- Ships runnable applications, not just a library, so the first working assistant is an example rather than a project.
- Modular extras keep the base install small when you only need core tool calling.
- Includes an agent evaluation benchmark in DeepPlanning, so quality can be measured in the same repo.

## Limitations

The framework is coupled to Qwen's conventions, so adopting it means accepting that portability story. The Python executor is explicitly not sandboxed and intended for local testing only, which makes the Code Interpreter application unsafe against untrusted input as shipped. Templates track model generations and must be updated as Qwen releases, so an unmaintained deployment drifts out of alignment. And a substantial share of the README's recent work is demo and cookbook content, which means the framework surface itself moves more slowly than its examples.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the Qwen-native agent layer, and it pairs directly with the qwen and qwen3-omni entries in content/projects/foundation-models. Its vLLM pairing puts it next to the inference engines, and its unsandboxed executor is the exact risk that content/projects/agent-systems/nono or a container boundary exists to address. DeepPlanning is the evaluation artefact to compare against the tooling in content/tools/evaluation-and-observability.

## Resources

- [GitHub — QwenLM/Qwen-Agent](https://github.com/QwenLM/Qwen-Agent)
- [Documentation](https://qwenlm.github.io/Qwen-Agent/)
- [PyPI — qwen-agent](https://pypi.org/project/qwen-agent/)
