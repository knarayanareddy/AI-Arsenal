---
id: lunary
name: Lunary
version_tracked: null
artifact_type: service
category: observability
subcategory: tracing
description: Closed-source LLM observability platform for chatbot analytics, prompt templates and agent tracing — sold as SaaS at $20/user/month or self-hosted in your VPC
github_url: "https://lunary.ai"
license: Proprietary
primary_language: TypeScript
org_or_maintainer: "Lunary"
tags: [observability, tracing, rag, cloud]
maturity: production
cost_model: paid
github_stars: 0
github_stars_last_30d: 0
trending_score: 10
last_commit: "2026-04-08"
docs_url: "https://docs.lunary.ai/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: sdk
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed]
ecosystem_role:
  - "Chatbot-first observability: where Langfuse and Opik are general LLM platforms, Lunary is organised around conversational products — replays, user satisfaction, topic clustering and prompt templates for non-technical teammates"
best_for:
  - The product is a chatbot or a customer-facing assistant and the question you need answered is "what are users actually asking, and where does it fail" — chat replays, topic classification, satisfaction tracking and PII masking are the primary surfaces rather than add-ons
  - "Compliance review requires certification and data location: the vendor states SOC 2 Type II and ISO 27001, and the platform can run inside your own VPC on Kubernetes or Docker"
  - Prompt changes need to be made by people who do not read Python — template editing with versioning and A/B testing is designed for that handoff
avoid_if:
  - You want to read the code, self-host for free, or verify claims against a repository — the previously public open-source repository is no longer available (404 as of October 2026) and the Python SDK repository is archived, so the platform is auditable only through its documentation
  - You need evaluation depth or dataset tooling as the main capability — Langfuse and Opik cover datasets, experiments and programmatic scoring more deeply, and Lunary's surface is analytics-led
  - Your workload is batch or non-conversational — the analytics model assumes interactive sessions with users, and a pipeline tracing thousands of documents per hour gets less from it
upstream_dependencies: []
downstream_consumers: []
alternatives: [langfuse, langsmith-platform, phoenix, helicone, opik]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-26: lunary.ai states $20/user/month with payment required to activate a workspace, SOC 2 Type II and ISO 27001, and self-hosting in your VPC via Kubernetes or Docker. The former OSS repo lunary-ai/lunary now returns 404; lunary-py is archived and lunary-js was last pushed 2026-04-08. Entry corrected from 'open-source' to proprietary and cost_model to paid."
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Lunary is a commercial observability platform for conversational AI products, and its centre of gravity is different from the tracing-first platforms it competes with. The screens are chat replays, user satisfaction, topic classification and cost analytics; agent tracing and prompt templates sit alongside them rather than defining the product.

Integration is a monitoring wrapper: `lunary.monitor(client)` around an OpenAI-style client captures requests without restructuring application code, and the SDK family spans Python and JavaScript with connectors for the major providers and frameworks.

The commercial terms are explicit and worth stating plainly because they change how the entry should be read: cloud workspaces start at $20 per user per month with payment required to activate, and the platform is sold with SOC 2 Type II and ISO 27001 certifications and a self-hosted deployment option inside your own VPC.

## Why it's in the Arsenal

Because the observability problem for a chatbot is not the same as the observability problem for a RAG pipeline, and most platforms solve the second.

A support bot's failures are conversational: a user asks the same thing every week and gets a different answer, a topic cluster suddenly spikes, satisfaction drops after a prompt change. Lunary's analytics are shaped around those questions — topic classification over real traffic, satisfaction tracking per conversation, replays you can read — and a team whose product is a chat interface will find that closer to their needs than a span explorer with token counts.

The compliance posture is the second differentiator. SOC 2 Type II and ISO 27001 certifications plus a VPC deployment option answer questions that a self-hosted open-source tool answers differently ("you operate it") and that a hosted-only tool cannot answer at all.

The trade is documented in the limitations: the open-source repository that this entry originally pointed at is no longer public, so the platform is now verifiable only through documentation and a contract.

## Architecture

Instrumentation is a wrapper around the client you already use. `lunary.monitor()` patches the provider client to record prompts, responses, latency, token cost and errors, and the SDK exposes explicit tracking calls for users, feedback, tags and prompt templates. The JavaScript SDK has the same shape.

On the platform side, data lands in a store the vendor operates (or that you operate in a self-hosted deployment) and is presented as logs, traces, analytics dashboards and a prompt template library. Templates are fetched by identifier at runtime, so a prompt change does not require a deploy, and versioning plus A/B testing decide which variant a request receives.

Self-hosting is documented as Kubernetes or Docker inside your own VPC, which is the deployment shape enterprises ask for when the traces contain customer conversations. PII masking is applied on ingestion, which matters because chat data is full of it.

The failure modes follow from a hosted dependency: an ingestion gap during an outage is invisible until the dashboards are empty, and the SDK wrapping is version-sensitive to the provider client it patches.

## Ecosystem Position

Against `langfuse` the boundary is scope and licensing: Langfuse is Apache/MIT-licensed, self-hostable for free, and built around traces, datasets and experiments; Lunary is proprietary, sold per seat, and built around chatbot analytics. A team that wants to own the stack chooses Langfuse; a team that wants certified SaaS with conversational analytics and would rather buy than operate chooses Lunary.

Against `opik` and `phoenix` the difference is similar — both are permissively licensed and evaluation-forward, and both assume you will run them. Against `langsmith-platform` the comparison is two commercial products with different centres: LangSmith is the tracing-and-eval layer for LangChain-shaped applications, Lunary is analytics for conversational products.

`helicone` overlaps on the gateway and cost side but is a proxy, not a chatbot analytics product. The honest framing: Lunary competes on the analytics surface and the compliance paperwork, not on feature breadth or openness.

## Getting Started

```bash
pip install lunary
```

```python
import lunary
from openai import OpenAI

lunary.init(app_id="your-app-id", api_key="your-api-key")
client = OpenAI()
lunary.monitor(client)      # capture every call through this client

resp = client.chat.completions.create(
    model="gpt-6-astra",
    messages=[{"role": "user", "content": "What is the remote work policy?"}],
)

lunary.track_feedback(message_id=lunary.current_run_id(), feedback="positive")
lunary.tag_run(tags=["support", "policy"])
```

Two things to settle before rollout: what PII masking rules apply to your traffic (mask at ingestion, not at query time), and whether the deployment is cloud or in-VPC — the data path differs and so does the retention conversation with your security team.

## Key Use Cases

1. **Support chatbot triage**: cluster incoming conversations by topic to find what the bot is asked most and where it fails, then fix the prompt or the retrieval behind it.
2. **Satisfaction tracking per conversation**: attach feedback to a message and watch the trend against prompt versions, which is the cheapest quality signal a chatbot has.
3. **Prompt editing by non-engineers**: templates with versioning and A/B tests let a support lead change wording inside a review process rather than waiting for a deploy.
4. **Cost and usage analysis per feature**: tag runs by product surface and read model spend per surface rather than as one monthly invoice.
5. **Agent step tracing**: follow a multi-step agent's tool calls and errors to find the step that failed, with the surrounding conversation as context.
6. **PII-safe logging**: mask personal data on ingestion so conversation logs can be stored and reviewed without a second redaction project.
7. **VPC deployment for regulated products**: run the platform inside your own network when conversation data cannot leave it, which is the reason to pay for self-hosting rather than use a free tool.

## Strengths

- The analytics surface is shaped for conversational products — topic classification, satisfaction and replays — rather than retrofitted onto a span explorer.
- One-line instrumentation (`lunary.monitor(client)`) means adoption does not require restructuring the application or rewriting call sites.
- Compliance artefacts are in place and stated: SOC 2 Type II and ISO 27001, plus a VPC deployment path, which shortens a security review considerably.
- Prompt templates with versioning and A/B testing give non-technical stakeholders a real workflow instead of a shared document.
- PII masking at ingestion is the right default for chat data and saves a separate redaction project.
- The product is commercially supported, so a blocker has a vendor behind it rather than a GitHub thread.

## Limitations

- **The open-source option is gone.** The repository this entry originally linked to now returns 404, and the Python SDK repository is archived — so the "open-source, self-hostable" framing had to be corrected to proprietary and paid. Auditability is now contractual, not technical.
- **Seat-based pricing shapes adoption.** At $20 per user per month, cost tracks headcount rather than traffic, which is either cheap (a small team on large volume) or expensive (an organisation where many people need read access).
- **Evaluation depth is thinner than the specialists.** Datasets, experiment comparison and programmatic scoring exist but are not the strength; a team that needs rigorous evaluation is pairing this with something else.
- **Hosted dependency, self-hosted or not.** Cloud deployment means conversation data leaves your network; VPC deployment means you operate the platform and its database.
- **Small vendor, closed code.** No public issue tracker to judge health by, no fork path, and business continuity is a contract question.
- **Conversational assumptions are built in.** Batch pipelines and non-interactive workloads get less from the product than a tracing tool would give them.
- **Documentation moves without a changelog you can watch.** With no public repository there is no commit history to read when behaviour changes.

## Relation to the Arsenal

Read it against `langfuse` (open, self-hostable, evaluation-forward), `opik` (Apache-2.0 with bundled evaluation and optimisation), `phoenix` (OTel-native, notebook workflow) and `langsmith-platform` (commercial, LangChain-shaped). `helicone` is the gateway-side comparison; `openlit` and `openllmetry` are the standards-first options when an OTel backend already exists.

For what to instrument in the application itself, see `fastapi` and the agent frameworks in [Frameworks](../frameworks/_index.md); for datasets to evaluate against, `label-studio`.

## Resources

- [Website](https://lunary.ai)
- [Documentation](https://docs.lunary.ai/)
- [Prompt features](https://docs.lunary.ai/features/prompts)
- [Pricing](https://lunary.ai/pricing)
