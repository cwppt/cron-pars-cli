const Cron = require('cron-converter')
const cronValidator = require('cron-validator')
const { each, isEmpty } = require('lodash')
const chalk = require('chalk')

const cronVerter = new Cron()

const cronParse = (unformattedOptions) => {
  try {
    if (unformattedOptions.length > 1) {
      throw Error(
        'Unexpected format. The cron command should be passed in a single string'
      )
    }
    if (isEmpty(unformattedOptions)) {
      throw Error(
        'No cron command found. The cron command should be passed in a single string'
      )
    }
    const paramArray = unformattedOptions[0].split(' ')
    const command = paramArray.pop()
    const cronString = paramArray.join(' ')
    if (
      !cronValidator.isValidCron(cronString, {
        alias: true,
        allowBlankDay: true,
        seconds: true
      })
    ) {
      throw Error('Invalid Cron String')
    }
    let parseCronArray
    try {
      cronVerter.fromString(cronString)
      parseCronArray = cronVerter.toArray()
    } catch (err) {
      throw Error('this cron string format is not currently supported')
    }
    const cronTitle = [
      'minute',
      'hour',
      'day of month',
      'month',
      'day of week',
      'command'
    ]
    each(parseCronArray, (chronValues, i) => {
      console.log(`${cronTitle[i].padEnd(14, ' ')} ${chronValues.join(' ')}`)
    })
    console.log(`${cronTitle[5].padEnd(14, ' ')} ${command}`)
  } catch (err) {
    console.log(chalk.bold.red(err.message))
  }
}

module.exports = cronParse
