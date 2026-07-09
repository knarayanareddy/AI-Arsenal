---
id: "validate-tool-arguments-server-side-before-execution"
title: "Validate Tool Arguments Server-Side Before Execution"
category: "security-best-practices"
tags:
  - security
  - tool-use
  - guardrails
difficulty: "intermediate"
impact: "high"
time_to_implement: "1-2 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (OWASP LLM Top 10 — excessive agency / insecure output handling discussions)"
applies_to:
  - agent-tool-use
  - multi-tool-agents
  - production-llm-systems
gotchas:
  - "A JSON schema on the tool signature checks shape, not authorization -- a well-formed `{\"path\": \"/etc/passwd\"}` passes schema validation but must still be rejected by a path allowlist"
  - "The model can be argued into supplying malicious arguments via prompt injection in retrieved or tool-returned text, so validation must live in the executor, not in the prompt asking the model to 'only pass safe values'"
  - "Re-validate on every call even for 'internal' tools -- an argument that was safe when the tool was written can become dangerous after the tool's downstream behavior changes"
metrics: []
related_tips:
  - allowlist-tools-per-agent-role
  - require-human-approval-for-irreversible-actions
  - treat-retrieved-text-as-untrusted
added_date: "2026-07-09"
added_by: maintainer
last_reviewed: "2026-07-09"
enrichment_status: draft
---

## What & Why

Treat every argument a model passes to a tool as untrusted input and validate it in the tool executor before the tool does anything. The model chooses tool arguments from context that can include user input, retrieved documents, and prior tool output — any of which can be adversarial. Schema-validating the argument *shape* is necessary but not sufficient; the executor must also enforce *authorization* (which values are allowed) before the side effect happens.

## Before / After

**Before:** the executor trusts the model's arguments and runs the tool directly: `run_sql(query=args["query"])`, `read_file(path=args["path"])`.

**After:** the executor validates shape and authorization first: reject `path` outside an allowlisted directory, reject SQL that isn't a parameterized read against permitted tables, and only then execute.

## Implementation

Put validation in the function that dispatches the tool call, not in the tool description. For each tool, define (1) a schema for argument shape and (2) an authorization check for allowed values (path prefixes, table names, ID ownership, numeric bounds). Reject on failure with a structured error the agent can read. Keep the allowed-values policy in code/config, never inferred from the model.

## Gotchas

- A JSON schema on the tool signature checks shape, not authorization — a well-formed `{"path": "/etc/passwd"}` passes schema validation but must still be rejected by a path allowlist
- The model can be argued into supplying malicious arguments via prompt injection in retrieved or tool-returned text, so validation must live in the executor, not in a prompt asking the model to "only pass safe values"
- Re-validate on every call even for "internal" tools — an argument that was safe when the tool was written can become dangerous after the tool's downstream behavior changes

## When NOT to Apply

- Skip the authorization layer only for tools whose entire input space is already safe (e.g. a pure `add(a, b)` calculator) — shape validation alone is enough there
- Don't use this as a substitute for least-privilege credentials — argument validation limits *what* a tool is asked to do, not *what the tool is technically able to do* if the model finds an unvalidated path

## Verification

Community-reported: server-side validation of model-supplied tool arguments is a core OWASP LLM Top 10 mitigation (excessive agency, insecure output handling). Not tied to a specific named incident here, so flagged `enrichment_status: draft`.
