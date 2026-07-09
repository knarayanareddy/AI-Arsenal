---
id: "block-ssrf-by-validating-outbound-urls"
title: "Block SSRF by Validating Outbound URLs From Tools"
category: "security-best-practices"
tags:
  - security
  - tool-use
  - guardrails
difficulty: "intermediate"
impact: "high"
time_to_implement: "2-3 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~2-3 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (OWASP SSRF guidance applied to LLM fetch/browse tools)"
applies_to:
  - agent-tool-use
  - web-browsing-agents
  - production-llm-systems
gotchas:
  - "Blocking by hostname string is not enough -- a public hostname can resolve to a private IP (DNS rebinding), so validate the resolved IP after DNS resolution and pin it for the actual connection"
  - "Following redirects re-opens the hole -- a permitted public URL can 302 to `http://169.254.169.254/`, so re-validate every redirect target, not only the first URL"
  - "Cloud metadata endpoints (169.254.169.254 and link-local ranges) are the highest-value SSRF target because they can hand out credentials -- block link-local, loopback, and private ranges explicitly"
metrics: []
related_tips:
  - treat-retrieved-text-as-untrusted
  - validate-tool-arguments-server-side-before-execution
  - allowlist-tools-per-agent-role
added_date: "2026-07-09"
added_by: maintainer
last_reviewed: "2026-07-09"
enrichment_status: draft
---

## What & Why

Any tool that fetches a URL the model supplied — a browser tool, a "read this link" tool, a webhook caller — is a server-side request forgery (SSRF) vector: the model can be induced (by prompt injection or a crafted task) to make your server request internal addresses like the cloud metadata endpoint or private services. Validate and constrain outbound URLs at the fetch layer so the model can't turn your fetch tool into a probe of your internal network.

## Before / After

**Before:** the fetch tool requests whatever the model passes: `requests.get(args["url"])`, following redirects, with no host or IP checks.

**After:** the fetch tool parses the URL, requires `https` (or an allowlisted scheme), resolves the host, rejects loopback/link-local/private IP ranges (including `169.254.169.254`), pins the resolved IP for the connection, and re-validates on every redirect.

## Implementation

Wrap all model-triggered outbound fetches in one hardened client that: enforces an allowed scheme, resolves DNS and rejects loopback/private/link-local/metadata IP ranges, connects to the pinned resolved IP (to prevent DNS rebinding), caps redirects and re-validates each hop, and applies timeouts and a response-size limit. Prefer an allowlist of permitted hosts when the tool's purpose is narrow; fall back to the denylist of internal ranges when it must reach the open web.

## Gotchas

- Blocking by hostname string is not enough — a public hostname can resolve to a private IP (DNS rebinding), so validate the resolved IP after DNS resolution and pin it for the actual connection
- Following redirects re-opens the hole — a permitted public URL can 302 to `http://169.254.169.254/`, so re-validate every redirect target, not only the first URL
- Cloud metadata endpoints (`169.254.169.254` and link-local ranges) are the highest-value SSRF target because they can hand out credentials — block link-local, loopback, and private ranges explicitly

## When NOT to Apply

- If no tool ever fetches a model-supplied or user-supplied URL, there's no SSRF surface to guard
- For a fetch tool restricted to a single fixed API you control, a strict host allowlist is simpler and stronger than a general denylist — reach for the denylist only when open-web access is genuinely required

## Verification

Community-reported: SSRF is a well-documented web vulnerability class (OWASP), and its application to LLM fetch/browse tools is standard agent-security guidance. Not tied to a specific named incident here, so flagged `enrichment_status: draft`.
