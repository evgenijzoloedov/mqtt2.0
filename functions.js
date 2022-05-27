const mqtt = require('mqtt')
require('dotenv').config()



function createClient(){
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    const connectUrl = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`
    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        reconnectPeriod: 1000,
    })

    return client
}

module.exports = {
    createClient
}