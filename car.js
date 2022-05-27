require('dotenv').config()

const client = require('./functions').createClient()

client.on('connect', () => {
    setInterval(()=>{
        client.publish(process.env.FROM_CAR_TO_SERVER,`${Math.random()*100}`)
    },1000)
})

