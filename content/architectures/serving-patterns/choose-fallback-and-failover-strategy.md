---
id: "choose-fallback-and-failover-strategy"
title: "Handling Provider Failures: Retry, Model/Provider Fallback, or a Managed Gateway"
category: "serving-patterns"
decision_type: "progressive"
decision_summary: "Retry with backoff for transient errors; add a model/provider fallback chain to survive single-provider outages; adopt a managed gateway when routing, budgets, and observability across many models justify it."
tags:
  - inference
  - llm
  - self-hosted

approaches:
  - name: "Retry with Backoff"
    description: "On transient failures (rate limits, timeouts, 5xx), retry the same request a bounded number of times with exponential backoff and jitter before surfacing the error."
    when_to_use:
      - "Transient, self-correcting failures — brief rate-limit spikes, momentary timeouts — where the same provider will succeed on a second attempt"
      - "The minimum resilience every LLM call should have, regardless of what else you add"
    when_not_to_use:
      - "The provider is fully down or the request is deterministically failing (bad input, auth error) — retries only add latency and cost"
      - "Latency-critical paths where you cannot afford the added delay of multiple attempts"
    tradeoffs:
      complexity: "Lowest — a retry wrapper with backoff and a cap."
      reliability: "Handles transient blips, but offers nothing against a sustained single-provider outage."
      latency: "Adds delay on the failing fraction; jittered backoff avoids retry storms."
      cost: "Retries multiply spend on the failing fraction; a cap bounds the worst case."

  - name: "Model / Provider Fallback Chain"
    description: "Define an ordered list of models or providers; if the primary fails (after its retries), automatically route the request to the next capable option."
    when_to_use:
      - "Availability matters more than always using the single best model — a degraded answer beats an error page"
      - "You have a second provider or model that can serve the request acceptably when the primary is unavailable"
    when_not_to_use:
      - "Outputs must be strictly reproducible or provider-locked (compliance, exact-model requirements) so silently switching models is unacceptable"
      - "No acceptable second option exists — a fallback to a much weaker model can be worse than a clean failure"
    tradeoffs:
      reliability: "Survives single-provider outages by degrading gracefully to an alternative."
      accuracy: "The fallback model may be weaker; quality varies by which link in the chain served the request."
      complexity: "Moderate — a capability-ordered chain, per-model prompt compatibility, and logging which model actually served."
      cost: "Fallbacks may be pricier or cheaper; cost becomes non-uniform across requests."

  - name: "Managed Gateway / Router"
    description: "Route all traffic through an LLM gateway (self-hosted or hosted) that centralizes retries, fallback chains, load balancing, rate-limit handling, budgets, caching, and observability across many models behind one API."
    when_to_use:
      - "You call many models/providers and need uniform routing, spend controls, and observability in one place rather than reimplementing them per service"
      - "Operational concerns (budgets, key management, per-team limits, unified logs) have become a first-class requirement"
    when_not_to_use:
      - "A single model on a single provider with modest volume — a gateway is infrastructure you do not yet need"
      - "You cannot accept an added network hop in the request path or the operational burden of running the gateway"
    tradeoffs:
      scalability: "Centralizes cross-model routing, budgets, and observability that would otherwise sprawl across services."
      complexity: "Highest — another component to run (or a hosted dependency), plus its own failure mode as a central chokepoint."
      latency: "Adds a proxy hop; usually small, but it is now on the critical path for every call."
      reliability: "Consolidates resilience logic, but the gateway itself must be highly available or it becomes a single point of failure."

key_factors:
  - "Failure type: transient blips need retries; sustained outages need a fallback chain; neither is fixed by the other"
  - "Availability vs. determinism: fallback trades exact-model guarantees for uptime — acceptable for most apps, not for provider-locked or compliance cases"
  - "Number of models/providers: one model rarely justifies a gateway; many models make centralized routing and budgets worth the hop"
  - "Where resilience logic should live: per-service libraries keep the request path simple; a gateway centralizes it at the cost of a chokepoint"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["LLM call resilience"] --> Base["Always: bounded retry with backoff + jitter"]
      Base --> Outage{"Must survive a full provider outage?"}
      Outage -->|"No"| Done1["Retries are enough"]
      Outage -->|"Yes"| Alt{"Acceptable second model/provider exists?"}
      Alt -->|"No"| Fail["Fail cleanly; do not fall back to an unacceptable model"]
      Alt -->|"Yes"| Chain["Model/provider fallback chain"]
      Chain --> Many{"Many models + need budgets/observability?"}
      Many -->|"No"| Done2["Keep resilience in the app/library"]
      Many -->|"Yes"| GW["Managed gateway/router centralizes it"]

confidence: "established"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Retry with Backoff"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Model / Provider Fallback Chain"
    project_ids: []
    tool_ids:
      - litellm
    build_example_ids: []
  - approach_name: "Managed Gateway / Router"
    project_ids: []
    tool_ids:
      - litellm
      - portkey
    build_example_ids: []

related_decisions:
  - choose-serving-stack
  - choose-caching-strategy
  - choose-llm

common_mistakes:
  - "Retrying non-transient errors — auth failures, invalid inputs, and content-policy rejections are deterministic, so retrying them only burns latency and tokens; classify the error before retrying."
  - "Retry storms with no jitter — synchronized exponential backoff across many clients hammers a recovering provider in waves; add jitter and a global cap."
  - "Silent fallback to a much weaker model — degrading to an option that produces unacceptable answers can be worse than a clean error, and hiding which model served the request makes the quality drop undebuggable; always log the serving model."
  - "Introducing a gateway as an un-replicated single point of failure — centralizing resilience behind one hop that is not itself highly available moves the outage rather than removing it."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

LLM calls fail — providers rate-limit, time out, have outages, and deprecate models. A production system needs a deliberate answer to "what happens when the model call fails?", and the right answer escalates with your availability requirements and the number of models you run. This is a progressive, additive decision: retries are the floor every call should have, a fallback chain adds outage survival, and a gateway centralizes both plus routing and spend control once you operate at fleet scale.

## The Decision

Begin with error classification, because it determines which tool applies. Transient failures (429s, timeouts, 5xx) are what bounded retries with jittered backoff exist for; deterministic failures (auth, bad input, policy) must not be retried at all. Retries alone, however, do nothing when a provider is entirely down — surviving that requires a fallback chain to a second model or provider, which trades the guarantee of always using your best model for the guarantee of an answer. Accept that trade only when a genuinely acceptable alternative exists and you log which model served each request. Once you are juggling many models with budgets, per-team limits, and a need for unified observability, reimplementing this per service stops making sense and a managed gateway becomes the right home for it — provided the gateway itself is highly available, or you have merely relocated your single point of failure.

## Decision Framework

| Situation | Recommended approach | Canonical entries |
|---|---|---|
| Every LLM call (baseline) | Bounded retry with backoff + jitter | — |
| Must survive provider outages | Model/provider fallback chain | [LiteLLM](../../tools/serving-and-deployment/litellm.md) |
| Many models, need budgets/observability | Managed gateway/router | [LiteLLM](../../tools/serving-and-deployment/litellm.md), [Portkey](../../tools/serving-and-deployment/portkey.md) |
| No acceptable alternative model | Fail cleanly, alert | — |

The frontmatter decision tree encodes the branching: retries always, then outage-survival need, then whether fleet-scale routing justifies a gateway.

## Approach Deep-Dives

**Retry with backoff** is the non-negotiable floor. The two details that separate a working implementation from an outage amplifier are error classification (never retry deterministic failures) and jitter (never let synchronized backoff hammer a recovering provider). Cap the attempts so a persistent failure surfaces quickly instead of compounding latency.

**Fallback chains** convert a provider outage from an incident into a quality dip. The engineering is in the seams: prompts and parameters must be compatible across the models in the chain, the fallback must be genuinely acceptable (a much weaker model can be worse than an honest error), and every response must record which model actually served it, or a silent quality regression becomes impossible to debug. Libraries like LiteLLM implement ordered fallbacks behind a unified API.

**Managed gateways** centralize retries, fallbacks, load balancing, rate-limit handling, caching, budgets, and observability across many models behind one endpoint. That consolidation is exactly what you want at fleet scale and exactly what you do not want as an un-replicated chokepoint — the gateway is now on the critical path for every call, so its own availability is the new ceiling on yours.

## Common Mistakes

- **Retrying deterministic errors** — classify before retrying; auth/input/policy failures will never self-correct.
- **Backoff without jitter** — synchronized retries stampede a recovering provider.
- **Silent fallback to an unacceptable model** — log the serving model and set a quality floor for the chain.
- **A gateway that is a single point of failure** — centralized resilience must itself be highly available.

## When This Guidance Might Be Outdated

Rated `established`: the escalation ladder (retry → fallback → gateway) mirrors decades of distributed-systems practice and is stable. What shifts is the tooling maturity and where the gateway boundary sits — hosted gateways keep absorbing more routing/observability features, which lowers the volume at which adopting one beats hand-rolling. Re-verify current gateway feature sets and their availability guarantees before treating a specific product boundary here as fixed.

## Related Decisions

Failover strategy sits alongside [Choosing a Serving Stack](./choose-serving-stack.md) (which governs your own inference availability), overlaps [Choosing a Caching Strategy](./choose-caching-strategy.md) (a cache can serve during upstream failures), and is shaped by [Choosing an LLM](../model-selection/choose-llm.md), since the set of interchangeable models determines what a fallback chain can even contain.

## Resources

- [LiteLLM](../../tools/serving-and-deployment/litellm.md)
- [Portkey](../../tools/serving-and-deployment/portkey.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
