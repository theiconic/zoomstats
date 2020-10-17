const effectiveness = require('./effectiveness');

test('effectiveness analyzer should return percentage of effective talktime', () => {
    const data = {
        duration: 589.47,
        id: 'abc123',
        started: 0.0,
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
                    end: 405.24,
                    text: '...'
                },
                {
                    speaker: 'Joe Test',
                    start: 408.24,
                    end: 589.47,
                    text: '...'
                }
            ]
    };

    expect(effectiveness(data)).toBe(71.55);
});
