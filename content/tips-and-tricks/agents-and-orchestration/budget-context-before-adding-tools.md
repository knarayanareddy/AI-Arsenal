---
id: "budget-context-before-adding-tools"
title: "Budget Context Before Adding More Tools to an Agent"
category: "context-window-management"
tags:
  - agents
  - tool-use
  - memory
difficulty: "intermediate"
impact: "medium"
time_to_implement: "30 minutes"
phase: agents-and-orchestration
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: theoretical
applies_to:
  - multi-tool-agents
gotchas:
  - "Tool definitions (name, description, parameter schema) consume prompt tokens for every tool the agent COULD call, not just the ones it does call each turn"
  - "Adding tools without measuring the resulting context growth can silently push a working agent prompt past a model's effective context ceiling, degrading tool-selection accuracy before you notice"
metrics: []
related_tips:
  - allowlist-tools-per-agent-role
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Measure the token cost of your full tool-definition set before adding another tool to an agent's toolbox. Every tool definition (name, description, JSON schema for its parameters) is included in the prompt on every turn regardless of whether that tool gets called, so a large tool registry has a real, compounding context cost independent of the conversation itself.

## Before / After

**Before:** tools added ad hoc as new capabilities are needed, with no tracking of cumulative token cost.

**After:** a token count check in CI or a pre-deploy script that fails if the full tool-definition block exceeds a set budget (e.g. 2,000 tokens), forcing an explicit decision to trim or split the toolset before it grows further.

## Implementation

Tokenize the serialized tool-definition block your framework sends to the model and track it over time; when it approaches your budget, either allowlist tools per agent role (see related tip) so each agent only carries the definitions it needs, or split one agent into several narrower ones.

## Gotchas

- Tool definitions consume prompt tokens for every tool the agent could call, not only the ones it calls each turn
- Adding tools without measuring the resulting context growth can silently push a working agent prompt past a model's effective context ceiling, degrading tool-selection accuracy before you notice

## When NOT to Apply

- Skip this if your agent has a small, stable toolset (under 5-10 tools) where the token cost is negligible relative to your context budget
- Skip active monitoring if your framework already tracks and reports prompt token composition automatically

## Verification

Theoretical: the mechanism (tool definitions occupy prompt tokens) is a direct, well-understood consequence of how function-calling APIs work, but this specific entry has not yet been backed by a named measurement or case study — flagged `enrichment_status: draft` pending verification with concrete before/after token counts on a real agent.
