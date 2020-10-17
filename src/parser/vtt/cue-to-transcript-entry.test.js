const cueToTranscriptEntry = require('./cue-to-transcript-entry');

test('effectiveness analyzer should return percentage of effective talktime', () => {
    const cue = {
        identifier: 1,
        start: 1.23,
        end: 4,
        text: 'Joe Test: Hello everyone.',
        style: null
    };

    expect(cueToTranscriptEntry(cue)).toStrictEqual({
        start: 1.23,
        end: 4,
        speaker: 'Joe Test',
        text: 'Hello everyone.'
    });
});
