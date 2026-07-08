---
id: marimo
name: "marimo"
type: tool
job: [prototyping]
description: "Reactive Python notebook stored as pure Python, reproducible by construction, deployable as scripts and apps"
url: "https://marimo.io"
cost_model: open-source
pricing_detail: "Free and open source (Apache-2.0); optional hosted cloud"
tags: [data, research]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/marimo-team/marimo"
docs_url: "https://docs.marimo.io"
github_url: "https://github.com/marimo-team/marimo"
alternatives: [streamlit, gradio]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, research]
best_when:
  - "You're tired of Jupyter's hidden-state bugs — marimo re-runs dependent cells automatically so notebooks can't lie"
  - "You want notebooks that are git-diffable .py files, executable as scripts, and shareable as interactive web apps"
avoid_when:
  - "Your workflows depend on the Jupyter ecosystem (extensions, nbconvert, papermill) — migration has real costs"
  - "Cells with expensive side effects you don't want auto-re-executed (mitigable with lazy mode, but it changes the model)"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (21,735), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The strongest rethink of the Python notebook; reactive execution eliminates the reproducibility failure class LLM-era workflows keep hitting"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/marimo-team/marimo", "date": "2026-07-08", "description": "21,735 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A reactive Python notebook: marimo models the notebook as a dataflow graph, so changing a cell re-runs exactly its dependents, storage is plain Python (git-friendly, importable, runnable), and any notebook doubles as an interactive app with built-in UI elements.

## Why It's in the Arsenal

marimo earns a place in the Arsenal because it directly addresses a recurring decision point: you're tired of Jupyter's hidden-state bugs — marimo re-runs dependent cells automatically so notebooks can't lie. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Reactive dataflow execution — no hidden state
- Notebooks are pure .py files: versionable, testable, runnable
- Built-in UI widgets; deploy notebooks as apps; AI-assisted cells

## Architecture / How It Works

marimo statically parses each cell's variable definitions/references to build a DAG; edits trigger recomputation of downstream cells only. The file format is Python with cells as decorated functions, which makes imports, testing, and CI natural.

## Getting Started

```bash
pip install marimo && marimo tutorial intro
marimo edit notebook.py
```

## Use Cases

1. **Scenario**: you're tired of Jupyter's hidden-state bugs — marimo re-runs dependent cells automatically so notebooks can't lie
2. **Scenario**: you want notebooks that are git-diffable .py files, executable as scripts, and shareable as interactive web apps
3. **Scenario where this is NOT the right fit**: your workflows depend on the Jupyter ecosystem (extensions, nbconvert, papermill) — migration has real costs — evaluate an alternative instead

## Strengths

- You're tired of Jupyter's hidden-state bugs — marimo re-runs dependent cells automatically so notebooks can't lie
- You want notebooks that are git-diffable .py files, executable as scripts, and shareable as interactive web apps

## Limitations / When NOT to Use

- Your workflows depend on the Jupyter ecosystem (extensions, nbconvert, papermill) — migration has real costs
- Cells with expensive side effects you don't want auto-re-executed (mitigable with lazy mode, but it changes the model)

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `streamlit`, `gradio` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `marimo`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://marimo.io)
- [Documentation](https://docs.marimo.io)
- [GitHub](https://github.com/marimo-team/marimo)

## Buzz & Reception

- 21,735 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
