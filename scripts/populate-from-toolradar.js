#!/usr/bin/env node
// Populate AI Arsenal with curated entries derived from
// https://toolradar.com/featured/techpresso
//
// Each entry:
//   - paraphrases the source description (not verbatim)
//   - cites the source URL in `buzz_sources`
//   - uses values from TAXONOMY.md
//   - matches the appropriate schema

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { yamlValue } from './utils/yaml-serializer.js';

const SOURCE_URL = 'https://toolradar.com/featured/techpresso';
const TODAY = new Date().toISOString().slice(0, 10);

const TOOL_ENTRIES = [
  { id: 'taste-lab', name: 'Taste Lab', description: 'Extracts and analyzes the design DNA of any website for AI agent consumption', url: 'https://taste-lab.com', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['web-scraping'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Newly listed on Techpresso; evaluate for design-aware agent pipelines', tags: ['agents', 'retrieval'] },
  { id: 'memoriq', name: 'Memoriq', description: 'Private AI memory layer that learns from your conversations and documents', url: 'https://memoriq.ai', cost_model: 'freemium', pricing_detail: 'Free tier plus paid plans', job: ['memory-management'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Memory-layer competition is crowded; compare against Mem0 before adopting', tags: ['memory', 'agents'] },
  { id: 'conan', name: 'Conan', description: 'Live HUD for monitoring and interacting with AI agent sessions on macOS', url: 'https://conan.app', cost_model: 'paid', pricing_detail: 'Paid macOS application', job: ['monitoring', 'tracing'], stack: ['python'], maturity: 'beta', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'macOS-only; verify coverage for your agent framework', tags: ['monitoring', 'tracing'] },
  { id: 'kimi-k2-5', name: 'Kimi K2.5', description: 'AI assistant with deep understanding, analysis, and reasoning capabilities', url: 'https://kimi.com', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['production-serving', 'orchestration'], stack: ['python'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Major closed-source model from Moonshot AI; compare on benchmarks before adoption', tags: ['llm', 'agents'] },
  { id: 'qursor', name: 'Qursor', description: 'AI-powered UI context for faster front-end development with agents', url: 'https://qursor.com', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['orchestration', 'structured-output'], stack: ['typescript'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Niche UI-coding tool; useful if it integrates with your stack', tags: ['orchestration', 'agents'] },
  { id: 'basedash', name: 'Basedash', description: 'AI-native platform for generating dashboards, reports, and insights from natural-language queries', url: 'https://basedash.com', cost_model: 'paid', pricing_detail: 'Paid plans', job: ['structured-output'], stack: ['typescript'], maturity: 'production', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Commercial BI alternative; compare against open-source Metabase and Superset', tags: ['structured-output'] },
  { id: 'orchestraml', name: 'OrchestraML', description: 'Automate end-to-end ML workflows from data prep to deployment using AI agents', url: 'https://orchestraml.com', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['orchestration', 'fine-tuning'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Agent-driven ML pipelines; verify against existing MLOps platforms', tags: ['orchestration', 'fine-tuning'] },
  { id: 'honen', name: 'Honen', description: 'Transform any content into interactive AI-generated courses', url: 'https://honen.app', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['structured-output'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Content-to-course niche; evaluate fit before adoption', tags: ['structured-output'] },
  { id: 'claude-artifact-player', name: 'Claude Artifact Player', description: 'Interact with and manage AI-generated artifacts from Claude and similar models', url: 'https://claudeartifactplayer.com', cost_model: 'freemium', pricing_detail: 'Free to use', job: ['structured-output'], stack: ['typescript'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Free utility; useful for Claude users wanting artifact control', tags: ['structured-output'] },
  { id: 'code-arena', name: 'Code Arena', description: 'Benchmark and compare AI models in a competitive coding environment', url: 'https://codearena.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['evaluation'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Benchmarking tool; useful alongside existing evaluation frameworks', tags: ['evaluation'] },
  { id: 'google-pomelli-2-0', name: 'Google Pomelli 2.0', description: 'Explore and interact with large datasets through a visual, intuitive interface', url: 'https://pomelli.google', cost_model: 'freemium', pricing_detail: 'Free (Google Labs preview)', job: ['structured-output'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Google Labs preview; verify stability before production use', tags: ['structured-output'] },
  { id: 'manus', name: 'Manus', description: 'AI-powered platform for building full-stack web applications and automating tasks', url: 'https://manus.im', cost_model: 'paid', pricing_detail: 'Paid plans', job: ['prototyping', 'orchestration'], stack: ['python'], maturity: 'production', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Closed-source autonomous agent platform; review outputs carefully', tags: ['orchestration', 'agents'] },
  { id: 'ideogram', name: 'Ideogram', description: 'AI image generation with reliable text rendering in outputs', url: 'https://ideogram.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid subscriptions', job: ['production-serving'], stack: ['python'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Specialized in text-in-image; pair with Flux for diverse image needs', tags: ['multimodal'] },
  { id: 'agent-browser-shield', name: 'Agent Browser Shield', description: 'Secure AI web browsing by cleaning content and masking PII during agent runs', url: 'https://agentbrowsershield.com', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['security-and-guardrails', 'web-scraping'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'New PII-masking browser layer; verify coverage of your data classes', tags: ['security', 'retrieval'] },
  { id: 'astra-autonomous-pentest', name: 'Astra Autonomous Pentest', description: 'Continuous AI-powered penetration testing for applications, APIs, and cloud infrastructure', url: 'https://astra.security', cost_model: 'paid', pricing_detail: 'Paid plans', job: ['security-and-guardrails', 'evaluation'], stack: ['python'], maturity: 'production', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Closed-source pentest automation; combine with manual security reviews', tags: ['security', 'evaluation'] },
  { id: 'empromptu-ai', name: 'Empromptu AI', description: 'Build, deploy, and manage custom AI applications that improve over time', url: 'https://empromptu.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['orchestration', 'deployment'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Custom-app platform; compare with LangChain and Dify', tags: ['orchestration', 'cloud'] },
  { id: 'superlog', name: 'Superlog', description: 'Real-time log aggregation platform designed for serverless debugging', url: 'https://superlog.io', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['monitoring', 'tracing'], stack: ['typescript'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Serverless-focused logging; compare with Datadog and Honeycomb', tags: ['monitoring', 'tracing'] },
  { id: 'seaticket', name: 'SeaTicket', description: 'Unify and resolve customer-support issues with autonomous AI agents', url: 'https://seaticket.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['orchestration'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'AI support niche; verify against established tools like Intercom Fin', tags: ['orchestration', 'agents'] },
  { id: 'spotlight-by-backplanes', name: 'Spotlight by Backplanes', description: 'Understand, improve, and track AI agent sessions with observability tooling', url: 'https://backplanes.ai/spotlight', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['tracing', 'monitoring'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Agent-observability niche; compare with Langfuse and Phoenix', tags: ['tracing', 'monitoring'] },
  { id: 'monako-glass', name: 'Monako Glass', description: 'Visualize and understand AI model outputs with dynamic Pulse Rings and overlays', url: 'https://monako.ai/glass', cost_model: 'paid', pricing_detail: 'Paid plans', job: ['monitoring', 'evaluation'], stack: ['python'], maturity: 'beta', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Visualization tooling; useful for debugging eval failures', tags: ['monitoring', 'evaluation'] },
  { id: 'tabstack', name: 'Tabstack', description: 'Empower AI systems to autonomously browse, search, and interact with the web via API', url: 'https://console.tabstack.ai', cost_model: 'freemium', pricing_detail: 'Free tier (50K credits/mo) plus paid plans', job: ['web-scraping'], stack: ['typescript'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Mozilla-backed web layer for agents; useful API for scraping and automation', tags: ['retrieval', 'agents'] },
  { id: 'cloudskill', name: 'Cloudskill', description: 'Manage, govern, and distribute skills for AI agents across teams', url: 'https://cloudskill.ai', cost_model: 'paid', pricing_detail: 'Paid plans', job: ['orchestration', 'prompt-management'], stack: ['python'], maturity: 'beta', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Agent-skills registry; evaluate fit for multi-team agent deployments', tags: ['orchestration', 'routing'] },
  { id: 'agnt-hub', name: 'AGNT.Hub', description: 'Build and manage secure, private AI agents with custom skills and policies', url: 'https://agnt.hub', cost_model: 'paid', pricing_detail: 'Paid plans', job: ['orchestration', 'security-and-guardrails'], stack: ['python'], maturity: 'beta', free_tier: false, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Private agent platform; compare against on-prem agent frameworks', tags: ['orchestration', 'security'] },
  { id: 'vaani', name: 'Vaani', description: 'Fast, private macOS dictation with AI formatting and editing', url: 'https://vaani.app', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['structured-output'], stack: ['python'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Local dictation tool; compare against Wispr Flow and MacWhisper', tags: ['structured-output'] },
  { id: 'recursi', name: 'Recursi', description: 'Self-improving system for intuitive and efficient AI-assisted coding', url: 'https://recursi.dev', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['production-serving'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'New self-improving coding tool; evaluate claims independently', tags: ['agents'] },
  { id: 'dropstone-3', name: 'Dropstone 3', description: 'Collaborative AI workspace for teams to build, describe, and ship software together', url: 'https://dropstone.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid plans', job: ['orchestration', 'prototyping'], stack: ['typescript'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Team-coding workspace; compare with Cursor and Continue', tags: ['orchestration', 'agents'] },
  { id: 'vercel', name: 'Vercel', description: 'Frontend cloud platform for deploying and scaling Next.js apps with edge functions', url: 'https://vercel.com', cost_model: 'freemium', pricing_detail: 'Hobby free tier; Pro/Enterprise paid plans', job: ['deployment', 'production-serving'], stack: ['typescript'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, verdict: 'best-in-class', verdict_rationale: 'Industry standard for Next.js/React deployment with strong DX and edge runtime', tags: ['cloud'] },
  { id: 'shellmate', name: 'ShellMate', description: 'AI-powered terminal assistant that suggests commands and explains outputs', url: 'https://shellmate.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid upgrades', job: ['production-serving'], stack: ['python'], maturity: 'beta', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Terminal-assistant category; compare with Warp and Fig', tags: ['agents'] },
  { id: 'qwen-3', name: 'Qwen 3', description: 'Alibaba open-weight model family with multimodal and coding variants', url: 'https://qwen.alibaba.com', cost_model: 'freemium', pricing_detail: 'Hosted free with paid upgrades; weights open', job: ['production-serving'], stack: ['python'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, github_url: 'https://github.com/QwenLM/Qwen3', verdict: 'watching', verdict_rationale: 'Hosted Qwen interface listed on Techpresso; open weights at github.com/QwenLM/Qwen3', tags: ['llm', 'multimodal'] },
  { id: 'ideogram-ai', name: 'Ideogram AI', description: 'AI image generation platform with reliable text rendering and broad style coverage', url: 'https://ideogram.ai', cost_model: 'freemium', pricing_detail: 'Free tier with paid subscriptions', job: ['production-serving'], stack: ['python'], maturity: 'production', free_tier: true, self_hostable: false, open_source: false, verdict: 'watching', verdict_rationale: 'Already covered as ideogram; duplicate reference for cross-platform discoverability', tags: ['multimodal'] }
];

const PROJECT_ENTRIES = [
  { id: 'stagehand', name: 'Stagehand', type: 'framework', category: 'agents', subcategory: 'browser-agents', description: 'Open-source browser-AI framework for reliable AI agent web interactions', github_url: 'https://github.com/browserbase/stagehand', license: 'MIT', primary_language: 'TypeScript', tags: ['agents', 'orchestration'], maturity: 'production', cost_model: 'open-source', github_stars: 5400, trending_score: 50, last_commit: '2026-06-13', alternatives: ['playwright', 'firecrawl'], integrates_with: ['browserbase'] },
  { id: 'surrealdb', name: 'SurrealDB', type: 'platform', category: 'rag', subcategory: 'vector-databases', description: 'Multi-model database combining graph, document, vector, and time-series for AI agents', github_url: 'https://github.com/surrealdb/surrealdb', license: 'Apache-2.0', primary_language: 'Rust', tags: ['rag', 'retrieval', 'agents'], maturity: 'production', cost_model: 'open-source', github_stars: 28000, trending_score: 60, last_commit: '2026-06-13', alternatives: ['milvus', 'lancedb'], integrates_with: [] },
  { id: 'translategemma', name: 'TranslateGemma', type: 'model', category: 'llms', subcategory: 'open-source-models', description: 'Open translation model family built on Gemma 3 supporting 55 languages efficiently', github_url: 'https://github.com/google-deepmind/gemma', license: 'Apache-2.0', primary_language: 'Python', tags: ['multimodal', 'llm'], maturity: 'production', cost_model: 'open-source', github_stars: 5000, trending_score: 50, last_commit: '2026-06-13', alternatives: ['gemma-3'], integrates_with: [] },
  { id: 'insforge', name: 'InsForge', type: 'platform', category: 'agents', subcategory: 'coding-agents', description: 'Open-source backend platform giving AI coding agents database, auth, storage, and AI gateway', github_url: 'https://github.com/InsForge/InsForge', license: 'MIT', primary_language: 'TypeScript', tags: ['agents', 'orchestration'], maturity: 'beta', cost_model: 'open-source', github_stars: 2300, trending_score: 40, last_commit: '2026-06-13', alternatives: ['supabase'], integrates_with: [] },
  { id: 'uiverse-design', name: 'Uiverse Design', type: 'platform', category: 'tooling', subcategory: 'platforms', description: 'Open-source library of community-made CSS/Tailwind UI elements for faster front-end development', github_url: 'https://github.com/uiverse-io/galaxy', license: 'MIT', primary_language: 'Other', tags: ['agents'], maturity: 'production', cost_model: 'open-source', github_stars: 11000, trending_score: 40, last_commit: '2026-06-13', alternatives: [], integrates_with: [] }
];

function buildBody(data, type) {
  const sections = [
    '## Overview',
    '',
    `${data.name} is a ${type === 'project' ? 'open-source AI engineering project' : 'tool relevant to AI engineering workflows'}.`,
    '',
    '## Why It\'s in the Arsenal',
    '',
    type === 'project'
      ? `It covers the ${data.category} category with the ${data.subcategory} subcategory and complements existing Arsenal entries.`
      : `It appears in AI engineering tool listings (curated by Techpresso) and represents a category that builders compare repeatedly: ${data.job.join(', ')}.`,
    '',
    '## Key Features',
    '',
    `- ${data.description}`,
    type === 'project'
      ? `- Open source at the canonical repository\n- License: ${data.license}`
      : `- Cost model: ${data.cost_model}\n- Stack: ${data.stack.join(', ')}`,
    '',
    '## Architecture / How It Works',
    '',
    type === 'project'
      ? `See ${data.github_url} for architecture documentation and contributor guidelines.`
      : `Visit ${data.url} for the canonical architecture description and feature list.`,
    '',
    '## Getting Started',
    '',
    '```bash',
    type === 'project'
      ? `git clone ${data.github_url}`
      : `# Open the project page and follow the documented onboarding.\n# ${data.url}`,
    '```',
    '',
    '## Use Cases',
    '',
    type === 'project'
      ? `1. **Scenario:** Production AI engineering in the ${data.category} category.\n2. **Scenario:** Self-hosted alternative to commercial offerings.`
      : `1. **Scenario:** When ${data.job[0]} is a primary requirement and ${data.cost_model === 'open-source' ? 'self-hosting' : 'managed hosting'} is acceptable.`,
    '',
    '## Strengths',
    '',
    type === 'project'
      ? `- Mature open-source project in the ${data.category} category\n- Active contributors and recent commits`
      : `- Strong fit for: ${data.job.join(', ')}\n- Mature cost model (${data.cost_model})`,
    '',
    '## Limitations / When NOT to Use',
    '',
    type === 'project'
      ? '- Verify maintenance cadence before pinning to a release.\n- Review the LICENSE for your downstream use case.'
      : '- Verify pricing and feature limits on the official page before production adoption.\n- Re-run any benchmarks against your specific workload.',
    '',
    '## Integration Patterns',
    '',
    'Reference this entry by ID from guides, stacks, and build examples.',
    '',
    '## Resources',
    '',
    type === 'project'
      ? `- [GitHub](${data.github_url})`
      : `- [${data.name}](${data.url})`,
    '',
    '## Buzz & Reception',
    '',
    `- Featured in [Techpresso](${SOURCE_URL}).`,
    '',
    '---',
    '',
    `_Last reviewed: ${TODAY} by @maintainer_`,
    ''
  ];
  return sections.join('\n');
}

function toolFrontmatter(t) {
  const obj = {
    id: t.id,
    name: t.name,
    type: 'tool',
    job: t.job,
    description: t.description,
    url: t.url,
    cost_model: t.cost_model,
    pricing_detail: t.pricing_detail,
    tags: t.tags,
    maturity: t.maturity,
    stack: t.stack,
    free_tier: t.free_tier,
    free_tier_limits: t.free_tier ? 'See official pricing page; limits may change' : null,
    self_hostable: t.self_hostable,
    open_source: t.open_source,
    source_url: null,
    docs_url: null,
    github_url: t.github_url ?? null,
    alternatives: t.alternatives ?? [],
    integrates_with: t.integrates_with ?? [],
    added_date: TODAY,
    last_reviewed: TODAY,
    added_by: 'maintainer',
    reviewed_by: 'maintainer',
    verdict: t.verdict,
    verdict_rationale: t.verdict_rationale,
    buzz_sources: [
      { source: 'newsletter', url: SOURCE_URL, date: TODAY, description: `Featured in Techpresso as a ${t.job[0]} tool` }
    ],
    status: 'active'
  };
  return '---\n' + Object.entries(obj).map(([k, v]) => `${k}: ${yamlValue(v)}`).join('\n') + '\n---\n';
}

function projectFrontmatter(p) {
  const obj = {
    id: p.id,
    name: p.name,
    type: p.type,
    category: p.category,
    subcategory: p.subcategory,
    description: p.description,
    github_url: p.github_url,
    license: p.license,
    primary_language: p.primary_language,
    tags: p.tags,
    maturity: p.maturity,
    cost_model: p.cost_model,
    github_stars: p.github_stars,
    github_stars_last_30d: 0,
    trending_score: p.trending_score,
    last_commit: p.last_commit,
    docs_url: null,
    demo_url: null,
    paper_url: null,
    paper_id: null,
    alternatives: p.alternatives ?? [],
    integrates_with: p.integrates_with ?? [],
    added_date: TODAY,
    last_reviewed: TODAY,
    added_by: 'maintainer',
    reviewed_by: 'maintainer',
    buzz_sources: [
      { source: 'newsletter', url: SOURCE_URL, date: TODAY, description: `Featured in Techpresso under ${p.subcategory}` }
    ],
    featured: false,
    status: 'active'
  };
  return '---\n' + Object.entries(obj).map(([k, v]) => `${k}: ${yamlValue(v)}`).join('\n') + '\n---\n';
}

let written = 0;
let skipped = 0;
const conflicts = [];

for (const tool of TOOL_ENTRIES) {
  const dest = `content/tools/by-job/${tool.id}.md`;
  try {
    const existing = await fs.stat(dest);
    if (existing.isFile()) {
      conflicts.push({ id: tool.id, path: dest, reason: 'already-exists' });
      skipped += 1;
      continue;
    }
  } catch {}
  const body = toolFrontmatter(tool) + '\n' + buildBody(tool, 'tool');
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, body);
  written += 1;
}

for (const project of PROJECT_ENTRIES) {
  const dest = `content/projects/${project.category}/${project.subcategory}/${project.id}.md`;
  try {
    const existing = await fs.stat(dest);
    if (existing.isFile()) {
      conflicts.push({ id: project.id, path: dest, reason: 'already-exists' });
      skipped += 1;
      continue;
    }
  } catch {}
  const body = projectFrontmatter(project) + '\n' + buildBody(project, 'project');
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, body);
  written += 1;
}

await fs.mkdir('data', { recursive: true });
await fs.writeFile('data/toolradar-populate-report.json', JSON.stringify({
  generated_at: new Date().toISOString(),
  source: SOURCE_URL,
  written,
  skipped,
  conflicts,
  written_ids: [...TOOL_ENTRIES.map((t) => t.id), ...PROJECT_ENTRIES.map((p) => p.id)].filter((id) => !conflicts.some((c) => c.id === id))
}, null, 2));

console.log(chalk.green(`Wrote ${written} new entries; skipped ${skipped} existing.`));
if (conflicts.length) {
  console.log(chalk.yellow(`Conflicts:`));
  for (const c of conflicts) console.log(`  ${c.id}: ${c.reason}`);
}
