/**
 * Created by root on 4/9/16.
 */
"use strict";
let courseRepository = require('./CourseRepository');
courseRepository.getCourses().then(courses =>{
    console.log(courses);
});
courseRepository.getCoursesbyCourseCode("GENG200").then(courses =>{
    console.log(courses);
});