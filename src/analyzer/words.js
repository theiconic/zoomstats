const toWords = require('split-to-words');

exports.analyze = data => {
    const extractWords = (words, entry) => {
        return words.concat(toWords(entry.text));
    }

    const words = data.transcript.reduce(extractWords, []);

    return words;
}
