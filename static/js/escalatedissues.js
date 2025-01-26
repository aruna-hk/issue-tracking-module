document.querySelector('#EI').addEventListener('click', async (event)=> {
  const theadv = ['issue ID', 'Type', 'Priority', 'Status', 'Escalated By']
  let dataContainer = document.querySelector('.content-area')
  let currentChild = dataContainer.firstElementChild
  if (currentChild != null){
    dataContainer.removeChild(currentChild)
  }
  let divc = document.createElement('div')
  dataContainer.appendChild(divc)
  let h1 = document.createElement('h1')
  h1.textContent = "Escalated Issues"
  divc.appendChild(h1)
  let table = document.createElement('table')
  table.className = 'data-table'
  divc.appendChild(table)
  let thead = document.createElement('thead')
  table.appendChild(thead)
  theadv.forEach((elem)=> {
    let th = document.createElement('th')
    th.textContent = elem
    thead.append(th)
  })  
  let tbody = document.createElement('tbody')
  table.append(tbody)
  let tdata = await fetch('http://localhost:8000', {headers: {'Accept':'Application/json'}})
  let data = await tdata.json()
  for (let entry of data){
    if (entry.esc) {
      let tr = document.createElement('tr')
      tbody.appendChild(tr)
      let td1 = document.createElement('td')    
      td1.textContent = entry.id
      tr.appendChild(td1)
      let td2 = document.createElement('td')    
      td2.textContent = entry.Type
      tr.appendChild(td2)
      let td3 = document.createElement('td')    
      td3.textContent = entry.priority
      tr.appendChild(td3)
      let td4 = document.createElement('td')    
      td4.textContent = entry.status
      tr.appendChild(td4)
      let td5 = document.createElement('td')    
      td5.textContent = entry.Escalator
      tr.appendChild(td5)
    }
  }
})
