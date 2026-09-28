---
id: caveman
name: caveman
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: A prompt-shrinking skill and proxy that rewrites agent output into clipped caveman grammar to cut billed tokens
github_url: "https://github.com/JuliusBrussee/caveman"
license: NOASSERTION
primary_language: Go
tags: [efficiency, structured-output, routing, agents]
maturity: beta
cost_model: open-source
github_stars: 108165
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://docs.caveman.so/docs/quickstart"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Tests whether terse register actually reduces spend, with published third-party numbers instead of a hand-wave."
best_for:
  - "You are paying per output token on long coding sessions and want a cheap experiment before restructuring your prompts."
  - "You are instrumenting agent token cost and need a baseline technique that changes style only, leaving tools and logic untouched."
  - "You run an agent fleet where style rewriting can be applied centrally at a proxy rather than inside every prompt template."
avoid_if:
  - "You need the agent's prose to be readable by non-technical reviewers, because compressed register is the entire mechanism."
  - "You are in a domain where terse phrasing risks under-specifying a requirement, such as clinical, legal, or safety-critical output."
  - "You are on a fixed subscription plan with no per-token metering, since you would be trading clarity for savings you are not billed for."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 108165, NOASSERTION license, Go, last commit 2026-09-28, topics, homepage. From README: npx install, 65% claim, 30+ agents, 10 wraps, MIT+BSL, 69-token example, Adobe and JetBrains citations. Those third-party benchmarks were not reproduced."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Caveman ships two halves. The first is a skill, installable with npx skills add JuliusBrussee/caveman -g, that instructs the agent to drop articles, auxiliaries, and inflections. The second is a proxy middleware published on npm as @caveman-ai/middleware and on PyPI as caveman-middleware, which sits between your agent host and the model endpoint and rewrites output in transit so you do not have to change prompts. Ten agents are wrapped natively and the README claims compatibility with more than thirty. The license is described as MIT plus BSL. The interesting part is the evidence: an Adobe Research paper cites caveman-style output cutting cost by 1.4x to 2.4x and up to 3x, and JetBrains tested it on 86 real coding tasks reporting no measurable quality cost.

## Why it's in the Arsenal

The decision it addresses is whether the prose layer of agent output - the connectives, hedges, and restatements - is worth paying for. At frontier pricing a verbose assistant can spend a large fraction of a session's budget saying nothing the tool call did not already convey. Compressing register is the cheapest available intervention because it changes only surface form: no architecture changes, no prompt rewrites, no model swap, and the proxy can be inserted between existing components in an afternoon.

## Architecture

The skill is Markdown installed into a host's skills directory and loaded whenever the agent writes text. The proxy path is the more interesting design: it terminates the model endpoint connection, applies a deterministic text transformation to responses, and forwards the rewritten text onward, which means adoption requires no change to the agent's prompt or tool wiring. Middleware ships for both npm and pip ecosystems, so a Node-based and a Python-based host can both sit behind it. Because the transformation is stylistic and local, it adds latency of roughly a text pass rather than another model call - the README's example contrasts a 69-token normal response against the compressed form.

## Ecosystem Position

Caveman competes with prompt-compression approaches such as LLMLingua, and with structured token-efficient formats like TOON, rather than with any agent framework. Compared with LLMLingua, which compresses input context using a model, Caveman compresses output with a deterministic rewrite, so there is no additional model spend - but also no ability to recover meaning a naive rewrite drops. Compared with Token-Oriented Object Notation, which shrinks structured payloads by dropping redundant syntax, Caveman shrinks prose and is therefore orthogonal: you would use one for your JSON payloads and the other for your chat turns. It overlaps with the token-cost toolkits in content/projects/frameworks that measure usage, and the savings land only if your serving model in content/projects/inference-engines meters output tokens rather than charging a flat subscription.

## Getting Started

Install the skill globally in one command, no account or API key required. For the proxy path, install the middleware package for your stack.

```bash
npx skills add JuliusBrussee/caveman -g
# or the proxy middleware, Node:
npm install @caveman-ai/middleware
# or Python:
pip install caveman-middleware
```

Point your agent host at the middleware, then measure billed tokens before and after on your own traffic.

## Key Use Cases

1. Run a spend experiment: enable the proxy for one week and compare billed output tokens against the previous week on the same workload.
2. Trim an expensive fleet: apply the rewrite centrally at the gateway so hundreds of agents change style without a prompt edit each.
3. Establish a baseline: before restructuring prompts or swapping models, find out how much of your bill is pure prose overhead.

## Strengths

- Deterministic local rewrite, so it adds no model call and no inference cost of its own.
- Proxy placement means zero changes to agent prompts, tools, or harness wiring.
- Published third-party validation: an Adobe Research paper and a JetBrains run across 86 real coding tasks.
- Middleware published on both npm and PyPI, so Node and Python hosts can adopt it identically.

## Limitations

Terseness is lossy by construction. Nuance, hedging, and explicit caveats - precisely the things you want in a security review, a root-cause explanation, or a risk statement - are the first things a compressed register drops. The headline savings come from self-reported benchmarks and one cited paper; the README itself is careful to frame the number as a per-task ceiling rather than an average, which is a warning worth reading. The MIT plus BSL licensing is unusual for a middleware package and deserves a legal read before commercial deployment. It also does nothing about input token cost, which is often the larger half of an agent's bill.

## Relation to the Arsenal

This framework-phase entry is a prompt-and-proxy layer rather than a runtime, so it composes with the agent harnesses in content/projects/frameworks rather than replacing one. It sits at the request boundary, which means its effect on total cost depends on how content/projects/inference-engines meters tokens. Structured payloads it cannot help with belong to the format-level entries in content/projects/data-and-retrieval, such as TOON.

## Resources

- [Repository](https://github.com/JuliusBrussee/caveman)
- [npm middleware package](https://www.npmjs.com/package/@caveman-ai/middleware)
- [JetBrains write-up on the technique](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/)
