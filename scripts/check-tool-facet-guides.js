#!/usr/bin/env node
import fs from 'node:fs/promises';
import { FACETS, expectedBelowMarker, MARKER } from './generate-tool-facet-guides.js';

async function main() {
  let failed = false;
  for (const { facetType, facet, path: facetPagePath } of FACETS) {
    let raw;
    try {
      raw = await fs.readFile(facetPagePath, 'utf8');
    } catch {
      console.error(`Facet guide out of date; run generate-tool-facet-guides.js (missing file: ${facetPagePath})`);
      failed = true;
      continue;
    }
    const idx = raw.indexOf(MARKER);
    if (idx === -1) {
      console.error(`Facet guide out of date; run generate-tool-facet-guides.js (missing marker: ${facetPagePath})`);
      failed = true;
      continue;
    }
    const fileBelow = raw.slice(idx + MARKER.length);
    const expected = await expectedBelowMarker(facetType, facet);
    if (fileBelow.trimEnd() !== expected.trimEnd()) {
      console.error(`Facet guide out of date; run generate-tool-facet-guides.js (stale table: ${facetPagePath})`);
      failed = true;
    }
  }
  if (failed) {
    console.error('Facet guide out of date; run generate-tool-facet-guides.js');
    process.exit(1);
  }
  console.log('All tool facet guides are up to date.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
