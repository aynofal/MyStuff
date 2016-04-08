/**
 * Created by root on 4/8/16.
 */
'use strict';
function doLogin(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = 'http://localhost:9090/api/users/'+username;
    fetch(url).then(res=>res.json()).then(user=>{
        if(user.hasOwnProperty('type')){
            window.location="http://localhost:9090/coordinator.html";
        }
        else window.location="http://localhost:9090/student.html";
    });
}