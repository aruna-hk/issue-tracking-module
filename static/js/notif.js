function header_update() {
  const elems = document.querySelectorAll('header h2')
  elems.forEach((elem)=>{
    elem.textContent = Number(elem.texContent) + 1
  })
}

function issue_events() {
  console.log("==========")
  let elems =  document.querySelectorAll('.issuec button')
  console.log(elems)
  elems.forEach((elem)=>{
    elem.addEventListener('click', (event)=> {
      document.querySelector('.sisue').style.zIndex = 1
    })
  })
}

window.addEventListener('load', ()=> {
  const channel = document.querySelector('#notif').attributes.channel.value
  const ws = new WebSocket(`ws://localhost:8081?channel=${channel}`)
  ws.addEventListener('message', (message)=> {
    const notif = document.querySelector('#notifcnt')
    const hptable = document.querySelector('aside > table > tbody')
    const alltable = document.querySelector('main > table > tbody')
    if (notif.textContent == '') {
      notif.textContent = '1'
    } else {
      notif.textContent = Number(notif.textContent) + 1
    }
    const issue_data = JSON.parse(message.data)
    if (issue_data.priority == 'High') {
      let elem = document.createElement('tr')
      elem.appendChild(document.createElement('td'))
      elem.lastElementChild.textContent = issue_data.id
      elem.appendChild(document.createElement('td'))
      elem.lastElementChild.textContent = issue_data.Type
      elem.appendChild(document.createElement('td'))
      elem.lastElementChild.textContent = issue_data.created_at
      hptable.appendChild(elem)
    }
    let gen_elem = document.createElement('tr')
    gen_elem.appendChild(document.createElement('td'))
    gen_elem.lastElementChild.textContent = issue_data.id
    gen_elem.appendChild(document.createElement('td'))
    gen_elem.lastElementChild.textContent = issue_data.project
    gen_elem.appendChild(document.createElement('td'))
    gen_elem.lastElementChild.textContent = issue_data.Type
    gen_elem.appendChild(document.createElement('td'))
    gen_elem.lastElementChild.textContent = issue_data.priority
    gen_elem.appendChild(document.createElement('td'))
    gen_elem.lastElementChild.textContent = issue_data.status
    gen_elem.appendChild(document.createElement('td'))
    gen_elem.lastElementChild.textContent = issue_data.assigned_to
    alltable.appendChild(gen_elem)
    header_update()
  })
});
issue_events()
