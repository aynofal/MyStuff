/**
 * Created by root on 4/9/16.
 */
'use strict';
$(document).ready(function(){
    let username = getParameterByName('username');
    let userFetcher = 'http://localhost:9090/api/users/'+username;
    fetch(userFetcher).then(res=>res.json()).then(a=>{
        let fullname=a.firstname+' '+a.lastname;
        document.getElementById('userFullname').innerHTML = fullname;
        let url = 'http://localhost:9090/api/requests';
        fetch('/api/student/'+a.studentId).then(student=>student.json()).then(student=>{
            fetch(url).then(response=>response.json()).then(requests=>{
                requests = requests.filter(r=>student.studentId==r.studentId);
                for(let i=0; i<requests.length; i++){
                    fetch('/api/sections_crn/'+requests[i].crn).then(section=>section.json()).then(section=>{
                        console.log(section);
                        fetch('http://localhost:9090/api/courses/'+section.courseCode).then(course=>course.json()).then(course=>{
                            requests[i].courseName=course.courseName;
                        });
                    });
                }
                let htmlTemplate = $('#requests-template').html(),
                    requestsTemplate = Handlebars.compile(htmlTemplate);
                $('#requests-table').html(requestsTemplate({requests}));
            });
        });
    });
});
function getCourse
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}