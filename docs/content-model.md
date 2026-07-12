# Content Model

AI Arsenal uses Markdown as the authoring format and YAML frontmatter as the structured database record.

## Entry Anatomy

Every content entry looks like this:

```markdown
---
id: "example-id"
name: "Example Name"
tags:
  - llm
status: "active"
---

## Overview

Human-readable content goes here.
```

The frontmatter is validated by JSON Schema. The body is validated for required sections.

## Content Entry Types

| Type | Schema | Notes |
|---|---|---|
| `project` | `schemas/project.schema.json` | Open-source project, model, framework, platform, library, dataset, or service |
| `tool` | `schemas/tool.schema.json` | Tool or product grouped by job, cost, and stack |
| `paper` | `schemas/research.schema.json` | Research paper summary |
| `tip` | `schemas/tip.schema.json` | Practical tip, trick, or gotcha |
| `build-example` | `schemas/build-example.schema.json` | Buildable reference implementation guide |
| `person` | `schemas/person.schema.json` | Community person/resource entry |
| `digest` | `schemas/digest.schema.json` | Monthly digest snapshot |
| `guide` | `schemas/guide.schema.json` | Structured guide page such as decision trees or overview pages |
| `architecture` | `schemas/architecture.schema.json` | Architecture decision or reference stack |
| `observability` | `schemas/observability.schema.json` | Operational observability playbook |
| `community` | `schemas/community.schema.json` | Community resource or channel |
| `benchmark` | `schemas/benchmark.schema.json` | Benchmark definition and evaluation protocol |
| `trend` | `schemas/trend.schema.json` | Trending snapshot or source feed |

## Navigation Files Are Not Entries

These files are not schema-governed entries:

- `_index.md`
- `_registry.md`
- `README.md`

They are generated or navigational.

## File Naming Rules

- Use kebab-case: `choose-vector-db.md`
- No spaces
- No underscores except `_index.md` and `_registry.md`
- `id` must match the filename without `.md`

Example:

```text
content/projects/rag/vector-databases/qdrant.md
```

Must contain:

```yaml
id: "qdrant"
```

## Required Body Sections

Most entries use this body structure:

```markdown
## Overview

## Why It's in the Arsenal

## Key Features

## Architecture / How It Works

## Getting Started

## Use Cases

## Strengths

## Limitations / When NOT to Use

## Integration Patterns

## Resources

## Buzz & Reception
```

Person and digest entries have specialized section requirements.

## Taxonomy

`TAXONOMY.md` is the vocabulary contract. It defines valid values for:

- tags
- categories
- subcategories
- maturity levels
- cost models
- tool jobs
- stack languages
- status values
- verdict values
- paper importance values

Do not add new vocabulary casually. Taxonomy changes affect search, filtering, validation, and generated data.

## Cross References

Use IDs for relationships:

```yaml
alternatives:
  - "crewai"
  - "autogen"

integrates_with:
  - "langchain"
```

Avoid duplicating content. If one entry is canonical, link to it by ID or relative path.

## Generated Fields

Some fields are updated by automation:

- `github_stars`
- `github_stars_last_30d`
- `last_commit`
- `trending_score`

Do not manually tweak these unless bootstrapping or correcting a broken state.


## Editorial promotion gate

Schema and taxonomy validity are necessary but not sufficient for publication. Entries in the newest authoring batch are checked by `pnpm run validate:editorial` before generation.

The gate rejects:

- repeated paragraphs across entries;
- sections copied from `description`, `tldr`, or `key_contribution` frontmatter;
- generic `best_for` / `avoid_if` judgments that could describe any project;
- known bulk-import boilerplate and grammatical interpolation patterns;
- project sections without named architecture, deployment, ecosystem, or failure-mode detail;
- research sections without paper-specific method, baseline, result, and limitation detail.

Candidates that do not meet this editorial bar belong in the quarantine inventory, not in `content/`, generated data, search, or public counts. `enrichment_status: draft` records incomplete evidence; it does not excuse generic or mechanically generated prose.
