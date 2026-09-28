---
id: danielmiessler-fabric
name: "Fabric"
version_tracked: null
artifact_type: framework
category: agents
subcategory: frameworks
description: "MIT-licensed Go binary that runs named AI patterns against piped text from any shell, with a crowdsourced strategy library"
github_url: "https://github.com/danielmiessler/Fabric"
license: "MIT"
primary_language: Go
org_or_maintainer: "danielmiessler"
tags: [tool-use, agents]
maturity: production
cost_model: open-source
github_stars: 44095
github_stars_last_30d: 0
trending_score: 37
last_commit: "2026-09-27"
docs_url: "https://docs.fabric.so"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Pattern-based AI augmentation framework: a Go binary that ships an extensible library of chain-of-thought and extraction strategies usable from any shell."
best_for:
  - "You are reviewing a document and want the same extraction or critique applied every time, with the strategy stored in a versioned text file your team can diff and review."
  - "You write shell scripts and pipelines and need AI as a filter stage - piping curl output into a named pattern and getting structured text back, with no Python wrapper to maintain."
  - "You want a shared strategy library across a team so that a well-tested prompt for summarization or threat modeling is written once rather than re-derived by each person."
avoid_if:
  - "You need autonomous multi-step tool use, because a Fabric invocation is a single pattern applied to input with no loop, no state, and no planning."
  - "You need a governed, versioned execution layer with retries and audit trails, since a pattern run is stateless and the only record is whatever you pipe to a file."
  - "You need per-tenant isolation or a hosted control plane, because the design assumes one user invoking a local binary against their own data."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 44095 stars, MIT license, Go primary language, last commit 2026-09-27, 5 GitHub topics, homepage danielmiessler.com. Front matter fields, plugin chain stages, and the web-extraction helper are read from official docs; no pattern was executed in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/danielmiessler/Fabric", "date": "2026-09-28", "description": "44,095 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Fabric is a command-line framework that turns AI work into named, composable patterns: a directory of Markdown files, each with a YAML front matter block carrying the model, temperature, and a system prompt, and a Go binary that resolves the name, assembles the request with the piped or referenced input, and returns the model's text. A small set of strategies ships by default - create a summary, extract wisdom, improve writing, identify risk, generate a code review - and the model can be swapped per pattern in front matter, so a diff review and a long-context summarization can use different backends in the same repository. There is also a helper that strips markup and boilerplate from a web page so the pattern sees text rather than HTML. A session mode keeps a conversation with the model, and a REST API surface lets other tools invoke patterns over HTTP.

## Why it's in the Arsenal

The recurring decision Fabric resolves is prompt reuse. Teams accumulate the same summarization, extraction, and review instructions across notebooks, scripts, chat histories, and wiki pages, where none of them are reviewable as a change and none are guaranteed to be the version people actually use. A pattern is a file: it gets committed, diffed, code-reviewed, and pinned per model, so a prompt improvement is an ordinary pull request and a regression in style is traceable to a diff. That is the same argument as any configuration-as-code move, applied to prompts, and it is why the project grew a crowdsourced pattern library: the unit of sharing is the pattern, so improvements propagate without changing anyone's code. What it deliberately does not try to be is an agent - no loop, no tools, no memory - which keeps latency and cost predictable and each invocation auditable in a way an agent session is not.

## Architecture

The CLI is a Go binary with a plugin chain. A strategy loader walks the configured pattern directory, parses each file's front matter into a configuration struct - model, provider, temperature, strategy text, and optional context - and builds a registry keyed by pattern name. On invocation, the binary resolves the pattern, reads input from stdin or from files named on the command line, optionally runs the web-extraction helper to convert HTML into readable text, then assembles a chat completion request against the configured provider and writes the response to stdout. A middle layer applies the configured plugin sequence: context files that prepend persistent instructions, a strategy that shapes the request, and a language model step that executes it, so the same file format can carry a pure transformation as easily as a model call. The model and provider are resolved from front matter with CLI flags overriding them, which is what allows one pattern directory to mix a local endpoint with a hosted frontier model. A session subcommand keeps multi-turn state, and an HTTP API mode exposes the same resolution and execution path for other applications, so shell and service callers get identical behavior.

## Ecosystem Position

Fabric competes with prompt-template systems and with a plain scripting approach, and compared with putting a prompt string in a Python script it wins on reviewability and reuse while losing on programmatic branching - there is no Python escape hatch inside a pattern, so complex logic means a real program. It overlaps with the CLI wrappers in content/projects/agent-systems/, which add tool use and a loop to the same call-a-model-from-a-shell idea, and it is a lightweight sibling of the skill and pattern layers inside the self-hosted application entry in this batch. It is an alternative to hand-maintaining a prompts directory, and rather than an agent framework it is a single-shot transformation engine: compared with an LLM agent, a Fabric run is faster, cheaper, and reproducible. It complements the retrieval entries in content/projects/data-and-retrieval/ by giving fetched text a standard set of analyses, and it runs against the serving entries in content/projects/inference-engines/ when you point the model at a local endpoint.

## Getting Started

Install the binary and run one of the bundled strategies against text on stdin:

```bash
brew install danielmiessler/fabric/fabric
curl -s https://example.com | fabric --pattern summarize
cat notes.md | fabric -p create_cot
```

Patterns live under your user pattern directory; create one with fabric new and edit its front matter to pin a model, temperature, and system prompt.

## Key Use Cases

1. Standardize code review or threat-model analysis across a team by committing the pattern file so every invocation uses the reviewed prompt rather than a personal variation.
2. Pipe scraped or fetched text through a named extraction or summarization pattern in a shell pipeline, with the model and temperature chosen per pattern rather than globally.
3. Run the same task against several local or hosted backends for comparison, overriding the model on the command line while keeping the strategy text fixed.

## Strengths

- Prompts become reviewable, diffable files, which is the property that makes prompt quality a team concern rather than a personal habit.
- Go binary with fast startup and no runtime dependency, so it drops into an existing shell pipeline without a Python environment to reconcile.
- Per-pattern model configuration, so long-context summarization and short classification prompts can use different backends in the same directory.
- A large crowdsourced pattern library that covers common tasks before you write anything, plus an HTTP mode for programmatic invocation.

## Limitations

There is no agent loop, no tool use, and no state between invocations, so any task needing iteration, file access, or multi-step reasoning belongs in an agent tool rather than here. Prompts remain prompt-dependent, which means a pattern can be quietly degraded by a model change without any test failing, and the project offers no regression harness for style or output structure. The plugin chain is configured per pattern in front matter rather than through a composable graph, so multi-stage pipelines mean running several invocations and piping output yourself. Provider keys and endpoints are resolved from local configuration, which is convenient for one person and awkward for a shared multi-user deployment. And because strategies are largely free text, quality across the library is uneven - some are genuinely good, others are unreviewed community drafts.

## Relation to the Arsenal

The lightest-weight agent-side pattern runner in the Arsenal and a natural companion to the CLI agents in content/projects/agent-systems/, which add the edit-run-test loop Fabric deliberately omits. Its document-level analyses are useful upstream of the retrieval and summarization work in content/projects/data-and-retrieval/, and it calls the same model endpoints served by content/projects/inference-engines/ or a local runtime. The self-hosted application entry in this batch bundles a similar skills concept behind an API; compare the two on whether you need a service or a command. The evaluation entries in content/projects/evaluation/ are where you would go to check that a pattern's output is actually good rather than merely plausible.

## Resources

- [GitHub — danielmiessler/Fabric](https://github.com/danielmiessler/Fabric)
- [Fabric documentation](https://docs.fabric.so)
- [Patterns directory](https://github.com/danielmiessler/fabric/tree/main/patterns)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (44,095 stars, last commit 2026-09-27, license MIT, verified via GitHub API on 2026-09-28)*
