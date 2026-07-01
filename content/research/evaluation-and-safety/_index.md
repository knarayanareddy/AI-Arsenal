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

_No entries yet._

### Most Popular

_No star-tracked entries yet._

### Browse All

_No entries yet._
