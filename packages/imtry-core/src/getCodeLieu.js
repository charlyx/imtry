import { fetchJSON } from './fetchJSON'
import { formatStationName } from './formatStationName'

export async function getCodeLieu(trainStation) {
  const arrets = await fetchJSON(`arrets.json`)

  const formattedTrainStation = formatStationName(trainStation)

  const arret = arrets.find(byLibelle(formattedTrainStation))

  if (!arret) {
    throw Error(`Could not find station ${formattedTrainStation}`)
  }

  return arret.codeLieu
}

function byLibelle(expectedLibelle) {
  return ({ libelle }) => libelle.toLowerCase() === expectedLibelle.toLowerCase()
}
