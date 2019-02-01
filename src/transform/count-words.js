module.exports = (textProperty, countProperty) => (countedWords, word) => {
    if (!countedWords[word]) {
        countedWords[word] = {
            [textProperty]: word,
            [countProperty]: 0
        }
    }

    countedWords[word][countProperty]++;

    return countedWords;
}
