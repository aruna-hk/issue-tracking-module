jQuery(document).ready(function(){
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
  })
  jQuery('.IS').bind('click', function(event){
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
