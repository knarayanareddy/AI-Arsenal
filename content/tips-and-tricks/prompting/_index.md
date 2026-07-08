---
title: "Prompting Tips & Tricks"
section: "tips-and-tricks/prompting"
auto_generated: false
---

# Prompting Tips & Tricks

## What belongs here

Interventions for system prompt design, few-shot construction, instruction clarity, output format control, prompt compression, and template patterns — anything that changes the text of the prompt itself or the message-role structure it's assembled into.

## What does NOT belong here

A tip about how to size or rerank retrieved chunks belongs in `rag-and-retrieval/`, even if the fix is expressed as a prompt change, unless the failure mode is prompt-structure-specific (e.g. instruction placement, delimiter use). A tip about the agent's tool-use loop belongs in `agents-and-orchestration/`. Choosing a prompting *framework* or redesigning an entire prompting pipeline is a disguised architecture decision and belongs in `build-examples/` or `architectures/`, not here.

## Quick-start: highest impact tips in this phase

- [Separate System Rules From Task-Specific Instructions](./separate-system-and-task-prompts.md) — keep stable policy and variable task content in distinct message roles
- [Add Few-Shot Examples for Edge Cases, Not Just the Happy Path](./add-output-examples-for-edge-cases.md) — demonstrate edge-case handling instead of relying on generalization
- [Constrain Critical Outputs With a JSON Schema, Not Prose Instructions](./use-json-schema-for-outputs.md) — use native schema-constrained decoding for machine-parsed outputs

## Tips in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Prompting in This Phase

### Recently Added

- [Ask for Supporting Quotes Before Answers in RAG Prompts](./ask-for-quotes-before-answers-in-rag-prompts.md)
- [Pin Model Versions in Prompt Regression Tests](./pin-model-versions-in-prompt-regression-tests.md)
- [Instruct the Model to Ask for Missing Inputs Instead of Guessing](./ask-for-missing-inputs-before-solving.md)
- [Name the Audience Explicitly in the Prompt](./name-the-audience-in-the-prompt.md)
- [Order Few-Shot Examples by Similarity to the Actual Task](./order-few-shot-examples-by-similarity.md)
- [Place Task Inputs After Stable Instructions, Not Before](./put-task-inputs-after-instructions.md)
- [Rank Context Sections by Expected Usefulness, Not Chronology](./rank-context-by-expected-usefulness.md)
- [Reserve Output Token Budget Before Filling Context With Input](./reserve-output-tokens-before-adding-context.md)
- [Separate User Content From System Instructions With Roles and Delimiters](./separate-user-content-from-system-instructions.md)
- [Set Temperature by the Cost of Being Wrong, Not a Generic Default](./set-temperature-by-decision-risk.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Add Few-Shot Examples for Edge Cases, Not Just the Happy Path](./add-output-examples-for-edge-cases.md) — 
- [Instruct the Model to Ask for Missing Inputs Instead of Guessing](./ask-for-missing-inputs-before-solving.md) — 
- [Ask for Supporting Quotes Before Answers in RAG Prompts](./ask-for-quotes-before-answers-in-rag-prompts.md) — 
- [Name the Audience Explicitly in the Prompt](./name-the-audience-in-the-prompt.md) — 
- [Order Few-Shot Examples by Similarity to the Actual Task](./order-few-shot-examples-by-similarity.md) — 
- [Pin Model Versions in Prompt Regression Tests](./pin-model-versions-in-prompt-regression-tests.md) — 
- [Place Task Inputs After Stable Instructions, Not Before](./put-task-inputs-after-instructions.md) — 
- [Rank Context Sections by Expected Usefulness, Not Chronology](./rank-context-by-expected-usefulness.md) — 
- [Reserve Output Token Budget Before Filling Context With Input](./reserve-output-tokens-before-adding-context.md) — 
- [Separate System Rules From Task-Specific Instructions](./separate-system-and-task-prompts.md) — 
- [Separate User Content From System Instructions With Roles and Delimiters](./separate-user-content-from-system-instructions.md) — 
- [Set Temperature by the Cost of Being Wrong, Not a Generic Default](./set-temperature-by-decision-risk.md) — 
- [State Negative Constraints as Testable Rules, Not Vague Warnings](./state-negative-constraints-as-testable-rules.md) — 
- [Store Prompts With Explicit Release Version Identifiers](./store-prompts-with-release-versions.md) — 
- [Summarize Repeated or Stale Conversation Blocks Instead of Repeating Them Verbatim](./summarize-repeated-conversation-blocks.md) — 
- [Allocate a Fixed Token Budget to Each Prompt Section](./use-context-budgets-per-section.md) — 
- [Wrap Retrieved Context in Explicit Delimiters](./use-delimiters-around-retrieved-context.md) — 
- [Request JSON Only When a Parser Will Consume the Output](./use-json-only-for-machine-parsed-outputs.md) — 
- [Constrain Critical Outputs With a JSON Schema, Not Prose Instructions](./use-json-schema-for-outputs.md) — 
- [Wrap Long Prompt Sections in XML Tags for Clear Parsing](./use-xml-tags-for-long-prompt-sections.md) — 
- [Version System Prompts With the Same Discipline as Application Code](./version-system-prompts-like-code.md) — 
