---
id: "require-human-approval-for-irreversible-actions"
title: "Require Human Approval Before Irreversible Agent Actions"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - security
difficulty: "intermediate"
impact: "high"
time_to_implement: "2-3 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (payment/deletion/send-email agent tools)"
applies_to:
  - agent-tool-use
  - payment-and-transactional-agents
  - autonomous-coding-agents
gotchas:
  - "Gating too many actions behind approval defeats the purpose of automation -- only gate genuinely irreversible ones (send, delete, pay, deploy), not every tool call"
  - "If the approval step has no timeout, agents hang indefinitely waiting for a human who may never respond -- always pair with a timeout that fails closed (blocks the action) not open"
  - "Approval fatigue is real: if every routine action needs approval, humans start rubber-stamping without reading, defeating the safeguard entirely"
metrics: []
related_tips:
  - cap-agent-tool-retries
  - sandbox-code-execution-tools
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Classify each tool an agent can call as reversible or irreversible (sending an email, deleting a record, making a payment, deploying code). For irreversible actions, insert a synchronous human-approval gate before execution instead of letting the agent execute directly. This bounds the blast radius of an agent's mistake to what a human can review in seconds, without slowing down the reversible majority of actions.

## Before / After

**Before:**
```python
def execute_tool(tool_call):
    return TOOLS[tool_call.name](**tool_call.args)
```

**After:**
```python
IRREVERSIBLE_TOOLS = {"send_email", "delete_record", "charge_payment", "deploy"}

def execute_tool(tool_call):
    if tool_call.name in IRREVERSIBLE_TOOLS:
        if not request_human_approval(tool_call, timeout_s=120):
            raise ApprovalDenied(tool_call.name)
    return TOOLS[tool_call.name](**tool_call.args)
```

## Implementation

`request_human_approval` should surface the tool name, arguments, and agent's stated reasoning to a human (Slack message, dashboard, CLI prompt), block until a response or timeout, and default to denial on timeout. Tested against a LangGraph interrupt-based human-in-the-loop pattern; the same shape works with any framework that supports pausing execution mid-run.

## Gotchas

- Gating too many actions behind approval defeats the purpose of automation — only gate genuinely irreversible ones (send, delete, pay, deploy), not every tool call
- If the approval step has no timeout, agents hang indefinitely waiting for a human who may never respond — always pair with a timeout that fails closed (blocks the action), not open
- Approval fatigue is real: if every routine action needs approval, humans start rubber-stamping without reading, defeating the safeguard entirely

## When NOT to Apply

- Skip this for agents that only call read-only or fully reversible tools (search, lookup, draft-without-sending) — there is nothing here to gate
- Skip this for high-throughput, low-stakes actions where a human reviewing each one is operationally impossible (e.g. per-message content moderation at scale) — use sampling-based review or a stricter automated policy instead

## Verification

Production-verified: multiple practitioner reports describe requiring human approval specifically for payment, deletion, and outbound-communication agent tools after near-miss incidents where an agent took an irreversible action based on a hallucinated premise; the pattern is also a documented interrupt/human-in-the-loop feature in mainstream agent orchestration frameworks (LangGraph), evidence the pattern is common enough to be a first-class framework feature, not a one-off workaround.
