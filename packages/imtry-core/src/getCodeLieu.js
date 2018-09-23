import { fetchJSON } from './fetchJSON'
import { formatStationName } from './formatStationName'

export async function getCodeLieu(trainStation) {
  const arrets = await fetchJSON(`arrets.json`)

  const formatedTrainStation = formatStationName(trainStation)

  const arret = arrets.find(byLibelle(formatedTrainStation))

  if (!arret) {
    throw Error(`Could not find station ${trainStation}`)
  }

  return arret.codeLieu
}

function byLibelle(expectedLibelle) {
  return ({ libelle }) => libelle === expectedLibelle
}
