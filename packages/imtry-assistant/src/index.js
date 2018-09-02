'use strict'

const functions = require('firebase-functions')
const { WebhookClient} = require('dialogflow-fulfillment')

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response })

  function welcome(agent) {
    agent.add('Welcome to my agent!')
  }

  function fallback(agent) {
    agent.add('I didn\'t understand')
    agent.add('I\'m sorry, can you try again?')
  }

  const intentMap = new Map()

  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback)

  agent.handleRequest(intentMap)
})
