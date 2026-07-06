---
id: "rag-vs-fine-tuning"
title: "RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation"
category: "system-design"
decision_type: "fork"
decision_summary: "Choose RAG to give a model access to knowledge it doesn't have; choose fine-tuning to change how a model behaves, formats output, or performs a narrow task — and combine both when you need both."
tags:
  - rag
  - fine-tuning
  - retrieval
  - evaluation

approaches:
  - name: "RAG (Retrieval-Augmented Generation)"
    description: "Retrieve relevant context from an external corpus at query time and inject it into the prompt. The model's weights never change; knowledge lives in the retrieval index, not the model."
    when_to_use:
      - "Knowledge changes daily, weekly, or more often than a retraining cycle can keep up with"
      - "Users need citations or the ability to verify claims against a source document"
      - "The underlying model already knows how to reason about the domain if given the right facts"
      - "Data must stay logically separable from the model (compliance, per-tenant isolation, right-to-be-forgotten)"
    when_not_to_use:
      - "The failure mode is stylistic or behavioral, not factual — RAG cannot fix a model that retrieves the right facts but writes them in the wrong tone or format"
      - "Retrieval latency budget is under ~200ms and a vector search plus rerank cannot fit"
      - "The corpus is small enough and stable enough that the facts could just be in the system prompt"
    tradeoffs:
      cost: "Retrieval infrastructure (vector DB, embedding calls) plus larger prompts increase per-query token cost; no training cost. As of 2026-07, embedding a corpus with a local model is near-free; hosted reranking adds ~$0.01-0.05 per 1K queries depending on provider."
      latency: "Adds one or more retrieval round-trips (typically 50-300ms for vector search, more with reranking) before generation starts."
      accuracy: "Bounded by retrieval quality, not just the model — a perfect model with bad retrieval still gives wrong answers. Citable and auditable, which fine-tuning is not."
      complexity: "Requires an ingestion pipeline, a vector store, and ongoing chunking/reranking tuning — see intermediate-document-qa-pipeline for what this actually involves in practice."
      flexibility: "Highest — update the corpus and the next query sees new facts, no retraining or redeployment."

  - name: "Fine-Tuning (LoRA/QLoRA)"
    description: "Update a (typically small, adapter-based) subset of model weights on a labeled dataset so the model's behavior changes for every future call, without needing that behavior spelled out in the prompt each time."
    when_to_use:
      - "Output format or tone must be consistent across thousands or millions of calls (e.g. a fixed JSON schema, a specific brand voice)"
      - "The model repeatedly fails a narrow, well-defined task despite good prompting and few-shot examples"
      - "Long, repeated instruction prompts are a meaningful fraction of token cost and could be baked into weights instead"
      - "You have 500+ high-quality, representative examples of the target behavior (see Key Factors below for a real threshold, not a guess)"
    when_not_to_use:
      - "The information changes faster than you can collect labeled examples and retrain — this is a knowledge-freshness problem, not a behavior problem"
      - "You have fewer than ~200 examples and no clear way to get more — try prompting plus few-shot examples first, which realistically recovers 70-80% of fine-tuning's benefit at zero training cost"
      - "You need per-user or per-tenant customization — a single fine-tune serves all callers identically, unlike RAG's per-query corpus flexibility"
    tradeoffs:
      cost: "As of 2026-07, LoRA/QLoRA fine-tuning a 7-8B model on ~5K examples costs roughly $1.50-$5 in raw GPU time on a rented A100/H100 (e.g. via RunPod, Together AI, or Fireworks), or $0 on a free Colab T4 taking a few hours longer. This is a 1-2 order of magnitude drop from the pre-LoRA full-fine-tuning era and is the single most outdated assumption engineers carry into this decision — see 'When This Guidance Might Be Outdated' below."
      latency: "Zero added latency at inference — the adapted behavior is baked into the weights (or a merged adapter), unlike RAG's retrieval round-trip."
      accuracy: "LoRA recovers roughly 90-95% of full-fine-tuning quality on most tasks; QLoRA (4-bit quantized base) recovers roughly 80-90%. Full fine-tuning is rarely justified below tens of thousands of examples."
      complexity: "Requires a labeled dataset, a training pipeline (Unsloth/Axolotl/PEFT), GPU access, and an evaluation harness to confirm the fine-tune didn't regress — plus a redeploy step every time the target behavior needs to change."
      flexibility: "Lowest of the two — every behavior change requires a new training run, evaluation pass, and redeployment. Not suitable for knowledge that changes between deployments."

key_factors:
  - "Update frequency of the underlying knowledge: real-time/daily favors RAG strongly; static or slow-changing (monthly+) is viable for either"
  - "Labeled example count: under ~200 examples, prompt engineering first; 500-2,000 supports narrow style/format fine-tuning; 5,000-10,000+ supports broader instruction/domain adaptation (2026-07 LoRA/QLoRA thresholds, not full-fine-tuning thresholds)"
  - "Citation/auditability requirement: any requirement to show sources or allow fact verification strongly favors RAG, since fine-tuned knowledge cannot be traced to a source document"
  - "Latency budget: sub-200ms budgets are hard to hit with retrieval in the loop; fine-tuning adds zero inference-time latency"
  - "Nature of the failure: factual gaps (model doesn't know X) point to RAG; behavioral/stylistic gaps (model knows X but says it wrong) point to fine-tuning"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["What is actually failing?"] --> Problem{"Missing/private/fresh facts, or wrong behavior/format?"}
      Problem -->|"Missing or changing facts"| RAGPath{"How often does the knowledge change?"}
      RAGPath -->|"Daily/weekly/real-time"| RAGStrong["Use RAG — fine-tuning cannot keep pace"]
      RAGPath -->|"Static or monthly+"| RAGEval{"Is retrieval quality good enough on a real eval set?"}
      RAGEval -->|"Yes"| RAGOk["Use RAG"]
      RAGEval -->|"No, and won't be soon"| Improve["Improve parsing/chunking/reranking before considering fine-tuning as a workaround"]
      Problem -->|"Wrong format, tone, or narrow task behavior"| DataCheck{"Do you have 200+ labeled examples of the correct behavior?"}
      DataCheck -->|"No"| PromptFirst["Try prompting + few-shot examples first (recovers ~70-80% of fine-tuning benefit at zero training cost)"]
      DataCheck -->|"Yes, 200-2000"| FTNarrow["Fine-tune (LoRA) for style/format/narrow-task adaptation"]
      DataCheck -->|"Yes, 5000+"| FTBroad["Fine-tune (LoRA/QLoRA) for broader instruction or domain adaptation"]
      Problem -->|"Both knowledge and behavior are wrong"| Hybrid["Use RAG + fine-tuning together — see Approach Deep-Dives"]

confidence: "evolving"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "RAG (Retrieval-Augmented Generation)"
    tool_ids: []
    project_ids:
      - llamaindex
      - langchain
    build_example_ids:
      - starter-basic-rag-chatbot
      - intermediate-production-rag-api
  - approach_name: "Fine-Tuning (LoRA/QLoRA)"
    tool_ids:
      - unsloth
      - axolotl
      - peft
    project_ids: []
    build_example_ids: []

related_decisions:
  - choose-vector-db
  - choose-llm

common_mistakes:
  - "Fine-tuning to fix a knowledge gap instead of a behavior gap: the model 'forgets' the fine-tuned facts the moment the underlying reality changes, and there is no way to update just the facts without retraining — this is the single most common misapplication of this decision."
  - "Adding RAG to fix inconsistent output formatting: retrieval does nothing to make a model's response structure more consistent; formatting consistency is a fine-tuning (or structured-output/schema-constrained decoding) problem, and RAG-only teams often spend weeks trying to prompt-engineer their way out of a formatting problem retrieval cannot solve."
  - "Assuming fine-tuning still requires 100K+ examples and weeks of compute: this was roughly true for full fine-tuning pre-2023, but LoRA/QLoRA on current tooling (Unsloth, Axolotl) makes a first fine-tune achievable in hours for a few dollars on 500-5,000 examples — teams that rule out fine-tuning based on outdated cost assumptions are leaving a viable, cheap option on the table."
  - "Building the hybrid (RAG + fine-tuning) as a first attempt instead of a second step: hybrid systems are harder to debug because a wrong answer could stem from either retrieval or the fine-tuned behavior — validate each approach independently against its own eval set before combining them."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This is one of the most common and consequential AI system design decisions, and it is frequently made incorrectly because the two options solve different problems that are easy to conflate: RAG injects knowledge into a model's context at query time; fine-tuning changes the model's underlying behavior. Getting this fork wrong is expensive in a specific way — fine-tuning to solve a knowledge-freshness problem produces a system that needs constant retraining, while adding RAG to solve a behavior/formatting problem produces a system that never actually fixes the underlying issue no matter how much context you retrieve.

## The Decision

Separate the question "what is failing?" into two categories before choosing an approach: **factual gaps** (the model doesn't know something, or what it knows is outdated or private) point to RAG; **behavioral gaps** (the model knows the right facts but expresses them in the wrong format, tone, or fails a narrow repeated task) point to fine-tuning. Most production systems that need both eventually run RAG and fine-tuning together — a fine-tuned model that has learned the target output format and tone, retrieving from a RAG pipeline for facts — but validate each half independently before combining them, since a hybrid system's failures are harder to attribute to a single cause.

## Decision Framework

The Mermaid flowchart in this entry's frontmatter (`decision_tree`) encodes the full branching logic; the plain-language walkthrough is:

1. Identify whether the actual failure is a **knowledge** problem or a **behavior** problem — this single question resolves the fork for the large majority of cases.
2. If it's a knowledge problem: check how frequently the underlying facts change. Anything that changes daily-to-weekly makes RAG close to mandatory, because no realistic fine-tuning cadence can keep pace. For static or slow-changing knowledge, first check whether your retrieval quality is actually good on a held-out eval set — if it's mediocre, the fix is better parsing/chunking/reranking, not switching to fine-tuning.
3. If it's a behavior problem: check your labeled example count *before* assuming fine-tuning is out of reach. Under ~200 examples, prompting plus few-shot examples first is both cheaper and often good enough. Between 200-2,000 examples, LoRA fine-tuning for narrow style/format adaptation is realistic. At 5,000+ examples, broader instruction or domain adaptation becomes viable.
4. If both knowledge and behavior are wrong, use both approaches together, but evaluate each independently first.

The core tradeoff matrix (condensed from the frontmatter `approaches[].tradeoffs`):

| Dimension | RAG | Fine-Tuning (LoRA/QLoRA) |
|---|---|---|
| Adds new/private/frequently-changing knowledge | Excellent | Poor fit — requires retraining per update |
| Changes tone/style/output format | Poor-to-medium (prompt engineering can partially compensate) | Excellent |
| Requires labeled examples | No (needs a corpus, not labels) | Yes, 200+ realistically |
| Adds inference-time latency | Yes (retrieval round-trip) | No |
| Supports citations/source verification | Yes | No |
| Per-tenant/per-query customization | Yes (swap the retrieval corpus) | No (one fine-tune serves everyone identically) |
| Typical 2026-era cost for a first attempt | Near-zero with a local embedding model; hosted reranking adds cents per 1K queries | $0-$5 in GPU time for a 7-8B LoRA/QLoRA run on 5K examples (free-tier Colab T4 to rented A100), per current provider pricing |

## Approach Deep-Dives

**RAG.** The knowledge lives outside the model, in a retrieval index. This makes RAG the correct default whenever facts change faster than a retraining cycle, when users need to verify an answer against a cited source, or when the same model needs to serve genuinely different, isolated knowledge per tenant. Its ceiling is retrieval quality, not model capability — a system with perfect retrieval and a mediocre model usually outperforms a system with excellent generation and poor retrieval, which is why [Measure Retrieval Recall Before Blaming Answer Quality](../../tips-and-tricks/rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md) exists as its own tip. See [Basic RAG Chatbot](../../build-examples/rag-systems/starter-basic-rag-chatbot.md) for what a minimal RAG implementation actually involves, and [Production RAG API](../../build-examples/rag-systems/intermediate-production-rag-api.md) for the production-shaped version.

**Fine-Tuning (LoRA/QLoRA).** LoRA freezes the base model and trains small, low-rank adapter matrices injected into specific layers (typically the attention projections), reducing trainable parameters by orders of magnitude versus full fine-tuning; QLoRA additionally quantizes the frozen base model to 4-bit precision, cutting GPU memory requirements roughly 4x at a modest (10-20 percentage point) quality cost versus full-precision LoRA. As of 2026-07, tooling built specifically around this workflow ([Unsloth](../../tools/model-layer/unsloth.md), [Axolotl](../../tools/model-layer/axolotl.md), Hugging Face [PEFT](../../tools/model-layer/peft.md)) makes a first fine-tuning run achievable by a single engineer in an afternoon, on a free-tier or rented single GPU, for single-digit dollar amounts — a fundamentally different cost/complexity profile than full-parameter fine-tuning, which still requires tens of thousands of examples and meaningfully more compute to justify.

## Common Mistakes

- **Fine-tuning to fix a knowledge gap instead of a behavior gap.** The fine-tuned facts become stale the moment reality changes, and there is no way to update just the knowledge without a full retrain — this is the single most common misapplication of this fork.
- **Adding RAG to fix inconsistent output formatting.** Retrieval does nothing to make responses more structurally consistent; that is a fine-tuning or structured-output problem, and teams that don't recognize this can spend weeks prompt-engineering around a problem retrieval cannot solve.
- **Assuming fine-tuning still requires 100K+ examples and weeks of compute.** This was a reasonable assumption in the full-fine-tuning era but is now a genuinely outdated one that causes teams to rule out a viable, cheap option — see "When This Guidance Might Be Outdated" below.
- **Building the RAG+fine-tuning hybrid as a first attempt.** Hybrid systems are harder to debug (a wrong answer could stem from either half), so validate each approach independently against its own eval set before combining them.

## When This Guidance Might Be Outdated

The `evolving` confidence rating on this entry reflects two specific, active shifts as of 2026-07: (1) fine-tuning cost and minimum-viable-dataset-size have both dropped sharply and repeatedly over the last two years as LoRA/QLoRA tooling matured — the numeric thresholds in this entry (200/2,000/5,000+ examples; $0-$5 per training run) should be re-verified every 6-12 months against current provider pricing and current versions of Unsloth/Axolotl, not assumed to hold indefinitely; (2) long-context models are shrinking the set of problems where RAG is strictly necessary versus "put the whole corpus in context," which shifts the RAG side of this decision for smaller corpora specifically — if your corpus fits comfortably in a frontier model's context window and cost is not the binding constraint, re-evaluate whether RAG's operational complexity is still justified versus a long-context approach before defaulting to RAG for a small, static corpus.

## Related Decisions

Model choice ([Which LLM Should I Use?](../model-selection/choose-llm.md)) interacts with this decision: some models fine-tune more predictably than others, and RAG performance depends heavily on the generation model's ability to follow retrieved context faithfully. Vector database choice ([Choose a Vector Database](../data-strategy/choose-vector-db.md)) is a downstream decision that only applies once RAG (or the hybrid) is chosen.

## Resources

- [LlamaIndex](../../projects/frameworks/llamaindex.md)
- [LangChain](../../projects/frameworks/langchain.md)
- [Ragas for RAG Evaluation](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)
- [Unsloth](../../tools/model-layer/unsloth.md)
- [Axolotl](../../tools/model-layer/axolotl.md)
- [PEFT](../../tools/model-layer/peft.md)
- [Basic RAG Chatbot](../../build-examples/rag-systems/starter-basic-rag-chatbot.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
