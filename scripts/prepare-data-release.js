#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';

const outDir = process.argv.find((arg) => arg.startsWith('--out='))?.split('=')[1] ?? '.data-release';
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const files = await fs.readdir('data');
let copied = 0;
for (const file of files) {
  if (!file.endsWith('.json')) continue;
  await fs.copyFile(path.join('data', file), path.join(outDir, file));
  copied += 1;
}

await fs.writeFile(path.join(outDir, 'README.md'), `# AI Arsenal Data Release\n\nThis branch contains generated AI Arsenal JSON data files published for static consumers such as the future UI repository.\n\nCanonical examples:\n\n- \`index.json\`\n- \`projects.json\`\n- \`tools.json\`\n- \`search-index.json\`\n- \`tags.json\`\n- \`stats.json\`\n\nGenerated at: ${new Date().toISOString()}\n\nSource branch: main\n\nDo not edit this branch manually. It is overwritten by the \`data-refresh.yml\` workflow.\n`);

await fs.writeFile(path.join(outDir, '.nojekyll'), '');
console.log(chalk.green(`Prepared ${copied} JSON file(s) in ${outDir}`));
