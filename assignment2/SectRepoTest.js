/**
 * Created by root on 4/9/16.
 */
"use strict";
let sectionRepository = require("./SectionRepository");
/*sectionRepository.getSections().then(requests => {
    console.log(requests);
});
sectionRepository.getSection(2002).then(requests => {
    console.log(requests);
});*/
sectionRepository.getSectionByStaff(21).then(requests => {
    console.log(requests);
});