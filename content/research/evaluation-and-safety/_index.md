---
title: "Evaluation and Safety Research"
section: "research/evaluation-and-safety"
auto_generated: false
---

# Evaluation and Safety Research

## What belongs here

Benchmark design, red-teaming methodology, alignment evaluation, factuality and hallucination measurement, bias measurement, safety frameworks, and RAG-pipeline-specific or LLM-as-judge evaluation techniques — papers whose primary contribution is how you measure a model or system's quality or safety, not how you build the system itself.

## What does NOT belong here

A paper proposing a training technique for improving safety or alignment (e.g. Constitutional AI's RLAIF training approach) belongs in `training-and-alignment/`, since its primary contribution is a training method, even though "safety" is in scope for both folders — the distinguishing question is whether the paper trains a property into a model (training-and-alignment/) or measures a property of a model (evaluation-and-safety/).

## Engineering frame

When I am deciding how to evaluate a model or a RAG/agent pipeline, which evaluation technique should I use, and what known biases or limitations does that evaluation technique itself have that I need to correct for?

## Reading order guidance

- Start with [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./zheng-2023-llm-as-a-judge.md) — establishes the dominant open-ended evaluation technique used across this catalog's eval tooling (opik, deepeval, ragas all build on LLM-as-judge patterns), along with its known position/self-preference/verbosity biases.
- Read [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./es-2023-ragas.md) next for reference-free RAG-specific evaluation metrics, directly implemented in this catalog's `ragas-rag-evaluation` project entry.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Evaluation And Safety in This Phase

### Recently Added

- [Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference](./chiang-2024-chatbot-arena.md)
- [Training Verifiers to Solve Math Word Problems](./cobbe-2021-gsm8k.md)
- [Measuring Massive Multitask Language Understanding](./hendrycks-2020-mmlu.md)
- [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](./jimenez-2023-swe-bench.md)
- [MTEB: Massive Text Embedding Benchmark](./muennighoff-2022-mteb.md)
- [Jailbroken: How Does LLM Safety Training Fail?](./wei-2023-jailbroken.md)
- [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./es-2023-ragas.md)
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./zheng-2023-llm-as-a-judge.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference](./chiang-2024-chatbot-arena.md) — Formalized the crowdsourced pairwise-battle leaderboard: anonymous side-by-side model comparisons on live user prompts, ranked with Bradley-Terry statistics — the methodology behind LMArena, the de facto public preference ranking for frontier models
- [Training Verifiers to Solve Math Word Problems](./cobbe-2021-gsm8k.md) — The GSM8K paper: released the 8.5K grade-school math benchmark that anchored LLM reasoning evaluation for years, and introduced verifier-guided sampling — train a model to judge candidate solutions, sample many, pick the best — the seed of verification-based test-time compute
- [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./es-2023-ragas.md) — Defined reference-free metrics (faithfulness, answer relevance, context relevance) for evaluating RAG pipelines with no human-labeled ground truth -- use RAGAS-style metrics as your default RAG evaluation approach rather than building bespoke evaluation
- [Measuring Massive Multitask Language Understanding](./hendrycks-2020-mmlu.md) — Introduced MMLU: 57-subject multiple-choice knowledge exam that became the field's default capability number for half a decade — now saturated and largely superseded (MMLU-Pro, GPQA), but still the single most-cited benchmark score in model cards
- [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](./jimenez-2023-swe-bench.md) — SWE-bench: 2,294 real GitHub issues from 12 Python repos, graded by running the repos' own tests against model-generated patches — the benchmark that replaced toy coding problems and became the scoreboard of the coding-agent era
- [MTEB: Massive Text Embedding Benchmark](./muennighoff-2022-mteb.md) — MTEB: 8 embedding task families across 58 datasets and 112 languages, with a public leaderboard — the benchmark that made embedding models comparable and whose central finding still holds: no single model wins everywhere
- [Jailbroken: How Does LLM Safety Training Fail?](./wei-2023-jailbroken.md) — Explained why jailbreaks work via two failure modes — competing objectives (helpfulness vs safety) and mismatched generalization (safety training doesn't cover what pretraining can do) — and showed scale alone won't fix them; the conceptual framework behind LLM red-teaming
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./zheng-2023-llm-as-a-judge.md) — Showed strong LLM judges agree with human judgments over 80% of the time, matching human-human agreement -- use LLM-as-judge for scalable open-ended evaluation, but mitigate its documented position, verbosity, and self-enhancement biases
