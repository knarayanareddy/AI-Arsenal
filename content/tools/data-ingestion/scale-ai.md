---
id: scale-ai
name: Scale AI
type: tool
job: [data-labeling]
description: Managed annotation and RLHF workforce plus a data engine covering generation, red teaming and model evaluation, sold as enterprise projects
url: "https://scale.com/"
cost_model: paid
pricing_detail: Per-project enterprise contracts; no published price list and no self-serve signup — scoping starts with a sales call.
tags: [data, rlhf, guardrails, cloud]
maturity: production
stack: [polyglot]
free_tier: false
free_tier_limits: null
self_hostable: false
open_source: false
source_url: null
docs_url: "https://scale.com/data-engine"
github_url: null
alternatives: [argilla, label-studio, prodigy]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production]
best_when:
  - You need human annotation capacity you do not want to hire, recruit or manage, including domain specialists for medical, legal, robotics or sensor-fusion data
  - You need RLHF preference data, red-teaming or expert model evaluation rather than labels for a fixed taxonomy, and want the same vendor to collect, label and score
  - Your data is text, image, video or 3D/LiDAR and the vendor's existing pipelines for that modality save you building a review UI and a QA process
avoid_when:
  - Confidentiality rules mean the data cannot leave your infrastructure or be shown to a third-party workforce, because there is no self-hosted or on-premises path — Label Studio and Argilla exist precisely for that case
  - You compete with Meta or your procurement treats a 49% Meta stake as a conflict, since the vendor is no longer the neutral supplier it was before June 2025
  - Your volume is a few thousand items or less, where a self-serve tool and one part-time annotator cost less than the sales cycle
version_tracked: null
verdict: solid-choice
verdict_rationale: The deepest managed-workforce option for expert and multimodal annotation — but not self-hostable, and after Meta's 2025 stake its neutrality is a procurement question
status: active
---

> **TL;DR:** Scale AI sells annotation capacity and a data engine as enterprise projects — collection, labeling, RLHF, red teaming and evaluation across text, image, video and LiDAR. It is the right buy when the constraint is specialist human labour you do not want to employ. It is the wrong buy when the constraint is confidentiality: nothing here is self-hostable, and since Meta took 49% in 2025 the supplier-neutrality argument no longer holds.

## Overview

Scale AI is a managed labelling and training-data business rather than a tool you install. You hand over raw data and an annotation specification; Scale's distributed workforce and its internal pipelines do the collection, labelling, quality assurance and delivery, and increasingly the RLHF preference collection, red-teaming and model evaluation that sit around a training run. The public product surface is the Data Engine, which spans text, image, video and 3D/LiDAR sensor fusion, and every path on the site ends at "book a demo" — there is no signup, no self-serve tier and no published pricing.

That shape decides what the entry is for. It is not a comparison you make on features; it is a procurement of labour, instructions and throughput, where the deliverable is a dataset and the risk is that the specification, not the vendor's capacity, was the weak link.

## Why It's in the Arsenal

The other three entries for this job (`label-studio`, `argilla`, `prodigy`) are software you run: they give you an interface, a schema and an active-learning loop, and you supply the annotators. That works until the annotators are the problem — recruiting radiologists to label scans, or coordinating 40 people across four languages, or building a review queue that survives 200k items. Scale is the entry that prices that problem instead of solving it in-house, and it is also the one that covers modalities the self-hosted tools treat as an afterthought (video, LiDAR, sensor fusion).

It is also the most consequential vendor in the category to get the context right on: a catalogue that described Scale as "the managed option" without mentioning the 2025 Meta investment would be leaving out the fact most likely to change a buyer's decision.

## Key Features

- **Managed workforce, including domain experts**: labelling done by Scale's contributors rather than yours; the company states 25% hold advanced degrees, which is the part that matters for medical, legal and scientific annotation.
- **Generative-AI data engine**: prompt-response generation after pre-training, RLHF preference collection, red-teaming with prompt injection, and model evaluation against a prompt suite — the tasks around a post-training run, not just classification labels.
- **Modality coverage**: text (documents, NLP, transcription), image (electro-optical, infrared), video (full-motion video), and 3D sensor fusion including LiDAR.
- **Annotation types as products**: bounding boxes, segmentation, keypoints, classification and free-form collection each have a delivery pipeline and a QA process behind them.
- **Programme-level scoping**: task design, workforce allocation and acceptance criteria are agreed up front, so the unit of work is a project with a statement of work rather than a per-seat licence.

## Architecture / How It Works

A Scale engagement has four stages, and the first is the one that decides quality. You write an annotation specification — label definitions, edge cases, disagreement policy — and Scale turns it into task instructions and a qualification test that contributors must pass before they see your data. Work then flows through task queues with inter-annotator overlap on a sample; disagreements route to review, and reviewers are themselves rated on agreement with a gold set. Delivery is as files (JSON/JSONL, COCO, custom schemas) or through API into your storage.

The feedback loops matter more than the queue mechanics: the specification is revised from disagreement data, and the revised version is what later batches are labelled against, which is why the first batch is always the most expensive per item. For RLHF and evaluation work the same pipeline collects preference pairs or adversarial prompts instead of labels, and the output is a dataset that feeds a training or scoring run outside the platform.

Scale publishes no uptime or SLA figures on its public pages, so those are contractual terms to negotiate rather than documented properties of the service.

## Getting Started

There is no install and no free tier; access starts with a scoping conversation.

```bash
# Nothing to install: engagements start at https://scale.com/demo
# Bring: a sample of your data, a draft label taxonomy, and the delivery format
# your training pipeline already reads.
```

Come to that first call with three things: a labelled sample of a few hundred items you consider correct, a written specification for the edge cases you already know about, and a pilot scope small enough to measure per-item cost and inter-annotator agreement before committing to a volume. The pilot result — agreement rate on your own gold set at a stated price — is the only comparison that means anything between vendors here.

## Use Cases

1. **Specialist labelling you cannot staff**: radiology, legal documents, robotics or geospatial imagery where the annotator needs a credential. The recruiting problem is the whole problem, and this is what you are buying.
2. **RLHF and preference data at volume**: thousands of prompt-response pairs collected with human preferences, and a red-team pass over the same prompts, run as one programme instead of two vendors.
3. **Multimodal and sensor data**: video and LiDAR annotation pipelines that would otherwise mean building a custom review tool with 3D playback before you can label a single frame.
4. **A benchmark you need to be defensible**: expert evaluation of model outputs on a domain task where the grading rubric has to be written, applied and audited by people qualified to apply it.

## Strengths

- The capability you cannot replicate cheaply is recruiting and managing qualified annotators; that is the actual product, and it is why the alternative to Scale is usually a hiring plan, not a download.
- Coverage of the awkward modalities — video, infrared, LiDAR, sensor fusion — is deeper than the self-hosted tools in this phase, which are built around text and images.
- Post-training tasks (generation, RLHF, red teaming, evaluation) are products with defined pipelines rather than things you assemble from a labelling UI and a set of scripts.
- The qualification-test and gold-set machinery is a genuine quality mechanism when the specification is good, and it produces an auditable agreement rate you can put in a report.
- Financially stable in the way an enterprise buyer cares about: just under $1B revenue in 2025 with a contracted Meta commitment of at least $450M a year for five years.

## Limitations / When NOT to Use

- **No self-hosted or on-premises path.** Your data is shown to a third-party workforce and leaves your infrastructure. For regulated health, financial or government data that is usually the end of the evaluation, and `label-studio` or `argilla` inside your VPC is the answer.
- **The Meta stake changed the neutrality calculation.** Meta took a 49% non-voting stake in June 2025, and Google — then Scale's largest customer — moved to split, while OpenAI wound down its work and xAI halted projects. If you compete with Meta, or your procurement scores supplier independence, that is a decision-changing fact, not a footnote. The company cut roughly 14% of staff in July 2025 and refocused on enterprise and government work.
- **Opaque pricing.** No published rates, no self-serve tier, and a cost that scales with both item count and specification complexity — the same dataset costs very different amounts depending on how much judgement each item needs. Budget from the pilot's measured per-item cost, never from a quoted average.
- **You cannot evaluate it the way you evaluate software.** There is no repository, changelog or version to track, so the diligence that applies to the rest of this phase (read the code, run the tests) becomes contract review: SLA, data-retention terms, who owns the labelled output, and what happens to in-flight work if the relationship ends.
- **The specification is still yours.** Scale executes a taxonomy; it does not decide what "correct" means for your task. A vague spec returns confidently labelled data that is wrong in a consistent way, and no amount of workforce quality fixes that.

## Integration Patterns

- *Wiring*: the integration surface is a delivery contract, not an SDK — agree the schema (COCO, JSONL, or your own), the delivery cadence and the acceptance check, then validate every batch on arrival with a schema validator plus a sample re-review. Put that validator in the same pipeline that consumes the data so a malformed batch fails before training starts.
- *Alternatives*: `label-studio` for a self-hosted human-in-the-loop UI you operate, `argilla` for programmematic feedback collection that lives next to your model, `prodigy` for a single expert annotator working with active learning on text. The dividing question is who supplies the people: if you do, the three above are cheaper and keep data in-house; if you are buying people, they are not competitors.
- *Cost control*: model the spend as items × judgement per item, and reduce both before signing — pre-label with a model and have humans correct only disagreements, which is the standard way to cut per-item cost by an order of magnitude on a well-defined task.
- *Data governance*: settle retention, deletion and derived-model rights in the contract, and record in your own data catalogue which datasets were labelled by a third party, because that provenance outlives the engagement.

## Resources

- [Scale Data Engine](https://scale.com/data-engine)
- [Generative AI data engine](https://scale.com/generative-ai-data-engine)
- [Data annotation guide](https://scale.com/guides/data-labeling-annotation-guide)

## Buzz & Reception

- [Meta's $14.3B investment for a 49% non-voting stake](https://www.reuters.com/business/finance/meta-finalizes-investment-scale-ai-valuing-startup-29-billion-2025-06-13/) (June 2025) is the event that shaped current perception of the company: it funded Scale and simultaneously triggered customer departures, with [Google — its largest customer — moving to split](https://www.cnbc.com/2025/06/14/google-scale-ais-largest-customer-plans-split-after-meta-deal.html) and OpenAI winding down its relationship.
- [Scale told Forbes](https://www.forbes.com/sites/richardnieva/2026/05/14/scale-meta-deal/) in May 2026 that revenue reached just under $1B in 2025 and that it expects to pass $1B in 2026, with Meta contractually committed to at least $450M a year for five years — the clearest public evidence of both its scale and its new dependence on one customer.

---

*Last reviewed: 2026-10-25 by @maintainer; vendor facts from scale.com and the 2025-2026 reporting cited above.*
