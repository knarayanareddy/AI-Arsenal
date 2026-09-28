---
id: explosion-spacy
name: "spaCy"
version_tracked: null
artifact_type: library
category: tooling
subcategory: libraries
description: "MIT-licensed industrial NLP library with Cython pipelines for tokenization, tagging, NER, parsing, and entity linking"
github_url: "https://github.com/explosion/spaCy"
license: "MIT"
primary_language: Python
org_or_maintainer: "explosion"
tags: [battle-tested]
maturity: production
cost_model: open-source
github_stars: 33927
github_stars_last_30d: 0
trending_score: 35
last_commit: "2026-08-24"
docs_url: "https://spacy.io"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [community-driven]
ecosystem_role:
  - "Industrial NLP pipeline library whose tokenization, tagging, NER, and dependency-parse models are the standard preprocessing contract for non-LLM text pipelines."
best_for:
  - "You need named-entity recognition, part-of-speech tags, or dependency parses at high volume and want per-document latency in the low milliseconds rather than a model call per field."
  - "You are building a rules or lookup system on top of extracted entities - indexing, redaction, deduplication - and need spans with offsets you can trust for character-level operations."
  - "You are pretraining a domain model or a tokenizer and need a fast baseline to compare against, since spaCy's small pipelines establish the accuracy floor for these tasks."
avoid_if:
  - "Your task is open-ended generation, summarization, or reasoning over long documents, because these pipelines annotate structure rather than produce language."
  - "You need deep contextual representations for your own encoder, since the pipeline components wrap third-party embedding backbones rather than training a novel model here."
  - "You need per-language coverage for a language with no pretrained vectors, where annotation quality drops sharply and you are retraining the components yourself."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 33927 stars, MIT license, Python primary language, last commit 2026-08-24, 18 GitHub topics. Component list, Doc/Span offset semantics, floret vectors, and CLI training commands are from official documentation; no pipeline was trained or benchmarked here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/explosion/spaCy", "date": "2026-09-28", "description": "33,927 stars and last commit 2026-08-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

spaCy is an NLP library built for pipelines rather than demos: a `Language` object chains a tokenizer, a set of trainable components, and a set of processors into one document object that is produced in a single pass. Its components cover morphological analysis and lemmatization, part-of-speech tagging, syntactic dependency parsing, named-entity recognition, and text categorization, plus rule-based functionality such as entity rulers, sentencizers, matchers, and a lemmatizer that can run in table mode with no model. Every component is a `Pipe` with a `__call__` and a `pipe` method, so batch processing streams documents rather than building one at a time, and the outputs are `Doc` and `Span` objects that carry string views and character offsets back to the original text. Model packages bundle a config, a meta file, weights, and a tokenizer, and the CLI covers training, evaluation, packaging, and debugging.

## Why it's in the Arsenal

The recurring decision spaCy resolves is doing deterministic work deterministically. Extracting entities, splitting sentences, or finding a pattern does not need a language model, and routing it through one costs latency, money, and reproducibility for a result that a trained classifier gives in under a millisecond. That reasoning is why these pipelines remain in production under the LLM era: they are the preprocessing layer, and a generative model downstream is strictly better at consuming reliable spans than at re-deriving them. The second recurring decision is throughput with correctness - the Cython core, the `nlp.pipe` batching, and the string-to-span mapping are what let a million-document job finish in an afternoon - and the third is a training story: the CLI turns a labeled dataset into a versioned model package, so the annotator can be improved and re-shipped without touching the caller.

## Architecture

The runtime is a Cython core behind a Python API. Tokenization is rule- and data-driven: text is split by whitespace, affixes, and exceptions loaded from a tokenizer package, and each token records its string, orth, lemma, and character offset, which is what makes every downstream span exact. The `Language` object holds a pipeline of components, each with a name and a mode; a document flows through them in order, and each `Doc` is a shared mutable array of token records plus a `WordC` for the linked list, so annotations are views into one structure rather than copies. The trainable components are small models over sparse or dense features: POS tagging and NER use a linear classifier over hashed n-gram and orthographic features with a `Viterbi` or beam decoder, and the parser is a transition-based parser using a perceptron scorer over dependency-context features, which is why parsing quality is sensitive to the training data's language coverage. Vectors come from a `floret` or static vectors table plus a configurable `MultiHashEmbed` for static vectors or a trainable `Tok2Vec` component with a CNN over contextual features. Config is a nested dataclass loaded from a `config.cfg`, so a model package is self-describing and the CLI can train, evaluate, package, and diff pipelines reproducibly, with a `debug` command that surfaces the component stack and its timings.

## Ecosystem Position

spaCy competes with NLTK and with the classical NLP stack generally, and compared with NLTK it is the production choice: compiled hot paths, batch `pipe` processing, and a model-packaging story rather than teaching-oriented corpora access. It overlaps with the classical machine-learning entry in this batch at the estimator level, but it is a domain-specific stack with its own annotation contracts and offsets rather than a general library, and it is rather than a deep learning framework - the model-definition layer in content/projects/frameworks/ is where you go for contextual encoders. It is an alternative to a per-field LLM call for extraction, and the cost profile is the argument: milliseconds and no tokens versus seconds and per-field spend, at the price of a fixed label set that cannot generalize to a task nobody trained. It complements the document-ingestion entries in content/projects/data-and-retrieval/, which turn files into text that these pipelines annotate, and the retrieval frameworks in that same folder which consume the resulting spans. Where the vector stores in content/projects/data-and-retrieval/ handle embeddings, spaCy handles structure, and the two are frequently combined in the same ingest path.

## Getting Started

Install the library and run the small English pipeline over a batch of texts:

```bash
python3 -m pip install spacy
python3 -m spacy download en_core_web_sm
```

```python
import spacy

nlp = spacy.load("en_core_web_sm")
for doc in nlp.pipe(["Apple released the M3 chip in San Francisco."], batch_size=8):
    for ent in doc.ents:
        print(ent.text, ent.label_, ent.start_char, ent.end_char)
```

Run the same pipeline over texts with `nlp.pipe(texts, batch_size=64)` to get batched throughput, and use the CLI to train a component on your own labels.

## Key Use Cases

1. Redacting or indexing documents: extract person, organization, and location spans with exact character offsets and act on them with a rule rather than a model call.
2. Corpus preprocessing before model training, where consistent sentence splits, lemmas, and POS tags are more valuable than a larger model and no context window can compensate for a noisy pipeline.
3. High-volume classification or extraction behind a form or a webhook, where a small pipeline's per-document latency is what keeps the endpoint responsive.

## Strengths

- Very high throughput with batch processing, so annotation cost stays near zero relative to a generative call on the same volume.
- Exact character offsets and string views on every token and span, which makes annotation usable for slicing, replacing, and auditing rather than only counting.
- A reproducible model lifecycle: a config plus weights plus a tokenizer packages into a versioned artifact that the CLI trains, evaluates, and diffs.
- Rule-based components, so a deterministic pattern or a dictionary can override a statistical prediction where correctness matters more than generalization.

## Limitations

Accuracy on a language without a matching pretrained package degrades sharply, and the components are small models trained on specific corpora, so domain shift - clinical text, legal filings, noisy social posts - requires retraining and the label set will not cover your categories out of the box. Label quality caps everything: a poorly annotated training set produces a confidently wrong pipeline, and there is no amount of architectural improvement that fixes that. Deep contextual NER and parsing still trail a fine-tuned transformer on noisy text, even though spaCy can wrap such a model as a component. The pipeline is a fixed ordered chain, so conditional logic means branching in your own code rather than inside the pipeline. And the ecosystem beyond the core is thinner than the deep learning stack, so state-of-the-art work usually means dropping to the model-definition layer and giving up these offsets.

## Relation to the Arsenal

The classical text-processing layer beneath the LLM work in the Arsenal: the document parsers in content/projects/data-and-retrieval/ produce text, spaCy turns it into reliable spans, and the retrieval and agent frameworks in that folder and in content/projects/agent-systems/ consume those spans. The model-definition layer in content/projects/frameworks/ is the alternative when you need contextual understanding rather than fixed labels, and the tabular entry in this batch is the sibling principle applied to structured data. The pattern-runner entry in this batch is the LLM-native way to do the same extraction tasks, with the opposite cost profile. For storage of the resulting structures, the vector and document stores in content/projects/data-and-retrieval/ are the downstream step, and the OCR entries there are the upstream one for scanned text.

## Resources

- [GitHub — explosion/spaCy](https://github.com/explosion/spaCy)
- [spaCy documentation](https://spacy.io/usage)
- [Trained pipelines and model packages](https://spacy.io/models)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (33,927 stars, last commit 2026-08-24, license MIT, verified via GitHub API on 2026-09-28)*
