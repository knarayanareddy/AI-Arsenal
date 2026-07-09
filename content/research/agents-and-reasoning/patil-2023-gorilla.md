---
id: patil-2023-gorilla
title: "Gorilla: Large Language Model Connected with Massive APIs"
phase: agents-and-reasoning
venue: neurips
year: 2023
authors:
  - "Patil, S. G."
  - "Zhang, T."
  - "Wang, X."
  - "Gonzalez, J. E."
arxiv_id: "2305.15334"
arxiv_url: "https://arxiv.org/abs/2305.15334"
pdf_url: "https://arxiv.org/pdf/2305.15334"
code_url: "https://github.com/ShishirPatil/gorilla"
venue_url: "https://arxiv.org/abs/2305.15334"

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 1200

tldr: "Fine-tuned an LLM to select and correctly invoke the right API from thousands of options, using retrieval of live documentation to stay current and reduce hallucinated calls — an early rigorous tool/function-calling result"
key_contribution: "Showed retrieval-aware fine-tuning on API documentation lets a model generate accurate API calls at scale and adapt to changing APIs, plus introduced APIBench and an AST-based metric for measuring call correctness and hallucination"

builds_on: []
implemented_in: []

tags:
  - agents
  - llm
  - fine-tuning
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Gorilla tackled a specific, practical agent problem: given thousands of possible APIs, can an LLM pick the right one and write a correct call to it? Base LLMs are bad at this — they hallucinate endpoints, arguments, and versions. Gorilla fine-tuned a model on API documentation and, crucially, made it *retrieval-aware*: at inference it can consult the current docs for an API, so it adapts when APIs change rather than relying on frozen training knowledge. It also introduced a benchmark (APIBench) and an AST-matching metric to measure whether generated calls are actually correct, giving the field a rigorous way to evaluate tool use. It is an important early data point in the tool-use / function-calling line that agent systems depend on.

## Why it's in the Arsenal

- Reliable tool/function calling is the backbone of agentic systems; Gorilla is a foundational study of how to make it accurate at scale and robust to changing APIs.
- Its retrieval-aware training idea directly informs a production pattern: supply live tool schemas/docs at inference so the model calls current tools correctly instead of hallucinating.
- `practical_applicability: high` — the techniques (retrieval of tool docs, evaluating call correctness with AST matching) transfer to any system that lets an LLM invoke tools.

## Core Contribution

Gorilla's contributions are threefold. First, retrieval-aware fine-tuning: the model is trained both to map instructions to API calls and to use retrieved documentation, so it can incorporate the *current* API spec at inference time and adapt to version changes or new endpoints — reducing the stale-knowledge failure mode. Second, a measurement methodology: APIBench, a dataset of real ML APIs (from hubs like Hugging Face, Torch Hub, TensorFlow Hub), and an AST-subtree-matching metric that checks whether a generated call structurally matches a valid API invocation, which also quantifies *hallucination* (calls to non-existent APIs). Third, the empirical result that this approach lets a comparatively small fine-tuned model outperform much larger general models at correct API selection and invocation, especially when documentation retrieval is available.

## Key Results

- The fine-tuned Gorilla model surpassed strong general LLMs (including much larger ones) at generating correct API calls on APIBench (2023), with notably lower hallucination
- Retrieval-awareness let the model adapt to API documentation changes at test time, improving robustness over frozen-knowledge baselines
- Introduced AST-based accuracy/hallucination measurement, giving tool-use evaluation a concrete, reproducible metric
- Results are on the APIBench ML-API setting; treat them as strong evidence for the retrieval-aware fine-tuning approach rather than a universal guarantee across all tool ecosystems.

## Methodology

The authors constructed APIBench from major model hubs, generated instruction–API-call training pairs (self-instruct style), and fine-tuned an LLaMA-based model in two regimes: with and without retrieved documentation in context. Evaluation used AST subtree matching against the set of valid API calls to score functional correctness and to detect hallucinated calls, comparing Gorilla against general LLMs with and without retrieval. The ablation on retrieval isolates its contribution to accuracy and adaptability.

## Practical Applicability

Gorilla's lessons apply whenever you give an LLM tools. Practically: (1) put current tool/function schemas and docs in context (or retrieve them) so the model calls real, up-to-date tools rather than hallucinating — the single most transferable takeaway; (2) evaluate tool use with structural checks (does the call match a valid signature?) and track a hallucination rate, rather than eyeballing outputs; (3) for large or fast-changing tool catalogs, retrieval over tool docs scales better than stuffing every schema into the prompt. These ideas underpin modern function-calling and MCP-style tool integrations.

## Limitations & Critiques

- APIBench focuses on ML-model APIs; performance on other domains (enterprise APIs, arbitrary REST services) is not guaranteed and needs its own evaluation.
- The fine-tuning approach requires building instruction–call datasets and retrievable documentation, which is effort many teams now shortcut with strong general models' native function-calling.
- Native function/tool-calling in current frontier models has narrowed the gap that motivated a specialized fine-tuned model, though Gorilla's retrieval and evaluation ideas remain relevant.
- AST matching validates structure, not runtime success — a structurally-valid call can still fail against a live API.

## Reproductions & Follow-up Work

The project is open source with released model, data (APIBench), and evaluation code, and spawned follow-on work including the Berkeley Function-Calling Leaderboard, which extends rigorous tool-use evaluation. It complements tool-use foundations like [Toolformer](./schick-2023-toolformer.md) and reason-act agents like [ReAct](./yao-2022-react.md), and connects to multi-agent frameworks such as [AutoGen](./wu-2023-autogen.md) that orchestrate tool-using agents.

## Relation to the Arsenal

- Foundational tool/function-calling reference for the catalog's agent tools and orchestration entries.
- Pairs with [Toolformer](./schick-2023-toolformer.md) (learning to call tools), [ReAct](./yao-2022-react.md) (interleaving reasoning and tool actions), and [AutoGen](./wu-2023-autogen.md) (orchestrating tool-using agents).

## Resources

- [arXiv abstract](https://arxiv.org/abs/2305.15334)
- [PDF](https://arxiv.org/pdf/2305.15334)
- [Gorilla (ShishirPatil/gorilla)](https://github.com/ShishirPatil/gorilla)
