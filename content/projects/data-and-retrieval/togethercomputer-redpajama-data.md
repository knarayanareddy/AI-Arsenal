---
id: togethercomputer-redpajama-data
name: "RedPajama-Data"
version_tracked: null
artifact_type: dataset
category: data-pipelines
subcategory: datasets
description: "Preparation pipeline and filter configurations for assembling open web-scale pretraining corpora, released alongside the RedPajama V1 and V2 datasets"
github_url: "https://github.com/togethercomputer/RedPajama-Data"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "togethercomputer"
tags: [training, data]
maturity: production
cost_model: open-source
github_stars: 4992
github_stars_last_30d: 0
trending_score: 27
last_commit: "2026-06-03"
docs_url: "https://github.com/togethercomputer/RedPajama-Data"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [community-driven]
ecosystem_role:
  - "Open pretraining corpus with the preparation and filtering code that produced it — referenceable provenance for teams that need to justify their own corpus filters."
best_for:
  - "You are assembling a pretraining or midtraining corpus and need a documented, re-runnable filter pipeline rather than an opaque mixture."
  - "You want to reproduce the RedPajama V2 training mixture to validate your own tooling against a known result."
  - "You need reference code for large-scale dedup and heuristic quality filtering, which is the hardest part to write correctly from scratch."
avoid_if:
  - "You need only a few billion tokens for midtraining, where downloading a filtered subset or your own domain corpus is faster than running the pipeline."
  - "You need the data itself ready to use, since this repository ships preparation code and configurations more than it ships a turnkey corpus."
  - "You lack the storage and compute to run multi-terabyte passes, which is the scale the pipeline is written for."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (4992), Apache-2.0 license, last commit 2026-06-03, and primary language Python were read from the GitHub API; the topics array is empty upstream and no separate homepage is declared. Source mix, dedup approach, and the V2 classifier and curriculum claims come from the official README and technical report; no corpus was downloaded and no filter was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/togethercomputer/RedPajama-Data", "date": "2026-09-28", "description": "4,992 stars and last commit 2026-06-03 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

RedPajama-Data is the code release from Together AI's open pretraining data project. It documents how the V1 corpus was assembled from Common Crawl, GitHub, books, arXiv, Wikipedia, and StackExchange, and it ships the tooling to do it: downloaders that fetch and normalize each source, extractors that pull text out of web archives, and a filter library implementing the quality signals used to assemble the mixture. V2 extended the project toward a training-ready data mix, adding a curriculum formulation and a much larger deduplication effort, with a classifier trained on the retained versus filtered examples so the filter itself becomes a learned component rather than a fixed rule set. The repository is the reference implementation of those stages, released under Apache-2.0.

## Why it's in the Arsenal

The decision it resolves is whether a pretraining corpus can be defended. When a model is trained on a mixture described only in a blog post, nobody can reproduce it, audit it for contamination, or explain a regression found six months later. Publishing each stage as code turns the mixture into a versioned artifact: change the Common Crawl snapshot, change the dedup threshold, change the quality filter, and the difference in resulting model is attributable. The second use is more common than the first, since most teams borrow the filter implementations, especially the fuzzy deduplication and the language and quality classifiers, because those are the parts where a subtle bug quietly costs quality.

## Architecture

The pipeline is a sequence of stages over an abstractly-sharded corpus. Common Crawl records are fetched from the WARC files, HTML is extracted and normalized, and the shards are filtered by source-specific heuristics. Deduplication runs at two granularities: exact hashing on normalized document content, and fuzzy matching using MinHash signatures with LSH banding to catch near-duplicate documents and boilerplate templates, which is what removes the web's high duplication rate without dropping genuinely distinct pages. Quality filtering combines rule-based heuristics with a trained classifier that scores a document as retain or filter, and the V2 work adds a data curriculum that varies the mixture over training rather than fixing it. Languages are separated with a fast text classifier so multilingual proportions are controlled explicitly. Each stage is sharded and independently restartable, which is a hard requirement at this scale.

## Ecosystem Position

RedPajama-Data overlaps with Dolma, which releases the OLMo pretraining data tools, and the two are genuine alternatives: RedPajama leans on a learned retain-or-filter classifier and a large-scale dedup pass, while Dolma emphasizes inspectability, tag-based provenance, and step-by-step corpus inspection so a data scientist can see what a filter removed. It also differs from the FineWeb and RefinedWeb releases, which ship data plus lighter processing code, so if you want a ready corpus you should take those instead. It is a rather than an alternative to datatrove or the same filtering work embedded in a cloud vendor's pipeline: those are more turnkey, and this is more inspectable. Both it and Dolma sit upstream of the model entries in the foundation-model phase, since every base model listed there was trained on a mixture built with tooling of this kind.

## Getting Started

Clone the repository and inspect the stage implementations:

```bash
git clone https://github.com/togethercomputer/RedPajama-Data.git
cd RedPajama-Data
python -m pip install -r requirements.txt
```

```python
# the deduplication stage: MinHash signatures, LSH banding, near-duplicate removal
from red_pajama.dedup import get_minhash, fuzzy_deduplicate

sig = get_minhash(normalized_documents, num_perm=128)
kept = fuzzy_deduplicate(sig, threshold=0.8, bands=32)
```

```bash
# the V1 corpus and its data card are on Hugging Face
huggingface-cli download togethercomputer/RedPajama-Data-V1 \
    --repo-type dataset --local-dir ./redpajama-v1
```

```bash
# V2 training mix, with the curriculum configuration
huggingface-cli download togethercomputer/RedPajama-Data-V2 \
    --repo-type dataset --local-dir ./redpajama-v2
```

Filter configurations and per-source extraction recipes are documented in the repository README and its per-directory notes.

## Key Use Cases

1. Assembling a custom web corpus where you need to justify every filter choice to a review or an audit.
2. Decontamination against benchmark test sets, reusing the MinHash and normalization stages to detect overlap before training.
3. Reproducing a published pretraining mixture as a control when evaluating a new tokenizer or data-mixing method.

## Strengths

- Every filter stage is published as code, so a mixture can be re-run and changed rather than argued about.
- The MinHash and LSH deduplication implementation is the single most reusable piece here, since near-duplicate web pages dominate an unfiltered crawl.
- The V2 retain-or-filter classifier turns quality filtering into a learned, inspectable model rather than a threshold list.
- Apache-2.0 licensing, so commercial teams can use the tooling without a separate agreement.

## Limitations

This is pipeline code written for a specific scale, so running it means owning multi-terabyte storage, a cluster with a large number of shards, and a Common Crawl fetch that is slow and bandwidth-hungry. A serious caveat is that the stages were tuned for English-dominant web text, and the language-balance control is coarse for multilingual or code-heavy mixtures. The learned classifier embeds the authors' preferences about what good text looks like, and inheriting it wholesale means inheriting their biases, including a general bias toward easily parseable prose. There is no test suite covering corpus outputs, so a configuration typo shows up as a quietly worse model rather than an error, and the repository is not actively developed alongside the datasets it produced.

## Relation to the Arsenal

This sits in the data-and-retrieval phase as a data-pipelines entry, upstream of everything in the foundation-model phase, and is best read next to Dolma, which solves the same problem with a different emphasis. The DALI entry in the same catalog handles the throughput side of loading a prepared corpus during training, so the two concerns meet at the training loop. For corpus construction aimed at retrieval rather than pretraining, the chunking and embedding entries in this phase cover the downstream half of the pipeline.

## Resources

- [RedPajama-Data GitHub repository](https://github.com/togethercomputer/RedPajama-Data)
- [RedPajama-Data-V1 on Hugging Face](https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V1)
- [RedPajama V2 technical report](https://github.com/togethercomputer/RedPajama-Data/blob/main/RedPajama-V2.pdf)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (4,992 stars, last commit 2026-06-03, license Apache-2.0, verified via GitHub API on 2026-09-28)*
