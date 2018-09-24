'use strict'

const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Permission } = require('actions-on-google')
const {
  getClosestTramwayFrom,
  getClosestTramwayNearby,
} = require('@imtry/core')

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response })
  const intentMap = new Map()

  intentMap.set('Closest tram from specified station', ClosestTramHandler)
  intentMap.set('Closest tram from nearest station', ClosestTramNearbyHandler)

  agent.handleRequest(intentMap)
})

function ClosestTramHandler(agent) {
  const { station } = agent.parameters

  return getClosestTramwayFrom(station)
    .then(makeAgentSayTramwayDepartures(agent))
    .catch(e => {
      console.error(e)
      agent.add('Désolé. J\'ai glissé, chef.')
    })
}

function ClosestTramNearbyHandler(agent) {
  const conv = agent.conv()

  if (!conv.device.location) {
    conv.ask(new Permission({
      context: 'Pour localiser l\'arrêt de tram le plus proche',
      permissions: ['DEVICE_PRECISE_LOCATION'],
    }))
    agent.add(conv)
    return
  }

  const { latitude, longitude } = conv.device.location.coordinates

  return getClosestTramwayNearby(latitude, longitude)
    .then(makeAgentSayTramwayDepartures(agent))
    .catch(e => {
      console.error(e)
      agent.add('Désolé. J\'ai glissé, chef.')
    })
}

const makeAgentSayTramwayDepartures = agent => tramways => {
  const responses = Object.keys(tramways).map(direction => {
    const temps = tramways[direction]
    const message = (temps > 0) ? `partira dans ${temps} minutes` : 'va bientôt partir'

    return `Le prochain tramway en direction de ${direction} ${message}`
  })

  responses.forEach(response => agent.add(response))
}
