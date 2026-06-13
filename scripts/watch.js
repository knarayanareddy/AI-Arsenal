#!/usr/bin/env node
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import chalk from 'chalk';

let running = false;
let queued = false;
function run() {
  if (running) { queued = true; return; }
  running = true;
  console.log(chalk.cyan('Running validation...'));
  const child = spawn('node', ['scripts/validate-schema.js'], { stdio: 'inherit' });
  child.on('exit', () => {
    running = false;
    if (queued) { queued = false; run(); }
  });
}

for (const dir of ['content', 'schemas', 'scripts', 'templates']) {
  if (fs.existsSync(dir)) fs.watch(dir, { recursive: true }, () => run());
}
run();
console.log(chalk.green('Watching content, schemas, scripts, and templates. Press Ctrl+C to stop.'));
