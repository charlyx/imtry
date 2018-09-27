process.env.GOOGLE_APPLICATION_CREDENTIALS = './imtry-dev-8c850b80b519.json'

const PubSub = require('@google-cloud/pubsub')

const pubsub = new PubSub()

pubsub.subscription('departures').on('message', message => {
  console.log(message)
  message.ack()
})
