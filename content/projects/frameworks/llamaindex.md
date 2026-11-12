---
id: llamaindex
name: LlamaIndex
version_tracked: null
artifact_type: framework
category: rag
subcategory: frameworks
description: Retrieval-first Python framework — connectors, indices and query engines over 300+ integration packages, with Workflows for event-driven agents
github_url: "https://github.com/run-llama/llama_index"
license: MIT
primary_language: Python
org_or_maintainer: "LlamaIndex (run-llama)"
tags: [rag, retrieval, embeddings, llamaindex]
maturity: production
cost_model: open-source
github_stars: 52670
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-10-23"
docs_url: "https://developers.llamaindex.ai/python/framework/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top]
health_signals: [org-backed, community-driven]
ecosystem_role:
  - "The retrieval-shaped framework: where LangChain generalises over everything, LlamaIndex is organised around getting your documents in, indexing them and querying them, and its Workflows event model is the part that outlived the original RAG framing"
best_for:
  - Retrieval is the product, not a feature — you are ingesting a document estate, and the connector, node-parser, index and retriever abstractions line up with that job instead of being assembled around it
  - "You want a composable core with opt-in integrations rather than one large install: `llama-index-core` plus exactly the provider packages you call"
  - You need event-driven agent control flow rather than a chain — Workflows express steps, typed events and branching in plain Python, which is easier to debug than an opaque agent loop
avoid_if:
  - You expected the company to keep investing in the OSS framework — the README states plainly that the primary focus has shifted to LlamaParse, liteparse and open parsing benchmarks, with the framework kept available rather than driven
  - Your application is general agent orchestration where retrieval is incidental — `langgraph`, `pydantic-ai` or `openai-agents-sdk` are built around that shape
  - Your documents are already clean text — the framework's advantage is in parsing and chunking messy formats, and a plain vector store client plus an embedding call is less machinery
upstream_dependencies: []
downstream_consumers: []
alternatives: [langchain, haystack, dspy, txtai]
integrates_with: [huggingface-sentence-transformers, hugging-face-hub]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-26: 52,670 stars, 1,082 open issues, MIT, last push 2026-10-23. README now leads with the company's pivot — LlamaParse as the enterprise agentic-OCR platform, LiteParse as a free parser, ParseBench/ExtractBench as open benchmarks — and says the OSS framework is kept available with focus shifted away from it. Namespacing is core-plus-integrations, 300+ packages."
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.llamaindex.ai/blog/case-study-netchex-more-efficient-hr-operations-with-llamaindex-powered-askhr-netchex-ai","date":"2024-09-04","description":"LlamaIndex case study: Netchex built and deployed AskHR, a production LlamaIndex-powered HR assistant serving employees 24x7"}
featured: false
status: active
---

## Overview

LlamaIndex is the framework that took the retrieval problem seriously as an architecture rather than a step in a chain. Its vocabulary — readers and connectors for ingestion, node parsers for chunking, indices for structure, retrievers and query engines for the read path, postprocessors for reranking — describes the actual shape of a document pipeline, and it was designed before that shape was obvious.

The structure is a composable core plus a large surface of integration packages: `llama-index-core` holds the abstractions, and `llama-index-llms-openai`, `llama-index-embeddings-huggingface`, `llama-index-vector-stores-*` and roughly 300 others plug into it. The import namespacing reflects that split — `from llama_index.core.llms import LLM` for the interface, `from llama_index.llms.openai import OpenAI` for an implementation.

Two things changed by late 2026 and both matter more than any feature list. Workflows became the framework's agent model: event-driven steps with typed events, which is a more debuggable shape than a prompt-driven loop. And the company's focus moved. The README now says the current focus is LlamaParse — enterprise agentic OCR and document extraction — alongside LiteParse, ParseBench and ExtractBench, with the OSS framework kept "available as an open toolkit".

## Why it's in the Arsenal

Two reasons, and the second is a caution rather than a recommendation.

The technical one: retrieval over messy documents is a parsing problem before it is a vector problem. A PDF's tables, a spreadsheet's merged cells, a scanned invoice's layout — if the parser flattens those, no embedding model recovers them. LlamaIndex's abstractions put parsing and node structure in the middle of the pipeline where they belong, and the connector count means the awkward formats have a maintained path.

The strategic one: the entry has to record where the project is heading, because a team choosing a framework is also choosing who maintains it. The company is commercially focused on document parsing as a service; the framework remains MIT, active and widely used, but it is no longer where the team's roadmap pressure comes from. That is not abandonment — commits land, integrations are accepted — but a reader deserves to know that the direction of travel for the OSS layer is stability rather than expansion.

## Architecture

Ingestion and reading: a `SimpleDirectoryReader` or a format-specific reader loads documents, a node parser splits them into nodes with metadata attached (file, page, section), and optional extractors enrich each node before indexing.

Structure and retrieval: an index stores nodes — a `VectorStoreIndex` embeds and persists them, with keyword and hybrid variants and graph structures for relationship-heavy corpora. A retriever fetches candidates and a query engine composes retrieval with response synthesis; postprocessors handle reranking, filtering and deduplication between those two steps. That composability is the design's strength: reranking is a stage you insert, not a feature you enable.

Workflows are the agent layer. `@step`-decorated methods consume and emit typed events, and the framework routes events to steps, so a multi-step process is a graph of ordinary Python functions with explicit state. Compared with an agent loop that decides its next action from a prompt, this is far easier to test — a step is a function you can call directly.

Persistence is layered: an index can live in memory, on disk, or in an external vector store, and the document store tracks which nodes came from which source so deletion and re-indexing are possible rather than a full rebuild.

## Ecosystem Position

Against `langchain` the split is which problem is primary. LlamaIndex is retrieval-first with agents added; LangChain is composition-first with retrieval as one of many integrations. A team whose hardest problem is parsing and chunking will find LlamaIndex's defaults closer; a team building a tool-using agent over an existing API will find LangChain's scope more natural.

Against `haystack` the difference is maturity of pipeline discipline — Haystack expresses a typed pipeline graph with explicit components and has a production orientation that LlamaIndex's flexibility does not enforce. Against `dspy` the philosophies diverge completely: DSPy optimises prompts against a metric, LlamaIndex assembles parsing and retrieval stages.

Compare the commercial surface before the framework details, because it is where the relationship to the alternatives gets decided: LlamaParse is the same company's paid parsing service, `liteparse` is its free counterpart, and `ParseBench`/`ExtractBench` are its open benchmarks. Read the benchmark numbers in that light — they are published by the company whose parser is being measured, and their main value is methodological.

## Getting Started

```bash
pip install llama-index-core llama-index-llms-openai llama-index-embeddings-openai
```

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding

Settings.llm = OpenAI(model="gpt-6-astra")
Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-large")

docs = SimpleDirectoryReader("./contracts").load_data()
index = VectorStoreIndex.from_documents(docs)

engine = index.as_query_engine(similarity_top_k=8, response_mode="compact")
print(engine.query("Which contracts renew automatically in 2027?"))
```

A workflow, for a process with explicit steps:

```python
from llama_index.core.workflow import Workflow, step, StartEvent, StopEvent, Event

class Retrieved(Event):
    passages: list[str]

class AnswerFlow(Workflow):
    @step
    async def retrieve(self, ev: StartEvent) -> Retrieved:
        nodes = index.as_retriever(similarity_top_k=8).retrieve(ev.question)
        return Retrieved(passages=[n.get_content() for n in nodes])

    @step
    async def answer(self, ev: Retrieved) -> StopEvent:
        ctx = "\n\n".join(ev.passages)
        resp = Settings.llm.complete(f"Answer using only this context:\n{ctx}\n\nQ: ...")
        return StopEvent(result=str(resp))
```

Two practical notes: install `core` plus the specific integrations rather than the `llama-index` starter bundle, so the dependency tree stays auditable; and inspect what the parser produced before tuning retrieval — chunk boundaries with lost table structure are the most common cause of a RAG system that "retrieves the right document and answers wrongly".

## Key Use Cases

1. **Contract and policy search**: a legal or compliance corpus where page-level metadata has to survive chunking so a citation points at the right page.
2. **Structured extraction from documents**: schema-bound extraction with Pydantic models, run over a batch, with the same node metadata tracking which page each field came from.
3. **Hybrid search over mixed formats**: PDFs, spreadsheets and HTML in one index, with reranking as an inserted stage rather than a redesign.
4. **Event-driven document agents**: a Workflow that classifies a document, routes it to the right extraction step, and escalates uncertainty to a human — explicit steps that can be tested individually.
5. **Incremental re-indexing**: a document store that tracks sources means updating ten files does not mean rebuilding the corpus.
6. **Provider comparison on one corpus**: swap the embedding and vector-store packages, keep the pipeline, and measure recall on the same queries.
7. **Rapid prototyping of a retrieval strategy**: node parser, chunk size, retriever, reranker and synthesis mode are all swappable, which makes a sweep over strategies a day's work rather than a rewrite.

## Strengths

- The abstraction vocabulary matches the real pipeline — readers, node parsers, indices, retrievers, postprocessors — so the code reads like the architecture diagram.
- Core-plus-integrations packaging keeps the dependency tree under control: install what you call, not 300 packages.
- Workflows are the best part of the current framework: typed events, ordinary functions and explicit state produce agents you can unit-test.
- Retrieval composability is genuine — adding a reranker or a hybrid stage is insertion, not surgery.
- 52,000 stars and over a thousand open issues mean almost every integration has been used by someone, and the answers are searchable.
- MIT licensed with commits landing in October 2026; the framework is maintained even if it is no longer the company's priority.

## Limitations

- **The strategic drift is the headline risk.** The README says focus has moved to LlamaParse, LiteParse and the parsing benchmarks; a team that needs framework-level innovation on a two-year horizon should weigh that.
- **The commercial pull is real.** The most capable document parsing sits behind an API key, and the free alternative is a separate project — "use the framework, upgrade for parsing quality" is the shape of the funnel.
- **Parsing quality is measured by the vendor.** ParseBench and ExtractBench are open and useful, but they are published by the party selling the parser being benchmarked.
- **1,082 open issues.** Breadth of integrations is the value and the maintenance load; a niche connector can rot quietly.
- **Abstraction leakage when you step off the path.** Custom retrievers, unusual node structures or a vector store with weak filter support force you into the internals, and the internals move.
- **Two agent models in one repository.** Older query-pipeline agents and newer Workflows coexist, and tutorials mix them — pick Workflows for anything new and be consistent.
- **No evaluation built in.** Retrieval quality needs its own harness; see `ragas`-style tools rather than assuming the framework validates itself.

## Relation to the Arsenal

Compare with `langchain` (composition-first), `haystack` (typed production pipelines), `dspy` (prompt optimisation rather than assembly) and `txtai` (a lighter embedding-database route). For the assessment layer, pair it with `ragas` and the rest of [Benchmarks and Evals](../benchmarks-and-evals/_index.md).

Parsing-adjacent entries worth reading beside it: `marker`, `paddleocr` and `surya` in [Data and Retrieval](../data-and-retrieval/_index.md), plus `markitdown`. For vector stores to plug in, see `qdrant` and the rest of the retrieval cluster.

## Resources

- [GitHub](https://github.com/run-llama/llama_index)
- [Framework documentation](https://developers.llamaindex.ai/python/framework/)
- [Integrations](https://developers.llamaindex.ai/python/framework/community/integrations)
- [Workflows](https://developers.llamaindex.ai/python/llamaagents/overview/)
- [LlamaParse](https://cloud.llamaindex.ai)
- [LiteParse](https://github.com/run-llama/liteparse)
- [ParseBench](https://www.parsebench.ai/)
