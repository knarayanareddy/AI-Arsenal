---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: butterbase-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: butterbase
name: Butterbase
artifact_type: platform
category: data-pipelines
subcategory: platforms
description: Open-source backend platform combining Postgres, auth, storage, functions, an AI gateway, and MCP support
github_url: https://github.com/butterbase-ai/butterbase
license: Apache-2.0
primary_language: TypeScript
tags:
  - data
  - agents
  - orchestration
  - tool-use
  - security
  - self-hosted
maturity: alpha
cost_model: open-source
github_stars: 2600
last_commit: '2026-07-09'
docs_url: https://github.com/butterbase-ai/butterbase
phase: data-and-retrieval
domain:
  - language
  - general-purpose
  - reasoning
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - experimental
ecosystem_role:
  - A backend and control-plane candidate for AI applications and tool-using agents.
best_for:
  - You want a self-hosted backend with data, auth, AI gateway, and MCP building blocks.
  - You can review the OSS core versus managed-service boundaries and deploy it with least privilege.
avoid_if:
  - You need only a database client or a mature standalone model gateway.
  - You cannot operate auth, storage, billing, tool, and tenant boundaries securely.
enrichment_notes: Official repository, Apache-2.0 OSS core release, and 2026-07-09 activity were checked on 2026-07-11. The project is new and its production boundaries remain draft.
---

## Overview

Butterbase is an open-source backend platform combining a Postgres data plane, authentication, storage, functions, an AI gateway, and MCP support. It is positioned as infrastructure for applications that need data and AI capabilities together.

## Why it's in the Arsenal

Agent applications often need more than a model call: they need tenants, data, functions, approvals, and tool connectivity. Butterbase is included as a new platform candidate, with a clear warning that its OSS core and managed offering are not the same operational product.

## Architecture

The repository combines a TypeScript control and API surface with database migrations, authentication, storage, functions, AI gateway components, MCP servers, and example agent bundles. These boundaries imply separate policies for tenant isolation, tool authorization, credentials, billing, and audit logs.

## Ecosystem Position

Butterbase sits below AI application and agent workflows as a backend/control-plane layer. It can complement an agent framework and model provider, but it does not remove the need for independent data and security governance.

## Getting Started

Read the OSS license and deployment documentation, run the example locally, and inspect migrations and auth flows before importing sensitive data. Test read-only and approval-gated agent bundles first, with backups and audit logging enabled.

## Key Use Cases

- Backend primitives for self-hosted AI applications
- Authenticated data and MCP/tool workflows for agents

## Strengths

- Brings data, auth, storage, gateway, and MCP concerns into one inspectable repository
- Apache-2.0 core and active development

## Limitations

- New platform with a broad and security-sensitive operational surface
- Managed-service features, billing, and multi-region behavior may not match the OSS core

## Relation to the Arsenal

This is backend infrastructure for AI applications, not an agent runtime or database replacement by itself. Pair it with explicit tenant, credential, approval, and observability controls.

## Resources

- [Official source](https://github.com/butterbase-ai/butterbase)
- [Official license](https://github.com/butterbase-ai/butterbase/blob/main/LICENSE)
