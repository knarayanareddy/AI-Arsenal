---
id: graphify
name: "Graphify"
type: tool
job: [memory-management]
description: "Agent skill and CLI that maps a codebase into a queryable knowledge graph instead of a vector index"
url: "https://graphify.com"
cost_model: open-source
pricing_detail: "Apache-2.0 CLI and skill; optional Graphify Cloud subscription with a 14-day trial"
tags: [retrieval, code-gen, agents]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "The local CLI is free and unlimited; cloud features are the paid tier"
self_hostable: true
open_source: true
source_url: "https://github.com/Graphify-Labs/graphify"
docs_url: "https://docs.graphify.com"
github_url: "https://github.com/Graphify-Labs/graphify"
alternatives: [codebase-memory-mcp, repomix]
integrates_with: [claude-code]
added_date: "2026-10-24"
last_reviewed: "2026-10-24"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "An agent keeps grepping the same repository: build the graph once and let it traverse structure — call sites, module boundaries, docs-to-code links — instead of re-reading files per question"
  - "You want code understanding to stay local and deterministic: the code path is tree-sitter AST parsing with no LLM and no embeddings, so nothing leaves the machine and the same input yields the same graph"
  - "You need to see why a connection exists — every edge is tagged EXTRACTED or INFERRED, which is the audit trail a vector index cannot give you"
avoid_when:
  - "You need low-latency nearest-neighbour retrieval at query time over millions of chunks; this is a graph you traverse, not an index you search by similarity"
  - "Your corpus is mostly PDFs, slides or video and you cannot send it to a model: the semantic pass for non-code material uses your assistant's model or a configured API key"
  - "You want a maintained, low-churn dependency — the project is months old with a four-figure open-issue count, so treat the graph format and the skill interface as moving"
version_tracked: null
enrichment_status: reviewed
enrichment_notes: "Stars (134,381), forks (12,834), open issues (1,615), licence (Apache-2.0), primary language (Python), contributors (100) and last push (2026-10-23) verified via the GitHub API on 2026-10-24 for a repository created 2026-04-03. Install commands, the tree-sitter/EXTRACTED-INFERRED claims and the cloud/store split come from the README; no hands-on run."
verdict: watching
verdict_rationale: "A different retrieval shape for code — deterministic AST graph with explained edges, local by default — but young, high-churn, and the hosted cloud is where the company's roadmap points"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Graphify-Labs/graphify", "date": "2026-10-24", "description": "134,381 stars and 12,834 forks by 2026-10-24 (GitHub API); Y Combinator S26 company"}]
---

## Overview

Graphify maps a repository — code, docs, SQL schemas, configuration, PDFs and images — into a knowledge graph that an agent queries instead of grepping through files. It ships as a Python CLI and an assistant skill: run `/graphify .` in a coding assistant and it registers the skill, parses the codebase, and writes an interactive `graph.html` plus the graph artifact the assistant traverses afterwards. The design point is that code maps deterministically and locally, while non-code material gets an optional semantic pass through a model.

## Why It's in the Arsenal

The catalogue's code-context tools mostly compress files into a prompt (`repomix`) or index chunks for similarity search (`codebase-memory-mcp`). Graphify is the third shape: a structural graph where an edge means a parsed relationship — an import, a call, a schema reference — rather than a cosine score, and where each edge records whether it was extracted from the source or inferred. That distinction decides the engineering question of whether an agent's claim about your codebase can be traced back to a fact or only to a resemblance.

## Key Features

- Tree-sitter AST parsing for code: deterministic, no LLM, no network, no embeddings
- Every edge tagged `EXTRACTED` (explicit in the source) or `INFERRED` (resolved by graphify)
- Traversal queries: explain a concept, trace the path between two nodes, or ask a question over the graph
- Optional semantic pass for docs, PDFs, images and video, using the assistant's model or a configured API key
- Standalone `graph.html` export with detected communities for browsing

## Architecture / How It Works

Code files are parsed to syntax trees, and the extractor emits nodes for modules, symbols and files with edges for the relationships the grammar can prove. The semantic path is separate: non-code documents are chunked and passed to a model to propose concepts and links, which is why those edges land as `INFERRED` rather than `EXTRACTED`. The result is serialised as a graph artifact that the skill loads per session; there is no vector store and no embedding model in the loop, so a query is a traversal over adjacency rather than an approximate nearest-neighbour search.

## Getting Started

```bash
uv tool install graphifyy     # or: pipx install graphifyy
graphify install              # detects the assistant and registers the skill
```

Then, inside the assistant, point it at a repository:

```text
/graphify .
```

Python 3.10+ and `uv` (or `pipx`) are the prerequisites; the CLI writes the graph and an interactive `graph.html` you can open to inspect communities and edges.

## Use Cases

1. **Onboarding an agent to a large repository**: build the graph once, then ask structural questions — where a symbol is defined, what calls into a module, how a table is touched — without the agent re-reading files on every turn.
2. **Reviewing a cross-file change**: trace the path from a modified function to its callers and to the schema it writes, which is the check a diff view does not give you.
3. **Auditing what an assistant "knows"**: because edges are labelled, you can separate claims read directly from the source from ones the semantic pass inferred, and review the inferred set before trusting it.

## Strengths

- The deterministic code path is the differentiator: no model call, no token spend and no non-reproducibility for the part that matters most in code navigation.
- Edge provenance (`EXTRACTED` vs `INFERRED`) is the feature an engineer needs to review automated code understanding, and it is designed in rather than bolted on.
- Local-first: the graph is a file in your workspace, and the free path never sends code to a service.
- Drop-in for the assistants teams already use — the install step registers a skill rather than requiring a new IDE or chat product.

## Limitations / When NOT to Use

- It is a young project with a large backlog: 1,615 open issues and a repository created in April 2026 mean the graph format and skill contract should be expected to change.
- Non-code material is not local unless you run a local model: the semantic pass calls your assistant's model or a configured API key, so PDFs and images cross that boundary.
- The graph is a snapshot: it has to be regenerated as the repository changes, and nothing in the CLI keeps it continuously in sync — that is the hosted product's job.
- Graph traversal is not similarity search; if the question is "find chunks semantically close to this one", an embedding index is the right tool and this is not.
- The company's commercial interest is Graphify Cloud (monorepo and cross-repo graphs, connectors, formal verification), so the local tool's roadmap should be read with that in mind.

## Integration Patterns

- *Wiring*: `graphify install` registers the skill with a supported assistant, after which `/graphify <path>` builds the graph and later turns read it; the artifact lives with the project rather than in a service.
- *Alternatives*: `repomix` packs a repository into one prompt for a one-shot read; `codebase-memory-mcp` exposes an MCP server with an embedding-backed store. Choose by the question — whole-repo summary, similarity recall, or structural traversal.
- *CI use*: regenerate the graph on merge and diff the node and edge counts to catch a module that grew unexpectedly, the same way a bundle-size check works.
- *Before production*: pin the CLI version, keep the graph artifact out of the deploy path, and treat the assistant's inferred edges as reviewable claims rather than ground truth.

## Resources

- [GitHub repository](https://github.com/Graphify-Labs/graphify)
- [Documentation](https://docs.graphify.com)
- [Website](https://graphify.com)
- [PyPI package](https://pypi.org/project/graphifyy/)

## Buzz & Reception

- 134,381 stars and 12,834 forks as of 2026-10-24 (GitHub API), on a repository created 2026-04-03 — growth driven by the "query instead of grepping" pitch and the skill distribution model.
- Backed by Graphify Labs (Y Combinator S26), with the hosted Graphify Cloud as the commercial product.
