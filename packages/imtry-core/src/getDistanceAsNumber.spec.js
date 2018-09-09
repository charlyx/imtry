import { getDistanceAsNumber } from './getDistanceAsNumber'

describe('getDistanceAsNumber', () => {
  it('should return number meters', () => {
    expect(getDistanceAsNumber('36 m')).toBe(36)
  })
})
