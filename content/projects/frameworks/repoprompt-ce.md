---
id: repoprompt-ce
name: repoprompt-ce
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A native macOS app that assembles reviewable CodeMaps, file selections, and Git diffs, then hands that context to agents via MCP"
github_url: "https://github.com/repoprompt/repoprompt-ce"
license: Apache-2.0
primary_language: Other
tags: [memory, edge, tool-use, code-gen]
maturity: beta
cost_model: open-source
github_stars: 938
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://repoprompt.com"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Makes context assembly a visible artifact you curate before it reaches the model, instead of an invisible scroll of tool calls."
best_for:
  - "You are working in a large repository and need to select exactly the right files and symbols before the agent starts editing."
  - "You are reviewing what an agent read before you accept what it wrote, since the assembled context is on screen."
  - "You want one context surface usable from both MCP clients and CLI agents, rather than per-agent prompt files."
avoid_if:
  - "You are on Linux or Windows, because this is a Swift app gated to macOS 26 or newer."
  - "You work in a headless CI environment with no local desktop, since the whole product is a macOS application."
  - "You want a cloud-shared context store, because context assembly is local to one machine and its Keychain."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 938, Apache-2.0, Swift, last commit 2026-09-28, topics, homepage. From README: macOS 26+ gate, Homebrew tap and cask, repoprompt-ce-updates repo, launcher, conductor relaunch, ALLOW_ADHOC_SIGNING and SIGN_IDENTITY, in-memory secure storage, CodeMaps, MCP harness. CE feature gap undocumented."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

RepoPrompt CE is the Apache-2.0 community edition of RepoPrompt, a Swift application for macOS 26 or newer whose stated job is context engineering: assembling focused, reviewable context from files, CodeMaps, repository structure, and Git diffs, then handing that to AI tools and CLI agents. A CodeMap is a compact structural summary of a file - its declarations and their line locations - which is what lets you describe a codebase's shape cheaply instead of pasting source. Around that sits an agent harness built on the bundled MCP server: MCP-compatible clients and CLI agents connect to search repositories, inspect files, curate context, run agent sessions, and orchestrate work through the same native interface. Installation covers three paths - a signed notarized Homebrew cask, a double-click launcher that requires Python 3 and drives a developer daemon for debug builds, and a local production installer for a self-signed build under /Applications.

## Why it's in the Arsenal

The recurring decision is how much of a repository to put in front of a model, and the failure mode is symmetric: too little and the agent guesses, too much and it drowns in tokens and in noise it was not asked to reason about. Most tools make this choice implicitly by letting the agent discover files through tool calls, so you find out what it read only after it acted. Curating the selection first makes context a reviewable object, and the CodeMap layer is the piece that makes curation possible - structural outlines are compact enough to scan in a sidebar and rich enough to decide from.

## Architecture

The app is a native Swift binary with a developer daemon coordinating builds and lifecycle, plus an MCP server exposed to clients over stdio or a local transport. The context pipeline is structural first: it builds CodeMaps from the repository, indexes repository structure and Git state, and lets you assemble a selection of files, symbols, and diffs before anything is sent. That assembled context then becomes the payload handed to an MCP-compatible client or spawned as a CLI agent session, which is why the MCP server and the app are one product rather than an add-on. Keychain-backed secure storage holds API keys and permission settings, with ad-hoc debug builds falling back to in-memory storage that does not persist across launches. The launcher accepts an explicit developer directory rather than mutating xcode-select globally, so a debug build does not disturb the machine's toolchain configuration.

## Ecosystem Position

RepoPrompt CE competes with Aider, Continue, and Cline, which each bundle their own context selection inside the editor, and with the MCP servers in content/projects/data-and-retrieval that expose code search as a tool. Compared with an in-editor extension, the advantage is that context curation is a first-class surface you can review before committing to it, and it works with whichever agent you prefer instead of pairing with one. Compared with a code-intelligence CLI like CodeSeek in content/projects/data-and-retrieval, RepoPrompt provides the manual selection and hand-off while CodeSeek provides automatic indexing and hybrid search - the two compose well, one for structure and one for recall. It is not a model host, so content/projects/inference-engines is untouched, and it is a front end rather than a runtime, sitting above the harnesses in content/projects/frameworks.

## Getting Started

Install the signed cask from the dedicated tap; no Xcode required for the released build.

```bash
brew tap repoprompt/repoprompt-ce
brew install --cask repoprompt-ce
```

The cask consumes the promoted public updater ZIP from repoprompt/repoprompt-ce-updates rather than building from source. For a debug build, run `ALLOW_ADHOC_SIGNING=1 ./conductor app relaunch` from a checkout.

## Key Use Cases

1. Curate context before editing: pick files, symbols, and CodeMaps in the app, then hand exactly that set to your agent.
2. Review what an agent read: keep the assembled context visible so you can check whether it had the right files before it wrote code.
3. Use one surface across agents: connect Claude Code, another MCP client, and CLI agents to the same curated context instead of maintaining separate prompt files.

## Strengths

- Context assembly is a visible artifact you curate before the model sees it, rather than a side effect of tool calls.
- CodeMaps give a compact structural view of a repository that is cheap to scan and specific enough to decide from.
- Works with multiple MCP clients and CLI agents rather than pairing the app with a single coding assistant.
- Signed notarized cask plus a source build path, and a launcher that preserves an explicit developer directory instead of mutating global Xcode settings.

## Limitations

macOS 26 or newer on Apple Silicon-class hardware is a hard gate, so this is unusable on Linux, Windows, or older Macs - the single largest limitation by far. Ad-hoc debug builds store keys in memory and lose them on relaunch, which will surprise you if you take the easy debug path. There is no CI or headless mode, so nothing here can run in a pipeline. The community edition is a subset of the commercial product, and which features are gated is not enumerated in the README excerpt. Being a GUI application also means the context decisions are not reproducible as code, so a curated session cannot be checked into a repository and replayed.

## Relation to the Arsenal

This framework-phase entry is a context-and-handoff surface for coding agents, which places it beside the other coding-harness entries in the sibling content/projects/frameworks phase while sitting upstream of them. Its code indexing complements the automatic code-intelligence tools in content/projects/data-and-retrieval, and it consumes rather than hosts models, so content/projects/inference-engines is a downstream dependency of whatever agent it hands context to. Nothing here provides evaluation, so measuring whether curation improved agent output needs content/projects/benchmark-and-eval.

## Resources

- [Repository](https://github.com/repoprompt/repoprompt-ce)
- [Project site](https://repoprompt.com)
- [Homebrew tap](https://github.com/repoprompt/homebrew-repoprompt-ce)
