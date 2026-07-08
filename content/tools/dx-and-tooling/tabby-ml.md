---
id: tabby-ml
name: "Tabby"
type: tool
job: [prototyping]
description: "Self-hosted, open-source AI coding assistant: an on-prem alternative to GitHub Copilot with completions and chat"
url: "https://www.tabbyml.com"
cost_model: open-source
pricing_detail: "Apache-2.0 core, free up to 5 users; paid tiers for larger teams and enterprise features"
tags: [code-gen, self-hosted, llm]
maturity: production
stack: [rust]
free_tier: true
free_tier_limits: "Community features free for up to 5 users"
self_hostable: true
open_source: true
source_url: "https://github.com/TabbyML/tabby"
docs_url: "https://tabby.tabbyml.com/docs/"
github_url: "https://github.com/TabbyML/tabby"
alternatives: [continue-dev, github-copilot]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [production]
best_when:
  - "Air-gapped or compliance-bound teams that need Copilot-style completions with zero code leaving the network"
  - "You have a spare GPU and want a turnkey server (Docker) plus IDE plugins rather than assembling vLLM + Continue yourself"
avoid_when:
  - "You want frontier-model quality — self-hosted completion models still trail hosted Copilot/Cursor noticeably"
  - "Solo developers without a GPU; hosted free tiers will serve you better"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (33,679), license, and last push (2026-06-30) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: solid-choice
verdict_rationale: "The most complete self-hosted Copilot alternative as a single product; quality bounded by the open models you run"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/TabbyML/tabby", "date": "2026-07-08", "description": "33,679 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A self-hosted AI coding assistant server written in Rust: Tabby serves code completions and chat from open models on your own GPUs, indexes your repositories for context-aware answers, and ships IDE extensions plus team management out of the box.

## Why It's in the Arsenal

Tabby earns a place in the Arsenal because it directly addresses a recurring decision point: air-gapped or compliance-bound teams that need Copilot-style completions with zero code leaving the network. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Self-hosted completion + chat server with OpenAPI interface
- Repository indexing for codebase-aware answers
- IDE plugins (VS Code, JetBrains, Vim) and usage analytics

## Architecture / How It Works

A single binary/container runs model serving (llama.cpp-based), a code-index pipeline over your repos, and the API that IDE plugins consume; teams administer models, users, and analytics from a web console.

## Getting Started

```bash
docker run -it --gpus all -p 8080:8080 -v $HOME/.tabby:/data tabbyml/tabby serve --model StarCoder-1B --device cuda
```

## Use Cases

1. **Scenario**: air-gapped or compliance-bound teams that need Copilot-style completions with zero code leaving the network
2. **Scenario**: you have a spare GPU and want a turnkey server (Docker) plus IDE plugins rather than assembling vLLM + Continue yourself
3. **Scenario where this is NOT the right fit**: you want frontier-model quality — self-hosted completion models still trail hosted Copilot/Cursor noticeably — evaluate an alternative instead

## Strengths

- Air-gapped or compliance-bound teams that need Copilot-style completions with zero code leaving the network
- You have a spare GPU and want a turnkey server (Docker) plus IDE plugins rather than assembling vLLM + Continue yourself

## Limitations / When NOT to Use

- You want frontier-model quality — self-hosted completion models still trail hosted Copilot/Cursor noticeably
- Solo developers without a GPU; hosted free tiers will serve you better

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `continue-dev`, `github-copilot` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `tabby-ml`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://www.tabbyml.com)
- [Documentation](https://tabby.tabbyml.com/docs/)
- [GitHub](https://github.com/TabbyML/tabby)

## Buzz & Reception

- 33,679 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
