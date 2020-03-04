#!/usr/bin/env node

const program = require('commander')
const version = require('./lib/version')
const { syncWrapper } = require('./cli/syncWrapper')
const { cleanWrapper } = require('./cli/cleanWrapper')

program.version(version.show())

program
  .command('sync')
  .description('Synchronizes the infrastructure.')
  .option('-c, --config [config] (required)', 'Path to config file.')
  .action(syncWrapper)

program
  .command('clean')
  .description('Removes all the resources.')
  .option('-c, --config [config] (required)', 'Path to config file.')
  .action(cleanWrapper)

program.allowUnknownOption(false)

const parsed = program.parse(process.argv)
if (
  !parsed ||
  !(
    parsed.args &&
    parsed.args.length > 0 &&
    typeof (parsed.args[0] === 'object')
  )
) {
  program.outputHelp()
}
