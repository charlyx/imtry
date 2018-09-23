import nock from 'nock'
import { API } from './const'
import { getCodeLieu } from './getCodeLieu'

describe('getCodeLieu', () => {
  beforeEach(mockArrets)

  it('should return "codeLieu" for Croix Bonneau', async () => {
    const codeLieu = await getCodeLieu('Croix Bonneau')

    expect(codeLieu).toBe('XBON')
  })

  it('should return "codeLieu" for croix bonneau', async () => {
    const codeLieu = await getCodeLieu('croix bonneau')

    expect(codeLieu).toBe('XBON')
  })

  it('should throw an error saying "Coult not find station 9¾"', async () => {
    expect.assertions(1)
    const hiddenStation = '9¾'

    try {
      await getCodeLieu(hiddenStation)
    } catch (e) {
      expect(e).toEqual(Error(`Could not find station ${hiddenStation}`))
    }
  })
})

function mockArrets() {
  nock(API)
    .get('/arrets.json')
    .reply(200, [
      {"codeLieu":"XBON","libelle":"Croix Bonneau","distance":null,"ligne":[
        {"numLigne":"1"},
        {"numLigne":"11"},
        {"numLigne":"LU"}
      ]},
      {"codeLieu":"XJAN","libelle":"Croix Jeannette","distance":null,"ligne":[{"numLigne":"36"}]},
      {"codeLieu":"XTRU","libelle":"Croix Truin","distance":null,"ligne":[{"numLigne":"78"}]},
      {"codeLieu":"XREZ","libelle":"Croix de Rezé","distance":null,"ligne":[
        {"numLigne":"30"},
        {"numLigne":"98"}
      ]},
      {"codeLieu":"CRME","libelle":"Crémetterie","distance":null,"ligne":[{"numLigne":"23"}]},
    ])
}
