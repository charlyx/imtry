import { getCodeLieu } from './getCodeLieu'
import { getCodeLieuNearby } from './getCodeLieuNearby'
import { getClosestTramwayAt } from './getClosestTramwayAt'

export async function getClosestTramwayFrom(libelle) {
  const codeLieu = await getCodeLieu(libelle)

  return getClosestTramwayAt(codeLieu)
}

export async function getClosestTramwayNearby(latitude, longitude) {
  const codeLieu = await getCodeLieuNearby(latitude, longitude)

  return getClosestTramwayAt(codeLieu)
}
