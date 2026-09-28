---
id: data-privacy-stack-presidio
name: "presidio"
version_tracked: null
artifact_type: library
category: tooling
subcategory: libraries
description: "PII detection and redaction framework with NLP and pattern recognizers plus context-aware scoring"
github_url: "https://github.com/data-privacy-stack/presidio"
license: "MIT"
primary_language: Python
org_or_maintainer: "data-privacy-stack"
tags: [security, guardrails]
maturity: production
cost_model: open-source
github_stars: 11074
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-24"
docs_url: "https://presidio.dataprivacystack.org"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "PII detection, redaction, and anonymization framework with pluggable recognizers and context-aware scoring, used as the scrubbing layer before prompts or logs leave the trust boundary."
best_for:
  - "You are sending user text to an external model API and need a scrubbing layer between the raw text and the request, with an auditable list of what was removed."
  - "You are building a data-sharing or red-team workflow over logs and documents and need configurable recognizers rather than a fixed list of built-in entities."
  - "You need GDPR-style anonymisation for a dataset before release and want pseudonymisation with a consistent mapping rather than irreversible masking."
avoid_if:
  - "You need a guarantee of zero leakage, since recall on free-form text is a statistical problem and rare identifier formats will be missed."
  - "Your data is images, where the image redactor exists but the pipeline and entity coverage are much thinner than the text side."
  - "You want to redact at the storage layer by policy, which is a database or DLP problem rather than a text-processing one."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (11074), MIT license, last commit 2026-09-24, Python as primary language and the topic list were API-verified. The AnalyzerEngine and AnonymizerEngine split, PatternRecognizer and ContextAwareEnhancer, operator set, image redactor, and API package come from official docs; recall, performance, and pseudonymisation warnings are engineering judgement about the technique, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/data-privacy-stack/presidio", "date": "2026-09-28", "description": "11,074 stars and last commit 2026-09-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Presidio is a framework for detecting, masking, and anonymising personally identifiable information, organised as an API, an analyser, an anonymiser, and per-format front ends. The AnalyzerEngine runs a list of recognisers over text: a spaCy-based NER recogniser for names, locations, and organisations, plus PatternRecognizer and ContextAwareEnhancer which add regex-defined entities with context words that raise confidence — so a nine-digit number near the word invoice scores differently from one in a random string. The AnonymizerEngine takes the detected spans plus a mapping or operator config and applies an operator per entity: replace, redact, mask, hash, or encrypt, with pseudonymisation available where a stable reversible mapping is required. An image redactor detects text and faces in images and inpaints. The API package exposes a REST service so detection can be called independently of a model pipeline, and the whole recogniser list is configuration, so an organisation adds its own internal identifier formats rather than waiting for upstream support.

## Why it's in the Arsenal

The recurring decision is where the PII check lives in an LLM pipeline. The usual position is nowhere — raw user text goes into a prompt, the response is logged, and the compliance question is answered by policy. Presidio makes the scrubbing layer a component with a defined position: text in, spans out, and an anonymised string onward, with the detected entities returned as structured results so a pipeline can log exactly what it removed rather than asserting that it removed something. The second decision is coverage: built-in entity lists never include an organisation's internal account numbers, case IDs, or licence keys, and a configurable recogniser list is what closes that gap without a fork.

## Architecture

Analysis is a pipeline over a request holding text, language, and score threshold. The AnalyzerEngine first runs its NLP engine — by default a spaCy model — producing candidate entities with positions and confidence, then runs the pattern recognisers, each a named entity type with a regex and a list of context words with their context score. The ContextAwareEnhancer takes the NLP candidates, looks at words near each match, and raises or lowers the score accordingly, so a sequence resembling a phone number gets a different confidence depending on whether the surrounding text supports it. Results above the threshold are returned as recognizer result objects carrying entity type, start, end, and score, with overlapping spans resolved. Anonymisation then consumes those results: the AnonymizerEngine looks up an operator per entity type, computes the replacement for each span, and rewrites the text — replace with a placeholder, redact with asterisks, mask preserving length format, hash for pseudonymisation, or encrypt with a key for reversibility. The REST API package wraps the same engines as a service, and the image redactor runs detection over a frame and inpaints the regions.

## Ecosystem Position

Presidio competes with regex-and-hash approaches built in-house and with cloud DLP and PII-detection APIs from the major providers, which usually win on coverage of rare formats and managed accuracy at a per-call cost. It overlaps with scrubadub, a lighter pure-pattern library without context scoring, and with the de-identification tooling inside spacy-transformers, where the NER model is the piece Presidio wraps. Compared with cloud DLP, Presidio is a self-hosted, free, inspectable component whose accuracy is exactly as good as its recogniser list, which is the honest framing. It is a complement rather than a replacement for a data-loss-prevention system: this scrubs text on its way to a model, it does not enforce policy across a data estate, and the RAG entries in the same folder need it applied at ingestion rather than at query time.

## Getting Started

Add the analyser and anonymiser and redact a string before it leaves your process:

```bash
pip install presidio-analyzer presidio-anonymizer
```

```python
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

text = "Contact Jane Doe at jane.doe@example.com or 415-555-0199."
analyzer = AnalyzerEngine()
results = analyzer.analyze(text=text, language="en")
print([(r.entity_type, r.start, r.end, round(r.score, 2)) for r in results])

engine = AnonymizerEngine()
print(engine.anonymize(text=text, analyzer_results=results).text)
```

Add your own identifier format with `PatternRecognizer(supported_entity="internal_case_id", pattern=..., context=["case", "ticket"])` rather than forking the library.

## Key Use Cases

1. Scrubbing user messages before they are sent to a hosted model API, logging the detected entity types as an audit record of what left the boundary.
2. De-identifying a support or clinical dataset before release, using hash or encrypt operators to keep joinability without keeping identity.
3. Adding organisation-specific recognisers — internal account numbers, case IDs, licence keys — as configuration, so coverage matches the data you actually hold.

## Strengths

- Configurable recogniser list, so entity coverage is a configuration decision rather than an upstream feature request or a fork.
- Context-aware scoring reduces false positives on ambiguous numeric patterns instead of treating every regex hit as a detection.
- Multiple anonymisation operators including stable pseudonymisation, so a redacted dataset can still be joined or reproduced.
- The API package lets detection be a separate service, which is what makes an audit of what was removed tractable.
  

## Limitations

Recall is bounded by the spaCy model and the recogniser list, so free-form text with unusual identifier formats will produce misses; there is no recall guarantee, only a confidence score you have to threshold, and a wrong threshold trades false positives for leaks. The default NLP model is English-centric, so other languages need a different spaCy pipeline. Performance is a real concern: pattern and context evaluation over large documents is the bottleneck when you are scrubbing at ingestion across a big corpus, and the image redactor is far less mature than the text path. Hash-based pseudonymisation is trivially reversible for low-entropy values, so it is a weak privacy control against a determined attacker, and the framework does nothing about PII already stored in model weights, embeddings, or a vector index.

## Relation to the Arsenal

This is the privacy layer in content/projects/frameworks, and it is the step that has to run before anything in content/projects/data-and-retrieval ingests user text into an index or a dataset. In practice it sits in front of the RAG entries — chroma, qdrant, and the retrieval frameworks all index whatever you give them, including the sensitive parts. The langfuse and opik entries in the observability fold are the other place it applies, since traces capture prompt and completion text. Where it is not sufficient is enforcement across a data estate, which is a DLP problem, and cleanlab is the different problem of finding and fixing mislabelled training data rather than removing personal data.

## Resources

- [Presidio documentation](https://microsoft.github.io/presidio/)
- [Presidio GitHub organization and repos](https://github.com/microsoft/presidio)
- [Presidio Analyzer API reference](https://microsoft.github.io/presidio/analyzer/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (11,074 stars, last commit 2026-09-24, license MIT, verified via GitHub API on 2026-09-28)*
