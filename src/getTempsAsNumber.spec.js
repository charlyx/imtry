const { getTempsAsNumber } = require('./getTempsAsNumber')

describe('getTempsAsNumber', () => {
  it('should return number of minutes', () => {
    expect(getTempsAsNumber('3 mn 30')).toBe(3)
  })
})
