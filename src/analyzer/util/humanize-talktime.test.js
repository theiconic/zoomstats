const humanizeTalktime = require('./humanize-talktime');

test('humanize-talktime should return a humanised duration string from input in ms', () => {
    expect(humanizeTalktime(500)).toBe('a few seconds');
    expect(humanizeTalktime(1000)).toBe('a few seconds');
    expect(humanizeTalktime(60000)).toBe('a minute');
    expect(humanizeTalktime(160000)).toBe('3 minutes');
    expect(humanizeTalktime(660000)).toBe('11 minutes');
    expect(humanizeTalktime(6600000)).toBe('2 hours');
});
