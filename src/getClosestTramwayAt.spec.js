const nock = require('nock')
const { getClosestTramwayAt } = require('./getClosestTramwayAt')

describe('getClosestTramwayAt', () => {
  beforeEach(mockTempsAttente)

  it('should return closest tramway in both directions at XBON', async () => {
    const codeLieu = 'XBON'
    const tempsAttente = await getClosestTramwayAt(codeLieu)

    expect(tempsAttente).toEqual({ Jamet: 3, Bouffay: 5 })
  })

})

function mockTempsAttente() {
  nock('http://open_preprod.tan.fr')
    .get('/ewp/tempsattente.json/XBON')
    .reply(200, [
      {"sens":1,"terminus":"Jamet","infotrafic":true,"temps":"3 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Perray","infotrafic":true,"temps":"4 mn 30","dernierDepart":"false","tempsReel":"true","ligne":{"numLigne":"11","typeLigne":3},"arret":{"codeArret":"XBON4"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"5 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
      {"sens":1,"terminus":"François Mitterrand","infotrafic":true,"temps":"11 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"13 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
      {"sens":1,"terminus":"Jamet","infotrafic":true,"temps":"20 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"21 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
      {"sens":1,"terminus":"Tertre","infotrafic":false,"temps":"26 mn","dernierDepart":"false","tempsReel":"true","ligne":{"numLigne":"11","typeLigne":3},"arret":{"codeArret":"XBON3"}},
      {"sens":1,"terminus":"François Mitterrand","infotrafic":true,"temps":"28 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"29 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
      {"sens":1,"terminus":"Jamet","infotrafic":true,"temps":"36 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"37 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
      {"sens":2,"terminus":"Perray","infotrafic":true,"temps":"39 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"11","typeLigne":3},"arret":{"codeArret":"XBON4"}},
      {"sens":1,"terminus":"François Mitterrand","infotrafic":true,"temps":"44 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"45 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
      {"sens":1,"terminus":"Jamet","infotrafic":true,"temps":"52 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON2"}},
      {"sens":2,"terminus":"Bouffay","infotrafic":true,"temps":"53 mn","dernierDepart":"false","tempsReel":"false","ligne":{"numLigne":"1","typeLigne":1},"arret":{"codeArret":"XBON1"}},
    ])
}

