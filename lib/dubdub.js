'use strict'

const chalk = require('chalk')
const tests = []

exports.test = (name, fn) => {
  tests.push([name, fn])
}

async function start () {
  console.log(`Running ${tests.length} ${tests.length === 1 ? 'test' : 'tests'}...`)
  for (let [name, fn] of tests) {
    try {
      console.log(`  Running ${name}`)
      await fn()
    } catch (err) {
      process.stderr.write(chalk.bold.red(`✖ Error running ${name}`) + `\n${err.stack}\n`)
      process.exit(1)
    }
  }
  console.log(chalk`{bold.green ✔ All tests successful}`)
}

process.nextTick(start)
process.on('unhandledRejection', err => { throw err })
