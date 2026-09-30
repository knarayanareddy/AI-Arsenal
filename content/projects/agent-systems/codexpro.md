---
id: codexpro
name: codexpro
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Local MCP server that hands a ChatGPT session bounded access to repositories you explicitly allow, over a local tunnel"
github_url: "https://github.com/rebel0789/codexpro"
license: MIT
primary_language: Other
tags: [tool-use, code-gen, openai]
maturity: beta
cost_model: open-source
github_stars: 2065
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-20"
docs_url: "https://rebel0789.github.io/codexpro/"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Solves the ChatGPT-can't-touch-your-repo problem without a hosted proxy, keeping reads, writes, commands and handoffs under separate controls."
best_for:
  - "You use ChatGPT's web app rather than the desktop client and you need it to read, edit and review a local repository inside an allowlisted root."
  - "You want repository intelligence without shipping your code to a separate analysis service, because the indexing runs locally and is cached by a workspace fingerprint."
  - "You need ChatGPT to hand work back to a colleague or another chat, because the export path writes a context bundle and plans under .ai-bridge."
avoid_if:
  - "You are using the ChatGPT desktop app or the Codex CLI, because those already have local access and do not need a tunnel plus Developer Mode."
  - "You cannot expose an HTTPS URL to your machine, because ChatGPT web reaches the server over the public internet via a tunnel or Tailscale Funnel."
  - "You need deep semantic navigation in languages outside its declared parsers, because TypeScript, JavaScript, Python, Go, Rust, Swift, Java, C#, C and C++ get declaration-level analysis while everything else falls back to lexical search."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Install commands, tool names, supported languages, fingerprint caching claim and the no-proxy posture are read from the official README; the tunnel was not opened during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

CodexPro is a Node.js MCP server that runs on your machine and exposes repository operations as ChatGPT plugin tools. It provides write, edit and a guarded apply_patch, an import_file path for attachments, an allowlisted bash, show_changes for reviewing a diff's likely impact, and plan writes under .ai-bridge. On top of raw file access it adds inspect_workspace to map languages, project types, entrypoints, symbols and internal relationships, plus search intents for symbol, references and impact. All analysis is local, bounded and cached by a workspace fingerprint, with no model API key, no language server daemon, no embeddings and no vector database. Coverage is reported rather than asserted as certainty.

## Why it's in the Arsenal

The engineering problem here is authority, not capability. ChatGPT can already write code; what it cannot do is reach your filesystem. CodexPro's design keeps every capability behind an explicit allowlist and splits reads, writes, commands, sessions and handoffs into separate controls, and it deliberately refuses to be a hosted SaaS, model proxy, quota bypass, account pool or remote shell service. The cost is a tunnel: you are publishing an authenticated endpoint to the internet, with the token embedded in the URL, which is the sharpest edge in the whole design.

## Architecture

The server runs on localhost and is reached over HTTPS through a tunnel or Tailscale Funnel; the auth token is embedded in that URL and no separate OAuth handshake is used. ChatGPT calls tools that map to bounded file reads, an allowlisted command runner and guarded edits, all scoped to the allowed roots. Repository intelligence is computed by a local analyser that inventories languages, entrypoints, symbols and relationships, cached against a workspace fingerprint so repeat calls are cheap. show_changes derives affected areas, likely dependents, related tests, risk signals and candidate verification commands from that inventory, and every result is reportable rather than silently applied.

## Ecosystem Position

CodexPro competes with Claude Code, the Codex CLI and opencode for the same reviewer workflow, but reaches a different user: someone whose only surface is the ChatGPT web app. Compared with general MCP hosts such as desktop MCP clients, it is not a general runtime but one server aimed at a single host, so it is narrower and simpler. It complements content/projects/agent-systems entries by being a capability provider rather than a harness, and where content/projects/frameworks entries such as LangChain orchestrate agents in code, this one exists to make one hosted chat interface dangerous in a controlled way.

## Getting Started

Node 20+, a ChatGPT account that can create custom MCP plugins, and an HTTPS URL to your machine. Then run setup inside a repo and start the server each session:

```bash
npm install -g codexpro
cd /path/to/your/repo
codexpro setup
# later sessions
codexpro start
```

In ChatGPT: turn on Developer mode under Settings, create a plugin named CodexPro, paste the server URL, and set authentication to None. Run codexpro connection-test if plugin creation fails.

## Key Use Cases

1. Chat-based code review: have ChatGPT call inspect_workspace and show_changes on a repo you allowed, then read the impact report without uploading the tree anywhere.
2. Guarded edit-and-verify loop: let ChatGPT apply a bounded patch through apply_patch, run allowlisted checks with bash, and confirm the diff is what you expected.
3. Handoff between chats: export a context bundle for a chat that cannot call tools, or write the plan under .ai-bridge so the work is resumable.

## Strengths

- Local repository intelligence with no external index service: no embeddings, no language server daemon, no vector database, and no model API key required for the analysis itself.
- Explicit boundary design: separate controls for reads, writes, commands, sessions and handoffs, plus an explicit refusal to act as a proxy, quota bypass or account pool.
- Impact-aware review output: show_changes reports affected areas, likely dependents, related tests, risk signals and verification commands rather than a raw diff.
- Portable handoffs via .ai-bridge plans and exportable context bundles, so work is not trapped in one chat.

## Limitations

Publishing an authenticated endpoint with the token in the URL is the price of making a web chat reach your machine, and the README is candid about it; treat that URL as a credential. ChatGPT's Developer Mode and custom-plugin support are gating features outside your control, so the project can be broken by a host-side change. Language coverage is uneven: ten languages get declaration parsing and everything else gets inventory plus lexical search, which quietly limits impact analysis. The tunnel requirement rules out locked-down networks, and there is a modest open-issue count on a fairly young repository with a single visible maintainer.

## Relation to the Arsenal

This is the hosted-chat gateway in content/projects/agent-systems, and the only entry here that deliberately targets a proprietary web client rather than a local CLI. It is complementary to the terminal coding agents in the same phase, which already own local access, and it occupies the same niche as the Claude Code and Codex CLI integrations from the opposite direction. Where content/projects/frameworks entries give you an agent you orchestrate, this gives a chat UI reach into one repository. Local model serving, if you replace the ChatGPT model with your own, sits in content/projects/inference-engines.

## Resources

- [GitHub — rebel0789/codexpro](https://github.com/rebel0789/codexpro)
- [Docs site — rebel0789.github.io/codexpro](https://rebel0789.github.io/codexpro/)
- [npm package — codexpro](https://www.npmjs.com/package/codexpro)
