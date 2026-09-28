---
id: aider
name: "Aider"
type: tool
job: [prototyping]
description: "Terminal pair-programming tool that maps your codebase, edits files in place and auto-commits each change so you can diff and undo with git"
url: "https://aider.chat"
cost_model: open-source
pricing_detail: "Free open-source tool; you pay only your model provider's API costs"
tags: [code-gen, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/Aider-AI/aider"
docs_url: "https://aider.chat/docs/usage.html"
github_url: "https://github.com/Aider-AI/aider"
alternatives: [claude-code, openai-codex-cli, continue-dev]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when: ["You want an AI assistant that works in the terminal alongside your own editor rather than in a chat window where you paste files back and forth manually.", "You are reviewing AI changes in a codebase you must understand, because aider commits each edit separately and you can diff, revert or branch on them with tools you already use.", "You want to work with a model you host yourself, because it connects to local models as well as hosted ones, so the same session runs against a local server or a frontier API."]
avoid_when: ["You cannot accept API spend, because aider is a client for models you pay for and the local-model path still costs you hardware and much lower-quality edits.", "You need an agent that plans and executes multi-step tasks autonomously, because this is an interactive pair-programming loop you drive turn by turn rather than a delegated harness.", "Your repository is enormous with heavy generated code, because the repository map is built by ranking symbols and will cost tokens on a tree full of them, and the README's own claim to handle large projects is about the map, not about unbounded scale."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (47,184), license, and last push (2026-05-22) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most mature model-agnostic coding CLI; its repo-map + git-commit workflow remains the safest editing loop"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Aider-AI/aider", "date": "2026-07-08", "description": "47,184 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Aider is a command-line pair programmer. Its distinguishing design choices are three: it builds a repository map of the whole codebase so the model knows what exists before editing; it makes edits directly to your files in your working tree rather than producing a patch for you to apply; and it commits every change with a generated message, so git remains the undo mechanism. Model support is broad - the README calls out Claude 3.7 Sonnet, DeepSeek R1 and Chat V3, OpenAI o1, o3-mini and GPT-4o as the best-performing options while noting it can connect to almost any LLM including local ones. Beyond editing it runs linters and test suites after each change and can fix what they report, accepts images and web pages as context, works from your editor by watching for comments you add, supports voice input, and offers a copy-paste mode that works with a model's web chat interface when you have no API key. The install path uses a separate aider-install bootstrap package that places the binary where pip alone would not.

## Why It's in the Arsenal

The recurring decision is what happens when an AI writes the wrong thing. Tools that generate whole files leave you reviewing a diff you did not shape; tools that produce a patch leave you applying it. Aider's answer is to work in your tree and commit continuously, which means every step is independently revertible and the git history reads as a record of the session. That is also the tradeoff: because the model edits real files, a bad run leaves you untangling commits, and because the model works best with strong hosted models, the cheap path is materially worse output. The repository map is what keeps context costs sane on a large codebase, at the price of an indexing pass before the first edit.

## Key Features

- Git integration is the design centre rather than a feature, so AI changes are reviewable and reversible with tools your team already trusts.
- The repository map makes work on large projects viable without dumping the tree into context on every turn.
- Automatic lint and test runs after each change let the model fix what the checks report rather than leaving verification to you.
- Works with hosted frontier models and local ones through the same interface, plus a no-key copy-paste path into a model's web chat.

## Architecture / How It Works

The CLI drives an interactive session in your repository. On start it builds a repository map by ranking the symbols and definitions across the tree and packing the highest-value ones into the prompt, which is the mechanism behind working on projects too large to read in full. Edits are applied to your working tree and committed immediately with a generated message, so the loop is model proposes, tool writes, git records. After each change aider can run the linter and test suite and hand failures back to the model for a fix, which closes the verification loop without leaving the terminal. Context can be extended with images and pasted web pages. Editor integration works by watching files for comments you add, so requesting a change is a matter of annotating code rather than switching to a chat. The copy-paste mode keeps the model in its own web interface and shuttles context and edits through the browser, which is the fallback when API access is unavailable. Install goes through a distinct aider-install package to place the executable on PATH.

## Getting Started

Install via the bootstrap package, which places the aider executable on your PATH, then point it at a model with a key:

```bash
python -m pip install aider-install
aider-install
cd /to/your/project
aider --model sonnet --api-key anthropic=
```

DeepSeek and OpenAI work the same way with --model deepseek or --model o3-mini and the matching provider key.

## Use Cases

1. Refactor with a safety net: ask for a change across a module, then review it as a series of small commits and revert the ones you disagree with instead of restoring one overwritten file.
2. Learn an unfamiliar codebase: let the map and iterative Q&A build your understanding while the model proposes small, revertible edits as you read along.
3. Work without an API key: use copy-paste mode to drive a model's web chat, getting aider's context selection and diff handling without a programmatic key.

## Strengths

It competes with Cursor and Windsurf for the same job, and the decisive difference is where the work happens: those are editors with an agent inside, this is a terminal tool that leaves your editor alone and uses git as the integration point. It overlaps with the other coding agents in content/tools/dx-and-tooling - several of which build their own repository indexing and commit discipline - but aider is the one that treats the git history as the primary user interface, which makes it the most familiar to a team that already reviews diffs. Compared with content/projects/frameworks entries such as langgraph or crewai, this is an interactive loop rather than an orchestration library. Compared with agent skills packages, aider is the runtime those skills would be written against, and with the agent-reach tooling it composes for a session that can also read the web.

## Limitations / When NOT to Use

The cost model is the first constraint: quality tracks the model, and the README is explicit about which models it works best with, so a cheap or local model produces materially worse edits rather than merely slower ones. Because edits land in your tree and are committed, a mistaken run leaves a commit history to unpick, and the more autonomous the model the larger that pile gets. It is interactive by design - there is no delegation mode, no scheduled run and no multi-step task planner - so anything requiring overnight execution means reaching for a different tool. The repository map costs a token budget on every session, which hurts on a tree with large generated or vendored code, and it ranks symbols rather than understanding semantics, so on a codebase where the important context is in prose or configuration it can be misled. It also carries real token cost on a large repo even before you start editing.

## Integration Patterns

This is the terminal coding agent in content/tools/dx-and-tooling, and it is the entry to compare against the editor-embedded assistants when the question is where AI code review happens. Its model layer connects to content/projects/inference-engines when you point it at a local server, and the workflow packs in the same phase such as addyosmani-agent-skills set expectations for how a terminal agent should be driven. The agent frameworks in content/projects/frameworks are the alternative when you want a harness to delegate to rather than a loop to converse with.

## Resources

- [GitHub — Aider-AI/aider](https://github.com/Aider-AI/aider)
- [Documentation — aider.chat](https://aider.chat/docs/usage.html)
- [How the repository map works](https://aider.chat/docs/repomap.html)

## Buzz & Reception

Makes git the safety net for AI edits, so every change is a reviewable commit and nothing depends on the model getting a whole-file rewrite right.
