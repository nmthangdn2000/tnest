#!/usr/bin/env node

import { Command } from 'commander';
import { main } from './method.js';

const program = new Command();

program.name('tnest').description('CLi generates schema, controller, and service files according to the name you enter').version('0.0.1');

program
  .command('g')
  .argument('<name>', 'file name')
  .argument('[path_folder]', 'path folder if null is src/. For example: src/apis or apis')
  .description('CLi generates schema, controller, and service files according to the name you enter')
  .option('-g, --genera', 'genera a folder')
  .action(main);

program.parse();
