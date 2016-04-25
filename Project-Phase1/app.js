/**
 * Created by Ahmed on 4/25/2016.
 */
"use strict";

let express = require('express');
let userRepository = require("./UserRepository");

//    bodyParser = require('body-parser'),


let app = express();
//Allow serving static files
app.use(express.static(__dirname));

let port = 8008;


/*app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());*/

app.get('/',(req,res)=>{
    res.send("Welcome!!!");
});

app.get('/api/users',(req,res)=>{
    userRepository.getAllUsers().then(users=>{
        console.log(users);
        res.json(users);
    })
})

app.get('/api/user/:username', (req, res) => {      //get user by username
    let username = req.params.username;
    console.log('Attempting to retrieve username: ' + username);
    userRepository.getUserByUsername(username).then(user => {
        console.log('User successfully retrieved');
        console.log(user);
        res.json(user);
    }).catch(err=>{
        console.log('User was not found');
        res.send("Fail: "+err);
    });
    console.log('process skipped entirely for some reason');
});

app.listen(port, function(){
    console.log('HalaqaMetrash App is running my app on http://localhost:' + port);
    //open('http://localhost:' + port);
});
