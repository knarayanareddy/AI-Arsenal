---
id: opendataloader-project-opendataloader-pdf
name: "opendataloader-pdf"
version_tracked: null
artifact_type: library
category: rag
subcategory: document-processing
description: "Apache-2.0 Java PDF parser producing tagged, structured output for LLM ingestion while also repairing PDFs for accessibility"
github_url: "https://github.com/opendataloader-project/opendataloader-pdf"
license: "Apache-2.0"
primary_language: Java
org_or_maintainer: "opendataloader-project"
tags: [rag]
maturity: production
cost_model: open-source
github_stars: 29391
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://opendataloader.org"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language, vision]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "PDF parser built for AI-ready extraction, producing structured tagged output and repairing PDFs for accessibility rather than only extracting glyphs."
best_for:
  - "You are building a RAG index over a PDF corpus and reading order or table structure is breaking your chunks, so you need a parser that emits tagged structure rather than a flat text stream."
  - "You have a regulatory accessibility obligation, such as the European Accessibility Act, and want one tool that produces both the accessible tagged PDF and the structured text your model consumes."
  - "Your documents are mixed born-digital and scanned, and you want a single pipeline that detects text versus images and routes the image pages through OCR with bounding boxes."
avoid_if:
  - "Your corpus is HTML, Markdown, or office documents rather than PDF, where a different converter in content/projects/data-and-retrieval/ is the direct answer."
  - "You need a Python-only pipeline with no JVM in your environment, because the implementation is Java and you will be shipping or side-loading a runtime."
  - "You need pixel-perfect visual fidelity, since the output is a structural and accessibility representation of a page, not a rendering of what a human would see."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 29391 stars, Apache-2.0 license, Java primary language, last commit 2026-09-28, 18 GitHub topics including a11y, eaa, pdf-ua, tagged-pdf, ocr-recognition. Output formats, the tagging and PDF/UA goal, and the OCR routing are from official docs; the exact CLI flag names may vary by release and were not executed."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/opendataloader-project/opendataloader-pdf", "date": "2026-09-28", "description": "29,391 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

opendataloader-pdf is a PDF processing tool written in Java that does two things with one pipeline. The first is AI-ready extraction: it parses a PDF into structured, tagged output - reading order, paragraphs, headings, lists, tables, and figures with bounding boxes - which is what a retrieval system needs in order to chunk semantically instead of by fixed character windows. The second is accessibility: it produces a tagged PDF conforming to PDF/UA conventions, adding structure, alternative text, and proper reading order, and there is a hosted validation service referenced in the project for checking conformance against the standard. Because the same parsing step serves both goals, repairing a document for screen-reader compliance and extracting it for a model are the same work, and the output formats include JSON, HTML, and Markdown alongside the tagged PDF.

## Why it's in the Arsenal

The recurring decision this project resolves is that a PDF is not a text file. Content streams place glyphs in coordinates; a naive extractor emits fragments in file order rather than reading order, so a two-column paper interleaves its columns, a table becomes a run of numbers, and a caption lands before its figure. Every downstream symptom - a retrieval chunk that crosses a section boundary, an embedding of a half-paragraph, a citation pointing at the wrong span - traces back to that. Emitting a tagged structure tree fixes the extraction and simultaneously produces the artifact an accessibility auditor asks for, which is the unusual argument here: the compliance deliverable and the RAG deliverable are the same file. For a team under a European accessibility obligation, that is not a convenience but a way to fund the engineering with a requirement that already exists.

## Architecture

The implementation is Java, built on a PDF object model that walks the page content stream and the document's structure tree. A tokenizer pass identifies text-showing operators and reconstructs glyph runs into words and lines with their geometric extents, so every extracted element carries a bounding box and a position rather than a bare string. A layout and structure analysis stage then classifies the runs - headings by font size and style against the document's own style inventory, paragraphs by spacing and alignment, lists by markers and indentation, tables by ruled lines and column alignment, and figures by image XObjects - and assembles them into a reading order that respects multi-column regions and page sequence. Text and image are separated at this point: pages whose content is images rather than text are routed to OCR, and recognized text is returned with the same bounding-box and role metadata so downstream chunking treats scanned and born-digital pages identically. The result is emitted as JSON, HTML, and Markdown for consumption, and separately written into a tagged PDF where the structure tree carries the semantics, alternative text is attached to figures, and reading order is declared, which is what a PDF/UA validator checks. Licensing and normalization corrections are applied on the way out, since a conforming tagged PDF requires document metadata and language settings as well as structure.

## Ecosystem Position

opendataloader-pdf competes with the established PDF extraction libraries and with the OCR-first document tools, and compared with those it is distinctive in producing a tagged, conformance-oriented PDF as a primary output rather than treating accessibility as an afterthought. It overlaps with the OCR entries in content/projects/data-and-retrieval/ on the scanned-document path, since it calls recognition for image pages, and it is an alternative to writing a bespoke extractor per document type. It is rather than a general document pipeline: compared with the format-conversion tools in that same folder, this one is specifically about PDF structure, and its differentiator is the accessibility deliverable rather than conversion fidelity. It complements the vector stores and retrieval frameworks in content/projects/data-and-retrieval/ by supplying properly chunked input, and it sits downstream of the OCR layer and upstream of the embeddings stage. The one-line comparison to carry into a decision: choose a plain text extractor when you only need text, and choose this when reading order, tables, or a compliance obligation are in scope.

## Getting Started

Build the JAR and convert a PDF to both tagged PDF and structured Markdown:

```bash
git clone https://github.com/opendataloader-project/opendataloader-pdf.git
cd opendataloader-pdf
mvn -DskipTests clean package
java -jar target/opendataloader-pdf-cli-*-jar-with-dependencies.jar --mode taggedpdf-json --output-dir out sample.pdf
```

The same run writes the tagged PDF and the JSON structure; a hosted validator is available to check the accessibility conformance of the result.

## Key Use Cases

1. RAG over a mixed PDF corpus where two-column papers, tables, and captions are breaking fixed-window chunking, and the structure tree gives you real section boundaries.
2. A European Accessibility Act remediation where the deliverable is a PDF/UA-conformant file and your model ingestion is a benefit of the same run.
3. A scanned-plus-born-digital document set, with image pages routed to OCR and returned with the same role and bounding-box metadata as native text pages.

## Strengths

- Emits a real structure tree with bounding boxes, so chunking follows sections, lists, and tables instead of a fixed character window.
- One run produces both a PDF/UA-oriented tagged PDF and machine-readable JSON, HTML, or Markdown, so compliance and ingestion share a pipeline.
- Handles scanned pages through OCR within the same output schema, so a mixed corpus does not need two downstream code paths.
- Java implementation with a command-line interface and a documented validation path, which makes it scriptable in an existing JVM estate.

## Limitations

Structure inference is a heuristic process, and on documents with unusual layouts - multi-page tables, sidebars, forms, magazines - the roles it assigns can be wrong, which means the tagged output needs review before it is treated as conformant. A fully tagged, conformant PDF is a compliance artifact, not a validated one automatically: the hosted validator is referenced, so a real program still needs an audit step and remediation of what the validator flags. Being Java, it brings a JVM into the pipeline, which is a real deployment cost in a Python-only data stack and usually means a side-car or batch step. Coverage is PDF-specific, so HTML, office documents, and images need other tools. And on very large document collections the pipeline is CPU-bound, so a full-corpus remediation is a scheduling and cost decision rather than a single command.

## Relation to the Arsenal

The PDF ingestion stage of the data-and-retrieval phase, feeding the vector stores, retrieval frameworks, and memory systems in content/projects/data-and-retrieval/ with chunks that respect document structure. The OCR entries in that same folder are the recognition layer it calls for image pages, and the document-conversion tools there are the general-purpose alternative when you only need text. Its structured output is what the embedding and chunking stages downstream actually want, and a correct structure is a prerequisite for the citation quality that the RAG frameworks in that phase are evaluated on. In the agent-systems folder, an agent that reads reports depends on this layer being right; in the evaluation folder, retrieval-quality metrics move when structure is fixed. If a corpus is HTML-first, reach for the crawling and scraping tools instead - this is for the PDF-shaped problem.

## Resources

- [GitHub — opendataloader-project/opendataloader-pdf](https://github.com/opendataloader-project/opendataloader-pdf)
- [Project site and validator](https://opendataloader.org)
- [PDF/UA specification overview from the PDF Association](https://pdfa.org/resource/tagged-pdf-best-practice-guide-syntax/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (29,391 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
