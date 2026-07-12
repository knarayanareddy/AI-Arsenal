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

- [UniClawBench: A Universal Benchmark for Proactive Agents on Real-World Tasks](./chen-2026-uniclawbench.md)
- [Regression Accumulation in Multi-Turn LLM Programming Conversations](./huang-2026-regression-accumulation.md)
- [Do You Need a Frontier Model as a Citation Verifier? Benchmarking Rubric LLMs for Deep-Research Source Attribution](./leung-2026-citation-verifier.md)
- [ADR: An Agentic Detection System for Enterprise Agentic AI Security](./li-2026-adr-agentic-security.md)
- [From Tool Connection to Execution Control: Benchmarking Security Invariants in MCP-Style Agent Runtimes](./liu-2026-mcp-execution-control.md)
- [AgentAtlas: Beyond Outcome Leaderboards for LLM Agents](./mazaheri-2026-agentatlas.md)
- [Validity of LLMs as Data Annotators: AMALIA on Authority](./pita-2026-amalia-authority.md)
- [GateMem: Benchmarking Memory Governance in Multi-Principal Shared-Memory Agents](./ren-2026-gatemem.md)
- [Agent Planning Benchmark: A Diagnostic Framework for Planning Capabilities in LLM Agents](./sun-2026-agent-planning-benchmark.md)
- [AgentGym2: Benchmarking Large Language Model Agents in De-Idealized Real-World Environments](./xi-2026-agentgym2.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Evaluating Large Language Models Trained on Code (Codex / HumanEval)](./chen-2021-codex.md) — Introduced Codex (the model behind GitHub Copilot) and HumanEval with the pass@k metric — establishing execution-based functional correctness, not text similarity, as the way to evaluate code generation
- [UniClawBench: A Universal Benchmark for Proactive Agents on Real-World Tasks](./chen-2026-uniclawbench.md) — Evaluates proactive agents on 400 bilingual real-world tasks in live Docker environments using capability-specific checkpoints and hidden closed-loop supervision.
- [Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference](./chiang-2024-chatbot-arena.md) — Formalized the crowdsourced pairwise-battle leaderboard: anonymous side-by-side model comparisons on live user prompts, ranked with Bradley-Terry statistics — the methodology behind LMArena, the de facto public preference ranking for frontier models
- [Training Verifiers to Solve Math Word Problems](./cobbe-2021-gsm8k.md) — The GSM8K paper: released the 8.5K grade-school math benchmark that anchored LLM reasoning evaluation for years, and introduced verifier-guided sampling — train a model to judge candidate solutions, sample many, pick the best — the seed of verification-based test-time compute
- [RAGAS: Automated Evaluation of Retrieval Augmented Generation](./es-2023-ragas.md) — Defined reference-free metrics (faithfulness, answer relevance, context relevance) for evaluating RAG pipelines with no human-labeled ground truth -- use RAGAS-style metrics as your default RAG evaluation approach rather than building bespoke evaluation
- [Measuring Massive Multitask Language Understanding](./hendrycks-2020-mmlu.md) — Introduced MMLU: 57-subject multiple-choice knowledge exam that became the field's default capability number for half a decade — now saturated and largely superseded (MMLU-Pro, GPQA), but still the single most-cited benchmark score in model cards
- [Regression Accumulation in Multi-Turn LLM Programming Conversations](./huang-2026-regression-accumulation.md) — Shows that later coding-agent turns can break earlier requirements and evaluates a verification gate that retests prior behavior before accepting a change.
- [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](./jimenez-2023-swe-bench.md) — SWE-bench: 2,294 real GitHub issues from 12 Python repos, graded by running the repos' own tests against model-generated patches — the benchmark that replaced toy coding problems and became the scoreboard of the coding-agent era
- [Do You Need a Frontier Model as a Citation Verifier? Benchmarking Rubric LLMs for Deep-Research Source Attribution](./leung-2026-citation-verifier.md) — Compares eight LLM judges on deep-research citation attribution and shows why aggregate F1 is insufficient for controlling verifier bias.
- [ADR: An Agentic Detection System for Enterprise Agentic AI Security](./li-2026-adr-agentic-security.md) — Describes an enterprise agent-security detection and response system combining high-fidelity telemetry, red-team exploration, and two-tier online detection.
- [TruthfulQA: Measuring How Models Mimic Human Falsehoods](./lin-2021-truthfulqa.md) — A benchmark of questions engineered to trigger common human misconceptions, revealing that larger models can be *less* truthful because they better imitate popular false beliefs in their training data -- truthfulness is not a free byproduct of scale
- [From Tool Connection to Execution Control: Benchmarking Security Invariants in MCP-Style Agent Runtimes](./liu-2026-mcp-execution-control.md) — Argues that MCP-style connection conventions need an explicit execution-control layer with principals, capabilities, data-flow checks, and deny-path audit.
- [AgentAtlas: Beyond Outcome Leaderboards for LLM Agents](./mazaheri-2026-agentatlas.md) — Provides a diagnostic vocabulary for separating agent outcomes, control decisions, trajectory failures, and benchmark coverage instead of relying on one success score.
- [MTEB: Massive Text Embedding Benchmark](./muennighoff-2022-mteb.md) — MTEB: 8 embedding task families across 58 datasets and 112 languages, with a public leaderboard — the benchmark that made embedding models comparable and whose central finding still holds: no single model wins everywhere
- [Validity of LLMs as Data Annotators: AMALIA on Authority](./pita-2026-amalia-authority.md) — Tests whether agreement between the Portuguese AMALIA model and human authority annotations reflects valid construct reasoning or surface-correlated shortcuts.
- [GateMem: Benchmarking Memory Governance in Multi-Principal Shared-Memory Agents](./ren-2026-gatemem.md) — Tests whether shared agent memory can provide useful long-horizon assistance without crossing principal boundaries or retaining explicitly deleted information.
- [Agent Planning Benchmark: A Diagnostic Framework for Planning Capabilities in LLM Agents](./sun-2026-agent-planning-benchmark.md) — Separates planning from execution with 4,209 multimodal cases covering feedback, tool noise, broken tools, and unsolvable tasks, then tests whether planning diagnostics improve execution.
- [Jailbroken: How Does LLM Safety Training Fail?](./wei-2023-jailbroken.md) — Explained why jailbreaks work via two failure modes — competing objectives (helpfulness vs safety) and mismatched generalization (safety training doesn't cover what pretraining can do) — and showed scale alone won't fix them; the conceptual framework behind LLM red-teaming
- [AgentGym2: Benchmarking Large Language Model Agents in De-Idealized Real-World Environments](./xi-2026-agentgym2.md) — Evaluates agents in de-idealized environments where tools must be discovered, inputs are noisy or incomplete, and success requires end-to-end procedures rather than clean API calls.
- [MemSyco-Bench: Benchmarking Sycophancy in Agent Memory](./xiang-2026-memsyco-bench.md) — Tests whether retrieved memories improve personalization without making an agent treat user-supplied memory as authoritative evidence.
- [EvoArena: Tracking Memory Evolution for Robust LLM Agents in Dynamic Environments](./xu-2026-evoarena.md) — Benchmarks agents as terminal, software, and social environments change over progressive updates, and evaluates patch-based memory for preserving those changes.
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](./zheng-2023-llm-as-a-judge.md) — Showed strong LLM judges agree with human judgments over 80% of the time, matching human-human agreement -- use LLM-as-judge for scalable open-ended evaluation, but mitigate its documented position, verbosity, and self-enhancement biases
