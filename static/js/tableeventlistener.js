function AddTableEvent() {
  let rows = document.querySelectorAll('.data-table tbody tr')
  rows.forEach((row)=> {
    row.addEventListener('click', (event)=> {
      document.querySelector('#issueinstance').style.zIndex = 2;
    })
   })
}

document.querySelector('#closeissue').addEventListener('click', (event)=> {
  document.querySelector('#issueinstance').style.zIndex = -1;
})

document.querySelector('.solve-section').addEventListener('click', (event)=> {
  document.querySelector('#issueinstance').style.zIndex = -1;
})
AddTableEvent()
