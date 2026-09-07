# AI Arsenal — Dense Context Summary

Generated: 2026-09-07T14:58:22.287Z | Entries: 1062 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 322
- Tools: 215
- Papers: 128
- Tips: 171
- People: 25
- Digests: 1
- Guides: 59
- Build examples: 8
- Architectures: 29
- Observability: 16
- Community: 32
- Benchmarks: 52
- Trending: 4

## Navigation

- Agent map: /AGENT.md
- Taxonomy: /TAXONOMY.md
- Data API: /data/index.json, all collection JSON files from scripts/utils/collections.js, and /data/search-index.json
- Architecture decisions: /content/architectures/{system-design,data-strategy,model-selection,serving-patterns,evaluation-strategy}/
- Reference stacks: /content/architectures/reference-stacks/
- Observability playbooks: /content/observability/{instrumentation,tracing,evaluation-quality,monitoring-alerting,cost-usage,privacy-governance,incident-response}/
- Community directory: /content/community/{forums,chat,newsletters,events,meetups,creators,datasets}/
- Tool jobs: /content/tools/by-job/
- Tool phases: /content/tools/data-ingestion/, /content/tools/model-layer/, /content/tools/orchestration/, /content/tools/serving-and-deployment/, /content/tools/evaluation-and-observability/, /content/tools/dx-and-tooling/
- Observability: /content/observability/
- Research papers: /content/research/{foundational,architectures,training-and-alignment,inference-and-efficiency,retrieval-and-memory,agents-and-reasoning,evaluation-and-safety,surveys}/
- Benchmarks: /content/benchmarks/{general-llm,code,retrieval-rag,agents,safety,multimodal,evaluation-methods}/
- Trending: /content/trending/{this-week,this-month,hall-of-fame,by-source}/

## Top Projects by Category

### agents
- Hermes Agent (⭐242926, score:55) — Open-source personal agent platform with tools, memory, skills, subagents, and multi-channel runtimes
- AutoGPT (⭐187178, score:55) — Autonomous agent platform and classic agent project for accessible AI automation
- Dify (⭐154730, score:55) — Visual platform for building agentic workflows, RAG apps, chatbots, and AI automations
- Browser Use (⭐112894, score:55) — The most-starred open-source browser agent: connects LLMs to a real browser so agents can navigate, fill forms and complete web tasks autonomously
- OpenHands (⭐86432, score:55) — AI software engineering agent platform for coding, terminal work, browser actions, and automation

### code-generation
- screenshot-to-code (⭐78123, score:55) — Converts screenshots, mockups, and Figma designs into working frontend code (HTML/Tailwind, React, Vue) using multimodal LLMs — with video-to-prototype support
- Continue (⭐35821, score:55) — Open-source AI coding assistant for VS Code and JetBrains — chat, autocomplete, edit, and agent modes over any model, including fully local
- Open Code Review (⭐22032, score:55) — Alibaba's Go/Node-distributed AI code-review CLI combining deterministic file pipelines with an LLM agent for line-level findings
- Mistral Vibe (⭐4926, score:32) — Mistral's open-source CLI coding assistant with subagents, delegated tasks, skills, and a voice mode
- Tabby (⭐33868, score:30) — Self-hosted AI coding assistant server in Rust — an on-prem Copilot alternative bundling its own model serving, code RAG, and IDE integrations

### computer-vision
- PaddleOCR (⭐89027, score:55) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
- Tesseract OCR (⭐76384, score:55) — The long-standing open-source OCR engine that recognizes text in 100+ languages using an LSTM line recognizer, widely used as the default OCR backend
- Ultralytics YOLO (⭐61363, score:55) — The most widely used real-time object detection framework: YOLO models for detection, segmentation, pose, and tracking with a three-line API
- Supervision (⭐49907, score:55) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
- OCRmyPDF (⭐34690, score:55) — A command-line tool that adds a searchable OCR text layer to scanned PDFs using Tesseract while preserving the original page images and metadata

### data-pipelines
- DuckDB (⭐41050, score:55) — An in-process analytical SQL database that runs fast columnar OLAP queries directly on files (Parquet, CSV, Arrow) without a server
- Polars (⭐39676, score:55) — A fast, multi-threaded DataFrame library in Rust with a lazy query optimizer and Arrow memory model, a high-performance alternative to pandas for AI/ML data
- Marker (⭐39570, score:55) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- LangExtract (⭐38546, score:55) — Python library for grounded structured extraction from unstructured text with source spans and visualization
- Liteparse (⭐12264, score:55) — A fast open-source document parser from LlamaIndex, written in Rust, that converts PDFs and documents into structured, LLM-ready output

### evaluation
- Terminal-Bench (⭐2568, score:26) — Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models
- lmms-eval (⭐4395, score:23) — Multimodal evaluation toolkit spanning text, image, video, and audio tasks and model adapters
- MTEB (⭐3419, score:21) — The Massive Text Embedding Benchmark — the standard evaluation suite and leaderboard for embedding and reranker models across 1000+ tasks
- LightEval (⭐2535, score:20) — Hugging Face's all-in-one LLM evaluation toolkit for running benchmarks across multiple inference backends with reproducible
- BigCodeBench (⭐519, score:14) — Code-generation benchmark testing diverse function calls and complex instructions across 139 libraries — the harder successor to HumanEval

### llms
- Ollama (⭐180383, score:55) — Local runtime for downloading, running, and serving open-weight models on developer machines
- llama.cpp (⭐127366, score:55) — C and C++ inference engine for running GGUF-quantized LLMs locally and on edge devices
- DeepSeek-V3 / R1 (⭐104437, score:55) — DeepSeek open-weight MoE and reasoning model family known for strong cost-performance
- vLLM (⭐91166, score:55) — High-throughput inference and serving engine for LLMs with batching and OpenAI-compatible APIs
- LobeChat (LobeHub) (⭐82290, score:55) — Self-hostable, multi-provider AI chat platform with plugins, agents marketplace, knowledge base, and one-click deployment

### multimodal
- Stable Diffusion WebUI (⭐164851, score:55) — AUTOMATIC1111's browser-based application for local Stable Diffusion image generation with an extensive extension ecosystem for control, upscaling
- ComfyUI (⭐131911, score:55) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
- MiniCPM-V (⭐26311, score:55) — Efficient open vision-language model series from OpenBMB that runs strong image/video/OCR understanding on-device, including phones
- Hunyuan3D-2 (⭐14755, score:55) — Tencent's open model for generating high-resolution textured 3D assets from images or text using a two-stage shape-then-texture diffusion pipeline
- LTX-2 (⭐9365, score:55) — Lightricks' DiT-based synchronized audio-and-video foundation model, released with open weights, a Python package, LoRA training, and an API

### observability
- Langfuse (⭐34296, score:55) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- Opik (⭐21853, score:55) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- DeepEval (⭐18145, score:55) — An open-source evaluation framework for testing LLM applications in CI
- Portkey AI Gateway (⭐12922, score:55) — A fast open-source AI gateway that routes requests to 1,600+ LLMs behind one API, with built-in guardrails, retries, fallbacks, caching, and observability
- Phoenix (⭐11358, score:55) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems

### rag
- Firecrawl (⭐177514, score:55) — Open-source and hosted web scraping API that turns websites into LLM-ready markdown/data
- LangChain (⭐145867, score:55) — A framework for composing LLM applications, retrieval flows, tools, and agents
- RAGFlow (⭐90206, score:55) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities
- Crawl4AI (⭐81879, score:55) — Open-source crawler and scraper designed to produce LLM-friendly web content
- Docling (⭐66106, score:55) — IBM-origin open-source toolkit for parsing and exporting documents for generative AI

### tooling
- Supabase (⭐108928, score:55) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- Context7 (⭐61730, score:55) — Up-to-date code documentation platform for LLMs and AI coding editors through retrieval and MCP access
- Cherry Studio (⭐51544, score:55) — Cross-platform desktop LLM client supporting many cloud and local providers, with assistants, knowledge bases, MCP tools, and artifacts in one app
- UI-TARS Desktop (⭐38886, score:55) — Open-source desktop application and agent stack for computer-use and browser automation driven by vision-language GUI-grounding models
- SillyTavern (⭐33106, score:55) — Self-hosted, extensible chat frontend for local and hosted LLMs, focused on character personas, long conversations, and power-user control over prompts

### voice-audio
- Whisper (⭐108687, score:55) — OpenAI's open-source speech recognition model: robust multilingual transcription and translation trained on 680k hours of audio
- GPT-SoVITS (⭐61667, score:55) — Few-shot voice cloning and TTS toolkit that clones a voice from ~1 minute of audio, with WebUI for data prep, training, and inference
- whisper.cpp (⭐53492, score:55) — A dependency-free C/C++ port of OpenAI's Whisper that runs speech-to-text on CPU and consumer hardware via the ggml/GGUF tensor library
- OpenVoice (⭐37468, score:55) — An instant voice-cloning model from MIT and MyShell that separates tone color from a base speaker, enabling cross-lingual cloning and style control
- VoxCPM (⭐36811, score:55) — A tokenizer-free text-to-speech model that generates speech in a continuous acoustic space for multilingual synthesis, creative voice design

## Top Tools by Job

### data-labeling
- Airbyte — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- dlt — Python-native ELT library: declarative, schema-evolving data pipelines as code, popular with AI/agent workflows
- Hugging Face AI Sheets — Hugging Face open-source no-code tool for generating and enriching datasets with AI models
- Label Studio — An open-source data labeling platform for ML and AI datasets

### deployment
- Anyscale — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- Baseten — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero
- BentoML — A framework for packaging, deploying, and scaling AI model services

### evaluation
- Agentic Security — Open-source red-team toolkit for finding vulnerabilities in agentic LLM applications
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- AI Infra Guard — Tencent full-stack red-team platform for models, agents, skills, MCP, and AI infrastructure
- any-agent — One Python abstraction over many agent frameworks (LangChain, OpenAI Agents, Google ADK, smolagents) plus framework-agnostic tracing and evaluation
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets

### fine-tuning
- Axolotl — Configuration-driven fine-tuning framework for many open-weight LLM families
- DeepSpeed — Microsoft's distributed-training library: ZeRO sharding, offloading, and pipeline parallelism for training beyond single-GPU memory
- Hugging Face Accelerate — Device-agnostic PyTorch training launcher — the same script runs on CPU, one GPU, multi-GPU, TPU, DeepSpeed, or FSDP via config, not code changes
- Liger Kernel — Fused Triton kernels for LLM training (RMSNorm, RoPE, SwiGLU, fused cross-entropy) that cut memory and raise throughput as near drop-in layer replacements
- LLaMA-Factory — Unified fine-tuning framework and UI for many LLMs and training methods

### memory-management
- Codebase Memory MCP — MCP server that indexes codebases into a persistent knowledge graph for fast agent code intelligence
- Letta — Stateful agent framework and memory system formerly known as MemGPT
- Mem0 — Memory layer for AI agents and assistants with long-term user and session memory
- Memoriq — Private AI memory layer that learns from your conversations and documents
- Redis — In-memory data store commonly used for caching, session memory, queues, and vector search

### model-registry
- ClearML — Open-source, self-hostable MLOps suite covering experiment tracking, data versioning, pipelines, and orchestration
- DVC — Open-source data and model versioning tool for ML projects and pipelines
- Hugging Face Hub — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- MLflow — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- Weights & Biases — Experiment tracking and model management platform for ML and AI teams

### monitoring
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Deepchecks — Testing-first validation for ML models and LLM apps: prebuilt check suites from data integrity to LLM quality
- Evidently — Open-source evaluation and monitoring for ML and LLM systems: 100+ metrics from data drift to LLM-as-judge
- Galileo — Commercial LLM evaluation and observability platform with research-backed, label-free metrics for hallucination, factuality, and guardrails

### orchestration
- Agno — High-performance Python framework (formerly Phidata) for building multi-agent systems with memory, knowledge, and its own runtime
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- any-agent — One Python abstraction over many agent frameworks (LangChain, OpenAI Agents, Google ADK, smolagents) plus framework-agnostic tracing and evaluation
- Apache Airflow — Mature workflow scheduler for batch data, ML, and AI pipeline orchestration
- ClearML — Open-source, self-hostable MLOps suite covering experiment tracking, data versioning, pipelines, and orchestration

### production-serving
- Anyscale — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- Baseten — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Cerebras Inference — Wafer-scale-engine inference API claiming the fastest open-model token rates available
- Cloudflare Workers AI — Serverless GPU inference on Cloudflare's global edge network, billed per request with zero infrastructure

### prompt-management
- AdalFlow — PyTorch-inspired library to build and auto-optimize LLM apps: model-agnostic components plus a trainer that tunes prompts and few-shot demos against a metric
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- Langfuse Prompts — Prompt management and versioning workflows inside the Langfuse observability platform
- LangSmith Hub — LangSmith prompt and dataset workflows for LangChain and LangGraph applications

### prototyping
- AdalFlow — PyTorch-inspired library to build and auto-optimize LLM apps: model-agnostic components plus a trainer that tunes prompts and few-shot demos against a metric
- Agent Skills (Addy Osmani) — Production-grade engineering skills for AI coding agents, organized as 8 slash commands mapping to the development lifecycle
- Aider — Open-source AI pair-programming CLI that edits your local git repo with any LLM and auto-commits changes
- Chainlit — A framework for building conversational AI interfaces and debugging LLM apps
- Chrome DevTools MCP — Official MCP server exposing Chrome DevTools to coding agents for live browser debugging

### security-and-guardrails
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agentic Security — Open-source red-team toolkit for finding vulnerabilities in agentic LLM applications
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- AI Infra Guard — Tencent full-stack red-team platform for models, agents, skills, MCP, and AI infrastructure
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure

### structured-output
- BAML — DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output
- Basedash — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- Claude Artifact Player — Interact with and manage AI-generated artifacts from Claude and similar models
- Google Pomelli 2.0 — Explore and interact with large datasets through a visual, intuitive interface
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs

### tracing
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Laminar — OpenTelemetry-based tracing, evaluation, datasets, and monitoring for LLM and agent applications
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- LangWatch — Open-source LLM observability and evaluation platform — OpenTelemetry-based tracing plus online/offline evals and datasets, self-hostable or cloud

### vector-search
- Elasticsearch — Distributed search and analytics engine with mature BM25, dense-vector kNN, and hybrid retrieval for RAG workloads
- FAISS — Meta's foundational library for efficient similarity search over billions of dense vectors
- FastEmbed — A lightweight ONNX Runtime library for embedding and reranking without PyTorch
- Marqo — Vector search engine that bundles embedding inference with storage, so you send raw text/images and queries instead of running your own embed pipeline
- Meilisearch — Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance

### web-scraping
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agent Reach — Toolkit giving AI agents read and search access to Twitter/X, Reddit, YouTube, GitHub, and the wider web
- Airbyte — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- Browserbase — Hosted cloud browser platform for AI agents and automated browser workflows
- Crawl4AI — Python crawler and scraper designed for LLM-friendly web content extraction

## Architecture Quick Refs

- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost
- Research Platform Stack vs Product Stack: Reproducibility vs Shipping Speed

## Architecture Decisions by Category

### data-strategy
- Choosing a Chunking Strategy: Fixed, Structure-Aware, Parent-Child, or Semantic
- Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted
- Choosing a Reranking Strategy: Dense-Only, Cross-Encoder, or LLM Reranker
- Dense vs Sparse vs Hybrid Retrieval: How Should You Actually Find the Right Chunks?
- Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed

### evaluation-strategy
- Choosing an Evaluation Strategy: Golden Datasets, Model-Graded Evals, and Human Review
- Choosing an Observability Approach: Integration Model First, Feature List Second
- LLM-as-Judge vs Human Evaluation vs Reference-Based Metrics: How Should You Grade Outputs?

### model-selection
- Choosing an Agent Framework: State Model, Language, and Provider Constraints
- Choosing a Model: Local vs Cloud, and Routing by Primary Need
- Self-Host Open Weights vs Hosted Model API: Who Should Run the GPU?

### reference-stacks
- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost

### serving-patterns
- Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse
- Choosing a Deployment Target: Separating App Hosting From Model Serving
- Handling Provider Failures: Retry, Model/Provider Fallback, or a Managed Gateway
- Choosing a Quantization Strategy: How Low Can You Go Before Quality Breaks?
- Synchronous vs Streaming vs Asynchronous: How Should the Answer Reach the User?

### system-design
- Managing a Growing Context Window: Truncation, Summarization, or Retrieval Offload
- Layering LLM Guardrails: Prompt Hardening, Validation Frameworks, Classifier Screens, and Human Gates
- Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic
- Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding
- RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation

## Observability Playbooks by Category

### cost-usage
- Attribute Every LLM Call's Cost to a Feature, User, and Prompt Version, Not Just a Monthly Invoice Total
- Monitor Cache Hit Rate and Realized Token Savings Per Cache Layer, So a Silently Ineffective Cache Stops Costing You Money It Was Supposed to Save

### evaluation-quality
- Gate Prompt, Model, and Retriever Changes on a Versioned Eval Dataset Before They Ship
- Monitor Guardrail Trip Rate as a First-Class Quality Signal, Because a Guardrail That Never Fires and One That Fires Constantly Are Both Broken
- Monitor Retrieval Quality Continuously with Reference-Free Signals, Not Just Offline Benchmarks

### incident-response
- Triage, Kill-Switch, and Postmortem Runbook for Agent Loops, RAG Regressions, and Cost Blowouts
- Runbook: Detect and Fail Over a Model-Provider Outage in Minutes, Because Your Uptime Is Now Capped by a Dependency You Do Not Control

### instrumentation
- Capture Context-Window Utilization and Truncation on Every Call, So Silent Prompt Clipping Is Visible Before It Degrades Output
- Capture a Structured Event for Every LLM Call, Not Just an Access Log Line
- Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces

### monitoring-alerting
- Alert on SLO Burn Rate, Not Raw Thresholds, for Latency, Cost, and Quality Regressions
- Define Streaming Latency SLOs on TTFT and Inter-Token Time, Not Total Request Duration
- Alert on Tool-Call Error and Retry Rate Per Tool, Because an Agent That Retries Around a Broken Tool Looks Healthy While Cost and Latency Climb

### privacy-governance
- Detect and Redact PII in Traces at the Gateway Boundary, Before It Reaches Any Store

### tracing
- Propagate a Single Trace Context Across Service Hops and Streaming Responses, So One User Request Is One Trace
- Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer

## Community Directory by Kind

### chat
- EleutherAI Discord
- GPU MODE Discord
- Hugging Face Discord
- LangChain Community Slack
- LlamaIndex Discord

### creator
- AssemblyAI (YouTube)
- DeepLearning.AI (YouTube)
- fast.ai
- Gradient Dissent (Weights & Biases)
- Hugging Face (YouTube)

### dataset
- Common Crawl
- FineWeb (Hugging Face)
- LAION (Large-scale Artificial Intelligence Open Network)

### event
- AI Engineer World's Fair
- NeurIPS (Conference on Neural Information Processing Systems)

### forum
- Hugging Face Forums
- LangChain Forum
- OpenAI Developer Community
- r/LocalLLaMA (Reddit)
- r/MachineLearning (Reddit)

### meetup
- AI Tinkerers

### newsletter
- Import AI (Jack Clark)
- Interconnects (Nathan Lambert)
- Last Week in AI
- Latent Space (Newsletter)
- The Batch (DeepLearning.AI)

## Benchmark Catalog

- AgentBench
- AgentDojo
- AgentHarm
- Aider Polyglot Coding Benchmark
- AlpacaEval 2.0 (Length-Controlled)
- ARC-AGI (Abstraction and Reasoning Corpus)
- Arena-Hard-Auto
- BEIR
- BIG-Bench Hard (BBH)
- BIRD (Big Bench for Large-Scale Database Grounded Text-to-SQL)

## Trending Signals

- Source Feed: GitHub Trending
- AI Arsenal Hall of Fame
- This Week in AI Arsenal
- Source Feed: ToolRadar / Techpresso

## Decision Heuristics

- Need local/private LLMs? → inspect Ollama, llama.cpp, local-first stack, and choose-llm.
- Need fast inference at scale? → inspect vLLM, TGI, production-serving, and choose-deployment-target.
- Simple RAG? → inspect LlamaIndex, LangChain, Chroma, pgvector, and rag-vs-fine-tuning.
- Complex multi-step agents? → inspect LangGraph and choose-agent-framework.
- Tracing/observability? → inspect Langfuse, Phoenix, LangSmith, and observability overview.
- Evaluation before launch? → inspect DeepEval, RAGAS, promptfoo, evaluation pipelines, and choose-eval-framework.

## Must-Read Papers

- GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints — Introduced grouped-query attention — sharing each key/value head across a group of query heads — cutting KV-cache memory several-fold with near-zero quality loss; now the default attention configuration in almost every open LLM
- Flamingo: a Visual Language Model for Few-Shot Learning — Bridged a frozen vision encoder and a frozen LLM with trainable cross-attention (Perceiver Resampler + gated cross-attention), enabling few-shot vision-language tasks from interleaved image-text prompts — the template most modern VLMs follow.
- Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection — Trains an LM to emit reflection tokens deciding when to retrieve and whether retrieved passages support its output — making retrieval adaptive and self-critiqued instead of always-on, and improving factuality over standard RAG
- Constitutional AI: Harmlessness from AI Feedback — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- Managing Procedural Memory in LLM Agents: Control, Adaptation, and Evaluation — Introduces AFTER, a 382-task benchmark for testing whether procedural skills learned by agents transfer across tasks, roles, and model backbones.
- Graph of Thoughts: Solving Elaborate Problems with Large Language Models — Generalizes chain- and tree-of-thought by modeling reasoning as an arbitrary graph, where thoughts can be aggregated, refined, and looped -- enabling operations like merging partial solutions that a tree cannot express
- Improving Language Models by Retrieving from Trillions of Tokens — RETRO augments a Transformer with chunk-level retrieval from a trillions-of-tokens database via cross-attention, letting a small model match much larger ones -- retrieval as a way to move knowledge out of parameters and into an index
- Language Models are Few-Shot Learners — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads — Speeds up decoding by adding a few extra prediction heads that guess several future tokens at once, verified in parallel with tree attention — no separate draft model, 2-3x faster, and self-contained enough to bolt onto an existing model.
- Evaluating Large Language Models Trained on Code (Codex / HumanEval) — Introduced Codex (the model behind GitHub Copilot) and HumanEval with the pass@k metric — establishing execution-based functional correctness, not text similarity, as the way to evaluate code generation

## High-Impact Tips

- Add A Max Step Budget To Every Agent Loop
- Keep the Smallest Failing Prompt for Every Recurring Issue
- Add an Eval Harness Before Refactoring Prompts or Retrieval Logic
- Add Hybrid Search for Exact-Match Terms
- Add Explicit Timeout, Retry, and Fallback Behavior to Every Provider Call
- Alarm on Empty and Unparseable Responses
- Allowlist Tools Per Agent Role
- Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts
- Benchmark Using Real Production Context Lengths, Not Short Toy Prompts
- Block SSRF by Validating Outbound URLs From Tools
