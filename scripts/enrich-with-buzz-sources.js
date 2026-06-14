#!/usr/bin/env node
// Enrich existing entries with buzz_sources citations from the Techpresso page.
// This adds a soft signal that the tool was recently featured in a curated
// newsletter, which feeds into trending-score calculations and search facets.

import fs from 'node:fs/promises';

import matter from 'gray-matter';
import chalk from 'chalk';

const SOURCE_URL = 'https://toolradar.com/featured/techpresso';
const TODAY = new Date().toISOString().slice(0, 10);

const ENRICHMENTS = [
  // Map of: filepath -> { source description, ... }
  ['content/tools/by-job/playwright.md', 'Featured in Techpresso as a developer tool used for browser automation'],
  ['content/tools/by-job/instructor.md', 'Featured in Techpresso as a structured-output library used by AI engineers'],
  ['content/projects/rag/document-processing/firecrawl.md', 'Featured in Techpresso (including Firecrawl MCP variant) as an LLM-ready data extraction tool']
];

let updated = 0;
let unchanged = 0;

for (const [filePath, description] of ENRICHMENTS) {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data ?? {};

  if (!Array.isArray(data.buzz_sources)) data.buzz_sources = [];

  // Avoid duplicate citations.
  const already = data.buzz_sources.some((b) => b?.url === SOURCE_URL);
  if (already) {
    unchanged += 1;
    continue;
  }

  data.buzz_sources.push({
    source: 'newsletter',
    url: SOURCE_URL,
    date: TODAY,
    description
  });

  await fs.writeFile(filePath, matter.stringify(parsed.content, data));
  console.log(chalk.green(`+ ${filePath}`));
  updated += 1;
}

console.log(chalk.green(`Updated ${updated} entries; ${unchanged} unchanged.`));
