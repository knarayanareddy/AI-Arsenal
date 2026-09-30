---
id: flue
name: flue
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A TypeScript agent harness where an agent is a function that composes its own model, sandbox, skills, tools, and durability"
github_url: "https://github.com/withastro/flue"
license: Apache-2.0
primary_language: TypeScript
tags: [agents, inference, security, stateful]
maturity: beta
cost_model: open-source
github_stars: 8388
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-25"
docs_url: "https://flueframework.com"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Treats the harness as the product, making model, environment, and permissions an explicit declaration rather than a config file."
best_for:
  - "You are building an autonomous agent that must survive restarts and need durable recovery for work it has already accepted."
  - "You want a full sandbox with filesystem and tool access without assembling container isolation into your own loop."
  - "You are deploying the same agent across Node, Cloudflare Workers, GitHub Actions, and GitLab CI from one TypeScript source."
avoid_if:
  - "You want a Python-first stack, because the runtime and hook APIs here are TypeScript-only."
  - "You need a hosted control plane with SLAs, since you run agents locally via CLI or deploy them to a runtime you choose."
  - "You are building a fixed linear pipeline with no model discretion, which a five-minute flow script expresses more clearly."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 8388, Apache-2.0, TypeScript, last commit 2026-09-25, topics, homepage. From README: use-agent directive, useModel/useSandbox/useSkill/useTool, @flue/runtime and /node, claude-sonnet-4-6 example, feature and deployment lists. Durability internals untested."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Flue's central idea is that the agent is literally a function. You export a function, call useModel, useSandbox, useSkill, and useTool inside it, and return the instruction text describing what the agent must accomplish - the code shown in the README for a Triage agent wires anthropic/claude-sonnet-4-6, a local sandbox, two SKILL.md files imported directly, and two GitHub tools, then returns a prompt to reproduce a bug, diagnose root cause, verify intent, and attempt a fix. Around that declaration the runtime supplies sessions so context persists across conversations and events, sandboxes that are virtual, local, or remote containers, durability that preserves accepted work through failures and restarts, subagents for delegation, typed tools, MCP server connections, channels receiving verified events from Slack, Teams, Discord, and GitHub, and observability exporting to OpenTelemetry, Braintrust, or Sentry.

## Why it's in the Arsenal

The recurring decision is whether your agent's environment and permissions are an explicit part of the program or an implicit part of whatever runtime happens to execute it. Declarative hooks make the blast radius reviewable - you can read one function and know which model it calls, where it runs, which skills load, and which tools it may touch. Durability is the second answer: long autonomous work fails somewhere, and resuming from accepted progress rather than restarting a paid multi-hour agent is a design property here instead of something you retrofit.

## Architecture

Agent modules use a 'use agent' directive and are compiled by the Flue runtime, which reads the hook calls inside each exported function and assembles the execution context: model binding, sandbox allocation, skill loading from imported SKILL.md files, tool registration including MCP-provided tools, and event channel subscriptions. Sandboxes are pluggable across virtual, local, and remote container backends, which is what lets the same agent source run in a CLI process or on a hosted runtime. Durability is implemented as recovery of accepted work across process failure, and observability is exporter-based rather than built-in, so tracing lands in whatever backend you already run. Deployment targets span Node.js, Cloudflare Workers, GitHub Actions, GitLab CI, and providers such as Daytona.

## Ecosystem Position

Flue competes with LangGraph, CrewAI, and the OpenAI Agents SDK as an agent runtime, and the differentiator is the declaration model: no separate graph DSL, no chain factory, just a function whose hook calls describe the harness. Compared with LangGraph's explicit state machine and checkpointing, Flue trades fine-grained control for a smaller surface where the runtime decides session and durability mechanics. It overlaps with the declarative harness doctrine in the sibling content/projects/frameworks entries rather than implementing any of it. Where it does not compete is MCP: Flue consumes MCP servers as a tool source, matching the connector servers in content/projects/data-and-retrieval, and its OpenTelemetry and Braintrust exports target the same observability tooling as content/projects/benchmark-and-eval rather than replacing them.

## Getting Started

Install the runtime, write an agent module that declares its hooks, and run it through the CLI.

```bash
npm install @flue/runtime
npx flue run agents/triage.ts
```

The runtime's Node entrypoint is @flue/runtime/node, which is where the local() sandbox constructor comes from in the README example.

## Key Use Cases

1. Build an autonomous agent that must persist: rely on durable recovery so a crash mid-run resumes accepted work instead of restarting the whole task.
2. Give an agent real environment access: attach a local or remote container sandbox with filesystem and tool permissions declared in the same function.
3. Run identical agent logic across environments: build once in TypeScript and deploy to Node, Cloudflare Workers, or a CI runner without rewriting the loop.

## Strengths

- The agent is one readable function, so a reviewer can see model, sandbox, skills, and tools in a single screen.
- Durability for accepted work is a runtime property, not a pattern you reimplement per project.
- Pluggable sandboxes - virtual, local, remote container - let you trade isolation strength against startup cost per run.
- Deployment targets include edge and CI runtimes, so an agent triggered by a GitHub event needs no separate service.

## Limitations

TypeScript only, which excludes the large body of Python agent tooling and data-science libraries. The hook API is compiler-driven, so code must obey the module conventions; dynamic construction of agents at runtime is not the design center. Deployment parity across Node, Cloudflare Workers, and GitHub Actions means some backends cannot honor every sandbox or durability feature, and the compatibility matrix is not summarized in the README. Durability guarantees need scrutiny: what counts as accepted work, and what happens to a tool call that was in flight when the process died. There is no hosted runtime SLA in the open-source project, so you own the reliability of whatever you deploy onto.

## Relation to the Arsenal

This framework-phase entry is one of the runtime harnesses in the sibling content/projects/frameworks phase, and its durability and subagent model are the features to compare against LangGraph and CrewAI there. It consumes MCP servers rather than defining them, so its tool surface comes from content/projects/data-and-retrieval, and its OpenTelemetry plus Braintrust exporters feed the instrumentation stack shared with content/projects/benchmark-and-eval. Serving models come from content/projects/inference-engines.

## Resources

- [Repository](https://github.com/withastro/flue)
- [Documentation site](https://flueframework.com)
- [Building agents guide](https://flueframework.com/docs/guide/building-agents/)
