require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: '*'
    }
});

const client = require('./functions').createClient()
app.use(express.json());

const port = process.env.PORT || 3000;


client.on('connect', () => {
    client.subscribe([process.env.FROM_STATIC_TO_SERVER,process.env.FROM_CAR_TO_SERVER], () => {})
})
io.on('connection', (socket) => {
    socket.on('interaction', msg => {
        client.on('message', (topic, payload) => {
            let obj = {}
            switch (topic) {
                case process.env.FROM_CAR_TO_SERVER:
                    obj['car'] = payload.toString()
                    io.emit('', JSON.stringify(obj))
                case process.env.FROM_STATIC_TO_SERVER:
                    obj['static'] = payload.toString()
                    io.emit('interaction', JSON.stringify(obj))
                    break
                default:
                    throw Error("Unknown topic")
            }
        })
    });
});







app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/direction',(req,res)=>{


    const {body} = req
    const {message} = body;
    client.publish(process.env.FROM_SERVER_TO_WHEELS,JSON.stringify(message))

})

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});










