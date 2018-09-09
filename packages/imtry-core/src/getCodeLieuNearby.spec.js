import nock from 'nock'
import { API } from './const'
import { getCodeLieuNearby } from './getCodeLieuNearby'

const latitude = 47.2099320
const longitude = -1.595829

const farLatitude = 51.530876
const farLongitude = -0.125784

describe('getCodeLieuNearby', () => {
  let codeLieu = ''

  beforeEach(mockArrets)

  it('should return "XBON', async () => {
    codeLieu = await getCodeLieuNearby(latitude, longitude)

    expect(codeLieu).toBe('XBON')
  })

  it('should throw an error saying "Vous êtes à plus de 500 mètres d\'un arrêt de tram."', async () => {
    expect.assertions(1)

    try {
      await getCodeLieuNearby(farLatitude, farLongitude)
    } catch (e) {
      expect(e).toEqual(Error('Vous êtes à plus de 500 mètres d\'un arrêt de tram.'))
    }
  })
})

function mockArrets() {
  nock(API)
    .get(`/arrets.json/${latitude.toString().replace('.',',')}/${longitude.toString().replace('.',',')}`)
    .reply(200, [
      {"codeLieu":"XBON","libelle":"Croix Bonneau","distance":"36 m","ligne":[
        {"numLigne":"1"},
        {"numLigne":"11"},
        {"numLigne":"LU"},
      ]},
      {"codeLieu":"BDRI","libelle":"Bourderies","distance":"366 m","ligne":[{"numLigne":"11"}]},
      {"codeLieu":"PBER","libelle":"Paul Bert","distance":"389 m","ligne":[{"numLigne":"11"}]},
      {"codeLieu":"MSLL","libelle":"Marseillaise","distance":"395 m","ligne":[{"numLigne":"11"}]},
      {"codeLieu":"JMLI","libelle":"Jean Moulin","distance":"411 m","ligne":[
        {"numLigne":"1"},
        {"numLigne":"11"},
      ]},
      {"codeLieu":"JAME","libelle":"Jamet","distance":"487 m","ligne":[{"numLigne":"1"}]},
      {"codeLieu":"PBRE","libelle":"Petit Breton","distance":"488 m","ligne":[{"numLigne":"11"}]},
    ])
    .get(`/arrets.json/${farLatitude.toString().replace('.',',')}/${farLongitude.toString().replace('.',',')}`)
    .reply(200, [])
}
