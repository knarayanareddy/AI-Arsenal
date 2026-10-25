---
id: label-studio
name: Label Studio
type: tool
job: [data-labeling]
description: "Apache-2.0 multi-modal annotation platform: configurable templates for text, image, audio, video and time series, plus ML-backend pre-labelling"
url: "https://labelstud.io"
cost_model: freemium
pricing_detail: Open-source Community edition self-hosted; paid Starter Cloud and Enterprise editions add SSO, cloud storage and analytics
tags: [data, cloud, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: The self-hosted Community edition is free with no seat limit; the hosted Starter Cloud trial is time-limited
self_hostable: true
open_source: true
source_url: "https://github.com/HumanSignal/label-studio"
docs_url: "https://labelstud.io/guide/"
github_url: "https://github.com/HumanSignal/label-studio"
alternatives: [argilla, prodigy, scale-ai]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [research, production]
best_when:
  - One project spans several modalities — transcripts, scanned pages, call recordings and video clips — and a single tool with per-task templates beats four
  - The tool must run inside your infrastructure with no seat licence, because annotators are contractors, students or domain experts rather than employees on a plan
  - "You want model-assisted labelling: an ML backend that returns predictions, imported as pre-annotations, so humans correct rather than start from blank"
avoid_when:
  - Your task is a tight NLP loop where the annotation server should learn as you go and the scripted workflow is the product — Prodigy's model-in-the-loop design is closer to that
  - You need the workforce, not the tool — Label Studio gives you a place for people to label, not people; that is a services purchase
  - The corpus is already labelled and you only need agreement statistics or dataset curation — a lighter library will do it without running a web application
verdict: recommended
verdict_rationale: The default self-hosted annotation platform when you need multi-modal coverage and template flexibility more than a polished single-modality workflow
status: active
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: HumanSignal/label-studio 28,544 stars, 959 open issues, Apache-2.0, last push 2026-10-23. README confirms Docker image heartexlabs/label-studio on :8080, docker-compose with Nginx + PostgreSQL, MinIO profile, pip install, and the Community/Starter Cloud/Enterprise editions split."
---

> **TL;DR:** A self-hosted annotation web app where the labelling interface is a configuration file, not code — flexible enough to cover text, image, audio, video and time series, and deliberately not a workforce.

## Overview

Label Studio is an open-source application for turning raw data into labelled datasets. It runs as a web service — a Docker container on port 8080 with SQLite by default, or a compose stack with Nginx and PostgreSQL for production — and presents each project as a task queue with a labelling interface you define.

The interface is the interesting design choice. Instead of shipping fixed annotation modes, Label Studio exposes a labelling configuration: an XML document of view elements (`<View>`, `<Text>`, `<Image>`, `<Video>`, `<Audio>`, `<TimeSeries>`) combined with control elements (`<Choices>`, `<Labels>`, `<RectangleLabels>`, `<TextArea>`, `<Rating>`, `<Relations>`) that bind to data fields. A NER task, a bounding-box task and a pairwise ranking task are three configurations over the same engine.

Around that core sit the operational pieces: multi-user projects with overlap and agreement control, an ML backend interface for pre-annotations, import/export converters for common formats, and a Python SDK for driving projects programmatically.

## Why It's in the Arsenal

Every team that trains a model eventually needs a place for humans to label, and the choice is usually between paying a service, buying a seat-based product, or running an annotation app. Label Studio is the third option, and it is the one that survives a budget review.

Its specific value in an agent-and-RAG world is less obvious than it was in the bounding-box era, and that is worth stating plainly: as fine-tuning and evaluation increasingly need preference data, rubric-scored outputs and human review of model behaviour, the ability to define a custom interface — two completions side by side, a rubric with per-criterion ratings, a free-text critique — matters more than image tooling. Label Studio handles those as configurations rather than as a product decision someone made for you.

The second reason is that model-assisted labelling is a first-class integration, not an add-on. An ML backend is a small HTTP service that returns predictions for a task; imported as pre-annotations, they turn annotation into correction, which is the only way a 5,000-item dataset gets finished.

## Key Features

- **Configuration-as-interface**: the labelling UI is XML — view elements bound to data fields, controls for choices, spans, boxes, ratings and relations — so new task types do not need new software.
- **Multi-modal coverage**: text, documents, images, audio, video and time series in one installation, with templates for common tasks.
- **ML backend integration**: a documented interface for prediction services, with reference backends for common model families, driving pre-annotation and active-learning loops.
- **Multi-annotator projects**: overlap, review and agreement settings so inter-annotator agreement is a configuration rather than a spreadsheet exercise.
- **Import and export converters**: JSON, CSV, COCO, YOLO, CoNLL and others, so labelled data leaves in the shape the trainer expects.
- **Python SDK and API**: create projects, import tasks, read annotations and manage webhooks programmatically.
- **Webhook events** on annotation creation and project updates, which is how a training pipeline reacts to new labels.
- **Cloud storage linking** for S3, GCS and Azure sources, so media is streamed rather than copied (an Enterprise feature in recent releases — verify for your edition).
- **Editions split**: Community is self-hosted and free; Starter Cloud and Enterprise add SSO, cloud storage, analytics and support.
- **Prediction-score visibility** for reviewers, and model-version metadata on pre-annotations, which is what makes the retraining loop auditable.

## Architecture / How It Works

A Django application with a React frontend. Projects own tasks; a task holds the data payload plus any predictions and annotations; the labelling configuration is stored per project and rendered by the frontend into the annotation interface. The default storage is SQLite for single-user or small installs, with PostgreSQL recommended as soon as there are concurrent annotators — the compose file makes that swap for you.

Data can be uploaded into the app's own storage or linked from S3, GCS or Azure and streamed by a presigned URL, which decides whether your annotation pipeline duplicates a media corpus or streams it.

The ML backend is the extension point that matters. Label Studio calls an HTTP endpoint with a task, the endpoint returns predictions in Label Studio's format, and those become pre-annotations a human can accept, adjust or reject. Reference backends exist for common model families; anything else is a small service you write and deploy, which is why the loop is portable between model stacks.

The queue itself is deliberately simple: a project is a list of tasks and an assignment is a filter over them. Complex workforce scheduling, throughput targets and quality sampling are not solved here — they are what the paid editions and the services market provide.

## Getting Started

```bash
docker pull heartexlabs/label-studio:latest
docker run -it -p 8080:8080 -v $(pwd)/mydata:/label-studio/data \
  heartexlabs/label-studio:latest
```

Then open `http://localhost:8080`, create a project, and paste a labelling configuration. A minimal text-classification config:

```xml
<View>
  <Text name="text" value="$text"/>
  <Choices name="label" toName="text" choice="single">
    <Choice value="bug"/>
    <Choice value="feature"/>
    <Choice value="question"/>
  </Choices>
</View>
```

For anything shared, switch to the compose stack (`docker-compose up` gives Label Studio behind Nginx with PostgreSQL) before inviting annotators; SQLite under concurrent writers is where a demo installation stops being usable. Bulk-load tasks with the SDK (`label-studio-sdk`) rather than the UI import for anything above a few hundred items, and export early — checking that the export format matches the trainer's expectations on ten annotated tasks is cheaper than discovering it on ten thousand.

## Use Cases

1. **Rubric-scored model evaluation**: define an interface with per-criterion ratings and a critique field, send model outputs as tasks, and collect the human judgements a judge model is being validated against.
2. **Preference and pairwise data**: two completions side by side with a choice control produces the comparison data DPO-style training needs, without a bespoke tool.
3. **NER and document extraction**: span labelling over contracts, invoices or clinical notes, exported in the format the extraction model was trained on.
4. **Fine-tuning set construction**: pre-annotate with a small model, have humans correct, export, retrain, repeat — the loop that turns a weak model into a labelled dataset.
5. **Audio and video annotation**: transcription correction, speaker turns and clip-level classification in the same project structure as text work.
6. **Quality review of an agent's traces**: import traces as tasks, ask reviewers to mark failures against a rubric, and use the result as the regression dataset.
7. **Domain-expert labelling without a licence fee**: bring clinicians, lawyers or mechanics into a self-hosted project with accounts rather than seats.

## Strengths

- The configuration-as-interface model is the reason it covers so many task types without a dozen products.
- Genuinely free to self-host with no seat cap, which is what makes it viable for academic and contractor-heavy projects.
- ML backend integration is documented and language-agnostic — any service that returns predictions in the right JSON shape participates.
- Import/export converters cover the formats trainers actually consume, so the handoff to `ultralytics-yolo`, spaCy or a fine-tuning stack is not bespoke code.
- The SDK and webhooks make it automatable; a pipeline can create projects, load tasks and react to new annotations without a human clicking.
- Nine hundred open issues against a project with a commercial entity behind it means the community edition is not abandoned, which is the usual failure mode for open annotation tools.

## Limitations / When NOT to Use

- **The Community edition lacks the operational features teams assume.** SSO, cloud-storage linking, analytics and priority support sit in the paid editions, and a large deployment discovers this mid-rollout.
- **It is a labelling tool, not an annotation programme.** No workforce, no throughput management, no built-in quality sampling beyond overlap settings.
- **Performance degrades on large projects without care.** SQLite and in-app media storage are fine for thousands of tasks and painful for millions; the storage decision is architectural and ideally made before ingestion.
- **The XML configuration is a learning curve and a lock-in.** Complex interfaces become long XML documents that only this application understands, and porting them elsewhere means rebuilding the interface.
- **Active learning is a pattern, not a feature.** The pre-annotation loop is something you build on top of the ML backend interface; the scheduling and uncertainty sampling are yours.
- **959 open issues.** The Community edition moves slower than the commercial product, and an awkward bug can persist for releases.
- **Not a data-curation library.** If you want deduplication, label-error detection and dataset slicing programmatically, `cleanlab`-style tooling or a dataframe is the right tool, not a web application.

## Integration Patterns

- *Wiring*: run the compose stack behind your ingress with PostgreSQL and object storage, expose only the annotator path, and drive task creation from the SDK in the pipeline that produces the unlabelled data.
- *Pre-annotation loop*: deploy an ML backend beside the app, import its predictions as pre-annotations, and record the model version on each prediction so the eventual dataset can be filtered by which model proposed what.
- *Export contract*: define the export format per project and test it against the downstream trainer on a ten-task sample; format mismatch is the most common cause of a week lost between annotation and training.
- *Review workflow*: use overlap on a sample rather than everything, compute agreement on the overlapping subset, and treat disagreement as a rubric problem before treating annotators as the problem.
- *Alternatives in the same job*: `argilla` when the loop is NLP-first with human feedback and you want a Python-native client, `prodigy` when the scripted model-in-the-loop workflow is the point and a licence fee is acceptable, `scale-ai` when you need the workforce rather than the software.
- *Before production*: back up the database and the uploaded data together (annotations without media are unrecoverable), and pin the container tag — upgrades have changed storage behaviour between minor versions.

## Resources

- [Website](https://labelstud.io)
- [Documentation](https://labelstud.io/guide/)
- [GitHub](https://github.com/HumanSignal/label-studio)
- [Edition comparison](https://labelstud.io/guide/label_studio_compare)
- [ML backend repository](https://github.com/HumanSignal/label-studio-ml-backend)
- [Docker image](https://hub.docker.com/r/heartexlabs/label-studio)

## Buzz & Reception

- The most commonly cited open-source annotation tool in ML engineering write-ups, mostly for the reason the catalog lists it: a self-hosted place to label that does not require a procurement conversation.
- Practitioners consistently report the same two friction points — the XML configuration learning curve and the jump from Community to paid editions when storage or SSO is needed.

---
*Last reviewed: 2026-10-25 by @maintainer*
