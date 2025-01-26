async function projects() {
  let projects = await fetch('http://localhost:8000/lprojects', {headers : {'Accept':'Application/json'}})
  let _projects = await projects.json()
  console.log(_projects)
  let table = document.querySelector('.projects-table')
  if (table) {
    table.removeChild(document.querySelector('.projects-table tbody'))
  }
  table.appendChild(document.createElement('tbody'))
  let tbody = table.lastElementChild
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
