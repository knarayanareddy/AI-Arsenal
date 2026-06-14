# AI Arsenal — Dense Context Summary

Generated: 2026-06-14T11:20:26.302Z | Entries: 345 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 68
- Tools: 62
- Papers: 25
- Tips: 106
- People: 25
- Digests: 0
- Guides: 51
- Build examples: 8

## Navigation

- Agent map: /AGENT.md
- Taxonomy: /TAXONOMY.md
- Data API: /data/index.json, /data/projects.json, /data/tools.json, /data/search-index.json
- Architecture decisions: /content/architectures/decision-trees/
- Reference stacks: /content/architectures/reference-stacks/
- Tool jobs: /content/tools/by-job/
- Observability: /content/observability/
- Research papers: /content/research/papers/

## Top Projects by Category

### agents
- Semantic Kernel (⭐28114, score:70) — An SDK for integrating AI orchestration into production applications
- Pydantic AI (⭐17738, score:70) — A Python agent framework built around typed models and structured outputs
- Microsoft Agent Framework (⭐11311, score:50) — Microsoft framework for Python and .NET agents, workflows, and production orchestration
- AutoGPT (⭐184931, score:40) — Autonomous agent platform and classic agent project for accessible AI automation
- Dify (⭐145081, score:40) — Visual platform for building agentic workflows, RAG apps, chatbots, and AI automations

### llms
- Qwen (⭐21281, score:70) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- Mistral Inference (⭐10816, score:70) — Reference inference code and assets for Mistral open-weight models
- Llama Models (⭐7628, score:70) — Meta open-weight model family widely used for local and production AI systems
- Gemma (⭐5410, score:70) — Google open model family designed for efficient language and multimodal applications
- Phi Cookbook (⭐3750, score:70) — Microsoft examples and recipes for building with the Phi model family

### observability
- DeepEval (⭐16140, score:70) — An open-source evaluation framework for testing LLM applications in CI
- Ragas (⭐14355, score:70) — An evaluation framework for measuring retrieval-augmented generation quality
- Langfuse (⭐29021, score:30) — Open-source LLM observability platform for traces, evals, prompts, metrics, and datasets
- Opik (⭐19609, score:30) — Open-source Comet platform for LLM tracing, evaluation, prompt optimization, and dashboards
- Phoenix (⭐10124, score:30) — Arize Phoenix open-source observability and evaluation platform for LLM, RAG, and agent systems

### rag
- LangChain (⭐139206, score:70) — A framework for composing LLM applications, retrieval flows, tools, and agents
- DSPy (⭐35010, score:70) — A framework for programming and optimizing language model pipelines
- LangChain for RAG (⭐139207, score:30) — LangChain components for retrieval chains, retrievers, loaders, and RAG application composition
- Firecrawl (⭐132342, score:30) — Open-source and hosted web scraping API that turns websites into LLM-ready markdown/data
- RAGFlow (⭐82655, score:30) — Open-source RAG engine combining document understanding, retrieval, and agent capabilities

## Top Tools by Job

### data-labeling
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- Label Studio — An open-source data labeling platform for ML and AI datasets
- Prodigy — Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
- Scale AI — Managed data labeling and data engine platform for enterprise AI datasets

### deployment
- AWS Bedrock — AWS managed service for accessing foundation models and building generative AI apps
- Azure AI Studio — Microsoft Azure platform for building, evaluating, and deploying AI applications
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Fly.io — Application hosting platform with global machines and GPU options for AI services
- Google Vertex AI — Google Cloud platform for model APIs, training, evaluation, and AI application deployment

### evaluation
- Argilla — Open-source platform for human and AI feedback, data curation, and evaluation datasets
- Giskard — Testing platform for evaluating and scanning ML and LLM applications
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- OpenAI Evals — An open-source framework for evaluating language model behavior

### fine-tuning
- Axolotl — Configuration-driven fine-tuning framework for many open-weight LLM families
- LLaMA-Factory — Unified fine-tuning framework and UI for many LLMs and training methods
- MLX-LM — Apple MLX library for running and fine-tuning LLMs on Apple Silicon
- PEFT — Hugging Face library for parameter-efficient fine-tuning methods
- torchtune — PyTorch-native library for fine-tuning and experimenting with LLMs

### memory-management
- Letta — Stateful agent framework and memory system formerly known as MemGPT
- Mem0 — Memory layer for AI agents and assistants with long-term user and session memory
- Redis — In-memory data store commonly used for caching, session memory, queues, and vector search
- Zep — Memory and context engineering platform for AI agents and assistants

### model-registry
- DVC — Open-source data and model versioning tool for ML projects and pipelines
- Hugging Face Hub — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- MLflow — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- Weights & Biases — Experiment tracking and model management platform for ML and AI teams

### monitoring
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- Portkey — An AI gateway for routing, observability, guardrails, and prompt management

### orchestration
- Apache Airflow — Mature workflow scheduler for batch data, ML, and AI pipeline orchestration
- Dagster — Data orchestration platform for assets, pipelines, schedules, and observability
- Prefect — Python workflow orchestration framework useful for AI data, eval, and batch jobs
- Pydantic AI — Pydantic agent framework focused on typed outputs, tools, and production Python apps

### production-serving
- BentoML — A framework for packaging, deploying, and scaling AI model services
- FastAPI — Python web framework for building APIs around AI services and model workflows
- Fireworks AI — A managed platform for fast inference and fine-tuning of open models
- Fly.io — Application hosting platform with global machines and GPU options for AI services
- Hugging Face Inference Endpoints — Managed Hugging Face service for deploying models as production inference endpoints

### prompt-management
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- Langfuse Prompts — Prompt management and versioning workflows inside the Langfuse observability platform
- LangSmith Hub — LangSmith prompt and dataset workflows for LangChain and LangGraph applications
- LiteLLM — A proxy and SDK for routing requests across many LLM providers
- Portkey — An AI gateway for routing, observability, guardrails, and prompt management

### prototyping
- Chainlit — A framework for building conversational AI interfaces and debugging LLM apps
- FastAPI — Python web framework for building APIs around AI services and model workflows
- Gradio — A Python library for building and sharing machine learning demos quickly
- Mesop — Google Python UI framework for building web apps and AI prototypes
- Streamlit — A Python framework for building data and AI apps with minimal frontend code

### security-and-guardrails
- Giskard — Testing platform for evaluating and scanning ML and LLM applications
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs
- Llama Guard — Meta safety model family for classifying and moderating LLM inputs and outputs
- NeMo Guardrails — NVIDIA framework for adding programmable guardrails to LLM applications
- Rebuff — Prompt injection detection and guardrail toolkit for LLM applications

### structured-output
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs
- Guidance — Microsoft guidance library for controlling and constraining language model generation
- Instructor — A library for extracting typed structured outputs from language models
- Outlines — A library for constrained generation and structured outputs with LLMs
- Pydantic AI — Pydantic agent framework focused on typed outputs, tools, and production Python apps

### tracing
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- TruLens — An evaluation and tracking toolkit for LLM and RAG applications
- Weights & Biases Weave — An observability and evaluation toolkit for AI applications from Weights & Biases

### vector-search
- Pinecone — A managed vector database for production semantic search applications

### web-scraping
- Crawl4AI — Python crawler and scraper designed for LLM-friendly web content extraction
- Firecrawl — API and open-source project for scraping and crawling websites into LLM-ready Markdown
- Jina AI Reader — Reader endpoint for converting web pages into LLM-friendly text and Markdown
- Playwright — Browser automation framework for reliable end-to-end tests and web scraping workflows
- Puppeteer — Node.js browser automation library for Chrome and Chromium workflows

## Architecture Quick Refs

- Enterprise-Scale AI Stack — Reference architecture for governed enterprise AI systems with security and platform integration
- Lean MVP Stack — Opinionated stack for solo developers and fast AI product prototypes
- Local-First AI Stack — Reference stack for privacy-first local AI applications without cloud model APIs
- Multi-Agent System Stack — Reference stack for complex task automation with multiple AI roles and durable state
- Production RAG Stack — Reference architecture for production retrieval-augmented generation applications
- AI Research Platform Stack — Reference platform for repeatable model, agent, and retrieval experiments

## Decision Heuristics

- Need local/private LLMs? → inspect Ollama, llama.cpp, local-first stack, and choose-llm.
- Need fast inference at scale? → inspect vLLM, TGI, production-serving, and choose-deployment-target.
- Simple RAG? → inspect LlamaIndex, LangChain, Chroma, pgvector, and rag-vs-fine-tuning.
- Complex multi-step agents? → inspect LangGraph and choose-agent-framework.
- Tracing/observability? → inspect Langfuse, Phoenix, LangSmith, and observability overview.
- Evaluation before launch? → inspect DeepEval, RAGAS, promptfoo, evaluation pipelines, and choose-eval-framework.

## Must-Read Papers

- Attention Is All You Need — Introduced the Transformer architecture that became the foundation for modern LLMs
- BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding — Introduced bidirectional masked-language-model pretraining for language understanding
- Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks — Introduced retrieval-augmented generation as a way to combine parametric models with external knowledge
- Language Models are Few-Shot Learners — Showed that scaling language models enables broad few-shot and in-context learning behavior
- LoRA: Low-Rank Adaptation of Large Language Models — Introduced low-rank adapters for parameter-efficient fine-tuning of large models
- Chain-of-Thought Prompting Elicits Reasoning in Large Language Models — Showed that prompting models to produce intermediate reasoning improves multi-step reasoning tasks
- Training Language Models to Follow Instructions with Human Feedback — Introduced the InstructGPT RLHF recipe for making language models follow user instructions better
- ReAct: Synergizing Reasoning and Acting in Language Models — Combined reasoning traces with actions so language models can think and use tools interleaved
- GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers — Introduced accurate post-training quantization methods for large generative transformers
- Fast Inference from Transformers via Speculative Decoding — Introduced speculative decoding to accelerate generation using a faster draft model verified by a larger model

## High-Impact Tips

- Add A Max Step Budget To Every Agent — 
- Add A Minimal Reproduction Prompt — 
- Add Evals Before Prompt Refactors — 
- Add Human Review for High-Impact Actions — 
- Add Hybrid Search for Exact Terms — 
- Add Provider Timeout And Retry Policies — 
- Add Reranking After Recall Is Acceptable — 
- Allowlist Tools Per Agent Role — 
- Benchmark with Production-Shaped Inputs — 
- Benchmark With Real Context Lengths — 
