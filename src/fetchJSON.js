const fetch = require('node-fetch')
const { API } = require('./const')

async function fetchJSON(resource) {
  const response = await fetch(`${API}/${resource}`)

  if (!response.ok) {
    throw Error('Service unavailable')
  }

  return response.json()
}

module.exports = { fetchJSON }
