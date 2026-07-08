---
id: repomix
name: "Repomix"
type: tool
job: [prototyping]
description: "CLI that packs an entire repository into a single AI-friendly file for feeding codebases to LLMs"
url: "https://repomix.com"
cost_model: open-source
pricing_detail: "Free and open source (MIT)"
tags: [code-gen, llm, data]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/yamadashy/repomix"
docs_url: "https://repomix.com/guide/"
github_url: "https://github.com/yamadashy/repomix"
alternatives: [gitingest]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - "You want to hand a whole (small-to-medium) codebase to a long-context model in one paste, with token counts per file"
  - "You need repeatable, configurable packing — include/exclude globs, comment stripping, security scanning of the output"
avoid_when:
  - "The repo exceeds the model's context even packed — use retrieval or a repo-map approach (aider) instead"
  - "You need semantic selection of relevant files; Repomix packs mechanically, it doesn't rank"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (26,966), license, and last push (2026-07-05) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The standard utility for the pack-the-repo workflow; simple, safe (secret scanning), and CI-friendly"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/yamadashy/repomix", "date": "2026-07-08", "description": "26,966 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A small but ubiquitous developer utility: run it in a repository and it emits one structured file (XML/Markdown/plain) containing the tree and file contents, optimized for LLM consumption with token counting, gitignore awareness, and Secretlint scanning.

## Why It's in the Arsenal

Repomix earns a place in the Arsenal because it directly addresses a recurring decision point: you want to hand a whole (small-to-medium) codebase to a long-context model in one paste, with token counts per file. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Single-file repo output with per-file token counts
- Respects .gitignore; include/exclude globs; comment removal
- Built-in secret scanning before you paste anywhere

## Architecture / How It Works

Walks the git tree applying ignore rules, optionally compresses code (tree-sitter-based comment/blank stripping), counts tokens per file with tiktoken, runs Secretlint over the output, and writes a structured document models parse reliably.

## Getting Started

```bash
npx repomix@latest
# or: npm install -g repomix && repomix --style markdown
```

## Use Cases

1. **Scenario**: you want to hand a whole (small-to-medium) codebase to a long-context model in one paste, with token counts per file
2. **Scenario**: you need repeatable, configurable packing — include/exclude globs, comment stripping, security scanning of the output
3. **Scenario where this is NOT the right fit**: the repo exceeds the model's context even packed — use retrieval or a repo-map approach (aider) instead — evaluate an alternative instead

## Strengths

- You want to hand a whole (small-to-medium) codebase to a long-context model in one paste, with token counts per file
- You need repeatable, configurable packing — include/exclude globs, comment stripping, security scanning of the output

## Limitations / When NOT to Use

- The repo exceeds the model's context even packed — use retrieval or a repo-map approach (aider) instead
- You need semantic selection of relevant files; Repomix packs mechanically, it doesn't rank

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `gitingest` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `repomix`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://repomix.com)
- [Documentation](https://repomix.com/guide/)
- [GitHub](https://github.com/yamadashy/repomix)

## Buzz & Reception

- 26,966 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
