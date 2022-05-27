require('dotenv').config()

const client = require('./functions').createClient()

client.on('connect', () => {
    client.subscribe([process.env.FROM_SERVER_TO_WHEELS], () => {})
})

client.on('message', (topic, payload) => {
    console.log('Payload: ', payload.toString())
})
