---
id: asai-2023-self-rag
title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
phase: retrieval-and-memory
venue: iclr
year: 2023
authors:
  - "Asai, A."
  - "Wu, Z."
  - "Wang, Y."
  - "Sil, A."
  - "Hajishirzi, H."
arxiv_id: "2310.11511"
arxiv_url: "https://arxiv.org/abs/2310.11511"
pdf_url: "https://arxiv.org/pdf/2310.11511"
code_url: "https://github.com/AkariAsai/self-rag"
venue_url: "https://openreview.net/forum?id=hSyW5go0v8"

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 2000

tldr: "Trains an LM to emit reflection tokens deciding when to retrieve and whether retrieved passages support its output — making retrieval adaptive and self-critiqued instead of always-on, and improving factuality over standard RAG"
key_contribution: "Introduced trainable reflection tokens ([Retrieve], ISREL, ISSUP, ISUSE) that let one model control retrieval timing, grade passage relevance, and verify its own grounding during generation — with inference-time control over the factuality/fluency trade-off via token-probability thresholds"

builds_on:
  - "lewis-2020-rag"
  - "ouyang-2022-instructgpt"

tags:
  - "rag"
  - "retrieval"
  - "reasoning"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Standard RAG retrieves unconditionally — even when the model knows the answer, and even when what it retrieves is junk. Self-RAG trains the model itself to make those calls: special reflection tokens decide whether retrieval is needed, whether each retrieved passage is relevant, whether the generated segment is actually supported by it, and how useful the result is. A 7B/13B Llama-2 trained this way beat ChatGPT-augmented RAG baselines on factuality-sensitive tasks, making "adaptive retrieval + self-grading" a named, trainable pattern.

## Why it's in the Arsenal

- It is the reference formulation of two ideas production RAG systems now implement heuristically: retrieve-only-when-needed (adaptive retrieval) and grade-your-own-grounding — worth knowing in its principled, trained form
- The reflection-token mechanism shows how to expose a quality/latency dial at inference time (threshold on token probabilities) rather than baking one behavior in — a pattern transferable to any controllable-generation problem

## Core Contribution

An end-to-end recipe: (1) use GPT-4 to distill a critic that labels training data with reflection tokens; (2) train a generator LM on text interleaved with those tokens so it learns to emit them natively; (3) at inference, segment-level beam search over candidate continuations scored by weighted reflection-token probabilities — retrieval frequency and grounding strictness become tunable weights, not architecture.

## Key Results

- Self-RAG 7B/13B outperformed Llama2-chat and Alpaca RAG baselines and surpassed ChatGPT-with-retrieval on open-domain QA, fact verification (PubHealth), and long-form citation-precision benchmarks (2023)
- Large citation-precision gains on ASQA long-form QA — the self-support check (ISSUP) does real work, not only the adaptive-retrieval gate (2023)
- Inference-time weight ablations show the factuality/fluency trade-off moves smoothly with reflection thresholds — one checkpoint, many operating points (2023)

## Methodology

Critic distilled from GPT-4 labels ~150K instruction-following examples with four reflection-token families; Llama-2 7B/13B generators trained on the augmented corpus with retrieval from a Contriever-based index; evaluated on six tasks spanning short-form QA, fact verification, and long-form generation with citation metrics.

## Practical Applicability

Few teams train Self-RAG checkpoints, but its decomposition is the blueprint for the now-standard heuristic stack: a router/classifier deciding whether to retrieve, a relevance grader on retrieved chunks, and a groundedness check on the answer — implemented with prompted LLM judges instead of trained tokens (LangGraph's CRAG/Self-RAG templates, guardrail "groundedness" scorers). If you operate factuality-critical RAG, the paper is the argument for making those three checks explicit, plus a trained path when judge-call latency/cost becomes prohibitive.

## Limitations & Critiques

Training data quality is bounded by the GPT-4 critic — reflection labels inherit its biases; the segment-level beam search adds real inference complexity and latency; evaluation leaned on benchmarks where retrieval is obviously useful, and later work found adaptive-retrieval gains shrink with stronger base models that already refuse or hedge appropriately. The trained-token approach also couples the policy to one checkpoint, whereas prompted-judge implementations stay model-agnostic.

## Reproductions & Follow-up Work

Code, checkpoints, and data released; independently reproduced and heavily re-implemented in heuristic form (LangGraph Self-RAG/CRAG templates, LlamaIndex adaptive-retrieval packs). Follow-ups include CRAG (corrective retrieval), adaptive-RAG routing by query complexity, and the broader agentic-RAG line where retrieval decisions become agent actions.

## Relation to the Arsenal

Extends `lewis-2020-rag` (retrieval-and-memory/) with learned control; its groundedness check is the trained counterpart of the faithfulness metrics in the `ragas` tool entry (tools/evaluation-and-observability/) and the retrieval-quality monitoring guidance in observability/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2310.11511)
- [arXiv](https://arxiv.org/abs/2310.11511)
- [Code & checkpoints](https://github.com/AkariAsai/self-rag)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
