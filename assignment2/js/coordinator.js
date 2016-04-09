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
        let url = 'http://localhost:9090/api/requests';
        fetch('http://localhost:9090/api/sections/'+a.staffNo).then(sections=>sections.json()).then(sections=>{
            fetch(url).then(response=>response.json()).then(requests=>{
                requests=requests.filter(r=>{
                    for(let i=0; i<sections.length; i++){
                        console.log(sections[i]);
                        if(sections[i].crn==r.crn)
                            return r;
                    }
                });
                console.log(requests);
                console.log('hello!');
                let htmlTemplate = $('#requests-template').html(),
                    requestsTemplate = Handlebars.compile(htmlTemplate);
                $('#requests-table').html(requestsTemplate({requests}));
            });
        });
    });
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
