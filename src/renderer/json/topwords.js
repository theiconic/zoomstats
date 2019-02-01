const lowercase = require('../../transform/lowercase');
const excludeStopwords = require('../../filter/exclude-stopwords');
const excludeNumbers = require('../../filter/exclude-numbers');
const minlength = require('../../filter/minlength');
const countWords = require('../../transform/count-words');
const byProperty = require('../../sorter/by-property');
const toArray = require('../../transform/to-array');
const toKeyValue = require('../../transform/to-key-value');

module.exports = (words) => {
    const countedWords = words
        .map(lowercase)
        .filter(excludeStopwords)
        .filter(excludeNumbers)
        .filter(minlength(3))
        .reduce(countWords('word', 'count'), {});

    const topWords = toArray(countedWords).sort(byProperty('count')).reverse();

    topWords.length = 20;

    return topWords.reduce(toKeyValue('word', 'count'), {});
}
