---
id: "choose-chunking-strategy"
title: "Choosing a Chunking Strategy: Fixed, Structure-Aware, Parent-Child, or Semantic"
category: "data-strategy"
decision_type: "spectrum"
decision_summary: "Start with structure-aware splitting at a few hundred tokens, add parent-child expansion when answers need more context than precision allows, and treat semantic chunking as a measured upgrade after recall is benchmarked."
tags:
  - rag
  - chunking
  - retrieval
  - embeddings

approaches:
  - name: "Fixed-size with overlap"
    description: "Split text into fixed token-length windows (commonly 256-512 tokens) with optional overlap, ignoring document structure."
    when_to_use:
      - "Baseline for any new corpus — it is trivial to implement, deterministic, and establishes the retrieval-recall number every other strategy must beat"
      - "Unstructured or structure-poor text (transcripts, chat logs, OCR output) where there are no reliable boundaries to respect anyway"
    when_not_to_use:
      - "Documents with meaningful structure (headings, sections, tables) — arbitrary cuts split answer spans across chunks and bury tables mid-chunk"
      - "As a permanently-tuned artifact: iterating overlap percentages before measuring recall is effort spent on the wrong variable"
    tradeoffs:
      complexity: "Lowest — no parsing, no structure detection, fully deterministic and reproducible."
      accuracy: "Boundary damage is the known cost: answer spans that straddle a cut become irretrievable as a unit, and mid-sentence cuts degrade embedding quality."
      cost: "Cheapest to compute; overlap multiplies index size roughly linearly with the overlap fraction."

  - name: "Structure-aware (recursive / document-based)"
    description: "Split along document structure — headings, paragraphs, list items, code blocks, table boundaries — falling back to size limits within oversized sections; the default in most RAG frameworks."
    when_to_use:
      - "Any corpus with real structure: docs, wikis, manuals, contracts, codebases — respecting author-drawn boundaries preserves semantic units for free"
      - "Documents needing format-aware parsing first (PDF, DOCX, HTML), where a parsing layer exposes the structure this strategy needs"
    when_not_to_use:
      - "Structure is absent or hostile (flat transcripts, scanned text without reliable layout recovery) — the strategy degrades to fixed-size with extra steps"
      - "Sections vary wildly in size and the fallback splitter ends up making most cuts anyway — measure how many chunks actually land on structural boundaries"
    tradeoffs:
      accuracy: "Chunks align with semantic units, which measurably improves both embedding quality and answer-span integrity versus arbitrary cuts."
      complexity: "Requires a parsing stage that recovers structure reliably — the real engineering cost lives in the parser, not the splitter."
      flexibility: "Adapts across formats when paired with a document-parsing layer; heading metadata attached to chunks also enables filtered retrieval."

  - name: "Parent-child (small-to-big)"
    description: "Index small chunks for retrieval precision but return their larger parent section (or a window around the hit) to the model for generation, decoupling the retrieval unit from the generation unit."
    when_to_use:
      - "Answers need surrounding context that precise retrieval units lack — long manuals, legal and technical documents where a matched sentence is meaningless without its section"
      - "Retrieval recall is good but generation quality suffers from fragmentary context — the signature symptom this strategy exists to fix"
    when_not_to_use:
      - "Corpus documents are short and self-contained, so parents add tokens without adding information"
      - "Context budgets are tight: parent expansion multiplies prompt tokens per retrieved hit, and the cost compounds with top-k"
    tradeoffs:
      accuracy: "Separates the two jobs chunking conflates — matchability (small unit) and answerability (large unit) — which is why it wins on long structured documents."
      cost: "Prompt tokens per query grow by the parent/child size ratio; storage carries both granularities."
      complexity: "Requires hierarchy bookkeeping (child-to-parent mapping, deduplication when siblings hit) that frameworks provide but debugging must understand."

  - name: "Semantic / LLM-assisted"
    description: "Place boundaries by meaning — embedding-similarity breakpoints between sentences, or LLM-generated splits/summaries (including contextual-retrieval variants that prepend LLM-written chunk context)."
    when_to_use:
      - "A measured retrieval-quality ceiling on simpler strategies, on a corpus where topic shifts don't follow visible structure"
      - "High-value corpora where per-document indexing cost is small relative to answer quality (support knowledge bases, compliance documents)"
    when_not_to_use:
      - "As a first strategy — its gains over structure-aware splitting are corpus-dependent and sometimes negative, while its indexing cost is always higher"
      - "Large frequently-reindexed corpora where per-chunk LLM calls make reindexing cost prohibitive"
    tradeoffs:
      accuracy: "Genuinely better boundaries on topic-drifting prose; published evaluations show gains are corpus-dependent rather than universal — measure on your own retrieval benchmark."
      cost: "Embedding-based splitting adds embedding passes; LLM-assisted variants add a model call per chunk or per document at indexing time."
      complexity: "Non-deterministic boundaries complicate reproducibility and incremental reindexing; version everything (see common mistakes)."

key_factors:
  - "Answer-span length: chunks must be at least as large as the spans that answer real queries — measuring typical answer spans in your own QA pairs beats any universal chunk-size recommendation"
  - "Document structure quality: strong structure (headings, sections) makes structure-aware splitting nearly free; absent structure pushes toward fixed-size or semantic strategies"
  - "Retrieval-vs-generation tension: if precise retrieval returns fragments too small to answer from, that specific symptom indicates parent-child, not a bigger chunk size"
  - "Reindexing economics: chunking changes force full reindexing, so per-chunk LLM costs and corpus churn rate together bound how exotic the strategy can affordably be"
  - "Measurement infrastructure: without a retrieval-recall benchmark, chunking choices are unfalsifiable — the strategy comparison only means something against measured recall on representative queries"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing a chunking strategy"] --> Struct{"Does the corpus have reliable structure (headings, sections)?"}
      Struct -->|"No — transcripts, flat text"| Fixed["Fixed-size ~256-512 tokens, start with zero overlap"]
      Struct -->|"Yes"| SA["Structure-aware splitting (framework default)"]
      SA --> Measure{"Measure retrieval recall on representative queries"}
      Fixed --> Measure
      Measure -->|"Recall good, answers fragmentary"| PC["Add parent-child expansion"]
      Measure -->|"Recall poor at boundaries, topics drift without structure"| Sem["Trial semantic/LLM-assisted chunking against the benchmark"]
      Measure -->|"Recall poor generally"| Other["Fix retrieval first: embeddings, hybrid search, reranking — not chunking"]
      Measure -->|"Both good"| Done["Stop — chunking is not your bottleneck"]

confidence: "established"
tradeoffs_as_of: "2026-07-07"

approach_implementations:
  - approach_name: "Fixed-size with overlap"
    project_ids:
      - langchain
    tool_ids: []
    build_example_ids: []
  - approach_name: "Structure-aware (recursive / document-based)"
    project_ids:
      - llamaindex
      - unstructured
      - docling
    tool_ids: []
    build_example_ids: []
  - approach_name: "Parent-child (small-to-big)"
    project_ids:
      - llamaindex
    tool_ids: []
    build_example_ids: []
  - approach_name: "Semantic / LLM-assisted"
    project_ids:
      - langchain
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-vector-db
  - rag-vs-fine-tuning

common_mistakes:
  - "Tuning chunk size and overlap before measuring retrieval recall — chunking changes are unfalsifiable without a recall benchmark on representative queries, and teams routinely burn weeks re-chunking when the actual bottleneck was the embedding model or missing hybrid search."
  - "Choosing chunk size by model context limits rather than answer-span length — the chunk is a retrieval unit, and its correct size is set by how much text answers a typical query, not by how much the model can ingest."
  - "Solving fragmentary answers by enlarging chunks globally — bigger chunks dilute embedding specificity and depress retrieval precision; the targeted fix for good-retrieval-bad-context is parent-child expansion, which changes only the generation unit."
  - "Adopting semantic or LLM-assisted chunking as a default because it sounds more principled — its indexing cost is unconditional while its quality gain is corpus-dependent, so it must be validated against the structure-aware baseline on your own benchmark."
  - "Not versioning the chunking pipeline — chunker type, parameters, and parser version must be stored with every chunk, because mixed-generation indexes after an unversioned chunking change produce retrieval bugs that are nearly impossible to diagnose post hoc."

added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Chunking determines what a RAG system can retrieve: the chunk is the atomic unit of matching, so boundaries drawn badly make some answers unreachable no matter how good the embedding model or reranker is. It is also the most over-tuned knob in RAG practice — the strategies form a spectrum of increasing cost whose gains are corpus-dependent, which makes measurement infrastructure, not strategy sophistication, the actual differentiator.

## The Decision

This is a spectrum decision: it depends on these specific factors: document structure quality, typical answer-span length, reindexing economics, and whether a retrieval-recall benchmark exists to adjudicate. The practical progression: start structure-aware (or fixed-size where structure is absent) at a few hundred tokens; measure recall on representative queries; then apply the targeted fix the measurement indicates — parent-child when retrieval is precise but context fragmentary, semantic strategies when boundaries demonstrably fail on topic-drifting prose, or no chunking change at all when the bottleneck is elsewhere in retrieval. The most common correct outcome of measuring is discovering chunking was not the problem.

## Decision Framework

The frontmatter tree encodes the progression; the key discipline is that every edge out of the "measure" node is a different fix — chunking iteration without measurement collapses them into guesswork. Quick reference:

| Symptom (measured) | Indicated strategy |
|---|---|
| No benchmark yet | Structure-aware default; build the benchmark first |
| Recall fine, answers lack surrounding context | Parent-child (small-to-big) |
| Recall fails on boundary-straddling spans in unstructured prose | Semantic / LLM-assisted trial |
| Recall poor across the board | Embeddings / hybrid search / reranking — not chunking |

## Approach Deep-Dives

**Fixed-size** is the honest baseline: its boundary damage is real but quantifiable, and starting with zero overlap (per [Start With Zero Chunk Overlap](../../tips-and-tricks/rag-and-retrieval/start-with-zero-chunk-overlap.md)) keeps the index minimal until measurement justifies more. **Structure-aware** splitting gets its advantage from parsers, not splitters: [Unstructured](../../projects/data-and-retrieval/unstructured.md) and [Docling](../../projects/data-and-retrieval/docling.md) recover the headings, tables, and reading order that make boundary-respecting cuts possible on PDFs and office formats, and the recovered heading metadata doubles as a filter dimension at query time. **Parent-child** is the strategy most often misdiagnosed as "need bigger chunks": it fixes the retrieval/generation tension structurally by letting small units match and large units answer — [LlamaIndex](../../projects/frameworks/llamaindex.md)'s hierarchical node parsers and sentence-window retrieval are the canonical implementations (see [Use Parent-Child Chunking for Long Documents](../../tips-and-tricks/rag-and-retrieval/use-parent-child-chunking-for-long-documents.md)). **Semantic and LLM-assisted** strategies — embedding-breakpoint splitting, LLM-drawn boundaries, and contextual-retrieval variants that prepend generated context to each chunk — buy better boundaries at per-chunk indexing cost; published results range from meaningful recall gains to no improvement over recursive splitting depending on corpus, which is precisely why they sit at the measured-upgrade end of the spectrum rather than the default end.

## Common Mistakes

- **Tuning before measuring.** Without a recall benchmark, chunking iteration is unfalsifiable; per [Measure Retrieval Recall Before Answer Quality](../../tips-and-tricks/rag-and-retrieval/measure-retrieval-recall-before-answer-quality.md), the benchmark comes first.
- **Sizing chunks by context window.** Answer-span length in your own QA data is the correct sizing input (see [Choose Chunk Size by Answer Span Length](../../tips-and-tricks/rag-and-retrieval/choose-chunk-size-by-answer-span-length.md)).
- **Global chunk enlargement for fragmentary answers.** It trades retrieval precision for context; parent-child makes the trade locally instead.
- **Semantic chunking as default.** Unconditional cost, conditional gain — trial it against the baseline.
- **Unversioned chunking changes.** Store parser and chunker versions with every chunk (see [Store Parser Version With Every Chunk](../../tips-and-tricks/rag-and-retrieval/store-parser-version-with-every-chunk.md)); mixed-generation indexes are a debugging tarpit.

## When This Guidance Might Be Outdated

The spectrum's structure-aware default is `established`, but two developments could rebalance it: contextual/LLM-assisted indexing costs keep falling with cheaper small models, which moves the semantic end of the spectrum toward affordability for larger corpora; and long-context models plus late-chunking embedding techniques (embedding full documents, then pooling per chunk) reduce boundary damage directly, potentially shrinking the penalty of simpler strategies. Re-verify the cost side annually; the measurement-first discipline does not expire.

## Related Decisions

Downstream of [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md) — chunking only exists once retrieval is chosen — and a sibling of [Choosing Vector Storage](./choose-vector-db.md): chunk granularity determines index size and metadata-filtering needs, which feed directly into that decision's scale thresholds.

## Resources

- [Unstructured](../../projects/data-and-retrieval/unstructured.md)
- [Docling](../../projects/data-and-retrieval/docling.md)
- [LlamaIndex](../../projects/frameworks/llamaindex.md)
- [LangChain](../../projects/frameworks/langchain.md)
- [Start With Zero Chunk Overlap](../../tips-and-tricks/rag-and-retrieval/start-with-zero-chunk-overlap.md)
- [Choose Chunk Size by Answer Span Length](../../tips-and-tricks/rag-and-retrieval/choose-chunk-size-by-answer-span-length.md)
- [Use Parent-Child Chunking for Long Documents](../../tips-and-tricks/rag-and-retrieval/use-parent-child-chunking-for-long-documents.md)

---
*Last reviewed: 2026-07-07 by @maintainer*
