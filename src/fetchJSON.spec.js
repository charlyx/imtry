const fetch = require('node-fetch')
const { fetchJSON } = require('./fetchJSON')

describe('fetchJSON', () => {
  it('should throw an error saying "Service unavailable"', async () => {
    expect.assertions(1)
    fetch.mockReturnValue({ ok: false })

    try {
      await fetchJSON('someResource')
    } catch (e) {
      expect(e).toEqual(Error('Service unavailable'))
    }
  })

  it('should return json', async () => {
    // eslint-disable-next-line newline-after-var
    const someJson = { some: 'json' }
    fetch.mockReturnValue({ ok: true, json: () => someJson })

    const result = await fetchJSON('someResource')

    expect(result).toEqual(someJson)
  })
})

jest.mock('node-fetch')
