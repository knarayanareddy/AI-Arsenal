---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "AntonOsika"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: gpt-engineer
name: "GPT Engineer"
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Archived Python CLI that specified software in natural language and let a model write and execute it"
github_url: "https://github.com/AntonOsika/gpt-engineer"
license: MIT
primary_language: Python
tags: [code-gen, tool-use, research]
maturity: experimental
cost_model: open-source
github_stars: 55073
last_commit: "2025-05-14"
docs_url: "https://github.com/AntonOsika/gpt-engineer"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "study-and-reference"
  - "deploy-as-is"
health_signals:
  - "community-driven"
  - "research-origin"
ecosystem_role:
  - "A pioneering CLI coding agent that turns a natural-language spec into a generated, iteratively refined codebase."
best_for: ["You want to study the earliest widely-copied spec-then-generate loop: a file called prompt in an otherwise empty folder, and a CLI that reads it and writes code into that folder.", "You need the bench binary to score your own agent implementation against the APPS and MBPP datasets, which is the one piece of this repository with lasting value.", "You are writing about codegen tooling history and want the original project that the README itself calls the OG code generation experimentation platform."]
avoid_if: ["You want an actively maintained coding CLI, because the repository is archived and its own README routes you to aider for a maintained CLI and to a managed service for an opinionated product.", "You are on Python 3.8 or 3.9, since the README states the actively supported range is 3.10 to 3.12 and the last release covering 3.8 and 3.9 was 0.2.6.", "You need agentic file editing with search, subagents and git awareness, because this generation of the tool predates all of that and its loop is a single generate-then-execute pass."]
enrichment_notes: "Repository, MIT license, and 2025-05-14 activity verified via the GitHub API on 2026-07-12. Historically pivotal (precursor to Lovable); upstream cadence slowed."
---

## Overview

gpt-engineer is a command-line platform for experimenting with code generation. The workflow is deliberately minimal: you create an empty folder, put a file named prompt in it with natural-language instructions, and run gpte with the folder path. The model then writes and executes code into that folder, and a second mode, gpte -i, points the same machinery at an existing project to implement improvements. A bundled binary called bench gives you a simple harness for scoring your own agent implementations against the APPS and MBPP programming datasets. It requires an OPENAI_API_KEY in the environment or a .env file, and the README notes support for custom models including local ones and Azure.

## Why it's in the Arsenal

It is preserved as a reference point rather than a recommendation. At the time it captured the decision that code generation should be driven by a persisted natural-language spec you can re-run, not by a chat transcript that evaporates. The prompt file is still a good convention: it makes the request reviewable in version control and makes the run reproducible from a clean directory. The failure mode is equally instructive — the project froze into a single-pass loop once better tools shipped tree-sweeping search, diff-aware editing and git integration.

## Architecture

The design is a spec file plus a code-generation loop. The prompt file in the project directory is the entire input; the CLI walks the folder, sends the instructions and the relevant file contents to a chat-completion model, and writes the produced files back to disk, then executes what it generated so the model sees failures. Improvement mode prepends the existing codebase the same way. Configuration is environment-driven — OPENAI_API_KEY via export or a .env copied from .env.template — with optional Docker and browser-based invocation. The bench binary is a separate installed entry point that wires the same agent abstraction into the APPS and MBPP harnesses.

## Ecosystem Position

gpt-engineer is a historical ancestor rather than a live competitor, and it is best read against aider, which the README itself names as the maintained hackable CLI, and against OpenHands, which added the sandboxed execution and parallel editing that this generation lacked. It overlaps with mistral-vibe in the same CLI-coding-agent slot but differs in loop shape: mistral-vibe ships search, subagent delegation and a trust-folder model, while gpt-engineer does a single generate-and-run pass over a prompt file. Compared with a hosted builder such as the successor service the README points at, it is a library you run yourself with your own key. It complements rather than replaces the eval entries such as terminal-bench when you want to score a new loop against a real task suite.

## Getting Started

The archived install path still works from PyPI:

```bash
python -m pip install gpt-engineer
export OPENAI_API_KEY=[your api key]
```

Then create a folder, drop a file named prompt into it with your instructions, and run gpte against that folder's path. For a checkout, clone and run poetry install, which the README shows for development.

## Key Use Cases

1. Historical study of the spec-file convention: see how a single prompt artefact plus an empty directory became a standard scaffolding pattern.
2. Benchmark harness reuse: install the bench binary and score a custom agent implementation against APPS and MBPP using the provided template repo.
3. Baseline comparison: run a trivial generate-and-execute loop as a control when measuring what tree search and diff editing actually buy you.

## Strengths

- MIT licensed and archived, so the code is frozen and readable as a reference rather than a moving target.
- The prompt-file workflow is trivially reproducible: same folder, same file, same run.
- Ships a working bench binary and an agent template repo, which is more than most codegen experiments offered.
- Small enough to read end to end in an afternoon.

## Limitations

The repository is archived and its last commit is well over a year before the others in this batch, so there are no security patches and no Python version fixes beyond 3.10 to 3.12. The loop has no file search, no diff-aware editing and no git awareness, which caps it on any codebase of real size. It depends on a hosted chat model for everything, with no local fallback in the default path. The bench support is limited to APPS and MBPP, which are competition-style programming tasks and a weak proxy for real repository work.

## Relation to the Arsenal

This sits in content/projects/agent-systems as the historical root of the codegen-agent category, and the useful comparison set is the live entries in the same phase — OpenHands, mistral-vibe, stagehand — plus the dev-experience tooling in content/tools/developer-experience. If you are assembling a current stack, ignore it and read openhands for execution sandboxing and gpt-neox's ecosystem for evaluation harnesses. Keep it only as the citation for where the prompt-file pattern came from.

## Resources

- [GitHub — AntonOsika/gpt-engineer](https://github.com/AntonOsika/gpt-engineer)
- [PyPI — gpt-engineer](https://pypi.org/project/gpt-engineer/)
- [Benchmark template repo and agent template](https://github.com/gpt-engineer-org/gpt-engineer)
