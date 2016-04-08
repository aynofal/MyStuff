/**
 * Created by root on 4/6/16.
 */
'use strict';
$(document).ready(function(){
    let username = getParameterByName('username');
    let userFetcher = 'http://localhost:9090/api/users/'+username;
    fetch(userFetcher).then(res=>res.json()).then(a=>{
        let fullname=a.firstname+' '+a.lastname;
        document.getElementById('userFullname').innerHTML = fullname;
    });
    let url = 'http://localhost:9090/api/requests';
    fetch(url).then(response=>response.json()).then(requests=>{
        console.log(requests);
        let htmlTemplate = $('#requests-template').html(),
            requestsTemplate = Handlebars.compile(htmlTemplate);
        $('#requests-table').html(requestsTemplate({requests}));
    });
    console.log(username);
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
