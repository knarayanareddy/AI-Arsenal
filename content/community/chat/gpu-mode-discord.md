---
id: "gpu-mode-discord"
title: "GPU MODE Discord"
entry_type: community
kind: chat
url: "https://discord.com/invite/gpumode"
topics:
  - infra
  - research
  - open-source
audience:
  - practitioner
  - researcher
access: public
activity_level: very-active
activity_evidence: "Discord invite API reports ~28,600 members with ~3,500 concurrently online at check time; the community also runs an ongoing recorded lecture series and public kernel-writing competitions (checked 2026-07-08)"
last_checked: "2026-07-08"
safety_level: generally-safe
how_to_get_value:
  - "Start with the lecture archive (recorded talks by practitioners from major labs on CUDA, Triton, and inference optimization) before diving into channels -- it is the most structured on-ramp to GPU programming available for free"
  - "Use the per-topic channels (Triton, CUDA, torch.compile, specific hardware) for questions; the server's niche focus means answers frequently come from people who work on the relevant compiler or kernel professionally"
what_to_avoid:
  - "Don't join expecting general ML/LLM application help -- the server is specifically about GPU programming and performance engineering (kernels, compilers, quantization internals), and application-level questions land better in framework-specific communities"
owner_org: "GPU MODE (community-run)"
region: "global (English-dominant)"
cost: "free"
related_communities:
  - "eleutherai-discord"
last_reviewed: "2026-07-08"
enrichment_status: draft
enrichment_notes: "Member and concurrent-online counts fetched directly from the Discord invite API with with_counts=true at check time."
---

## Overview

GPU MODE (formerly CUDA MODE) is the leading community for GPU programming and ML-performance engineering: a Discord server plus a recorded lecture series and public kernel-writing competitions, covering CUDA, Triton, torch.compile, quantization kernels, and inference optimization.

## Who it's for

Practitioners and researchers working below the framework line: writing or debugging kernels, optimizing inference latency, or learning GPU programming seriously rather than incidentally.

## What you'll get

- A recorded lecture series with speakers who work on major kernels, compilers, and inference engines professionally
- Per-topic channels (CUDA, Triton, specific accelerator hardware) with unusually expert answer quality for a free community
- Periodic kernel-writing competitions with leaderboards -- practical, scored exercises rather than passive content

## How to get value fast

Watch 2-3 lectures from the archive matching your immediate problem (e.g. Triton basics, attention kernels) before asking questions -- the lectures answer the most common starting points. Then ask specific questions in the matching per-topic channel with code and profiler output attached.

## What to avoid

Don't bring application-level LLM questions (prompting, RAG, agent frameworks) here -- the server's value is its narrow focus on GPU and performance engineering, and off-topic questions dilute it. Use framework or application communities for those.

## Activity & health

The Discord invite API reported approximately 28,600 members with approximately 3,500 concurrently online at check time (checked 2026-07-08) -- a very high online ratio for a technical server, alongside an ongoing lecture series and competitions. This supports `activity_level: very-active`.

## Safety & moderation

No material concerns identified: the server is focused, actively moderated, and small enough that the large-server DM-spam problem is much less pronounced. Standard Discord hygiene still applies.

## Relation to the Arsenal

The community backbone for this catalog's inference-optimization territory -- complements the inference-engine project entries (vLLM, SGLang, llama.cpp) and the quantization/serving tips with a place to learn the underlying kernel-level mechanics.

## Resources

- [GPU MODE Discord invite](https://discord.com/invite/gpumode)
- [GPU MODE lecture archive (YouTube)](https://www.youtube.com/@GPUMODE)
