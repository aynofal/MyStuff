/**
 * Created by root on 4/6/16.
 */
"use strict";
class RequestRepository{
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

    getRequests() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/request.json').then(requests => {
                resolve(requests);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
module.exports = new RequestRepository();