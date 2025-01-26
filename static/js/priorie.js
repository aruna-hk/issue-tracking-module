let prioril = document.querySelectorAll('.priority-box li a')
prioril.forEach((elem)=>{
  elem.addEventListener('click', (event)=> {
    event.target.nextElementSibling.style.zIndex = 1
  })
})
