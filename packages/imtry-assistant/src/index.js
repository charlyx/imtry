'use strict'

const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
const { getClosestTramwayFrom } = require('@imtry/core')

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response })
  const intentMap = new Map()

  intentMap.set('ClosestTram', ClosestTramHandler)

  agent.handleRequest(intentMap)
})

function ClosestTramHandler(agent) {
  const { station } = agent.parameters
  return getClosestTramwayFrom(station).then(tramways => {
    const responses = Object.keys(tramways).map(direction => `
      Le prochain tramway au départ de ${station}
      et en direction de ${direction}
      partira dans ${tramways[direction]} minutes
    `)

    responses.forEach(response => agent.add(response))
    return
  }).catch(e => {
    console.error(e)
    agent.add('Désolé, j\'ai glissé chef.')
  })
}
