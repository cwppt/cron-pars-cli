const cronParse = require('./cronUtils')
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
const chalk = require('chalk')

describe('Unit tests for cron parse', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })
  test('Verify the epected output', () => {
    cronParse(['*/15 0 1,15 * 1-5 /usr/bin/find'])
    expect(console.log.mock.calls[0][0]).toBe('minute         0 15 30 45')
    expect(console.log.mock.calls[1][0]).toBe('hour           0')
    expect(console.log.mock.calls[2][0]).toBe('day of month   1 15')
    expect(console.log.mock.calls[3][0]).toBe(
      'month          1 2 3 4 5 6 7 8 9 10 11 12'
    )
    expect(console.log.mock.calls[4][0]).toBe('day of week    1 2 3 4 5')
    expect(console.log.mock.calls[5][0]).toBe('command        /usr/bin/find')
  })
  test('Verify error for invalid cron', () => {
    cronParse(['a b c d e /usr/bin/find'])
    const expectedString = 'Invalid Cron String'
    expect(console.log).toHaveBeenLastCalledWith(chalk.bold.red(expectedString))
  })
  test('Verify error for incorrect format', () => {
    cronParse(['*/15 0 1,15 * 1-5 /usr/bin/find', 'additional perameter'])
    const expectedString =
      'Unexpected format. The cron command should be passed in a single string'
    expect(console.log).toHaveBeenLastCalledWith(chalk.bold.red(expectedString))
  })
  test('Verify error for empty param', () => {
    cronParse([])
    const expectedString =
      'No cron command found. The cron command should be passed in a single string'
    expect(console.log).toHaveBeenLastCalledWith(chalk.bold.red(expectedString))
  })
  test('Verify error for unsupported cron string', () => {
    cronParse(['0 0 12 ? JAN,FEB,MAR,APR * /usr/bin/find'])
    let expectedString = 'this cron string format is not currently supported'
    expect(console.log).toHaveBeenLastCalledWith(chalk.bold.red(expectedString))
    cronParse(['* * * * * * /usr/bin/find'])
    expectedString = 'this cron string format is not currently supported'
    expect(console.log).toHaveBeenLastCalledWith(chalk.bold.red(expectedString))
    cronParse(['* * * * ? /usr/bin/find'])
    expectedString = 'this cron string format is not currently supported'
    expect(console.log).toHaveBeenLastCalledWith(chalk.bold.red(expectedString))
  })

  test('Verify differing inputs', () => {
    cronParse(['* * * * * /usr/bin/find'])
    expect(console.log.mock.calls[0][0]).toBe(
      'minute         0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59'
    )
    expect(console.log.mock.calls[1][0]).toBe(
      'hour           0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23'
    )
    expect(console.log.mock.calls[2][0]).toBe(
      'day of month   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31'
    )
    expect(console.log.mock.calls[3][0]).toBe(
      'month          1 2 3 4 5 6 7 8 9 10 11 12'
    )
    expect(console.log.mock.calls[4][0]).toBe('day of week    0 1 2 3 4 5 6')
    expect(console.log.mock.calls[5][0]).toBe('command        /usr/bin/find')
    consoleSpy.mockClear()
    cronParse(['* * * JAN MON /usr/bin/find'])
    expect(console.log.mock.calls[0][0]).toBe(
      'minute         0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59'
    )
    expect(console.log.mock.calls[1][0]).toBe(
      'hour           0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23'
    )
    expect(console.log.mock.calls[2][0]).toBe(
      'day of month   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31'
    )
    expect(console.log.mock.calls[3][0]).toBe('month          1')
    expect(console.log.mock.calls[4][0]).toBe('day of week    1')
    expect(console.log.mock.calls[5][0]).toBe('command        /usr/bin/find')
  })
})
