---
id: inference-optimisation-skill
name: inference-optimisation-skill
type: tool
job:
  - Autonomous hill-climbing optimization for local LLM inference performance metrics (TTFT, decode throughput, memory bandwidth)
description: Agent skill for hill-climbing local LLM serving speed (decode, speculative decoding, prefill, KV, startup, TTFT) on any hardware and quantization
url: https://github.com/sybil-solutions/inference-optimisation-skill
cost_model: open-source
pricing_detail: Free and open-source under the MIT License.
tags:
  - agent-skill
  - benchmarking
  - claude-code
  - inference
  - llm
  - speculative-decoding
maturity: alpha
stack:
  - Python
  - vLLM
  - TGI
  - Ollama
  - SGLang
  - Claude Code
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-22
last_reviewed: 2026-11-22
added_by: repo-maintainer
verdict: recommended
verdict_rationale: Fills a critical gap in autonomous infrastructure engineering by converting high-dimensional LLM inference hyperparameter tuning into an iterative, programmatic agent workflow.
status: active
phase: serving-and-deployment
audience:
  - MLOps Engineers
  - Infrastructure Engineers
  - LLM Systems Developers
best_when: Automating hardware-tailored engine tuning (batch size, KV cache memory allocation, speculative draft model pairing, chunked prefill size) across local runtime engines like vLLM, SGLang, or llama.cpp.
avoid_when: Using black-box managed API endpoints (e.g., OpenAI API, Anthropic API) where internal inference engine runtime flags and kernel configurations are inaccessible.
github_url: https://github.com/sybil-solutions/inference-optimisation-skill
docs_url: null
---

## Overview

The `inference-optimisation-skill` repository provides an agentic control framework designed to systematically explore and tune local LLM inference serving parameters. Operating as a domain-specific capability for coding agents (such as Claude Code), it automates the benchmark-evaluate-adjust feedback loop across heterogeneous hardware profiles, quantizations, and serving runtimes including vLLM, SGLang, llama.cpp, and Text Generation Inference (TGI).

The system frames inference optimization as a search-based hill-climbing problem across high-dimensional config spaces. It programmatically manipulates flags governing Time to First Token (TTFT), inter-token latency (ITL), decode throughput, KV-cache page size, chunked prefill thresholds, tensor/pipeline parallelism, and speculative decoding draft-model acceptance rates. By executing empirical load tests on target hardware, the skill records runtime telemetry and iterates until performance metrics converge to localized optima.

By decoupling optimization heuristics from static scripts, the skill allows developer agents to profile target workloads under realistic concurrency distributions, trade off memory footprint against latency constraints, and adapt engine configurations dynamically when switching deployment hardware or quantization schemes (e.g., FP8, INT4, AWQ, GGUF).

## Why It's in the Arsenal

LLM serving engines like vLLM and SGLang expose dozens of interrelated CLI arguments and kernel configurations. Finding the global optimum for a specific GPU topology (e.g., dual RTX 4090 vs. 8x H100) and quantization level via manual sweep is inefficient. This tool embeds system-level inference knowledge directly into agent workflows, enabling automated empirical discovery of optimal configurations.

Unlike static grid-search scripts, the agent skill handles failure recovery during configuration search—gracefully catching out-of-memory (OOM) errors, CUDA driver faults, and model loading race conditions. It records failed parameter states as constraints, steering subsequent exploration away from unstable hardware boundaries while maximizing throughput and minimizing TTFT.

## Key Features

Automated Hill-Climbing Optimization: Iteratively benchmarks model configurations using real-time feedback to maximize tokens-per-second while keeping latency within user-defined bounds.

Multi-Engine Target Support: Orchestrates runtime parameter surfaces across vLLM, SGLang, Ollama, TGI, and llama.cpp runtimes.

Speculative Decoding Profiling: Measures effective token acceptance rates for draft/target model pairings and automatically adjusts draft step counts (`--num-speculative-tokens`) to ensure net latency gain.

Memory & KV Cache Tuning: Sweeps `--gpu-memory-utilization`, `--max-num-seqs`, and `--max-model-len` to prevent OOM events under high concurrency while preserving context length.

Structured Metric Reporting: Generates detailed comparative telemetry tracking TTFT (p50/p99), inter-token latency, throughput (tokens/sec), and maximum memory usage per parameter configuration.

## Trade-offs

High Compute Overhead During Sweeps: Running exhaustive empirical benchmark loops requires significant dedicated GPU time and can saturate compute resources during the search phase.

Agent Context Sensitivity: Performance depends on the execution environment and base LLM agent's capability to correctly parse benchmark telemetry logs and adjust engine flags logically.

Local Hardware Bound: Optimization results are coupled to the specific host hardware, driver version, and backend container environment, requiring re-execution when infrastructure scales or migrates.
