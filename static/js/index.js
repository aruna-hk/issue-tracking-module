function project_form(){
   project = {}
  for (item of jQuery('.form-group>input, .form-group>select, .form-group>textarea')){
     project[item.name] = item.value 
    console.log(item.value)
  }
  return project
}

jQuery(document).ready(function(){
  globalThis.WS = new WebSocket("ws://localhost:8001")
  globalThis.ndata = []
  WS.addEventListener("message", (message)=>{
    jQuery('#notifbell>svg>text')[0].innerHTML = Number(jQuery('#notifbell>svg>text')[0].innerHTML) + 1
    globalThis.ndata = JSON.parse(JSON.parse(message.data))
    for (issue of ndata){
      console.log(issue)
      let item = document.createElement('div')
      item.className = 'nnotification-item unread'
        
      let badge = document.createElement('div')
      item.appendChild(badge)
      badge.className = 'nnotification-icon priority-low'
      badge.textContent = "✓"
      if (issue.priority == 'high'){
        badge.textContent  = "⚡"
        badge.className = "nnotification-icon priority-high"
      } else if (issue.priority == 'medium'){
        badge.textContent = "💬"
        badge.className = "nnotification-icon priority-medium"
      }

      let itemContent = document.createElement('div')
      itemContent.className = "nnotification-content"
      item.appendChild(itemContent)

      let title = document.createElement('div')
      title.className = "nnotification-title"
      title.textContent = "You've been assigned Issue #" + issue.id
      itemContent.appendChild(title)
      let text = document.createElement("div")
      text.className = "nnotification-text"
      text.textContent = issue.name
      itemContent.append(text)

      let meta = document.createElement('div')
      meta.className = 'nnotification-meta'
      itemContent.appendChild(meta)
      let metaProject = document.createElement('div')
      metaProject.className = 'nnotification-project'
      metaProject.textContent = issue.project
      meta.append(metaProject)
      let metaTime = document.createElement('div')
      metaTime.className = 'nnotification-time'
      metaTime.textContent = issue.time
      meta.append(metaTime)

      document.querySelector('.nnotification-list').insertBefore(item, document.querySelector('.nnotification-list').firstElementChild)
      let sound = new Audio("static/audio/ctm.mp4")
      sound.play()
    }

  })
  jQuery('.ntab').bind('click', (event)=>{
    jQuery('.nnotification-tabs>div').attr('class', 'ntab')
    jQuery(event.currentTarget).attr('class', 'ntab nactive')
  })
  jQuery('.mark-all-read').bind('click', (event)=>{
    jQuery('.nnotification-item').attr('class', 'nnotification-item')
  })
  jQuery('.nnotification-item').bind('click', (event)=>{
    jQuery(event.currentTarget).attr('class', 'nnotification-item')
  })
  jQuery('.nnotification-item').bind('click', (event)=>{
    jQuery(this).attr('class', 'nnotification-item')
  })
  jQuery(".xcontent>#Capa_1").bind('click', (event)=>{
    jQuery('.ncontent').css('display', 'none')
    jQuery('#issuesumary').css('width', '100%')
  })


  jQuery('#notifbell>svg').bind('click', function(event){
    event.stopPropagation()
    window.resizeBy(0,0)
    //globalThis.WS.addEventListener('message', (message)=>{
      //console.log(message)
      //data = JSON.parse(JSON.parse(message.data))
    jQuery('.ncontent').css('display', 'block')
    jQuery('#issuesumary').css('width', `${jQuery('#main1')[0].clientWidth-jQuery('.ncontent')[0].clientWidth}`)
  })



  jQuery('.p09, .boardlist, #usrr').on('mouseleave', function(){
    jQuery(this).css('display', 'none')
  })
  jQuery('.cxc').bind('click', function(event){
    event.stopPropagation()
    jQuery('#issuepopup').css('display', 'none')
  })
  jQuery('.board-section>div').bind('click', function(event){
    event.stopPropagation()
    console.log('-----')
    console.log(event.currentTarget.lastElementChild.lastElementChild)
    jQuery(event.currentTarget.lastElementChild.lastElementChild).css('display', 'block')
  })
  jQuery('.form-container').bind('click', function(event){
    event.stopPropagation()
  })
  jQuery('.fcont').bind('click', function(event){
    jQuery('.fcont').css('display', 'none')
  })
  jQuery('#projectForm>button').bind('click', function(event){
    event.stopPropagation()
    project = project_form()
    console.log(project)
    console.log(JSON.stringify(project))
    fetch('http://localhost:8000/projects/', {
      method: 'POST',
      headers: {'content-type': 'application/json', 'X-CSRFToken': jQuery('#projectForm>input')[0].value},
      body: JSON.stringify(project)
    }).then((response)=>{
       if (response.ok){
         if (response.status == 201){
           jQuery('.fcont').css('display', 'none')
         }
       }
    })
  })

  jQuery('#strip1>button').bind('click', function(event){
    jQuery('.fcont').css('display', 'flex')
  })
  jQuery('.prjisclose').bind('click', function(event){
    jQuery('#openi').css('display', 'none')
  })
  jQuery('.issue-event, .card, .tmlis,.container>.item, .nav-row').bind('click', function(event){
    jQuery('#issuepopup').css('display', 'flex')
  })

  jQuery('.issueh').css('background', 'none')
  jQuery(jQuery('.issueh')[0]).css('background', 'green')
  jQuery('#issuesumary>div').css('display', 'none')
  jQuery(jQuery('#issuesumary>div')[0]).css('display', 'block')
  jQuery('.issueh').bind('click', function(event){
    jQuery('.issueh').css('background', 'none')
    jQuery(this).css('background', 'green')
    jQuery('#issuesumary>div').css('display', 'none')
    if (this.textContent == 'worked on') {
      jQuery(jQuery('#issuesumary>div')[0]).css('display', 'block')
    } else if (this.textContent == 'viewed'){
      jQuery(jQuery('#issuesumary>div')[1]).css('display', 'block')
    } else if (this.textContent == 'assigned to me') {
      jQuery(jQuery('#issuesumary>div')[2]).css('display', 'block')
    } else {
      jQuery(jQuery('#issuesumary>div')[3]).css('display', 'block')
    }
  })
  jQuery('.cbtn-secondary, .cbtn-primary').bind('click', function(event){
    //log issue
    event.stopPropagation()
    jQuery('#cfff').css('display', 'none')
  })
  jQuery('.tab').bind('click', function(event){
    event.stopPropagation()
    jQuery('.tab').attr('class', 'tab')
    jQuery(this).attr('class', 'tab active')
    jQuery('.section').attr('class', 'section')
    if (this.textContent == 'Assigned to me') {
      jQuery(jQuery('.section')[0]).attr('class', 'section active')
    } else if (this.textContent == 'Recent') {
      jQuery(jQuery('.section')[1]).attr('class', 'section active')
    } else {
      jQuery(jQuery('.section')[2]).attr('class', 'section active')
    }
  })
  jQuery('#Capa_1').bind('click', function(event){
    event.stopPropagation()
    jQuery('#cfff').css('display', 'none')
  })
  jQuery(jQuery('.bottom-link')[1]).bind('click', function(event){
    event.stopPropagation()
    jQuery('.p09').css('display', 'none')
    jQuery('.fcont').css('display', 'flex')
  })
  jQuery(jQuery('.bottom-link')[0]).bind('click', function(event){
    event.stopPropagation()
    jQuery('.p09, #main2, #main1, #ff').css('display', 'none')
    jQuery('#ppp').css('display', 'block')
  })
  jQuery('#projh>h4').bind('click', function(event){
    event.stopPropagation()
    jQuery('#main2, #main1, #ff').css('display', 'none')
    jQuery('#ppp').css('display', 'block')
  })
  jQuery('#hstrip').bind('click', function(event){
    event.stopPropagation()
    jQuery('#main1').css('display', 'block')
    jQuery('#main2, #ppp, #ff').css('display', 'none')
  })
  jQuery('.headerdiv').bind('click', function(event){
    event.stopPropagation()
    jQuery('.p09').css('display', 'none')
    if (event.currentTarget.firstElementChild) {
      if (event.currentTarget.firstElementChild.className == 'p09') {
        jQuery('#usrr').css('display', 'none')
        event.currentTarget.firstElementChild.style.display = 'block'
      }
    }
    if (event.currentTarget.textContent == 'Create') {
      jQuery('#cfff').css('display', 'flex')
    }
  })
  jQuery('#usr').bind('click', function(event){
    event.stopPropagation()
    jQuery('.p09').css('display', 'none')
    jQuery('#usrr').css('display', 'block')
  })
  jQuery('.row1, .project-item, .issue-widget>.header').bind('click', function(event){
    event.stopPropagation()
    jQuery('#ppp, #main1, .p09').css('display', 'none')
    jQuery('#main2').css('display', 'grid')
    jQuery('#init').click()
    jQuery('#init').css('background', '#1abc9c')
  })
  jQuery('.IS').bind('click', function(event){
    jQuery('.IS').css('background', '#34495e')
    jQuery(this).css('background', '#1abc9c')
    if (jQuery(this).text().replace(/\s+/g, '').trim() == 'Summary') {
      jQuery('#sumc').css('display', 'block')
      jQuery('#lll, #tlm, #ccc').css('display', 'none')
    } else if(jQuery(this).text().replace(/\s+/g, '').trim() == 'Board') {
      jQuery('#sumc, #lll, #tlm').css('display', 'none')
      jQuery('#ccc').css('display', 'block')
    } else if(jQuery(this).text().replace(/\s+/g, '').trim() == 'Timeline') {
      jQuery('#sumc, #lll, #ccc').css('display', 'none')
      jQuery('#tlm').css('display', 'block')
    } else {
      jQuery('#sumc, #tlm, #ccc').css('display', 'none')
      jQuery('#lll').css('display', 'block')
    }
  })
  jQuery('#notifbell>svg').click()
  jQuery('#issuesumary').css('width', `${jQuery('#main1')[0].clientWidth-jQuery('.ncontent')[0].clientWidth}`)
  window.addEventListener('resize', (event)=>{
    jQuery('#issuesumary').css('width', `${jQuery('#main1')[0].clientWidth-jQuery('.ncontent')[0].clientWidth}`)
  })
})
