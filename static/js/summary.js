document.querySelector('#IS').addEventListener('click', async (event)=>{
  let sum = await fetch('http://localhost:8000/IssueSummary/')
  let summ = await sum.json()
  let container = document.querySelector('.content-area')
  if (container.firstElementChild){
    container.removeChild(container.lastElementChild)
  }
  let contentArea = document.createElement('div')
  contentArea.className = 'content-area'
  
  let h1 = document.createElement('h1')
  h1.innerHTML = " Issue Summary"
  contentArea.appendChild(h1)
  let div = document.createElement('div')
  div.className = "Summary"
  div.appendChild(document.createElement('ul'))
  let s1 = document.createElement('li')
  s1.innerHTML = "Total Issues:&#32;"
  s1.appendChild(document.createElement('strong'))
  s1.firstElementChild.innerHTML = summ.issues
  let s2 = document.createElement('li')
  s2.innerHTML = "Open Issues:&#32"
  s2.appendChild(document.createElement('strong'))
  s2.firstElementChild.innerHTML = summ.open
  let s3 = document.createElement('li')
  s3.innerHTML = 'Closed Issues:&#32'
  s3.appendChild(document.createElement('strong'))
  s3.firstElementChild.innerHTML = summ.closed
  let s4 = document.createElement('li')
  s4.innerHTML = 'Escalated Issues:&#32'
  s4.appendChild(document.createElement('strong'))
  s4.firstElementChild.innerHTML = summ.escalated
  div.firstElementChild.appendChild(s1)
  div.firstElementChild.appendChild(s2)
  div.firstElementChild.appendChild(s3)
  div.firstElementChild.appendChild(s4)
  contentArea.appendChild(div)
  container.appendChild(contentArea)
}) 
