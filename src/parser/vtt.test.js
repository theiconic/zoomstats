const parse = require('./vtt');

test('vtt parser should return full data object with populated transcript', () => {
    const input = `WEBVTT

1
00:02:04.950 --> 00:02:05.370
Joe Test: Hey guys.

2
00:02:06.390 --> 00:02:07.590
James T. Kirk: Well, equally.

3
00:03:19.980 --> 00:03:20.580
Joe Test: cannot hear me.

4
00:03:22.530 --> 00:03:23.040
Frida Kahlo: Hello. Yeah.

5
00:03:26.850 --> 00:03:28.110
Joe Test: So, and speak this`;

    expect(parse(input)).toStrictEqual({
        id: null,
        topic: null,
        started: 0.0,
        duration: 208.11,
        transcript: [
            {
                start: 124.95,
                end: 125.37,
                speaker: 'Joe Test',
                text: 'Hey guys.'
            },
            {
                start: 126.39,
                end: 127.59,
                speaker: 'James T. Kirk',
                text: 'Well, equally.'
            },
            {
                start: 199.98,
                end: 200.58,
                speaker: 'Joe Test',
                text: 'cannot hear me.'
            },
            {
                start: 202.53,
                end: 203.04,
                speaker: 'Frida Kahlo',
                text: 'Hello. Yeah.'
            },
            {
                start: 206.85,
                end: 208.11,
                speaker: 'Joe Test',
                text: 'So, and speak this'
            },
        ]
    });
});
