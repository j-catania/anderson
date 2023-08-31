#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { name, description, version } = require('../package.json');

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version)
  .action(() => {
    console.log('coucou');
  });

program.parse();
