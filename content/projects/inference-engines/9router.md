---
id: 9router
name: 9router
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: Local OpenAI-compatible proxy that tiers provider calls and rewrites tool_result payloads before forwarding them upstream
github_url: "https://github.com/decolua/9router"
license: MIT
primary_language: Other
tags: [routing, efficiency]
maturity: beta
cost_model: open-source
github_stars: 29951
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-26"
docs_url: "https://9router.com"
demo_url: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Turns subscription quota, cheap tiers and free tiers into one ordered fallback chain behind a single /v1 endpoint."
best_for:
  - "You are running Claude Code, Codex or Cline on metered API keys and you need one endpoint that survives rate limits without you swapping providers by hand."
  - "You have unused monthly subscription quota and you want a router that spends it before the reset window closes, then degrades to a cheaper tier."
  - "You are paying for several provider accounts at once and you want round-robin rotation across them instead of serialising on a single key."
avoid_if:
  - "You need a contractual SLA, an audit trail, or a data-residency guarantee, since this sits in the request path between your agent and every upstream provider."
  - "You cannot accept free-tier providers whose upstream terms may forbid resale or automated use of subscription credentials."
  - "You want to review the running code, since the npm package that serves the dashboard is published private and the public repository does not contain the whole service."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license, primary language, topics, last commit, open-issue count and homepage. The tier ladder, port number, install command and token-saving percentages are read from the README and project site; none were exercised on this machine."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

9Router runs as a local HTTP service on port 20128 and exposes an OpenAI-shaped /v1 surface that Claude Code, Codex, Cursor, Cline and other CLI agents point at instead of a vendor endpoint. Inside the proxy sit four cooperating pieces: an RTK-style token saver that rewrites tool_result blocks, a format translator that converts between the OpenAI chat-completions schema and Anthropic's Messages schema, a quota tracker that records per-provider consumption, and a tiered fallback chain that walks subscription providers, then low-cost providers such as GLM and MiniMax, then free ones such as Kiro and OpenCode Free. A local dashboard at http://localhost:20128 is where providers, accounts and keys are configured. The project is published to npm as 9router and also ships as a Docker image on Docker Hub and GHCR.

## Why it's in the Arsenal

Coding agents burn their budget on two separate problems. Rate limits and expiring quota stop work mid-refactor, and tool_result payloads such as git diff or directory listings consume a large share of every request's input tokens. Most teams solve this with a hand-written provider-switch script, which breaks the moment a second account or a third format is involved. 9Router collapses provider selection, quota accounting, account rotation, schema translation and output rewriting into a process that any OpenAI-compatible client can adopt by changing one base URL, which is the recurring engineering decision it removes.

## Architecture

The request path is a single local HTTP listener. An inbound chat-completions or Messages request is parsed, the message array is scanned for tool_result content, and that content is compressed by the RTK token saver before anything is sent upstream. The schema translator then maps the request and response between the OpenAI and Anthropic wire formats so one client can drive both provider families. The quota tracker records token spend per provider and per account, and a refresh loop resets counters at each provider's reset boundary. Dispatch follows a three-tier ladder: tier 1 is subscription-backed accounts with remaining quota, tier 2 is metered low-cost providers, tier 3 is free or promotional endpoints. When a tier returns a rate-limit or quota error, the router advances to the next tier, and multiple accounts on the same provider are rotated round-robin so a per-account throttle does not stall the session.

## Ecosystem Position

In the LLM gateway space it competes with LiteLLM's proxy, Portkey and Helicone, but it competes on quota economics rather than on observability or policy enforcement. Unlike Portkey and LiteLLM, which are built as general self-hosted gateways with config-driven routing, 9Router ships a hard-coded consumer ladder aimed at coding agents, and it bundles RTK-style tool-output rewriting that the general gateways do not do. It complements rather than replaces the agents it fronts: Claude Code and Cursor still own the loop, the agent harness in content/tools/dx-and-tooling still owns prompt and tool policy, and 9Router only rewrites the transport. Because it depends on free promotional tiers, it is not a substitute for a paid enterprise gateway such as a self-hosted Portkey deployment when auditability is the requirement.

## Getting Started

Install the package globally and start the local router, then point a coding agent at the local endpoint. The dashboard opens on port 20128 where you connect a provider and copy the API key into your agent's settings.

```bash
npm install -g 9router
9router
# dashboard: http://localhost:20128
```

In Claude Code, Codex or Cline set the endpoint to http://localhost:20128/v1, paste the key from the dashboard, and select a routed model id such as kr/claude-sonnet-4.5. A Docker image is also published if you would rather not install Node tooling on the host.

## Key Use Cases

1. Keeping a long agentic coding session alive: a subscription tier hits its rate limit mid-refactor and the router silently advances to a cheap provider so the tool loop does not crash.
2. Draining expiring quota: subscription accounts that reset monthly get consumed first through round-robin rotation before any metered key is charged.
3. Normalising multiple providers: one OpenAI-shaped endpoint fronts Anthropic, OpenAI, Gemini and DeepSeek models, removing per-client provider configuration.

## Strengths

- A single local endpoint removes per-client provider setup, since every agent just needs a base URL and a key.
- Three-tier fallback with per-account rotation turns rate limits from a stop condition into a slow-down condition.
- Schema translation between OpenAI and Anthropic wire formats means one client can drive both provider families.
- RTK-style tool_result compression shrinks the largest, least compressible part of a coding agent's input token bill.

## Limitations

The most consequential constraint is reviewability: the README states the serving package is published private as 9router-app, so the code that actually handles your prompts and provider credentials is not fully in the public repository. The free and promotional tiers it prefers come with third-party terms of service, and routing agent traffic through them is a policy decision your legal team should see. The project is young, created in January 2026, and carries more than two thousand open issues against roughly thirty thousand stars, so expect sharp edges in provider-specific behaviour. Multi-account rotation is a throughput trick, not an identity story, and it will not satisfy anyone who needs per-user attribution. It also adds a hop in front of every token, which is latency you cannot remove, and it does nothing for output-token cost.

## Relation to the Arsenal

This entry sits at the transport edge of the Arsenal. Sibling phases such as content/projects/inference-engines cover the servers that actually execute model weights, and 9Router deliberately does not compete with vLLM or SGLang: those own throughput while 9Router owns which upstream vendor answers. In content/tools/dx-and-tooling it is the counterpart to command-output compressors like rtk, since both attack input-token cost, one at the shell layer and one at the tool_result layer. Read it next to the routing and gateway entries in content/tools/orchestration and to the observability entries when you need request-level tracing that this dashboard does not provide.

## Resources

- [Repository and setup guide](https://github.com/decolua/9router)
- [Project site](https://9router.com)
- [npm package 9router](https://www.npmjs.com/package/9router)
