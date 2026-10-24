---
id: gptme
name: "gptme"
type: tool
job: [prototyping, orchestration]
description: "Local-first CLI agent that runs shell, Python, patches and a browser, with an explicit approval gate"
url: "https://github.com/gptme/gptme"
cost_model: open-source
pricing_detail: "MIT-licensed source; you pay the model provider, or nothing beyond hardware with a local runtime"
tags: [agents, code-gen, tool-use, local, self-hosted]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "MIT source is unlimited; API usage is billed per token, and Ollama or llama.cpp removes that cost"
self_hostable: true
open_source: true
source_url: "https://github.com/gptme/gptme"
docs_url: null
github_url: "https://github.com/gptme/gptme"
alternatives: [open-swe]
integrates_with: []
added_date: "2026-10-10"
last_reviewed: "2026-10-10"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "A thin, readable agent loop you can audit line by line, with the whole toolbox in your own shell; the lack of sandboxing is the trade and it is a serious one"
status: active
phase: dx-and-tooling
audience: [prototype, research]
best_when:
  - "You want to read the entire agent loop before trusting it with your filesystem, and extend it in an afternoon"
  - "The work needs your real toolchain — local git, a project virtualenv, a compiler — rather than a container image that approximates it"
avoid_when:
  - "Commands will be generated from untrusted input such as a public issue tracker or scraped page content"
  - "Several people or tenants share the environment and need isolation between them by default"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from the repository README and CLI documentation; tool permissioning was reviewed by reading the code paths, not audited."
buzz_sources: []
---

## Overview

gptme is a terminal agent that runs where you already work. It parses model output into executable actions — shell commands, inline Python, file patches and headless browser steps — runs them in your environment, and appends the results to a growing context log that feeds the next turn.

The design philosophy is subtractive. There is no graph runtime and no orchestration DSL: the conversation is a streamable log of tool interactions and outputs, and the loop is small enough to read. That is the appeal for engineers who want to know exactly what an agent will do before letting it touch a repository.

Providers are interchangeable, including local runtimes through an OpenAI-compatible endpoint, so the same loop can drive a frontier model for hard work and a local one for routine edits.

## Why It's in the Arsenal

Most catalogued coding agents hide their loop behind a product. gptme is the entry that demonstrates how little is required: a parser, a tool set, an approval gate and a context log. Reading it is a good way to understand what the larger products are actually doing.

It is also the honest counterpoint on safety. Running in the developer's real environment is convenient precisely because nothing is isolated, which is the property to weigh before use on anything but code you would run yourself.

## Key Features

- Tool primitives for shell execution, inline Python, file creation and patching, and Playwright-driven browsing.
- Provider coverage across OpenAI, Anthropic, DeepSeek, OpenRouter and local OpenAI-compatible endpoints selected with `--model`.
- An interactive REPL loop that can run tests, read tracebacks and patch iteratively until they pass.
- Non-interactive mode for piping a task from a script or CI step.
- Context truncation that keeps the system prompt and recent tool feedback while dropping older history.
- Approval gates around command execution, including an explicit auto-confirm flag for unattended runs.

## Architecture / How It Works

The loop reads the message history, calls the model, extracts tool invocations from the response using the provider's tool-calling format where available and a text convention where not, then executes and appends output as a user-role message before repeating. Because the tool result is plain text in the log, a model without native tool calling can participate in the same loop.

The approval layer sits between parsing and execution: commands are shown and confirmed unless auto-execution is enabled. Context management is a truncation policy over the same log, preserving the system prompt and recent results so a long build failure does not evict the instructions.

## Getting Started

Install the package, export a provider key or point `--model` at a local endpoint, and start in a scratch directory before aiming it at real work. Leave confirmation prompts on for the first sessions and watch which commands it proposes; only enable auto-confirmation once the workflow is one you would have run by hand.

## Use Cases

1. Refactoring a module with a test suite as the success signal, letting the loop run the tests and repair what it broke.
2. Shell-level maintenance — dependency audits, log triage, migration scripts — where the agent needs your actual environment.
3. Building a bespoke agent by adding one tool to a codebase small enough to understand end to end.
4. Local-only work on sensitive code with an Ollama model, where nothing leaves the machine.

## Strengths

- The loop is auditable in one sitting, which is unusual among coding agents and is the basis for trusting it at all.
- Plain-text tool results keep the loop provider-agnostic, including models with no native function calling.
- Local execution means the agent uses your real interpreter, compiler and git state instead of a container approximation.
- Context truncation is explicit policy rather than a framework side effect, so long sessions degrade predictably.

## Limitations / When NOT to Use

- No sandbox: the agent runs with your user's permissions, and a wrong command is a real mistake. The auto-confirm flag removes the only brake.
- Raw shell output and tracebacks consume context quickly, so verbose builds inflate token cost and can push earlier instructions out.
- Single node by design — it drives one workspace on one host, with no distributed or multi-tenant story.
- Beta, and the interface is a CLI, so anything programmatic depends on output formats that can change.

## Integration Patterns

Run it inside a disposable container or VM that holds a copy of the repository, so the blast radius of a wrong command is a discardable filesystem; that single decision changes the risk profile more than any flag. In CI, use non-interactive mode with a pinned model and a step budget, and treat its patch as a proposal to be tested rather than a commit. Route prompts and outputs through your log pipeline if the repository is sensitive.

## Resources

- [GitHub — gptme/gptme](https://github.com/gptme/gptme)
- [gptme documentation](https://gptme.org/docs/)

## Buzz & Reception

Reception for this entry comes from repository activity and the maintainers' own documentation; no independent production usage report is recorded here. The claim worth checking is durability of the loop against long tasks, which depends on the context-truncation policy more than on the model.
