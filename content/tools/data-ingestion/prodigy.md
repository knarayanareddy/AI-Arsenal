---
id: prodigy
name: Prodigy
type: tool
job: [data-labeling]
description: Scriptable annotation tool for NLP, data labeling, and model-in-the-loop workflows
url: "https://prodi.gy/"
cost_model: paid
pricing_detail: Lifetime per-seat licence, pay once - personal or company tier, 12 months of upgrades included; company tier adds SSO and priority support.
tags: [data, fine-tuning, transformers]
maturity: production
stack: [python]
free_tier: false
free_tier_limits: null
self_hostable: true
open_source: false
source_url: null
docs_url: "https://prodi.gy/docs/"
github_url: null
alternatives: [argilla, label-studio, scale-ai]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [research, production]
best_when:
  - You want the annotator to see only the examples worth labelling, using active learning on a model you control, rather than working through a static queue
  - You are willing to write Python recipes, because that is how data loading, labelling interface, model suggestions and retraining are wired
  - Data cannot leave your infrastructure at all - Prodigy runs offline on your machines, including air-gapped hosts, and never contacts a licence server
avoid_when:
  - You need a free or open-source tool, since Prodigy is a paid lifetime licence with no individual trial
  - Many non-technical annotators need a managed queue with roles and oversight - Label Studio or a managed service fits that better than a developer tool
  - Your organisation is primarily military, law-enforcement, intelligence or national-security work, which Explosion's licence policy excludes
version_tracked: null
verdict: recommended
verdict_rationale: The best tool in this phase for model-in-the-loop NLP annotation by one or two experts, if a lifetime licence and Python fluency are acceptable
status: active
---

> **TL;DR:** Prodigy is a Python package with a bundled web app that runs entirely on your own machines - no cloud, air-gap capable, lifetime licence. Its distinguishing idea is that a recipe script decides what the annotator sees next, so a model's uncertainty picks the examples and each pass retrains. It is a developer tool for a small expert team, not a managed platform for a crowd of annotators.

## Overview

Prodigy is a downloadable Python package that ships with a local web application. You install it on a machine you control, start a "recipe" - a Python function that declares where examples come from, which interface to show, and what to do after each decision - and the browser becomes an annotation client against a database on that machine. The vendor's licence page is unusually direct about the deployment model: it never phones home, and it is designed to run on an air-gapped host.

That makes it the developer's annotation tool in this phase. Label Studio and Argilla are platforms you deploy and hand to a team; Prodigy is a library you script and hand to an expert, with the model-in-the-loop machinery already written.

## Why It's in the Arsenal

The self-hosted labelling tools in this phase trade efficiency for control: `label-studio` and `argilla` give you a UI and a project model, and you supply the workflow. Prodigy makes the opposite bet - you write the workflow in Python, and the tool's value is the machinery around it: 23 annotation interfaces, active-learning models that reorder the stream by uncertainty, and a database layer (SQLite, MySQL or PostgreSQL) that a `train` recipe can read from directly. The result is that one expert with a good recipe can label a few thousand items and end up with a retrained model, rather than labelling a few thousand items and then starting the modelling work.

It is also the only entry here with a hard privacy guarantee rather than a configuration option: the vendor's FAQ states it never phones home, so an air-gapped machine is a supported deployment. That property, not a feature list, is often why a regulated team picks it.

## Key Features

- Recipe-driven workflows: the data stream, interface, suggestions and storage are Python functions you write
- Active-learning models for NER, text classification, POS tagging and dependency parsing
- 23 annotation interfaces spanning text, image, audio, video, transcription, relations and multiple-choice
- Storage in SQLite, MySQL or PostgreSQL, with JSON export and an open data format
- Bundled web app served locally; runs offline and on air-gapped machines
- Plugins for Hugging Face models, PDF processing and third-party APIs
- Lifetime licence with twelve months of upgrades; SSO on the company tier

## Architecture / How It Works

A recipe is a Python function that returns a dictionary describing the workflow: a stream of examples, an `update` callback that decides what the annotator sees next, a view/interface id, and a database. Prodigy runs that recipe as a local web server, the browser is a thin client over it, and every decision is written to the database as it is made. Active-learning models (for NER, text classification, part-of-speech tagging and dependency parsing) sit inside `update` and reorder upcoming examples by uncertainty, so the annotator spends their time on the boundary of the model's competence.

Because the interface, the data loading and the model suggestion are all Python, an LLM can be substituted for the active-learning ranker - the documentation covers that pattern - and the resulting annotations feed `train` (spaCy) or any Hugging Face model through the plugins. Nothing is uploaded: the browser talks to localhost, and the database is wherever you pointed it.

## Getting Started

Prodigy is a licensed download, not a package you can `pip install` anonymously; the installer is fetched with your licence key.

```bash
# With a licence key from https://prodi.gy/buy
pip install -U prodigy -f https://YOUR_KEY@download.prodi.gy
python -m prodigy stats            # confirms licence, version and DB location

# Start with a built-in recipe before writing your own
python -m prodigy ner.manual my_dataset en_core_web_sm ./data.jsonl
```

Try the interfaces at demo.prodi.gy first - Explosion runs no individual trial, and organisational trials are hosted VMs, so the demo and the documentation's rendered examples are how you evaluate the UI before buying.

## Use Cases

1. **Active-learning annotation with one or two experts**: a domain expert labels the items the current model is least sure about, the model retrains, and the loop repeats - the setup Prodigy was designed for, and the one that beats bulk labelling on cost per useful example.
2. **Building a training set for a custom extractor**: NER, span categorisation, relation extraction or text classification where the labels are specific to your domain and no public dataset exists.
3. **Evaluation-set curation**: the same interfaces work for reviewing and correcting model output, which is how teams produce a gold set that is actually checked rather than inherited.
4. **Air-gapped or regulated environments**: annotation on a machine with no network path out, with the database on local disk and no external calls to audit.
5. **LLM-assisted labelling**: swap the uncertainty ranker for a model's suggestion and have the human accept or correct, which keeps the human judgement while cutting keystrokes.

## Strengths

- The active-learning loop is the product: it changes the cost per useful label rather than merely storing labels, and that is the difference between needing 20,000 annotations and needing 3,000.
- Customisation is unbounded in the direction that matters - data source, interface, suggestion model and storage are all Python or SQL, so a workflow that does not exist is a recipe away instead of a feature request.
- 23 interfaces, including image, audio, video, transcription and speaker diarisation, so a "NLP-only" reading understates it; the real constraint is the scripting model, not the modalities.
- The privacy claim holds up to inspection: no phone-home, air-gap capable, and storage in SQLite/MySQL/PostgreSQL you control.
- Commercial shape suits a small team: pay once, own the version you bought forever, twelve months of upgrades included, and no per-annotation or per-seat rental that grows with use.

## Limitations / When NOT to Use

- **Somebody has to own the code.** A recipe can be thirty lines, but it still needs versioning, tests for the update callback and a person to fix it when a data source changes shape. On a team with no engineer attached to the labelling effort, that ownership is usually the reason the project stalls.
- **No individual trial.** The demo shows interfaces and the docs show configurations, but the real evaluation is a licence; organisational trials are hosted VMs arranged with the vendor, which slows a bottom-up decision.
- **Single-seat workflow, not a managed crowd.** Concurrency and review patterns exist, but there is no queue management, annotator staffing or gold-set auditing of the kind a managed service sells - that is a hiring problem the tool does not solve.
- **Licence policy excludes some buyers outright.** Explosion refuses licences to organisations primarily engaged in military, law-enforcement, intelligence or national-security work (regulatory agencies exempt), a policy stated in the licence FAQ rather than negotiated per deal.
- **Annotation quality is still yours to establish.** Active learning gives you fewer labels, not better ones; without an adjudication pass and a held-out set, a fast loop produces a large, confidently wrong dataset.
- **One vendor, small team.** Explosion is a small company and Prodigy is a licensed product rather than a community project, so continued support is a commercial relationship, not a fork you can keep alive.

## Integration Patterns

- *Wiring*: run the recipe as the annotation service and treat the Prodigy database as the integration point - point it at PostgreSQL, then read the same tables from your training job. That keeps the pipeline one hop (annotate, then train) instead of exporting files between tools.
- *Alternatives*: `label-studio` when the annotators are not programmers and you need a multi-user project UI you host yourself, `argilla` when feedback has to be collected programmatically next to a running model, `scale-ai` when the people are the thing you are buying. Prodigy is the answer when the recipe is the thing you are building.
- *Model-in-the-loop*: start with the built-in active-learning models for NER or classification, and swap in an LLM suggestion once the label scheme is stable - suggestions before the schema settles teach the annotator inconsistency.
- *Before committing*: budget the recipe work as part of the cost. A first pipeline is typically a day of Python for someone fluent, and that effort is what turns the licence into an efficient workflow or leaves it as an expensive to-do list.

## Resources

- [Primary site](https://prodi.gy/)
- [Documentation](https://prodi.gy/docs/)
- [Licence and pricing](https://prodi.gy/buy)
- [Interface demo](https://demo.prodi.gy/)

## Buzz & Reception

- Cited in production by teams working under strict privacy constraints: the S&P Global commodities case study with spaCy and Prodigy, the Guardian's quote-extraction work, and Nesta's processing of 7M job ads are the published examples Explosion points to.
- The recurring practitioner sentiment in reviews and case studies is about effort per label rather than features - "Prodigy lets us automate as much as possible and focus on valuable decisions and less clicking" is representative of the quotes the vendor collects.
- Its reputation is narrower than its rivals': it is well regarded among NLP engineers who write Python, and largely unknown to annotation teams who expect a managed platform, which is why it rarely appears head-to-head with Label Studio in procurement.

