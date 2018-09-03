export function getTempsAsNumber(temps) {
  if (temps === 'horaire.proche') {
    return 0
  }

  return parseInt(temps.replace(/ mn.*/, ''))
}
