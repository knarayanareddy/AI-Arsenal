# AI Arsenal — Dense Context Summary

Generated: 2026-07-08T20:35:27.017Z | Entries: 752 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 136
- Tools: 187
- Papers: 90
- Tips: 129
- People: 25
- Digests: 1
- Guides: 59
- Build examples: 8
- Architectures: 21
- Observability: 10
- Community: 32

## Navigation

- Agent map: /AGENT.md
- Taxonomy: /TAXONOMY.md
- Data API: /data/index.json, /data/projects.json, /data/tools.json, /data/search-index.json
- Architecture decisions: /content/architectures/{system-design,data-strategy,model-selection,serving-patterns,evaluation-strategy}/
- Reference stacks: /content/architectures/reference-stacks/
- Observability playbooks: /content/observability/{instrumentation,tracing,evaluation-quality,monitoring-alerting,cost-usage,privacy-governance,incident-response}/
- Community directory: /content/community/{forums,chat,newsletters,events,meetups,creators,datasets}/
- Tool jobs: /content/tools/by-job/
- Tool phases: /content/tools/data-ingestion/, /content/tools/model-layer/, /content/tools/orchestration/, /content/tools/serving-and-deployment/, /content/tools/evaluation-and-observability/, /content/tools/dx-and-tooling/
- Observability: /content/observability/
- Research papers: /content/research/papers/

## Top Projects by Category

### agents
- Strix (⭐38354, score:70) — Open-source autonomous AI penetration-testing agent that finds and validates application vulnerabilities
- Semantic Kernel (⭐28114, score:70) — An SDK for integrating AI orchestration into production applications
- Pydantic AI (⭐17738, score:70) — A Python agent framework built around typed models and structured outputs
- PageAgent (⭐24812, score:65) — JavaScript in-page GUI agent from Alibaba that controls web interfaces with natural language
- Skyvern (⭐22154, score:60) — LLM + computer-vision browser automation that operates websites from natural-language goals instead of brittle DOM selectors

### code-generation
- screenshot-to-code (⭐73211, score:60) — Converts screenshots, mockups, and Figma designs into working frontend code (HTML/Tailwind, React, Vue) using multimodal LLMs — with video-to-prototype support
- Continue (⭐34744, score:60) — Open-source AI coding assistant for VS Code and JetBrains — chat, autocomplete, edit, and agent modes over any model, including fully local
- Tabby (⭐33679, score:55) — Self-hosted AI coding assistant server in Rust — an on-prem Copilot alternative bundling its own model serving, code RAG, and IDE integrations

### computer-vision
- Ultralytics YOLO (⭐59255, score:62) — The YOLO family framework — train, validate, and deploy real-time detection, segmentation, pose, and classification models with a three-line API
- Supervision (⭐47365, score:58) — Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
- Detectron2 (Meta) (⭐34599, score:55) — Meta's modular library for detection, segmentation, and visual recognition — the reference research platform behind a decade of detection work
- SAM 2 (Segment Anything Model 2) (⭐19492, score:55) — Meta's promptable segmentation foundation model unified across images and video — click/box prompts yield masks tracked through time via streaming memory
- PaddleOCR (⭐85010, score:50) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge

### data-pipelines
- Marker (⭐37280, score:50) — Deep-learning PDF-to-markdown converter that handles tables, equations, and layout with optional LLM-assisted accuracy boosts
- cleanlab (⭐11562, score:50) — Data-centric AI library that finds label errors, outliers, and low-quality examples in any dataset via confident-learning statistics on predictions

### evaluation
- MTEB (⭐3344, score:50) — The Massive Text Embedding Benchmark — the standard evaluation suite and leaderboard for embedding and reranker models across 1000+ tasks
- Terminal-Bench (⭐2427, score:50) — Benchmark measuring AI agents on real end-to-end tasks in a sandboxed terminal environment, from compiling code to training models
- BigCodeBench (⭐513, score:50) — Code-generation benchmark testing diverse function calls and complex instructions across 139 libraries — the harder successor to HumanEval

### llms
- LobeChat (LobeHub) (⭐79620, score:72) — Self-hostable, multi-provider AI chat platform with plugins, agents marketplace, knowledge base, and one-click deployment
- exo (exo-explore) (⭐46087, score:72) — Clusters your everyday devices — phones, laptops, desktops — into one inference pool, sharding a model too big for any single machine
- Qwen (⭐21281, score:70) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- Gemma (⭐5410, score:70) — Google open model family designed for efficient language and multimodal applications
- Phi Cookbook (⭐3750, score:70) — Microsoft examples and recipes for building with the Phi model family

### multimodal
- Qwen3-VL (⭐19555, score:55) — Alibaba's open vision-language model family — image, video, and document understanding with strong OCR and GUI-grounding across sizes from edge to flagship
- ComfyUI (⭐119901, score:50) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
- FLUX (Black Forest Labs) (⭐25700, score:45) — Black Forest Labs' rectified-flow image generation family — FLUX.1 [dev]/[schnell] set the open-weights quality bar after Stable Diffusion's momentum stalled
- CLIP (OpenAI) (⭐33936, score:30) — OpenAI's contrastive image-text model — the shared embedding space that underlies zero-shot classification, image search, and the vision encoders of most VLMs

### observability
- DeepEval (⭐16140, score:70) — An open-source evaluation framework for testing LLM applications in CI
- Langfuse (⭐29021, score:30) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- Opik (⭐19609, score:30) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- Phoenix (⭐10124, score:30) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems
- OpenLLMetry (⭐7000, score:30) — OpenTelemetry instrumentation for GenAI and LLM applications from Traceloop

### rag
- LangChain (⭐139206, score:70) — A framework for composing LLM applications, retrieval flows, tools, and agents
- DSPy (⭐35010, score:70) — A framework for programming and optimizing language model pipelines
- AnythingLLM (⭐62924, score:68) — All-in-one desktop and server RAG application — drop in documents, pick any LLM and vector DB, chat with citations, no code required
- GraphRAG (⭐34257, score:65) — Microsoft's knowledge-graph RAG — LLM-extracted entity graphs with hierarchical community summaries that answer global questions vector RAG can't
- Onyx (formerly Danswer) (⭐30772, score:62) — Self-hosted enterprise search and chat over 40+ workplace connectors (Slack, Drive, Confluence, Jira...) with permissions-aware retrieval

### tooling
- Supabase (⭐74300, score:50) — Open-source backend platform: Postgres database, auth, storage, and realtime APIs
- Uiverse Design (⭐11000, score:40) — Open-source library of community-made CSS/Tailwind UI elements for faster front-end development

### voice-audio
- AudioCraft (Meta) (⭐23456, score:60) — Meta's audio-generation library and open models — MusicGen for text-conditioned music, AudioGen for sound effects, built on the EnCodec codec
- Speech To Speech (⭐5654, score:60) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
- Chatterbox (Resemble AI) (⭐25426, score:55) — Resemble AI's MIT-licensed production TTS — zero-shot cloning with emotion-exaggeration control, multilingual coverage, and watermarked outputs by default
- faster-whisper (⭐24114, score:55) — Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
- WhisperX (⭐22968, score:55) — Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput

## Top Tools by Job

### data-labeling
- Airbyte — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- dlt — Python-native ELT library: declarative, schema-evolving data pipelines as code, popular with AI/agent workflows
- Label Studio — An open-source data labeling platform for ML and AI datasets
- MarkItDown — Microsoft's utility for converting Office files, PDFs, images, and audio into LLM-friendly Markdown

### deployment
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Cog (Replicate) — Replicate's open tool for packaging ML models into containers — declare Python/CUDA deps and a predict interface, get a served HTTP API with no Dockerfile
- CubeSandbox — Self-hostable, hardware-isolated sandbox service for AI agent code execution with tens-of-milliseconds startup and an E2B-compatible API

### evaluation
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- any-agent — One Python abstraction over many agent frameworks (LangChain, OpenAI Agents, Google ADK, smolagents) plus framework-agnostic tracing and evaluation
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure
- Code Arena — Benchmark and compare AI models in a competitive coding environment

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
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications

### orchestration
- Agno — High-performance Python framework (formerly Phidata) for building multi-agent systems with memory, knowledge, and its own runtime
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- any-agent — One Python abstraction over many agent frameworks (LangChain, OpenAI Agents, Google ADK, smolagents) plus framework-agnostic tracing and evaluation
- Apache Airflow — Mature workflow scheduler for batch data, ML, and AI pipeline orchestration
- ClearML — Open-source, self-hostable MLOps suite covering experiment tracking, data versioning, pipelines, and orchestration

### production-serving
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Cerebras Inference — Wafer-scale-engine inference API claiming the fastest open-model token rates available
- Cloudflare Workers AI — Serverless GPU inference on Cloudflare's global edge network, billed per request with zero infrastructure
- Cohere — Enterprise AI platform: Command models plus best-in-class Embed and Rerank APIs for search and RAG
- FastAPI — Python web framework for building APIs around AI services and model workflows

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
- AGNT.Hub — Build and manage secure, private AI agents with custom skills and policies
- Astra Autonomous Pentest — Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure
- CubeSandbox — Self-hostable, hardware-isolated sandbox service for AI agent code execution with tens-of-milliseconds startup and an E2B-compatible API
- garak (NVIDIA) — NVIDIA's open LLM vulnerability scanner — nmap for language models, probing deployed systems for jailbreaks, prompt injection, leakage, and toxic generation

### structured-output
- BAML — DSL for LLM functions: define typed prompts/schemas in .baml files and generate type-safe clients with parsing that repairs malformed model output
- Basedash — AI-native platform for generating dashboards, reports, and insights from natural-language queries
- Claude Artifact Player — Interact with and manage AI-generated artifacts from Claude and similar models
- Google Pomelli 2.0 — Explore and interact with large datasets through a visual, intuitive interface
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs

### tracing
- AgentOps — Observability and debugging platform purpose-built for AI agents: session replays, cost tracking, and multi-framework tracing
- Conan — Live HUD for monitoring and interacting with AI agent sessions on macOS
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- Spotlight by Backplanes — Understand, improve, and track AI agent sessions with observability tooling
- Superlog — Real-time log aggregation platform designed for serverless debugging

### vector-search
- Elasticsearch — Distributed search and analytics engine with mature BM25, dense-vector kNN, and hybrid retrieval for RAG workloads
- FAISS — Meta's foundational library for efficient similarity search over billions of dense vectors
- Marqo — Vector search engine that bundles embedding inference with storage, so you send raw text/images and queries instead of running your own embed pipeline
- Meilisearch — Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance
- Pinecone — A managed vector database for production semantic search applications

### web-scraping
- Agent Browser Shield — Secure AI web browsing by cleaning content and masking PII during agent runs
- Agent Reach — Toolkit giving AI agents read and search access to Twitter/X, Reddit, YouTube, GitHub, and the wider web
- Airbyte — Open-source data-integration platform with 600+ connectors, increasingly used to feed context into LLM/RAG pipelines
- Browserbase — Hosted cloud browser platform for AI agents and automated browser workflows
- Crawl4AI — Python crawler and scraper designed for LLM-friendly web content extraction

## Architecture Quick Refs

- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified — 
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff — 
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling — 
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It — 
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost — 
- Research Platform Stack vs Product Stack: Reproducibility vs Shipping Speed — 

## Architecture Decisions by Category

### data-strategy
- Choosing a Chunking Strategy: Fixed, Structure-Aware, Parent-Child, or Semantic — 
- Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted — 
- Choosing Vector Storage: Postgres-Native, Embedded, Self-Hosted, or Managed — 

### evaluation-strategy
- Choosing an Evaluation Strategy: Golden Datasets, Model-Graded Evals, and Human Review — 
- Choosing an Observability Approach: Integration Model First, Feature List Second — 

### model-selection
- Choosing an Agent Framework: State Model, Language, and Provider Constraints — 
- Choosing a Model: Local vs Cloud, and Routing by Primary Need — 

### reference-stacks
- Enterprise-Scale AI Stack vs Production RAG Stack: When Governance Overhead Is Justified — 
- Lean MVP Stack vs Production RAG Stack: Speed vs Durability Tradeoff — 
- Local-First Stack vs Cloud API Stack: Privacy and Cost Control vs Capability Ceiling — 
- Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It — 
- Production RAG Stack vs Lean MVP Stack: When Ingestion, Eval, and Observability Earn Their Cost — 

### serving-patterns
- Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse — 
- Choosing a Deployment Target: Separating App Hosting From Model Serving — 
- Choosing an LLM Serving Stack: Managed API, Local Runtime, or Self-Hosted Engine — 

### system-design
- Layering LLM Guardrails: Prompt Hardening, Validation Frameworks, Classifier Screens, and Human Gates — 
- Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic — 
- Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding — 
- RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation — 
- Single Agent vs Multi-Agent: When Splitting the Work Actually Helps — 

## Observability Playbooks by Category

### cost-usage
- Attribute Every LLM Call's Cost to a Feature, User, and Prompt Version, Not Just a Monthly Invoice Total — 

### evaluation-quality
- Gate Prompt, Model, and Retriever Changes on a Versioned Eval Dataset Before They Ship — 
- Monitor Retrieval Quality Continuously with Reference-Free Signals, Not Just Offline Benchmarks — 

### incident-response
- Triage, Kill-Switch, and Postmortem Runbook for Agent Loops, RAG Regressions, and Cost Blowouts — 

### instrumentation
- Capture a Structured Event for Every LLM Call, Not Just an Access Log Line — 
- Capture Explicit and Implicit User Feedback as Structured Events Joined to Traces — 

### monitoring-alerting
- Alert on SLO Burn Rate, Not Raw Thresholds, for Latency, Cost, and Quality Regressions — 
- Define Streaming Latency SLOs on TTFT and Inter-Token Time, Not Total Request Duration — 

### privacy-governance
- Detect and Redact PII in Traces at the Gateway Boundary, Before It Reaches Any Store — 

### tracing
- Trace Every Retrieval, Tool Call, and Agent Transition as a Child Span, Not Just the Final Answer — 

## Community Directory by Kind

### chat
- EleutherAI Discord — 
- GPU MODE Discord — 
- Hugging Face Discord — 
- LangChain Community Slack — 
- LlamaIndex Discord — 

### creator
- AssemblyAI (YouTube) — 
- DeepLearning.AI (YouTube) — 
- fast.ai — 
- Gradient Dissent (Weights & Biases) — 
- Hugging Face (YouTube) — 

### dataset
- Common Crawl — 
- FineWeb (Hugging Face) — 
- LAION (Large-scale Artificial Intelligence Open Network) — 

### event
- AI Engineer World's Fair — 
- NeurIPS (Conference on Neural Information Processing Systems) — 

### forum
- Hugging Face Forums — 
- LangChain Forum — 
- OpenAI Developer Community — 
- r/LocalLLaMA (Reddit) — 
- r/MachineLearning (Reddit) — 

### meetup
- AI Tinkerers — 

### newsletter
- Import AI (Jack Clark) — 
- Interconnects (Nathan Lambert) — 
- Last Week in AI — 
- Latent Space (Newsletter) — 
- The Batch (DeepLearning.AI) — 

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
- Language Models are Few-Shot Learners — Showed scaling a decoder-only Transformer to 175B params produces strong few-shot in-context learning with zero gradient updates, meaning you can often solve a new task via prompting instead of fine-tuning
- Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads — Speeds up decoding by adding a few extra prediction heads that guess several future tokens at once, verified in parallel with tree attention — no separate draft model, 2-3x faster, and self-contained enough to bolt onto an existing model.
- Evaluating Large Language Models Trained on Code (Codex / HumanEval) — Introduced Codex (the model behind GitHub Copilot) and HumanEval with the pass@k metric — establishing execution-based functional correctness, not text similarity, as the way to evaluate code generation
- Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference — Formalized the crowdsourced pairwise-battle leaderboard: anonymous side-by-side model comparisons on live user prompts, ranked with Bradley-Terry statistics — the methodology behind LMArena, the de facto public preference ranking for frontier models
- PaLM: Scaling Language Modeling with Pathways — 540B dense transformer trained across two TPU pods — the era's peak few-shot results, the canonical documentation of emergent abilities at scale, and the demonstration that chain-of-thought unlocks reasoning at sufficient size
- Deep Reinforcement Learning from Human Preferences — The origin of RLHF: learn a reward model from human comparisons of trajectory pairs, then optimize a policy against it — solving tasks where the objective is easier to recognize than to specify, with under 1% of interactions needing human feedback

## High-Impact Tips

- Add A Max Step Budget To Every Agent Loop — 
- Keep the Smallest Failing Prompt for Every Recurring Issue — 
- Add an Eval Harness Before Refactoring Prompts or Retrieval Logic — 
- Add Hybrid Search for Exact-Match Terms — 
- Add Explicit Timeout, Retry, and Fallback Behavior to Every Provider Call — 
- Allowlist Tools Per Agent Role — 
- Benchmark With Production-Shaped Inputs, Not Synthetic Toy Prompts — 
- Benchmark Using Real Production Context Lengths, Not Short Toy Prompts — 
- Cache Embeddings Keyed by Content Hash to Avoid Duplicate Calls — 
- Use Prompt Caching for Long, Stable System Prompt Prefixes — 
