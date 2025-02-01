jQuery(document).ready(function(){
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
  jQuery('#fc>button, #fc>div').bind('click', function(event){
    //log issue
    jQuery('#ff').css('display', 'none')
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
    jQuery('#ff').css('display', 'none')
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
      jQuery('#ff').css('display', 'flex')
    }
  })
  jQuery('#usr').bind('click', function(event){
    event.stopPropagation()
    jQuery('.p09').css('display', 'none')
    jQuery('#usrr').css('display', 'block')
  })
  jQuery('.project-item').bind('click', function(event){
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
})
