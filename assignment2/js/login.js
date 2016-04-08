/**
 * Created by root on 4/8/16.
 */
'use strict';
function doLogin(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = 'http://localhost:9090/api/users/'+username;
    let div = document.createElement("div");
    div.style.color = "red";
    div.style.size = "100%";
    fetch(url).then(res=>res.json()).then(user=>{
        if(user.hasOwnProperty('type')){
            if(user.password===password)
                window.location="http://localhost:9090/coordinator.html?username="+user.username;
            else document.getElementById('invalid').innerHTML = 'Invalid Username or Password!';
        }
        else{
            if(user.password===password)
                window.location="http://localhost:9090/coordinator.html?username="+user.username;
            else document.getElementById('invalid').innerHTML = 'Invalid Username or Password!';
        }
    });
}