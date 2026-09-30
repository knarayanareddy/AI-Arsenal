---
id: kagent-dev-kagent
name: "kagent"
version_tracked: null
artifact_type: platform
category: agents
subcategory: autonomous
description: "Kubernetes-native platform that runs AI agents as cluster workloads with declared tools, scheduled tasks, and event-driven triggers"
github_url: "https://github.com/kagent-dev/kagent"
license: "Apache-2.0"
primary_language: Go
org_or_maintainer: "kagent-dev"
tags: [agents, kubernetes, tool-use]
maturity: alpha
cost_model: open-source
github_stars: 3876
github_stars_last_30d: 0
trending_score: 29
last_commit: "2026-09-28"
docs_url: "https://kagent.dev"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Cloud-native agentic AI platform running agents as Kubernetes workloads with tool discovery, aimed at operating many agents rather than one local loop."
best_for:
  - "You already run Kubernetes and want agents to be ordinary workloads with replicas, limits, and rollout controls."
  - "You want agents to react to cluster events such as a new alert, a failed job, or a scheduled tick without a bespoke daemon."
  - "You need per-agent tool access scoped by Kubernetes service accounts and secrets rather than a shared API key."
avoid_if:
  - "You do not run a Kubernetes cluster, since the whole design presumes pods, custom resources, and cluster events."
  - "Your agent work is a single local loop you develop against, where the platform's operational cost exceeds the benefit."
  - "You need a battle-tested, versioned platform, since the project is young and its APIs and defaults are still moving."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (3876), Apache-2.0 license, last commit 2026-09-28, primary language Go, and all five topics including cncf and mcp were read from the GitHub API. The controller reconciliation model, MCP tool discovery, custom resource design, and Helm-based install come from the official README and docs; no cluster was created and no agent was deployed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/kagent-dev/kagent", "date": "2026-09-28", "description": "3,876 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

kagent is a CNCF-oriented project that deploys agentic AI workloads into a Kubernetes cluster. Agents are defined as Kubernetes resources carrying an instruction, a model configuration, and a list of tools, so a fleet of agents is a set of manifests applied to the cluster rather than a bespoke process manager. Tools are exposed through the Model Context Protocol, and the platform discovers and wires them into the agent's runtime, which is what allows a tool that already speaks MCP to be attached to a deployed agent without custom glue. The controller reconciles the desired agent set into running pods and exposes a control-plane API and CLI for creating, listing, and talking to them. The system is written in Go and treats the Kubernetes API server as its source of truth for agent state.

## Why it's in the Arsenal

The decision it resolves is the operational shape of a long-running agent. A script that calls an LLM is easy to write and hard to run for days: it has no resource ceiling, no restart semantics, no credential isolation, and no way to run ten variants side by side. Running agents as pods inherits answers that Kubernetes has already solved, including horizontal scaling, disruption budgets, network policy, secret management, and observability through existing tooling. The second motivation is discovery: an agent that can only use tools wired in by hand needs a new deployment every time a capability is added, whereas an MCP-based registry means a new tool is a registration, and the agent definition names it.

## Architecture

The platform is a Go controller following the standard Kubernetes reconciliation loop: it watches custom resources describing agents and their tool sets, resolves the model provider and credentials, renders a deployment and service for each agent, and keeps observed status in the resource. Agents execute inside pods where the runtime assembles a chat loop from the declared instruction, the model client, and the resolved MCP tool servers, which are reached through the Model Context Protocol with credentials supplied from Kubernetes secrets rather than baked into manifests. Triggering covers scheduled runs and event-driven reactions, so an agent can be invoked by a cluster event or a cron schedule instead of only by an inbound HTTP request. Because state lives in custom resources, a full audit of which agents exist and what they can do is a single kubectl get away, which is the governance property a shared cluster needs.

## Ecosystem Position

kagent competes with the other agent platforms in the agent-systems phase, but its distinguishing axis is where the agent runs: on your cluster as a workload, rather than in a managed runtime or a developer process. It overlaps with general-purpose Kubernetes platforms such as Kubeflow and Argo Workflows, since it reconciles custom resources into pods, but it is a rather than an alternative to them because it schedules interactive agent sessions rather than batch DAGs. It complements the Kubernetes-native tool-serving projects rather than competing with them, because the MCP discovery model assumes those tool servers already exist and are reachable. It is a comparison point for the Python agent frameworks in the agent-systems phase, which build the agent logic that kagent then hosts, and the two compose: a framework-built agent packaged as an image, deployed as a kagent workload.

## Getting Started

Install the controller into a cluster and check the custom resources are registered:

```bash
helm install kagent-crds oci://ghcr.io/kagent-dev/kagent/charts/kagent-crds
helm install kagent oci://ghcr.io/kagent-dev/kagent/charts/kagent \
    --set openai.apiKey=$OPENAI_API_KEY
kubectl get pods -n kagent
```

```yaml
# a declarative agent: instruction, model, and MCP tools
apiVersion: kagent.dev/v1alpha1
kind: Agent
metadata:
  name: triage-issue
spec:
  model: gpt-4o
  instruction: |-
    Read the incoming issue, label it, and post a summary comment.
    Do not merge or close anything without explicit approval.
  tools:
    - github
    - kubernetes
  deployment:
    replicas: 2
```

```bash
# start from the built-in scaffold, then edit and apply
kagent create agent triage-issue --image ghcr.io/kagent-dev/kagent/scaffolds/python-pro:latest
kubectl get agents -n kagent
kagent chat triage-issue "summarize the open issues by label"
```

Tool servers are registered as MCP endpoints and referenced by name, so adding a capability is a manifest change rather than a code change.

## Key Use Cases

1. Running several agent variants against the same task with different models or prompts, comparing outcomes side by side under identical isolation.
2. Event-driven automation, where a cluster alert or a failed job triggers an agent that investigates and reports back.
3. Credential-scoped agent access, where each agent's tool permissions come from Kubernetes service accounts and secrets instead of a shared long-lived key.

## Strengths

- Agents become ordinary Kubernetes workloads with limits, replicas, restart policy, and network policy applied without custom work.
- Model Context Protocol tool discovery means a new capability is registered once rather than wired into each agent definition.
- Custom resources make the agent fleet auditable: what exists, what each can reach, and what it ran is a cluster query.
- Written in Go with a controller pattern, so it fits existing cluster operations, RBAC, and logging rather than introducing a new control plane.

## Limitations

It requires a Kubernetes cluster, which for a single-developer or small-team use case is a large amount of infrastructure to justify an agent. The project is young, so custom resource versions, controller behavior, and documentation all shift, and there is no long record of production incidents to learn from. Each agent pod pays cold start and a full model round trip, and per-agent pod overhead can exceed the cost of the inference itself for short tasks. Debugging spans two layers, since you are looking at a controller reconciliation and an application log, and the tool credential model is as safe as your cluster RBAC, so a misconfigured service account widens blast radius. The MCP tool ecosystem is broad but uneven in maturity, and a poorly built tool server becomes a shared failure point for every agent that references it.

## Relation to the Arsenal

This is an agent-systems phase entry that sits between the agent frameworks, which construct agent logic, and the serving engines, which supply the model endpoint inside the pod. The MCP-based tool discovery links it to the tool-serving side of the agent ecosystem, and the k8s-native pattern makes it a deployment rather than a library, so it complements the observability phase where you would instrument what these pods do. If the platform layer is not the point, the language-specific framework entries in the same phase are the more direct starting point.

## Resources

- [kagent GitHub repository](https://github.com/kagent-dev/kagent)
- [kagent documentation](https://kagent.dev/docs)
- [kagent Helm charts](https://github.com/kagent-dev/kagent/tree/main/helm)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (3,876 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
