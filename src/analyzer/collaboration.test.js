const collaboration = require('./collaboration');

test('collaboration analyzer should return collaboration by speaker and audience', () => {
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
                }
            ]
    };

    expect(collaboration(data)).toEqual({
        'Joe Test': {
            'Unknown Speaker': 281230
        },
        'Unknown Speaker': {
            'all': 120510,
        },
    });
});
