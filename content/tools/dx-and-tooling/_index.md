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

- [AdalFlow](./adalflow.md)
- [Agent Skills (Addy Osmani)](./addyosmani-agent-skills.md)
- [Aider](./aider.md)
- [BAML](./baml.md)
- [Claude Code](./claude-code.md)
- [Cline](./cline.md)
- [Codex Plugin for Claude Code](./codex-plugin-cc.md)
- [Continue](./continue-dev.md)
- [Cursor](./cursor.md)
- [Gemini CLI](./gemini-cli.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [AdalFlow](./adalflow.md) — PyTorch-inspired library to build and auto-optimize LLM apps: model-agnostic components plus a trainer that tunes prompts and few-shot demos against a metric
- [Agent Skills (Addy Osmani)](./addyosmani-agent-skills.md) — Production-grade engineering skills for AI coding agents, organized as 8 slash commands mapping to the development lifecycle
- [Aider](./aider.md) — Open-source AI pair-programming CLI that edits your local git repo with any LLM and auto-commits changes
- [BAML](./baml.md) — DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output
- [Basedash](./basedash.md) — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- [Chainlit](./chainlit.md) — A framework for building conversational AI interfaces and debugging LLM apps
- [Chrome DevTools MCP](./chrome-devtools-mcp.md) — Official MCP server exposing Chrome DevTools to coding agents for live browser debugging
- [Claude Artifact Player](./claude-artifact-player.md) — Interact with and manage AI-generated artifacts from Claude and similar models
- [Claude Code](./claude-code.md) — Anthropic's terminal-based agentic coding assistant that edits files, runs commands, and works across whole repositories
- [Cline](./cline.md) — Open-source autonomous coding agent for VS Code with plan/act modes and human-in-the-loop approval of every action
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
- [Qursor](./qursor.md) — AI-powered UI context for faster front-end development with agents
- [Recursi](./recursi.md) — Self-improving system for intuitive and efficient AI-assisted coding
- [Repomix](./repomix.md) — CLI that packs an entire repository into a single AI-friendly file for feeding codebases to LLMs
- [ShellMate](./shellmate.md) — AI-powered terminal assistant that suggests commands and explains outputs
- [Streamlit](./streamlit.md) — A Python framework for building data and AI apps with minimal frontend code
- [Superpowers](./superpowers.md) — Composable agent-skills framework encoding a full software development methodology (spec, plan, TDD, subagent-driven implementation) for coding agents
- [Tabby](./tabby-ml.md) — Self-hosted, open-source AI coding assistant: an on-prem alternative to GitHub Copilot with completions and chat
- [TencentDB Agent Memory](./tencentdb-agent-memory.md) — Fully local long-term memory for AI agents combining symbolic short-term compression with a layered (persona/scene) long-term store
- [Vaani](./vaani.md) — Fast, private macOS dictation with AI formatting and editing
- [Windsurf](./windsurf.md) — Agentic AI code editor built around Cascade, a context-aware agent that keeps working across your whole repo
