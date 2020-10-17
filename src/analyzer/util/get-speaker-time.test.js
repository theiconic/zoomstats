const getSpeakerTime = require('./get-speaker-time');

test('get-speaker-time should return the difference between entry.end and entry.start in ms', () => {
    expect(getSpeakerTime({
        start: 141.24,
        end: 261.75,
    })).toBe(120510);
    expect(getSpeakerTime({
        start: 10.24,
        end: 10.8,
    })).toBe(560);
    expect(getSpeakerTime({
        start: 141.24,
        end: 141.24,
    })).toBe(0);
});
