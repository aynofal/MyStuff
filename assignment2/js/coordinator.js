/**
 * Created by root on 4/6/16.
 */
$(document).ready(function(){
   let url = 'http://localhost:9090/api/requests';
   fetch(url).then(response=>response.json()).then(requests=>{
       console.log(requests);
       let htmlTemplate = $('#requests-template').html(),
           requestsTemplate = Handlebars.compile(htmlTemplate);
       $('#requests-table').html(requestsTemplate({requests}));
   });
});
