---
id: screenshot-to-code
name: screenshot-to-code
version_tracked: null
artifact_type: tool
category: code-generation
subcategory: tools
description: Converts screenshots, mockups, and Figma designs into working frontend code (HTML/Tailwind, React, Vue) using multimodal LLMs — with video-to-prototype support
github_url: https://github.com/abi/screenshot-to-code
license: MIT
primary_language: Python
org_or_maintainer: abi
tags:
  - code-gen
  - multimodal
  - vision
maturity: production
cost_model: open-source
github_stars: 73392
github_stars_last_30d: 181
trending_score: 54
last_commit: '2026-07-17'
docs_url: https://github.com/abi/screenshot-to-code#readme
demo_url: https://screenshottocode.com
paper_url: null
paper_id: null
phase: agent-system
domain:
  - general-purpose
  - vision
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - 'The canonical design-to-code application: the reference open implementation of "multimodal LLM reads a UI image, emits working frontend code," with iterative refinement against rendered output — both a usable tool and the cleanest study object for vision-driven code generation'
best_for:
  - Bootstrapping frontend implementations from designs — screenshot or Figma export to a working HTML/Tailwind/React starting point in one pass, then iterate with instructions
  - 'Studying how production multimodal codegen is engineered: prompt construction from images, framework-specific system prompts, and self-revision loops comparing generated renders to the target'
avoid_if:
  - You expect production-grade component architecture — output is page-level scaffolding; state management, accessibility, and design-system integration remain human work
  - Your designs are proprietary and you can't use hosted multimodal APIs — quality depends on frontier vision models; fully-local model results are markedly weaker
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (73.2k), MIT, and active maintenance (last push 2026-07-07) verified via the GitHub API on 2026-07-08. Output-quality characterization is qualitative community consensus; no formal benchmark exists for design-to-code fidelity.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/abi/screenshot-to-code
    date: '2026-07-08'
    description: 73.2k stars, one of the most-starred AI codegen applications
featured: false
status: active
---

## Overview

screenshot-to-code takes a UI image — screenshot, mockup, Figma export, even a screen recording — and prompts a multimodal LLM (Claude, GPT-4o class) to emit working frontend code in a chosen stack (HTML+Tailwind, React, Vue, Bootstrap, Ionic), with an update loop for iterating via natural-language instructions. React/FastAPI app, self-hostable, with a hosted version; at 73k+ stars it's among the most adopted AI codegen applications anywhere.

## Why it's in the Arsenal

Design-to-code is one of the highest-demand multimodal applications, and this is its canonical open implementation — both the tool people actually reach for and the best reference codebase for how image→code generation is engineered (stack-specific system prompts, image preprocessing, iterative revision). Adoption scale and sustained maintenance clear the evidence bar comfortably.

## Architecture

FastAPI backend orchestrating multimodal LLM calls: the target image plus a framework-specific system prompt produce initial code; generated output can be re-submitted with the original target and user instructions for revision; video mode decomposes recordings into keyframes to reconstruct multi-state prototypes; image generation (replacing placeholder images) via a separate model call. React frontend streams generations live.

## Ecosystem Position

Upstream: hosted multimodal LLM APIs (quality tracks frontier vision capability directly). Adjacent: v0 and Bolt-class commercial generators (integrated, closed), IDE agents that accept images (Cursor, Cline) for in-repo workflows. Its niche is the focused, open, self-hostable version of the capability.

## Getting Started

```bash
git clone https://github.com/abi/screenshot-to-code.git
cd screenshot-to-code
# backend
cd backend && echo "ANTHROPIC_API_KEY=sk-..." > .env && poetry install && poetry run uvicorn main:app --port 7001
# frontend
cd ../frontend && yarn && yarn dev
```

## Key Use Cases

1. **Scenario**: converting design mockups into working scaffolding at the start of frontend work — hours of pixel-translation compressed into a reviewable first draft
2. **Scenario**: cloning/prototyping flows — recreate a reference UI or turn a recorded interaction into a clickable prototype for stakeholder review

## Strengths

- Best-in-class focused implementation of a genuinely useful capability, with multi-framework output and video-to-prototype support competitors mostly lack
- MIT-licensed and self-hostable — designs never have to transit anyone's SaaS except the model provider you choose

## Limitations

- Output is scaffolding, not architecture: expect page-level code needing componentization, state, and accessibility work — fidelity also degrades on dense/complex layouts
- Coupled to frontier hosted vision models for good results; local-model mode exists but underperforms substantially

## Relation to the Arsenal

An applied-multimodal codegen entry complementing the IDE-centric coding agents (`continue`, `cline`, `aider`); its vision-model dependence connects to the multimodal research lineage (`liu-2023-llava`) explaining where the capability comes from.

## Resources

- [GitHub](https://github.com/abi/screenshot-to-code)
- [Hosted version](https://screenshottocode.com)
