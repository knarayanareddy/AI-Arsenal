---
id: semantic-router
name: semantic-router
type: tool
job:
  - Dynamic semantic routing, payload guardrailing, and LLM compute arbitration
description: An open, programmable decision layer for models and compute that routes prompts based on semantic intent, payload safety, and cluster latency metrics.
url: https://github.com/vllm-project/semantic-router
cost_model: open-source
pricing_detail: Apache 2.0 open-source tool; self-hosted compute overhead depends on local embedding generation and vector search index scale.
tags:
  - ai-gateway
  - guardrails
  - inference
  - kubernetes
  - llm
  - llmrouter
  - mixture-of-models
  - semantic-router
maturity: beta
stack: [Go, PyTorch, vLLM, Kubernetes]
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-10
last_reviewed: 2026-11-10
added_by: repo-maintainer
verdict: recommended
verdict_rationale: High-performance Go implementation providing low-overhead prompt routing and guardrailing directly upstream of vLLM or multi-provider model clusters. Excellent choice for dynamic cost optimization and model routing based on semantic similarity.
status: active
phase: serving-and-deployment
audience:
  - MLOps Engineers
  - Platform Engineers
  - AI Infrastructure Teams
best_when: Routing inbound user requests across a heterogeneous array of LLM backends (e.g., vLLM clusters, API providers) based on intent, topic classification, and guardrail heuristics before incurring inference compute costs.
avoid_when: Simple single-model deployments where static proxying or basic NGINX/Envoy load balancing is sufficient, or when latency budgets cannot tolerate the initial vector embedding step required for semantic matching.
github_url: https://github.com/vllm-project/semantic-router
docs_url: null
---

## Overview

vllm-project/semantic-router operates as a high-throughput, programmable proxy layer positioned upstream of Inference Processing Engine deployments such as vLLM, Triton, or external SaaS APIs. Built primarily in Go, it decouples decision logic—such as intent routing, content moderation, prompt injection detection, and model tier selection—from the downstream LLM compute cluster. By classifying incoming prompts in vector space before dispatching them to an inference worker, it enforces policy controls and optimizes token economics at the boundary of the AI infrastructure stack.

The architecture evaluates user requests by passing the input text through a fast local or external embedding model, producing dense vector representations that are matched against a pre-indexed route table or vector space. Beyond pure semantic classification, the system supports dynamic rules, fallback policies, and circuit breaking to mitigate vendor outages. It acts as an intelligence-aware API gateway, handling streaming responses, token metric collection, and structured payload rewriting before requests hit heavy transformer models.

By integrating closely with ecosystem tools like vLLM and Kubernetes, semantic-router enables Mixture-of-Models topologies. Infrastructure engineers can route trivial queries to smaller, low-latency models (e.g., 8B parameters) while transparently directing complex reasoning, code generation, or sensitive domain queries to larger base models (e.g., 70B+ parameters) or specialized finetunes, reducing overall GPU compute expenditure without compromising output quality.

## Why It's in the Arsenal

Traditional HTTP API gateways like Envoy or Kong route traffic based on URL paths, headers, or round-robin weights. They are entirely blind to the semantic payload, intent, and safety profile of an LLM prompt. semantic-router solves this gap by executing embedding-driven decision trees at network speed, filling the missing architectural layer between ingress traffic and GPU inference clusters.

Unlike Python-based routing frameworks that suffer from GIL constraints and heavy runtime memory overhead under concurrency, semantic-router's Go-based core delivers low latency and minimal footprint under parallel streaming workloads. It allows operators to monitor Guardrail Trip Rates as a first-class quality signal, ensuring policies fire deterministically without becoming silent failures or over-blocking valid traffic.

Additionally, it serves as a critical component in automated failover runbooks. In the event of a model provider outage or rate-limit saturation, semantic-router automatically redirects traffic to fallback instances or local self-hosted vLLM pods within seconds, capping SLA risks caused by third-party vendor instability.

## Key Features

Semantic Route Matching: Maps incoming prompts to target model endpoints via cosine similarity against vector indices, allowing intent-based routing across heterogeneous LLM backends.

Guardrail Policy Execution: Evaluates prompt inputs and model outputs for injection attacks, topic violations, and sensitive data leakage before forwarding compute workloads.

Provider Failover & Circuit Breaking: Detects downstream provider errors or elevated latencies, failing over requests in real time to secondary models or localized vLLM instances.

Token Budget and Cost Arbitration: Dynamically calculates request complexity to route queries to the cheapest viable model size, minimizing unnecessary GPU parameter invocation.

OpenAI API Compatibility: Exposes an OpenAI-compliant proxy interface (`/v1/chat/completions`), allowing seamless drop-in integration ahead of existing client SDKs and application pipelines.

## Trade-offs

Embedding Overhead Latency: Every decision path requires a vector embedding calculation. If local embedding models are bottlenecked or remote embedding APIs experience latency spikes, request time-to-first-byte (TTFT) increases universally.

Vector Index Drift: Dynamic prompt routing relies on accurate vector representations. Operational drift in user prompt patterns requires continuous re-evaluation and tuning of similarity thresholds and index boundaries.

Operational Complexity: Deploying semantic-router adds another stateful vector dependency and infrastructure layer to the AI serving pipeline, increasing monitoring requirements across Go proxy nodes and vector storage.
