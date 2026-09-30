---
id: harness-anything
name: harness-anything
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Windows-only Python toolset driving WPS, Microsoft Office, Zotero, Illustrator and Photoshop through 47 CLI commands over COM automation"
github_url: "https://github.com/yb2460/harness-anything"
license: MIT
primary_language: Python
tags: [edge, retrieval]
maturity: experimental
cost_model: open-source
github_stars: 2110
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-26"
docs_url: "https://github.com/yb2460/harness-anything#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives an agent reliable command surfaces for desktop office and design apps that have no usable API, using the COM interfaces those apps already expose."
best_for:
  - "You are on Windows and you need an agent to build a real .pptx or .xlsx through WPS or Microsoft Office rather than generating an HTML mock-up."
  - "You do literature work in Zotero and you want review, writing and figure skills driven from the command line against your real library."
  - "You want vector or raster work in Illustrator or Photoshop automated from an agent, where the only stable programmatic interface is COM automation."
avoid_if:
  - "You are on macOS or Linux, because every harness here depends on Windows COM automation through pywin32 and none of it will run elsewhere."
  - "You do not have WPS Office, Microsoft Office, Zotero or Adobe installed, because the harnesses drive those applications rather than a file format directly."
  - "You need a maintained, tested library, because the repository presents itself as a collection of CLI tools and sample projects with a single open issue, not as a versioned library."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Command counts (47 office, 27 Zotero skills), COM chain, ProgID switching, element types and prerequisites are read from the official README; the harnesses require Windows and were not run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Harness Anything is a collection of command-line harnesses for Windows desktop applications. The cli-anything-wps harness exposes 47 commands across Word, Excel, and PowerPoint through COM automation, covering paragraphs, headings, lists, tables, images, find-and-replace, and font styling. Each harness is a thin Python layer: it opens a COM object for the target app, issues the corresponding call, and returns structured output, so an agent can drive a spreadsheet or a presentation through a tool call instead of a GUI. The harnesses are plain prompts and Python modules rather than a service, which is why they need no API key, no model server, and no Windows VM to talk to beyond the machine the app is installed on.

## Why it's in the Arsenal

The gap is that desktop office suites have no API an agent can rely on, so automating them means driving the same COM interfaces that VBA macros use. Harness Anything accepts that constraint and builds a command vocabulary on top of it, which is genuinely the only workable path on Windows. The cost is that the abstraction is only as good as COM's: application state leaks, modal dialogs block, and there is no cross-platform story, so anything you build here is Windows-only by construction.

## Architecture

Each harness follows the same chain: CLI command to Click CLI to a Core module to a COM Bridge that talks to the application object (Illustrator.Application, Photoshop.Application, or a WPS/Office ProgID), and then the application's own engine does the work. Microsoft Office is reached by switching the ProgID to PowerPoint.Application, Word.Application or Excel.Application, so the VBA-compatible surface is deliberate. The PPT generators route JSON data through thirteen element types (text, image, table, cards_2x3, cards_1x4_info, tagline_bar, timeline_horiz and others) with layout rules such as body text at least 22pt and at least two chart-or-table elements per slide. Each sample project ships a template background image, a JSON data file and a Python engine.

## Ecosystem Position

This competes with no Python library, because there is no library: it competes with hand-written VBA and with UI-automation frameworks such as AutoIt and Power Automate Desktop for the same Windows job. Compared with content/projects/data-and-retrieval entries such as docling and marker, which parse office files to structured output without opening an application, harness-anything wins on editing fidelity and loses everywhere on speed, headlessness and portability. It complements content/projects/agent-systems by giving a general coding agent a reliable command surface for desktop applications, and the Zotero part overlaps with the citation and literature tooling you would otherwise assemble separately.

## Getting Started

Windows 10/11 with Python 3.10+, pywin32, click, and the target application installed. Install each harness separately:

```bash
pip install git+https://github.com/yb2460/cli-anything-wps.git
# then, from the harness directory for the design tools:
cd photoshop-harness/agent-harness && pip install -e .
```

Then create and populate a document, for example `cli-anything-wps document new --type impress --name "demo"` followed by `cli-anything-wps export render output.pptx -p pptx`.

## Key Use Cases

1. Deck generation from data: drive a themed PPT build by editing the JSON payload and re-running the Python engine, which regenerates a real editable .pptx and PDF.
2. Literature workflow automation: run the Zotero pipeline skills to search a library, draft an IMRAD manuscript, verify citations and produce journal-format figures.
3. Design file scripting: create a logo in Illustrator or a banner in Photoshop through command-line calls and export to SVG, PNG, WebP or PDF.

## Strengths

- Reaches applications that expose no usable public API, using the same COM surface that VBA macros rely on, so fidelity is high.
- Command vocabulary is broad where it counts: 47 office commands and 27 academic skills with named, discoverable subcommands.
- Output stays native and editable (PPTX, DOCX, XLSX, PSD, AI) instead of a rendered approximation.
- JSON-driven element routing makes a deck a data change rather than a code change.

## Limitations

Windows and pywin32 only, with no path to macOS or Linux, which makes this unusable in a container or a CI runner on Linux. COM automation is inherently stateful and modal: a dialog left open in WPS blocks the CLI, and recovery is manual. Adobe requirements are explicit (Illustrator or Photoshop 2023+), so those harnesses fail on subscriptions that do not include desktop installs. This is presented as a toolset and sample projects rather than a versioned, tested library, with a single open issue on the repository, which makes breakage hard to distinguish from misuse. Concurrent automation of the same application instance is unsafe.

## Relation to the Arsenal

This is the desktop-automation outlier in content/projects/agent-systems, and the only entry here with a hard Windows dependency. It fills the same gap as open-codex-computer-use and browser-harness, which drive general UIs through accessibility trees or CDP, but does it through the application's own scripting surface, which is more precise and far less portable. For reading office files instead of editing them, the data-and-retrieval phase holds docling, marker and the other parsers that need no installed application. The model calling these commands would come from any agent in this phase.

## Resources

- [GitHub — yb2460/harness-anything](https://github.com/yb2460/harness-anything)
- [WPS harness — yb2460/cli-anything-wps](https://github.com/yb2460/cli-anything-wps)
- [Project documentation index in repo](https://github.com/yb2460/harness-anything#readme)
