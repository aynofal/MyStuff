/**
 * Created by root on 4/8/16.
 */
"use strict";
let userRepository = require("./UserRepository");
userRepository.getStaffUsers().then(requests => {
    console.log(requests);
});
userRepository.getStudentUsers().then(requests => {
    console.log(requests);
});
userRepository.getUser('student99').then(requests => {
    console.log(requests);
});
userRepository.getUser('ce').then(requests => {
    console.log(requests);
});
userRepository.getInstructor(12).then(requests => {
    console.log(requests);
});