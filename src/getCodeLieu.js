const { fetchJSON } = require('./fetchJSON')

async function getCodeLieu(trainStation) {
  const arrets = await fetchJSON(`arrets.json`)

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
