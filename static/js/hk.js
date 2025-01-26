async function projects() {
  let projects = await fetch('http://localhost:8000/lprojects', {headers : {'Accept':'Application/json'}})
  let _projects = await projects.json()
  let modalContent = document.querySelector('.modal-content')
  if (modalContent) {
    document.querySelector('.content-area').removeChild(modalContent)
  }
  modalContent = document.createElement(document.createElement('div'))
  modalContent.className = 'modal-content'
  document.querySelector('.content-area').appendChild(modalContent)

  let modalHeader = document.createElement('div')
  modalHeader.className = 'modal-header'
  modalContent.appendChild(modalHeader)

  let modalbtn = document.createElement('button')
  modalbtn.className = 'class-button'
  modalHeader.appendChild(modalbtn)
  
  let modalh = document.createElement('h1')
  modalh.className = 'modal-title'
  modalHeader.appendChild('modalh')

  let modalInput = document.createElement('input')
  modalInput.className = 'search-input'
  modalContent.appendChild(modalInput)
  
  let tableContainer = document.createElement('div')
  tableContainer.className = 'table-container'
  modalContent.appendChild('tableContainer')
  
  let table = document.createElement('table')
  table.className = 'projects-table'
  tableContainer.appendChild(table)
   
  let thead = document.createElement('thead')
  table.appendChild(thead)
  let theadlist = ['Project ID', 'Name', 'Pending issues', 'High Priority', 'Last updated', 'Status']
  let theadrow = document.querySelector('tr')
  theadrow.className = 'table-header'
  thead.appendChild(theadrow)
  theadlist.forEach((item)=> {
    let th = document.createElement('th')
    th.appendChild(document.createElement('button'))
    th.firstElementChild.className = 'sort-button'
    th.firstElemtChild.innerHTML = item
    theadrow.appendChild(th)
  })
    
  let tbody = document.createElement('tbody')
  table.appendChild(tbody)

  for (project of _projects){
    let tr = document.createElement('tr')
    tr.className = "table-row"
    tbody.appendChild(tr)
    tr.appendChild(document.createElement('td'))
    tr.lastElementChild.innerHTML = project.id
    tr.lastElementChild.className = "table-cell"
    tr.appendChild(document.createElement('td'))
    tr.lastElementChild.innerHTML = project.name
    tr.lastElementChild.className = "table-cell"
    tr.appendChild(document.createElement('td'))
    tr.lastElementChild.innerHTML = project.pending
    tr.lastElementChild.className = "table-cell"
    tr.appendChild(document.createElement('td'))
    tr.lastElementChild.innerHTML = project.High
    tr.lastElementChild.className = "table-cell"
    tr.appendChild(document.createElement('td'))
    tr.lastElementChild.innerHTML = project.lastupdate
    tr.lastElementChild.className = "table-cell"
    tr.appendChild(document.createElement('td'))
    tr.lastElementChild.className = "table-cell"
    tr.lastElementChild.appendChild(document.createElement('span'))
    tr.lastElementChild.firstElementChild.className = 'status-badge'
    tr.lastElementChild.firstElementChild.textContent = project.status
  }
}
projects()
document.querySelector('#PRJ').addEventListener('click', (event)=> {
  projects();
});
