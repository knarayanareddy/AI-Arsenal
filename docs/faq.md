# FAQ

## What is AI Arsenal?

AI Arsenal is a structured, curated knowledge base for AI engineering. It contains Markdown content for humans and generated JSON data for machines.

## Is this just another awesome-list?

No. Awesome-lists are usually unstructured collections of links. AI Arsenal is schema-first: every entry has validated metadata, controlled taxonomy, and generated data output.

## Why use Markdown?

Markdown makes the project easy to read, fork, review, and contribute to. Git provides history and attribution. YAML frontmatter provides structure.

## Why use JSON Schema?

Schemas keep the repository consistent and make the data layer reliable for future UI, search, API, and LLM/agent use cases.

## Why is `TAXONOMY.md` so important?

It prevents tag sprawl. Without controlled vocabulary, filtering and search become unreliable.

## Should I edit files in `data/`?

Usually no. Edit `content/` and regenerate data with:

```bash
pnpm run generate:all
```

Generated data is refreshed through batched automation PRs.

## Why not commit generated data after every merge?

Because high PR volume would create constant bot commits, merge conflicts, and unreadable history. AI Arsenal uses scheduled or manual batched generated-data PRs instead.

## Why do some validation commands check only changed files?

Changed-file validation gives fast contributor feedback. Global checks still validate repository-wide invariants such as duplicate IDs, references, and path conventions.

## Where should a new entry go?

Use the scaffold commands when possible:

```bash
pnpm run new:project
pnpm run new:tool
pnpm run new:paper
pnpm run new:tip
```

If placing manually:

- projects go under `content/projects/[phase]/`
- tools go under `content/tools/[phase]/`
- papers go under `content/research/[phase]/` (one of: `foundational`, `architectures`, `training-and-alignment`, `inference-and-efficiency`, `retrieval-and-memory`, `agents-and-reasoning`, `evaluation-and-safety`, `surveys`)
- tips go under `content/tips-and-tricks/`
- build examples go under `content/build-examples/[difficulty]/`

## What counts as a good project entry?

A good project entry is notable, active or historically important, relevant to AI engineering, and described honestly with strengths and limitations.

## Can I add my own project?

Yes, but disclose that you are affiliated. Maintainers may apply stricter review to self-promotional entries.

## Can I add a new tag?

Only when it is broadly useful. Prefer existing tags. Taxonomy changes should be discussed because they affect validation and filtering.

## Can I build a UI on top of this repo?

Yes. Use `/data/*.json`, especially:

- `data/index.json`
- `data/projects.json`
- `data/tools.json`
- `data/search-index.json`
- `data/tags.json`

The design expects the UI to live in a separate repository.

## How do LLMs use this repo?

Start with:

1. `AGENT.md`
2. `CONTEXT.md`
3. `TAXONOMY.md`
4. relevant `data/*.json` or `content/**/*.md`

## What is `CONTEXT.md`?

A generated dense summary optimized for LLM context windows.

## What is `AGENT.md`?

A routing map optimized for autonomous agents and LLMs. It tells them where to look for each kind of question.

## What if a listed project becomes deprecated?

Do not delete it. Set `status: deprecated`, add a deprecation note, document the reason, and link alternatives.

## How are stale entries handled?

Entries have review dates. `scripts/check-stale.js` generates `data/stale-report.json` and scheduled workflows surface entries needing review.

