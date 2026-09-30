---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "Marker-Inc-Korea"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: autorag
name: "AutoRAG"
artifact_type: framework
category: rag
subcategory: advanced-rag
description: "AutoRAG 2.0 self-evolving librarian agent that searches across retrieval methods, opens sources to verify, and curates cited answers"
github_url: "https://github.com/Marker-Inc-Korea/AutoRAG"
license: NOASSERTION
primary_language: TypeScript
tags: [rag, agents, retrieval]
maturity: beta
cost_model: open-source
github_stars: 5111
last_commit: "2026-09-28"
docs_url: "https://marker-inc-korea.github.io/AutoRAG/"
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "study-and-reference"
health_signals:
  - "community-driven"
  - "research-origin"
ecosystem_role:
  - "RAG pipeline optimizer that complements retrieval libraries and competes with manual benchmark-and-tune workflows"
best_for: ["You are frustrated by search tools that return file paths and matching lines and force the reader to open files and synthesise an answer by hand.", "You want answers that cite specific documents, pages or line ranges, because the agent opens sources directly to verify ground truth before curating the result.", "You are running the older Python AutoRAG and need to know it still ships, because the repository keeps it in a legacy directory in maintenance mode with PyPI releases."]
avoid_if: ["You need the RAG AutoML tool that searched pipeline configurations, because new feature development is focused on AutoRAG Agent 2.0 and the Python version is in maintenance mode.", "You want a pure library to embed in a service, because this is an agent built on the Pi framework with its own answer-curation behaviour rather than a retrieval component.", "You need a stable production contract, because the 2.0 line is explicitly the active development target and the older tool's interface is frozen."]
enrichment_notes: "Default-branch last commit is 2026-04-03; do not mark actively-maintained. AutoML results depend on benchmark data and model/provider costs. Draft pending review."
---

## Overview

AutoRAG is now two things in one repository. AutoRAG Agent 2.0 is a self-evolving librarian agent built on the Pi agent framework: a single configured model searches across multiple retrieval methods, opens source documents directly through bash to verify ground truth, and curates the results into clean numbered knowledge units with citations, rather than leaving you with a list of paths and matching lines to synthesise yourself. The README's worked example shows the shape of the output, with each numbered point carrying its source, a contract change answered with a page reference and a Slack chunk path, and an SLA answer citing a specific line range. The original Python AutoRAG, an autoML tool for finding an optimal RAG pipeline for your data, still lives in the legacy directory, is explicitly not abandoned, continues to receive bug fixes, dependency updates and PyPI releases in maintenance mode, and keeps its documentation in a separate legacy README.

## Why it's in the Arsenal

The decision it addresses is the gap between retrieval that finds text and research that answers a question. Search-shaped tools return paths and matching lines, which pushes the synthesis work back onto the person who asked, and for a document-heavy question that synthesis is most of the effort. AutoRAG Agent inverts that: the agent opens the sources, checks that the text actually supports the claim, and returns numbered points with pointers to the page, file or line range. Searching across multiple retrieval methods rather than one is the other half of the idea, since the right search tool is a property of the corpus rather than a fixed choice, and the legacy AutoRAG existed to make that choice empirically.

## Architecture

The 2.0 agent sits on the Pi agent framework and is given a configured model plus access to a corpus. Its loop is retrieval-broad then verification-specific: it queries several retrieval methods, receives candidate matches, and then uses bash to open the underlying documents directly, so the text it reasons over is the source rather than a snippet a search index produced. Findings are then curated into numbered knowledge units where each point carries its provenance, such as a PDF page, a file path or a line range, which makes the answer auditable against the corpus. Because it is a self-evolving agent rather than a fixed pipeline, the shape of the search step can change over time, and the three core values the README states drive the design. The legacy Python project is architecturally separate: it is a pipeline search and evaluation tool that scores RAG configurations against your data, kept in maintenance mode with its own README and PyPI line.

## Ecosystem Position

AutoRAG Agent competes with the deep-research agents in content/projects/agent-systems that also open sources to produce cited answers, and the differentiator is scope: it is a librarian over one corpus rather than a web researcher, with the verification-by-opening step as its defining move. It overlaps with the retrieval-phase entries in content/projects/data-and-retrieval, especially the graph-based and hybrid ones, since searching across multiple retrieval methods means composing several index strategies rather than picking one. The legacy AutoRAG is an alternative to the retrieval frameworks in content/projects/framework, because it searches pipeline configurations against your data instead of asking you to configure one. Against LightRAG specifically, both build derived knowledge structures over a corpus, so the interesting question is whether you want an agent that reads sources or an index you query directly.

## Getting Started

AutoRAG Agent 2.0 is the active line and installs from its own package, while the legacy tool keeps its PyPI release path:

```bash
# legacy Python AutoRAG, still published to PyPI in maintenance mode
pip install AutoRAG
```

```bash
# AutoRAG Agent 2.0
npm install -g @auto-rag/agent
auto-rag --help
```

Point the agent at a corpus directory and a configured model, then ask a question and read the numbered cited answer. The legacy README in the legacy directory documents the autoML workflow for anyone still using the pipeline search tool.

## Key Use Cases

1. Verified document answers: ask a question about a contract or policy set and get numbered claims each tied to a page or line range you can check.
2. Corpus question answering where search is insufficient: use it when search returns paths and snippets and you need a synthesised, cited answer instead.
3. Pipeline configuration research: keep using the legacy autoML tool to search RAG pipeline configurations against your own data and evaluation criteria.

## Strengths

- Verification by opening sources rather than trusting snippets, which is what makes a cited answer auditable.
- Searches across multiple retrieval methods with one configured model, so the retrieval strategy is not fixed at index time.
- Answers are curated into numbered knowledge units with precise provenance such as page or line range rather than prose with a link.
 - Legacy AutoRAG is explicitly maintained in place, so existing users are not abandoned during the 2.0 transition.

## Limitations

The repository contains two products with different architectures, and the README is explicit that new feature work targets the 2.0 agent while the Python tool gets fixes only, so anyone reading the project has to first work out which one they are adopting. Opening source documents through bash to verify claims means real tool execution per answer, which costs time and requires a corpus the agent can actually reach as files. Curating verified findings into a synthesised answer depends on the configured model, so quality is bounded by it and the multi-method search costs more than a single-index retriever. The 2.0 line is the newest surface with the thinnest documentation of the ecosystem's long-lived tools, and a self-evolving agent whose search step can change is harder to regression-test than a fixed pipeline, which is exactly what the legacy autoML tool was for.

## Relation to the Arsenal

This belongs in content/projects/data-and-retrieval as the agent-shaped answer to a retrieval problem, and it is worth reading beside the graph-based retrieval entries in the same phase to decide between an index you query and an agent that reads. Its foundation-model dependency lands on content/projects/foundation-models or a served model from content/projects/inference-engines, which is the practical half of the cost. The legacy autoML tool is a genuine alternative to the retrieval frameworks in content/projects/framework for teams that would rather search configurations than hand-build one. If you need a plain retriever with a stable interface, the vector database entries are the better fit and this is the wrong shape.

## Resources

- [GitHub — Marker-Inc-Korea/AutoRAG](https://github.com/Marker-Inc-Korea/AutoRAG)
- [AutoRAG Agent documentation](https://marker-inc-korea.github.io/AutoRAG/)
- [Legacy Python AutoRAG README](https://github.com/Marker-Inc-Korea/AutoRAG/blob/main/legacy/README.md)
