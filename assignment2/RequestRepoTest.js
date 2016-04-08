/**
 * Created by root on 4/6/16.
 */
"use strict";
let requestRepository = require("./RequestRepository");
requestRepository.getRequests().then(requests => {
    console.log(requests);
});