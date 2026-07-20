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

- [ArkFlow](./arkflow.md)
- [OpenShell](./openshell.md)
- [Amphion](./amphion.md)
- [CopilotKit](./copilotkit.md)
- [Coqui TTS](./coqui-tts.md)
- [DeerFlow](./deer-flow.md)
- [ESPnet](./espnet.md)
- [MMF](./facebook-mmf.md)
- [Flyte](./flyte.md)
- [FunASR](./funasr.md)

### Most Popular

- [AutoGPT](./autogpt.md) — ⭐ 185618
- [Stable Diffusion WebUI](./stable-diffusion-webui.md) — ⭐ 164251
- [Dify](./dify.md) — ⭐ 149460
- [LangChain](./langchain.md) — ⭐ 142154
- [ComfyUI](./comfyui.md) — ⭐ 121508
- [OpenHands](./openhands.md) — ⭐ 81383
- [DeerFlow](./deer-flow.md) — ⭐ 77436
- [MetaGPT](./metagpt.md) — ⭐ 69440
- [AutoGen](./autogen.md) — ⭐ 59840
- [Ultralytics YOLO](./ultralytics.md) — ⭐ 59659

### Browse All

- [AgentScope](./agentscope.md) — Python framework for building observable, multi-agent, and multimodal agent systems
- [Amphion](./amphion.md) — An open toolkit for audio, music, and speech generation that gathers reproducible implementations of TTS, singing-voice, vocoder, and audio-generation models
- [ArkFlow](./arkflow.md) — High-performance Rust stream-processing engine integrating messaging, databases, SQL/DataFusion, and machine-learning model execution
- [AutoGen](./autogen.md) — Microsoft multi-agent framework now maintained as legacy after Agent Framework convergence
- [AutoGPT](./autogpt.md) — Autonomous agent platform and classic agent project for accessible AI automation
- [CAMEL](./camel-ai.md) — Research-first multi-agent framework from the earliest agent paper lineage, focused on studying agent societies at scale and synthetic data generation
- [Cherry Studio](./cherry-studio.md) — Cross-platform desktop LLM client supporting many cloud and local providers, with assistants, knowledge bases, MCP tools, and artifacts in one app
- [ComfyUI](./comfyui.md) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
- [Context7](./context7.md) — Up-to-date code documentation platform for LLMs and AI coding editors through retrieval and MCP access
- [CopilotKit](./copilotkit.md) — React/TypeScript frontend framework for building in-app copilots, agent chat, and generative UI, and the reference implementation of the AG-UI protocol
- [Coqui TTS](./coqui-tts.md) — A deep-learning toolkit for text-to-speech with dozens of pretrained models, training recipes, and the XTTS multilingual voice-cloning model
- [CrewAI](./crewai.md) — Role-based framework for orchestrating collaborative AI agent crews and flows
- [DeerFlow](./deer-flow.md) — Open-source deep-research multi-agent framework built on LangChain/LangGraph that plans, searches, codes, and synthesizes long-horizon tasks into reports
- [Detectron2 (Meta)](./detectron2.md) — Meta's modular library for detection, segmentation, and visual recognition — the reference research platform behind a decade of detection work
- [Dify](./dify.md) — Visual platform for building agentic workflows, RAG apps, chatbots, and AI automations
- [DSPy](./dspy.md) — A framework for programming and optimizing language model pipelines
- [ESPnet](./espnet.md) — An end-to-end speech-processing toolkit covering ASR, TTS, speech translation, and enhancement, with Kaldi-style data pipelines and PyTorch models
- [MMF](./facebook-mmf.md) — Facebook AI Research's modular PyTorch framework for vision-and-language multimodal research, with datasets, pretrained models, and reproducible task pipelines
- [Flyte](./flyte.md) — A Kubernetes-native workflow orchestration platform for data and ML, offering strongly-typed, versioned
- [FunASR](./funasr.md) — An industrial speech-recognition toolkit from Alibaba DAMO offering ASR, VAD, punctuation, diarization
- [GenAI Processors](./genai-processors.md) — Lightweight Python library from Google for building asynchronous, streaming, multimodal content-processing pipelines around Gemini and other models
- [Genkit](./genkit.md) — Open-source framework for building AI applications and agents in JavaScript, Go, and Python
- [Google ADK](./google-adk.md) — Google code-first Python toolkit for building, evaluating, and deploying AI agents
- [Haystack](./haystack.md) — Modular framework for production search, RAG, agents, routing, and generation pipelines
- [Hugging Face Diffusers](./hf-diffusers.md) — The de facto Python library for diffusion models, providing pipelines, schedulers, and model components for image, video, and audio generation in PyTorch
- [Jina-serve](./jina-serve.md) — A cloud-native framework for building and serving multimodal AI services and pipelines as scalable microservices with gRPC/HTTP/WebSocket APIs and Kubernetes
- [Kedro](./kedro.md) — A Python framework that applies software-engineering best practices to data science, structuring reproducible, maintainable
- [Kiln](./kiln.md) — A desktop and library toolkit to build, evaluate, and optimize AI systems, covering evals, synthetic data, fine-tuning, RAG
- [LangChain](./langchain.md) — A framework for composing LLM applications, retrieval flows, tools, and agents
- [LangChain4j](./langchain4j.md) — An idiomatic Java library for building LLM applications on the JVM, with a unified API over providers and vector stores plus tool calling, MCP, agents, and RAG
- [LangGraph](./langgraph.md) — Graph-based framework for building stateful, durable LLM agents and workflows
- [LlamaIndex](./llamaindex.md) — Data framework for building document agents, retrieval pipelines, and production RAG systems
- [Ludwig](./ludwig.md) — A declarative, low-code framework for building custom models and fine-tuning LLMs from a YAML config, without writing training code
- [Mastra](./mastra.md) — TypeScript framework for building AI agents, workflows, evals, and application backends
- [Metaflow](./metaflow.md) — Netflix's human-centric framework for building and managing real-life ML/AI systems, structuring workflows as DAGs with versioning, scaling to cloud
- [MetaGPT](./metagpt.md) — Multi-agent framework that simulates software-company roles for natural-language programming
- [Microsoft Agent Framework](./microsoft-agent-framework.md) — Microsoft framework for Python and .NET agents, workflows, and production orchestration
- [NNI (Neural Network Intelligence)](./microsoft-nni.md) — Microsoft's AutoML toolkit automating hyperparameter tuning, neural architecture search, and model compression across training frameworks and compute
- [MMagic](./mmagic.md) — OpenMMLab's multimodal generative toolbox for AIGC, covering text-to-image, image/video super-resolution, inpainting, matting
- [MMDetection](./mmdetection.md) — OpenMMLab's PyTorch object-detection toolbox with modular components and hundreds of reproducible detector/segmentation model implementations and pretrained
- [NVIDIA NeMo](./nvidia-nemo.md) — NVIDIA's scalable generative-AI framework for building, training, and fine-tuning speech (ASR/TTS), LLM, and multimodal models with GPU-optimized pipelines
- [OpenAI Agents SDK](./openai-agents-sdk.md) — Lightweight Python framework for OpenAI-style agents, tools, handoffs, guardrails, and tracing
- [OpenHands](./openhands.md) — AI software engineering agent platform for coding, terminal work, browser actions, and automation
- [OpenShell](./openshell.md) — NVIDIA's Rust sandboxed runtime for autonomous agents, governed by declarative YAML policies for files, network, and data exfiltration
- [PaddleSpeech](./paddlespeech.md) — An easy-to-use speech toolkit on PaddlePaddle covering streaming ASR with punctuation, streaming TTS, speaker verification, speech translation
- [PaddleX](./paddlex.md) — PaddlePaddle's all-in-one, low-code development toolkit offering ready model pipelines for OCR, vision, time series
- [PraisonAI](./praisonai.md) — Python multi-agent framework for building autonomous agents with built-in memory, RAG, and tool support across many LLM providers, configured in code or YAML
- [Pydantic AI](./pydantic-ai.md) — A Python agent framework built around typed models and structured outputs
- [PyOD](./pyod.md) — A comprehensive Python library for anomaly and outlier detection with 60+ algorithms spanning classical, ensemble
- [Rerun](./rerun.md) — Visualize, query, and stream multimodal and robotics data for AI development
- [Rig](./rig.md) — A Rust library for building modular, scalable LLM applications with typed abstractions for completions, embeddings, vector stores, tools, and agents
- [Semantic Kernel](./semantic-kernel.md) — An SDK for integrating AI orchestration into production applications
- [Smolagents](./smolagents.md) — Hugging Face library for lightweight agents that can reason and act through code
- [Speech To Speech](./speech-to-speech.md) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
- [SpeechBrain](./speechbrain.md) — A PyTorch-based conversational-AI toolkit spanning ASR, TTS, speaker recognition, enhancement, and spoken-language understanding with reproducible training
- [Spring AI](./spring-ai.md) — The Spring ecosystem's official AI framework: portable LLM, RAG, tool-calling and MCP abstractions with Spring Boot auto-configuration for enterprise Java
- [Stable Diffusion WebUI](./stable-diffusion-webui.md) — AUTOMATIC1111's browser-based application for local Stable Diffusion image generation with an extensive extension ecosystem for control, upscaling
- [Supervision](./supervision.md) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
- [Taipy](./taipy.md) — A Python framework for turning data and AI algorithms into production-ready web applications, pairing an interactive GUI layer with a pipeline/scenario
- [TanStack AI](./tanstack-ai.md) — Type-safe provider-agnostic TypeScript SDK for streaming chat, tool calling, agents, and multimodal apps
- [txtai](./txtai.md) — All-in-one framework for semantic search, LLM orchestration, embeddings, and workflows
- [Uiverse Design](./uiverse-design.md) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development
- [Ultralytics YOLO](./ultralytics.md) — The YOLO family framework — train, validate, and deploy real-time detection, segmentation, pose, and classification models with a three-line API
- [Ultralytics YOLO](./ultralytics-yolo.md) — The most widely used real-time object detection framework: YOLO models for detection, segmentation, pose, and tracking with a three-line API
- [Vercel AI SDK](./vercel-ai-sdk.md) — The standard TypeScript toolkit for AI apps: one provider-agnostic API for text, structured output, tool calling, and agents with React/Next.js streaming UI
- [wav2letter (Flashlight ASR)](./wav2letter.md) — Facebook AI Research's C++ automatic-speech-recognition toolkit built on the Flashlight library, notable for fully convolutional acoustic models and fast
