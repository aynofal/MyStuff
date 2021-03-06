/**
 * Created by root on 4/6/16.
 */
"use strict";
let express = require("express");
let requestRepository = require("./RequestRepository");
let userRepository = require("./UserRepository");
let sectionRepository = require("./SectionRepository");
let courseRepository = require("./CourseRepository");

let app = express();
app.use(express.static(__dirname));

let port = 9090;

app.get('/',(req,res)=>{
    res.send("Welcome!!!");
});
app.get('/api/requests',(req,res)=>{
    requestRepository.getRequests().then(requests=>{
        console.log(requests);
        res.json(requests);
    });
});
app.get('/api/student',(req,res)=>{
    userRepository.getStudentUsers().then(requests=>{
        console.log(requests);
        res.json(requests);
    });
});
app.get('/api/staff',(req,res)=>{
    userRepository.getStaffUsers().then(requests=>{
        console.log(requests);
        res.json(requests);
    });
});
app.get('/api/users/:username', (req, res) => {
    let username = req.params.username;
    console.log('req.params.username ', username);
    userRepository.getUser(username).then(user => {
        console.log(JSON.stringify(user, null, 2));
        res.json(user);
    }).catch(err => {
        res.send("Failed: " + err);
    });
});
app.get('/api/student/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    console.log('req.params.studentId ', studentId);
    userRepository.getStudent(parseInt(studentId)).then(user => {
        console.log(JSON.stringify(user, null, 2));
        res.json(user);
    }).catch(err => {
        res.send("Failed: " + err);
    });
});
app.get('/api/sections',(req,res)=>{
    sectionRepository.getSections().then(requests=>{
        console.log(requests);
        res.json(requests);
    });
});
app.get('/api/sections_crn/:crn', (req, res) => {
    let crn = req.params.crn;
    console.log(crn);
    console.log('req.params.crn', crn);
    sectionRepository.getSection(parseInt(crn)).then(crs=>{
        console.log(crs);
        res.json(crs);
    }).catch(err=>{
        res.send("Fail: "+err);
    });
});
app.get('/api/sections/:instructorId', (req, res) => {
    let instructorId = req.params.instructorId;
    console.log(instructorId);
    console.log('req.params.instructorId', instructorId);
    sectionRepository.getSectionByStaff(parseInt(instructorId)).then(crs=>{
        console.log(crs);
        res.json(crs);
    }).catch(err=>{
        res.send("Fail: "+err);
    });
});
app.get('/api/courses/:courseCode', (req, res) => {
    let courseCode = req.params.courseCode;
    console.log('req.params.courseCode', courseCode);
    courseRepository.getCoursesbyCourseCode(courseCode).then(courses => {
        console.log(JSON.stringify(courses, null, 2));
        res.json(courses);
    }).catch(err => {
        res.send("Failed :" + err);
    });
});
app.get('/api/courses' ,(req , res) => {
    courseRepository.getCourses().then(courses =>{
        console.log(courses);
        res.json(courses);
    });
});

app.listen(port, function(){
    console.log("Listening @ http://localhost:"+port);
});