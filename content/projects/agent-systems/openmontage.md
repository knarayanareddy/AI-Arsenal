---
id: openmontage
name: OpenMontage
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "AGPL-3.0 agentic video production system driving twelve pipelines, 100+ tools and Remotion composition from a coding assistant"
github_url: "https://github.com/calesthio/OpenMontage"
license: AGPL-3.0
primary_language: Python
tags: [multimodal, agents, voice]
maturity: beta
cost_model: usage-based
github_stars: 61695
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-06"
docs_url: "https://github.com/calesthio/OpenMontage/blob/main/docs/ARCHITECTURE.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Turns a plain-language brief into a rendered video with real motion clips, narration and self-review, instead of animating a few stills."
best_for:
  - "You want a produced video rather than a prompt, and you need the pipeline to run ffprobe validation, frame sampling, audio checks and subtitle verification before delivery."
  - "You want the real-footage path, because OpenMontage builds a corpus from free stock and open archives, retrieves actual motion clips and edits them into a timeline rather than animating stills."
  - "You want cost visibility before generation starts, because a reference video yields 2-3 differentiated concepts with an honest tool path and cost estimates."
avoid_if:
  - "You need this to be OSI open source, because the AGPL-3.0 licence reaches any network-served use you build on top of it."
  - "You have no generation API budget, because the free path still needs keys for image, video or voice providers for most pipelines."
  - "You want a deterministic render pipeline, because the whole design routes creative decisions through an agent rather than a fixed graph."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (AGPL-3.0), last commit, primary language, topics and issue count came from the GitHub API. Pipeline and tool counts, manifest structure, verification stages, provider list and published cost figures are read from the official README and docs; no video was produced during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenMontage is an agent-driven video production system: you describe a video and a coding assistant (Claude Code, Cursor, Copilot, Windsurf, Codex) runs it. It ships twelve production pipelines, over a hundred tools and hundreds of skill and production-knowledge files, and its architecture is manifest-driven: pipeline definitions live in pipeline_defs/ as YAML manifests, each stage has a director skill under skills/pipelines/, and tools are discovered through a registry that can report its own support envelope and provider menu at runtime. Rendering is Remotion compositing driven by ffmpeg, with providers including FLUX, Google Veo, Kling, MiniMax, Recraft, ElevenLabs, Suno, Pexels and Pixabay. Before delivery the system runs a multi-point self-review, and every provider choice is scored across seven dimensions with an auditable decision log. Published examples cost between about $1.33 and $5 per film.

## Why it's in the Arsenal

The recurring failure in agentic video is that the deliverable is a pile of generated stills with a soundtrack, not a video. OpenMontage's design distinguishes the two paths explicitly: an image-based route and a real-footage route where the agent retrieves actual motion clips, builds a timeline and renders a finished piece, with quality gates that check the render rather than trusting the prompt. The tradeoff is that every one of those pipelines needs paid generation providers for best results, and AGPL-3.0 narrows where you can host the result.

## Architecture

The agent selects a pipeline from pipeline_defs/, reads the YAML manifest, then executes stage director skills in order. Each stage calls tools discovered through the tool registry, whose support_envelope() and provider_menu() calls let an agent check what is actually available before it commits to a plan rather than guessing. Assets (generated or retrieved from stock archives) are assembled into a timeline and rendered by a Remotion composer invoked through ffmpeg. Verification is a pipeline stage in its own right: ffprobe validation, frame sampling, audio level analysis, delivery-promise verification and subtitle checks, with provider scoring logged. Adding a pipeline means adding a manifest, stage skills and any new tools.

## Ecosystem Position

OpenMontage competes with the hosted AI video products (Runway, Pika, Synthesia) but with a different bargain: you bring API keys and get a composable, inspectable pipeline rather than a proprietary editor. It overlaps with Remotion-based projects that render programmatically, and it is an alternative to manual editing in Premiere or DaVinci for short-form content where generated assets plus captions will do. Compared with content/projects/agent-systems entries such as AionUi, which handles office documents, this is the creative-media equivalent with far heavier quality gates. It consumes the same ffmpeg-based media tooling that appears in content/projects/data-and-retrieval for document parsing, and the model-driven orchestration pattern is shared with content/projects/frameworks projects, though here it lives in skills and manifests.

## Getting Started

Clone, run make setup, then open the directory in your coding assistant and describe the video:

```bash
git clone https://github.com/calesthio/OpenMontage.git
cd OpenMontage
make setup
# then, inside Claude Code / Cursor / Codex:
# "Make a 60-second animated explainer about how neural networks learn"
```

Add optional provider keys to .env; the make test-contracts suite runs without any API keys.

## Key Use Cases

1. Explainer video from a brief: ask for a 60-second animated explainer and get script, generated visuals, narration, subtitles and a rendered file.
2. Real-footage documentary montage: request a 75-second piece using only stock and open-archive footage with music and no narration, and get a retrieved and edited timeline rather than synthetic stills.
3. Reference-driven adaptation: paste a YouTube Short or TikTok and receive 2-3 differentiated concepts with pacing and structure preserved, plus cost estimates before generation starts.

## Strengths

- Quality gates are part of the pipeline: ffprobe validation, frame sampling, audio analysis, promise verification and subtitle checks run before delivery.
- Real-footage path that retrieves actual motion clips and edits them, rather than the common animate-stills approach.
- Manifest-driven extensibility: adding a pipeline is a YAML manifest, stage skills and tool discovery, not a code change.
 - Cost is auditable, with published per-film figures and a decision log scoring provider choice across seven dimensions.

## Limitations

AGPL-3.0 is a real constraint for anyone serving the result or building a product on top, and the project is explicit about it. Cost is metered by generation provider, so pipelines using video models will run into money quickly even though published examples land between roughly $1.33 and $5. The free paths still need API keys for images, voice and video for most pipelines, so there is no fully self-hosted production mode. Quality depends on agent decisions and third-party model availability, which makes reproducibility across runs difficult. With over 300 open issues and rapid iteration, expect pipeline behaviour to change between versions.

## Relation to the Arsenal

This is the creative-media production entry in content/projects/agent-systems, and the counterpart to the document-production work in AionUi within the same phase: both wrap an agent around a format-specific toolchain, but this one adds render verification because a bad video is obvious where a bad document may not be. Its ffmpeg and Remotion substrate connects to content/projects/data-and-retrieval, where media parsing and document conversion tooling sits, and its provider breadth overlaps with the model-access layer in content/projects/inference-engines and the foundation-models phase. If you want to build the pipeline yourself rather than adopt one, content/projects/frameworks is the layer above this.

## Resources

- [GitHub — calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)
- [Project site — openmontage.video](https://www.openmontage.video)
- [Agent guide and provider setup](https://github.com/calesthio/OpenMontage/blob/main/docs/PROVIDERS.md)
