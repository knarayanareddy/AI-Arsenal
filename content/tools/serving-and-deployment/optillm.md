---
id: optillm
name: "optillm"
type: tool
job: [orchestration]
description: "OpenAI-compatible proxy that applies search, sampling and multi-agent strategies behind a model name"
url: "https://github.com/algorithmicsuperintelligence/optillm"
cost_model: open-source
pricing_detail: "Apache-2.0 proxy; the real spend is the extra upstream calls each technique issues"
tags: [reasoning, inference, routing, llm, tool-use]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Source is unlimited; cost scales with the number of upstream calls per request"
self_hostable: true
open_source: true
source_url: "https://github.com/algorithmicsuperintelligence/optillm"
docs_url: null
github_url: "https://github.com/algorithmicsuperintelligence/optillm"
alternatives: []
integrates_with: []
added_date: "2026-10-10"
last_reviewed: "2026-10-10"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "A clean way to test inference-time techniques against your own traffic without touching application code; the token multiplier is the constraint, not the concept"
status: active
phase: serving-and-deployment
audience: [prototype, production]
best_when:
  - "You want to measure whether a reasoning technique actually helps your task before committing prompts or code to it"
  - "Several applications share a model endpoint and the choice of strategy should be a routing decision rather than a code change"
avoid_when:
  - "The interface has a latency budget that a single model call already approaches"
  - "Token spend is capped tightly enough that a five-call strategy per request is unaffordable"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Technique list read from the repository; accuracy gains are task-specific and were not benchmarked against this catalogue's workloads."
buzz_sources: []
---

## Overview

optillm is a Python proxy that speaks the OpenAI chat-completions protocol and applies a reasoning strategy before answering. The strategy is selected by the model name in the request — `optillm/moa` for a mixture-of-agents pass, `optillm/mcts` for tree search, `optillm/bon` for best-of-N sampling — so a client that already calls an OpenAI endpoint can switch techniques by editing a string.

Underneath, each technique is a control loop that issues several upstream calls: sampling candidates, branching a search, generating with one model and synthesising with another, or reflecting on an answer before returning it. The proxy aggregates the results and repackages them as one ordinary response.

That indirection is the whole contribution. The techniques exist in papers and in framework-specific code; here they are a routing concern, evaluated against real traffic without forking an application.

## Why It's in the Arsenal

Inference-time compute is the cheapest lever most teams have not measured. Before fine-tuning or paying for a larger model, a best-of-N or search pass on a hard subset of requests may move accuracy more than either.

The Arsenal includes optillm because it turns that hypothesis into an A/B test: same client, same prompt, different model string. It also documents the honest cost — multi-call strategies multiply tokens, and the multiplier is invisible in the request payload.

## Key Features

- A drop-in `/v1/chat/completions` and `/v1/completions` surface, compatible with existing OpenAI SDK clients.
- Search-style strategies including Monte Carlo tree search and beam-style exploration over reasoning paths.
- Mixture-of-agents layering, where several models propose and a synthesiser merges the candidates.
- Self-reflection passes that critique and revise an answer before it is returned.
- Per-request strategy selection through the model name, plus configuration for candidate counts and search depth.
- Routing to any upstream that exposes an OpenAI-compatible endpoint, including vLLM and local servers.

## Architecture / How It Works

A request arrives with a model string that encodes both the target model and the strategy. The proxy parses it, picks the corresponding control module, and executes that module's call plan against the upstream provider — sequentially for reflection loops, in parallel for candidate sampling. Results are scored or merged, and one completion is returned in the standard response envelope, with streaming reconstructed where the strategy permits it.

Because the strategy lives at the proxy, its token consumption does too: a five-candidate pass looks like one request from the client and five from the provider, which is why per-key metering belongs at the gateway in front of this proxy rather than at the client.

## Getting Started

Point the proxy at one provider, run a fixed evaluation set through plain completion and through two strategies, and compare accuracy against tokens consumed. Without that ratio the default configuration will be whichever technique sounds most sophisticated, which is rarely the one that fits the budget.

## Use Cases

1. Benchmarking best-of-N against a single call on a task with a verifiable answer, such as arithmetic or schema-constrained extraction.
2. A quality tier that routes hard requests — long legal or financial questions — to a search strategy while routine requests use one call.
3. Mixing models where one is strong at drafting and another at critique, without writing orchestration code in the application.
4. Research on inference-time scaling using production-shaped traffic rather than benchmark fixtures.

## Strengths

- Strategy selection becomes configuration, which makes experiments cheap to run and trivial to revert.
- Works with any OpenAI-compatible upstream, including local servers, so technique evaluation need not cost hosted tokens.
- Keeps multi-call orchestration out of application codebases and in one auditable place.
- Parallel candidate sampling uses concurrency rather than serial calls, so wall-clock latency grows less than token cost.
- The standard response envelope means existing clients, logging and evaluation harnesses keep working.

## Limitations / When NOT to Use

- Token cost multiplies per request: a mixture-of-agents pass can cost several times a single completion, and the client cannot see it.
- Latency follows the slowest branch; search strategies are unsuitable for interactive use.
- Branching search holds intermediate state, so a high-throughput proxy instance needs memory headroom.
- Answer quality gains depend on the task; for simple extraction the extra calls add cost and no accuracy.
- A beta proxy on the request path must be monitored and scaled like production code.

## Integration Patterns

Put the proxy behind your existing gateway so budgets and rate limits apply to the real upstream call count, and tag responses with the strategy used so evaluation can attribute quality to configuration. Cap concurrency per instance, because a strategy that fans out five calls multiplies the load your provider quota sees. Reserve expensive strategies for routed subsets, and keep a plain path available for latency-sensitive callers.

## Resources

- [GitHub — algorithmicsuperintelligence/optillm](https://github.com/algorithmicsuperintelligence/optillm)

## Buzz & Reception

Interest comes from the inference-scaling literature and repository activity; published accuracy figures belong to the underlying papers, not to this proxy's implementation. The comparison worth running is accuracy per thousand tokens on your own evaluation set.
