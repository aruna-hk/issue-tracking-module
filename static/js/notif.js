window.addEventListener('load', ()=> {
  const channel = document.querySelector('#notif').attributes.channel.value
  const ws = new WebSocket(`ws://localhost:8081?channel=${channel}`)
  console.log(ws)
  ws.addEventListener('message', (message)=> {
    const notif = document.querySelector('#notifcnt')
    if (notif.textContent == '') {
      notif.textContent = '1'
    } else {
      notif.textContent = Number(notif.textContent) + 1
    }
  })
});
