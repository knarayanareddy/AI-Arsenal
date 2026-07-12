---
title: "Frameworks"
section: "projects/frameworks"
auto_generated: false
---

# Frameworks

## What belongs here

Libraries and SDKs that other projects and applications build on top of — agent frameworks (LangGraph, CrewAI, Google ADK), RAG/data frameworks (LangChain, LlamaIndex, Haystack), and pipeline-optimization frameworks (DSPy).

## What does NOT belong here

Standalone systems you deploy and run rather than import as a library belong in [Agent Systems](../agent-systems/_index.md); the model weights themselves belong in [Foundation Models](../foundation-models/_index.md).

## Relation to the Tools vertical

Framework entries document the library's architecture, ecosystem position, and when to choose it over an alternative framework at the same layer. For job-based tool shortlists (e.g. "what should I use for orchestration"), see `content/tools/by-job/` and `content/tools/orchestration/`.

## Decision guidance

Before selecting a framework:
- Key question to ask: am I building WITH this library, or deploying it AS a service? If the latter, check [Agent Systems](../agent-systems/_index.md) instead.
- If you need usage guidance rather than architectural depth: see [tools/orchestration/](../../tools/orchestration/_index.md)
- See [Choose an Agent Framework](../../architectures/decision-trees/choose-agent-framework.md) and [RAG vs Fine-Tuning](../../architectures/decision-trees/rag-vs-fine-tuning.md) for cross-cutting selection guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Frameworks in This Phase

### Recently Added

- [CopilotKit](./copilotkit.md)
- [DeerFlow](./deer-flow.md)
- [GenAI Processors](./genai-processors.md)
- [PraisonAI](./praisonai.md)
- [AgentScope](./agentscope.md)
- [Context7](./context7.md)
- [Genkit](./genkit.md)
- [Rerun](./rerun.md)
- [TanStack AI](./tanstack-ai.md)
- [CAMEL](./camel-ai.md)

### Most Popular

- [AutoGPT](./autogpt.md) — ⭐ 184931
- [Dify](./dify.md) — ⭐ 145081
- [LangChain](./langchain.md) — ⭐ 139206
- [ComfyUI](./comfyui.md) — ⭐ 119901
- [OpenHands](./openhands.md) — ⭐ 76854
- [DeerFlow](./deer-flow.md) — ⭐ 76831
- [MetaGPT](./metagpt.md) — ⭐ 68769
- [Ultralytics YOLO](./ultralytics.md) — ⭐ 59255
- [Ultralytics YOLO](./ultralytics-yolo.md) — ⭐ 59255
- [Context7](./context7.md) — ⭐ 58934

### Browse All

- [AgentScope](./agentscope.md) — Python framework for building observable, multi-agent, and multimodal agent systems
- [AutoGen](./autogen.md) — Microsoft multi-agent framework now maintained as legacy after Agent Framework convergence
- [AutoGPT](./autogpt.md) — Autonomous agent platform and classic agent project for accessible AI automation
- [CAMEL](./camel-ai.md) — Research-first multi-agent framework from the earliest agent paper lineage, focused on studying agent societies at scale and synthetic data generation
- [Cherry Studio](./cherry-studio.md) — Cross-platform desktop LLM client supporting many cloud and local providers, with assistants, knowledge bases, MCP tools, and artifacts in one app
- [ComfyUI](./comfyui.md) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
- [Context7](./context7.md) — Up-to-date code documentation platform for LLMs and AI coding editors through retrieval and MCP access
- [CopilotKit](./copilotkit.md) — React/TypeScript frontend framework for building in-app copilots, agent chat, and generative UI, and the reference implementation of the AG-UI protocol
- [CrewAI](./crewai.md) — Role-based framework for orchestrating collaborative AI agent crews and flows
- [DeerFlow](./deer-flow.md) — Open-source deep-research multi-agent framework built on LangChain/LangGraph that plans, searches, codes, and synthesizes long-horizon tasks into reports
- [Detectron2 (Meta)](./detectron2.md) — Meta's modular library for detection, segmentation, and visual recognition — the reference research platform behind a decade of detection work
- [Dify](./dify.md) — Visual platform for building agentic workflows, RAG apps, chatbots, and AI automations
- [DSPy](./dspy.md) — A framework for programming and optimizing language model pipelines
- [GenAI Processors](./genai-processors.md) — Lightweight Python library from Google for building asynchronous, streaming, multimodal content-processing pipelines around Gemini and other models
- [Genkit](./genkit.md) — Open-source framework for building AI applications and agents in JavaScript, Go, and Python
- [Google ADK](./google-adk.md) — Google code-first Python toolkit for building, evaluating, and deploying AI agents
- [Haystack](./haystack.md) — Modular framework for production search, RAG, agents, routing, and generation pipelines
- [LangChain](./langchain.md) — A framework for composing LLM applications, retrieval flows, tools, and agents
- [LangGraph](./langgraph.md) — Graph-based framework for building stateful, durable LLM agents and workflows
- [LlamaIndex](./llamaindex.md) — Data framework for building document agents, retrieval pipelines, and production RAG systems
- [Mastra](./mastra.md) — TypeScript framework for building AI agents, workflows, evals, and application backends
- [MetaGPT](./metagpt.md) — Multi-agent framework that simulates software-company roles for natural-language programming
- [Microsoft Agent Framework](./microsoft-agent-framework.md) — Microsoft framework for Python and .NET agents, workflows, and production orchestration
- [OpenAI Agents SDK](./openai-agents-sdk.md) — Lightweight Python framework for OpenAI-style agents, tools, handoffs, guardrails, and tracing
- [OpenHands](./openhands.md) — AI software engineering agent platform for coding, terminal work, browser actions, and automation
- [PraisonAI](./praisonai.md) — Python multi-agent framework for building autonomous agents with built-in memory, RAG, and tool support across many LLM providers, configured in code or YAML
- [Pydantic AI](./pydantic-ai.md) — A Python agent framework built around typed models and structured outputs
- [Rerun](./rerun.md) — Visualize, query, and stream multimodal and robotics data for AI development
- [Semantic Kernel](./semantic-kernel.md) — An SDK for integrating AI orchestration into production applications
- [Smolagents](./smolagents.md) — Hugging Face library for lightweight agents that can reason and act through code
- [Speech To Speech](./speech-to-speech.md) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
- [Spring AI](./spring-ai.md) — The Spring ecosystem's official AI framework: portable LLM, RAG, tool-calling and MCP abstractions with Spring Boot auto-configuration for enterprise Java
- [Supervision](./supervision.md) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
- [TanStack AI](./tanstack-ai.md) — Type-safe provider-agnostic TypeScript SDK for streaming chat, tool calling, agents, and multimodal apps
- [txtai](./txtai.md) — All-in-one framework for semantic search, LLM orchestration, embeddings, and workflows
- [Uiverse Design](./uiverse-design.md) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development
- [Ultralytics YOLO](./ultralytics.md) — The YOLO family framework — train, validate, and deploy real-time detection, segmentation, pose, and classification models with a three-line API
- [Ultralytics YOLO](./ultralytics-yolo.md) — The most widely used real-time object detection framework: YOLO models for detection, segmentation, pose, and tracking with a three-line API
- [Vercel AI SDK](./vercel-ai-sdk.md) — The standard TypeScript toolkit for AI apps: one provider-agnostic API for text, structured output, tool calling, and agents with React/Next.js streaming UI
