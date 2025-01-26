document.querySelector('#notif').addEventListener('click', (event)=> {
  document.querySelector('#notifs').style.display='block'
});

document.querySelector('#notifs > button').addEventListener('click', (event)=> {
  document.querySelector('#notifs').style.display = 'none'
});
