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
                    start: '00:02:21.240',
                    end: '00:04:21.750',
                    text: '...'
                },
                {
                    speaker: 'Unknown Speaker',
                    start: '00:04:45.210',
                    end: '00:06:45.420',
                    text: '...'
                },
                {
                    speaker: 'Joe Test',
                    start: '00:06:48.240',
                    end: '00:09:49.470',
                    text: '...'
                }
            ]
    };

    expect(talktime(data)).toEqual({
        'Unknown Speaker': '4 minutes',
        'Joe Test': '3 minutes'
    });
});
