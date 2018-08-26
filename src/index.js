import { getCodeLieu } from './getCodeLieu'
import { getClosestTramwayAt } from './getClosestTramwayAt'

export async function getClosestTramwayFrom(libelle) {
  const codeLieu = await getCodeLieu(libelle)

  return getClosestTramwayAt(codeLieu)
}
