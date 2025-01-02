const websocket = require('ws')
const redis = require('redis')
const url = require('url')
const wss = new websocket.Server({ port: 8081 })
const redis_client = redis.createClient();
const clients = {}
wss.on('connection', (ws, req)=>{
  redis_client.connect().then(() => {
    const queryParams = url.parse(req.url, true).query;
    if (!clients[queryParams.channel]) {
      clients[queryParams.channel] = []
      clients[queryParams.channel].push(ws)
      redis_client.subscribe(queryParams.channel, (message, channel)=> {
        if (clients[channel]) {
          clients[channel].forEach((client) => {
            client.send(message)
          })
        }
      })
    }
    clients[queryParams.channel].push(ws)
   })
})
