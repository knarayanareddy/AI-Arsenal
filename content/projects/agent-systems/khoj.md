---
id: khoj
name: "Khoj"
version_tracked: null
artifact_type: platform
category: agents
subcategory: platforms
description: "Self-hostable personal AI that searches your documents and the web, answers with citations, and runs scheduled automations from any surface"
github_url: "https://github.com/khoj-ai/khoj"
license: AGPL-3.0
primary_language: Python
org_or_maintainer: "Khoj (YC-backed)"
tags: [self-hosted, rag]
maturity: production
cost_model: self-hostable
github_stars: 37531
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-08-02"
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
best_for: ["You have a large personal corpus across markdown, PDF, Word, org-mode and Notion exports and you want one semantic search surface that reaches all of it from Obsidian or Emacs.", "You want to point a personal assistant at a local model through llama.cpp or any hosted provider and keep the option of running the whole thing on your own machine.", "You want recurring research handled for you, because scheduled automations deliver personal newsletters and smart notifications to your inbox on a timer."]
avoid_if: ["You are embedding an agent in a product, because this is a personal-assistant application with its own surfaces rather than a library with a stable programmatic interface.", "Your organisation forbids strong-copyleft dependencies in shipped software, because the project is AGPL-3.0 and that reaches networked use.", "You need a guaranteed latency SLA on retrieval, because it is a chat-and-search product that calls whatever model you configure and inherits that model's latency."]
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

Khoj is a personal AI application that extends from on-device use to a cloud-scale deployment, covering chat with local or online models including llama3, qwen, gemma, mistral, GPT, Claude, Gemini and DeepSeek. It retrieves from both the internet and your own documents, with the README naming image, PDF, markdown, org-mode, Word and Notion files, and it is reachable from a browser, Obsidian, Emacs, a desktop app and WhatsApp. Beyond answering, it lets you create agents with custom knowledge, persona, chat model and tools, and schedule automations that push newsletters and notifications to your inbox. It also generates images, speaks, and plays back messages. The project markets itself as open-source and self-hostable without exception, with a hosted app available when you do not want to run it.

## Why it's in the Arsenal

The decision it removes is whether a personal assistant has to hand your notes to a vendor. Khoj is designed so the whole stack, including the model, can live on your machine, which matters when the corpus is a decade of private notes. It also removes the fragmentation of having a separate app for each surface: the same agent is available from an editor, a phone and a chat app rather than three disconnected copies of the same assistant. The trade is that self-hosting means you own updates, model downloads and the embedding of a retrieval stack into your own schedule.

## Architecture

The Python service ingests documents of several formats into a semantic search index, and the README points to a published write-up on its retrieval and reasoning benchmark results rather than publishing numbers inline. Query handling is model-agnostic: a local llama.cpp backend or any hosted provider can serve the same chat surface, so the assistant is a client of the inference layer rather than an owner of it. On top of retrieval sit agent definitions carrying their own knowledge base, persona, chat model and tool set, plus a scheduler for recurring automations that generate newsletters and notifications for inbox delivery. Surfaces are thin clients against that service: web, desktop, Obsidian and Emacs plugins, and WhatsApp, which is why the model-agnostic backend matters more than any single front end.

## Ecosystem Position

Khoj overlaps with the personal-RAG and second-brain tools such as AnythingLLM, Open WebUI and the Obsidian community plugins, and it competes with them on corpus breadth and the number of surfaces rather than on any single retrieval technique. Where AnythingLLM leans toward a workspace-and-document model and Open WebUI toward a general self-hosted chat front end, Khoj differentiates on semantic search across a personal file corpus plus editors and WhatsApp as first-class clients. It is an alternative to hosted assistants of the kind represented in content/projects/agent-systems, since running it locally with llama.cpp removes the API dependency entirely. It complements rather than competes with the vector database entries in content/projects/data-and-retrieval, which is where a larger or shared corpus would move.

## Getting Started

Self-hosting is the documented path, and pip plus a local model is the shortest version of it:

```bash
pip install khoj
khoj onboard
khoj search
```

`khoj onboard` walks through the interactive setup that registers a model provider or a local llama.cpp server, then points you at `$KHOJ_WORKSPACE` for the folder to index. Start the service with `khoj serve` and open the web client, or use the packaged Docker image from the workflow's published container. The setup docs at docs.khoj.dev cover the self-host and enterprise variants in more detail.

## Key Use Cases

1. Private corpus Q&A: index a notes and PDF directory and ask questions that cite the source document and section, entirely on your own hardware.
2. Editor-resident assistant: query the same index from inside Obsidian or Emacs so the answer arrives in the tool where you are already writing.
3. Scheduled personal research: define an automation that runs on a schedule and delivers a newsletter or a notification when something in your corpus or the web changes.

## Strengths

- Model-agnostic by design, spanning local llama.cpp backends and hosted providers, so the same assistant works offline and online.
- Exceptionally wide surface coverage for a personal tool: browser, desktop, Obsidian, Emacs, phone and WhatsApp against one index.
- Semantically searches a genuinely mixed corpus, spanning PDF, markdown, org-mode, Word and Notion exports rather than one file type.
- AGPL-3.0 with a hosted option alongside a documented self-host path, so you can start on the cloud app and move the same product in-house.

## Limitations

AGPL-3.0 is a real constraint if you intend to modify and serve the project, and it rules the code out of many closed-source commercial products without a separate arrangement. Self-hosting is genuinely yours: model downloads, index storage, embedding backends and upgrades are all your problem, and a personal corpus of a decade of notes plus PDFs is a non-trivial indexing job on modest hardware. Search quality inherits from the model you point it at, so a small local model gives weaker answers and the README's quality claims are argued in a blog post rather than in a reproducible benchmark table. The multi-surface ambition means many client integrations, and a WhatsApp bridge in particular adds a dependency on a third-party messaging policy you do not control.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the personal-assistant, self-hosted end of the phase, and it consumes the inference entries in content/projects/inference-engines such as llama-cpp directly when you run a local model. Read it against AnythingLLM and the other workspace assistants in the same phase to pick a personal-RAG shape, and against the vector database entries in content/projects/data-and-retrieval if your corpus outgrows a local index. The retrieval frameworks in content/projects/framework are the alternative if you need the same grounding inside an application you build rather than a personal assistant you run.

## Resources

- [GitHub — khoj-ai/khoj](https://github.com/khoj-ai/khoj)
- [Documentation — docs.khoj.dev](https://docs.khoj.dev)
- [Self-hosting setup guide](https://docs.khoj.dev/get-started/setup)
