require('dotenv').config()

const client = require('./functions').createClient()

client.on('connect', () => {
    setInterval(()=>{
        client.publish(process.env.FROM_STATIC_TO_SERVER,`${Math.random()*100}`)
    },1000)
})

