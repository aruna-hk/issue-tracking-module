jQuery(document).ready(function(){
  //jQuery('#loginForm>.login-btn').bind('click', function(event){
    //console.log('send login request')
    //username = jQuery('#username')[0].value
    //password = jQuery('#password')[0].value
    //console.log(username, password)
    //fetch('http://localhost:8000/login/', {
      //method: 'POST',
      //headers: {'content-type': 'Applications/json', "X-CSRFToken": jQuery('.login-popup>input')[0].value},
      //body: JSON.stringify({"username":username, "password":password})
    //}).then((response)=>{
      //if (response.ok){
        //console.log('login sucess')
      //}
    //})
  //})
  jQuery('.get-started-btn, .login-dropdown').bind('click', function(event){
    event.stopPropagation()
    jQuery('#loginp').css('display', 'flex')
    jQuery('#loginp > form').css('z-index', 2)
  })
})
