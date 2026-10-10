---
id: gptme
name: gptme
type: tool
job:
  - Terminal-native AI agent and developer assistant with local shell, Python, and browser execution capabilities
description: Your agent in your terminal, equipped with local tools: writes code, uses the terminal, browses the web. Make your own persistent autonomous agent on top!
url: https://github.com/gptme/gptme
cost_model: open-source
pricing_detail: Free and open-source software (MIT license). API costs depend on configured underlying LLM providers (OpenAI, Anthropic, DeepSeek, OpenRouter, or local Ollama instances).
tags:
  - agent
  - cli
  - llm-agent
  - terminal
  - code-generation
  - local-first
  - python
maturity: beta
stack:
  - python
  - openai-api
  - anthropic-api
  - playwright
  - bash
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-10
last_reviewed: 2026-10-10
added_by: repo-maintainer
verdict: recommended
verdict_rationale: gptme delivers a transparent, local-first CLI agent environment with explicit tool-execution feedback loops, minimal abstraction overhead, and broad model compatibility spanning local open weights to frontier APIs.
status: active
phase: dx-and-tooling
audience:
  - software-engineers
  - devops-engineers
  - agent-developers
  - systems-administrators
best_when: Automating complex local CLI tasks, refactoring codebases with iterative test execution, running autonomous shell-level tasks, or constructing tailored agent pipelines using a transparent local runtime.
avoid_when: You require strict multi-tenant sandbox isolation by default, zero-permission execution environments for untrusted code, or non-technical GUI interfaces.
github_url: https://github.com/gptme/gptme
docs_url: null
---

## Overview

gptme is an open-source, local-first CLI agent runtime designed to bridge Large Language Models with local operating system environments. Built in Python, gptme operates by continuously parsing LLM outputs into executable tool invocations—such as Bash commands, Python code execution, file system operations, and web browsing—and returning the execution results back to the context context window in a REPL-like loop.

Architecturally, gptme relies on a stateless, modular tool pipeline coupled with flexible model backends. It acts as an orchestrator across multiple model providers including OpenAI, Anthropic, DeepSeek, OpenRouter, and local deployments via Ollama or llama.cpp. Rather than abstracting execution into complex graph frameworks, gptme maintains a streamable context log that serializes agent tool interactions, error outputs, and system state directly into readable text blocks.

The tool's design prioritizes developer control and persistence. By treating local files, shell terminals, and local subprocesses as native primitives, developers can use gptme both as an interactive command-line pair programmer and as a scriptable base layer for building custom, long-running autonomous workflows without vendor lock-in or heavy infrastructure dependencies.

## Why It's in the Arsenal

Unlike heavyweight, opaque agent orchestration frameworks, gptme maintains a thin abstraction layer over tool calls and execution context. Local terminal execution occurs directly inside the developer's working environment, avoiding the latency and friction of mandatory remote sandboxes while allowing immediate access to local dev stacks, git repositories, and build tools.

It features robust local-first execution primitives with explicit approval and safety controls. Users can dynamically toggle auto-execute flags or inspect shell commands prior to execution, giving engineers precise command over agent intervention levels during complex operations like multi-file refactoring or shell debugging.

By decoupling the core agent logic from vendor-specific tool-calling specifications, gptme provides universal provider interoperability. It normalizes tool responses across structured json-mode models and plain-text/markdown-parsing backends, enabling seamless failover or benchmarking between local open-weights models and proprietary frontier APIs.

## Key Features

Integrated Tool Primitives: Out-of-the-box support for interactive Bash execution (`shell`), inline Python execution (`python`), file creation/patching (`patch`), and headless web browsing via Playwright (`browser`).

Model Agnostic Provider Layer: Native integration with OpenAI, Anthropic Claude, DeepSeek, OpenRouter, and local OpenAI-compatible endpoints (Ollama, vLLM, llama.cpp) configured via the CLI argument `--model`.

Autonomous REPL Loop: Runs continuously using `--workspace` contexts, allowing the agent to write, execute, inspect error tracebacks, and iteratively patch code until test suites pass.

Non-Interactive Scripting Mode: Supports headless automation via stdout pipe inputs or direct CLI commands (`gptme "refactor tests in ./src"`), making it suitable for CI/CD integration and cron-driven maintenance.

Context Management: Automatically truncates and manages long context histories, preserving critical system prompts and tool execution feedback to prevent context-window overflow during extended sessions.

## Trade-offs

Direct Shell Security Risks: Executing arbitrary shell commands directly on the host machine presents security risks if the model hallucinates destructive commands (e.g., `rm -rf`). Users must configure auto-confirm flags (`--yolo`/`--non-interactive`) with extreme caution.

Context Consumption Overhead: Returning raw shell outputs and full stack traces directly into the context window can rapidly deplete context budgets and increase token costs during verbose build failures or large log outputs.

Single-Node Architecture: gptme is optimized for local workspace execution on a single host; distributed multi-agent routing or cluster-scale orchestration requires additional wrapper tooling or custom integration.
