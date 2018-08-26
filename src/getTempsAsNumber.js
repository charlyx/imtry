function getTempsAsNumber(temps) {
  return parseInt(temps.replace(/ mn.*/, ''))
}

module.exports = { getTempsAsNumber }
