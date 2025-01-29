jQuery(document).ready(function(){
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
  jQuery('#projh > h4').bind('click', function(event){
    event.stopPropagation()
    jQuery('#main1').css('display', 'none')
    jQuery('#ppp').css('display', 'flex')
  })
})
