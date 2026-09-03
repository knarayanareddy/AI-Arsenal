---
id: pr-agent
name: "PR-Agent"
version_tracked: null
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Open-source pull-request reviewer that summarises, reviews, and suggests changes from the diff"
github_url: "https://github.com/The-PR-Agent/pr-agent"
license: "MIT"
primary_language: Python
org_or_maintainer: "The PR-Agent project"
tags: [code-gen, agents, evaluation, guardrails]
maturity: production
cost_model: open-source
github_stars: 12832
github_stars_last_30d: 0
trending_score: 58
last_commit: "2026-09-03"
docs_url: "https://github.com/The-PR-Agent/pr-agent#readme"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, community-driven, research-origin]
ecosystem_role:
  - "The original open pull-request reviewer: a bounded, command-driven agent that turns a diff into a description, a review, and concrete inline suggestions rather than writing code unattended."
best_for:
  - "You want automated first-pass review on every pull request — description, walkthrough, and risk notes — without granting an agent write access to the repository"
  - "You run a mixed-provider estate and want the reviewer to work against OpenAI, Anthropic, or a local Ollama endpoint behind one configuration"
avoid_if:
  - "You need the review to be deterministic or reproducible for compliance sign-off; model-generated findings vary between runs on identical diffs"
  - "Your repository is huge or your diffs are very large, where diff-token budgets force truncation and the reviewer silently sees only part of the change"
upstream_dependencies: []
downstream_consumers: []
alternatives: [aider, claude-code]
integrates_with: [ollama, langfuse]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (12,832), forks (1,797), licence (MIT), language (Python), created 2023-07-05, last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The canonical repo resolves to The-PR-Agent/pr-agent; qodo-ai/pr-agent redirects there."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/The-PR-Agent/pr-agent", "date": "2026-09-03", "description": "12,832 stars on GitHub as of 2026-09-03 (GitHub API); the longest-running open PR reviewer surveyed, created 2023-07-05"}]
featured: false
status: active
---

## Overview

PR-Agent is an open-source reviewer for pull requests, written in Python under the MIT licence. It is deliberately narrow: given a diff, it produces a structured description of the change, a walkthrough of affected components, a review with findings, and optional inline improvement suggestions posted back to the hosting platform. Interaction is command-driven — a reviewer or author invokes a specific operation in a comment rather than conversing with an agent — which keeps each run bounded and auditable. It has been under continuous development since 2023-07-05, making it the longest-running project in this lane, and reached roughly 12,800 stars by 2026-09-03.

## Why it's in the Arsenal

Every other coding agent in this catalogue writes code. PR-Agent is the counter-case that makes the category legible: an agent whose entire job is judgement over an existing change, with no write access and no autonomous loop. That distinction matters operationally, because a reviewer that cannot modify the tree has a fundamentally smaller blast radius than an agent that can, and it is the form most organisations can actually adopt first. It is also the useful precedent for teams weighing whether review automation should be a bounded tool invoked per pull request or a conversational agent with repository credentials.

## Architecture

The system is a request handler triggered by a webhook or a scheduled poll. It fetches the diff and surrounding metadata, then compresses the change to fit a model's context budget by ranking hunks by relevance and dropping or summarising the remainder. Separate prompt templates drive each operation — describe, review, improve, ask — so a command maps to one bounded model call rather than an open-ended loop. Findings are parsed from a structured response and posted back through the Git provider's API as comments or inline suggestions. Model access is configurable across hosted APIs and local Ollama endpoints, and the same code runs as a hosted app, a GitHub Action, a container, or a local CLI.

## Ecosystem Position

It complements rather than competes with code-writing agents such as [Aider](../../tools/dx-and-tooling/aider.md) and [Claude Code](../../tools/dx-and-tooling/claude-code.md): those produce the change, this evaluates it, and a workflow commonly runs both. The nearest functional overlap is a proprietary hosted review service, and the repository's own description is explicit that the open project is separate from that vendor's paid tier. Its tracing needs are ordinary LLM-application needs, so it pairs with [Langfuse](../benchmarks-and-evals/langfuse.md) for prompt and cost visibility. It is not a general agent framework — there is no planner or tool registry to compare against [LangGraph](../frameworks/langgraph.md).

## Getting Started

```bash
pip install pr-agent
export OPENAI.KEY=sk-...        # or configure an Anthropic or Ollama endpoint
pr-agent --pr_url=https://github.com/owner/repo/pull/123 describe
```

Inside a repository, the same operations are invoked by commenting a command on the pull request once the integration is installed.

## Key Use Cases

1. **First-pass review on every pull request** — description, walkthrough, and risk notes generated before a human looks at the change.
2. **Consistency enforcement** — asking a fixed set of questions of every diff so review quality does not depend on who is available.
3. **Onboarding context** — giving a new contributor a walkthrough of their own change before a maintainer reviews it.

## Strengths

- Bounded, command-scoped operations mean each run is one reviewable model call with no autonomous edit loop.
- The diff-compression step is the genuinely hard part of review automation, and having it in open source lets a team tune relevance ranking rather than accept a black box.
- Provider-agnostic configuration, including local Ollama, allows review automation inside an air-gapped estate.

## Limitations

- Findings are not reproducible: the same diff can yield different comments on a second run, which rules out compliance-grade sign-off.
- Large diffs force truncation, so the reviewer may quietly evaluate only a subset of the change while still posting confident findings.
- False positives are the dominant failure mode, and a team that does not triage them quickly learns to ignore the bot entirely.

## Relation to the Arsenal

Catalogued as an agent-system because it is deployed as a running integration rather than imported. For agents that author changes instead of reviewing them, see [Agent Systems](./_index.md); for evaluation practices that apply to this kind of judgement task, see [Benchmarks & Evals](../benchmarks-and-evals/_index.md).

## Resources

- [GitHub](https://github.com/The-PR-Agent/pr-agent)
- [README and command reference](https://github.com/The-PR-Agent/pr-agent#readme)

---
*Facts recorded from the GitHub API on 2026-09-03 by @maintainer — enrichment_status: draft. 12,832 stars, 1,797 forks, MIT, Python, created 2023-07-05, last commit 2026-09-03.*
