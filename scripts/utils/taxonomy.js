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
    researchPhases: sections.get('Research Phases') ?? new Set(),
    researchVenues: sections.get('Research Venues') ?? new Set(),
    practicalApplicability: sections.get('Practical Applicability') ?? new Set(),
    reproductionStatus: sections.get('Reproduction Status') ?? new Set(),
    researchResultStatus: sections.get('Research Result Status') ?? new Set(),
    tipCategories: sections.get('Tip Categories') ?? new Set(),
    tipPhases: sections.get('Tip Phases') ?? new Set(),
    tipEffort: sections.get('Tip Effort') ?? new Set(),
    tipVerificationStatus: sections.get('Tip Verification Status') ?? new Set(),
    toolJobs: sections.get('Tool Jobs') ?? new Set(),
    toolPhases: sections.get('Tool Phases') ?? new Set(),
    toolAudience: sections.get('Tool Audience') ?? new Set(),
    buildExamplePhases: sections.get('Build Example Phases') ?? new Set(),
    buildDifficulties: sections.get('Build Example Difficulty') ?? new Set(),
    buildExampleStatus: sections.get('Build Example Status') ?? new Set(),
    buildExampleOutcome: sections.get('Build Example Outcome') ?? new Set(),
    observabilityCategories: sections.get('Observability Categories') ?? new Set(),
    signalTypes: sections.get('Signal Types') ?? new Set(),
    dataSensitivity: sections.get('Data Sensitivity') ?? new Set(),
    deploymentScope: sections.get('Deployment Scope') ?? new Set(),
    observabilityVerificationStatus: sections.get('Verification Status') ?? new Set(),
    architectureCategories: sections.get('Architecture Categories') ?? new Set(),
    architectureDecisionType: sections.get('Architecture Decision Type') ?? new Set(),
    architectureTradeoffDimensions: sections.get('Architecture Tradeoff Dimensions') ?? new Set(),
    architectureConfidence: sections.get('Architecture Confidence') ?? new Set(),
    communityEntityKinds: sections.get('Community Entity Kinds') ?? new Set(),
    communityTopics: sections.get('Community Topics') ?? new Set(),
    communityAudience: sections.get('Community Audience') ?? new Set(),
    communityActivityLevel: sections.get('Community Activity Level') ?? new Set(),
    communitySafetyLevel: sections.get('Community Safety Level') ?? new Set(),
    communityAccess: sections.get('Community Access') ?? new Set(),
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
