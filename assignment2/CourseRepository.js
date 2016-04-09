/**
 * Created by root on 4/9/16.
 */
"use strict";
class  CourseRepository {
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
    getCourses() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/course.json').then(courses => {
                resolve(courses);
            }).catch(err => {
                reject(err);
            });
        });
    }
    getCoursesbyCourseCode(coursecode) {
        return new Promise((resolve, reject) => {
            this.getCourses().then(courses => {
                courses = courses.filter(c => c.courseCode === coursecode);
                if (courses.length > 0)
                    resolve(courses[0]);
                else {
                    reject("asasfa");
                }
            });

        });
    }
}
module.exports = new CourseRepository();