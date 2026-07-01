---
id: es-2023-ragas
title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
phase: evaluation-and-safety
venue: other
year: 2023
authors:
  - "Es, S."
  - "James, J."
  - "Espinosa-Anke, L."
  - "Schockaert, S."
arxiv_id: "2309.15217"
arxiv_url: "https://arxiv.org/abs/2309.15217"
pdf_url: "https://arxiv.org/pdf/2309.15217"
code_url: "https://github.com/vibrantlabsai/ragas"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 600

tldr: "Defined reference-free metrics (faithfulness, answer relevance, context relevance) for evaluating RAG pipelines with no human-labeled ground truth -- use RAGAS-style metrics as your default RAG evaluation approach rather than building bespoke evaluation"
key_contribution: "Defined a set of reference-free evaluation metrics -- faithfulness, answer relevance, and context relevance -- that assess RAG pipeline quality using only the retrieved context, the generated answer, and the query itself, without requiring human-labeled ground-truth answers"

builds_on:
  - lewis-2020-rag
implemented_in:
  - ragas-rag-evaluation

tags:
  - evaluation
  - rag
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper defined a set of reference-free metrics — faithfulness, answer relevance, and context relevance — for evaluating RAG pipeline quality using only the retrieved context, the generated answer, and the original query, with no need for human-labeled ground-truth answers. This remains current, widely adopted practice: the RAGAS library implementing these metrics is open-source, actively maintained, and integrates directly with LangChain and LlamaIndex, and is the basis for this catalog's own `ragas-rag-evaluation` project entry.

## Why it's in the Arsenal

- Evaluating a RAG pipeline's quality is a distinct problem from evaluating a general chat model's quality (see `zheng-2023-llm-as-a-judge`) — RAG-specific failure modes like hallucination relative to retrieved context, or retrieving irrelevant context in the first place, need RAG-specific metrics, and this paper is the reference definition most current RAG evaluation tooling builds on.
- `practical_applicability: high` is direct and non-inflated: reference-free RAG evaluation is a practical necessity, since collecting human-labeled ground-truth answers for every RAG use case and query type is rarely feasible, and this paper's metrics are already implemented in production-usable tooling rather than requiring bespoke implementation.

## Core Contribution

Prior RAG evaluation approaches typically required either human-labeled ground-truth answers (expensive and slow to collect, especially across many domains and query types) or relied on general-purpose chat evaluation metrics that don't specifically capture RAG's distinctive failure modes (retrieving irrelevant context, or generating an answer not actually supported by the retrieved context, i.e. hallucinating relative to your own retrieved sources). This paper's contribution is defining three specific, reference-free metrics that can be computed using only the RAG pipeline's own inputs and outputs: faithfulness (does the generated answer's content actually follow from the retrieved context, without unsupported claims), answer relevance (does the generated answer actually address the query, independent of factual correctness), and context relevance (is the retrieved context actually relevant to the query, independent of what the generator does with it). In engineering terms: this lets you diagnose which stage of a RAG pipeline is failing — retrieval quality, or generation faithfulness to what was retrieved — without needing a labeled dataset for every domain you deploy in.

## Key Results

- The paper defines and validates its three core metrics (faithfulness, answer relevance, context relevance) as computable without reference/ground-truth answers, using LLM-based scoring techniques applied to the query, retrieved context, and generated answer (2023) — the paper's central methodological contribution, not a benchmark leaderboard result
- The RAGAS metrics have since been broadly adopted as a standard RAG evaluation approach, integrated directly into LangChain and LlamaIndex per the library's own documentation — a significant practical adoption signal beyond the original paper's own validation experiments
- The technique's underlying approach — using an LLM to score faithfulness/relevance without ground truth — inherits some of the same general LLM-as-judge considerations documented in `zheng-2023-llm-as-a-judge` (the scoring LLM's own biases and limitations apply here too), though this paper's metrics are more narrowly targeted at specific RAG failure modes than general open-ended judgment

## Methodology

Faithfulness is computed by extracting the individual claims made in the generated answer and checking, using an LLM, whether each claim can be inferred from the retrieved context — an answer scores low on faithfulness if it makes claims not supported by (or contradicted by) what was actually retrieved, directly measuring hallucination relative to the RAG pipeline's own sources (paper Section 3). Answer relevance is computed by generating several plausible questions that the given answer would address, then measuring the semantic similarity between those generated questions and the original query — an answer that is off-topic or evasive relative to the actual question produces generated questions dissimilar to the original, yielding a lower relevance score. Context relevance assesses whether the retrieved context passages actually contain information relevant to the query, independent of what the generation stage does with that context — allowing a RAG pipeline's retrieval quality to be diagnosed separately from its generation quality, which is important since a RAG system's problems could originate at either stage and require different fixes depending on which is at fault.

## Practical Applicability

If you are building or maintaining a RAG pipeline and need to evaluate its quality without collecting human-labeled ground-truth answers for every domain and query type you support, RAGAS's three metrics are a validated, practical default — implemented and ready to use via the open-source RAGAS library (this catalog's own `ragas-rag-evaluation` project entry) with direct LangChain and LlamaIndex integration, rather than something to build from scratch. Specifically, use faithfulness scoring to catch hallucination relative to your own retrieved context (a distinct and often more actionable signal than general factual-correctness checking), and use context relevance separately from answer relevance to diagnose whether a quality problem originates in your retrieval stage or your generation stage — this separation is the paper's most practically useful contribution for debugging a RAG pipeline's specific failure point.

## Limitations & Critiques

`has_code: true` here refers to the RAGAS library, not a separate, narrower "paper code release" — the paper's authors built and maintain the library as the practical implementation of these metrics, and it is what practitioners actually use, but it is worth being precise that the library has evolved beyond the original paper's specific 2023 metric definitions in various ways since publication, so treat the live library documentation, not just this paper's text, as authoritative for current metric behavior. Since these metrics rely on an LLM to perform the underlying scoring (extracting claims for faithfulness, generating questions for relevance), they inherit some of the same general concerns documented in `zheng-2023-llm-as-a-judge` about LLM-based evaluation — the scoring LLM's own biases and limitations can affect RAGAS metric reliability, a consideration the original paper's framing (focused on defining useful reference-free metrics) does not emphasize as heavily as it could. No credible, independent failed-replication challenge to the paper's core metric definitions has been identified as of `last_reviewed: 2026-07-01` — the metrics have instead been broadly adopted and extended rather than challenged.

## Reproductions & Follow-up Work

The RAGAS library (this catalog's own `ragas-rag-evaluation` project entry, itself consolidated from an earlier duplicate entry during the projects-vertical reorganisation) is the primary, actively maintained, open-source implementation of this paper's metrics and constitutes an extensive, ongoing, real-world validation of the approach far beyond the original paper's own experiments — the library's continued adoption and integration with mainstream RAG frameworks (LangChain, LlamaIndex) is itself strong evidence the metrics have proven practically useful, not merely academically interesting.

## Relation to the Arsenal

This paper builds on `lewis-2020-rag` (foundational/), providing an evaluation methodology specifically for the retrieve-then-generate pattern that paper established. It is directly implemented in this catalog's `ragas-rag-evaluation` project entry (`content/projects/benchmarks-and-evals/`), reflected in `implemented_in` above — this is a direct, verifiable "implemented in the catalog" relationship, not an approximate match. It should be read alongside `zheng-2023-llm-as-a-judge` (this phase folder) since RAGAS's LLM-based scoring approach inherits some of the general LLM-as-judge considerations that paper documents, even though RAGAS targets RAG-specific failure modes rather than general open-ended chat quality.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2309.15217)
- [arXiv](https://arxiv.org/abs/2309.15217)
- [Papers With Code](https://paperswithcode.com/paper/ragas-automated-evaluation-of-retrieval)
- [Key Reproduction / Analysis](https://docs.ragas.io/) — the actively maintained RAGAS library's own documentation, the practical, continuously updated implementation of this paper's metrics that most practitioners actually use
