---
id: learn-claude-code
name: learn-claude-code
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A from-scratch teaching build of a coding-agent harness, arguing that agency comes from training and the harness is the vehicle"
github_url: "https://github.com/shareAI-lab/learn-claude-code"
license: MIT
primary_language: Python
tags: [community-favorite, agents, pytorch]
maturity: experimental
cost_model: open-source
github_stars: 77745
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://learn.shareai.run"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Shows the loop, tools, and context management written out in small pieces instead of assumed behind a framework."
best_for:
  - "You are learning how coding agents actually work and want the loop, tool dispatch, and context compaction implemented in viewable steps."
  - "You are reviewing a harness you inherited and need a reference for what the minimal components are before adding abstractions."
  - "You are a technical lead who needs to explain to a team why harness engineering differs from model improvement."
avoid_if:
  - "You need a supported, versioned runtime with releases and compatibility guarantees, because this is teaching material.
"
  - "You are shipping anything to users, because nothing here is hardened for untrusted input or production traffic."
  - "You want to compare agent frameworks, because the point is to build one by hand rather than to choose between them."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 77745, MIT, Python, last commit 2026-09-28, topics, homepage. From README: self-play milestone citations, model-as-driver and harness-as-vehicle framing, Bash and Python implementation, multilingual READMEs. Individual build stages were not read or run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The repository takes the position that agency - perceiving, reasoning, acting - is learned during training rather than coded, and that a working agent product is the model plus the harness that gives it an environment. It grounds that claim in a historical sequence: DeepMind's DQN learning Atari from raw pixels, OpenAI Five's self-play reaching the Dota 2 world champions, AlphaStar reaching Grandmaster on the European server, and Tencent's Jueyu beating KPL professionals, each cited with a paper or announcement. From there it builds a Claude-Code-like agent incrementally, and the README is explicit that the model is the driver while the harness is the vehicle. Its Bash-and-Python framing is the point: everything runs through shell commands and small scripts so each mechanism is one readable file rather than a framework call.

## Why it's in the Arsenal

The recurring gap is that most engineers can use a coding agent but cannot reason about why one loop is more reliable than another. Reading a from-scratch implementation makes the load-bearing decisions visible - where context gets compacted, how tool results get truncated, when the agent is told to stop - which is exactly the vocabulary needed to debug an agent that stalls or forgets. The historical framing matters too, because it argues that most of what gets credited to the model is really attributable to harness choices, which reframes where optimization effort should go.

## Architecture

The build proceeds as incremental layers rather than a single framework, each adding one mechanism to a working agent: prompt and system-role construction, tool definition and dispatch, tool-result handling with truncation rules, conversation loop control, and context management. Implementation language is deliberately minimal - shell plus Python - so that a mechanism is one file you can read top to bottom, and the README notes the project is available in English, Chinese, and Japanese. There is no plugin registry, no checkpointing layer, and no multi-provider abstraction, because each of those would hide the very thing the repository exists to reveal.

## Ecosystem Position

This competes with nothing so much as it explains everything: where you would normally reach for LangChain, CrewAI, or the OpenAI Agents SDK, it shows the loop being written out. Compared with the frameworks in content/projects/frameworks, the tradeoff is the mirror image - no abstractions and no integrations in exchange for full transparency. It overlaps with PocketFlow in arguing for a minimal core, though that project ships a reusable 100-line library while this ships a tutorial narrative. The tool-invocation and compaction decisions it makes in Python mirror what the serving layer in content/projects/inference-engines must account for in token budgets, and nothing here touches the retrieval or MCP tooling catalogued in content/projects/data-and-retrieval.

## Getting Started

Clone and work through the build in order; each stage leaves you with a running agent that gains one capability. English, Chinese, and Japanese READMEs are provided.

```bash
git clone https://github.com/shareAI-lab/learn-claude-code.git
cd learn-claude-code
python3 -m venv .venv && source .venv/bin/activate
pip install anthropic
```

Follow the README sequence from the bare loop outward, and change one stage at a time so you can see what each mechanism buys you.

## Key Use Cases

1. Learn agent internals: implement the loop yourself to understand where an agent's context actually gets lost.
2. Debug an inherited harness: use the staged build as a checklist of the mechanisms a working agent needs before adding your own abstractions.
3. Teach the model-versus-harness split: use the documented self-play milestones to argue that reliability work belongs in the harness layer.

## Strengths

- Every mechanism is one small file, so you can read the whole agent loop rather than tracing through a framework's internals.
- Progression from a bare loop to tool dispatch to compaction mirrors the order you actually need to build in.
- Grounds the model-versus-harness argument in cited research milestones instead of asserting it.
- Bash and Python keep the implementation portable and avoid hiding behavior behind library defaults.

## Limitations

This is teaching material with none of the hardening a production agent needs: no sandboxing, no permission model, no rate-limit handling, no durable checkpointing, and no tests. Error handling is likely illustrative, so copying its loop into production means writing the parts the tutorial skips. It follows one provider's API shape, which makes the lessons narrower than the title suggests, and the historical framing, while well sourced, is an argument rather than a finding. Coverage is young-project: high star counts on educational repositories often reflect sharing rather than adoption, and there is no release cadence or compatibility policy.

## Relation to the Arsenal

This framework-phase entry occupies the teaching slot next to the runnable harnesses in content/projects/frameworks, and its per-stage loop is the thing you would otherwise have to reverse-engineer from one of them. The truncation and compaction rules it teaches are the same constraints that bound token cost in content/projects/inference-engines, and a mature version of the same concerns is where the connector tooling in content/projects/data-and-retrieval would attach. Nothing here provides evaluation, so quality claims about your agent need content/projects/benchmark-and-eval.

## Resources

- [Repository](https://github.com/shareAI-lab/learn-claude-code)
- [Online course site](https://learn.shareai.run)
- [Nature paper on DQN reaching professional Atari play](https://www.nature.com/articles/nature14236)
