---
id: illuin-tech-colpali
name: "colpali"
version_tracked: null
artifact_type: model
category: rag
subcategory: advanced-rag
description: "Vision-language retrieval models that index document page images directly with one embedding per image patch instead of OCR text"
github_url: "https://github.com/illuin-tech/colpali"
license: "MIT"
primary_language: Python
org_or_maintainer: "illuin-tech"
tags: [retrieval, rag]
maturity: production
cost_model: open-source
github_stars: 2818
github_stars_last_30d: 0
trending_score: 27
last_commit: "2026-09-21"
docs_url: "https://docs.colpali.ai"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [vision, language]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [actively-maintained]
ecosystem_role:
  - "Vision-language retrieval models that index document page images directly, skipping OCR-and-embed entirely for visually complex documents."
best_for:
  - "You are retrieving over documents where layout carries meaning, such as tables, forms, multi-column pages, or scanned PDFs with figures."
  - "You want to skip the OCR and text chunking stages entirely and index page images as the retrieval unit."
  - "You are building RAG over a document collection and need one retrieval model rather than a parser, an embedder, and a chunker in sequence."
avoid_if:
  - "You need exact text output from the retriever, since this returns page images and a reader is still required to produce text."
  - "Your storage cannot absorb a much larger index, because per-patch vectors cost many times more than one vector per text chunk."
  - "You have simple clean text documents where a text embedder over chunks is cheaper and equally accurate."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (2818), MIT license, last commit 2026-09-21, primary language Python, and all six topics were read from the GitHub API. Per-patch embeddings, MaxSim scoring, the ColQwen2 and ColSmol variants, and page-proxy indexing come from the official README and docs; no checkpoint was downloaded and no page was indexed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/illuin-tech/colpali", "date": "2026-09-28", "description": "2,818 stars and last commit 2026-09-21 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

ColPali is a family of document retrieval models that operate on page images rather than on extracted text. Built on a vision-language backbone, the model produces contextual embeddings for every image patch, and a query is encoded into a single vector. Retrieval is late interaction: the query vector is compared against every patch embedding of a candidate page and the maxima are summed, exactly the ColBERT scoring rule applied to visual patches. The model is trained directly for retrieval with the page image as the indexed artifact, and page-level proxies such as text renderings and multimodal embeddings are used for indexing a document before the real page is available. The repository ships training and inference code for the model family, including ColPali, ColQwen2, and the smaller ColSmol variant, plus the evaluation harness for retrieval benchmarks.

## Why it's in the Arsenal

The decision it resolves is whether the retrieval unit should be text or the page. Every OCR-based pipeline has the same failure mode: the parser disagrees with the reader, and a table flattened into a sequence of cells or a figure with a caption detached from it becomes a chunk that no longer matches the question, so the retriever never surfaces the page that does contain the answer. Indexing the rendered image means the evidence is the artifact a human would look at, and the model learns the reading order and layout structure implicitly from pretraining. The cost is paid honestly: you store many more vectors, and you still need a reader to turn the retrieved page into text, so this changes the retrieval stage rather than eliminating the pipeline.

## Architecture

The backbone is a vision-language encoder, with the image split into patches that pass through a vision tower and then the language decoder layers, and the final-layer patch representations are projected into the retrieval embedding space. The query path encodes text through the same model's language path into a single vector. Because document embeddings are per patch, an index stores roughly a thousand vectors for a typical page rather than one. Scoring uses the ColBERT MaxSim formulation, a matrix product of the query against the page's patch embeddings followed by a max over patches and a sum over query tokens, which is the same operator that makes late interaction expensive on text and is correspondingly expensive here. Training uses a contrastive or ranking objective with hard negatives at the page level, and the multi-vector training scheme is what allows the pooled-looking query to work against patch-level evidence.

## Ecosystem Position

ColPali is an alternative to the OCR-then-embed pipeline that dominates document RAG, and it competes with a plain text retriever rather than with a vector database, since the storage format is the real difference. Compared to text-based late interaction in the ColBERT entry, it is the same MaxSim idea moved from token embeddings to image patches, so the storage blow-up is proportionally worse and the gains are concentrated on visually rich documents rather than on prose. It is a rather than an alternative to a VLM-based extractor: the two compose, with this retrieving the right page and the extractor reading it, and skipping the retrieval step to query every page is what makes a naive document assistant slow and expensive. It is a complement to the OCR entries such as docTR, which remain the right tool when you need text and geometry rather than visual retrieval. The vector database entries in the same phase are the storage choice, and Infinity's tensor columns are a natural fit for the multi-vector layout.

## Getting Started

Load a published checkpoint and score a query against page images:

```bash
pip install colpali-engine
```

```python
import torch
from PIL import Image
from colpali_engine.models import ColPali, ColPaliProcessor

model = ColPali.from_pretrained("vidore/colpali-v1.3", dtype=torch.bfloat16).eval()
processor = ColPaliProcessor()

images = [Image.open("invoice.pdf").convert("RGB")]
batch = processor.process_images(images)
with torch.no_grad():
    doc_embs = model(**batch)      # one embedding per image patch, not one per page

query = processor.process_queries(["total amount due"])
with torch.no_grad():
    q = model(**query)            # single query vector

# late interaction: MaxSim over patch embeddings, summed across query tokens
scores = torch.einsum("bh,bdh->b", q, doc_embs)
print(scores)
```

```bash
# evaluate on a standard document retrieval benchmark
python -m colpali_engine.trainers.eval \
    --model_name_or_path vidore/colpali-v1.3 --eval_dataset UBEIR
```

Budget GPU memory for a large batch: encode one page at a time, and cache the patch embeddings rather than recomputing them per query.

## Key Use Cases

1. Retrieval over document collections with tables, forms, and multi-column layout where a text chunker destroys the evidence.
2. A document assistant that must find the right page before spending tokens on a vision-language read of each candidate.
3. Replacing a fragile OCR dependency, where a single parser error silently removes the correct answer from the candidate set.

## Strengths

- Page image indexing removes OCR as a failure source and preserves layout, tables, and figures that a text chunk cannot.
- The ColSmol variant makes a small-footprint deployment realistic for a document pipeline that cannot afford a large vision backbone.
- One model for retrieval replaces the parser, chunker, and embedder chain, which is several places to go wrong instead of one.
- Late interaction over patch embeddings gives token-level attribution on a page, so a poor match is diagnosable.

    

## Limitations

Storage and index cost is the headline: a page becomes thousands of vectors, so an index over a document collection is orders of magnitude larger than a text-chunk index and the MaxSim scoring pass is correspondingly heavy. You still need OCR or a vision-language model to produce text for the reader, so this replaces one stage rather than the whole pipeline, and the total cost of retrieval plus reading can exceed a well-tuned text pipeline for simple documents. Page rendering must happen somewhere: if pages are only available as text, the model has to render or use a proxy, which is a real preprocessing pipeline. GPU memory for encoding is substantial, so batch sizes are small and throughput is limited, and the training data recipe is research-grade, meaning domain adaptation for a specialized document type is a project of its own. There is also no free lunch on plain prose, where a small text embedder on good chunks is still cheaper and often as accurate.
    

## Relation to the Arsenal

This is a data-and-retrieval phase entry in the advanced-RAG subcategory, and it is the visual counterpart to the ColBERT entry in the foundation-model phase, which applies the same late-interaction rule to text tokens. Its multi-vector output is the layout that the tensor columns in the Infinity entry were designed for, and it feeds the reader side of a document assistant built from the OCR entries. The foundation-model phase supplies the vision-language backbone, and the benchmarks-and-evals phase is where a retrieval change like this should be scored against a text baseline rather than adopted on intuition.
    

## Resources

- [ColPali GitHub repository](https://github.com/illuin-tech/colpali)
- [ColPali documentation](https://docs.colpali.ai)
- [ViDoRe model collection on Hugging Face](https://huggingface.co/vidore)
    

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (2,818 stars, last commit 2026-09-21, license MIT, verified via GitHub API on 2026-09-28)*
