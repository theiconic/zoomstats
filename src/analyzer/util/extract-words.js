const toWords = require('split-to-words');

module.exports = (words, entry) => words.concat(toWords(entry.text));
