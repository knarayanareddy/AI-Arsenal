---
id: lm-evaluation-harness
name: LM Evaluation Harness (EleutherAI)
type: tool
job: [evaluation]
description: The de facto standard benchmark harness for language models — hundreds of academic tasks behind one CLI, and the backend of the Open LLM Leaderboard
url: "https://github.com/EleutherAI/lm-evaluation-harness"
cost_model: open-source
pricing_detail: Open source (MIT)
tags: [evaluation, llm, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; compute costs are your own
self_hostable: true
open_source: true
source_url: "https://github.com/EleutherAI/lm-evaluation-harness"
docs_url: "https://github.com/EleutherAI/lm-evaluation-harness"
github_url: "https://github.com/EleutherAI/lm-evaluation-harness"
alternatives: [openai-evals, deepeval]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [research, production]
best_when:
  - You need standardized, reproducible academic-benchmark numbers (MMLU, GSM8K, HellaSwag, and hundreds more) that are comparable to published results — same prompts, same few-shot format, same metrics
  - You're evaluating base or fine-tuned open models across backends — it drives HF Transformers, vLLM, SGLang, GGUF, and API models through one task interface
avoid_when:
  - You're evaluating an application (RAG pipeline, agent, chatbot) rather than a model — task-based academic benchmarks say little about product behavior; use application-level eval tools
  - You need LLM-as-judge or human-preference evaluation — the harness scores against reference answers and log-likelihoods, not rubric judgments
version_tracked: null
verdict: best-in-class
verdict_rationale: The shared measurement infrastructure of open LLM research — when a model card cites benchmark numbers, this is usually the code that produced them
status: active
---

## Overview

EleutherAI's lm-evaluation-harness is the reference implementation for benchmarking language models: a unified CLI and task framework covering hundreds of academic evaluations, with backends for local HF models, vLLM/SGLang servers, quantized GGUF models, and commercial APIs. It powered Hugging Face's Open LLM Leaderboard and is the standard citation for reproducible benchmark methodology.

## Why It's in the Arsenal

Benchmark numbers are only meaningful if produced the same way as everyone else's, and this harness is that "same way": versioned task definitions pin the prompt format, few-shot sampling, and metric so your MMLU score is comparable to a paper's. It anchors the model-evaluation slot the way pytest anchors testing — the catalog's application-eval tools (DeepEval, RAGAS, promptfoo) measure products; this measures models.

## Key Features

- 400+ tasks with versioned definitions (changes bump the version, protecting comparability)
- Backend-agnostic: `hf`, `vllm`, `sglang`, `gguf`, OpenAI-compatible APIs, and more via `--model`
- Log-likelihood, generation, and multiple-choice evaluation modes with few-shot control
- YAML-defined custom tasks; batch evaluation and results caching

## Architecture / How It Works

Each task is a YAML/Python definition (dataset, prompt template, few-shot policy, metric); a model adapter exposes loglikelihood/generate primitives per backend; the runner shards examples, queries the model, and aggregates metrics with versioned task hashes recorded in results — the mechanism behind its reproducibility guarantees.

## Getting Started

```bash
pip install lm-eval
lm_eval --model hf --model_args pretrained=meta-llama/Llama-3.1-8B-Instruct \
  --tasks mmlu,gsm8k --num_fewshot 5 --batch_size auto
```

## Use Cases

1. **Scenario**: validating a fine-tune didn't regress general capability — run the same task suite on base and tuned checkpoints and diff
2. **Scenario**: producing model-card benchmark tables that reviewers can reproduce exactly
3. **Scenario where this is NOT the right fit**: measuring whether your RAG app answers customer questions correctly — that's an application eval; use DeepEval/RAGAS-class tools instead

## Strengths

- Comparability is the product: versioned tasks and standard prompts make numbers citable, which no ad-hoc eval script achieves
- Backend breadth means the same suite runs on a laptop GGUF and a multi-GPU vLLM server

## Limitations / When NOT to Use

- Academic benchmarks correlate weakly with application quality — treat scores as capability floors, not product metrics
- Contamination caveats apply: public benchmark data leaks into training sets, and the harness can't detect that

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `lm-evaluation-harness` rather than duplicating details.

## Resources

- [GitHub](https://github.com/EleutherAI/lm-evaluation-harness)

## Buzz & Reception

13.2k GitHub stars (verified via API 2026-07-08); MIT; actively maintained by EleutherAI with broad community contribution. Cited as the evaluation methodology in a large share of open-model releases.

---
*Last reviewed: 2026-07-08 by @maintainer*
