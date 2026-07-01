import fs from 'node:fs/promises';

function valuesInBackticks(line) {
  return [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
}

export async function parseTaxonomy(filePath = 'TAXONOMY.md') {
  const text = await fs.readFile(filePath, 'utf8');
  const sections = new Map();
  let current = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = heading[1].replace(/\s*\(.+\)$/, '').trim();
      sections.set(current, new Set());
      continue;
    }
    if (!current || !line) continue;
    for (const value of valuesInBackticks(line)) sections.get(current).add(value);
  }

  const tagSections = ['Domain Tags', 'Capability Tags', 'Infrastructure Tags', 'Stack Tags', 'Quality Tags'];
  const allTags = new Set();
  for (const rawLine of text.split(/\r?\n/)) {
    // Subheading-aware pass for ### tag groups.
  }

  let inTagTaxonomy = false;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.startsWith('## Tag Taxonomy')) {
      inTagTaxonomy = true;
      continue;
    }
    if (inTagTaxonomy && line.startsWith('## ') && !line.startsWith('## Tag Taxonomy')) break;
    if (inTagTaxonomy) valuesInBackticks(line).forEach((v) => allTags.add(v));
  }

  return {
    sections,
    entryTypes: sections.get('Entry Types') ?? new Set(),
    projectCategories: sections.get('Project Categories') ?? new Set(),
    projectSubcategories: sections.get('Project Subcategories') ?? new Set(),
    projectArtifactTypes: sections.get('Project Artifact Types') ?? new Set(),
    projectPhases: sections.get('Project Phases') ?? new Set(),
    projectDomains: sections.get('Project Domains') ?? new Set(),
    projectRelationToStack: sections.get('Project Relation to Stack') ?? new Set(),
    projectHealthSignals: sections.get('Project Health Signals') ?? new Set(),
    paperCategories: sections.get('Paper Categories') ?? new Set(),
    tipCategories: sections.get('Tip Categories') ?? new Set(),
    toolJobs: sections.get('Tool Jobs') ?? new Set(),
    toolPhases: sections.get('Tool Phases') ?? new Set(),
    toolAudience: sections.get('Tool Audience') ?? new Set(),
    buildDifficulties: sections.get('Build Example Difficulty Levels') ?? new Set(),
    maturityLevels: sections.get('Maturity Levels') ?? new Set(),
    costModels: sections.get('Cost Models') ?? new Set(),
    stackLanguages: sections.get('Stack / Language') ?? new Set(),
    primaryLanguages: sections.get('Primary Languages') ?? new Set(),
    verdictValues: sections.get('Verdict Values') ?? new Set(),
    importanceValues: sections.get('Importance Values') ?? new Set(),
    impactValues: sections.get('Impact Values') ?? new Set(),
    difficultyValues: sections.get('Difficulty Values') ?? new Set(),
    statusValues: sections.get('Status Values') ?? new Set(),
    buzzSources: sections.get('Buzz Sources') ?? new Set(),
    enrichmentStatusValues: sections.get('Enrichment Status') ?? new Set(),
    reservedIds: sections.get('Reserved IDs') ?? new Set(),
    allTags
  };
}

export function requireAllowed(errors, file, field, value, allowedSet) {
  if (value === undefined || value === null) return;
  if (!allowedSet.has(value)) {
    errors.push(`${file}: ${field}=${JSON.stringify(value)} is not declared in TAXONOMY.md`);
  }
}

export function requireAllowedArray(errors, file, field, values, allowedSet) {
  if (!Array.isArray(values)) return;
  for (const value of values) requireAllowed(errors, file, field, value, allowedSet);
}
