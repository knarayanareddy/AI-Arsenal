---
id: dao-code
name: dao-code
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "TypeScript terminal coding agent built around DeepSeek V4's prefix cache, keeping the system prefix and tool table byte-stable"
github_url: "https://github.com/tigicion/dao-code"
license: MIT
primary_language: TypeScript
tags: [code-gen, llm, caching, efficiency]
maturity: beta
cost_model: open-source
github_stars: 1083
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-22"
docs_url: "https://github.com/tigicion/dao-code#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Turns DeepSeek's cheap cache-hit pricing into a structural advantage by engineering for byte-stable prefixes instead of trimming prompts."
best_for:
  - "You are paying per token for DeepSeek and you want the cache hit rate to stay above 90% across a long session rather than degrading as context grows."
  - "You want cross-session memory and self-correction to be nearly free because reflection and memory run on cache-reusing forks of the same prefix."
  - "You are in mainland China or on a restricted network and want a register-and-go pay-as-you-go model instead of an account-gated subscription."
avoid_if:
  - "You need a frontier model for the task, because the whole design optimises a mid-tier model's economics rather than raising its capability ceiling."
  - "You are billed somewhere the cache-hit multiplier is not extreme, because the cost advantage is a direct function of that specific price ratio."
  - "You want a multi-provider harness, because this one is deliberately DeepSeek-V4-specific and treats that focus as the feature."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Cost table, hit rates, cache-hit price ratio, fork mechanism and install command are read from the official README; the cost ledger was not re-run or independently reproduced."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Dao Code is a terminal coding assistant distributed as the dao command, targeting DeepSeek V4 with its 1M-token context window. Its core engineering bet is prefix-cache stability: the system prompt, tool table and memory block are kept byte-stable so DeepSeek's prefix-cache hit price (roughly 1/120 of a miss) applies to nearly every turn, and reflection and memory work runs on cache-reusing forks of that same prefix. The project publishes a cost ledger over seven SWE-bench-style bug fixes across valibot, date-fns, es-toolkit, sqlglot and hono: 3.89M input tokens, 95.8% aggregate cache hit, about ¥1.07 total, with per-run logs committed under evals/runs/ and a /cost command to replay. Skills, MCP and hooks are supported, and Claude Code config compatibility is claimed.

## Why it's in the Arsenal

The interesting question is not which model to use but how the harness shape changes the bill. Prompt caching is not a free lunch you can assume: if the prefix mutates every turn, you pay miss pricing forever. Dao Code treats prefix stability as an invariant to engineer, the same way you would treat a database index, and reports its evidence as replayable logs rather than a benchmark chart. The cost is a hard provider dependency and a project identity built on one vendor's pricing mechanics.

## Architecture

The agent keeps the system prefix, tool table and memory segment byte-identical across turns so the provider can serve cached tokens; dynamic content is appended after that stable region rather than injected into it. Reflection and memory operations fork the request rather than starting fresh, which means they reuse the same cacheable bytes and add little cost. An approval gate sits between proposed actions and execution, and reasoning streams to the terminal alongside tool calls. Skills, MCP servers and hooks extend the loop, and a /cost command recomputes spend from the recorded run logs under evals/runs/<task>/run-1/agent.log.

## Ecosystem Position

Dao Code is a direct alternative to Claude Code and to the other DeepSeek-tuned harnesses in content/projects/agent-systems, notably DeepSeek-Reasonix and Whale, all of which chase the same cache-stability idea with different mechanisms. Compared with content/projects/frameworks entries such as LangGraph or CrewAI, it is an opinionated terminal product rather than a library, and it differs from the provider-neutral entries here by refusing multi-provider support on purpose. Where Whale scripts orchestration in JavaScript and dao-code does not, dao-code's distinguishing axis is prefix byte-stability and replayable cost, which is the number to compare against any competitor's claims.

## Getting Started

Node 20 or newer, then run the CLI in a project directory:

```bash
npm install -g dao-code
dao
```

Configure a DeepSeek API key, then use /cost inside a session to see the running cache-hit rate and spend. The published per-task agent logs can be replayed at any time to check the cost claims.

## Key Use Cases

1. Cost-controlled long sessions: keep a multi-hour coding session inside a 1M-token context without watching the cache-hit rate decay as history grows.
2. Cheap memory and self-correction: run reflection and cross-session recall on cache-reusing forks so the meta-work does not dominate the bill.
3. Repricing comparison: replay the same token trace under another vendor's rates to decide whether a cheaper model plus a better harness beats a pricier model.

## Strengths

- The cost argument is falsifiable: token counts, per-task hit rates and agent logs are committed, not just summarised, and /cost recomputes them.
- Byte-stable prefix engineering is a real architectural constraint, which means the design has an invariant rather than relying on the provider to be forgiving.
- Cache-reusing forks for reflection and memory make the meta-layer nearly free, which is unusual for this class of tool.
- MIT-licensed, Chinese-first, and reachable without an account-gated subscription.

## Limitations

The economics are DeepSeek-specific: the ~1/120 cache-hit ratio is a property of that vendor's pricing, and the claimed 30x-versus-Opus and 18x-versus-Sonnet multiples move with any price change. Published benchmarks are seven self-selected OSS bug fixes, not an independent evaluation, and absolute success rate on that set is not the claim being made. Reflection and memory on forks sound free but still consume output tokens, and output pricing is not discounted by caching. Being DeepSeek-V4-specific means a pricing change or a model withdrawal directly damages the tool's central premise, and the repository is small with limited outside battle-testing.

## Relation to the Arsenal

This is the cost-optimised terminal coding agent in content/projects/agent-systems, and it belongs in the same reading list as DeepSeek-Reasonix and Whale, which optimise the same DeepSeek prefix-cache mechanic through different designs (checkpointed single binary and JavaScript workflow scripting respectively). It competes with Claude Code as a daily driver, and where content/projects/frameworks gives you an agent you orchestrate, this gives you a CLI whose loop is tuned for one provider. Model selection itself belongs to content/projects/foundation-models, not to this entry.

## Resources

- [GitHub — tigicion/dao-code](https://github.com/tigicion/dao-code)
- [npm package — dao-code](https://www.npmjs.com/package/dao-code)
- [Published cost table and replayable run logs](https://github.com/tigicion/dao-code#why-dao-code)
