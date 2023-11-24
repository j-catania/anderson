#!/usr/bin/env node

import { Command } from 'commander'
import { createRequire } from 'module'
import eMusk from './services/eMusk.js'

const require = createRequire(import.meta.url)
const { name, description, version } = require('../package.json')

const program = new Command()

program
  .name(name)
  .description(description)
  .version(version, '-v, --version', 'output the current version')
  .option('-f, --config-file <confFile>', 'Config file', './emusk.json')
  .option('-h, --no-hello', 'Don\'t say hello to notifiers')
  .option('-V, --verbose', 'Active more logs')
  .action(eMusk.start)

program.parse()

const exitHandler = () => {
  eMusk.stop().finally(process.exit)
}

// do something when app is closing
process.on('exit', exitHandler)
// catches ctrl+c event
process.on('SIGINT', exitHandler)
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)
// catches uncaught exceptions
process.on('uncaughtException', exitHandler)
