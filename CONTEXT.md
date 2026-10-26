# AI Arsenal — Dense Context Summary

Generated: 2026-10-26T16:04:06.614Z | Entries: 1300 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 511
- Tools: 249
- Papers: 138
- Tips: 171
- People: 25
- Digests: 1
- Guides: 60
- Build examples: 11
- Architectures: 29
- Observability: 16
- Community: 33
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
- DeepSeek Harness (⭐262384, score:80) — DeepSeek's open agent harness (dsh): every component — model adapter, tool registry, agent loop — is a replaceable plugin on the Cordis framework
- opencode (⭐221825, score:73) — MIT-licensed terminal coding agent in TypeScript that edits files, runs shell commands, and exposes a client/server session protocol
- goose (⭐55756, score:73) — Apache-2.0 Rust agent that installs dependencies, edits files, and runs commands locally, extended through provider-agnostic MCP tools
- browser (⭐37012, score:73) — AGPL-3.0 headless browser written in Zig that speaks CDP for fast agent navigation without a full rendering engine
- lerobot (⭐28486, score:73) — Apache-2.0 robotics learning stack standardizing datasets, policies, and evaluation so imitation learning transfers across robot hardware

### code-generation
- screenshot-to-code (⭐80737, score:55) — Converts screenshots, mockups, and Figma designs into working frontend code (HTML/Tailwind, React, Vue) using multimodal LLMs — with video-to-prototype support
- Open Code Review (⭐48336, score:55) — Alibaba's open-sourced code review CLI that pairs deterministic rules pipelines with an LLM agent emitting line-level review comments
- Kilo Code (⭐27755, score:55) — IDE-based agentic coding platform shipped as a VS Code and JetBrains extension with a model-agnostic gateway
- PR-Agent (⭐13617, score:55) — Open-source pull-request reviewer that summarises, reviews, and suggests changes from the diff
- mini-swe-agent (⭐8854, score:55) — Deliberately minimal software-engineering agent: bash as the only tool, linear message history, stateless action execution

### computer-vision
- opencv (⭐91329, score:60) — Apache-2.0 C++/Python computer-vision library covering decode, filtering, geometry, calibration, and DNN inference
- mediapipe (⭐37413, score:58) — Apache-2.0 cross-platform pipeline for live media shipping ready-made face, hand, pose, and segmentation graphs that run on-device
- PaddleOCR (⭐91706, score:55) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
- Tesseract OCR (⭐77171, score:55) — The long-standing open-source OCR engine that recognizes text in 100+ languages using an LSTM line recognizer, widely used as the default OCR backend
- Supervision (⭐51371, score:55) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools

### data-pipelines
- Scrapling (⭐89842, score:73) — BSD-3-Clause adaptive scraping framework that detects blocking, escalates to a stealth browser, and re-locates selectors when markup shifts
- ClickHouse (⭐50611, score:72) — Apache-2.0 columnar OLAP engine with vectorized execution, MergeTree storage, and sub-second scans over event and trace data
- DuckDB (⭐42580, score:55) — In-process analytical SQL engine that queries Parquet and CSV files directly from the FROM clause
- Marker (⭐40651, score:55) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- Polars (⭐40205, score:55) — A fast, multi-threaded DataFrame library in Rust with a lazy query optimizer and Arrow memory model, a high-performance alternative to pandas for AI/ML data

### evaluation
- scikit-learn (⭐67929, score:73) — BSD-3-Clause classical ML library defining the estimator, transformer, and Pipeline contracts that tabular and structured stages still use
- AiSOC (⭐3935, score:63) — A Docker Compose security operations center that normalizes telemetry, runs a rule library, and audits LLM triage step by step
- VulnClaw (⭐3807, score:51) — An autonomous penetration-testing CLI that runs recon, discovery, exploitation, and reporting from natural language with evidence-gated output
- SWE-bench (⭐6090, score:46) — Real GitHub issues paired with hidden fail-to-pass and pass-to-pass test suites, and the harness that turns a patch into a resolution rate
- Gymnasium (⭐12731, score:44) — Standard API for reinforcement-learning environments with spaces, vectorisation, and a curated env registry

### llms
- tensorflow (⭐201266, score:73) — Apache-2.0 tensor and autodiff framework with graph execution, distributed strategies, and the broadest export surface of any DL stack
- transformers (⭐168195, score:73) — Apache-2.0 model-definition layer exposing one AutoModel API over thousands of text, vision, audio, and multimodal checkpoints
- LlamaFactory (⭐75742, score:73) — Apache-2.0 fine-tuning workbench covering 100+ LLM and VLM families behind one YAML config for LoRA, QLoRA, and RLHF
- minimind (⭐64443, score:73) — Apache-2.0 minimal LLM codebase that pretrains and instruction-tunes a 64M-parameter model on one consumer GPU in roughly two hours
- nanochat (⭐58949, score:73) — MIT-licensed single-GPU recipe that pretrains, midtrains, and instruction-tunes a small chat model end to end in one repository

### multimodal
- ComfyUI (⭐143175, score:73) — GPL-3.0 node-graph engine for diffusion and video models where a saved workflow is a JSON graph other tools can replay
- InvokeAI (⭐28868, score:73) — Apache-2.0 creative engine for Stable Diffusion with a managed asset database, board, and metadata stored per generation
- Fooocus (⭐53694, score:72) — GPL-3.0 minimal UI over SDXL and Flux that reduces image generation to prompt, style, aspect ratio, and advanced knobs
- Stable Diffusion WebUI (⭐165149, score:55) — AUTOMATIC1111's browser-based application for local Stable Diffusion image generation with an extensive extension ecosystem for control, upscaling
- Hugging Face Diffusers (⭐34816, score:55) — The de facto Python library for diffusion models, providing pipelines, schedulers, and model components for image, video, and audio generation in PyTorch

### observability
- Langfuse (⭐36525, score:55) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- DeepEval (⭐19111, score:55) — A pytest-shaped evaluation framework for LLM apps, with RAG, agent-trajectory and multimodal metrics in one Apache-2.0 Python library
- Phoenix (⭐12011, score:55) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
- Rerun (⭐11643, score:55) — Visualize, query, and stream multimodal and robotics data for AI development
- Helicone (⭐6238, score:49) — Apache-2.0 AI gateway plus observability: one base-URL change covers 100+ providers with routing, fallbacks, cost tracking and sessions

### rag
- opendataloader-pdf (⭐30033, score:73) — Apache-2.0 Java PDF parser producing tagged, structured output for LLM ingestion while also repairing PDFs for accessibility
- TrendRadar (⭐63208, score:63) — A self-hosted trend and news aggregator with AI filtering, translation, push delivery to chat platforms, and an MCP server
- Firecrawl (⭐195566, score:55) — Web data API with search, scrape, crawl and map endpoints, AGPL-licensed and also sold as a hosted service
- RAGFlow (⭐92900, score:55) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities
- Crawl4AI (⭐86303, score:55) — Open-source crawler that turns any page into LLM-ready Markdown, runnable locally or through a hosted API with MCP

### tooling
- kestra (⭐30008, score:73) — Apache-2.0 Java orchestration platform with event-driven triggers, durable execution, and a UI for data and AI pipelines
- presidio (⭐11519, score:69) — PII detection and redaction framework with NLP and pattern recognizers plus context-aware scoring
- Supabase (⭐113984, score:55) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- MCP Reference Servers (⭐91585, score:55) — Reference implementations of Model Context Protocol servers that expose files, search, and APIs to agents
- Context7 (⭐63721, score:55) — Up-to-date code documentation platform for LLMs and AI coding editors through retrieval and MCP access

### voice-audio
- Handy (⭐34741, score:73) — MIT-licensed Rust desktop app for fully offline Whisper-family speech-to-text, built as a Tauri v2 native client
- Whisper (⭐111321, score:55) — OpenAI's open-source speech recognition model: robust multilingual transcription and translation trained on 680k hours of audio
- GPT-SoVITS (⭐63806, score:55) — Few-shot voice cloning and TTS toolkit that clones a voice from ~1 minute of audio, with WebUI for data prep, training, and inference
- whisper.cpp (⭐54686, score:55) — A dependency-free C/C++ port of OpenAI's Whisper that runs speech-to-text on CPU and consumer hardware via the ggml/GGUF tensor library
- VoxCPM (⭐40654, score:55) — A tokenizer-free text-to-speech model that generates speech in a continuous acoustic space for multilingual synthesis, creative voice design

## Top Tools by Job

### data-labeling
- Airbyte — Open-source ELT platform with a 600+ connector catalogue for moving data from APIs, databases, files and warehouses into destinations
- Argilla — Human feedback and dataset curation UI in maintenance mode, with script-defined annotation and evaluation workflows
- dlt — Python ELT library that turns APIs, files and databases into declarative pipelines with schema inference
- Hugging Face AI Sheets — Spreadsheet-style web app for building, enriching and transforming datasets with LLM columns, deployable from Docker or pnpm against Hub or local models
- Label Studio — Apache-2.0 multi-modal annotation platform: configurable templates for text, image, audio, video and time series, plus ML-backend pre-labelling

### deployment
- Anyscale — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- AxonHub — Go-based LLM gateway translating provider schemas, failing over automatically and metering spend per key
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- Baseten — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero

### evaluation
- Agentic Security — Open-source scanner and fuzzer that probes LLM endpoints with multimodal, multi-step jailbreak and reinforcement-learning attack suites
- AgentOps — Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK
- AI Infra Guard — Tencent Zhuque Lab's full-stack red-teaming platform covering agent, skill, MCP, AI-infrastructure and jailbreak scanning in one deployable product
- any-agent — Mozilla AI's thin adapter layer that runs one agent interface across six different agent frameworks
- Argilla — Human feedback and dataset curation UI in maintenance mode, with script-defined annotation and evaluation workflows

### fine-tuning
- Axolotl — Configuration-driven fine-tuning framework for many open-weight LLM families
- DeepSpeed — Microsoft's distributed-training library: ZeRO sharding, offloading, and pipeline parallelism for training beyond single-GPU memory
- Hugging Face Accelerate — Thin PyTorch wrapper that runs an existing training loop on CPU, TPU, or single and multi-GPU with fp8, fp16 and bf16 mixed precision
- Liger Kernel — Fused Triton kernels for LLM training (RMSNorm, RoPE, SwiGLU, fused cross-entropy) that cut memory and raise throughput as near drop-in layer replacements
- LLaMA-Factory — Unified fine-tuning framework and UI for many LLMs and training methods

### memory-management
- Codebase Memory MCP — MCP server that indexes codebases into a persistent knowledge graph for fast agent code intelligence
- Graphify — Agent skill and CLI that maps a codebase into a queryable knowledge graph instead of a vector index
- Letta — Stateful agent runtime that gives agents persistent memory and identity, distributed today as a letta-code CLI, App Server and SDK
- Mem0 — Memory layer for agents using add-only fact extraction with entity linking and fused multi-signal retrieval
- Memoriq — Private AI memory layer that learns from your conversations and documents

### model-registry
- awesome-opensource-ai — Opinionated index of genuinely open-source AI models, serving engines, RAG frameworks and MLOps tooling
- ClearML — Open-source MLOps suite bundling experiment tracking, dataset versioning, remote execution, pipelines, orchestration, Triton-backed serving and fractional GPUs
- DVC — Git-native version control for datasets and models — pointer files in Git, content in a cache, and a pipeline graph that reproduces only what changed
- Hugging Face Hub — The default distribution platform for open models, datasets and demo Spaces — Git-backed repositories with LFS/Xet storage and a first-class Python client
- MLflow — Open-source platform for experiment tracking, model registry, and ML lifecycle management

### monitoring
- AgentOps — Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Deepchecks — Testing-first validation for ML models and LLM apps: prebuilt check suites from data integrity to LLM quality
- Evidently — Open-source evaluation and monitoring for ML and LLM systems: 100+ metrics from data drift to LLM-as-judge
- Galileo — Commercial LLM evaluation and observability platform with research-backed, label-free metrics for hallucination, factuality, and guardrails

### orchestration
- ADK for Go (Agent Development Kit) — Google's code-first Go toolkit for building, evaluating and deploying multi-agent systems
- ADK for Java (Agent Development Kit) — Google's code-first Java toolkit for multi-agent systems on the JVM, with typed tools and tracing
- Agents-Anywhere — Cross-device workbench for driving and monitoring agents on remote machines over ACP
- Agno — Python SDK plus AgentOS runtime for building, serving and operating self-hosted agent platforms
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies

### production-serving
- Anyscale — Managed platform from the creators of Ray for running distributed AI workloads — training, batch inference, and serving — on autoscaling Ray clusters
- Baseten — Managed platform to deploy and autoscale ML/LLM models in production, built on the open-source Truss packaging format with scale-to-zero
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Cerebras Inference — Wafer-scale-engine inference API claiming the fastest open-model token rates available
- Cloudflare Workers AI — Serverless GPU inference on Cloudflare's global edge network, billed per request with zero infrastructure

### prompt-management
- AdalFlow — PyTorch-style library that makes LLM prompts differentiable parameters so RAG and agent pipelines can be auto-optimised rather than hand-prompted
- Cloudskill — Manage, govern, and distribute skills for AI agents across teams
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- Langfuse Prompts — Prompt management and versioning workflows inside the Langfuse observability platform
- LangSmith Hub — LangSmith prompt and dataset workflows for LangChain and LangGraph applications

### prototyping
- AdalFlow — PyTorch-style library that makes LLM prompts differentiable parameters so RAG and agent pipelines can be auto-optimised rather than hand-prompted
- Agent Skills (Addy Osmani) — Collection of roughly two dozen markdown SKILL.md workflows and slash commands that install process gates into Claude Code, Cursor, Codex and 70 other agents
- AI Engineering From Scratch — Dependency-light implementations of transformers, agent loops, RAG and MCP servers written to be read and run
- Aider — Terminal pair-programming tool that maps your codebase, edits files in place and auto-commits each change so you can diff and undo with git
- Awesome-AITools — Curated bilingual index of AI applications, agent skills and developer utilities across major model ecosystems

### security-and-guardrails
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agentic Security — Open-source scanner and fuzzer that probes LLM endpoints with multimodal, multi-step jailbreak and reinforcement-learning attack suites
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- AI Infra Guard — Tencent Zhuque Lab's full-stack red-teaming platform covering agent, skill, MCP, AI-infrastructure and jailbreak scanning in one deployable product
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure

### structured-output
- BAML — DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output
- Basedash — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- Claude Artifact Player — Interact with and manage AI-generated artifacts from Claude and similar models
- DB-GPT — Agentic data framework for private text-to-SQL, schema-linked RAG and multi-model serving
- Google Pomelli 2.0 — Explore and interact with large datasets through a visual, intuitive interface

### tracing
- AgentOps — Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- Laminar — OpenTelemetry-based tracing, evaluation, datasets, and monitoring for LLM and agent applications
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- LangWatch — Open-source LLM observability and evaluation platform — OpenTelemetry-based tracing plus online/offline evals and datasets, self-hostable or cloud

### vector-search
- DB-GPT — Agentic data framework for private text-to-SQL, schema-linked RAG and multi-model serving
- DocsGPT — Self-hostable RAG platform with ingestion workers, an agent builder and a ready-made chat UI
- Dust — Hosted team platform for agents over company data, with connectors, permission-aware retrieval and credit pricing
- Elasticsearch — Distributed search and analytics engine with a vector database, full-text search and near-real-time indexing
- FAISS — C++ similarity search and clustering library for dense vectors with full Python and numpy wrappers and GPU implementations of key indexes

### web-scraping
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agent Reach — Open-source CLI that gives an agent read and search access to Twitter, Reddit, YouTube, Bilibili, Xiaohongshu and GitHub without paid APIs or per-site
- Airbyte — Open-source ELT platform with a 600+ connector catalogue for moving data from APIs, databases, files and warehouses into destinations
- Browserbase — Stagehand browser SDK with observe, act and extract primitives plus CUA models, MIT licensed and multi-language
- Crawl4AI — Open-source crawler that returns LLM-ready Markdown from any page, with a paid cloud tier behind the same API

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
- AI Weekly — Ranks and explains AI developments using signals from what influential experts and organizations are reading and sharing
- Import AI (Jack Clark)
- Interconnects (Nathan Lambert)
- Last Week in AI
- Latent Space (Newsletter)

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
- K9-Bench: Evaluating Multimodal LLMs on Canine-Centric Videos — A 5,000-pair question set over 907 home dog videos, built to test long-horizon reasoning about canine actions and interactions.
- Constitutional AI: Harmlessness from AI Feedback — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- AGC-Bench: Measuring Artificial General Creativity — An 78-dataset creativity benchmark paired with AGC-Judge, an open-weight judge calibrated to remove leniency bias.
- Managing Procedural Memory in LLM Agents: Control, Adaptation, and Evaluation — Introduces AFTER, a 382-task benchmark for testing whether procedural skills learned by agents transfer across tasks, roles, and model backbones.
- Graph of Thoughts: Solving Elaborate Problems with Large Language Models — Generalizes chain- and tree-of-thought by modeling reasoning as an arbitrary graph, where thoughts can be aggregated, refined, and looped -- enabling operations like merging partial solutions that a tree cannot express
- Improving Language Models by Retrieving from Trillions of Tokens — RETRO augments a Transformer with chunk-level retrieval from a trillions-of-tokens database via cross-attention, letting a small model match much larger ones -- retrieval as a way to move knowledge out of parameters and into an index
- Language Models are Few-Shot Learners — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning

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
