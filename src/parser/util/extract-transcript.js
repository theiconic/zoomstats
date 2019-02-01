const extractEntry = require('./extract-transcript-entry');

module.exports = (document) => Array.prototype.map.call(
    document.querySelectorAll('.aside-transcript .ts-container'),
    extractEntry
);
