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
org_or_maintainer: alibaba
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 24
trending_score: 32
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: open-code-review
name: Open Code Review
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: Alibaba's Go/Node-distributed AI code-review CLI combining deterministic file pipelines with an LLM agent for line-level findings
github_url: https://github.com/alibaba/open-code-review
license: Apache-2.0
primary_language: Go
tags:
  - code-gen
  - agents
  - evaluation
  - benchmark
  - battle-tested
maturity: beta
cost_model: usage-based
github_stars: 10723
last_commit: '2026-07-20'
docs_url: https://alibaba.github.io/open-code-review/
phase: agent-system
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Deterministic-plus-agent CLI for token-efficient AI code review
  - Alibaba production-origin review tool with diff and whole-file modes
best_for:
  - Token-efficient pull-request review in CI
  - Whole-file audits of unfamiliar repositories
avoid_if:
  - You need maximum recall rather than precision-focused review
  - Your code cannot be sent to an LLM endpoint or you require formal verification
enrichment_notes: The README reports internal Alibaba production use and a benchmark with a precision/recall trade-off; independent validation is still needed. Draft pending review.
---

## Overview

Open Code Review is not just a prompt over a Git diff. It first selects and bundles files deterministically, matches rules to file characteristics, then gives a focused agent tools to inspect context and report line-precise findings. The same CLI can scan whole files when there is no useful diff.

## Why it's in the Arsenal

Open Code Review earns a slot because Alibaba's design separates deterministic review coverage from LLM judgment. Smart file bundling, rule matching, tool-assisted context retrieval, and line-level comments address the incompleteness and position drift that generic coding agents often show on large diffs.

## Architecture

A deterministic pipeline controls coverage and context while an LLM agent performs dynamic search and reasoning. Bundles can run as isolated subagents, and the CLI supports configurable model endpoints; the npm package exposes `ocr` for local use across Windows, macOS, and Linux.

## Ecosystem Position

Open Code Review complements compiler checks, linters, and human review while competing with general-purpose coding agents such as Claude Code. Its reported benchmark favors precision and roughly one-ninth the tokens, but lower recall means it should sit alongside—not replace—other review gates.

## Getting Started

Install the CLI with `npm install -g @alibaba-group/open-code-review`, configure a compatible model endpoint, and run `ocr` from a test repository. Use the diff review flow first, then try `ocr scan` for whole-file auditing; disable automatic updates with `OCR_NO_UPDATE=1` if release pinning is required.

## Key Use Cases

Use it as a token-conscious pull-request review stage, as a full-file audit for an unfamiliar codebase, or as a second opinion alongside deterministic linters. Its precision-oriented behavior is most useful when reviewers need fewer noisy findings and can accept that recall may be lower.

## Strengths

The hybrid architecture bundles related files, matches rules to file characteristics, and gives an agent targeted tools for repository context. Alibaba reports evaluation across 50 repositories, 200 pull requests, ten languages, and 1,505 annotated issues, including roughly one-ninth the token use of a general-purpose agent.

## Limitations

The benchmark is vendor-produced, and precision-focused review can miss real defects by design. Model endpoint quality, repository language coverage, prompt injection in source files, and API cost still affect outcomes; AI comments are advisory and should not be treated as formal proof of correctness.

## Relation to the Arsenal

Open Code Review complements compilers, linters, CI, and human review, while competing with Claude Code-style review skills and other coding agents. It belongs in evaluation and code-generation workflows; its precision benchmark does not make it a formal verifier or a substitute for tests.

## Resources

- [GitHub](https://github.com/alibaba/open-code-review)
- [Documentation](https://alibaba.github.io/open-code-review/)
