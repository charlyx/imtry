const fetch = require('node-fetch')

const TRAMWAY = 1

const TERMINUS_1 = 1
const TERMINUS_2 = 2

async function getCodeLieu(trainStation) {
  const response = await fetch('http://open_preprod.tan.fr/ewp/arrets.json')

  if (!response.ok) {
    throw Error('Service unavailable')
  }

  const arrets = await response.json()

  const arret = arrets.find(({ libelle }) => libelle === trainStation)

  if (!arret) {
    throw Error(`Could not find station ${trainStation}`)
  }

  return arret.codeLieu
}

async function getClosestTramwayAt(codeLieu) {
  const response = await fetch(`http://open_preprod.tan.fr/ewp/tempsattente.json/${codeLieu}`)

  if (!response.ok) {
    throw Error('Service unavailable')
  }

  const tempsAttente = await response.json()

  const tramTempsAttente = tempsAttente.filter(({ ligne }) => ligne.typeLigne === TRAMWAY )

  if (!tramTempsAttente) {
    throw Error(`No trains at station ${codeLieu} at the moment`)
  }
  
  const sortedTempsAttente = tramTempsAttente.sort((a, b) => {
    const tempsA = getTempsAsNumber(a.temps)
    const tempsB = getTempsAsNumber(b.temps)

    return tempsA - tempsB
  })

  const firstDirection = sortedTempsAttente.find(({ sens }) => sens === TERMINUS_1 )
  const secondDirection = sortedTempsAttente.find(({ sens }) => sens === TERMINUS_2 )

  return {
    [firstDirection.terminus]: getTempsAsNumber(firstDirection.temps),
    [secondDirection.terminus]: getTempsAsNumber(secondDirection.temps),
  }
}

function getTempsAsNumber(temps) {
  return parseInt(temps.replace(/ mn.*/, ''))
}

module.exports = { 
  getCodeLieu,
  getTempsAsNumber, 
  getClosestTramwayAt 
}
