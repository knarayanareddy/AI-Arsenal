---
id: "choose-caching-strategy"
title: "Caching LLM Workloads: Provider Prompt Caching, Gateway Response Caching, Semantic Caching, and Prefix/KV Reuse"
category: "serving-patterns"
decision_type: "composition"
decision_summary: "LLM caches compose across layers: provider prompt caching for repeated prefixes, gateway exact-match caching for identical requests, semantic caching only with a measured false-hit budget, prefix/KV reuse when self-hosting."
tags:
  - caching
  - inference
  - efficiency
  - llm

approaches:
  - name: "Provider Prompt Caching"
    description: "Managed-API feature that discounts and accelerates the repeated prefix of a prompt (system prompt, tool definitions, long shared context) when consecutive requests share it — enabled by structuring prompts so stable content precedes variable content."
    when_to_use:
      - "Any managed-API workload with a long stable prefix: system prompts, tool schemas, few-shot blocks, or shared documents reused across many requests"
      - "Agent loops, where the growing conversation replays the same prefix on every step — prompt caching is the single largest cost lever for agentic workloads on paid APIs"
    when_not_to_use:
      - "Prompts with no stable prefix (fully dynamic content first) — there is nothing to cache, and restructuring for cacheability should happen first"
    tradeoffs:
      cost: "Large direct savings on input tokens for prefix-heavy workloads (providers discount cached-prefix tokens substantially); zero infrastructure to run."
      latency: "Reduces time-to-first-token on cache hits since the prefix isn't re-processed."
      complexity: "Low, but requires prompt-structure discipline: stable content first, variable content last, and awareness of provider-specific cache lifetime and minimum-prefix rules."
      reliability: "No correctness risk — the model still computes the response; only prefix processing is reused."

  - name: "Gateway Exact-Match Response Caching"
    description: "An LLM gateway or proxy (LiteLLM, Helicone) returns a stored response when an identical request (same model, prompt, parameters) repeats, skipping the model call entirely."
    when_to_use:
      - "Traffic contains genuinely identical repeated requests: common queries in a search/FAQ surface, repeated eval-suite runs, CI pipelines re-invoking fixed prompts"
      - "Development and testing — caching identical calls makes test suites faster, cheaper, and deterministic"
    when_not_to_use:
      - "Personalized or context-dependent responses where serving user A's answer to user B is a correctness or privacy defect — cache keys must include everything that legitimately varies"
      - "Traffic where exact repeats are rare (long unique conversations) — the hit rate won't justify the layer"
    tradeoffs:
      cost: "Hits cost zero model spend — the strongest per-hit saving of any approach — but only exact repeats hit."
      latency: "Hits return in milliseconds instead of seconds."
      complexity: "Low-to-moderate: a gateway you likely already run for routing, plus cache-key and TTL policy."
      reliability: "Safe when the key covers all variance; stale-answer risk is bounded by TTL policy."

  - name: "Semantic Caching"
    description: "Cache lookup by embedding similarity rather than exact match: a new query similar enough to a cached one (above a threshold) returns the cached response without a model call."
    when_to_use:
      - "High-volume surfaces where many users phrase the same question differently and answers are user-independent and slowly-changing (product FAQs, documentation Q&A)"
      - "Only after measuring: the similarity threshold must be tuned against a labeled sample of your real traffic, with a false-hit rate you've decided you can afford"
    when_not_to_use:
      - "Any surface where a subtly-wrong cached answer is worse than a slower correct one — similarity is not equivalence, and near-duplicate queries with opposite intent ('how to enable X' vs 'how to disable X') are embedding-close"
      - "Personalized, time-sensitive, or context-dependent responses"
    tradeoffs:
      cost: "Extends cache savings beyond exact repeats — the hit rate on paraphrase-heavy traffic can be several times the exact-match rate."
      accuracy: "Introduces a genuine correctness risk absent from all other approaches: false hits serve a wrong answer confidently; the threshold trades hit rate against error rate and must be measured."
      complexity: "Highest of the caching options — an embedding model, a vector store, threshold calibration, and ongoing monitoring of false-hit rates."
      latency: "Hits are fast, but every miss now pays an added embedding + lookup cost before the model call."

  - name: "Inference-Server Prefix/KV Reuse (vLLM, SGLang)"
    description: "Self-hosted inference engines reuse computed KV-cache state across requests sharing a prefix — vLLM's automatic prefix caching and SGLang's RadixAttention make shared-prefix workloads dramatically cheaper without any application-level change."
    when_to_use:
      - "Self-hosted serving with shared-prefix traffic: multi-turn chat, agent loops, batch jobs over the same system prompt or document"
      - "You want caching gains without application changes — the engine handles reuse transparently"
    when_not_to_use:
      - "Managed-API-only deployments — this layer requires operating the inference engine"
      - "Workloads with no prefix overlap across requests, where the radix/prefix structures add memory overhead without hits"
    tradeoffs:
      latency: "Large time-to-first-token improvements on shared-prefix hits — the prefill for the shared portion is skipped."
      cost: "Higher effective throughput per GPU on prefix-heavy traffic, i.e. lower cost per request at the fleet level."
      complexity: "Zero application-level complexity but assumes you already carry the operational weight of self-hosted serving."
      reliability: "No correctness risk — identical computation is reused, not approximated."

key_factors:
  - "Layer identification: the four caches live at different layers (provider, gateway, application, inference engine) and don't conflict — the real question is which layers your traffic shape rewards, not which one to pick"
  - "Traffic shape: prefix-heavy (agents, chat) rewards prompt caching and KV reuse; exact-repeat-heavy (FAQs, evals, CI) rewards gateway caching; paraphrase-heavy user-independent Q&A is the only shape that justifies semantic caching"
  - "Correctness budget: exact-match and prefix caches are correctness-free; semantic caching is the only approach that can serve a wrong answer, so it needs an explicit measured error budget"
  - "Hosting: provider prompt caching and inference-server KV reuse are mutually exclusive per request path (one is the managed substitute for the other); gateway and semantic layers apply to both"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Reducing LLM cost/latency with caching"] --> Prefix{"Long stable prompt prefixes?"}
      Prefix -->|"Yes, managed API"| PC["Enable provider prompt caching; restructure prompts stable-first"]
      Prefix -->|"Yes, self-hosted"| KV["Rely on engine prefix/KV reuse (vLLM APC, SGLang RadixAttention)"]
      Prefix -->|"No"| Exact
      PC --> Exact{"Identical requests repeat?"}
      KV --> Exact
      Exact -->|"Yes"| GW["Add gateway exact-match caching (LiteLLM, Helicone)"]
      Exact -->|"No"| Para
      GW --> Para{"Paraphrase-heavy, user-independent Q&A at volume?"}
      Para -->|"Yes, and false-hit budget defined"| Sem["Pilot semantic caching with measured threshold"]
      Para -->|"No"| Done["Stop — further caching layers won't pay for themselves"]

confidence: "established"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Provider Prompt Caching"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Gateway Exact-Match Response Caching"
    project_ids:
      - helicone
    tool_ids:
      - litellm
    build_example_ids: []
  - approach_name: "Semantic Caching"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Inference-Server Prefix/KV Reuse (vLLM, SGLang)"
    project_ids:
      - vllm
      - sglang
    build_example_ids: []
    tool_ids: []

related_decisions:
  - choose-deployment-target
  - choose-llm

common_mistakes:
  - "Reaching for semantic caching first because it promises the highest hit rate — it is the only cache that can be wrong, and the cheaper, risk-free layers (prompt caching, exact-match) usually capture most of the available savings without any correctness exposure."
  - "Leaving provider prompt caching unexploited by putting variable content (user question, timestamp, request ID) at the top of the prompt — cacheability is a prompt-structure property, and a single early-varying token breaks the shared prefix."
  - "Cache keys that omit legitimate variance — omitting the user ID, retrieved context version, or model parameters from an exact-match key turns a cache into a cross-user or stale-data bug."
  - "Deploying semantic caching without a labeled threshold-calibration set, then discovering the false-hit rate in production through user complaints rather than measurement."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

"Add a cache" is the most common first response to LLM cost and latency pressure, but LLM caching is not one technique — it's four, living at four different layers of the stack, with different hit conditions and radically different correctness profiles. Treating them as competing options leads teams to skip the safe, high-yield layers and jump to the risky one (semantic caching). Treating them as a composition — which they are — yields most of the savings at zero correctness risk.

## The Decision

Match layers to your traffic shape, in order of risk. If your prompts carry long stable prefixes — system prompts, tool schemas, agent conversation replays — provider prompt caching (managed APIs) or engine-level prefix/KV reuse (self-hosted, via vLLM's automatic prefix caching or SGLang's RadixAttention) is free money: no correctness risk, large input-token and time-to-first-token savings, and for agent loops usually the single biggest lever available. If identical requests repeat — FAQ surfaces, eval suites, CI — a gateway exact-match cache (LiteLLM, Helicone) eliminates those model calls entirely. Semantic caching comes last and only conditionally: it is the sole layer that can serve a wrong answer, so it needs paraphrase-heavy, user-independent traffic *and* an explicitly measured false-hit budget to justify itself.

## Decision Framework

| Traffic property | Layer | Canonical entries |
|---|---|---|
| Long stable prompt prefixes, managed API | Provider prompt caching | — |
| Long stable prefixes, self-hosted | Engine prefix/KV reuse | [vLLM](../../projects/inference-engines/vllm.md), [SGLang](../../projects/inference-engines/sglang.md) |
| Exact repeated requests | Gateway exact-match cache | [LiteLLM](../../tools/serving-and-deployment/litellm.md), [Helicone](../../projects/benchmarks-and-evals/helicone.md) |
| Paraphrased repeats, user-independent answers | Semantic cache (measured pilot) | — |

The frontmatter decision tree applies these as an additive sequence, cheapest-and-safest first.

## Approach Deep-Dives

**Provider prompt caching** is fundamentally a prompt-structure discipline: providers cache the longest shared prefix, so stable content must precede variable content, and one early-varying token (a timestamp in the system prompt is the classic offender) destroys cacheability for everything after it. For agent workloads — where step N replays steps 1..N-1 verbatim — cached-prefix discounts compound across the loop and typically dominate every other optimization.

**Gateway exact-match caching** is the only layer that skips the model entirely, which makes it both the cheapest per hit and the easiest to reason about: correctness reduces to cache-key completeness and TTL policy. Its quiet second value is determinism — eval suites and CI runs against cached responses are reproducible and free.

**Semantic caching** extends hits to paraphrases by accepting a new failure mode: embedding similarity is not semantic equivalence, and intent-inverting near-duplicates are embedding-close. The engineering posture that works is a pilot with a labeled calibration set, an explicit false-hit budget, threshold tuning against real traffic, and continuous monitoring — anything less is deploying an unmeasured error source in the response path.

**Engine prefix/KV reuse** gives self-hosters the prompt-caching benefit transparently: the engine recognizes shared prefixes across requests and reuses computed KV state, skipping redundant prefill. It composes with continuous batching and costs the application nothing; its only demands are that you operate the engine and that your traffic actually shares prefixes.

## Common Mistakes

- **Starting with semantic caching** — the riskiest layer deployed before the risk-free ones have been exhausted.
- **Prompt structures that break prefix caching** — variable content early in the prompt forfeits the discount silently.
- **Incomplete cache keys** — cross-user leakage and stale answers are cache-key bugs, not caching's inherent cost.
- **Unmeasured semantic thresholds** — false-hit rates discovered via user complaints instead of a calibration set.

## When This Guidance Might Be Outdated

Rated `established`: the layer decomposition and risk ordering are stable properties of the stack. The moving parts are provider-specific — cache lifetimes, minimum prefix lengths, and discount rates change frequently, and engines keep improving prefix-reuse hit rates — so re-verify your provider's current prompt-caching rules and your engine's prefix-caching defaults rather than the framework itself.

## Related Decisions

Caching strategy is downstream of [Choosing a Deployment Target](./choose-deployment-target.md) — the managed-vs-self-hosted fork determines whether the prefix layer is provider prompt caching or engine KV reuse — and interacts with [Choosing an LLM](../model-selection/choose-llm.md), since prompt-caching pricing and rules differ enough across providers to shift total-cost comparisons for prefix-heavy workloads.

## Resources

- [vLLM](../../projects/inference-engines/vllm.md)
- [SGLang](../../projects/inference-engines/sglang.md)
- [LiteLLM](../../tools/serving-and-deployment/litellm.md)
- [Helicone](../../projects/benchmarks-and-evals/helicone.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
