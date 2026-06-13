# AI Arsenal — Dense Context Summary

Generated: 2026-06-13T20:30:56.664Z | Entries: 120 | Schema version: 1.0.0

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: 30
- Tools: 20
- Papers: 15
- Tips: 20
- People: 0
- Digests: 0
- Guides: 30
- Build examples: 5

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
- AutoGen (⭐58925, score:70) — A Microsoft framework for building conversational multi-agent applications
- CrewAI (⭐53461, score:70) — A role-based framework for orchestrating collaborative AI agent teams
- LangGraph (⭐34643, score:70) — A graph-based framework for building stateful LLM agents and workflows
- Semantic Kernel (⭐28114, score:70) — An SDK for integrating AI orchestration into production applications
- Mastra (⭐25022, score:70) — A TypeScript agent framework for workflows, tools, memory, and evals

### llms
- Ollama (⭐174056, score:70) — A local runtime for downloading and running open-weight language models
- llama.cpp (⭐116394, score:70) — A C++ inference engine for running quantized LLMs locally and on edge devices
- vLLM (⭐82770, score:70) — A high-throughput inference engine for serving large language models
- Qwen (⭐21281, score:70) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- Text Generation Inference (⭐10863, score:70) — A production inference server for text generation models from Hugging Face

### observability
- Langfuse (⭐29019, score:70) — An open-source observability platform for LLM traces, prompts, evals, and metrics
- DeepEval (⭐16140, score:70) — An open-source evaluation framework for testing LLM applications in CI
- Ragas (⭐14355, score:70) — An evaluation framework for measuring retrieval-augmented generation quality
- Phoenix (⭐10124, score:70) — An open-source AI observability and evaluation platform from Arize
- Helicone (⭐5809, score:70) — An open-source observability platform for LLM logging, cost tracking, and analytics

### rag
- LangChain (⭐139206, score:70) — A framework for composing LLM applications, retrieval flows, tools, and agents
- LlamaIndex (⭐50109, score:70) — A data framework for building retrieval-augmented generation applications
- Milvus (⭐44762, score:70) — A scalable open-source vector database for embedding search at large scale
- DSPy (⭐35010, score:70) — A framework for programming and optimizing language model pipelines
- Qdrant (⭐32149, score:70) — A vector database for similarity search with filtering and production operations

## Top Tools by Job

### data-labeling
- Label Studio — An open-source data labeling platform for ML and AI datasets

### deployment
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Modal — A serverless platform for deploying Python apps and GPU workloads
- Replicate — A hosted platform for running and deploying machine learning models via API

### evaluation
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- OpenAI Evals — An open-source framework for evaluating language model behavior
- promptfoo — An open-source CLI and platform for prompt and LLM regression testing
- TruLens — An evaluation and tracking toolkit for LLM and RAG applications

### monitoring
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- Portkey — An AI gateway for routing, observability, guardrails, and prompt management

### production-serving
- BentoML — A framework for packaging, deploying, and scaling AI model services
- Fireworks AI — A managed platform for fast inference and fine-tuning of open models
- LiteLLM — A proxy and SDK for routing requests across many LLM providers
- Modal — A serverless platform for deploying Python apps and GPU workloads
- Replicate — A hosted platform for running and deploying machine learning models via API

### prompt-management
- Humanloop — A platform for prompt management, evaluation, and product feedback workflows
- LiteLLM — A proxy and SDK for routing requests across many LLM providers
- Portkey — An AI gateway for routing, observability, guardrails, and prompt management

### prototyping
- Chainlit — A framework for building conversational AI interfaces and debugging LLM apps
- Gradio — A Python library for building and sharing machine learning demos quickly
- Streamlit — A Python framework for building data and AI apps with minimal frontend code

### security-and-guardrails
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs

### structured-output
- Guardrails AI — A framework for validating, correcting, and constraining LLM outputs
- Instructor — A library for extracting typed structured outputs from language models
- Outlines — A library for constrained generation and structured outputs with LLMs

### tracing
- LangSmith — A managed platform for tracing, evaluating, and monitoring LangChain applications
- TruLens — An evaluation and tracking toolkit for LLM and RAG applications
- Weights & Biases Weave — An observability and evaluation toolkit for AI applications from Weights & Biases

### vector-search
- Pinecone — A managed vector database for production semantic search applications

## Architecture Quick Refs

- Enterprise-Scale AI Stack — Reference architecture for governed enterprise AI systems
- Lean MVP Stack — Opinionated stack for a fast AI product prototype
- Local-First AI Stack — Reference stack for local and privacy-sensitive AI applications
- Multi-Agent System Stack — Reference stack for stateful multi-agent applications
- Production RAG Stack — Reference architecture for reliable retrieval-augmented generation
- AI Research Platform Stack — Reference platform for repeatable experiments and model research

## Decision Heuristics

- Need local/private LLMs? → inspect Ollama, llama.cpp, local-first stack, and choose-llm.
- Need fast inference at scale? → inspect vLLM, TGI, production-serving, and choose-deployment-target.
- Simple RAG? → inspect LlamaIndex, LangChain, Chroma, pgvector, and rag-vs-fine-tuning.
- Complex multi-step agents? → inspect LangGraph and choose-agent-framework.
- Tracing/observability? → inspect Langfuse, Phoenix, LangSmith, and observability overview.
- Evaluation before launch? → inspect DeepEval, RAGAS, promptfoo, evaluation pipelines, and choose-eval-framework.

## Must-Read Papers

- Attention Is All You Need — Introduces the Transformer architecture that became the basis of modern LLMs
- BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding — Introduces bidirectional pretraining for language understanding tasks
- Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks — Introduces retrieval-augmented generation for knowledge-intensive tasks
- Language Models are Few-Shot Learners — Shows scaling language models enables broad few-shot task performance
- LoRA: Low-Rank Adaptation of Large Language Models — Introduces parameter-efficient low-rank adaptation for large language models
- Chain-of-Thought Prompting Elicits Reasoning in Large Language Models — Shows that intermediate reasoning prompts improve performance on reasoning tasks
- ReAct: Synergizing Reasoning and Acting in Language Models — Combines reasoning traces with actions for tool-using language agents
- Constitutional AI: Harmlessness from AI Feedback — Introduces AI-feedback-based alignment for harmless assistants
- Toolformer: Language Models Can Teach Themselves to Use Tools — Shows language models can learn API/tool-use patterns from self-supervised data
- Self-Refine: Iterative Refinement with Self-Feedback — Explores iterative self-feedback for improving generated outputs

## High-Impact Tips

- Add Evals Before Prompt Refactors — 
- Add Human Review for High-Impact Actions — 
- Benchmark with Production-Shaped Inputs — 
- Cap Agent Tool Retries — 
- Log Retrieved Context for Every RAG Answer — 
- Tune Chunk Overlap Before Chunk Size — 
- Summarize Long-Running Agent State — 
- Test Prompts with Adversarial Inputs — 
- Track Cost per Feature — 
- Use JSON Schema for Critical Outputs — 
