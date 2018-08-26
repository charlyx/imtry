const fetch = require('node-fetch')

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

module.exports = { getCodeLieu }
