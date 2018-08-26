import fetch from 'node-fetch'
import { API } from './const'

export async function fetchJSON(resource) {
  const response = await fetch(`${API}/${resource}`)

  if (!response.ok) {
    throw Error('Service unavailable')
  }

  return response.json()
}
