jQuery(document).ready(function(){
  jQuery('#lpop li').bind('click', function(event){
    event.stopPropagation()
    event.currentTarget.parentElement.parentElement.parentElement.style.display = 'none'
    jQuery('#main2').css('display', 'grid')
    jQuery('#main1').css('display', 'none')
    jQuery('#ppp').css('display', 'none')
    jQuery('#prname')[0].textContent = event.currentTarget.lastElementChild.textContent
  })
  jQuery('.issueh')[0].style.background='green'
  jQuery('.headerdiv, #usr').bind('click', function(event){
    console.log(event)
    event.stopPropagation()
    event.currentTarget.firstElementChild.style.display = 'block'
  })
  jQuery('.headerdiv').bind('click', function(event){
    event.stopPropagation()
    if (this.textContent == 'Projects') {
      jQuery('#main1').css('display', 'none')
      jQuery('#main2').css('display', 'grid')
      jQuery('#ppp').css('display', 'none')
    } else if (this.textContent == "My work") {
      jQuery('#main2').css('display', 'none')
      jQuery('#main1').css('display', 'block')
      jQuery('#ppp').css('display', 'none')
    }
   })
  jQuery('.IS').bind('click', function(event){
    event.stopPropagation()
    if (this.textContent == 'Board') {
      jQuery('#sumc').css('display', 'none')
      jQuery('#ccc').css('display', 'block')
      jQuery('#ppp').css('display', 'none')
      jQuery('#lll').css('display', 'none')
    } else if (this.textContent == "Summary") {
      jQuery('#sumc').css('display', 'block')
      jQuery('#ccc').css('display', 'none')
      jQuery('#ppp').css('display', 'none')
      jQuery('#lll').css('display', 'none')
    } else if (this.textContent == 'List') {
      jQuery('#ccc').css('display', 'none')
      jQuery('#sumc').css('display', 'none')
      jQuery('#lll').css('display', 'block')
    }
  })
  jQuery('.dd').bind('click', function(event){
    event.stopPropagation()
    if (event.currentTarget.textContent == 'View all Projects') {
      event.currentTarget.parentElement.style.display = 'none'
      jQuery('#main1').css('display', 'none')
      jQuery('#ppp').css('display', 'block')
    }
  })
  jQuery('#projh > h4').bind('click', function(event){
    event.stopPropagation()
    jQuery('#main1').css('display', 'none')
    jQuery('#ppp').css('display', 'flex')
  })
  jQuery('.issueh').bind('click', function(event){
    if(event.currentTarget.style.background == 'green') {
      return
    } else {
      console.log(event)
      for (item of jQuery('.issueh')) {
        if (item.style.background == 'green') {
          item.style.background = 'none'
        }
      }
      event.currentTarget.style.background = 'green'
      if (event.currentTarget.textContent == 'viewed') {
        jQuery('#viewdd').css('display', 'block')
        jQuery('#wo').css('display', 'none')
        jQuery('#stm').css('display', 'none')
        jQuery('#strr').css('display', 'none')
      }
      if (event.currentTarget.textContent == 'worked on') {
        jQuery('#viewdd').css('display', 'none')
        jQuery('#wo').css('display', 'block')
        jQuery('#stm').css('display', 'none')
        jQuery('#strr').css('display', 'none')
      }
      if (event.currentTarget.textContent == 'assigned to me') {
        jQuery('#stm').css('display', 'block')
        jQuery('#wo').css('display', 'none')
        jQuery('#viewdd').css('display', 'none')
        jQuery('#strr').css('display', 'none')
      }
      if (event.currentTarget.textContent == 'Starred') {
        jQuery('#strr').css('display', 'block')
        jQuery('#viewdd').css('display', 'none')
        jQuery('#wo').css('display', 'none')
        jQuery('#stm').css('display', 'none')
      }

    }
  })
})
