---
id: allenai-dolma
name: "dolma"
version_tracked: null
artifact_type: dataset
category: data-pipelines
subcategory: datasets
description: "Toolkit for generating, annotating, and inspecting OLMo pretraining data, with stage-wise tools and a decontamination pass"
github_url: "https://github.com/allenai/dolma"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "allenai"
tags: [training, data]
maturity: production
cost_model: open-source
github_stars: 1548
github_stars_last_30d: 0
trending_score: 25
last_commit: "2026-08-24"
docs_url: "https://allenai.github.io/dolma/"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [community-driven]
ecosystem_role:
  - "Tools for generating and inspecting OLMo pretraining data, making corpus curation and decontamination inspectable instead of a black box."
best_for:
  - "You are curating a pretraining corpus and need to see exactly which documents a filter stage removed, not just a count."
  - "You need decontamination against benchmark test sets before training, as a first-class stage rather than an afterthought."
  - "You are reproducing the OLMo data recipe or want a reference corpus whose construction is inspectable end to end."
avoid_if:
  - "You need a large-scale classifier-based filter that is already trained and tuned, since the stages here are tools and configs you assemble."
  - "You are preparing data at a scale requiring a purpose-built distributed system, since the tooling is written for research-scale iteration."
  - "You want a ready-to-train corpus with no assembly work, in which case a published data release is the faster path."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (1548), Apache-2.0 license, last commit 2026-08-24, primary language Python, and all five topics were read from the GitHub API. Tag-based annotation, the inspect command, the decontamination stage with n-gram matching, and the OLMo mixture configs come from the official docs and repository; no corpus was processed and no stage was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/allenai/dolma", "date": "2026-09-28", "description": "1,548 stars and last commit 2026-08-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Dolma is the data toolkit and corpus released alongside the OLMo models from AI2. It provides a set of tools for processing, annotating, and inspecting text corpora at pretraining scale, organized as a sequence of stages: downloading and extracting text from source documents, cleaning, deduplicating, filtering by quality and language, and finally decontaminating against evaluation benchmarks. A defining design choice is annotation: each processing stage can attach tags or metadata to the documents it touches, so a document carries a record of which filters it passed and which removed it, and documents removed by a stage can still be written out rather than discarded silently. The toolkit also includes an inspection interface so a human can look at a sample of what a stage kept or removed, which is the mechanism that makes the pipeline reviewable rather than merely reproducible. Configs for the OLMo mixture are included as the reference usage.

## Why it's in the Arsenal

The decision it resolves is whether corpus construction is reviewable. A pipeline that only emits counts tells you that three percent of documents were removed by the quality filter, which is not enough to notice that the filter was dropping an entire domain, a non-Latin script, or a specific citation style. Annotating each document with the stages that touched it makes the effect of a filter inspectable at the level of individual documents, so a data scientist can sample what was removed and decide whether the filter is doing what was intended. The second motivation is decontamination, which is a correctness requirement for any published benchmark claim and is fiddly to do well: you need to match near-duplicates across a huge corpus and against test sets that have been paraphrased, and a stage designed for that is worth more than a one-off script.

## Architecture

Documents flow through an ordered sequence of stages, each of which takes tagged documents and emits tagged documents. The tagging model is a flat collection of key-value annotations per document, such as a quality score, a language label, a duplicate cluster identifier, or a decontamination verdict, and stages compose by reading the tags present and adding to them. The annotation is what makes stages composable and order-independent in a useful sense, since a later stage can filter on a tag an earlier stage attached, and a document removed by one stage can be retained for inspection because the tag records the reason. A downloader and document extractors handle source formats. Decontamination uses exact and fuzzy matching, including n-gram overlap, to remove documents that resemble benchmark items. An inspection tool renders a sample of the tagged corpus so a human can review a filter's effect, and the OLMo mixture configs are assembled from these stages as the reference configuration.

## Ecosystem Position

Dolma is a genuine alternative to the RedPajama-Data pipeline, and the two differ in philosophy rather than in goal: RedPajama emphasizes a large-scale learned filter that decides retain or drop, while Dolma emphasizes tags and inspection so a human can see and argue with each stage, which is why the OLMo recipe is auditable in a way a classifier output is not. It is a rather than an alternative to a published ready-to-train dataset, since it is a toolkit for building one, and a team that only needs data should take the release. Compared with the data-preparation code embedded in cloud vendor pipelines, it is more inspectable and less turnkey, and the trade is deliberately in that direction. It complements the model entries in the foundation-model phase, since OLMo was trained with it and reproducing that model means reproducing this pipeline, and it is a natural partner to the decontamination tooling the evaluation phase needs to keep benchmarks honest.

## Getting Started

Install the toolkit and run a decontamination stage over a corpus:

```bash
pip install dolma
# or: git clone https://github.com/allenai/dolma && pip install -e .
```

```bash
# download, annotate, filter, and decontaminate in sequence
python -m dolma pipeline \
    --config config/olmo-mix-1124.yaml \
    --input ./raw-corpus --output ./processed
```

```bash
# inspect what a filter stage actually removed, which is the point of the tagging model
python -m dolma inspect ./processed \
    --tag quality.score \
    --filter 'quality.score < 0.5' \
    --sample 20
```

```python
# decontaminate a corpus against a benchmark's test set
from dolma.io import vrs
from dolma.task.decontam import Decontamination

# near-duplicate match on n-gram overlap, not just exact hashes
result = Decontamination(
    match_threshold=0.5,
    ngram_length=13,
).run(input_path="./processed", benchmark_paths=["./benchmarks/mmlu"])
print(result.num_removed, result.tags)
```

```bash
# build the OLMo mixture from the shipped configuration
python -m dolma pipeline --config config/olmo-mix-1124.yaml --stage mix --output ./olmo-mix
```

Set `DOLMA_ROOT` to control where intermediate data is written, since a full pass writes a great deal of intermediate data.

## Key Use Cases

1. Auditing a corpus filter before committing to it, by sampling exactly which documents a stage removed and why.
2. Decontaminating a training corpus against benchmark test sets, so a reported benchmark number is not inflated by overlap.
3. Reproducing the OLMo pretraining mixture, since the configs and stage implementations for that recipe are included as the reference.

## Strengths

- Tag-based annotation on every document records which stages touched it, so a filter's effect is inspectable at document level.
- Human review of a sample of what a filter kept or removed, which is the mechanism most pipelines lack and most need.
- Decontamination as a first-class stage with near-duplicate matching, not just exact hashing.
- Stage composition over tags means a new filter is a stage that reads existing annotations rather than a rewrite of the pipeline.

## Limitations

It is a toolkit, not a finished pipeline, so assembling a working mixture is real work and the reference config is a starting point rather than a recipe you can run unchanged for your own sources. The stages are written for research-scale iteration, so a production-scale run wants a distributed system around them, and the tooling is not a replacement for one. The inspect-and-argue workflow depends on someone actually looking at the samples, which is a human process that gets skipped under delivery pressure, and the tags are only as good as the stage that set them. The OLMo configurations reference source documents and URLs whose availability is outside this repository's control, so a reproduction can diverge for reasons unrelated to the pipeline. Version churn across stage interfaces is a real maintenance cost when a config is tightly coupled to the code.

## Relation to the Arsenal

This is a data-and-retrieval phase entry in the data-pipelines subcategory and is the inspectability-oriented counterpart to RedPajama-Data in the same catalog, worth reading together since they solve the same problem with opposite emphasis. It is upstream of the model entries in the foundation-model phase, since OLMo was trained with it. The benchmarks-and-evals phase is the natural consumer of its decontamination output, since an uncontaminated benchmark is what makes a reported number meaningful, and the training-and-alignment phase starts from the corpus these stages produce.

## Resources

- [Dolma GitHub repository](https://github.com/allenai/dolma)
- [Dolma documentation](https://allenai.github.io/dolma/)
- [Dolma toolkit announcement and OLMo data recipes](https://allenai.github.io/blog/olmo-open-language-model/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (1,548 stars, last commit 2026-08-24, license Apache-2.0, verified via GitHub API on 2026-09-28)*
