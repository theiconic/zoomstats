const extractWords = require('./extract-words');

test('extract-words should concatenate array of all words in the entry text', () => {
    expect(extractWords([], {
        speaker: 'Unknown Speaker',
        start: '00:02:21.240',
        end: '00:02:21.750',
        text: 'The quick brown fox jumps over the lazy dog'
    })).toEqual([
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog'
    ]);

    expect(extractWords([
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog'
    ], {
        speaker: 'Unknown Speaker',
        start: '00:02:21.240',
        end: '00:02:21.750',
        text: 'Pack my box with five dozen liquor jugs'
    })).toEqual([
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog',
        'Pack',
        'my',
        'box',
        'with',
        'five',
        'dozen',
        'liquor',
        'jugs'
    ]);

    expect(extractWords([
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog',
        'Pack',
        'my',
        'box',
        'with',
        'five',
        'dozen',
        'liquor',
        'jugs'
    ], {
        speaker: 'Unknown Speaker',
        start: '00:02:21.240',
        end: '00:02:21.750',
        text: 'The five boxing wizards jump quickly'
    })).toEqual([
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog',
        'Pack',
        'my',
        'box',
        'with',
        'five',
        'dozen',
        'liquor',
        'jugs',
        'The',
        'five',
        'boxing',
        'wizards',
        'jump',
        'quickly',
    ]);
});
