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
org_or_maintainer: "alibaba"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: open-code-review
name: "Open Code Review"
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Alibaba's open-sourced code review CLI that pairs deterministic rules pipelines with an LLM agent emitting line-level review comments"
github_url: "https://github.com/alibaba/open-code-review"
license: Apache-2.0
primary_language: Go
tags: [agents, llm]
maturity: production
cost_model: open-source
github_stars: 42251
last_commit: "2026-09-28"
docs_url: "https://open-codereview.ai"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Deterministic-plus-agent CLI for token-efficient AI code review"
  - "Alibaba production-origin review tool with diff and whole-file modes"
best_for: ["You are a platform team standardising AI code review across many repositories and you want a tool that already ran inside a large engineering organisation for two years.", "You need precise inline comments on a pull request rather than a summary, because the tool targets line-level placement and can read full files for context.", "Your codebase has language-specific defect classes you want caught deterministically, since the built-in ruleset covers null pointer exceptions, thread safety, XSS and SQL injection."]
avoid_if: ["You need a hosted code review service with a managed dashboard, because this is a CLI you run and configure yourself with a model endpoint.", "You are reviewing an entire legacy codebase rather than a change, because the primary mode is diff review even though a full-file scan mode exists.", "Your workflow requires the tool to post review comments directly to your forge, because the documented surface is CLI output you route into your own process."]
enrichment_notes: "The README reports internal Alibaba production use and a benchmark with a precision/recall trade-off; independent validation is still needed. Draft pending review."
---

## Overview

Open Code Review is an AI-powered code review CLI that began as Alibaba Group's internal official code review assistant, ran for two years across tens of thousands of developers and identified millions of code defects before being incubated into open source. Architecturally it is a hybrid: deterministic analysis pipelines combined with an LLM agent, rather than a pure prompt-over-diff design. The agent reads Git diffs, sends changed files to a configurable LLM with tool-use capability, and emits structured review comments with line-level precision. Crucially it can read full file contents, search the codebase, and inspect other changed files for context, so a finding is grounded in the surrounding code rather than only the modified lines. Beyond diff review, an ocr scan mode reviews whole files, and the built-in multi-language ruleset covers null pointer exceptions, thread safety, XSS and SQL injection, with OpenAI and Anthropic compatible endpoints.

## Why it's in the Arsenal

The decision it removes is whether code review automation should be a fuzzy LLM pass or a repeatable gate. A pure LLM reviewer produces plausible prose at unstable rates, while a pure static analyser misses intent and design problems; the hybrid runs deterministic rules for the defect classes that have stable signatures and spends model budget on the judgement calls, which is why a two-year internal deployment could claim millions of identified defects. The context tools matter as much as the model: reading the full file and searching the codebase is what turns a comment on a diff line into a comment about the function. The remaining cost is yours: token spend on every review, which is why the deterministic pass exists.

## Architecture

The CLI reads a Git diff, selects changed files, and routes them through a hybrid pipeline: deterministic rule sets evaluate language-specific defect patterns, while a tool-using LLM agent reasons over the same change. The agent's tools let it pull full file contents, search the codebase and read sibling files from the same change set, which is the mechanism that supplies context beyond the diff. Findings are returned as structured comments anchored to specific lines rather than as a summary, so a review can be posted to a forge or consumed by a pipeline without re-parsing prose. Configuration is a model endpoint rather than a locally hosted model, with both OpenAI and Anthropic compatible interfaces. An ocr scan subcommand runs the same review over entire files rather than a change, which is a heavier mode meant for deliberate sweeps rather than per-commit runs.

## Ecosystem Position

Open Code Review competes with the AI review assistants that ride inside pull-request apps and with the LLM coding agents in content/projects/dx-and-tooling that also read diffs, but its position is the deterministic-plus-agent hybrid and the Alibaba production pedigree rather than a chat surface. It overlaps with the security scanners in content/projects/evaluation-and-observability such as the SAST-style tools, though its XSS and SQL injection rules are a convenience rather than a replacement for a dedicated security product. Compared with a hosted review app, this is a CLI you own: you choose the model endpoint, the rules and the routing into your forge. It complements the coding agents in the same phase, since a review tool that can read the codebase fits naturally as one stage in a merge pipeline.

## Getting Started

Install the CLI, point it at a model endpoint, and run it against a diff or a file set:

```bash
# install from source
git clone https://github.com/alibaba/open-code-review.git && cd open-code-review
go build -o ocr ./cmd/ocr

# review the current branch diff against main
export OPENAI_API_KEY=sk-...   # or an Anthropic-compatible endpoint
./ocr review --base main
```

A full-file pass uses the scan subcommand (`./ocr scan <path>`), and the repository README documents the rule configuration and endpoint options. Since the binary is Go, a release build or `go install` avoids the clone entirely.

## Key Use Cases

1. Pull-request gate: run the review on every merge request and post line-anchored comments back to your forge, rejecting on the deterministic rule classes.
2. Language defect sweep: use the built-in rules for null pointer exceptions, thread safety, XSS and SQL injection on a codebase whose language-specific bugs are known and recurring.
3. Whole-file review of unfamiliar code: point `ocr scan` at a module you inherited and get grounded findings with file-level context rather than a diff-only view.

## Strengths

- Hybrid deterministic-plus-agent design, which is a more defensible gate than a pure LLM pass for the defect classes that have stable signatures.
- Two years of internal use at Alibaba with tens of thousands of developers and millions of identified defects behind the claim, which is unusual production evidence for this category.
- Tool-using agent reads full files and searches the codebase, so findings carry context a diff-only reviewer cannot have.
- Apache-2.0 licensed with OpenAI and Anthropic compatible endpoints, so it fits either provider without a fork.

## Limitations

Every review costs tokens against a configured endpoint, so a large repository on every commit is an API bill you have to size, and the model quality you get is the model quality you pay for. The deterministic rules are language-specific and inevitably incomplete, so the ruleset covers common classes rather than your domain's real bug patterns, which remain the agent's problem. The primary mode is diff review; `ocr scan` over whole files is useful but expensive and better suited to occasional sweeps than to per-commit use. Review quality is unmeasurable without your own acceptance data, and the README's defect counts come from an internal deployment whose defect definitions and reviewer workflow are not published, so the number cannot be compared to another tool's.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the code-review-shaped agent and pairs with the coding agents in content/projects/dx-and-tooling that produce the diffs it reads. Its model endpoint is served by whatever you configure from content/projects/inference-engines, and if you route reviews through a gateway the agent-system entries in the same phase can front it. For the security-specific classes, compare against the detection tooling in content/projects/evaluation-and-observability. Where the framework entries in content/projects/framework would have you build a review agent yourself, this is the case where the built-in pipeline and rules are the reason to adopt it.

## Resources

- [GitHub — alibaba/open-code-review](https://github.com/alibaba/open-code-review)
- [Project site — open-codereview.ai](https://open-codereview.ai)
- [README and CLI reference](https://github.com/alibaba/open-code-review#readme)
