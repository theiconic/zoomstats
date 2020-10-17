const fs = require('fs');
const parse = require('../parser/vtt.js');

module.exports = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(parse(data));
            }
        });
    });
};
