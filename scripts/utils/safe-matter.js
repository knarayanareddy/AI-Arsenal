import matter from 'gray-matter';
import yaml from 'js-yaml';

// Hardened front-matter parsing.
//
// gray-matter@4 bundles js-yaml@3.14.2, whose parser is exposed to
// contributor-supplied YAML at PR/CI time and carries a known
// alias-expansion / entity-expansion DoS class. This wrapper routes every
// gray-matter call through js-yaml@4's safe `load`/`dump` (no `!!js/*` code
// execution) and adds two guards the parser does not provide:
//
//   1. a hard byte cap on the front-matter block; and
//   2. rejection of YAML anchors (`&`), aliases (`*`) and merge keys (`<<`),
//      which are the vectors for exponential alias expansion.
//
// The repo's legitimate front-matter uses none of these, so the guards are
// zero-cost in practice while removing the DoS surface. A matching pnpm
// override forces the transitive js-yaml to v4 so the vulnerable 3.x parser is
// gone from the tree entirely; because every call supplies this engine,
// gray-matter never invokes its (v3-only `safeLoad`) default engine.

export const MAX_FRONTMATTER_BYTES = 64 * 1024;

// Matches a YAML anchor/alias token (`&name` / `*name`) or a merge key (`<<:`)
// at a token boundary, while ignoring `*`/`&` that appear inside quoted
// scalars. Front-matter blocks here are small and flat, so a conservative
// line-oriented scan is sufficient and safe.
const ALIAS_TOKEN = /(^|[\s:[{,])[&*][A-Za-z0-9_]/;
const MERGE_KEY = /(^|\s)<<\s*:/;

export function assertSafeFrontmatter(source) {
  const text = String(source ?? '');
  if (Buffer.byteLength(text, 'utf8') > MAX_FRONTMATTER_BYTES) {
    throw new Error(`front-matter exceeds the ${MAX_FRONTMATTER_BYTES}-byte limit`);
  }
  for (const line of text.split(/\r?\n/)) {
    const withoutQuotes = line.replace(/"(?:[^"\\]|\\.)*"|'(?:[^']|'')*'/g, '');
    if (ALIAS_TOKEN.test(withoutQuotes) || MERGE_KEY.test(withoutQuotes)) {
      throw new Error('front-matter must not use YAML anchors, aliases, or merge keys');
    }
  }
}

const yamlEngine = {
  parse(source) {
    assertSafeFrontmatter(source);
    return yaml.load(source) ?? {};
  },
  stringify(data) {
    return yaml.dump(data, { lineWidth: -1, noRefs: true });
  }
};

const SAFE_OPTIONS = { engines: { yaml: yamlEngine }, language: 'yaml' };

function withSafeOptions(options) {
  if (!options) return SAFE_OPTIONS;
  return { ...SAFE_OPTIONS, ...options, engines: { ...SAFE_OPTIONS.engines, ...(options.engines ?? {}) } };
}

function safeMatter(input, options) {
  return matter(input, withSafeOptions(options));
}

safeMatter.stringify = (content, data, options) => matter.stringify(content, data, withSafeOptions(options));
safeMatter.read = (filepath, options) => matter.read(filepath, withSafeOptions(options));
safeMatter.test = matter.test;

export default safeMatter;
