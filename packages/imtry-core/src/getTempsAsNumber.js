export function getTempsAsNumber(temps) {
  return parseInt(temps.replace(/ mn.*/, ''))
}
