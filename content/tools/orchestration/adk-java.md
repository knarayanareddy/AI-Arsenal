---
id: adk-java
name: "ADK for Java (Agent Development Kit)"
type: tool
job: [orchestration]
description: "Google's code-first Java toolkit for multi-agent systems on the JVM, with typed tools and tracing"
url: "https://github.com/google/adk-java"
cost_model: open-source
pricing_detail: "Apache-2.0 source; model usage is billed by whichever provider you configure"
tags: [agents, orchestration, tool-use, tracing, cloud]
maturity: beta
stack: [java]
free_tier: true
free_tier_limits: "Apache-2.0 source is unrestricted; inference cost follows the configured model provider"
self_hostable: true
open_source: true
source_url: "https://github.com/google/adk-java"
docs_url: null
github_url: "https://github.com/google/adk-java"
alternatives: [adk-python, adk-go]
integrates_with: []
added_date: "2026-10-21"
last_reviewed: "2026-10-21"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Keeps agent execution inside the JVM so Spring and Quarkus services avoid a Python bridge; trades ecosystem parity and code volume for type safety"
status: active
phase: orchestration
audience: [production]
best_when:
  - "Agent behaviour has to run in-process next to existing JVM services, sharing their thread pools, dependency injection and transaction boundaries"
  - "You need reflection-to-schema tool definitions and compile-time checked orchestration graphs rather than configuration-driven agents"
avoid_when:
  - "The newest agent techniques you depend on ship in a Python library first and a JVM port would lag by months"
  - "You are still exploring the problem space and want the shortest path from idea to working prototype"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Capabilities taken from the repository README and ADK documentation; JVM behaviour under sustained agent load was not measured here."
buzz_sources: []
---

## Overview

ADK for Java brings Google's agent toolkit to the JVM: a code-first framework that composes multi-agent systems from typed Java interfaces rather than YAML or a Python runtime behind a socket. It targets the part of the industry where the business logic already lives in Java or Kotlin — order services, payment pipelines, internal platforms — and where adding a second runtime for the AI feature would be an architectural regression rather than a convenience.

Agents, memory stores, tool executors and delegation policies are separable interfaces. Model access is abstracted, so Vertex AI, the Gemini API and OpenAI-compatible endpoints are interchangeable behind one request pipeline, while tool signatures are reflected into function-calling schemas and results are deserialised back into records.

The explicit contract style means the execution graph is a value your code builds, not something a framework infers, which is what makes deterministic guardrails and per-step tracing implementation work rather than framework archaeology.

## Why It's in the Arsenal

The Arsenal tracks the question of where agent orchestration runs, and for a large class of enterprises the honest answer is "wherever the transactions are". A JVM agent that shares the process with Spring or Quarkus avoids the serialisation hop, the second deployment unit and the second on-call rotation that a Python sidecar introduces.

Compared with generic Java LLM wrappers, this toolkit supplies the loop itself — tool-call parsing, iterative execution, state continuity and inter-agent handoff — which is precisely the boilerplate teams otherwise rewrite per project and get subtly wrong.

## Key Features

- Declarative topologies: sequential, hierarchical and dynamic graphs composed with typed builders instead of external configuration.
- Tool binding from Java methods and records, with schema generation, argument validation and in-process invocation.
- Session and memory interfaces that can be backed by an in-memory store, a database or a distributed cache without changing agent code.
- Vendor-neutral model connectors for Gemini, Vertex AI and custom endpoints behind a common request/response context.
- Listener and interceptor hooks around prompts, completions, tool executions and step latency.

## Architecture / How It Works

An agent holds instructions, a model connector, a tool registry and an optional list of sub-agents. Execution is a loop: build the request from the instruction plus accumulated session events, invoke the connector, inspect the response for tool calls, execute them through the registry and append the results as new events before the next turn. Delegation is expressed as a transfer that hands the session to a child agent and returns control on completion, which keeps state in one place rather than duplicating it per agent.

Because tool arguments are bound to Java records, schema generation and validation happen at the boundary, and the invocation path stays inside the JVM. Interceptors wrap each stage, which is where tracing, redaction and token accounting attach without modifying agent definitions.

## Getting Started

Add the ADK dependency to an existing Maven or Gradle build, configure a model connector with either a Gemini API key or Vertex AI project and region, then declare one agent with one tool and run it from a test or a small main method. The repository samples show the sequential and hierarchical topologies; starting from the single-agent sample and adding delegation afterwards keeps the state model understandable.

## Use Cases

1. An order-support assistant embedded in an existing Spring service, where tool calls reach internal REST clients and the transaction context of the calling request is preserved.
2. A back-office workflow that routes between specialist agents — policy lookup, refund calculation, escalation — with each specialist owning one bounded tool set.
3. Batch enrichment jobs on a JVM scheduler, where hundreds of sessions run through a bounded executor and results land in the existing messaging pipeline.
4. Regulated environments that require prompt and completion payloads to be logged through an existing audit interceptor rather than an external observability SaaS.

## Strengths

- Interfaces rather than annotations at the core, so state stores and model connectors can be swapped without touching agent logic.
- Reflection-based tool schemas keep the definition and the function-calling contract in one place, eliminating the drift between a hand-written JSON schema and the method it describes.
- Interceptor hooks map cleanly onto existing Micrometer or OpenTelemetry instrumentation already present in JVM services.
- Sharing the process means shared connection pools and configuration, which removes a network hop and a second credential path from the deployment.

## Limitations / When NOT to Use

- Ecosystem lag is structural: new retrieval, evaluation and prompting techniques appear in Python projects first, and the JVM port trails by weeks or months.
- Code volume is higher than in dynamic languages; every tool and every agent boundary is an explicit type, which slows the first prototype.
- Conversation state kept in the JVM heap scales with concurrent sessions, so long histories need an external store and heap tuning before running at volume.
- The framework is beta, so published interfaces can still shift; pin versions and budget for migration work on upgrade.

## Integration Patterns

The common shape is a controller or message listener that builds a session, invokes a runner and writes the resulting events back to the application's own persistence. Tools are thin adapters over existing service clients, so retries, timeouts and circuit breakers stay in the client layer where the rest of the platform already configures them. Where a Python tool already exists, front it with an MCP server and let the JVM agent call it over the protocol instead of porting the implementation. For observability, emit spans from the connector and tool interceptors so latency splits cleanly between model time and tool time.

## Resources

- [GitHub — google/adk-java](https://github.com/google/adk-java)
- [ADK documentation — agent development](https://google.github.io/adk-docs/)

## Buzz & Reception

No independent production account of a JVM ADK deployment is recorded for this entry; the observable signals are the repository's activity and its alignment with Google's published ADK documentation. The open question worth answering before adoption is how the framework behaves under sustained concurrent sessions, which is environment-specific and should be measured rather than assumed.
