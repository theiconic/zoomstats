const extractWords = require('./util/extract-words');

module.exports = data => data.transcript.reduce(extractWords, []);
