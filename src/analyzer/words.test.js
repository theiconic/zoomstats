const words = require('./words');

test('words analyzer should return an array of all words', () => {
    const data = {
        duration: '00:02:49.470',
        id: 'abc123',
        started: 'Nov 7, 2018 1:58 PM Canberra, Melbourne, Sydney',
        topic: 'Some Zoom Recording',
        transcript:
            [
                {
                    speaker: 'Unknown Speaker',
                    start: '00:02:21.240',
                    end: '00:04:21.750',
                    text: 'One morning I shot an elephant in my pajamas. How he got into my pajamas I\'ll never know.'
                },
                {
                    speaker: 'Unknown Speaker',
                    start: '00:04:45.210',
                    end: '00:06:45.420',
                    text: 'The horse raced past the barn fell.'
                },
                {
                    speaker: 'Joe Test',
                    start: '00:06:48.240',
                    end: '00:09:49.470',
                    text: 'The complex houses married and single soldiers and their families.'
                }
            ]
    }

    expect(words(data)).toEqual([
        'One',
        'morning',
        'I',
        'shot',
        'an',
        'elephant',
        'in',
        'my',
        'pajamas',
        'How',
        'he',
        'got',
        'into',
        'my',
        'pajamas',
        'I\'ll',
        'never',
        'know',
        'The',
        'horse',
        'raced',
        'past',
        'the',
        'barn',
        'fell',
        'The',
        'complex',
        'houses',
        'married',
        'and',
        'single',
        'soldiers',
        'and',
        'their',
        'families'
    ]);
});
