#!/usr/bin/env node
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType } from './utils/frontmatter.js';
import { parseTaxonomy, requireAllowed, requireAllowedArray } from './utils/taxonomy.js';
import { getChangedMarkdownFiles, isContentEntryCandidate } from './utils/changed-files.js';

const changedOnly = process.argv.includes('--changed-only');
const taxonomy = await parseTaxonomy();
const files = await getEntryFiles(changedOnly ? getChangedMarkdownFiles().filter(isContentEntryCandidate) : null);
const errors = [];
let checked = 0;

for (const file of files) {
  const { data, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter) continue; // validate-schema reports this.
  const type = inferEntryType(file, data);

  if (data.id && taxonomy.reservedIds.has(data.id) && type !== 'guide') {
    errors.push(`${file}: id=${JSON.stringify(data.id)} is reserved in TAXONOMY.md`);
  }
  requireAllowedArray(errors, file, 'tags', data.tags, taxonomy.allTags);
  requireAllowed(errors, file, 'maturity', data.maturity, taxonomy.maturityLevels);
  requireAllowed(errors, file, 'cost_model', data.cost_model, taxonomy.costModels);
  requireAllowed(errors, file, 'status', data.status, taxonomy.statusValues);

  if (type === 'project') {
    requireAllowed(errors, file, 'artifact_type', data.artifact_type, taxonomy.projectArtifactTypes);
    requireAllowed(errors, file, 'category', data.category, taxonomy.projectCategories);
    requireAllowed(errors, file, 'subcategory', data.subcategory, taxonomy.projectSubcategories);
    requireAllowed(errors, file, 'primary_language', data.primary_language, taxonomy.primaryLanguages);
    requireAllowed(errors, file, 'phase', data.phase, taxonomy.projectPhases);
    requireAllowedArray(errors, file, 'domain', data.domain, taxonomy.projectDomains);
    requireAllowedArray(errors, file, 'relation_to_stack', data.relation_to_stack, taxonomy.projectRelationToStack);
    requireAllowedArray(errors, file, 'health_signals', data.health_signals, taxonomy.projectHealthSignals);
    requireAllowed(errors, file, 'enrichment_status', data.enrichment_status, taxonomy.enrichmentStatusValues);
    for (const buzz of data.buzz_sources ?? []) requireAllowed(errors, file, 'buzz_sources.source', buzz.source, taxonomy.buzzSources);
  }

  if (type === 'tool') {
    requireAllowedArray(errors, file, 'job', data.job, taxonomy.toolJobs);
    requireAllowedArray(errors, file, 'stack', data.stack, taxonomy.stackLanguages);
    requireAllowed(errors, file, 'verdict', data.verdict, taxonomy.verdictValues);
    requireAllowed(errors, file, 'phase', data.phase, taxonomy.toolPhases);
    requireAllowedArray(errors, file, 'audience', data.audience, taxonomy.toolAudience);
    requireAllowed(errors, file, 'enrichment_status', data.enrichment_status, taxonomy.enrichmentStatusValues);
  }

  if (type === 'paper') {
    requireAllowed(errors, file, 'category', data.category, taxonomy.paperCategories);
    requireAllowed(errors, file, 'importance', data.importance, taxonomy.importanceValues);

    // Research-vertical reorganisation: additional taxonomy fields, checked
    // only once an entry carries the new `phase` field (i.e. is migrated).
    if (data.phase) {
      requireAllowed(errors, file, 'phase', data.phase, taxonomy.researchPhases);
      requireAllowed(errors, file, 'practical_applicability', data.practical_applicability, taxonomy.practicalApplicability);
      requireAllowed(errors, file, 'reproduction_status', data.reproduction_status, taxonomy.reproductionStatus);
      requireAllowed(errors, file, 'result_status', data.result_status, taxonomy.researchResultStatus);
      requireAllowed(errors, file, 'enrichment_status', data.enrichment_status, taxonomy.enrichmentStatusValues);
      // `venue` accepts either the old free-text shape or the new controlled
      // vocabulary during migration (see schemas/research.schema.json's
      // x-migration-note); only enforce the enum if the value looks like it
      // is already using the new lowercase-kebab vocabulary.
      if (typeof data.venue === 'string' && /^[a-z0-9-]+$/.test(data.venue)) {
        requireAllowed(errors, file, 'venue', data.venue, taxonomy.researchVenues);
      }
    }
  }

  if (type === 'tip') {
    requireAllowed(errors, file, 'category', data.category, taxonomy.tipCategories);
    requireAllowed(errors, file, 'difficulty', data.difficulty, taxonomy.difficultyValues);
    requireAllowed(errors, file, 'impact', data.impact, taxonomy.impactValues);
  }

  if (type === 'build-example') requireAllowed(errors, file, 'difficulty', data.difficulty, taxonomy.buildDifficulties);
  checked += 1;
}

if (errors.length) {
  console.error(chalk.red(`Taxonomy validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}

console.log(chalk.green(`Taxonomy validation passed. Checked ${checked} content entr${checked === 1 ? 'y' : 'ies'}.`));
