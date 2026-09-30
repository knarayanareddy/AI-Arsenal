---
id: kreileder-2026-rag-chunking
title: Evaluating Chunking Strategies for Retrieval-Augmented Generation on Academic Texts
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2026
authors:
  - Valentin J. J. Kreileder
  - Johannes Reisinger
  - Andreas Fischer
arxiv_id: "2607.01852"
arxiv_url: "https://arxiv.org/abs/2607.01852"
pdf_url: "https://arxiv.org/pdf/2607.01852"
code_url: null
venue_url: null
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
tldr: "A negative result: cluster-based semantic chunking did not beat fixed-size or recursive chunking on long academic theses."
key_contribution: "Tests a widely held assumption against two simpler baselines rather than against a strawman, which is the comparison most teams skip."
tags:
  - rag
  - chunking
  - research
  - evaluation
  - retrieval
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
enrichment_status: draft
---

## Overview

The study asks a narrow question that many RAG teams ask badly: does cluster-based semantic chunking, which groups passages by embedding similarity before setting boundaries, improve retrieval and answer quality over fixed-size and recursive chunking? The authors evaluate on long, structured academic theses and score with the RAGAs framework. Two results matter. First, under the tested configuration the cluster-based approach did not outperform the simpler strategies, so the added machinery of embedding-based clustering bought nothing here. Second, and more usefully for anyone building a pipeline, RAGAs-based faithfulness showed limited reliability in this setup, meaning the acceptance metric itself was not dependable. The authors also observed substantial variation between performance on fixed questions and on document-specific questions, attributing it likely to document formatting and preprocessing. The practical upshot is a caution on both sides of the pipeline: chunking sophistication is not automatically quality, and the metric you are steering by may not measure what you think.

## Why it's in the Arsenal

Semantic chunking has become a default recommendation in RAG practice, often sold with the argument that it preserves semantic boundaries and therefore improves retrieval. That argument is plausible and widely repeated, which is exactly why a controlled comparison is worth having. The engineering question is concrete: you are about to build an embedding-clustering stage, a second index over clusters, and the tuning that goes with it, and you want to know whether that pipeline is justified. This paper tests it against the two splitters you would use otherwise on long structured documents and reports no advantage, which converts an assumption into a decision you can make cheaply. The secondary finding about metric reliability matters just as much, because a comparison you cannot trust is a comparison you will re-run six months from now.

## Core Contribution

- Tests a widely held assumption against two simpler baselines rather than against a strawman, which is the comparison most teams skip.
- Reports a null result honestly instead of framing a marginal difference as an improvement.
- Separates a chunking conclusion from a metric conclusion, so a pipeline owner learns two separate things.
- Identifies question type and document preprocessing as confounds, which points at where to look next.

## Key Results

1. Chunking procurement: decide between recursive splitting and an embedding-clustering pipeline before building the latter.
2. Metric selection: stop treating RAGAs faithfulness as a hard acceptance gate on long structured documents without validating it first.
3. Debugging retrieval quality: when fixed questions and document-specific questions diverge, suspect formatting and preprocessing before blaming the splitter.

## Methodology

The experimental design is deliberately plain: a single corpus type, long structured academic theses, three chunking strategies compared head to head, and one scoring framework, RAGAs, applied to the resulting retrieval and answer quality. The chunking strategies are fixed-size splitting, recursive character- or text-based splitting, and cluster-based semantic splitting, where passages are grouped by embedding similarity and group boundaries become chunk boundaries. The question types are split into fixed and document-specific, which is what surfaces the second finding: performance varied substantially between the two, and the authors attribute that gap to document formatting and preprocessing rather than to chunking choice. Because the report is an abstract-level read, the specific embedding model, cluster algorithm, chunk sizes, retriever, generator model and RAGAs configuration are not known from the summary, and the paper's own framing is that the conclusion holds under the tested configuration rather than universally.

## Practical Applicability

The artefact is a short paper, not a package, so read it and reproduce the comparison rather than installing anything. If you want to run the same comparison against your own corpus, RAGAs is the scoring library named in the study.

```bash
curl -L -o rag-chunking.pdf https://arxiv.org/pdf/2607.01852
```

```bash
pip install ragas datasets
```

```python
# the three-way comparison the paper runs, on your own corpus
from ragas import evaluate

for splitter in [fixed_size, recursive, semantic_clustering]:
    corpus = load_and_split(split_chunk_size(splitter))
    result = evaluate(dataset=build_qa_set(corpus))
    print(splitter, result)
```

Keep chunk size, retriever and generator fixed across the three arms. The paper's own second finding suggests you should also vary the question type, since fixed and document-specific questions behaved differently.

## Limitations & Critiques

This is a preprint verified through arXiv metadata only, and the substance here comes from the abstract: the corpus size, the specific embedding model, cluster algorithm, retriever, generator and RAGAs settings are all unknown from the summary, so the comparison cannot be reconstructed from what is written. The conclusion is explicitly scoped to the tested configuration, and a single long-structured-document domain is a narrow base from which to generalise about chat logs, tickets or mixed web corpora. The result is a non-finding under one configuration, which is weak evidence against semantic chunking in general and no evidence at all about richer alternatives such as hierarchical or late-interaction retrieval. The unreliability of RAGAS faithfulness is itself reported without a reliability analysis in the abstract, and the stated link to formatting and preprocessing is speculative.

## Reproductions & Follow-up Work

The catalog records no third-party reproduction of Evaluating Chunking Strategies for Retrieval-Augmented Generation on Academic Texts (arXiv:2607.01852). The reported numbers are author-reported: they have not been rerun on an independent implementation, so treat the effect sizes as a claim awaiting confirmation rather than an established result. A replication would need the same task set, the same scoring script, and a model family comparable to the one the authors evaluated.


## Relation to the Arsenal

This is a retrieval-and-memory research entry whose value is methodological caution, and it reads as a corrective to the chunking-heavy pipelines catalogued in content/projects/data-and-retrieval and the framework defaults in content/projects/frameworks. Its evaluation claim lands directly on the RAG-evaluation tooling in content/projects/benchmarks-and-evals, so if you use those harnesses this entry tells you when their faithfulness score will mislead you. The document parsers in content/projects/data-and-retrieval, including docling and marker, are implicated by the formatting finding, which makes this a cross-cutting read between the ingestion and evaluation layers rather than a retrieval-algorithm paper. It is the smallest and most directly applicable paper in this batch.

## Resources

- [arXiv abstract page](https://arxiv.org/abs/2607.01852)
- [PDF](https://arxiv.org/pdf/2607.01852)
