import fetch from 'node-fetch'
import { fetchJSON } from './fetchJSON'

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
    fetch.mockReturnValue({ ok: true, json: () => ({ some: 'json' }) })

    const result = await fetchJSON('someResource')

    expect(result).toEqual({ some: 'json' })
  })
})

jest.mock('node-fetch')
