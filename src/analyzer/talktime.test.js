const talktime = require('./talktime');

test('talktime analyzer should return talktimes by speaker', () => {
    const data = {
        duration: '00:02:49.470',
        id: 'abc123',
        started: 'Nov 7, 2018 1:58 PM Canberra, Melbourne, Sydney',
        topic: 'Some Zoom Recording',
        transcript:
            [
                {
                    speaker: 'Unknown Speaker',
                    start: 141.24,
                    end: 261.75,
                    text: '...'
                },
                {
                    speaker: 'Unknown Speaker',
                    start: 285.21,
                    end: 305.42,
                    text: '...'
                },
                {
                    speaker: 'Joe Test',
                    start: 308.24,
                    end: 589.47,
                    text: '...'
                },
                {
                    speaker: 'Unknown Speaker',
                    start: 310.2,
                    end: 315.0,
                    text: '...'
                },
            ]
    };

    expect(talktime(data)).toEqual({
        'Joe Test': {
            total: 281230,
            turns: [281230],
            humanized: '5 minutes'
        },
        'Unknown Speaker': {
            total: 145520,
            turns: [140720, 4800],
            humanized: '2 minutes'
        }
    });
});
