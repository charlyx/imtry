const fetch = require('node-fetch')
const { API } = require('./const')

async function getCodeLieu(trainStation) {
  const response = await fetch(`${API}/arrets.json`)

  if (!response.ok) {
    throw Error('Service unavailable')
  }

  const arrets = await response.json()

  const arret = arrets.find(byLibelle(trainStation))

  if (!arret) {
    throw Error(`Could not find station ${trainStation}`)
  }

  return arret.codeLieu
}

function byLibelle(expectedLibelle) {
  return ({ libelle }) => libelle === expectedLibelle
}

module.exports = { getCodeLieu }
