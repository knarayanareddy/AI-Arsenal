---
id: corsair
name: Corsair
type: tool
job:
  - Connect AI agents and LLMs to third-party APIs with managed OAuth and unified tool execution
description: A developer-focused integration gateway and Model Context Protocol (MCP) server that handles managed OAuth2, token refresh, and unified API execution for AI ag…
url: https://github.com/corsairdev/corsair
cost_model: open-source
pricing_detail: Free and open-source under NOASSERTION license; self-hostable gateway.
tags:
  - mcp
  - oauth2
  - agentic-ai
  - function-calling
  - unified-api
  - typescript
maturity: beta
stack:
  - TypeScript
  - Node.js
  - Model Context Protocol (MCP)
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-03
last_reviewed: 2026-10-03
added_by: repo-maintainer
verdict: recommended
verdict_rationale: Corsair solves one of the most painful aspects of agentic workflows: managing user OAuth tokens and mapping disparate API schemas into clean, LLM-friendly function calls or MCP tools.
status: active
phase: dx-and-tooling
audience:
  - AI Engineers
best_when: You are building LLM applications or multi-agent systems that need to read and write data to external SaaS platforms (Slack, GitHub, Salesforce) on behalf of authenticated users.
avoid_when: Your application only interacts with static, internal databases or does not require user-delegated OAuth authorization.
github_url: https://github.com/corsairdev/corsair
docs_url: null
---

## Overview

Corsair is an open-source integration gateway designed to bridge the gap between LLM agents and external SaaS applications. At its core, the platform acts as a managed OAuth2 proxy and API translation layer. Instead of forcing developers to write custom authentication flows, token refresh loops, and API client wrappers for every integrated service, Corsair centralizes these tasks into a single, unified runtime.

Architecturally, Corsair operates as a middleware service that exposes both standard REST endpoints and Model Context Protocol (MCP) interfaces. When an LLM requests an action—such as searching a user's Google Drive or posting to Slack—Corsair validates the active session, retrieves the appropriate OAuth token from its secure vault, executes the target API call, and returns a structured, LLM-optimized payload.

By decoupling authentication and API schema mapping from the core agent logic, Corsair allows developers to treat third-party integrations as standard tool schemas. This significantly reduces the context window overhead typically wasted on verbose API payloads, as Corsair filters and normalizes responses before returning them to the LLM.

## Why It's in the Arsenal

Traditional integration platforms (like Zapier or Make) are designed for linear, trigger-action workflows and lack the dynamic, runtime flexibility required by autonomous agents. Corsair is built specifically for agentic AI, exposing integrations directly as function-calling schemas or MCP tools that can be dynamically selected by an LLM.

Its primary differentiator is the seamless handling of user-delegated authentication. Managing OAuth flows, token expiration, and secure credential storage across dozens of users and platforms is a notorious engineering bottleneck. Corsair abstracts this entire lifecycle, allowing agents to securely act on behalf of users with minimal boilerplate code.

## Key Features

Managed OAuth2 Engine: Handles the complete authorization code grant flow, secure token storage, and automatic background token refreshment across multiple SaaS providers.

Model Context Protocol (MCP) Native: Exposes connected integrations as standard MCP tools, allowing any MCP-compliant LLM client (such as Claude Desktop or custom SDKs) to discover and execute them out-of-the-box.

Unified Schema Translation: Normalizes complex, nested third-party API responses into concise, structured JSON payloads optimized for LLM token efficiency and context preservation.

Extensible Provider System: Written in TypeScript, allowing developers to easily define new integrations by writing declarative API schemas and mapping functions.

Security & Scope Isolation: Enforces strict, user-level permission boundaries, ensuring that an agent can only access the specific API scopes authorized by the end-user.

## Trade-offs

Maturity and Ecosystem Size: As a beta-stage project, the library of pre-built integrations is smaller compared to legacy enterprise iPaaS solutions, occasionally requiring developers to write custom provider definitions.

State Management Overhead: Self-hosting Corsair requires provisioning and maintaining a secure database to store encrypted OAuth credentials, adding operational complexity compared to fully managed SaaS alternatives.

Dependency on Provider API Stability: Because Corsair maps external APIs to unified schemas, upstream breaking changes in third-party APIs (e.g., Slack or Salesforce) can temporarily break tool execution until the mapping definitions are updated.
