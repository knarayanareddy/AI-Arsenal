---
id: khoj
name: "Khoj"
version_tracked: null
artifact_type: platform
category: agents
subcategory: platforms
description: "Self-hostable AI second brain: chat over your notes and documents, custom agents, scheduled automations, and deep research across local or hosted LLMs"
github_url: "https://github.com/khoj-ai/khoj"
license: "AGPL-3.0"
primary_language: Python
org_or_maintainer: "Khoj (YC-backed)"
tags: [agents, rag, self-hosted]
maturity: production
cost_model: open-source
github_stars: 35524
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-06-24"
docs_url: "https://docs.khoj.dev"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed, actively-maintained, community-driven]
ecosystem_role:
  - "The personal-knowledge-first assistant: where document-chat appliances treat files as a corpus, Khoj treats your continuously-updated notes (Obsidian, org-mode, Emacs, WhatsApp) as a second brain, adding custom agents, scheduled automations, and research modes on top."
best_for:
  - "You live in Obsidian/org-mode/markdown notes and want an assistant that stays in sync with them — first-class editor plugins and incremental indexing are the differentiator"
  - "You want scheduled/automated AI workflows (daily digests, recurring research) from a self-hosted personal assistant rather than one-off chat sessions"
avoid_if:
  - "You need team/multi-user knowledge management with permissions — Khoj is personal-first; Onyx or AnythingLLM's multi-user Docker mode fit organizations better"
  - "AGPL licensing conflicts with embedding it in your commercial product — the license is deliberately copyleft"
upstream_dependencies: []
downstream_consumers: []
alternatives: [anythingllm, open-webui]
integrates_with: [ollama]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (35,524), primary language, license, and last commit (2026-06-24) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/khoj-ai/khoj", "date": "2026-07-08", "description": "35,524 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source personal AI application positioned as a 'second brain': it indexes your notes and documents (markdown, org-mode, PDFs, Notion, GitHub), keeps them searchable semantically, and layers chat, custom agents with tuned personalities and tools, scheduled automations, and a deep-research mode over any LLM — self-hosted or via its hosted cloud.

## Why it's in the Arsenal

The personal-knowledge-first assistant: where document-chat appliances treat files as a corpus, Khoj treats your continuously-updated notes (Obsidian, org-mode, Emacs, WhatsApp) as a second brain, adding custom agents, scheduled automations, and research modes on top. It earns a place in the Arsenal because it directly addresses a recurring decision point: you live in Obsidian/org-mode/markdown notes and want an assistant that stays in sync with them — first-class editor plugins and incremental indexing are the differentiator. See Strengths / Limitations below before adopting it.

## Architecture

A Django-based server indexes content incrementally into embeddings (local sentence-transformers or hosted), with clients for web, Obsidian, Emacs, WhatsApp, and desktop keeping sources synced. Chat routes through configurable LLMs (Ollama-served local models or any API provider); agents combine custom instructions, knowledge subsets, and tools (web search, code execution); automations run agent tasks on cron schedules delivered by email.

## Ecosystem Position

Upstream: sentence-transformers for local embeddings, any LLM backend. Competing: AnythingLLM and Open WebUI (document/chat appliances), Rewind/commercial personal-AI products. Complementary: editor integrations make it the strongest open option for the PKM (personal knowledge management) community; YC backing plus an active open-source cadence signal sustainability.

## Getting Started

```bash
pip install khoj
khoj --anonymous-mode
# open localhost:42110, connect your notes folder or Obsidian vault, pick a local or hosted LLM
```

## Key Use Cases

1. **Scenario**: you live in Obsidian/org-mode/markdown notes and want an assistant that stays in sync with them — first-class editor plugins and incremental indexing are the differentiator
2. **Scenario**: you want scheduled/automated AI workflows (daily digests, recurring research) from a self-hosted personal assistant rather than one-off chat sessions

## Strengths

- You live in Obsidian/org-mode/markdown notes and want an assistant that stays in sync with them — first-class editor plugins and incremental indexing are the differentiator
- You want scheduled/automated AI workflows (daily digests, recurring research) from a self-hosted personal assistant rather than one-off chat sessions

## Limitations

- You need team/multi-user knowledge management with permissions — Khoj is personal-first; Onyx or AnythingLLM's multi-user Docker mode fit organizations better
- AGPL licensing conflicts with embedding it in your commercial product — the license is deliberately copyleft

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/khoj-ai/khoj)
- [Documentation](https://docs.khoj.dev)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (35,524 stars, last commit 2026-06-24, verified via GitHub API on 2026-07-08)*
