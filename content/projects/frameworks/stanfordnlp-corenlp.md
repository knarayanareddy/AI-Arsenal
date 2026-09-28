---
id: stanfordnlp-corenlp
name: "CoreNLP"
version_tracked: null
artifact_type: library
category: tooling
subcategory: libraries
description: "Java NLP suite of tokenizers, parsers, and annotators behind a stable pipeline API"
github_url: "https://github.com/stanfordnlp/CoreNLP"
license: "GPL-3.0"
primary_language: Java
org_or_maintainer: "stanfordnlp"
tags: [data]
maturity: production
cost_model: open-source
github_stars: 10122
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-28"
docs_url: "http://stanfordnlp.github.io/CoreNLP/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Java NLP suite of tokenizers, parsers, and annotators that is still a dependency of many JVM production pipelines because its annotator contracts are stable."
best_for:
  - "You are on the JVM and need constituency and dependency parsing, NER, or coreference in a service where adding a Python service would be worse than the model cost."
  - "You are extending an existing pipeline that already produces CoreNLP-style annotations, and you need the same tokenisation and POS format to keep downstream code working."
  - "You need morphological analysis or a parser for a language where the available mainstream tooling is thinner than for English."
avoid_if:
  - "You are a new Python-first project, where spaCy or stanza give better documentation, faster iteration, and more maintained tooling for the same annotations."
  - "You need GPU-accelerated transformer inference, since the neural components run on CPU through TensorFlow Lite in-process."
  - "Your organisation forbids GPL-3.0 in the dependency tree, which is a real constraint in many commercial products."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (10122), GPL-3.0 license, last commit 2026-09-28, Java as primary language and the topic list were API-verified. Annotator list, pipeline construction, token and POS stability, the TensorFlow Lite neural components, and the stanza relationship come from official docs and repo history; the CPU-only latency and licence-constraint warnings are documented behaviour and engineering judgement."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/stanfordnlp/CoreNLP", "date": "2026-09-28", "description": "10,122 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

CoreNLP is a Java pipeline of annotators, and the pipeline itself is the API: you declare which annotators — tokenize, ssplit, pos, lemma, ner, depparse, parse, coref, sentiment — are needed, and the returned object exposes them as chained getters for tokens, sentences, a tree, entities, and coreference chains. A pipeline can be built once, serialised, and run in a long-lived server process, which is how it is used in production: an Annotation object in, an Annotation out, with the pipeline and its models resident. Annotators compose by consuming earlier ones, so the tokeniser's output feeds POS, the POS tags feed the parser, and the parser feeds coreference. The suite includes the Stanford Parser and the shift-reduce neural dependency parser, a tokeniser with language-specific rules and a treebank mode, a maximum-entropy tagger, named entity models, Morpha for morphology, a sentiment model, and several coreference resolvers. The Python stanza library re-exports the same models over a Java server, and there is a REST API and command-line interface for everything else.

## Why it's in the Arsenal

The recurring decision is whether one annotation format is worth standardising on across a codebase. Text processing code rots through format drift: a tokeniser that splits differently, a POS tag set that changes, a coreference output keyed by sentence index rather than token, and every downstream rule needs a shim. CoreNLP has been stable long enough that the format is effectively a fixed point — pipelines written against its output a decade ago still run. On the JVM that stability, plus the ability to keep the whole thing in-process with no service boundary, is the deciding factor, and it is why the library survives in dependency graphs of pipelines nobody chose it for and nobody has the budget to migrate off it.

## Architecture

A pipeline is a directed acyclic graph of annotators, and building one constructs the objects and wires each annotator's output as the next one's input. Annotate creates an Annotation, sets the document text, and calls each annotator in dependency order, each mutating the shared Annotation in place with its own key. The tokeniser is language-specific and rule-based with a mode selector for treebank conventions, splitting text into sentences and tokens with position offsets. The POS tagger is a maximum-entropy classifier over a richer lexical feature space, and Morpha supplies morphological analysis, a lemma, and a stem. The constituency parser builds a shifted-reduce or PCFG parse, and the neural dependency parser produces a projective dependency tree; both attach to the tokens so downstream annotation is by token index. NER models are token classifiers with a token-shape and gazetteer feature set, and coreference runs sequence-labelling stages followed by a statistical or deterministic clustering of mentions into chains. The neural components execute through TensorFlow Lite inside the JVM process. The Python interface starts a Java server and calls the same pipeline over a socket, so annotation runs in a subprocess rather than a different process entirely.

## Ecosystem Position

CoreNLP is the long-standing JVM NLP suite and the direct predecessor of stanza, so within Stanford NLP it competes with its own successor: stanza is the modern client with better documentation and a pip install, while CoreNLP is the older in-process server API. It overlaps with OpenNLP, which is also Java and more focused on classification and tagging, and with Lucene's analyzers for tokenization only. Against spaCy it loses on Python ergonomics and modern tooling while keeping an advantage for pure-JVM services and for its parser coverage across many languages. It is a complement rather than a replacement for a modern LLM-based extraction pipeline — its value is deterministic, cheap, CPU-only structural analysis that needs no model API call. Compared with a transformer-based pipeline it is far cheaper and far less accurate on semantics, which is the trade the licence and the language coverage make acceptable.

## Getting Started

Build a server pipeline and query it over HTTP:

```bash
git clone https://github.com/stanfordnlp/CoreNLP
cd CoreNLP && mvn compile
java -mx4g -cp "target/*:" edu.stanford.nlp.pipeline.StanfordCoreNLPServer \
    -port 9000 -timeout 30000 -annotators tokenize,ssplit,pos,lemma,depparse,ner
```

```bash
curl -X POST --data 'My name is Barack Obama and I live in Hawaii.' \
  'http://localhost:9000/?properties={"annotators":"tokenize,ssplit,pos,depparse,ner","outputFormat":"json"}'
```

From Java, build the pipeline once and reuse it for every request:

```java
Properties props = new Properties();
props.setProperty("annotators", "tokenize,ssplit,pos,lemma,depparse,ner");
StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
Annotation doc = new Annotation(text);
pipeline.annotate(doc);
System.out.println(doc.get("sentences").get(0).get("ner").get(0));
```

From Python, use stanza, which starts the same models over a server and hands you more usable objects.

## Key Use Cases

1. A JVM service that needs parsing, NER, or lemmatisation in-process, where adding a Python sidecar would be a larger architectural cost than the model itself.
2. Maintaining an existing annotation pipeline whose downstream rules depend on the CoreNLP token and POS format, where a migration would touch a lot of code for little gain.
3. Structural preprocessing for a downstream system — chunking, parse trees for relation extraction, coreference for entity linking — where deterministic cheap analysis is the right first stage.

## Strengths

- Extremely stable annotation format, so pipelines built on it keep running across library versions, which is unusual in NLP tooling.
- One in-process pipeline covering tokenisation, tagging, morphology, parsing, NER, coreference, and sentiment under a single API.
- CPU-only and deterministic, with no GPU requirement and reproducible output for the same input and model versions.
- Language coverage for tagging, parsing, and tokenisation well beyond English, in a uniform annotation format.
  

## Limitations

The GPL-3.0 licence is a genuine constraint in many commercial products, and the model licences have their own terms, so legal review is not optional. The neural components run on CPU through TensorFlow Lite, so inference is slow on long documents and there is no GPU path to speed it up. As a research library it is effectively in maintenance mode: stanza is the forward-looking client, and improvements to English NLP land elsewhere first. Memory footprint per pipeline with many annotators is large, so loading several pipelines in one process needs care. And for anything semantics-heavy, an LLM-based or transformer-based approach will be more accurate — the library's remaining strength is deterministic structure at low cost, not understanding.

## Relation to the Arsenal

This is the Java NLP entry in content/projects/frameworks, and the useful reading order is against stanza, its own successor, plus spaCy as the modern Python equivalent. In content/projects/data-and-retrieval, its chunking, tokenisation, and NER are the preprocessing steps that a document pipeline like docling or unstructured may replace, and the vector entries downstream only need text and offsets, which is what this supplies. For the modern alternative, the LLM extraction path is covered by the agent-framework entries; for licensing-constrained situations, the onnx and onnxruntime entries in content/projects/inference-engines are where a permissive-licence model would be deployed instead. Stanza is the same models with a better client, which is why the migration path is not a rewrite.

## Resources

- [CoreNLP documentation and pipeline reference](https://stanfordnlp.github.io/CoreNLP/)
- [CoreNLP GitHub repository](https://github.com/stanfordnlp/CoreNLP)
- [Stanza, the modern successor client](https://github.com/stanfordnlp/stanza)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (10,122 stars, last commit 2026-09-28, license GPL-3.0, verified via GitHub API on 2026-09-28)*
