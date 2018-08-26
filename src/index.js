const { getCodeLieu } = require('./getCodeLieu')
const { getClosestTramwayAt } = require('./getClosestTramwayAt')

async function getClosestTramwayFrom(libelle) {
  const codeLieu = await getCodeLieu(libelle)

  return getClosestTramwayAt(codeLieu)
}

module.exports = { getClosestTramwayFrom }