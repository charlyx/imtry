import { getTempsAsNumber } from './getTempsAsNumber'

describe('getTempsAsNumber', () => {
  it('should return number of minutes', () => {
    expect(getTempsAsNumber('3 mn 30')).toBe(3)
  })

  it('should return 0 when departure is close', () => {
    expect(getTempsAsNumber('horaire.proche')).toBe(0)
  })
})
