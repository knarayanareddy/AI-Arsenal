---
id: awesome-japanese-llm
name: awesome-japanese-llm
version_tracked: null
artifact_type: library
category: llms
subcategory: open-source-models
description: "Volunteer-maintained catalogue of Japanese LLMs with per-model context length, pretraining corpus and license columns"
github_url: "https://github.com/llm-jp/awesome-japanese-llm"
license: Apache-2.0
primary_language: TypeScript
tags: [community-favorite, research, security]
maturity: beta
cost_model: open-source
github_stars: 1433
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-26"
docs_url: "https://llm-jp.github.io/awesome-japanese-llm"
demo_url: null
phase: foundation-model
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Turns a scattered set of Japanese model releases into one comparable table, with licensing called out per row."
best_for:
  - "You are choosing a Japanese base or instruct model and you need pretraining token counts, context length and developer provenance side by side rather than from memory."
  - "You are checking whether a specific Japanese checkpoint is actually open source, because several rows carry non-commercial or organisation-specific terms."
  - "You are surveying Japanese evaluation benchmarks and you want to know which harnesses the community actually runs before writing your own."
avoid_if:
  - "You need a machine-readable API, since the catalogue is a Markdown document rendered by a static site and carries no structured feed."
  - "You need a guarantee of completeness or accuracy, because the maintainers state explicitly that entries are volunteer collected and may be incomplete, stale or interpretive."
  - "You are automating a license audit, because terms are summarised in prose cells and must be verified against each model's own license file."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, homepage and issue count. Table contents, the licence warning and the site URL are read from the README; individual model licences and the accuracy of every row were not independently checked."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The project is a curated reference, not a software package. Maintained by the llm-jp community, it organises publicly released Japanese-capable language models into Markdown tables split by use: text generation first, with sections for from-scratch pretraining and for models adapted from existing backbones, then multimodal text generation, then evaluation benchmarks. Each row records release year, architecture including whether the model is dense or mixture-of-experts, the number of input and output tokens it can handle, the pretraining and post-training datasets by name with token counts where published, the developing organisation, and the license or terms of use. Concrete rows include SB Intuitions' Sarashina2-8x70B as a 465B mixture-of-experts model, and the LLM-jp 3 172B family trained on a 2.1T-token Japanese corpus with an enumerated instruction-tuning and DPO dataset list. The content is published in Japanese, English and French, with a rendered web edition at llm-jp.github.io.

## Why it's in the Arsenal

Japanese model selection is a genuine research task rather than a leaderboard lookup. Model names in this ecosystem encode lineage, licence and training-data provenance, and the licence column is the single most consequential field: the maintainers carry an explicit warning that some models ship under non-commercial terms such as CC BY-NC-SA 4.0 or organisation-specific contracts, which means a row that looks like an open release can still be unusable in a commercial product. Meanwhile the answer to a general question like which Japanese instruct model to shortlist arrives piecemeal from lab blogs and paper footnotes. The recurring decision this catalogue removes is the archaeology of turning scattered announcements into a shortlist you can defend, with the licence question answered before the download rather than after.

## Architecture

There is no runtime. The deliverable is a set of Markdown files with embedded HTML tables plus VitePress-style admonition blocks and a table of contents, rendered as a static documentation site so that wide comparison tables do not break on GitHub. Content lives in separate language directories, Japanese at the root with English and French mirrors, and the front matter is generated rather than hand-listed. Maintenance is community-driven: corrections and model submissions arrive as GitHub issues, and the maintainers merge them into the tables. Rows are hand-curated from papers, model cards and lab press releases, which means the artefact's quality is a function of editorial care rather than an automated pipeline, and the site build is the only tooling in the loop.

## Ecosystem Position

It sits between the raw model hubs and the evaluation harnesses rather than competing with either. Compared to browsing Hugging Face's model listings, it wins on Japanese-specific comparability because rows are normalised to the same columns, and it loses on automation because nothing here is queryable. It overlaps with the awesome-* list genre, including lists for RAG and for speech models, and it complements evaluation tooling in content/projects/benchmarks-and-evals such as MTEB, which supplies multilingual embedding scoring but knows nothing about Japanese pretraining corpora or Japanese licensing. The Japanese community's own evaluation harness, llm-jp-eval, is a natural companion rather than an alternative: this catalogue tells you which models to score, that harness scores them.

## Getting Started

Clone the repository to read the tables offline, or open the rendered web edition, which the maintainers recommend because the wide tables render poorly in a GitHub README. The repository is the maintained source of truth; the site is generated from it.

```bash
git clone https://github.com/llm-jp/awesome-japanese-llm.git
cd awesome-japanese-llm
```

For programmatic use, filter rows by hand or read the site HTML, and always open the linked Hugging Face repository for the authoritative license text before shipping anything commercially.

## Key Use Cases

1. Shortlisting Japanese instruct models: compare context length, architecture and post-training recipe across LLM-jp, Sarashina and community releases in one pass.
2. License triage: spot which candidate checkpoints carry non-commercial or organisation-specific terms before a product or research budget is committed.
3. Corpus reconnaissance: read which pretraining and instruction datasets a Japanese model was trained on, then decide whether its Japanese capability is transferable to your domain.

## Strengths

- Normalised columns make otherwise incomparable Japanese releases directly comparable on context length, architecture and training data.
- The license column is treated as a first-class field, with an explicit warning about non-commercial variants.
- Community maintained, so new Japanese releases appear without a vendor request, and corrections flow in through public issues.
- Trilingual presentation with a rendered site keeps dense comparison tables readable instead of fighting README layout.

## Limitations

It is editorial work with no automated refresh, so entries go stale, and the maintainers say so themselves: they disclaim completeness and accuracy, and note that some content reflects individual contributors' interpretation. There is no API, no schema and no diff-friendly data file, so anything you want to consume programmatically must be parsed out of Markdown prose. Licence information is a summary written in a table cell, and the underlying terms live in each model's own repository, so an audit still requires opening every weight repository separately. Coverage is scoped to Japanese language models and their benchmarks, which means it says nothing about serving cost, throughput or hardware fit, and English-first teams without a Japanese reader will find the primary edition difficult.

## Relation to the Arsenal

This is a reference entry inside content/projects/foundation-models, where model weights and their runtimes are the norm, and it is the survey counterpart to the concrete checkpoints catalogued there. Read it before choosing a model to serve with content/projects/inference-engines, since the context length and architecture columns determine whether a given engine and quantisation path is even usable. For evaluation follow-up, the harnesses under content/projects/benchmarks-and-evals give you the scoring, and the research layer under content/research/evaluation-and-safety holds the methodology for building Japanese-specific probes. Nothing here is executable, so it complements rather than replaces anything in the tooling folders.

## Resources

- [Repository (Japanese source of truth)](https://github.com/llm-jp/awesome-japanese-llm)
- [Rendered web edition](https://llm-jp.github.io/awesome-japanese-llm)
- [English edition](https://github.com/llm-jp/awesome-japanese-llm/tree/main/en)
