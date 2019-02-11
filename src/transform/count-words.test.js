const countWords = require('./count-words');

test('count-words should count the occurrences of unique words', () => {
    const words = ['fruit', 'apple', 'banana', 'pear', 'banana', 'apple', 'banana', 'grape'];

    expect(words.reduce(countWords('word', 'count'), {})).toEqual({
        fruit: {
            word: 'fruit',
            count: 1
        },
        apple: {
            word: 'apple',
            count: 2
        },
        banana: {
            word: 'banana',
            count: 3
        },
        pear: {
            word: 'pear',
            count: 1
        },
        grape: {
            word: 'grape',
            count: 1
        }
    });
});

test('count-words should populate object properties according to given parameters', () => {
    const words = ['bear', 'mouse', 'lion', 'lion'];

    expect(words.reduce(countWords('text', 'occurrences'), {})).toEqual({
        bear:{
            text: 'bear',
            occurrences: 1
        },
        mouse: {
            text: 'mouse',
            occurrences: 1
        },
        lion: {
            text: 'lion',
            occurrences: 2
        }
    })
});
