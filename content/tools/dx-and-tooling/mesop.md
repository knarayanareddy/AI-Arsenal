---
id: mesop
name: Mesop
type: tool
job: [prototyping]
description: Python UI framework from Google for internal apps and AI demos — archived on 30 September 2026, so it is a design reference rather than a dependency
url: "https://github.com/mesop-dev/mesop"
cost_model: open-source
pricing_detail: Apache-2.0 and free; the practical cost is maintaining a fork once the upstream stops receiving fixes
tags: [llm, cloud, data]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Unlimited but unmaintained — no fixes, no security updates, no support after 30 September 2026
self_hostable: true
open_source: true
source_url: "https://github.com/mesop-dev/mesop"
docs_url: "https://mesop-dev.github.io/mesop/"
github_url: "https://github.com/mesop-dev/mesop"
alternatives: [chainlit, fastapi, gradio, streamlit]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype]
best_when:
  - You are reading UI framework designs and want the clearest example of component-tree Python with targeted re-renders instead of a script that reruns top to bottom
  - You already have a Mesop app in an internal tool and need to plan its exit — the code is readable and the migration to a supported framework is mechanical
avoid_when:
  - You are starting anything new — the project stopped receiving updates, fixes and support on 30 September 2026
  - Your demo will outlive the quarter — a Streamlit or Gradio prototype costs an afternoon and still gets security patches
  - You need to go to production behind authentication — the supported path was always to hand the UI to a real frontend, and now there is no upstream to fix anything you find
version_tracked: null
verdict: deprecated
verdict_rationale: Archived upstream with no maintenance commitment; keep it as a readable example of component-tree Python UIs, not as a dependency
status: archived
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: mesop-dev/mesop is archived (6,579 stars, 109 open issues, last push 2026-09-26). README carries a warning that Mesop is no longer maintained as of September 30, 2026, with no further updates, bug fixes or support."
---

> **TL;DR:** A well-designed Python UI framework that stopped being maintained on 30 September 2026 — useful to read, and the wrong thing to build on.

## Overview

Mesop let you write a web UI in Python: page functions decorated with `@me.page`, a component tree assembled from `me.text`, `me.button`, `me.input` and layout primitives, state held in `me.state`, and navigation by path. It rendered to a real frontend over a websocket, and unlike Gradio or Streamlit it did not rerun your whole script on every interaction — a state change re-rendered the components that depended on it.

It was built and used at Google for internal tools, demos and rapid prototyping, and shipped helpers in `mesop.labs` for common demo shapes such as text-to-text streaming. The repository moved from `google/mesop` to the `mesop-dev` organisation.

On 30 September 2026 it was archived, with an explicit notice that no further updates, bug fixes or support would be provided.

## Why It's in the Arsenal

Because "archived" is information, and a catalog that silently deletes a dead project leaves the next person to rediscover it from a stale blog post.

Mesop is also a useful reference in a way its competitors are not. The script-rerun model — Streamlit's and Gradio's default — is easy to learn and subtly wrong for anything stateful: every interaction recomputes the page, so expensive work must be cached manually and multi-step flows become an exercise in session-state bookkeeping. Mesop's component tree plus keyed state is the more conventional design, and reading 200 lines of it explains why a "real" frontend framework behaves the way it does.

So the entry has a narrow, honest use: study the design, migrate off the dependency.

## Key Features

- **Component tree in Python**: composable functions returning components, with layout primitives rather than an HTML string.
- **Targeted re-render**: state changes update the components that read them, not the entire script — the structural difference from Streamlit and Gradio.
- **`me.state` with dataclasses**: typed state containers with change notification, which is the part most Python UI tools lack.
- **Hot reload that preserves state**: edit the file, the browser updates, the app is still where you left it.
- **Navigation and routing**: multiple pages by path, so an internal tool with several screens was expressible.
- **`mesop.labs` helpers**: ready-made streaming text-to-text and similar patterns for LLM demos.
- **Strong typing and IDE support**: components and events were typed, so autocomplete worked.
- **Google-internal provenance**: it was used for real internal applications, which is why the design is closer to a framework than to a notebook wrapper.

## Architecture / How It Works

The Python process owns the component tree and the state; the browser holds a rendered mirror and a websocket. An event from the browser (a click, an input change) travels to Python, a handler mutates state, and the framework computes which components to re-render and sends the diffs back.

That is the same architecture as a server-driven UI framework, and it inherits the same trade-off: no client-side logic without an extension point, and a round trip for every interaction. For an internal tool on a LAN that is fine; for a public product at latency it is not.

The typescript frontend and the Python package were versioned together, which is why the project could not be revived by a community fork without also maintaining the frontend half — and probably why the archived state is terminal rather than a pause.

## Getting Started

Only as a reproduction of an existing app or a reading exercise:

```bash
pip install mesop
```

```python
import mesop as me

@me.stateclass
class State:
    name: str = ""

@me.page(path="/")
def app():
    state = me.state(State)
    me.input(label="Your name", on_input=lambda e: setattr(state, "name", e.value))
    me.text(f"Hello, {state.name or 'world'}")
```

```bash
mesop main.py     # serves on http://localhost:32123
```

Pin the version in any environment that still runs Mesop, and check whether your dependency tree pulls in a transitive requirement that no longer resolves — there will be no upstream fix when it does.

## Use Cases

1. **Reading the design**: the clearest small implementation of component-tree Python with keyed state, and a good argument for why script-rerun is not the only option.
2. **Maintaining an internal tool**: if a team's admin page runs on Mesop, this entry is the warning that patches are now the team's responsibility.
3. **Planning a migration**: the app's surface (pages, state classes, event handlers) maps onto a real frontend one-to-one, so the port is mechanical rather than a rewrite.
4. **Teaching UI architecture**: a 200-line Mesop app demonstrates server-driven UI, diff-based re-render and state ownership without JavaScript in the way.
5. **Assessing framework claims**: when a new Python UI tool promises "no rerun", comparing its design against Mesop's shows what the promise actually costs.
6. **Evaluating Google-internal tooling** for a build-versus-adopt decision — the same patterns reappear in other internal-first projects, and the archive date is a data point about support lifecycles.

## Strengths

- The component-and-state model is the right design for anything beyond a single-screen demo, and it avoided the rerun-everything cost that limits Streamlit apps.
- Hot reload with preserved state made the edit loop genuinely fast, which is most of the value in a prototyping tool.
- Typed components and dataclass state meant IDE support, which is rare in this category.
- Provenance was real: it ran internal Google applications, not only demos.
- The Python surface was small enough to read end to end, which makes it a good teaching artifact.

## Limitations / When NOT to Use

- **Archived as of 30 September 2026.** No fixes, no security patches, no compatibility work with new Python or browser versions; anything you find stays broken.
- **A fork means owning a TypeScript frontend too.** Reviving it is not a matter of patching a Python package.
- **Server round trip per interaction.** Fine on a LAN, wrong for a public product with latency expectations.
- **Never a production frontend.** The documented path for anything real was to build a proper frontend once the prototype proved the idea.
- **Small community even while alive.** 109 open issues with limited external contribution, so answers were thin and Stack Overflow coverage thinner.
- **Not the default Google recommendation.** A team assuming "Google-backed" means "supported" had it backwards; company provenance is not a support contract.

## Integration Patterns

- *Exit plan first*: inventory the pages, state classes and handlers before touching code, then rebuild against `streamlit` or `gradio` for another prototype, or `fastapi` plus a real frontend for something that ships.
- *Containment*: if you must keep one running, pin the version, vendor the dependency set, and isolate it behind an internal reverse proxy so a browser-side break does not block other tools.
- *Alternatives in the same job*: `streamlit` for the fastest path from script to demo, `gradio` for model interfaces with shareable links, `chainlit` for conversational agent UIs specifically, `fastapi` when the UI is going to become a real product.
- *Learning path*: read Mesop's state handling, then read how a React app manages the same state — the concepts transfer and only the language changes.
- *Before adopting anything similar*: check the commit date, the archive badge and the release notes for a maintenance statement; a dead project with good documentation reads exactly like a live one from a blog post.

## Resources

- [GitHub (archived)](https://github.com/mesop-dev/mesop)
- [Documentation](https://mesop-dev.github.io/mesop/)
- [PyPI](https://pypi.org/project/mesop/)

## Buzz & Reception

- Noted at launch for bringing a component model to Python UI work and for being used inside Google; the archival notice now supersedes most of that coverage.

---
*Last reviewed: 2026-10-25 by @maintainer*
