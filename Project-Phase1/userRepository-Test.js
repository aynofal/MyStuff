'use strict';
let userRepository = require('./UserRepository');

userRepository.getStudents().then(students => {
    console.log(students);
    console.log("-----------------------------------------------------------------------------------------------------------");

});


userRepository.getTeachers().then(teachers =>{
    console.log(teachers);
    console.log("-----------------------------------------------------------------------------------------------------------");

});

userRepository.getAllUsers().then(users =>{
   console.log(users);
    console.log("-----------------------------------------------------------------------------------------------------------");

});

userRepository.getUserByUsername('juha').then(user=> {
    console.log(user);
});

userRepository.getUserByUsername('Adham').then(user=> {
    console.log(user);
}).catch(err => {
    console.log(err);
});





