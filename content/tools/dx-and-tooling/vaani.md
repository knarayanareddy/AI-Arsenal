---
id: vaani
name: Vaani
type: tool
job: [structured-output]
description: Fast, private macOS dictation with AI formatting and editing
url: "https://vaani.app"
cost_model: freemium
pricing_detail: Free tier with paid upgrades
tags: [structured-output]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: See official pricing page; limits may change
self_hostable: false
open_source: false
source_url: null
docs_url: null
github_url: null
alternatives: []
integrates_with: []
added_date: "2026-06-14"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype]
best_when:
  - You want fast, private, macOS-native dictation with AI-assisted formatting and editing
  - You need a local-first dictation tool rather than a cloud-only transcription service
avoid_when:
  - You're not on macOS
  - You need a cross-platform or open-source dictation solution
version_tracked: null
enrichment_status: draft
enrichment_notes: Closed-source macOS-only product sourced from a curated newsletter; not independently verified.
verdict: watching
verdict_rationale: Local dictation tool; compare against Wispr Flow and MacWhisper
status: active
buzz_sources: [{"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso as a structured-output tool"}]
---

## Overview

A macOS-native dictation tool with AI-assisted formatting and editing, designed to run locally and privately rather than sending audio to a cloud transcription service.

## Why It's in the Arsenal

Vaani earns a place in the Arsenal because it directly addresses a recurring decision point: you want fast, private, macOS-native dictation with AI-assisted formatting and editing. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Local-first, private macOS dictation
- AI-assisted formatting/editing of transcribed text

## Architecture / How It Works

Audio is captured and transcribed locally on-device, with an AI formatting pass cleaning up and structuring the resulting text before insertion.

## Getting Started

```bash
# Open the project page and follow the documented onboarding.
# https://vaani.app
```

## Use Cases

1. **Scenario**: you want fast, private, macOS-native dictation with AI-assisted formatting and editing
2. **Scenario**: you need a local-first dictation tool rather than a cloud-only transcription service
3. **Scenario where this is NOT the right fit**: you're not on macOS — evaluate an alternative instead

## Strengths

- You want fast, private, macOS-native dictation with AI-assisted formatting and editing
- You need a local-first dictation tool rather than a cloud-only transcription service

## Limitations / When NOT to Use

- You're not on macOS
- You need a cross-platform or open-source dictation solution

- _Enrichment status: draft — best_when/avoid_when above are based on the vendor's own description; not yet confirmed against third-party production usage reports. Last reviewed: 2026-06-30._

## Integration Patterns

Reference this entry by ID from guides, stacks, and build examples.

## Resources

- [Vaani](https://vaani.app)

## Buzz & Reception

- Featured in [Techpresso](https://toolradar.com/featured/techpresso).

---

_Last reviewed: 2026-06-14 by @maintainer_
