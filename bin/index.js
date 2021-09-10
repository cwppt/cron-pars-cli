const yargs = require('yargs')
const cronParse = require('./cronUtils')

cronParse(yargs.argv._)
