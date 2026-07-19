---
id: prompty
name: Prompty
type: tool
job:
- prompt-management
- evaluation
- prototyping
description: Microsoft prompt asset format and SDKs for managing, debugging, and evaluating
  LLM prompts
url: https://github.com/microsoft/prompty
cost_model: open-source
pricing_detail: MIT open source; provider/API usage is billed separately
tags:
- llm
- structured-output
- evaluation
- observability
maturity: beta
stack:
- typescript
- python
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/microsoft/prompty
docs_url: https://github.com/microsoft/prompty
github_url: https://github.com/microsoft/prompty
alternatives:
- langfuse-prompts
- promptlayer
- dspy
integrates_with: []
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience:
- prototype
- production
best_when:
- You need prompts stored as portable, reviewable assets with model connection metadata
  and templated inputs
- You want Python and TypeScript runtimes to render the same prompt artifact against
  OpenAI, Foundry, Anthropic, or self-hosted endpoints
avoid_when:
- Your team already has a stable prompt registry and does not need another asset format
  or adapter layer
- You require provider-neutral semantics for every advanced feature; adapter behavior
  still follows the selected provider
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: solid-choice
verdict_rationale: A concrete prompt-file format and multi-language runtime for teams
  that need portability and debuggability
status: active
---

## Overview

Prompty is Microsoft's prompt asset format and runtime tooling for making prompts portable, inspectable, and easier to evaluate. A `.prompty` file can carry templating, model connection details, and prompt content, while Python and TypeScript packages render it against supported providers or self-hosted endpoints.

## Why It's in the Arsenal

Prompty earns a slot because prompt text often lives in application code, notebooks, and vendor consoles with no common review or execution boundary. A versionable asset format gives teams a place to diff prompt changes, attach model settings, and run the same artifact through different SDKs without copying the entire application around an experiment.

## Key Features

The repository provides a core format, Jinja-style templating, provider packages for Python and npm, connection metadata, a VS Code extension, and examples for OpenAI, Microsoft Foundry, Anthropic, gateways, and self-hosted servers. The format is designed to support debugging and evaluation as well as final prompt execution.

## Architecture / How It Works

A Prompty asset separates frontmatter-like connection metadata from the templated prompt body. The runtime resolves variables, selects a provider adapter, and sends the rendered messages to the configured endpoint. The file remains a portable source artifact, while provider packages handle the details of authentication and request construction.

## Getting Started

Install the runtime for the provider you want to test:

```bash
pip install "prompty[jinja2,openai]"
# or
npm install @prompty/core @prompty/openai
```

Create a `.prompty` file with the model connection and template variables shown in the README, set the provider credentials, and render it through the Python or TypeScript API before adding it to a prompt regression suite.

## Use Cases

Use Prompty to review a customer-support system prompt as a normal repository artifact, to run one templated prompt against OpenAI and Anthropic during a provider migration, or to let a product and engineering team share a prompt with explicit input fields. It is also a useful bridge between an IDE authoring workflow and automated evaluation.

## Strengths

The format makes prompt provenance and provider configuration visible without forcing every prompt to become a bespoke Python class. First-party TypeScript and Python packages, plus an editor experience, give the same asset a path from experimentation to an application repository.

## Limitations / When NOT to Use

Portability ends where provider-specific features begin: tool schemas, safety settings, streaming semantics, and error behavior still differ across endpoints. Teams must also decide how secrets, rendered prompts, and user data are kept out of the asset repository and whether the editor extension's lifecycle matches the core format.

## Integration Patterns

Store Prompty files beside the evaluation fixtures that exercise them, render them in CI against mock or low-cost endpoints, and promote a version only after checking output structure and provider-specific behavior. Pair the format with an observability tool for runtime traces and with a secrets manager rather than embedding credentials in frontmatter.

## Buzz & Reception

1,231 GitHub stars verified during the 2026-07-19 discovery sweep; Microsoft open-source format with Python, npm, and VS Code integrations.

## Resources

- [GitHub](https://github.com/microsoft/prompty)
- [Python package](https://pypi.org/project/prompty/)
- [TypeScript core package](https://www.npmjs.com/package/@prompty/core)
