#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { escapeMarkdownCell, escapeMarkdownInline } from './utils/markdown-escape.js';

function top(items, n = 5, sorter = (a, b) => String(a.id).localeCompare(String(b.id))) {
  return [...items].sort(sorter).slice(0, n);
}
function line(item) {
  const name = escapeMarkdownInline(item.name ?? item.title ?? item.display_name ?? item.id);
  const description = escapeMarkdownCell(item.description ?? item.tldr ?? item.summary ?? '');
  const score = item.trending_score !== undefined ? `, score:${item.trending_score}` : '';
  const stars = item.github_stars !== undefined ? `⭐${item.github_stars}${score}` : '';
  const meta = stars ? ` (${stars})` : '';
  return `- ${name}${meta} — ${description}`;
}
async function readJson(file, fallback) { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return fallback; } }

const index = await readJson('data/index.json', { entries: [], meta: { schema_version: '1.0.0' } });
const projects = (await readJson('data/projects.json', { items: [] })).items ?? [];
const tools = (await readJson('data/tools.json', { items: [] })).items ?? [];
const papers = (await readJson('data/papers.json', { items: [] })).items ?? [];
const tips = (await readJson('data/tips.json', { items: [] })).items ?? [];
const guides = (await readJson('data/guides.json', { items: [] })).items ?? [];
const entries = index.entries ?? [];
const byType = entries.reduce((acc, entry) => { acc[entry.type] = (acc[entry.type] ?? 0) + 1; return acc; }, {});

const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))].sort();
const jobs = [...new Set(tools.flatMap((t) => t.job ?? []))].sort();
const context = `# AI Arsenal — Dense Context Summary

Generated: ${new Date().toISOString()} | Entries: ${entries.length} | Schema version: ${index.meta?.schema_version ?? '1.0.0'}

AI Arsenal is a Markdown-first, schema-enforced knowledge base for AI engineering. It is designed for humans browsing GitHub, LLMs ingesting context, autonomous agents routing to files, and future UI/API consumers.

## Counts

- Projects: ${byType.project ?? 0}
- Tools: ${byType.tool ?? 0}
- Papers: ${byType.paper ?? 0}
- Tips: ${byType.tip ?? 0}
- People: ${byType.person ?? 0}
- Digests: ${byType.digest ?? 0}
- Guides: ${byType.guide ?? 0}
- Build examples: ${byType['build-example'] ?? 0}

## Navigation

- Agent map: /AGENT.md
- Taxonomy: /TAXONOMY.md
- Data API: /data/index.json, /data/projects.json, /data/tools.json, /data/search-index.json
- Architecture decisions: /content/architectures/decision-trees/
- Reference stacks: /content/architectures/reference-stacks/
- Tool jobs: /content/tools/by-job/
- Observability: /content/observability/
- Research papers: /content/research/papers/

## Top Projects by Category

${categories.map((category) => `### ${escapeMarkdownInline(category)}\n${top(projects.filter((p) => p.category === category), 5, (a, b) => (b.trending_score ?? 0) - (a.trending_score ?? 0) || (b.github_stars ?? 0) - (a.github_stars ?? 0)).map(line).join('\n') || '_None_'}`).join('\n\n')}

## Top Tools by Job

${jobs.map((job) => `### ${escapeMarkdownInline(job)}\n${top(tools.filter((t) => (t.job ?? []).includes(job)), 5, (a, b) => a.name.localeCompare(b.name)).map(line).join('\n') || '_None_'}`).join('\n\n')}

## Architecture Quick Refs

${top(guides.filter((g) => g.path?.includes('/reference-stacks/')), 8).map(line).join('\n') || '_No reference stacks yet._'}

## Decision Heuristics

- Need local/private LLMs? → inspect Ollama, llama.cpp, local-first stack, and choose-llm.
- Need fast inference at scale? → inspect vLLM, TGI, production-serving, and choose-deployment-target.
- Simple RAG? → inspect LlamaIndex, LangChain, Chroma, pgvector, and rag-vs-fine-tuning.
- Complex multi-step agents? → inspect LangGraph and choose-agent-framework.
- Tracing/observability? → inspect Langfuse, Phoenix, LangSmith, and observability overview.
- Evaluation before launch? → inspect DeepEval, RAGAS, promptfoo, evaluation pipelines, and choose-eval-framework.

## Must-Read Papers

${top(papers, 10, (a, b) => String(a.published_date).localeCompare(String(b.published_date))).map(line).join('\n') || '_No papers yet._'}

## High-Impact Tips

${top(tips.filter((t) => t.impact === 'high'), 10).map(line).join('\n') || '_No tips yet._'}
`;

await fs.writeFile('CONTEXT.md', context);
console.log(chalk.green('Generated CONTEXT.md'));
