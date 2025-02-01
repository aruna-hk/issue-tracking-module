jQuery(document).ready(function(){
  jQuery('.get-started-btn, .login-dropdown').bind('click', function(event){
    event.stopPropagation()
    jQuery('#loginp').css('display', 'flex')
    jQuery('#loginp > form').css('z-index', 2)
  })
})
