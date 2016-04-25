/**
 * Created by Ahmed on 4/25/2016.
 */
    "use strict";
class userRepository {
    constructor() {
        this.fs = require('fs');
    }


     getStudents() { //gets all students in username/password format
        return new Promise((resolve, reject) => {
            this.readJsonFile('../data/student.json').then(students => {
                students = students.map(s => {
                    return {
                        username: s.username,
                        password: s.password
                    }
                });
                resolve(students);
            }).catch(err => {
                reject(err);
            });
        });
    }


     getTeachers() { //gets all teachers in username/password format
        return new Promise((resolve, reject) => {
            this.readJsonFile('../data/teacher.json').then(teachers => {
                teachers = teachers.map(t => {
                    return {
                        username: t.username,
                        password: t.password
                    }

                });
                resolve(teachers);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getAllUsers(){ //gets all users in username/password format
        return new Promise((resolve,reject) =>{
           this.getStudents().then(students =>{
               this.getTeachers().then(teachers =>{

                    let users = teachers.concat(students);
                   resolve(users);
               });
           }).catch(err => {
               reject(err);
           });
        });
    }

    getUserByUsername(username){
        return new Promise ((resolve, reject) =>{
            this.getAllUsers().then(users =>{
               let user = users.filter(u=> u.username === username);

                if (user.length>0){
                    resolve(user[0]);
                }
                else {
                    reject('username not found');
                }
            })
        });
    }

    readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, (error, data) => {
                if (error) {
                    reject("Reading file failed: " + error);
                }
                else {
                    let json = JSON.parse(data);
                    resolve(json);
                }
            });
        });
    }


    writeJsonFile(filePath, data) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filePath, JSON.stringify(data), error => {
                if (error) {
                    reject("Write to file failed: " + error);
                }
                else {
                    resolve();
                }
            });
        });
    }


}

module.exports = new userRepository();
