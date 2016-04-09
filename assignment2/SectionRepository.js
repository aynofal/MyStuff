/**
 * Created by root on 4/9/16.
 */
"use strict";
class SectionRepository{
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

    getSections() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/section.json').then(requests => {
                resolve(requests);
            }).catch(err => {
                reject(err);
            });
        });
    }
    getSection(crn) {
        return new Promise((resolve, reject) => {
            this.getSections().then(a => {
                a = a.filter(s => s.crn === crn);
                if (a.length > 0) {
                    resolve(a[0]);
                }
                else {
                    reject("Not found!");
                }
            });
        });
    }
    getSectionByStaff(staffId) {
        return new Promise((resolve, reject) => {
            this.getSections().then(a => {
                a = a.filter(s => s.instructorId === staffId);
                if (a.length > 0) {
                    resolve(a);
                }
                else {
                    reject("Not found!");
                }
            });
        });
    }
}
module.exports = new SectionRepository();