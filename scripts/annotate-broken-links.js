#!/usr/bin/env node
// Surface confirmed-broken links as GitHub Actions annotations.
//
// `pnpm run validate:links` already fails the job, but its findings only exist
// in the step log, which needs repo access to read. A contributor who cannot
// fetch Actions logs sees a red X on a 14-minute job with no indication of
// which URL failed. Annotations ride on the check run itself, so the offending
// URL and the file that contains it are visible in the PR's checks view.
//
// Reads the report the link checker writes (`data/link-check-report.json`) and
// emits one annotation per broken URL, capped so a pathological run cannot
// flood the UI. Exits 0 either way: the link check already set the job status.
import fs from 'node:fs/promises';

export const MAX_ANNOTATIONS = 20;

// Escape the characters GitHub's workflow-command parser treats as syntax, so a
// URL containing `%`, CR or LF cannot break out of the annotation.
export function escapeAnnotation(value) {
  return String(value ?? '')
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A');
}

// One line per broken URL: `file (status) url`. Falls back to a file-less
// annotation when the checker could not attribute the URL to a file.
export function formatAnnotations(report) {
  const broken = Array.isArray(report?.broken_links) ? report.broken_links : [];
  return broken.slice(0, MAX_ANNOTATIONS).map((item) => {
    const status = item.status ?? item.error ?? 'unknown';
    const files = Array.isArray(item.files) ? item.files.filter(Boolean) : [];
    const body = `broken link (${status}): ${item.url}`;
    if (!files.length) return `::error title=Broken link::${escapeAnnotation(body)}`;
    return files
      .map((file) => `::error file=${escapeAnnotation(file)},title=Broken link::${escapeAnnotation(body)}`)
      .join('\n');
  });
}

async function main(reportPath = 'data/link-check-report.json') {
  let report;
  try {
    report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
  } catch (error) {
    console.log(`::warning title=Link report unavailable::${escapeAnnotation(`could not read ${reportPath}: ${error.message}`)}`);
    return;
  }
  const total = Array.isArray(report?.broken_links) ? report.broken_links.length : 0;
  const annotations = formatAnnotations(report);
  if (!annotations.length) {
    console.log(`Link report contains no confirmed-broken URLs (${reportPath}).`);
    return;
  }
  for (const annotation of annotations) console.log(annotation);
  if (total > MAX_ANNOTATIONS) console.log(`::warning title=Broken links truncated::${total - MAX_ANNOTATIONS} further broken URL(s) are in ${reportPath}.`);
}

if (process.argv[1] && process.argv[1].endsWith('annotate-broken-links.js')) await main();
