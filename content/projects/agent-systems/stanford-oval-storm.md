---
id: stanford-oval-storm
name: "storm"
version_tracked: null
artifact_type: tool
category: agents
subcategory: autonomous
description: "MIT-licensed research system that researches a topic through perspective-guided questioning and writes a cited, Wikipedia-style article"
github_url: "https://github.com/stanford-oval/storm"
license: "MIT"
primary_language: Python
org_or_maintainer: "stanford-oval"
tags: [retrieval, rag, agents]
maturity: beta
cost_model: open-source
github_stars: 31515
github_stars_last_30d: 0
trending_score: 25
last_commit: "2025-09-30"
docs_url: "http://storm.genie.stanford.edu"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, reasoning]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [community-driven]
ecosystem_role:
  - "LLM knowledge-curation system that researches a topic through multi-perspective question asking and writes a cited Wikipedia-style article — the reference for outline-first synthesis."
best_for:
  - "You need a long-form researched report with real citations rather than a summary of whatever the model already knows, and you want the retrieval and writing stages separated so each can be evaluated."
  - "You are studying multi-agent research design, because the topic and outline are handled by distinct role agents and the question generation is perspective-driven rather than a flat list of subqueries."
  - "You are prototyping a research pipeline and want a reference implementation with a real web-retrieval and citation-tracking path you can fork and modify."
avoid_if:
  - "You need a fast factual answer to a simple question, because the pipeline is built for a long article and the multi-stage orchestration is disproportionate to a one-line response."
  - "You need to run without web access, since the system depends on live retrieval and has no offline corpus mode as its main path."
  - "You are maintaining this in production, because the reference implementation is research code whose dependencies and APIs track upstream projects that move quickly."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 31515 stars, MIT license, Python primary language, last commit 2025-09-30 (activity has slowed), 9 GitHub topics including agentic-rag, deep-research, naacl. Four-stage structure, perspective-conditioned question generation, and citation behavior are from the README and the published paper; the pipeline was not executed in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/stanford-oval/storm", "date": "2026-09-28", "description": "31,515 stars and last commit 2025-09-30 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

STORM is a system for writing long, Wikipedia-style articles about a topic by first researching it through simulated interviews. The pipeline has four stages. A topic controller takes the input, usually a Wikipedia page title, and produces an outline of article sections and, within each, the perspectives the article should cover - a software engineer, a historian, and so on, drawn from the topic's own literature. An outline then drives a question generator that, for each perspective, produces the questions that expert would ask, and a research engine answers them by retrieving web pages and summarizing the relevant passages. A writer agent then composes each section from the researched material with inline citations pointing at those pages, and finally a polish pass improves organization, headings, and transitions. The result is a structured article with references rather than a free-form essay, and the intermediate artifacts at each stage are inspectable.

## Why it's in the Arsenal

The recurring decision STORM resolves is the flat-retrieval failure mode. Ask a model to write a report and it will produce a plausible essay from parametric memory with a few retrieved sources tacked on, because there is no intermediate representation forcing coverage. Structuring the work as outline-then-perspective-then-questions changes what is being asked: the model is not asked to write about a topic, it is asked the questions a specific expert would ask, which surfaces the dimensions a generic query misses. The second decision is separating retrieval from composition, so citations come from passages that were actually gathered rather than from the model's memory of a URL, which is what makes the output checkable. The third is inspectability - each stage's artifact is a file you can read, so you can see whether a bad report came from a bad outline, bad questions, or bad retrieval, instead of staring at the final text. It is reference code rather than a product, so the value is in the structure and in how easily you can fork it.

## Architecture

The pipeline is orchestrated by a knowledge curation stage, conventionally shown as a class holding a retrieval client, a language model client, and the configured agent and topic classes, with each stage implemented as a class whose `execute` advances the run. The topic controller uses a language model plus retrieval over Wikipedia to identify the article's audience and the section outline, and applies pre-defined heuristics to decide whether the topic is broad enough to split or narrow enough to keep as one. The question generator then, for each outline bullet, samples the distinct perspectives to simulate and prompts the model, conditioned on the topic and the section, to produce questions that a person in that role would ask - and it also generates questions about missing information and about what different viewpoints would want to know. The research engine is language-model-driven retrieval: it issues search queries, scrapes and parses the returned pages, ranks the passages for relevance to the question, and then summarizes the useful ones, producing a set of reference citations per question. The writer agent receives the outline, the questions, and the summarized references for one section and produces prose with bracketed citations that map back to the gathered URLs, and the polish agent refines structure and readability. Configuration selects the model, the retriever, and the number of perspectives and researchers, and the whole thing emits markdown with a reference list.

## Ecosystem Position

STORM competes with deep-research agents and with general search-augmented generation frameworks, and compared with those it is the most published of a family of outline-first research systems - the closest relatives are other agentic research implementations built on the same premise. It overlaps with the deep-research entry in this batch, which frames the same problem as an agent workflow with tools, and with the retrieval frameworks in content/projects/data-and-retrieval/, which supply the index it retrieves from rather than doing the synthesis. It is an alternative to writing a custom agent loop that searches and writes, and it is rather than a general agent framework - compared with the graph-based orchestration frameworks in content/projects/agent-systems/, the pipeline here is a fixed sequence of four roles with no branching, which is exactly why it is easy to understand and hard to generalize. It complements the vector stores in content/projects/data-and-retrieval/ for grounding over a private corpus, and the evaluation entries in content/projects/evaluation/ are how you would judge whether the citation quality claim holds on your topic.

## Getting Started

Clone the repository, install the package, and run the knowledge curation stage on a topic:

```bash
git clone https://github.com/stanford-oval/storm.git
cd storm
python3 -m pip install -e .
export OPENAI_API_KEY=sk-...
python3 -m knowledge_storm.storm_main --topic "Retrieval-augmented generation" --output_file ./storm_gen_article.md
```

The run writes a full article with citations and keeps the intermediate outline and research artifacts in the working directory.

## Key Use Cases

1. Producing a cited long-form briefing on a topic where the sourcing matters and a parametric-memory summary would not be acceptable.
2. Studying agentic research design: the four-stage role decomposition and perspective-conditioned question generation are the reusable ideas.
3. Forking the pipeline onto a private corpus, swapping the retriever so it queries an internal index rather than the web, which is the common adaptation.

## Strengths

- Outline and perspective stages force coverage before writing, which is what distinguishes the output from a single-pass generate-and-cite summary.
- Citations trace to pages actually retrieved and summarized, so they can be verified rather than trusted.
- Every stage emits an inspectable artifact, so you can attribute a bad result to a bad outline, bad questions, or bad retrieval.
- The clearest published reference implementation of the outline-first research pattern, with the design decisions documented.

## Limitations

It is research reference code, not a service: dependencies move with upstream projects, there is no stability or support commitment, and hardening it for production is on you. Cost and latency are high, because the pipeline issues many retrieval and model calls per section and the question stage multiplies across perspectives, so a full article is an order of magnitude more expensive than a single completion. Output quality tracks the retrieval corpus, and on a topic where the web has little or the pages are paywalled, the citations degrade to whatever the summarizer could salvage. The pipeline is a fixed linear sequence with no revision loop, so a bad section is not revisited, and the language model client is written against a hosted API, which means adapting it to a local model means writing a client and re-tuning prompts. It also assumes English-language Wikipedia as the topic-derivation source, which limits it for other subject areas.

## Relation to the Arsenal

The academic reference for the deep-research entry in this batch, and the clearest statement of the outline-first, perspective-guided approach that production research agents approximate. It depends on the retrieval layer in content/projects/data-and-retrieval/ for corpora and on the model-definition and serving entries for its language-model calls, and it is the natural upstream of the long-form synthesis work in content/projects/agent-systems/. The agent frameworks there offer branching and tools where this offers clarity and citation discipline, so the practical move is to take the design and reimplement it against a graph runtime. The evaluation entries in content/projects/evaluation/ are where you would test whether a different retriever or model actually improves the article.

## Resources

- [GitHub — stanford-oval/storm](https://github.com/stanford-oval/storm)
- [STORM paper on arXiv](https://arxiv.org/abs/2402.14207)
- [Live demo at storm.genie.stanford.edu](https://storm.genie.stanford.edu)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (31,515 stars, last commit 2025-09-30, license MIT, verified via GitHub API on 2026-09-28)*
