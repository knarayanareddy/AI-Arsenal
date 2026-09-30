---
id: gpt-researcher
name: "GPT Researcher"
version_tracked: null
artifact_type: framework
category: agents
subcategory: autonomous
description: "Autonomous research agent that plans questions, fans out parallel scrapers, and publishes a cited report from web or local sources"
github_url: "https://github.com/assafelovic/gpt-researcher"
license: Apache-2.0
primary_language: Python
org_or_maintainer: "Assaf Elovic / community"
tags: [agents, retrieval]
maturity: production
cost_model: open-source
github_stars: 29710
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-26"
docs_url: "https://docs.gptr.dev"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [community-driven, actively-maintained]
ecosystem_role:
  - "The reference open-source implementation of 'deep research': a planner-executor architecture that decomposes a question into parallel search queries, scrapes and filters sources, and synthesizes a long-form cited report — predating and paralleling the commercial deep-research products."
best_for: ["You are a consultant or analyst who needs a cited market or competitive brief in minutes rather than a week of manual searching, and can tolerate the agent's missteps.", "You are building a research feature and you need the planner, executor and publisher roles as a working reference rather than a design sketch.", "You want to hand the whole research capability to an LLM agent inside Claude via a skill, because the README documents installing it as a Claude Skill with a single npx command."]
avoid_if: ["You need a citation you can defend without checking it, because the agent composes findings from retrieved pages and the README does not claim any guarantee of source accuracy.", "You are on a metered research API budget and want predictable cost, because the parallelised execution design is explicitly about increased speed and work is multiplied across concurrent agents.", "You need to run entirely on internal documents with no outbound access, because the default path scrapes the live web and local research is a separate configured mode you must set up."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: [langgraph]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (28,151), primary language, license, and last commit (2026-07-05) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/assafelovic/gpt-researcher", "date": "2026-07-08", "description": "28,151 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

GPT Researcher is an autonomous agent for deep research on any topic using any LLM provider, producing detailed reports with citations. Its architecture is explicitly a three-role pipeline: a planner generates research questions, execution agents gather relevant information for those questions, and a publisher aggregates everything into a single report. The design is described as inspired by the Plan-and-Solve and RAG papers, and parallelised agent work is the stated answer to slowness, so several executors run at once. The README frames the problem set it targets directly: weeks of manual research, LLMs trained on stale information, token limits on long reports, thin web sources, and selective sources introducing bias. Distribution is unusually broad, with a PyPI package, a Docker image, Colab notebook, docs site and a Claude Skill install.

## Why it's in the Arsenal

The recurring engineering decision is whether research should be a single prompt or a pipeline. GPT Researcher takes the pipeline side and names the roles, which means you can reason about where a bad output came from: a bad plan, a bad scrape, or a bad synthesis. It also answers the long-report problem that single-shot prompting cannot, because the publisher assembles findings iteratively rather than asking one context window to produce a whole deliverable. The parallel executor is the cost-side answer: breadth per unit of wall-clock time goes up, and so does the number of paid model calls.

## Architecture

The planner consumes the user's query and emits a set of sub-questions, which is the plan-and-solve step. Each question is dispatched to an execution agent that retrieves and reads source material, with the README stating these run in parallel to increase speed and provide stable performance; a retriever layer sits between the executor and the sources, with local document research supported alongside web scraping. Collected findings pass to a publisher that deduplicates, organises and writes them into a report carrying citations back to sources. Packaging is Python-first on PyPI with a published Docker image, and the whole thing can be embedded as a library, run as a service, or handed to Claude as a Skill so the research loop is available inside a chat rather than a separate app.

## Ecosystem Position

GPT Researcher competes directly in the deep-research-agent category with Open Deep Research, DeepResearcher and the search-augmented report generators, and it overlaps with the browser-automation entries in content/projects/agent-systems because both end up driving a scraper. Where a pure search-RAG framework stops at answering a question, GPT Researcher's differentiator is the long report with citations and the explicit planner/executor/publisher decomposition, which makes it a reference implementation rather than a library you would wrap. Compared with a general agent framework in content/projects/framework, it is opinionated and narrow: no tools, no state machine, just a research pipeline you can fork. It complements the retrieval-phase entries in content/projects/data-and-retrieval, which supply the index it reads from when you point it at local documents instead of the web.

## Getting Started

Install from PyPI, then run the package locally and pass a query; a Docker image is published if you prefer a container:

```bash
pip install gpt-researcher
python -m gpt_researcher --query "what is the current state of solid state battery manufacturing"
```

To make the same capability available inside Claude as a research skill instead of a separate process:

```bash
npx skills add assafelovic/gpt-researcher
```

Set a provider API key for the LLM and a search or scraping backend before the first run; the docs site covers provider configuration in detail.

## Key Use Cases

1. Competitive and market briefs: give it a company or technology and receive a multi-page report with citations you can skim and then verify selectively.
2. Literature and technical surveys: point it at a set of local papers or docs instead of the web so the executor reads your corpus and the publisher writes the synthesis.
3. Embedded research features: import the package into an application so users get a research task, a progress view and a cited deliverable inside your own product.

## Strengths

- Explicit planner, executor and publisher roles, which makes the pipeline inspectable and each stage independently replaceable.
- Parallelised execution agents, trading more model calls for materially faster reports on the same query.
- Provider-agnostic by design, so the model behind the plan and the synthesis is your choice rather than a hard-wired default.
- Very wide distribution surface: PyPI, Docker, Colab, docs and a Claude Skill, so it drops into almost any environment you already have.

## Limitations

Cost scales with breadth: the parallel executor design that makes it fast is also the reason a single report can consume a surprising number of model calls, and the provider-agnostic design means there is no built-in ceiling unless you add one. Reliability is inherited from the web, so pages that paywall, redirect, rate-limit or render client-side will degrade the source pool silently, and the README argues about bias and misinformation without claiming any guarantee that citations resolve. Scraping at this volume is a posture you have to own operationally, including robots compliance and provider terms, and running many executors concurrently is exactly the traffic pattern that gets blocked. Benchmarks and accuracy figures are not published in the README, so output quality has to be judged on your own queries.

## Relation to the Arsenal

This is the research-agent entry for content/projects/agent-systems and the natural counterpart to the browser-automation and retrieval entries in the same phase: it drives a scraper and reads an index rather than owning either. Pair it with the agent frameworks in content/projects/framework when you need the research loop inside a larger multi-agent system, and with content/projects/data-and-retrieval for the local-document mode. Where the orchestration entries schedule repeatable work, GPT Researcher answers one question per run, so the batch-oriented tools are the wrong shape for it. Inference cost for its plan-and-synthesise calls lands on whatever backend you configure in content/projects/inference-engines.

## Resources

- [GitHub — assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)
- [Documentation — docs.gptr.dev](https://docs.gptr.dev)
- [Docker image on Docker Hub](https://hub.docker.com/r/gptresearcher/gpt-researcher)
