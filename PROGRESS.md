# Population Progress

Population follows the depth-first sprint plan: complete one category, validate it, then move to the next. Quality and verifiability are more important than breadth.

## Current Status

| Section | Status | Entries | Quality | Last Updated | Notes |
|---|---|---:|---|---|---|
| Agent Frameworks | ✅ Complete | 13/13 | ⭐⭐⭐⭐⭐ | 2026-06-13 | Sprint 1 complete, including Microsoft Agent Framework and deprecated AutoGen successor note |
| LLMs & Inference | ✅ Complete | 16/16 | ⭐⭐⭐⭐☆ | 2026-06-13 | Sprint 2 complete: open models and inference engines populated |
| RAG Ecosystem | ✅ Complete | 18/18 | ⭐⭐⭐⭐☆ | 2026-06-13 | Sprint 3 complete: frameworks, vector DBs, and document processing |
| Observability | ✅ Complete | 14/14 | ⭐⭐⭐⭐☆ | 2026-06-13 | Sprint 4 complete: 10 observability tools/projects plus 4 guides |
| Tools by Job | ✅ Complete | 63/63 | ⭐⭐⭐⭐☆ | 2026-06-13 | Sprint 5 complete: all 14 job guides plus canonical tool entries |
| Decision Trees | ✅ Complete | 7/7 | ⭐⭐⭐⭐⭐ | 2026-06-13 | Sprint 6 complete: Mermaid flowcharts, text trees, and quick-reference tables |
| Reference Stacks | ✅ Complete | 6/6 | ⭐⭐⭐⭐⭐ | 2026-06-13 | Sprint 7 complete: stack tables, Mermaid diagrams, costs, and component links |
| Research/Papers | ✅ Complete | 25/25 | ⭐⭐⭐⭐☆ | 2026-06-14 | Sprint 8 complete: guide files, benchmark references, emerging techniques, and canonical papers |
| Tips & Tricks | ✅ Complete | 106/100 | ⭐⭐⭐⭐☆ | 2026-06-14 | Sprint 9 complete: all required categories populated as schema-valid individual tip entries |
| Build Examples | ✅ Complete | 8/8 | ⭐⭐⭐⭐☆ | 2026-06-14 | Sprint 10 complete: starter, intermediate, and advanced blueprints |
| Skills | ✅ Complete | 8/8 | ⭐⭐⭐⭐☆ | 2026-06-14 | Sprint 11 complete: learning paths, prompt engineering, and core concepts |
| Community | ✅ Complete | 31/30 | ⭐⭐⭐⭐☆ | 2026-06-14 | Sprint 12 complete: people, channels, newsletters, podcasts, and community spaces |
| Trending | ⏳ Queued | 0/3 | — | — | Sprint 13 |

## Sprint 12 — Community

Completed community files:

1. People to Follow (`people-to-follow.md`)
2. YouTube Channels (`youtube-channels.md`)
3. Newsletters (`newsletters.md`)
4. Podcasts (`podcasts.md`)
5. Discord and Community Spaces (`discord-communities.md`)
6. 25 individual person entries under `content/community/people/`

People categories represented:

- LLM researchers
- AI engineers and practitioners
- Open-source maintainers
- AI product builders
- Safety/alignment and evaluation researchers
- Educators and course creators

Notes:

- People are stored as individual schema-valid `person` entries so future UI/agent consumers can filter by tags and channels.
- Follower counts are intentionally not tracked because they change quickly and are easy to game.
- Community guide pages route to canonical person/source entries where possible.

## Sprint 11 — Skills & Learning Paths

Completed skills files:

1. AI Engineer Learning Path (`learning-paths/ai-engineer.md`)
2. ML Engineer to AI Engineer Bridge (`learning-paths/ml-engineer.md`)
3. LLM Researcher Learning Path (`learning-paths/llm-researcher.md`)
4. Agent Builder Learning Path (`learning-paths/agent-builder.md`)
5. Prompt Engineering Fundamentals (`prompt-engineering/fundamentals.md`)
6. Prompt Patterns Catalog (`prompt-engineering/prompt-patterns-catalog.md`)
7. Transformers (`core-concepts/transformers.md`)
8. Embeddings (`core-concepts/embeddings.md`)

Notes:

- Learning paths prioritize free and primary-source resources where possible.
- Each guide maps concepts to Arsenal build examples, decision trees, tools, papers, or reference stacks.
- Prompt and core-concept guides are written for practical AI engineering use, not academic completeness.

## Sprint 10 — Build Examples

Completed build example blueprints:

1. Basic RAG Chatbot (`basic-rag-chatbot.md`)
2. Local LLM Chat (`local-llm-chat.md`)
3. Simple ReAct Agent (`simple-react-agent.md`)
4. Production RAG API (`production-rag-api.md`)
5. Multi-Tool Agent (`multi-tool-agent.md`)
6. Document Q&A Pipeline (`document-qa-pipeline.md`)
7. Multi-Agent Research System (`multi-agent-research-system.md`)
8. Self-Correcting RAG (`self-correcting-rag.md`)

Notes:

- Build examples are architecture blueprints, not long tutorials.
- Every build example includes TL;DR, Mermaid architecture diagram, stack table, prerequisites, implementation steps, gotchas, reference implementations, and related entries.
- Existing older duplicate/stub build examples were removed where they conflicted with the sprint-specific canonical blueprint.

## Sprint 9 — Tips & Tricks

Completed tip categories:

| Category | Entries |
|---|---:|
| RAG tuning | 15 |
| Prompting | 15 |
| Agent reliability | 12 |
| Inference optimization | 10 |
| Cost reduction | 10 |
| Debugging LLM apps | 10 |
| Context-window management | 8 |
| Production gotchas | 8 |
| Local model tips | 6 |
| Latency optimization | 6 |
| Security best practices | 6 |

Notes:

- The sprint brief described category files containing many H3 tips, but this repository's data architecture validates one content entry per Markdown file. Sprint 9 was therefore implemented as individual schema-valid tip entries while preserving category metadata.
- Every tip includes TL;DR, impact, implementation time, a short code/config snippet, limitations, and integration patterns.
- Total tip entries now exceed the requested target: 106/100.

## Sprint 8 — Research: Papers & SOTA

Completed research guide files:

1. Must-Read AI Papers (`must-read-papers.md`)
2. SOTA Benchmarks (`sota-benchmarks.md`)
3. Emerging AI Techniques (`emerging-techniques.md`)
4. Weekly ArXiv Picks (`weekly-arxiv-picks.md`)

Completed / normalized canonical paper entries include:

- Foundational: Attention, BERT, GPT-3, LLaMA 3
- Alignment: InstructGPT, Constitutional AI, DPO
- RAG: original RAG, HyDE, RAPTOR, GraphRAG, RAGAS
- Agents/tool use: ReAct, Toolformer, Chain-of-Thought, Tree of Thoughts, SWE-agent
- Efficiency: LoRA, QLoRA, GPTQ, Speculative Decoding
- Current SOTA/watch: DeepSeek-R1, Qwen2.5-Math
- Evaluation: LLM-as-a-Judge / MT-Bench

Notes:

- Paper entries now follow the Sprint 8 paper body structure.
- Public benchmark pages are linked instead of copying fast-changing SOTA scores.
- Benchmark numbers are only described as paper-reported context, not current leaderboard claims.

## Sprint 7 — Reference Stacks

Completed reference stack files:

1. Lean MVP Stack (`lean-mvp.md`)
2. Production RAG Stack (`production-rag.md`)
3. Multi-Agent System Stack (`multi-agent-system.md`)
4. Local-First AI Stack (`local-first.md`)
5. Enterprise-Scale AI Stack (`enterprise-scale.md`)
6. AI Research Platform Stack (`research-platform.md`)

Notes:

- Each stack includes TL;DR, stack-at-a-glance table, Mermaid architecture diagram, use/not-use guidance, getting-started commands, cost estimates, and component deep links.
- Cost estimates are intentionally directional and include a pricing caveat.
- Stack component links point to canonical project/tool entries populated in earlier sprints.

## Sprint 6 — Architecture Decision Trees

Completed decision tree files:

1. Which LLM Should I Use? (`choose-llm.md`)
2. Choose a Vector Database (`choose-vector-db.md`)
3. Choose an Agent Framework (`choose-agent-framework.md`)
4. RAG vs Fine-Tuning (`rag-vs-fine-tuning.md`)
5. Choose a Memory Solution (`choose-memory-solution.md`)
6. Choose an Observability Tool (`choose-observability-tool.md`)
7. Choose a Deployment Target (`choose-deployment-target.md`)

Notes:

- Every decision tree includes a Mermaid flowchart.
- Every decision tree includes a plain-language text version for LLM/agent consumption.
- Every decision tree includes a quick-reference table with leaf-node links to canonical Arsenal entries.
- The AutoGen → Microsoft Agent Framework transition is explicitly noted in the agent-framework tree.

## Sprint 5 — Tools by Job

Completed job guide files:

1. Vector Search
2. Fine-Tuning
3. Evaluation
4. Prototyping
5. Production Serving
6. Web Scraping
7. Structured Output
8. Memory Management
9. Prompt Management
10. Deployment
11. Orchestration
12. Data Labeling
13. Model Registry
14. Security and Guardrails

Completed or updated canonical tool entries include fine-tuning tools, evaluation tools, prototyping frameworks, deployment platforms, web scraping tools, structured-output libraries, memory tools, prompt-management systems, workflow orchestrators, labeling tools, model registries, and guardrail tools.

Notes:

- Job guide files are guide entries linking to canonical project/tool entries to avoid duplicating long-form metadata.
- Cross-category tools such as Qdrant, Weaviate, Chroma, Milvus, pgvector, LanceDB, RAGAS, Phoenix, and Agenta link back to their canonical entries.
- This repo keeps one content entry per Markdown file for schema/data generation, so multi-tool job pages are implemented as guide pages with H3 tool cards.

## Sprint 4 — Observability

Completed observability project/tool entries:

1. Langfuse
2. LangSmith
3. Phoenix
4. Helicone
5. Opik
6. OpenLIT
7. OpenLLMetry
8. Lunary
9. Braintrust
10. Agenta

Completed observability guide files:

1. Overview
2. Tracing and Monitoring
3. Cost Tracking
4. Evaluation Pipelines

Notes:

- Project entries include the mandatory `approach` field: `sdk`, `proxy`, `otel-native`, or `platform`.
- Each observability project entry includes an `Integration Snippet` section.
- LangSmith is represented as `langsmith-platform` to avoid duplicate ID conflict with the existing tool entry `langsmith`.

## Sprint 3 — RAG Ecosystem

Completed RAG framework entries:

1. LlamaIndex
2. LangChain for RAG
3. Haystack
4. RAGFlow
5. Ragas for RAG Evaluation
6. txtai

Completed vector database entries:

1. Qdrant
2. Weaviate
3. Chroma
4. Milvus
5. Pinecone
6. pgvector
7. LanceDB

Completed document processing entries:

1. Unstructured
2. Docling
3. Firecrawl
4. Crawl4AI
5. LlamaParse

Notes:

- Vector database entries include the mandatory comparison table.
- Ragas is represented as `ragas-rag-evaluation` to avoid duplicate ID conflict with the existing observability/evaluation Ragas entry.
- Pinecone and LlamaParse are service entries, so GitHub star counts are intentionally zero.

## Sprint 2 — LLMs & Inference Engines

Completed open-source model entries:

1. Llama 3.x
2. Mistral / Mixtral
3. Qwen 2.5 / QwQ
4. Phi-4
5. Gemma 3
6. DeepSeek-V3 / R1
7. Command R+
8. Yi
9. Falcon 3

Completed inference engine entries:

1. Ollama
2. vLLM
3. llama.cpp
4. Text Generation Inference
5. LMDeploy
6. SGLang
7. Llamafile

Notes:

- Model entries include `hf_url`, `model_sizes`, and no fabricated benchmark numbers.
- Inference engine entries include `supports_quantization`, `supported_formats`, and `api_compatible` where applicable.
- Text Generation Inference is marked archived based on fetched GitHub metadata.

## Sprint 1 — Agent Frameworks

Completed entries:

1. LangGraph
2. CrewAI
3. Microsoft Agent Framework
4. AutoGen — marked deprecated/legacy with successor note
5. OpenAI Agents SDK
6. Google ADK
7. Smolagents
8. Dify
9. Mastra
10. Haystack
11. OpenHands
12. MetaGPT
13. AutoGPT

Related pre-existing entries still present in the folder:

- Pydantic AI
- Semantic Kernel

## Validation Protocol

After each sprint, run:

```bash
pnpm run fix
pnpm run validate
pnpm run validate:taxonomy
pnpm run validate:structure
pnpm run validate:paths
pnpm run validate:refs
pnpm run check:duplicates
pnpm run generate:all
pnpm run check:links
```

## Golden Rule

Every entry must pass the 3-second test:

1. What it is
2. Whether it is relevant
3. Where to go next

