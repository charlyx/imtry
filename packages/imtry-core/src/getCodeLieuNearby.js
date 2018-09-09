import { fetchJSON } from './fetchJSON'
import { getDistanceAsNumber } from './getDistanceAsNumber'

export async function getCodeLieuNearby(latitude, longitude) {
  const lat = latitude.toString().replace('.', ',')
  const long = longitude.toString().replace('.', ',')
  const arrets = await fetchJSON(`arrets.json/${lat}/${long}`)

  const arretsTram = arrets.filter(byTramway)

  if (arretsTram.length === 0) {
    throw Error('Vous êtes à plus de 500 mètres d\'un arrêt de tram.')
  }

  const sortedArretsTram = arretsTram.sort(byDistance)

  return sortedArretsTram[0].codeLieu
}

function byTramway({ ligne }) {
  const TRAMWAY_LINES = [
    '1',
    '2',
    '3',
  ]

  return ligne.some(({ numLigne}) => TRAMWAY_LINES.includes(numLigne))
}

function byDistance(a, b) {
  const distanceA = getDistanceAsNumber(a.distance)
  const distanceB = getDistanceAsNumber(b.distance)

  return distanceA - distanceB
}
