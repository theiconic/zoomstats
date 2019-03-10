const getSpeakerTime = require('./get-speaker-time');

test('get-speaker-time should return the difference between entry.end and entry.start in ms', () => {
    expect(getSpeakerTime({
        start: '00:02:21.240',
        end: '00:04:21.750',
    })).toBe(120510);
    expect(getSpeakerTime({
        start: '00:00:10.240',
        end: '00:00:10.800',
    })).toBe(560);
    expect(getSpeakerTime({
        start: '00:02:21.240',
        end: '00:02:21.240',
    })).toBe(0);
});
