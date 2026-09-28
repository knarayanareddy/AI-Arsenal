---
title: "DX & Tooling Tools"
section: "tools/dx-and-tooling"
auto_generated: false
---

# DX & Tooling Tools

## What belongs here

SDKs, CLIs, notebook/demo UI frameworks, prompt management, IDE/terminal assistants, and testing utilities for the humans building the system.

## What does NOT belong here

Tools whose primary consumer is the running AI system itself (not the developer) belong in one of the other five phases.

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: Does this tool primarily make the developer faster or the prompt/asset workflow easier, rather than run in production?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Dx And Tooling in This Phase

### Recently Added

- [headroom](./headroom.md)
- [rtk](./rtk.md)
- [Prompty](./prompty.md)
- [AdalFlow](./adalflow.md)
- [Agent Skills (Addy Osmani)](./addyosmani-agent-skills.md)
- [Aider](./aider.md)
- [BAML](./baml.md)
- [Claude Code](./claude-code.md)
- [Cline](./cline.md)
- [Codex Plugin for Claude Code](./codex-plugin-cc.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [AdalFlow](./adalflow.md) — PyTorch-style library that makes LLM prompts differentiable parameters so RAG and agent pipelines can be auto-optimised rather than hand-prompted
- [Agent Skills (Addy Osmani)](./addyosmani-agent-skills.md) — Collection of roughly two dozen markdown SKILL.md workflows and slash commands that install process gates into Claude Code, Cursor, Codex and 70 other agents
- [Aider](./aider.md) — Terminal pair-programming tool that maps your codebase, edits files in place and auto-commits each change so you can diff and undo with git
- [BAML](./baml.md) — DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output
- [Basedash](./basedash.md) — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- [Chainlit](./chainlit.md) — Python framework for building chat and agent front ends, with decorators for steps, tool calls and message handlers over a bundled React UI
- [Chrome DevTools MCP](./chrome-devtools-mcp.md) — Google's MCP server that gives a coding agent Chrome DevTools itself: trace recording, network and console inspection, heap snapshots and Puppeteer-driven input
- [Claude Artifact Player](./claude-artifact-player.md) — Interact with and manage AI-generated artifacts from Claude and similar models
- [Claude Code](./claude-code.md) — Anthropic's terminal coding agent, distributed as a CLI that reads a repository, edits files, runs commands and handles git work from natural language
- [Cline](./cline.md) — Apache-2.0 coding agent published simultaneously as a CLI, a Tauri desktop app, VS Code and JetBrains extensions and an embeddable Node SDK
- [Codebase Memory MCP](./codebase-memory-mcp.md) — MCP server that indexes codebases into a persistent knowledge graph for fast agent code intelligence
- [Codex Plugin for Claude Code](./codex-plugin-cc.md) — Official OpenAI plugin that runs Codex from inside Claude Code for second-opinion code reviews and background task delegation
- [Continue](./continue-dev.md) — Open-source IDE extension (VS Code/JetBrains) for building custom AI coding assistants with any model
- [Cursor](./cursor.md) — AI-native code editor (VS Code fork) with agent mode, codebase-aware chat, and predictive multi-line edits
- [Dropstone 3](./dropstone-3.md) — Collaborative AI workspace for teams to build, describe, and ship software together
- [Gemini CLI](./gemini-cli.md) — Google's open-source terminal AI agent that brings Gemini models to the command line with a generous free tier
- [GitHub Copilot](./github-copilot.md) — GitHub's AI pair programmer: completions, chat, and an autonomous coding agent woven through GitHub and major IDEs
- [Google Pomelli 2.0](./google-pomelli-2-0.md) — Explore and interact with large datasets through a visual, intuitive interface
- [Goose](./goose.md) — Block's open-source, extensible local AI agent that automates engineering tasks end-to-end via MCP extensions
- [Gradio](./gradio.md) — A Python library for building and sharing machine learning demos quickly
- [headroom](./headroom.md) — Local compression layer for agent context that shrinks tool output, logs, files and RAG chunks before they hit the model
- [Honen](./honen.md) — Transform any content into interactive AI-generated courses
- [Instructor](./instructor.md) — A library for extracting typed structured outputs from language models
- [Jan](./jan.md) — Open-source, offline-first ChatGPT alternative desktop app powered by llama.cpp
- [Langfuse Prompts](./langfuse-prompts.md) — Prompt management and versioning workflows inside the Langfuse observability platform
- [LangSmith Hub](./langsmith-hub.md) — LangSmith prompt and dataset workflows for LangChain and LangGraph applications
- [LM Studio](./lm-studio.md) — Desktop app for discovering, downloading, and running local LLMs with chat UI and an OpenAI-compatible local server
- [marimo](./marimo.md) — Reactive Python notebook stored as pure Python, reproducible by construction, deployable as scripts and apps
- [Mesop](./mesop.md) — Google Python UI framework for building web apps and AI prototypes
- [Open WebUI](./open-webui.md) — Self-hosted, extensible chat UI for local and API LLMs with RAG, tools, and multi-user management built in
- [OpenAI Codex CLI](./openai-codex-cli.md) — OpenAI's open-source terminal coding agent, written in Rust, that runs code changes in a sandboxed local environment
- [Orca](./orca.md) — Desktop "agent development environment" for running fleets of coding agents (Codex, Claude Code, OpenCode, Pi) in parallel, each in its own git worktree
- [PromptLayer](./promptlayer.md) — Prompt management and logging platform for versioning, collaboration, and observability
- [Prompty](./prompty.md) — Microsoft prompt asset format and SDKs for managing, debugging, and evaluating LLM prompts
- [Qursor](./qursor.md) — AI-powered UI context for faster front-end development with agents
- [Recursi](./recursi.md) — Self-improving system for intuitive and efficient AI-assisted coding
- [Repomix](./repomix.md) — CLI that packs an entire repository into a single AI-friendly file for feeding codebases to LLMs
- [rtk](./rtk.md) — Rust CLI shim that rewrites shell command output into condensed form before a coding agent reads it
- [ShellMate](./shellmate.md) — AI-powered terminal assistant that suggests commands and explains outputs
- [Streamlit](./streamlit.md) — A Python framework for building data and AI apps with minimal frontend code
- [Superpowers](./superpowers.md) — Composable agent-skills framework encoding a full software development methodology (spec, plan, TDD, subagent-driven implementation) for coding agents
- [Tabby](./tabby-ml.md) — Self-hosted, open-source AI coding assistant: an on-prem alternative to GitHub Copilot with completions and chat
- [TencentDB Agent Memory](./tencentdb-agent-memory.md) — Fully local long-term memory for AI agents combining symbolic short-term compression with a layered (persona/scene) long-term store
- [Vaani](./vaani.md) — Fast, private macOS dictation with AI formatting and editing
- [Vellum](./vellum.md) — Commercial platform to build LLM apps — prompt/workflow authoring, evaluation, versioning, and deployment via a visual builder plus SDK
- [Windsurf](./windsurf.md) — Agentic AI code editor built around Cascade, a context-aware agent that keeps working across your whole repo
