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

    expect(collaboration(data)).toEqual({
        'Unknown Speaker': {
            'all': 120510
        },
        'Joe Test': {
            'Unknown Speaker': 181230
        }
    });
});
