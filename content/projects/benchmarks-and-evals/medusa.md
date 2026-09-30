---
id: medusa
name: medusa
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "A single-binary security scanner with over forty thousand patterns targeting AI apps, agents, MCP servers, and leaked credentials"
github_url: "https://github.com/Pantheon-Security/medusa"
license: AGPL-3.0
primary_language: Python
tags: [security, community-favorite]
maturity: beta
cost_model: open-source
github_stars: 993
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-10"
docs_url: "https://pantheonsecurity.io"
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Detects the AI-specific compromise paths that traditional SAST rule sets were never written to look for."
best_for:
  - "You are cloning repositories and need to know whether a repo ships weaponized editor configs before you install anything from it."
  - "You are auditing an MCP server or agent codebase and need rules for prompt injection, tool poisoning, and agent-specific weaknesses."
  - "You need a CI gate with no toolchain to install, since one pip install gives you a scanner with parallel execution."
avoid_if:
  - "You cannot accept AGPL-3.0 in your pipeline, because the copyleft applies to the scanner you run in CI.
"
  - "You need coverage breadth across every language, since native rules are strongest in the languages the project ships and optional for others.
"
  - "You are looking for a fix engine, because the tool reports findings rather than patching code.
"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 993, AGPL-3.0, Python, last commit 2026-08-10, topics, homepage. From README: 40,000+ patterns, scan --git, secrets scan with 21 issuer types and y/n/s/a/q purge, 200 CVE detections, 28+ editor config types, v2026.7 features, content-hash cache, SARIF output. Precision unmeasured."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Medusa markets 40,000+ detection patterns with zero external tool installation - the scanner works immediately after pip install, unlike wrappers that shell out to Semgrep or Bandit. Its distinctive surface is AI supply chain: medusa scan --git URL inspects any repository for repo-poisoning attacks across more than 28 editor config file types covering Cursor, Cline, Copilot, Claude Code, Gemini, and Kiro. v2026.7 adds Claude Code compromise detection, which vets .claude hooks, permissions, and skills before you clone, plus an always-on AI attack-signature scanner and native Rust and PHP rules. medusa secrets scan is a separate capability covering 21 issuer types - Anthropic, OpenAI, PyPI, GitHub PATs, AWS, GCP, Stripe, Slack - across Claude, Cursor, Copilot, Zed, and Gemini chat histories as well as bash, zsh, psql, mysql, and python REPL history, with an interactive y/n/s/a/q purge that makes a byte-identical backup before redacting in a JSONL-safe way. It runs locally with no telemetry and exports JSON, HTML, Markdown, or SARIF.

## Why it's in the Arsenal

The recurring decision is whether to add another SAST dependency to CI or extend what you already have. Traditional scanners have a blind spot that matters more each quarter: they were written before .claude directories, Cursor rules, and MCP manifests existed, so an attacker who controls a repository can ship agent instructions that execute with your permissions and no rule fires. Medusa's premise is that this class of attack needs its own rules, and that a compromise-prevention check on a repo about to be cloned is a distinct and cheaper gate than post-clone auditing. The history-scanning feature addresses the other leak path, where a credential typed into a chat or a REPL persists on disk long after the session.

## Architecture

Detection is pattern-driven and entirely in-process: the 40,000-plus patterns ship inside the package, which is what removes the install-dependency problem other scanners have. Execution is parallel across cores for a claimed 10x to 40x speedup over sequential scanning, and a content-hash-keyed cache lets a rescan skip unchanged files without producing false negatives in CI, which is the failure mode that makes cached scanners untrustworthy. Rule packs are organized by concern - AI attack signatures, native Rust and PHP security, and CVE detections covering Log4Shell, Spring4Shell, XZ Utils, LangChain RCE, MCP remote code execution, and React2Shell - and external linters are auto-detected if present for extra coverage without being required. Secrets scanning is a separate subsystem with its own issuer classifiers and a backup-before-redact guarantee.

## Ecosystem Position

Medusa competes with Semgrep, Bandit, Snyk, and Trivy, and its differentiator is the AI-application rule set plus the no-dependency packaging rather than any claim of better traditional coverage. Compared with Semgrep's community rules and paid tier, Medusa gives you everything in the open build, at the cost of AGPL-3.0 and a smaller third-party ecosystem. Compared with a pure secret scanner such as Gitleaks or TruffleHog, it also reads chat and REPL history, which those tools do not. It is not a runtime defense - it complements rather than replaces the MCP gateway-style controls in content/projects/data-and-retrieval - and it overlaps with agent-security tooling in content/projects/benchmark-and-eval without providing model benchmarks. Findings feed triage workflows rather than being acted on automatically.

## Getting Started

Install the package and scan; no external linters or toolchain setup is required. Python 3.10+ and Windows, macOS, or Linux are supported.

```bash
pip install medusa-security
medusa scan --git https://github.com/owner/repo
medusa secrets scan
medusa scan . --format sarif > findings.sarif
```

Configure project settings in .medusa.yml and wire the SARIF output into your existing code-scanning workflow.

## Key Use Cases

1. Vet a repository before cloning: run scan --git on an unfamiliar repo to catch weaponized Cursor rules, .claude hooks, and poisoned MCP configs.
2. Sweep CI for leaked credentials: run secrets scan across chat histories and shell plus REPL history to find keys that are already exposed on disk.
3. Add an AI-app SAST gate: run the scanner against an MCP server or agent codebase where traditional rules find nothing.

## Strengths

- Zero setup - patterns ship in the package, so one pip install replaces a wrapper plus external linter stack.
- The only common tool class that inspects .claude hooks, Cursor rules, and MCP manifests as attack surface.
- Secrets scanning covers chat and REPL histories across 21 issuer types, a path Gitleaks-class tools miss.
- Backup-before-redact purge is byte-identical and JSONL-safe, so an accidental purge is recoverable.

## Limitations

AGPL-3.0 is the real constraint for CI adoption: it is fine to run internally and awkward the moment anyone wants to wrap it in a service. The 40,000-plus figure counts patterns rather than distinct vulnerability classes, so breadth is not the same as depth, and precision per rule is unpublished. Coverage depth is uneven across languages even with native Rust and PHP rules added. It detects but does not fix, and a repo-poisoning finding requires you to actually read the malicious config. Parallel speedups are measured on the authors' hardware with no published baseline, and the AI attack-signature scanner is new enough that its false-positive rate is unknown.

## Relation to the Arsenal

This benchmark-and-eval-phase entry verifies artifacts rather than models, which places it alongside the security tooling in the benchmark phase and beside the other code-scanning entries there. Its findings gate what an agent in content/projects/frameworks is allowed to load, and its secrets coverage is the defensive counterpart to the credential-handling connectors in content/projects/data-and-retrieval. It hosts no model, so content/projects/inference-engines is not involved.

## Resources

- [Repository](https://github.com/Pantheon-Security/medusa)
- [PyPI package](https://pypi.org/project/medusa-security/)
- [Project site](https://pantheonsecurity.io)
