---
id: "choose-structured-output-strategy"
title: "Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding"
category: "system-design"
decision_type: "progressive"
decision_summary: "Escalate by failure cost: prompt-and-parse for prototypes, provider-native structured output (instructor/Pydantic) for most production, grammar-constrained decoding when you self-host and malformed output is unacceptable."
tags:
  - structured-output
  - llm
  - inference
  - tool-use

approaches:
  - name: "Prompt-and-Parse with Retry"
    description: "Instruct the model to emit JSON in the prompt, parse the response, and re-prompt (optionally feeding the parse error back) when parsing fails."
    when_to_use:
      - "Prototypes and internal tools where an occasional retry or failure is acceptable and you want zero added dependencies"
      - "Providers or models that expose no native structured-output mode (some open-weight endpoints, older APIs)"
    when_not_to_use:
      - "Production paths where a malformed response breaks a downstream system — retry loops convert schema failures into latency spikes and still don't guarantee success"
      - "Complex nested schemas — free-form prompting degrades sharply as schema complexity grows"
    tradeoffs:
      complexity: "Lowest — no libraries, no provider feature dependency, just a prompt convention and a parser."
      reliability: "Weakest of the three — success rates degrade with schema complexity, and retries only reduce, never eliminate, malformed output."
      latency: "Worst tail latency — every parse failure adds a full round-trip retry."
      cost: "Retries directly multiply token spend on the failing fraction of requests."

  - name: "Provider-Native Structured Output (JSON mode, function calling, instructor)"
    description: "Use the provider's structured-output or function-calling API, typically driven from a Pydantic/JSON-Schema definition via a library like instructor, so the provider enforces (or strongly biases toward) schema-valid output."
    when_to_use:
      - "Production systems on managed APIs (OpenAI, Anthropic, and compatible endpoints) — this is the default that fits most teams"
      - "You want schema definition, validation, and retries unified in one place (e.g. Pydantic models with instructor handling the re-ask loop)"
    when_not_to_use:
      - "Your provider's structured mode doesn't support your schema features (recursive schemas, complex unions) — check the provider's documented JSON-Schema subset first"
      - "You need hard guarantees on self-hosted open-weight models where no native mode exists"
    tradeoffs:
      complexity: "Low — one library and a schema definition; the enforcement burden shifts to the provider."
      reliability: "High in practice — providers with strict structured-output modes constrain generation server-side; older 'JSON mode' variants guarantee valid JSON but not your schema, so client-side validation is still required."
      flexibility: "Bounded by the provider's supported JSON-Schema subset and feature set — you inherit their limitations."
      cost: "No retry multiplication in the common case; schema tokens add modest prompt overhead."

  - name: "Grammar-Constrained Decoding (outlines, guidance, server-side grammars)"
    description: "Constrain token sampling itself with a grammar or regex/JSON-Schema-compiled automaton so the model cannot emit an invalid token — via libraries like outlines or guidance, or built into inference servers (vLLM and SGLang expose grammar-guided generation)."
    when_to_use:
      - "You self-host inference and need structurally guaranteed output — the constraint is enforced at the sampler, so malformed output is impossible by construction"
      - "Non-JSON formats (custom DSLs, regex-shaped strings, fixed choice sets) that provider APIs don't support"
    when_not_to_use:
      - "You only consume managed APIs — sampler-level constraints require control of the decoding loop, which hosted providers expose only through their own structured modes"
      - "Structural validity is not your actual problem — constrained decoding guarantees shape, not semantic correctness, and heavy constraints can degrade content quality by forcing low-probability continuations"
    tradeoffs:
      reliability: "Strongest structural guarantee available — invalid tokens are masked out during sampling."
      complexity: "Highest — requires self-hosted inference (or a server exposing grammar endpoints) and grammar compilation as part of your stack."
      accuracy: "Shape is guaranteed but content is not; over-tight grammars can force the model into continuations it would rate as unlikely, hurting semantic quality."
      latency: "Grammar compilation adds startup cost per schema; per-token masking overhead is small in modern implementations."

key_factors:
  - "Failure cost: if a malformed response merely triggers a retry, prompt-and-parse may be enough; if it corrupts a downstream write or breaks an agent loop, you need enforcement (provider-native or constrained decoding)"
  - "Hosting: managed-API-only teams choose between the first two approaches; sampler-level grammar constraints are only available where you control inference (vLLM, SGLang, llama.cpp)"
  - "Schema complexity: simple flat objects work everywhere; recursive or union-heavy schemas need to be checked against the provider's supported JSON-Schema subset or expressed as a grammar"
  - "Validation semantics: 'valid JSON' (JSON mode) and 'valid against my schema' (strict structured output, constrained decoding) are different guarantees — know which one your provider actually gives"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Need structured output"] --> Cost{"What does a malformed response cost?"}
      Cost -->|"A retry — prototype/internal tool"| PP["Prompt-and-parse with retry"]
      Cost -->|"Breaks downstream systems"| Host{"Managed API or self-hosted?"}
      Host -->|"Managed API"| Native["Provider-native structured output via instructor/Pydantic"]
      Host -->|"Self-hosted"| Fmt{"Standard JSON schema, or custom format/hard guarantee?"}
      Fmt -->|"Standard JSON, native mode available"| Native
      Fmt -->|"Custom grammar or must-not-fail"| CD["Grammar-constrained decoding (outlines/guidance, vLLM/SGLang grammars)"]

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Prompt-and-Parse with Retry"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Provider-Native Structured Output (JSON mode, function calling, instructor)"
    project_ids:
      - pydantic-ai
    tool_ids:
      - instructor
      - litellm
    build_example_ids: []
  - approach_name: "Grammar-Constrained Decoding (outlines, guidance, server-side grammars)"
    project_ids:
      - vllm
      - sglang
    tool_ids:
      - outlines
      - guidance
    build_example_ids: []

related_decisions:
  - choose-agent-framework
  - choose-llm

common_mistakes:
  - "Treating 'JSON mode' as schema enforcement — many providers' basic JSON modes guarantee syntactically valid JSON only, so responses can still be missing fields or carry wrong types; strict structured-output modes and client-side validation exist precisely because of this gap."
  - "Reaching for constrained decoding to fix a semantic problem — grammar constraints guarantee shape, not truth; if the model puts the wrong value in the right field, the fix is prompting, examples, or a better model, not a tighter grammar."
  - "Building bespoke retry-and-parse loops per call site instead of standardizing on one enforcement layer — scattered ad-hoc parsers are where structured-output bugs hide, and libraries like instructor exist to centralize exactly this."
  - "Ignoring the provider's documented JSON-Schema subset until a recursive or union-typed schema silently fails in production — check schema-feature support before committing to a schema design."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Almost every LLM system that does more than display prose needs structured output: tool arguments, extraction results, router decisions, agent actions. The failure mode is the same everywhere — the model emits something a parser rejects — but the right defense depends on what a failure costs and whether you control the decoding loop. This is a progressive decision: teams typically start at prompt-and-parse and escalate as reliability requirements harden.

## The Decision

Start from failure cost, not from technology. If a malformed response just means a retry in an internal tool, prompt-and-parse is genuinely adequate and adds zero dependencies. The moment structured output feeds a downstream system — a database write, an agent's next action, a customer-visible workflow — enforcement should move out of your prompt and into a layer that can actually guarantee something. On managed APIs that layer is the provider's structured-output/function-calling mode, best driven through a schema library like instructor so definition, validation, and re-asking live in one place. When you self-host inference, you have an option managed-API users don't: constraining the sampler itself with a compiled grammar, which makes structurally invalid output impossible rather than unlikely.

## Decision Framework

| Situation | Recommended approach | Canonical entries |
|---|---|---|
| Prototype, retries acceptable | Prompt-and-parse with retry | — |
| Production on managed APIs | Provider-native structured output via schema library | [instructor](../../tools/dx-and-tooling/instructor.md), [LiteLLM](../../tools/serving-and-deployment/litellm.md) |
| Typed agent workflows | Framework with structured output built in | [Pydantic AI](../../projects/frameworks/pydantic-ai.md) |
| Self-hosted, hard structural guarantee | Grammar-constrained decoding | [Outlines](../../tools/model-layer/outlines.md), [Guidance](../../tools/model-layer/guidance.md), [vLLM](../../projects/inference-engines/vllm.md), [SGLang](../../projects/inference-engines/sglang.md) |

The frontmatter decision tree encodes the branching: failure cost first, hosting second, format requirements third.

## Approach Deep-Dives

**Prompt-and-parse** survives because it works everywhere and costs nothing to adopt — but its reliability ceiling is real. Success rates fall as schemas grow nested and optional-field-heavy, and the retry loop that papers over failures converts them into tail latency and token spend instead. Feeding the parse error back into the retry prompt measurably improves recovery rates and should be considered the minimum implementation, not an optimization.

**Provider-native structured output** is the production default for managed-API teams. The critical detail is which guarantee your provider actually gives: basic JSON modes promise well-formed JSON, while strict structured-output modes constrain generation against your schema server-side. Libraries like instructor make the difference operationally invisible — you define a Pydantic model, and validation plus re-asking is handled uniformly — which is also why standardizing on one such layer beats scattering parsers across call sites. Typed agent frameworks (Pydantic AI) bake this pattern into the framework itself.

**Grammar-constrained decoding** moves enforcement to the only place that can make a hard promise: the sampler. Libraries like outlines compile a JSON Schema or regex into an automaton that masks invalid tokens at each step, and modern inference servers (vLLM, SGLang) expose this as a serving-time feature, so self-hosted deployments get guaranteed structure at low overhead. Its limits are equally mechanical: it requires control of inference, and it guarantees shape rather than semantics — a grammar cannot stop the model from putting a confident wrong answer in a perfectly valid field.

## Common Mistakes

- **Equating JSON mode with schema enforcement** — valid JSON is not valid-against-your-schema; know which guarantee you're getting and validate client-side when it's the weaker one.
- **Using grammar constraints to fix content problems** — constrained decoding fixes structure; wrong values in right fields are a prompting or model-selection problem.
- **Per-call-site ad-hoc parsing and retry logic** instead of one centralized enforcement layer.
- **Designing schemas before checking the provider's supported JSON-Schema subset**, then discovering recursion or unions aren't supported after the schema is load-bearing.

## When This Guidance Might Be Outdated

Rated `emerging-consensus`: the escalation ladder is stable, but the boundary between the second and third approaches is moving. Providers keep expanding strict structured-output coverage (more JSON-Schema features, more model families), and inference servers keep lowering the cost of grammar-guided generation — both trends shrink the territory where prompt-and-parse is defensible. Re-verify provider schema-feature support and server grammar capabilities before treating the specific capability boundaries described here as current.

## Related Decisions

Structured output strategy is entangled with [Choosing an Agent Framework](../model-selection/choose-agent-framework.md) — frameworks differ in whether typed output is native (Pydantic AI) or bolted on — and with [Choosing an LLM](../model-selection/choose-llm.md), since structured-output mode quality varies meaningfully across model families and providers.

## Resources

- [instructor](../../tools/dx-and-tooling/instructor.md)
- [Outlines](../../tools/model-layer/outlines.md)
- [Guidance](../../tools/model-layer/guidance.md)
- [Pydantic AI](../../projects/frameworks/pydantic-ai.md)
- [vLLM](../../projects/inference-engines/vllm.md)
- [SGLang](../../projects/inference-engines/sglang.md)
- [LiteLLM](../../tools/serving-and-deployment/litellm.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
