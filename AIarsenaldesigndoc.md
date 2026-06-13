# 📐 AI Arsenal — Master Design Document
### Version 1.0 | Classification: Foundation Architecture | Status: Authoritative

---

## 📋 Table of Contents

1. [Document Purpose & Scope](#1-document-purpose--scope)
2. [Project Philosophy & Principles](#2-project-philosophy--principles)
3. [High-Level System Architecture](#3-high-level-system-architecture)
4. [Repository Structure — Deep Design](#4-repository-structure--deep-design)
5. [Data Architecture & Schema Design](#5-data-architecture--schema-design)
6. [Content Standards & Taxonomy System](#6-content-standards--taxonomy-system)
7. [The API/Data Layer — UI Readiness](#7-the-apidata-layer--ui-readiness)
8. [Automation Infrastructure](#8-automation-infrastructure)
9. [Contribution System Design](#9-contribution-system-design)
10. [Governance & Maintenance Model](#10-governance--maintenance-model)
11. [UI Layer — Future Architecture](#11-ui-layer--future-architecture)
12. [LLM & Agent Optimization Layer](#12-llm--agent-optimization-layer)
13. [Tooling & Technology Choices](#13-tooling--technology-choices)
14. [Phased Rollout Plan](#14-phased-rollout-plan)
15. [Risk Register & Mitigations](#15-risk-register--mitigations)
16. [Appendices](#16-appendices)

---

## 1. Document Purpose & Scope

### 1.1 Purpose

This document is the **single authoritative source of truth** for the design, architecture, and build strategy of the **AI Arsenal** open-source project. It is written to be handed directly to an AI agent or a human engineering team as a complete blueprint. Every architectural decision herein is intentional and forward-looking.

### 1.2 What This Document Covers

- Full repository and folder architecture with rationale for every decision
- Data schemas for every content type (structured for both Markdown rendering AND future API consumption)
- Automation and CI/CD pipeline design
- Contribution workflow, governance, and community systems
- The data layer contract that will power a future UI
- LLM/agent optimization patterns embedded throughout
- Technology choices with explicit justifications
- Phased build plan with dependency ordering

### 1.3 What This Document Does NOT Cover

- Actual content (tools, projects, papers) — that is populated post-build
- UI implementation code — covered at architecture level only
- Hosting/deployment specifics for the UI — deferred to Phase 5

### 1.4 Key Design Constraints

| Constraint | Description |
|---|---|
| **Markdown-first** | All content lives in `.md` files — no database dependency for core content |
| **Git is the database** | Version history, attribution, and change tracking are all Git-native |
| **Dual audience** | Every structure decision must serve both humans (GitHub browsing) and machines (LLM context ingestion) |
| **Zero lock-in** | No proprietary tooling in the critical path. The repo must be forkable and self-sufficient |
| **Progressive enhancement** | The repo works perfectly on day 1 as static Markdown; the UI layer is additive, never replacing |
| **Contributor-friendly** | A new contributor must be able to make a valid contribution in under 15 minutes |

---

## 2. Project Philosophy & Principles

### 2.1 The Core Thesis

> **AI Arsenal is a living, machine-readable, community-maintained encyclopedia of the AI engineering field — structured so that a human, an LLM, or an autonomous agent can consume it with equal effectiveness.**

### 2.2 The Five Pillars

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. SIGNAL OVER NOISE    — Curated, not aggregated      │
│  2. STRUCTURE AS FEATURE — Schema discipline = AI power │
│  3. FRESHNESS AS TRUST   — Stale data is worse than     │
│                            no data                      │
│  4. CONTRIBUTOR DELIGHT  — Low friction, high reward    │
│  5. UI-READY FROM DAY 1  — Data layer is the product    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Architectural Principles

**P1 — Schema Discipline**
Every piece of content has a defined schema. Frontmatter YAML in every `.md` file is the schema enforcement layer. This is what makes the content queryable without a database.

**P2 — Single Source of Truth**
No content is duplicated. Cross-references use relative links or ID references, never copy-paste. If a tool appears in two sections, one is canonical and the other links to it.

**P3 — Separation of Concerns**
```
Content (Markdown) ≠ Metadata (YAML Frontmatter) ≠ Index (Generated JSON) ≠ UI (Separate layer)
```

**P4 — Automation as a Citizen**
Automation is not an afterthought. Every manually maintained piece of data that can be automated, must be.

**P5 — Composability**
Sections are independently useful. A user can clone just `/tools/` and get value. An agent can ingest just `/architectures/decision-trees/` and make good decisions.

**P6 — Versioned Knowledge**
The state of the AI field at any point in time should be reconstructible via Git history. Monthly digest snapshots enforce this explicitly.

---

## 3. High-Level System Architecture

### 3.1 System Layers Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LAYER 5: UI LAYER                           │
│              (Future: Next.js / Astro web application)              │
│         Browse | Search | Filter | Visualize | Compare              │
└────────────────────────────┬────────────────────────────────────────┘
                             │ consumes
┌────────────────────────────▼────────────────────────────────────────┐
│                      LAYER 4: DATA API LAYER                        │
│              (Generated Static JSON / Future REST API)              │
│        /data/index.json | /data/tools.json | /data/projects.json    │
└────────────────────────────┬────────────────────────────────────────┘
                             │ generated from
┌────────────────────────────▼────────────────────────────────────────┐
│                    LAYER 3: AUTOMATION LAYER                        │
│                    (GitHub Actions Workflows)                        │
│    Parse MD → Validate Schema → Generate JSON → Update Indexes      │
└────────────────────────────┬────────────────────────────────────────┘
                             │ operates on
┌────────────────────────────▼────────────────────────────────────────┐
│                    LAYER 2: CONTENT LAYER                           │
│              (Markdown files with YAML Frontmatter)                 │
│    /projects | /tools | /research | /architectures | etc.           │
└────────────────────────────┬────────────────────────────────────────┘
                             │ governed by
┌────────────────────────────▼────────────────────────────────────────┐
│                    LAYER 1: SCHEMA LAYER                            │
│              (JSON Schema + Zod validators + Templates)             │
│     /schemas/*.json | /.github/templates/ | validation scripts      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow Architecture

```
CONTRIBUTOR WRITES .md FILE
         │
         ▼
PR OPENED → GitHub Action: Schema Validator fires
         │
         ├── FAIL → PR blocked, contributor shown exact error + fix
         │
         └── PASS → PR approved pathway
                  │
                  ▼
            Merge to main
                  │
                  ▼
         Post-merge Actions:
         ├── JSON Index Generator runs
         ├── README TOC regenerated
         ├── Star counts fetched (if project entry)
         ├── Link health check queued
         └── Algolia search index updated (future)
```

### 3.3 The "Dual Consumption" Design Guarantee

Every structural decision in this repo is tested against two questions:

```
Q1: Can a human browsing GitHub find this in 3 clicks or fewer?
Q2: Can an LLM, given only AGENT.md, be routed to the right file in 1 inference step?

If either answer is NO → restructure until both are YES.
```

---

## 4. Repository Structure — Deep Design

### 4.1 Complete Annotated Tree

```
ai-arsenal/
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  ROOT LEVEL — Navigation & Identity
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── README.md                    # [HUMAN ENTRY] Master index. Has emoji nav,
│                                # section summaries, quick-start. Auto-TOC.
│
├── AGENT.md                     # [LLM/AGENT ENTRY] Structured routing file.
│                                # No prose. Pure structured navigation map.
│                                # See Section 12 for full spec.
│
├── CONTEXT.md                   # [LLM CONTEXT WINDOW] <4000 token dense
│                                # summary of entire repo. Designed to fit in
│                                # a single LLM context prepend.
│
├── TAXONOMY.md                  # [SCHEMA REFERENCE] All valid tags, categories,
│                                # cost-tiers, maturity levels defined here.
│                                # Single source of truth for all vocabulary.
│
├── CONTRIBUTING.md              # Full contributor guide. Templates, rules,
│                                # review process, code of conduct link.
│
├── CODE_OF_CONDUCT.md           # Standard contributor covenant adapted.
│
├── CHANGELOG.md                 # Auto-generated. Weekly entries.
│                                # Format: Keep-a-Changelog standard.
│
├── GOVERNANCE.md                # Maintainer roles, decision process,
│                                # BDFL or committee model, merge rules.
│
├── SECURITY.md                  # How to report security issues in tools
│                                # we recommend (responsible disclosure note)
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /schemas/ — The Foundation Layer
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── schemas/
│   ├── README.md                # Explains schema system to contributors
│   ├── project.schema.json      # JSON Schema for project entries
│   ├── tool.schema.json         # JSON Schema for tool entries
│   ├── paper.schema.json        # JSON Schema for research papers
│   ├── tip.schema.json          # JSON Schema for tips/tricks entries
│   ├── build-example.schema.json
│   ├── person.schema.json       # For community/people-to-follow entries
│   └── digest.schema.json       # Monthly digest schema
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /data/ — Generated API Layer (DO NOT EDIT MANUALLY)
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── data/                        # ⚠️ ALL FILES HERE ARE AUTO-GENERATED
│   ├── README.md                # Warns humans, explains purpose
│   ├── index.json               # Master registry of ALL entries
│   ├── projects.json            # All projects, fully denormalized
│   ├── tools.json               # All tools, fully denormalized
│   ├── papers.json              # All research papers
│   ├── tips.json                # All tips and tricks
│   ├── people.json              # Community / people to follow
│   ├── digests.json             # Index of all monthly digests
│   ├── tags.json                # Tag cloud with counts
│   ├── stats.json               # Repository statistics
│   └── search-index.json        # Pre-built search index (FlexSearch format)
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /templates/ — Contributor Scaffolding
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── templates/
│   ├── README.md                # How to use templates
│   ├── project-entry.md         # Copy this to add a project
│   ├── tool-entry.md            # Copy this to add a tool
│   ├── paper-entry.md           # Copy this to add a research paper
│   ├── tip-entry.md             # Copy this to add a tip/trick
│   ├── build-example-entry.md   # Copy this for build examples
│   └── digest-entry.md          # Monthly digest template
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /scripts/ — Automation Scripts
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── scripts/
│   ├── README.md
│   ├── validate-schema.js       # Validates all .md frontmatter vs schemas
│   ├── generate-data.js         # Parses all .md → generates /data/*.json
│   ├── generate-search-index.js # Builds FlexSearch index from /data/
│   ├── update-star-counts.js    # Hits GitHub API, updates star fields
│   ├── check-links.js           # Validates all URLs in all .md files
│   ├── generate-toc.js          # Regenerates README.md table of contents
│   ├── generate-changelog.js    # Builds CHANGELOG from git log
│   ├── generate-context.js      # Regenerates CONTEXT.md from content
│   └── utils/
│       ├── frontmatter.js       # Shared frontmatter parser
│       ├── github-api.js        # GitHub API wrapper
│       └── markdown.js          # Markdown utilities
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /content/ — All Human-Written Content
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── content/
│   │
│   ├── trending/
│   │   ├── _index.md            # Section overview + navigation
│   │   ├── this-week.md         # Updated weekly (partly automated)
│   │   ├── this-month.md        # Updated monthly
│   │   ├── hall-of-fame.md      # All-time greats, evergreen
│   │   └── by-source/
│   │       ├── x-twitter.md     # Curated from X/Twitter
│   │       ├── youtube.md       # Curated from YouTube
│   │       ├── hackernews.md    # Curated from HN
│   │       ├── reddit.md        # r/LocalLLaMA, r/MachineLearning etc.
│   │       ├── arxiv.md         # ArXiv buzz / highly cited new papers
│   │       └── github.md        # GitHub trending repos in AI
│   │
│   ├── projects/
│   │   ├── _index.md
│   │   ├── _registry.md         # Master list, auto-generated, DO NOT EDIT
│   │   │
│   │   ├── agents/
│   │   │   ├── _index.md
│   │   │   ├── frameworks/      # One .md per project
│   │   │   │   ├── langgraph.md
│   │   │   │   ├── crewai.md
│   │   │   │   ├── autogen.md
│   │   │   │   └── ...
│   │   │   ├── multi-agent/
│   │   │   ├── autonomous/
│   │   │   ├── browser-agents/
│   │   │   └── coding-agents/
│   │   │
│   │   ├── llms/
│   │   │   ├── _index.md
│   │   │   ├── open-source-models/
│   │   │   ├── inference-engines/
│   │   │   ├── fine-tuning/
│   │   │   └── quantization/
│   │   │
│   │   ├── rag/
│   │   │   ├── _index.md
│   │   │   ├── frameworks/
│   │   │   ├── vector-databases/
│   │   │   ├── document-processing/
│   │   │   └── advanced-rag/
│   │   │
│   │   ├── observability/       # Projects specifically for LLMOps
│   │   │   ├── _index.md
│   │   │   ├── tracing/
│   │   │   ├── evaluation/
│   │   │   └── monitoring/
│   │   │
│   │   ├── multimodal/
│   │   ├── voice-and-audio/
│   │   ├── computer-vision/
│   │   ├── code-generation/
│   │   ├── data-pipelines/
│   │   └── tooling/
│   │
│   ├── tools/
│   │   ├── _index.md
│   │   ├── _registry.md         # Auto-generated master list
│   │   │
│   │   ├── by-job/              # Primary navigation axis
│   │   │   ├── _index.md
│   │   │   ├── prototyping.md
│   │   │   ├── production-serving.md
│   │   │   ├── fine-tuning.md
│   │   │   ├── evaluation.md
│   │   │   ├── deployment.md
│   │   │   ├── orchestration.md
│   │   │   ├── vector-search.md
│   │   │   ├── memory-management.md
│   │   │   ├── web-scraping.md
│   │   │   ├── structured-output.md
│   │   │   ├── prompt-management.md
│   │   │   ├── data-labeling.md
│   │   │   ├── model-registry.md
│   │   │   └── security-and-guardrails.md
│   │   │
│   │   ├── by-cost/             # Secondary navigation axis
│   │   │   ├── free-and-open-source.md
│   │   │   ├── freemium.md
│   │   │   ├── paid.md
│   │   │   └── self-hostable.md
│   │   │
│   │   └── by-stack/            # Tertiary navigation axis
│   │       ├── python.md
│   │       ├── typescript.md
│   │       ├── rust.md
│   │       └── polyglot.md
│   │
│   ├── observability/           # Dedicated full section for LLMOps
│   │   ├── _index.md
│   │   ├── overview.md          # Why observability matters in AI systems
│   │   ├── tracing-and-monitoring.md
│   │   ├── evaluation-pipelines.md
│   │   ├── cost-tracking.md
│   │   ├── logging-best-practices.md
│   │   ├── dashboards/
│   │   │   ├── grafana-setup.md
│   │   │   └── custom-dashboards.md
│   │   ├── alerting-patterns.md
│   │   └── llmops-glossary.md
│   │
│   ├── research/
│   │   ├── _index.md
│   │   ├── sota-benchmarks.md   # Leaderboard references (MMLU, GAIA, etc.)
│   │   ├── must-read-papers.md  # Canonical reading list
│   │   ├── emerging-techniques.md
│   │   ├── weekly-arxiv-picks.md
│   │   └── papers/             # One .md per paper summary
│   │       └── [slug].md
│   │
│   ├── architectures/
│   │   ├── _index.md
│   │   │
│   │   ├── patterns/           # Design patterns library
│   │   │   ├── _index.md
│   │   │   ├── rag-patterns.md
│   │   │   ├── agent-patterns.md
│   │   │   ├── memory-patterns.md
│   │   │   ├── routing-patterns.md
│   │   │   ├── tool-use-patterns.md
│   │   │   ├── evaluation-patterns.md
│   │   │   └── guardrail-patterns.md
│   │   │
│   │   ├── reference-stacks/   # Opinionated full-stack blueprints
│   │   │   ├── _index.md
│   │   │   ├── lean-mvp.md
│   │   │   ├── production-rag.md
│   │   │   ├── multi-agent-system.md
│   │   │   ├── local-first.md
│   │   │   ├── enterprise-scale.md
│   │   │   └── research-platform.md
│   │   │
│   │   ├── decision-trees/     # Structured when-to-use-what guides
│   │   │   ├── _index.md
│   │   │   ├── choose-llm.md
│   │   │   ├── choose-vector-db.md
│   │   │   ├── choose-agent-framework.md
│   │   │   ├── rag-vs-fine-tuning.md
│   │   │   ├── choose-memory-solution.md
│   │   │   ├── choose-deployment-target.md
│   │   │   └── choose-eval-framework.md
│   │   │
│   │   └── diagrams/           # Mermaid source + exported PNGs
│   │       ├── README.md
│   │       ├── src/            # .mmd Mermaid source files
│   │       └── exports/        # .png / .svg exports
│   │
│   ├── skills/
│   │   ├── _index.md
│   │   │
│   │   ├── learning-paths/
│   │   │   ├── ai-engineer.md
│   │   │   ├── ml-engineer.md
│   │   │   ├── llm-researcher.md
│   │   │   └── agent-builder.md
│   │   │
│   │   ├── prompt-engineering/
│   │   │   ├── fundamentals.md
│   │   │   ├── chain-of-thought.md
│   │   │   ├── few-shot.md
│   │   │   ├── system-prompt-design.md
│   │   │   ├── adversarial-prompting.md
│   │   │   └── prompt-patterns-catalog.md
│   │   │
│   │   ├── core-concepts/
│   │   │   ├── transformers.md
│   │   │   ├── embeddings.md
│   │   │   ├── attention-mechanisms.md
│   │   │   ├── rlhf-and-alignment.md
│   │   │   ├── mixture-of-experts.md
│   │   │   └── tokenization.md
│   │   │
│   │   └── by-role/
│   │       ├── backend-developers.md
│   │       ├── data-scientists.md
│   │       ├── fullstack-developers.md
│   │       └── product-managers.md
│   │
│   ├── tips-and-tricks/
│   │   ├── _index.md
│   │   ├── prompting.md
│   │   ├── inference-optimization.md
│   │   ├── rag-tuning.md
│   │   ├── cost-reduction.md
│   │   ├── debugging-llm-apps.md
│   │   ├── latency-optimization.md
│   │   ├── context-window-management.md
│   │   ├── agent-reliability.md
│   │   ├── production-gotchas.md
│   │   ├── local-model-tips.md
│   │   └── security-best-practices.md
│   │
│   ├── build-examples/
│   │   ├── _index.md
│   │   │
│   │   ├── starter/
│   │   │   ├── basic-rag-chatbot.md
│   │   │   ├── local-llm-setup.md
│   │   │   ├── simple-react-agent.md
│   │   │   └── ai-discord-bot.md
│   │   │
│   │   ├── intermediate/
│   │   │   ├── self-correcting-rag.md
│   │   │   ├── multi-tool-agent.md
│   │   │   ├── semantic-search-engine.md
│   │   │   └── ai-api-service.md
│   │   │
│   │   └── advanced/
│   │       ├── multi-agent-research-system.md
│   │       ├── voice-ai-assistant.md
│   │       ├── autonomous-code-reviewer.md
│   │       └── enterprise-rag-pipeline.md
│   │
│   ├── community/
│   │   ├── _index.md
│   │   ├── people-to-follow.md  # Uses person.schema.json
│   │   ├── youtube-channels.md
│   │   ├── newsletters.md
│   │   ├── podcasts.md
│   │   ├── discord-communities.md
│   │   └── conferences.md
│   │
│   ├── benchmarks/
│   │   ├── _index.md
│   │   ├── model-leaderboards.md
│   │   ├── framework-performance.md
│   │   ├── inference-speed.md
│   │   └── cost-per-token.md
│   │
│   └── digests/                 # Monthly snapshots — historical record
│       ├── _index.md
│       └── YYYY-MM/
│           ├── digest.md        # Full monthly digest
│           └── highlights.md    # TL;DR version
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /meta/ — Repo Intelligence Layer
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── meta/
│   ├── how-to-use-for-humans.md
│   ├── how-to-use-with-llm.md
│   ├── how-to-use-with-agents.md
│   │
│   └── prompt-templates/        # Ready-made prompts for using this repo
│       ├── README.md
│       ├── project-ideation.md
│       ├── stack-selection.md
│       ├── architecture-review.md
│       ├── tool-research.md
│       ├── learning-path.md
│       └── competitive-analysis.md
│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  /.github/ — GitHub Infrastructure
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
└── .github/
    ├── workflows/               # GitHub Actions (Section 8)
    │   ├── on-pr.yml
    │   ├── on-merge.yml
    │   ├── weekly.yml
    │   ├── monthly.yml
    │   └── manual.yml
    │
    ├── ISSUE_TEMPLATE/
    │   ├── config.yml
    │   ├── add-project.yml
    │   ├── add-tool.yml
    │   ├── add-paper.yml
    │   ├── add-tip.yml
    │   ├── add-build-example.yml
    │   ├── update-outdated.yml
    │   └── broken-link.yml
    │
    ├── PULL_REQUEST_TEMPLATE.md
    └── CODEOWNERS               # Who reviews what
```

---

## 5. Data Architecture & Schema Design

### 5.1 The Frontmatter-as-Database Principle

Every `.md` file in `/content/` (except `_index.md` files and registry files) begins with a YAML frontmatter block. This frontmatter **IS the database record**. The Markdown body is the human-readable detail view. This separation is critical.

```
┌─────────────────────────────────────┐
│  YAML FRONTMATTER                   │  ← Machine-readable, queryable,
│  (structured data)                  │    validated against JSON Schema
├─────────────────────────────────────┤
│  MARKDOWN BODY                      │  ← Human-readable rich content,
│  (rich content)                     │    not parsed programmatically
└─────────────────────────────────────┘
```

### 5.2 Schema: Project Entry (`project.schema.json`)

```yaml
---
# ═══════════════════════════════════
# REQUIRED FIELDS
# ═══════════════════════════════════
id: "langgraph"                          # Unique slug, kebab-case, immutable
name: "LangGraph"                        # Display name
type: "framework"                        # Enum: framework|model|tool|dataset|
                                         #   library|platform|service
category: "agents"                       # Top-level category (maps to folder)
subcategory: "agent-frameworks"          # Subcategory (maps to subfolder)
description: "One sentence. No period."  # Max 160 chars. Used in cards/lists.
github_url: "https://github.com/..."     # Canonical source URL
license: "MIT"                           # SPDX identifier
primary_language: "Python"              # Enum: Python|TypeScript|Rust|Go|Java|Other

# ═══════════════════════════════════
# CLASSIFICATION
# ═══════════════════════════════════
tags:                                    # Array. All values must exist in TAXONOMY.md
  - agents
  - orchestration
  - graphs
  - stateful
maturity: "production"                   # Enum: experimental|alpha|beta|production
cost_model: "open-source"               # Enum: open-source|freemium|paid|
                                         #   self-hostable|usage-based

# ═══════════════════════════════════
# METRICS (auto-updated by CI)
# ═══════════════════════════════════
github_stars: 8200                       # Updated weekly by star-tracker action
trending_score: 92                       # Internal score: 0-100, auto-calculated
last_commit: "2025-05-28"               # Auto-updated

# ═══════════════════════════════════
# OPTIONAL ENRICHMENT
# ═══════════════════════════════════
docs_url: "https://..."
demo_url: "https://..."
paper_url: "https://arxiv.org/..."
paper_id: "arxiv-2401.xxxxx"            # If linked to a paper entry
alternatives:                           # Array of project IDs
  - "crewai"
  - "autogen"
integrates_with:                        # Array of project/tool IDs
  - "langchain"
  - "openai"
  - "anthropic"

# ═══════════════════════════════════
# EDITORIAL
# ═══════════════════════════════════
added_date: "2025-01-15"               # When added to arsenal (ISO 8601)
last_reviewed: "2025-05-30"            # When content was last human-verified
added_by: "github-username"            # Contributor attribution
reviewed_by: "github-username"
buzz_sources:                          # Where the buzz originated
  - source: "x-twitter"
    url: "https://x.com/..."
    date: "2025-05-10"
    description: "Viral thread on stateful agents"
  - source: "youtube"
    url: "https://youtube.com/..."
    date: "2025-05-15"
    description: "Deep dive tutorial by @username"
featured: false                         # Pinned/featured on UI home
status: "active"                       # Enum: active|archived|deprecated|watching
---
```

### 5.3 Schema: Tool Entry (`tool.schema.json`)

```yaml
---
# REQUIRED
id: "langsmith"
name: "LangSmith"
type: "tool"
job:                                    # Array — what jobs this tool does
  - "evaluation"
  - "tracing"
  - "monitoring"
description: "One sentence description, max 160 chars"
url: "https://smith.langchain.com"     # Primary URL (homepage or docs)
cost_model: "freemium"                 # Enum
pricing_detail: "Free up to 5k traces/month, $49/mo Pro"

# CLASSIFICATION
tags:
  - observability
  - evaluation
  - tracing
  - langchain
maturity: "production"
stack:                                 # Language/runtime compatibility
  - python
  - typescript

# COST DETAIL
free_tier: true
free_tier_limits: "5,000 traces/month"
self_hostable: false
open_source: false
source_url: null                       # GitHub URL if open source

# ENRICHMENT
docs_url: "https://docs.smith.langchain.com"
github_url: null
alternatives:
  - "langfuse"
  - "phoenix-arize"
  - "helicone"
integrates_with:
  - "langchain"
  - "langgraph"
  - "openai"

# EDITORIAL
added_date: "2025-01-10"
last_reviewed: "2025-05-28"
added_by: "maintainer"
verdict: "best-in-class"               # Enum: best-in-class|recommended|
                                        #   solid-choice|use-with-caution|deprecated
verdict_rationale: "One sentence why"
status: "active"
---
```

### 5.4 Schema: Research Paper (`paper.schema.json`)

```yaml
---
# REQUIRED
id: "attention-is-all-you-need"        # Unique slug
title: "Attention Is All You Need"
authors:
  - "Vaswani, A."
  - "Shazeer, N."
  # ...
published_date: "2017-06-12"
venue: "NeurIPS 2017"                  # Conference or journal
arxiv_id: "1706.03762"
arxiv_url: "https://arxiv.org/abs/1706.03762"
pdf_url: "https://arxiv.org/pdf/1706.03762"

# CLASSIFICATION
tags:
  - transformers
  - attention
  - foundational
  - architecture
category: "architecture"               # Enum: architecture|training|inference|
                                        #   rag|agents|evaluation|alignment|
                                        #   multimodal|efficiency
importance: "foundational"             # Enum: foundational|sota|incremental|
                                        #   benchmark|survey

# METRICS
citation_count: 85000                  # Updated periodically
has_code: true
code_url: "https://github.com/..."
benchmark_improvements:                # If paper claims SOTA
  - benchmark: "WMT 2014 EN-DE"
    score: "28.4 BLEU"
    previous_sota: "41.0 BLEU"

# EDITORIAL
tldr: "Introduces the Transformer architecture eliminating recurrence"  # Max 200 chars
why_it_matters: "One paragraph max"
added_date: "2025-01-10"
added_by: "maintainer"
---
```

### 5.5 Schema: Tip Entry (`tip.schema.json`)

```yaml
---
id: "rag-chunk-overlap-tuning"
title: "Tune Chunk Overlap Before Chunk Size"
category: "rag-tuning"                 # Maps to file in /tips-and-tricks/
tags:
  - rag
  - chunking
  - retrieval
  - performance
difficulty: "intermediate"            # Enum: beginner|intermediate|advanced
impact: "high"                        # Enum: low|medium|high
time_to_implement: "30 minutes"
applies_to:                           # Tool/project IDs this tip applies to
  - "llamaindex"
  - "langchain"
added_date: "2025-03-01"
added_by: "contributor-handle"
verified_by: "maintainer-handle"
source_url: "https://..."             # Optional: where tip was discovered
---
```

### 5.6 The Generated `data/` Layer — JSON Contract

The `/data/*.json` files are the **API contract** for the future UI. They are generated by `scripts/generate-data.js` after every merge. Their structure is defined here permanently to ensure the UI can be built against a stable contract.

#### `data/index.json`
```json
{
  "meta": {
    "generated_at": "2025-06-13T10:00:00Z",
    "total_projects": 142,
    "total_tools": 89,
    "total_papers": 67,
    "total_tips": 203,
    "schema_version": "1.0.0"
  },
  "entries": [
    {
      "id": "langgraph",
      "type": "project",
      "name": "LangGraph",
      "description": "...",
      "tags": ["agents", "orchestration"],
      "path": "content/projects/agents/frameworks/langgraph.md",
      "url": "content/projects/agents/frameworks/langgraph",
      "last_updated": "2025-05-30"
    }
  ]
}
```

#### `data/projects.json` — Fully Denormalized
```json
{
  "schema_version": "1.0.0",
  "generated_at": "...",
  "count": 142,
  "items": [
    {
      "id": "langgraph",
      "name": "LangGraph",
      "type": "framework",
      "category": "agents",
      "subcategory": "agent-frameworks",
      "description": "...",
      "github_url": "...",
      "docs_url": "...",
      "license": "MIT",
      "tags": ["agents", "orchestration"],
      "maturity": "production",
      "cost_model": "open-source",
      "github_stars": 8200,
      "trending_score": 92,
      "alternatives": ["crewai", "autogen"],
      "integrates_with": ["langchain"],
      "added_date": "2025-01-15",
      "last_reviewed": "2025-05-30",
      "featured": false,
      "status": "active",
      "buzz_sources": [...],
      "body_html": "...",          // Pre-rendered markdown body
      "body_text": "..."           // Plain text for search indexing
    }
  ]
}
```

#### `data/tags.json` — Tag Cloud
```json
{
  "schema_version": "1.0.0",
  "tags": [
    {
      "id": "agents",
      "label": "Agents",
      "count": 47,
      "types": {"project": 32, "tool": 10, "tip": 5},
      "description": "AI agent frameworks and systems",
      "category": "domain"
    }
  ]
}
```

#### `data/search-index.json` — FlexSearch Compatible
```json
{
  "version": "1.0.0",
  "engine": "flexsearch",
  "documents": [
    {
      "id": "langgraph",
      "type": "project",
      "boost_title": "LangGraph",
      "boost_tags": "agents orchestration graphs stateful",
      "body": "full searchable text of the entry..."
    }
  ]
}
```

---

## 6. Content Standards & Taxonomy System

### 6.1 TAXONOMY.md — The Vocabulary Contract

This file is the **single source of truth** for all valid values used in frontmatter. Any value not in this file will fail schema validation. It is grouped by field:

```markdown
# TAXONOMY.md — AI Arsenal Vocabulary Reference

## Entry Types
project | tool | paper | tip | build-example | person | digest

## Project Categories
agents | llms | rag | observability | multimodal | voice-audio |
computer-vision | code-generation | data-pipelines | tooling | evaluation

## Maturity Levels
experimental   # <1 month old or early alpha, use at your own risk
alpha          # Active dev, API unstable
beta           # Feature complete, production use possible
production     # Stable, widely used in prod

## Cost Models
open-source    # Free, open source code
freemium       # Free tier + paid tiers
paid           # Requires payment, no meaningful free tier
self-hostable  # Can run on your own infra
usage-based    # Pay per use (tokens, API calls)

## Stack / Language
python | typescript | rust | go | java | cpp | julia | polyglot

## Tag Taxonomy (grouped)
### Domain Tags
agents | rag | llm | fine-tuning | embeddings | evaluation |
inference | multimodal | voice | vision | code-gen | data

### Capability Tags  
streaming | batching | caching | quantization | distillation |
alignment | rlhf | reasoning | tool-use | memory | planning

### Infrastructure Tags
self-hosted | cloud | serverless | edge | local | docker | kubernetes

### Stack Tags
langchain | llamaindex | openai | anthropic | huggingface |
pytorch | jax | onnx | triton

### Quality Tags
trending | featured | foundational | sota | experimental |
battle-tested | community-favorite | new-arrival

## Verdict Values (Tools only)
best-in-class | recommended | solid-choice | use-with-caution |
deprecated | watching

## Importance Values (Papers only)
foundational | sota | incremental | benchmark | survey

## Buzz Sources
x-twitter | youtube | hackernews | reddit | arxiv | github-trending |
newsletter | conference | podcast
```

### 6.2 The Full Markdown Body Standard

Every entry's markdown body (below the frontmatter) follows this exact structure. Deviations will be flagged in PR review:

```markdown
---
[frontmatter as defined in schemas]
---

## Overview
<!-- 2-3 sentences expanding on the description. What it is, what problem it solves. -->

## Why It's in the Arsenal
<!-- What makes this worthy of inclusion. Be specific. No marketing language. -->

## Key Features
<!-- Bullet list. Max 6 bullets. Each bullet = one concrete capability. -->
- Feature one with specifics
- Feature two with specifics

## Architecture / How It Works
<!-- Optional for simple tools. Required for frameworks and models. -->
<!-- Use Mermaid diagrams where helpful. -->

## Getting Started
```bash
# Minimal working example
pip install package-name
```

## Use Cases
<!-- When should someone reach for this? 3-5 specific scenarios. -->
1. **Scenario**: When you need X and Y is true
2. **Scenario**: When building Z type of system

## Strengths
<!-- What it genuinely does better than alternatives -->
- Strength one
- Strength two

## Limitations / When NOT to Use
<!-- Honest assessment. This builds trust with readers. -->
- Limitation one
- Limitation two

## Integration Patterns
<!-- How it connects with other tools in the ecosystem -->

## Resources
<!-- Ordered: Official first, then community -->
- [Official Docs](url)
- [GitHub Repository](url)
- [Notable Tutorial](url) — by @author
- [Research Paper](url) — if applicable

## Buzz & Reception
<!-- What the community is saying. Link to specific posts/videos. -->
<!-- Keep this section factual and sourced. -->

---
*Last reviewed: YYYY-MM-DD by @contributor*
*Suggest an update: [open an issue](../../.github/ISSUE_TEMPLATE/update-outdated.yml)*
```

### 6.3 The `_index.md` Standard

Every folder has an `_index.md`. These are NOT content entries — they are **navigation files**. They have no frontmatter schema but follow this structure:

```markdown
# Section Name

> One-line description of what this section contains.

## Quick Navigation
| Sub-section | Count | Last Updated |
|---|---|---|
| [Sub A](./sub-a/) | 12 entries | 2025-05-30 |

## Recently Added
<!-- Auto-generated by CI, DO NOT EDIT MANUALLY -->

## Most Popular (by stars/views)
<!-- Auto-generated by CI, DO NOT EDIT MANUALLY -->

## Browse All
[Auto-generated list of all entries in this section]
```

---

## 7. The API/Data Layer — UI Readiness

### 7.1 Design Philosophy

The UI layer is **not built yet** but the data contract for it is locked from Day 1. This is the most important architectural decision in the entire project. Every content decision is made with the answer to this question:

> *"If we built the UI tomorrow, would the data layer support it without restructuring content?"*

The answer must always be YES.

### 7.2 Data Layer Contract (Stable API Surface)

The following JSON endpoints are generated statically and represent the stable API contract. A future REST API or GraphQL layer would simply wrap these.

```
GET /data/index.json          → Full entry index (lightweight)
GET /data/projects.json       → All projects (full data)
GET /data/tools.json          → All tools (full data)
GET /data/papers.json         → All papers (full data)
GET /data/tips.json           → All tips (full data)
GET /data/people.json         → Community members
GET /data/tags.json           → Tag cloud with counts
GET /data/stats.json          → Repository statistics
GET /data/search-index.json   → FlexSearch compatible search index
GET /data/digests.json        → Monthly digest index
```

### 7.3 Filtering Contract

The UI filtering system must work against the `data/*.json` files client-side. The following filter dimensions are guaranteed by the schema design:

```javascript
// These filter operations are guaranteed to work on generated JSON
const filters = {
  // Single-value filters
  type:       ["project", "tool", "paper", "tip"],
  maturity:   ["experimental", "alpha", "beta", "production"],
  cost_model: ["open-source", "freemium", "paid", "self-hostable"],
  status:     ["active", "archived", "deprecated", "watching"],
  
  // Array filters (entry has at least one matching value)
  tags:       [...allTagsFromTaxonomy],
  stack:      ["python", "typescript", "rust", ...],
  job:        [...allJobsFromTaxonomy],    // tools only
  category:   [...allCategoriesFromTaxonomy],
  
  // Range filters
  github_stars: { min: 0, max: Infinity },
  trending_score: { min: 0, max: 100 },
  added_date: { from: "ISO", to: "ISO" },
  
  // Boolean filters
  featured:       true | false,
  free_tier:      true | false,           // tools only
  self_hostable:  true | false,
  open_source:    true | false,
  has_code:       true | false            // papers only
}

// Sort dimensions
const sortBy = {
  trending_score: "desc",
  github_stars: "desc",
  added_date: "desc",
  last_reviewed: "desc",
  name: "asc"
}
```

### 7.4 Search Architecture

Client-side search using **FlexSearch** (zero server dependency) with a pre-built index:

```javascript
// Search index structure supports:
// - Full text search across: name, description, tags, body_text
// - Boosted fields: name (x5), tags (x3), description (x2), body (x1)
// - Field-specific search: tag:agents, type:tool, cost:free

const searchConfig = {
  document: {
    id: "id",
    index: [
      { field: "name",        tokenize: "forward", resolution: 9 },
      { field: "description", tokenize: "strict",  resolution: 5 },
      { field: "tags",        tokenize: "strict",  resolution: 7 },
      { field: "body_text",   tokenize: "strict",  resolution: 3 }
    ],
    store: ["id", "type", "name", "description", "tags", "category"]
  }
}
```

### 7.5 Future API Layer Design (When Needed)

When static JSON is no longer sufficient (traffic, personalization, user accounts), the migration path is:

```
Static JSON (Phase 1-4)
    ↓
Static JSON + Cloudflare Workers for filtering (Phase 5)
    ↓
Full REST API with SQLite/Turso (Phase 6, if needed)
    ↓
GraphQL API with proper DB (Phase 7, if scale demands)
```

The schema design ensures **zero content migration** at any of these steps. The YAML frontmatter maps directly to database columns without transformation.

---

## 8. Automation Infrastructure

### 8.1 GitHub Actions — Full Workflow Inventory

#### `/.github/workflows/on-pr.yml` — PR Validation Pipeline
**Trigger:** Every PR to `main`
**Purpose:** Gate quality before merge

```yaml
name: PR Validation

on:
  pull_request:
    branches: [main]

jobs:
  validate-schema:
    name: Validate Frontmatter Schemas
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: node scripts/validate-schema.js
        # Fails with clear error message + line number on schema violation

  check-taxonomy:
    name: Validate Tags Against Taxonomy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node scripts/validate-taxonomy.js
        # Ensures all tags in frontmatter exist in TAXONOMY.md

  check-links:
    name: Check New/Modified Links
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 2 }
      - run: node scripts/check-links.js --changed-only
        # Only checks URLs in files changed in this PR

  check-duplicates:
    name: Check for Duplicate IDs
    runs-on: ubuntu-latest
    steps:
      - run: node scripts/check-duplicates.js
        # Ensures no two entries share the same ID field

  validate-templates:
    name: Validate Markdown Structure
    runs-on: ubuntu-latest
    steps:
      - run: node scripts/validate-structure.js
        # Ensures required ## sections exist in entry files
```

#### `/.github/workflows/on-merge.yml` — Post-Merge Pipeline
**Trigger:** Push to `main` (after PR merge)
**Purpose:** Keep generated files fresh

```yaml
name: Post-Merge Pipeline

on:
  push:
    branches: [main]
    paths:
      - 'content/**'
      - 'schemas/**'

jobs:
  generate-data:
    name: Regenerate /data JSON files
    steps:
      - run: node scripts/generate-data.js
      - run: node scripts/generate-search-index.js
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(data): regenerate data layer [skip ci]"
          file_pattern: "data/*.json"

  generate-toc:
    name: Regenerate README TOC
    steps:
      - run: node scripts/generate-toc.js
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(docs): update table of contents [skip ci]"
          file_pattern: "README.md content/**/_index.md"

  generate-context:
    name: Regenerate CONTEXT.md for LLMs
    steps:
      - run: node scripts/generate-context.js
        # Rebuilds the <4000 token LLM context summary
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(meta): update CONTEXT.md [skip ci]"
```

#### `/.github/workflows/weekly.yml` — Weekly Refresh
**Trigger:** Cron — every Monday 09:00 UTC
**Purpose:** Keep metrics and trending fresh

```yaml
name: Weekly Refresh

on:
  schedule:
    - cron: '0 9 * * 1'
  workflow_dispatch:    # Allow manual trigger

jobs:
  update-star-counts:
    name: Update GitHub Star Counts
    steps:
      - run: node scripts/update-star-counts.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(metrics): update star counts [skip ci]"

  update-trending-scores:
    name: Recalculate Trending Scores
    steps:
      - run: node scripts/calculate-trending.js
        # Scores based on: star velocity, recency, buzz_sources count

  check-all-links:
    name: Full Link Health Check
    steps:
      - run: node scripts/check-links.js --all
      - name: Create issues for broken links
        run: node scripts/create-link-issues.js
        # Auto-creates GitHub Issues for dead links found

  generate-weekly-digest-draft:
    name: Draft This Week's Trending
    steps:
      - run: node scripts/draft-trending.js
        # Creates/updates content/trending/this-week.md draft
        # Pulls from GitHub trending API for AI repos
        # Maintainer reviews and edits before it's considered final
```

#### `/.github/workflows/monthly.yml` — Monthly Snapshot
**Trigger:** Cron — 1st of each month

```yaml
name: Monthly Digest & Snapshot

on:
  schedule:
    - cron: '0 10 1 * *'

jobs:
  create-monthly-digest:
    steps:
      - run: node scripts/create-monthly-digest.js
        # Creates content/digests/YYYY-MM/digest.md from template
        # Pre-populates with top entries from the month (by star growth)
        # Creates a PR for maintainer review, not auto-merged

  check-stale-entries:
    steps:
      - run: node scripts/check-stale.js --threshold=90
        # Flags entries not reviewed in 90+ days
        # Creates GitHub Issues with 'stale' label

  generate-stats:
    steps:
      - run: node scripts/generate-stats.js
        # Updates data/stats.json with monthly metrics
```

### 8.2 The Trending Score Algorithm

```javascript
// scripts/calculate-trending.js
// Trending score: 0-100, higher = more trending

function calculateTrendingScore(entry, githubData) {
  const now = new Date();
  
  // Star velocity (stars gained in last 30 days)
  const starVelocity = githubData.stars_last_30d || 0;
  const velocityScore = Math.min(starVelocity / 500 * 40, 40); // max 40 pts
  
  // Buzz recency (how recent are buzz_sources?)
  const buzzSources = entry.buzz_sources || [];
  const recentBuzz = buzzSources.filter(b => {
    const daysAgo = (now - new Date(b.date)) / (1000 * 60 * 60 * 24);
    return daysAgo < 30;
  }).length;
  const buzzScore = Math.min(recentBuzz * 10, 30); // max 30 pts
  
  // Recency of addition (bonus for new entries)
  const daysOld = (now - new Date(entry.added_date)) / (1000 * 60 * 60 * 24);
  const recencyBonus = daysOld < 14 ? 15 : daysOld < 30 ? 8 : 0;
  
  // Absolute star count (log scale)
  const starScore = Math.min(Math.log10(entry.github_stars + 1) * 5, 15); // max 15 pts
  
  return Math.round(velocityScore + buzzScore + recencyBonus + starScore);
}
```

---

## 9. Contribution System Design

### 9.1 Contribution Philosophy

> **Make the right thing easy, the wrong thing impossible, and the feedback immediate.**

### 9.2 Contribution Paths

There are **five contribution paths**, each with different friction levels:

```
CONTRIBUTION PATHS (by effort, low to high):
────────────────────────────────────────────

PATH 1: Fix an Error        → Edit existing .md, raise PR
PATH 2: Flag Stale Content  → Open Issue with 'stale' template
PATH 3: Add a Tip/Trick     → Copy tip template, fill frontmatter, PR
PATH 4: Add a Tool/Project  → Copy entry template, write body, PR
PATH 5: Add a Section/Major Change → Open Discussion first, then RFC, then PR
```

### 9.3 Issue Templates — Full Specification

#### `add-project.yml`
```yaml
name: ➕ Add Project
description: Submit an open source project to the Arsenal
title: "[PROJECT] <project-name>"
labels: ["content: project", "needs-review"]
body:
  - type: markdown
    attributes:
      value: |
        Please fill this out completely. Incomplete submissions will be closed.
        Before submitting, check that this project isn't already in the Arsenal.

  - type: input
    id: project-name
    attributes:
      label: Project Name
      placeholder: "e.g., LangGraph"
    validations:
      required: true

  - type: input
    id: github-url
    attributes:
      label: GitHub URL
      placeholder: "https://github.com/org/repo"
    validations:
      required: true

  - type: input
    id: description
    attributes:
      label: One-line Description
      description: Max 160 characters. Plain language. No marketing.
      placeholder: "A framework for building stateful multi-agent applications with LLMs"
    validations:
      required: true

  - type: dropdown
    id: category
    attributes:
      label: Primary Category
      options:
        - agents
        - llms
        - rag
        - observability
        - multimodal
        - voice-audio
        - code-generation
        - data-pipelines
        - evaluation
        - tooling
    validations:
      required: true

  - type: checkboxes
    id: tags
    attributes:
      label: Relevant Tags (select all that apply)
      options:
        - label: agents
        - label: rag
        - label: fine-tuning
        - label: inference
        - label: embeddings
        # ... full tag list from TAXONOMY.md

  - type: dropdown
    id: maturity
    attributes:
      label: Maturity Level
      options:
        - experimental
        - alpha
        - beta
        - production
    validations:
      required: true

  - type: textarea
    id: why-arsenal
    attributes:
      label: Why does this belong in the Arsenal?
      description: What makes this project notable? What problem does it solve better than alternatives?
      placeholder: "This project is trending because..."
    validations:
      required: true

  - type: textarea
    id: buzz-sources
    attributes:
      label: Where is it getting buzz?
      description: Link to specific tweets, videos, or posts
      placeholder: "https://x.com/... - viral thread\nhttps://youtube.com/... - tutorial"

  - type: input
    id: alternatives
    attributes:
      label: Known Alternatives (comma-separated IDs)
      placeholder: "crewai, autogen, llamaindex"

  - type: checkboxes
    id: checklist
    attributes:
      label: Pre-submission Checklist
      options:
        - label: I searched the Arsenal and this is not already listed
          required: true
        - label: The project has a GitHub repo with a real README
          required: true
        - label: The project has at least one release or meaningful commits
          required: true
        - label: I am not the creator of this project (or have disclosed I am)
          required: true
```

### 9.4 Pull Request Template

```markdown
<!-- /.github/PULL_REQUEST_TEMPLATE.md -->

## PR Type
<!-- Check all that apply -->
- [ ] ➕ New content (project/tool/paper/tip)
- [ ] ✏️ Update existing content  
- [ ] 🐛 Fix error or broken link
- [ ] 🏗️ Infrastructure/tooling change
- [ ] 📚 Documentation update

## Summary
<!-- One paragraph: what did you add/change and why? -->

## Content Checklist (for new/updated entries)
- [ ] Frontmatter is complete (all required fields filled)
- [ ] All tags used exist in `TAXONOMY.md`
- [ ] Entry ID is unique (not used by any other entry)
- [ ] Markdown body follows the template structure
- [ ] All URLs have been personally verified to be working
- [ ] `added_date` / `last_reviewed` is set to today's date (YYYY-MM-DD)
- [ ] `added_by` is set to your GitHub username

## Related Issues
<!-- Closes #issue-number -->
Closes #

## Notes for Reviewers
<!-- Anything reviewers should know? Conflicts? Uncertainties? -->
```

### 9.5 CODEOWNERS — Review Routing

```
# /.github/CODEOWNERS
# Each section has at least one designated maintainer

/schemas/                   @lead-maintainer
/scripts/                   @lead-maintainer @infra-maintainer
/.github/workflows/         @lead-maintainer @infra-maintainer
/data/                      @lead-maintainer  # Auto-generated, rarely direct PRs

/content/projects/agents/   @agents-maintainer @lead-maintainer
/content/projects/llms/     @llm-maintainer @lead-maintainer
/content/projects/rag/      @rag-maintainer @lead-maintainer
/content/observability/     @obs-maintainer @lead-maintainer
/content/research/          @research-maintainer @lead-maintainer
/content/tools/             @tools-maintainer @lead-maintainer
/content/architectures/     @arch-maintainer @lead-maintainer
/content/skills/            @lead-maintainer
/content/tips-and-tricks/   @lead-maintainer
/content/build-examples/    @lead-maintainer
/content/community/         @community-maintainer
/content/trending/          @trending-maintainer

# Catch-all — lead maintainer reviews anything not explicitly covered
*                           @lead-maintainer
```

### 9.6 Contributor Recognition System

```markdown
# In CONTRIBUTING.md:

## Recognition

Every merged contribution earns recognition:

| Contribution Type | Recognition |
|---|---|
| First merged PR | Added to CONTRIBUTORS.md + "first-contribution" badge |
| 5+ merged PRs | Listed in README.md contributors section |
| 10+ merged PRs | Invited to become section maintainer |
| Maintains a section for 3+ months | Eligible for full maintainer role |

Contributors are tracked via the GitHub contribution graph naturally,
but we also maintain CONTRIBUTORS.md manually for prominent contributors.
```

---

## 10. Governance & Maintenance Model

### 10.1 Role Hierarchy

```
ROLE HIERARCHY
══════════════

BDFL / Lead Maintainer (1 person)
├── Final decision authority on architecture and direction
├── Merge authority on /schemas/, /scripts/, /.github/
└── Resolves disputes

Section Maintainers (1-2 per section)
├── Review and merge PRs in their section within 72 hours
├── Flag content that needs updating
├── Run monthly quality audit of their section
└── Vote on cross-cutting changes

Contributors (everyone)
├── Submit PRs following templates
├── Report issues
└── Review others' PRs (non-blocking but encouraged)

Bots (automated)
├── schema-validator (blocks invalid PRs)
├── link-checker (flags broken links)
├── star-tracker (updates metrics)
└── stale-bot (flags old entries)
```

### 10.2 Decision Making Process

```
DECISION TYPES AND PROCESS:
════════════════════════════

TYPE A — Content decisions (add/remove/update specific entry)
→ Section maintainer approval sufficient
→ No discussion required for clear-cut cases

TYPE B — Schema changes (add/modify fields in schemas)
→ Must be proposed in GitHub Discussions first
→ 72-hour comment period
→ Lead maintainer final decision

TYPE C — Taxonomy changes (add/remove/rename tags)
→ GitHub Discussion required
→ 1-week comment period (affects all existing content)
→ Lead maintainer + 2 section maintainers must agree

TYPE D — Architecture changes (repo structure, new sections, tooling)
→ RFC (Request for Comments) document required
→ 2-week discussion period
→ Community vote (non-binding) + lead maintainer decision

TYPE E — Governance changes
→ Full community discussion
→ 4-week comment period
→ Supermajority of maintainers required
```

### 10.3 Quality Maintenance SLAs

| Activity | Owner | Frequency | SLA |
|---|---|---|---|
| PR review | Section maintainer | Continuous | 72 hours |
| Broken link fix | Any maintainer | Weekly | 7 days after issue |
| Stale entry update | Section maintainer | Monthly | 30 days |
| Star count refresh | Automation | Weekly | Automated |
| Full content audit | Lead maintainer | Quarterly | Quarterly |
| Schema version review | Lead maintainer | Quarterly | Quarterly |

### 10.4 Deprecation Policy

When a tool or project becomes obsolete:

1. Status field changed to `deprecated` — entry stays, never deleted
2. A deprecation notice added to the top of the entry
3. Reason for deprecation documented
4. Alternative entries linked

> **Entries are never deleted.** The history of the AI field is part of the value.

---

## 11. UI Layer — Future Architecture

### 11.1 Design Principles for the UI

The UI is a **separate repository** (`ai-arsenal-ui`) that consumes the data layer from this repo. This separation is non-negotiable:

```
ai-arsenal/         ← This repo. Content is king. No UI code here.
ai-arsenal-ui/      ← Future repo. Purely a consumer of /data/*.json
```

### 11.2 Recommended Technology Stack (When Built)

```
Framework:   Astro (best for content sites, island architecture)
             OR Next.js 14+ (App Router) if more interactivity needed
Styling:     Tailwind CSS + shadcn/ui components
Search:      FlexSearch (client-side, zero server, pre-built index)
Hosting:     Vercel or Cloudflare Pages (both support static + edge)
Data:        Fetch /data/*.json from this repo's raw GitHub URL or CDN
```

**Why Astro:** It generates static HTML by default, is perfect for content-heavy sites, supports MDX, and has excellent performance characteristics. The search is client-side so zero API server needed.

### 11.3 UI Page Architecture

```
PAGES / ROUTES:
══════════════

/                       → Home: Hero + Stats + Trending + Recent additions
/projects               → Browse all projects (filter/sort)
/projects/[id]          → Single project detail page
/tools                  → Browse all tools (filter/sort by job, cost, stack)
/tools/[id]             → Single tool detail page
/tools/by-job/[job]     → Tools filtered by specific job
/research               → Papers + SOTA benchmarks
/research/[id]          → Single paper view
/architectures          → Reference stacks + decision trees
/architectures/[stack]  → Individual reference stack
/architectures/decide   → Interactive decision tree UI (key feature)
/tips                   → Browse all tips (filter by category, difficulty)
/skills                 → Learning paths + core concepts
/build-examples         → Browse all build examples
/community              → People, channels, podcasts, newsletters
/trending               → This week + this month + hall of fame
/digests                → Monthly digest archive
/search                 → Full search results page
/compare                → Tool/Project comparison page (power feature)
/tags/[tag]             → All entries with a specific tag
/stats                  → Repository statistics dashboard
```

### 11.4 Key UI Features to Design For (Now, in the Data Layer)

These features must be enabled by the data schema from Day 1:

**Feature 1: Compare Mode**
```
User selects 2-3 tools/projects → side-by-side comparison table
Requires: All compared fields to be in frontmatter (not prose)
Data fields needed: all structured frontmatter fields ✓ (already designed)
```

**Feature 2: Interactive Decision Trees**
```
UI renders decision tree as interactive flow (not just Markdown)
Requires: Decision tree content in parseable format
Solution: decision-tree .md files use a specific Markdown convention
          that the UI can parse into a graph structure
```

**Feature 3: Personalized Stack Builder**
```
User picks their use case, constraints → Arsenal recommends a full stack
Requires: integrates_with, alternatives, job fields on all entries ✓
```

**Feature 4: Tag-based Discovery**
```
Click any tag anywhere → see all entries with that tag
Requires: tags.json with counts + consistent tag vocabulary ✓
```

**Feature 5: Trending Dashboard**
```
Visual trending chart of top projects
Requires: trending_score, github_stars, added_date ✓
```

**Feature 6: Weekly Email Digest**
```
Subscribe to weekly updates (new entries, trending)
Requires: CHANGELOG.md in consistent format + digest metadata ✓
Implementation: Buttondown or ConvertKit consuming /data/digests.json
```

### 11.5 Data Fetching Strategy for UI

```javascript
// The UI fetches data at BUILD TIME (static generation)
// This means the site is fully static — no backend required

// In Astro/Next.js:
export async function getStaticProps() {
  // Fetch from GitHub raw content (free CDN)
  const DATA_BASE = 
    "https://raw.githubusercontent.com/[org]/ai-arsenal/main/data"
  
  const [projects, tools, papers, tags, stats] = await Promise.all([
    fetch(`${DATA_BASE}/projects.json`).then(r => r.json()),
    fetch(`${DATA_BASE}/tools.json`).then(r => r.json()),
    fetch(`${DATA_BASE}/papers.json`).then(r => r.json()),
    fetch(`${DATA_BASE}/tags.json`).then(r => r.json()),
    fetch(`${DATA_BASE}/stats.json`).then(r => r.json()),
  ])
  
  return { props: { projects, tools, papers, tags, stats } }
}

// Rebuild UI on schedule (Vercel cron or GitHub Actions trigger)
// → Every merge to ai-arsenal/ triggers a rebuild of ai-arsenal-ui/
```

---

## 12. LLM & Agent Optimization Layer

### 12.1 The AGENT.md Full Specification

```markdown
# AGENT.md — AI Arsenal Navigation Map
# Version: auto-updated
# Purpose: Optimized entry point for LLM/agent consumption
# Tokens: <2000 (fits in any context window)

## REPOSITORY PURPOSE
A curated, structured knowledge base for AI engineering.
Contains: projects, tools, research papers, architectures,
tips, build examples, and community resources.
All focused on: AI, LLM, agents, RAG, observability, SOTA.

## NAVIGATION MAP
To answer questions about:

WHAT TOOLS EXIST FOR A JOB?
→ /content/tools/by-job/[job-name].md
→ Available jobs: prototyping, production-serving, fine-tuning,
  evaluation, deployment, orchestration, vector-search,
  memory-management, web-scraping, structured-output,
  prompt-management, data-labeling, model-registry,
  security-and-guardrails

WHAT OPEN SOURCE PROJECTS ARE NOTABLE?
→ /content/projects/[category]/
→ Categories: agents, llms, rag, observability, multimodal,
  voice-audio, computer-vision, code-generation, data-pipelines

WHAT'S CURRENTLY TRENDING?
→ /content/trending/this-week.md     (most recent)
→ /content/trending/this-month.md
→ /content/trending/hall-of-fame.md

WHAT ARCHITECTURE/STACK SHOULD I USE?
→ /content/architectures/reference-stacks/ (opinionated stacks)
→ /content/architectures/decision-trees/   (when-to-use-what)

RESEARCH PAPERS AND SOTA?
→ /content/research/must-read-papers.md
→ /content/research/sota-benchmarks.md
→ /content/research/papers/ (individual paper summaries)

OBSERVABILITY AND LLMOPS?
→ /content/observability/

TIPS AND OPTIMIZATION?
→ /content/tips-and-tricks/

BUILD EXAMPLES / REFERENCE IMPLEMENTATIONS?
→ /content/build-examples/

WHO TO FOLLOW / COMMUNITY?
→ /content/community/

## DATA LAYER (for programmatic access)
→ /data/projects.json  (all projects, structured)
→ /data/tools.json     (all tools, structured)
→ /data/index.json     (lightweight master index)

## KEY TAXONOMY
Tags: agents | rag | llm | fine-tuning | embeddings | evaluation |
      inference | multimodal | observability | self-hosted | trending
Cost: open-source | freemium | paid | self-hostable
Maturity: experimental | alpha | beta | production

## LAST UPDATED: [auto-generated timestamp]
## TOTAL ENTRIES: [auto-generated count]
```

### 12.2 CONTEXT.md — The Dense LLM Summary

This file is regenerated by `scripts/generate-context.js` after every merge. It is designed to fit within 3500-4000 tokens and give an LLM maximum orientation with minimum tokens:

```markdown
# AI Arsenal — Dense Context Summary
# Generated: [timestamp] | Entries: [count]

## Top Projects by Category (trending score desc)

### Agents & Frameworks
- LangGraph (⭐8.2k, score:92) — stateful multi-agent graphs
- CrewAI (⭐18k, score:88) — role-based multi-agent orchestration
- AutoGen (⭐27k, score:85) — Microsoft conversational agents
[... top 5 per category ...]

### LLMs & Inference
- Ollama (⭐54k, score:95) — run local LLMs easily
- vLLM (⭐18k, score:90) — fast LLM inference server
[...]

### RAG
[...]

### Observability
[...]

## Top Tools by Job
### Evaluation: DeepEval, RAGAS, LangSmith, Phoenix
### Vector DBs: Qdrant, Weaviate, Chroma, Pgvector
### Fine-tuning: Unsloth, Axolotl, LlamaFactory
### Deployment: Modal, BentoML, Fly.io

## Architecture Quick Refs
- MVP Stack: Ollama + LangChain + Chroma + Streamlit
- Production RAG: vLLM + LlamaIndex + Qdrant + FastAPI + Langfuse
- Multi-Agent: LangGraph + GPT-4 + Redis + LangSmith
- Local-First: Ollama + LangChain + ChromaDB + Gradio

## Key Decision Heuristics
- Need local/private LLMs? → Ollama + llama.cpp
- Need fast inference at scale? → vLLM
- Simple RAG? → LlamaIndex or LangChain
- Complex multi-step agents? → LangGraph
- Simple role-based agents? → CrewAI
- Tracing/observability? → Langfuse (OSS) or LangSmith (managed)
- Vector DB self-hosted? → Qdrant (performance) or Chroma (simplicity)

## Recent Additions (last 30 days)
[auto-generated list of last 10 entries]
```

### 12.3 Prompt Templates — Full Specification

```markdown
<!-- meta/prompt-templates/project-ideation.md -->

# Prompt Template: Project Ideation & Stack Selection

## When to Use
When starting a new AI project and need architecture + tool recommendations.

## Template
---
You have access to the AI Arsenal knowledge base at [REPO_URL].
The repository contains curated information about AI tools, projects,
architectures, and best practices.

I am building: [PROJECT DESCRIPTION]

My constraints:
- Budget: [free / <$50/mo / <$500/mo / enterprise]
- Hosting preference: [local / cloud / hybrid]
- Primary language: [Python / TypeScript / both]
- Team size: [solo / small (2-5) / large (5+)]
- Timeline: [prototype / production-ready]
- Scale: [personal / startup / enterprise]

Using the Arsenal, please:
1. Recommend the best reference stack from /content/architectures/reference-stacks/
2. List the top 3 tools for each job I'll need (from /content/tools/by-job/)
3. Identify similar build examples from /content/build-examples/
4. Flag the top 3 tips relevant to my stack from /content/tips-and-tricks/
5. List 2-3 open source projects I should study from /content/projects/
6. Note any observability setup I should implement from /content/observability/

Format your response as a structured architecture decision record (ADR).
---
```

---

## 13. Tooling & Technology Choices

### 13.1 Technology Decision Record

Every tool choice is documented with explicit rationale:

| Component | Choice | Rationale | Alternatives Considered |
|---|---|---|---|
| **Schema Validation** | `ajv` (JSON Schema) | Industry standard, fast, great error messages | Zod (TS-only), Joi |
| **Frontmatter Parsing** | `gray-matter` | Most popular, battle-tested, fast | `front-matter`, custom |
| **Markdown Processing** | `remark` + `rehype` | Composable, plugin ecosystem | `marked`, `markdown-it` |
| **Search Index** | `FlexSearch` | Best client-side perf, no server needed | Lunr.js, MiniSearch |
| **Link Checking** | Custom + `node-fetch` | Full control over rate limiting & GitHub auth | `linkinator`, `markdown-link-check` |
| **TOC Generation** | Custom script | Specific to our multi-level structure | `doctoc`, `markdown-toc` |
| **CI Platform** | GitHub Actions | Free for open source, tight GitHub integration | CircleCI, GitLab CI |
| **Package Manager** | `pnpm` | Fast, disk efficient, monorepo-ready | npm, yarn |
| **Runtime** | Node.js 20 LTS | Stable, native fetch, wide support | Bun (too new for CI), Deno |
| **Future UI Framework** | Astro | Best for content sites, zero JS by default | Next.js, SvelteKit |
| **Future Hosting** | Cloudflare Pages | Free tier, global CDN, edge functions | Vercel, Netlify |
| **Future Search** | Algolia DocSearch | Free for open source docs | Typesense, Meilisearch |

### 13.2 `package.json` Root Config

```json
{
  "name": "ai-arsenal",
  "version": "1.0.0",
  "description": "A curated, structured knowledge base for AI engineering",
  "private": true,
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  },
  "scripts": {
    "validate": "node scripts/validate-schema.js",
    "validate:taxonomy": "node scripts/validate-taxonomy.js",
    "validate:links": "node scripts/check-links.js --changed-only",
    "validate:all": "pnpm run validate && pnpm run validate:taxonomy",
    "generate": "node scripts/generate-data.js",
    "generate:search": "node scripts/generate-search-index.js",
    "generate:toc": "node scripts/generate-toc.js",
    "generate:context": "node scripts/generate-context.js",
    "generate:all": "pnpm run generate && pnpm run generate:search && pnpm run generate:toc && pnpm run generate:context",
    "update:stars": "node scripts/update-star-counts.js",
    "check:links": "node scripts/check-links.js --all",
    "check:stale": "node scripts/check-stale.js",
    "check:duplicates": "node scripts/check-duplicates.js",
    "new:project": "node scripts/scaffold.js --type=project",
    "new:tool": "node scripts/scaffold.js --type=tool",
    "new:paper": "node scripts/scaffold.js --type=paper",
    "new:tip": "node scripts/scaffold.js --type=tip",
    "dev": "node scripts/watch.js",
    "ci": "pnpm run validate:all && pnpm run check:duplicates"
  },
  "dependencies": {
    "ajv": "^8.12.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1",
    "flexsearch": "^0.7.43",
    "node-fetch": "^3.3.2",
    "chalk": "^5.3.0",
    "glob": "^10.3.10",
    "js-yaml": "^4.1.0",
    "date-fns": "^3.3.1"
  },
  "devDependencies": {
    "prettier": "^3.2.5"
  }
}
```

### 13.3 The `scaffold.js` CLI Tool

A crucial contributor experience improvement — instead of copying templates manually, contributors run:

```bash
pnpm run new:project
```

And get an interactive CLI:

```
? What is the project name? LangGraph
? GitHub URL? https://github.com/langchain-ai/langgraph
? One-line description? (max 160 chars) A framework for building stateful...
? Primary category? (Use arrow keys)
  ❯ agents
    llms
    rag
    observability
? Select tags (space to select, enter to confirm)
  ◉ agents
  ◉ orchestration
  ○ rag
? Maturity level? production
? Your GitHub username? yourhandle

✅ Created: content/projects/agents/frameworks/langgraph.md
📋 Frontmatter pre-filled with all required fields
📝 Open the file and complete the markdown body sections
🔍 Run `pnpm run validate` to check before committing
```

---

## 14. Phased Rollout Plan

### 14.1 Phase Overview

```
PHASE 1: Foundation (Week 1)
PHASE 2: Core Content (Weeks 2-3)
PHASE 3: Automation (Week 3-4)
PHASE 4: Community Launch (Week 4-5)
PHASE 5: UI Layer (Month 2-3)
PHASE 6: Scale & Features (Month 3+)
```

### 14.2 Phase 1 — Foundation (Week 1)

**Goal:** The skeleton is built. Everything has a place. Zero content yet.

```
DAY 1-2: Repository Initialization
□ Create GitHub repository with correct settings
□ Enable GitHub Discussions
□ Set up branch protection on main (require PR + 1 approval)
□ Create all folders per Section 4 (with .gitkeep where empty)
□ Write README.md (skeleton with all sections linked)
□ Write AGENT.md (full version per Section 12.1)
□ Write TAXONOMY.md (full initial vocabulary)
□ Write CONTRIBUTING.md
□ Write GOVERNANCE.md
□ Write CODE_OF_CONDUCT.md

DAY 3: Schema Layer
□ Write all 6 JSON schemas per Section 5
□ Write templates/ for all entry types
□ Set up package.json with all dependencies
□ Implement validate-schema.js
□ Implement validate-taxonomy.js
□ Test validation with intentionally bad frontmatter (ensure errors are clear)

DAY 4: GitHub Infrastructure
□ All 6 Issue Templates (Section 9.3)
□ PR Template (Section 9.4)
□ CODEOWNERS (Section 9.5)
□ on-pr.yml workflow (validation only)
□ Test PR validation pipeline with dummy PR

DAY 5: Scaffolding & DX
□ Implement scaffold.js (interactive CLI)
□ Implement check-duplicates.js
□ Write meta/how-to-use-with-llm.md
□ Write meta/how-to-use-for-humans.md
□ All prompt templates (Section 12.3)
□ Create _index.md for every section folder
□ Add CONTEXT.md skeleton (will be auto-generated later)
```

**Phase 1 Deliverable:** A fully structured empty repo that anyone can navigate, contribute to with clear templates, and that blocks bad PRs automatically.

### 14.3 Phase 2 — Core Content (Weeks 2-3)

**Goal:** Enough content to be useful. Focus on highest-value sections first.

```
PRIORITY ORDER (by value to LLM/agent use case):

WEEK 2, PRIORITY 1: Architecture Decision Trees
□ architectures/decision-trees/choose-llm.md
□ architectures/decision-trees/choose-vector-db.md
□ architectures/decision-trees/choose-agent-framework.md
□ architectures/decision-trees/rag-vs-fine-tuning.md
□ architectures/decision-trees/choose-memory-solution.md
(These alone make the repo valuable as LLM context)

WEEK 2, PRIORITY 2: Reference Stacks
□ architectures/reference-stacks/lean-mvp.md
□ architectures/reference-stacks/production-rag.md
□ architectures/reference-stacks/multi-agent-system.md
□ architectures/reference-stacks/local-first.md

WEEK 2, PRIORITY 3: Top 20 Tools (by-job)
□ tools/by-job/vector-search.md (top 6 vector DBs)
□ tools/by-job/fine-tuning.md (top 5 fine-tuning tools)
□ tools/by-job/evaluation.md (top 5 eval tools)
□ tools/by-job/prototyping.md (Gradio, Streamlit, Chainlit)
□ tools/by-job/production-serving.md (top 5)

WEEK 3, PRIORITY 4: Top 30 Projects
□ projects/agents/frameworks/ (top 6: LangGraph, CrewAI, AutoGen, ...)
□ projects/llms/inference-engines/ (Ollama, vLLM, llama.cpp, TGI)
□ projects/llms/open-source-models/ (Llama 3, Mistral, Qwen, Phi, Gemma)
□ projects/rag/frameworks/ (LlamaIndex, LangChain)
□ projects/rag/vector-databases/ (Qdrant, Weaviate, Chroma, Pgvector)
□ projects/observability/tracing/ (Langfuse, LangSmith, Phoenix)

WEEK 3, PRIORITY 5: Observability Section
□ observability/overview.md
□ observability/tracing-and-monitoring.md
□ observability/evaluation-pipelines.md
□ observability/cost-tracking.md
```

**Phase 2 Deliverable:** ~60 high-quality entries. Enough to be meaningfully useful as LLM context. The decision trees alone are worth sharing publicly.

### 14.4 Phase 3 — Automation (Week 3-4)

**Goal:** The repo maintains itself. Humans add content; machines keep it fresh.

```
□ Implement generate-data.js (Markdown → JSON)
□ Implement generate-search-index.js
□ Implement generate-toc.js
□ Implement generate-context.js
□ Implement update-star-counts.js (GitHub API integration)
□ Implement calculate-trending.js
□ Implement check-links.js (full + changed-only modes)
□ Implement check-stale.js
□ Implement create-link-issues.js (auto-create GitHub issues for broken links)
□ Implement draft-trending.js (weekly trending draft)
□ Implement create-monthly-digest.js

□ Set up on-merge.yml (data regeneration)
□ Set up weekly.yml (star updates, link check, trending draft)
□ Set up monthly.yml (digest creation, stale check)
□ Set up manual.yml (allow manual trigger of any job)

□ Test full pipeline end-to-end
□ Verify /data/*.json is being generated correctly
□ Verify CONTEXT.md is being regenerated
```

**Phase 3 Deliverable:** Fully automated content freshness. The repo now runs itself with minimal human intervention.

### 14.5 Phase 4 — Community Launch (Week 4-5)

**Goal:** Public launch. First external contributors.

```
PRE-LAUNCH:
□ Add content/trending/this-week.md (first edition, manually curated)
□ Add content/trending/hall-of-fame.md
□ Add content/community/people-to-follow.md (top 20 AI builders)
□ Add content/community/youtube-channels.md
□ Add content/community/newsletters.md
□ Add 5 build examples (2 starter, 2 intermediate, 1 advanced)
□ Add 20 tips across all categories
□ Add content/research/must-read-papers.md (top 15 papers)
□ Write detailed CONTRIBUTING.md (the public-facing version)
□ Add CONTRIBUTORS.md
□ Final review of all content for quality

LAUNCH:
□ Post on X/Twitter with AGENT.md and decision tree highlights
□ Post to r/LocalLLaMA and r/MachineLearning
□ Submit to relevant newsletters
□ Create first GitHub Discussion: "What should we add next?"
□ Pin a "Good First Issues" issue (simple content additions)

POST-LAUNCH:
□ Monitor and respond to all issues within 24 hours
□ Review first wave of community PRs
□ Update CONTRIBUTING.md based on questions received
□ Begin inviting top contributors to section maintainer roles
```

### 14.6 Phase 5 — UI Layer (Month 2-3)

**Goal:** Build the web UI as a separate repository consuming `/data/*.json`

```
□ Create ai-arsenal-ui repository
□ Initialize Astro project with Tailwind + shadcn/ui
□ Build data fetching layer (consumes /data/*.json from GitHub raw)
□ Build home page (hero, stats, trending)
□ Build projects browser with filter/sort
□ Build tools browser (by-job, by-cost, by-stack)
□ Build search (client-side FlexSearch)
□ Build tag browsing (/tags/[tag])
□ Build single entry detail pages
□ Build compare tool (side-by-side comparison)
□ Build interactive decision tree UI
□ Set up Cloudflare Pages deployment
□ Set up auto-rebuild trigger when ai-arsenal main is updated
□ Implement Algolia DocSearch (free for open source)
```

### 14.7 Phase 6 — Scale & Advanced Features (Month 3+)

```
□ GitHub Releases as newsletter (weekly digest via GitHub Releases)
□ Email digest (Buttondown.email consuming /data/digests.json)
□ Mermaid diagram exports (auto-generate PNG from .mmd files)
□ Cross-reference index (/data/xref.json — concept → tools → papers → examples)
□ API layer (Cloudflare Workers wrapping /data/*.json for filtering)
□ Personalization (local storage-based "my stack" bookmarks in UI)
□ Mobile app (Expo consuming the data API)
□ VS Code extension (access Arsenal from your IDE)
□ Slack/Discord bot (query the Arsenal from Discord)
□ Contribution analytics dashboard
```

---

## 15. Risk Register & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Content goes stale rapidly** | High | High | Automated star tracking, stale-bot issues, `last_reviewed` field mandatory |
| **Schema changes break existing content** | Medium | High | Semantic versioning on schemas, migration scripts for breaking changes, `schema_version` field in all JSON output |
| **Low contributor quality** | Medium | High | Strict PR template, automated schema validation blocks bad PRs, CODEOWNERS ensures expert review |
| **Maintainer burnout** | Medium | High | Clear governance model, section maintainer distribution, automation reducing manual work |
| **Scope creep into non-AI topics** | Medium | Medium | TAXONOMY.md as gatekeeper, GOVERNANCE.md defines scope explicitly, lead maintainer guards |
| **GitHub API rate limiting** | Low | Medium | Use authenticated requests in Actions, cache results, run star updates weekly not daily |
| **Contributor gaming (self-promotion)** | Medium | Medium | CODEOWNERS review required, contributor disclosure required in issue template, history via Git |
| **Search index too large** | Low | Low | Lazy load search index, compress JSON, consider splitting by type |
| **UI data sync lag** | Low | Low | UI rebuild triggered by GitHub webhook on main push |
| **Fork proliferation without attribution** | Low | Low | MIT License chosen intentionally, CITATION.md added |

---

## 16. Appendices

### Appendix A: File Naming Conventions

```
Rule 1: All filenames are kebab-case (lowercase, hyphens)
Rule 2: No spaces, no underscores (except _index.md and _registry.md)
Rule 3: The entry ID in frontmatter MUST match the filename (without .md)
Rule 4: _index.md = section navigation file (NOT a content entry)
Rule 5: _registry.md = auto-generated, never edit manually

Examples:
✅ langgraph.md          (id: "langgraph")
✅ rag-vs-fine-tuning.md (id: "rag-vs-fine-tuning")
❌ LangGraph.md
❌ rag_vs_fine_tuning.md
❌ RAGvsFinetuning.md
```

### Appendix B: Git Commit Convention

```
Format: <type>(<scope>): <description>

Types:
  feat     → New content entry
  update   → Update existing content
  fix      → Fix error, broken link, typo
  chore    → Auto-generated updates (star counts, TOC, data files)
  docs     → Documentation (CONTRIBUTING, README, etc.)
  schema   → Schema changes
  infra    → GitHub Actions, scripts, tooling

Scopes (optional):
  projects, tools, research, architectures, tips, observability,
  build-examples, community, trending, schemas, scripts, ci

Examples:
  feat(projects): add LangGraph agent framework entry
  update(tools): refresh Langfuse pricing info
  fix(links): fix broken arxiv link in attention paper
  chore(data): regenerate data layer [skip ci]
  schema(tool): add verified_by field to tool schema
```

### Appendix C: Reserved IDs

The following IDs are reserved and cannot be used for content entries:

```
index, registry, overview, introduction, readme, agent, context,
taxonomy, contributing, governance, changelog, security, template,
all, none, undefined, null, true, false
```

### Appendix D: The `[skip ci]` Contract

Any commit with `[skip ci]` in the message will NOT trigger GitHub Actions. This is used exclusively for auto-generated commits (data regeneration, TOC updates) to prevent infinite loops. Human commits must NEVER use `[skip ci]`.

### Appendix E: Schema Versioning Policy

```
Schema Version: MAJOR.MINOR.PATCH (stored in each schema file)

PATCH: Adding an optional field, fixing a description
  → No migration needed, backward compatible

MINOR: Adding a required field with a default value
  → Migration script provided, runs automatically

MAJOR: Renaming/removing fields, changing field types
  → Full RFC process required (Section 10.2, Type B)
  → Migration script provided
  → 2-week notice before merge
  → All existing content migrated in same PR
```

### Appendix F: Quick Reference Card for Contributors

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  AI ARSENAL — CONTRIBUTOR QUICK REFERENCE              │
│                                                        │
│  ADDING A PROJECT:                                     │
│  1. pnpm run new:project                              │
│  2. Fill in the generated file                        │
│  3. pnpm run validate                                 │
│  4. git commit -m "feat(projects): add [name]"        │
│  5. Open PR using template                            │
│                                                        │
│  VALID FILE LOCATIONS:                                 │
│  Projects  → content/projects/[category]/[sub]/       │
│  Tools     → content/tools/by-job/[job].md            │
│              OR content/tools/by-cost/[tier].md       │
│  Papers    → content/research/papers/[slug].md        │
│  Tips      → content/tips-and-tricks/[category].md   │
│                                                        │
│  NEVER EDIT:                                          │
│  - /data/*.json  (auto-generated)                    │
│  - */_registry.md  (auto-generated)                  │
│  - CHANGELOG.md  (auto-generated)                    │
│  - CONTEXT.md  (auto-generated)                      │
│                                                        │
│  NEED HELP?                                           │
│  → GitHub Discussions → "Q&A" category               │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Document Metadata

| Field | Value |
|---|---|
| **Document Version** | 1.0.0 |
| **Status** | Authoritative — Ready for Implementation |
| **Authors** | [Your Name] |
| **Reviewers** | — |
| **Last Updated** | 2025-06-13 |
| **Next Review** | After Phase 1 complete |
| **Supersedes** | Nothing (initial document) |
| **Superseded By** | Nothing yet |

---

> **Implementation Note for the Agent:**
> This document is the authoritative blueprint. Implement in strict Phase order. Phase 1 (Foundation) must be 100% complete before any content is added. The schema layer and validation pipeline are the most critical components — they are the quality guarantors for everything that follows. When in doubt, refer to the Core Principles in Section 2. All architectural decisions flow from those five pillars.
