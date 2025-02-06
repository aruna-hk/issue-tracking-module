const websocket = require('ws')
const redis = require('redis')
const url = require('url')
const WS = new websocket.Server({ port: 8001 })
WS.on('connection', (ws, req)=>{
  //url_parsed = url.parse(req.url).query
  redis.createClient().connect().then((connection) => {
    connection.subscribe("PRJ:001", (message, channel)=>{
      ws.send(JSON.stringify(message))
    }) 
  })
})
