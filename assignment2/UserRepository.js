/**
 * Created by root on 4/8/16.
 */
"use strict";
class UserRepository{
    constructor() {
        this.fs = require('fs');
    }

    //Read a file and convert its content to a json object
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

    getStudentUsers() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/student.json').then(requests => {
                resolve(requests);
            }).catch(err => {
                reject(err);
            });
        });
    }
    getStaffUsers() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/staff.json').then(requests => {
                resolve(requests);
            }).catch(err => {
                reject(err);
            });
        });
    }
    getUser(username) {
        return new Promise((resolve, reject) => {
            this.getStudentUsers().then(users => {
                users = users.filter(u => u.username === username);
                if (users.length > 0) {
                    resolve(users[0]);
                }
                else {
                    console.log("No students found, looking for instructors.");
                    this.getStaffUsers().then(users => {
                        users = users.filter(u => u.username === username);
                        if (users.length > 0) {
                            resolve(users[0]);
                        }
                        else {
                            reject("No such user exists.");
                        }
                    });
                }
            });
        });
    }
    getInstructor(instructorId) {
        return new Promise((resolve, reject) => {
            this.getStaffUsers().then(users => {
                users = users.filter(u => u.staffNo === instructorId);
                if (users.length > 0) {
                    resolve(users[0]);
                }
                else {
                    reject("No such user exists.");
                }
            });
        });
    }
    getStudent(studentId) {
        return new Promise((resolve, reject) => {
            this.getStudentUsers().then(users => {
                users = users.filter(u => u.studentId === studentId);
                if (users.length > 0) {
                    resolve(users[0]);
                }
                else {
                    reject("No such user exists.");
                }
            });
        });
    }
}
module.exports = new UserRepository();