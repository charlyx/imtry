const { fetchJSON } = require('./fetchJSON')
const { getTempsAsNumber } = require('./getTempsAsNumber')
const {
  TRAMWAY,
  TERMINUS_1,
  TERMINUS_2,
} = require('./const')

async function getClosestTramwayAt(codeLieu) {
  const tempsAttente = await fetchJSON(`tempsattente.json/${codeLieu}`)

  const tramTempsAttente = tempsAttente.filter(byTramway)

  if (!tramTempsAttente) {
    throw Error(`No train scheduled at station ${codeLieu}`)
  }

  const sortedTempsAttente = tramTempsAttente.sort(byTemps)

  const firstDirection = sortedTempsAttente.find(byTerminus(TERMINUS_1))
  const secondDirection = sortedTempsAttente.find(byTerminus(TERMINUS_2))

  return {
    [firstDirection.terminus]: getTempsAsNumber(firstDirection.temps),
    [secondDirection.terminus]: getTempsAsNumber(secondDirection.temps),
  }
}

function byTramway({ ligne }) {
  return ligne.typeLigne === TRAMWAY
}

function byTerminus(terminus) {
  return ({ sens }) => sens === terminus
}

function byTemps(a, b) {
  const tempsA = getTempsAsNumber(a.temps)
  const tempsB = getTempsAsNumber(b.temps)

  return tempsA - tempsB
}

module.exports = { getClosestTramwayAt }
